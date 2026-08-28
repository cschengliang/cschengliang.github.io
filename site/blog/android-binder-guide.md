---
title: Android Binder.java 源码导读
description: 分析 Binder.java 的本地实现、事务入口、调用上下文与 Framework 扩展。
date: 2026-08-28
outline: deep
---

# Android `Binder.java` 源码导读：本地实现、事务入口与调用上下文

本文分析：

```text
frameworks/base/core/java/android/os/Binder.java
```

与 `IBinder.java` 的职责不同：

```text
IBinder.java：定义 Binder 对象必须提供的基础协议
Binder.java：提供 Java 侧 Binder 本地对象的标准实现
```

AIDL 生成的 `Stub` 通常继承 `Binder`。系统服务也会通过继承 `Binder` 或继承 AIDL `Stub` 暴露接口。除此之外，Framework 还直接使用 `Binder` 创建没有业务接口的 token，用于标识客户端、会话或资源。

## 一、Binder.java 在 Framework 中做什么

`Binder` 主要承担四类职责：

1. **表示本进程中的 Binder 对象**：保存接口 owner、descriptor 和 native Binder 对象；
2. **接收并分发事务**：把 native 层送入 Java 的事务交给 `onTransact()`；
3. **维护调用上下文**：提供调用方 UID/PID、身份切换、WorkSource 和 StrictMode 传播；
4. **提供 Framework 级扩展点**：支持 dump、shell command、事务观测、阻塞告警和 Binder 稳定性配置。

它本身不是一个具体系统服务，也不负责线程池的业务调度。Binder 线程由 native Binder 机制进入 Java 的 `execTransact()`，之后才由 `Binder` 把请求交给子类实现。

## 二、对象创建：业务 Stub 和裸 Binder token

### 2.1 AIDL Stub 继承 Binder

典型 AIDL 生成结构如下：

```java
public abstract static class Stub extends Binder
        implements IExampleService {
    public Stub() {
        attachInterface(this, DESCRIPTOR);
    }

    @Override
    public IInterface queryLocalInterface(String descriptor) {
        return super.queryLocalInterface(descriptor);
    }
}
```

`attachInterface()` 把两个信息保存到 `Binder`：

```java
public void attachInterface(IInterface owner, String descriptor) {
    mOwner = owner;
    mDescriptor = descriptor;
}
```

这样，后续 `queryLocalInterface(DESCRIPTOR)` 可以返回本地的 AIDL 实现。

### 2.2 创建裸 Binder 作为 token

`Binder` 也可以不绑定 `IInterface`，只作为一个可跨进程传递的身份对象：

```java
Binder sessionToken = new Binder("MySession");
```

`Binder(String descriptor)` 中的 descriptor 对裸 token 不是业务接口名，而是帮助调试和识别远程引用的标签。Framework 中常把这样的 token 传给系统服务，服务端再用它关联会话或注册死亡监听。

需要注意 Binder 对象的生命周期：它只在创建它的进程存活期间有效。进程被杀死后，重新启动进程时必须重新创建并重新注册 Binder 对象。

## 三、本地接口查询：`attachInterface()` 和 `queryLocalInterface()`

`Binder` 对 `IBinder.queryLocalInterface()` 的默认实现是：descriptor 匹配时返回 `mOwner`，否则返回 `null`：

```java
public IInterface queryLocalInterface(String descriptor) {
    if (mDescriptor != null && mDescriptor.equals(descriptor)) {
        return mOwner;
    }
    return null;
}
```

AIDL `Stub.asInterface()` 正是利用这一点区分本地和远程对象：

```text
obj.asInterface()
    -> obj.queryLocalInterface(DESCRIPTOR)
       -> 有本地实现：直接返回 Stub
       -> 没有本地实现：创建 Proxy
```

因此，继承 `Binder` 不仅是为了获得 `transact()`，也是为了提供标准的本地接口识别机制。Framework 代码使用同一个 AIDL 接口时，调用是否跨进程取决于实际拿到的 Binder 对象，而不是接口变量的声明类型。

