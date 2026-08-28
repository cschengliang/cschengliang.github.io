# 快速开始

欢迎来到 `cschengliang Docs`。

这个站点用于整理学习笔记、技术实践和项目记录。整体采用面向文档的布局：顶部导航切换主题，左侧侧栏浏览页面，右侧目录定位章节。

## 浏览文档

从左侧选择页面，或使用顶部搜索框查找内容。在移动设备上，导航会收纳到菜单中。

## 文档结构

源文件位于仓库的 `site/` 目录，构建结果输出到 `docs/` 目录。

```text
site/
├── .vitepress/
│   └── config.mts
├── guide/
│   └── getting-started.md
├── notes/
│   └── overview.md
└── index.md
```

## 本地开发

安装依赖并启动开发服务器：

```bash
npm install
npm run docs:dev
```

## 构建网站

```bash
npm run docs:build
```

构建结果会输出到仓库的 `docs/` 目录，并通过 GitHub Pages 的 `/docs/` 路径访问。

::: warning 发布提示
如果修改了文档源文件，需要重新构建 `docs/` 后再提交，GitHub Pages 才会显示最新内容。
:::
