# rulego-doc 官网重构 · 执行交接文档（2026-08-26）

> **给执行会话**：本文档自包含开工所需的全部事实与规则。背景与决策依据见同目录 `2026-08-26-site-rebuild-design.md`（先通读一遍，但本文档为准——它包含设计定稿后的新发现）。
> **决策已由维护者拍板，不要重新发起方案讨论，直接执行。**

---

## 1. 任务一句话

把 rulego 官方文档站（`D:\github\rulego-project\rulego-doc`，VuePress 1.9.9 + vdoing，已 EOL）迁移到 VitePress 1.x（架构与主题参考 `D:\github\gflow-project\gflow-doc`），改营销型首页，新增生态总览页（含商业项目的克制引导），**内容页 URL 保持零变更**，最后联动重生成 rulego-editor 的内嵌帮助文档。

## 2. 已拍板的决策（不可再议）

| 决策点 | 结论 |
|---|---|
| 架构 | VuePress 1.9.9 + vdoing → **VitePress 1.x**（gflow-doc 同款） |
| 首页 | **营销型官网首页**（Hero / 生态矩阵 / 三层架构图 / 快速开始 / CTA），文档降为导航一级项 |
| 商业引导 | **只做生态总览页**：开源/商业/在建徽章 + 外链到各产品自己的站；rulego.cc 上**不出现价格数字、不做定价页**；文档正文零商业内容 |
| URL | **内容页 URL 一律沿用现有 permalink slug（零变更）**；磁盘目录规范化为英文，与 URL 通过 rewrites 解耦 |

## 3. 仓库与环境事实

### 3.1 相关仓库

| 仓库 | 路径 | 角色 |
|---|---|---|
| rulego-doc | `D:\github\rulego-project\rulego-doc` | 本次主战场（git 仓库，main 分支） |
| gflow-doc | `D:\github\gflow-project\gflow-doc` | **只读参考**：主题与首页组件的来源，不要改动它 |
| rulego-editor | `D:\github\rulego-project\rulego-editor` | Phase 5 联动（gen-docs-manifest 适配） |

### 3.2 git 禁忌（来自 rulego-editor 仓库 AGENTS.md，必须遵守）

`rulego-server-ui/.git` 是 rulego-editor 仓库的 **linked worktree**（editor=main 分支，server-ui=rulego-ci 分支），共享 stash 栈和对象库。**绝不能在一条命令链里对两边分别 stash/commit**——两次 `git stash` 进同一栈，pop 时会把 A 工作树的改动弹进 B。对任一边做 git 危险操作前先 `git -C <dir> rev-parse --show-toplevel` 确认边界，pop 时显式 `stash@{n}` 并核对 stash message 里的分支名。

通用规则：**未经维护者明确要求不 commit/push**。rulego-doc 仓库当前工作树干净（仅 `plans/` 目录未跟踪，是设计文档）。

### 3.3 rulego-doc 仓库现状

- remote：origin = upstream = `git@github.com:rulego/rulego-doc.git`。
- **origin 上没有 gh-pages 分支**，但 `docs/.vuepress/public/CNAME` = `www.rulego.cc`。`deploy.sh`（推 gh-pages）与实际线上托管的关系不明——**Phase 4 前必须先确认 www.rulego.cc 当前由谁服务**（GitHub Pages / 8.134.32.225 nginx / 其他），问维护者或查 DNS。
- 本地分支 `docs/streamsql-new-features`：已确认 0 个提交领先 main（陈旧分支，可忽略，勿删）。
- 构建：`npm run dev/build`（VuePress 1 + `--openssl-legacy-provider` hack + 4GB 内存，这正是要淘汰它的原因）。`node_modules` 已装。

## 4. 现状关键数字（迁移摩擦实测）

全站 **505 个 md**（zh ≈ 219，en ≈ 286，`docs/en/` 镜像结构）。