## 四、事务进入 Java 的入口：`execTransact()`

Binder.java 中连接 native Binder 和 Java 实现的关键方法是：

```java
private boolean execTransact(int code, long dataObj, long replyObj,
        int flags)
```

它由 `android_util_Binder.cpp` 进入。主要工作可以概括为：

```java
Parcel data = Parcel.obtain(dataObj);
Parcel reply = Parcel.obtain(replyObj);
try {
    return execTransactInternal(code, data, reply, flags, callingUid);
} finally {
    reply.recycle();
    data.recycle();
}
```

这里有几个源码阅读重点：

- native 层传入的是 Parcel 的 native 对象句柄；
- Java 层将它们包装成 `Parcel`；
- 事务处理完成后，无论成功还是异常都要回收 Parcel；
- 事务进入时还会初始化 WorkSource 等调用上下文。

调用链可以简化为：

```text
native Binder 线程
    -> Binder.execTransact()
    -> Binder.execTransactInternal()
    -> Binder.onTransact()
    -> AIDL Stub 或 Binder 子类实现
```

## 五、`execTransactInternal()`：真正的事务处理框架

`execTransactInternal()` 没有再次调用公开的 `transact()`，而是直接调用 `onTransact()`。源码注释解释了原因：收到的 Parcel 已经处于正确的读取状态，再调用 `transact()` 只会额外 rewind Parcel。

核心逻辑可以抽象成：

```java
try {
    res = onTransact(code, data, reply, flags);
} catch (RemoteException | RuntimeException e) {
    if ((flags & FLAG_ONEWAY) != 0) {
        onUnhandledException(code, flags, e);
    } else {
        reply.setDataSize(0);
        reply.setDataPosition(0);
        reply.writeException(e);
    }
}
```

因此 `Binder` 不只是一个空壳基类，它在所有 Java Binder 子类前面统一处理了：

- 事务观测；
- AIDL trace；
- heavy hitter 统计；
- AppOps 采集；
- 异常传递；
- StrictMode 清理；
- 返回 Parcel 大小检查。

### 5.1 同步事务异常

普通同步调用有 `reply`，服务端异常可以写回 Parcel：

```text
服务端 onTransact() 抛出异常
    -> reply.writeException(e)
    -> 客户端 Proxy 读取并重新抛出
```

### 5.2 `oneway` 事务异常

`oneway` 没有等待返回值的同步 reply，服务端异常无法正常交给调用方。`Binder` 会记录异常并调用 `onUnhandledException()`，因此不能把 `oneway` 当成“异常也能自动返回”的异步 RPC。

## 六、默认 `onTransact()` 处理的系统协议

`Binder.onTransact()` 的默认实现并不处理业务事务，但会处理几个通用协议：

```java
protected boolean onTransact(int code, Parcel data, Parcel reply, int flags)
        throws RemoteException
```

### 6.1 `INTERFACE_TRANSACTION`

默认实现返回 `getInterfaceDescriptor()`：

```java
if (code == INTERFACE_TRANSACTION) {
    reply.writeString(getInterfaceDescriptor());
    return true;
}
```

这为 AIDL 和手写 Binder 协议提供接口识别能力。子类通常调用 `super.onTransact()`，让这些通用事务继续有效。

### 6.2 `DUMP_TRANSACTION`

默认实现从 Parcel 取出文件描述符和参数，然后调用：

```java
dump(fd.getFileDescriptor(), args);
```

这使得系统服务只需要覆盖 `dump(FileDescriptor, PrintWriter, String[])`，就能接入 `dumpsys` 的远程状态导出机制。

### 6.3 `SHELL_COMMAND_TRANSACTION`

默认实现读取输入、输出、错误文件描述符和命令参数，然后调用 `shellCommand()`。进一步的默认处理会检查调用 UID，只允许 root 或 shell 调用，并最终进入 `handleShellCommand()`。

