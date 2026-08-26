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
    <h1>RuleGo 生态总览</h1>
    <p>
      一个家族（RuleGo 底座），分层产品。引擎与框架层提供规则链、智能体、流处理与协议接入等开源能力；
      平台层把它们组装成开箱即用的应用；商业产品在各自的站点提供完整细节。
    </p>
  </div>

  <EcoMatrix />

  <section class="eco-note">
    <h2>说明</h2>
    <ul>
      <li>标注「开源」的项目遵循 Apache-2.0 或对应开源许可，可自由嵌入与二次开发。</li>
      <li>商业产品的定价、授权与演示信息在它们自己的站点（gflow.rulego.cc、editor.rulego.cc），本站不做展开。</li>
      <li>rulego-edge 处于建设中，先以仓库形式公开进展，文档区暂不开放。</li>
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
