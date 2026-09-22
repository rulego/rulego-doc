// 生态数据源：首页 EcoMatrix 与 /ecosystem/ 页共用。
// 呈现约定：卡片不区分开源/商业，只给「名称 + 定位 + 出口链接」；
// 定价、授权等细节一律留在各产品自己的站点。
// 文案双语：zh 字段必填，En 字段按需补（未补的回退 zh）。

export type EcoLayer = 'engine' | 'apps'

export interface EcoItem {
  id: string
  name: string
  nameEn?: string
  emoji: string
  tagline: string
  taglineEn?: string
  layer: EcoLayer
  doc?: string // 站内文档路径（无尾斜杠）
  site?: string // 产品自己的站点（外链）
  repo?: string
  demo?: string
}

export const ecoLayers: {
  key: EcoLayer
  label: string
  en: string
  desc: string
  descEn: string
}[] = [
  {
    key: 'engine',
    label: '底座引擎',
    en: 'The Base Engine',
    desc: 'RuleGo 组件化编排内核，加上长在其上的能力框架：协议接入、工业采集、流式计算、智能体、工作流。它们共同构成一个可以开发各种场景应用的强大引擎。',
    descEn:
      'The RuleGo orchestration kernel plus the capability frameworks growing on it: protocol access, industrial data collection, stream processing, agents and workflow. Together they form a powerful engine for building scenario applications.',
  },
  {
    key: 'apps',
    label: '场景应用',
    en: 'Scenario Applications',
    desc: '以 RuleGo 为底座构建的开箱即用产品——应用开发平台、智能体平台、工业边缘网关、审批工作流、可视化编辑器。一个底座，长出各种场景的应用。',
    descEn:
      'Ready-to-run products built on the RuleGo base: an application development platform, an agent platform, an industrial edge gateway, an approval workflow suite and a visual editor. One base, many applications.',
  },
]

export const ecoItems: EcoItem[] = [
  {
    id: 'rulego',
    name: 'RuleGo 引擎',
    nameEn: 'RuleGo Engine',
    emoji: '⚙️',
    tagline: 'Go 轻量级、高性能组件编排规则引擎',
    taglineEn: 'Lightweight, high-performance component-orchestration rule engine for Go',
    layer: 'engine',
    doc: '/pages/introduction/',
    repo: 'https://github.com/rulego/rulego',
    site: 'https://gitee.com/rulego/rulego',
  },
  {
    id: 'ai-agent',
    name: '智能体框架',
    nameEn: 'Agent Framework',
    emoji: '🤖',
    tagline: '规则链即智能体：声明式 AI Agent 框架',
    taglineEn: 'Rule chains as agents: a declarative AI agent framework',
    layer: 'engine',
    doc: '/pages/ai-agent-overview/',
    repo: 'https://github.com/rulego/rulego-components-ai',
  },
  {
    id: 'streamsql',
    name: 'StreamSQL',
    emoji: '🌊',
    tagline: '物联网边缘场景轻量流处理引擎，用 SQL 处理无界流',
    taglineEn: 'Lightweight stream processing for IoT edge — query unbounded streams with SQL',
    layer: 'engine',
    doc: '/pages/streamsql-overview/',
    repo: 'https://github.com/rulego/streamsql',
  },
  {
    id: 'endpoint',
    name: 'Endpoint',
    emoji: '🔌',
    tagline: '30+ 协议接入端点',
    taglineEn: '30+ protocol access endpoints',
    layer: 'engine',
    doc: '/pages/endpoint-overview/',
  },
  {
    id: 'iot',
    name: 'IoT 组件',
    nameEn: 'IoT Components',
    emoji: '🏭',
    tagline: '10+ 工业协议采集点位组件：modbus / s7 / opcua / eip / mc / fins / dlt645 / bacnet / snmp / iec104',
    taglineEn:
      'Data-point components for 10+ industrial protocols: modbus / s7 / opcua / eip / mc / fins / dlt645 / bacnet / snmp / iec104',
    layer: 'engine',
    doc: '/pages/iot-overview/',
  },
  {
    id: 'gflow-engine',
    name: 'gflow-engine',
    emoji: '🀄',
    tagline: '中国式审批工作流引擎，复用规则链 DSL，7 张表管全部运行状态',
    taglineEn: 'Approval workflow engine reusing rule-chain DSL; all runtime state lives in 7 tables',
    layer: 'engine',
    site: 'https://gflow.rulego.cc',
    repo: 'https://github.com/rulego/gflow-engine',
  },
  {
    id: 'server',
    name: 'RuleGo-Server',
    emoji: '🧱',
    tagline: '开箱即用的应用开发平台：RESTful / 多租户 / 组件市场 / MCP / AI',
    taglineEn: 'Out-of-the-box application development platform: RESTful / multi-tenant / marketplace / MCP / AI',
    layer: 'apps',
    doc: '/pages/rulego-server/',
  },
  {
    id: 'tpclaw',
    name: 'TPCLAW',
    emoji: '🐾',
    tagline: '自托管 AI 智能体平台：IM 多通道接入、自我进化',
    taglineEn: 'Self-hosted AI agent platform: multi-channel IM access, self-evolution',
    layer: 'apps',
    site: 'https://tpclaw.teambuf.com',
    repo: 'https://github.com/teambuf/tpclaw',
  },
  {
    id: 'rulego-edge',
    name: 'rulego-edge',
    emoji: '🛰️',
    tagline: '工业边缘网关：单二进制交付，设备采集、告警值守、AI 值班员开箱即用',
    taglineEn: 'Industrial edge gateway: single binary with device collection, alarm watch and AI operator out of the box',
    layer: 'apps',
    site: 'https://edge.rulego.cc',
  },
  {
    id: 'rulego-editor',
    name: 'rulego-editor',
    emoji: '🎨',
    tagline: '规则链可视化编辑器（Vue3，npm 包 @rulego/editor 授权交付）',
    taglineEn: 'Visual editor for rule chains (Vue3, delivered as the licensed npm package @rulego/editor)',
    layer: 'apps',
    site: 'https://editor.rulego.cc',
    demo: 'https://app.rulego.cc',
  },
  {
    id: 'gflow-platform',
    name: 'GFlow Platform',
    emoji: '📄',
    tagline: '极风工作流：开箱即用的审批平台',
    taglineEn: 'GFlow workflow: a ready-to-run approval platform',
    layer: 'apps',
    site: 'https://gflow.rulego.cc',
  },
]
