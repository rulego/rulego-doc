<script setup lang="ts">
import { useData } from 'vitepress'
import HeroFlow from './HeroFlow.vue'

const { lang } = useData()
const isEn = lang.value.startsWith('en')
// 站内链接在 en 下补前缀
const p = (path: string) => (isEn ? '/en' + path : path)

const t = (zh: string, en: string) => (isEn ? en : zh)

const stats = [
  { num: '100', unit: '+', label: t('内置组件，搭积木式复用', 'built-in components, reusable as blocks') },
  { num: '30', unit: '+', label: t('Endpoint 接入协议', 'endpoint access protocols') },
  { num: '0', unit: '', label: t('外部中间件依赖', 'external middleware dependencies') },
  {
    num: '5',
    unit: '+',
    label: t('长在同一底座上的场景应用', 'scenario applications on one base'),
  },
]
</script>

<template>
  <header class="hero-wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <a class="hero-announce" href="https://github.com/rulego/rulego/blob/main/doc/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
          <span class="dot"></span>
          {{
            isEn
              ? 'v0.37.0 released · 10 new industrial protocol collection families & AI agent framework upgrades'
              : 'v0.37.0 发布 · 新增 10 个工业协议采集族与 AI Agent 框架增强'
          }}
          <span aria-hidden="true">→</span>
        </a>

        <h1 class="hero-title">
          {{ isEn ? 'Orchestrate complex logic ' : '把复杂逻辑，' }}<span class="accent">{{ isEn ? 'into a chain.' : '编排成一条链。' }}</span>
        </h1>
        <p class="hero-subtitle">{{ isEn ? 'RuleGo · Component-Orchestration Rule Engine for Go' : 'RuleGo · Go 组件编排规则引擎' }}</p>

        <p class="hero-desc" v-if="!isEn">
          <strong>100+ 内置组件</strong>：过滤器、转换器、动作、外部集成、AI、工业协议采集……<br />
          <strong>热更新</strong>：规则链动态编排，不重启应用即可替换业务逻辑<br />
          <strong>轻量嵌入</strong>：无外部中间件依赖，边缘到云端同一套引擎
        </p>
        <p class="hero-desc" v-else>
          <strong>100+ built-in components</strong>: filters, transformers, actions, external integrations, AI, industrial protocol collectors…<br />
          <strong>Hot updates</strong>: chains re-orchestrate live — replace business logic without restarting the app<br />
          <strong>Lightweight embed</strong>: zero middleware dependencies; one engine from edge to cloud
        </p>

        <div class="hero-actions">
          <a class="rg-btn rg-btn-primary" :href="p('/pages/introduction/')">
            {{ isEn ? 'Quick Start' : '快速开始' }}
            <span aria-hidden="true">→</span>
          </a>
          <a class="rg-btn rg-btn-ghost" href="https://github.com/rulego/rulego" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a class="rg-btn rg-btn-ghost" href="https://gitee.com/rulego/rulego" target="_blank" rel="noopener noreferrer">
            Gitee
          </a>
          <a class="rg-btn rg-btn-ghost" href="https://app.rulego.cc/" target="_blank" rel="noopener noreferrer">
            {{ isEn ? 'Live Demo' : '在线演示' }}
          </a>
        </div>

        <div class="hero-meta">
          <span class="hero-chip">Apache-2.0</span>
          <span class="hero-chip">{{ t('规则链 JSON DSL', 'Rule chains · JSON DSL') }}</span>
          <span class="hero-chip">{{ t('子规则链嵌套', 'Sub-chain nesting') }}</span>
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
