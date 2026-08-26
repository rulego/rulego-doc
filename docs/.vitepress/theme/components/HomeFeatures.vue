<script setup lang="ts">
import SectionHead from './SectionHead.vue'

const features = [
  {
    icon: '🪶',
    title: '轻量级',
    desc: '无外部中间件依赖，可下沉到边缘服务器实现物联网边缘计算，也可部署在云端作为规则引擎服务。',
    tags: ['边缘计算', '资源占用低'],
  },
  {
    icon: '⚡',
    title: '高性能',
    desc: '得益于 Go 的高性能特性，采用协程池、对象池等技术；可靠的上下文隔离机制，高并发下无数据串流。',
    tags: ['协程池', '对象池'],
  },
  {
    icon: '🎯',
    title: '双模式',
    desc: '嵌入式：作为内部组件嵌入现有应用；独立部署：作为中间件提供规则引擎与编排服务。',
    tags: ['embed', 'standalone'],
  },
  {
    icon: '🧩',
    title: '组件化',
    desc: '所有业务逻辑都是组件，灵活配置与复用；自定义组件接口把业务封装成积木，应对高度变化的业务需求。',
    tags: ['100+ 内置', '自定义扩展'],
  },
  {
    icon: '☘️',
    title: '热更新',
    desc: '规则链支持动态编排：不重启应用，实时替换或新增业务逻辑；支持 Go plugin 动态加载组件。',
    tags: ['动态编排', 'plugin'],
  },
  {
    icon: '🔗',
    title: '嵌套与 AOP',
    desc: '子规则链嵌套实现流程复用；AOP 机制在不修改原逻辑的前提下为规则链执行添加行为或整体替换。',
    tags: ['子规则链', 'AOP 切面'],
  },
]
</script>

<template>
  <section class="home-section paper-section">
    <div class="home-inner">
      <SectionHead
        eyebrow="Features"
        title="为变化而生的规则引擎"
        desc="JSON 定义规则链，无需学习专门规则语言。组件编排、热更新、AOP——把高度定制的业务逻辑从代码里解耦出来。"
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
