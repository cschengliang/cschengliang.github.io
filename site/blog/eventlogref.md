---
title: Android EventLog 参考
description: 按功能分类整理 Android EventLog 标签、字段含义与触发流程，便于源码检索和问题定位。
date: 2026-08-30
outline: deep
---

# Android EventLog 参考

事件清单来源：`C:\Users\csche\Documents\androiddebug\etc\event-log-tags`。本文按功能类别整理，每条事件统一说明日志含义、字段含义和触发流程；触发流程仅保留类名、方法名及搜索关键词，便于跨 AOSP 版本定位。

## Activity / Window / 进程与用户

### `boot_progress_start`（EventLog tag `3000`）

- 日志含义：记录系统启动计时起点。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressStart()；搜索关键词：`writeBootProgressStart` 或 `boot_progress_start`

### `boot_progress_system_run`（EventLog tag `3010`）

- 日志含义：SystemServer 开始运行。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressSystemRun()；搜索关键词：`writeBootProgressSystemRun` 或 `boot_progress_system_run`

### `system_server_start`（EventLog tag `3011`）

- 日志含义：记录 SystemServer 启动次数及耗时。
- 日志字段：
  - `start_count`：启动次数。
  - `uptime`：系统运行时间。
  - `elapse_time`：经过时间。
- 触发流程：SystemServer/SystemUpdateManagerService 相关方法 → EventLogTags.writeSystemServerStart()；搜索关键词：`writeSystemServerStart` 或 `system_server_start`

### `boot_progress_preload_start`（EventLog tag `3020`）

- 日志含义：开始预加载系统资源。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressPreloadStart()；搜索关键词：`writeBootProgressPreloadStart` 或 `boot_progress_preload_start`

### `boot_progress_preload_end`（EventLog tag `3030`）

- 日志含义：系统资源预加载完成。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressPreloadEnd()；搜索关键词：`writeBootProgressPreloadEnd` 或 `boot_progress_preload_end`

### `boot_progress_ams_ready`（EventLog tag `3040`）

- 日志含义：ActivityManagerService 初始化就绪。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressAmsReady()；搜索关键词：`writeBootProgressAmsReady` 或 `boot_progress_ams_ready`

### `boot_progress_enable_screen`（EventLog tag `3050`）

- 日志含义：系统执行亮屏流程。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressEnableScreen()；搜索关键词：`writeBootProgressEnableScreen` 或 `boot_progress_enable_screen`

### `boot_progress_pms_start`（EventLog tag `3060`）

- 日志含义：PackageManagerService 启动。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressPmsStart()；搜索关键词：`writeBootProgressPmsStart` 或 `boot_progress_pms_start`

### `boot_progress_pms_system_scan_start`（EventLog tag `3070`）

- 日志含义：开始扫描系统分区包。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressPmsSystemScanStart()；搜索关键词：`writeBootProgressPmsSystemScanStart` 或 `boot_progress_pms_system_scan_start`

### `boot_progress_pms_data_scan_start`（EventLog tag `3080`）

- 日志含义：开始扫描 data 分区包。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressPmsDataScanStart()；搜索关键词：`writeBootProgressPmsDataScanStart` 或 `boot_progress_pms_data_scan_start`

### `boot_progress_pms_scan_end`（EventLog tag `3090`）

- 日志含义：Package 扫描完成。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressPmsScanEnd()；搜索关键词：`writeBootProgressPmsScanEnd` 或 `boot_progress_pms_scan_end`

### `boot_progress_pms_ready`（EventLog tag `3100`）

- 日志含义：PackageManagerService 初始化就绪。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：SystemServer 相关方法 → EventLogTags.writeBootProgressPmsReady()；搜索关键词：`writeBootProgressPmsReady` 或 `boot_progress_pms_ready`

### `pm_critical_info`（EventLog tag `3120`）

- 日志含义：记录 PackageManager 关键诊断信息。
- 日志字段：
  - `msg`：诊断消息。
- 触发流程：PackageManagerService 相关方法 → EventLogTags.writePmCriticalInfo()；搜索关键词：`writePmCriticalInfo` 或 `pm_critical_info`

### `pm_package_stats`（EventLog tag `3121`）

- 日志含义：记录包管理器磁盘配额与数据统计。
- 日志字段：
  - `manual_time`：手动配额计算耗时。
  - `quota_time`：配额计算耗时。
  - `manual_data`：手动计算的数据量。
  - `quota_data`：配额数据量。
  - `manual_cache`：手动缓存量。
  - `quota_cache`：配额缓存量。
- 触发流程：PackageManagerService 相关方法 → EventLogTags.writePmPackageStats()；搜索关键词：`writePmPackageStats` 或 `pm_package_stats`

### `pm_snapshot_stats`（EventLog tag `3130`）

- 日志含义：记录 PackageManager 快照构建/复用统计。
- 日志字段：
  - `build_count`：快照构建次数。
  - `reuse_count`：快照复用次数。
  - `big_builds`：大型快照构建次数。
  - `short_lived`：短生命周期快照数。
  - `max_build_time`：最大构建耗时。
  - `cumm_build_time`：累计构建耗时。
- 触发流程：PackageManagerService 相关方法 → EventLogTags.writePmSnapshotStats()；搜索关键词：`writePmSnapshotStats` 或 `pm_snapshot_stats`

### `pm_snapshot_rebuild`（EventLog tag `3131`）

- 日志含义：记录 PackageManager 快照重建耗时。
- 日志字段：
  - `build_time`：重建耗时。
  - `lifetime`：快照生命周期。
- 触发流程：PackageManagerService 相关方法 → EventLogTags.writePmSnapshotRebuild()；搜索关键词：`writePmSnapshotRebuild` 或 `pm_snapshot_rebuild`

### `pm_clear_app_data_caller`（EventLog tag `3132`）

- 日志含义：记录清除应用数据请求的调用方。
- 日志字段：
  - `pid`：进程 ID。
  - `uid`：应用 UID。
  - `package`：事件中的 package 字段，表示与该操作相关的运行时值。
- 触发流程：PackageManagerService 相关方法 → EventLogTags.writePmClearAppDataCaller()；搜索关键词：`writePmClearAppDataCaller` 或 `pm_clear_app_data_caller`

### `wm_finish_activity`（EventLog tag `30001`）

- 日志含义：Activity 完成并从任务中移除。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Task ID`：任务 ID。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmFinishActivity()；搜索关键词：`writeWmFinishActivity` 或 `wm_finish_activity`

### `wm_task_to_front`（EventLog tag `30002`）

- 日志含义：任务被移动到前台。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Task`：任务 ID。
  - `Display Id`：显示屏 ID。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmTaskToFront()；搜索关键词：`writeWmTaskToFront` 或 `wm_task_to_front`

### `wm_new_intent`（EventLog tag `30003`）

- 日志含义：向现有 Activity 投递新的 Intent。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Task ID`：任务 ID。
  - `Component Name`：组件名称。
  - `Action`：动作。
  - `MIME Type`：MIME 类型。
  - `URI`：URI。
  - `Flags`：标志位。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmNewIntent()；搜索关键词：`writeWmNewIntent` 或 `wm_new_intent`

### `wm_create_task`（EventLog tag `30004`）

- 日志含义：创建新的任务（Task）。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Task ID`：任务 ID。
  - `Root Task ID`：根任务 ID。
  - `Display Id`：显示屏 ID。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmCreateTask()；搜索关键词：`writeWmCreateTask` 或 `wm_create_task`

### `wm_create_activity`（EventLog tag `30005`）

- 日志含义：创建 Activity 记录并启动组件。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Task ID`：任务 ID。
  - `Component Name`：组件名称。
  - `Action`：动作。
  - `MIME Type`：MIME 类型。
  - `URI`：URI。
  - `Flags`：标志位。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmCreateActivity()；搜索关键词：`writeWmCreateActivity` 或 `wm_create_activity`

### `wm_restart_activity`（EventLog tag `30006`）

- 日志含义：Activity 因配置或进程状态而重启。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Task ID`：任务 ID。
  - `Component Name`：组件名称。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmRestartActivity()；搜索关键词：`writeWmRestartActivity` 或 `wm_restart_activity`

### `wm_resume_activity`（EventLog tag `30007`）

- 日志含义：Activity 切换到 resumed（前台可交互）状态。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Task ID`：任务 ID。
  - `Component Name`：组件名称。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmResumeActivity()；搜索关键词：`writeWmResumeActivity` 或 `wm_resume_activity`

### `am_anr`（EventLog tag `30008`）

- 日志含义：系统判定目标应用无响应（ANR），记录触发 ANR 的进程、包及原因。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `pid`：进程 ID。
  - `Package Name`：应用包名。
  - `Flags`：标志位。
  - `reason`：触发原因。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmAnr()；搜索关键词：`writeAmAnr` 或 `am_anr`

### `wm_activity_launch_time`（EventLog tag `30009`）

- 日志含义：记录 Activity 从启动请求到完成启动的耗时。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmActivityLaunchTime()；搜索关键词：`writeWmActivityLaunchTime` 或 `wm_activity_launch_time`

### `am_proc_bound`（EventLog tag `30010`）

- 日志含义：应用进程已与 ActivityManagerService 绑定。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `PID`：进程 ID。
  - `Process Name`：进程名。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmProcBound()；搜索关键词：`writeAmProcBound` 或 `am_proc_bound`

### `am_proc_died`（EventLog tag `30011`）

- 日志含义：AMS 检测到应用进程死亡。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `PID`：进程 ID。
  - `Process Name`：进程名。
  - `OomAdj`：进程 OOM 调整值。
  - `ProcState`：进程状态。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmProcDied()；搜索关键词：`writeAmProcDied` 或 `am_proc_died`

### `wm_failed_to_pause`（EventLog tag `30012`）

- 日志含义：目标 Activity 未能按要求暂停。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Wanting to pause`：请求暂停的 Activity。
  - `Currently pausing`：当前正在暂停的 Activity。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmFailedToPause()；搜索关键词：`writeWmFailedToPause` 或 `wm_failed_to_pause`

### `wm_pause_activity`（EventLog tag `30013`）

- 日志含义：Activity 进入暂停流程。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `User Leaving`：用户是否离开。
  - `Reason`：触发原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmPauseActivity()；搜索关键词：`writeWmPauseActivity` 或 `wm_pause_activity`

### `am_proc_start`（EventLog tag `30014`）

- 日志含义：AMS 请求启动应用进程。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `PID`：进程 ID。
  - `UID`：应用 UID。
  - `Process Name`：进程名。
  - `Type`：事件或启动类型。
  - `Component`：组件名称。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmProcStart()；搜索关键词：`writeAmProcStart` 或 `am_proc_start`

### `am_proc_bad`（EventLog tag `30015`）

- 日志含义：进程因频繁崩溃被标记为 bad。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `UID`：应用 UID。
  - `Process Name`：进程名。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmProcBad()；搜索关键词：`writeAmProcBad` 或 `am_proc_bad`

### `am_proc_good`（EventLog tag `30016`）

- 日志含义：进程状态恢复为 good，可再次正常使用。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `UID`：应用 UID。
  - `Process Name`：进程名。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmProcGood()；搜索关键词：`writeAmProcGood` 或 `am_proc_good`

### `am_low_memory`（EventLog tag `30017`）

- 日志含义：AMS 检测到系统内存不足并记录进程数量。
- 日志字段：
  - `Num Processes`：进程数。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmLowMemory()；搜索关键词：`writeAmLowMemory` 或 `am_low_memory`

### `wm_destroy_activity`（EventLog tag `30018`）

- 日志含义：销毁 Activity 记录。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Task ID`：任务 ID。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmDestroyActivity()；搜索关键词：`writeWmDestroyActivity` 或 `wm_destroy_activity`

### `wm_relaunch_resume_activity`（EventLog tag `30019`）

- 日志含义：Activity 重启后恢复到 resumed 状态。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Task ID`：任务 ID。
  - `Component Name`：组件名称。
  - `config mask`：配置变更掩码。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmRelaunchResumeActivity()；搜索关键词：`writeWmRelaunchResumeActivity` 或 `wm_relaunch_resume_activity`

### `wm_relaunch_activity`（EventLog tag `30020`）

- 日志含义：Activity 因配置变化等原因重新创建。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Task ID`：任务 ID。
  - `Component Name`：组件名称。
  - `config mask`：配置变更掩码。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmRelaunchActivity()；搜索关键词：`writeWmRelaunchActivity` 或 `wm_relaunch_activity`

### `wm_on_paused_called`（EventLog tag `30021`）

- 日志含义：客户端回调 Activity.onPause() 完成。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：应用进程 `android.app.Activity.onPause()` → EventLogTags.writeWmOnPausedCalled()；搜索关键词：`writeWmOnPausedCalled` 或 `wm_on_paused_called`

### `wm_on_resume_called`（EventLog tag `30022`）

- 日志含义：客户端回调 Activity.onResume() 完成。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：应用进程 `android.app.Activity.onResume()` → EventLogTags.writeWmOnResumeCalled()；搜索关键词：`writeWmOnResumeCalled` 或 `wm_on_resume_called`

### `am_kill`（EventLog tag `30023`）

- 日志含义：AMS 主动终止应用进程。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `PID`：进程 ID。
  - `Process Name`：进程名。
  - `OomAdj`：进程 OOM 调整值。
  - `Reason`：触发原因。
  - `Rss`：驻留集大小（KB）。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmKill()；搜索关键词：`writeAmKill` 或 `am_kill`

### `am_broadcast_discard_filter`（EventLog tag `30024`）

- 日志含义：因过滤条件丢弃一条广播接收。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Broadcast`：广播记录 ID。
  - `Action`：动作。
  - `Receiver Number`：接收器序号。
  - `BroadcastFilter`：广播过滤器 ID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmBroadcastDiscardFilter()；搜索关键词：`writeAmBroadcastDiscardFilter` 或 `am_broadcast_discard_filter`

### `am_broadcast_discard_app`（EventLog tag `30025`）

- 日志含义：因目标应用状态丢弃一条广播。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Broadcast`：广播记录 ID。
  - `Action`：动作。
  - `Receiver Number`：接收器序号。
  - `App`：应用进程。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmBroadcastDiscardApp()；搜索关键词：`writeAmBroadcastDiscardApp` 或 `am_broadcast_discard_app`

### `am_create_service`（EventLog tag `30030`）

- 日志含义：创建 Service 记录并关联进程。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Service Record`：Service 记录 ID。
  - `Name`：组件或对象名称。
  - `UID`：应用 UID。
  - `PID`：进程 ID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmCreateService()；搜索关键词：`writeAmCreateService` 或 `am_create_service`

### `am_destroy_service`（EventLog tag `30031`）

- 日志含义：销毁 Service 记录。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Service Record`：Service 记录 ID。
  - `PID`：进程 ID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmDestroyService()；搜索关键词：`writeAmDestroyService` 或 `am_destroy_service`

### `am_process_crashed_too_much`（EventLog tag `30032`）

- 日志含义：进程崩溃次数过多，系统停止继续重启。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Name`：组件或对象名称。
  - `PID`：进程 ID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmProcessCrashedTooMuch()；搜索关键词：`writeAmProcessCrashedTooMuch` 或 `am_process_crashed_too_much`

### `am_drop_process`（EventLog tag `30033`）

- 日志含义：AMS 丢弃找不到记录的进程。
- 日志字段：
  - `PID`：进程 ID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmDropProcess()；搜索关键词：`writeAmDropProcess` 或 `am_drop_process`

### `am_service_crashed_too_much`（EventLog tag `30034`）

- 日志含义：Service 所属进程崩溃过多。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Crash Count`：崩溃次数。
  - `Component Name`：组件名称。
  - `PID`：进程 ID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmServiceCrashedTooMuch()；搜索关键词：`writeAmServiceCrashedTooMuch` 或 `am_service_crashed_too_much`

### `am_schedule_service_restart`（EventLog tag `30035`）

- 日志含义：为崩溃的 Service 安排重启。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Component Name`：组件名称。
  - `Time`：时间。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmScheduleServiceRestart()；搜索关键词：`writeAmScheduleServiceRestart` 或 `am_schedule_service_restart`

### `am_provider_lost_process`（EventLog tag `30036`）

- 日志含义：ContentProvider 所属进程丢失。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Package Name`：应用包名。
  - `UID`：应用 UID。
  - `Name`：组件或对象名称。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmProviderLostProcess()；搜索关键词：`writeAmProviderLostProcess` 或 `am_provider_lost_process`

### `am_process_start_timeout`（EventLog tag `30037`）

- 日志含义：应用进程启动超时。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `PID`：进程 ID。
  - `UID`：应用 UID。
  - `Process Name`：进程名。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmProcessStartTimeout()；搜索关键词：`writeAmProcessStartTimeout` 或 `am_process_start_timeout`

### `am_crash`（EventLog tag `30039`）

- 日志含义：记录应用崩溃异常。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `PID`：进程 ID。
  - `Process Name`：进程名。
  - `Flags`：标志位。
  - `Exception`：异常类型。
  - `Message`：附加消息。
  - `File`：异常来源文件。
  - `Line`：异常来源行号。
  - `Recoverable`：是否可恢复。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmCrash()；搜索关键词：`writeAmCrash` 或 `am_crash`

### `am_wtf`（EventLog tag `30040`）

- 日志含义：记录系统 WTF（严重逻辑错误）事件。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `PID`：进程 ID。
  - `Process Name`：进程名。
  - `Flags`：标志位。
  - `Tag`：事件中的 Tag 字段，表示与该操作相关的运行时值。
  - `Message`：附加消息。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmWtf()；搜索关键词：`writeAmWtf` 或 `am_wtf`

### `am_switch_user`（EventLog tag `30041`）

- 日志含义：系统切换到指定 Android 用户。
- 日志字段：
  - `id`：事件涉及的用户、任务或状态 ID，具体含义由事件上下文决定。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmSwitchUser()；搜索关键词：`writeAmSwitchUser` 或 `am_switch_user`

### `wm_set_resumed_activity`（EventLog tag `30043`）

- 日志含义：设置当前 resumed Activity。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmSetResumedActivity()；搜索关键词：`writeWmSetResumedActivity` 或 `wm_set_resumed_activity`

### `wm_focused_root_task`（EventLog tag `30044`）

- 日志含义：焦点 RootTask 发生变化。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Display Id`：显示屏 ID。
  - `Focused Root Task Id`：事件中的 Focused Root Task Id 字段，表示与该操作相关的运行时值。
  - `Last Focused Root Task Id`：事件中的 Last Focused Root Task Id 字段，表示与该操作相关的运行时值。
  - `Reason`：触发原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmFocusedRootTask()；搜索关键词：`writeWmFocusedRootTask` 或 `wm_focused_root_task`

### `am_pre_boot`（EventLog tag `30045`）

- 日志含义：向用户下发 PRE_BOOT_COMPLETED 处理。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Package`：应用包名。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmPreBoot()；搜索关键词：`writeAmPreBoot` 或 `am_pre_boot`

### `am_meminfo`（EventLog tag `30046`）

- 日志含义：记录系统内存概况。
- 日志字段：
  - `Cached`：缓存内存。
  - `Free`：空闲内存。
  - `Zram`：ZRAM 使用量。
  - `Kernel`：内核内存。
  - `Native`：Native 内存。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmMeminfo()；搜索关键词：`writeAmMeminfo` 或 `am_meminfo`

### `am_pss`（EventLog tag `30047`）

- 日志含义：采集进程 PSS/USS 等内存统计。
- 日志字段：
  - `Pid`：进程 ID。
  - `UID`：应用 UID。
  - `Process Name`：进程名。
  - `Pss`：比例驻留集大小（KB）。
  - `Uss`：唯一驻留集大小（KB）。
  - `SwapPss`：事件中的 SwapPss 字段，表示与该操作相关的运行时值。
  - `Rss`：驻留集大小（KB）。
  - `StatType`：统计类型。
  - `ProcState`：进程状态。
  - `TimeToCollect`：采集耗时。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmPss()；搜索关键词：`writeAmPss` 或 `am_pss`

### `wm_stop_activity`（EventLog tag `30048`）

- 日志含义：停止 Activity。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmStopActivity()；搜索关键词：`writeWmStopActivity` 或 `wm_stop_activity`

### `wm_on_stop_called`（EventLog tag `30049`）

- 日志含义：客户端回调 Activity.onStop() 完成。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：应用进程 `android.app.Activity.onStop()` → EventLogTags.writeWmOnStopCalled()；搜索关键词：`writeWmOnStopCalled` 或 `wm_on_stop_called`

### `am_mem_factor`（EventLog tag `30050`）

- 日志含义：更新进程内存压力因子。
- 日志字段：
  - `Current`：当前内存因子。
  - `Previous`：之前内存因子。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmMemFactor()；搜索关键词：`writeAmMemFactor` 或 `am_mem_factor`

### `am_user_state_changed`（EventLog tag `30051`）

- 日志含义：用户状态发生变化。
- 日志字段：
  - `id`：事件涉及的用户、任务或状态 ID，具体含义由事件上下文决定。
  - `state`：用户或系统状态值。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmUserStateChanged()；搜索关键词：`writeAmUserStateChanged` 或 `am_user_state_changed`

### `am_uid_running`（EventLog tag `30052`）

- 日志含义：UID 下有进程开始运行。
- 日志字段：
  - `UID`：应用 UID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmUidRunning()；搜索关键词：`writeAmUidRunning` 或 `am_uid_running`

### `am_uid_stopped`（EventLog tag `30053`）

- 日志含义：UID 下所有进程已停止。
- 日志字段：
  - `UID`：应用 UID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmUidStopped()；搜索关键词：`writeAmUidStopped` 或 `am_uid_stopped`

### `am_uid_active`（EventLog tag `30054`）

- 日志含义：UID 被标记为活跃。
- 日志字段：
  - `UID`：应用 UID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmUidActive()；搜索关键词：`writeAmUidActive` 或 `am_uid_active`

### `am_uid_idle`（EventLog tag `30055`）

- 日志含义：UID 进入空闲状态。
- 日志字段：
  - `UID`：应用 UID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmUidIdle()；搜索关键词：`writeAmUidIdle` 或 `am_uid_idle`

### `am_stop_idle_service`（EventLog tag `30056`）

- 日志含义：停止空闲 UID 的服务。
- 日志字段：
  - `UID`：应用 UID。
  - `Component Name`：组件名称。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmStopIdleService()；搜索关键词：`writeAmStopIdleService` 或 `am_stop_idle_service`

### `wm_on_create_called`（EventLog tag `30057`）

- 日志含义：客户端回调 Activity.onCreate() 完成。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：应用进程 `android.app.Activity.onCreate()` → EventLogTags.writeWmOnCreateCalled()；搜索关键词：`writeWmOnCreateCalled` 或 `wm_on_create_called`

### `wm_on_restart_called`（EventLog tag `30058`）

- 日志含义：客户端回调 Activity.onRestart() 完成。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：应用进程 `android.app.Activity.onRestart()` → EventLogTags.writeWmOnRestartCalled()；搜索关键词：`writeWmOnRestartCalled` 或 `wm_on_restart_called`

### `wm_on_start_called`（EventLog tag `30059`）

- 日志含义：客户端回调 Activity.onStart() 完成。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：应用进程 `android.app.Activity.onStart()` → EventLogTags.writeWmOnStartCalled()；搜索关键词：`writeWmOnStartCalled` 或 `wm_on_start_called`

### `wm_on_destroy_called`（EventLog tag `30060`）

- 日志含义：客户端回调 Activity.onDestroy() 完成。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：应用进程 `android.app.Activity.onDestroy()` → EventLogTags.writeWmOnDestroyCalled()；搜索关键词：`writeWmOnDestroyCalled` 或 `wm_on_destroy_called`

### `wm_on_activity_result_called`（EventLog tag `30062`）

- 日志含义：客户端收到 Activity result 回调。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
- 触发流程：应用进程 `android.app.Activity.onActivityResult()` → EventLogTags.writeWmOnActivityResultCalled()；搜索关键词：`writeWmOnActivityResultCalled` 或 `wm_on_activity_result_called`

### `am_compact`（EventLog tag `30063`）

- 日志含义：对进程执行内存压缩（compact）操作。
- 日志字段：
  - `Pid`：进程 ID。
  - `Process Name`：进程名。
  - `Action`：动作。
  - `BeforeRssTotal`：压缩前 RSS 总量。
  - `BeforeRssFile`：压缩前文件 RSS。
  - `BeforeRssAnon`：压缩前匿名 RSS。
  - `BeforeRssSwap`：压缩前交换 RSS。
  - `DeltaRssTotal`：RSS 总量变化。
  - `DeltaRssFile`：文件 RSS 变化。
  - `DeltaRssAnon`：匿名 RSS 变化。
  - `DeltaRssSwap`：交换 RSS 变化。
  - `Time`：时间。
  - `LastAction`：上次压缩动作。
  - `LastActionTimestamp`：上次动作时间。
  - `setAdj`：设置的 OOM adj。
  - `procState`：进程状态值。
  - `BeforeZRAMFree`：压缩前 ZRAM 空闲量。
  - `DeltaZRAMFree`：ZRAM 空闲量变化。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmCompact()；搜索关键词：`writeAmCompact` 或 `am_compact`

### `wm_on_top_resumed_gained_called`（EventLog tag `30064`）

- 日志含义：Activity 获得 top-resumed 状态回调。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
- 触发流程：应用进程 `android.app.Activity.onTopResumedActivityChanged(true)` → EventLogTags.writeWmOnTopResumedGainedCalled()；搜索关键词：`writeWmOnTopResumedGainedCalled` 或 `wm_on_top_resumed_gained_called`

### `wm_on_top_resumed_lost_called`（EventLog tag `30065`）

- 日志含义：Activity 失去 top-resumed 状态回调。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
- 触发流程：应用进程 `android.app.Activity.onTopResumedActivityChanged(false)` → EventLogTags.writeWmOnTopResumedLostCalled()；搜索关键词：`writeWmOnTopResumedLostCalled` 或 `wm_on_top_resumed_lost_called`

### `wm_add_to_stopping`（EventLog tag `30066`）

- 日志含义：Activity 被加入 stopping 列表。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `Reason`：触发原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmAddToStopping()；搜索关键词：`writeWmAddToStopping` 或 `wm_add_to_stopping`

### `wm_set_keyguard_shown`（EventLog tag `30067`）

- 日志含义：更新锁屏/AOD 显示状态。
- 日志字段：
  - `Display Id`：显示屏 ID。
  - `keyguardShowing`：锁屏是否显示。
  - `aodShowing`：AOD 是否显示。
  - `keyguardGoingAway`：锁屏是否正在退出。
  - `occluded`：是否被遮挡。
  - `Reason`：触发原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmSetKeyguardShown()；搜索关键词：`writeWmSetKeyguardShown` 或 `wm_set_keyguard_shown`

### `am_freeze`（EventLog tag `30068`）

- 日志含义：冻结应用进程。
- 日志字段：
  - `Pid`：进程 ID。
  - `Process Name`：进程名。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmFreeze()；搜索关键词：`writeAmFreeze` 或 `am_freeze`

### `am_unfreeze`（EventLog tag `30069`）

- 日志含义：解除应用进程冻结。
- 日志字段：
  - `Pid`：进程 ID。
  - `Process Name`：进程名。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmUnfreeze()；搜索关键词：`writeAmUnfreeze` 或 `am_unfreeze`

### `uc_finish_user_unlocking`（EventLog tag `30070`）

- 日志含义：用户解锁流程阶段完成（unlocking）。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcFinishUserUnlocking()；搜索关键词：`writeUcFinishUserUnlocking` 或 `uc_finish_user_unlocking`

### `uc_finish_user_unlocked`（EventLog tag `30071`）

- 日志含义：用户解锁完成。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcFinishUserUnlocked()；搜索关键词：`writeUcFinishUserUnlocked` 或 `uc_finish_user_unlocked`

### `uc_finish_user_unlocked_completed`（EventLog tag `30072`）

- 日志含义：用户解锁后的完整回调处理完成。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcFinishUserUnlockedCompleted()；搜索关键词：`writeUcFinishUserUnlockedCompleted` 或 `uc_finish_user_unlocked_completed`

### `uc_finish_user_stopping`（EventLog tag `30073`）

- 日志含义：用户停止流程阶段完成。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcFinishUserStopping()；搜索关键词：`writeUcFinishUserStopping` 或 `uc_finish_user_stopping`

### `uc_finish_user_stopped`（EventLog tag `30074`）

- 日志含义：用户已停止。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcFinishUserStopped()；搜索关键词：`writeUcFinishUserStopped` 或 `uc_finish_user_stopped`

### `uc_switch_user`（EventLog tag `30075`）

- 日志含义：UserController 开始切换用户。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcSwitchUser()；搜索关键词：`writeUcSwitchUser` 或 `uc_switch_user`

### `uc_start_user_internal`（EventLog tag `30076`）

- 日志含义：开始启动用户内部流程。
- 日志字段：
  - `userId`：Android 用户 ID。
  - `foreground`：是否前台启动。
  - `displayId`：显示屏 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcStartUserInternal()；搜索关键词：`writeUcStartUserInternal` 或 `uc_start_user_internal`

### `uc_unlock_user`（EventLog tag `30077`）

- 日志含义：开始解锁指定用户。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcUnlockUser()；搜索关键词：`writeUcUnlockUser` 或 `uc_unlock_user`

### `uc_finish_user_boot`（EventLog tag `30078`）

- 日志含义：完成用户启动阶段。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcFinishUserBoot()；搜索关键词：`writeUcFinishUserBoot` 或 `uc_finish_user_boot`

### `uc_dispatch_user_switch`（EventLog tag `30079`）

- 日志含义：分发用户切换事件。
- 日志字段：
  - `oldUserId`：原用户 ID。
  - `newUserId`：新用户 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcDispatchUserSwitch()；搜索关键词：`writeUcDispatchUserSwitch` 或 `uc_dispatch_user_switch`

### `uc_continue_user_switch`（EventLog tag `30080`）

- 日志含义：继续执行用户切换。
- 日志字段：
  - `oldUserId`：原用户 ID。
  - `newUserId`：新用户 ID。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcContinueUserSwitch()；搜索关键词：`writeUcContinueUserSwitch` 或 `uc_continue_user_switch`

### `uc_send_user_broadcast`（EventLog tag `30081`）

- 日志含义：向用户发送生命周期广播。
- 日志字段：
  - `userId`：Android 用户 ID。
  - `IntentAction`：广播 Intent action。
- 触发流程：UserController 相关方法 → EventLogTags.writeUcSendUserBroadcast()；搜索关键词：`writeUcSendUserBroadcast` 或 `uc_send_user_broadcast`

### `ssm_user_starting`（EventLog tag `30082`）

- 日志含义：系统开始启动指定用户的生命周期处理。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：SystemServiceManager 相关用户生命周期方法 → EventLogTags.writeSsmUserStarting()；搜索关键词：`writeSsmUserStarting` 或 `ssm_user_starting`

### `ssm_user_switching`（EventLog tag `30083`）

- 日志含义：系统开始从旧用户切换到新用户。
- 日志字段：
  - `oldUserId`：原用户 ID。
  - `newUserId`：新用户 ID。
- 触发流程：SystemServiceManager 用户切换方法 → EventLogTags.writeSsmUserSwitching()；搜索关键词：`writeSsmUserSwitching` 或 `ssm_user_switching`

### `ssm_user_unlocking`（EventLog tag `30084`）

- 日志含义：系统开始处理用户解锁生命周期回调。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：SystemServiceManager 用户解锁方法 → EventLogTags.writeSsmUserUnlocking()；搜索关键词：`writeSsmUserUnlocking` 或 `ssm_user_unlocking`

### `ssm_user_unlocked`（EventLog tag `30085`）

- 日志含义：系统服务已收到用户解锁完成事件。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：SystemServiceManager 用户解锁完成方法 → EventLogTags.writeSsmUserUnlocked()；搜索关键词：`writeSsmUserUnlocked` 或 `ssm_user_unlocked`

### `ssm_user_stopping`（EventLog tag `30086`）

- 日志含义：系统开始停止指定用户的生命周期处理。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：SystemServiceManager 用户停止方法 → EventLogTags.writeSsmUserStopping()；搜索关键词：`writeSsmUserStopping` 或 `ssm_user_stopping`

### `ssm_user_stopped`（EventLog tag `30087`）

- 日志含义：系统服务已完成指定用户停止处理。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：SystemServiceManager 用户停止完成方法 → EventLogTags.writeSsmUserStopped()；搜索关键词：`writeSsmUserStopped` 或 `ssm_user_stopped`

### `ssm_user_completed_event`（EventLog tag `30088`）

- 日志含义：系统服务完成一次用户生命周期事件处理。
- 日志字段：
  - `userId`：Android 用户 ID。
  - `eventFlag`：用户生命周期事件标志。
- 触发流程：SystemServiceManager 用户事件完成方法 → EventLogTags.writeSsmUserCompletedEvent()；搜索关键词：`writeSsmUserCompletedEvent` 或 `ssm_user_completed_event`

### `um_user_visibility_changed`（EventLog tag `30091`）

- 日志含义：用户可见性发生变化。
- 日志字段：
  - `userId`：Android 用户 ID。
  - `visible`：用户/窗口是否可见。
- 触发流程：UserManagerService 相关方法 → EventLogTags.writeUmUserVisibilityChanged()；搜索关键词：`writeUmUserVisibilityChanged` 或 `um_user_visibility_changed`

### `am_foreground_service_start`（EventLog tag `30100`）

- 日志含义：前台服务启动并记录权限与通知状态。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Component Name`：组件名称。
  - `allowWhileInUse`：是否允许 while-in-use 权限。
  - `startReasonCode`：启动原因代码。
  - `targetSdk`：目标 SDK 版本。
  - `callerTargetSdk`：调用方目标 SDK 版本。
  - `notificationWasDeferred`：通知是否延迟。
  - `notificationShown`：通知是否已显示。
  - `durationMs`：持续时间（毫秒）。
  - `startForegroundCount`：进入前台次数。
  - `stopReason`：停止原因。
  - `fgsType`：前台服务类型。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmForegroundServiceStart()；搜索关键词：`writeAmForegroundServiceStart` 或 `am_foreground_service_start`

