---
title: Android 触摸事件：从 InputDispatcher 到 View 点击回调
description: 梳理 Android AOSP16 中触摸事件从 InputDispatcher 到 View 点击回调的完整链路。
date: 2026-08-30
outline: deep
---

# Android 触摸事件：从 InputDispatcher 到 View 点击回调

本文基于当前 AOSP16 源码，整理一次触摸如何从系统输入分发进入应用主线程，最终触发 `Button` 的 `OnClickListener`。重点关注：

```text
InputDispatcher
    -> InputChannel
    -> 应用主线程 Looper
    -> ViewRootImpl
    -> View 树
    -> Button.onClick
```

同时说明多窗口触摸目标选择、`WATCH_OUTSIDE_TOUCH`、spy window 和系统全局手势的关系。

## 1. 先建立整体认识

一次普通单指点击的核心链路如下：

```text
触摸屏事件
    |
    v
InputReader / InputDispatcher
    |
    | ACTION_DOWN：按 Z 顺序和触摸区域选择目标窗口 A
    | 生成 InputTarget，并保存到 TouchState
    v
InputDispatcher 持有的 InputChannel 端点
    |
    | Unix domain socket：发送 InputMessage
    v
应用持有的 InputChannel 端点
    |
    | fd 可读，唤醒应用主线程 Looper
    v
NativeInputEventReceiver / InputConsumer
    |
    | JNI 回调 dispatchInputEvent()
    v
WindowInputEventReceiver
    |
    v
ViewRootImpl 输入阶段链
    |
    v
DecorView / ViewGroup.dispatchTouchEvent()
    |
    v
Button.dispatchTouchEvent() -> Button.onTouchEvent()
    |
    | ACTION_UP 满足点击条件
    v
View.performClick()
    |
    v
OnClickListener.onClick(button)
```

需要先记住四个结论：

1. `InputChannel` 通常属于窗口，不属于某个 `Button`。
2. 每个可接收输入的窗口通常有自己的 `InputChannel`，并不是只有焦点窗口才有。
3. 触摸事件根据坐标和窗口层级命中；键盘等非 pointer 事件主要根据焦点窗口分发。
4. 窗口 A 返回 `handled=false`，不会让 InputDispatcher 再把同一触摸事件尝试发送给 B、C。

## 2. 窗口添加时怎样得到 InputChannel

### 2.1 应用先创建一个空的 Java InputChannel

`ViewRootImpl.setView()` 准备向 WindowManagerService 添加窗口时，会先创建一个未初始化的 `InputChannel`：

```java
InputChannel inputChannel = null;
if ((mWindowAttributes.inputFeatures
        & WindowManager.LayoutParams.INPUT_FEATURE_NO_INPUT_CHANNEL) == 0) {
    inputChannel = new InputChannel();
}
```

源码位置：[`ViewRootImpl.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/ViewRootImpl.java)，当前快照约第 1600 行。

随后通过 Binder 调用：

```java
mWindowSession.addToDisplayAsUser(..., inputChannel, addResult);
```

在 AIDL 中，`InputChannel` 是 `out` 参数：

```aidl
int addToDisplayAsUser(...,
        out InputChannel outInputChannel,
        out WindowRelayoutResult result);
```

源码位置：[`IWindowSession.aidl`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/IWindowSession.aidl)。

### 2.2 WMS 请求 InputDispatcher 创建通道

标准窗口添加到 WMS 后，`WindowManagerService.addWindow()` 调用：

```java
win.openInputChannel(outInputChannel);
```

`WindowState.openInputChannel()` 的关键代码是：

```java
InputChannel channel = mWmService.mInputManager.createInputChannel(name);
mInputChannelToken = channel.getToken();
mInputWindowHandle.setToken(mInputChannelToken);
mWmService.mInputToWindowMap.put(mInputChannelToken, this);
channel.copyTo(outInputChannel);
channel.dispose();
```

源码位置：[`WindowState.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/services/core/java/com/android/server/wm/WindowState.java)，当前快照约第 2601 行。

最终 native `InputDispatcher::createInputChannel()` 创建一对连接端点：

```cpp
std::unique_ptr<InputChannel> serverChannel;
std::unique_ptr<InputChannel> clientChannel;
InputChannel::openInputChannelPair(name, serverChannel, clientChannel);

mConnectionManager.createConnection(std::move(serverChannel), ...);
return clientChannel;
```

