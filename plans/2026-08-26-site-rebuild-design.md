# rulego-doc 官网重构设计（2026-08-26）

## 0. 决策结论（已与维护者确认）

| 决策点 | 结论 |
|---|---|
| 架构升级 | VuePress 1.9.9 + vdoing → **VitePress 1.x**（即 gflow-doc 同款架构） |
| 首页形态 | **营销型官网首页**（Hero + 生态矩阵 + 架构图 + 快速开始 + CTA），文档降为导航一级项 |
| 商业引导 | **只做生态总览页**：开源/商业打徽章、外链到各产品自己的站点；rulego.cc 上**不做**定价页，正文不掺商业推销 |
| URL | **线上 URL 一律沿用现有 permalink slug**（504/505 文件已带英文 permalink，如 `/pages/js-filter/`，线上 URL 本就是规范化的）；磁盘目录规范化，与 URL 通过 VitePress rewrites 解耦；`permalink` 字段原样保留（rulego-editor 的 gen-docs-manifest.js 依赖它解析链接） |

## 1. 为什么要换架构

- rulego-doc 现栈：VuePress 1.9.9（2023 年停止维护）+ vuepress-theme-vdoing（多年未更新），Node 17+ 需要 `--openssl-legacy-provider` 补丁，构建要 4GB 内存。继续维护是倒计时。
- 目标栈：VitePress 1.x（Vue 3 生态活跃维护），gflow-doc、tpclaw-doc 均已采用，主题组件可直接改造复用。
- 迁移摩擦实测很低：全站 505 个 md（zh ≈219 / en ≈286），容器语法几乎全是 `::: tip/warning/danger`（VitePress 原生支持），仅 21 处 `::: center`、2 处 `cardList` 需自定义容器；frontmatter 只有 vdoing 的 `article` 字段（VitePress 忽略，无害）。

## 2. 站点架构（多站关系）

```
rulego.cc（本次重构，生态门户 + 主文档站，VitePress）
├── /                    营销首页
├── /ecosystem/          生态总览（9 项目，开源/商业徽章）
├── /guide/...           引擎核心文档
├── /components/...      标准/扩展组件参考（数量最大）
├── /endpoint/  /streamsql/  /ai/  /server/   生态级产品文档独立成区
├── /support/  /community/
└── /en/...              英文镜像（VitePress locales）

gflow.rulego.cc   保持独立（商业站，定价页在这里）
tpclaw.teambuf.com 保持独立（后续可考虑迁 rulego 子域，非本次范围）
editor.rulego.cc / app.rulego.cc 保持现状
```

原则：rulego.cc 是「生态门户 + 开源文档」，商业细节（价格、对比、演示）留在各产品自己的站点；rulego.cc 只做**徽章 + 出口链接**。

## 3. 信息架构与路径映射

| 旧路径（vdoing） | 新路径（VitePress） | 说明 |
|---|---|---|
| /01.指南/01~10（快速入门~高级主题） | /guide/ | 引擎核心 |
| /01.指南/03.标准组件、04.扩展组件 | /components/standard/、/components/extension/ | 组件参考独立成区 |
| /01.指南/06.组件市场 | /guide/marketplace/ | 留在 guide |
| /01.指南/07.可视化、08.AOP、09.触发器 | /guide/visualization/、/guide/aop/、/guide/triggers/ | 留在 guide |
| /01.指南/11.智能体框架 | /ai/ | 生态一级产品，提升 |
| /01.指南/12.RuleGo-Server | /server/ | 生态一级产品，提升 |
| /01.指南/21.问题 | /guide/faq/ | |
| /02.Endpoint | /endpoint/ | |
| /03.StreamSQL | /streamsql/ | |
| /04.支持、pages/社区 | /support/、/community/ | |
| @pages/archivesPage.md | 删除或手写归档页 | vdoing 结构页概念不存在 |
| /en/ 镜像 | /en/ 同构映射 | 双语同步迁移 |