因此，`Binder` 的默认 `onTransact()` 是一个通用协议分发器：系统调试协议由基类处理，业务事务则继续返回 `false`，交给 AIDL 生成的 `Stub` 或子类处理。

## 七、`dump()`：系统服务如何接入调试框架

`Binder` 提供两层 dump 方法：

```java
public void dump(FileDescriptor fd, String[] args)
protected void dump(FileDescriptor fd, PrintWriter fout, String[] args)
```

前者负责创建 `FastPrintWriter`、调用后者并刷新输出；系统服务通常覆盖后者：

```java
@Override
protected void dump(FileDescriptor fd, PrintWriter pw, String[] args) {
    pw.println("active sessions=" + mSessions.size());
}
```

`doDump()` 还统一处理两类问题：

- `setDumpDisabled()` 设置后，直接输出禁用原因；
- dump 期间抛出异常时，将异常文本写入 dump 输出，而不是让诊断结果完全丢失。

`dumpAsync()` 的默认实现会启动名为 `Binder.dumpAsync` 的线程调用 `dump()`：

```java
Thread thr = new Thread("Binder.dumpAsync") {
    public void run() {
        try {
            dump(fd, pw, args);
        } finally {
            pw.flush();
        }
    }
};
thr.start();
```

Framework 中的 `TransferPipe` 会使用远程对象的 `asBinder()` 调用这个统一接口。例如打印服务代码中可见：

```java
TransferPipe.dumpAsync(getRemoteInstanceLazy().asBinder(), "--proto");
```

这类代码说明：`dump()` 不属于某个特定 AIDL 业务接口，而是所有 Binder 对象都可以复用的调试协议。

## 八、调用身份：`getCallingUid()` 和 `clearCallingIdentity()`

### 8.1 获取原始调用方身份

`Binder` 通过 native 方法提供：

```java
public static native int getCallingPid();
public static native int getCallingUid();
public static UserHandle getCallingUserHandle();
```

系统服务的 Binder 方法通常在入口处使用 `getCallingUid()` 做权限检查：

```java
int callingUid = Binder.getCallingUid();
if (!callerHasPermission(callingUid)) {
    throw new SecurityException();
}
```

`getCallingPid()` 适合调试，但源码明确提醒 PID 可能被复用，不能作为安全身份。安全判断应使用 UID 和权限机制。

### 8.2 清除 Binder 调用身份

系统服务在处理应用调用时，当前线程带有应用的 Binder calling identity。如果服务随后调用其他本地接口或访问需要身份判断的代码，可能意外继续使用应用身份。

因此 `Binder` 提供：

```java
long token = Binder.clearCallingIdentity();
try {
    // 以当前服务进程身份执行后续操作
} finally {
    Binder.restoreCallingIdentity(token);
}
```

`clearCallingIdentity()` 不是“切换线程”，而是修改当前线程的 Binder 调用上下文。`withCleanCallingIdentity()` 是对应的结构化封装：

```java
Binder.withCleanCallingIdentity(() -> {
    // 业务逻辑
});
```

它保证即使 action 抛异常，也会先恢复原始 identity。

### 8.3 Framework 实例

`PrintManagerService`、`VirtualDeviceImpl`、`CredentialManagerService` 等系统服务中都大量使用 `clearCallingIdentity()`。典型目的不是绕过入口权限检查，而是：

1. 先用原始 calling UID 完成权限和参数校验；
2. 清除身份；
3. 以 system_server 自身身份访问系统资源或调用其他本地服务；
4. 在 `finally` 中恢复身份。

这两个阶段不能混淆：过早清除 identity 可能导致权限检查失去原始调用方信息。

## 九、WorkSource：对资源消耗进行调用归因

Binder.java 还维护与 WorkSource 相关的线程上下文：

```java
setCallingWorkSourceUid(int workSource)
getCallingWorkSourceUid()
clearCallingWorkSource()
restoreCallingWorkSource(long token)
```

