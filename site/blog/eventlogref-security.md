---
title: Android EventLog 参考：Security / Telephony / Connectivity
description: 安全、电话与网络连接相关 EventLog 标签、字段含义与触发流程。
date: 2026-08-30
---

# Android EventLog 参考：Security / Telephony / Connectivity

本文是 [Android EventLog 参考](/blog/eventlogref) 的分类页，收录 **Security / Telephony / Connectivity** 相关事件。字段含义与触发流程与原文一致，便于按主题查阅和检索。

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
