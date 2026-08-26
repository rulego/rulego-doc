<script setup lang="ts">
import SectionHead from './SectionHead.vue'

const goCode = `// 1. 安装：go get github.com/rulego/rulego

// 2. 用 JSON 定义规则链（过滤 -> 转换 -> 推送），创建引擎实例
ruleEngine, err := rulego.New("chain_call_rest_api", []byte(ruleFile))

// 3. 把消息交给规则链处理，回调拿结果
msg := types.NewMsg(0, "telemetry_msg", types.JSON,
    types.NewMetadata(), \`{"deviceId":"aa","temperature":290}\`)

ruleEngine.OnMsg(msg, types.WithOnEnd(
    func(ctx types.RuleContext, msg types.RuleMsg, err error, relationType string) {
        fmt.Println(msg.Data)
    }))`
</script>

<template>
  <section class="home-section paper-section">
    <div class="home-inner">
      <SectionHead
        eyebrow="Quick Start"
        title="三步，跑通第一条规则链"
        desc="没有规则语言要学，没有中间件要装。定义 JSON、创建引擎、投递消息 —— 你的业务逻辑就是一条链。"
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
            <li>规则链支持动态热更新：改配置不重启进程</li>
            <li>子规则链嵌套，流程像积木一样复用</li>
            <li>嵌入现有项目，或用 RuleGo-Server 独立部署</li>
          </ul>
        </div>
      </div>

      <div class="qs-more">
        <a href="/pages/quick-start/" class="rg-btn rg-btn-primary">阅读快速开始 →</a>
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
