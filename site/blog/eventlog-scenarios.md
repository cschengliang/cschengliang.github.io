---
title: Android EventLog 场景索引
description: 按系统排查场景整理常用 Android EventLog，帮助快速定位启动、Activity、ANR、输入和性能问题。
date: 2026-08-30
outline: deep
---

# Android EventLog 场景索引

本文面向日常 log 分析，按“正在排查的系统场景”整理常用 EventLog。它不是完整 tag 定义表；字段含义和源码触发流程请查阅 [eventlogref.md](eventlogref.md)。

EventLog 位于 `events` buffer，常用查看方式：

```bash
adb logcat -b events -v threadtime
adb logcat -b events -v threadtime | grep -E "am_proc_start|am_proc_bound|wm_create_activity"
```

Windows 环境可将 `grep` 替换为 `findstr`。

## 1. 系统启动

用于判断 SystemServer、AMS、PMS、开机动画和屏幕是否按阶段推进：

| 关注阶段 | EventLog（tag） |
| --- | --- |
| 启动计时开始 | `boot_progress_start`（3000） |
| SystemServer 开始运行 | `boot_progress_system_run`（3010）、`system_server_start`（3011） |
| 系统资源预加载 | `boot_progress_preload_start`（3020）、`boot_progress_preload_end`（3030） |
| AMS 就绪 | `boot_progress_ams_ready`（3040） |
| PMS 启动、扫描和就绪 | `boot_progress_pms_start`（3060）、`boot_progress_pms_system_scan_start`（3070）、`boot_progress_pms_data_scan_start`（3080）、`boot_progress_pms_scan_end`（3090）、`boot_progress_pms_ready`（3100） |
| 亮屏和开机动画结束 | `boot_progress_enable_screen`（3050）、`wm_boot_animation_done`（31007）、`sf_stop_bootanim`（60110） |

排查启动卡顿时，先比较相邻阶段的时间戳；某个阶段有开始事件但没有结束/就绪事件，通常就是下一步的重点。

## 2. 启动应用或 Activity

用于确认“进程是否启动、是否 attach、Activity 是否创建和显示”：

| 排查问题 | EventLog（tag） |
| --- | --- |
| AMS 请求创建进程 | `am_proc_start`（30014） |
| 应用进程 attach 到 AMS | `am_proc_bound`（30010） |
| 创建 Task/Activity | `wm_create_task`（30004）、`wm_create_activity`（30005） |
| Activity 启动耗时 | `wm_activity_launch_time`（30009） |
| Activity 恢复和前台切换 | `wm_resume_activity`（30007）、`wm_set_resumed_activity`（30043）、`wm_focused_root_task`（30044） |
| 应用侧生命周期回调 | `wm_on_create_called`（30057）、`wm_on_start_called`（30059）、`wm_on_resume_called`（30022） |
| 顶层 resumed 状态 | `wm_on_top_resumed_gained_called`（30064）、`wm_on_top_resumed_lost_called`（30065） |

常用判断：有 `am_proc_start` 没有 `am_proc_bound`，优先检查进程启动、Zygote 和 attach 超时；有 `am_proc_bound` 但没有后续 Activity 事件，再检查 `bindApplication`、应用初始化和任务调度。

## 3. Activity 切换、返回和销毁

用于分析页面切换、返回、配置变化重建以及生命周期卡顿：

| 场景 | EventLog（tag） |
| --- | --- |
| 新 Intent 到达 | `wm_new_intent`（30003） |
| 暂停页面 | `wm_pause_activity`（30013）、`wm_on_paused_called`（30021） |
| 停止页面 | `wm_stop_activity`（30048）、`wm_on_stop_called`（30049） |
| 完成/销毁页面 | `wm_finish_activity`（30001）、`wm_destroy_activity`（30018）、`wm_on_destroy_called`（30060） |
| 暂停失败 | `wm_failed_to_pause`（30012） |
| 配置变化重建 | `wm_relaunch_resume_activity`（30019）、`wm_relaunch_activity`（30020） |
| Activity Result | `wm_on_activity_result_called`（30062） |

重点比较系统侧事件（`wm_*_activity`）与应用回调事件（`wm_on_*_called`）之间的时间差。

## 4. ANR、崩溃和进程异常退出

用于判断应用无响应、异常退出、启动失败以及 AMS 是否主动清理进程：

