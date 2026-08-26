<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  desc?: string
}>()
</script>

<template>
  <div class="section-head">
    <span class="section-eyebrow">{{ eyebrow }}</span>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="desc" class="section-desc">{{ desc }}</p>
  </div>
</template>
