---
title: Android Binder 深入理解：Proxy、Stub 与 Binder 线程到底是什么关系
description: 从 AIDL 和 PackageManager 调用链理解 Proxy、Stub、Binder 驱动与 Binder 线程池之间的关系。
date: 2026-08-28
outline: deep
---

# Android Binder 深入理解：Proxy、Stub 与 Binder 线程到底是什么关系

Binder 是 Android 最核心的进程间通信（IPC）机制之一。很多 Android API 看起来像普通的 Java 方法调用，实际上背后可能跨越了应用进程、`system_server` 和 Binder 内核驱动。

初学时最容易混淆的几个概念是：

- `Proxy` 是不是一个线程？
- Binder 线程是不是属于 `Proxy`？
- 服务端的方法到底在哪个线程执行？
- `Stub` 和真正的业务实现是什么关系？
- 同进程调用和跨进程调用有什么不同？

本文以 AIDL 生成代码和 AOSP PackageManager 为例，把这条调用链拆开说明。

## 一、先给出结论

跨进程 Binder 调用通常遵循下面的路径：

```text
客户端调用线程
    |
    | Proxy.someMethod()
    v
Binder 驱动
    |
    | 将事务投递给服务端进程
    v
服务端 Binder 线程
    |
    | Stub.onTransact()
    v
服务端 Stub 的业务实现
```

更准确地说：

> `Proxy` 是客户端侧的代理对象，通常运行在发起调用的线程中；Binder 线程是接收事务的服务端进程中的工作线程；服务端 Binder 线程通过 `Stub.onTransact()` 分发请求，最终执行 Stub 实现的方法。

因此，“Binder 线程属于 Proxy”这个说法是不准确的。Binder 线程属于接收请求的进程，而不是属于 `Proxy` 或 `Stub` 对象。

## 二、Binder 不是一个线程，而是一套 IPC 机制

Binder 这个词在 Android 中通常同时指三层东西：

```text
Java/Kotlin API 层       Binder、IBinder、BinderProxy、AIDL Stub
Native 层                libbinder、IPCThreadState
内核层                  binder 驱动
```

Binder 本身不是一个线程，也不是一个 Java 类。它是一套由用户空间对象、内核驱动和线程调度共同组成的通信机制。

一个进程如果需要接收 Binder 请求，通常会启动若干线程进入 Binder 驱动等待事务。这些线程被称为 Binder 线程，多个线程共同组成 Binder 线程池。

## 三、AIDL 生成的 Proxy 和 Stub

假设定义如下 AIDL 接口：

```java
interface IExampleService {
    int add(int a, int b);
}
```

编译 AIDL 后，概念上会得到两类对象：

```java
// 客户端侧：代理远程对象
IExampleService proxy;

// 服务端侧：Binder 存根和具体实现的基类
IExampleService.Stub stub;
```

### 3.1 Proxy 做什么

客户端调用：

```java
int result = proxy.add(1, 2);
```

`Proxy.add()` 通常会完成以下工作：

1. 创建请求 `Parcel`。
2. 写入接口描述符和参数。
3. 调用 `IBinder.transact()`。
4. 等待服务端返回结果（普通 Binder 调用是同步的）。
5. 从返回 `Parcel` 中读取返回值。

Proxy 不负责执行业务逻辑。它只是把一次 Java 方法调用编码成 Binder 事务。

Proxy 方法通常运行在调用方线程。例如应用主线程调用 `proxy.add()`，打包和发起 IPC 的动作就发生在应用主线程。

### 3.2 Stub 做什么

服务端的 Stub 通常继承 `Binder`，并实现 `onTransact()`：

```java
public abstract static class Stub extends Binder
        implements IExampleService {
    @Override
    public boolean onTransact(int code, Parcel data, Parcel reply,
            int flags) throws RemoteException {
        // 校验接口描述符、读取参数、分发到 add()
        ...
    }
}
```

`onTransact()` 是 Binder 框架的分发入口。它根据事务码读取参数，然后调用服务端真正实现的 `add()` 方法。

```java
private final IExampleService.Stub binder =
        new IExampleService.Stub() {
    @Override
    public int add(int a, int b) {
        return a + b;
    }
};
```