源码位置：[`InputDispatcher.cpp`](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/services/inputflinger/dispatcher/InputDispatcher.cpp)，当前快照约第 6260 行。

最终所有权可以画成：

```text
InputDispatcher 进程侧
    server InputChannel
    fd = socketpair[0]
          ^
          | 内核 Unix socket 缓冲区，双向
          v
应用进程侧
    client InputChannel
    fd = socketpair[1]
```

WMS 主要负责组织窗口、请求创建通道、保存 token 与窗口的关联，并把 client 端通过 Binder 返回应用；后续每个触摸事件并不通过 Binder 传输。

## 3. InputChannel 到底是什么

### 3.1 native 本质：Unix domain `SOCK_SEQPACKET` socketpair

native 实现调用：

```cpp
socketpair(AF_UNIX, SOCK_SEQPACKET, 0, sockets)
```

源码位置：[`InputTransport.cpp`](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/input/InputTransport.cpp)，当前快照约第 358 行。

它具有以下特点：

- `AF_UNIX`：只在本机内核中通信，不经过 IP 网络。
- `socketpair()`：一次直接创建两个已经连通的 fd，不需要 `bind/listen/accept/connect`。
- `SOCK_SEQPACKET`：可靠、有序，并保留消息边界，适合发送一条条 `InputMessage`。
- 两端本质对等且全双工；“server/client”只是 Android 对发布者和消费者角色的命名。
- InputDispatcher 通常从 server 端发送输入事件，应用从 client 端读取。
- 应用处理完成后，通过同一对 socket 反向发送 `FINISHED(seq, handled)`。

### 3.2 与普通 TCP/IP socket 的区别

| 对比项 | InputChannel 使用的 Unix socketpair | TCP/IP socket |
|---|---|---|
| 通信范围 | 本机进程之间 | 本机或跨网络主机 |
| 地址 | 本例不需要路径、IP、端口 | IP 地址和端口 |
| 建立连接 | `socketpair()` 一次创建两个已连接端点 | 服务端 `bind/listen/accept`，客户端 `connect` |
| socket 类型 | `SOCK_SEQPACKET` | 常见为 `SOCK_STREAM` |
| 消息边界 | 保留 | TCP 是字节流，不保留应用消息边界 |
| fd 跨进程交付 | 通过 Binder/Parcel 传递 fd | 通常通过网络连接建立 |
| 角色关系 | 两端能力对等，server/client 是用途命名 | 有明确的监听端和主动连接端 |

因此这里并没有传统网络意义上的“监听端口服务端”。系统一次创建两个端点，把一端留给 InputDispatcher，另一端交给应用。

### 3.3 InputChannel 内部装的是什么

native `InputChannel` 的关键成员来自 `InputChannelCore`，可概括为：

```text
InputChannel
    name   // 调试名称
    fd     // Unix socket endpoint
    token  // 标识 connection/window 的 Binder token
```

两个端点拥有不同 fd，但共享相同 token。

### 3.4 Java InputChannel.java 的核心职责

