import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import container from 'markdown-it-container'
import { rewrites } from './rewrites.mts'
import { zhSidebar, enSidebar } from './sidebar.mts'

// 站点 URL（sitemap / editor 内嵌帮助链接基准）
export const SITE_URL = 'https://www.rulego.cc'

// rewrites 用函数形式做精确匹配：对象形式经 path-to-regexp 匹配，
// 对含中文/多级路径的键存在漏配（表现为死链），函数形式无此问题
function resolveRewrite(id: string): string {
  return rewrites[id] || id
}

// MiniSearch 中文分词：英文按词切 + CJK 二元切分（bigram），
// 否则中文查询只能整句命中。索引与查询共用同一 tokenizer。
function tokenize(text: string): string[] {
  const tokens: string[] = []
  for (const w of text.split(/[^\p{L}\p{N}]+/u)) {
    if (w) tokens.push(w.toLowerCase())
  }
  const cjk = text.match(/[\u3400-\u9fff\uf900-\ufaff]+/g) || []
  for (const seg of cjk) {
    if (seg.length === 1) tokens.push(seg)
    else for (let i = 0; i < seg.length - 1; i++) tokens.push(seg.slice(i, i + 2))
  }
  return tokens
}

// 注意：VitePress 导航项「link 与 items 互斥」——带 link 的渲染为平铺链接，
// 只有纯 items 的项才是下拉组。下拉组标题不可点击，靠 activeMatch 高亮。
const zhNav = [
  { text: '首页', link: '/' },
  {
    text: '指南',
    activeMatch: '^/(pages/(introduction|rule-chain|standard-components|extension-overview|custom-components-overview|visualization-overview|rulego-server|aop-overview|trigger-overview|config|performance)/)?$',
    items: [
      { text: '快速入门', link: '/pages/introduction/' },
      { text: '规则链', link: '/pages/rule-chain/' },
      { text: '标准组件', link: '/pages/standard-components/' },
      { text: '扩展组件', link: '/pages/extension-overview/' },
      { text: '自定义组件', link: '/pages/custom-components-overview/' },
      { text: '可视化', link: '/pages/visualization-overview/' },
      { text: 'RuleGo-Server', link: '/pages/rulego-server/' },
      { text: 'AOP', link: '/pages/aop-overview/' },
      { text: '触发器', link: '/pages/trigger-overview/' },
      { text: '高级主题', link: '/pages/config/' },
      { text: '性能', link: '/pages/performance/' },
    ],
  },
  {
    text: '组件',
    activeMatch: '^/(pages/(standard-components|extension-overview|ai-agent|iot-overview|streamsql-overview|marketplace)/)?$',
    items: [
      { text: '标准组件', link: '/pages/standard-components/' },
      { text: '扩展组件', link: '/pages/extension-overview/' },
      { text: 'AI 智能体组件', link: '/pages/ai-agent/' },
      { text: 'IoT 工业协议组件', link: '/pages/iot-overview/' },
      { text: '流式计算', link: '/pages/streamsql-overview/' },
      { text: '组件市场', link: '/pages/marketplace/' },
    ],
  },
  {
    text: 'Endpoint',
    activeMatch: '^/pages/endpoint-',
    items: [
      { text: '概述', link: '/pages/endpoint-overview/' },
      { text: '快速入门', link: '/pages/endpoint-quickstart/' },
      { text: '路由', link: '/pages/endpoint-router/' },
      { text: 'DSL', link: '/pages/endpoint-dsl/' },
      { text: 'API', link: '/pages/endpoint-api/' },
      { text: 'Options', link: '/pages/endpoint-options/' },
      { text: '组件', link: '/pages/endpoint-extension/' },
    ],
  },
  { text: '编辑器', link: 'https://app.rulego.cc/' },
  {
    text: '生态',
    activeMatch: '^/(ecosystem/|pages/(streamsql-overview|ai-agent-overview)/)',
    items: [
      { text: '生态总览', link: '/ecosystem/' },
      { text: '🌊 StreamSQL', link: '/pages/streamsql-overview/' },
      { text: '🤖 智能体框架', link: '/pages/ai-agent-overview/' },
      { text: '🦀 TPCLAW 智能体平台', link: 'https://tpclaw.teambuf.com/' },
      { text: '🀄 GFlow 审批工作流', link: 'https://gflow.rulego.cc/' },
      { text: '🎨 可视化编辑器', link: 'https://editor.rulego.cc/' },
      { text: '更新日志', link: 'https://github.com/rulego/rulego/blob/main/doc/CHANGELOG.md' },
    ],
  },
  { text: '社区', link: '/pages/community/' },
  {
    text: '支持',
    activeMatch: '^/pages/(support|faq)/',
    items: [
      { text: '支持 RuleGo', link: '/pages/support/' },
      { text: '常见问题', link: '/pages/faq/' },
    ],
  },
]

