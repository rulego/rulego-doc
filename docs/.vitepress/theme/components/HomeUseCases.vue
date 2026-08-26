<script setup lang="ts">
import SectionHead from './SectionHead.vue'

type Tone = 'src' | 'filter' | 'transform' | 'action' | 'out'
interface Step {
  t: string
  tone: Tone
}
interface Lane {
  label?: string
  steps: Step[]
}
interface UseCase {
  icon: string
  title: string
  desc: string
  lanes: Lane[]
  link: string
  linkText: string
}

const useCases: UseCase[] = [
  {
    icon: '📡',
    title: '物联网 / 边缘计算',
    desc: '设备数据在边缘侧过滤、聚合、格式化后再上报云端；处理规则动态可改，无需重启系统。',
    lanes: [
      {
        steps: [
          { t: '设备 · modbus/MQTT', tone: 'src' },
          { t: '点位采集', tone: 'filter' },
          { t: '过滤 · 聚合', tone: 'transform' },
          { t: '时序库 / 告警', tone: 'out' },
        ],
      },
    ],
    link: '/pages/iot-overview/',
    linkText: 'IoT 组件',
  },
  {
    icon: '🔀',
    title: '数据分发 / 应用集成',
    desc: '把 RuleGo 当胶水：任意协议进、任意系统出，一路数据按规则分发到多个目的地。',
    lanes: [
      {
        steps: [
          { t: 'HTTP / MQTT / Kafka', tone: 'src' },
          { t: '格式转换', tone: 'transform' },
          { t: 'Kafka · DB · ES · Webhook', tone: 'out' },
        ],
      },
    ],
    link: '/pages/endpoint-overview/',
    linkText: 'Endpoint 接入',
  },
  {
    icon: '🤖',
    title: 'AI 智能体',
    desc: '规则链即智能体：LLM 意图识别 + 工具调用 + 业务动作，JSON 定义、修改即生效。',
    lanes: [
      {
        steps: [
          { t: '用户消息', tone: 'src' },
          { t: 'ai/llm 意图', tone: 'filter' },
          { t: '工具 / 子链', tone: 'transform' },
          { t: '业务动作', tone: 'out' },
        ],
      },
    ],
    link: '/pages/ai-agent-overview/',
    linkText: '智能体框架',
  },
  {
    icon: '⚙️',
    title: '自动化编排',
    desc: '定时器、消息、Webhook 皆可为触发器；业务逻辑解耦成规则链，随时替换与回滚。',
    lanes: [
      {
        steps: [
          { t: '定时 / 触发器', tone: 'src' },
          { t: '规则链编排', tone: 'transform' },
          { t: '调用服务', tone: 'action' },
          { t: '通知 / 回写', tone: 'out' },
        ],
      },
    ],
    link: '/pages/use-cases/',
    linkText: '更多场景',
  },
]
</script>

<template>
  <section class="home-section paper-section">
    <div class="home-inner">
      <SectionHead
        eyebrow="Use Cases"
        title="RuleGo 能干什么？"
        desc="凡是「数据进来 → 按规则处理 → 分发到别处」的场景，都是规则链的主场。下面是四个典型链路。"
      />

      <div class="uc-grid">
        <div v-for="uc in useCases" :key="uc.title" class="uc-card">
          <div class="uc-head">
            <span class="uc-icon">{{ uc.icon }}</span>
            <h3 class="uc-title">{{ uc.title }}</h3>
          </div>
          <p class="uc-desc">{{ uc.desc }}</p>

          <div class="uc-flow">
            <div v-for="(lane, li) in uc.lanes" :key="li" class="uc-lane">
              <span v-if="lane.label" class="uc-lane-label">{{ lane.label }}</span>
              <template v-for="(s, si) in lane.steps" :key="si">
                <span class="uc-chip" :class="'uc-' + s.tone">{{ s.t }}</span>
                <span v-if="si < lane.steps.length - 1" class="uc-arrow" aria-hidden="true">→</span>
              </template>
            </div>
          </div>

          <a class="uc-link" :href="uc.link">{{ uc.linkText }} →</a>
        </div>
      </div>

      <!-- 官方架构图 -->
      <div class="uc-arch">
        <img src="/img/architecture_zh.png" alt="RuleGo 架构图" class="uc-arch-img" />
        <p class="uc-arch-caption">RuleGo 整体架构：组件化核心 + 规则链编排 + Endpoint 接入</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.uc-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 860px) {
  .uc-grid {
    grid-template-columns: 1fr;
  }
}

