<script setup lang="ts">
import SectionHead from './SectionHead.vue'

const families = [
  {
    icon: '⚙️',
    name: '标准组件',
    count: '38',
    desc: '过滤器、转换器、动作、外部集成、流控制与公共节点',
    link: '/pages/standard-components/',
  },
  {
    icon: '🧩',
    name: '扩展组件',
    count: '85',
    desc: 'MQTT/Kafka/DB 客户端、脚本、流式计算、服务发现、文件、CI',
    link: '/pages/extension-overview/',
  },
  {
    icon: '🤖',
    name: 'AI 智能体组件',
    count: '14',
    desc: 'LLM 文本/图像生成、意图识别、MCP 客户端/服务端、Agent 编排',
    link: '/pages/ai-agent/',
  },
  {
    icon: '🏭',
    name: 'IoT 工业协议',
    count: '26',
    desc: 'modbus / s7 / opcua / eip / mc / fins / dlt645 / bacnet / snmp / iec104',
    link: '/pages/iot-overview/',
  },
  {
    icon: '🔌',
    name: 'Endpoint 接入',
    count: '20',
    desc: '30+ 协议端点：HTTP/MQTT/WebSocket/TCP/UDP/Kafka…',
    link: '/pages/endpoint-overview/',
  },
  {
    icon: '🌊',
    name: 'StreamSQL',
    count: 'SQL',
    desc: '用 SQL 处理无界流：窗口聚合、CEP 模式识别、流表 JOIN',
    link: '/pages/streamsql-overview/',
  },
  {
    icon: '🛒',
    name: '组件市场',
    count: '',
    desc: '在线安装/更新扩展组件，也可发布你的组件到市场',
    link: '/pages/marketplace/',
  },
  {
    icon: '🛠️',
    name: '自定义组件',
    count: '',
    desc: '实现 Node 接口即成组件；支持 Go plugin 动态加载',
    link: '/pages/custom-components-overview/',
  },
]
</script>

<template>
  <section class="home-section dark-section">
    <div class="home-inner">
      <SectionHead
        eyebrow="Components"
        title="100+ 组件，覆盖数据处理的每个环节"
        desc="从消息过滤、格式转换到工业协议采集和大模型调用——组件即积木，按需组合成规则链。不够用？自定义组件接口随时扩展。"
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
