---
layout: page
sidebar: false
aside: false
notice:
  version: v0.37.0
  date: 2026-08-02
  title: 📢 RuleGo v0.37.0 Released!
  items:
    - '🏭 IoT end-to-end data pipelines: 8 new industrial protocol collection families — S7, EtherNet/IP, SNMP, MC, FINS, DL/T645, HJ212, IEC104 (10 protocol families in total); 5 new time-series database drivers: openGemini, InfluxDB, TDengine, TimescaleDB, Prometheus Remote Write'
    - '⚙️ Soft PLC control: new x/control/timer (TON/TOF delays) and x/control/watchdog (heartbeat watchdog) control nodes'
    - '🧭 Nacos service discovery: new rulego-components-discovery library supporting service invocation, config read/write and subscription'
    - '🌊 Stream processing: StreamSQL adds CEP (MATCH_RECOGNIZE) pattern recognition and stream-table JOIN enrichment'
    - '🔗 Engine: per-chain connection pools, endpoint session-addressed push, component aliasing'
    - '🎨 Editor: command palette, context menus, chain diagnostics, component doc browser, Excel import for data-point tables'
    - '🤖 AI Agent framework: AG-UI streaming mode, thought-process passthrough, doom-loop protection, grep/glob tools'
  link: https://github.com/rulego/rulego/blob/main/doc/CHANGELOG.md
  linkText: View the full changelog
---

<script setup>
import HomeHero from '../.vitepress/theme/components/HomeHero.vue'
import HomeFeatures from '../.vitepress/theme/components/HomeFeatures.vue'
import HomeUseCases from '../.vitepress/theme/components/HomeUseCases.vue'
import HomeComponents from '../.vitepress/theme/components/HomeComponents.vue'
import HomeEcoStrip from '../.vitepress/theme/components/HomeEcoStrip.vue'
import HomeQuickstart from '../.vitepress/theme/components/HomeQuickstart.vue'
import HomeSponsors from '../.vitepress/theme/components/HomeSponsors.vue'
import HomeCta from '../.vitepress/theme/components/HomeCta.vue'
import HomeLinks from '../.vitepress/theme/components/HomeLinks.vue'
import HomeNotice from '../.vitepress/theme/components/HomeNotice.vue'
</script>

<HomeNotice />
<HomeHero />
<HomeFeatures />
<HomeUseCases />
<HomeComponents />
<HomeEcoStrip />
<HomeQuickstart />

<section class="home-section paper-section" style="padding-top: 0">
  <div class="home-inner">
    <HomeSponsors />
  </div>
</section>

<HomeCta />

<section class="home-section paper-section" style="padding: 26px 24px 34px">
  <div class="home-inner">
    <HomeLinks />
  </div>
</section>

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
</style>
