# 技术博客

这里记录 Android Framework、Binder IPC 和系统源码阅读过程中的理解与实践。

## Android Binder 系列

- [Binder、Proxy、Stub 与 Binder 线程](/blog/android-binder-proxy-stub-thread)  
  从 AIDL 和 PackageManager 调用链理解跨进程调用的线程关系。
- [Binder.java 源码导读](/blog/android-binder-guide)  
  分析 Binder 本地对象、事务入口、调用身份和调试扩展。
- [IBinder.java 源码导读](/blog/android-ibinder-guide)  
  理解 Binder 对象的基础协议、死亡监听与生命周期管理。

::: tip 阅读建议
建议先阅读 Proxy、Stub 与 Binder 线程一文，再结合 `Binder.java` 和 `IBinder.java` 源码导读深入理解 Framework 实现。
:::
