// 生态数据源：首页 EcoMatrix 与 /ecosystem/ 页共用。
// 商业红线：卡片只做「徽章 + 出口链接」，不出现价格数字与促销语气。

export type EcoBadgeType = 'open-source' | 'commercial' | 'wip'
export type EcoLayer = 'engine' | 'platform' | 'commercial'

export interface EcoItem {
  id: string
  name: string
  emoji: string
  tagline: string
  badge: EcoBadgeType
  badgeNote?: string
  layer: EcoLayer
  doc?: string // 站内文档路径（无尾斜杠）
  site?: string // 产品自己的站点（外链）
  repo?: string
  demo?: string
  commercial?: string // 「了解商业版」出口
}

export const ecoLayers: { key: EcoLayer; label: string; en: string; desc: string }[] = [
  {
    key: 'engine',
    label: '引擎 / 框架层',
    en: 'Engine & Frameworks',
    desc: '一个家族的底座：RuleGo 组件编排内核，以及长在其上的智能体、流处理、协议接入与工作流框架。全部开源。',
  },
  {
    key: 'platform',
    label: '平台 / 应用层',
    en: 'Platforms & Apps',
    desc: '站在引擎之上、开箱即用的开源平台：应用开发平台、智能体平台、边缘网关。',
  },
  {
    key: 'commercial',
    label: '商业产品',
    en: 'Commercial Products',
    desc: '生态中的商业产品由独立站点提供细节（定价、授权、演示），此处仅做导航。',
  },
]

export const ecoItems: EcoItem[] = [
  {
    id: 'rulego',
    name: 'RuleGo 引擎',
    emoji: '⚙️',
    tagline: 'Go 轻量级、高性能组件编排规则引擎',
    badge: 'open-source',
    badgeNote: 'Apache-2.0',
    layer: 'engine',
    doc: '/pages/introduction/',
    repo: 'https://github.com/rulego/rulego',
    site: 'https://gitee.com/rulego/rulego',
  },
  {
    id: 'ai-agent',
    name: '智能体框架',
    emoji: '🤖',
    tagline: '规则链即智能体：声明式 AI Agent 框架',
    badge: 'open-source',
    layer: 'engine',
    doc: '/pages/ai-agent-overview/',
    repo: 'https://github.com/rulego/rulego-components-ai',
  },
  {
    id: 'streamsql',
    name: 'StreamSQL',
    emoji: '🌊',
    tagline: '物联网边缘场景轻量流处理引擎，用 SQL 处理无界流',
    badge: 'open-source',
    layer: 'engine',
    doc: '/pages/streamsql-overview/',
    repo: 'https://github.com/rulego/streamsql',
  },
  {
    id: 'endpoint',
    name: 'Endpoint',
    emoji: '🔌',
    tagline: '30+ 协议接入端点',
    badge: 'open-source',
    layer: 'engine',
    doc: '/pages/endpoint-overview/',
  },
  {
    id: 'iot',
    name: 'IoT 组件',
    emoji: '🏭',
    tagline: '10+ 工业协议采集点位组件：modbus / s7 / opcua / eip / mc / fins / dlt645 / bacnet / snmp / iec104',
    badge: 'open-source',
    layer: 'engine',
    doc: '/pages/iot-overview/',
  },
  {
    id: 'gflow-engine',
    name: 'gflow-engine',
    emoji: '🀄',
    tagline: '中国式审批工作流引擎，复用规则链 DSL，7 张表管全部运行状态',
    badge: 'open-source',
    badgeNote: 'Apache-2.0',
    layer: 'engine',
    site: 'https://gflow.rulego.cc',
    repo: 'https://github.com/rulego/gflow-engine',
  },
  {
    id: 'server',
    name: 'RuleGo-Server',
    emoji: '🧱',
    tagline: '开箱即用的应用开发平台：RESTful / 多租户 / 组件市场 / MCP / AI',
    badge: 'open-source',
    layer: 'platform',
    doc: '/pages/rulego-server/',
  },
  {
    id: 'tpclaw',
    name: 'TPCLAW',
    emoji: '🐾',
    tagline: '自托管 AI 智能体平台：IM 多通道接入、自我进化',
    badge: 'open-source',
    layer: 'platform',
    site: 'https://tpclaw.teambuf.com',
    repo: 'https://github.com/teambuf/tpclaw',
  },
  {
    id: 'rulego-edge',
    name: 'rulego-edge',
    emoji: '🛰️',
    tagline: '单二进制边缘采集网关：edge-first、cloud-optional',
    badge: 'wip',
    badgeNote: '开源',
    layer: 'platform',
    repo: 'https://github.com/rulego/rulego-edge',
  },
  {
    id: 'rulego-editor',
    name: 'rulego-editor',
    emoji: '🎨',
    tagline: '规则链可视化编辑器（Vue3，npm 包 @rulego/editor 授权交付）',
    badge: 'commercial',
    layer: 'commercial',
    site: 'https://editor.rulego.cc',
    demo: 'https://app.rulego.cc',
    commercial: 'https://editor.rulego.cc',
  },
  {
    id: 'gflow-platform',
    name: 'GFlow Platform',
    emoji: '📄',
    tagline: '极风工作流：开箱即用的审批平台，源码交付',
    badge: 'commercial',
    layer: 'commercial',
    site: 'https://gflow.rulego.cc',
    commercial: 'https://gflow.rulego.cc/pricing',
  },
]
