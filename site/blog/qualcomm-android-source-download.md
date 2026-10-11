---
title: 高通安卓源码获取方法
description: 通过 CodeLinaro 获取高通 Android 平台源码，介绍仓库地址规律、完整克隆、指定 tag 的浅克隆与版本确认方法。
date: 2026-10-11
outline: deep
---

# 高通安卓源码获取方法

阅读高通 Android 平台的 Framework 实现时，可以从 CodeLinaro 获取对应的公开源码仓库。本文记录本次使用的两个地址，以及完整克隆和指定版本浅克隆的方法。

这里以 Android 16 的 `LA.QSSI.16.0.r5-01700-qssi.0` tag 为例。下载前先确认目标仓库中存在这个 tag；其他版本可替换为实际需要的 tag。

## 一、源码仓库地址

本次使用的两个仓库是：

- [frameworks/base](https://git.codelinaro.org/clo/la/platform/frameworks/base)：Java Framework、系统服务等源码。
- [frameworks/native](https://git.codelinaro.org/clo/la/platform/frameworks/native)：Native Framework、Binder、输入与图形系统等源码。

对应的 Git 克隆地址：

```text
https://git.codelinaro.org/clo/la/platform/frameworks/base.git
https://git.codelinaro.org/clo/la/platform/frameworks/native.git
```

这个平台命名空间下的仓库，通常可以按下面的规律查找：

```text
https://git.codelinaro.org/clo/la/platform/<AOSP 中的仓库路径>.git
```

例如 AOSP 中的 `system/core`，对应地址为：

```text
https://git.codelinaro.org/clo/la/platform/system/core.git
```

可以先打开 [system/core 仓库页面](https://git.codelinaro.org/clo/la/platform/system/core)确认仓库与版本。地址规律适合查找入口，但具体仓库是否公开、是否存在目标 tag，仍要逐个确认。

## 二、完整克隆后切换到指定 tag

需要查看提交历史、追踪代码变更或比较多个版本时，可以完整克隆仓库，再切换到目标 tag。

以 `frameworks/base` 为例：

```sh
git clone https://git.codelinaro.org/clo/la/platform/frameworks/base.git
cd base
git checkout LA.QSSI.16.0.r5-01700-qssi.0
```

在 Bash 或 PowerShell 7 中，也可以连成一行，前一步成功后才执行下一步：

```sh
git clone https://git.codelinaro.org/clo/la/platform/frameworks/base.git && cd base && git checkout LA.QSSI.16.0.r5-01700-qssi.0
```

Windows PowerShell 5.1 不支持 `&&`，可逐行执行上面的三条命令，并确认每一步成功后再继续。

默认克隆会获取仓库历史；Framework 仓库历史较多，下载时间和磁盘占用通常也较大。仅阅读一个版本时，可以使用下一节的浅克隆。

## 三、只获取一个版本：浅克隆

只需要目标版本的源码时，用 `--depth 1` 限制历史深度，再用 `-b` 指定 tag，通常能减少下载量和耗时。

以 `frameworks/native` 为例：

```sh
git clone --depth 1 -b LA.QSSI.16.0.r5-01700-qssi.0 https://git.codelinaro.org/clo/la/platform/frameworks/native.git
```

`frameworks/base` 也可以采用相同方式：

```sh
git clone --depth 1 -b LA.QSSI.16.0.r5-01700-qssi.0 https://git.codelinaro.org/clo/la/platform/frameworks/base.git
```

根据 [Git 官方文档](https://git-scm.com/docs/git-clone)，`-b` 可以指定分支或 tag，`--depth 1` 会截断提交历史。浅克隆仍然包含该版本的源码文件，主要省去较早的历史记录。

| 需求 | 获取方式 |
| --- | --- |
| 阅读一个版本的源码 | 指定 tag 的浅克隆 |
| 查看历史、追踪修改或比较多个版本 | 完整克隆 |

::: tip 在 tag 上阅读源码
检出 tag 后，Git 通常会提示处于 `detached HEAD` 状态，这是正常现象，可以直接阅读源码。需要修改并保存提交时，可先执行 `git switch -c study-android16` 创建工作分支。
:::

## 四、下载前后确认版本

下载前，可以查询远端是否存在指定 tag。以 `frameworks/native` 为例：

```sh
git ls-remote --exit-code --tags https://git.codelinaro.org/clo/la/platform/frameworks/native.git refs/tags/LA.QSSI.16.0.r5-01700-qssi.0
```

查询成功时，会输出对应的对象哈希和 tag 引用。如果没有匹配结果，应检查 tag 拼写和仓库中的版本列表；如果出现网络错误，则先处理连接问题。

下载完成后，进入对应目录确认当前版本：

```sh
cd native
git describe --tags --exact-match HEAD
git rev-parse HEAD
```

第一条 Git 命令用于确认当前提交对应的 tag，第二条用于记录提交哈希，方便之后复现源码阅读和调试过程。

多个仓库配合阅读时，分别确认它们的版本，不要让一个停在默认分支、另一个停在目标 tag。若某个仓库没有同名 tag，应根据该发布版本的 manifest 确认对应 revision。

## 五、获取范围

上面的命令分别下载 `frameworks/base` 和 `frameworks/native`，适合按模块阅读源码。它们并不构成完整的 Android 编译环境。

如果目标是编译整套系统，还需要对应版本的 manifest、其他源码仓库及相关依赖，按该版本的发布说明同步。本文的地址规律用于定位平台仓库，不表示全部设备相关或厂商私有代码都能通过这些公开地址获取。

## 参考链接

- [CodeLinaro frameworks/base](https://git.codelinaro.org/clo/la/platform/frameworks/base)
- [CodeLinaro frameworks/native](https://git.codelinaro.org/clo/la/platform/frameworks/native)
- [CodeLinaro system/core](https://git.codelinaro.org/clo/la/platform/system/core)
- [Git clone 官方文档](https://git-scm.com/docs/git-clone)