### `am_foreground_service_denied`（EventLog tag `30101`）

- 日志含义：前台服务启动请求被拒绝。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Component Name`：组件名称。
  - `allowWhileInUse`：是否允许 while-in-use 权限。
  - `startReasonCode`：启动原因代码。
  - `targetSdk`：目标 SDK 版本。
  - `callerTargetSdk`：调用方目标 SDK 版本。
  - `notificationWasDeferred`：通知是否延迟。
  - `notificationShown`：通知是否已显示。
  - `durationMs`：持续时间（毫秒）。
  - `startForegroundCount`：进入前台次数。
  - `stopReason`：停止原因。
  - `fgsType`：前台服务类型。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmForegroundServiceDenied()；搜索关键词：`writeAmForegroundServiceDenied` 或 `am_foreground_service_denied`

### `am_foreground_service_stop`（EventLog tag `30102`）

- 日志含义：前台服务停止。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Component Name`：组件名称。
  - `allowWhileInUse`：是否允许 while-in-use 权限。
  - `startReasonCode`：启动原因代码。
  - `targetSdk`：目标 SDK 版本。
  - `callerTargetSdk`：调用方目标 SDK 版本。
  - `notificationWasDeferred`：通知是否延迟。
  - `notificationShown`：通知是否已显示。
  - `durationMs`：持续时间（毫秒）。
  - `startForegroundCount`：进入前台次数。
  - `stopReason`：停止原因。
  - `fgsType`：前台服务类型。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmForegroundServiceStop()；搜索关键词：`writeAmForegroundServiceStop` 或 `am_foreground_service_stop`

### `am_foreground_service_timed_out`（EventLog tag `30103`）

