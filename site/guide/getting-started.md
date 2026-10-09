---
title: 快速开始
description: 说明本站的文档结构、本地预览方式和 GitHub Pages 发布流程。
---

# 快速开始

欢迎来到 `cschengliang Docs`。

这个站点用于整理学习笔记、技术实践和项目记录。整体采用面向文档的布局：顶部导航切换主题，左侧侧栏浏览页面，右侧目录定位章节。

## 浏览文档

从左侧选择页面，或使用顶部搜索框查找内容。

## 文档结构

Markdown 源文件位于仓库的 `site/` 目录。构建结果由 GitHub Actions 生成，不会提交到 git。

```text
site/
├── .vitepress/
│   └── config.mts
├── blog/
├── guide/
│   └── getting-started.md
├── notes/
│   └── overview.md
├── about.md
└── index.md
```

## 本地开发

安装依赖并启动开发服务器：

```bash
npm ci
npm run docs:dev
```

## 构建网站

```bash
npm run docs:build
```

构建结果会输出到仓库根目录的 `docs/`（本地产物，已 gitignore）。GitHub Pages 由 Actions 组装后发布：根路径是手写首页，`/docs/` 是 VitePress 站点。

::: warning 发布提示
推送到 `main` 后，GitHub Actions 会构建并部署。仓库 Settings → Pages 的 Source 需要设为 GitHub Actions。
:::
