<script setup lang="ts">
import { useData } from 'vitepress'
import SectionHead from './SectionHead.vue'

const { lang } = useData()
const isEn = lang.value.startsWith('en')
const t = (zh: string, en: string) => (isEn ? en : zh)
// 站内链接在 en 下补前缀；社区页暂无 en 版本，en 不放该入口
const p = (path: string) => (isEn ? '/en' + path : path)

const actions = [
  { text: t('GitHub Star ↗', 'GitHub Star ↗'), href: 'https://github.com/rulego/rulego', ext: true, primary: true },
  { text: t('Gitee 仓库 ↗', 'Gitee Repo ↗'), href: 'https://gitee.com/rulego/rulego', ext: true, primary: false },
  ...(isEn ? [] : [{ text: '加入社区讨论', href: '/pages/community/', ext: false, primary: false }]),
  { text: t('支持我们', 'Support RuleGo'), href: p('/pages/support/'), ext: false, primary: false },
]
</script>

<template>
  <section class="home-section dark-section" style="padding-bottom: 72px">
    <div class="home-inner">
      <SectionHead
        :title="isEn ? 'Open Source, Built Together' : '开源，欢迎一起搭建'"
        :desc="
          isEn
            ? 'RuleGo is open source under Apache-2.0. A star, an issue, or a docs improvement all move the project forward.'
            : 'RuleGo 以 Apache-2.0 许可开源。Star 一份、提一个 Issue、参与文档翻译，都是对项目的支持。'
        "
      />
      <div class="cta-box">
        <div class="cta-actions">
          <a
            v-for="a in actions"
            :key="a.href + a.text"
            class="rg-btn"
            :class="a.primary ? 'rg-btn-primary' : 'rg-btn-ghost'"
            :href="a.href"
            :target="a.ext ? '_blank' : undefined"
            :rel="a.ext ? 'noopener noreferrer' : undefined"
          >
            {{ a.text }}
          </a>
        </div>
        <p v-if="!isEn" class="cta-note">
          生态里的每个产品——AI 智能体、装着 AI 员工的网关、中国式审批工作流——都在
          <a href="/ecosystem/">生态总览</a>
          里等你。
        </p>
        <p v-else class="cta-note">
          Every product in the family — AI agents, the gateway with AI employees, approval workflows — lives in the
          <a href="/en/ecosystem/">ecosystem overview</a>.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.cta-note {
  margin-top: 22px;
  text-align: center;
  font-size: 14px;
  color: #9db1a3;
}

.cta-note a {
  color: var(--rg-green-bright);
  text-decoration: none;
  border-bottom: 1px dashed rgba(45, 212, 160, 0.4);
}

/* 浅色外观下 dark-section 反转为纸白，备注色同步加深保对比度 */
html:not(.dark) .cta-note {
  color: #57675c;
}

html:not(.dark) .cta-note a {
  color: #04784f;
  border-bottom-color: rgba(0, 137, 90, 0.4);
}
</style>
