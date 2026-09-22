---
title: Jev 决策

permalink: /pages/ai-jev/
---

`ai/jev` 组件：接入 [TypeSafe AI](https://typesafe.ai/) 的 System One 模型（Jev），**问一个问题，按答案路由**。与 [意图识别](/pages/ai-intent/)（LLM 分类）、[本地意图识别](/pages/ai-local-intent/)（嵌入匹配）互补。只需要是否判断（True/False 守卫）时可用独立组件 [Jev 过滤](/pages/ai-jev-filter/)。

Jev 不生成文本，只输出带校准置信度的类型化决策，延迟 70~500ms、成本约为 LLM 分类的百分之一量级，适合**每条消息都过得起**的在线决策位置：意图分流、风险门控、告警分级等。

## 用法

三步：**① 填主问题 → ② 填选项 → ③ 把每个选项名连一条线**。其他维度要一起判断时，再加附加问题（可选）。

三种答案形态：

| 形态 | 界面显示 | 填什么 | 路由 |
|------|------|------|------|
| `choice`（默认） | 多选一 | 问题 + 选项列表（名称+描述） | 按胜出选项名路由 |
| `noul` | 是否 | 问题（当作一句陈述），不填选项 | `True` / `False` 两条线 |
| `score` | 程度分级 | 问题 + 有序档位列表（低→高） | 按最近档位名路由，metadata 带连续分数 |

## 连线

| 形态 | 连线 |
|------|------|
| choice | 每个选项名一条 + `Default`（低置信）+ `Failure`（接口出错） |
| noul | `True` / `False` + `Failure` |
| score | 每个档位名一条 + `Default` + `Failure` |

连线候选会按节点配置自动出现在下拉里，无需手输。`Default` 线专属低置信答案，把它连到 LLM 节点即级联模式。

## 配置

| 字段 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| url | string | System One 端点，网络不可达时可改指向代理网关 | `https://api.typesafe.ai/v1/systemone` |
| key | string | API Key，支持 `${global.xxx}` 模板 | |
| model | string | 模型名 | `jev-latest` |
| input | string | 要判断的内容，支持 `${msg.key}` 和 `${metadata.key}`。为空时使用 `msg.GetData()` | |
| question | string | 对输入提的问题 | |
| answerType | string | `choice` / `noul` / `score` | `choice` |
| options | []Option | 选项列表。choice 时是路由出口；score 时按顺序作为评分标尺（2~10 档）；noul 时忽略 | |
| extraQuestions | []ExtraQuestion | 附加问题（可选）：与主问题一次请求并行评估，答案只写入结果，不影响路由 | |
| outputTo | string | 结果输出位置：`metadata` 写入元数据（默认，负荷透传）；`data` 用结果 JSON 对象整体替换消息负荷 | `metadata` |
| minConfidence | float | 置信度低于该值不按胜出项路由，改走 `Default` 线 | 0.5（负数关闭） |

超时（10 秒）、过载重试（2 次指数退避）、门控阈值（0.5）、state 形态（自动识别 JSON）均为固定默认值，不暴露配置。

### Option 结构

| 字段 | 说明 |
|------|------|
| name | 选项名/档位名，即路由连接类型 |
| description | 选项含义/档位说明，帮助模型判断；score 形态下描述作为评分标尺，name 只做连线映射 |

### ExtraQuestion 结构（附加问题）

| 字段 | 说明 |
|------|------|
| id | 答案写入结果的键（`jev.<id>`），不能为 `answer` |
| type | `choice` / `noul` / `score` |
| question | 对输入提的问题 |
| options | 同主问题的 Option 结构，noul 时忽略 |

附加问题适合一条消息要打好几个维度标签的研判场景（如紧急度 + 严重度 + 部门）：全部问题**一次请求并行评估**，几乎不增加延迟。

使用分工一句话：**主问题的答案决定连线，附加问题的结果只供读取**——下游用 `${metadata.jev.<id>}`（或 data 模式下 `${msg.<id>}`）取值。附加问题缺答案不报错，主问题路由不受影响。

### 结果输出（outputTo）

- `metadata`（默认）：全部答案写入 `msg.Metadata`，`msg.Data` 原样透传
- `data`（别名 `msg`）：`msg.Data` 被结果 JSON 对象整体替换（含 `answer`、`<id>` 各附加答案、`model`、`usage`，数值用原生类型），适合把研判结果直接作为链的产出（如 HTTP 端点响应）；需要保留原始消息时用 `metadata`

## 执行结果（metadata 模式）

`msg.Data` 原样透传，结果写入 metadata：

- `jev.answer`：答案主值（选项名 / 0~1 概率 / 连续分数）
- `jev.answer.confidence`、`jev.answer.probabilities`：置信度与分布
- `jev.level`：score 形态的最近档位名
- `jev.model`、`jev.usage`：模型与 token 消耗

## 配置示例

### 意图分流（choice）

```json
{
  "id": "node_jev_1",
  "type": "ai/jev",
  "name": "工单分拣",
  "configuration": {
    "key": "${global.typesafeKey}",
    "question": "选择与输入内容最匹配的意图",
    "options": [
      {"name": "billing", "description": "账单、发票、扣款问题"},
      {"name": "technical", "description": "故障、集成、报错"},
      {"name": "sales", "description": "售前咨询、报价"}
    ]
  }
}
```

画布连三条线：billing / technical / sales。

### 风险门控（noul）

```json
{
  "id": "node_jev_2",
  "type": "ai/jev",
  "name": "危险命令守卫",
  "configuration": {
    "key": "${global.typesafeKey}",
    "question": "该命令会修改或删除数据，具有破坏性",
    "answerType": "noul"
  }
}
```

`False` 线直接执行，`True` 线先走人工确认。

### 告警分级（score）

```json
{
  "id": "node_jev_3",
  "type": "ai/jev",
  "name": "告警分级",
  "configuration": {
    "key": "${global.typesafeKey}",
    "question": "根据告警内容评估严重程度",
    "answerType": "score",
    "options": [
      {"name": "info", "description": "无需处理"},
      {"name": "warning", "description": "值班员关注"},
      {"name": "high", "description": "尽快处理"},
      {"name": "critical", "description": "立即处置"}
    ]
  }
}
```

四条线分流，`jev.answer` 是连续分数（如 1.4），可做阈值逻辑。

### 附加问题 + 结果输出（data）

```json
{
  "id": "node_jev_4",
  "type": "ai/jev",
  "name": "工单研判",
  "configuration": {
    "key": "${global.typesafeKey}",
    "question": "选择与输入内容最匹配的意图",
    "answerType": "choice",
    "options": [
      {"name": "billing",   "description": "账单、发票、扣款问题"},
      {"name": "technical", "description": "故障、集成、报错"},
      {"name": "sales",     "description": "售前咨询、报价"}
    ],
    "extraQuestions": [
      {"id": "isUrgent", "type": "noul", "question": "消息表达紧急或时限压力"},
      {"id": "severity", "type": "score", "question": "评估严重程度",
       "options": [
         {"name": "低", "description": "常规问题"},
         {"name": "中", "description": "影响部分用户"},
         {"name": "高", "description": "生产事故级"}
       ]}
    ],
    "outputTo": "data"
  }
}
```

三个问题一次请求并行评估；路由仍按 `billing`/`technical`/`sales` 三条线，负荷被结果对象整体替换，典型 HTTP 端点响应即：

```json
{
  "answer": "technical",
  "answer.confidence": 0.9,
  "isUrgent": 0.99,
  "severity": 2,
  "severity.confidence": 0.9,
  "model": "jev-1.13.0",
  "usage": {"input": 392, "output": 65}
}
```

### 低置信度级联

置信度低于 0.5 时消息走 `Default` 线——这条线专属低置信（正常答案都走选项/True-False/档位线，同 switch 的兜底线惯例），把它连到 [ai/agent](/pages/ai-agent/) 节点就是级联模式：Jev 处理高置信的大多数，LLM 只接不确定的少数。

## 选型对照

| | `ai/intent` | `ai/localIntent` | `ai/jev` |
|------|------|------|------|
| 引擎 | LLM 生成式分类 | 嵌入向量最近邻 | System One 概率决策 |
| 延迟 | 秒级 | 本地毫秒 / 云端百毫秒 | 70~500ms |
| 能判断什么 | 意图分类 | 意图分类 | 是/否、多选、评分 |
| 外部依赖 | LLM API | Embedding API | System One API |

## 注意事项

- API Key 在 [console.typesafe.ai](https://console.typesafe.ai/keys) 申请
- 查询型接口无副作用，429/529 过载时自动指数退避重试
- 中文问题的判断质量建议先实测再上线