[`InputChannel.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/InputChannel.java) 本身不是 Java socket 实现，而是 native 对象的轻量包装器。核心内容有四组。

第一组是 native 指针：

```java
private long mPtr;
```

`mPtr` 指向 JNI 层的 `NativeInputChannel` 包装对象，而不是直接保存 fd：

```cpp
class NativeInputChannel {
    std::shared_ptr<InputChannel> mInputChannel;
};
```

关系是：

```text
Java InputChannel.mPtr
    -> JNI NativeInputChannel
        -> native InputChannel
            -> name + fd + token
```

JNI 实现见 [`android_view_InputChannel.cpp`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/jni/android_view_InputChannel.cpp)。

第二组是创建通道对：

```java
private static native long[] nativeOpenInputChannelPair(String name);
public static InputChannel[] openInputChannelPair(String name);
```

需要注意：标准应用窗口的实际链路通常是 WMS 经 InputManagerService 调到 native `InputDispatcher::createInputChannel()`；Java 的 `openInputChannelPair()` 体现了相同的底层能力，但不是理解标准加窗路径时唯一要看的入口。

第三组是 Binder/Parcel 传递：

```java
nativeReadFromParcel(...)
nativeWriteToParcel(...)
copyTo(...)
dup()
```

Parcel 传递的是通道元数据和 fd 的复制引用。Binder 用于把 client 端交给目标进程，不负责后续逐个传输触摸事件。

第四组是标识与生命周期：

```java
getToken()
getName()
dispose()
```

`token` 用于把 `InputWindowHandle`、InputDispatcher connection 和 InputChannel 对应起来；`dispose()` 释放当前持有的 native 引用，所有引用释放后 fd 才真正关闭。

## 4. InputDispatcher 怎样在 A、B、C 中选择窗口

假设同一显示屏上有三个普通窗口：

```text
A  最上层
B  中间
C  最下层
```

### 4.1 触摸事件不是简单发送给焦点窗口

`dispatchMotionLocked()` 区分 pointer 和非 pointer：

```cpp
if (isPointerEvent) {
    mTouchStates.findTouchedWindowTargets(...);
} else {
    findFocusedWindowTargetLocked(...);
}
```

源码位置：[`InputDispatcher.cpp`](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/services/inputflinger/dispatcher/InputDispatcher.cpp)，当前快照约第 2040 行。

所以：

- 触摸屏、鼠标等 pointer 事件：主要按位置命中窗口。
- 非 pointer motion、按键等：主要走焦点目标逻辑。
- “窗口有 InputChannel”与“窗口当前拥有焦点”是两个概念。

### 4.2 `ACTION_DOWN` 按 Z 顺序命中

新手势开始时，`findTouchedWindowTargets()` 调用：

```cpp
mWindowInfos.findTouchedWindowAt(displayId, x, y, isStylus);
```

`findTouchedWindowAt()` 从前到后遍历窗口：

```cpp
for (const sp<WindowInfoHandle>& windowHandle : windowHandles) {
    const WindowInfo& info = *windowHandle->getInfo();
    if (!info.isSpy() && windowAcceptsTouchAt(info, displayId, x, y, isStylus)) {
        return windowHandle;
    }
}
```

源码位置：[`InputDispatcher.cpp`](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/services/inputflinger/dispatcher/InputDispatcher.cpp)，当前快照约第 1408 行。

这不是先把事件发给 A，再等 A 返回是否消费。它是在发送前完成命中：

```text
检查 A
    可接受 -> 立即选 A，普通窗口查找结束
    不可接受 -> 跳过 A，检查 B

检查 B
    可接受 -> 选 B
    不可接受 -> 检查 C
```

### 4.3 什么叫“窗口可接受这个触摸点”

`windowAcceptsTouchAt()` 主要检查：

```cpp
窗口是否属于目标 display
窗口是否可见
窗口是否设置 NOT_TOUCHABLE
坐标是否位于 touchableRegion
```

关键代码：

```cpp
if (inputConfig.test(WindowInfo::InputConfig::NOT_TOUCHABLE)) {
    return false;
}

if (!touchableRegion.contains(...)) {
    return false;
}
```

源码位置：[`InputDispatcher.cpp`](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/services/inputflinger/dispatcher/InputDispatcher.cpp)，当前快照约第 5283 行。

因此下面两种情况，普通 `ACTION_DOWN` 根本不会写入 A 的 InputChannel：

- A 设置为 `NOT_TOUCHABLE`。
- 触摸点不在 A 的 `touchableRegion`。

这是 InputDispatcher 在发送前跳过 A，不是 A 的 View 树收到后主动放弃。命中算法会继续检查下面的 B、C。

### 4.4 InputTarget 决定实际发送给哪些通道

命中 A 后，本次事件的普通前台目标可简化为：

```text
InputTarget = [A]
```

`dispatchEventLocked()` 只遍历已经生成的 `inputTargets`：

```cpp
for (const InputTarget& inputTarget : inputTargets) {
    prepareDispatchCycleLocked(..., inputTarget);
}
```

`prepareDispatchCycleLocked()` 再把事件放入对应 connection 的队列，最终由该 connection 的 InputChannel 发送。

所以 B、C 不是“事件发过去后被拦住”，而是根本没有成为这次普通单指触摸的 foreground `InputTarget`。

### 4.5 TouchState 把整条手势锁定给 A

在 `ACTION_DOWN` 阶段选中 A 后，InputDispatcher 把窗口与 pointer 的关系加入临时 `TouchState`，函数结束前调用：

```cpp
saveTouchStateForMotionEntry(entry, std::move(tempTouchState));
```

状态可以抽象为：

```text
display X / device Y
    pointerId 0 -> window A
```

后续 `MOVE/UP/CANCEL` 进入已有触摸状态分支：

```cpp
/* Case 2: Pointer move, up, cancel or non-splittable pointer down. */
```

这些事件通常继续使用已经保存的 A，不会每次移动都重新按当前位置尝试 B、C。

普通单指序列因此是：

```text
DOWN：命中并锁定 A
MOVE：继续给 A
MOVE：继续给 A
UP：继续给 A，随后结束手势状态
```

特殊的 `SLIPPERY` 窗口、显式触摸转移、窗口移除、spy/pilfer 等机制可能改变这条规则，但它们不是普通窗口的消费兜底。

### 4.6 `handled=false` 为什么不转给 B、C

应用处理完成后会返回：

```text
FINISHED(seq, handled)
```

应用侧 `InputEventReceiver.finishInputEvent()` 将确认消息经同一个 socket 反向发回。InputDispatcher 在 `handleReceiveCallback()` 中读取 `Finished`，然后调用：

```cpp
finishDispatchCycleLocked(..., finish.seq, finish.handled, ...);
```

源码位置：[`InputDispatcher.cpp`](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/services/inputflinger/dispatcher/InputDispatcher.cpp)，当前快照约第 3941、4002 行。

这个 `handled` 用于结束分发周期、流量控制、注入结果、响应性和 ANR 等状态处理。它不会重新构建窗口命中列表。

因此：

```text
A 收到事件，View 树返回 false
    -> FINISHED(handled=false)
    -> 完成 A 的 dispatch cycle
    -> 不会 fallback 到 B 或 C
```

### 4.7 多窗口同时收到的合法例外

“普通单指只有一个普通前台目标”不等于任何情况下只能有一个接收方：

- `WATCH_OUTSIDE_TOUCH` 窗口可能额外收到一次 `ACTION_OUTSIDE`。
- spy window 可以与普通目标同时收到完整 pointer 流。
- 壁纸可以按专用规则获得复制事件。
- 多指并启用 split touch 时，不同 pointer 可以分别属于不同普通窗口。
- 输入监视、手写笔拦截、显式触摸转移等还有专用规则。

split touch 的关键点是“不同 pointer 建立不同目标”，不是“A 没消费后把事件发给 B”。

## 5. InputChannel 如何接入应用主线程 Looper

### 5.1 ViewRootImpl 创建 WindowInputEventReceiver

窗口添加成功、client InputChannel 已通过 Binder 回到应用后，`ViewRootImpl` 创建：

```java
mInputEventReceiver = new WindowInputEventReceiver(
        inputChannel,
        Looper.myLooper(),
        mAttachInfo.mThreadedRenderer);
```

源码位置：[`ViewRootImpl.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/ViewRootImpl.java)，当前快照约第 1747 行。

