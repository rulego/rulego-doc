const loveMe = require("./../plugins/love-me");

// Plugin Config
module.exports = [
  // 全文搜索。 ⚠️注意：此插件会在打开网站时多加载部分js文件用于搜索，导致初次访问网站变慢。如在意初次访问速度的话可以不使用此插件！（推荐：vuepress-plugin-thirdparty-search）
  'fulltext-search',
  // 搜索框第三方搜索
  // [
  //   "thirdparty-search",
  //   {
  //     thirdparty: [
  //       {
  //         title: "在GitHub中搜索",
  //         frontUrl: "https://github.com/search?q=",
  //         behindUrl: ""
  //       },
  //       {
  //         title: "在Google中搜索",
  //         frontUrl: "https://www.google.com/search?q="
  //       },
  //       {
  //         title: "在Baidu中搜索",
  //         frontUrl: "https://www.baidu.com/s?wd="
  //       }
  //     ]
  //   }
  // ],
  // 百度统计
  [
    "vuepress-plugin-baidu-tongji",
    {
      hm: "c82fc91a8f5065d1a642ee729cd6b7f1"
    }
  ],
  // 百度 SEO 优化
  ["vuepress-plugin-baidu-autopush", {}],
  // 代码块复制
  ['one-click-copy', { // 代码块复制按钮
    copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
    copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
    duration: 1000, // prompt message display time.
    showInMobile: false // whether to display on the mobile side, default: false.
  }],
  [
    'demo-block', // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
    {
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://fastly.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false, // 是否展示为横向样式
      },
    },
  ],
  // 图片缩放
  [
    "vuepress-plugin-zooming",
    {
      selector: ".theme-vdoing-content img:not(.no-zoom)",
      options: {
        bgColor: "rgba(0,0,0,0.6)"
      }
    }
  ],
  // "上次更新"时间格式
  [
    "@vuepress/last-updated",
    {
      transformer: (timestamp, lang) => {
        const dayjs = require("dayjs"); // https://day.js.org/
        return dayjs(timestamp).format("YYYY/MM/DD, HH:mm:ss");
      }
    }
  ],
  // 网站地图
  [
    "sitemap",
    {
      hostname: 'https://rulego.cc',
    },
  ],
];
