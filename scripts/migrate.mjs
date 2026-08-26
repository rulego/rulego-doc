#!/usr/bin/env node
/**
 * rulego-doc 内容迁移脚本（一次性：VuePress vdoing -> VitePress）
 *
 * 职责：
 *   1. 按映射表把 zh/en 全部 md 迁到英文目录树（去编号前缀，保留阅读顺序）
 *   2. frontmatter 只保留 title/permalink（剥 vdoing 字段；未知字段保留并报告）
 *   3. 正文链接重写：相对 .md 链接 -> 目标页 permalink URL（无尾斜杠）；
 *      /pages/xxx/ 绝对链接规范化；vdoing 哈希死链按锚文本修复；
 *      相对图片路径 -> /img/ 绝对路径
 *   4. 生成 docs/.vitepress/rewrites.mts（磁盘路径 -> URL）与 sidebar.mts、archives 页
 *   5. 全量校验：URL 唯一性、未映射目录/未解析链接报告；存在阻断项时不写入
 *
 * 用法：node scripts/migrate.mjs [--dry]
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DOCS = path.join(ROOT, 'docs')
const DRY = process.argv.includes('--dry')

// ---------- 目录映射表 ----------
const ZH_TOP = {
  '01.指南/01.快速入门': 'guide/quickstart',
  '01.指南/02.规则链': 'guide/rulechain',
  '01.指南/03.标准组件': 'components/standard',
  '01.指南/04.扩展组件': 'components/extension',
  '01.指南/05.自定义组件': 'guide/custom-component',
  '01.指南/06.组件市场': 'guide/marketplace',
  '01.指南/07.可视化': 'guide/visualization',
  '01.指南/08.AOP': 'guide/aop',
  '01.指南/09.触发器': 'guide/trigger',
  '01.指南/10.高级主题': 'guide/advanced',
  '01.指南/11.智能体框架': 'ai',
  '01.指南/12.RuleGo-Server': 'server',
  '01.指南/21.问题': 'guide/faq',
  '02.Endpoint': 'endpoint',
  '03.StreamSQL': 'streamsql',
  '04.支持': 'support',
}

const EN_TOP = {
  '01.Quick Start': 'guide/quickstart',
  '02.Rule Chain': 'guide/rulechain',
  '03.Standard Components': 'components/standard',
  '04.Extension Components': 'components/extension',
  '05.Custom Components': 'guide/custom-component',
  '06.Components marketplace': 'guide/marketplace',
  '07.Visualization': 'guide/visualization',
  '08.AOP': 'guide/aop',
  '09.Trigger': 'guide/trigger',
  '10.Advanced Topic': 'guide/advanced',
  '11.Agent Framework': 'ai',
  '12.RuleGo-Server': 'server',
  '17.FAQ': 'guide/faq',
  '18.Endpoint Module': 'endpoint',
  '19.Support': 'support',
  '20.StreamSQL': 'streamsql',
}

// 子目录名（去编号后）-> 英文名，zh/en 共用
const DIR_MAP = {
  公共: 'common',
  过滤器: 'filter',
  动作: 'action',
  转换器: 'transform',
  外部的: 'external',
  流: 'flow',
  ai: 'ai',
  组件: 'components',
  ci: 'ci',
  CI: 'ci',
  IoT: 'iot',
  输入端点: 'input-endpoint',
  协议采集: 'protocol-acquisition',
  时序数据库: 'tsdb',
  控制: 'control',
  流式计算: 'stream',
  服务发现: 'discovery',
  服务调用: 'service-call',
  配置: 'config',
  文件: 'file',
  内置切片: 'builtin-aspect',
  可视化编辑器: 'visual-editor',
  函数: 'functions',
  案例集锦: 'case-studies',
  common: 'common',
  filter: 'filter',
  action: 'action',
  transform: 'transform',
  external: 'external',
  flow: 'flow',
  'Input Endpoints': 'input-endpoint',
  'Protocol Acquisition': 'protocol-acquisition',
  'Time-Series Database': 'tsdb',
  'Stream Processing': 'stream',
  'Service Discovery': 'discovery',
  'Service Call': 'service-call',
  Configuration: 'config',
  file: 'file',
  'builtin aspect': 'builtin-aspect',
  'Visual Editor': 'visual-editor',
  functions: 'functions',
  'case-studies': 'case-studies',
  Endpoints: 'components',
}

// ---------- sidebar 区域（阅读顺序 = 原编号顺序；subOrder 固定子组顺序） ----------
const ZH_AREAS = [
  { text: '快速入门', dir: 'guide/quickstart' },
  { text: '规则链', dir: 'guide/rulechain' },
  { text: '标准组件', dir: 'components/standard', subs: ['common', 'filter', 'action', 'transform', 'external', 'flow'] },
  {
    text: '扩展组件',
    dir: 'components/extension',
    subs: ['filter', 'action', 'transform', 'external', 'ai', 'ci', 'iot', 'stream', 'discovery', 'file'],
  },
  { text: '自定义组件', dir: 'guide/custom-component' },
  { text: '组件市场', dir: 'guide/marketplace' },
  { text: '可视化', dir: 'guide/visualization' },
  { text: 'AOP', dir: 'guide/aop', subs: ['builtin-aspect'] },
  { text: '触发器', dir: 'guide/trigger' },
  { text: '高级主题', dir: 'guide/advanced' },
  { text: '智能体框架', dir: 'ai' },
  { text: 'RuleGo-Server', dir: 'server', subs: ['visual-editor'] },
  { text: '常见问题', dir: 'guide/faq' },
  { text: 'Endpoint', dir: 'endpoint', subs: ['components'] },
  { text: 'StreamSQL', dir: 'streamsql', subs: ['functions', 'case-studies'] },
  { text: '支持与社区', dir: 'support', extra: ['community'] },
]

const EN_AREAS = [
  { text: 'Quick Start', dir: 'guide/quickstart' },
  { text: 'Rule Chain', dir: 'guide/rulechain' },
  { text: 'Standard Components', dir: 'components/standard', subs: ['common', 'filter', 'action', 'transform', 'external', 'flow'] },
  {
    text: 'Extension Components',
    dir: 'components/extension',
    subs: ['filter', 'action', 'transform', 'external', 'ai', 'ci', 'iot', 'stream', 'discovery', 'file'],
  },
  { text: 'Custom Components', dir: 'guide/custom-component' },
  { text: 'Components Marketplace', dir: 'guide/marketplace' },
  { text: 'Visualization', dir: 'guide/visualization' },
  { text: 'AOP', dir: 'guide/aop', subs: ['builtin-aspect'] },
  { text: 'Trigger', dir: 'guide/trigger' },
  { text: 'Advanced Topics', dir: 'guide/advanced' },
  { text: 'Agent Framework', dir: 'ai' },
  { text: 'RuleGo-Server', dir: 'server', subs: ['visual-editor'] },
  { text: 'FAQ', dir: 'guide/faq' },
  { text: 'Endpoint', dir: 'endpoint', subs: ['components'] },
  { text: 'StreamSQL', dir: 'streamsql', subs: ['functions', 'case-studies'] },
  { text: 'Support & Community', dir: 'support', extra: ['community'] },
]

const SUBGROUP_TITLE = {
  zh: {
    common: '公共组件', filter: '过滤器', action: '动作', transform: '转换器',
    external: '外部的', flow: '流', ai: 'AI 组件', components: '组件', ci: 'CI',
    iot: 'IoT', 'input-endpoint': '输入端点', 'protocol-acquisition': '协议采集',
    tsdb: '时序数据库', control: '控制', stream: '流式计算', discovery: '服务发现',
    'service-call': '服务调用', config: '配置', file: '文件',
    'builtin-aspect': '内置切片', 'visual-editor': '可视化编辑器',
    functions: '函数', 'case-studies': '案例集锦',
  },
  en: {
    common: 'Common', filter: 'Filter', action: 'Action', transform: 'Transform',
    external: 'External', flow: 'Flow', ai: 'AI', components: 'Components', ci: 'CI',
    iot: 'IoT', 'input-endpoint': 'Input Endpoints', 'protocol-acquisition': 'Protocol Acquisition',
    tsdb: 'Time-Series Database', control: 'Control', stream: 'Stream Processing',
    discovery: 'Service Discovery', 'service-call': 'Service Call', config: 'Configuration',
    file: 'File', 'builtin-aspect': 'Builtin Aspects', 'visual-editor': 'Visual Editor',
    functions: 'Functions', 'case-studies': 'Case Studies',
  },
}

// vdoing 死链（/pages/<hash>/，线上 404）手工映射：哈希 URL -> 站内 URL（无尾斜杠）。
// 目标依据锚文本与上下文确定；en 源文件命中 zh 形态时自动尝试 /en 前缀变体。
const MANUAL_HASH = {
  '/pages/d7fc43': '/pages/extension-overview', // 扩展组件
  '/pages/caed1b': '/pages/custom-components-overview', // 自定义组件
  '/pages/390ad7': '/pages/endpoint-dsl', // Endpoint DSL
  '/pages/8ee82f': '/pages/rule-chain-message', // types.RuleMsg / dataType
  '/pages/10e1c0': '/pages/rule-chain', // 规则链的DSL（ruleChain.configuration 锚点所在页）
  '/pages/56668f': '/pages/rule-chain-overview', // 规则链动态更新参考
  '/pages/af0195': '/pages/component-form-conventions', // 组件配置表单约定
  '/pages/cf0194': '/pages/get-component-form', // 获取组件配置表单
  '/pages/c0b811': '/pages/rulego-server-editor', // RuleGo-Editor 可视化编辑器
  '/pages/0d77d2': '/pages/endpoint-overview', // Endpoint
  '/pages/a1ed6c': '/pages/aop-overview', // AOP
  '/pages/bf0eaf': '/pages/lua-transform', // lua脚本转换器
  '/pages/5d61cc': '/pages/lua-filter', // lua脚本过滤器
  '/pages/2bf5ef': '/pages/options', // Options / WithOnEnd
  '/pages/45008b': '/pages/endpoint-router', // 路由 Router
  '/pages/6bc777': '/pages/batch-init-rule-chains', // 批量初始化规则链
  '/pages/baa05c': '/pages/component-configuration-variables', // 组件配置变量
  '/pages/2d1920': '/pages/execute-rule-chain', // 执行规则链
  '/pages/4bb2d1': '/pages/interrupt-recovery', // 执行中断恢复
  '/pages/ead9b2': '/pages/debug-aspect', // Debug Aspect
  '/pages/78e359': '/pages/fallback-aspect', // Fallback Aspect
  '/en/pages/d7fc43': '/en/pages/extension-overview',
  '/en/pages/caed1b': '/en/pages/custom-components-overview',
  '/en/pages/390ad7': '/en/pages/endpoint-dsl',
  '/en/pages/0d77d2': '/en/pages/endpoint-overview',
  '/en/pages/a1ed6c': '/en/pages/aop-overview',
  '/en/pages/baa05c': '/en/pages/component-configuration-variables',
  '/en/pages/6bc777': '/en/pages/batch-init-rule-chains',
  '/en/pages/10e1c0': '/en/pages/rule-chain',
  '/en/pages/2bf5ef': '/en/pages/options',
  '/en/pages/af0195': '/en/pages/component-form-conventions',
  '/en/pages/cf0194': '/en/pages/get-component-form',
  '/en/pages/56668f': '/en/pages/rule-chain-overview',
  '/en/pages/ead9b2': '/en/pages/debug-aspect',
  '/en/pages/78e359': '/en/pages/fallback-aspect',
  '/en/pages/8ee82f': '/en/pages/rule-chain-message',
  '/en/pages/c0b811': '/en/pages/rulego-server-editor',
  '/en/pages/45008b': '/en/pages/endpoint-router',
}

// 非哈希形态的存量死链（重命名遗留）：旧 URL -> 新 URL
const ABS_MANUAL = {
  '/pages/aspect_limiter/': '/pages/limiter-aspect',
  '/pages/streamsql-custom-functions/': '/pages/streamsql-functions',
  '/pages/streamsql-plugins/': '/pages/streamsql-functions',
  '/pages/streamsql-case-overview/': '/pages/streamsql-cases-overview',
  '/en/pages/aspect_limiter/': '/en/pages/limiter-aspect',
  '/en/pages/streamsql-custom-functions/': '/en/pages/streamsql-functions',
  '/en/pages/streamsql-plugins/': '/en/pages/streamsql-functions',
  '/en/pages/streamsql-performance/': '/en/pages/performance',
}

// 相对 .md 断链按文件名无法唯一定位时的手工映射（文件名 -> URL）
const BASENAME_MANUAL = {
  '00.概述.md': '/pages/ai-agent-overview', // 07.智能体 目录迁移到 11.智能体框架 后的遗留链接
  '01.Agent.md': '/pages/ai-agent',
  '21.MCP Client.md': '/pages/ai-mcp-client',
  '22.MCP Server.md': '/pages/ai-mcp-server',
}

// ---------- 工具 ----------
const norm = (p) => p.replace(/\\/g, '/')
const stripNum = (s) => s.replace(/^\d+[.、]?\s*/, '')
const sortNum = (s) => {
  const m = s.match(/^(\d+)[.、]/)
  return m ? parseInt(m[1], 10) : 9999
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

function extractFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { fmRaw: null, body: content, kv: {} }
  const kv = {}
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^([\w-]+):\s*(.*)$/)
    if (mm) kv[mm[1]] = mm[2].replace(/^["']|["']$/g, '').trim()
  }
  return { fmRaw: m[0], body: content.slice(m[0].length), kv }
}

