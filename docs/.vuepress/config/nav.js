module.exports = [
  { text: "🏠首页", link: "/" },
  {
    text: "🧭指南",
    link: "/pages/introduction/",
    items: [
      { text: "快速入门", link: "/pages/introduction/" },
      { text: "规则链", link: "/pages/rule-chain/" },
      { text: "标准组件", link: "/pages/standard-components/" },
      { text: "扩展组件", link: "/pages/extension-overview/" },
      { text: "自定义组件", link: "/pages/custom-components-overview/" },
      { text: "可视化", link: "/pages/visualization-overview/" },
      { text: "RuleGo-Server", link: "/pages/rulego-server/" },
      { text: "AOP", link: "/pages/aop-overview/" },
      { text: "触发器", link: "/pages/trigger-overview/" },
      { text: "高级主题", link: "/pages/config/" },
      { text: "性能", link: "/pages/performance/" },
    ]
  },
  {
    text: "🧩组件",
    link: "/pages/standard-components/",
    items: [
      { text: "标准组件", link: "/pages/standard-components/" },
      { text: "扩展组件", link: "/pages/extension-overview/" },
      { text: "自定义组件", link: "/pages/custom-components-overview/" },
      { text: "流式计算", link: "/pages/streamsql-overview/" },
      { text: "组件市场", link: "/pages/marketplace/" },
    ]
  },
  {
    text: "📬Endpoint",
    link: "/pages/endpoint-overview/",
    items: [
      { text: "概述", link: "/pages/endpoint-overview/" },
      { text: "快速入门", link: "/pages/endpoint-quickstart/" },
      { text: "路由", link: "/pages/endpoint-router/" },
      { text: "DSL", link: "/pages/endpoint-dsl/" },
      { text: "API", link: "/pages/endpoint-api/" },
      { text: "Options", link: "/pages/endpoint-options/" },
      { text: "组件", link: "/pages/endpoint-extension/" }
    ]
  },
  { text: "🔥编辑器", link: "https://app.rulego.cc" },
  {
    text: "🍭生态",
    link: "#1",
    items: [
      { text: "可视化编辑器", link: "https://editor.rulego.cc/" },
      { text: "RuleGo-Server", link: "https://gitee.com/rulego/rulego/tree/main/server" },
      { text: "🌊StreamSQL", link: "/pages/streamsql-overview/" },
      { text: "🤖智能体框架", link: "/pages/ai-agent-overview/" },
      { text: "🦀TPCLAW 智能体平台", link: "https://tpclaw.teambuf.com/" },
      { text: '❓问答', items: [
          { text: "FAQ", link: "/pages/faq/" },
        ]
      },
    ]
  },
  { text: "💖支持", link: "/pages/support/" },
  { text: "👥加入社区", link: "/pages/community/" },
  // { text: "🗒️更新日志", link: "https://github.com/rulego/rulego/blob/main/doc/CHANGELOG.md" },
  {
    text: "🎈托管",
    link: "#2",
    items: [
      { text: "Github", link: "https://github.com/rulego/rulego" },
      { text: "Gitee", link: "https://gitee.com/rulego/rulego" },
      { text: "GitCode", link: "https://gitcode.com/rulego/rulego" },
      { text: "更新日志", link: "https://github.com/rulego/rulego/blob/main/doc/CHANGELOG.md" },
    ]
  },
];
