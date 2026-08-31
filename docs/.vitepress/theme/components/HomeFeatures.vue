<script setup lang="ts">
import { useData } from 'vitepress'
import SectionHead from './SectionHead.vue'

const { lang } = useData()
const isEn = lang.value.startsWith('en')
const t = (zh: string, en: string) => (isEn ? en : zh)

const features = [
  {
    icon: '🪶',
    title: t('轻量级', 'Lightweight'),
    desc: t(
      '无外部中间件依赖，可下沉到边缘服务器实现物联网边缘计算，也可部署在云端作为规则引擎服务。',
      'No external middleware dependencies. Sink it onto edge servers for edge computing, or deploy it in the cloud as a rule-engine service.'
    ),
    tags: [t('边缘计算', 'Edge computing'), t('资源占用低', 'Low footprint')],
  },
  {
    icon: '⚡',
    title: t('高性能', 'High Performance'),
    desc: t(
      '得益于 Go 的高性能特性，采用协程池、对象池等技术；可靠的上下文隔离机制，高并发下无数据串流。',
      "Leans on Go's strengths: goroutine pools, object pools, and reliable context isolation — high concurrency never crosses message streams."
    ),
    tags: [t('协程池', 'Goroutine pool'), t('对象池', 'Object pool')],
  },
  {
    icon: '🎯',
    title: t('双模式', 'Dual Mode'),
    desc: t(
      '嵌入式：作为内部组件嵌入现有应用；独立部署：作为中间件提供规则引擎与编排服务。',
      'Embedded: ship it inside your existing application. Standalone: run it as middleware exposing rule-engine and orchestration services.'
    ),
    tags: ['embed', 'standalone'],
  },
  {
    icon: '🧩',
    title: t('组件化', 'Componentized'),
    desc: t(
      '所有业务逻辑都是组件，灵活配置与复用；自定义组件接口把业务封装成积木，应对高度变化的业务需求。',
      'All business logic is a component you configure and reuse; wrap bespoke business into building blocks behind a small custom-component API.'
    ),
    tags: [t('100+ 内置', '100+ built-in'), t('自定义扩展', 'Custom extensions')],
  },
  {
    icon: '☘️',
    title: t('热更新', 'Hot Updates'),
    desc: t(
      '规则链支持动态编排：不重启应用，实时替换或新增业务逻辑；支持 Go plugin 动态加载组件。',
      'Chains re-orchestrate dynamically: swap or add business logic without restarting the app; load components at runtime via Go plugin.'
    ),
    tags: [t('动态编排', 'Dynamic orchestration'), 'plugin'],
  },
  {
    icon: '🔗',
    title: t('嵌套与 AOP', 'Nesting & AOP'),
    desc: t(
      '子规则链嵌套实现流程复用；AOP 机制在不修改原逻辑的前提下为规则链执行添加行为或整体替换。',
      'Sub-chains reuse whole flows; AOP adds behavior around chain execution — or replaces it wholesale — without touching the original logic.'
    ),
    tags: [t('子规则链', 'Sub-chains'), t('AOP 切面', 'AOP aspects')],
  },
]
</script>

<template>
  <section class="home-section paper-section">
    <div class="home-inner">
      <SectionHead
        eyebrow="Features"
        :title="isEn ? 'A rule engine built for change' : '为变化而生的规则引擎'"
        :desc="
          isEn
            ? 'Define chains in JSON — no dedicated rule language to learn. Component orchestration, hot updates and AOP decouple highly bespoke business logic from your code.'
            : 'JSON 定义规则链，无需学习专门规则语言。组件编排、热更新、AOP——把高度定制的业务逻辑从代码里解耦出来。'
        "
      />

      <div class="feat-grid">
        <div v-for="f in features" :key="f.title" class="feat-card">
          <div class="feat-icon">{{ f.icon }}</div>
          <h3 class="feat-title">{{ f.title }}</h3>
          <p class="feat-desc">{{ f.desc }}</p>
          <div class="feat-tags">
            <span v-for="t in f.tags" :key="t" class="feat-tag">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 960px) {
  .feat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .feat-grid {
    grid-template-columns: 1fr;
  }
}

.feat-card {
  border: 1px solid var(--rg-line);
  background: #fffdf9;
  border-radius: 10px;
  padding: 22px 22px 20px;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}

.feat-card:hover {
  border-color: rgba(0, 168, 107, 0.55);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px -18px rgba(11, 21, 18, 0.35);
}

.dark .feat-card {
  border-color: var(--rg-line-dark);
  background: rgba(255, 255, 255, 0.025);
}

.dark .feat-card:hover {
  border-color: rgba(45, 212, 160, 0.5);
  box-shadow: 0 12px 32px -18px rgba(0, 0, 0, 0.7);
}

.feat-icon {
  width: 40px;
  height: 40px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  margin-bottom: 14px;
  background: rgba(0, 168, 107, 0.1);
  border: 1px solid rgba(0, 168, 107, 0.25);
}

.dark .feat-icon {
  background: rgba(45, 212, 160, 0.09);
  border-color: rgba(45, 212, 160, 0.28);
}

.feat-title {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 8px;
}

.feat-desc {
  font-size: 13.5px;
  line-height: 1.75;
  opacity: 0.68;
  margin: 0 0 6px;
}

.feat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.feat-tag {
  font-family: var(--rg-mono);
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 5px;
  background: rgba(0, 168, 107, 0.08);
  color: #04784f;
  border: 1px solid rgba(0, 168, 107, 0.18);
}

.dark .feat-tag {
  background: rgba(45, 212, 160, 0.08);
  color: #8fe3c2;
  border-color: rgba(45, 212, 160, 0.2);
}
</style>
