---
layout: doc
---

# 学习、记录与实践

这里是 cschengliang 的技术笔记，专注 Android Framework、Binder IPC 与系统调试。把源码阅读中的理解、排查问题的线索与实践过程整理下来，方便再次查阅。

::: tip 从这里开始
第一次阅读 Binder 系列，建议从 [Binder、Proxy、Stub 与 Binder 线程](/blog/android-binder-proxy-stub-thread) 入手，再深入接口协议和源码实现。
:::

## 系统日志与问题定位

- [Android EventLog 参考](/blog/eventlogref)：日志标签、字段含义与触发流程。
- [Android EventLog 场景索引](/blog/eventlog-scenarios)：按启动、ANR、输入与性能场景定位事件。

## 输入与图形系统

- [触摸事件：从 InputDispatcher 到 View](/blog/input-dispatcher-to-view-click)：系统输入分发到点击回调的完整链路。
- [SurfaceControlRegistry 调试指南](/blog/surfacecontrol-registry-debugging)：对象统计、事务追踪与调试误区。

## Binder IPC 与源码阅读

- [Binder、Proxy、Stub 与 Binder 线程](/blog/android-binder-proxy-stub-thread)：跨进程调用与线程关系。
- [Binder 同步调用优先级继承](/blog/binder-priority-inheritance)：优先级、调度策略与恢复过程。
- [Binder.java 源码导读](/blog/android-binder-guide)：本地对象、事务入口与调用身份。
- [IBinder.java 源码导读](/blog/android-ibinder-guide)：基础协议、死亡监听与生命周期。

## 笔记与实践

[实践记录](/notes/overview) 收录项目过程与技术尝试。[快速开始](/guide/getting-started) 介绍文档结构与阅读方式。
