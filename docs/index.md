---
layout: page
sidebar: false
aside: false
notice:
  version: v0.37.0
  date: 2026-08-02
  title: 📢 RuleGo v0.37.0 发布！
  items:
    - '🏭 IoT 端到端数据管道：新增 S7、EtherNet/IP、SNMP、MC、FINS、DL/T645、HJ212、IEC104 等 8 个工业协议采集族（共 10 个协议族）；新增 openGemini、InfluxDB、TDengine、TimescaleDB、Prometheus Remote Write 等 5 个时序库驱动'
    - '⚙️ 软 PLC 控制：新增 x/control/timer（TON/TOF 延时）与 x/control/watchdog（心跳看门狗）控制节点'
    - '🧭 Nacos 服务发现：新增组件库 rulego-components-discovery，支持服务调用、配置读写与订阅'
    - '🌊 流计算：StreamSQL 支持 CEP（MATCH_RECOGNIZE）模式识别与流-表 JOIN 富化'
    - '🔗 引擎：同链连接池、endpoint 会话寻址推送、组件别名机制'
    - '🎨 编辑器：命令面板、右键菜单、链路诊断、组件文档浏览器、点位表 Excel 导入'
    - '🤖 AI Agent 框架：AG-UI 流式模式、思考过程透传、doom-loop 循环防护、grep/glob 工具'
  link: https://github.com/rulego/rulego/blob/main/doc/CHANGELOG.md
  linkText: 查看完整更新日志
---

<script setup>
import HomeHero from './.vitepress/theme/components/HomeHero.vue'
import HomeFeatures from './.vitepress/theme/components/HomeFeatures.vue'
import HomeUseCases from './.vitepress/theme/components/HomeUseCases.vue'
import HomeComponents from './.vitepress/theme/components/HomeComponents.vue'
import HomeEcoStrip from './.vitepress/theme/components/HomeEcoStrip.vue'
import HomeQuickstart from './.vitepress/theme/components/HomeQuickstart.vue'
import HomeSponsors from './.vitepress/theme/components/HomeSponsors.vue'
import HomeCta from './.vitepress/theme/components/HomeCta.vue'
import HomeLinks from './.vitepress/theme/components/HomeLinks.vue'
import HomeNotice from './.vitepress/theme/components/HomeNotice.vue'
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
