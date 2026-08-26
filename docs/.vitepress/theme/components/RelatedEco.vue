<script setup lang="ts">
import { resolveComponent } from 'vue'
import { ecoItems } from '../ecosystem.mts'
import EcoBadge from './EcoBadge.vue'

const props = defineProps<{ ids: string[] }>()

const items = ecoItems.filter((i) => props.ids.includes(i.id))
const RouterLinkComp = resolveComponent('RouterLink')

const isInternal = (link?: string) => !!link && link.startsWith('/')
</script>

<template>
  <div v-if="items.length" class="related-eco">
    <div class="related-eco-label">生态延伸</div>
    <div class="related-eco-body">
      <component
        :is="isInternal(item.doc) ? RouterLinkComp : 'a'"
        v-for="item in items"
        :key="item.id"
        class="related-eco-item"
        v-bind="
          isInternal(item.doc)
            ? { to: item.doc }
            : { href: item.doc || item.site || item.repo, target: '_blank', rel: 'noopener noreferrer' }
        "
      >
        <span class="related-eco-name">
          <span class="eco-emoji">{{ item.emoji }}</span>
          {{ item.name }}
          <EcoBadge :type="item.badge" />
        </span>
        <span class="related-eco-tagline">{{ item.tagline }}</span>
        <span class="related-eco-arrow" aria-hidden="true">{{ isInternal(item.doc) ? '→' : '↗' }}</span>
      </component>
    </div>
  </div>
</template>
