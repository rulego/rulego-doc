<script setup lang="ts">
import SectionHead from './SectionHead.vue'

// 数据源自旧站首页 cardList（迁移保留）
const sponsors = [
  {
    name: 'Sagoo IOT',
    desc: '基于 Golang 开发的企业级开源物联网系统',
    avatar: '/img/sponsors/shaguo.png',
    link: 'https://iotdoc.sagoo.cn/?from=rulego',
    bgColor: '#f8c567',
    textColor: '#1f2328',
  },
  {
    name: 'Hummingbird',
    desc: '基于 Golang 开发的轻量级物联网平台',
    avatar: '/img/sponsors/hummingbird.jpg',
    link: 'https://doc.hummingbird.winc-link.com/?from=rulego',
    bgColor: '#2196F3',
    textColor: '#1f2328',
  },
  {
    name: '联犀',
    desc: '基于 Go 语言开发的商业级 SaaS 云原生微服务物联网平台',
    avatar: 'https://doc.unitedrhino.com/logo/logo.png',
    link: 'https://doc.unitedrhino.com/',
    bgColor: '#A6A1F3',
    textColor: '#1f2328',
  },
]
</script>

<template>
  <div>
    <SectionHead
      eyebrow="Special Users"
      title="🏆 特别用户"
      desc="正在生产环境使用 RuleGo 的项目。欢迎通过 Issue 或社区告诉我们你的案例。"
    />

    <div class="sp-grid">
      <a
        v-for="s in sponsors"
        :key="s.name"
        class="sp-card"
        :href="s.link"
        target="_blank"
        rel="noopener noreferrer"
        :style="{ background: s.bgColor, color: s.textColor }"
      >
        <img class="sp-avatar" :src="s.avatar" :alt="s.name" />
        <div class="sp-body">
          <div class="sp-name">{{ s.name }}</div>
          <div class="sp-desc">{{ s.desc }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.sp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 960px) {
  .sp-grid {
    grid-template-columns: 1fr;
  }
}

.sp-card {
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  padding: 20px 22px;
  text-decoration: none !important;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 8px 24px -14px rgba(11, 21, 18, 0.3);
}

.sp-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px -16px rgba(11, 21, 18, 0.4);
}

.sp-avatar {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.75);
  padding: 4px;
  flex-shrink: 0;
}

.sp-name {
  font-size: 16.5px;
  font-weight: 800;
}

.sp-desc {
  font-size: 13px;
  line-height: 1.65;
  opacity: 0.82;
  margin-top: 4px;
}
</style>
