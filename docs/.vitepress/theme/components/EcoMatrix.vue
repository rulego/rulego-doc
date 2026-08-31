<script setup lang="ts">
import { useData } from 'vitepress'
import { ecoLayers, ecoItems } from '../ecosystem.mts'
import EcoCard from './EcoCard.vue'

defineProps<{ compact?: boolean }>()

const { lang } = useData()
const isEn = lang.value.startsWith('en')

// en 版标题走 layer.en，eyebrow 若再用同一句会重复，改用层序号
const eyebrow = (index: number) => (isEn ? 'LAYER 0' + (index + 1) : ecoLayers[index].en)
</script>

<template>
  <div class="eco-matrix" :class="{ compact }">
    <section v-for="(layer, i) in ecoLayers" :key="layer.key" class="eco-layer">
      <div class="eco-layer-head">
        <span class="eco-layer-en">{{ eyebrow(i) }}</span>
        <h3 class="eco-layer-title">{{ isEn ? layer.en : layer.label }}</h3>
        <p class="eco-layer-desc">{{ isEn ? layer.descEn : layer.desc }}</p>
      </div>
      <div class="eco-grid" :class="'eco-grid--' + layer.key">
        <EcoCard v-for="item in ecoItems.filter((i) => i.layer === layer.key)" :key="item.id" :item="item" />
      </div>
    </section>
  </div>
</template>
