<script setup lang="ts">
import { useData } from 'vitepress'
import SectionHead from './SectionHead.vue'

const { lang } = useData()
const isEn = lang.value.startsWith('en')
const t = (zh: string, en: string) => (isEn ? en : zh)

// 数据源自旧站首页 cardList（迁移保留）。expired 为续费提醒用字段，仅存于数据、不做任何展示逻辑。
const sponsors = [
  {
    name: 'Sagoo IOT',
    desc: t(
      '基于 Golang 开发的企业级开源物联网系统',
      'Enterprise-grade open-source IoT system built with Golang'
    ),
    avatar: '/img/sponsors/shaguo.png',
    link: 'https://iotdoc.sagoo.cn/?from=rulego',
    bgColor: '#f8c567',
    textColor: '#1f2328',
    expired: '2026-11-07',
  },
  {
    name: 'Hummingbird',
    desc: t(
      '基于 Golang 开发的轻量级物联网平台',
      'Lightweight IoT platform built with Golang'
    ),
    avatar: '/img/sponsors/hummingbird.jpg',
    link: 'https://doc.hummingbird.winc-link.com/?from=rulego',
    bgColor: '#2196F3',
    textColor: '#1f2328',
    expired: '2025-07-11',
  },
  {
    name: t('联犀', 'UnitedRhino'),
    desc: t(
      '基于 Go 语言开发的商业级 SaaS 云原生微服务物联网平台',
      'Commercial-grade SaaS cloud-native microservices IoT platform built with Go'
    ),
    avatar: 'https://doc.unitedrhino.com/logo/logo.png',
    link: 'https://doc.unitedrhino.com/',
    bgColor: '#A6A1F3',
    textColor: '#1f2328',
    expired: '2026-04-05',
  },
]
</script>

<template>
  <div>
    <SectionHead
      eyebrow="Special Users"
      :title="isEn ? 'Teams Running RuleGo' : '特别用户'"
      :desc="
        isEn
          ? 'Projects using RuleGo in production. Tell us about yours via an issue or the community.'
          : '正在生产环境使用 RuleGo 的项目。欢迎通过 Issue 或社区告诉我们你的案例。'
      "
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
