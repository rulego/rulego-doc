<script setup lang="ts">
import type { EcoItem } from '../ecosystem.mts'
import EcoBadge from './EcoBadge.vue'

const props = defineProps<{ item: EcoItem }>()

const isInternal = (link: string) => link.startsWith('/')
</script>

<template>
  <div class="eco-card" :class="'eco-card--' + props.item.badge">
    <div class="eco-card-head">
      <span class="eco-emoji">{{ props.item.emoji }}</span>
      <span class="eco-name">{{ props.item.name }}</span>
      <EcoBadge :type="props.item.badge" :note="props.item.badgeNote" />
    </div>
    <p class="eco-tagline">{{ props.item.tagline }}</p>
    <div class="eco-links">
      <a v-if="props.item.doc" :href="props.item.doc" class="eco-link eco-link-doc">
        文档 →
      </a>
      <a
        v-if="props.item.site"
        class="eco-link"
        :href="props.item.site"
        target="_blank"
        rel="noopener noreferrer"
      >
        官网 ↗
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
        在线体验 ↗
      </a>
      <a
        v-if="props.item.commercial"
        class="eco-link eco-link-commercial"
        :href="props.item.commercial"
        target="_blank"
        rel="noopener noreferrer"
      >
        了解商业版 →
      </a>
    </div>
  </div>
</template>
