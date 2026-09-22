---
title: Ecosystem
layout: page
sidebar: false
aside: false
---

<script setup>
import EcoMatrix from '../../.vitepress/theme/components/EcoMatrix.vue'
</script>

<div class="eco-page">
  <div class="eco-page-head">
    <span class="eco-page-eyebrow">ECOSYSTEM</span>
    <h1>One Base, Every Scenario</h1>
    <p>
      RuleGo is a powerful engine for building scenario applications: the component-based rule-chain kernel handles
      orchestration, while frameworks on top of it provide protocol access, industrial data collection, stream
      processing, agents and workflow. The application layer assembles these capabilities into ready-to-run products —
      from an application development platform to an industrial edge gateway — all on the same base.
    </p>
  </div>

  <EcoMatrix />

  <section class="eco-note">
    <h2>Notes</h2>
    <ul>
      <li>Documentation for the base engine lives on this site: guide, components, Endpoint, StreamSQL, agents and IoT sections.</li>
      <li>Applications are independently evolving products with their own sites and docs (edge.rulego.cc, gflow.rulego.cc, editor.rulego.cc); this page only links to them.</li>
      <li>Want to build your own scenario on the base? Start with the <a href="/en/pages/introduction/">engine docs</a>. Want a ready-made product? Visit each product's site.</li>
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
