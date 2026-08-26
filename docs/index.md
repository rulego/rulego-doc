---
layout: page
sidebar: false
aside: false
---

<script setup>
import HomeHero from './.vitepress/theme/components/HomeHero.vue'
import HomeFeatures from './.vitepress/theme/components/HomeFeatures.vue'
import HomeUseCases from './.vitepress/theme/components/HomeUseCases.vue'
import HomeComponents from './.vitepress/theme/components/HomeComponents.vue'
import HomeEcoStrip from './.vitepress/theme/components/HomeEcoStrip.vue'
import HomeQuickstart from './.vitepress/theme/components/HomeQuickstart.vue'
import HomeSponsors from './.vitepress/theme/components/HomeSponsors.vue'
import HomeLinks from './.vitepress/theme/components/HomeLinks.vue'
import HomeCta from './.vitepress/theme/components/HomeCta.vue'
</script>

<HomeHero />
<HomeFeatures />
<HomeUseCases />
<HomeComponents />
<HomeEcoStrip />
<HomeQuickstart />

<section class="home-section paper-section" style="padding-top: 0">
  <div class="home-inner">
    <HomeSponsors />
    <HomeLinks />
  </div>
</section>

<HomeCta />

<style scoped>
:global(.main .container) {
  max-width: 100%;
  padding: 0;
  margin: 0;
}

:global(.content) {
  padding: 0 !important;
  padding-bottom: 0 !important;
}

:global(.content-container) {
  max-width: 100% !important;
}

:global(.VPContent.is-home) {
  padding-bottom: 0 !important;
}
</style>
