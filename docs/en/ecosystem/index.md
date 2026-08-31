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
    <h1>The RuleGo Ecosystem</h1>
    <p>
      One family on a shared core. The engine &amp; framework layers provide open-source capabilities — rule chains,
      agents, stream processing and protocol access; the platform layer assembles them into ready-to-run
      applications; commercial products keep their full details on their own sites.
    </p>
  </div>

  <EcoMatrix />

  <section class="eco-note">
    <h2>Notes</h2>
    <ul>
      <li>Items marked "Open Source" are Apache-2.0 licensed or under their stated license — free to embed and build upon.</li>
      <li>Pricing, licensing and demo information for commercial products lives on their own sites (gflow.rulego.cc, editor.rulego.cc); this site does not expand on it.</li>
      <li>rulego-edge is under construction; progress is public in its repository for now.</li>
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
