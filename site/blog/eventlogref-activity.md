---
title: Android EventLog 参考：Activity / Window / 进程与用户
description: Activity、Window、进程与用户相关 EventLog 标签、字段含义与触发流程。
date: 2026-08-30
---

# Android EventLog 参考：Activity / Window / 进程与用户

本文是 [Android EventLog 参考](/blog/eventlogref) 的分类页，收录 **Activity / Window / 进程与用户** 相关事件。字段含义与触发流程与原文一致，便于按主题查阅和检索。

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