WorkSource UID 与 `getCallingUid()` 不同：前者表达“谁应当为后续资源消耗负责”，后者表达“当前 Binder 事务的直接调用方”。

源码中的典型使用模式是：

```java
long token = Binder.setCallingWorkSourceUid(uid);
try {
    // 后续 Binder 调用会携带该归因 UID
} finally {
    Binder.restoreCallingWorkSource(token);
}
```

`PropagateWorkSourceTransactListener` 实现了一个 `ProxyTransactListener`，在 system_server 发起 outgoing Binder 调用时，把线程上的 WorkSource 传播出去。这个机制用于跨多层系统服务调用保留资源归因信息。

需要注意，WorkSource 是归因信息，不应当直接当成安全身份使用。`IBinder.java` 和 `Binder.java` 都强调，调用方可以影响某些 WorkSource 值；权限判断仍应基于可信的 calling UID。

## 十、事务观测、Trace 和阻塞告警

### 10.1 Proxy 侧事务监听

`Binder.ProxyTransactListener` 用于观察本进程发出的代理调用：

```java
public interface ProxyTransactListener {
    Object onTransactStarted(IBinder binder, int transactionCode, int flags);
    void onTransactEnded(Object session);
}
```

通过 `Binder.setProxyTransactListener()` 设置后，监听器会处于 Binder 调用关键路径，因此源码要求：

- 监听器必须足够快；
- 需要自行处理并发；
- 不要在监听器中再次发起 Binder 调用；
- 不能把它实现成耗时日志系统。

`PropagateWorkSourceTransactListener` 就是这个扩展点的实际使用者。

### 10.2 服务端事务观测

`Binder.setObserver()` 设置进程级 observer，`execTransactInternal()` 会在事务开始、抛异常和结束时通知它。当前实现还会记录：

- 调用对象；
- 事务码；
- 请求和回复大小；
- WorkSource UID；
- 异常信息。

同时，`getTransactionName()` 允许 AIDL 生成代码提供可读的方法名，`getTransactionTraceName()` 将其组织成 AIDL trace 名称，便于 Perfetto 或系统 trace 分析具体调用。

### 10.3 Heavy hitter 统计

`setHeavyHitterWatcherConfig()` 配置 `BinderCallHeavyHitterWatcher`，用于发现高频或高占用的 Binder 调用。它解决的是“哪些事务是系统中的主要 Binder 调用热点”，而不是普通业务逻辑中的功能需求。

### 10.4 阻塞调用告警

`setWarnOnBlocking()` 可以开启 outgoing 同步 Binder 调用告警。`allowBlocking()`、`defaultBlocking()` 和线程级 API 用于对特定 Binder 或当前线程调整策略。

源码注释特别强调，`allowBlocking()` 只适用于确定可靠、不会被替换或升级的内建系统接口。对于外部可升级组件，允许同步阻塞调用可能把远程卡死传导到 system_server。

## 十一、线程池相关入口

`Binder` 暴露两个与 Binder 线程资源相关的 native 入口：

```java
public static final void joinThreadPool() {
    BinderInternal.joinThreadPool();
}

public static final native void blockUntilThreadAvailable();
```

`joinThreadPool()` 让当前线程加入本进程 Binder IPC 线程池，并持续处理事务。它通常用于 native/底层 Binder 服务的进程初始化，不是普通 Binder 方法中启动后台线程的替代品。

`blockUntilThreadAvailable()` 用于在 Binder 线程资源紧张时等待可用线程，属于 Framework 内部的并发控制能力。

## 十二、Binder 扩展与稳定性配置

### 12.1 Binder extension

`Binder` 用成员变量保存扩展 Binder：

```java
public final IBinder getExtension() {
    return mExtension;
}

public final void setExtension(IBinder extension) {
    mExtension = extension;
    setExtensionNative(extension);
}
```

`setExtension()` 应在 Binder 对象创建后尽早调用，因为 native Binder 节点需要同步保存这个扩展关系。调用方通过 `getExtension()` 探测可选能力。

