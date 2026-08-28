import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'cschengliang Docs',
  description: '学习、记录与实践',
  base: '/docs/',
  outDir: '../docs',
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,
  head: [
    ['link', { rel: 'icon', href: '/docs/favicon.svg' }]
  ],
  themeConfig: {
    siteTitle: 'cschengliang Docs',
    logo: '/docs/favicon.svg',
    nav: [
      { text: '概述', link: '/' },
      { text: '开始使用', link: '/guide/getting-started' },
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
