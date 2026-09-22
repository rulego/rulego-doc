---
title: 生态总览
layout: page
sidebar: false
aside: false
---

<script setup>
import EcoMatrix from '../.vitepress/theme/components/EcoMatrix.vue'
</script>

<div class="eco-page">
  <div class="eco-page-head">
    <span class="eco-page-eyebrow">ECOSYSTEM</span>
    <h1>一个底座，长出所有场景</h1>
    <p>
      RuleGo 是一个可以开发各种场景应用的强大引擎：组件化的规则链内核负责编排，长在其上的框架提供协议接入、工业采集、流式计算、智能体与工作流能力。
      场景应用层则把这些能力组装成开箱即用的产品——从应用开发平台、工业边缘网关到审批工作流，都构建在同一个底座之上。
    </p>
  </div>

  <EcoMatrix />

  <section class="eco-note">
    <h2>说明</h2>
    <ul>
      <li>底座引擎的文档就在本站：指南、组件、Endpoint、StreamSQL、智能体、IoT 各区。</li>
      <li>场景应用是独立演进的产品，各有自己的站点与文档（如 edge.rulego.cc、gflow.rulego.cc、editor.rulego.cc），本站只做导航。</li>
      <li>想用底座做自己的场景？从 <a href="/pages/introduction/">引擎文档</a> 开始；想直接拿到成品？进各产品站点了解。</li>
    </ul>
  </section>
</div>

<style scoped>
.eco-page {
  max-width: 1160px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.eco-page-eyebrow {
  font-family: var(--rg-mono);
  font-size: 12.5px;
  letter-spacing: 0.22em;
  color: var(--rg-green);
}

.eco-page-head h1 {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  margin: 10px 0 14px;
  line-height: 1.25;
}

.eco-page-head p {
  font-size: 16px;
  line-height: 1.9;
  color: var(--vp-c-text-2);
  max-width: 760px;
  margin: 0 0 40px;
}

.eco-note {
  margin-top: 56px;
  padding: 22px 26px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
}

.eco-note h2 {
  font-size: 17px;
  margin: 0 0 10px;
  border: none;
  padding: 0;
}

.eco-note ul {
  margin: 0;
  padding-left: 20px;
}

.eco-note li {
  font-size: 14px;
  line-height: 2;
  color: var(--vp-c-text-2);
}
</style>