const KEEP_FM = ['title', 'permalink']
const DROP_FM = new Set([
  'article', 'author', 'date', 'home', 'heroImage', 'heroText', 'tagline', 'actionText',
  'actionLink', 'bannerBg', 'features', 'postList', 'hideRightBar', 'notices',
  'archivesPage', 'category', 'tag', 'sticky',
])

// ---------- 1. 收集清单 ----------
const SKIP_FILES = new Set(
  [path.join(DOCS, 'index.md'), path.join(DOCS, 'en', 'index.md'), path.join(DOCS, '@pages', 'archivesPage.md')].map(norm),
)

const inventory = []
const unmapped = []
const unknownFiles = []
const strayPng = []

function mapRelPath(relOld, locale) {
  const top = locale === 'en' ? EN_TOP : ZH_TOP
  let prefix = null
  let rest = null
  for (const [k, v] of Object.entries(top)) {
    if (relOld === k || relOld.startsWith(k + '/')) {
      prefix = v
      rest = relOld === k ? '' : relOld.slice(k.length + 1)
      break
    }
  }
  if (prefix === null) return null
  if (!rest) return prefix
  const segs = rest.split('/').map((s) => {
    const unnum = stripNum(s)
    const mapped = DIR_MAP[unnum]
    if (!mapped) {
      unmapped.push(relOld + '  (dir: ' + unnum + ')')
      return unnum.toLowerCase().replace(/\s+/g, '-')
    }
    return mapped
  })
  return [prefix, ...segs].join('/')
}

