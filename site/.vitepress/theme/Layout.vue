<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import { useData } from 'vitepress'
import { watch } from 'vue'

const { page, isDark } = useData()

function active(dir: string) {
  return page.value.relativePath.startsWith(`${dir}/`)
}

function toggleTheme() {
  isDark.value = !isDark.value
}

watch(isDark, (dark) => {
  if (typeof document === 'undefined') return
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#1a1918' : '#fdfdfb')
}, { immediate: true })
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-before>
      <div class="site-topbar">
        <a class="brand" href="/">
          <span class="brand-mark" aria-hidden="true">✳</span>
          <span>cschengliang</span>
          <span class="site-label">技术博客</span>
        </a>
        <nav class="site-topnav" aria-label="主导航">
          <a href="/">概述</a>
          <a href="/docs/blog/" :class="{ active: active('blog') }">文章</a>
          <a href="/docs/notes/overview.html" :class="{ active: active('notes') }">实践记录</a>
          <a href="https://github.com/cschengliang" target="_blank" rel="noreferrer">GitHub ↗</a>
          <button type="button" class="theme-toggle" :aria-pressed="isDark" :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'" @click="toggleTheme">{{ isDark ? '浅色' : '深色' }}</button>
          <a class="docs-button" href="/docs/">进入文档 →</a>
        </nav>
      </div>
    </template>
    <template #sidebar-nav-after>
      <p class="sidebar-note">学习、记录与实践。<br>把问题读懂，把过程记下来。</p>
    </template>
  </DefaultTheme.Layout>
</template>
