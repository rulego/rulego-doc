#!/usr/bin/env node
/**
 * post-build：把 VitePress 产物改写为与旧站（vdoing）1:1 的目录式 URL 形态。
 *
 * 1. x.html -> x/index.html（index.html 与 404.html 除外）
 * 2. 全部 HTML 内部链接 href 规范化为尾斜杠目录式（/pages/x -> /pages/x/，
 *    /pages/x.html -> /pages/x/；/assets、/img 等带扩展名的资源不动）
 * 3. sitemap.xml 的 <loc> 同步尾斜杠化
 * 4. 补 /en/pages/home/ -> /en/ 重定向（旧 vdoing 英文首页 URL）
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '../docs/.vitepress/dist')

// ---------- 1. x.html -> x/index.html ----------
let moved = 0
function dirify(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) dirify(full)
    else if (e.name.endsWith('.html') && e.name !== 'index.html' && e.name !== '404.html') {
      const destDir = path.join(dir, path.basename(e.name, '.html'))
      fs.mkdirSync(destDir, { recursive: true })
      fs.renameSync(full, path.join(destDir, 'index.html'))
      moved++
    }
  }
}
dirify(DIST)

// ---------- 2. href 尾斜杠化 ----------
function normalizeHref(href) {
  if (/^(https?:)?\/\//i.test(href)) return null
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return null // mailto/tencent/data...
  if (href.startsWith('#')) return null
  if (/localhost/i.test(href)) return null
  if (!href.startsWith('/')) return null // 相对引用（产物内均为绝对路径）
  const hashIdx = href.indexOf('#')
  const anchor = hashIdx >= 0 ? href.slice(hashIdx) : ''
  let p = (hashIdx >= 0 ? href.slice(0, hashIdx) : href).replace(/\.html$/, '')
  if (p === '' || p === '/') return null
  const last = p.split('/').filter(Boolean).pop()
  if (last && last.includes('.')) return null // 资源（assets/img 等）
  if (!p.endsWith('/')) return p + '/' + anchor
  return null
}

let filesPatched = 0
let linksPatched = 0
function patchHtml(file) {
  const src = fs.readFileSync(file, 'utf8')
  let count = 0
  const out = src.replace(/(href=")([^"]+)(")/g, (whole, a, href, z) => {
    const r = normalizeHref(href)
    if (r === null) return whole
    count++
    return a + r + z
  })
  if (count) {
    fs.writeFileSync(file, out)
    filesPatched++
    linksPatched += count
  }
}
function walkHtml(dir, cb) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walkHtml(full, cb)
    else if (e.name.endsWith('.html')) cb(full)
  }
}
walkHtml(DIST, patchHtml)

// ---------- 3. sitemap 尾斜杠化 ----------
const sitemapFile = path.join(DIST, 'sitemap.xml')
if (fs.existsSync(sitemapFile)) {
  const sm = fs.readFileSync(sitemapFile, 'utf8')
  const smOut = sm.replace(/<loc>([^<]+)<\/loc>/g, (whole, loc) => {
    if (/localhost/i.test(loc)) return whole
    const last = loc.split('/').filter(Boolean).pop()
    if (last && last.includes('.')) return whole
    if (!loc.endsWith('/')) return `<loc>${loc}/</loc>`
    return whole
  })
  fs.writeFileSync(sitemapFile, smOut)
}

// ---------- 4. 语言切换器缺页重定向桩 ----------
// VitePress 语言切换器按“当前路径换 locale 前缀”生成链接，不做存在性检查。
// 对不存在的一侧生成 meta-refresh 重定向到存在的一侧，避免 404。
// 覆盖 /en/pages/home/（旧 vdoing 英文首页）等历史 URL。
function buildAddressable() {
  const set = new Set()
  ;(function walk(d, rel) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name)
      if (e.isDirectory()) walk(full, rel + '/' + e.name)
      else set.add((rel + '/' + e.name).slice(1))
    }
  })(DIST, '')
  return set
}
const addressable = buildAddressable()
function exists(urlPath) {
  const p = urlPath.replace(/^\//, '').replace(/[?#].*$/, '').replace(/\/+$/, '')
  if (!p) return addressable.has('index.html')
  return addressable.has(p) || addressable.has(p + '/index.html')
}

const stubs = []
function addStub(url, target) {
  const dir = path.join(DIST, url.replace(/^\//, '').replace(/\/$/, ''))
  const dest = path.join(dir, 'index.html')
  // 双保险：目标文件已存在（实体页或更早的桩）绝不覆盖
  if (exists(url) || fs.existsSync(dest)) return
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="https://www.rulego.cc${target}">
<title>Redirecting…</title>
</head>
<body><p>Redirecting to <a href="${target}">${target}</a>…</p></body>
</html>
`,
  )
  stubs.push(url)
}

// 4.1 旧 vdoing 英文首页
addStub('/en/pages/home/', '/en/')

// 4.2 扫描产物内未命中的内部链接，生成对侧重定向
const htmlFilesList = []
;(function walk3(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, e.name)
    if (e.isDirectory()) walk3(full)
    else if (e.name.endsWith('.html')) htmlFilesList.push(full)
  }
})(DIST)

const missing = new Set()
for (const file of htmlFilesList) {
  const src = fs.readFileSync(file, 'utf8')
  const re = /href="(\/[^"]+)"/g
  let m
  while ((m = re.exec(src))) {
    const href = m[1].replace(/[?#].*$/, '')
    if (/^(https?:)?\/\//i.test(m[1]) || /^[a-z][a-z0-9+.-]*:/i.test(m[1])) continue
    if (!exists(href)) missing.add(href)
  }
}
for (const url of missing) {
  const counterpart = url.startsWith('/en/') ? url.slice(3) : '/en' + url
  const target = exists(counterpart) ? counterpart : url.startsWith('/en/') ? '/en/' : '/'
  addStub(url, target)
}

fs.writeFileSync(path.join(DIST, 'redirect-stubs.json'), JSON.stringify(stubs, null, 2))

console.log(`[postbuild] 目录化页面: ${moved}，改写文件: ${filesPatched}，改写链接: ${linksPatched}`)
console.log(`[postbuild] 重定向桩: ${stubs.length}（redirect-stubs.json）`)