const ZH_LOOSE = { '加入社区讨论.md': 'community/index.md' }

for (const fileAbs of walk(DOCS)) {
  const rel = norm(path.relative(DOCS, fileAbs))
  if (rel.startsWith('.vuepress') || rel.startsWith('.vitepress') || rel.startsWith('public/')) continue
  if (!rel.endsWith('.md')) {
    // 正文引用的是 /img/demo/ 下的副本，此为冗余散图，迁移时删除
    if (rel === 'en/18.Endpoint Module/10.Endpoints/mqtt_endpoint_demo.png') {
      strayPng.push(fileAbs)
      continue
    }
    unknownFiles.push(rel)
    continue
  }
  if (SKIP_FILES.has(norm(fileAbs))) continue

  let locale = 'zh'
  let workRel = rel
  if (rel.startsWith('en/')) {
    locale = 'en'
    workRel = rel.slice(3)
  }

  let relNew
  if (locale === 'zh' && ZH_LOOSE[workRel]) {
    relNew = ZH_LOOSE[workRel]
  } else {
    const dir = path.posix.dirname(workRel)
    const base = path.posix.basename(workRel)
    const mappedDir = dir === '.' ? null : mapRelPath(dir, locale)
    if (dir !== '.' && mappedDir === null) {
      unmapped.push(rel)
      continue
    }
    const newBase = base === 'README.md' ? 'index.md' : stripNum(base)
    relNew = dir === '.' ? newBase : mappedDir + '/' + newBase
  }
  if (locale === 'en') relNew = 'en/' + relNew

  const content = fs.readFileSync(fileAbs, 'utf8')
  const { kv } = extractFrontmatter(content)
  if (!kv.permalink) {
    unmapped.push(rel + '  (NO PERMALINK)')
    continue
  }
  // URL 统一尾斜杠目录式（与旧站 1:1）；en 加 locale 前缀
  let url = /\/$/.test(kv.permalink) ? kv.permalink : kv.permalink + '/'
  if (locale === 'en' && !url.startsWith('/en/')) url = '/en' + url

  inventory.push({
    srcAbs: fileAbs,
    relOld: rel,
    locale,
    title: (kv.title || stripNum(path.posix.basename(relNew, '.md'))).trim(),
    permalink: kv.permalink,
    relNew,
    url,
    sortKey: sortNum(path.posix.basename(workRel)),
  })
}

