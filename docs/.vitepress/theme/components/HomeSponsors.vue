<script setup lang="ts">
import { useData } from 'vitepress'
import SectionHead from './SectionHead.vue'

const { lang } = useData()
const isEn = lang.value.startsWith('en')
const t = (zh: string, en: string) => (isEn ? en : zh)

// 数据源自旧站首页 cardList（迁移保留）。expired 为赞助续费提醒字段，仅存档，不做展示逻辑。
const sponsors = [
  {
    name: 'Sagoo IOT',
    desc: t(
      '基于 Golang 开发的企业级开源物联网系统',
      'Enterprise-grade open-source IoT system built with Golang'
    ),
    avatar: '/img/sponsors/shaguo.png',
    link: 'https://iotdoc.sagoo.cn/?from=rulego',
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
    expired: '2026-04-05',
  },
]
</script>

<template>
  <div>
    <SectionHead
      :title="isEn ? 'Teams Running RuleGo' : '特别用户'"
      :desc="
        isEn
          ? 'Projects using RuleGo in production. Tell us about yours via an issue or the community.'
          : '正在生产环境使用 RuleGo 的项目。欢迎通过 Issue 或社区告诉我们你的案例。'
      "
    />

    <div class="sp-row">
      <a
        v-for="s in sponsors"
        :key="s.name"
        class="sp-item"
        :href="s.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class="sp-logo" :src="s.avatar" :alt="s.name" loading="lazy" />
        <span class="sp-body">
          <span class="sp-name">{{ s.name }}</span>
          <span class="sp-desc">{{ s.desc }}</span>
        </span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.sp-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding-top: 6px;
}

@media (max-width: 860px) {
  .sp-row {
    grid-template-columns: 1fr;
  }
}

.sp-item {
  display: flex;
  align-items: center;
  gap: 13px;
  border: 1px solid var(--rg-line);
  border-radius: 10px;
  background: #fffdf9;
  padding: 14px 16px;
  text-decoration: none !important;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.sp-item:hover {
  border-color: rgba(0, 168, 107, 0.55);
  box-shadow: 0 10px 26px -16px rgba(11, 21, 18, 0.35);
}

.sp-logo {
  width: 38px;
  height: 38px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
  /* 透明底 logo 垫白，两种外观下都可读 */
  background: #fff;
  padding: 2px;
}

.sp-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.sp-name {
  font-size: 14.5px;
  font-weight: 700;
  color: #22302a;
}

.sp-desc {
  font-size: 12.5px;
  line-height: 1.6;
  color: #5b6b62;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dark .sp-item {
  border-color: var(--rg-line-dark);
  background: rgba(255, 255, 255, 0.025);
}

.dark .sp-item:hover {
  border-color: rgba(45, 212, 160, 0.5);
  box-shadow: 0 10px 26px -16px rgba(0, 0, 0, 0.7);
}

.dark .sp-name {
  color: #e9efe9;
}

.dark .sp-desc {
  color: #a9bfb2;
}
</style>
