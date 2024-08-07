const head = require('./config/head.js'); // 广告插件检测
const themeConfig = require('./config/themeConfig.js');
const plugins = require('./config/plugins.js');

module.exports = {

  theme: 'vdoing', // 使用依赖包主题
  title: "RuleGo",
  description: 'RuleGo是一个基于Go语言、轻量级、高性能、嵌入式、新一代组件编排规则引擎',
  base: "/",
  head,
  themeConfig,
  plugins,

  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },

  // 监听文件变化并重新构建
  extraWatchFiles: [
    '.vuepress/config.js',
    '.vuepress/config/head.js',
    '.vuepress/config/htmlModules.js',
    '.vuepress/config/nav.js',
    '.vuepress/config/plugins.js',
    '.vuepress/config/themeConfig.js',
  ],
  locales: {
    '/en/': {
      lang: 'en-US',
      title: 'RuleGo',
      description: 'RuleGo is a lightweight, high-performance, embedded, next-generation component orchestration rule engine framework for Go.'
    },
    '/': {
      lang: 'zh-CN',
      title: "RuleGo",
      description: 'RuleGo 是基于Go语言的轻量级、高性能、嵌入式、新一代组件编排规则引擎。'
    }
  }
}