.uc-card {
  border: 1px solid var(--rg-line);
  background: #fffdf9;
  border-radius: 12px;
  padding: 22px 22px 18px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}

.uc-card:hover {
  border-color: rgba(0, 168, 107, 0.55);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px -18px rgba(11, 21, 18, 0.35);
}

html.dark .uc-card {
  border-color: var(--rg-line-dark);
  background: rgba(255, 255, 255, 0.025);
}

html.dark .uc-card:hover {
  border-color: rgba(45, 212, 160, 0.5);
  box-shadow: 0 12px 32px -18px rgba(0, 0, 0, 0.7);
}

.uc-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.uc-icon {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: rgba(0, 168, 107, 0.1);
  border: 1px solid rgba(0, 168, 107, 0.25);
  flex-shrink: 0;
}

html.dark .uc-icon {
  background: rgba(45, 212, 160, 0.09);
  border-color: rgba(45, 212, 160, 0.28);
}

.uc-title {
  font-size: 17px;
  font-weight: 700;
  margin: 0;
}

.uc-desc {
  font-size: 13.5px;
  line-height: 1.75;
  opacity: 0.68;
  margin: 0 0 16px;
}

/* 迷你流程图 */
.uc-flow {
  background: rgba(28, 36, 32, 0.03);
  border: 1px dashed rgba(28, 36, 32, 0.14);
  border-radius: 10px;
  padding: 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: center;
}

html.dark .uc-flow {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.12);
}

.uc-lane {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.uc-lane-label {
  font-family: var(--rg-mono);
  font-size: 11px;
  color: #8a8577;
  margin-right: 2px;
}

.uc-chip {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid;
  white-space: nowrap;
}

.uc-src {
  color: #4a5a6e;
  border-color: rgba(112, 122, 138, 0.45);
  background: rgba(138, 149, 165, 0.08);
}

.uc-filter {
  color: #046d47;
  border-color: rgba(0, 137, 90, 0.5);
  background: rgba(0, 168, 107, 0.08);
}

.uc-transform {
  color: #8a6212;
  border-color: rgba(176, 128, 30, 0.5);
  background: rgba(216, 162, 74, 0.1);
}

.uc-action {
  color: #2f6ba8;
  border-color: rgba(47, 107, 168, 0.5);
  background: rgba(96, 150, 210, 0.09);
}

.uc-out {
  color: #5d3fb0;
  border-color: rgba(124, 92, 200, 0.45);
  background: rgba(124, 92, 200, 0.08);
}

html.dark .uc-src {
  color: #a8b4c4;
}

html.dark .uc-filter {
  color: #8fe3c2;
}

html.dark .uc-transform {
  color: #e8b46a;
}

html.dark .uc-action {
  color: #a8d4ef;
}

html.dark .uc-out {
  color: #c8a8ff;
}

.uc-arrow {
  color: rgba(0, 137, 90, 0.55);
  font-size: 12px;
}

html.dark .uc-arrow {
  color: rgba(45, 212, 160, 0.6);
}

.uc-link {
  margin-top: 16px;
  font-size: 13px;
  font-weight: 600;
  color: #04784f !important;
  text-decoration: none !important;
}

.uc-link:hover {
  text-decoration: underline !important;
}

html.dark .uc-link {
  color: var(--rg-green-bright) !important;
}

/* 官方架构图 */
.uc-arch {
  margin-top: 40px;
  text-align: center;
}

.uc-arch-img {
  max-width: 760px;
  width: 100%;
  border: 1px solid var(--rg-line);
  border-radius: 12px;
  background: #fff;
  padding: 8px;
}

html.dark .uc-arch-img {
  border-color: var(--rg-line-dark);
  background: rgba(255, 255, 255, 0.92);
}

.uc-arch-caption {
  margin-top: 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
