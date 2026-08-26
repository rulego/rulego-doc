<script setup lang="ts">
// RuleGo 引擎架构图：单张 SVG，固定 1000×640 视图。
// 文本宽度按 CJK 全宽 / ASCII 0.62 倍估算，右侧芯片自动排布（同 HeroFlow 手法）。

const W = 1000
const H = 640

type Chip = { t: string; hot?: boolean }
type Tone = 'access' | 'core' | 'comp' | 'ext' | 'run'
type Layer = { en: string; cn: string; tone: Tone; chips: Chip[]; note?: string }

const layers: Layer[] = [
  {
    en: 'Access',
    cn: '接入层 · Endpoint',
    tone: 'access',
    chips: [
      { t: 'HTTP' }, { t: 'MQTT' }, { t: 'WebSocket' }, { t: 'TCP / UDP' },
      { t: 'Kafka' }, { t: 'gRPC' }, { t: '定时 / 触发器' }, { t: '… 30+ 协议' },
    ],
  },
  {
    en: 'Engine Core',
    cn: '规则链引擎核心',
    tone: 'core',
    chips: [
      { t: '规则链 DSL（JSON）', hot: true },
      { t: 'DAG 执行' },
      { t: 'True / False / Success 路由' },
      { t: '子规则链嵌套' },
    ],
    note: '横切能力：热更新（不重启改链） · AOP 切面 · 上下文隔离 · 调试',
  },
  {
    en: 'Components',
    cn: '组件层 · 100+ 内置',
    tone: 'comp',
    chips: [
      { t: '过滤器' }, { t: '转换器' }, { t: '动作' }, { t: '外部集成' },
      { t: 'AI / LLM', hot: true }, { t: 'IoT 工业协议 ×10', hot: true }, { t: '流式计算' },
    ],
  },
  {
    en: 'Extension',
    cn: '扩展机制',
    tone: 'ext',
    chips: [{ t: '自定义组件（实现 Node 接口）' }, { t: 'Go plugin 动态加载' }, { t: '组件市场' }],
  },
  {
    en: 'Runtime',
    cn: '运行形态',
    tone: 'run',
    chips: [{ t: '嵌入式：Go 库嵌入现有应用' }, { t: '独立部署：RuleGo-Server 编排服务' }],
  },
]

const flows = ['统一消息 types.RuleMsg', 'OnMsg → 组件处理', '按需加载 / 注册', '同一套引擎，两种交付']

const FS = 12.5
function textWidth(s: string, fs: number = FS): number {
  let w = 0
  for (const ch of s) w += ch.charCodeAt(0) > 0xff ? fs : fs * 0.62
  return w
}

const bandH = 86
const gap = 32
const top = 24
const bandX = 14
const bandW = W - 28
const sideW = 198
const chipsX = bandX + sideW

function bandY(i: number): number {
  return top + i * (bandH + gap)
}

function chipWidth(c: Chip): number {
  return textWidth(c.t) + 22
}

function chipsRow(l: Layer): { chip: Chip; x: number; w: number }[] {
  const out: { chip: Chip; x: number; w: number }[] = []
  let x = chipsX
  for (const c of l.chips) {
    const w = chipWidth(c)
    out.push({ chip: c, x, w })
    x += w + 8
  }
  return out
}

const toneColor: Record<Tone, string> = {
  access: '#4fa8d8',
  core: '#2dd48a',
  comp: '#2dd48a',
  ext: '#8a95a5',
  run: '#8a95a5',
}
</script>

<template>
  <svg
    class="archimg"
    :viewBox="`0 0 ${W} ${H}`"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="RuleGo 引擎分层架构图"
  >
    <defs>
      <pattern id="engrid" width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M28 0H0V28" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1" />
      </pattern>
    </defs>

    <!-- 底板 -->
    <rect x="0.5" y="0.5" :width="W - 1" :height="H - 1" rx="14" fill="#0b1512" stroke="rgba(255,255,255,0.14)" />
    <rect x="1" y="1" :width="W - 2" :height="H - 2" rx="13" fill="url(#engrid)" />

    <!-- 层 -->
    <g v-for="(l, i) in layers" :key="l.en">
      <rect
        :x="bandX"
        :y="bandY(i)"
        :width="bandW"
        :height="bandH"
        rx="10"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.13)"
      />
      <rect
        :x="bandX"
        :y="bandY(i) + 6"
        width="3"
        :height="bandH - 12"
        rx="1.5"
        :fill="toneColor[l.tone]"
      />
      <text class="en-t" :x="bandX + 18" :y="bandY(i) + 26">{{ l.en }}</text>
      <text class="cn-t" :x="bandX + 18" :y="bandY(i) + 50">{{ l.cn }}</text>

      <g v-for="c in chipsRow(l)" :key="c.chip.t">
        <rect
          :x="c.x"
          :y="bandY(i) + 27"
          :width="c.w"
          height="26"
          rx="8"
          class="chip-box"
          :class="{ hot: c.chip.hot }"
        />
        <text class="chip-t" :x="c.x + c.w / 2" :y="bandY(i) + 44">{{ c.chip.t }}</text>
      </g>
      <text v-if="l.note" class="note-t" :x="chipsX + 2" :y="bandY(i) + 74">{{ l.note }}</text>
    </g>

    <!-- 层间数据流 -->
    <text v-for="(f, i) in flows" :key="f" class="flow-t" :x="W / 2" :y="bandY(i) + bandH + 21">▼ {{ f }}</text>
  </svg>
</template>

<style scoped>
.archimg {
  display: block;
  width: 100%;
  height: auto;
  max-width: 980px;
  margin: 0 auto;
}

.en-t {
  font-family: var(--rg-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  fill: #8fa89a;
}

.cn-t {
  font-size: 16px;
  font-weight: 700;
  fill: #f2f6f0;
}

.chip-box {
  fill: rgba(255, 255, 255, 0.045);
  stroke: rgba(255, 255, 255, 0.16);
}

.chip-box.hot {
  fill: rgba(0, 168, 107, 0.12);
  stroke: rgba(45, 212, 160, 0.45);
}

.chip-t {
  font-size: 12.5px;
  text-anchor: middle;
  fill: #e8e2d5;
}

.note-t {
  font-size: 11px;
  fill: #97a89c;
}

.flow-t {
  font-family: var(--rg-mono);
  font-size: 11px;
  text-anchor: middle;
  letter-spacing: 0.05em;
  fill: #7fae93;
}
</style>
