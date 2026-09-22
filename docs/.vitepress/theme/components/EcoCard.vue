<script setup lang="ts">
import { useData } from 'vitepress'
import type { EcoItem } from '../ecosystem.mts'

const props = defineProps<{ item: EcoItem }>()

const { lang } = useData()
const isEn = lang.value.startsWith('en')

// en 站内文档链接补 /en 前缀，避免英文页把读者带回中文文档
const localized = (link: string) => (isEn && link.startsWith('/') ? '/en' + link : link)

const text = {
  doc: ['文档 →', 'Docs →'],
  site: ['官网 ↗', 'Website ↗'],
  demo: ['在线体验 ↗', 'Live Demo ↗'],
}
const label = (key: keyof typeof text) => text[key][isEn ? 1 : 0]
</script>

<template>
  <div class="eco-card">
    <div class="eco-card-head">
      <span class="eco-emoji">{{ props.item.emoji }}</span>
      <span class="eco-name">{{ (isEn ? props.item.nameEn : undefined) || props.item.name }}</span>
    </div>
    <p class="eco-tagline">{{ (isEn ? props.item.taglineEn : undefined) || props.item.tagline }}</p>
    <div class="eco-links">
      <a v-if="props.item.doc" :href="localized(props.item.doc)" class="eco-link eco-link-doc">
        {{ label('doc') }}
      </a>
      <a
        v-if="props.item.site"
        class="eco-link"
        :href="props.item.site"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ label('site') }}
      </a>
      <a
        v-if="props.item.repo"
        class="eco-link"
        :href="props.item.repo"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub ↗
      </a>
      <a
        v-if="props.item.demo"
        class="eco-link"
        :href="props.item.demo"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ label('demo') }}
      </a>
    </div>
  </div>
</template>