`setView()` 正常运行在应用 UI 线程，因此这里的 `Looper.myLooper()` 是应用主线程 Looper。

### 5.2 InputEventReceiver 进入 JNI

`InputEventReceiver` 构造函数调用：

```java
mReceiverPtr = nativeInit(
        new WeakReference<InputEventReceiver>(this),
        mInputChannel,
        mLooper.getQueue());
```

源码位置：[`InputEventReceiver.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/InputEventReceiver.java)。

native 层创建：

```text
NativeInputEventReceiver
    InputConsumer
    InputChannel
    MessageQueue / Looper
```

### 5.3 把 socket fd 注册到 Looper

`NativeInputEventReceiver::initialize()` 调用：

```cpp
setFdEvents(ALOOPER_EVENT_INPUT);
```

`setFdEvents()` 最终调用：

```cpp
mMessageQueue->getLooper()->addFd(fd, 0, events, this, nullptr);
```

源码位置：[`android_view_InputEventReceiver.cpp`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/jni/android_view_InputEventReceiver.cpp)，当前快照约第 248、315 行。

这意味着 InputChannel 不需要单独创建一个持续阻塞读取的 Java 线程。它的 fd 被加入主线程 Looper 的 poll 集合：

```text
主线程 Looper.pollOnce()
    同时等待：
        Java Message/Handler 到期
        Binder/系统唤醒
        InputChannel fd 可读
        其他 native fd 回调
```

当 InputDispatcher 写入 socket 后，fd 变为可读，正在 poll 的应用主线程被唤醒。

### 5.4 fd 可读后的回调路径

native 回调链为：

```text
Looper 检测 ALOOPER_EVENT_INPUT
    -> NativeInputEventReceiver::handleEvent()
    -> NativeInputEventReceiver::consumeEvents()
    -> InputConsumer::consume()
    -> 把 native MotionEvent 转成 Java MotionEvent
    -> JNI 调用 InputEventReceiver.dispatchInputEvent(seq, event)
```

Java `InputEventReceiver.dispatchInputEvent()` 再调用虚函数：

```java
mSeqMap.put(event.getSequenceNumber(), seq);
onInputEvent(event);
```

因为这一切发生在正在运行该 Looper 的线程，所以 `WindowInputEventReceiver.onInputEvent()` 位于应用主线程。

## 6. ViewRootImpl 如何把事件送进 View 树

`WindowInputEventReceiver` 的实现很直接：

```java
@Override
public void onInputEvent(InputEvent event) {
    processRawInputEvent(event);
}
```

源码位置：[`ViewRootImpl.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/ViewRootImpl.java)，当前快照约第 10812 行。