子目录内部结构原样保留（编号可顺手去掉），只做顶层规范化，保证迁移可脚本化、抽查可枚举。

迁移脚本必须把每篇的 `permalink` frontmatter 原样写入新文件（VitePress 忽略未知字段），并据此生成 rewrites 映射：磁盘路径 → permalink URL。目录是给人看的，permalink 是给搜索引擎和 editor 内嵌帮助看的，两者解耦。en 区 URL 形如 `/en/pages/xxx/`（locale 前缀 + permalink），切换前抽查线上页面确认前缀形态。

## 4. 主题与组件（从 gflow-doc 复用）

gflow-doc 的设计令牌与组件在 `docs/.vitepress/theme/`。复用策略：

- **直接改造复用**：HomeHero、SectionHead、HomeArchDiagram（改为生态三层架构图）、HomeQuickstart、HomeCta、HomeRepos。
- **改造重命名**：HomeProducts → EcoMatrix（去定价预告，加开源/商业/在建徽章）；首页与生态总览页共用同一份 `ecosystem.mts` 数据源。
- **不引入**：HomePricingTeaser、SealStamp（印章是 gflow 品牌专属；且商业呈现走克制路线）。
- **新增**：EcoBadge、EcoCard、RelatedEco（章尾「生态延伸」引导卡，见 §6）。
- **视觉**：复用布局骨架与双底色体系，主色保持 RuleGo 绿；标题衬线等 gflow 专属气质按 rulego 品牌调整。
- 暂不做共享主题 npm 包（三站各自维护，出现第三个消费方再抽包）。

文档区直接使用 VitePress DefaultTheme 布局（gflow-doc 已是 extend DefaultTheme 的先例）。

## 5. 迁移方案（脚本化，四阶段）

### Phase 0 骨架（0.5~1 天）
- 新分支 `vitepress`：VitePress 1.x + config.mts + 主题骨架；locales zh/en。
- 插件替换表：fulltext-search → `themeConfig.search: local`（MiniSearch 对中文分词差，加 bigram tokenizer；不满足再申请 Algolia DocSearch）；vuepress-plugin-mermaidjs → vitepress mermaid 方案；百度统计/autopush → head 脚本直接搬；vuepress-plugin-comment（valine）→ 弃用或换 giscus；one-click-copy/zooming → VitePress 内置或轻插件。

### Phase 1 内容迁移（1 天，纯脚本）
1. 写 Node 迁移脚本：按 §3 映射表移动 zh/en 全部 md；剥 `article` frontmatter；`::: center` 注册 markdown-it-container，`cardList` 换自定义组件；站内相对链接/资源路径批量重写。
2. 脚本从目录树生成 sidebar 配置（替代 vdoing 自动 sidebar）。
3. `vitepress build` 开 `ignoreDeadLinks` 先跑通，再逐步收紧修复死链。

### Phase 2 首页 + 生态总览 + 导航（1~2 天）
- 营销首页五区块：Hero / EcoMatrix / 三层架构图 / 快速开始 / CTA（支持我们 + GitHub）。
- 生态总览页：§6 的卡片矩阵 + 三层叙事。
- 顶部导航：首页 · 指南 · 组件 · Endpoint · StreamSQL · 智能体 · Server · 生态 · 支持 · 社区 · GitHub。

### Phase 3 校验与 SEO（0.5~1 天）
- URL 基准：rewrites 沿用现有 permalink，内容页 **URL 零变更**，无 301 需求。需处理的只有尾部斜杠与 `.html` 形态差异：加 post-build 步骤把 `x.html` 改写为 `x/index.html`（目录式产物），与 vdoing 的 URL 形态 1:1 对齐，GH Pages 与自有 nginx 均可直接服务。
- 新增页（首页、`/ecosystem/` 等）用新路径，无历史包袱。
- 托管现状待确认：仓库有 CNAME=www.rulego.cc 但 origin 无 gh-pages 分支——切换前先弄清当前线上由谁服务（GitHub Pages / 8.134.32.225 nginx / 其他）。若迁自有 nginx，可额外获得真 301 能力备用。
- 重新提交 sitemap、跑 baiduPush，观察收录。

