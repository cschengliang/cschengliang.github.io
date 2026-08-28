# 快速开始

欢迎来到我的文档站。

这个站点用于整理学习笔记、技术实践和项目记录。内容会随着学习过程持续更新。

## 浏览文档

使用页面顶部导航或左侧目录访问不同内容。在移动设备上，可以通过菜单按钮展开导航。

## 编写内容

文档源文件位于仓库的 `site/` 目录。新增 Markdown 文件后，将它加入 VitePress 侧边栏即可。

```text
site/
├── .vitepress/
│   └── config.mts
├── guide/
│   └── getting-started.md
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