- **permalink：504/505 带 `permalink:` frontmatter**（唯一例外 `docs/index.md`，首页 `/`）。这是**线上真实 URL**，如 `permalink: /pages/js-filter/`、`/pages/ai-agent-tools/`。磁盘上带编号的中文目录（`01.指南/03.标准组件/...`）不是 URL。en 区 URL 预期为 `/en/pages/xxx/`（locale 前缀），切换前抽查线上确认。
- 容器语法：`::: tip` 159 处（含无空格变体）、`::: warning` 41、`::: danger` 14——VitePress 原生支持；`::: center` 21、`::: cardList` 2——需注册 markdown-it-container 自定义。
- frontmatter：除 title/permalink 外只有 vdoing 的 `article`（VitePress 忽略，无害，可留可删，建议迁移时顺手剥掉）。
- vdoing 特有：`docs/@pages/archivesPage.md`（结构页，VitePress 无此概念，内容有价值就手写成普通页面，否则删）；根级 `pages/` 目录是空的。
- 站内资源：`docs/.vuepress/public/img/`（迁移时挪到 VitePress 的 `docs/public/img/`，正文 `/img/...` 引用不用改）。

### 4.1 插件替换表

| 旧（VuePress 1） | 新（VitePress） |
|---|---|
| vuepress-plugin-fulltext-search | `themeConfig.search.provider:'local'`；**MiniSearch 中文分词差，需配 bigram tokenizer**（参考 VitePress 文档 i18n 搜索节）；不满意再申请 Algolia DocSearch（开源免费） |
| vuepress-plugin-mermaidjs | vitepress mermaid 方案（`vitepress-plugin-mermaid` + `withMermaid`） |
| baidu-tongji / baidu-autopush | head 脚本直接搬（`config/head.js` 里有现成代码） |
| vuepress-plugin-comment（valine） | 弃用（评论已死寂）或换 giscus——**默认弃用，维护者没要求就别加** |
| one-click-copy / zooming | VitePress 内置（代码复制自带；图片缩放用社区轻插件或不要） |
| vuepress-plugin-sitemap | 社区 `vitepress-plugin-sitemap` 或构建后自生成（hostname=www.rulego.cc） |

## 5. 目标架构

### 5.1 站点关系（不动的那部分）

```
rulego.cc          本次重构：生态门户 + 主文档站
gflow.rulego.cc    不动（商业站，定价页在它自己的 /pricing）
tpclaw.teambuf.com 不动
editor.rulego.cc / app.rulego.cc  不动
```

### 5.2 新磁盘结构（迁移映射表）

