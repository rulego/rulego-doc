<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import type { EcoBadgeType } from '../ecosystem.mts'

const props = defineProps<{ type: EcoBadgeType; note?: string; noteEn?: string }>()

const { lang } = useData()
const isEn = lang.value.startsWith('en')

const text: Record<EcoBadgeType, [string, string]> = {
  'open-source': ['开源', 'Open Source'],
  commercial: ['商业', 'Commercial'],
  wip: ['建设中', 'WIP'],
}

const label = computed(() => text[props.type][isEn ? 1 : 0])
const noteText = computed(() => (isEn ? (props.noteEn ?? props.note) : props.note))
</script>

<template>
  <span class="eco-badge" :class="'eco-badge--' + props.type">
    {{ label }}<template v-if="noteText">&nbsp;· {{ noteText }}</template>
  </span>
</template>