事件进入 `ViewRootImpl` 的输入阶段链。触摸事件到达 post-IME View 阶段后，关键调用是：

```java
handled = handled || mView.dispatchPointerEvent(event);
```

源码位置：[`ViewRootImpl.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/ViewRootImpl.java)，当前快照约第 8349 行。

这里的 `mView` 通常是窗口根 View，例如 `DecorView`。

`View.dispatchPointerEvent()` 对触摸事件继续调用：

```java
if (event.isTouchEvent()) {
    return dispatchTouchEvent(event);
}
```

源码位置：[`View.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/View.java)，当前快照约第 17108 行。

随后进入熟悉的应用内分发：

```text
DecorView.dispatchTouchEvent()
    -> Activity/Window 回调
    -> ViewGroup.dispatchTouchEvent()
        -> onInterceptTouchEvent()
        -> 查找坐标命中的子 View
        -> child.dispatchTouchEvent()
            -> ...
                -> Button.dispatchTouchEvent()
```

这里才是 Button 级别的命中和消费。InputDispatcher 只选择窗口，不知道应用窗口里面有哪些 Button。

## 7. Button 的 OnClickListener 是怎样触发的

在单个 `View` 中，`dispatchTouchEvent()` 的处理顺序可简化为：

```text
OnTouchListener.onTouch()
    handled=true  -> 不再执行 View.onTouchEvent()
    handled=false -> 执行 View.onTouchEvent()
```

源码位置：[`View.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/View.java)，当前快照约第 16750 行。

对于可点击 Button，默认 `View.onTouchEvent()` 会维护按压状态：

```text
ACTION_DOWN
    -> setPressed(true)
    -> 安排长按检查

ACTION_MOVE
    -> 判断是否移出允许范围、是否变成滚动等

ACTION_UP
    -> 未取消、未长按、仍满足点击条件
    -> post PerformClick / performClickInternal()
```

`performClick()` 最终调用绑定的监听器：

```java
if (li != null && li.mOnClickListener != null) {
    playSoundEffect(SoundEffectConstants.CLICK);
    li.mOnClickListener.onClick(this);
    result = true;
}
```

源码位置：[`View.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/View.java)，当前快照约第 8195 行。

所以“点击 Button”并不是 `ACTION_DOWN` 一到就直接调用 `onClick()`。通常要等一条有效点击手势到 `ACTION_UP`，并且期间没有被父 View 拦截、取消、识别成长按或滚动。

## 8. 处理完成后的确认链路

当 `ViewRootImpl` 输入阶段执行完成时，它计算是否 handled，并调用：

```java
q.mReceiver.finishInputEvent(q.mEvent, handled);
```

源码位置：[`ViewRootImpl.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/ViewRootImpl.java)，当前快照约第 10706 行。

随后链路反向返回：

```text
ViewRootImpl
    -> InputEventReceiver.finishInputEvent()
    -> nativeFinishInputEvent()
    -> InputConsumer.sendFinishedSignal(seq, handled)
    -> client InputChannel socket
    -> server InputChannel socket
    -> InputDispatcher.handleReceiveCallback()
    -> finishDispatchCycleLocked()
```

这也说明 InputChannel 是双向通道：

```text
InputDispatcher -> 应用：InputMessage / MotionEvent
应用 -> InputDispatcher：FINISHED / timeline 等响应
```

## 9. WATCH_OUTSIDE_TOUCH

`FLAG_WATCH_OUTSIDE_TOUCH` 是公开的窗口 flag，本身不是特殊权限：

```java
WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH
```

源码位置：[`WindowManager.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/WindowManager.java)，当前快照约第 2926 行。