| 排查问题 | EventLog（tag） |
| --- | --- |
| 应用无响应 | `am_anr`（30008） |
| 应用崩溃 | `am_crash`（30039） |
| AMS/系统严重异常记录 | `am_wtf`（30040） |
| 进程死亡 | `am_proc_died`（30011） |
| 进程启动或 attach 超时 | `am_process_start_timeout`（30037） |
| 未知进程尝试 attach | `am_drop_process`（30033） |
| 进程被 AMS 杀死 | `am_kill`（30023） |
| 进程崩溃次数过多 | `am_process_crashed_too_much`（30032） |
| 进程标记为 bad/good | `am_proc_bad`（30015）、`am_proc_good`（30016） |

推荐关联同一 PID 和进程名，并按时间顺序查看：`am_proc_start` → `am_proc_bound` → `am_anr`/`am_crash`/`am_proc_died`。

## 5. 进程状态、内存和性能

用于分析后台限制、进程优先级、PSS、CPU、压缩和低内存回收：

| 排查问题 | EventLog（tag） |
| --- | --- |
| 内存概况 | `am_meminfo`（30046） |
| 单进程内存 PSS | `am_pss`（30047） |
| CPU 采样 | `am_cpu`（30104） |
| 进程状态或 OOM 调整 | `am_proc_state_changed`（30112）、`am_oom_adj_misc`（30113） |
| 低内存通知 | `am_low_memory`（30017） |
| 进程压缩/解压 | `am_compact`（30063） |
| 进程冻结/解冻 | `am_freeze`（30068）、`am_unfreeze`（30069） |
| Watchdog 监控和重启 | `watchdog`、`watchdog_proc_pss`、`watchdog_soft_reset`、`watchdog_hard_reset`（2802-2805） |
| Watchdog 统计 | `watchdog_pss_stats`、`watchdog_proc_stats`、`watchdog_meminfo`、`watchdog_vmstat`（2806-2810） |
| 杀进程诊断 | `killinfo`（10195355） |

## 6. 用户启动、切换和解锁

用于分析多用户启动、前后台切换、解锁和用户可见性：

| 排查阶段 | EventLog（tag） |
| --- | --- |
| AMS 切换用户 | `am_switch_user`（30041） |
| 用户状态变化 | `am_user_state_changed`（30051） |
| UserController 流程 | `uc_start_user_internal`（30076）、`uc_unlock_user`（30077）、`uc_finish_user_boot`（30078）、`uc_dispatch_user_switch`（30079）、`uc_continue_user_switch`（30080）、`uc_send_user_broadcast`（30081） |
| 用户启动/切换/解锁 | `ssm_user_starting`（30082）、`ssm_user_switching`（30083）、`ssm_user_unlocking`（30084）、`ssm_user_unlocked`（30085） |
| 用户停止 | `ssm_user_stopping`（30086）、`ssm_user_stopped`（30087）、`ssm_user_completed_event`（30088） |
| 用户可见性 | `um_user_visibility_changed`（30091） |

遇到“用户已切换但桌面未出现”，可重点检查 `uc_*`、`ssm_*` 的完成事件，以及后续 Activity/Window 事件是否出现。

## 7. 通知、SystemUI 和界面交互

用于分析通知入队、通知栏操作、SystemUI 交互和界面性能：

| 排查问题 | EventLog（tag） |
| --- | --- |
| 通知入队/取消 | `notification_enqueue`（2750）、`notification_cancel`（2751）、`notification_cancel_all`（2752） |
| 通知栏打开/关闭 | `notification_panel_revealed`（27500）、`notification_panel_hidden`（27501） |
| 通知可见性和展开 | `notification_visibility_changed`（27510）、`notification_expansion`（27511）、`notification_visibility`（27531） |
| 通知点击和 Action | `notification_clicked`（27520）、`notification_action_clicked`（27521） |
| 通知取消、提醒和聚合 | `notification_canceled`（27530）、`notification_alert`（27532）、`notification_autogrouped`（27533）、`notification_unautogrouped`（275534） |
| SystemUI 状态栏/面板 | `sysui_statusbar_touch`（36000）、`sysui_notificationpanel_touch`（36020）、`sysui_quickpanel_touch`（36030）、`sysui_latency`（36070）、`sysui_keyguard`（36080） |
| CUJ 性能 | `jank_cuj_events_begin_request`（37001）、`jank_cuj_events_end_request`（37002）、`jank_cuj_events_cancel_request`（37003） |

## 8. 输入、输入法和绘制

用于分析触摸/焦点分发、IME 显示隐藏、输入法动画以及 View 绘制：

