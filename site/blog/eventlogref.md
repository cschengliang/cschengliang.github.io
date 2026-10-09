---
title: Android EventLog 参考
description: 按功能分类整理 Android EventLog 标签、字段含义与触发流程，便于源码检索和问题定位。
date: 2026-08-30
---

# Android EventLog 参考

事件清单来源：`C:\Users\csche\Documents\androiddebug\etc\event-log-tags`。本文按功能类别整理，每条事件统一说明日志含义、字段含义和触发流程；触发流程仅保留类名、方法名及搜索关键词，便于跨 AOSP 版本定位。

完整条目已按类别拆到下列页面，本页作为目录入口，原有地址 `/docs/blog/eventlogref.html` 保持有效。

## 分类目录

- [Activity / Window / 进程与用户](/blog/eventlogref-activity)：启动进度、Activity/Window、进程与用户相关事件。
- [Automotive / Car](/blog/eventlogref-automotive)：Car Service、用户、电源和 Watchdog 等车载事件。
- [Security / Telephony / Connectivity](/blog/eventlogref-security)：安全、电话与网络连接相关事件。
- [UI / Input / Notification](/blog/eventlogref-ui)：通知、输入与界面相关事件。
- [Framework Core / Runtime](/blog/eventlogref-framework)：Framework 核心与运行时相关事件。

排查时可先看 [Android EventLog 场景索引](/blog/eventlog-scenarios)，再回到对应分类页查字段和触发流程。
