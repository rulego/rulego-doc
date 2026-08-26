import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

import HomeHero from './components/HomeHero.vue'
import EcoMatrix from './components/EcoMatrix.vue'
import EcoArchDiagram from './components/EcoArchDiagram.vue'
import HomeQuickstart from './components/HomeQuickstart.vue'
import HomeCta from './components/HomeCta.vue'
import SectionHead from './components/SectionHead.vue'
import EcoBadge from './components/EcoBadge.vue'
import EcoCard from './components/EcoCard.vue'
import RelatedEco from './components/RelatedEco.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeHero', HomeHero)
    app.component('EcoMatrix', EcoMatrix)
    app.component('EcoArchDiagram', EcoArchDiagram)
    app.component('HomeQuickstart', HomeQuickstart)
    app.component('HomeCta', HomeCta)
    app.component('SectionHead', SectionHead)
    app.component('EcoBadge', EcoBadge)
    app.component('EcoCard', EcoCard)
    // RelatedEco 在文档 md 章尾使用
    app.component('RelatedEco', RelatedEco)
  },
} satisfies Theme
