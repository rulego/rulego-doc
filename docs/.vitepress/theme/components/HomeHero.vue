<script setup lang="ts">
const stats = [
  { num: '30', unit: '+', label: 'Endpoint 接入协议' },
  { num: '10', unit: '+', label: '工业协议点位组件' },
  { num: '0', unit: '', label: '外部中间件依赖' },
  { num: '2', unit: '种', label: '运行形态：嵌入式 / 独立部署' },
]
</script>

<template>
  <header class="hero-wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <RouterLink class="hero-announce" to="/ecosystem/">
          <span class="dot"></span>
          一个家族 · 分层产品 —— 总览 RuleGo 生态
          <span aria-hidden="true">→</span>
        </RouterLink>

        <h1 class="hero-title">把复杂逻辑，<span class="accent">编排成一条链。</span></h1>
        <p class="hero-subtitle">RuleGo · 组件编排规则引擎</p>

        <p class="hero-desc">
          <strong>组件化</strong>：过滤器、转换器、动作……所有业务逻辑都是可复用的组件<br />
          <strong>热更新</strong>：规则链动态编排，不重启应用即可替换业务逻辑<br />
          <strong>轻量嵌入</strong>：Go 单二进制，无外部中间件依赖，边缘到云端同一套引擎
        </p>
        <p class="hero-note">
          基于 Go 的轻量级、高性能、嵌入式新一代组件编排规则引擎。非入侵式：嵌入现有项目，或独立部署为编排服务。
        </p>

        <div class="hero-actions">
          <RouterLink class="rg-btn rg-btn-primary" to="/pages/introduction/">
            快速开始
            <span aria-hidden="true">→</span>
          </RouterLink>
          <a class="rg-btn rg-btn-ghost" href="https://github.com/rulego/rulego" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a class="rg-btn rg-btn-ghost" href="https://gitee.com/rulego/rulego" target="_blank" rel="noopener noreferrer">
            Gitee
          </a>
        </div>

        <div class="hero-meta">
          <span class="hero-chip">Apache-2.0</span>
          <span class="hero-chip">规则链 <b>JSON DSL</b></span>
          <span class="hero-chip">子规则链嵌套</span>
          <span class="hero-chip">AOP</span>
        </div>
      </div>

      <!-- 右侧：规则链 mockup -->
      <div class="hero-visual">
        <div class="chain-card">
          <div class="chain-head">
            <div class="chain-title">测试规则链</div>
            <div class="chain-no">chain_call_rest_api · root · <span class="running">运行中</span></div>
          </div>

          <div class="chain-row"><span class="k">消息</span><span class="v">{"deviceId":"aa","temperature":290}</span></div>

          <div class="chain-flow">
            <span class="chain-node src">msg 设备数据</span>
            <span class="chain-link">True</span>
            <span class="chain-node filter">jsFilter 过滤</span>
            <span class="chain-link">True</span>
            <span class="chain-node transform">jsTransform 转换</span>
            <span class="chain-link">Success</span>
            <span class="chain-node action">restApiCall 推送</span>
          </div>

          <div class="chain-row">
            <span class="k">处理结果</span>
            <span class="v">✓ temperature 29.0 · POST /api/msg · 200 · 3ms</span>
          </div>

          <div class="chain-row">
            <span class="k">热更新</span>
            <span class="v mono">ruleEngine.ReloadSelf() —— 不重启进程，链上逻辑即刻生效</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据条 -->
    <div class="stats-bar">
      <div class="stats-inner">
        <div v-for="s in stats" :key="s.label" class="stat-cell">
          <div class="stat-num">{{ s.num }}<em>{{ s.unit }}</em></div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </header>
</template>
