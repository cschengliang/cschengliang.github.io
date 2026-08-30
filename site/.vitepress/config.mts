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
    ['link', { rel: 'icon', href: '/favicon.svg' }]
  ],
  themeConfig: {
    siteTitle: 'cschengliang Docs',
    logo: '/favicon.svg',
    nav: [
      { text: '概述', link: '/' },
      { text: '开始使用', link: '/guide/getting-started' },
      { text: '博客', link: '/blog/' },
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
          { text: '触摸事件：InputDispatcher 到 View', link: '/blog/input-dispatcher-to-view-click' },
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cschengliang' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026 cschengliang'
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
