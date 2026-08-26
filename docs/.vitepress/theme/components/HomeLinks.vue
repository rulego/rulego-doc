<script setup lang="ts">
const links = [
  { name: 'MybatisPlus', url: 'https://baomidou.com', logo: '/img/links/mybatis-plus-logo.png' },
  { name: 'liteflow', url: 'https://liteflow.cc', logo: '/img/links/liteflow-logo.png' },
]
</script>

<template>
  <div class="home-links">
    <span class="links-label">友情链接</span>
    <a v-for="l in links" :key="l.name" class="link-item" :href="l.url" target="_blank" rel="noopener noreferrer" :title="l.name">
      <img :src="l.logo" :alt="l.name" />
    </a>
  </div>
</template>

<style scoped>
.home-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 26px 0 8px;
}

.links-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-right: 12px;
}

.link-item {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 16px;
  transition: border-color 0.2s;
}

.link-item:hover {
  border-color: rgba(0, 168, 107, 0.5);
}

.link-item img {
  height: 1.7em;
  max-width: 150px;
  display: block;
}
</style>
