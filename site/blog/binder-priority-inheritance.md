---
title: Android Binder 同步调用的优先级继承机制
description: 解析 Android Binder 同步事务中的线程优先级继承、调度策略和内核恢复流程。
date: 2026-08-30
outline: deep
---

# Android Binder 同步调用的优先级继承机制

## 摘要

Android Binder 支持在同步事务中把调用线程的调度策略和优先级带到被调用进程的 Binder 线程上，以缓解优先级反转问题。例如，应用 A 的前台线程调用服务 B 时，即使 B 的 Binder 线程原本处于较低优先级，B 也可以暂时使用 A 的优先级处理这次请求。

这套机制由用户态 libbinder 和内核 Binder 驱动共同完成。它不是简单地把“proxy 的优先级”复制给“stub”：proxy/stub 是 Binder 对象，真正参与调度的是 A 和 B 的线程。内核从发起事务的 `current` 线程读取优先级，在事务送达 B 的 Binder 线程时临时调整该线程，事务结束后恢复原值。

本文以 AOSP Android 16 为例，源码基线为 `android-16.0.0_r4`；内核侧参考 `kernel/common` 的 `android16-6.12` 分支。

## 一、几个基本概念

### 1. 优先级属于线程

Binder proxy 和 stub 本身不执行代码，也没有独立的调度实体。执行过程是：

- A 的某个线程调用 B 的 proxy；
- 内核将事务投递给 B 进程中的某个 Binder 线程；
- 该 Binder 线程执行 B 的 stub/onTransact。

因此，本文中的“A 的高优先级”指发起 Binder 调用的 A 线程，“B 的低优先级”指实际处理事务的 B Binder 线程。

### 2. Linux 调度策略和优先级

Binder 驱动支持以下策略：

- `SCHED_NORMAL`
- `SCHED_BATCH`
- `SCHED_FIFO`
- `SCHED_RR`

普通调度策略使用 nice 值（用户态范围通常为 `-20..19`），实时策略使用 RT priority（通常为 `1..99`）。内核 `task_struct::prio` 使用另一套数值表示：数值越小，调度优先级越高。

## 二、同步 Binder 调用的完整流程

```text
A 高优先级线程
    |
    | BpBinder::transact()
    v
libbinder: IPCThreadState::transact()
    |
    | BC_TRANSACTION，TF_ONE_WAY 未设置
    v
内核 binder_transaction()
    |
    | 保存 A 当前线程的 sched_policy/prio
    v
内核 binder_proc_transaction()
    |
    | 选择或唤醒 B 的 Binder 线程
    v
binder_transaction_priority()
    |
    | 计算实际目标优先级并临时设置 B 线程
    v
B Binder 线程执行 Stub/onTransact()
    |
    | 返回同步 reply
    v
Binder 驱动恢复 B 线程原来的优先级
```

### 1. 用户态发起同步事务