| 排查问题 | EventLog（tag） |
| --- | --- |
| 输入窗口和交互 | `input_interaction`（62000）、`input_focus`（62001）、`input_cancel`（62003） |
| IME 显示/隐藏 | `imf_show_ime`（32001）、`imf_hide_ime`（32002）、`imf_force_reconnect_ime`（32000） |
| IME 动画 | `imf_ime_anim_start`（32006）、`imf_ime_anim_finish`（32007）、`imf_ime_anim_cancel`（32008） |
| IME 远程动画 | `imf_ime_remote_anim_start`（32009）、`imf_ime_remote_anim_end`（32010）、`imf_ime_remote_anim_cancel`（32011） |
| ViewRoot 绘制/布局 | `viewroot_draw`（60000）、`viewroot_layout`（60001）、`viewroot_draw_event`（60004） |
| SurfaceView | `surfaceview_layout`（60005）、`surfaceview_callback`（60006） |

## 9. 网络、Wi-Fi 和蜂窝数据

用于分析网络连接、Wi-Fi 状态、VPN、NTP 校时以及蜂窝数据建立失败：

| 排查问题 | EventLog（tag） |
| --- | --- |
| 网络连接状态 | `connectivity_state_changed`（50020） |
| Wi-Fi 总体状态 | `wifi_state_changed`（50021） |
| Wi-Fi 事件和 supplicant | `wifi_event_handled`（50022）、`wifi_supplicant_state_changed`（50023） |
| NTP 校时 | `ntp_success`（50080）、`ntp_failure`（50081） |
| 移动/Wi-Fi 流量采样 | `netstats_mobile_sample`（51100）、`netstats_wifi_sample`（51101） |
| VPN Lockdown | `lockdown_vpn_connecting`（51200）、`lockdown_vpn_connected`（51201）、`lockdown_vpn_error`（51202） |
| PDP 数据连接 | `pdp_bad_dns_address`（50100）、`pdp_setup_fail`（50105）、`pdp_network_drop`（50109） |
| GSM/CDMA 状态 | `gsm_data_state_change`（50113）、`gsm_service_state_change`（50114）、`cdma_data_state_change`（50115）、`cdma_service_state_change`（50116） |
| 数据恢复 | `data_stall_recovery_get_data_call_list`（50118）、`data_stall_recovery_cleanup`（50119）、`data_stall_recovery_reregister`（50120）、`data_stall_recovery_radio_restart`（50121） |

## 10. 电源、电池、温度和存储

用于分析耗电、亮灭屏、唤醒锁、电池状态、温度和磁盘空间：

| 排查问题 | EventLog（tag） |
| --- | --- |
| 电池电量和状态 | `battery_level`（2722）、`battery_status`（2723）、`battery_discharge`（2730） |
| 电池省电模式 | `battery_saver_mode`（2739）、`battery_saving_stats`（27390）、`battery_saver_setting`（27392） |
| 睡眠和唤醒 | `power_sleep_requested`（2724）、`power_partial_wake_state`（2729）、`power_soft_sleep_requested`（2731） |
| 屏幕状态 | `power_screen_broadcast_send`（2725）、`power_screen_broadcast_done`（2726）、`power_screen_broadcast_stop`（2727）、`power_screen_state`（2728） |
| 温度 | `thermal_changed`（2737） |
| 存储状态 | `storage_state`（2749） |
| 磁盘/eMMC 统计 | `storaged_disk_stats`（2732）、`storaged_emmc_info`（2733） |
| 文件系统整理 | `fstrim_start`（2755）、`fstrim_finish`（2756） |

## 11. 包管理、安装和数据清理

用于分析安装配置失败、清理应用数据和 PackageManager 关键状态：

| 排查问题 | EventLog（tag） |
| --- | --- |
| PackageManager 关键诊断 | `pm_critical_info`（3120） |
| 包管理统计/快照 | `pm_package_stats`（3121）、`pm_snapshot_stats`（3130）、`pm_snapshot_rebuild`（3131） |
| 清理应用数据 | `pm_clear_app_data_caller`（3132）、`installer_clear_app_data_caller`（39000）、`installer_clear_app_data_call_stack`（39001） |
| 配置安装失败 | `config_install_failed`（51300） |
| 未知来源开关 | `unknown_sources_enabled`（3110） |

## 12. 备份和恢复

用于分析 Key-Value/Full Backup、Transport、Agent 和配额问题：

