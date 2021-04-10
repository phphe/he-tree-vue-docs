const path = require('path');

module.exports = {
  base: '/',
  themeConfig: {
    repo: 'phphe/he-tree-vue',
    docsRepo: 'phphe/he-tree-vue-docs',
    docsDir: 'docs',
    editLinks: true,
    sidebarDepth: 2,
    locales: {
      '/': {
        label: 'English',
        sidebar: [
          '/guide',
          '/api',
          // '/transpile',
          '/buy_pro',
          '/donate',
          '/migration_guide',
        ],
        nav: [
          {text: 'Guide',link: '/guide'},
          {text: 'API',link: '/api'},
          {text: 'Buy Pro',link: '/buy_pro'},
          // {text: 'Donate',link: '/donate'},
          // {text: 'Blog',link: 'https://phphe.com'},
          {
            text: 'Old Versions',
            items: [
              { text: 'v1 Guide', link: '/v1/guide' },
              { text: 'v1 API', link: '/v1/api' },
            ]
          },
        ],
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        sidebar: [
          '/zh/guide',
          '/zh/api',
          // '/zh/transpile',
          '/zh/buy_pro',
          '/zh/donate',
          '/zh/migration_guide',
        ],
        nav: [
          {text: '教程',link: '/zh/guide'},
          {text: 'API',link: '/zh/api'},
          {text: '购买Pro',link: '/zh/buy_pro'},
          // {text: '打赏',link: '/zh/donate'},
          // {text: '博客',link: 'https://phphe.com'},
          {
            text: '旧版本',
            items: [
              { text: 'v1 教程', link: '/zh/v1/guide' },
              { text: 'v1 API', link: '/zh/v1/api' },
            ]
          },
        ],
      },
    },
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: 'he-tree-vue',
      description: 'A draggable sortable nested vue tree component.'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'he-tree-vue',
      description: '可拖拽可排序vue树形组件.'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@base': path.resolve(__dirname, '../')
      }
    }
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-155723570-1' // UA-00000000-0
      }
    ]
  ],
}