- 日志含义：前台服务运行超时。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Component Name`：组件名称。
  - `allowWhileInUse`：是否允许 while-in-use 权限。
  - `startReasonCode`：启动原因代码。
  - `targetSdk`：目标 SDK 版本。
  - `callerTargetSdk`：调用方目标 SDK 版本。
  - `notificationWasDeferred`：通知是否延迟。
  - `notificationShown`：通知是否已显示。
  - `durationMs`：持续时间（毫秒）。
  - `startForegroundCount`：进入前台次数。
  - `stopReason`：停止原因。
  - `fgsType`：前台服务类型。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmForegroundServiceTimedOut()；搜索关键词：`writeAmForegroundServiceTimedOut` 或 `am_foreground_service_timed_out`

### `am_cpu`（EventLog tag `30104`）

- 日志含义：记录进程 CPU 时间统计。
- 日志字段：
  - `Pid`：进程 ID。
  - `UID`：应用 UID。
  - `Base Name`：进程基名。
  - `Uptime`：进程运行时间。
  - `Stime`：内核态 CPU 时间。
  - `Utime`：用户态 CPU 时间。
- 触发流程：`com.android.server.am.AppProfiler` CPU 采样方法 → EventLogTags.writeAmCpu()；搜索关键词：`writeAmCpu` 或 `am_cpu`

### `am_intent_sender_redirect_user`（EventLog tag `30110`）

- 日志含义：IntentSender 调用被重定向到指定用户。
- 日志字段：
  - `userId`：Android 用户 ID。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmIntentSenderRedirectUser()；搜索关键词：`writeAmIntentSenderRedirectUser` 或 `am_intent_sender_redirect_user`

### `am_uid_state_changed`（EventLog tag `30111`）

- 日志含义：UID 状态发生变化。
- 日志字段：
  - `UID`：应用 UID。
  - `Seq`：状态序列号。
  - `UidState`：UID 状态。
  - `OldUidState`：旧 UID 状态。
  - `Capability`：UID 能力位。
  - `OldCapability`：旧能力位。
  - `Flags`：标志位。
  - `reason`：触发原因。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmUidStateChanged()；搜索关键词：`writeAmUidStateChanged` 或 `am_uid_state_changed`

### `am_proc_state_changed`（EventLog tag `30112`）

- 日志含义：进程状态或 OOM 调整值发生变化。
- 日志字段：
  - `UID`：应用 UID。
  - `PID`：进程 ID。
  - `Seq`：状态序列号。
  - `ProcState`：进程状态。
  - `OldProcState`：事件中的 OldProcState 字段，表示与该操作相关的运行时值。
  - `OomAdj`：进程 OOM 调整值。
  - `OldOomAdj`：事件中的 OldOomAdj 字段，表示与该操作相关的运行时值。
  - `reason`：触发原因。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmProcStateChanged()；搜索关键词：`writeAmProcStateChanged` 或 `am_proc_state_changed`

### `am_oom_adj_misc`（EventLog tag `30113`）

- 日志含义：记录 OOM 调整相关辅助事件。
- 日志字段：
  - `Event`：OOM 事件类型。
  - `UID`：应用 UID。
  - `PID`：进程 ID。
  - `Seq`：状态序列号。
  - `Arg1`：事件中的 Arg1 字段，表示与该操作相关的运行时值。
  - `Arg2`：事件中的 Arg2 字段，表示与该操作相关的运行时值。
  - `reason`：触发原因。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmOomAdjMisc()；搜索关键词：`writeAmOomAdjMisc` 或 `am_oom_adj_misc`

### `am_clear_app_data_caller`（EventLog tag `30120`）

- 日志含义：记录清除应用数据的调用方。
- 日志字段：
  - `pid`：进程 ID。
  - `uid`：应用 UID。
  - `package`：事件中的 package 字段，表示与该操作相关的运行时值。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeAmClearAppDataCaller()；搜索关键词：`writeAmClearAppDataCaller` 或 `am_clear_app_data_caller`

### `wm_no_surface_memory`（EventLog tag `31000`）

- 日志含义：窗口操作因 Surface 内存不足。
- 日志字段：
  - `Window`：窗口名称。
  - `PID`：进程 ID。
  - `Operation`：窗口操作名称。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmNoSurfaceMemory()；搜索关键词：`writeWmNoSurfaceMemory` 或 `wm_no_surface_memory`

### `wm_task_created`（EventLog tag `31001`）

- 日志含义：WindowManager 创建任务。
- 日志字段：
  - `TaskId`：任务 ID。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmTaskCreated()；搜索关键词：`writeWmTaskCreated` 或 `wm_task_created`

### `wm_task_moved`（EventLog tag `31002`）

- 日志含义：任务在显示设备或任务栈中移动。
- 日志字段：
  - `TaskId`：任务 ID。
  - `Root Task ID`：根任务 ID。
  - `Display Id`：显示屏 ID。
  - `ToTop`：是否移到顶部。
  - `Index`：任务索引。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmTaskMoved()；搜索关键词：`writeWmTaskMoved` 或 `wm_task_moved`

### `wm_task_removed`（EventLog tag `31003`）

- 日志含义：任务被移除。
- 日志字段：
  - `TaskId`：任务 ID。
  - `Root Task ID`：根任务 ID。
  - `Display Id`：显示屏 ID。
  - `Reason`：触发原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmTaskRemoved()；搜索关键词：`writeWmTaskRemoved` 或 `wm_task_removed`

### `wm_tf_created`（EventLog tag `31004`）

- 日志含义：创建 TaskFragment token。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `TaskId`：任务 ID。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmTfCreated()；搜索关键词：`writeWmTfCreated` 或 `wm_tf_created`

### `wm_tf_removed`（EventLog tag `31005`）

- 日志含义：移除 TaskFragment token。
- 日志字段：
  - `Token`：Activity/窗口令牌。
  - `TaskId`：任务 ID。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmTfRemoved()；搜索关键词：`writeWmTfRemoved` 或 `wm_tf_removed`

### `wm_set_requested_orientation`（EventLog tag `31006`）

- 日志含义：设置 Activity 请求的屏幕方向。
- 日志字段：
  - `Orientation`：请求的屏幕方向。
  - `Component Name`：组件名称。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmSetRequestedOrientation()；搜索关键词：`writeWmSetRequestedOrientation` 或 `wm_set_requested_orientation`

### `wm_boot_animation_done`（EventLog tag `31007`）

- 日志含义：开机动画完成。
- 日志字段：
  - `time`：耗时或时间戳（毫秒）。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmBootAnimationDone()；搜索关键词：`writeWmBootAnimationDone` 或 `wm_boot_animation_done`

### `wm_set_keyguard_occluded`（EventLog tag `31008`）

- 日志含义：设置锁屏遮挡状态。
- 日志字段：
  - `occluded`：是否被遮挡。
  - `animate`：是否执行动画。
  - `transit`：转场类型。
  - `Channel`：Surface 控制通道。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmSetKeyguardOccluded()；搜索关键词：`writeWmSetKeyguardOccluded` 或 `wm_set_keyguard_occluded`

### `wm_back_navi_canceled`（EventLog tag `31100`）

- 日志含义：返回导航操作被取消。
- 日志字段：
  - `Reason`：触发原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmBackNaviCanceled()；搜索关键词：`writeWmBackNaviCanceled` 或 `wm_back_navi_canceled`

### `wm_wallpaper_surface`（EventLog tag `33001`）

- 日志含义：更新壁纸 Surface 可见性。
- 日志字段：
  - `Display Id`：显示屏 ID。
  - `Visible`：事件中的 Visible 字段，表示与该操作相关的运行时值。
  - `Target`：事件中的 Target 字段，表示与该操作相关的运行时值。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmWallpaperSurface()；搜索关键词：`writeWmWallpaperSurface` 或 `wm_wallpaper_surface`

### `wm_enter_pip`（EventLog tag `38000`）

- 日志含义：Activity 进入画中画（PIP）模式。
- 日志字段：
  - `User`：Android 用户 ID（不是 UID）。
  - `Token`：Activity/窗口令牌。
  - `Component Name`：组件名称。
  - `is Auto Enter`：是否自动进入 PIP。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmEnterPip()；搜索关键词：`writeWmEnterPip` 或 `wm_enter_pip`

### `wm_dim_created`（EventLog tag `38200`）

- 日志含义：创建窗口 Dim 层。
- 日志字段：
  - `Host`：宿主对象。
  - `Surface`：Surface 名称。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmDimCreated()；搜索关键词：`writeWmDimCreated` 或 `wm_dim_created`

### `wm_dim_exit`（EventLog tag `38201`）

- 日志含义：退出窗口 Dim 状态。
- 日志字段：
  - `Surface`：Surface 名称。
  - `dimmingWindow`：执行 Dim 的窗口。
  - `hostIsVisible`：宿主是否可见。
  - `removeImmediately`：是否立即移除。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmDimExit()；搜索关键词：`writeWmDimExit` 或 `wm_dim_exit`

### `wm_dim_animate`（EventLog tag `38202`）

- 日志含义：执行 Dim 层透明度/模糊动画。
- 日志字段：
  - `Surface`：Surface 名称。
  - `toAlpha`：目标透明度。
  - `toBlur`：目标模糊半径。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmDimAnimate()；搜索关键词：`writeWmDimAnimate` 或 `wm_dim_animate`

### `wm_dim_cancel_anim`（EventLog tag `38203`）

- 日志含义：取消 Dim 动画。
- 日志字段：
  - `Surface`：Surface 名称。
  - `reason`：触发原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmDimCancelAnim()；搜索关键词：`writeWmDimCancelAnim` 或 `wm_dim_cancel_anim`

### `wm_dim_finish_anim`（EventLog tag `38204`）

- 日志含义：Dim 动画完成。
- 日志字段：
  - `Surface`：Surface 名称。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmDimFinishAnim()；搜索关键词：`writeWmDimFinishAnim` 或 `wm_dim_finish_anim`

### `wm_dim_removed`（EventLog tag `38205`）

- 日志含义：移除 Dim 层。
- 日志字段：
  - `Surface`：Surface 名称。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmDimRemoved()；搜索关键词：`writeWmDimRemoved` 或 `wm_dim_removed`

### `wm_shell_enter_desktop_mode`（EventLog tag `38500`）

- 日志含义：进入桌面模式。
- 日志字段：
  - `EnterReason`：进入桌面模式原因。
  - `SessionId`：桌面会话 ID。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmShellEnterDesktopMode()；搜索关键词：`writeWmShellEnterDesktopMode` 或 `wm_shell_enter_desktop_mode`

### `wm_shell_exit_desktop_mode`（EventLog tag `38501`）

- 日志含义：退出桌面模式。
- 日志字段：
  - `ExitReason`：退出桌面模式原因。
  - `SessionId`：桌面会话 ID。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmShellExitDesktopMode()；搜索关键词：`writeWmShellExitDesktopMode` 或 `wm_shell_exit_desktop_mode`

### `wm_shell_desktop_mode_task_update`（EventLog tag `38502`）

- 日志含义：桌面模式任务状态更新。
- 日志字段：
  - `TaskEvent`：任务事件类型。
  - `InstanceId`：任务实例 ID。
  - `uid`：应用 UID。
  - `TaskHeight`：任务高度。
  - `TaskWidth`：任务宽度。
  - `TaskX`：任务 X 坐标。
  - `TaskY`：任务 Y 坐标。
  - `SessionId`：桌面会话 ID。
  - `MinimiseReason`：最小化原因。
  - `UnminimiseReason`：取消最小化原因。
  - `VisibleTaskCount`：可见任务数。
  - `FocusReason`：焦点变化原因。
- 触发流程：ActivityTaskManagerService/WindowManagerService 相关方法 → EventLogTags.writeWmShellDesktopModeTaskUpdate()；搜索关键词：`writeWmShellDesktopModeTaskUpdate` 或 `wm_shell_desktop_mode_task_update`

### `system_update`（EventLog tag `201001`）

- 日志含义：记录系统更新任务状态及下载结果。
- 日志字段：
  - `status`：状态码。
  - `download_result`：下载结果。
  - `bytes`：字节数。
  - `url`：更新包 URL。
- 触发流程：SystemServer/SystemUpdateManagerService 相关方法 → EventLogTags.writeSystemUpdate()；搜索关键词：`writeSystemUpdate` 或 `system_update`

### `system_update_user`（EventLog tag `201002`）

- 日志含义：记录用户触发的系统更新操作。
- 日志字段：
  - `action`：事件中的 action 字段，表示与该操作相关的运行时值。
- 触发流程：SystemServer/SystemUpdateManagerService 相关方法 → EventLogTags.writeSystemUpdateUser()；搜索关键词：`writeSystemUpdateUser` 或 `system_update_user`

## Automotive / Car

### Car Service Helper 生命周期

#### `car_helper_start`（EventLog tag `150000`）

- 日志含义：Car Service Helper 开始启动，进入 Car Service 初始化流程。

- 日志字段：无（仅记录事件发生）。

- 触发流程：`CarServiceHelperService.start()`（搜索关键词：`car_helper_start`、`CarServiceHelperService`、`EventLogTags.writeCarHelperStart`）。

#### `car_helper_boot_phase`（EventLog tag `150001`）

- 日志含义：Car Service Helper 正在处理系统启动阶段回调。

- 日志字段：`phase`：系统启动阶段。

- 触发流程：`CarServiceHelperService.bootPhase()`（搜索关键词：`car_helper_boot_phase`、`CarServiceHelperService`、`EventLogTags.writeCarHelperBootPhase`）。

#### `car_helper_user_starting`（EventLog tag `150002`）

- 日志含义：系统开始为指定 Android 用户启动车载服务。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`CarServiceHelperService.userStarting()`（搜索关键词：`car_helper_user_starting`、`CarServiceHelperService`、`EventLogTags.writeCarHelperUserStarting`）。

#### `car_helper_user_switching`（EventLog tag `150003`）

- 日志含义：系统正在执行用户切换，通知车载服务准备从旧用户切到新用户。

- 日志字段：`from_user_id`：切换前用户 ID。 `to_user_id`：切换目标用户 ID。

- 触发流程：`CarServiceHelperService.userSwitching()`（搜索关键词：`car_helper_user_switching`、`CarServiceHelperService`、`EventLogTags.writeCarHelperUserSwitching`）。

#### `car_helper_user_unlocking`（EventLog tag `150004`）

- 日志含义：系统正在解锁用户，Car Service Helper 开始处理解锁相关工作。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`CarServiceHelperService.userUnlocking()`（搜索关键词：`car_helper_user_unlocking`、`CarServiceHelperService`、`EventLogTags.writeCarHelperUserUnlocking`）。

#### `car_helper_user_unlocked`（EventLog tag `150005`）

- 日志含义：用户解锁完成，Car Service Helper 收到并转发用户已解锁事件。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`CarServiceHelperService.userUnlocked()`（搜索关键词：`car_helper_user_unlocked`、`CarServiceHelperService`、`EventLogTags.writeCarHelperUserUnlocked`）。

#### `car_helper_user_stopping`（EventLog tag `150006`）

- 日志含义：系统开始停止用户，Car Service Helper 处理用户停止前工作。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`CarServiceHelperService.userStopping()`（搜索关键词：`car_helper_user_stopping`、`CarServiceHelperService`、`EventLogTags.writeCarHelperUserStopping`）。

#### `car_helper_user_stopped`（EventLog tag `150007`）

- 日志含义：用户停止完成，Car Service Helper 收到用户已停止通知。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`CarServiceHelperService.userStopped()`（搜索关键词：`car_helper_user_stopped`、`CarServiceHelperService`、`EventLogTags.writeCarHelperUserStopped`）。

#### `car_helper_svc_connected`（EventLog tag `150008`）

- 日志含义：Car Service Helper 已与 Car Service 建立 Binder 连接。

- 日志字段：无（仅记录事件发生）。

- 触发流程：`CarServiceHelperService.svcConnected()`（搜索关键词：`car_helper_svc_connected`、`CarServiceHelperService`、`EventLogTags.writeCarHelperSvcConnected`）。

#### `car_helper_watchdog_anr_kill`（EventLog tag `150016`）

- 日志含义：Car Service Helper 因 Watchdog ANR 超时采取杀进程措施。

- 日志字段：无（仅记录事件发生）。

- 触发流程：`CarServiceHelperService.watchdogAnrKill()`（搜索关键词：`car_helper_watchdog_anr_kill`、`CarServiceHelperService`、`EventLogTags.writeCarHelperWatchdogAnrKill`）。

### Car Service 生命周期

#### `car_service_init`（EventLog tag `150050`）

- 日志含义：Car Service 开始初始化并创建内部服务。

- 日志字段：`number_services`：已创建/注册的 Car 服务数量。

- 触发流程：`CarService.init()`（搜索关键词：`car_service_init`、`CarService`、`EventLogTags.writeCarServiceInit`）。

#### `car_service_vhal_reconnected`（EventLog tag `150051`）

- 日志含义：VHAL 重新连接，Car Service 正在恢复依赖 VHAL 的服务。

- 日志字段：`number_services`：已创建/注册的 Car 服务数量。

- 触发流程：`CarService.vhalReconnected()`（搜索关键词：`car_service_vhal_reconnected`、`CarService`、`EventLogTags.writeCarServiceVhalReconnected`）。

#### `car_service_set_car_service_helper`（EventLog tag `150052`）

- 日志含义：Car Service 保存 Car Service Helper 的进程连接。

- 日志字段：`pid`：Car Service 进程 PID。

- 触发流程：`CarService.setCarServiceHelper()`（搜索关键词：`car_service_set_car_service_helper`、`CarService`、`EventLogTags.writeCarServiceSetCarServiceHelper`）。

#### `car_service_on_user_lifecycle`（EventLog tag `150053`）

- 日志含义：Car Service 收到一次用户生命周期事件并开始分发。

- 日志字段：`type`：生命周期或请求类型。 `from_user_id`：切换前用户 ID。 `to_user_id`：切换目标用户 ID。

- 触发流程：`CarService.onUserLifecycle()`（搜索关键词：`car_service_on_user_lifecycle`、`CarService`、`EventLogTags.writeCarServiceOnUserLifecycle`）。

#### `car_service_create`（EventLog tag `150055`）

- 日志含义：Car Service 实例创建完成，记录是否检测到 VHAL。

- 日志字段：`has_vhal`：是否存在可用 VHAL。

- 触发流程：`CarService.create()`（搜索关键词：`car_service_create`、`CarService`、`EventLogTags.writeCarServiceCreate`）。

#### `car_service_connected`（EventLog tag `150056`）

- 日志含义：Car Service 的 Binder 服务已连接并开始提供接口。

- 日志字段：`interface`：连接的 Binder 接口名。

- 触发流程：`CarService.connected()`（搜索关键词：`car_service_connected`、`CarService`、`EventLogTags.writeCarServiceConnected`）。

#### `car_service_destroy`（EventLog tag `150057`）

- 日志含义：Car Service 开始销毁，记录销毁时是否仍有 VHAL。

- 日志字段：`has_vhal`：是否存在可用 VHAL。

- 触发流程：`CarService.destroy()`（搜索关键词：`car_service_destroy`、`CarService`、`EventLogTags.writeCarServiceDestroy`）。

#### `car_service_vhal_died`（EventLog tag `150058`）

- 日志含义：检测到 VHAL 进程死亡，Car Service 进入断连处理。

- 日志字段：`cookie`：VHAL death-recipient cookie。

- 触发流程：`CarService.vhalDied()`（搜索关键词：`car_service_vhal_died`、`CarService`、`EventLogTags.writeCarServiceVhalDied`）。

#### `car_service_init_boot_user`（EventLog tag `150059`）

- 日志含义：Car Service 正在初始化系统启动阶段的初始用户。

- 日志字段：无（仅记录事件发生）。

- 触发流程：`CarService.initBootUser()`（搜索关键词：`car_service_init_boot_user`、`CarService`、`EventLogTags.writeCarServiceInitBootUser`）。

#### `car_service_on_user_removed`（EventLog tag `150060`）

- 日志含义：Car Service 收到用户移除通知并清理该用户数据。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`CarService.onUserRemoved()`（搜索关键词：`car_service_on_user_removed`、`CarService`、`EventLogTags.writeCarServiceOnUserRemoved`）。

### CarUserService 用户流程

#### `car_user_svc_initial_user_info_req`（EventLog tag `150100`）

- 日志含义：CarUserService 向 HAL/用户管理层请求初始用户信息。

- 日志字段：`request_type`：初始用户信息请求类型。 `timeout`：请求超时时间。 `current_user_id`：当前用户 ID。 `current_user_flags`：当前用户标志。 `number_existing_users`：已有用户数量。

- 触发流程：`CarUserService.initialUserInfoReq()`（搜索关键词：`car_user_svc_initial_user_info_req`、`CarUserService`、`EventLogTags.writeCarUserSvcInitialUserInfoReq`）。

#### `car_user_svc_initial_user_info_resp`（EventLog tag `150101`）

- 日志含义：CarUserService 收到初始用户信息响应，准备决定启动或切换动作。

- 日志字段：`status`：操作状态码。 `action`：HAL 要求执行的动作。 `user_id`：用户 ID。 `flags`：用户标志。 `safe_name`：脱敏后的用户名称。 `user_locales`：用户区域设置。

- 触发流程：`CarUserService.initialUserInfoResp()`（搜索关键词：`car_user_svc_initial_user_info_resp`、`CarUserService`、`EventLogTags.writeCarUserSvcInitialUserInfoResp`）。

#### `car_user_svc_set_initial_user`（EventLog tag `150103`）

- 日志含义：CarUserService 设置系统初始用户。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`CarUserService.setInitialUser()`（搜索关键词：`car_user_svc_set_initial_user`、`CarUserService`、`EventLogTags.writeCarUserSvcSetInitialUser`）。

#### `car_user_svc_set_lifecycle_listener`（EventLog tag `150104`）

- 日志含义：应用向 CarUserService 注册用户生命周期监听器。

- 日志字段：`uid`：调用方 UID。 `package_name`：调用方包名。

- 触发流程：`CarUserService.setLifecycleListener()`（搜索关键词：`car_user_svc_set_lifecycle_listener`、`CarUserService`、`EventLogTags.writeCarUserSvcSetLifecycleListener`）。

#### `car_user_svc_reset_lifecycle_listener`（EventLog tag `150105`）

- 日志含义：应用注销已注册的用户生命周期监听器。

- 日志字段：`uid`：调用方 UID。 `package_name`：调用方包名。

- 触发流程：`CarUserService.resetLifecycleListener()`（搜索关键词：`car_user_svc_reset_lifecycle_listener`、`CarUserService`、`EventLogTags.writeCarUserSvcResetLifecycleListener`）。

#### `car_user_svc_switch_user_req`（EventLog tag `150106`）

- 日志含义：CarUserService 收到用户切换请求并开始执行。

- 日志字段：`user_id`：用户 ID。 `timeout`：请求超时时间。

- 触发流程：`CarUserService.switchUserReq()`（搜索关键词：`car_user_svc_switch_user_req`、`CarUserService`、`EventLogTags.writeCarUserSvcSwitchUserReq`）。

#### `car_user_svc_switch_user_resp`（EventLog tag `150107`）

- 日志含义：CarUserService 返回用户切换结果。

- 日志字段：`hal_callback_status`：HAL 回调状态。 `user_switch_status`：用户切换状态。 `error_message`：错误信息。

- 触发流程：`CarUserService.switchUserResp()`（搜索关键词：`car_user_svc_switch_user_resp`、`CarUserService`、`EventLogTags.writeCarUserSvcSwitchUserResp`）。

#### `car_user_svc_post_switch_user_req`（EventLog tag `150108`）

- 日志含义：用户切换完成后，CarUserService 请求执行后置处理。

- 日志字段：`target_user_id`：目标用户 ID。 `current_user_id`：当前用户 ID。

- 触发流程：`CarUserService.postSwitchUserReq()`（搜索关键词：`car_user_svc_post_switch_user_req`、`CarUserService`、`EventLogTags.writeCarUserSvcPostSwitchUserReq`）。

#### `car_user_svc_get_user_auth_req`（EventLog tag `150109`）

- 日志含义：CarUserService 请求查询用户认证类型。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。 `number_types`：认证类型数量。

- 触发流程：`CarUserService.getUserAuthReq()`（搜索关键词：`car_user_svc_get_user_auth_req`、`CarUserService`、`EventLogTags.writeCarUserSvcGetUserAuthReq`）。

#### `car_user_svc_get_user_auth_resp`（EventLog tag `150110`）

- 日志含义：CarUserService 返回用户认证信息。

- 日志字段：`number_values`：返回值数量。

- 触发流程：`CarUserService.getUserAuthResp()`（搜索关键词：`car_user_svc_get_user_auth_resp`、`CarUserService`、`EventLogTags.writeCarUserSvcGetUserAuthResp`）。

#### `car_user_svc_switch_user_ui_req`（EventLog tag `150111`）

- 日志含义：用户界面发起用户切换请求。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`CarUserService.switchUserUiReq()`（搜索关键词：`car_user_svc_switch_user_ui_req`、`CarUserService`、`EventLogTags.writeCarUserSvcSwitchUserUiReq`）。

#### `car_user_svc_switch_user_from_hal_req`（EventLog tag `150112`）

- 日志含义：HAL 请求切换用户，CarUserService 开始处理该请求。

- 日志字段：`request_id`：请求 ID。 `uid`：调用方 UID。

- 触发流程：`CarUserService.switchUserFromHalReq()`（搜索关键词：`car_user_svc_switch_user_from_hal_req`、`CarUserService`、`EventLogTags.writeCarUserSvcSwitchUserFromHalReq`）。

#### `car_user_svc_set_user_auth_req`（EventLog tag `150113`）

- 日志含义：CarUserService 请求设置用户认证关联。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。 `number_associations`：认证关联数量。

- 触发流程：`CarUserService.setUserAuthReq()`（搜索关键词：`car_user_svc_set_user_auth_req`、`CarUserService`、`EventLogTags.writeCarUserSvcSetUserAuthReq`）。

#### `car_user_svc_set_user_auth_resp`（EventLog tag `150114`）

- 日志含义：CarUserService 返回设置用户认证结果。

- 日志字段：`number_values`：返回值数量。 `error_message`：错误信息。

- 触发流程：`CarUserService.setUserAuthResp()`（搜索关键词：`car_user_svc_set_user_auth_resp`、`CarUserService`、`EventLogTags.writeCarUserSvcSetUserAuthResp`）。

#### `car_user_svc_create_user_req`（EventLog tag `150115`）

- 日志含义：CarUserService 收到创建用户请求。

- 日志字段：`safe_name`：脱敏后的用户名称。 `user_type`：用户类型。 `flags`：用户标志。 `timeout`：请求超时时间。 `hasCallerRestrictions`：调用方是否受限。

- 触发流程：`CarUserService.createUserReq()`（搜索关键词：`car_user_svc_create_user_req`、`CarUserService`、`EventLogTags.writeCarUserSvcCreateUserReq`）。

#### `car_user_svc_create_user_resp`（EventLog tag `150116`）

- 日志含义：CarUserService 返回创建用户结果。

- 日志字段：`status`：操作状态码。 `result`：操作结果码。 `error_message`：错误信息。

- 触发流程：`CarUserService.createUserResp()`（搜索关键词：`car_user_svc_create_user_resp`、`CarUserService`、`EventLogTags.writeCarUserSvcCreateUserResp`）。

#### `car_user_svc_create_user_user_created`（EventLog tag `150117`）

- 日志含义：用户创建成功，记录新用户信息。

- 日志字段：`user_id`：用户 ID。 `safe_name`：脱敏后的用户名称。 `user_type`：用户类型。 `flags`：用户标志。

- 触发流程：`CarUserService.createUserUserCreated()`（搜索关键词：`car_user_svc_create_user_user_created`、`CarUserService`、`EventLogTags.writeCarUserSvcCreateUserUserCreated`）。

#### `car_user_svc_create_user_user_removed`（EventLog tag `150118`）

- 日志含义：创建用户流程中移除用户，记录移除原因。

- 日志字段：`user_id`：用户 ID。 `reason`：操作原因。

- 触发流程：`CarUserService.createUserUserRemoved()`（搜索关键词：`car_user_svc_create_user_user_removed`、`CarUserService`、`EventLogTags.writeCarUserSvcCreateUserUserRemoved`）。

#### `car_user_svc_remove_user_req`（EventLog tag `150119`）

- 日志含义：CarUserService 收到删除用户请求。

- 日志字段：`user_id`：用户 ID。 `hasCallerRestrictions`：调用方是否受限。

- 触发流程：`CarUserService.removeUserReq()`（搜索关键词：`car_user_svc_remove_user_req`、`CarUserService`、`EventLogTags.writeCarUserSvcRemoveUserReq`）。

#### `car_user_svc_remove_user_resp`（EventLog tag `150120`）

- 日志含义：CarUserService 返回删除用户结果。

- 日志字段：`user_id`：用户 ID。 `result`：操作结果码。

- 触发流程：`CarUserService.removeUserResp()`（搜索关键词：`car_user_svc_remove_user_resp`、`CarUserService`、`EventLogTags.writeCarUserSvcRemoveUserResp`）。

#### `car_user_svc_notify_app_lifecycle_listener`（EventLog tag `150121`）

- 日志含义：CarUserService 向应用监听器分发用户生命周期事件。

- 日志字段：`uid`：调用方 UID。 `package_name`：调用方包名。 `event_type`：生命周期事件类型。 `from_user_id`：切换前用户 ID。 `to_user_id`：切换目标用户 ID。

- 触发流程：`CarUserService.notifyAppLifecycleListener()`（搜索关键词：`car_user_svc_notify_app_lifecycle_listener`、`CarUserService`、`EventLogTags.writeCarUserSvcNotifyAppLifecycleListener`）。

#### `car_user_svc_notify_internal_lifecycle_listener`（EventLog tag `150122`）

- 日志含义：CarUserService 向内部监听器分发用户生命周期事件。

- 日志字段：`listener_name`：监听器名称。 `event_type`：生命周期事件类型。 `from_user_id`：切换前用户 ID。 `to_user_id`：切换目标用户 ID。

- 触发流程：`CarUserService.notifyInternalLifecycleListener()`（搜索关键词：`car_user_svc_notify_internal_lifecycle_listener`、`CarUserService`、`EventLogTags.writeCarUserSvcNotifyInternalLifecycleListener`）。

#### `car_user_svc_pre_creation_requested`（EventLog tag `150123`）

- 日志含义：CarUserService 请求预创建用户并统计现有用户/访客数量。

- 日志字段：`number_users`：已有普通用户数量。 `number_guests`：已有访客数量。

- 触发流程：`CarUserService.preCreationRequested()`（搜索关键词：`car_user_svc_pre_creation_requested`、`CarUserService`、`EventLogTags.writeCarUserSvcPreCreationRequested`）。

#### `car_user_svc_pre_creation_status`（EventLog tag `150124`）

- 日志含义：CarUserService 完成预创建检查，记录用户增删计划。

- 日志字段：`number_existing_users`：已有用户数量。 `number_users_to_add`：待新增普通用户数。 `number_users_to_remove`：待移除普通用户数。 `number_existing_guests`：已有访客数。 `number_guests_to_add`：待新增访客数。 `number_guests_to_remove`：待移除访客数。 `number_invalid_users_to_remove`：待移除的无效用户数。

- 触发流程：`CarUserService.preCreationStatus()`（搜索关键词：`car_user_svc_pre_creation_status`、`CarUserService`、`EventLogTags.writeCarUserSvcPreCreationStatus`）。

#### `car_user_svc_start_user_in_background_req`（EventLog tag `150125`）

- 日志含义：CarUserService 请求在后台启动用户。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`CarUserService.startUserInBackgroundReq()`（搜索关键词：`car_user_svc_start_user_in_background_req`、`CarUserService`、`EventLogTags.writeCarUserSvcStartUserInBackgroundReq`）。

#### `car_user_svc_start_user_in_background_resp`（EventLog tag `150126`）

- 日志含义：CarUserService 返回后台启动用户结果。

- 日志字段：`user_id`：用户 ID。 `result`：操作结果码。

- 触发流程：`CarUserService.startUserInBackgroundResp()`（搜索关键词：`car_user_svc_start_user_in_background_resp`、`CarUserService`、`EventLogTags.writeCarUserSvcStartUserInBackgroundResp`）。

#### `car_user_svc_stop_user_req`（EventLog tag `150127`）

- 日志含义：CarUserService 请求停止用户。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`CarUserService.stopUserReq()`（搜索关键词：`car_user_svc_stop_user_req`、`CarUserService`、`EventLogTags.writeCarUserSvcStopUserReq`）。

#### `car_user_svc_stop_user_resp`（EventLog tag `150128`）

- 日志含义：CarUserService 返回停止用户结果。

- 日志字段：`user_id`：用户 ID。 `result`：操作结果码。

- 触发流程：`CarUserService.stopUserResp()`（搜索关键词：`car_user_svc_stop_user_resp`、`CarUserService`、`EventLogTags.writeCarUserSvcStopUserResp`）。

#### `car_user_svc_initial_user_info_req_complete`（EventLog tag `150129`）

- 日志含义：初始用户信息请求流程完成。

- 日志字段：`request_type`：初始用户信息请求类型。

- 触发流程：`CarUserService.initialUserInfoReqComplete()`（搜索关键词：`car_user_svc_initial_user_info_req_complete`、`CarUserService`、`EventLogTags.writeCarUserSvcInitialUserInfoReqComplete`）。

#### `car_user_svc_logout_user_req`（EventLog tag `150130`）

- 日志含义：CarUserService 收到用户登出请求。

- 日志字段：`user_id`：用户 ID。 `timeout`：请求超时时间。

- 触发流程：`CarUserService.logoutUserReq()`（搜索关键词：`car_user_svc_logout_user_req`、`CarUserService`、`EventLogTags.writeCarUserSvcLogoutUserReq`）。

#### `car_user_svc_logout_user_resp`（EventLog tag `150131`）

- 日志含义：CarUserService 返回用户登出结果。

- 日志字段：`hal_callback_status`：HAL 回调状态。 `user_switch_status`：用户切换状态。 `error_message`：错误信息。

- 触发流程：`CarUserService.logoutUserResp()`（搜索关键词：`car_user_svc_logout_user_resp`、`CarUserService`、`EventLogTags.writeCarUserSvcLogoutUserResp`）。

#### `car_user_svc_start_user_visible_on_display_req`（EventLog tag `150154`）

- 日志含义：CarUserService 请求在指定显示屏启动可见用户。

- 日志字段：`user_id`：用户 ID。 `display_id`：目标显示屏 ID。

- 触发流程：`CarUserService.startUserVisibleOnDisplayReq()`（搜索关键词：`car_user_svc_start_user_visible_on_display_req`、`CarUserService`、`EventLogTags.writeCarUserSvcStartUserVisibleOnDisplayReq`）。

#### `car_user_svc_start_user_visible_on_display_resp`（EventLog tag `150155`）

- 日志含义：CarUserService 返回在指定显示屏启动用户的结果。

- 日志字段：`user_id`：用户 ID。 `display_id`：目标显示屏 ID。 `result`：操作结果码。

- 触发流程：`CarUserService.startUserVisibleOnDisplayResp()`（搜索关键词：`car_user_svc_start_user_visible_on_display_resp`、`CarUserService`、`EventLogTags.writeCarUserSvcStartUserVisibleOnDisplayResp`）。

### 初始用户流程

#### `car_initial_user_start_fg_user`（EventLog tag `150132`）

- 日志含义：初始用户流程开始启动前台用户。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`InitialUserService.startFgUser()`（搜索关键词：`car_initial_user_start_fg_user`、`InitialUser`、`EventLogTags.writeCarInitialUserStartFgUser`）。

#### `car_initial_user_info`（EventLog tag `150133`）

- 日志含义：记录 HAL/策略提供的初始用户决策信息。

- 日志字段：`type`：生命周期或请求类型。 `replace_guest`：是否替换访客用户。 `switch_user_id`：需要切换到的用户 ID。 `new_user_name`：新用户名称（脱敏值）。 `new_user_flags`：新用户标志。 `supports_override_user_id_property`：是否支持覆盖用户 ID 的系统属性。 `user_locales`：用户区域设置。

- 触发流程：`InitialUserService.info()`（搜索关键词：`car_initial_user_info`、`InitialUser`、`EventLogTags.writeCarInitialUserInfo`）。

#### `car_initial_user_fallback_default_behavior`（EventLog tag `150134`）

- 日志含义：初始用户信息不可用时采用默认回退策略。

- 日志字段：`reason`：操作原因。

- 触发流程：`InitialUserService.fallbackDefaultBehavior()`（搜索关键词：`car_initial_user_fallback_default_behavior`、`InitialUser`、`EventLogTags.writeCarInitialUserFallbackDefaultBehavior`）。

#### `car_initial_user_replace_guest`（EventLog tag `150135`）

- 日志含义：初始用户流程将访客用户替换为目标用户。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`InitialUserService.replaceGuest()`（搜索关键词：`car_initial_user_replace_guest`、`InitialUser`、`EventLogTags.writeCarInitialUserReplaceGuest`）。

#### `car_initial_user_unlock_system_user`（EventLog tag `150136`）

- 日志含义：初始用户流程解锁系统用户。

- 日志字段：无（仅记录事件发生）。

- 触发流程：`InitialUserService.unlockSystemUser()`（搜索关键词：`car_initial_user_unlock_system_user`、`InitialUser`、`EventLogTags.writeCarInitialUserUnlockSystemUser`）。

#### `car_initial_user_set_last_active`（EventLog tag `150137`）

- 日志含义：初始用户流程记录最近活跃用户。

- 日志字段：`user_id`：用户 ID。

- 触发流程：`InitialUserService.setLastActive()`（搜索关键词：`car_initial_user_set_last_active`、`InitialUser`、`EventLogTags.writeCarInitialUserSetLastActive`）。

#### `car_initial_user_reset_global_property`（EventLog tag `150138`）

- 日志含义：初始用户流程重置全局用户相关属性。

- 日志字段：`name`：全局属性名称。

- 触发流程：`InitialUserService.resetGlobalProperty()`（搜索关键词：`car_initial_user_reset_global_property`、`InitialUser`、`EventLogTags.writeCarInitialUserResetGlobalProperty`）。

### User HAL 交互

#### `car_user_hal_initial_user_info_req`（EventLog tag `150140`）

- 日志含义：User HAL 收到初始用户信息请求。

- 日志字段：`request_id`：请求 ID。 `request_type`：初始用户信息请求类型。 `timeout`：请求超时时间。

- 触发流程：`UserHalService.initialUserInfoReq()`（搜索关键词：`car_user_hal_initial_user_info_req`、`UserHalService`、`EventLogTags.writeCarUserHalInitialUserInfoReq`）。

#### `car_user_hal_initial_user_info_resp`（EventLog tag `150141`）

- 日志含义：User HAL 返回初始用户信息响应。

- 日志字段：`request_id`：请求 ID。 `status`：操作状态码。 `action`：HAL 要求执行的动作。 `user_id`：用户 ID。 `flags`：用户标志。 `safe_name`：脱敏后的用户名称。 `user_locales`：用户区域设置。

- 触发流程：`UserHalService.initialUserInfoResp()`（搜索关键词：`car_user_hal_initial_user_info_resp`、`UserHalService`、`EventLogTags.writeCarUserHalInitialUserInfoResp`）。

#### `car_user_hal_switch_user_req`（EventLog tag `150142`）

- 日志含义：User HAL 收到用户切换请求。

- 日志字段：`request_id`：请求 ID。 `user_id`：用户 ID。 `user_flags`：目标用户标志。 `timeout`：请求超时时间。

- 触发流程：`UserHalService.switchUserReq()`（搜索关键词：`car_user_hal_switch_user_req`、`UserHalService`、`EventLogTags.writeCarUserHalSwitchUserReq`）。

#### `car_user_hal_switch_user_resp`（EventLog tag `150143`）

- 日志含义：User HAL 返回用户切换结果。

- 日志字段：`request_id`：请求 ID。 `status`：操作状态码。 `result`：操作结果码。 `error_message`：错误信息。

- 触发流程：`UserHalService.switchUserResp()`（搜索关键词：`car_user_hal_switch_user_resp`、`UserHalService`、`EventLogTags.writeCarUserHalSwitchUserResp`）。

#### `car_user_hal_post_switch_user_req`（EventLog tag `150144`）

- 日志含义：User HAL 收到切换完成后的后置请求。

- 日志字段：`request_id`：请求 ID。 `target_user_id`：目标用户 ID。 `current_user_id`：当前用户 ID。

- 触发流程：`UserHalService.postSwitchUserReq()`（搜索关键词：`car_user_hal_post_switch_user_req`、`UserHalService`、`EventLogTags.writeCarUserHalPostSwitchUserReq`）。

#### `car_user_hal_get_user_auth_req`（EventLog tag `150145`）

- 日志含义：User HAL 收到查询用户认证请求。

- 日志字段：`int32values`：HAL 请求整数数组。

- 触发流程：`UserHalService.getUserAuthReq()`（搜索关键词：`car_user_hal_get_user_auth_req`、`UserHalService`、`EventLogTags.writeCarUserHalGetUserAuthReq`）。

#### `car_user_hal_get_user_auth_resp`（EventLog tag `150146`）

- 日志含义：User HAL 返回用户认证数据。

- 日志字段：`valuesAndError`：HAL 返回值及错误数组。

- 触发流程：`UserHalService.getUserAuthResp()`（搜索关键词：`car_user_hal_get_user_auth_resp`、`UserHalService`、`EventLogTags.writeCarUserHalGetUserAuthResp`）。

#### `car_user_hal_legacy_switch_user_req`（EventLog tag `150147`）

- 日志含义：User HAL 收到旧版协议用户切换请求。

- 日志字段：`request_id`：请求 ID。 `target_user_id`：目标用户 ID。 `current_user_id`：当前用户 ID。

- 触发流程：`UserHalService.legacySwitchUserReq()`（搜索关键词：`car_user_hal_legacy_switch_user_req`、`UserHalService`、`EventLogTags.writeCarUserHalLegacySwitchUserReq`）。

#### `car_user_hal_set_user_auth_req`（EventLog tag `150148`）

- 日志含义：User HAL 收到设置用户认证请求。

- 日志字段：`int32values`：HAL 请求整数数组。

- 触发流程：`UserHalService.setUserAuthReq()`（搜索关键词：`car_user_hal_set_user_auth_req`、`UserHalService`、`EventLogTags.writeCarUserHalSetUserAuthReq`）。

#### `car_user_hal_set_user_auth_resp`（EventLog tag `150149`）

- 日志含义：User HAL 返回设置认证结果。

- 日志字段：`valuesAndError`：HAL 返回值及错误数组。

- 触发流程：`UserHalService.setUserAuthResp()`（搜索关键词：`car_user_hal_set_user_auth_resp`、`UserHalService`、`EventLogTags.writeCarUserHalSetUserAuthResp`）。

#### `car_user_hal_oem_switch_user_req`（EventLog tag `150150`）

- 日志含义：User HAL 收到 OEM 用户切换请求。

- 日志字段：`request_id`：请求 ID。 `target_user_id`：目标用户 ID。

- 触发流程：`UserHalService.oemSwitchUserReq()`（搜索关键词：`car_user_hal_oem_switch_user_req`、`UserHalService`、`EventLogTags.writeCarUserHalOemSwitchUserReq`）。

#### `car_user_hal_create_user_req`（EventLog tag `150151`）

- 日志含义：User HAL 收到创建用户请求。

- 日志字段：`request_id`：请求 ID。 `safe_name`：脱敏后的用户名称。 `flags`：用户标志。 `timeout`：请求超时时间。

- 触发流程：`UserHalService.createUserReq()`（搜索关键词：`car_user_hal_create_user_req`、`UserHalService`、`EventLogTags.writeCarUserHalCreateUserReq`）。

#### `car_user_hal_create_user_resp`（EventLog tag `150152`）

- 日志含义：User HAL 返回创建用户结果。

- 日志字段：`request_id`：请求 ID。 `status`：操作状态码。 `result`：操作结果码。 `error_message`：错误信息。

- 触发流程：`UserHalService.createUserResp()`（搜索关键词：`car_user_hal_create_user_resp`、`UserHalService`、`EventLogTags.writeCarUserHalCreateUserResp`）。

#### `car_user_hal_remove_user_req`（EventLog tag `150153`）

- 日志含义：User HAL 收到移除用户请求。

- 日志字段：`target_user_id`：目标用户 ID。 `current_user_id`：当前用户 ID。

- 触发流程：`UserHalService.removeUserReq()`（搜索关键词：`car_user_hal_remove_user_req`、`UserHalService`、`EventLogTags.writeCarUserHalRemoveUserReq`）。

### CarUserManager 客户端调用

#### `car_user_mgr_add_listener`（EventLog tag `150171`）

- 日志含义：CarUserManager 客户端注册用户生命周期监听器。

- 日志字段：`uid`：调用方 UID。 `package_name`：调用方包名。 `has_filter`：是否设置过滤条件。

- 触发流程：`CarUserManager.addListener()`（搜索关键词：`car_user_mgr_add_listener`、`CarUserManager`、`EventLogTags.writeCarUserMgrAddListener`）。

#### `car_user_mgr_remove_listener`（EventLog tag `150172`）

- 日志含义：CarUserManager 客户端注销用户生命周期监听器。

- 日志字段：`uid`：调用方 UID。 `package_name`：调用方包名。

- 触发流程：`CarUserManager.removeListener()`（搜索关键词：`car_user_mgr_remove_listener`、`CarUserManager`、`EventLogTags.writeCarUserMgrRemoveListener`）。

#### `car_user_mgr_disconnected`（EventLog tag `150173`）

- 日志含义：CarUserManager 与 Car Service 的连接断开。

- 日志字段：`uid`：调用方 UID。

- 触发流程：`CarUserManager.disconnected()`（搜索关键词：`car_user_mgr_disconnected`、`CarUserManager`、`EventLogTags.writeCarUserMgrDisconnected`）。

#### `car_user_mgr_switch_user_req`（EventLog tag `150174`）

- 日志含义：CarUserManager 向 CarUserService 发起用户切换请求。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。

- 触发流程：`CarUserManager.switchUserReq()`（搜索关键词：`car_user_mgr_switch_user_req`、`CarUserManager`、`EventLogTags.writeCarUserMgrSwitchUserReq`）。

#### `car_user_mgr_switch_user_resp`（EventLog tag `150175`）

- 日志含义：CarUserManager 收到用户切换响应。

- 日志字段：`uid`：调用方 UID。 `status`：操作状态码。 `error_message`：错误信息。

- 触发流程：`CarUserManager.switchUserResp()`（搜索关键词：`car_user_mgr_switch_user_resp`、`CarUserManager`、`EventLogTags.writeCarUserMgrSwitchUserResp`）。

#### `car_user_mgr_get_user_auth_req`（EventLog tag `150176`）

- 日志含义：CarUserManager 请求获取用户认证类型。

- 日志字段：`types`：认证类型数组。

- 触发流程：`CarUserManager.getUserAuthReq()`（搜索关键词：`car_user_mgr_get_user_auth_req`、`CarUserManager`、`EventLogTags.writeCarUserMgrGetUserAuthReq`）。

#### `car_user_mgr_get_user_auth_resp`（EventLog tag `150177`）

- 日志含义：CarUserManager 收到用户认证类型响应。

- 日志字段：`values`：认证结果值数组。

- 触发流程：`CarUserManager.getUserAuthResp()`（搜索关键词：`car_user_mgr_get_user_auth_resp`、`CarUserManager`、`EventLogTags.writeCarUserMgrGetUserAuthResp`）。

#### `car_user_mgr_set_user_auth_req`（EventLog tag `150178`）

- 日志含义：CarUserManager 请求设置用户认证关联。

- 日志字段：`types_and_values_pairs`：认证类型与对应值的成对数组。

- 触发流程：`CarUserManager.setUserAuthReq()`（搜索关键词：`car_user_mgr_set_user_auth_req`、`CarUserManager`、`EventLogTags.writeCarUserMgrSetUserAuthReq`）。

#### `car_user_mgr_set_user_auth_resp`（EventLog tag `150179`）

- 日志含义：CarUserManager 收到设置认证响应。

- 日志字段：`values`：认证返回值数组。

- 触发流程：`CarUserManager.setUserAuthResp()`（搜索关键词：`car_user_mgr_set_user_auth_resp`、`CarUserManager`、`EventLogTags.writeCarUserMgrSetUserAuthResp`）。

#### `car_user_mgr_create_user_req`（EventLog tag `150180`）

- 日志含义：CarUserManager 请求创建用户。

- 日志字段：`uid`：调用方 UID。 `safe_name`：脱敏后的用户名称。 `user_type`：用户类型。 `flags`：用户标志。

- 触发流程：`CarUserManager.createUserReq()`（搜索关键词：`car_user_mgr_create_user_req`、`CarUserManager`、`EventLogTags.writeCarUserMgrCreateUserReq`）。

#### `car_user_mgr_create_user_resp`（EventLog tag `150181`）

- 日志含义：CarUserManager 收到创建用户响应。

- 日志字段：`uid`：调用方 UID。 `status`：操作状态码。 `error_message`：错误信息。

- 触发流程：`CarUserManager.createUserResp()`（搜索关键词：`car_user_mgr_create_user_resp`、`CarUserManager`、`EventLogTags.writeCarUserMgrCreateUserResp`）。

#### `car_user_mgr_remove_user_req`（EventLog tag `150182`）

- 日志含义：CarUserManager 请求移除用户。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。

- 触发流程：`CarUserManager.removeUserReq()`（搜索关键词：`car_user_mgr_remove_user_req`、`CarUserManager`、`EventLogTags.writeCarUserMgrRemoveUserReq`）。

#### `car_user_mgr_remove_user_resp`（EventLog tag `150183`）

- 日志含义：CarUserManager 收到移除用户响应。

- 日志字段：`uid`：调用方 UID。 `status`：操作状态码。

- 触发流程：`CarUserManager.removeUserResp()`（搜索关键词：`car_user_mgr_remove_user_resp`、`CarUserManager`、`EventLogTags.writeCarUserMgrRemoveUserResp`）。

#### `car_user_mgr_notify_lifecycle_listener`（EventLog tag `150184`）

- 日志含义：CarUserManager 向客户端监听器分发用户生命周期事件。

- 日志字段：`number_listeners`：监听器数量。 `event_type`：生命周期事件类型。 `from_user_id`：切换前用户 ID。 `to_user_id`：切换目标用户 ID。

- 触发流程：`CarUserManager.notifyLifecycleListener()`（搜索关键词：`car_user_mgr_notify_lifecycle_listener`、`CarUserManager`、`EventLogTags.writeCarUserMgrNotifyLifecycleListener`）。

#### `car_user_mgr_pre_create_user_req`（EventLog tag `150185`）

- 日志含义：CarUserManager 请求预创建用户。

- 日志字段：`uid`：调用方 UID。

- 触发流程：`CarUserManager.preCreateUserReq()`（搜索关键词：`car_user_mgr_pre_create_user_req`、`CarUserManager`、`EventLogTags.writeCarUserMgrPreCreateUserReq`）。

#### `car_user_mgr_logout_user_req`（EventLog tag `150186`）

- 日志含义：CarUserManager 请求用户登出。

- 日志字段：`uid`：调用方 UID。

- 触发流程：`CarUserManager.logoutUserReq()`（搜索关键词：`car_user_mgr_logout_user_req`、`CarUserManager`、`EventLogTags.writeCarUserMgrLogoutUserReq`）。

#### `car_user_mgr_logout_user_resp`（EventLog tag `150187`）

- 日志含义：CarUserManager 收到用户登出响应。

- 日志字段：`uid`：调用方 UID。 `status`：操作状态码。 `error_message`：错误信息。

- 触发流程：`CarUserManager.logoutUserResp()`（搜索关键词：`car_user_mgr_logout_user_resp`、`CarUserManager`、`EventLogTags.writeCarUserMgrLogoutUserResp`）。

#### `car_user_mgr_start_user_req`（EventLog tag `150188`）

- 日志含义：CarUserManager 请求启动用户。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。 `display_id`：目标显示屏 ID。

- 触发流程：`CarUserManager.startUserReq()`（搜索关键词：`car_user_mgr_start_user_req`、`CarUserManager`、`EventLogTags.writeCarUserMgrStartUserReq`）。

#### `car_user_mgr_start_user_resp`（EventLog tag `150189`）

- 日志含义：CarUserManager 收到启动用户响应。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。 `display_id`：目标显示屏 ID。 `status`：操作状态码。

- 触发流程：`CarUserManager.startUserResp()`（搜索关键词：`car_user_mgr_start_user_resp`、`CarUserManager`、`EventLogTags.writeCarUserMgrStartUserResp`）。

#### `car_user_mgr_stop_user_req`（EventLog tag `150190`）

- 日志含义：CarUserManager 请求停止用户。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。

- 触发流程：`CarUserManager.stopUserReq()`（搜索关键词：`car_user_mgr_stop_user_req`、`CarUserManager`、`EventLogTags.writeCarUserMgrStopUserReq`）。

#### `car_user_mgr_stop_user_resp`（EventLog tag `150191`）

- 日志含义：CarUserManager 收到停止用户响应。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。 `status`：操作状态码。

- 触发流程：`CarUserManager.stopUserResp()`（搜索关键词：`car_user_mgr_stop_user_resp`、`CarUserManager`、`EventLogTags.writeCarUserMgrStopUserResp`）。

### 用户数据管理

#### `car_dp_mgr_remove_user_req`（EventLog tag `150200`）

- 日志含义：Car 用户数据管理器请求删除用户数据。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。

- 触发流程：`CarUserDataManager.removeUserReq()`（搜索关键词：`car_dp_mgr_remove_user_req`、`CarUserDataManager`、`EventLogTags.writeCarDpMgrRemoveUserReq`）。

#### `car_dp_mgr_remove_user_resp`（EventLog tag `150201`）

- 日志含义：Car 用户数据管理器返回删除用户数据结果。

- 日志字段：`uid`：调用方 UID。 `status`：操作状态码。

- 触发流程：`CarUserDataManager.removeUserResp()`（搜索关键词：`car_dp_mgr_remove_user_resp`、`CarUserDataManager`、`EventLogTags.writeCarDpMgrRemoveUserResp`）。

#### `car_dp_mgr_create_user_req`（EventLog tag `150202`）

- 日志含义：Car 用户数据管理器请求创建用户数据。

- 日志字段：`uid`：调用方 UID。 `safe_name`：脱敏后的用户名称。 `flags`：用户标志。

- 触发流程：`CarUserDataManager.createUserReq()`（搜索关键词：`car_dp_mgr_create_user_req`、`CarUserDataManager`、`EventLogTags.writeCarDpMgrCreateUserReq`）。

#### `car_dp_mgr_create_user_resp`（EventLog tag `150203`）

- 日志含义：Car 用户数据管理器返回创建用户数据结果。

- 日志字段：`uid`：调用方 UID。 `status`：操作状态码。

- 触发流程：`CarUserDataManager.createUserResp()`（搜索关键词：`car_dp_mgr_create_user_resp`、`CarUserDataManager`、`EventLogTags.writeCarDpMgrCreateUserResp`）。

#### `car_dp_mgr_start_user_in_background_req`（EventLog tag `150204`）

- 日志含义：Car 用户数据管理器请求后台启动用户数据。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。

- 触发流程：`CarUserDataManager.startUserInBackgroundReq()`（搜索关键词：`car_dp_mgr_start_user_in_background_req`、`CarUserDataManager`、`EventLogTags.writeCarDpMgrStartUserInBackgroundReq`）。

#### `car_dp_mgr_start_user_in_background_resp`（EventLog tag `150205`）

- 日志含义：Car 用户数据管理器返回后台启动结果。

- 日志字段：`uid`：调用方 UID。 `status`：操作状态码。

- 触发流程：`CarUserDataManager.startUserInBackgroundResp()`（搜索关键词：`car_dp_mgr_start_user_in_background_resp`、`CarUserDataManager`、`EventLogTags.writeCarDpMgrStartUserInBackgroundResp`）。

#### `car_dp_mgr_stop_user_req`（EventLog tag `150206`）

- 日志含义：Car 用户数据管理器请求停止用户数据。

- 日志字段：`uid`：调用方 UID。 `user_id`：用户 ID。

- 触发流程：`CarUserDataManager.stopUserReq()`（搜索关键词：`car_dp_mgr_stop_user_req`、`CarUserDataManager`、`EventLogTags.writeCarDpMgrStopUserReq`）。

#### `car_dp_mgr_stop_user_resp`（EventLog tag `150207`）

- 日志含义：Car 用户数据管理器返回停止结果。

- 日志字段：`uid`：调用方 UID。 `status`：操作状态码。

- 触发流程：`CarUserDataManager.stopUserResp()`（搜索关键词：`car_dp_mgr_stop_user_resp`、`CarUserDataManager`、`EventLogTags.writeCarDpMgrStopUserResp`）。

### 电源管理

#### `car_pwr_mgr_state_change`（EventLog tag `150300`）

- 日志含义：CarPowerManagementService 电源状态发生变化并开始通知各组件。

- 日志字段：`state`：电源状态值。

- 触发流程：`CarPowerManagementService.stateChange()`（搜索关键词：`car_pwr_mgr_state_change`、`CarPowerManagementService`、`EventLogTags.writeCarPwrMgrStateChange`）。

#### `car_pwr_mgr_garage_mode`（EventLog tag `150301`）

- 日志含义：CarPowerManagementService 进入或退出车库模式。

- 日志字段：`status`：操作状态码。

- 触发流程：`CarPowerManagementService.garageMode()`（搜索关键词：`car_pwr_mgr_garage_mode`、`CarPowerManagementService`、`EventLogTags.writeCarPwrMgrGarageMode`）。

#### `car_pwr_mgr_pwr_policy_change`（EventLog tag `150302`）

- 日志含义：CarPowerManagementService 的电源策略发生变化。

- 日志字段：`policy`：电源策略名称或标识。

- 触发流程：`CarPowerManagementService.pwrPolicyChange()`（搜索关键词：`car_pwr_mgr_pwr_policy_change`、`CarPowerManagementService`、`EventLogTags.writeCarPwrMgrPwrPolicyChange`）。

#### `car_pwr_mgr_state_req`（EventLog tag `150303`）

- 日志含义：收到电源状态请求，准备按参数执行状态转换。

- 日志字段：`state`：目标电源状态。 `param`：状态转换附加参数。

- 触发流程：`CarPowerManagementService.stateReq()`（搜索关键词：`car_pwr_mgr_state_req`、`CarPowerManagementService`、`EventLogTags.writeCarPwrMgrStateReq`）。

### Car Watchdog

#### `car_watchdog_svc_io_overuse_kill`（EventLog tag `150400`）

- 日志含义：Car Watchdog 检测到应用 I/O 超限并执行杀进程/禁用处理。

- 日志字段：`package_name`：调用方包名。 `user_id`：用户 ID。 `written_fg_bytes`：前台写入字节数。 `written_bg_bytes`：后台写入字节数。 `written_garage_mode_bytes`：车库模式写入字节数。 `threshold_fg_bytes`：前台写入阈值。 `threshold_bg_bytes`：后台写入阈值。 `threshold_garage_mode_bytes`：车库模式写入阈值。 `times_killed`：累计杀进程次数。 `is_package_disabled`：是否已禁用应用。

- 触发流程：`CarWatchdogService.ioOveruseKill()`（搜索关键词：`car_watchdog_svc_io_overuse_kill`、`CarWatchdogService`、`EventLogTags.writeCarWatchdogSvcIoOveruseKill`）。

## Security / Telephony / Connectivity

### Connectivity / Wi‑Fi / NTP

#### `connectivity_state_changed`（EventLog tag `50020`）

- 日志含义：ConnectivityService 收到网络代理状态变化并更新网络连接状态。

- 原始格式：`connectivity_state_changed (type|1),(subtype|1),(state|1)`

- 日志字段：
  - `type`：网络类型。
  - `subtype`：网络子类型。
  - `state`：连接状态。
- 触发流程：ConnectivityService 网络代理状态回调；搜索 `connectivity_state_changed` 或 `EventLogTags.writeConnectivityStateChanged`。

#### `wifi_state_changed`（EventLog tag `50021`）

- 日志含义：Wi‑Fi 总体状态（开启、关闭及过渡状态）发生变化。

- 原始格式：`wifi_state_changed (wifi_state|3)`

- 日志字段：
  - `wifi_state`：Wi‑Fi 总体状态。
- 触发流程：WifiServiceImpl/WifiClientModeImpl 状态更新；搜索 `wifi_state_changed`。

#### `wifi_event_handled`（EventLog tag `50022`）

- 日志含义：Wi‑Fi 状态机处理并记录了一个事件。

- 原始格式：`wifi_event_handled (wifi_event|1|5)`

- 日志字段：
  - `wifi_event`：Wi‑Fi 事件。
- 触发流程：WifiClientModeImpl/WifiStateMachine 状态机事件处理；搜索 `wifi_event_handled`。

#### `wifi_supplicant_state_changed`（EventLog tag `50023`）

- 日志含义：wpa_supplicant 与 Wi‑Fi 服务之间的协商状态发生变化。

- 原始格式：`wifi_supplicant_state_changed (supplicant_state|1|5)`

- 日志字段：
  - `supplicant_state`：wpa_supplicant 状态。
- 触发流程：WifiClientModeImpl 接收 supplicant 状态回调；搜索 `wifi_supplicant_state_changed`。

#### `ntp_success`（EventLog tag `50080`）

- 日志含义：SNTP/NTP 校时成功，记录服务器响应的往返时延和时钟偏移。

- 原始格式：`ntp_success (server|3),(rtt|2),(offset|2)`

- 日志字段：
  - `server`：NTP 服务器地址。
  - `rtt`：往返时延（毫秒）。
  - `offset`：时钟偏移（毫秒）。
- 触发流程：android.net.SntpClient.requestTime()；搜索 `EventLogTags.writeNtpSuccess`。

#### `ntp_failure`（EventLog tag `50081`）

- 日志含义：SNTP/NTP 校时失败，记录服务器地址和失败原因。

- 原始格式：`ntp_failure (server|3),(msg|3)`

- 日志字段：
  - `server`：NTP 服务器地址。
  - `msg`：失败原因。
- 触发流程：android.net.SntpClient.requestTime()；搜索 `EventLogTags.writeNtpFailure`。

### Telephony / 蜂窝数据

#### `pdp_bad_dns_address`（EventLog tag `50100`）

- 日志含义：PDP 数据连接配置中检测到无效 DNS 地址。

- 原始格式：`pdp_bad_dns_address (dns_address|3)`

- 日志字段：
  - `dns_address`：DNS 地址。
- 触发流程：DataConnection/DcTracker 数据连接状态机；旧版 telephony 模块，按事件名全局搜索。

#### `bad_ip_address`（EventLog tag `50117`）

- 日志含义：蜂窝数据连接检测到无效或异常的 IP 地址。

- 原始格式：`bad_ip_address (ip_address|3)`

- 日志字段：
  - `ip_address`：检测到的异常 IP 地址。
- 触发流程：DataConnection/DcTracker 数据连接状态机；旧版 telephony 模块，按事件名全局搜索。

#### `pdp_radio_reset_countdown_triggered`（EventLog tag `50101`）

- 日志含义：数据停滞恢复流程触发了无线电重置倒计时。

- 原始格式：`pdp_radio_reset_countdown_triggered (out_packet_count|1|1)`

- 日志字段：
  - `out_packet_count`：恢复前出包数。
- 触发流程：DataConnection/DcTracker 数据连接状态机；旧版 telephony 模块，按事件名全局搜索。

#### `pdp_radio_reset`（EventLog tag `50102`）

- 日志含义：数据停滞恢复流程执行了无线电重置。

- 原始格式：`pdp_radio_reset (out_packet_count|1|1)`

- 日志字段：
  - `out_packet_count`：恢复前出包数。
- 触发流程：DataConnection/DcTracker 数据连接状态机；旧版 telephony 模块，按事件名全局搜索。

#### `pdp_context_reset`（EventLog tag `50103`）

- 日志含义：数据停滞恢复流程重置了 PDP 数据上下文。

- 原始格式：`pdp_context_reset (out_packet_count|1|1)`

- 日志字段：
  - `out_packet_count`：恢复前出包数。
- 触发流程：DataConnection/DcTracker 数据连接状态机；旧版 telephony 模块，按事件名全局搜索。

#### `pdp_reregister_network`（EventLog tag `50104`）

- 日志含义：数据停滞恢复流程尝试重新注册蜂窝网络。

- 原始格式：`pdp_reregister_network (out_packet_count|1|1)`

- 日志字段：
  - `out_packet_count`：恢复前出包数。
- 触发流程：DataConnection/DcTracker 数据连接状态机；旧版 telephony 模块，按事件名全局搜索。

#### `pdp_setup_fail`（EventLog tag `50105`）

- 日志含义：PDP 数据上下文建立失败。

- 原始格式：`pdp_setup_fail (cause|1|5), (cid|1|5), (network_type|1|5)`

- 日志字段：
  - `cause`：失败/释放原因码。
  - `cid`：数据连接 CID。
  - `network_type`：无线接入网络类型。
- 触发流程：DataConnection/DcTracker 数据连接状态机；旧版 telephony 模块，按事件名全局搜索。

#### `call_drop`（EventLog tag `50106`）

- 日志含义：蜂窝数据呼叫/数据连接被释放，记录释放原因、CID 和网络类型。

- 原始格式：`call_drop (cause|1|5), (cid|1|5), (network_type|1|5)`

- 日志字段：
  - `cause`：失败/释放原因码。
  - `cid`：数据连接 CID。
  - `network_type`：无线接入网络类型。
- 触发流程：DataConnection/DcTracker 数据呼叫释放路径；旧版 telephony 模块，按 `call_drop` 全局搜索。

#### `data_network_registration_fail`（EventLog tag `50107`）

- 日志含义：蜂窝数据网络注册失败，记录运营商代码和 CID。

- 原始格式：`data_network_registration_fail (op_numeric|1|5), (cid|1|5)`

- 日志字段：
  - `op_numeric`：运营商数字代码。
  - `cid`：数据连接 CID。
- 触发流程：DcTracker/DataNetwork 数据网络状态机；旧版 telephony 模块，按事件名全局搜索。

#### `data_network_status_on_radio_off`（EventLog tag `50108`）

- 日志含义：无线电关闭时报告了数据连接状态及是否应启用数据连接。

- 原始格式：`data_network_status_on_radio_off (dc_state|3), (enable|1|5)`

- 日志字段：
  - `dc_state`：数据连接状态。
  - `enable`：是否启用。
- 触发流程：DcTracker/DataNetwork 数据网络状态机；旧版 telephony 模块，按事件名全局搜索。

#### `pdp_network_drop`（EventLog tag `50109`）

- 日志含义：PDP 数据网络连接掉线。

- 原始格式：`pdp_network_drop (cid|1|5), (network_type|1|5)`

- 日志字段：
  - `cid`：数据连接 CID。
  - `network_type`：无线接入网络类型。
- 触发流程：DataConnection/DcTracker 数据连接状态机；旧版 telephony 模块，按事件名全局搜索。

#### `cdma_data_setup_failed`（EventLog tag `50110`）

- 日志含义：CDMA 数据连接建立失败。

- 原始格式：`cdma_data_setup_failed (cause|1|5), (cid|1|5), (network_type|1|5)`

- 日志字段：
  - `cause`：失败/释放原因码。
  - `cid`：数据连接 CID。
  - `network_type`：无线接入网络类型。
- 触发流程：CdmaDataConnection/CdmaServiceStateTracker；旧版 telephony 模块，按事件名全局搜索。

#### `cdma_data_drop`（EventLog tag `50111`）

- 日志含义：CDMA 数据连接掉线。

- 原始格式：`cdma_data_drop (cid|1|5), (network_type|1|5)`

- 日志字段：
  - `cid`：数据连接 CID。
  - `network_type`：无线接入网络类型。
- 触发流程：CdmaDataConnection/CdmaServiceStateTracker；旧版 telephony 模块，按事件名全局搜索。

#### `gsm_rat_switched`（EventLog tag `50112`）

- 日志含义：GSM 连接的无线接入技术（RAT）发生切换。

- 原始格式：`gsm_rat_switched (cid|1|5), (network_from|1|5), (network_to|1|5)`

- 日志字段：
  - `cid`：数据连接 CID。
  - `network_from`：切换前 RAT。
  - `network_to`：切换后 RAT。
- 触发流程：GsmDataConnection/GsmServiceStateTracker；旧版 telephony 模块，按事件名全局搜索。

#### `gsm_data_state_change`（EventLog tag `50113`）

- 日志含义：GSM 数据连接状态发生变化。

- 原始格式：`gsm_data_state_change (oldState|3), (newState|3)`

- 日志字段：
  - `oldState`：旧状态。
  - `newState`：新状态。
- 触发流程：GsmDataConnection/GsmServiceStateTracker；旧版 telephony 模块，按事件名全局搜索。

#### `gsm_service_state_change`（EventLog tag `50114`）

- 日志含义：GSM 语音服务或 GPRS 数据服务状态发生变化。

- 原始格式：`gsm_service_state_change (oldState|1|5), (oldGprsState|1|5), (newState|1|5), (newGprsState|1|5)`

- 日志字段：
  - `oldState`：旧状态。
  - `oldGprsState`：旧 GPRS 状态。
  - `newState`：新状态。
  - `newGprsState`：新 GPRS 状态。
- 触发流程：GsmDataConnection/GsmServiceStateTracker；旧版 telephony 模块，按事件名全局搜索。

#### `cdma_data_state_change`（EventLog tag `50115`）

- 日志含义：CDMA 数据连接状态发生变化。

- 原始格式：`cdma_data_state_change (oldState|3), (newState|3)`

- 日志字段：
  - `oldState`：旧状态。
  - `newState`：新状态。
- 触发流程：CdmaDataConnection/CdmaServiceStateTracker；旧版 telephony 模块，按事件名全局搜索。

#### `cdma_service_state_change`（EventLog tag `50116`）

- 日志含义：CDMA 语音服务或数据服务状态发生变化。

- 原始格式：`cdma_service_state_change (oldState|1|5), (oldDataState|1|5), (newState|1|5), (newDataState|1|5)`

- 日志字段：
  - `oldState`：旧状态。
  - `oldDataState`：旧数据状态。
  - `newState`：新状态。
  - `newDataState`：新数据状态。
- 触发流程：CdmaDataConnection/CdmaServiceStateTracker；旧版 telephony 模块，按事件名全局搜索。

#### `data_stall_recovery_get_data_call_list`（EventLog tag `50118`）

- 日志含义：数据停滞恢复流程查询当前数据呼叫列表。

- 原始格式：`data_stall_recovery_get_data_call_list (out_packet_count|1|1)`

- 日志字段：
  - `out_packet_count`：恢复前出包数。
- 触发流程：DcTracker/DataNetwork 数据网络状态机；旧版 telephony 模块，按事件名全局搜索。

#### `data_stall_recovery_cleanup`（EventLog tag `50119`）

- 日志含义：数据停滞恢复流程清理数据连接状态。

- 原始格式：`data_stall_recovery_cleanup (out_packet_count|1|1)`

- 日志字段：
  - `out_packet_count`：恢复前出包数。
- 触发流程：DcTracker/DataNetwork 数据网络状态机；旧版 telephony 模块，按事件名全局搜索。

#### `data_stall_recovery_reregister`（EventLog tag `50120`）

- 日志含义：数据停滞恢复流程重新注册蜂窝网络。

- 原始格式：`data_stall_recovery_reregister (out_packet_count|1|1)`

- 日志字段：
  - `out_packet_count`：恢复前出包数。
- 触发流程：DcTracker/DataNetwork 数据网络状态机；旧版 telephony 模块，按事件名全局搜索。

#### `data_stall_recovery_radio_restart`（EventLog tag `50121`）

- 日志含义：数据停滞恢复流程重启无线电。

- 原始格式：`data_stall_recovery_radio_restart (out_packet_count|1|1)`

- 日志字段：
  - `out_packet_count`：恢复前出包数。
- 触发流程：DcTracker/DataNetwork 数据网络状态机；旧版 telephony 模块，按事件名全局搜索。

#### `data_stall_recovery_radio_restart_with_prop`（EventLog tag `50122`）

- 日志含义：数据停滞恢复流程根据系统属性重启无线电。

- 原始格式：`data_stall_recovery_radio_restart_with_prop (out_packet_count|1|1)`

- 日志字段：
  - `out_packet_count`：恢复前出包数。
- 触发流程：DcTracker/DataNetwork 数据网络状态机；旧版 telephony 模块，按事件名全局搜索。

#### `gsm_rat_switched_new`（EventLog tag `50123`）

- 日志含义：GSM 连接的无线接入技术（RAT）发生切换（新格式事件）。

- 原始格式：`gsm_rat_switched_new (cid|1|5), (network_from|1|5), (network_to|1|5)`

- 日志字段：
  - `cid`：数据连接 CID。
  - `network_from`：切换前 RAT。
  - `network_to`：切换后 RAT。
- 触发流程：GsmDataConnection/GsmServiceStateTracker；旧版 telephony 模块，按事件名全局搜索。

#### `phone_ui_enter`（EventLog tag `70301`）

- 日志含义：电话 UI 页面进入。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：Phone/Telecom 电话 UI；当前 checkout 可能无实现，按事件名全局搜索。

#### `phone_ui_exit`（EventLog tag `70302`）

- 日志含义：电话 UI 页面退出。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：Phone/Telecom 电话 UI；当前 checkout 可能无实现，按事件名全局搜索。

#### `phone_ui_button_click`（EventLog tag `70303`）

- 日志含义：电话 UI 记录了一次按钮点击。

- 原始格式：`phone_ui_button_click (text|3)`

- 日志字段：
  - `text`：按钮文本。
- 触发流程：Phone/Telecom 电话 UI；当前 checkout 可能无实现，按事件名全局搜索。

#### `phone_ui_ringer_query_elapsed`（EventLog tag `70304`）

- 日志含义：电话 UI 记录了一次响铃器查询耗时事件（无附加字段）。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：Phone/Telecom 电话 UI；当前 checkout 可能无实现，按事件名全局搜索。

#### `phone_ui_multiple_query`（EventLog tag `70305`）

- 日志含义：电话 UI 检测到多次查询事件（无附加字段）。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：Phone/Telecom 电话 UI；当前 checkout 可能无实现，按事件名全局搜索。

### NetworkStats / VPN

#### `netstats_mobile_sample`（EventLog tag `51100`）

- 日志含义：NetworkStatsService 完成一次移动网络流量采样。

- 原始格式：`netstats_mobile_sample (xt_rx_bytes|2|2),(xt_tx_bytes|2|2),(xt_rx_pkts|2|1),(xt_tx_pkts|2|1),(uid_rx_bytes|2|2),(uid_tx_bytes|2|2),(uid_rx_pkts|2|1),(uid_tx_pkts|2|1),(trusted_time|2|3)`

- 日志字段：
  - `xt_rx_bytes`：接口接收字节。
  - `xt_tx_bytes`：接口发送字节。
  - `xt_rx_pkts`：接口接收包。
  - `xt_tx_pkts`：接口发送包。
  - `uid_rx_bytes`：UID 接收字节。
  - `uid_tx_bytes`：UID 发送字节。
  - `uid_rx_pkts`：UID 接收包。
  - `uid_tx_pkts`：UID 发送包。
  - `trusted_time`：可信时间戳。
- 触发流程：NetworkStatsService.NetworkStatsRecorder；搜索对应事件名。

#### `netstats_wifi_sample`（EventLog tag `51101`）

- 日志含义：NetworkStatsService 完成一次 Wi‑Fi 流量采样。

- 原始格式：`netstats_wifi_sample (xt_rx_bytes|2|2),(xt_tx_bytes|2|2),(xt_rx_pkts|2|1),(xt_tx_pkts|2|1),(uid_rx_bytes|2|2),(uid_tx_bytes|2|2),(uid_rx_pkts|2|1),(uid_tx_pkts|2|1),(trusted_time|2|3)`

- 日志字段：
  - `xt_rx_bytes`：接口接收字节。
  - `xt_tx_bytes`：接口发送字节。
  - `xt_rx_pkts`：接口接收包。
  - `xt_tx_pkts`：接口发送包。
  - `uid_rx_bytes`：UID 接收字节。
  - `uid_tx_bytes`：UID 发送字节。
  - `uid_rx_pkts`：UID 接收包。
  - `uid_tx_pkts`：UID 发送包。
  - `trusted_time`：可信时间戳。
- 触发流程：NetworkStatsService.NetworkStatsRecorder；搜索对应事件名。

#### `lockdown_vpn_connecting`（EventLog tag `51200`）

- 日志含义：Lockdown VPN 开始连接出口网络。

- 原始格式：`lockdown_vpn_connecting (egress_net|1)`

- 日志字段：
  - `egress_net`：VPN 出口网络。
- 触发流程：LockdownVpnTracker；搜索对应事件名。

#### `lockdown_vpn_connected`（EventLog tag `51201`）

- 日志含义：Lockdown VPN 已连接出口网络。

- 原始格式：`lockdown_vpn_connected (egress_net|1)`

- 日志字段：
  - `egress_net`：VPN 出口网络。
- 触发流程：LockdownVpnTracker；搜索对应事件名。

#### `lockdown_vpn_error`（EventLog tag `51202`）

- 日志含义：Lockdown VPN 连接出口网络失败并记录错误。

- 原始格式：`lockdown_vpn_error (egress_net|1)`

- 日志字段：
  - `egress_net`：VPN 出口网络。
- 触发流程：LockdownVpnTracker；搜索对应事件名。

### Security / 实验检测

#### `exp_det_sms_denied_by_user`（EventLog tag `50125`）

- 日志含义：系统记录用户拒绝发送短信的安全检测事件。

- 原始格式：`exp_det_sms_denied_by_user (app_signature|3)`

- 日志字段：
  - `app_signature`：应用签名摘要。
- 触发流程：安全检测模块；旧版模块，按事件名全局搜索。

#### `exp_det_sms_sent_by_user`（EventLog tag `50128`）

- 日志含义：系统记录用户确认发送短信的安全检测事件。

- 原始格式：`exp_det_sms_sent_by_user (app_signature|3)`

- 日志字段：
  - `app_signature`：应用签名摘要。
- 触发流程：安全检测模块；旧版模块，按事件名全局搜索。

#### `exp_det_netlink_failure`（EventLog tag `65537`）

- 日志含义：系统检测到 Netlink 操作失败。

- 原始格式：`exp_det_netlink_failure (uid|1)`

- 日志字段：
  - `uid`：UID。
- 触发流程：安全检测模块；旧版模块，按事件名全局搜索。

#### `exp_det_attempt_to_call_object_getclass`（EventLog tag `70151`）

- 日志含义：系统检测到代码尝试调用对象的 getClass。

- 原始格式：`exp_det_attempt_to_call_object_getclass (app_signature|3)`

- 日志字段：
  - `app_signature`：应用签名摘要。
- 触发流程：安全检测模块；旧版模块，按事件名全局搜索。

#### `exp_det_dispatchCommand_overflow`（EventLog tag `78001`）

- 日志含义：系统检测到 dispatchCommand 缓冲区溢出或异常。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：安全检测模块；旧版模块，按事件名全局搜索。

#### `exp_det_cert_pin_failure`（EventLog tag `90100`）

- 日志含义：系统检测到证书锁定校验失败。

- 原始格式：`exp_det_cert_pin_failure (certs|4)`

- 日志字段：
  - `certs`：证书链摘要。
- 触发流程：安全检测模块；旧版模块，按事件名全局搜索。

#### `exp_det_device_admin_activated_by_user`（EventLog tag `90201`）

- 日志含义：用户激活了设备管理员应用。

- 原始格式：`exp_det_device_admin_activated_by_user (app_signature|3)`

- 日志字段：
  - `app_signature`：应用签名摘要。
- 触发流程：安全检测模块；旧版模块，按事件名全局搜索。

#### `exp_det_device_admin_declined_by_user`（EventLog tag `90202`）

- 日志含义：用户拒绝激活设备管理员应用。

- 原始格式：`exp_det_device_admin_declined_by_user (app_signature|3)`

- 日志字段：
  - `app_signature`：应用签名摘要。
- 触发流程：安全检测模块；旧版模块，按事件名全局搜索。

#### `exp_det_device_admin_uninstalled_by_user`（EventLog tag `90203`）

- 日志含义：用户卸载了设备管理员应用。

- 原始格式：`exp_det_device_admin_uninstalled_by_user (app_signature|3)`

- 日志字段：
  - `app_signature`：应用签名摘要。
- 触发流程：安全检测模块；旧版模块，按事件名全局搜索。

#### `snet`（EventLog tag `206001`）

- 日志含义：Snet 安全网络组件记录一条事件载荷。

- 原始格式：`snet (payload|3)`

- 日志字段：
  - `payload`：事件载荷。
- 触发流程：Snet/SafetyNet 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `exp_det_snet`（EventLog tag `206003`）

- 日志含义：实验/安全检测模块记录一条 Snet 事件载荷。

- 原始格式：`exp_det_snet (payload|3)`

- 日志字段：
  - `payload`：事件载荷。
- 触发流程：安全检测模块；旧版模块，按事件名全局搜索。

#### `security_adb_shell_interactive`（EventLog tag `210001`）

- 日志含义：通过 adb shell 打开了交互式 shell。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：adbd/AdbService；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_adb_shell_command`（EventLog tag `210002`）

