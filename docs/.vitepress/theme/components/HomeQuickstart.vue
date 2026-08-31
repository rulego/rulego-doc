<script setup lang="ts">
import { useData } from 'vitepress'
import SectionHead from './SectionHead.vue'

const { lang } = useData()
const isEn = lang.value.startsWith('en')
const t = (zh: string, en: string) => (isEn ? en : zh)
// 站内链接在 en 下补前缀
const p = (path: string) => (isEn ? '/en' + path : path)

const goCode = isEn
  ? `// 1. Install: go get github.com/rulego/rulego

// 2. Define a chain in JSON (filter -> transform -> push), create the engine instance
ruleEngine, err := rulego.New("chain_call_rest_api", []byte(ruleFile))

// 3. Hand a message to the chain, read the result in the callback
msg := types.NewMsg(0, "telemetry_msg", types.JSON,
    types.NewMetadata(), \`{"deviceId":"aa","temperature":290}\`)

ruleEngine.OnMsg(msg, types.WithOnEnd(
    func(ctx types.RuleContext, msg types.RuleMsg, err error, relationType string) {
        fmt.Println(msg.Data)
    }))`
  : `// 1. 安装：go get github.com/rulego/rulego

// 2. 用 JSON 定义规则链（过滤 -> 转换 -> 推送），创建引擎实例
ruleEngine, err := rulego.New("chain_call_rest_api", []byte(ruleFile))

// 3. 把消息交给规则链处理，回调拿结果
msg := types.NewMsg(0, "telemetry_msg", types.JSON,
    types.NewMetadata(), \`{"deviceId":"aa","temperature":290}\`)

ruleEngine.OnMsg(msg, types.WithOnEnd(
    func(ctx types.RuleContext, msg types.RuleMsg, err error, relationType string) {
        fmt.Println(msg.Data)
    }))`

const points = isEn
  ? [
      'Chains hot-reload: change configuration without restarting the process',
      'Sub-chains nest — flows compose like building blocks',
      'Embed into your project, or deploy standalone with RuleGo-Server',
    ]
  : [
      '规则链支持动态热更新：改配置不重启进程',
      '子规则链嵌套，流程像积木一样复用',
      '嵌入现有项目，或用 RuleGo-Server 独立部署',
    ]
</script>

<template>
  <section class="home-section paper-section">
    <div class="home-inner">
      <SectionHead
        eyebrow="Quick Start"
        :title="isEn ? 'Three steps to your first rule chain' : '三步，跑通第一条规则链'"
        :desc="
          isEn
            ? 'No rule language to learn, no middleware to install. Define JSON, create an engine, deliver a message — your business logic is a chain.'
            : '没有规则语言要学，没有中间件要装。定义 JSON、创建引擎、投递消息 —— 你的业务逻辑就是一条链。'
        "
      />

      <div class="qs-grid">
        <div class="qs-code">
          <div class="terminal">
            <div class="terminal-bar">
              <i></i><i></i><i></i>
              <span class="terminal-title">main.go</span>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div
              class="terminal-body"
              v-html="goCode.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('\n', '<br>')"
            ></div>
          </div>
        </div>

        <div class="qs-term">
          <div class="terminal">
            <div class="terminal-bar">
              <i></i><i></i><i></i>
              <span class="terminal-title">engine.log</span>
            </div>
            <div class="terminal-body">
              <div><span class="ln-prompt">$ </span>go get github.com/rulego/rulego</div>
              <div><span class="ln-prompt">$ </span>go run .</div>
              <div class="ln-info">[s1] jsFilter · deviceId=aa → True</div>
              <div class="ln-info">[s2] jsTransform · temperature 290 → 29.0</div>
              <div class="ln-ok">[s3] restApiCall · POST /api/msg · 200</div>
              <div class="ln-warn">chain done · OnEnd callback fired</div>
              <div><span class="ln-prompt">$ </span><span class="term-cursor"></span></div>
            </div>
          </div>

          <ul class="qs-points">
            <li v-for="pt in points" :key="pt">{{ pt }}</li>
          </ul>
        </div>
      </div>

      <div class="qs-more">
        <a :href="p('/pages/quick-start/')" class="rg-btn rg-btn-primary">{{ t('阅读快速开始 →', 'Read the Quick Start →') }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.qs-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 20px;
  align-items: start;
}

@media (max-width: 960px) {
  .qs-grid {
    grid-template-columns: 1fr;
  }
}

.qs-points {
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.qs-points li {
  position: relative;
  padding: 6px 0 6px 22px;
  font-size: 13.5px;
  line-height: 1.7;
  color: #4c5a51;
}

.qs-points li::before {
  content: '▸';
  position: absolute;
  left: 2px;
  color: var(--rg-green);
}

.qs-more {
  margin-top: 28px;
  text-align: center;
}
</style>