它通常配合：

```java
FLAG_NOT_TOUCH_MODAL
FLAG_WATCH_OUTSIDE_TOUCH
```

使用场景是 PopupWindow/Dialog 感知用户点击了窗口外部。

假设：

```text
A：上层窗口，WATCH_OUTSIDE_TOUCH
B：下面被真正命中的窗口
```

结果是：

```text
B：收到正常 DOWN -> MOVE -> UP
A：只收到一次 ACTION_OUTSIDE
```

A 不会因此获得 B 的完整手势。InputDispatcher 对应代码是 `findOutsideTargets()`，使用 `InputTarget::DispatchMode::OUTSIDE`，见 [`InputDispatcher.cpp`](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/services/inputflinger/dispatcher/InputDispatcher.cpp) 当前快照约第 1426 行。

限制包括：

- A 必须仍然有有效窗口，而不是一个没有窗口的后台进程。
- A 必须位于真正触摸目标之前的相应 Z 顺序位置。
- 它只能获知外部发生一次按下，不是全局完整触摸监听。
- 创建某些 overlay 窗口本身可能需要悬浮窗或系统权限，但该 flag 本身不是危险权限。

## 10. Spy window 与系统全局手势

### 10.1 Spy window 的语义

spy window 使用隐藏 input feature：

```java
WindowManager.LayoutParams.INPUT_FEATURE_SPY
```

AOSP 定义是：spy window 在自己的 `touchableRegion` 内接收完整 pointer 事件，但不阻止它下面的普通目标窗口继续接收。

假设 Spy 覆盖目标坐标并位于普通窗口 A 上方：

```text
Spy：收到 DOWN -> MOVE -> UP
A：  同时收到 DOWN -> MOVE -> UP
```

InputDispatcher 的 `findTouchedSpyWindowsAt()` 从前到后收集命中的 spy window，遇到第一个命中的普通非 spy 窗口时停止。源码见 [`InputDispatcher.cpp`](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/services/inputflinger/dispatcher/InputDispatcher.cpp)，当前快照约第 1455 行。

因此“spy”不自动等于全屏：

- touchable region 只覆盖底边，就只观察底边开始的手势。
- region 覆盖整个 display，并且层级满足条件，才近似为该 display 的全局 pointer 观察窗口。
- 它主要观察 pointer 事件，不等于监听系统中所有种类的输入。

### 10.2 普通应用不能随意创建

`INPUT_FEATURE_SPY` 是 `@hide` API，并要求：

```text
android.permission.MONITOR_INPUT
```

权限声明为：

```xml
<permission android:name="android.permission.MONITOR_INPUT"
    android:protectionLevel="signature|recents" />
```

源码位置：[`AndroidManifest.xml`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/res/AndroidManifest.xml)，当前快照约第 8517 行。

WMS 会在设置 `INPUT_FEATURE_SPY` 时检查 `MONITOR_INPUT`；InputDispatcher 还要求 spy window 是 trusted overlay。普通第三方应用不能把它当成后台全局触摸监听 API。

### 10.3 底部上滑手势的典型工作方式

spy window 很适合系统导航手势的“先观察，再接管”模型：

```text
1. 系统组件创建覆盖底部区域或全屏的 spy window
2. 手指按下时，前台应用与 Spy 同时收到 DOWN
3. MOVE 过程中，Spy 判断方向、距离、速度是否符合底部上滑
4. 尚未识别成功：前台应用仍正常收到事件
5. 识别成功：Spy 调用 pilferPointers()
6. InputDispatcher 给其他正在接收该 pointer 的窗口发送 CANCEL
7. 本手势余下事件只继续给 pilfer 的 Spy
```

`pilferPointers()` 的文档明确说明：当前前台窗口和其他正在接收这些 pointer 的 spy window 会被取消，只有执行 pilfer 的窗口继续接收，直到手指抬起。

