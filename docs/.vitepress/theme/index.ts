import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

import HomeHero from './components/HomeHero.vue'
import HomeFeatures from './components/HomeFeatures.vue'
import HomeComponents from './components/HomeComponents.vue'
import HomeEcoStrip from './components/HomeEcoStrip.vue'
import HomeQuickstart from './components/HomeQuickstart.vue'
import HomeSponsors from './components/HomeSponsors.vue'
import HomeLinks from './components/HomeLinks.vue'
import HomeCta from './components/HomeCta.vue'
import SectionHead from './components/SectionHead.vue'
import EcoBadge from './components/EcoBadge.vue'
import EcoCard from './components/EcoCard.vue'
import EcoMatrix from './components/EcoMatrix.vue'
import RelatedEco from './components/RelatedEco.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeHero', HomeHero)
    app.component('HomeFeatures', HomeFeatures)
    app.component('HomeComponents', HomeComponents)
    app.component('HomeEcoStrip', HomeEcoStrip)
    app.component('HomeQuickstart', HomeQuickstart)
    app.component('HomeSponsors', HomeSponsors)
    app.component('HomeLinks', HomeLinks)
    app.component('HomeCta', HomeCta)
    app.component('SectionHead', SectionHead)
    app.component('EcoBadge', EcoBadge)
    app.component('EcoCard', EcoCard)
    app.component('EcoMatrix', EcoMatrix)
    // RelatedEco 在文档 md 章尾使用
    app.component('RelatedEco', RelatedEco)
  },
} satisfies Theme
