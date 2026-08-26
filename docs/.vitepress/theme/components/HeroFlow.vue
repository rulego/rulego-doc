<script setup lang="ts">
// Hero 右侧流程 mockup：体现规则链的核心语义——多源输入、条件分支(True/False)、转换、扇出分发。
// 纯 SVG 手绘（同 EcoArchDiagram 手法），CJK 全宽 / ASCII 0.62 倍估算文本宽度。
const W = 560
const H = 368

function textWidth(s: string, fs: number): number {
  let w = 0
  for (const ch of s) w += ch.charCodeAt(0) > 0xff ? fs : fs * 0.62
  return w
}

type Tone = 'src' | 'filter' | 'transform' | 'action' | 'drop'
interface Node {
  t: string
  x: number
  y: number // 左上角
  tone: Tone
}

const NW = 10 // 文本左右留白

function nodeW(n: Node): number {
  return textWidth(n.t, 12) + 2 * NW
}
function nodeH(): number {
  return 32
}
function cx(n: Node): number {
  return n.x + nodeW(n) / 2
}
function cy(n: Node): number {
  return n.y + nodeH() / 2
}

const sources: Node[] = [
  { t: 'MQTT 设备', x: 18, y: 44, tone: 'src' },
  { t: 'HTTP API', x: 18, y: 100, tone: 'src' },
  { t: 'Kafka', x: 18, y: 156, tone: 'src' },
]

const root: Node = { t: 'jsFilter 过滤', x: 196, y: 100, tone: 'filter' }
const transform: Node = { t: 'jsTransform 转换', x: 186, y: 212, tone: 'transform' }
const drop: Node = { t: 'log 记录', x: 366, y: 100, tone: 'drop' }
const actions: Node[] = [
  { t: 'restApiCall 推送', x: 366, y: 176, tone: 'action' },
  { t: 'mqttClient 推送', x: 366, y: 224, tone: 'action' },
  { t: 'x/iot 写时序库', x: 366, y: 272, tone: 'action' },
]

// 肘形连线：源 → 汇聚 → root
function elbow(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const midX = (from.x + to.x) / 2
  return `M${from.x} ${from.y} H${midX} V${to.y} H${to.x}`
}
</script>

