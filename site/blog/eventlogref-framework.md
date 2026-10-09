---
title: Android EventLog 参考：Framework Core / Runtime
description: Framework 核心与运行时相关 EventLog 标签、字段含义与触发流程。
date: 2026-08-30
---

# Android EventLog 参考：Framework Core / Runtime

本文是 [Android EventLog 参考](/blog/eventlogref) 的分类页，收录 **Framework Core / Runtime** 相关事件。字段含义与触发流程与原文一致，便于按主题查阅和检索。

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