源码位置：[`InputManager.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/hardware/input/InputManager.java)，当前快照约第 1294 行。

所以监听和接管是两件事：

```text
Spy 不 pilfer
    -> 观察完整手势，但前台应用也继续收到

Spy 识别成功后 pilfer
    -> 前台应用收到 ACTION_CANCEL
    -> 系统组件独占剩余手势
```

旧的 `monitorGestureInput()` 会创建一个覆盖 DisplayContent 的手势监视器；AOSP16 内部用 `GestureMonitorSpyWindow` 实现。它没有图形 buffer，但有 InputWindowHandle 和 InputChannel，可接收 display 范围内开始的 pointer 事件。见 [`GestureMonitorSpyWindow.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/services/core/java/com/android/server/input/GestureMonitorSpyWindow.java)。AOSP 已不鼓励新增旧 Gesture Monitor 用法，推荐配置范围更明确的 spy window。

## 11. 常见误解汇总

### 误解一：当前焦点窗口才有 InputChannel

不对。通常每个可接收输入的窗口都有通道；焦点决定键盘等事件的主要目标，触摸主要按位置命中。

### 误解二：InputChannel 是每个 Button 一个

不对。InputChannel 通常对应窗口。Button 的命中发生在应用进程内的 View 树分发阶段。

### 误解三：A 返回 false 后 InputDispatcher 再试 B

不对。A、B、C 的普通目标选择发生在事件发送前。A 已经成为目标后，`handled=false` 只是完成确认，不触发跨窗口 fallback。

### 误解四：A 不可触摸时先收到事件再主动放弃

不对。`NOT_TOUCHABLE` 或坐标不在 `touchableRegion` 时，InputDispatcher 在命中阶段就跳过 A，普通触摸不会写入 A 的通道。

### 误解五：WATCH_OUTSIDE_TOUCH 可以后台监听全系统手势

不对。它依附于有效窗口，只得到一次 `ACTION_OUTSIDE`，不是完整 `DOWN/MOVE/UP`。

### 误解六：spy window 天然独占系统手势

不对。spy 默认与普通前台窗口并行观察；识别成功后需要 `pilferPointers()` 才会取消其他目标并接管当前 pointer 流。

## 12. 建议的源码阅读顺序

按下面顺序阅读最容易建立闭环：

1. [`InputChannel.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/InputChannel.java)
   - 看 `mPtr`、Parcel、dup、token、dispose。
2. [`android_view_InputChannel.cpp`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/jni/android_view_InputChannel.cpp)
   - 确认 `mPtr -> NativeInputChannel -> native InputChannel`。
3. [`InputTransport.cpp`](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/libs/input/InputTransport.cpp)
   - 看 `socketpair()`、`sendMessage()`、`receiveMessage()`。
4. [`WindowState.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/services/core/java/com/android/server/wm/WindowState.java)
   - 看标准窗口如何请求创建并把 client 端复制给应用。
5. [`InputDispatcher.cpp`](https://android.googlesource.com/platform/frameworks/native/+/refs/tags/android-16.0.0_r4/services/inputflinger/dispatcher/InputDispatcher.cpp)
   - 看 `findTouchedWindowTargets()`、`findTouchedWindowAt()`、`TouchState`、`InputTarget` 和 dispatch cycle。
6. [`InputEventReceiver.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/InputEventReceiver.java)
   - 看 Java 接收器与 finished ack。
7. [`android_view_InputEventReceiver.cpp`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/jni/android_view_InputEventReceiver.cpp)
   - 看 fd 如何注册 Looper、可读后如何消费和 JNI 回调。
8. [`ViewRootImpl.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/ViewRootImpl.java)
   - 看 `WindowInputEventReceiver`、输入阶段链和 `mView.dispatchPointerEvent()`。
9. [`ViewGroup.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/ViewGroup.java) 与 [`View.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/View.java)
   - 看应用内触摸目标、拦截、`onTouchEvent()`、`performClick()`。
10. [`WindowManager.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/WindowManager.java) 与 [`InputManager.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/hardware/input/InputManager.java)
    - 看 `WATCH_OUTSIDE_TOUCH`、`INPUT_FEATURE_SPY`、`pilferPointers()`。

## 13. 一句话总结

```text
InputDispatcher 在 DOWN 时选中窗口并用 TouchState 锁定手势，
通过一对 Unix socket InputChannel 把事件写给目标窗口；
应用主线程 Looper 因 client fd 可读而唤醒，
ViewRootImpl 再把 MotionEvent 分发进 View 树，
最终由 Button 在有效 ACTION_UP 上调用 performClick() 和 OnClickListener。
```
