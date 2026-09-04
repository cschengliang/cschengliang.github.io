# cschengliang.github.io

这是 `cschengliang` 的 GitHub Pages 文档站点，使用 VitePress 构建。

站点地址：<https://cschengliang.github.io/docs/>

## 克隆后开始使用

```powershell
gh repo clone cschengliang/cschengliang.github.io
cd cschengliang.github.io
npm.cmd ci --ignore-scripts --no-audit --no-fund
```

本项目在 Windows PowerShell 中使用 `npm.cmd`，不要使用可能被执行策略拦截的
`npm.ps1`。需要 Node.js 和 npm 已经安装。

## 本地预览和构建

启动开发服务器（修改文件后会自动刷新）：

```powershell
npm.cmd run docs:dev
```

构建 GitHub Pages 发布文件：

```powershell
npm.cmd run docs:build
```

构建完成后，产物会写入仓库根目录的 `docs/`。本仓库的 Pages 发布源是 `main`
分支根目录，因此提交时要同时提交 `site/` 和构建生成的 `docs/`。

## 新增文章

1. 将 Markdown 文件放到 `site/blog/`，保留原文内容；文件开头添加 VitePress
   frontmatter（至少包含 `title` 和 `description`）。
2. 在 `site/blog/index.md` 增加文章入口，并在
   `site/.vitepress/config.mts` 的博客 sidebar 中增加导航项。
3. 如果文章引用本机 AOSP 源码，将本地路径改为可访问的
   `android.googlesource.com` 链接；不要把整套 AOSP 源码复制进本站。
4. 执行 `npm.cmd run docs:build`，确认构建成功。
5. 提交并推送：

   ```powershell
   git add site docs readme.md
   git commit -m "Publish <文章标题>"
   git push origin main
   ```

GitHub Pages 会从 `main` 分支根目录的 `docs/` 文件发布。`docs/` 是构建产物，
不要直接手工编辑；需要更新页面时修改 `site/` 后重新构建。

## Agent 操作约定

- 先运行 `git status --short --branch`，保留工作区中与当前任务无关的修改。
- 不要擅自改写文章正文；只添加必要的 frontmatter、入口和导航。
- 构建出现代码高亮回退或 chunk 体积提示时通常不影响发布；只有构建失败才需要
  停止并处理错误。
- 推送前检查提交内容只包含本次文章和对应的构建产物。
