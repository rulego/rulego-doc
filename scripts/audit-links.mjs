#!/usr/bin/env node
/**
 * 链接爬虫审计：从构建产物视角模拟浏览器，验证每个 dist 页面里的内部链接
 * （href）都指向真实存在的文件（目录式 index.html 或带扩展名的资源）。
 *
 * 用法：node scripts/audit-links.mjs（需先完成 docs:build + postbuild）
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '../docs/.vitepress/dist')

const htmlFiles = []
;(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, e.name)
    if (e.isDirectory()) walk(full)
    else if (e.name.endsWith('.html')) htmlFiles.push(full)
  }
})(DIST)

// dist 内可寻址文件集合（相对路径）
const addressable = new Set()
;(function walk2(d, rel) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, e.name)
    if (e.isDirectory()) walk2(full, rel + '/' + e.name)
    else addressable.add((rel + '/' + e.name).slice(1))
  }
})(DIST, '')

function resolves(urlPath) {
  // 去锚点/查询，统一无前导斜杠（与 addressable 键一致）
  const p = decodeURIComponent(urlPath.replace(/[?#].*$/, '')).replace(/^\//, '')
  if (p === '' || p === '/') return addressable.has('index.html')
  if (addressable.has(p)) return true
  if (addressable.has(p.replace(/\/$/, ''))) return true
  // 目录式：/pages/x/ -> pages/x/index.html
  if (/\/$/.test(p) && addressable.has(p + 'index.html')) return true
  // 无后缀页面路径：/pages/x -> pages/x/index.html（静态服务器通常 301/直出）
  if (p && !p.split('/').pop().includes('.') && addressable.has(p + '/index.html')) return true
  return false
}

let total = 0
const dead = new Map()
for (const file of htmlFiles) {
  const src = fs.readFileSync(file, 'utf8')
  const relFile = path.relative(DIST, file).replace(/\\/g, '/')
  const re = /(?:href|src)="([^"]+)"/g
  let m
  while ((m = re.exec(src))) {
    const href = m[1]
    if (/^(https?:)?\/\//i.test(href)) continue
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) continue
    if (href.startsWith('#')) continue
    if (/localhost/i.test(href)) continue
    total++
    let ok
    if (href.startsWith('/')) {
      ok = resolves(href)
    } else {
      // 相对引用（产物内应为绝对路径，出现即异常）
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(relFile), href))
      ok = resolves('/' + target)
    }
    if (!ok) {
      const k = relFile + ' -> ' + href
      dead.set(k, (dead.get(k) || 0) + 1)
    }
  }
}

console.log(`页面: ${htmlFiles.length}，检查内部引用: ${total}`)
console.log(`死链: ${dead.size}`)
for (const [k, c] of [...dead.entries()].slice(0, 30)) console.log('  DEAD', k, `x${c}`)
process.exit(dead.size === 0 ? 0 : 1)
