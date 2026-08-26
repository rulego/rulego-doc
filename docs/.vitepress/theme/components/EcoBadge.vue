<script setup lang="ts">
import type { EcoBadgeType } from '../ecosystem.mts'

const props = defineProps<{ type: EcoBadgeType; note?: string }>()

const text: Record<EcoBadgeType, string> = {
  'open-source': '开源',
  commercial: '商业',
  wip: '建设中',
}
</script>

<template>
  <span class="eco-badge" :class="'eco-badge--' + props.type">
    {{ text[props.type] }}<template v-if="props.note">&nbsp;· {{ props.note }}</template>
  </span>
</template>
