<script setup lang="ts">
// 生态三层架构图：固定 1000×470 视图。文本宽度按 CJK 全宽 / ASCII 0.62 倍估算，
// 右侧芯片自动排布（同 gflow-doc ArchDiagram 手法）。

const W = 1000
const H = 470

type Chip = { t: string; hot?: boolean; wip?: boolean }
type Tone = 'oss' | 'platform' | 'commercial'
type Layer = { en: string; cn: string; tag: string; tone: Tone; chips: Chip[] }

const layers: Layer[] = [
  {
    en: 'Commercial',
    cn: '商业产品',
    tag: '独立站点 · 细节见各产品官网',
    tone: 'commercial',
    chips: [
      { t: 'rulego-editor 可视化编辑器', hot: true },
      { t: 'GFlow Platform 极风工作流', hot: true },
    ],
  },
  {
    en: 'Platform / App',
    cn: '平台 / 应用层',
    tag: '开源 · 开箱即用',
    tone: 'platform',
    chips: [
      { t: 'RuleGo-Server 应用开发平台', hot: true },
      { t: 'TPCLAW 智能体平台' },
      { t: 'rulego-edge 边缘网关', wip: true },
    ],
  },
  {
    en: 'Engine / Framework',
    cn: '引擎 / 框架层',
    tag: '开源 · Apache-2.0',
    tone: 'oss',
    chips: [
      { t: 'RuleGo 规则引擎核心', hot: true },
      { t: '智能体框架' },
      { t: 'StreamSQL 流处理' },
      { t: 'Endpoint 30+ 协议' },
      { t: 'IoT 10+ 工业协议' },
      { t: 'gflow-engine 审批工作流' },
    ],
  },
]

const flows = ['同一底座 · 独立交付', '规则链 DSL · 组件复用']

const FS = 12.5
function textWidth(s: string, fs: number = FS): number {
  let w = 0
  for (const ch of s) w += ch.charCodeAt(0) > 0xff ? fs : fs * 0.62
  return w
}

const legendY = 26
const bandH = 96
const gap = 42
const top = 56
const bandX = 14
const bandW = W - 28
const sideW = 200
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

function tagWidth(t: string): number {
  return textWidth(t, 10.5) + 18
}
</script>

<template>
  <svg
    class="archimg"
    :viewBox="`0 0 ${W} ${H}`"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="RuleGo 生态三层架构图"
  >
    <defs>
      <pattern id="archgrid" width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M28 0H0V28" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1" />
      </pattern>
    </defs>

    <!-- 底板 -->
    <rect x="0.5" y="0.5" :width="W - 1" :height="H - 1" rx="14" fill="#0b1512" stroke="rgba(255,255,255,0.14)" />
    <rect x="1" y="1" :width="W - 2" :height="H - 2" rx="13" fill="url(#archgrid)" />

    <!-- 图例 -->
    <rect x="200" :y="legendY - 10" width="10" height="10" rx="3" fill="#00a86b" />
    <text class="legend-t" x="215" :y="legendY - 1">开源</text>
    <rect x="215 + textWidth('开源') + 14" :y="legendY - 10" width="10" height="10" rx="3" fill="#d8a24a" />
    <text class="legend-t" :x="215 + textWidth('开源') + 29" :y="legendY - 1">建设中</text>
    <rect
      :x="215 + textWidth('开源') + 29 + textWidth('建设中') + 14"
      :y="legendY - 10"
      width="10"
      height="10"
      rx="3"
      fill="#8a95a5"
    />
    <text class="legend-t" :x="215 + textWidth('开源') + 29 + textWidth('建设中') + 43" :y="legendY - 1">
      商业（徽章中性，细节在各产品站）
    </text>

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
        :fill="l.tone === 'oss' ? '#2dd48a' : l.tone === 'platform' ? '#4fa8d8' : '#8a95a5'"
      />
      <text class="en-t" :x="bandX + 18" :y="bandY(i) + 26">{{ l.en }}</text>
      <text class="cn-t" :x="bandX + 18" :y="bandY(i) + 48">{{ l.cn }}</text>
      <g v-if="l.tag">
        <rect
          :x="bandX + 18"
          :y="bandY(i) + 62"
          :width="tagWidth(l.tag)"
          height="17"
          rx="8.5"
          class="tag-box"
          :class="'tag-' + l.tone"
        />
        <text class="tag-t" :class="'tag-' + l.tone" :x="bandX + 18 + tagWidth(l.tag) / 2" :y="bandY(i) + 74">
          {{ l.tag }}
        </text>
      </g>

      <g v-for="c in chipsRow(l)" :key="c.chip.t">
        <rect
          :x="c.x"
          :y="bandY(i) + 36"
          :width="c.w"
          height="26"
          rx="8"
          class="chip-box"
          :class="[{ hot: c.chip.hot, wip: c.chip.wip }, 'chip-' + l.tone]"
        />
        <text class="chip-t" :x="c.x + c.w / 2" :y="bandY(i) + 53">{{ c.chip.t }}</text>
      </g>
    </g>

    <!-- 层间数据流 -->
    <text v-for="(f, i) in flows" :key="f" class="flow-t" :x="W / 2" :y="bandY(i) + bandH + 27">▼ {{ f }}</text>
  </svg>
</template>

<style scoped>
.archimg {
  display: block;
  width: 100%;
  height: auto;
  max-width: 1040px;
  margin: 16px auto;
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

.tag-box.tag-oss { fill: rgba(0, 168, 107, 0.13); stroke: rgba(45, 212, 160, 0.45); }
.tag-box.tag-platform { fill: rgba(79, 168, 216, 0.12); stroke: rgba(79, 168, 216, 0.4); }
.tag-box.tag-commercial { fill: rgba(138, 149, 165, 0.12); stroke: rgba(138, 149, 165, 0.4); }
.tag-t {
  font-family: var(--rg-mono);
  font-size: 10.5px;
  text-anchor: middle;
  letter-spacing: 0.04em;
}
.tag-t.tag-oss { fill: #9fe8c8; }
.tag-t.tag-platform { fill: #a8d4ef; }
.tag-t.tag-commercial { fill: #c3ccd9; }

.chip-box {
  fill: rgba(255, 255, 255, 0.045);
  stroke: rgba(255, 255, 255, 0.16);
}
.chip-box.hot.chip-oss { fill: rgba(0, 168, 107, 0.1); stroke: rgba(45, 212, 160, 0.42); }
.chip-box.wip { fill: rgba(216, 162, 74, 0.1); stroke: rgba(216, 162, 74, 0.42); }
.chip-t {
  font-size: 12.5px;
  text-anchor: middle;
  fill: #e8e2d5;
}

.flow-t {
  font-family: var(--rg-mono);
  font-size: 11px;
  text-anchor: middle;
  letter-spacing: 0.05em;
  fill: #7fae93;
}

.legend-t {
  font-size: 12px;
  fill: #c3d4c8;
}
</style>
