# 技术博客

这里记录 Android Framework、Binder IPC 和系统源码阅读过程中的理解与实践。

## Android 系统参考

- [Android EventLog 参考](/blog/eventlogref)<br>
  按功能分类整理 Android EventLog 标签、字段含义与触发流程，便于源码检索和问题定位。
- [Android EventLog 场景索引](/blog/eventlog-scenarios)<br>
  按日常排查场景快速筛选启动、Activity、ANR、输入、网络和性能相关事件。

## Android 输入系统

- [Android 触摸事件：从 InputDispatcher 到 View 点击回调](/blog/input-dispatcher-to-view-click)<br>
  梳理触摸事件从系统输入分发进入应用主线程，最终触发 `OnClickListener` 的完整链路。

## Android Binder 系列

- [Android Binder 同步调用的优先级继承机制](/blog/binder-priority-inheritance)<br>
  解析同步事务中的线程优先级继承、调度策略限制和事务结束后的恢复过程。
- [Binder、Proxy、Stub 与 Binder 线程](/blog/android-binder-proxy-stub-thread)  
  从 AIDL 和 PackageManager 调用链理解跨进程调用的线程关系。
- [Binder.java 源码导读](/blog/android-binder-guide)  
  分析 Binder 本地对象、事务入口、调用身份和调试扩展。
- [IBinder.java 源码导读](/blog/android-ibinder-guide)  
  理解 Binder 对象的基础协议、死亡监听与生命周期管理。

::: tip 阅读建议
建议先阅读 Proxy、Stub 与 Binder 线程一文，再结合 `Binder.java` 和 `IBinder.java` 源码导读深入理解 Framework 实现。
:::
