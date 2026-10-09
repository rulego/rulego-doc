<script setup lang="ts">
import { useData } from 'vitepress'
import SectionHead from './SectionHead.vue'

const { lang } = useData()
const isEn = lang.value.startsWith('en')
const t = (zh: string, en: string) => (isEn ? en : zh)
// 站内链接在 en 下补前缀
const p = (path: string) => (isEn ? '/en' + path : path)

// 双形态对照：交付方式的事实清单，命令行均为可验证的真实入口
const modes = [
  {
    key: 'embed',
    title: t('嵌入式', 'Embedded'),
    desc: t(
      '作为库嵌入现有 Go 应用：进程内执行、零中间件依赖，边缘盒子到云端服务器跑的是同一套引擎。',
      'Embed as a library into your Go app: in-process execution, zero middleware — the same engine runs on an edge box and in the cloud.'
    ),
    cmd: 'go get github.com/rulego/rulego',
    link: p('/pages/config/'),
    linkText: t('嵌入指南 →', 'Embedding guide →'),
  },
  {
    key: 'server',
    title: t('独立部署', 'Standalone'),
    desc: t(
      '用 RuleGo-Server 独立部署：引擎之上自带 RESTful API、多租户、可视化编辑器与组件市场。',
      'Deploy standalone with RuleGo-Server: RESTful API, multi-tenancy, a visual editor and a component marketplace on top of the engine.'
    ),
    cmd: './rulego-server',
    link: p('/pages/rulego-server/'),
    linkText: t('RuleGo-Server →', 'RuleGo-Server →'),
  },
]
</script>

<template>
  <section class="home-section paper-section">
    <div class="home-inner">
      <SectionHead
        :title="isEn ? 'A rule engine built for change' : '为变化而生的规则引擎'"
        :desc="
          isEn
            ? 'Define chains in JSON — no dedicated rule language to learn. Component orchestration, live re-orchestration and AOP decouple highly bespoke business logic from your code.'
            : 'JSON 定义规则链，无需学习专门规则语言。组件编排、动态改链、AOP——把高度定制的业务逻辑从代码里解耦出来。'
        "
      />

      <!-- 双形态对照 -->
      <div class="mode-duo">
        <div v-for="m in modes" :key="m.key" class="mode-card">
          <h3 class="mode-title">{{ m.title }}</h3>
          <p class="mode-desc">{{ m.desc }}</p>
          <code class="mode-cmd">{{ m.cmd }}</code>
          <a class="mode-link" :href="m.link">{{ m.linkText }}</a>
        </div>
      </div>

      <!-- 证据卡：直接给可验证的 API/DSL，不给形容词 -->
      <div class="evi-grid">
        <div class="evi-card">
          <div class="evi-head">
            <h3 class="evi-title">{{ t('热更新', 'Hot Updates') }}</h3>
            <span class="evi-tag">ReloadSelf</span>
          </div>
          <pre class="evi-code"><code>engine.ReloadSelf([]byte(newRule))</code></pre>
          <p class="evi-desc">
            {{ t('改链不重启：新逻辑即时生效，在途消息沿旧链跑完无缝切换。', 'Swap chains without restarting: the new logic takes effect immediately while in-flight messages finish on the old chain.') }}
          </p>
        </div>
        <div class="evi-card">
          <div class="evi-head">
            <h3 class="evi-title">{{ t('嵌套与 AOP', 'Nesting & AOP') }}</h3>
            <span class="evi-tag">ref · targetId</span>
          </div>
          <pre class="evi-code"><code>{
  "id": "s2",
  "type": "ref",
  "targetId": "sub_chain_01"
}</code></pre>
          <p class="evi-desc">
            {{ t('子链像函数一样被复用（支持 ${} 动态寻址）；AOP 在不改原链的前提下织入或整体替换逻辑。', 'Sub-chains are reused like functions (with ${} dynamic addressing); AOP weaves in — or wholesale replaces — logic without touching the original chain.') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mode-duo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 860px) {
  .mode-duo {
    grid-template-columns: 1fr;
  }
}

.mode-card {
  position: relative;
  border: 1px solid var(--rg-line);
  background: #fffdf9;
  border-radius: 12px;
  padding: 24px 24px 20px;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.mode-card:hover {
  border-color: rgba(0, 168, 107, 0.55);
  box-shadow: 0 12px 32px -18px rgba(11, 21, 18, 0.35);
}

.dark .mode-card {
  border-color: var(--rg-line-dark);
  background: rgba(255, 255, 255, 0.025);
}

.dark .mode-card:hover {
  border-color: rgba(45, 212, 160, 0.5);
  box-shadow: 0 12px 32px -18px rgba(0, 0, 0, 0.7);
}

.mode-title {
  font-size: 19px;
  font-weight: 800;
  margin: 0 0 10px;
}

.mode-desc {
  font-size: 13.5px;
  line-height: 1.75;
  opacity: 0.75;
  margin: 0 0 14px;
}

.mode-cmd {
  display: block;
  font-family: var(--rg-mono);
  font-size: 12.5px;
  color: #04784f;
  background: rgba(0, 168, 107, 0.07);
  border: 1px solid rgba(0, 168, 107, 0.22);
  border-radius: 8px;
  padding: 9px 12px;
  overflow-x: auto;
  white-space: nowrap;
}

.dark .mode-cmd {
  color: #8fe3c2;
  background: rgba(45, 212, 160, 0.07);
  border-color: rgba(45, 212, 160, 0.25);
}

.mode-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 600;
  color: #04784f !important;
  text-decoration: none !important;
}

.mode-link:hover {
  text-decoration: underline !important;
}

.dark .mode-link {
  color: var(--rg-green-bright) !important;
}

/* 证据卡 */
.evi-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

@media (max-width: 860px) {
  .evi-grid {
    grid-template-columns: 1fr;
  }
}

.evi-card {
  border: 1px dashed rgba(28, 36, 32, 0.22);
  border-radius: 12px;
  padding: 20px 22px 18px;
  background: rgba(28, 36, 32, 0.02);
}

.dark .evi-card {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.02);
}

.evi-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}

.evi-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.evi-tag {
  font-family: var(--rg-mono);
  font-size: 12px;
  color: #04784f;
}

.dark .evi-tag {
  color: #8fe3c2;
}

.evi-code {
  margin: 0 0 12px;
  font-family: var(--rg-mono);
  font-size: 12.5px;
  line-height: 1.7;
  color: #2d3a33;
  background: #f4f2ea;
  border: 1px solid rgba(28, 36, 32, 0.12);
  border-radius: 8px;
  padding: 12px 14px;
  overflow-x: auto;
}

.dark .evi-code {
  color: #cfe3d6;
  background: rgba(6, 13, 10, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
}

.evi-desc {
  font-size: 13px;
  line-height: 1.75;
  opacity: 0.75;
  margin: 0;
}
</style>
