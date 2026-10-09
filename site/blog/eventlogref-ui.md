---
title: Android EventLog 参考：UI / Input / Notification
description: 通知、输入与界面相关 EventLog 标签、字段含义与触发流程。
date: 2026-08-30
---

# Android EventLog 参考：UI / Input / Notification

本文是 [Android EventLog 参考](/blog/eventlogref) 的分类页，收录 **UI / Input / Notification** 相关事件。字段含义与触发流程与原文一致，便于按主题查阅和检索。

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