- 日志含义：通过 ADB 执行了 shell 命令。

- 原始格式：`security_adb_shell_command (command|3)`

- 日志字段：
  - `command`：shell 命令。
- 触发流程：adbd/AdbService；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_adb_sync_recv`（EventLog tag `210003`）

- 日志含义：通过 adb pull 从设备读取了文件。

- 原始格式：`security_adb_sync_recv (path|3)`

- 日志字段：
  - `path`：文件路径。
- 触发流程：adbd/AdbService；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_adb_sync_send`（EventLog tag `210004`）

- 日志含义：通过 adb push 向设备写入了文件。

- 原始格式：`security_adb_sync_send (path|3)`

- 日志字段：
  - `path`：文件路径。
- 触发流程：adbd/AdbService；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_app_process_start`（EventLog tag `210005`）

- 日志含义：系统启动了一个应用进程并记录其身份与 APK 摘要。

- 原始格式：`security_app_process_start (process|3),(start_time|2|3),(uid|1),(pid|1),(seinfo|3),(sha256|3)`

- 日志字段：
  - `process`：进程名。
  - `start_time`：启动时间。
  - `uid`：UID。
  - `pid`：进程 PID。
  - `seinfo`：SELinux seinfo 标签。
  - `sha256`：SHA‑256 摘要。
- 触发流程：com.android.server.pm.ProcessLoggingHandler；搜索 `SecurityLog.TAG_APP_PROCESS_START`。

#### `security_keyguard_dismissed`（EventLog tag `210006`）

- 日志含义：安全 Keyguard 被解除。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_KEYGUARD_DISMISSED`。

#### `security_keyguard_dismiss_auth_attempt`（EventLog tag `210007`）

- 日志含义：发生了一次解除 Keyguard 的认证尝试。

- 原始格式：`security_keyguard_dismiss_auth_attempt (success|1),(method_strength|1)`

- 日志字段：
  - `success`：是否成功。
  - `method_strength`：认证方式安全等级。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_KEYGUARD_DISMISS_AUTH_ATTEMPT`。

#### `security_keyguard_secured`（EventLog tag `210008`）

- 日志含义：设备被 Keyguard 锁定。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_KEYGUARD_SECURED`。

#### `security_os_startup`（EventLog tag `210009`）

- 日志含义：Android OS 启动并记录 Verified Boot 与 dm‑verity 状态。

- 原始格式：`security_os_startup (boot_state|3),(verity_mode|3)`

- 日志字段：
  - `boot_state`：启动状态。
  - `verity_mode`：Verified Boot 模式。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_OS_STARTUP`。

#### `security_os_shutdown`（EventLog tag `210010`）

- 日志含义：Android OS 正在关机。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：ShutdownThread；搜索 `SecurityLog.TAG_OS_SHUTDOWN`。

#### `security_logging_started`（EventLog tag `210011`）

- 日志含义：安全审计日志记录开始。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：SecurityLogMonitor；搜索 `SecurityLog.TAG_LOGGING_STARTED`。

#### `security_logging_stopped`（EventLog tag `210012`）

- 日志含义：安全审计日志记录停止。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：SecurityLogMonitor；搜索 `SecurityLog.TAG_LOGGING_STOPPED`。

#### `security_media_mounted`（EventLog tag `210013`）

- 日志含义：可移动介质挂载完成。

- 原始格式：`security_media_mounted (path|3),(label|3)`

- 日志字段：
  - `path`：文件路径。
  - `label`：卷标。
- 触发流程：StorageManagerService；搜索 `SecurityLog.TAG_MEDIA_MOUNT`。

#### `security_media_unmounted`（EventLog tag `210014`）

- 日志含义：可移动介质卸载完成。

- 原始格式：`security_media_unmounted (path|3),(label|3)`

- 日志字段：
  - `path`：文件路径。
  - `label`：卷标。
- 触发流程：StorageManagerService；搜索 `SecurityLog.TAG_MEDIA_UNMOUNT`。

#### `security_log_buffer_size_critical`（EventLog tag `210015`）

- 日志含义：安全审计日志缓冲区达到容量临界值。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：SecurityLogMonitor；搜索 `SecurityLog.TAG_LOG_BUFFER_SIZE_CRITICAL`。

#### `security_password_expiration_set`（EventLog tag `210016`）

- 日志含义：设备管理员设置了密码过期时限。

- 原始格式：`security_password_expiration_set (package|3),(admin_user|1),(target_user|1),(timeout|2|3)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `target_user`：目标用户 ID。
  - `timeout`：超时/期限。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_PASSWORD_EXPIRATION_SET`。

#### `security_password_complexity_set`（EventLog tag `210017`）

- 日志含义：设备管理员设置了密码复杂度及组成要求。

- 原始格式：`security_password_complexity_set (package|3),(admin_user|1),(target_user|1),(length|1),(quality|1),(num_letters|1),(num_non_letters|1),(num_numeric|1),(num_uppercase|1),(num_lowercase|1),(num_symbols|1)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `target_user`：目标用户 ID。
  - `length`：长度/数量。
  - `quality`：密码质量。
  - `num_letters`：字母数。
  - `num_non_letters`：非字母数。
  - `num_numeric`：数字数。
  - `num_uppercase`：大写字母数。
  - `num_lowercase`：小写字母数。
  - `num_symbols`：符号数。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_PASSWORD_COMPLEXITY_SET`。

#### `security_password_history_length_set`（EventLog tag `210018`）

- 日志含义：设备管理员设置了密码历史长度。

- 原始格式：`security_password_history_length_set (package|3),(admin_user|1),(target_user|1),(length|1)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `target_user`：目标用户 ID。
  - `length`：长度/数量。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_PASSWORD_HISTORY_LENGTH_SET`。

#### `security_max_screen_lock_timeout_set`（EventLog tag `210019`）

- 日志含义：设备管理员设置了最长自动锁屏时间。

- 原始格式：`security_max_screen_lock_timeout_set (package|3),(admin_user|1),(target_user|1),(timeout|2|3)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `target_user`：目标用户 ID。
  - `timeout`：超时/期限。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_MAX_SCREEN_LOCK_TIMEOUT_SET`。

#### `security_max_password_attempts_set`（EventLog tag `210020`）

- 日志含义：设备管理员设置了密码失败次数上限。

- 原始格式：`security_max_password_attempts_set (package|3),(admin_user|1),(target_user|1),(num_failures|1)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `target_user`：目标用户 ID。
  - `num_failures`：允许失败次数。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_MAX_PASSWORD_ATTEMPTS_SET`。

#### `security_keyguard_disabled_features_set`（EventLog tag `210021`）

- 日志含义：设备管理员设置了要禁用的 Keyguard 功能位。

- 原始格式：`security_keyguard_disabled_features_set (package|3),(admin_user|1),(target_user|1),(features|1)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `target_user`：目标用户 ID。
  - `features`：Keyguard 功能位。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_KEYGUARD_DISABLED_FEATURES_SET`。

#### `security_remote_lock`（EventLog tag `210022`）

- 日志含义：设备管理员发起远程锁定设备或用户。

- 原始格式：`security_remote_lock (package|3),(admin_user|1),(target_user|1)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `target_user`：目标用户 ID。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_REMOTE_LOCK`。

#### `security_wipe_failed`（EventLog tag `210023`）

- 日志含义：设备或用户数据擦除失败。

- 原始格式：`security_wipe_failed (package|3),(admin_user|1)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_WIPE_FAILURE`。

#### `security_key_generated`（EventLog tag `210024`）

- 日志含义：密钥生成操作完成并记录结果、别名和所有者。

- 原始格式：`security_key_generated (success|1),(key_id|3),(uid|1)`

- 日志字段：
  - `success`：是否成功。
  - `key_id`：密钥标识。
  - `uid`：UID 或 SELinux 所有者编码（高位可能表示 SELinux 标签）。
- 触发流程：Keystore/KeyMint；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_key_imported`（EventLog tag `210025`）

- 日志含义：密钥导入操作完成并记录结果、别名和所有者。

- 原始格式：`security_key_imported (success|1),(key_id|3),(uid|1)`

- 日志字段：
  - `success`：是否成功。
  - `key_id`：密钥标识。
  - `uid`：UID 或 SELinux 所有者编码（高位可能表示 SELinux 标签）。
- 触发流程：Keystore/KeyMint；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_key_destroyed`（EventLog tag `210026`）

- 日志含义：密钥销毁操作完成并记录结果、别名和所有者。

- 原始格式：`security_key_destroyed (success|1),(key_id|3),(uid|1)`

- 日志字段：
  - `success`：是否成功。
  - `key_id`：密钥标识。
  - `uid`：UID 或 SELinux 所有者编码（高位可能表示 SELinux 标签）。
- 触发流程：Keystore/KeyMint；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_user_restriction_added`（EventLog tag `210027`）

