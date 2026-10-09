<script setup lang="ts">
import { useData } from 'vitepress'
import { ecoItems } from '../ecosystem.mts'

// 首页家族区：一个底座 + 三条产品线的分组车道（AI/边缘/工作流），不做开源商业视觉区分
const { lang } = useData()
const isEn = lang.value.startsWith('en')

const lanes = [
  {
    key: 'agent',
    title: isEn ? 'AI Agents' : 'AI 智能体',
    slogan: isEn ? 'A rule chain is an agent' : '规则链即智能体',
    ids: ['ai-agent', 'tpclaw'],
  },
  {
    key: 'edge',
    title: isEn ? 'Edge & Industrial' : '边缘与工业物联',
    slogan: isEn ? 'The gateway with AI employees' : '装着 AI 员工的网关',
    ids: ['streamsql', 'endpoint', 'iot', 'rulego-edge'],
  },
  {
    key: 'workflow',
    title: isEn ? 'Workflow & Platform' : '工作流与平台',
    slogan: isEn ? 'Chinese-style approval workflow' : '中国式审批工作流',
    ids: ['gflow-engine', 'gflow-platform', 'server', 'rulego-editor'],
  },
]

const of = (id: string) => ecoItems.find((i) => i.id === id)

const primary = (item: { doc?: string; site?: string; repo?: string }) => {
  const link = item.doc || item.site || item.repo || ''
  // 站内文档链接在 en 下补 /en 前缀
  return isEn && link.startsWith('/') ? '/en' + link : link
}
</script>

<template>
  <section class="home-section dark-section family-section">
    <div class="home-inner">
      <div class="family-head">
        <div>
          <h2 class="family-title">{{ isEn ? 'The RuleGo Family' : 'RuleGo 家族' }}</h2>
          <p class="family-desc">
            {{
              isEn
                ? 'One base, three product lines — agents, edge gateways and workflow platforms, all speaking the same chain DSL.'
                : '一个底座，长出三条产品线——智能体、边缘网关与工作流平台，讲的是同一种链式语言。'
            }}
          </p>
        </div>
        <a :href="isEn ? '/en/ecosystem/' : '/ecosystem/'" class="rg-btn rg-btn-ghost ghost-light family-more">
          {{ isEn ? 'Ecosystem Overview →' : '生态总览 →' }}
        </a>
      </div>

      <div class="family-lanes">
        <!-- 站内链接统一用 <a>，由 VitePress 全局点击拦截走 SPA -->
        <div v-for="lane in lanes" :key="lane.key" class="family-lane">
          <div class="lane-label">
            <span class="lane-name">{{ lane.title }}</span>
            <span class="lane-slogan">{{ lane.slogan }}</span>
          </div>
          <div class="lane-items">
            <a
              v-for="item in lane.ids.map(of).filter(Boolean)"
              :key="item!.id"
              class="eco-chip"
              :href="primary(item!)"
              :target="primary(item!).startsWith('/') ? undefined : '_blank'"
              :rel="primary(item!).startsWith('/') ? undefined : 'noopener noreferrer'"
            >
              <img v-if="item!.logo" class="eco-chip-logo" :src="item!.logo" alt="" loading="lazy" />
              <span v-else class="eco-emoji">{{ item!.emoji }}</span>
              <span class="eco-chip-text">
                <span class="eco-chip-name">{{ (isEn ? item!.nameEn : undefined) || item!.name }}</span>
                <span class="eco-chip-desc">{{ (isEn ? item!.taglineEn : undefined) || item!.tagline }}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.family-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.family-title {
  font-size: clamp(26px, 3.6vw, 38px);
  font-weight: 800;
  line-height: 1.25;
  margin: 0 0 12px;
}

.family-desc {
  font-size: 16px;
  line-height: 1.8;
  opacity: 0.72;
  max-width: 640px;
  margin: 0;
}

.family-more {
  flex-shrink: 0;
}

.family-lanes {
  border-top: 1px solid rgba(255, 255, 255, 0.09);
}

.family-lane {
  display: grid;
  grid-template-columns: 218px 1fr;
  gap: 18px;
  padding: 22px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

.lane-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 2px;
}

.lane-name {
  font-size: 16px;
  font-weight: 800;
  color: #e9efe9;
}

.lane-slogan {
  font-family: var(--rg-mono);
  font-size: 12px;
  line-height: 1.6;
  color: #8fe3c2;
}

.lane-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px;
}

.eco-chip {
  display: flex;
  align-items: center;
  gap: 11px;
  border: 1px solid var(--rg-line-dark);
  background: rgba(255, 255, 255, 0.025);
  border-radius: 10px;
  padding: 12px 14px;
  text-decoration: none !important;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.eco-chip:hover {
  border-color: rgba(45, 212, 160, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 10px 28px -16px rgba(0, 0, 0, 0.7);
}

.eco-chip-logo {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  object-fit: contain;
  border-radius: 6px;
}

.eco-chip-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.eco-chip-name {
  font-size: 14px;
  font-weight: 700;
  color: #e9efe9;
}

.eco-chip-desc {
  font-size: 12px;
  line-height: 1.55;
  color: #a9bfb2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 浅色外观：dark-section 反转为纸白系（custom.css 全局处理底色），此处补齐浅色值 */
html:not(.dark) .family-lanes,
html:not(.dark) .family-lane {
  border-color: var(--rg-line);
}

html:not(.dark) .eco-chip {
  border-color: var(--rg-line);
  background: #fffdf9;
}

html:not(.dark) .eco-chip:hover {
  border-color: rgba(0, 168, 107, 0.55);
  box-shadow: 0 10px 28px -16px rgba(11, 21, 18, 0.35);
}

html:not(.dark) .eco-chip-name {
  color: #22302a;
}

html:not(.dark) .eco-chip-desc {
  color: #5b6b62;
}

html:not(.dark) .lane-name {
  color: #22302a;
}

html:not(.dark) .lane-slogan {
  color: #04784f;
}

@media (max-width: 860px) {
  .family-lane {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 18px 0;
  }

  .lane-label {
    flex-direction: row;
    align-items: baseline;
    gap: 12px;
  }
}
</style>
