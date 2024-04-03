import { defineConfig } from 'vitepress'

export default defineConfig({
  // lang: 'en-US',
  title: 'Vitepress',
  description: '一个基于 Vitepress 的主题插件，集成评论Waline、Live2D看板娘。',

  lastUpdated: true,
  cleanUrls: 'without-subfolders',

  // base: '/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['script', { src: '/live2d.js' }],
    // ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]
  ],

  markdown: {
    headers: {
      level: [0, 0]
    },

    // options for markdown-it-anchor
    anchor: { permalink: false },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
  },

  vite: {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    }
  },

  themeConfig: {
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    logo: '/logo.svg',

    // nav
    nav: [
      { text: '文档', link: '/guide/' }
    ],

    // sidebar
    sidebar: { '/guide/': [
        {
          text: '文档',
          collapsible: false,
          items: [
            {
              text: '指南',
              link: '/guide/'
            },
            {
              text: '组件',
              link: '/guide/card'
            }
          ]
        }
      ]
    },

    editLink: {
      pattern: 'https://github.com/xinlei3166/vitepress-theme-website/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xinlei3166/vitepress-theme-website' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present 君惜'
    }
  }
})
