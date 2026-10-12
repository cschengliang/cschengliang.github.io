---
title: 抓取安卓开机 Trace
description: 使用 Perfetto 抓取 Android 开机 Trace，包含配置下载、录制命令、导出查看和常见问题。
date: 2026-10-12
outline: deep
---

# 抓取安卓开机 Trace

Android 13 及以上支持在开机时自动启动 Perfetto 录制。基本步骤是：**推送配置、设置属性、重启、等待录制结束、导出文件**。

## 一、开机录制原理

系统在 `/system/etc/init/perfetto.rc` 中**预置了一个 oneshot 服务 `perfetto_trace_on_boot`，以及开机时启动它的触发逻辑**。正因为系统已经提供了这个入口，我们只需放好配置文件、设置 `persist.debug.perfetto.boottrace=1`，就能让 init 在下次开机时自动启动 Perfetto 录制，无需自行新增 init 服务。

`oneshot` 表示服务退出后，init 不会自动重启它；配合录制开关的清空逻辑，每次设置只用于下一次开机录制。

原始记录对应的触发流程如下：

```text
/data 挂载，持久化属性加载完成
  → ro.persistent_properties.ready=true
  → init 触发 perfetto_maybe_trace_on_boot
  → 检查 boottrace=1 且 persist.traced.enable=1
  → 清空 boottrace 属性，删除旧 Trace
  → 等待 sys.trace.traced_started=1（traced 已就绪）
  → 启动 perfetto_trace_on_boot
```

服务实际执行的命令是：

```sh
perfetto --txt -c /data/misc/perfetto-configs/boottrace.pbtxt \
  -o /data/misc/perfetto-traces/boottrace.perfetto-trace
```

Perfetto 读取配置，连接 traced 启动录制会话，按配置收集调度事件、Framework 打点和日志等数据，再写入输出文件。本配置通过 `duration_ms: 30000` 指定录制 30 秒。

这里有两个关键点：**开关会被清空，所以每次抓取都要重新设置；录制依赖 `/data` 和 traced 就绪，所以无法从内核启动的第一刻开始抓取**。具体触发写法可能随系统版本变化，可对照设备上的 `perfetto.rc`；上述流程可参考 [AOSP 中的实现](https://android.googlesource.com/platform/external/perfetto/+/5af86215f7908a5f24615dd7d5df1e8bc72d60a4/perfetto.rc)。

## 二、准备配置

下载 <a href="/docs/configs/boottrace.pbtxt" download>boottrace.pbtxt</a>，保存在电脑当前操作目录。配置来自本次开机分析记录，录制时长为 30 秒，包含线程调度、CPU 频率、Framework 打点、进程信息和 logcat。

设备需要开启 USB 调试，并允许写入配置目录和设置相关属性。如果提示权限不足，可在支持 `adb root` 的 userdebug / eng 设备上先执行：

```sh
adb root
adb wait-for-device
```

将配置推送到固定位置：

```sh
adb push boottrace.pbtxt /data/misc/perfetto-configs/boottrace.pbtxt
```

如果使用 Git Bash，先执行 `export MSYS_NO_PATHCONV=1`，避免 `/data/...` 被转换成 Windows 路径。PowerShell 和 cmd 无需这一步。

## 三、重启并录制

先检查 tracing 开关：

```sh
adb shell getprop persist.traced.enable
```

如果不是 `1`，在设备允许的情况下设置：

```sh
adb shell setprop persist.traced.enable 1
```

开启下一次开机录制，然后重启：

```sh
adb shell setprop persist.debug.perfetto.boottrace 1
adb reboot
adb wait-for-device
```

设备重新连接后，检查录制状态：

```sh
adb shell getprop init.svc.perfetto_trace_on_boot
```

- `running`：还在录制，继续等待。
- `stopped`：服务已经结束，可以检查并导出文件。
- 没有输出：服务可能尚未启动，或设备未提供该服务，需要检查系统配置。

本配置录制 30 秒；`adb wait-for-device` 只表示 ADB 已连接，不代表录制完成。服务立即变成 `stopped` 也可能是配置出错，可按文末方法手动试录。

## 四、导出并查看

确认录制结束后，导出 Trace：

```sh
adb pull /data/misc/perfetto-traces/boottrace.perfetto-trace
```

打开 [Perfetto UI](https://ui.perfetto.dev/)，将文件拖进去。可以先搜索这些内容：

| 内容 | 用途 |
| --- | --- |
| `system_server` | 查看系统服务启动过程 |
| `startBootstrapServices`、`startCoreServices`、`startOtherServices`、`startApexServices` | 查看各批服务的启动耗时 |
| `StartPackageManagerService`、`StartWindowManagerService` | 定位具体服务耗时 |
| `boot_progress_*` | 查看录制期间的开机日志里程碑 |

## 五、录制范围

开机录制要等 `/data` 挂载、持久化属性加载和 traced 就绪后才开始，因此不能覆盖内核启动和 init 前半段，Zygote 预加载也可能缺失。

原始记录中的一次实测，Perfetto 在 uptime 约 6.41 秒开始录制，`system_server` 在约 6.43 秒开始运行。这只是该设备的时间点，其他设备的覆盖范围需要根据实际 Trace 确认。

如果需要观察 Zygote 预加载，可以在支持 root 的调试设备上，先开始录制，再软重启 Framework：

```sh
adb root
adb wait-for-device
adb shell 'perfetto --txt -c /data/misc/perfetto-configs/boottrace.pbtxt -o /data/misc/perfetto-traces/zygote_restart.perfetto-trace --background; sleep 2; stop; start'
```

等待本配置的 30 秒录制结束后导出：

```sh
adb pull /data/misc/perfetto-traces/zygote_restart.perfetto-trace
```

`stop; start` 会重启 Framework 和应用，内核不会重启。这种方式适合观察流程，耗时不能直接当作真实重启的开机耗时。

## 六、常见问题

**没有生成文件**：检查配置路径、`persist.traced.enable` 和设备的 Perfetto 开机服务。可以先在已开机状态手动试录，查看是否报错；命令会等待录制结束：

```sh
adb shell perfetto --txt -c /data/misc/perfetto-configs/boottrace.pbtxt -o /data/misc/perfetto-traces/test.perfetto-trace
```

**Trace 后半段缺失**：可能在录制结束前就导出了文件。先确认服务状态，再拉取；如果 30 秒不够覆盖开机过程，增大配置中的 `duration_ms`。

**Trace 太大**：缩短录制时间，或减少 `atrace_categories`。配置中的 `write_into_file`、`file_write_period_ms` 和 `flush_period_ms` 用于录制过程中持续写入、刷新数据，建议保留。

**再抓一次没有生效**：开机录制开关会被清空。每次录制前，都需要重新设置 `persist.debug.perfetto.boottrace` 为 `1`。

参考：[Perfetto 官方开机录制说明](https://android.googlesource.com/platform/external/perfetto/+/refs/heads/master/docs/case-studies/android-boot-tracing.md)。
