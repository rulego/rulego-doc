<script setup lang="ts">
import { ecoLayers, ecoItems } from '../ecosystem.mts'
import EcoCard from './EcoCard.vue'

defineProps<{ compact?: boolean }>()
</script>

<template>
  <div class="eco-matrix" :class="{ compact }">
    <section v-for="layer in ecoLayers" :key="layer.key" class="eco-layer">
      <div class="eco-layer-head">
        <span class="eco-layer-en">{{ layer.en }}</span>
        <h3 class="eco-layer-title">{{ layer.label }}</h3>
        <p class="eco-layer-desc">{{ layer.desc }}</p>
      </div>
      <div class="eco-grid" :class="'eco-grid--' + layer.key">
        <EcoCard v-for="item in ecoItems.filter((i) => i.layer === layer.key)" :key="item.id" :item="item" />
      </div>
    </section>
  </div>
</template>