### 12.2 稳定性和实时优先级

以下方法面向系统或生成代码：

```java
markVintfStability();
forceDowngradeToSystemStability();
setInheritRt(boolean);
setGlobalInheritRt(boolean);
```

它们分别涉及 Binder 接口的 VINTF 稳定性承诺，以及 Binder 事务是否继承实时优先级。文档阅读时应把它们理解为“发送 Binder 对象前配置其协议/调度属性”，而不是普通 Java 对象的成员设置。

## 十三、实际代码中的典型模式

### 模式一：AIDL Stub 覆盖业务事务

```java
public final class MyService extends IMyService.Stub {
    @Override
    public void doWork() {
        final int uid = Binder.getCallingUid();
        enforcePermission(uid);
        Binder.withCleanCallingIdentity(() -> performSystemOperation());
    }
}
```

这里 `Stub` 负责业务事务分发，`Binder` 负责提供调用身份和身份清理能力。

### 模式二：使用裸 Binder 作为客户端 token

```java
final IBinder token = new Binder("MySession");
registerSession(token);
```

服务端可以以 token 为 key 管理会话，并通过 `linkToDeath()` 在客户端进程退出时移除会话。

### 模式三：服务状态导出

```java
@Override
protected void dump(FileDescriptor fd, PrintWriter pw, String[] args) {
    Binder.withCleanCallingIdentity(() -> {
        pw.println("sessions=" + mSessions.size());
    });
}
```

服务可以复用 Binder 默认的 `DUMP_TRANSACTION`，无需在 AIDL 接口中额外增加 dump 方法。

### 模式四：共享死亡监听

`BinderDeathDispatcher` 在 `IBinder.linkToDeath()` 之上建立多 recipient 分发层，适用于多个模块共同关注同一客户端 Binder 的场景。它体现了 Framework 常见的做法：保留 `Binder` 的底层生命周期能力，再封装出更符合业务管理方式的组件。

## 十四、阅读 Binder.java 的建议顺序

阅读这份源码时，建议按以下顺序：

1. 先看类注释，明确 `Binder` 是本地实现基类，不是完整的服务生命周期管理器；
2. 看构造函数、`attachInterface()` 和 `queryLocalInterface()`，理解对象身份；
3. 看 `execTransact()` 和 `execTransactInternal()`，确认 native 到 Java 的入口；
4. 看默认 `onTransact()`，了解接口查询、dump 和 shell 协议；
5. 看 `getCallingUid()`、`clearCallingIdentity()`，理解系统服务权限上下文；
6. 看 WorkSource 和 `ProxyTransactListener`，理解调用归因；
7. 最后看 trace、heavy hitter、阻塞告警和稳定性配置等观测/调度扩展。

不要把所有 native 方法都当作独立功能逐一背诵。更有效的方式是先建立这条主线：

```text
创建 Binder 对象
    -> attachInterface()
    -> native 绑定
    -> execTransact()
    -> execTransactInternal()
    -> onTransact()
    -> 业务 Stub / dump / shell command
    -> 清理 Parcel 和调用上下文
```

## 总结

`Binder.java` 是 Java Framework 中 Binder 本地对象的基础实现。它的核心价值不只是“让 AIDL 能调用”，还包括：

- 保存本地 Binder 对象和接口身份；
- 将 native 事务分发给 Java `onTransact()`；
- 统一处理 Binder 异常、Trace、观测和 StrictMode；
- 提供系统服务使用的 UID/PID 和 calling identity 管理；
- 支持 WorkSource 归因、dump、shell command 和阻塞调用控制；
- 为 Binder extension、稳定性和实时优先级提供配置入口。

可以用下面的关系概括它：

```text
IBinder：定义对象协议
Binder：实现本地对象和 Java 事务入口
BinderProxy：代表远程对象
AIDL Stub：继承 Binder 并分发业务事务
execTransactInternal()：连接 native Binder 与 Java 业务实现
```
