<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'

// 版本发布公告：右下角卡片（参考 tpclaw-doc 实现）。
// 配置在首页 frontmatter notice 字段；本会话弹一次，可按版本永久静音。
const { frontmatter, lang } = useData()
const notice = computed(() => frontmatter.value.notice)
// 弹卡 UI 词按站点语言切换；en 页此前会露出「展开全部/不再提示」中文按钮
const ui = lang.value.startsWith('en')
  ? { expand: 'Expand all', collapse: 'Collapse', items: '', mute: "Don't show again" }
  : { expand: '展开全部', collapse: '收起', items: ' 条', mute: '不再提示' }

const dateText = computed(() => {
  const d = notice.value?.date
  if (!d) return ''
  if (typeof d === 'string') {
    const s = d.trim()
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10)
    return s
  }
  const dt = new Date(d)
  if (isNaN(dt.getTime())) return String(d)
  const y = dt.getFullYear()
  const m = String(dt.getMonth() + 1).padStart(2, '0')
  const day = String(dt.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
})

const visible = ref(false)
// 默认矮卡（不遮 Hero 视觉）；点击展开查看全部条目
const expanded = ref(false)

onMounted(() => {
  const n = notice.value
  if (!n || !n.version) return
  if (localStorage.getItem(`notice-muted:${n.version}`)) return
  if (sessionStorage.getItem(`notice-shown:${n.version}`)) return
  visible.value = true
  sessionStorage.setItem(`notice-shown:${n.version}`, '1')
})

function close() {
  const v = notice.value?.version
  if (v) sessionStorage.setItem(`notice-shown:${v}`, '1')
  visible.value = false
}

function mute() {
  const v = notice.value?.version
  if (v) {
    localStorage.setItem(`notice-muted:${v}`, '1')
    sessionStorage.setItem(`notice-shown:${v}`, '1')
  }
  visible.value = false
}
</script>

<template>
  <Transition name="notice-pop">
    <div v-if="notice && visible" class="home-notice">
      <div class="notice-card">
        <button class="notice-close" aria-label="关闭" @click="close">×</button>
        <div class="notice-header">
          <span class="notice-badge">NEW</span>
          <h3 class="notice-title">{{ notice.title }}</h3>
        </div>
        <span v-if="dateText" class="notice-date">{{ dateText }}</span>
        <button
          v-if="notice.items && notice.items.length > 1"
          class="notice-expand"
          :aria-expanded="expanded"
          @click="expanded = !expanded"
        >
          {{ expanded ? ui.collapse + ' ▴' : `${ui.expand}（${notice.items.length}${ui.items}）▾` }}
        </button>
        <div class="notice-list-wrap" :class="{ 'is-collapsed': !expanded }">
          <ul v-if="notice.items && notice.items.length" class="notice-items" :class="{ expanded }">
            <li v-for="(item, i) in notice.items" :key="i">{{ item }}</li>
          </ul>
        </div>
        <div class="notice-footer">
          <a v-if="notice.link" :href="notice.link" class="notice-link">
            {{ notice.linkText || '查看详情' }} →
          </a>
          <button class="notice-mute" @click="mute">{{ ui.mute }}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.home-notice {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
  width: 352px;
  max-width: calc(100vw - 32px);
}

.notice-card {
  position: relative;
  padding: 20px 22px 16px;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 14px;
  background: var(--vp-c-bg);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.notice-close {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1;
  color: var(--vp-c-text-3);
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.notice-close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
}

.notice-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 24px;
}

.notice-badge {
  flex-shrink: 0;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--vp-c-bg);
  background: var(--vp-c-brand-1);
  border-radius: 20px;
}

.notice-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.notice-date {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.notice-expand {
  display: inline-block;
  margin-top: 6px;
  padding: 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: transparent;
  border: none;
  cursor: pointer;
}

.notice-expand:hover {
  text-decoration: underline;
}

.notice-list-wrap {
  position: relative;
}

/* 收起态列表底部渐隐，提示下方还有内容 */
.notice-list-wrap.is-collapsed::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 34px;
  background: linear-gradient(transparent, var(--vp-c-bg));
  pointer-events: none;
}

.notice-items {
  /* 卡片锚定右下向上生长：默认限高矮卡避免遮住 Hero 右侧视觉，点击「展开全部」后再长高看全部 */
  max-height: 144px;
  margin: 12px 0 0;
  padding-left: 20px;
  overflow-y: auto;
  list-style: disc;
  color: var(--vp-c-text-2);
  line-height: 1.85;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
  overscroll-behavior: contain;
  transition: max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.notice-items.expanded {
  max-height: min(62vh, 620px);
}

.notice-items ::marker {
  color: var(--vp-c-brand-1);
}

.notice-items li {
  font-size: 13px;
}

.notice-items::-webkit-scrollbar {
  width: 4px;
}

.notice-items::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.notice-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
}

.notice-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.notice-link:hover {
  text-decoration: underline;
}

.notice-mute {
  font-size: 13px;
  color: var(--vp-c-text-3);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.notice-mute:hover {
  color: var(--vp-c-text-1);
  text-decoration: underline;
}

.notice-pop-enter-active,
.notice-pop-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.notice-pop-enter-from,
.notice-pop-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

@media (max-width: 768px) {
  .home-notice {
    right: 12px;
    left: 12px;
    bottom: 12px;
    width: auto;
    max-width: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .notice-pop-enter-active,
  .notice-pop-leave-active {
    transition: none;
  }

  .notice-items {
    transition: none;
  }
}
</style>
