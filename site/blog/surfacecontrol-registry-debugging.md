---
title: SurfaceControlRegistry 调试功能使用指南
description: 介绍 SurfaceControlRegistry 的对象统计、Transaction 调用栈追踪和调试排查方法。
date: 2026-08-31
outline: deep
---

# SurfaceControlRegistry 调试功能使用指南

本文介绍 AOSP 中 `SurfaceControlRegistry` 提供的两类调试能力：

1. 统计进程内仍存活的 `SurfaceControl`，定位对象未及时释放的问题。
2. 按 `SurfaceControl.Transaction` 方法名或 Surface 名称打印 Java 调用栈，定位是谁修改了 Surface。

实现入口：[`SurfaceControlRegistry.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/SurfaceControlRegistry.java)。

## 1. 使用前提

调用栈调试只在 `debuggable` 构建中生效。Surface 注册表还需要由进程显式调用
`SurfaceControlRegistry.createProcessInstance(Context)` 创建，并要求调用者持有
`android.permission.READ_FRAME_BUFFER`。

当前 AOSP 中，WMShell 在初始化时创建注册表：

```text
ShellInterfaceImpl.onInit()
    -> ShellController.handleInit()
    -> SurfaceControlRegistry.createProcessInstance()
```

因此，注册表 dump 主要查看承载 WMShell 的 SystemUI 进程；它不是所有应用进程默认开启的全局服务。

调用栈调试的范围不同：`SurfaceControl.Transaction` 第一次创建时会读取调试属性，即使当前进程没有创建
Registry，`getProcessInstance()` 返回的 `NoOpRegistry` 仍会执行调用栈检查。因此只要是 debuggable 进程，
就可以用属性追踪该进程中的 Transaction 调用。

## 2. 追踪 Transaction 调用栈

### 2.1 按方法名过滤

`persist.wm.debug.sc.tx.log_match_call` 用于匹配 `SurfaceControl.Transaction` 的方法名，
例如 `setAlpha`、`setPosition`、`reparent`。

```bash
adb shell setprop persist.wm.debug.sc.tx.log_match_call setAlpha,setPosition
adb shell setprop persist.wm.debug.sc.tx.log_match_name ""
adb reboot
adb logcat -s SurfaceControlRegistry
```

首次启用建议重启，使各进程在创建第一个 `Transaction` 时读取属性。已经启用后，修改过滤条件通常不需要再次重启。

关闭过滤：

```bash
adb shell setprop persist.wm.debug.sc.tx.log_match_call ""
adb shell setprop persist.wm.debug.sc.tx.log_match_name ""
```

### 2.2 按 Surface 名称过滤

`persist.wm.debug.sc.tx.log_match_name` 用于匹配 Surface 名称。可以只设置名称，表示追踪该 Surface 的所有已埋点操作：

```bash
adb shell setprop persist.wm.debug.sc.tx.log_match_call ""
adb shell setprop persist.wm.debug.sc.tx.log_match_name com.android.systemui
adb reboot
adb logcat -s SurfaceControlRegistry
```

两个属性同时设置时，调用名和 Surface 名称必须同时匹配：

```bash
adb shell setprop persist.wm.debug.sc.tx.log_match_call setAlpha,setPosition
adb shell setprop persist.wm.debug.sc.tx.log_match_name com.android.systemui
```

过滤采用大小写不敏感的字符串包含匹配，不是正则表达式，也不会严格解析逗号列表。例如过滤值为
`alpha` 时，可能匹配到名称中包含 `alpha` 的其他方法或 Surface。

### 2.3 日志内容

命中后，Java 层通过 `Log.e("SurfaceControlRegistry", msg, new Throwable())` 输出调用栈。典型信息包括：

```text
setAlpha (tx=<transaction-id>  sc=<surface-name>) alpha=<value>
java.lang.Throwable
    at ...
    at ...
```

字段含义：

| 字段 | 含义 |
| --- | --- |
| 方法名 | 被调用的 Transaction 操作，例如 `setAlpha`、`reparent` |
| `tx` | Transaction ID，用于关联后续 `merge/apply` |
| `sc` | 被修改的 Surface 名称 |
| 其他参数 | 本次调用的属性值，例如坐标、透明度、裁剪区域 |
| Java 堆栈 | 触发该 Transaction 操作的上层代码路径 |

当前主要埋点包括：

- 生命周期：`ctor`、`apply`、`merge`、`release`
- 可见性和层级：`show`、`hide`、`setLayer`、`setRelativeLayer`、`reparent`
- 几何属性：`setPosition`、`setScale`、`setMatrix`、`setCrop`、`setWindowCrop`
- 外观属性：`setAlpha`、`setColor`、`setOpaque`、`setSecure`
- 特效属性：`setCornerRadius`、`setBackgroundBlurRadius`、`setShadowRadius`
- 帧时间：`setFrameTimeline`、`setFrameTimelineVsync`

不是所有 `Transaction` 方法都埋点，没有对应日志不代表方法一定没有执行。

## 3. 追踪 Transaction 的 apply 和 merge

仅追踪 `setAlpha` 等属性调用时，只能知道“哪里修改了 Transaction”，不能直接知道它最终何时提交。
将 `apply` 加入调用过滤值后，会进入 Transaction 聚合模式：

```bash
adb shell setprop persist.wm.debug.sc.tx.log_match_call setAlpha,merge,apply
adb shell setprop persist.wm.debug.sc.tx.log_match_name ""
adb reboot
adb logcat -s SurfaceControlRegistry
```

执行流程：

```text
Transaction.setAlpha()/merge()
    -> 打印命中调用的 Java 堆栈
    -> 将调用描述保存到 tx.mCalls

Transaction.apply()
    -> 打印 apply 的 Java 堆栈
    -> 打印该 Transaction 已收集的调用
    -> 清空 mCalls
    -> nativeApplyTransaction()
```

分析时先记录属性调用中的 `tx=<id>`，再搜索同一个 ID 的 `merge` 和 `apply`：

```text
属性修改位置 -> Transaction ID -> merge 到哪个 Transaction -> 最终 apply 位置
```

这对 Transition、BLASTBufferQueue 等“提前构造 Transaction、稍后合并或提交”的路径尤其有用。

### 3.1 BLAST 合并路径

`ViewRootImpl.mergeWithNextTransaction()` 会调用
`Transaction.onMergeWithNextTransaction(windowName)`。该方法通过 JNI 调用 native
`SurfaceComposerClient::Transaction::enableDebugLogCallPoints()`，使 native 层在 Transaction 合并和
提交时输出：

```text
Transaction <id> merged with transaction <id>
Transaction <id> applied
```

native 日志 tag 同样是 `SurfaceControlRegistry`，可以和 Java 层日志一起过滤。

## 4. 查看活动 SurfaceControl 列表

### 4.1 通过 WMShell dump

当前版本使用：

```bash
adb shell wm shell dump
```

旧版本可能使用：

```bash
adb shell dumpsys activity service SystemUIService WMShell dump
```

调用流程：

```text
ShellCommandHandler.dump()
    -> ShellController.handleDump()
    -> SurfaceControlRegistry.dump(100, false, pw)
```

输出示例：

```text
SurfaceControlRegistry
----------------------
Listing oldest 3 of 3
  SysUiSurface (SomeController#createSurface) [12s ago]
  LeakedSurface (SurfaceControl.Builder) [8s ago]
  AnotherSurface (TransitionController) [2s ago]
sCallStackDebuggingInitialized=true
sCallStackDebuggingEnabled=false
...
```

每条 Surface 的含义：

| 输出项 | 含义 |
| --- | --- |
| Surface 名称 | `SurfaceControl.getName()` 返回的调试名称 |
| 括号内容 | 创建或更新过的 `callsite` |
| `N s ago` | 加入当前进程 Registry 的时间 |
| `Listing oldest X of Y` | 当前记录总数和本次打印的最老对象数量 |

WMShell 当前传入 `limit=100`、`runGc=false`。该 dump 不会主动触发 GC，也不显示完整的 SurfaceFlinger
层级、父子关系、Z 序和可见性；需要这些信息时使用 `dumpsys SurfaceFlinger` 或 Winscope。

### 4.2 数量阈值自动报告

注册表默认在活动对象数达到 1024 时自动报告最老的 256 个对象。报告只触发一次，直到数量下降到 256
或以下后才允许再次触发，用于避免持续刷屏。

```text
1024 个活动 SurfaceControl
    -> DefaultReporter.onMaxLayersExceeded()
    -> 按注册时间排序
    -> 输出最老的 256 个对象
```

阈值报告在 `add()` 中通过 `System.out` 输出；主动 dump 则写入传入的 `PrintWriter`。因此只用
`adb logcat -s SurfaceControlRegistry` 可能看不到阈值报告，建议同时保留 WMShell dump 输出。

## 5. 源码定位入口

| 现象 | 优先查看的类和方法 |
| --- | --- |
| Surface 数量持续增长 | [`SurfaceControl`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/SurfaceControl.java) 的 `assignNativeObject()`、`release()`、`finalize()`；[`SurfaceControlRegistry`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/SurfaceControlRegistry.java) 的 `add/remove()` |
| 找谁调用了 `setAlpha` 等属性 | [`SurfaceControl.Transaction`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/SurfaceControl.java) 对应方法、`SurfaceControlRegistry.checkCallStackDebugging()` |
| 找 Transaction 最终提交位置 | `SurfaceControl.Transaction.apply()`、`SurfaceComposerClient::Transaction::apply()` |
| 找 Transaction 合并链路 | `SurfaceControl.Transaction.merge()`、[`ViewRootImpl`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/java/android/view/ViewRootImpl.java) 的 `mergeWithNextTransaction()`、`BLASTBufferQueue::mergeWithNextTransaction()` |
| 找 dump 为什么没有内容 | [`ShellController`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/libs/WindowManager/Shell/src/com/android/wm/shell/sysui/ShellController.java) 的 `handleInit()/handleDump()`、`SurfaceControlRegistry.createProcessInstance()` |

## 6. 常见误区

1. **Registry 不是 SurfaceFlinger 的全局 Layer 列表。** 它只记录当前进程中的 Java `SurfaceControl` 包装对象。
2. **没有注册表不等于不能打印调用栈。** 调用栈功能通过 `NoOpRegistry` 仍可执行；注册表 dump 则需要显式创建实例。
3. **不要把 `apply` 日志当作属性调用位置。** 属性调用的 Java 堆栈才是修改发生的位置，`apply` 表示提交发生的位置。
4. **`setTransparentRegionHint()` 当前日志标签存在复制错误。** 源码中它使用了 `unsetFixedTransformHint` 作为调用名，过滤时需要注意这一点。
5. **阈值报告不是精确的 Layer 泄漏结论。** 对象可能因为显式 `release`、finalize 或弱引用回收而从列表消失；需要结合 SurfaceFlinger dump 判断服务端 Layer 状态。

## 7. 相关测试

Registry 的权限、创建/释放、阈值复位和过滤匹配由以下测试覆盖：

```bash
atest FrameworksCoreTests:android.view.SurfaceControlRegistryTests
```

测试文件：[`SurfaceControlRegistryTests.java`](https://android.googlesource.com/platform/frameworks/base/+/refs/tags/android-16.0.0_r4/core/tests/coretests/src/android/view/SurfaceControlRegistryTests.java)。