const enNav = [
  { text: 'Home', link: '/en/' },
  {
    text: 'Document',
    activeMatch: '^/en/pages/(introduction|rule-chain|standard-components|extension-overview|custom-components-overview|visualization-overview|rulego-server|aop-overview|trigger-overview|config|performance)/',
    items: [
      { text: 'Quick Start', link: '/en/pages/introduction/' },
      { text: 'Rule Chain', link: '/en/pages/rule-chain/' },
      { text: 'Standard Components', link: '/en/pages/standard-components/' },
      { text: 'Extension Components', link: '/en/pages/extension-overview/' },
      { text: 'Custom Components', link: '/en/pages/custom-components-overview/' },
      { text: 'Visualization', link: '/en/pages/visualization-overview/' },
      { text: 'RuleGo-Server', link: '/en/pages/rulego-server/' },
      { text: 'AOP', link: '/en/pages/aop-overview/' },
      { text: 'Trigger', link: '/en/pages/trigger-overview/' },
      { text: 'Advanced Topics', link: '/en/pages/config/' },
      { text: 'Performance', link: '/en/pages/performance/' },
    ],
  },
  {
    text: 'Components',
    activeMatch: '^/en/pages/(standard-components|extension-overview|marketplace)/',
    items: [
      { text: 'Standard Components', link: '/en/pages/standard-components/' },
      { text: 'Extension Components', link: '/en/pages/extension-overview/' },
      { text: 'Components Marketplace', link: '/en/pages/marketplace/' },
    ],
  },
  {
    text: 'Endpoint',
    activeMatch: '^/en/pages/endpoint-',
    items: [
      { text: 'Overview', link: '/en/pages/endpoint-overview/' },
      { text: 'Quick Start', link: '/en/pages/endpoint-quickstart/' },
      { text: 'Routing', link: '/en/pages/endpoint-router/' },
      { text: 'DSL', link: '/en/pages/endpoint-dsl/' },
      { text: 'API', link: '/en/pages/endpoint-api/' },
      { text: 'Options', link: '/en/pages/endpoint-options/' },
      { text: 'Components', link: '/en/pages/endpoint-extension/' },
    ],
  },
  { text: 'Editor', link: 'https://app.rulego.cc/en' },
  {
    text: 'Ecosystem',
    activeMatch: '^/(ecosystem/|en/pages/(streamsql-overview|ai-agent-overview)/)',
    items: [
      { text: 'Ecosystem Overview', link: '/ecosystem/' },
      { text: 'StreamSQL', link: '/en/pages/streamsql-overview/' },
      { text: 'AI Agent Framework', link: '/en/pages/ai-agent-overview/' },
      { text: 'TPCLAW Agent Platform', link: 'https://tpclaw.teambuf.com/' },
      { text: 'Changelog', link: 'https://github.com/rulego/rulego/blob/main/doc/CHANGELOG.md' },
    ],
  },
  { text: 'Support', link: '/en/pages/support/' },
]

