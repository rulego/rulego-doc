<script setup lang="ts">
import SectionHead from './SectionHead.vue'
</script>

<template>
  <section class="home-section dark-section" style="padding-bottom: 110px">
    <div class="home-inner">
      <SectionHead
        eyebrow="Community"
        title="开源，欢迎一起搭建"
        desc="RuleGo 以 Apache-2.0 许可开源。Star 一份、提一个 Issue、参与文档翻译，都是对项目的支持。"
      />
      <div class="cta-box">
        <div class="cta-actions">
          <a class="rg-btn rg-btn-primary" href="https://github.com/rulego/rulego" target="_blank" rel="noopener noreferrer">
            GitHub Star ↗
          </a>
          <a class="rg-btn rg-btn-ghost" href="https://gitee.com/rulego/rulego" target="_blank" rel="noopener noreferrer">
            Gitee 仓库 ↗
          </a>
          <RouterLink to="/pages/community/" class="rg-btn rg-btn-ghost">加入社区讨论</RouterLink>
          <RouterLink to="/pages/support/" class="rg-btn rg-btn-ghost">支持我们</RouterLink>
        </div>
        <p class="cta-note">
          生态里的每个产品——智能体框架、StreamSQL、gflow-engine、TPCLAW——都在
          <RouterLink to="/ecosystem/">生态总览</RouterLink>
          里等你。
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
</style>