这里的 Stub 不是“线程”。它是一个 Binder 对象和请求分发器。真正执行 `add()` 的线程，是服务端进程中从 Binder 驱动取出事务的 Binder 线程。

## 四、一次跨进程调用的完整过程

以应用调用 `PackageManager` 为例：

```java
ApplicationInfo info = context.getPackageManager()
        .getApplicationInfo(packageName, 0);
```

抽象后的调用链如下：

```text
App 主线程
  |
  | ApplicationPackageManager.getApplicationInfo()
  v
IPackageManager.Proxy.getApplicationInfo()
  |
  | Parcel + transact()
  v
Binder 驱动
  |
  v
system_server 的 Binder 线程
  |
  | IPackageManager.Stub.onTransact()
  v
PackageManagerService 的实现方法
  |
  v
返回 ApplicationInfo
```

在 AOSP 中，PackageManagerService 启动时会扫描系统分区和数据分区，并把服务注册到 ServiceManager。应用进程通过 Binder 获取远程接口，拿到的通常是一个 `BinderProxy`。

`PackageManagerService` 的 Binder 方法可能被多个 Binder 线程同时调用，因此服务端不能假设这些方法总是在某一个固定线程执行。共享状态通常需要使用锁、线程安全容器或切换到服务自己的 Handler 线程。

## 五、Binder 线程到底在哪里

### 5.1 服务端的 Binder 线程

服务端进程会有一个 Binder 线程池。线程从 Binder 驱动读取事务后，调用对应 Binder 对象的 `onTransact()`。

例如 `system_server` 中可能同时存在多个 Binder 工作线程：

```text
system_server
├── system_server 主线程
├── 各种 Handler/HandlerThread
├── Binder:xxx_1
├── Binder:xxx_2
└── Binder:xxx_3
```

`PackageManagerService`、`ActivityManagerService` 等服务的远程入口，通常就在这些 Binder 线程上被调用。

### 5.2 客户端的 Binder 线程

客户端进程也可能拥有 Binder 线程。典型场景是：

- 系统服务回调应用传入的 AIDL callback。
- 另一个进程主动调用应用暴露的 Binder 接口。
- 应用自身注册了 Binder 服务或 Binder 接口。

例如应用注册 callback 后，系统服务发起回调：

```text
system_server Binder 线程
    -> callback.Proxy.onChanged()
    -> Binder 驱动
    -> App Binder 线程
    -> callback.Stub.onTransact()
    -> App callback.onChanged()
```

所以应用的 AIDL callback 默认也不在主线程执行：

```java
@Override
public void onChanged(int value) {
    // 通常运行在 App 的 Binder 线程，不要直接更新 UI
    mainHandler.post(() -> updateUi(value));
}
```

## 六、同进程时可能没有 Proxy，也没有 Binder 线程

Binder 接口并不一定每次都跨进程。

`Stub.asInterface(IBinder obj)` 通常会先尝试查询本地接口：

```java
IExampleService local = obj.queryLocalInterface(DESCRIPTOR);
if (local != null) {
    return (IExampleService) local;
}
return new IExampleService.Stub.Proxy(obj);
```

如果调用方和 Stub 在同一个进程，`queryLocalInterface()` 可能直接返回 Stub 本身：

```text
调用线程 -> Stub.add()
```

此时没有 `BinderProxy`，不经过 Binder 驱动，也不需要 Binder 线程，基本就是普通的进程内方法调用。

只有在两个对象位于不同进程时，才通常出现：

```text
调用线程 -> BinderProxy -> Binder 驱动 -> Binder 线程 -> Stub
```

这也是为什么测试环境和真实设备上的线程表现有时不同：测试可能把服务和客户端放在同一个进程。

## 七、普通调用、oneway 调用和线程阻塞

### 7.1 普通 Binder 方法是同步的

普通 AIDL 方法调用大致是：

```text
客户端线程发起请求
    ↓
客户端线程等待
    ↓
服务端 Binder 线程处理
    ↓
返回结果
    ↓
客户端线程继续执行
```

因此不应在应用主线程中频繁调用可能耗时的系统服务接口。如果服务端执行磁盘、锁等待或复杂计算，客户端主线程就可能被阻塞，最终造成卡顿甚至 ANR。

