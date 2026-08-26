#!/usr/bin/env node
/**
 * URL 基准审计：main 分支全量 permalink（含 en locale 前缀推导） vs 新站 dist 实际 URL。
 *
 * 验收标准：内容页 URL 零变更 —— 期望集必须被实际集完全覆盖。
 * 用法：node scripts/audit-urls.mjs（需先完成 docs:build）
 */
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'docs/.vitepress/dist')

function gitFiles(prefix, exclude) {
  return execSync(`git -C "${ROOT}" -c core.quotepath=off ls-tree -r main --name-only -- ${prefix}`, {
    encoding: 'utf8',
  })
    .split('\n')
    .filter((f) => f.endsWith('.md') && !f.startsWith('docs/.vuepress') && !exclude.includes(f))
}

const zhFiles = gitFiles('docs/', ['docs/index.md', 'docs/@pages/archivesPage.md'])
const enFiles = gitFiles('docs/en/', ['docs/en/index.md'])

const expect = new Set()
for (const f of [...zhFiles, ...enFiles]) {
  const c = execSync(`git -C "${ROOT}" -c core.quotepath=off show main:"${f}"`, {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 100,
  })
  const m = c.match(/^permalink:\s*(.+)$/m)
  if (!m) {
    console.log('  (main 无 permalink，跳过)', f)
    continue
  }
  let u = m[1].trim().replace(/\/+$/, '') + '/'
  if (f.startsWith('docs/en/') && !u.startsWith('/en/')) u = '/en' + u
  expect.add(u)
}

// dist 实际 URL（目录式 index.html）
const actual = new Set()
;(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, e.name)
    if (e.isDirectory()) walk(full)
    else if (e.name === 'index.html') {
      const rel = path.relative(DIST, path.dirname(full)).replace(/\\/g, '/')
      if (rel !== '' && rel !== '.') actual.add('/' + rel + '/')
    }
  }
})(DIST)

// 新增页不算变更；postbuild 生成的重定向桩为兼容性新增（不改变任何旧 URL 的覆盖语义）
const NEW_PAGES = ['/', '/en/', '/ecosystem/', '/archives/']
const stubFile = path.join(DIST, 'redirect-stubs.json')
let stubCount = 0
if (fs.existsSync(stubFile)) {
  const stubs = JSON.parse(fs.readFileSync(stubFile, 'utf8'))
  stubCount = stubs.length
  for (const s of stubs) if (!expect.has(s)) actual.delete(s)
}
for (const x of NEW_PAGES) actual.delete(x)

const missing = [...expect].filter((u) => !actual.has(u))
const extra = [...actual].filter((u) => !expect.has(u))

console.log(`期望（main permalink）: ${expect.size}`)
console.log(`实际（dist URL）: ${actual.size}（另有重定向桩 ${stubCount} 个）`)
console.log(`缺失（旧 URL 未覆盖，必须为 0）: ${missing.length}`)
missing.slice(0, 20).forEach((u) => console.log('  MISSING', u))
console.log(`多余（计划外新增）: ${extra.length}`)
extra.slice(0, 20).forEach((u) => console.log('  EXTRA', u))

process.exit(missing.length === 0 ? 0 : 1)
