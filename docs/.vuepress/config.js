const path = require('path');

module.exports = {
  base: '/he-tree-vue/',
  // ga: 'google analytics ID',
  themeConfig: {
    sidebarDepth: 2,
    locales: {
      '/': {
        label: 'English',
        sidebar: [
          '/guide',
          '/api',
          '/buy_pro',
          '/donate',
        ],
        nav: [
          {text: 'Guide',link: '/guide'},
          {text: 'API',link: '/api'},
          {text: 'Buy Pro',link: '/buy_pro'},
          {text: 'Donate',link: '/donate'},
          {text: 'Github',link: 'todo'},
        ],
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        sidebar: [
          '/zh/guide',
          '/zh/api',
          '/zh/buy_pro',
          '/zh/donate',
        ],
        nav: [
          {text: '教程',link: '/zh/guide'},
          {text: 'API',link: '/zh/api'},
          {text: '购买Pro',link: '/zh/buy_pro'},
          {text: '打赏',link: '/zh/donate'},
          {text: 'Github',link: 'todo'},
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
      description: '可拖拽可排序vue树组件.'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@base': path.resolve(__dirname, '../')
      }
    }
  },
}