| 旧（磁盘） | 新（磁盘） | URL（permalink，不变） |
|---|---|---|
| docs/01.指南/01~10、21.问题 | docs/guide/（faq 归 guide/faq/） | 各自原 permalink |
| docs/01.指南/03.标准组件 | docs/components/standard/ | 同上 |
| docs/01.指南/04.扩展组件 | docs/components/extension/ | 同上 |
| docs/02.Endpoint | docs/endpoint/（10.组件 → components/） | 同上 |
| docs/03.StreamSQL | docs/streamsql/ | 同上 |
| docs/01.指南/11.智能体框架 | docs/ai/ | 同上 |
| docs/01.指南/12.RuleGo-Server | docs/server/ | 同上 |
| docs/04.支持、pages/社区 | docs/support/、docs/community/ | 同上 |
| docs/en/** | docs/en/**（同构映射，英文目录名保持） | /en/pages/... |
| docs/index.md | docs/index.md（重写为营销首页） | / |
| （新增） | docs/ecosystem/index.md | /ecosystem/ |
| docs/@pages/archivesPage.md | 手写归档页或删 | — |

子目录内部结构原样保留（编号前缀顺手去掉），顶层规范化保证脚本可枚举。**注意：`docs/en/03.Standard Components`、`04.Extension Components`、`05.Endpoint Components` 是 gen-docs-manifest.js 的扫描目标，新英文名要通知 Phase 5 改脚本（见 §9）。**

### 5.3 URL 机制（关键设计）

1. 迁移脚本把每篇的 `permalink` frontmatter **原样写入新文件**（VitePress 忽略未知字段；它是 editor 内嵌帮助 manifest 的数据源，不能丢）。
2. 脚本同时生成 `docs/.vitepress/rewrites.mts`：磁盘相对路径 → permalink（去掉首尾斜杠和尾部 index）。504 条映射生成后与源文件 permalink **全量 diff 校验**。
3. **post-build 步骤**：把产物 `x.html` 改写为 `x/index.html`（目录式），与 vdoing URL 形态 1:1 对齐——尾部斜杠 URL 不 301、不 404，GH Pages 和自有 nginx 都直接可用。
4. en locale 用 VitePress `locales`：`/en/` 前缀 + 同套 rewrites 规则。

## 6. 主题与组件（从 gflow-doc 复用，只读参考）

来源：`D:\github\gflow-project\gflow-doc\docs\.vitepress\theme\`（14 个 Vue 组件 + `custom.css` 设计令牌），extend VitePress DefaultTheme。

| gflow-doc 组件 | 处置 |
|---|---|
| HomeHero / HomeQuickstart / HomeCta / HomeRepos / SectionHead | 改文案复用 |
| HomeArchDiagram | 改造为**生态三层架构图**（引擎/框架层 → 平台/应用层 → 商业产品层） |
| HomeProducts | **改造重命名 EcoMatrix**：去定价预告，加徽章列（开源/商业/建设中），数据源改 `ecosystem.mts`（§7） |
| HomePricingTeaser / SealStamp | **不引入**（印章是 gflow 品牌专属；商业呈现走克制路线） |
| HomeDataModel / DataModelDiagram / CheckMatrix / ArchDiagram | 不引入（gflow 业务专属） |
| （新增） | EcoBadge、EcoCard、RelatedEco（章尾「生态延伸」卡） |

视觉：复用布局骨架与双底色体系，主色 RuleGo 绿；gflow 的「公文印章×衬线」气质不照搬。**不做共享主题 npm 包**（两站各自维护）。

## 7. 生态数据源 `docs/.vitepress/theme/ecosystem.mts`

首页 EcoMatrix 与 /ecosystem/ 共用同一份数据。卡片字段：`name / emoji / tagline / badge(open-source|commercial|wip) / repo? / doc? / demo? / commercial?`。内容定稿如下（tagline 执行时可润色，层数、徽章、归属不得改）：

**三层叙事：一个家族（RuleGo 底座），分层产品。**

| 项目 | 层 | 徽章 | 定位 | 出口链接 |
|---|---|---|---|---|
| RuleGo 引擎 | 引擎/框架 | 开源 Apache-2.0 | Go 轻量级高性能组件编排规则引擎 | /guide/ · github.com/rulego/rulego · gitee.com/rulego/rulego |
| 智能体框架 | 引擎/框架 | 开源 | 规则链即智能体：声明式 AI Agent 框架 | /ai/ · github.com/rulego/rulego-components-ai |
| StreamSQL | 引擎/框架 | 开源 | 物联网边缘场景轻量流处理引擎（SQL 处理无界流） | /streamsql/ · github.com/rulego/streamsql |
| Endpoint | 引擎/框架 | 开源 | 30+ 协议接入端点 | /endpoint/ |
| IoT 组件 | 引擎/框架（内置能力） | 开源 | 10+ 工业协议采集点位组件（modbus/s7/opcua/eip/mc/fins/dlt645/bacnet/snmp/iec104） | /components/extension/iot/ |
| gflow-engine | 引擎/框架 | 开源 Apache-2.0 | 中国式审批工作流引擎（复用规则链 DSL，7 张表） | gflow.rulego.cc · github.com/rulego/gflow-engine |
| RuleGo-Server | 平台/应用 | 开源 | 开箱即用的应用开发平台（RESTful/多租户/组件市场/MCP/AI） | /server/ |
| TPCLAW | 平台/应用 | 开源 | 自托管 AI 智能体平台（IM 多通道/自我进化） | tpclaw.teambuf.com · github.com/teambuf/tpclaw |
| rulego-edge (+edge-ui) | 平台/应用 | 开源 · **建设中** | 单二进制边缘采集网关（edge-first、cloud-optional） | github.com/rulego/rulego-edge |
| rulego-editor | 商业产品 | 商业 | 规则链可视化编辑器（Vue3，npm `@rulego/editor` 授权交付） | editor.rulego.cc · app.rulego.cc（在线体验） |
| GFlow Platform | 商业产品 | 商业 | 极风工作流：开箱即用审批平台（源码交付） | gflow.rulego.cc（价格在其 /pricing） |

### 商业引导红线（违反即返工）

- rulego.cc 全站不出现价格数字、不做定价页、不出现促销语气。
- 开源文档正文零商业内容。引导只出现在三处：/ecosystem/ 页、首页 EcoMatrix 区块、章尾 RelatedEco 卡。
- 商业卡片 = 徽章（中性色）+「了解商业版 →」外链，仅此而已。
- RelatedEco 首批植入点：Server 文档章尾 → rulego-editor；智能体框架 → TPCLAW、gflow AI 审批；引擎/组件文档 → StreamSQL、gflow-engine；Endpoint/iot → rulego-edge。

## 8. 分阶段任务与验收标准

在 rulego-doc 新分支 `vitepress` 上工作（`git checkout -b vitepress`）。

### Phase 0 骨架（0.5~1 天）
做：VitePress 1.x 安装、`docs/.vitepress/config.mts`（locales zh/en、head 搬百度统计、nav 骨架：首页·指南·组件·Endpoint·StreamSQL·智能体·Server·生态·支持·社区·GitHub）、主题骨架（从 gflow-doc 拷组件改造，§6 清单）、自定义容器（center/cardList）注册。
验收：`npm run docs:dev` 起得来，首页/临时页可渲染，中英 locale 切换正常。

### Phase 1 内容迁移（1 天，纯脚本）
做：Node 迁移脚本（放 `scripts/migrate.mjs`）——按 §5.2 映射搬 505 个文件（zh+en）、剥 `article` frontmatter、保留 title/permalink、站内相对链接批量重写（指向新磁盘路径）、生成 `rewrites.mts`、生成 sidebar 配置（从目录树）。先 `ignoreDeadLinks: true` 跑通构建，再收紧修复。
验收：`docs:build` 成功且 `failOnDeadLinks` 打开；rewrites 504 条与源 permalink 全量 diff 为零；抽样 10 个页面（含 en、含 IoT/StreamSQL 深层页）正文/图片/表格/容器渲染正常。

### Phase 2 首页 + 生态页 + 导航（1~2 天）
做：营销首页五区块（Hero/EcoMatrix/三层架构图/快速开始/CTA）、/ecosystem/ 页、RelatedEco 卡组件与首批植入、完整 nav+sidebar、搜索（local + bigram tokenizer）、sitemap。
验收：首页与生态页在明暗两主题下无样式破损；所有生态卡片的链接可达（外链 200）；中文搜索「过滤器」「点位」能命中。

### Phase 3 校验与 SEO（0.5~1 天）
做：post-build 目录式改写脚本（`x.html` → `x/index.html`）；确认 www.rulego.cc 托管现状（§3.3，**问维护者**）；生成 sitemap；本地 `docs:preview` 全量抽查。
验收：preview 下用旧式 URL（带尾斜杠，如 `/pages/js-filter/`、`/en/pages/introduction/`）抽查 20 个页面全部 200。

### Phase 4 部署切换（0.5 天）
做：按确认的托管方式部署（GH Pages 则更新 deploy.sh；自有 nginx 则上传 dist 并保留旧站备份）；重提交 sitemap、跑 baiduPush；观察收录。
验收：线上抽查 20 页 200；Google Search Console/百度站长无大规模 404。
**切换完成后停一下，向维护者汇报再进 Phase 5。**

### Phase 5 rulego-editor 内嵌帮助联动（0.5 天，极易漏）
见 §9 详单。

## 9. gen-docs-manifest.js 适配详单（维护者点名确认的耦合点）

`D:\github\rulego-project\rulego-editor\scripts\gen-docs-manifest.js`（`npm run gen-docs`）：扫描 rulego-doc 组件文档，生成 editor 内嵌帮助 `src/components/docs/manifest.json + md/*.md`（**产物是提交在 editor 仓库里的**，消费方 `src/components/docs/index.js` + `src/components/pages/doc-browser/DocBrowser.vue`）。同目录 `patch-config.js` 是构建产物后端地址改写器，**与文档无关，不动**。

三个耦合点与改法：

1. **扫描路径**（`COMPONENT_DIRS`，L29-31）：zh `['docs/01.指南/03.标准组件','docs/01.指南/04.扩展组件','docs/02.Endpoint/10.组件']` → 改为新路径 `['docs/components/standard','docs/components/extension','docs/endpoint/components']`；en 同理改 `docs/en/...` 英文新路径（以 Phase 1 实际产出为准，**改前 `ls` 核对**）。
2. **目录名→分类**（`CATEGORY_MAP` L37-49 / `SUBGROUP_MAP` L60-67）：已含英文 key（filter/action/transform/external/ai/iot/stream/endpoint...），新磁盘目录用这些英文名即可命中；新增目录名则补 key。注意 `deriveSubgroup` 匹配「目录名+'/'」的子串，二级目录去编号后需逐个核对命中。
3. **链接解析依赖 permalink**（`extractFrontmatter` L90-100 / `indexPermalinks` / `resolveHref` L121-131）：把组件文档里的相对 .md 链接解析成 `https://rulego.cc` + permalink 绝对地址。**Phase 1 保留 permalink 字段后此逻辑无需改**——这就是为什么迁移绝不能丢 permalink。若发现解析失效，先查迁移文件里 permalink 是否还在，而不是改脚本。

执行顺序：文档站切换完成并确认线上 URL 不变后——
```bash
cd D:\github\rulego-project\rulego-editor
# 先改好 COMPONENT_DIRS 等，然后：
npm run gen-docs                                   # zh
# DOC_LANG 的 en 生成（package.json 若无 en script）：
DOC_LANG=en node scripts/gen-docs-manifest.js      # Git Bash 下可用；cmd 下用 set DOC_LANG=en &&
```
对比重新生成前后 `manifest.json` 的条目数与 permalink 值（应基本一致，仅路径结构变化）；editor 里打开组件帮助浏览器抽查 5 个组件（含 endpoint 类和 ai/llm 命名空间类）。
提交：editor 仓库单独 commit 产物 + 脚本改动，**遵守 §3.2 git 禁忌**（editor/server-ui 是同一仓库的 linked worktree，绝不在一条命令链里对两边 git 操作）。

## 10. 红线 / 不做的事

- 不 commit/push 除非维护者明确要求（Phase 4 汇报点除外，届时也要先问）。
- 不动 gflow-doc、tpclaw-doc 两个仓库的任何文件（只读参考）。
- 不翻译、不修订任何文档正文内容（en 区滞后是已知问题，单独立项）。
- 不做共享主题 npm 包。
- rulego-edge 只给「建设中」徽章入口，不展开文档区。
- 商业红线见 §7。
- `docs/.vuepress/dist/` 等旧构建产物、旧 `node_modules` 留在分支里，最终合并前一次性清理（`docs/.vuepress/` 整目录在迁移完成验证后删除）。

## 11. 最终验收清单

- [ ] `docs:build` 成功，`failOnDeadLinks` 开启，zh+en 全量
- [ ] rewrites 与 504 条 permalink diff 为零
- [ ] 线上/preview 带尾斜杠旧 URL 抽查 20 页 200（含 /en/）
- [ ] 首页五区块 + /ecosystem/ 两主题无样式破损
- [ ] 生态 11 张卡片链接全部可达，商业卡片无价格数字
- [ ] 中文搜索可用（bigram）；mermaid 图渲染正常
- [ ] sitemap 重新提交，baiduPush 跑过
- [ ] editor `npm run gen-docs` zh+en 重生成并抽查 5 组件
- [ ] 旧 `docs/.vuepress/` 删除，构建不再需要 openssl-legacy-provider
