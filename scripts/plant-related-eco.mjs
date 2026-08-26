// 章尾「生态延伸」卡植入（一次性）。重跑安全：已植入的行会被规范化重写。
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS = path.resolve(__dirname, '../docs')

const PLANT = [
  { file: 'server/概述与快速开始.md', ids: ['rulego-editor'] },
  { file: 'ai/概述.md', ids: ['tpclaw', 'gflow-engine'] },
  { file: 'guide/quickstart/简介.md', ids: ['streamsql', 'gflow-engine'] },
  { file: 'components/standard/说明.md', ids: ['streamsql', 'gflow-engine'] },
  { file: 'endpoint/说明.md', ids: ['rulego-edge'] },
  { file: 'components/extension/iot/概览.md', ids: ['rulego-edge'] },
]

for (const { file, ids } of PLANT) {
  const full = path.join(DOCS, file)
  let s = fs.readFileSync(full, 'utf8')
  const tag = `<RelatedEco :ids="[${ids.map((i) => `'${i}'`).join(',')}]" />`
  if (s.includes('<RelatedEco')) {
    s = s.replace(/<RelatedEco[^\n]*\/>/, tag)
  } else {
    s = s.replace(/\s*$/, '\n') + '\n' + tag + '\n'
  }
  fs.writeFileSync(full, s)
  console.log('OK', file, tag)
}