`BpBinder::transact()` 最终调用 `IPCThreadState::transact()`：[BpBinder.cpp:394](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/binder/BpBinder.cpp#L394)、[IPCThreadState.cpp:919](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/binder/IPCThreadState.cpp#L919)。

`TF_ONE_WAY` 未设置时，libbinder 会等待 `BR_REPLY`，因此这是同步调用：[IPCThreadState.cpp:946](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/binder/IPCThreadState.cpp#L946)。

### 2. 内核保存调用线程优先级

在创建事务时，驱动检查当前事务是否为同步事务，并读取发起线程的 `current->policy` 和 `current->prio`：[binder.c:3575](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L3575)。

```c
if (!(t->flags & TF_ONE_WAY) &&
    binder_supported_policy(current->policy)) {
    t->priority.sched_policy = current->policy;
    t->priority.prio = current->prio;
}
```

如果发起线程使用 Binder 不支持的调度策略，则事务使用目标进程的默认优先级。异步事务也使用目标进程默认优先级，而不是调用者优先级。

### 3. 选择目标线程并更新优先级

驱动选择 B 进程中可用的 Binder 线程；有明确目标线程时，事务进入该线程的 todo 队列，并调用 `binder_transaction_priority()`：[binder.c:3078](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L3078)。

如果事务暂时只能放入进程队列，则在 B 线程从队列取出事务时再次执行相同的优先级处理：[binder.c:5302](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L5302)。事务对象中的 `set_priority_called` 保证一次事务不会重复设置。

## 三、实际优先级如何计算

可以把内核逻辑概括为：

```text
desired = 同步调用者的优先级
          或目标进程默认优先级

如果 desired 是 RT 策略且 Binder node 未允许 RT 继承：
    desired = SCHED_NORMAL/nice 0

如果 node 配置的最低优先级高于 desired：
    desired = node 的最低优先级

最后根据 B 线程的 CAP_SYS_NICE、RLIMIT_RTPRIO、RLIMIT_NICE 做权限和范围限制
```

核心实现位于 [binder.c:812](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L812)。node 的最低优先级更高时会覆盖调用者优先级；如果优先级相同，`SCHED_FIFO` 优先于 `SCHED_RR`，因为 FIFO 没有 RR 的时间片限制：[binder.c:835](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L835)。

因此，这不是无条件的“完全复制”：

- B 可以通过 node 配置要求一个最低优先级；
- B 没有足够的调度权限时，RT/nice 请求可能被限制；
- RT 策略默认不会跨进程继承，必须显式打开；
- 调用者使用不支持的调度策略时不会按调用者策略继承。

## 四、用户态配置

### 1. 设置 Binder node 的最低调度策略

Native libbinder 提供 `BBinder::setMinSchedulerPolicy()`：[Binder.h:73](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/binder/include/binder/Binder.h#L73)。

```cpp
service->setMinSchedulerPolicy(SCHED_FIFO, 7);
```

该配置必须在 Binder 对象被发送到其他进程之前完成。对象被 parcel 后再修改会触发致命检查。NDK 平台接口对应 `AIBinder_setMinSchedulerPolicy()`。

### 2. 允许 RT 优先级继承

```cpp
service->setInheritRt(true);
```

`setInheritRt(true)` 只控制 `SCHED_FIFO`/`SCHED_RR` 是否可以从同步调用者继承，不影响普通 `SCHED_NORMAL` 优先级的继承。它最终被编码为 `FLAT_BINDER_FLAG_INHERIT_RT`：[Parcel.cpp:321](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/binder/Parcel.cpp#L321)、[binder.h:85](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/include/uapi/linux/android/binder.h#L85)。

Java 层提供了隐藏 API `Binder.setInheritRt()`：[Binder.java:1294](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/os/Binder.java#L1294)。

### 3. 全局 RT 继承

libbinder 默认关闭全局 RT 继承，`BBinder::setGlobalInheritRt(true)` 可以设置进程级默认值。该默认值应尽早设置，因为 Binder 对象发送出去后，其 flags 已经固定。

Android 16 的 system_server 只有在 feature flag 和系统属性同时开启时才启用它：[SystemServer.java:1027](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/services/java/com/android/server/SystemServer.java#L1027)。

### 4. 关闭默认后台调度

当 Binder 对象被 flatten 时，如果没有调用 `disableBackgroundScheduling(true)`，libbinder 默认会给 node 编码 `SCHED_NORMAL/nice 19` 的调度配置：[Parcel.cpp:283](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/binder/Parcel.cpp#L283)。这就是“Binder 线程默认较低优先级”的主要来源之一。

system_server 启动时显式关闭该默认行为，确保进入 system_server 的 Binder 调用使用前台优先级：[SystemServer.java:928](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/services/java/com/android/server/SystemServer.java#L928)。Native/NDK 对应 `IPCThreadState::disableBackgroundScheduling()` 和 `ABinderProcess_disableBackgroundScheduling()`。

## 五、事务结束后的恢复

设置 B 线程优先级前，驱动会保存其原来的策略和优先级到事务对象：[binder.c:848](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L848)。

同步 reply 返回、事务失败或目标线程死亡时，驱动调用 `binder_restore_priority()` 恢复原值：[binder.c:4001](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L4001)。Binder 线程重新进入等待进程队列工作时，也会恢复到进程默认优先级：[binder.c:5024](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L5024)。

### 嵌套同步调用

如果 B 在处理 A 的请求期间，又同步调用 C，那么 B 当前 Binder 线程此时已经带有 A 的优先级。C 的事务会以 B 当前线程的优先级作为调用者优先级，因此优先级可以沿着同步调用链继续传递。

驱动通过 `prio_state`、`prio_next` 和事务的 `saved_priority` 处理嵌套调用，避免 C 返回时错误覆盖 B 仍在处理 A 请求所需的优先级。

## 六、同步与异步事务的区别

| 项目 | 同步事务 | 异步事务（one-way） |
|---|---|---|
| 标志 | 未设置 `TF_ONE_WAY` | 设置 `TF_ONE_WAY` |
| 调用者等待 reply | 是 | 否 |
| 是否继承调用线程优先级 | 是，前提是策略受支持 | 否 |
| 优先级来源 | 调用线程 + node 最低优先级 | 目标进程默认优先级 + node 配置 |
| 是否在结束后恢复 | 是 | 不发生调用者优先级捐赠 |

## 七、如何验证和调试

优先级调整是事务处理期间的短暂状态，事务结束后 `/proc` 中通常看不到变化。建议使用 Binder tracepoint：

```sh
adb shell 'echo 1 > /sys/kernel/tracing/events/binder/binder_set_priority/enable'
adb shell 'cat /sys/kernel/tracing/trace_pipe'
```

`binder_set_priority` 事件会记录：

- Binder 进程和线程 ID；
- 调整前优先级 `old_prio`；
- 实际设置值 `new_prio`；
- 计算出的目标值 `desired_prio`。

tracepoint 定义见 [binder_trace.h:79](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder_trace.h#L79)。测试时应同时记录事务是否为 `TF_ONE_WAY`、调用线程的调度策略、目标 Binder node 是否设置 `inherit_rt`，以及 B 线程的 `RLIMIT_RTPRIO/RLIMIT_NICE`。

## 八、源码索引

| 层次 | 关键位置 | 作用 |
|---|---|---|
| libbinder | [BpBinder.cpp:394](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/binder/BpBinder.cpp#L394) | Proxy 发起事务 |
| libbinder | [IPCThreadState.cpp:919](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/binder/IPCThreadState.cpp#L919) | 写入 `BC_TRANSACTION` 并等待同步 reply |
| libbinder | [Parcel.cpp:283](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/binder/Parcel.cpp#L283) | 编码 node 的调度配置 |
| libbinder | [Binder.cpp:605](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/binder/Binder.cpp#L605) | 设置 node 最低调度策略 |
| 内核驱动 | [binder.c:3575](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L3575) | 保存同步调用者优先级 |
| 内核驱动 | [binder.c:812](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L812) | 计算并设置目标线程优先级 |
| 内核驱动 | [binder.c:4001](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder.c#L4001) | reply 后恢复优先级 |

Android 16 的 `kernel/common` 还包含一份可选的 Rust Binder 实现；其 `transaction.rs` 中的 `on_thread_selected()` 实现了同样的优先级决策：[transaction.rs:582](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder/transaction.rs#L582)。Kconfig 说明默认使用 C 实现，只有通过 `binder.impl=rust` 才选择 Rust 实现：[Kconfig:4](https://android.googlesource.com/kernel/common/+/refs/heads/android16-6.12/drivers/android/binder/Kconfig#L4)。

## 九、结论

Android Binder 的同步优先级机制可以概括为：

1. 内核从同步调用者线程读取调度策略和优先级；
2. 事务送达目标 Binder 线程前，计算调用者优先级与 node 最低优先级的较高者；
3. RT 策略只有在目标 node 允许时才继承；
4. 权限和 rlimit 会限制最终可设置的值；
5. reply 或错误返回后恢复目标线程原来的优先级；
6. 嵌套同步调用可以沿调用链继续传递优先级。

因此，用户看到的“高优先级 A 调用低优先级 B 时，B 临时变成高优先级”确实存在，但准确名称和语义是 Binder 的同步事务优先级继承/捐赠，而不是 proxy/stub 对象之间永久复制优先级。