### Phase 4 切换（0.5 天）
- gh-pages 部署脚本保留备用；DNS/托管切换；抽查高频页面。

### Phase 5 rulego-editor 内嵌帮助联动（0.5 天，极易被漏）
- `rulego-editor/scripts/gen-docs-manifest.js` 扫描 rulego-doc 组件文档生成 editor 内嵌帮助（`src/components/docs/manifest.json` + `md/*.md`，产物提交在 editor 仓库）。适配三处：`COMPONENT_DIRS` 指向新磁盘目录；`CATEGORY_MAP`/`SUBGROUP_MAP` 与新目录名对齐（映射表已含英文 key，新目录用英文名即可命中）；链接解析依赖 `permalink` 字段——迁移保留该字段后无需改动解析逻辑。
- 重新生成并提交：`npm run gen-docs`（zh）+ `DOC_LANG=en node scripts/gen-docs-manifest.js`（en）。editor 与 server-ui 是同一仓库的 linked worktree，git 操作禁忌见仓库根 AGENTS.md。`patch-config.js` 与文档无关，不动。

## 6. 生态总览页与商业引导设计

### 三层叙事（把 gflow-doc「一个家族，两层产品」升格为生态叙事）

1. **引擎/框架层（开源）**：RuleGo 核心、StreamSQL、Endpoint、智能体框架（rulego-components-ai）、gflow-engine。
2. **平台/应用层（开源）**：RuleGo-Server、TPCLAW、rulego-edge + edge-ui（标注「建设中」）。
3. **商业产品**：rulego-editor（可视化编辑器，闭源授权交付）、GFlow Platform（极风工作流，源码交付）。

### 卡片字段
名称 + emoji/logo、一句话定位、徽章（`开源 Apache-2.0` / `商业` / `建设中`）、出口链接（文档 / GitHub·Gitee / 在线演示 / 商业版详情——商业卡片多一项「了解商业版 →」指向产品自己的站）。

### 引导规则（开源论调红线）
- rulego.cc 不出现价格数字；定价信息只存在于 gflow.rulego.cc/pricing、editor 商页。
- 开源文档正文不掺商业内容；引导只出现在：生态总览页、首页 EcoMatrix 区块、**章尾 RelatedEco 卡**。
- RelatedEco 植入点（首批）：RuleGo-Server 文档 → rulego-editor；智能体框架 → TPCLAW、gflow AI 审批；引擎文档 → StreamSQL / gflow-engine；Endpoint → rulego-edge。
- 商业徽章用中性色 + 「商业」字样，不用促销语气；保持开源社区信任是首要约束。

## 7. 风险与对策

| 风险 | 对策 |
|---|---|
| 505 文件双语迁移死链 | 全程脚本批处理 + `failOnDeadLinks` 渐进收紧 + 抽查高频页 |
| rewrites 映射遗漏/错位 | 迁移脚本生成映射后与 504 条 permalink 全量 diff；构建死链检查兜底 |
| GH Pages 无法做真 301 | 优先托管迁自有 nginx；否则 meta refresh + canonical 降级 |
| MiniSearch 中文搜索质量差 | bigram tokenizer；不行申请 Algolia DocSearch（开源项目免费） |
| en 站内容陈旧（286 文件可能滞后于 zh） | 迁移不动内容只搬位置；滞后问题单独立项，不混入本次重构 |
| vdoing 独有概念（@pages、结构页） | 逐个手写替代，清单见 §3 |

## 8. 不做的事（YAGNI）

- 不做共享主题 npm 包（等第三个消费方出现再抽）。
- 不在本次迁移中翻译/修订任何文档内容。
- 不动 gflow-doc、tpclaw-doc 两站（rulego-editor 商页另行处理）。
- rulego-edge 未成熟，官网只给「建设中」入口，不展开文档区。