### 7.2 `oneway` 只是异步发送

AIDL 可以声明：

```java
oneway interface IExampleCallback {
    void onChanged(int value);
}
```

调用方通常不会等待服务端执行完成，但服务端仍然需要 Binder 线程取出并处理请求。

`oneway` 不等于：

- 不需要线程；
- 方法立即执行；
- 方法一定按调用方期望的线程执行；
- 可以忽略并发和队列堆积。

## 八、调用身份：Binder 线程知道谁发起了请求

服务端处理 Binder 请求时，可以查询调用方身份：

```java
int uid = Binder.getCallingUid();
int pid = Binder.getCallingPid();
```

系统服务经常用它做权限检查：

```java
if (Binder.getCallingUid() != Process.SYSTEM_UID) {
    throw new SecurityException("caller is not system");
}
```

如果服务端需要调用本地文件或其他服务，并且不希望继承调用方身份，可以临时清除调用身份：

```java
long token = Binder.clearCallingIdentity();
try {
    // 这里使用当前服务进程自身身份
} finally {
    Binder.restoreCallingIdentity(token);
}
```

这一点很重要：Binder 线程虽然属于服务端进程，但在进入服务方法时仍然携带远程调用者的 UID/PID 信息。

## 九、常见误区

### 误区 1：Proxy 就是 Binder 线程

错误。Proxy 是对象，Binder 线程是线程。Proxy 通常运行在调用者当前线程，服务端 Binder 线程负责接收事务。

### 误区 2：Stub 方法一定运行在主线程

错误。跨进程时，Stub 方法通常运行在服务端 Binder 线程；回调到应用时，callback Stub 方法通常运行在应用 Binder 线程。

### 误区 3：所有 Binder 调用都跨进程

错误。同进程调用可能通过本地接口直接执行，不经过 Binder 驱动。

### 误区 4：Binder 线程只有一个

错误。一个进程可以有多个 Binder 线程，并发处理请求。服务端共享状态必须按并发代码设计。

### 误区 5：`oneway` 方法不需要关注线程

错误。`oneway` 只是调用方不等待返回值，服务端仍然要在线程池中处理事务。

## 十、实际开发中的建议

### 服务端

- 不要在 Binder 入口方法中执行长时间阻塞操作。
- 共享成员变量要考虑多个 Binder 线程并发访问。
- 需要串行化的业务，可以转发到专用 Handler 或线程池。
- 权限检查应使用 `Binder.getCallingUid()` 等调用身份接口。
- 使用 `clearCallingIdentity()` 后必须在 `finally` 中恢复。

### 客户端

- 不要假设 Binder 回调运行在主线程。
- 可能阻塞的同步 Binder 调用不要放在应用主线程。
- 回调对象中只做快速处理，再切换到合适的业务线程。
- 处理 `RemoteException`、服务死亡和重连场景。

## 十一、如何观察 Binder 线程

可以在设备上查看进程线程：

```bash
adb shell ps -T -p <pid>
adb shell cat /proc/<pid>/task/<tid>/comm
```

也可以在代码中打印当前线程：

```java
Log.d(TAG, "thread=" + Thread.currentThread().getName());
```

调试时建议同时记录：

```java
Log.d(TAG, "thread=" + Thread.currentThread().getName()
        + ", uid=" + Binder.getCallingUid()
        + ", pid=" + Binder.getCallingPid());
```

不过要注意：当代码不在 Binder 调用上下文中时，`getCallingUid()` 的含义会不同；如果已经切换到异步 Handler 线程，也不能再把该线程当作原始 Binder 入口线程。

## 总结

Binder 的核心不是“Proxy 调用 Stub 线程”，而是一次跨进程事务的分工：

```text
Proxy：把方法调用变成事务
Binder 驱动：负责跨进程传递事务
Binder 线程：在接收方进程取出并处理事务
Stub：把事务码分发成具体方法调用
业务实现：完成真正的服务逻辑
```

记住下面这句话，基本就不会混淆：

> Proxy 属于调用方，Stub 属于被调用方；Binder 线程属于接收事务的进程，Stub 方法通常由该进程的 Binder 线程执行，但同进程调用可以绕过 Proxy、Binder 驱动和 Binder 线程。