<template>
  <div class="hero-visual">
    <div class="chain-card">
      <div class="chain-head">
        <div class="chain-title">规则链示例 · 温度数据处理</div>
        <div class="chain-no">chain_telemetry · <span class="running">● 运行中</span> · 改链不重启</div>
      </div>

      <svg class="flow-svg" :viewBox="`0 0 ${W} ${H}`" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="规则链流程图：多源输入经过滤分支后扇出分发">
        <defs>
          <marker id="ah" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 z" fill="#6f8377" />
          </marker>
          <marker id="ah-green" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 z" fill="#04784f" />
          </marker>
        </defs>

        <!-- 分区标注 -->
        <text class="zone-t" x="18" y="26">输入源</text>
        <text class="zone-t" x="196" y="26">规则链编排</text>
        <text class="zone-t" x="366" y="26">分发目标</text>

        <!-- 源节点 -->
        <g v-for="s in sources" :key="s.t">
          <rect class="node" :class="'n-' + s.tone" :x="s.x" :y="s.y" :width="nodeW(s)" :height="nodeH()" rx="8" />
          <text class="node-t" :class="'t-' + s.tone" :x="cx(s)" :y="cy(s) + 4.5">{{ s.t }}</text>
          <!-- 连到 root -->
          <path
            class="wire"
            fill="none"
            :d="elbow({ x: s.x + nodeW(s), y: cy(s) }, { x: root.x, y: cy(root) })"
            marker-end="url(#ah)"
          />
        </g>

        <!-- root -->
        <rect class="node hot n-filter" :x="root.x" :y="root.y" :width="nodeW(root)" :height="nodeH()" rx="8" />
        <text class="node-t strong t-filter" :x="cx(root)" :y="cy(root) + 4.5">{{ root.t }}</text>

        <!-- False 分支 -->
        <path
          class="wire"
          fill="none"
          :d="`M${root.x + nodeW(root)} ${cy(root)} H${drop.x}`"
          marker-end="url(#ah)"
        />
        <text class="br-t gray" :x="root.x + nodeW(root) + 28" :y="cy(root) - 8">False</text>
        <rect class="node n-drop" :x="drop.x" :y="drop.y" :width="nodeW(drop)" :height="nodeH()" rx="8" />
        <text class="node-t t-drop" :x="cx(drop)" :y="cy(drop) + 4.5">{{ drop.t }}</text>

        <!-- True 分支 -->
        <path
          class="wire green"
          fill="none"
          :d="`M${cx(root)} ${root.y + nodeH()} V${transform.y}`"
          marker-end="url(#ah-green)"
        />
        <text class="br-t green" :x="cx(root) + 8" :y="(root.y + nodeH() + transform.y) / 2 + 3">True</text>
        <rect class="node hot n-transform" :x="transform.x" :y="transform.y" :width="nodeW(transform)" :height="nodeH()" rx="8" />
        <text class="node-t strong t-transform" :x="cx(transform)" :y="cy(transform) + 4.5">{{ transform.t }}</text>

        <!-- 扇出 -->
        <g v-for="a in actions" :key="a.t">
          <path
            class="wire green"
            fill="none"
            :d="elbow({ x: transform.x + nodeW(transform), y: cy(transform) }, { x: a.x, y: cy(a) })"
            marker-end="url(#ah-green)"
          />
          <rect class="node n-action" :x="a.x" :y="a.y" :width="nodeW(a)" :height="nodeH()" rx="8" />
          <text class="node-t t-action" :x="cx(a)" :y="cy(a) + 4.5">{{ a.t }}</text>
        </g>

        <!-- 底部 DSL 提示 -->
        <text class="dsl-t" x="18" y="352">connections: [ {fromId: "s1", toId: "s2", type: "True"}, … ] · JSON 定义 · 动态热更新</text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.flow-svg {
  display: block;
  width: 100%;
  height: auto;
}

.zone-t {
  font-family: var(--rg-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  fill: #8a8577;
}

.node {
  stroke-width: 1.2;
}

.node-t {
  font-size: 12px;
  text-anchor: middle;
  fill: #26332c;
}

.node-t.strong {
  font-weight: 700;
}

.n-src {
  fill: rgba(138, 149, 165, 0.08);
  stroke: rgba(112, 122, 138, 0.55);
}

.n-filter {
  fill: rgba(0, 168, 107, 0.08);
  stroke: rgba(0, 137, 90, 0.65);
}

.n-transform {
  fill: rgba(216, 162, 74, 0.1);
  stroke: rgba(176, 128, 30, 0.55);
}

.n-action {
  fill: rgba(96, 150, 210, 0.09);
  stroke: rgba(47, 107, 168, 0.55);
}

.n-drop {
  fill: rgba(138, 149, 165, 0.07);
  stroke: rgba(138, 149, 165, 0.5);
  stroke-dasharray: 4 3;
}

.t-src {
  fill: #4a5a6e;
}

.t-filter {
  fill: #046d47;
}

.t-transform {
  fill: #8a6212;
}

.t-action {
  fill: #2f6ba8;
}

.t-drop {
  fill: #6d6a5e;
}

.wire {
  stroke: #6f8377;
  stroke-width: 1.3;
}

.wire.green {
  stroke: #04784f;
}

.br-t {
  font-family: var(--rg-mono);
  font-size: 10px;
}

.br-t.green {
  fill: #04784f;
}

.br-t.gray {
  fill: #8a8577;
}

.dsl-t {
  font-family: var(--rg-mono);
  font-size: 10.5px;
  fill: #8a8577;
}
</style>