- 日志含义：设备管理员添加了用户限制。

- 原始格式：`security_user_restriction_added (package|3),(admin_user|1),(restriction|3)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `restriction`：用户限制项。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_USER_RESTRICTION_ADDED`。

#### `security_user_restriction_removed`（EventLog tag `210028`）

- 日志含义：设备管理员移除了用户限制。

- 原始格式：`security_user_restriction_removed (package|3),(admin_user|1),(restriction|3)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `restriction`：用户限制项。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_USER_RESTRICTION_REMOVED`。

#### `security_cert_authority_installed`（EventLog tag `210029`）

- 日志含义：受信任根证书安装完成并记录结果和用户。

- 原始格式：`security_cert_authority_installed (success|1),(subject|3),(target_user|1)`

- 日志字段：
  - `success`：是否成功。
  - `subject`：证书主题。
  - `target_user`：目标用户 ID。
- 触发流程：CredentialStorage/DevicePolicyManagerService；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_cert_authority_removed`（EventLog tag `210030`）

- 日志含义：受信任根证书移除完成并记录结果和用户。

- 原始格式：`security_cert_authority_removed (success|1),(subject|3),(target_user|1)`

- 日志字段：
  - `success`：是否成功。
  - `subject`：证书主题。
  - `target_user`：目标用户 ID。
- 触发流程：CredentialStorage/DevicePolicyManagerService；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_crypto_self_test_completed`（EventLog tag `210031`）

- 日志含义：密码功能自检完成并记录结果。

- 原始格式：`security_crypto_self_test_completed (success|1)`

- 日志字段：
  - `success`：是否成功。
- 触发流程：CryptoTestHelper；搜索 `SecurityLog.TAG_CRYPTO_SELF_TEST_COMPLETED`。

#### `security_key_integrity_violation`（EventLog tag `210032`）

- 日志含义：检测到密钥完整性校验失败。

- 原始格式：`security_key_integrity_violation (key_id|3),(uid|1)`

- 日志字段：
  - `key_id`：密钥标识。
  - `uid`：UID。
- 触发流程：Keystore/KeyMint；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_cert_validation_failure`（EventLog tag `210033`）

- 日志含义：X.509 证书校验失败并记录原因。

- 原始格式：`security_cert_validation_failure (reason|3)`

- 日志字段：
  - `reason`：原因。
- 触发流程：Conscrypt/NetworkSecurityPolicy；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_camera_policy_set`（EventLog tag `210034`）

- 日志含义：设备管理员设置了相机禁用策略。

- 原始格式：`security_camera_policy_set (package|3),(admin_user|1),(target_user|1),(disabled|1)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `target_user`：目标用户 ID。
  - `disabled`：是否禁用。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_CAMERA_POLICY_SET`。

#### `security_password_complexity_required`（EventLog tag `210035`）

- 日志含义：设备管理员设置了平台预定义的密码复杂度要求。

- 原始格式：`security_password_complexity_required (package|3),(admin_user|1),(target_user|1),(complexity|1)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `target_user`：目标用户 ID。
  - `complexity`：复杂度等级。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_PASSWORD_COMPLEXITY_REQUIRED`。

#### `security_password_changed`（EventLog tag `210036`）

- 日志含义：用户刚修改了锁屏密码并记录新密码复杂度。

- 原始格式：`security_password_changed (password_complexity|1),(target_user|1)`

- 日志字段：
  - `password_complexity`：密码复杂度。
  - `target_user`：目标用户 ID。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_PASSWORD_CHANGED`。

#### `security_wifi_connection`（EventLog tag `210037`）

- 日志含义：设备尝试连接受管 Wi‑Fi 网络并记录连接事件。

- 原始格式：`security_wifi_connection (bssid|3),(event_type|3),(reason|3)`

- 日志字段：
  - `bssid`：Wi‑Fi AP 的 BSSID（仅记录末两段，脱敏）。
  - `event_type`：连接事件类型。
  - `reason`：原因。
- 触发流程：受管 Wi‑Fi 配置/连接模块；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_wifi_disconnection`（EventLog tag `210038`）

- 日志含义：设备从受管 Wi‑Fi 网络断开。

- 原始格式：`security_wifi_disconnection (bssid|3),(reason|3)`

- 日志字段：
  - `bssid`：Wi‑Fi AP 的 BSSID（仅记录末两段，脱敏）。
  - `reason`：原因。
- 触发流程：受管 Wi‑Fi 配置/连接模块；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_bluetooth_connection`（EventLog tag `210039`）

- 日志含义：设备尝试连接蓝牙设备并记录结果。

- 原始格式：`security_bluetooth_connection (addr|3),(success|1),(reason|3)`

- 日志字段：
  - `addr`：蓝牙地址。
  - `success`：是否成功。
  - `reason`：原因。
- 触发流程：Bluetooth 服务；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_bluetooth_disconnection`（EventLog tag `210040`）

- 日志含义：设备从蓝牙设备断开。

- 原始格式：`security_bluetooth_disconnection (addr|3),(reason|3)`

- 日志字段：
  - `addr`：蓝牙地址。
  - `reason`：原因。
- 触发流程：Bluetooth 服务；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_package_installed`（EventLog tag `210041`）

- 日志含义：系统安装了一个应用包。

- 原始格式：`security_package_installed (package_name|3),(version_code|2),(user_id|1)`

- 日志字段：
  - `package_name`：应用包名。
  - `version_code`：版本号。
  - `user_id`：用户 ID。
- 触发流程：PackageMetrics；搜索 `SecurityLog.TAG_PACKAGE_INSTALLED`。

#### `security_package_updated`（EventLog tag `210042`）

- 日志含义：系统更新了一个应用包。

- 原始格式：`security_package_updated (package_name|3),(version_code|2),(user_id|1)`

- 日志字段：
  - `package_name`：应用包名。
  - `version_code`：版本号。
  - `user_id`：用户 ID。
- 触发流程：PackageMetrics；搜索 `SecurityLog.TAG_PACKAGE_UPDATED`。

#### `security_package_uninstalled`（EventLog tag `210043`）

- 日志含义：系统卸载了一个应用包。

- 原始格式：`security_package_uninstalled (package_name|3),(version_code|2),(user_id|1)`

- 日志字段：
  - `package_name`：应用包名。
  - `version_code`：版本号。
  - `user_id`：用户 ID。
- 触发流程：PackageMetrics；搜索 `SecurityLog.TAG_PACKAGE_UNINSTALLED`。

#### `security_backup_service_toggled`（EventLog tag `210044`）

- 日志含义：设备管理员启用或停用了备份服务。

- 原始格式：`security_backup_service_toggled (package|3),(admin_user|1),(enabled|1)`

- 日志字段：
  - `package`：管理应用包名。
  - `admin_user`：管理者用户 ID。
  - `enabled`：备份服务是否启用（1 启用，0 停用）。
- 触发流程：DevicePolicyManagerService；搜索 `SecurityLog.TAG_BACKUP_SERVICE_TOGGLED`。

#### `security_nfc_enabled`（EventLog tag `210045`）

- 日志含义：NFC 功能已启用。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：NfcService；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `security_nfc_disabled`（EventLog tag `210046`）

- 日志含义：NFC 功能已停用。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：NfcService；旧版模块或当前 checkout 未含写入点，按事件名全局搜索。

#### `snet_event_log`（EventLog tag `1397638484`）

- 日志含义：Snet 安全网络记录一条带子标签、UID 和消息的事件。

- 原始格式：`snet_event_log (subtag|3) (uid|1) (message|3)`

- 日志字段：
  - `subtag`：Snet 事件子标签。
  - `uid`：UID。
  - `message`：Snet 事件消息。
- 触发流程：Snet/SafetyNet 组件；AOSP 通常不含实现，按事件名全局搜索。

### Google / Setup / GTalk

#### `vending_reconstruct`（EventLog tag `202001`）

- 日志含义：Vending/Google Play 组件重建内部状态，并记录检测到的变更。

- 原始格式：`vending_reconstruct (changes|1)`

- 日志字段：
  - `changes`：状态变更。
- 触发流程：Vending/Google Play 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `google_http_request`（EventLog tag `203002`）

- 日志含义：Google 组件完成一次 HTTP 请求并记录耗时、状态和连接复用情况。

- 原始格式：`google_http_request (elapsed|2|3),(status|1),(appname|3),(reused|1)`

- 日志字段：
  - `elapsed`：请求耗时。
  - `status`：状态码。
  - `appname`：应用名。
  - `reused`：是否复用连接。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `gtalkservice`（EventLog tag `204001`）

- 日志含义：GTalk 服务记录一次内部事件。

- 原始格式：`gtalkservice (eventType|1)`

- 日志字段：
  - `eventType`：GTalk 事件类型。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `gtalk_connection`（EventLog tag `204002`）

- 日志含义：GTalk 连接状态发生变化。

- 原始格式：`gtalk_connection (status|1)`

- 日志字段：
  - `status`：状态码。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `gtalk_conn_close`（EventLog tag `204003`）

- 日志含义：GTalk 连接关闭并记录状态和持续时间。

- 原始格式：`gtalk_conn_close (status|1),(duration|1)`

- 日志字段：
  - `status`：状态码。
  - `duration`：连接持续时间。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `gtalk_heartbeat_reset`（EventLog tag `204004`）

- 日志含义：GTalk 心跳计时器被重置。

- 原始格式：`gtalk_heartbeat_reset (interval_and_nt|1),(ip|3)`

- 日志字段：
  - `interval_and_nt`：心跳间隔/网络时间。
  - `ip`：服务器 IP。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `c2dm`（EventLog tag `204005`）

- 日志含义：C2DM（云到设备消息）收发了一条数据包。

- 原始格式：`c2dm (packet_type|1),(persistent_id|3),(stream_id|1),(last_stream_id|1)`

- 日志字段：
  - `packet_type`：数据包类型。
  - `persistent_id`：持久化消息 ID。
  - `stream_id`：当前流 ID。
  - `last_stream_id`：上次流 ID。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `setup_server_timeout`（EventLog tag `205001`）

- 日志含义：Setup 流程访问服务器超时。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `setup_required_captcha`（EventLog tag `205002`）

- 日志含义：Setup 流程要求用户完成 CAPTCHA 操作。

- 原始格式：`setup_required_captcha (action|3)`

- 日志字段：
  - `action`：设置动作。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `setup_io_error`（EventLog tag `205003`）

- 日志含义：Setup 流程发生 I/O 错误。

- 原始格式：`setup_io_error (status|3)`

- 日志字段：
  - `status`：状态码。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `setup_server_error`（EventLog tag `205004`）

- 日志含义：Setup 流程收到服务器错误。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `setup_retries_exhausted`（EventLog tag `205005`）

- 日志含义：Setup 流程重试次数耗尽。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `setup_no_data_network`（EventLog tag `205006`）

- 日志含义：Setup 流程因无可用数据网络而暂停或失败。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `setup_completed`（EventLog tag `205007`）

- 日志含义：Setup 流程完成。

- 日志字段：
  - 无附加字段；事件本身表示上述状态或动作已发生。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `gls_account_tried`（EventLog tag `205008`）

- 日志含义：GLS 尝试处理一个账号并记录结果状态。

- 原始格式：`gls_account_tried (status|1)`

- 日志字段：
  - `status`：状态码。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `gls_account_saved`（EventLog tag `205009`）

- 日志含义：GLS 保存账号并记录结果状态。

- 原始格式：`gls_account_saved (status|1)`

- 日志字段：
  - `status`：状态码。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `gls_authenticate`（EventLog tag `205010`）

- 日志含义：GLS 对账号执行认证并记录服务和结果状态。

- 原始格式：`gls_authenticate (status|1),(service|3)`

- 日志字段：
  - `status`：状态码。
  - `service`：执行认证的 Google 服务名称。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

#### `google_mail_switch`（EventLog tag `205011`）

- 日志含义：Google Mail 同步方向发生切换。

- 原始格式：`google_mail_switch (direction|1)`

- 日志字段：
  - `direction`：邮件同步方向。
- 触发流程：Google/GMS 组件；AOSP 通常不含实现，按事件名全局搜索。

## UI / Input / Notification

### 通知

#### `notification_enqueue`（EventLog tag `2750`）

- 日志含义：NotificationManagerService 记录通知入队，表示该处理已进入对应阶段。

- 日志字段：`uid`：调用方 UID。 `pid`：调用方 PID。 `pkg`：应用包名。 `id`：通知 ID。 `tag`：通知标签。 `userid`：用户 ID。 `notification`：通知摘要。 `status`：状态码。 `app_provided`：是否由应用提供。

- 触发流程：NotificationManagerService.enqueueNotificationInternal()（搜索关键词：`notification_enqueue`、`NotificationManagerService`、`EventLogTags.writeNotificationEnqueue`）。

#### `notification_cancel`（EventLog tag `2751`）

- 日志含义：NotificationManagerService 记录通知取消，表示该处理已进入对应阶段。

- 日志字段：`uid`：调用方 UID。 `pid`：调用方 PID。 `pkg`：应用包名。 `id`：通知 ID。 `tag`：通知标签。 `userid`：用户 ID。 `required_flags`：必需通知标志。 `forbidden_flags`：排除通知标志。 `reason`：操作原因。 `listener`：监听器。

- 触发流程：NotificationManagerService.cancelNotification()（搜索关键词：`notification_cancel`、`NotificationManagerService`、`EventLogTags.writeNotificationCancel`）。

#### `notification_cancel_all`（EventLog tag `2752`）

- 日志含义：NotificationManagerService 记录批量取消通知，表示该处理已进入对应阶段。

- 日志字段：`uid`：调用方 UID。 `pid`：调用方 PID。 `pkg`：应用包名。 `userid`：用户 ID。 `required_flags`：必需通知标志。 `forbidden_flags`：排除通知标志。 `reason`：操作原因。 `listener`：监听器。

- 触发流程：NotificationManagerService.cancelAllNotifications()（搜索关键词：`notification_cancel_all`、`NotificationManagerService`、`EventLogTags.writeNotificationCancelAll`）。

#### `notification_panel_revealed`（EventLog tag `27500`）

- 日志含义：SystemUI 通知面板展开，开始展示通知列表。

- 日志字段：`items`：通知数量。

- 触发流程：NotificationLogger.onPanelRevealed()（搜索关键词：`notification_panel_revealed`、`NotificationLogger`、`EventLogTags.writeNotificationPanelRevealed`）。

#### `notification_panel_hidden`（EventLog tag `27501`）

- 日志含义：SystemUI 通知面板收起，停止展示通知列表。

- 日志字段：无（仅记录事件发生）。

- 触发流程：NotificationLogger.onPanelHidden()（搜索关键词：`notification_panel_hidden`、`NotificationLogger`、`EventLogTags.writeNotificationPanelHidden`）。

#### `notification_visibility_changed`（EventLog tag `27510`）

- 日志含义：SystemUI 上报通知可见性变化。

- 日志字段：`newlyVisibleKeys`：新可见通知键。 `noLongerVisibleKeys`：不再可见通知键。

- 触发流程：NotificationLogger.onNotificationVisibilityChanged()（搜索关键词：`notification_visibility_changed`、`NotificationLogger`、`EventLogTags.writeNotificationVisibilityChanged`）。

#### `notification_expansion`（EventLog tag `27511`）

- 日志含义：SystemUI 记录用户展开或收起通知。

- 日志字段：`key`：通知键。 `user_action`：用户操作类型。 `expanded`：是否展开。 `lifespan`：存活时长。 `freshness`：新鲜度。 `exposure`：曝光时长。

- 触发流程：NotificationLogger.onExpansionChanged()（搜索关键词：`notification_expansion`、`NotificationLogger`、`EventLogTags.writeNotificationExpansion`）。

#### `notification_clicked`（EventLog tag `27520`）

- 日志含义：SystemUI 记录用户点击通知。

- 日志字段：`key`：通知键。 `lifespan`：存活时长。 `freshness`：新鲜度。 `exposure`：曝光时长。 `rank`：排序位置。 `count`：数量。

- 触发流程：NotificationLogger.onNotificationClicked()（搜索关键词：`notification_clicked`、`NotificationLogger`、`EventLogTags.writeNotificationClicked`）。

#### `notification_action_clicked`（EventLog tag `27521`）

- 日志含义：SystemUI 记录用户点击通知动作按钮。

- 日志字段：`key`：通知键。 `piIdentifier`：PendingIntent 标识。 `pendingIntent`：PendingIntent 描述。 `action_index`：动作索引。 `lifespan`：存活时长。 `freshness`：新鲜度。 `exposure`：曝光时长。 `rank`：排序位置。 `count`：数量。

- 触发流程：NotificationLogger.onNotificationActionClicked()（搜索关键词：`notification_action_clicked`、`NotificationLogger`、`EventLogTags.writeNotificationActionClicked`）。

#### `notification_canceled`（EventLog tag `27530`）

- 日志含义：SystemUI 记录通知被移除及曝光统计。

- 日志字段：`key`：通知键。 `reason`：操作原因。 `lifespan`：存活时长。 `freshness`：新鲜度。 `exposure`：曝光时长。 `rank`：排序位置。 `count`：数量。 `listener`：监听器。

- 触发流程：NotificationLogger.onNotificationCanceled()（搜索关键词：`notification_canceled`、`NotificationLogger`、`EventLogTags.writeNotificationCanceled`）。

#### `notification_visibility`（EventLog tag `27531`）

- 日志含义：SystemUI 上报单条通知的可见状态。

- 日志字段：`key`：通知键。 `visibile`：是否可见。 `lifespan`：存活时长。 `freshness`：新鲜度。 `exposure`：曝光时长。 `rank`：排序位置。

- 触发流程：NotificationLogger.onNotificationVisibility()（搜索关键词：`notification_visibility`、`NotificationLogger`、`EventLogTags.writeNotificationVisibility`）。

#### `notification_alert`（EventLog tag `27532`）

- 日志含义：SystemUI 记录通知提醒（声音、振动或指示灯）结果。

- 日志字段：`key`：通知键。 `buzz`：是否振动。 `beep`：是否响铃。 `blink`：是否闪灯。 `politeness`：提醒级别。 `mute_reason`：静音原因。

- 触发流程：NotificationLogger.onNotificationAlert()（搜索关键词：`notification_alert`、`NotificationLogger`、`EventLogTags.writeNotificationAlert`）。

#### `notification_autogrouped`（EventLog tag `27533`）

- 日志含义：NotificationManagerService 记录通知自动归组，表示该处理已进入对应阶段。

- 日志字段：`key`：通知键。

- 触发流程：NotificationManagerService.adjustNotification()（搜索关键词：`notification_autogrouped`、`NotificationManagerService`、`EventLogTags.writeNotificationAutogrouped`）。

#### `notification_adjusted`（EventLog tag `27535`）

- 日志含义：NotificationManagerService 记录通知属性被调整，表示该处理已进入对应阶段。

- 日志字段：`key`：通知键。 `adjustment_type`：调整类型。 `new_value`：新值。

- 触发流程：NotificationManagerService.applyAdjustment()（搜索关键词：`notification_adjusted`、`NotificationManagerService`、`EventLogTags.writeNotificationAdjusted`）。

#### `notification_cancel_prevented`（EventLog tag `27536`）

- 日志含义：NotificationManagerService 记录通知取消被阻止，表示该处理已进入对应阶段。

- 日志字段：`key`：通知键。

- 触发流程：NotificationManagerService.cancelNotification()（搜索关键词：`notification_cancel_prevented`、`NotificationManagerService`、`EventLogTags.writeNotificationCancelPrevented`）。

#### `notification_summary_converted`（EventLog tag `27537`）

- 日志含义：NotificationManagerService 记录通知转为摘要，表示该处理已进入对应阶段。

- 日志字段：`key`：通知键。

- 触发流程：NotificationManagerService.convertToNotificationGroup()（搜索关键词：`notification_summary_converted`、`NotificationManagerService`、`EventLogTags.writeNotificationSummaryConverted`）。

#### `notification_unautogrouped`（EventLog tag `275534`）

- 日志含义：NotificationManagerService 记录通知取消自动归组，表示该处理已进入对应阶段。

- 日志字段：`key`：通知键。

- 触发流程：NotificationManagerService.adjustNotification()（搜索关键词：`notification_unautogrouped`、`NotificationManagerService`、`EventLogTags.writeNotificationUnautogrouped`）。

### 输入法框架

#### `imf_force_reconnect_ime`（EventLog tag `32000`）

- 日志含义：输入法框架记录强制重连输入法。

- 日志字段：`IME`：IME 数据数组。 `Time Since Connect`：连接后耗时。 `Showing`：是否显示。

- 触发流程：InputMethodManagerService 输入法连接管理（搜索关键词：`imf_force_reconnect_ime`、`InputMethodManagerService`、`EventLogTags.writeImfForceReconnectIme`）。

#### `imf_show_ime`（EventLog tag `32001`）

- 日志含义：输入法框架记录请求显示输入法。

- 日志字段：`token`：窗口令牌。 `window`：窗口名称。 `reason`：操作原因。 `softInputMode`：软输入模式。

- 触发流程：InputMethodManagerService.showSoftInput()（搜索关键词：`imf_show_ime`、`InputMethodManagerService`、`EventLogTags.writeImfShowIme`）。

#### `imf_hide_ime`（EventLog tag `32002`）

- 日志含义：输入法框架记录请求隐藏输入法。

- 日志字段：`token`：窗口令牌。 `window`：窗口名称。 `reason`：操作原因。 `softInputMode`：软输入模式。

- 触发流程：InputMethodManagerService.hideSoftInput()（搜索关键词：`imf_hide_ime`、`InputMethodManagerService`、`EventLogTags.writeImfHideIme`）。

#### `imf_update_ime_parent`（EventLog tag `32003`）

- 日志含义：输入法框架记录更新输入法 Surface 父节点。

- 日志字段：`surface name`：Surface 名称。

- 触发流程：InsetsController / ImeInsetsSourceProvider（搜索关键词：`imf_update_ime_parent`、`EventLogTags.writeImfUpdateImeParent`）。

#### `imf_show_ime_screenshot`（EventLog tag `32004`）

- 日志含义：输入法框架记录显示输入法过渡截图。

- 日志字段：`target window`：目标窗口。 `transition`：过渡类型。 `surface position`：Surface 位置。

- 触发流程：InsetsController / ImeInsetsSourceProvider（搜索关键词：`imf_show_ime_screenshot`、`EventLogTags.writeImfShowImeScreenshot`）。

#### `imf_remove_ime_screenshot`（EventLog tag `32005`）

- 日志含义：输入法框架记录移除输入法过渡截图。

- 日志字段：`target window`：目标窗口。

- 触发流程：InsetsController / ImeInsetsSourceProvider（搜索关键词：`imf_remove_ime_screenshot`、`EventLogTags.writeImfRemoveImeScreenshot`）。

#### `imf_ime_anim_start`（EventLog tag `32006`）

- 日志含义：输入法框架记录输入法动画开始。

- 日志字段：`token`：窗口令牌。 `animation type`：动画类型。 `alpha`：动画透明度。 `current insets`：当前 Insets。 `shown insets`：显示 Insets。 `hidden insets`：隐藏 Insets。

- 触发流程：ImeInsetsSourceConsumer / InsetsController（搜索关键词：`imf_ime_anim_start`、`EventLogTags.writeImfImeAnimStart`）。

#### `imf_ime_anim_finish`（EventLog tag `32007`）

- 日志含义：输入法框架记录输入法动画完成。

- 日志字段：`token`：窗口令牌。 `animation type`：动画类型。 `alpha`：动画透明度。 `shown`：是否显示。 `insets`：事件参数。

- 触发流程：ImeInsetsSourceConsumer / InsetsController（搜索关键词：`imf_ime_anim_finish`、`EventLogTags.writeImfImeAnimFinish`）。

#### `imf_ime_anim_cancel`（EventLog tag `32008`）

- 日志含义：输入法框架记录输入法动画取消。

- 日志字段：`token`：窗口令牌。 `animation type`：动画类型。 `pending insets`：待应用 Insets。

- 触发流程：ImeInsetsSourceConsumer / InsetsController（搜索关键词：`imf_ime_anim_cancel`、`EventLogTags.writeImfImeAnimCancel`）。

#### `imf_ime_remote_anim_start`（EventLog tag `32009`）

- 日志含义：输入法框架记录远程输入法动画开始。

- 日志字段：`token`：窗口令牌。 `displayId`：显示屏 ID。 `direction`：动画方向。 `alpha`：动画透明度。 `startY`：起始 Y 坐标。 `endY`：结束 Y 坐标。 `leash`：动画 leash。 `insets`：事件参数。 `surface position`：Surface 位置。 `ime frame`：IME 矩形。

- 触发流程：InsetsController.controlAnimationUnchecked()（搜索关键词：`imf_ime_remote_anim_start`、`EventLogTags.writeImfImeRemoteAnimStart`）。

#### `imf_ime_remote_anim_end`（EventLog tag `32010`）

- 日志含义：输入法框架记录远程输入法动画结束。

- 日志字段：`token`：窗口令牌。 `displayId`：显示屏 ID。 `direction`：动画方向。 `endY`：结束 Y 坐标。 `leash`：动画 leash。 `insets`：事件参数。 `surface position`：Surface 位置。 `ime frame`：IME 矩形。

- 触发流程：InsetsController / ImeInsetsSourceConsumer（搜索关键词：`imf_ime_remote_anim_end`、`EventLogTags.writeImfImeRemoteAnimEnd`）。

#### `imf_ime_remote_anim_cancel`（EventLog tag `32011`）

- 日志含义：输入法框架记录远程输入法动画取消。

- 日志字段：`token`：窗口令牌。 `displayId`：显示屏 ID。 `insets`：事件参数。

- 触发流程：InsetsController / ImeInsetsSourceConsumer（搜索关键词：`imf_ime_remote_anim_cancel`、`EventLogTags.writeImfImeRemoteAnimCancel`）。

### 壁纸

#### `wp_wallpaper_crashed`（EventLog tag `33000`）

- 日志含义：WallpaperManagerService 记录壁纸操作。

- 日志字段：`component`：组件名称。

- 触发流程：WallpaperManagerService.handleWpWallpaperCrashed()（搜索关键词：`wp_wallpaper_crashed`、`WallpaperManagerService`、`EventLogTags.writeWpWallpaperCrashed`）。

### Device Idle

#### `device_idle`（EventLog tag `34000`）

- 日志含义：DeviceIdleController 的 Doze 状态发生变化，记录当前状态及原因。

- 日志字段：`state`：状态值。 `reason`：操作原因。

- 触发流程：DeviceIdleController.handleDeviceIdle()（搜索关键词：`device_idle`、`DeviceIdleController`、`EventLogTags.writeDeviceIdle`）。

#### `device_idle_step`（EventLog tag `34001`）

- 日志含义：DeviceIdleController 记录idle 状态推进。

- 日志字段：无（仅记录事件发生）。

- 触发流程：DeviceIdleController.stepIdleState()（搜索关键词：`device_idle_step`、`DeviceIdleController`、`EventLogTags.writeDeviceIdleStep`）。

#### `device_idle_wake_from_idle`（EventLog tag `34002`）

- 日志含义：DeviceIdleController 记录从 idle 唤醒。

- 日志字段：`is_idle`：是否处于 idle。 `reason`：操作原因。

- 触发流程：DeviceIdleController.becomeActive()（搜索关键词：`device_idle_wake_from_idle`、`DeviceIdleController`、`EventLogTags.writeDeviceIdleWakeFromIdle`）。

#### `device_idle_on_start`（EventLog tag `34003`）

- 日志含义：DeviceIdleController 记录idle 流程开始。

- 日志字段：无（仅记录事件发生）。

- 触发流程：DeviceIdleController.handleDeviceIdleOnStart()（搜索关键词：`device_idle_on_start`、`DeviceIdleController`、`EventLogTags.writeDeviceIdleOnStart`）。

#### `device_idle_on_phase`（EventLog tag `34004`）

- 日志含义：DeviceIdleController 记录idle 阶段变化。

- 日志字段：`what`：阶段名称。

- 触发流程：DeviceIdleController.handleDeviceIdleOnPhase()（搜索关键词：`device_idle_on_phase`、`DeviceIdleController`、`EventLogTags.writeDeviceIdleOnPhase`）。

#### `device_idle_on_complete`（EventLog tag `34005`）

- 日志含义：DeviceIdleController 记录idle 流程完成。

- 日志字段：无（仅记录事件发生）。

- 触发流程：DeviceIdleController.handleDeviceIdleOnComplete()（搜索关键词：`device_idle_on_complete`、`DeviceIdleController`、`EventLogTags.writeDeviceIdleOnComplete`）。

#### `device_idle_off_start`（EventLog tag `34006`）

- 日志含义：DeviceIdleController 记录退出 idle 开始。

- 日志字段：`reason`：操作原因。

- 触发流程：DeviceIdleController.handleDeviceIdleOffStart()（搜索关键词：`device_idle_off_start`、`DeviceIdleController`、`EventLogTags.writeDeviceIdleOffStart`）。

#### `device_idle_off_phase`（EventLog tag `34007`）

- 日志含义：DeviceIdleController 记录退出 idle 阶段变化。

- 日志字段：`what`：阶段名称。

- 触发流程：DeviceIdleController.handleDeviceIdleOffPhase()（搜索关键词：`device_idle_off_phase`、`DeviceIdleController`、`EventLogTags.writeDeviceIdleOffPhase`）。

#### `device_idle_off_complete`（EventLog tag `34008`）

- 日志含义：DeviceIdleController 记录退出 idle 完成。

- 日志字段：无（仅记录事件发生）。

- 触发流程：DeviceIdleController.handleDeviceIdleOffComplete()（搜索关键词：`device_idle_off_complete`、`DeviceIdleController`、`EventLogTags.writeDeviceIdleOffComplete`）。

#### `device_idle_light`（EventLog tag `34009`）

- 日志含义：DeviceIdleController 记录轻度 idle 状态变化。

- 日志字段：`state`：状态值。 `reason`：操作原因。

- 触发流程：DeviceIdleController.handleDeviceIdleLight()（搜索关键词：`device_idle_light`、`DeviceIdleController`、`EventLogTags.writeDeviceIdleLight`）。

#### `device_idle_light_step`（EventLog tag `34010`）

- 日志含义：DeviceIdleController 记录设备 idle 操作。

- 日志字段：无（仅记录事件发生）。

- 触发流程：DeviceIdleController.handleDeviceIdleLightStep()（搜索关键词：`device_idle_light_step`、`DeviceIdleController`、`EventLogTags.writeDeviceIdleLightStep`）。

### 自动亮度

#### `auto_brightness_adj`（EventLog tag `35000`）

- 日志含义：AutomaticBrightnessController 记录自动亮度调整。

- 日志字段：`old_lux`：调整前光照度。 `old_brightness`：调整前亮度。 `new_lux`：调整后光照度。 `new_brightness`：调整后亮度。

- 触发流程：AutomaticBrightnessController.reportAutoBrightnessEvent()（搜索关键词：`auto_brightness_adj`、`AutomaticBrightnessController`、`EventLogTags.writeAutoBrightnessAdj`）。

### SystemUI/Jank

#### `sysui_statusbar_touch`（EventLog tag `36000`）

- 日志含义：SystemUI 记录状态栏触摸。

- 日志字段：`type`：事件或触摸类型。 `x`：X 坐标。 `y`：Y 坐标。 `disable1`：disable1 标志。 `disable2`：disable2 标志。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_statusbar_touch`、`SystemUI`、`EventLogTags.writeSysuiStatusbarTouch`）。