// ---------- 2. 校验：URL 唯一性 ----------
const urlCount = new Map()
for (const it of inventory) urlCount.set(it.url, (urlCount.get(it.url) || 0) + 1)
const dupUrls = [...urlCount.entries()].filter(([, c]) => c > 1)

// ---------- 3. 链接索引 ----------
const LINK_BY_PATH = new Map(inventory.map((it) => [norm(it.srcAbs), it.url]))
const URL_SET = new Set(inventory.map((it) => it.url))
const TITLE_INDEX = new Map()
for (const it of inventory) {
  if (!TITLE_INDEX.has(it.locale)) TITLE_INDEX.set(it.locale, new Map())
  if (!TITLE_INDEX.get(it.locale).has(it.title)) TITLE_INDEX.get(it.locale).set(it.title, it.url)
}
const BY_BASENAME = new Map()
for (const it of inventory) {
  const b = path.posix.basename(it.relOld)
  if (!BY_BASENAME.has(b)) BY_BASENAME.set(b, [])
  BY_BASENAME.get(b).push(it)
}

const fuzzyResolved = []
const unresolved = []
const hashFixed = []
const hashUnresolved = []

// 站内 URL 统一为尾斜杠目录式
const slash = (u) => (/\/$/.test(u) ? u : u + '/')

