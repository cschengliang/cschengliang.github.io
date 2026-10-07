import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'cschengliang Docs',
  description: '学习、记录与实践',
  base: '/docs/',
  outDir: '../docs',
  cleanUrls: false,
  lastUpdated: true,
  appearance: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#fdfdfb' }]
  ],
  themeConfig: {
    siteTitle: 'cschengliang',
    nav: [
      { text: '概述', link: '/' },
      { text: '文章', link: '/blog/' },
      { text: '实践记录', link: '/notes/overview' },
      { text: 'GitHub', link: 'https://github.com/cschengliang' }
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '概述', link: '/' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      },
      {
        text: '技术博客',
        items: [
          { text: '博客首页', link: '/blog/' },
          { text: 'Android EventLog 参考', link: '/blog/eventlogref' },
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
      copyright: '<a href="https://github.com/cschengliang">在 GitHub 上交流 ↗</a>'
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