#### `sysui_heads_up_status`（EventLog tag `36001`）

- 日志含义：SystemUI 记录Heads-up 状态变化。

- 日志字段：`key`：通知键。 `visible`：是否可见。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_heads_up_status`、`SystemUI`、`EventLogTags.writeSysuiHeadsUpStatus`）。

#### `sysui_fullscreen_notification`（EventLog tag `36002`）

- 日志含义：SystemUI 记录全屏通知展示。

- 日志字段：`key`：通知键。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_fullscreen_notification`、`SystemUI`、`EventLogTags.writeSysuiFullscreenNotification`）。

#### `sysui_heads_up_escalation`（EventLog tag `36003`）

- 日志含义：SystemUI 记录Heads-up 升级。

- 日志字段：`key`：通知键。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_heads_up_escalation`、`SystemUI`、`EventLogTags.writeSysuiHeadsUpEscalation`）。

#### `sysui_status_bar_state`（EventLog tag `36004`）

- 日志含义：SystemUI 记录状态栏/锁屏状态变化。

- 日志字段：`state`：状态值。 `keyguardShowing`：是否显示锁屏。 `keyguardOccluded`：锁屏是否遮挡。 `bouncerShowing`：是否显示解锁面板。 `secure`：是否安全锁屏。 `currentlyInsecure`：是否处于非安全状态。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_status_bar_state`、`SystemUI`、`EventLogTags.writeSysuiStatusBarState`）。

#### `sysui_panelbar_touch`（EventLog tag `36010`）

- 日志含义：SystemUI 记录面板栏触摸。

- 日志字段：`type`：事件或触摸类型。 `x`：X 坐标。 `y`：Y 坐标。 `enabled`：是否启用。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_panelbar_touch`、`SystemUI`、`EventLogTags.writeSysuiPanelbarTouch`）。

#### `sysui_notificationpanel_touch`（EventLog tag `36020`）

- 日志含义：SystemUI 记录通知面板触摸。

- 日志字段：`type`：事件或触摸类型。 `x`：X 坐标。 `y`：Y 坐标。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_notificationpanel_touch`、`SystemUI`、`EventLogTags.writeSysuiNotificationpanelTouch`）。

#### `sysui_lockscreen_gesture`（EventLog tag `36021`）

- 日志含义：SystemUI 记录锁屏手势。

- 日志字段：`type`：事件或触摸类型。 `lengthDp`：手势长度（dp）。 `velocityDp`：手势速度（dp/s）。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_lockscreen_gesture`、`SystemUI`、`EventLogTags.writeSysuiLockscreenGesture`）。

#### `sysui_quickpanel_touch`（EventLog tag `36030`）

- 日志含义：SystemUI 记录快捷面板触摸。

- 日志字段：`type`：事件或触摸类型。 `x`：X 坐标。 `y`：Y 坐标。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_quickpanel_touch`、`SystemUI`、`EventLogTags.writeSysuiQuickpanelTouch`）。

#### `sysui_panelholder_touch`（EventLog tag `36040`）

- 日志含义：SystemUI 记录面板容器触摸。

- 日志字段：`type`：事件或触摸类型。 `x`：X 坐标。 `y`：Y 坐标。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_panelholder_touch`、`SystemUI`、`EventLogTags.writeSysuiPanelholderTouch`）。

#### `sysui_searchpanel_touch`（EventLog tag `36050`）

- 日志含义：SystemUI 记录搜索面板触摸。

- 日志字段：`type`：事件或触摸类型。 `x`：X 坐标。 `y`：Y 坐标。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_searchpanel_touch`、`SystemUI`、`EventLogTags.writeSysuiSearchpanelTouch`）。

#### `sysui_recents_connection`（EventLog tag `36060`）

- 日志含义：SystemUI 记录最近任务连接变化。

- 日志字段：`type`：事件或触摸类型。 `user`：用户 ID。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_recents_connection`、`SystemUI`、`EventLogTags.writeSysuiRecentsConnection`）。

#### `sysui_latency`（EventLog tag `36070`）

- 日志含义：SystemUI 记录SystemUI 操作延迟。

- 日志字段：`action`：动作类型。 `latency`：延迟（毫秒）。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_latency`、`SystemUI`、`EventLogTags.writeSysuiLatency`）。

#### `sysui_keyguard`（EventLog tag `36080`）

- 日志含义：SystemUI 记录Keyguard 状态变化。

- 日志字段：`isOccluded`：是否遮挡。 `animate`：是否动画。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_keyguard`、`SystemUI`、`EventLogTags.writeSysuiKeyguard`）。

#### `jank_cuj_events_begin_request`（EventLog tag `37001`）

- 日志含义：InteractionJankMonitor 记录CUJ 操作。

- 日志字段：`CUJ Type`：CUJ 类型。 `Unix Time Ns`：Unix 时间（纳秒）。 `Elapsed Time Ns`：开机后时间（纳秒）。 `Uptime Ns`：运行时间（纳秒）。 `Tag`：场景标签。

- 触发流程：InteractionJankMonitor.begin()（搜索关键词：`jank_cuj_events_begin_request`、`InteractionJankMonitor`、`EventLogTags.writeJankCujEventsBeginRequest`）。

#### `jank_cuj_events_end_request`（EventLog tag `37002`）

- 日志含义：InteractionJankMonitor 记录CUJ 操作。

- 日志字段：`CUJ Type`：CUJ 类型。 `Unix Time Ns`：Unix 时间（纳秒）。 `Elapsed Time Ns`：开机后时间（纳秒）。 `Uptime Time Ns`：运行时间（纳秒）。

- 触发流程：InteractionJankMonitor.end()（搜索关键词：`jank_cuj_events_end_request`、`InteractionJankMonitor`、`EventLogTags.writeJankCujEventsEndRequest`）。

#### `jank_cuj_events_cancel_request`（EventLog tag `37003`）

- 日志含义：InteractionJankMonitor 记录CUJ 操作。

- 日志字段：`CUJ Type`：CUJ 类型。 `Unix Time Ns`：Unix 时间（纳秒）。 `Elapsed Time Ns`：开机后时间（纳秒）。 `Uptime Time Ns`：运行时间（纳秒）。

- 触发流程：InteractionJankMonitor.cancel()（搜索关键词：`jank_cuj_events_cancel_request`、`InteractionJankMonitor`、`EventLogTags.writeJankCujEventsCancelRequest`）。

#### `sysui_view_visibility`（EventLog tag `524287`）

- 日志含义：SystemUI 记录界面操作。

- 日志字段：`category`：类别。 `visible`：是否可见。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_view_visibility`、`SystemUI`、`EventLogTags.writeSysuiViewVisibility`）。

#### `sysui_action`（EventLog tag `524288`）

- 日志含义：SystemUI 记录界面操作。

- 日志字段：`category`：类别。 `pkg`：应用包名。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_action`、`SystemUI`、`EventLogTags.writeSysuiAction`）。

#### `sysui_count`（EventLog tag `524290`）

- 日志含义：SystemUI 记录界面操作。

- 日志字段：`name`：名称。 `increment`：增量。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_count`、`SystemUI`、`EventLogTags.writeSysuiCount`）。

#### `sysui_histogram`（EventLog tag `524291`）

- 日志含义：SystemUI 记录界面操作。