function resolveMdHref(href, srcAbs) {
  const hashIdx = href.indexOf('#')
  const anchor = hashIdx >= 0 ? href.slice(hashIdx) : ''
  let p = hashIdx >= 0 ? href.slice(0, hashIdx) : href
  try {
    p = decodeURIComponent(p)
  } catch {
    /* 非法百分号编码按原文解析 */
  }
  const target = path.resolve(path.dirname(srcAbs), p)
  const url = LINK_BY_PATH.get(norm(target))
  if (url) return url + anchor

  // 目标缺失（存量断链）：手工映射 > 按文件名唯一匹配
  const base = path.posix.basename(p)
  if (BASENAME_MANUAL[base]) {
    const t = slash(BASENAME_MANUAL[base])
    fuzzyResolved.push(`${norm(path.relative(DOCS, srcAbs))}  ${href} -> ${t} (manual)`)
    return t + anchor
  }
  const cands = BY_BASENAME.get(base) || []
  if (cands.length === 1) {
    fuzzyResolved.push(`${norm(path.relative(DOCS, srcAbs))}  ${href} -> ${cands[0].url}`)
    return cands[0].url + anchor
  }
  unresolved.push(`${norm(path.relative(DOCS, srcAbs))}  ${href}`)
  return null
}

function resolveAbsHref(href, anchorText, srcAbs, locale) {
  const hashIdx = href.indexOf('#')
  const anchor = hashIdx >= 0 ? href.slice(hashIdx) : ''
  let p = (hashIdx >= 0 ? href.slice(0, hashIdx) : href).replace(/\.(html|md)$/, '')
  p = slash(p)

  if (URL_SET.has(p)) return p + anchor

  // en 页面缺失时回退 zh 同名页（如 en 无 AI 组件文档）
  if (p.startsWith('/en/pages/') && URL_SET.has(slash(p.slice(3)))) {
    const t = slash(p.slice(3))
    fuzzyResolved.push(`${norm(path.relative(DOCS, srcAbs))}  ${href} -> ${t} (en->zh)`)
    return t + anchor
  }

  // 非哈希形态的存量死链
  if (ABS_MANUAL[p]) {
    const t = slash(ABS_MANUAL[p])
    fuzzyResolved.push(`${norm(path.relative(DOCS, srcAbs))}  ${href} -> ${t} (abs-manual)`)
    return t + anchor
  }

  const m = p.match(/^\/(en\/)?pages\/([0-9a-f]{5,10})\/$/)
  if (m) {
    if (MANUAL_HASH[p.slice(0, -1)]) {
      let target = slash(MANUAL_HASH[p.slice(0, -1)])
      // en 源文件命中 zh 形态映射时，若存在 en 版页面则优先
      if (locale === 'en' && !target.startsWith('/en/') && URL_SET.has(slash('/en' + target))) {
        target = slash('/en' + target)
      }
      return target + anchor
    }
    const t = anchorText.trim()
    for (const loc of [locale, 'zh', 'en']) {
      const hit = TITLE_INDEX.get(loc)?.get(t)
      if (hit) {
        hashFixed.push(`${p} (${t}) -> ${hit}`)
        return hit + anchor
      }
    }
    hashUnresolved.push(`${norm(path.relative(DOCS, srcAbs))}  ${p}  [${anchorText}]`)
    return href
  }
  unresolved.push(`${norm(path.relative(DOCS, srcAbs))}  ${href}`)
  return href
}

