<script setup lang="ts">
import { ecoItems } from '../ecosystem.mts'
import EcoBadge from './EcoBadge.vue'

const props = defineProps<{ ids: string[] }>()

const items = ecoItems.filter((i) => props.ids.includes(i.id))

const hrefOf = (item: (typeof ecoItems)[number]) => item.doc || item.site || item.repo || ''
const isInternal = (link: string) => link.startsWith('/')
</script>

<template>
  <div v-if="items.length" class="related-eco">
    <div class="related-eco-label">生态延伸</div>
    <div class="related-eco-body">
      <a
        v-for="item in items"
        :key="item.id"
        class="related-eco-item"
        :href="hrefOf(item)"
        :target="isInternal(hrefOf(item)) ? undefined : '_blank'"
        :rel="isInternal(hrefOf(item)) ? undefined : 'noopener noreferrer'"
      >
        <span class="related-eco-name">
          <span class="eco-emoji">{{ item.emoji }}</span>
          {{ item.name }}
          <EcoBadge :type="item.badge" />
        </span>
        <span class="related-eco-tagline">{{ item.tagline }}</span>
        <span class="related-eco-arrow" aria-hidden="true">{{ isInternal(hrefOf(item)) ? '→' : '↗' }}</span>
      </a>
    </div>
  </div>
</template>