export default withMermaid(
  defineConfig({
    // srcDir 由 CLI 参数 `vitepress build docs` 指定，勿在 config 重复设置（会叠加成 docs/docs）
    base: '/',
    cleanUrls: true,
    rewrites: resolveRewrite,

    // 死链校验开启；本地演示地址（http://localhost:9090/editor 等）豁免
    ignoreDeadLinks: 'localhostLinks',

    lastUpdated: true,

    locales: {
      root: {
        label: '简体中文',
        lang: 'zh-CN',
        title: 'RuleGo',
        description: 'RuleGo 是基于 Go 语言的轻量级、高性能、嵌入式、新一代组件编排规则引擎。',
        themeConfig: {
          nav: zhNav,
          sidebar: { '/pages/': zhSidebar },
        },
      },
      en: {
        label: 'English',
        lang: 'en-US',
        title: 'RuleGo',
        description:
          'RuleGo is a lightweight, high-performance, embedded, next-generation component orchestration rule engine for Go.',
        themeConfig: {
          nav: enNav,
          sidebar: { '/en/pages/': enSidebar },
        },
      },
    },

    head: [
      ['link', { rel: 'icon', href: '/img/favicon.ico' }],
      [
        'meta',
        {
          name: 'keywords',
          content:
            'rulego官网,官方文档,规则引擎,规则链,golang,go语言,编排式,热部署,数据集成,IoT,物联网平台,组件化,流程自动化,自动化引擎,应用集成,事件框架',
        },
      ],
      ['meta', { name: 'baidu-site-verification', content: 'codeva-CeSVuVg1hy' }],
      ['meta', { name: 'theme-color', content: '#00a86b' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.loli.net' }],
      [
        'link',
        {
          rel: 'stylesheet',
          href: 'https://fonts.loli.net/css2?family=JetBrains+Mono:wght@400;600&display=swap',
        },
      ],
      // 百度统计（原 vuepress-plugin-baidu-tongji，hm 码不变）
      [
        'script',
        {},
        `var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?c82fc91a8f5065d1a642ee729cd6b7f1";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();`,
      ],
      // 百度自动推送（原 vuepress-plugin-baidu-autopush）
      ['script', { async: '', src: 'https://push.zhanzhang.baidu.com/push.js' }],
    ],

    sitemap: { hostname: SITE_URL },

    markdown: {
      lineNumbers: true,
      config(md) {
        // vdoing 自定义容器：::: center（居中图注/图片）
        md.use(container, 'center', {
          render(tokens: any[], idx: number) {
            return tokens[idx].nesting === 1 ? '<div class="md-center">' : '</div>'
          },
        })
      },
    },

    themeConfig: {
      logo: '/img/logo.png',
      socialLinks: [
        { icon: 'github', link: 'https://github.com/rulego/rulego' },
        {
          icon: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.58 2 2.25 6.58 2.25 12s4.33 10 9.75 10 9.75-4.58 9.75-10S17.42 2 12 2m4.94 14.22c-.2.5-.84.96-1.36 1.08-.36.08-.82.12-1.34-.06-.3-.1-.7-.22-1.2-.44-2.12-.92-3.5-3.04-3.6-3.18-.1-.14-.86-1.14-.86-2.18 0-1.04.54-1.56.74-1.76.2-.2.42-.26.56-.26h.4c.14 0 .3 0 .46.36.18.42.6 1.46.66 1.56.06.1.1.22.02.36-.08.14-.14.24-.28.38-.14.14-.28.3-.4.4-.14.14-.28.28-.12.56.16.28.72 1.18 1.54 1.92 1.06.94 1.96 1.24 2.24 1.38.28.14.44.12.6-.08.16-.2.7-.8.88-1.08.18-.28.36-.24.62-.14.24.08 1.5.7 1.76.84.26.12.44.2.5.3.06.12.06.6-.14 1.1"/></svg>',
          },
          link: 'https://gitee.com/rulego/rulego',
          ariaLabel: 'Gitee',
        },
      ],
      footer: {
        message: 'RuleGo 基于 Apache-2.0 许可开源',
        copyright: 'Copyright © 2023-present RuleGo Team',
      },
      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
            modal: {
              displayDetails: '显示详细列表',
              resetButtonTitle: '清除查询条件',
              backButtonTitle: '关闭',
              noResultsText: '无法找到相关结果',
              footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
            },
          },
          miniSearch: {
            options: { tokenize },
            searchOptions: { fuzzy: 0.2, prefix: true },
          },
        },
      },
      outline: { label: '页面导航', level: [2, 3] },
      docFooter: { prev: '上一页', next: '下一页' },
      lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'short', timeStyle: 'short' } },
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '菜单',
      darkModeSwitchLabel: '主题',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',
      externalLinkIcon: true,
      editLink: {
        pattern: 'https://github.com/rulego/rulego-doc/edit/main/docs/:path',
        text: '在 GitHub 上编辑此页',
      },
    },

    mermaid: {
      // 两种外观下都可读的中性主题；深色模式由客户端 Mermaid 组件处理
      theme: 'default',
    },
  }),
)
