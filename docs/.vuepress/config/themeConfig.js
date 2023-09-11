const nav = require("./nav.js");
const htmlModules = require("./htmlModules.js");

// Theme Config
module.exports = {
  nav,
  sidebarDepth: 2,
  logo: "/img/logo.png",
  repo: "rulego/rulego",
  searchMaxSuggestions: 10,
  lastUpdated: "上次更新",

  docsRepo: "rulego/rulego-doc",
  docsDir: "docs",
  docsBranch: "master",
  editLinks: true,
  editLinkText: "帮助我们改善此页面！",

  // Vdoing Theme Config
  sidebar: { mode: "structuring", collapsable: true },

  updateBar: {
    showToArticle: false
  },

  category: false,
  tag: false,
  archive: true,

  author: {
    name: 'rulego-team', // 必需
    link: 'https://github.com/rulego', // 可选的
  },

  social: {
    icons: [
      {
        iconClass: "icon-github",
        title: "GitHub",
        link: "https://github.com/rulego"
      },
      {
        iconClass: "icon-gitee",
        title: "Gitee",
        link: "https://gitee.com/rulego"
      },
      {
        iconClass: "icon-youjian",
        title: "发邮件",
        link: "mailto:rulego@outlook.com"
      }
    ]
  },

  footer: {
    createYear: 2023,
    copyrightInfo: [
      '<a href="http://rulego/rulego.com" target="_blank" style="font-weight:bold">RuleGo Team</a>',
      ' | ',
      'Apache 2.0 License',
      // '<a href="http://beian.miit.gov.cn/" target=_blank></a>',

      '</p>'
    ].join('')
  },

  htmlModules
};
