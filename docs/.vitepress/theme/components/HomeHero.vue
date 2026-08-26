<script setup lang="ts">
import HeroFlow from './HeroFlow.vue'

const stats = [
  { num: '100', unit: '+', label: '内置组件，搭积木式复用' },
  { num: '30', unit: '+', label: 'Endpoint 接入协议' },
  { num: '0', unit: '', label: '外部中间件依赖' },
  { num: '2', unit: '种', label: '运行形态：嵌入式 / 独立部署' },
]
</script>

<template>
  <header class="hero-wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <a class="hero-announce" href="https://github.com/rulego/rulego/blob/main/doc/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
          <span class="dot"></span>
          v0.37.0 发布 · 新增 10 个工业协议采集族与 AI Agent 框架增强
          <span aria-hidden="true">→</span>
        </a>

        <h1 class="hero-title">把复杂逻辑，<span class="accent">编排成一条链。</span></h1>
        <p class="hero-subtitle">RuleGo · Go 组件编排规则引擎</p>

        <p class="hero-desc">
          <strong>100+ 内置组件</strong>：过滤器、转换器、动作、外部集成、AI、工业协议采集……<br />
          <strong>热更新</strong>：规则链动态编排，不重启应用即可替换业务逻辑<br />
          <strong>轻量嵌入</strong>：无外部中间件依赖，边缘到云端同一套引擎
        </p>

        <div class="hero-actions">
          <a class="rg-btn rg-btn-primary" href="/pages/introduction/">
            快速开始
            <span aria-hidden="true">→</span>
          </a>
          <a class="rg-btn rg-btn-ghost" href="https://github.com/rulego/rulego" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a class="rg-btn rg-btn-ghost" href="https://gitee.com/rulego/rulego" target="_blank" rel="noopener noreferrer">
            Gitee
          </a>
          <a class="rg-btn rg-btn-ghost" href="https://app.rulego.cc/" target="_blank" rel="noopener noreferrer">
            在线演示
          </a>
        </div>

        <div class="hero-meta">
          <span class="hero-chip">Apache-2.0</span>
          <span class="hero-chip">规则链 <b>JSON DSL</b></span>
          <span class="hero-chip">子规则链嵌套</span>
          <span class="hero-chip">AOP</span>
        </div>
      </div>

      <!-- 右侧：规则链流程图（多源输入 · 条件分支 · 扇出分发） -->
      <HeroFlow />
    </div>

    <!-- 数据条 -->
    <div class="stats-bar">
      <div class="stats-inner">
        <div v-for="s in stats" :key="s.label" class="stat-cell">
          <div class="stat-num">{{ s.num }}<em>{{ s.unit }}</em></div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </header>
</template>
