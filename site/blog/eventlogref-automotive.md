---
title: Android EventLog 参考：Automotive / Car
description: 车载 Car Service、用户、电源和 Watchdog 相关 EventLog 标签、字段含义与触发流程。
date: 2026-08-30
---

# Android EventLog 参考：Automotive / Car

本文是 [Android EventLog 参考](/blog/eventlogref) 的分类页，收录 **Automotive / Car** 相关事件。字段含义与触发流程与原文一致，便于按主题查阅和检索。

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
