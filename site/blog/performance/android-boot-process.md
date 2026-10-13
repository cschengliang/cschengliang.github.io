---
title: 图解 Android 开机过程
description: 用交互流程图、进程关系图和应用启动链路，理解 Android 从上电到桌面的开机过程。
date: 2026-10-13
aside: false
outline: false
---

<script setup>
import BootProcess from '../../.vitepress/theme/components/BootProcess.vue'
</script>

# 图解 Android 开机过程

从上电到桌面，用四张图看启动主线、进程关系、应用启动和性能观察边界。点击第一张图中的阶段，可以逐步查看职责。

## 一、从上电到桌面

<BootProcess mode="stages" />

启动主线依据 [AOSP 开机流程说明](https://source.android.com/docs/automotive/power/boot_time)整理。

## 二、谁创建进程，谁运行服务

<BootProcess mode="processes" />

进程创建机制见 [Zygote 官方说明](https://source.android.com/docs/core/runtime/zygote)；服务启动批次见 [SystemServer 源码](https://android.googlesource.com/platform/frameworks/base/+/refs/heads/main/services/java/com/android/server/SystemServer.java)。

## 三、桌面出现后，应用怎样启动

<BootProcess mode="app" />

Activity 与任务管理可对照 [ATMS 源码](https://android.googlesource.com/platform/frameworks/base/+/refs/heads/main/services/core/java/com/android/server/wm/ActivityTaskManagerService.java)。图中省略了部分跨进程回调和绘制细节。

## 四、开机 Trace 能看到哪一段

<BootProcess mode="trace" />

动手抓取：[抓取安卓开机 Trace](/blog/performance/android-boot-trace)。
