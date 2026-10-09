import { defineConfig, type HeadConfig } from 'vitepress'

const SITE_HOST = 'https://cschengliang.github.io'
const DOCS_HOST = `${SITE_HOST}/docs/`
const SITE_DESCRIPTION =
  'cschengliang 的技术博客，记录 Android Framework、Binder IPC、输入系统与源码阅读实践。'

function docsPageUrl(relativePath: string) {
  if (relativePath === 'index.md') return DOCS_HOST
  if (relativePath.endsWith('/index.md')) {
    return `${DOCS_HOST}${relativePath.slice(0, -'index.md'.length)}`
  }
  return `${DOCS_HOST}${relativePath.replace(/\.md$/, '.html')}`
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'cschengliang Docs',
  description: SITE_DESCRIPTION,
  base: '/docs/',
  outDir: '../docs',
  cleanUrls: false,
  lastUpdated: true,
  appearance: true,
  sitemap: {
    hostname: DOCS_HOST
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#fdfdfb' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'cschengliang Docs' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary' }]
  ],
  transformHead({ pageData }) {
    const title = pageData.title || 'cschengliang Docs'
    const description = pageData.description || SITE_DESCRIPTION
    const url = docsPageUrl(pageData.relativePath)
    const isIndex =
      pageData.relativePath === 'index.md' ||
      pageData.relativePath.endsWith('/index.md')
    const tags: HeadConfig[] = [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:type', content: isIndex ? 'website' : 'article' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['link', { rel: 'canonical', href: url }]
    ]
    return tags
  },
  themeConfig: {
    siteTitle: 'cschengliang',
    nav: [
      { text: '概述', link: '/' },
      { text: '文章', link: '/blog/' },
      { text: '实践记录', link: '/notes/overview' },
      { text: '关于', link: '/about' },
      { text: 'GitHub', link: 'https://github.com/cschengliang' }
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '概述', link: '/' },
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '关于', link: '/about' }
        ]
      },
      {
        text: '技术博客',
        items: [
          { text: '博客首页', link: '/blog/' },
          {
            text: 'Android EventLog 参考',
            link: '/blog/eventlogref',
            collapsed: false,
            items: [
              { text: 'Activity / Window / 进程', link: '/blog/eventlogref-activity' },
              { text: 'Automotive / Car', link: '/blog/eventlogref-automotive' },
              { text: 'Security / Telephony / 连接', link: '/blog/eventlogref-security' },
              { text: 'UI / Input / Notification', link: '/blog/eventlogref-ui' },
              { text: 'Framework Core / Runtime', link: '/blog/eventlogref-framework' }
            ]
          },
          { text: 'Android EventLog 场景索引', link: '/blog/eventlog-scenarios' },
          { text: 'SurfaceControlRegistry 调试指南', link: '/blog/surfacecontrol-registry-debugging' },
          { text: '触摸事件：InputDispatcher 到 View', link: '/blog/input-dispatcher-to-view-click' },
          { text: 'Binder 同步调用优先级继承', link: '/blog/binder-priority-inheritance' },
          { text: 'Binder：Proxy、Stub 与线程', link: '/blog/android-binder-proxy-stub-thread' },
          { text: 'Binder.java 源码导读', link: '/blog/android-binder-guide' },
          { text: 'IBinder.java 源码导读', link: '/blog/android-ibinder-guide' }
        ]
      },
      {
        text: '实践记录',
        items: [
          { text: '记录说明', link: '/notes/overview' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    footer: {
      message: '© 2026 cschengliang',
      copyright: '<a href="/docs/about.html">关于</a> · <a href="https://github.com/cschengliang">在 GitHub 上交流 ↗</a>'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新于'
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    langMenuLabel: '语言'
  }
})
