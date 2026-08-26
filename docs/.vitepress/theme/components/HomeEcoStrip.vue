<script setup lang="ts">
import { ecoItems } from '../ecosystem.mts'
import EcoBadge from './EcoBadge.vue'

// 首页生态条：平铺呈现，不做分层叙事；徽章 + 出口链接，商业呈现克制
const items = ecoItems.filter((i) => i.id !== 'rulego') // 首页本身就是 RuleGo

const primary = (item: (typeof items)[number]) => item.doc || item.site || item.repo || ''
</script>

<template>
  <section class="home-section paper-section">
    <div class="home-inner">
      <div class="eco-strip-head">
        <div>
          <span class="eco-strip-eyebrow">FAMILY</span>
          <h2 class="eco-strip-title">RuleGo 家族</h2>
          <p class="eco-strip-desc">
            同一套规则链底座之上的产品与框架——从智能体、流处理到边缘网关与可视化编辑器。
          </p>
        </div>
        <a href="/ecosystem/" class="rg-btn rg-btn-ghost ghost-light eco-strip-more">
          生态总览 →
        </a>
      </div>

      <div class="eco-strip">
        <!-- 统一用 <a>：站内链接由 VitePress 全局点击拦截走 SPA，SSR 下无需解析 RouterLink -->
        <a
          v-for="item in items"
          :key="item.id"
          class="eco-chip"
          :href="primary(item)"
          :target="primary(item).startsWith('/') ? undefined : '_blank'"
          :rel="primary(item).startsWith('/') ? undefined : 'noopener noreferrer'"
        >
          <span class="eco-emoji">{{ item.emoji }}</span>
          <span class="eco-chip-name">{{ item.name }}</span>
          <EcoBadge :type="item.badge" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.eco-strip-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 26px;
  flex-wrap: wrap;
}

.eco-strip-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--rg-mono);
  font-size: 12.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--rg-green);
}

.eco-strip-eyebrow::before {
  content: '';
  width: 26px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
}

.eco-strip-title {
  font-size: clamp(26px, 3.6vw, 38px);
  font-weight: 800;
  line-height: 1.25;
  margin: 0 0 12px;
}

.eco-strip-desc {
  font-size: 16px;
  line-height: 1.8;
  opacity: 0.72;
  max-width: 640px;
  margin: 0;
}

.eco-strip-more {
  flex-shrink: 0;
}

.eco-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

@media (max-width: 1080px) {
  .eco-strip {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 720px) {
  .eco-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}

.eco-chip {
  display: flex;
  align-items: center;
  gap: 9px;
  border: 1px solid var(--rg-line);
  background: #fffdf9;
  border-radius: 10px;
  padding: 13px 14px;
  text-decoration: none !important;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.eco-chip:hover {
  border-color: rgba(0, 168, 107, 0.55);
  transform: translateY(-2px);
  box-shadow: 0 10px 28px -16px rgba(11, 21, 18, 0.35);
}

.eco-chip-name {
  font-size: 14px;
  font-weight: 700;
  color: #22302a;
  flex: 1;
}

html.dark .eco-chip {
  border-color: var(--rg-line-dark);
  background: rgba(255, 255, 255, 0.025);
}

html.dark .eco-chip:hover {
  border-color: rgba(45, 212, 160, 0.5);
  box-shadow: 0 10px 28px -16px rgba(0, 0, 0, 0.7);
}

html.dark .eco-chip-name {
  color: #e9efe9;
}
</style>
