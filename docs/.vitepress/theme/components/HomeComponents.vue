<script setup lang="ts">
import { useData } from 'vitepress'
import SectionHead from './SectionHead.vue'

const { lang } = useData()
const isEn = lang.value.startsWith('en')
const t = (zh: string, en: string) => (isEn ? en : zh)
// 站内链接在 en 下补前缀
const p = (path: string) => (isEn ? '/en' + path : path)

const families = [
  {
    icon: '⚙️',
    name: t('标准组件', 'Standard Components'),
    count: '38',
    desc: t(
      '过滤器、转换器、动作、外部集成、流控制与公共节点',
      'Filters, transformers, actions, external integrations, flow control and common nodes'
    ),
    link: p('/pages/standard-components/'),
  },
  {
    icon: '🧩',
    name: t('扩展组件', 'Extension Components'),
    count: '85',
    desc: t(
      'MQTT/Kafka/DB 客户端、脚本、流式计算、服务发现、文件、CI',
      'MQTT/Kafka/DB clients, scripts, stream processing, service discovery, files, CI'
    ),
    link: p('/pages/extension-overview/'),
  },
  {
    icon: '🤖',
    name: t('AI 智能体组件', 'AI Agent Components'),
    count: '14',
    desc: t(
      'LLM 文本/图像生成、意图识别、MCP 客户端/服务端、Agent 编排',
      'LLM text/image generation, intent recognition, MCP client/server, agent orchestration'
    ),
    // zh 卡片原文指向 /pages/ai-agent/（智能体组件页），en 无对应细分页走 overview
    link: p(isEn ? '/pages/ai-agent-overview/' : '/pages/ai-agent/'),
  },
  {
    icon: '🏭',
    name: t('IoT 工业协议', 'Industrial Protocols'),
    count: '26',
    desc: 'modbus / s7 / opcua / eip / mc / fins / dlt645 / bacnet / snmp / iec104',
    link: p('/pages/iot-overview/'),
  },
  {
    icon: '🔌',
    name: t('Endpoint 接入', 'Endpoints'),
    count: '20',
    desc: t('30+ 协议端点：HTTP/MQTT/WebSocket/TCP/UDP/Kafka…', '30+ protocol endpoints: HTTP/MQTT/WebSocket/TCP/UDP/Kafka…'),
    link: p('/pages/endpoint-overview/'),
  },
  {
    icon: '🌊',
    name: 'StreamSQL',
    count: 'SQL',
    desc: t(
      '用 SQL 处理无界流：窗口聚合、CEP 模式识别、流表 JOIN',
      'Query unbounded streams with SQL: windowed aggregation, CEP pattern matching, stream-table joins'
    ),
    link: p('/pages/streamsql-overview/'),
  },
  {
    icon: '🛒',
    name: t('组件市场', 'Marketplace'),
    count: '',
    desc: t(
      '在线安装/更新扩展组件，也可发布你的组件到市场',
      'Install and update extension components online, or publish your own to the marketplace'
    ),
    link: p('/pages/marketplace/'),
  },
  {
    icon: '🛠️',
    name: t('自定义组件', 'Custom Components'),
    count: '',
    desc: t(
      '实现 Node 接口即成组件；支持 Go plugin 动态加载',
      'Implement the Node interface and it is a component; dynamic loading via Go plugin supported'
    ),
    link: p('/pages/custom-components-overview/'),
  },
]
</script>

<template>
  <section class="home-section dark-section">
    <div class="home-inner">
      <SectionHead
        eyebrow="Components"
        :title="isEn ? '100+ components covering every step of data handling' : '100+ 组件，覆盖数据处理的每个环节'"
        :desc="
          isEn
            ? 'From message filtering and format conversion to industrial protocol collection and LLM calls — components are building blocks you compose into chains. Need more? Extend via the custom-component API.'
            : '从消息过滤、格式转换到工业协议采集和大模型调用——组件即积木，按需组合成规则链。不够用？自定义组件接口随时扩展。'
        "
      />

      <div class="comp-grid">
        <a v-for="f in families" :key="f.name" :href="f.link" class="comp-card">
          <div class="comp-head">
            <span class="comp-icon">{{ f.icon }}</span>
            <span class="comp-name">{{ f.name }}</span>
            <span v-if="f.count" class="comp-count">{{ f.count }}</span>
          </div>
          <p class="comp-desc">{{ f.desc }}</p>
          <span class="comp-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comp-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

@media (max-width: 1080px) {
  .comp-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .comp-grid {
    grid-template-columns: 1fr;
  }
}

.comp-card {
  position: relative;
  border: 1px solid var(--rg-line-dark);
  background: rgba(255, 255, 255, 0.025);
  border-radius: 10px;
  padding: 18px 18px 16px;
  text-decoration: none !important;
  transition: border-color 0.25s, transform 0.25s, background 0.25s;
}

.comp-card:hover {
  border-color: rgba(45, 212, 160, 0.5);
  transform: translateY(-3px);
  background: rgba(45, 212, 160, 0.04);
}

.comp-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.comp-icon {
  font-size: 17px;
}

.comp-name {
  font-size: 15px;
  font-weight: 700;
  color: #e9efe9;
}

.comp-count {
  font-family: var(--rg-mono);
  font-size: 11.5px;
  font-weight: 700;
  color: #8fe3c2;
  background: rgba(0, 168, 107, 0.13);
  border: 1px solid rgba(45, 212, 160, 0.35);
  padding: 1px 8px;
  border-radius: 999px;
}

.comp-desc {
  font-size: 12.5px;
  line-height: 1.7;
  color: #9db1a3;
  margin: 0;
}

.comp-arrow {
  position: absolute;
  right: 14px;
  bottom: 12px;
  font-size: 13px;
  color: rgba(45, 212, 160, 0.55);
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
}

.comp-card:hover .comp-arrow {
  opacity: 1;
  transform: translateX(2px);
}

/* 浅色外观：dark-section 反转为纸白系（custom.css 全局处理底色），此处补卡片 */
html:not(.dark) .comp-card {
  border-color: var(--rg-line);
  background: #fffdf9;
}

html:not(.dark) .comp-card:hover {
  border-color: rgba(0, 168, 107, 0.55);
  background: rgba(0, 168, 107, 0.03);
  box-shadow: 0 12px 32px -18px rgba(11, 21, 18, 0.35);
}

html:not(.dark) .comp-name {
  color: #22302a;
}

html:not(.dark) .comp-count {
  color: #04784f;
  background: rgba(0, 168, 107, 0.09);
  border-color: rgba(0, 168, 107, 0.3);
}

html:not(.dark) .comp-desc {
  color: #57675c;
}

html:not(.dark) .comp-arrow {
  color: rgba(0, 137, 90, 0.6);
}
</style>
