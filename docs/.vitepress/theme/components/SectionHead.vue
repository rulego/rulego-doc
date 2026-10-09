<script setup lang="ts">
// eyebrow 可选：全站只保留两处路标眉标（Use Cases / Components），其余节靠 H2 自明
defineProps<{
  eyebrow?: string
  title: string
  desc?: string
}>()
</script>

<template>
  <div class="section-head">
    <span v-if="eyebrow" class="section-eyebrow">{{ eyebrow }}</span>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="desc" class="section-desc">{{ desc }}</p>
  </div>
</template>