| 排查问题 | EventLog（tag） |
| --- | --- |
| Backup 数据变化和启动 | `backup_data_changed`（2820）、`backup_start`（2821）、`backup_requested`（2828） |
| Backup Transport/Agent | `backup_transport_failure`（2822）、`backup_agent_failure`（2823）、`backup_transport_lifecycle`（2850）、`backup_transport_connection`（2851） |
| Backup 包和结果 | `backup_package`（2824）、`backup_success`（2825）、`backup_quota_exceeded`（2829） |
| Restore 流程 | `restore_start`（2830）、`restore_transport_failure`（2831）、`restore_agent_failure`（2832）、`restore_package`（2833）、`restore_success`（2834） |
| Full Backup/Restore | `full_backup_package`（2840）、`full_backup_agent_failure`（2841）、`full_backup_transport_failure`（2842）、`full_backup_success`（2843）、`full_restore_package`（2844）、`full_backup_cancelled`（2846） |

## 13. 安全审计和 SELinux

用于分析 SELinux AVC、设备策略、安全日志和实验性安全检测：

| 排查问题 | EventLog（tag） |
| --- | --- |
| SELinux/内核审计 | `auditd`（1003） |
| ADB 和安全日志开关 | `security_adb_shell_interactive`（210001）、`security_adb_shell_command`（210002）、`security_logging_started`（210011）、`security_logging_stopped`（210012） |
| Keyguard/设备策略 | `security_keyguard_dismissed`（210006）、`security_keyguard_secured`（210008）、`security_remote_lock`（210022）、`security_wipe_failed`（210023） |
| 密钥/证书 | `security_key_generated`（210024）、`security_key_imported`（210025）、`security_key_destroyed`（210026）、`security_cert_authority_installed`（210029）、`security_cert_authority_removed`（210030） |
| 网络/媒体/包安全事件 | `security_wifi_connection`（210037）、`security_wifi_disconnection`（210038）、`security_media_mounted`（210013）、`security_media_unmounted`（210014）、`security_package_installed`（210041）、`security_package_uninstalled`（210043） |
| SafetyNet/Snet | `snet`（206001）、`snet_event_log`（1397638484） |

## 14. Automotive 车载系统

用于分析 Car Service 启动、VHAL、用户生命周期和车载电源策略：

| 排查问题 | EventLog（tag 范围） |
| --- | --- |
| Car Service Helper | `car_helper_*`（150000-150016） |
| Car Service 生命周期/VHAL | `car_service_*`（150050-150060） |
| CarUserService 用户流程 | `car_user_svc_*`、`car_initial_user_*`、`car_user_hal_*`（150100-150155） |
| CarUserManager 客户端调用 | `car_user_mgr_*`（150171-150191） |
| 用户数据管理 | `car_dp_mgr_*`（150200-150207） |
| 车载电源管理 | `car_pwr_mgr_*`（150300-150303） |
| Car Watchdog | `car_watchdog_svc_io_overuse_kill`（150400） |

车载事件的完整字段和具体类方法请直接在 [eventlogref.md](eventlogref.md) 中搜索事件名，或到 `packages/services/Car` 搜索 `EventLogTags.write...`。

## 15. 快速选择规则

遇到问题时可以先按下面的最小集合过滤：

| 问题 | 第一组关键词 |
| --- | --- |
| 开机慢/卡开机 | `boot_progress_`、`system_server_start`、`wm_boot_animation_done`、`sf_stop_bootanim` |
| 冷启动慢 | `am_proc_start`、`am_proc_bound`、`wm_create_activity`、`wm_activity_launch_time` |
| Activity 切换异常 | `wm_pause_activity`、`wm_resume_activity`、`wm_relaunch_activity`、`wm_finish_activity` |
| 应用 ANR/崩溃 | `am_anr`、`am_crash`、`am_proc_died`、`am_kill` |
| 内存压力 | `am_meminfo`、`am_pss`、`am_low_memory`、`watchdog_`、`killinfo` |
| 用户切换/解锁 | `am_switch_user`、`uc_`、`ssm_`、`um_user_visibility_changed` |
| 通知不显示/点击异常 | `notification_`、`sysui_`、`jank_cuj_events_` |
| 输入法/触摸异常 | `input_`、`imf_`、`viewroot_` |
| 无网/Wi-Fi/移动数据 | `connectivity_`、`wifi_`、`pdp_`、`gsm_`、`cdma_`、`data_` |
| 耗电/亮灭屏异常 | `battery_`、`power_`、`thermal_changed`、`storage_state` |
