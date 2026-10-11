---
title: 高通安卓源码获取方法
description: 高通 Android 源码仓库地址，以及完整克隆和指定版本浅克隆的方法。
date: 2026-10-11
outline: deep
---

# 高通安卓源码获取方法

高通 Android 的公开平台源码可以从 CodeLinaro 获取。下面以 Android 16 的 `LA.QSSI.16.0.r5-01700-qssi.0` tag 为例。

## 仓库地址

```text
https://git.codelinaro.org/clo/la/platform/frameworks/base.git
https://git.codelinaro.org/clo/la/platform/frameworks/native.git
```

## 完整克隆

先下载仓库，再切换到指定 tag：

```sh
git clone https://git.codelinaro.org/clo/la/platform/frameworks/base.git
cd base
git checkout LA.QSSI.16.0.r5-01700-qssi.0
```

完整克隆保留提交历史，适合追踪代码修改或比较不同版本。

## 浅克隆

只需要这一个版本时，浅克隆通常更快，也更省空间：

```sh
git clone --depth 1 -b LA.QSSI.16.0.r5-01700-qssi.0 https://git.codelinaro.org/clo/la/platform/frameworks/native.git
```

`--depth 1` 只获取一层提交历史，`-b` 指定要下载的分支或 tag。下载 `frameworks/base` 时，把地址末尾的 `frameworks/native.git` 换成 `frameworks/base.git` 即可。

## 其他仓库

这个命名空间下的仓库地址通常是固定前缀加上 AOSP 仓库路径：

```text
https://git.codelinaro.org/clo/la/platform/<AOSP 仓库路径>.git
```

例如 `system/core`：

```text
https://git.codelinaro.org/clo/la/platform/system/core.git
```

下载其他仓库或版本时，先确认仓库中存在需要的 tag。