// ---------- 4. 正文转换 ----------
// 行内代码段保护：`...` 内的内容不是链接/图片，先摘出再变换
function transformLine(line, it) {
  const srcAbs = it.srcAbs
  const codeSpans = []
  let masked = line.replace(/(`+)([\s\S]*?)\1/g, (whole) => {
    codeSpans.push(whole)
    return `\x00CODE${codeSpans.length - 1}\x00`
  })

  masked = masked.replace(/(!?)\[([^\]]*)\]\(([^)]+)\)/g, (whole, bang, text, rawHref) => {
    let href = rawHref.replace(/\s+("[^"]*"|'[^']*')$/, '').trim()
    href = href.replace(/^<|>$/g, '') // [text](<url>) 尖括号形式
    if (!href) return whole
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) return whole // 含 scheme（http/mailto/tencent...）
    if (href.startsWith('#')) return whole
    if (href.startsWith('/')) {
      if (href.startsWith('/img/')) return whole
      if (/^\/(en\/)?pages\//.test(href)) {
        const r = resolveAbsHref(href, text, srcAbs, it.locale)
        return `${bang}[${text}](${r})`
      }
      return whole // /en/、/ecosystem/ 等其他绝对路径
    }
    if (/\.md(#|$)/.test(href)) {
      const r = resolveMdHref(href, srcAbs)
      return r ? `${bang}[${text}](${r})` : whole
    }
    if (/^\.?\/?(img|assets)\//.test(href)) {
      return `${bang}[${text}](/${href.replace(/^\.?\//, '')})`
    }
    unresolved.push(`${norm(path.relative(DOCS, srcAbs))}  REL:${href}`)
    return whole
  })

  masked = masked.replace(/(<img\s[^>]*src=")([^"]+)(")/g, (whole, a, src, z) => {
    if (/^[a-z][a-z0-9+.-]*:/i.test(src) || src.startsWith('/') || src.startsWith('//')) return whole
    if (/^\.?\/?(img|assets)\//.test(src)) return a + '/' + src.replace(/^\.?\//, '') + z
    unresolved.push(`${norm(path.relative(DOCS, srcAbs))}  IMG:${src}`)
    return whole
  })

  return masked.replace(/\x00CODE(\d+)\x00/g, (whole, i) => codeSpans[parseInt(i, 10)])
}

function transformBody(body, it) {
  const lines = body.split(/\r?\n/)
  let inFence = false
  let fenceMark = ''
  const out = lines.map((line) => {
    const fence = line.match(/^(\s*)(```|~~~)/)
    if (fence) {
      if (!inFence) {
        inFence = true
        fenceMark = fence[2]
      } else if (fence[2].slice(0, 1) === fenceMark.slice(0, 1)) {
        inFence = false
      }
      return line
    }
    if (inFence) return line
    return transformLine(line, it)
  })
  return out.join('\n')
}

function rebuildFrontmatter(fmRaw, it) {
  if (!fmRaw) return ''
  const m = fmRaw.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n?)$/)
  if (!m) return fmRaw
  const rawLines = m[1].split(/\r?\n/)
  const kept = []
  let currentKey = null
  let dropping = false
  for (const l of rawLines) {
    if (l.trim() === '') continue
    const km = l.match(/^([\w-]+):/)
    if (km) {
      currentKey = km[1]
      dropping = DROP_FM.has(currentKey)
      if (!dropping) kept.push(l)
    } else if (/^\s/.test(l)) {
      // 嵌套在 currentKey 下的行（如 author.name）
      if (dropping) continue
      kept.push(l)
      if (!/^\s+[\w"'-]+:/.test(l)) unresolved.push(`${it.relOld}  RAW_FM_LINE:${l.trim()}`)
    } else {
      // 列表项等异形行：无法归组，整体保留并记录
      kept.push(l)
      unresolved.push(`${it.relOld}  RAW_FM_LINE:${l.trim()}`)
    }
  }
  // key 顺序规范化：title、permalink 在前，其余保持原序（sort 稳定）
  const rank = (l) => {
    const k = l.match(/^([\w-]+):/)?.[1]
    const i = KEEP_FM.indexOf(k)
    return i === -1 ? 99 : i
  }
  kept.sort((a, b) => rank(a) - rank(b))
  return '---\n' + kept.join('\n') + '\n---\n'
}

const newContents = []
for (const it of inventory) {
  const content = fs.readFileSync(it.srcAbs, 'utf8')
  // 存量笔误修复：gopher-lua 库列表中 runtime 链接漏了仓库前缀（全站仅此一处）
  const fixed = content.replace(
    /\]\(\/runtime\)/g,
    '](https://github.com/vadv/gopher-lua-libs/tree/master/runtime)',
  )
  const { fmRaw, body } = extractFrontmatter(fixed)
  const fm = rebuildFrontmatter(fmRaw, it)
  newContents.push({ it, out: fm + transformBody(body.replace(/^\r?\n/, ''), it) })
}

// ---------- 6. 生成 sidebar ----------
function buildSidebar(areas, locale, items) {
  const byDir = new Map()
  for (const it of items) {
    const dir = path.posix.dirname(it.relNew)
    if (!byDir.has(dir)) byDir.set(dir, [])
    byDir.get(dir).push(it)
  }
  const prefix = locale === 'en' ? 'en/' : ''
  const groups = []
  for (const area of areas) {
    const dirPrefix = prefix + area.dir
    const loose = (byDir.get(dirPrefix) || []).slice().sort((a, b) => a.sortKey - b.sortKey || a.relOld.localeCompare(b.relOld))
    const allUnder = items.filter((i) => i.relNew.startsWith(dirPrefix + '/'))
    if (!allUnder.length) continue
    const group = { text: area.text, collapsed: true, items: [] }
    for (const it of loose) group.items.push({ text: it.title, link: it.url })
    if (area.subs) {
      // 子目录 = dirPrefix 的直接子目录（即使其下只有更深的文件，如 ai/components/），
      // 每个子目录递归并入其下全部文件
      const subDirs = [
        ...new Set(
          [...byDir.keys()]
            .filter((d) => d.startsWith(dirPrefix + '/'))
            .map((d) => dirPrefix + '/' + d.slice(dirPrefix.length + 1).split('/')[0]),
        ),
      ]
      const rank = (d) => {
        const idx = area.subs.indexOf(path.posix.basename(d))
        return idx >= 0 ? idx : 99
      }
      subDirs.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
      for (const sd of subDirs) {
        const files = allUnder
          .filter((i) => i.relNew.startsWith(sd + '/'))
          .sort((a, b) => a.sortKey - b.sortKey || a.relOld.localeCompare(b.relOld))
        const subName = path.posix.basename(sd)
        const title = (SUBGROUP_TITLE[locale] && SUBGROUP_TITLE[locale][subName]) || subName
        group.items.push({
          text: title,
          collapsed: true,
          items: files.map((it) => ({ text: it.title, link: it.url })),
        })
      }
    }
    if (area.extra) {
      for (const ex of area.extra) {
        for (const it of byDir.get(prefix + ex) || []) group.items.push({ text: it.title, link: it.url })
      }
    }
    if (group.items.length) groups.push(group)
  }
  return groups
}

const zhItems = inventory.filter((i) => i.locale === 'zh')
const enItems = inventory.filter((i) => i.locale === 'en')
const zhSidebar = buildSidebar(ZH_AREAS, 'zh', zhItems)
const enSidebar = buildSidebar(EN_AREAS, 'en', enItems)

// ---------- 7. 归档页 ----------
function genArchives() {
  const lines = [
    '---', 'title: 全站索引', 'permalink: /archives/', 'sidebar: false', 'aside: false', '---', '',
    '按区域浏览全部中文文档：', '',
  ]
  for (const area of ZH_AREAS) {
    const its = zhItems.filter((i) => i.relNew.startsWith(area.dir + '/'))
    if (!its.length) continue
    lines.push('## ' + area.text, '')
    for (const it of its.slice().sort((a, b) => a.relNew.localeCompare(b.relNew))) {
      lines.push(`- [${it.title}](${it.url})`)
    }
    lines.push('')
  }
  const community = zhItems.find((i) => i.relNew === 'community/index.md')
  if (community) lines.push(`- [${community.title}](${community.url})`)
  return lines.join('\n') + '\n'
}

// ---------- 8. 写文件 ----------
const rewrites = {}
// URL 是尾斜杠目录式 -> rewrites 目标用 index.md 形态，VitePress 原生产出 x/index.html
for (const it of inventory) rewrites[it.relNew] = it.url.replace(/^\//, '').replace(/\/$/, '') + '/index.md'

function writeAll() {
  for (const { it, out } of newContents) {
    const dest = path.join(DOCS, it.relNew)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, out)
  }
  for (const it of inventory) fs.rmSync(it.srcAbs, { force: true })
  for (const f of strayPng) fs.rmSync(f, { force: true })
  for (const f of SKIP_FILES) {
    // @pages/archivesPage.md 由生成的归档页替代
    if (f.endsWith('archivesPage.md')) fs.rmSync(f, { force: true })
  }
  const prune = (dir) => {
    let empty = true
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (!prune(full)) empty = false
      } else {
        empty = false
      }
    }
    if (empty && norm(dir) !== norm(DOCS) && path.basename(dir) !== 'en') fs.rmdirSync(dir)
    return empty
  }
  prune(DOCS)

  fs.writeFileSync(
    path.join(DOCS, '.vitepress', 'rewrites.mts'),
    '// 由 scripts/migrate.mjs 生成：磁盘相对路径 -> permalink URL 路径。勿手改。\n' +
      '// JSON 即合法 TS 对象字面量。\n' +
      'export const rewrites: Record<string, string> = ' +
      JSON.stringify(rewrites, null, 2) +
      '\n',
  )
  fs.writeFileSync(
    path.join(DOCS, '.vitepress', 'sidebar.mts'),
    '// 由 scripts/migrate.mjs 生成：目录树 + frontmatter title，阅读顺序=原编号顺序。勿手改。\n' +
      "import type { DefaultTheme } from 'vitepress'\n\n" +
      'export const zhSidebar: DefaultTheme.Sidebar = ' +
      JSON.stringify(zhSidebar, null, 2) +
      '\n\n' +
      'export const enSidebar: DefaultTheme.Sidebar = ' +
      JSON.stringify(enSidebar, null, 2) +
      '\n',
  )
  fs.mkdirSync(path.join(DOCS, 'archives'), { recursive: true })
  fs.writeFileSync(path.join(DOCS, 'archives', 'index.md'), genArchives())
}

// ---------- 9. 报告 ----------
const uniq = (arr) => [...new Set(arr)]
console.log('==== 迁移报告 ====')
console.log(`清单: zh ${zhItems.length} + en ${enItems.length} = ${inventory.length}`)
console.log(`未映射/无 permalink: ${unmapped.length}`)
unmapped.slice(0, 20).forEach((u) => console.log('  ' + u))
console.log(`非 md 文件: ${unknownFiles.length}`)
unknownFiles.forEach((u) => console.log('  ' + u))
console.log(`重复 URL: ${dupUrls.length}`)
dupUrls.slice(0, 20).forEach(([u, c]) => console.log(`  ${u} x${c}`))
console.log(`模糊解析(按文件名唯一匹配): ${uniq(fuzzyResolved).length}`)
uniq(fuzzyResolved).slice(0, 30).forEach((u) => console.log('  ' + u))
console.log(`哈希死链修复(按标题): ${uniq(hashFixed).length}`)
uniq(hashFixed).slice(0, 30).forEach((u) => console.log('  ' + u))
console.log(`哈希死链未解析: ${uniq(hashUnresolved).length}`)
uniq(hashUnresolved).forEach((u) => console.log('  ' + u))
console.log(`未解析链接: ${uniq(unresolved).length}`)
uniq(unresolved).slice(0, 40).forEach((u) => console.log('  ' + u))
const cnt = (sb) => JSON.stringify(sb).split('"link"').length - 1
console.log(`sidebar: zh 组=${zhSidebar.length} 项=${cnt(zhSidebar)}  en 组=${enSidebar.length} 项=${cnt(enSidebar)}`)
const sbLinks = (sb) => {
  const set = new Set()
  JSON.stringify(sb).replace(/"link":\s*"([^"]+)"/g, (w, l) => {
    set.add(l)
    return w
  })
  return set
}
const missZh = zhItems.filter((i) => !sbLinks(zhSidebar).has(i.url))
const missEn = enItems.filter((i) => !sbLinks(enSidebar).has(i.url))
console.log(`sidebar 未覆盖: zh ${missZh.length} / en ${missEn.length}`)
;[...missZh, ...missEn].slice(0, 20).forEach((i) => console.log(`  ${i.relNew} -> ${i.url}`))
console.log(`rewrites 条目: ${Object.keys(rewrites).length}`)

if (DRY) {
  console.log('\n(dry run，未写任何文件)')
  process.exit(0)
}

if (dupUrls.length || unmapped.length || unknownFiles.length) {
  console.error('\n!! 存在阻断性问题（重复 URL / 未映射 / 非 md 文件），中止写入。')
  process.exit(1)
}

writeAll()
console.log('\n迁移完成：文件已写入新位置，旧文件已删除，rewrites/sidebar/archives 已生成。')
