---
layout: page
sidebar: false
aside: false
---

<script setup>
import HomeHero from './.vitepress/theme/components/HomeHero.vue'
import EcoMatrix from './.vitepress/theme/components/EcoMatrix.vue'
import EcoArchDiagram from './.vitepress/theme/components/EcoArchDiagram.vue'
import SectionHead from './.vitepress/theme/components/SectionHead.vue'
import HomeQuickstart from './.vitepress/theme/components/HomeQuickstart.vue'
import HomeCta from './.vitepress/theme/components/HomeCta.vue'
</script>

<HomeHero />

<section class="home-section dark-section" style="padding-top: 64px">
  <div class="home-inner">
    <SectionHead
      eyebrow="Ecosystem"
      title="一个家族，分层产品"
      desc="引擎 / 框架层全部开源，平台层开箱即用，商业产品在独立站点呈现细节——所有产品共享 RuleGo 规则链这一套底座。"
    />
    <EcoMatrix compact />
    <div class="eco-more">
      <RouterLink to="/ecosystem/" class="rg-btn rg-btn-ghost">查看生态总览 →</RouterLink>
    </div>
  </div>
</section>

<section class="home-section paper-section">
  <div class="home-inner">
    <SectionHead
      eyebrow="Architecture"
      title="三层架构，同一底座"
      desc="从引擎核心到商业产品，每一层都构建在规则链 DSL 与组件生态之上：学到一次，处处可用。"
    />
    <EcoArchDiagram />
  </div>
</section>

<HomeQuickstart />

<HomeCta />

<style scoped>
:global(.main .container) {
  max-width: 100%;
  padding: 0;
  margin: 0;
}

:global(.content) {
  padding: 0 !important;
  padding-bottom: 0 !important;
}

:global(.content-container) {
  max-width: 100% !important;
}

:global(.VPContent.is-home) {
  padding-bottom: 0 !important;
}

.eco-more {
  margin-top: 34px;
  text-align: center;
}
</style>