- 日志字段：`name`：名称。 `bucket`：直方图桶。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_histogram`、`SystemUI`、`EventLogTags.writeSysuiHistogram`）。

#### `sysui_multi_action`（EventLog tag `524292`）

- 日志含义：SystemUI 记录界面操作。

- 日志字段：`content`：多动作数组。

- 触发流程：SystemUI（StatusBar/NotificationPanelViewController 等）相关路径（搜索关键词：`sysui_multi_action`、`SystemUI`、`EventLogTags.writeSysuiMultiAction`）。

### 音频

#### `volume_changed`（EventLog tag `40000`）

- 日志含义：AudioService 记录音量变化。

- 日志字段：`stream`：音频流类型。 `prev_level`：原音量级别。 `level`：当前音量级别。 `max_level`：最大音量级别。 `caller`：调用者。

- 触发流程：AudioService.setStreamVolume()（搜索关键词：`volume_changed`、`AudioService`、`EventLogTags.writeVolumeChanged`）。

#### `stream_devices_changed`（EventLog tag `40001`）

- 日志含义：AudioService 记录音频设备变化。

- 日志字段：`stream`：音频流类型。 `prev_devices`：原输出设备。 `devices`：当前输出设备。

- 触发流程：AudioService.onAudioPortListUpdate()（搜索关键词：`stream_devices_changed`、`AudioService`、`EventLogTags.writeStreamDevicesChanged`）。

### 摄像头手势

#### `camera_gesture_triggered`（EventLog tag `40100`）

- 日志含义：CameraGestureHelper 记录摄像头手势触发。

- 日志字段：`gesture_on_time`：手势时间。 `sensor1_on_time`：传感器1时间。 `sensor2_on_time`：传感器2时间。 `event_extra`：附加数据。

- 触发流程：CameraGestureHelper.handleCameraGestureTriggered()（搜索关键词：`camera_gesture_triggered`、`CameraGesture`、`EventLogTags.writeCameraGestureTriggered`）。

### 菜单

#### `menu_item_selected`（EventLog tag `50000`）

- 日志含义：菜单组件记录菜单项选择。

- 日志字段：`Menu type where 0 is options and 1 is context`：菜单类型（0选项，1上下文）。 `Menu item title`：菜单项标题。

- 触发流程：Legacy MenuBuilder/MenuItem（搜索关键词：`menu_item_selected`、事件名全局搜索）。

#### `menu_opened`（EventLog tag `50001`）

- 日志含义：菜单组件记录菜单打开。

- 日志字段：`Menu type where 0 is options and 1 is context`：菜单类型（0选项，1上下文）。

- 触发流程：Legacy MenuBuilder/Menu（搜索关键词：`menu_opened`、事件名全局搜索）。

### View/SurfaceView

#### `viewroot_draw`（EventLog tag `60000`）

- 日志含义：ViewRootImpl 记录绘制完成。

- 日志字段：`Draw time`：绘制耗时。

- 触发流程：ViewRootImpl / SurfaceView.draw()（搜索关键词：`viewroot_draw`、`ViewRootImpl`、`EventLogTags.writeViewrootDraw`）。

#### `viewroot_layout`（EventLog tag `60001`）

- 日志含义：ViewRootImpl 记录布局完成。

- 日志字段：`Layout time`：布局耗时。

- 触发流程：ViewRootImpl / SurfaceView.performTraversals()（搜索关键词：`viewroot_layout`、`ViewRootImpl`、`EventLogTags.writeViewrootLayout`）。

#### `view_build_drawing_cache`（EventLog tag `60002`）

- 日志含义：View 记录创建绘图缓存。

- 日志字段：`View created drawing cache`：是否创建绘图缓存。

- 触发流程：ViewRootImpl / SurfaceView.handleViewBuildDrawingCache()（搜索关键词：`view_build_drawing_cache`、`ViewRootImpl`、`EventLogTags.writeViewBuildDrawingCache`）。

#### `view_use_drawing_cache`（EventLog tag `60003`）

- 日志含义：View 记录使用绘图缓存。

- 日志字段：`View drawn using bitmap cache`：是否使用位图缓存绘制。

- 触发流程：ViewRootImpl / SurfaceView.handleViewUseDrawingCache()（搜索关键词：`view_use_drawing_cache`、`ViewRootImpl`、`EventLogTags.writeViewUseDrawingCache`）。

#### `viewroot_draw_event`（EventLog tag `60004`）

- 日志含义：ViewRootImpl 记录绘制事件。

- 日志字段：`window`：窗口名称。 `event`：事件名称。

- 触发流程：ViewRootImpl / SurfaceView.handleViewrootDrawEvent()（搜索关键词：`viewroot_draw_event`、`ViewRootImpl`、`EventLogTags.writeViewrootDrawEvent`）。

#### `surfaceview_layout`（EventLog tag `60005`）

- 日志含义：SurfaceView 记录布局完成。

- 日志字段：`window`：窗口名称。 `format`：像素格式。 `width`：宽度。 `height`：高度。 `z`：Z 顺序。 `sizeFrom`：尺寸来源。 `attached`：是否已附加。 `lifecycleStrategy`：生命周期策略。 `viewVisible`：View 是否可见。

- 触发流程：ViewRootImpl / SurfaceView.handleSurfaceviewLayout()（搜索关键词：`surfaceview_layout`、`ViewRootImpl`、`EventLogTags.writeSurfaceviewLayout`）。

#### `surfaceview_callback`（EventLog tag `60006`）

- 日志含义：SurfaceView 记录SurfaceView 回调。

- 日志字段：`window`：窗口名称。 `callback`：回调名称。

- 触发流程：ViewRootImpl / SurfaceView.handleSurfaceviewCallback()（搜索关键词：`surfaceview_callback`、`ViewRootImpl`、`EventLogTags.writeSurfaceviewCallback`）。

#### `view_enqueue_input_event`（EventLog tag `62002`）

- 日志含义：View 记录输入事件入队。

- 日志字段：`eventType`：输入事件类型。 `action`：动作类型。

- 触发流程：ViewRootImpl / SurfaceView.enqueueInputEvent()（搜索关键词：`view_enqueue_input_event`、`ViewRootImpl`、`EventLogTags.writeViewEnqueueInputEvent`）。

### SurfaceFlinger

#### `sf_stop_bootanim`（EventLog tag `60110`）

- 日志含义：SurfaceFlinger 记录停止开机动画。

- 日志字段：`time`：时间戳。

- 触发流程：SurfaceFlinger::bootFinished()（搜索关键词：`sf_stop_bootanim`、`SurfaceFlinger`、`EventLogTags.writeSfStopBootanim`）。

### 输入系统

#### `input_interaction`（EventLog tag `62000`）

- 日志含义：InputManagerService 记录输入交互。

- 日志字段：`windows`：窗口数组。

- 触发流程：InputDispatcher::updateInteractionTokensLocked()（搜索关键词：`input_interaction`、`InputDispatcher`、`EventLogTags.writeInputInteraction`）。

#### `input_focus`（EventLog tag `62001`）

- 日志含义：InputManagerService 记录输入焦点变化。

- 日志字段：`window`：窗口名称。 `reason`：操作原因。

- 触发流程：InputDispatcher::setFocusedWindow()（搜索关键词：`input_focus`、`InputDispatcher`、`EventLogTags.writeInputFocus`）。

#### `input_cancel`（EventLog tag `62003`）

- 日志含义：InputDispatcher 取消指定窗口或连接的输入处理。

- 日志字段：`window`：窗口名称。 `reason`：操作原因。

- 触发流程：InputDispatcher::synthesizeCancelationEventsForConnectionLocked()（搜索关键词：`input_cancel`、`InputDispatcher`、`EventLogTags.writeInputCancel`）。

### 屏幕与电源键

#### `screen_toggled`（EventLog tag `70000`）

- 日志含义：PhoneWindowManager 记录屏幕状态切换。

- 日志字段：`screen_state`：屏幕状态。

- 触发流程：PhoneWindowManager.powerPress()（搜索关键词：`screen_toggled`、`PhoneWindowManager`、`EventLogTags.writeScreenToggled`）。

#### `intercept_power`（EventLog tag `70001`）

- 日志含义：PhoneWindowManager 记录电源键拦截。

- 日志字段：`action`：动作类型。 `mPowerKeyHandled`：电源键是否处理。 `mPowerKeyPressCounter`：电源键按下次数。

- 触发流程：PhoneWindowManager.interceptPowerKey()（搜索关键词：`intercept_power`、`PhoneWindowManager`、`EventLogTags.writeInterceptPower`）。

### 浏览器

#### `browser_zoom_level_change`（EventLog tag `70101`）

- 日志含义：浏览器组件记录浏览器缩放变化。

- 日志字段：`start level`：起始缩放级别。 `end level`：结束缩放级别。 `time`：时间戳。

- 触发流程：Legacy Browser/WebView（搜索关键词：`browser_zoom_level_change`、事件名全局搜索）。

#### `browser_double_tap_duration`（EventLog tag `70102`）

- 日志含义：浏览器组件记录浏览器双击手势。

- 日志字段：`duration`：持续时间。 `time`：时间戳。

- 触发流程：Legacy Browser/WebView（搜索关键词：`browser_double_tap_duration`、事件名全局搜索）。

#### `browser_snap_center`（EventLog tag `70150`）

- 日志含义：浏览器组件记录页面吸附居中。

- 日志字段：无（仅记录事件发生）。

- 触发流程：Legacy Browser/WebView（搜索关键词：`browser_snap_center`、事件名全局搜索）。

### Quick Search Box

#### `qsb_start`（EventLog tag `71001`）

- 日志含义：Quick Search Box 记录QSB 启动。

- 日志字段：`name`：名称。 `version`：版本号。 `start_method`：启动方式。 `latency`：延迟（毫秒）。 `search_source`：搜索来源。 `enabled_sources`：启用的搜索源。 `on_create_latency`：创建耗时。

- 触发流程：Legacy QuickSearchBox（搜索关键词：`qsb_start`、事件名全局搜索）。

#### `qsb_click`（EventLog tag `71002`）

- 日志含义：Quick Search Box 记录QSB 建议点击。

- 日志字段：`id`：通知 ID。 `suggestions`：建议信息。 `queried_sources`：查询数据源。 `num_chars`：字符数。 `click_type`：点击类型。

- 触发流程：Legacy QuickSearchBox（搜索关键词：`qsb_click`、事件名全局搜索）。

#### `qsb_search`（EventLog tag `71003`）

- 日志含义：Quick Search Box 记录QSB 搜索。

- 日志字段：`search_source`：搜索来源。 `method`：搜索方法。 `num_chars`：字符数。

- 触发流程：Legacy QuickSearchBox（搜索关键词：`qsb_search`、事件名全局搜索）。

#### `qsb_voice_search`（EventLog tag `71004`）

- 日志含义：Quick Search Box 记录QSB 语音搜索。

- 日志字段：`search_source`：搜索来源。

- 触发流程：Legacy QuickSearchBox（搜索关键词：`qsb_voice_search`、事件名全局搜索）。

#### `qsb_exit`（EventLog tag `71005`）

- 日志含义：Quick Search Box 记录QSB 退出。

- 日志字段：`suggestions`：建议信息。 `num_chars`：字符数。

- 触发流程：Legacy QuickSearchBox（搜索关键词：`qsb_exit`、事件名全局搜索）。

#### `qsb_latency`（EventLog tag `71006`）

- 日志含义：Quick Search Box 记录搜索请求延迟。

- 日志字段：`corpus`：搜索语料库。 `latency`：延迟（毫秒）。 `num_chars`：字符数。

- 触发流程：Legacy QuickSearchBox（搜索关键词：`qsb_latency`、事件名全局搜索）。

## Framework Core / Runtime

### 基础日志与调试

#### `answer`（EventLog tag `42`）

- 日志含义：记录由 EventLog 测试接口写入的示例事件（答案字符串）。
- 日志字段：
  - 定义：`42 answer (to life the universe etc|3)`
  - `to life the universe etc`：测试字符串。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeAnswer()；搜索关键词：`writeAnswer` 或 `answer`

#### `pi`（EventLog tag `314`）

- 日志含义：记录 EventLog 测试用的圆周率常量。
- 日志字段：
  - 定义：`314 pi`
  - 无参数。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writePi()；搜索关键词：`writePi` 或 `pi`

#### `auditd`（EventLog tag `1003`）

- 日志含义：auditd 上报一条 SELinux/内核审计 AVC 信息。
- 日志字段：
  - 定义：`1003 auditd (avc|3)`
  - `avc`：AVC 审计消息。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeAuditd()；搜索关键词：`writeAuditd` 或 `auditd`

#### `chatty`（EventLog tag `1004`）

- 日志含义：liblog 丢弃重复日志后记录被丢弃条数。
- 日志字段：
  - 定义：`1004 chatty (dropped|3)`
  - `dropped`：丢弃数量。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeChatty()；搜索关键词：`writeChatty` 或 `chatty`

#### `tag_def`（EventLog tag `1005`）

- 日志含义：EventLog 解析到一条标签定义。
- 日志字段：
  - 定义：`1005 tag_def (tag|1),(name|3),(format|3)`
  - `tag`：日志标签。
  - `name`：名称。
  - `format`：日志格式。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeTagDef()；搜索关键词：`writeTagDef` 或 `tag_def`

#### `liblog`（EventLog tag `1006`）

- 日志含义：liblog 输出缓冲区发生日志丢弃。
- 日志字段：
  - 定义：`1006 liblog (dropped|1)`
  - `dropped`：丢弃数量。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeLiblog()；搜索关键词：`writeLiblog` 或 `liblog`

#### `e`（EventLog tag `2718`）

- 日志含义：记录早期系统组件的通用事件。
- 日志字段：
  - 定义：`2718 e`
  - 无参数。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeE()；搜索关键词：`writeE` 或 `e`

### 系统基础设施与统计

#### `configuration_changed`（EventLog tag `2719`）

- 日志含义：系统配置发生变化并记录配置掩码。
- 日志字段：
  - 定义：`2719 configuration_changed (config mask|1|5)`
  - `config mask`：配置掩码。
- 触发流程：ActivityManagerService 相关方法 → EventLogTags.writeConfigurationChanged()；搜索关键词：`writeConfigurationChanged` 或 `configuration_changed`

#### `aggregation`（EventLog tag `70200`）

- 日志含义：统计聚合任务完成。
- 日志字段：
  - 定义：`70200 aggregation (aggregation time|2|3)`
  - `aggregation time`：聚合耗时。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeAggregation()；搜索关键词：`writeAggregation` 或 `aggregation`

#### `aggregation_test`（EventLog tag `70201`）

- 日志含义：统计聚合功能写入的测试事件。
- 日志字段：
  - 定义：`70201 aggregation_test (field1|1|2),(field2|1|2),(field3|1|2),(field4|1|2),(field5|1|2)`
  - `field1`：测试字段 1。
  - `field2`：测试字段 2。
  - `field3`：测试字段 3。
  - `field4`：测试字段 4。
  - `field5`：测试字段 5。
- 触发流程：Aggregation 测试方法 → EventLogTags.writeAggregationTest()；搜索关键词：`writeAggregationTest` 或 `aggregation_test`

#### `dsu_progress_update`（EventLog tag `120000`）

- 日志含义：动态系统更新（DSU）报告安装进度。
- 日志字段：
  - 定义：`120000 dsu_progress_update (partition_name|3),(installed_bytes|2|5),(total_bytes|2|5),(partition_number|1|5),(total_partition_number|1|5),(total_progress_percentage|1|5)`
  - `partition_name`：分区名。
  - `installed_bytes`：已安装字节数。
  - `total_bytes`：总字节数。
  - `partition_number`：当前分区序号。
  - `total_partition_number`：分区总数。
  - `total_progress_percentage`：总进度百分比。
- 触发流程：DynamicSystemService 相关方法 → EventLogTags.writeDsuProgressUpdate()；搜索关键词：`writeDsuProgressUpdate` 或 `dsu_progress_update`

#### `dsu_install_complete`（EventLog tag `120001`）

- 日志含义：DSU 安装完成。
- 日志字段：
  - 定义：`120001 dsu_install_complete`
  - 无参数。
- 触发流程：DynamicSystemService 相关方法 → EventLogTags.writeDsuInstallComplete()；搜索关键词：`writeDsuInstallComplete` 或 `dsu_install_complete`

#### `dsu_install_failed`（EventLog tag `120002`）

- 日志含义：DSU 安装失败。
- 日志字段：
  - 定义：`120002 dsu_install_failed (cause|3)`
  - `cause`：失败原因。
- 触发流程：DynamicSystemService 相关方法 → EventLogTags.writeDsuInstallFailed()；搜索关键词：`writeDsuInstallFailed` 或 `dsu_install_failed`

#### `dsu_install_insufficient_space`（EventLog tag `120003`）

- 日志含义：DSU 安装因空间不足失败。
- 日志字段：
  - 定义：`120003 dsu_install_insufficient_space`
  - 无参数。
- 触发流程：DynamicSystemService 相关方法 → EventLogTags.writeDsuInstallInsufficientSpace()；搜索关键词：`writeDsuInstallInsufficientSpace` 或 `dsu_install_insufficient_space`

#### `transaction_event`（EventLog tag `202901`）

- 日志含义：记录事务事件数据。
- 日志字段：
  - 定义：`202901 transaction_event (data|3)`
  - `data`：Stats 原始数据。
- 触发流程：Binder 相关方法 → EventLogTags.writeTransactionEvent()；搜索关键词：`writeTransactionEvent` 或 `transaction_event`

#### `metrics_heartbeat`（EventLog tag `208000`）

- 日志含义：Metrics 定期心跳。
- 日志字段：
  - 定义：`208000 metrics_heartbeat`
  - 无参数。
- 触发流程：Metrics 相关方法 → EventLogTags.writeMetricsHeartbeat()；搜索关键词：`writeMetricsHeartbeat` 或 `metrics_heartbeat`

#### `service_manager_stats`（EventLog tag `230000`）

- 日志含义：统计 ServiceManager Binder 调用次数和耗时。
- 日志字段：
  - 定义：`230000 service_manager_stats (call_count|1),(total_time|1|3),(duration|1|3)`
  - `call_count`：调用次数。
  - `total_time`：累计耗时。
  - `duration`：持续时间（毫秒）。
- 触发流程：ServiceManager 相关方法 → EventLogTags.writeServiceManagerStats()；搜索关键词：`writeServiceManagerStats` 或 `service_manager_stats`

#### `service_manager_slow`（EventLog tag `230001`）

- 日志含义：记录耗时过长的 ServiceManager 调用。
- 日志字段：
  - 定义：`230001 service_manager_slow (time|1|3),(service|3)`
  - `time`：时间或耗时（毫秒）。
  - `service`：服务名。
- 触发流程：ServiceManager 相关方法 → EventLogTags.writeServiceManagerSlow()；搜索关键词：`writeServiceManagerSlow` 或 `service_manager_slow`

#### `arc_system_event`（EventLog tag `300000`）

- 日志含义：ARC 系统事件。
- 日志字段：
  - 定义：`300000 arc_system_event (event|3)`
  - `event`：事件数据。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeArcSystemEvent()；搜索关键词：`writeArcSystemEvent` 或 `arc_system_event`

#### `commit_sys_config_file`（EventLog tag `525000`）

- 日志含义：系统配置文件提交完成。
- 日志字段：
  - 定义：`525000 commit_sys_config_file (name|3),(time|2|3)`
  - `name`：名称。
  - `time`：时间或耗时（毫秒）。
- 触发流程：SystemConfig 相关方法 → EventLogTags.writeCommitSysConfigFile()；搜索关键词：`writeCommitSysConfigFile` 或 `commit_sys_config_file`

#### `killinfo`（EventLog tag `10195355`）

- 日志含义：记录低内存杀进程的详细信息。
- 日志字段：
  - 定义：`10195355 killinfo (Pid|1|5),(Uid|1|5),(OomAdj|1),(MinOomAdj|1),(TaskSize|1),(enum kill_reasons|1|5),(MemFree|1),(Cached|1),(SwapCached|1),(Buffers|1),(Shmem|1),(Unevictable|1),(SwapTotal|1),(SwapFree|1),(ActiveAnon|1),(InactiveAnon|1),(ActiveFile|1),(InactiveFile|1),(SReclaimable|1),(SUnreclaim|1),(KernelStack|1),(PageTables|1),(IonHeap|1),(IonHeapPool|1),(CmaFree|1),(MsSinceEvent|1),(MsSincePrevWakeup|1),(WakeupsSinceEvent|1),(SkippedWakeups|1),(TaskSwapSize|1),(GPU|1),(Thrashing|1),(MaxThrashing|1),(PsiMemSome|5),(PsiMemFull|5),(PsiIoSome|5),(PsiIoFull|5),(PsiCpuSome|5)`
  - `Pid`：进程 ID。
  - `Uid`：用户 UID。
  - `OomAdj`：该事件上下文中的运行时值。
  - `MinOomAdj`：该事件上下文中的运行时值。
  - `TaskSize`：该事件上下文中的运行时值。
  - `enum kill_reasons`：该事件上下文中的运行时值。
  - `MemFree`：空闲内存。
  - `Cached`：缓存内存。
  - `SwapCached`：该事件上下文中的运行时值。
  - `Buffers`：缓冲区内存。
  - `Shmem`：该事件上下文中的运行时值。
  - `Unevictable`：该事件上下文中的运行时值。
  - `SwapTotal`：该事件上下文中的运行时值。
  - `SwapFree`：该事件上下文中的运行时值。
  - `ActiveAnon`：该事件上下文中的运行时值。
  - `InactiveAnon`：该事件上下文中的运行时值。
  - `ActiveFile`：该事件上下文中的运行时值。
  - `InactiveFile`：该事件上下文中的运行时值。
  - `SReclaimable`：可回收内核内存。
  - `SUnreclaim`：不可回收内核内存。
  - `KernelStack`：该事件上下文中的运行时值。
  - `PageTables`：页表内存。
  - `IonHeap`：该事件上下文中的运行时值。
  - `IonHeapPool`：该事件上下文中的运行时值。
  - `CmaFree`：该事件上下文中的运行时值。
  - `MsSinceEvent`：该事件上下文中的运行时值。
  - `MsSincePrevWakeup`：该事件上下文中的运行时值。
  - `WakeupsSinceEvent`：该事件上下文中的运行时值。
  - `SkippedWakeups`：该事件上下文中的运行时值。
  - `TaskSwapSize`：该事件上下文中的运行时值。
  - `GPU`：该事件上下文中的运行时值。
  - `Thrashing`：该事件上下文中的运行时值。
  - `MaxThrashing`：该事件上下文中的运行时值。
  - `PsiMemSome`：该事件上下文中的运行时值。
  - `PsiMemFull`：该事件上下文中的运行时值。
  - `PsiIoSome`：该事件上下文中的运行时值。
  - `PsiIoFull`：该事件上下文中的运行时值。
  - `PsiCpuSome`：该事件上下文中的运行时值。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeKillinfo()；搜索关键词：`writeKillinfo` 或 `killinfo`

#### `stats_log`（EventLog tag `1937006964`）

- 日志含义：StatsD 原子事件日志。
- 日志字段：
  - 定义：`1937006964 stats_log (atom_id|1|5),(data|4)`
  - `atom_id`：Stats atom ID。
  - `data`：Stats 原始数据。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeStatsLog()；搜索关键词：`writeStatsLog` 或 `stats_log`

### 其他

#### `sync`（EventLog tag `2720`）

- 日志含义：同步适配器产生同步状态事件。
- 日志字段：
  - 定义：`2720 sync (id|3),(event|1|5),(source|1|5),(account|1|5)`
  - `id`：同步事件 ID。
  - `event`：事件数据。
  - `source`：同步来源。
  - `account`：该事件上下文中的运行时值。
- 触发流程：SyncManager 相关方法 → EventLogTags.writeSync()；搜索关键词：`writeSync` 或 `sync`

#### `sync_details`（EventLog tag `203001`）

- 日志含义：记录一次同步操作的 authority、收发数据量及详细信息。
- 日志字段：
  - 定义：`203001 sync_details (authority|3),(send|1|2),(recv|1|2),(details|3)`
  - `authority`：同步 authority。
  - `send`：发送数据量。
  - `recv`：接收数据量。
  - `details`：同步详细信息。
- 触发流程：SyncManager/SyncOperation 相关方法 → EventLogTags.writeSyncDetails()；搜索关键词：`writeSyncDetails` 或 `sync_details`

#### `gms_unknown`（EventLog tag `70220`）

- 日志含义：记录未知 GMS 事件。
- 日志字段：
  - 定义：`70220 gms_unknown`
  - 无参数。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeGmsUnknown()；搜索关键词：`writeGmsUnknown` 或 `gms_unknown`

### 系统资源、电源与存储

#### `cpu`（EventLog tag `2721`）

- 日志含义：记录系统 CPU 总体及各模式时间。
- 日志字段：
  - 定义：`2721 cpu (total|1|6),(user|1|6),(system|1|6),(iowait|1|6),(irq|1|6),(softirq|1|6)`
  - `total`：总量。
  - `user`：用户态 CPU 时间（百分比/时钟 tick）。
  - `system`：内核态 CPU 时间。
  - `iowait`：I/O 等待时间。
  - `irq`：硬中断处理时间。
  - `softirq`：软中断处理时间。
- 触发流程：`com.android.server.am.AppProfiler` CPU 采样方法 → EventLogTags.writeCpu()；搜索关键词：`writeCpu` 或 `cpu`

#### `battery_level`（EventLog tag `2722`）

- 日志含义：电池电量、 电压和温度发生变化。
- 日志字段：
  - 定义：`2722 battery_level (level|1|6),(voltage|1|1),(temperature|1|1)`
  - `level`：电池剩余电量百分比。
  - `voltage`：电池电压。
  - `temperature`：温度值。
- 触发流程：`com.android.server.BatteryService` 电池状态更新方法 → EventLogTags.writeBatteryLevel()；搜索关键词：`writeBatteryLevel` 或 `battery_level`

#### `battery_status`（EventLog tag `2723`）

- 日志含义：电池状态（健康度、充电方式等）更新。
- 日志字段：
  - 定义：`2723 battery_status (status|1|5),(health|1|5),(present|1|5),(plugged|1|5),(technology|3)`
  - `status`：状态码。
  - `health`：电池健康状态。
  - `present`：是否检测到电池。
  - `plugged`：充电插入类型。
  - `technology`：电池技术类型。
- 触发流程：`com.android.server.BatteryService` 电池状态更新方法 → EventLogTags.writeBatteryStatus()；搜索关键词：`writeBatteryStatus` 或 `battery_status`

#### `power_sleep_requested`（EventLog tag `2724`）

- 日志含义：PowerManager 收到进入睡眠请求。
- 日志字段：
  - 定义：`2724 power_sleep_requested (wakeLocksCleared|1|1)`
  - `wakeLocksCleared`：是否清除唤醒锁。
- 触发流程：`com.android.server.power.PowerManagerService` 睡眠请求方法 → EventLogTags.writePowerSleepRequested()；搜索关键词：`writePowerSleepRequested` 或 `power_sleep_requested`

#### `power_screen_broadcast_send`（EventLog tag `2725`）

- 日志含义：发送屏幕状态广播。
- 日志字段：
  - 定义：`2725 power_screen_broadcast_send (wakelockCount|1|1)`
  - `wakelockCount`：唤醒锁数量。
- 触发流程：`com.android.server.power.Notifier` 屏幕广播发送方法 → EventLogTags.writePowerScreenBroadcastSend()；搜索关键词：`writePowerScreenBroadcastSend` 或 `power_screen_broadcast_send`

#### `power_screen_broadcast_done`（EventLog tag `2726`）

- 日志含义：屏幕状态广播处理完成。
- 日志字段：
  - 定义：`2726 power_screen_broadcast_done (on|1|5),(broadcastDuration|2|3),(wakelockCount|1|1)`
  - `on`：是否开启。
  - `broadcastDuration`：广播处理耗时。
  - `wakelockCount`：唤醒锁数量。
- 触发流程：`com.android.server.power.Notifier` 屏幕广播完成方法 → EventLogTags.writePowerScreenBroadcastDone()；搜索关键词：`writePowerScreenBroadcastDone` 或 `power_screen_broadcast_done`

#### `power_screen_broadcast_stop`（EventLog tag `2727`）

- 日志含义：停止屏幕状态广播。
- 日志字段：
  - 定义：`2727 power_screen_broadcast_stop (which|1|5),(wakelockCount|1|1)`
  - `which`：广播类型。
  - `wakelockCount`：唤醒锁数量。
- 触发流程：`com.android.server.power.Notifier` 屏幕广播停止方法 → EventLogTags.writePowerScreenBroadcastStop()；搜索关键词：`writePowerScreenBroadcastStop` 或 `power_screen_broadcast_stop`

#### `power_screen_state`（EventLog tag `2728`）

- 日志含义：屏幕亮灭状态变化及响应延迟。
- 日志字段：
  - 定义：`2728 power_screen_state (offOrOn|1|5),(becauseOfUser|1|5),(totalTouchDownTime|2|3),(touchCycles|1|1),(latency|1|3)`
  - `offOrOn`：屏幕关闭或开启状态。
  - `becauseOfUser`：是否由用户操作触发。
  - `totalTouchDownTime`：触摸按下总时长。
  - `touchCycles`：触摸周期数。
  - `latency`：延迟。
- 触发流程：`com.android.server.power.Notifier` 屏幕状态更新方法 → EventLogTags.writePowerScreenState()；搜索关键词：`writePowerScreenState` 或 `power_screen_state`

#### `power_partial_wake_state`（EventLog tag `2729`）

- 日志含义：部分唤醒锁被获取或释放。
- 日志字段：
  - 定义：`2729 power_partial_wake_state (releasedorAcquired|1|5),(tag|3)`
  - `releasedorAcquired`：唤醒锁释放或获取动作。
  - `tag`：日志标签。
- 触发流程：`com.android.server.power.Notifier` 唤醒锁状态方法 → EventLogTags.writePowerPartialWakeState()；搜索关键词：`writePowerPartialWakeState` 或 `power_partial_wake_state`

#### `battery_discharge`（EventLog tag `2730`）

- 日志含义：记录一次电池放电区间统计。
- 日志字段：
  - 定义：`2730 battery_discharge (duration|2|3),(minLevel|1|6),(maxLevel|1|6)`
  - `duration`：持续时间（毫秒）。
  - `minLevel`：该事件上下文中的运行时值。
  - `maxLevel`：该事件上下文中的运行时值。
- 触发流程：BatteryService/PowerManagerService 相关方法 → EventLogTags.writeBatteryDischarge()；搜索关键词：`writeBatteryDischarge` 或 `battery_discharge`

#### `power_soft_sleep_requested`（EventLog tag `2731`）

- 日志含义：请求进入软睡眠并保存唤醒时间。
- 日志字段：
  - 定义：`2731 power_soft_sleep_requested (savedwaketimems|2)`
  - `savedwaketimems`：保存的唤醒时间（毫秒）。
- 触发流程：`com.android.server.power.PowerManagerService` 软睡眠请求方法 → EventLogTags.writePowerSoftSleepRequested()；搜索关键词：`writePowerSoftSleepRequested` 或 `power_soft_sleep_requested`

#### `storaged_disk_stats`（EventLog tag `2732`）

- 日志含义：storaged 采集磁盘 I/O 统计。
- 日志字段：
  - 定义：`2732 storaged_disk_stats (type|3),(start_time|2|3),(end_time|2|3),(read_ios|2|1),(read_merges|2|1),(read_sectors|2|1),(read_ticks|2|3),(write_ios|2|1),(write_merges|2|1),(write_sectors|2|1),(write_ticks|2|3),(o_in_flight|2|1),(io_ticks|2|3),(io_in_queue|2|1)`
  - `type`：事件或设备类型。
  - `start_time`：统计起始时间。
  - `end_time`：统计结束时间。
  - `read_ios`：读 I/O 请求数。
  - `read_merges`：读合并次数。
  - `read_sectors`：读扇区数。
  - `read_ticks`：读耗时 tick。
  - `write_ios`：写 I/O 请求数。
  - `write_merges`：写合并次数。
  - `write_sectors`：写扇区数。
  - `write_ticks`：写耗时 tick。
  - `o_in_flight`：进行中的 I/O 数。
  - `io_ticks`：I/O 活跃 tick。
  - `io_in_queue`：I/O 排队 tick。
- 触发流程：StorageManagerService/Storaged 相关方法 → EventLogTags.writeStoragedDiskStats()；搜索关键词：`writeStoragedDiskStats` 或 `storaged_disk_stats`

#### `storaged_emmc_info`（EventLog tag `2733`）

- 日志含义：storaged 读取 eMMC 健康信息。
- 日志字段：
  - 定义：`2733 storaged_emmc_info (mmc_ver|3),(eol|1),(lifetime_a|1),(lifetime_b|1)`
  - `mmc_ver`：eMMC 版本。
  - `eol`：寿命终止指标。
  - `lifetime_a`：寿命指标 A。
  - `lifetime_b`：寿命指标 B。
- 触发流程：StorageManagerService/Storaged 相关方法 → EventLogTags.writeStoragedEmmcInfo()；搜索关键词：`writeStoragedEmmcInfo` 或 `storaged_emmc_info`

#### `thermal_changed`（EventLog tag `2737`）

- 日志含义：热传感器温度或系统热状态变化。
- 日志字段：
  - 定义：`2737 thermal_changed (name|3),(type|1|5),(temperature|5),(sensor_status|1|5),(previous_system_status|1|5)`
  - `name`：名称。
  - `type`：事件或设备类型。
  - `temperature`：温度值。
  - `sensor_status`：传感器状态。
  - `previous_system_status`：之前系统热状态。
- 触发流程：ThermalManagerService 相关方法 → EventLogTags.writeThermalChanged()；搜索关键词：`writeThermalChanged` 或 `thermal_changed`

#### `battery_saver_mode`（EventLog tag `2739`）

- 日志含义：电池省电模式状态发生变化。
- 日志字段：
  - 定义：`2739 battery_saver_mode (fullPrevOffOrOn|1|5),(adaptivePrevOffOrOn|1|5),(fullNowOffOrOn|1|5),(adaptiveNowOffOrOn|1|5),(interactive|1|5),(features|3|5),(reason|1|5)`
  - `fullPrevOffOrOn`：全量省电模式之前状态。
  - `adaptivePrevOffOrOn`：自适应省电之前状态。
  - `fullNowOffOrOn`：全量省电模式当前状态。
  - `adaptiveNowOffOrOn`：自适应省电当前状态。
  - `interactive`：设备是否交互。
  - `features`：省电功能列表。
  - `reason`：触发原因。
- 触发流程：`com.android.server.power.batterysaver.BatterySaverController` 模式更新方法 → EventLogTags.writeBatterySaverMode()；搜索关键词：`writeBatterySaverMode` 或 `battery_saver_mode`

#### `location_controller`（EventLog tag `2740`）

- 日志含义：位置控制器状态事件。
- 日志字段：
  - 定义：`2740 location_controller`
  - 无参数。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeLocationController()；搜索关键词：`writeLocationController` 或 `location_controller`

#### `force_gc`（EventLog tag `2741`）

- 日志含义：系统因指定原因触发垃圾回收。
- 日志字段：
  - 定义：`2741 force_gc (reason|3)`
  - `reason`：触发原因。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeForceGc()；搜索关键词：`writeForceGc` 或 `force_gc`

#### `tickle`（EventLog tag `2742`）

- 日志含义：向指定 authority 发送 tickle 请求。
- 日志字段：
  - 定义：`2742 tickle (authority|3)`
  - `authority`：同步 authority。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeTickle()；搜索关键词：`writeTickle` 或 `tickle`

#### `contacts_aggregation`（EventLog tag `2747`）

- 日志含义：联系人聚合任务完成并记录耗时和数量。
- 日志字段：
  - 定义：`2747 contacts_aggregation (aggregation time|2|3), (count|1|1)`
  - `aggregation time`：聚合耗时。
  - `count`：计数。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeContactsAggregation()；搜索关键词：`writeContactsAggregation` 或 `contacts_aggregation`

#### `cache_file_deleted`（EventLog tag `2748`）

- 日志含义：删除缓存文件并记录路径。
- 日志字段：
  - 定义：`2748 cache_file_deleted (path|3)`
  - `path`：文件路径。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeCacheFileDeleted()；搜索关键词：`writeCacheFileDeleted` 或 `cache_file_deleted`

#### `storage_state`（EventLog tag `2749`）

- 日志含义：存储卷状态发生变化。
- 日志字段：
  - 定义：`2749 storage_state (uuid|3),(old_state|1),(new_state|1),(usable|2),(total|2)`
  - `uuid`：存储卷 UUID。
  - `old_state`：旧状态。
  - `new_state`：新状态。
  - `usable`：可用空间。
  - `total`：总量。
- 触发流程：StorageManagerService/Storaged 相关方法 → EventLogTags.writeStorageState()；搜索关键词：`writeStorageState` 或 `storage_state`

#### `fstrim_start`（EventLog tag `2755`）

- 日志含义：开始执行 fstrim 磁盘整理。
- 日志字段：
  - 定义：`2755 fstrim_start (time|2|3)`
  - `time`：时间或耗时（毫秒）。
- 触发流程：StorageManagerService/Storaged 相关方法 → EventLogTags.writeFstrimStart()；搜索关键词：`writeFstrimStart` 或 `fstrim_start`

#### `fstrim_finish`（EventLog tag `2756`）

- 日志含义：fstrim 磁盘整理完成。
- 日志字段：
  - 定义：`2756 fstrim_finish (time|2|3)`
  - `time`：时间或耗时（毫秒）。
- 触发流程：StorageManagerService/Storaged 相关方法 → EventLogTags.writeFstrimFinish()；搜索关键词：`writeFstrimFinish` 或 `fstrim_finish`

#### `contacts_upgrade_receiver`（EventLog tag `4100`）

- 日志含义：联系人升级接收器处理完成。
- 日志字段：
  - 定义：`4100 contacts_upgrade_receiver (time|2|3)`
  - `time`：时间或耗时（毫秒）。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeContactsUpgradeReceiver()；搜索关键词：`writeContactsUpgradeReceiver` 或 `contacts_upgrade_receiver`

#### `battery_saving_stats`（EventLog tag `27390`）

- 日志含义：记录省电模式期间的电池节省统计。
- 日志字段：
  - 定义：`27390 battery_saving_stats (batterySaver|1|5),(interactive|1|5),(doze|1|5),(delta_duration|2|3),(delta_battery_drain|1|1),(delta_battery_drain_percent|1|6),(total_duration|2|3),(total_battery_drain|1|1),(total_battery_drain_percent|1|6)`
  - `batterySaver`：该事件上下文中的运行时值。
  - `interactive`：设备是否交互。
  - `doze`：该事件上下文中的运行时值。
  - `delta_duration`：该事件上下文中的运行时值。
  - `delta_battery_drain`：该事件上下文中的运行时值。
  - `delta_battery_drain_percent`：该事件上下文中的运行时值。
  - `total_duration`：该事件上下文中的运行时值。
  - `total_battery_drain`：该事件上下文中的运行时值。
  - `total_battery_drain_percent`：该事件上下文中的运行时值。
- 触发流程：BatteryService/PowerManagerService 相关方法 → EventLogTags.writeBatterySavingStats()；搜索关键词：`writeBatterySavingStats` 或 `battery_saving_stats`

#### `battery_saver_setting`（EventLog tag `27392`）

- 日志含义：电池省电阈值设置变化。
- 日志字段：
  - 定义：`27392 battery_saver_setting (threshold|1)`
  - `threshold`：省电阈值。
- 触发流程：BatteryService/PowerManagerService 相关方法 → EventLogTags.writeBatterySaverSetting()；搜索关键词：`writeBatterySaverSetting` 或 `battery_saver_setting`

### Watchdog 与系统救援

#### `watchdog`（EventLog tag `2802`）

- 日志含义：Watchdog 记录被监控的系统服务。
- 日志字段：
  - 定义：`2802 watchdog (Service|3)`
  - `Service`：服务名。
- 触发流程：Watchdog 相关方法 → EventLogTags.writeWatchdog()；搜索关键词：`writeWatchdog` 或 `watchdog`

#### `watchdog_proc_pss`（EventLog tag `2803`）

- 日志含义：Watchdog 采集进程 PSS。
- 日志字段：
  - 定义：`2803 watchdog_proc_pss (Process|3),(Pid|1|5),(Pss|1|2)`
  - `Process`：进程名。
  - `Pid`：进程 ID。
  - `Pss`：PSS 内存。
- 触发流程：Watchdog 相关方法 → EventLogTags.writeWatchdogProcPss()；搜索关键词：`writeWatchdogProcPss` 或 `watchdog_proc_pss`

#### `watchdog_soft_reset`（EventLog tag `2804`）

- 日志含义：Watchdog 执行软复位前记录进程内存。
- 日志字段：
  - 定义：`2804 watchdog_soft_reset (Process|3),(Pid|1|5),(MaxPss|1|2),(Pss|1|2),(Skip|3)`
  - `Process`：进程名。
  - `Pid`：进程 ID。
  - `MaxPss`：最大 PSS。
  - `Pss`：PSS 内存。
  - `Skip`：是否跳过。
- 触发流程：Watchdog 相关方法 → EventLogTags.writeWatchdogSoftReset()；搜索关键词：`writeWatchdogSoftReset` 或 `watchdog_soft_reset`

#### `watchdog_hard_reset`（EventLog tag `2805`）

- 日志含义：Watchdog 因内存问题执行硬复位。
- 日志字段：
  - 定义：`2805 watchdog_hard_reset (Process|3),(Pid|1|5),(MaxPss|1|2),(Pss|1|2)`
  - `Process`：进程名。
  - `Pid`：进程 ID。
  - `MaxPss`：最大 PSS。
  - `Pss`：PSS 内存。
- 触发流程：Watchdog 相关方法 → EventLogTags.writeWatchdogHardReset()；搜索关键词：`writeWatchdogHardReset` 或 `watchdog_hard_reset`

#### `watchdog_pss_stats`（EventLog tag `2806`）

- 日志含义：记录各进程组 PSS 汇总。
- 日志字段：
  - 定义：`2806 watchdog_pss_stats (EmptyPss|1|2),(EmptyCount|1|1),(BackgroundPss|1|2),(BackgroundCount|1|1),(ServicePss|1|2),(ServiceCount|1|1),(VisiblePss|1|2),(VisibleCount|1|1),(ForegroundPss|1|2),(ForegroundCount|1|1),(NoPssCount|1|1)`
  - `EmptyPss`：空进程 PSS。
  - `EmptyCount`：空进程数。
  - `BackgroundPss`：后台进程 PSS。
  - `BackgroundCount`：后台进程数。
  - `ServicePss`：服务进程 PSS。
  - `ServiceCount`：服务进程数。
  - `VisiblePss`：可见进程 PSS。
  - `VisibleCount`：可见进程数。
  - `ForegroundPss`：前台进程 PSS。
  - `ForegroundCount`：前台进程数。
  - `NoPssCount`：未采集 PSS 的进程数。
- 触发流程：Watchdog 相关方法 → EventLogTags.writeWatchdogPssStats()；搜索关键词：`writeWatchdogPssStats` 或 `watchdog_pss_stats`

#### `watchdog_proc_stats`（EventLog tag `2807`）

- 日志含义：记录进程在多个时间窗口内的死亡次数。
- 日志字段：
  - 定义：`2807 watchdog_proc_stats (DeathsInOne|1|1),(DeathsInTwo|1|1),(DeathsInThree|1|1),(DeathsInFour|1|1),(DeathsInFive|1|1)`
  - `DeathsInOne`：1 分钟内死亡数。
  - `DeathsInTwo`：2 分钟内死亡数。
  - `DeathsInThree`：3 分钟内死亡数。
  - `DeathsInFour`：4 分钟内死亡数。
  - `DeathsInFive`：5 分钟内死亡数。
- 触发流程：Watchdog 相关方法 → EventLogTags.writeWatchdogProcStats()；搜索关键词：`writeWatchdogProcStats` 或 `watchdog_proc_stats`

#### `watchdog_scheduled_reboot`（EventLog tag `2808`）

- 日志含义：记录计划重启参数。
- 日志字段：
  - 定义：`2808 watchdog_scheduled_reboot (Now|2|1),(Interval|1|3),(StartTime|1|3),(Window|1|3),(Skip|3)`
  - `Now`：当前时间。
  - `Interval`：重启间隔。
  - `StartTime`：计划开始时间。
  - `Window`：时间窗口。
  - `Skip`：是否跳过。
- 触发流程：Watchdog 相关方法 → EventLogTags.writeWatchdogScheduledReboot()；搜索关键词：`writeWatchdogScheduledReboot` 或 `watchdog_scheduled_reboot`

#### `watchdog_meminfo`（EventLog tag `2809`）

- 日志含义：记录 Watchdog 采集的内存信息。
- 日志字段：
  - 定义：`2809 watchdog_meminfo (MemFree|1|2),(Buffers|1|2),(Cached|1|2),(Active|1|2),(Inactive|1|2),(AnonPages|1|2),(Mapped|1|2),(Slab|1|2),(SReclaimable|1|2),(SUnreclaim|1|2),(PageTables|1|2)`
  - `MemFree`：空闲内存。
  - `Buffers`：缓冲区内存。
  - `Cached`：缓存内存。
  - `Active`：活跃内存。
  - `Inactive`：非活跃内存。
  - `AnonPages`：匿名页。
  - `Mapped`：映射内存。
  - `Slab`：Slab 内存。
  - `SReclaimable`：可回收内核内存。
  - `SUnreclaim`：不可回收内核内存。
  - `PageTables`：页表内存。
- 触发流程：Watchdog 相关方法 → EventLogTags.writeWatchdogMeminfo()；搜索关键词：`writeWatchdogMeminfo` 或 `watchdog_meminfo`

#### `watchdog_vmstat`（EventLog tag `2810`）

- 日志含义：记录 Watchdog 采集的虚拟内存统计。
- 日志字段：
  - 定义：`2810 watchdog_vmstat (runtime|2|3),(pgfree|1|1),(pgactivate|1|1),(pgdeactivate|1|1),(pgfault|1|1),(pgmajfault|1|1)`
  - `runtime`：运行时间。
  - `pgfree`：释放页数。
  - `pgactivate`：激活页数。
  - `pgdeactivate`：停用页数。
  - `pgfault`：缺页次数。
  - `pgmajfault`：重大缺页次数。
- 触发流程：Watchdog 相关方法 → EventLogTags.writeWatchdogVmstat()；搜索关键词：`writeWatchdogVmstat` 或 `watchdog_vmstat`

#### `watchdog_requested_reboot`（EventLog tag `2811`）

- 日志含义：记录 Watchdog 请求的重启计划。
- 日志字段：
  - 定义：`2811 watchdog_requested_reboot (NoWait|1|1),(ScheduleInterval|1|3),(RecheckInterval|1|3),(StartTime|1|3),(Window|1|3),(MinScreenOff|1|3),(MinNextAlarm|1|3)`
  - `NoWait`：是否等待。
  - `ScheduleInterval`：计划重启间隔。
  - `RecheckInterval`：重新检查间隔。
  - `StartTime`：计划开始时间。
  - `Window`：时间窗口。
  - `MinScreenOff`：最短灭屏时间。
  - `MinNextAlarm`：最近闹钟最短间隔。
- 触发流程：Watchdog 相关方法 → EventLogTags.writeWatchdogRequestedReboot()；搜索关键词：`writeWatchdogRequestedReboot` 或 `watchdog_requested_reboot`

#### `rescue_note`（EventLog tag `2900`）

- 日志含义：记录 RescueParty 救援事件计数。
- 日志字段：
  - 定义：`2900 rescue_note (uid|1),(count|1),(window|2)`
  - `uid`：UID。
  - `count`：计数。
  - `window`：时间窗口。
- 触发流程：RescueParty 相关方法 → EventLogTags.writeRescueNote()；搜索关键词：`writeRescueNote` 或 `rescue_note`

#### `rescue_level`（EventLog tag `2901`）

- 日志含义：RescueParty 救援等级发生变化。
- 日志字段：
  - 定义：`2901 rescue_level (level|1),(trigger_uid|1)`
  - `level`：电量或救援等级。
  - `trigger_uid`：触发 UID。
- 触发流程：RescueParty 相关方法 → EventLogTags.writeRescueLevel()；搜索关键词：`writeRescueLevel` 或 `rescue_level`

#### `rescue_success`（EventLog tag `2902`）

- 日志含义：RescueParty 救援操作成功。
- 日志字段：
  - 定义：`2902 rescue_success (level|1)`
  - `level`：电量或救援等级。
- 触发流程：RescueParty 相关方法 → EventLogTags.writeRescueSuccess()；搜索关键词：`writeRescueSuccess` 或 `rescue_success`

#### `rescue_failure`（EventLog tag `2903`）

- 日志含义：RescueParty 救援操作失败。
- 日志字段：
  - 定义：`2903 rescue_failure (level|1),(msg|3)`
  - `level`：电量或救援等级。
  - `msg`：错误消息。
- 触发流程：RescueParty 相关方法 → EventLogTags.writeRescueFailure()；搜索关键词：`writeRescueFailure` 或 `rescue_failure`

### 备份与恢复

#### `backup_data_changed`（EventLog tag `2820`）

- 日志含义：备份数据发生变化，标记需要备份。
- 日志字段：
  - 定义：`2820 backup_data_changed (Package|3)`
  - `Package`：包名。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupDataChanged()；搜索关键词：`writeBackupDataChanged` 或 `backup_data_changed`

#### `backup_start`（EventLog tag `2821`）

- 日志含义：开始执行 Key/Value 备份。
- 日志字段：
  - 定义：`2821 backup_start (Transport|3)`
  - `Transport`：备份传输组件。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupStart()；搜索关键词：`writeBackupStart` 或 `backup_start`

#### `backup_transport_failure`（EventLog tag `2822`）

- 日志含义：备份传输组件失败。
- 日志字段：
  - 定义：`2822 backup_transport_failure (Package|3)`
  - `Package`：包名。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupTransportFailure()；搜索关键词：`writeBackupTransportFailure` 或 `backup_transport_failure`

#### `backup_agent_failure`（EventLog tag `2823`）

- 日志含义：备份代理执行失败。
- 日志字段：
  - 定义：`2823 backup_agent_failure (Package|3),(Message|3)`
  - `Package`：包名。
  - `Message`：错误或附加消息。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupAgentFailure()；搜索关键词：`writeBackupAgentFailure` 或 `backup_agent_failure`

#### `backup_package`（EventLog tag `2824`）

- 日志含义：备份单个包及其数据大小。
- 日志字段：
  - 定义：`2824 backup_package (Package|3),(Size|1|2)`
  - `Package`：包名。
  - `Size`：数据大小。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupPackage()；搜索关键词：`writeBackupPackage` 或 `backup_package`

#### `backup_success`（EventLog tag `2825`）

- 日志含义：Key/Value 备份成功。
- 日志字段：
  - 定义：`2825 backup_success (Packages|1|1),(Time|1|3)`
  - `Packages`：包数量。
  - `Time`：时间或耗时（毫秒）。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupSuccess()；搜索关键词：`writeBackupSuccess` 或 `backup_success`

#### `backup_reset`（EventLog tag `2826`）

- 日志含义：重置备份传输状态。
- 日志字段：
  - 定义：`2826 backup_reset (Transport|3)`
  - `Transport`：备份传输组件。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupReset()；搜索关键词：`writeBackupReset` 或 `backup_reset`

#### `backup_initialize`（EventLog tag `2827`）

- 日志含义：初始化备份管理服务。
- 日志字段：
  - 定义：`2827 backup_initialize`
  - 无参数。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupInitialize()；搜索关键词：`writeBackupInitialize` 或 `backup_initialize`

#### `backup_requested`（EventLog tag `2828`）

- 日志含义：收到备份请求并记录类型及数量。
- 日志字段：
  - 定义：`2828 backup_requested (Total|1|1),(Key-Value|1|1),(Full|1|1)`
  - `Total`：该事件上下文中的运行时值。
  - `Key-Value`：该事件上下文中的运行时值。
  - `Full`：该事件上下文中的运行时值。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupRequested()；搜索关键词：`writeBackupRequested` 或 `backup_requested`

#### `backup_quota_exceeded`（EventLog tag `2829`）

- 日志含义：包备份数据超过配额。
- 日志字段：
  - 定义：`2829 backup_quota_exceeded (Package|3)`
  - `Package`：包名。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupQuotaExceeded()；搜索关键词：`writeBackupQuotaExceeded` 或 `backup_quota_exceeded`

#### `restore_start`（EventLog tag `2830`）

- 日志含义：开始执行恢复操作。
- 日志字段：
  - 定义：`2830 restore_start (Transport|3),(Source|2|5)`
  - `Transport`：备份传输组件。
  - `Source`：恢复源或来源标识。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeRestoreStart()；搜索关键词：`writeRestoreStart` 或 `restore_start`

#### `restore_transport_failure`（EventLog tag `2831`）

- 日志含义：恢复传输组件失败。
- 日志字段：
  - 定义：`2831 restore_transport_failure`
  - 无参数。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeRestoreTransportFailure()；搜索关键词：`writeRestoreTransportFailure` 或 `restore_transport_failure`

#### `restore_agent_failure`（EventLog tag `2832`）

- 日志含义：恢复代理执行失败。
- 日志字段：
  - 定义：`2832 restore_agent_failure (Package|3),(Message|3)`
  - `Package`：包名。
  - `Message`：错误或附加消息。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeRestoreAgentFailure()；搜索关键词：`writeRestoreAgentFailure` 或 `restore_agent_failure`

#### `restore_package`（EventLog tag `2833`）

- 日志含义：恢复单个包及其数据大小。
- 日志字段：
  - 定义：`2833 restore_package (Package|3),(Size|1|2)`
  - `Package`：包名。
  - `Size`：数据大小。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeRestorePackage()；搜索关键词：`writeRestorePackage` 或 `restore_package`

#### `restore_success`（EventLog tag `2834`）

- 日志含义：恢复操作成功。
- 日志字段：
  - 定义：`2834 restore_success (Packages|1|1),(Time|1|3)`
  - `Packages`：包数量。
  - `Time`：时间或耗时（毫秒）。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeRestoreSuccess()；搜索关键词：`writeRestoreSuccess` 或 `restore_success`

#### `full_backup_package`（EventLog tag `2840`）

- 日志含义：全量备份单个包。
- 日志字段：
  - 定义：`2840 full_backup_package (Package|3)`
  - `Package`：包名。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeFullBackupPackage()；搜索关键词：`writeFullBackupPackage` 或 `full_backup_package`

#### `full_backup_agent_failure`（EventLog tag `2841`）

- 日志含义：全量备份代理失败。
- 日志字段：
  - 定义：`2841 full_backup_agent_failure (Package|3),(Message|3)`
  - `Package`：包名。
  - `Message`：错误或附加消息。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeFullBackupAgentFailure()；搜索关键词：`writeFullBackupAgentFailure` 或 `full_backup_agent_failure`

#### `full_backup_transport_failure`（EventLog tag `2842`）

- 日志含义：全量备份传输失败。
- 日志字段：
  - 定义：`2842 full_backup_transport_failure`
  - 无参数。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeFullBackupTransportFailure()；搜索关键词：`writeFullBackupTransportFailure` 或 `full_backup_transport_failure`

#### `full_backup_success`（EventLog tag `2843`）

- 日志含义：全量备份成功。
- 日志字段：
  - 定义：`2843 full_backup_success (Package|3)`
  - `Package`：包名。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeFullBackupSuccess()；搜索关键词：`writeFullBackupSuccess` 或 `full_backup_success`

#### `full_restore_package`（EventLog tag `2844`）

- 日志含义：全量恢复单个包。
- 日志字段：
  - 定义：`2844 full_restore_package (Package|3)`
  - `Package`：包名。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeFullRestorePackage()；搜索关键词：`writeFullRestorePackage` 或 `full_restore_package`

#### `full_backup_quota_exceeded`（EventLog tag `2845`）

- 日志含义：全量备份超过配额。
- 日志字段：
  - 定义：`2845 full_backup_quota_exceeded (Package|3)`
  - `Package`：包名。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeFullBackupQuotaExceeded()；搜索关键词：`writeFullBackupQuotaExceeded` 或 `full_backup_quota_exceeded`

#### `full_backup_cancelled`（EventLog tag `2846`）

- 日志含义：全量备份被取消。
- 日志字段：
  - 定义：`2846 full_backup_cancelled (Package|3),(Message|3)`
  - `Package`：包名。
  - `Message`：错误或附加消息。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeFullBackupCancelled()；搜索关键词：`writeFullBackupCancelled` 或 `full_backup_cancelled`

#### `backup_transport_lifecycle`（EventLog tag `2850`）

- 日志含义：备份传输连接生命周期发生变化。
- 日志字段：
  - 定义：`2850 backup_transport_lifecycle (Transport|3),(Bound|1|1)`
  - `Transport`：备份传输组件。
  - `Bound`：是否已绑定。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupTransportLifecycle()；搜索关键词：`writeBackupTransportLifecycle` 或 `backup_transport_lifecycle`

#### `backup_transport_connection`（EventLog tag `2851`）

- 日志含义：备份传输连接状态变化。
- 日志字段：
  - 定义：`2851 backup_transport_connection (Transport|3),(Connected|1|1)`
  - `Transport`：备份传输组件。
  - `Connected`：是否已连接。
- 触发流程：BackupManagerService 相关方法 → EventLogTags.writeBackupTransportConnection()；搜索关键词：`writeBackupTransportConnection` 或 `backup_transport_connection`

### 运行时与系统服务

#### `unknown_sources_enabled`（EventLog tag `3110`）

- 日志含义：未知来源安装开关发生变化。
- 日志字段：
  - 定义：`3110 unknown_sources_enabled (value|1)`
  - `value`：开关值。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeUnknownSourcesEnabled()；搜索关键词：`writeUnknownSourcesEnabled` 或 `unknown_sources_enabled`

#### `calendar_upgrade_receiver`（EventLog tag `4000`）

- 日志含义：日历升级接收器处理完成。
- 日志字段：
  - 定义：`4000 calendar_upgrade_receiver (time|2|3)`
  - `time`：时间或耗时（毫秒）。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeCalendarUpgradeReceiver()；搜索关键词：`writeCalendarUpgradeReceiver` 或 `calendar_upgrade_receiver`

#### `job_deferred_execution`（EventLog tag `8000`）

- 日志含义：JobScheduler 延迟作业执行。
- 日志字段：
  - 定义：`8000 job_deferred_execution (time|2|3)`
  - `time`：时间或耗时（毫秒）。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeJobDeferredExecution()；搜索关键词：`writeJobDeferredExecution` 或 `job_deferred_execution`

#### `dvm_lock_sample`（EventLog tag `20003`）

- 日志含义：Dalvik/ART 采集到锁竞争样本。
- 日志字段：
  - 定义：`20003 dvm_lock_sample (process|3),(main|1|5),(thread|3),(time|1|3),(file|3),(line|1|5),(ownerfile|3),(ownerline|1|5),(sample_percent|1|6)`
  - `process`：进程名。
  - `main`：是否主线程。
  - `thread`：线程名。
  - `time`：时间或耗时（毫秒）。
  - `file`：文件名。
  - `line`：代码行号。
  - `ownerfile`：锁持有者文件。
  - `ownerline`：锁持有者行号。
  - `sample_percent`：采样百分比。
- 触发流程：ART runtime 相关方法 → EventLogTags.writeDvmLockSample()；搜索关键词：`writeDvmLockSample` 或 `dvm_lock_sample`

#### `art_hidden_api_access`（EventLog tag `20004`）

- 日志含义：应用访问隐藏 API 被记录。
- 日志字段：
  - 定义：`20004 art_hidden_api_access (access_method|1),(flags|1),(class|3),(member|3),(type_signature|3)`
  - `access_method`：访问方式。
  - `flags`：访问标志。
  - `class`：类名。
  - `member`：成员名。
  - `type_signature`：类型签名。
- 触发流程：ART runtime 相关方法 → EventLogTags.writeArtHiddenApiAccess()；搜索关键词：`writeArtHiddenApiAccess` 或 `art_hidden_api_access`

#### `user_activity_timeout_override`（EventLog tag `27391`）

- 日志含义：用户活动超时覆盖值发生变化。
- 日志字段：
  - 定义：`27391 user_activity_timeout_override (override|2|3)`
  - `override`：超时覆盖值。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeUserActivityTimeoutOverride()；搜索关键词：`writeUserActivityTimeoutOverride` 或 `user_activity_timeout_override`

### 安装、配置与维护

#### `installer_clear_app_data_caller`（EventLog tag `39000`）

- 日志含义：Installer 收到清除应用数据调用。
- 日志字段：
  - 定义：`39000 installer_clear_app_data_caller (pid|1),(uid|1),(package|3),(flags|1)`
  - `pid`：进程 ID。
  - `uid`：UID。
  - `package`：包名。
  - `flags`：访问标志。
- 触发流程：Installer 相关方法 → EventLogTags.writeInstallerClearAppDataCaller()；搜索关键词：`writeInstallerClearAppDataCaller` 或 `installer_clear_app_data_caller`

#### `installer_clear_app_data_call_stack`（EventLog tag `39001`）

- 日志含义：记录清除应用数据调用栈信息。
- 日志字段：
  - 定义：`39001 installer_clear_app_data_call_stack (method|3),(class|3),(file|3),(line|1)`
  - `method`：方法名。
  - `class`：类名。
  - `file`：文件名。
  - `line`：代码行号。
- 触发流程：Installer 相关方法 → EventLogTags.writeInstallerClearAppDataCallStack()；搜索关键词：`writeInstallerClearAppDataCallStack` 或 `installer_clear_app_data_call_stack`

#### `config_install_failed`（EventLog tag `51300`）

- 日志含义：配置安装失败。
- 日志字段：
  - 定义：`51300 config_install_failed (dir|3)`
  - `dir`：配置目录。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeConfigInstallFailed()；搜索关键词：`writeConfigInstallFailed` 或 `config_install_failed`

#### `ifw_intent_matched`（EventLog tag `51400`）

- 日志含义：Intent Firewall 匹配到一条 Intent。
- 日志字段：
  - 定义：`51400 ifw_intent_matched (Intent Type|1|5),(Component Name|3),(Caller Uid|1|5),(Caller Pkg Count|1|1),(Caller Pkgs|3),(Action|3),(MIME Type|3),(URI|3),(Flags|1|5)`
  - `Intent Type`：Intent 类型。
  - `Component Name`：组件名。
  - `Caller Uid`：调用方 UID。
  - `Caller Pkg Count`：调用方包数量。
  - `Caller Pkgs`：调用方包列表。
  - `Action`：Intent action。
  - `MIME Type`：MIME 类型。
  - `URI`：数据 URI。
  - `Flags`：Intent 标志。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeIfwIntentMatched()；搜索关键词：`writeIfwIntentMatched` 或 `ifw_intent_matched`

#### `idle_maintenance_window_start`（EventLog tag `51500`）

- 日志含义：进入设备空闲维护窗口。
- 日志字段：
  - 定义：`51500 idle_maintenance_window_start (time|2|3), (lastUserActivity|2|3), (batteryLevel|1|6), (batteryCharging|1|5)`
  - `time`：时间或耗时（毫秒）。
  - `lastUserActivity`：最近用户活动时间。
  - `batteryLevel`：电量百分比。
  - `batteryCharging`：是否充电。
- 触发流程：DeviceIdleController 相关方法 → EventLogTags.writeIdleMaintenanceWindowStart()；搜索关键词：`writeIdleMaintenanceWindowStart` 或 `idle_maintenance_window_start`

#### `idle_maintenance_window_finish`（EventLog tag `51501`）

- 日志含义：完成设备空闲维护窗口。
- 日志字段：
  - 定义：`51501 idle_maintenance_window_finish (time|2|3), (lastUserActivity|2|3), (batteryLevel|1|6), (batteryCharging|1|5)`
  - `time`：时间或耗时（毫秒）。
  - `lastUserActivity`：最近用户活动时间。
  - `batteryLevel`：电量百分比。
  - `batteryCharging`：是否充电。
- 触发流程：DeviceIdleController 相关方法 → EventLogTags.writeIdleMaintenanceWindowFinish()；搜索关键词：`writeIdleMaintenanceWindowFinish` 或 `idle_maintenance_window_finish`

#### `timezone_trigger_check`（EventLog tag `51600`）

- 日志含义：时区检测器触发检查。
- 日志字段：
  - 定义：`51600 timezone_trigger_check (token|3)`
  - `token`：请求令牌。
- 触发流程：TimeZoneDetectorService 相关方法 → EventLogTags.writeTimezoneTriggerCheck()；搜索关键词：`writeTimezoneTriggerCheck` 或 `timezone_trigger_check`

#### `timezone_request_install`（EventLog tag `51610`）

- 日志含义：请求安装时区数据。
- 日志字段：
  - 定义：`51610 timezone_request_install (token|3)`
  - `token`：请求令牌。
- 触发流程：TimeZoneDetectorService 相关方法 → EventLogTags.writeTimezoneRequestInstall()；搜索关键词：`writeTimezoneRequestInstall` 或 `timezone_request_install`

#### `timezone_install_started`（EventLog tag `51611`）

- 日志含义：开始安装时区数据。
- 日志字段：
  - 定义：`51611 timezone_install_started (token|3)`
  - `token`：请求令牌。
- 触发流程：TimeZoneDetectorService 相关方法 → EventLogTags.writeTimezoneInstallStarted()；搜索关键词：`writeTimezoneInstallStarted` 或 `timezone_install_started`

#### `timezone_install_complete`（EventLog tag `51612`）

- 日志含义：时区数据安装完成。
- 日志字段：
  - 定义：`51612 timezone_install_complete (token|3), (result|1)`
  - `token`：请求令牌。
  - `result`：结果码。
- 触发流程：TimeZoneDetectorService 相关方法 → EventLogTags.writeTimezoneInstallComplete()；搜索关键词：`writeTimezoneInstallComplete` 或 `timezone_install_complete`

#### `timezone_request_uninstall`（EventLog tag `51620`）

- 日志含义：请求卸载时区数据。
- 日志字段：
  - 定义：`51620 timezone_request_uninstall (token|3)`
  - `token`：请求令牌。
- 触发流程：TimeZoneDetectorService 相关方法 → EventLogTags.writeTimezoneRequestUninstall()；搜索关键词：`writeTimezoneRequestUninstall` 或 `timezone_request_uninstall`

#### `timezone_uninstall_started`（EventLog tag `51621`）

- 日志含义：开始卸载时区数据。
- 日志字段：
  - 定义：`51621 timezone_uninstall_started (token|3)`
  - `token`：请求令牌。
- 触发流程：TimeZoneDetectorService 相关方法 → EventLogTags.writeTimezoneUninstallStarted()；搜索关键词：`writeTimezoneUninstallStarted` 或 `timezone_uninstall_started`

#### `timezone_uninstall_complete`（EventLog tag `51622`）

- 日志含义：时区数据卸载完成。
- 日志字段：
  - 定义：`51622 timezone_uninstall_complete (token|3), (result|1)`
  - `token`：请求令牌。
  - `result`：结果码。
- 触发流程：TimeZoneDetectorService 相关方法 → EventLogTags.writeTimezoneUninstallComplete()；搜索关键词：`writeTimezoneUninstallComplete` 或 `timezone_uninstall_complete`

#### `timezone_request_nothing`（EventLog tag `51630`）

- 日志含义：请求保持当前时区数据。
- 日志字段：
  - 定义：`51630 timezone_request_nothing (token|3)`
  - `token`：请求令牌。
- 触发流程：TimeZoneDetectorService 相关方法 → EventLogTags.writeTimezoneRequestNothing()；搜索关键词：`writeTimezoneRequestNothing` 或 `timezone_request_nothing`

#### `timezone_nothing_complete`（EventLog tag `51631`）

- 日志含义：确认无需更新时区数据。
- 日志字段：
  - 定义：`51631 timezone_nothing_complete (token|3)`
  - `token`：请求令牌。
- 触发流程：TimeZoneDetectorService 相关方法 → EventLogTags.writeTimezoneNothingComplete()；搜索关键词：`writeTimezoneNothingComplete` 或 `timezone_nothing_complete`

### 性能采样与数据库

#### `db_sample`（EventLog tag `52000`）

- 日志含义：记录慢数据库操作采样。
- 日志字段：
  - 定义：`52000 db_sample (db|3),(sql|3),(time|1|3),(blocking_package|3),(sample_percent|1|6)`
  - `db`：数据库名。
  - `sql`：SQL 语句。
  - `time`：时间或耗时（毫秒）。
  - `blocking_package`：阻塞调用的包。
  - `sample_percent`：采样百分比。
- 触发流程：SQLiteConnection/SQLiteDebug 相关方法 → EventLogTags.writeDbSample()；搜索关键词：`writeDbSample` 或 `db_sample`

#### `http_stats`（EventLog tag `52001`）

- 日志含义：记录 HTTP 请求耗时和流量统计。
- 日志字段：
  - 定义：`52001 http_stats (useragent|3),(response|2|3),(processing|2|3),(tx|1|2),(rx|1|2)`
  - `useragent`：User-Agent。
  - `response`：HTTP 响应耗时或状态。
  - `processing`：处理耗时。
  - `tx`：发送字节数。
  - `rx`：接收字节数。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeHttpStats()；搜索关键词：`writeHttpStats` 或 `http_stats`

#### `content_query_sample`（EventLog tag `52002`）

- 日志含义：记录慢 ContentProvider 查询采样。
- 日志字段：
  - 定义：`52002 content_query_sample (uri|3),(projection|3),(selection|3),(sortorder|3),(time|1|3),(blocking_package|3),(sample_percent|1|6)`
  - `uri`：URI。
  - `projection`：查询列。
  - `selection`：查询条件。
  - `sortorder`：排序条件。
  - `time`：时间或耗时（毫秒）。
  - `blocking_package`：阻塞调用的包。
  - `sample_percent`：采样百分比。
- 触发流程：ContentResolver/ContentProvider 相关方法 → EventLogTags.writeContentQuerySample()；搜索关键词：`writeContentQuerySample` 或 `content_query_sample`

#### `content_update_sample`（EventLog tag `52003`）

- 日志含义：记录慢 ContentProvider 更新采样。
- 日志字段：
  - 定义：`52003 content_update_sample (uri|3),(operation|3),(selection|3),(time|1|3),(blocking_package|3),(sample_percent|1|6)`
  - `uri`：URI。
  - `operation`：更新操作。
  - `selection`：查询条件。
  - `time`：时间或耗时（毫秒）。
  - `blocking_package`：阻塞调用的包。
  - `sample_percent`：采样百分比。
- 触发流程：ContentResolver/ContentProvider 相关方法 → EventLogTags.writeContentUpdateSample()；搜索关键词：`writeContentUpdateSample` 或 `content_update_sample`

#### `binder_sample`（EventLog tag `52004`）

- 日志含义：记录慢 Binder 调用采样。
- 日志字段：
  - 定义：`52004 binder_sample (descriptor|3),(method_num|1|5),(time|1|3),(blocking_package|3),(sample_percent|1|6)`
  - `descriptor`：该事件上下文中的运行时值。
  - `method_num`：该事件上下文中的运行时值。
  - `time`：时间或耗时（毫秒）。
  - `blocking_package`：阻塞调用的包。
  - `sample_percent`：采样百分比。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeBinderSample()；搜索关键词：`writeBinderSample` 或 `binder_sample`

#### `unsupported_settings_query`（EventLog tag `52100`）

- 日志含义：检测到不支持的 Settings 查询。
- 日志字段：
  - 定义：`52100 unsupported_settings_query (uri|3),(selection|3),(whereArgs|3)`
  - `uri`：URI。
  - `selection`：查询条件。
  - `whereArgs`：查询参数。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeUnsupportedSettingsQuery()；搜索关键词：`writeUnsupportedSettingsQuery` 或 `unsupported_settings_query`

#### `persist_setting_error`（EventLog tag `52101`）

- 日志含义：持久化设置时发生错误。
- 日志字段：
  - 定义：`52101 persist_setting_error (message|3)`
  - `message`：错误消息。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writePersistSettingError()；搜索关键词：`writePersistSettingError` 或 `persist_setting_error`

### 安全、兼容性与设置

#### `harmful_app_warning_uninstall`（EventLog tag `53000`）

- 日志含义：用户选择卸载被标记为有害的应用。
- 日志字段：
  - 定义：`53000 harmful_app_warning_uninstall (package_name|3)`
  - `package_name`：包名。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeHarmfulAppWarningUninstall()；搜索关键词：`writeHarmfulAppWarningUninstall` 或 `harmful_app_warning_uninstall`

#### `harmful_app_warning_launch_anyway`（EventLog tag `53001`）

- 日志含义：用户选择仍然启动有害应用。
- 日志字段：
  - 定义：`53001 harmful_app_warning_launch_anyway (package_name|3)`
  - `package_name`：包名。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeHarmfulAppWarningLaunchAnyway()；搜索关键词：`writeHarmfulAppWarningLaunchAnyway` 或 `harmful_app_warning_launch_anyway`

#### `cc_connect_state_changed`（EventLog tag `53200`）

- 日志含义：应用兼容性变更服务连接状态变化。
- 日志字段：
  - 定义：`53200 cc_connect_state_changed (user|1|5),(type|1|5),(package_count|1|1)`
  - `user`：用户 ID。
  - `type`：事件或设备类型。
  - `package_count`：包数量。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeCcConnectStateChanged()；搜索关键词：`writeCcConnectStateChanged` 或 `cc_connect_state_changed`

#### `cc_set_allowlist`（EventLog tag `53201`）

- 日志含义：设置兼容性变更 allowlist。
- 日志字段：
  - 定义：`53201 cc_set_allowlist (user|1|5),(package_count|1|1),(activity_count|1|1)`
  - `user`：用户 ID。
  - `package_count`：包数量。
  - `activity_count`：Activity 数量。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeCcSetAllowlist()；搜索关键词：`writeCcSetAllowlist` 或 `cc_set_allowlist`

#### `cc_current_allowlist`（EventLog tag `53202`）

- 日志含义：读取当前兼容性变更 allowlist。
- 日志字段：
  - 定义：`53202 cc_current_allowlist (user|1|5),(count|1|1)`
  - `user`：用户 ID。
  - `count`：计数。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeCcCurrentAllowlist()；搜索关键词：`writeCcCurrentAllowlist` 或 `cc_current_allowlist`

#### `cc_update_options`（EventLog tag `53203`）

- 日志含义：更新兼容性变更选项。
- 日志字段：
  - 定义：`53203 cc_update_options (user|1|5),(count|1)`
  - `user`：用户 ID。
  - `count`：计数。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeCcUpdateOptions()；搜索关键词：`writeCcUpdateOptions` 或 `cc_update_options`

#### `audioserver_binder_timeout`（EventLog tag `61000`）

- 日志含义：AudioServer Binder 调用超时。
- 日志字段：
  - 定义：`61000 audioserver_binder_timeout (command|3)`
  - `command`：Binder 命令。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeAudioserverBinderTimeout()；搜索关键词：`writeAudioserverBinderTimeout` 或 `audioserver_binder_timeout`

#### `lock_screen_type`（EventLog tag `90200`）

- 日志含义：记录 lock screen type 相关事件。
- 日志字段：
  - 定义：`90200 lock_screen_type (type|3)`
  - `type`：事件或设备类型。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeLockScreenType()；搜索关键词：`writeLockScreenType` 或 `lock_screen_type`

#### `settings_latency`（EventLog tag `90204`）

- 日志含义：记录 settings latency 相关事件。
- 日志字段：
  - 定义：`90204 settings_latency (action|1|6),(latency|1|3)`
  - `action`：操作类型。
  - `latency`：延迟。
- 触发流程：EventLog/Log framework 相关方法 → EventLogTags.writeSettingsLatency()；搜索关键词：`writeSettingsLatency` 或 `settings_latency`

### Native、SQLite 与 TTS

#### `sqlite_mem_alarm_current`（EventLog tag `75000`）

- 日志含义：SQLite 当前内存告警值。
- 日志字段：
  - 定义：`75000 sqlite_mem_alarm_current (current|1|2)`
  - `current`：当前内存量。
- 触发流程：SQLiteConnection/SQLiteDebug 相关方法 → EventLogTags.writeSqliteMemAlarmCurrent()；搜索关键词：`writeSqliteMemAlarmCurrent` 或 `sqlite_mem_alarm_current`

#### `sqlite_mem_alarm_max`（EventLog tag `75001`）

- 日志含义：SQLite 内存告警上限变化。
- 日志字段：
  - 定义：`75001 sqlite_mem_alarm_max (max|1|2)`
  - `max`：最大内存量。
- 触发流程：SQLiteConnection/SQLiteDebug 相关方法 → EventLogTags.writeSqliteMemAlarmMax()；搜索关键词：`writeSqliteMemAlarmMax` 或 `sqlite_mem_alarm_max`

#### `sqlite_mem_alarm_alloc_attempt`（EventLog tag `75002`）

- 日志含义：SQLite 内存分配尝试次数。
- 日志字段：
  - 定义：`75002 sqlite_mem_alarm_alloc_attempt (attempts|1|4)`
  - `attempts`：分配尝试次数。
- 触发流程：SQLiteConnection/SQLiteDebug 相关方法 → EventLogTags.writeSqliteMemAlarmAllocAttempt()；搜索关键词：`writeSqliteMemAlarmAllocAttempt` 或 `sqlite_mem_alarm_alloc_attempt`

#### `sqlite_mem_released`（EventLog tag `75003`）

- 日志含义：SQLite 释放内存。
- 日志字段：
  - 定义：`75003 sqlite_mem_released (Memory released|1|2)`
  - `Memory released`：释放内存量。
- 触发流程：SQLiteConnection/SQLiteDebug 相关方法 → EventLogTags.writeSqliteMemReleased()；搜索关键词：`writeSqliteMemReleased` 或 `sqlite_mem_released`

#### `sqlite_db_corrupt`（EventLog tag `75004`）

- 日志含义：检测到 SQLite 数据库损坏。
- 日志字段：
  - 定义：`75004 sqlite_db_corrupt (Database file corrupt|3)`
  - `Database file corrupt`：损坏数据库文件。
- 触发流程：SQLiteConnection/SQLiteDebug 相关方法 → EventLogTags.writeSqliteDbCorrupt()；搜索关键词：`writeSqliteDbCorrupt` 或 `sqlite_db_corrupt`

#### `tts_speak_success`（EventLog tag `76001`）

- 日志含义：TTS 文本合成成功。
- 日志字段：
  - 定义：`76001 tts_speak_success (engine|3),(caller_uid|1),(caller_pid|1),(length|1),(locale|3),(rate|1),(pitch|1),(engine_latency|2|3),(engine_total|2|3),(audio_latency|2|3)`
  - `engine`：TTS 引擎。
  - `caller_uid`：调用方 UID。
  - `caller_pid`：调用方 PID。
  - `length`：文本长度。
  - `locale`：语言区域。
  - `rate`：语速。
  - `pitch`：音调。
  - `engine_latency`：引擎处理延迟。
  - `engine_total`：引擎总耗时。
  - `audio_latency`：音频输出延迟。
- 触发流程：TextToSpeechService 相关方法 → EventLogTags.writeTtsSpeakSuccess()；搜索关键词：`writeTtsSpeakSuccess` 或 `tts_speak_success`

#### `tts_speak_failure`（EventLog tag `76002`）

- 日志含义：TTS 文本合成失败。
- 日志字段：
  - 定义：`76002 tts_speak_failure (engine|3),(caller_uid|1),(caller_pid|1),(length|1),(locale|3),(rate|1),(pitch|1)`
  - `engine`：TTS 引擎。
  - `caller_uid`：调用方 UID。
  - `caller_pid`：调用方 PID。
  - `length`：文本长度。
  - `locale`：语言区域。
  - `rate`：语速。
  - `pitch`：音调。
- 触发流程：TextToSpeechService 相关方法 → EventLogTags.writeTtsSpeakFailure()；搜索关键词：`writeTtsSpeakFailure` 或 `tts_speak_failure`

#### `tts_v2_speak_success`（EventLog tag `76003`）

- 日志含义：TTS v2 文本合成成功。
- 日志字段：
  - 定义：`76003 tts_v2_speak_success (engine|3),(caller_uid|1),(caller_pid|1),(length|1),(request_config|3),(engine_latency|2|3),(engine_total|2|3),(audio_latency|2|3)`
  - `engine`：TTS 引擎。
  - `caller_uid`：调用方 UID。
  - `caller_pid`：调用方 PID。
  - `length`：文本长度。
  - `request_config`：TTS 请求配置。
  - `engine_latency`：引擎处理延迟。
  - `engine_total`：引擎总耗时。
  - `audio_latency`：音频输出延迟。
- 触发流程：TextToSpeechService 相关方法 → EventLogTags.writeTtsV2SpeakSuccess()；搜索关键词：`writeTtsV2SpeakSuccess` 或 `tts_v2_speak_success`

#### `tts_v2_speak_failure`（EventLog tag `76004`）

- 日志含义：TTS v2 文本合成失败。
- 日志字段：
  - 定义：`76004 tts_v2_speak_failure (engine|3),(caller_uid|1),(caller_pid|1),(length|1),(request_config|3), (statusCode|1)`
  - `engine`：TTS 引擎。
  - `caller_uid`：调用方 UID。
  - `caller_pid`：调用方 PID。
  - `length`：文本长度。
  - `request_config`：TTS 请求配置。
  - `statusCode`：状态码。
- 触发流程：TextToSpeechService 相关方法 → EventLogTags.writeTtsV2SpeakFailure()；搜索关键词：`writeTtsV2SpeakFailure` 或 `tts_v2_speak_failure`

#### `bionic_event_memcpy_buffer_overflow`（EventLog tag `80100`）

- 日志含义：记录 bionic event memcpy buffer overflow 相关事件。
- 日志字段：
  - 定义：`80100 bionic_event_memcpy_buffer_overflow (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventMemcpyBufferOverflow()；搜索关键词：`writeBionicEventMemcpyBufferOverflow` 或 `bionic_event_memcpy_buffer_overflow`

#### `bionic_event_strcat_buffer_overflow`（EventLog tag `80105`）

- 日志含义：记录 bionic event strcat buffer overflow 相关事件。
- 日志字段：
  - 定义：`80105 bionic_event_strcat_buffer_overflow (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventStrcatBufferOverflow()；搜索关键词：`writeBionicEventStrcatBufferOverflow` 或 `bionic_event_strcat_buffer_overflow`

#### `bionic_event_memmov_buffer_overflow`（EventLog tag `80110`）

- 日志含义：记录 bionic event memmov buffer overflow 相关事件。
- 日志字段：
  - 定义：`80110 bionic_event_memmov_buffer_overflow (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventMemmovBufferOverflow()；搜索关键词：`writeBionicEventMemmovBufferOverflow` 或 `bionic_event_memmov_buffer_overflow`

#### `bionic_event_strncat_buffer_overflow`（EventLog tag `80115`）

- 日志含义：记录 bionic event strncat buffer overflow 相关事件。
- 日志字段：
  - 定义：`80115 bionic_event_strncat_buffer_overflow (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventStrncatBufferOverflow()；搜索关键词：`writeBionicEventStrncatBufferOverflow` 或 `bionic_event_strncat_buffer_overflow`

#### `bionic_event_strncpy_buffer_overflow`（EventLog tag `80120`）

- 日志含义：记录 bionic event strncpy buffer overflow 相关事件。
- 日志字段：
  - 定义：`80120 bionic_event_strncpy_buffer_overflow (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventStrncpyBufferOverflow()；搜索关键词：`writeBionicEventStrncpyBufferOverflow` 或 `bionic_event_strncpy_buffer_overflow`

#### `bionic_event_memset_buffer_overflow`（EventLog tag `80125`）

- 日志含义：记录 bionic event memset buffer overflow 相关事件。
- 日志字段：
  - 定义：`80125 bionic_event_memset_buffer_overflow (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventMemsetBufferOverflow()；搜索关键词：`writeBionicEventMemsetBufferOverflow` 或 `bionic_event_memset_buffer_overflow`

#### `bionic_event_strcpy_buffer_overflow`（EventLog tag `80130`）

- 日志含义：记录 bionic event strcpy buffer overflow 相关事件。
- 日志字段：
  - 定义：`80130 bionic_event_strcpy_buffer_overflow (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventStrcpyBufferOverflow()；搜索关键词：`writeBionicEventStrcpyBufferOverflow` 或 `bionic_event_strcpy_buffer_overflow`

#### `bionic_event_strcat_integer_overflow`（EventLog tag `80200`）

- 日志含义：记录 bionic event strcat integer overflow 相关事件。
- 日志字段：
  - 定义：`80200 bionic_event_strcat_integer_overflow (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventStrcatIntegerOverflow()；搜索关键词：`writeBionicEventStrcatIntegerOverflow` 或 `bionic_event_strcat_integer_overflow`

#### `bionic_event_strncat_integer_overflow`（EventLog tag `80205`）

- 日志含义：记录 bionic event strncat integer overflow 相关事件。
- 日志字段：
  - 定义：`80205 bionic_event_strncat_integer_overflow (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventStrncatIntegerOverflow()；搜索关键词：`writeBionicEventStrncatIntegerOverflow` 或 `bionic_event_strncat_integer_overflow`

#### `bionic_event_resolver_old_response`（EventLog tag `80300`）

- 日志含义：记录 bionic event resolver old response 相关事件。
- 日志字段：
  - 定义：`80300 bionic_event_resolver_old_response (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventResolverOldResponse()；搜索关键词：`writeBionicEventResolverOldResponse` 或 `bionic_event_resolver_old_response`

#### `bionic_event_resolver_wrong_server`（EventLog tag `80305`）

- 日志含义：记录 bionic event resolver wrong server 相关事件。
- 日志字段：
  - 定义：`80305 bionic_event_resolver_wrong_server (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventResolverWrongServer()；搜索关键词：`writeBionicEventResolverWrongServer` 或 `bionic_event_resolver_wrong_server`

#### `bionic_event_resolver_wrong_query`（EventLog tag `80310`）

- 日志含义：记录 bionic event resolver wrong query 相关事件。
- 日志字段：
  - 定义：`80310 bionic_event_resolver_wrong_query (uid|1)`
  - `uid`：UID。
- 触发流程：libc/bionic 相关方法 → EventLogTags.writeBionicEventResolverWrongQuery()；搜索关键词：`writeBionicEventResolverWrongQuery` 或 `bionic_event_resolver_wrong_query`

#### `dropbox_file_copy`（EventLog tag `81002`）

- 日志含义：DropBox 复制事件文件。
- 日志字段：
  - 定义：`81002 dropbox_file_copy (FileName|3),(Size|1),(Tag|3)`
  - `FileName`：文件名。
  - `Size`：数据大小。
  - `Tag`：DropBox 标签。
- 触发流程：`com.android.server.DropBoxManagerService` 文件复制方法 → EventLogTags.writeDropboxFileCopy()；搜索关键词：`writeDropboxFileCopy` 或 `dropbox_file_copy`

