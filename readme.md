# cschengliang.github.io

这是 `cschengliang` 的 GitHub Pages 文档站点，使用 VitePress 构建。

站点地址：<https://cschengliang.github.io/docs/>

根路径 `/` 是手写首页 `index.html`；`/docs/` 是 VitePress 站点。发布由 GitHub Actions 构建并部署，不再从 `main` 分支根目录直接托管仓库文件。

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

构建 VitePress 站点：

```powershell
npm.cmd run docs:build
```

构建产物写入本地 `docs/`（已 gitignore，不要提交）。需要检查最终上线目录时，再组装 Pages 产物：

```powershell
npm.cmd run pages:assemble
```

`_site/` 中包含首页、favicon、`robots.txt` 和构建后的 `docs/`。

## 新增文章

1. 将 Markdown 文件放到 `site/blog/`，保留原文内容；文件开头添加 VitePress
   frontmatter（至少包含 `title` 和 `description`）。
2. 在 `site/blog/index.md` 增加文章入口，并在
   `site/.vitepress/config.mts` 的博客 sidebar 中增加导航项。
3. 如果文章引用本机 AOSP 源码，将本地路径改为可访问的
   `android.googlesource.com` 链接；不要把整套 AOSP 源码复制进本站。
4. 执行 `npm.cmd run docs:build`，确认构建成功。
5. 提交源文件并推送到 `main`（不要提交 `docs/`）：

   ```powershell
   git add site readme.md
   git commit -m "Publish <文章标题>"
   git push origin main
   ```

GitHub Actions 会在推送到 `main` 后构建并部署。仓库 Settings → Pages 的 Source
必须是 **GitHub Actions**，而不是 “Deploy from a branch”。

## Agent 操作约定

- 先运行 `git status --short --branch`，保留工作区中与当前任务无关的修改。
- 不要擅自改写文章正文；只添加必要的 frontmatter、入口和导航。
- 构建出现代码高亮回退或 chunk 体积提示时通常不影响发布；只有构建失败才需要
  停止并处理错误。
- 推送前检查提交内容只包含本次源文件，不要加入 `docs/`、`_site/` 或 `.idea/`。
