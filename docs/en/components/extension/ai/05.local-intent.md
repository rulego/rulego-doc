---
title: Local Intent Recognition

permalink: /pages/ai-local-intent/
---

The `ai/localIntent` component: <Badge text="v0.36.0+"/> local intent classification based on embedding vectors — no LLM calls. It matches user input to predefined intents via semantic similarity and routes the result to matching downstream nodes as a Relation Type.

Suited to scenarios with few intents, well-separated semantics, and sensitivity to latency and cost. With many intents or fuzzy semantic boundaries, prefer [LLM Intent Recognition](/en/pages/ai-intent/).

## Configuration

| Field | Type | Description | Default |
|------|------|------|--------|
| url | string | Embedding model API endpoint | |
| key | string | Embedding model API key; may be empty for private deployments | |
| model | string | Embedding model name | |
| input | string | User input expression, supports `${msg.key}` and `${metadata.key}`. Empty = `msg.GetData()` | |
| intents | []LocalIntent | Predefined intent list (at least one required) | 3 built-in sample intents |
| intentsFile | string | External intent file path, YAML or JSON | |
| threshold | float64 | Minimum similarity; below it the default intent is used | 0.65 |
| minGap | float64 | Minimum gap between the top and second score; below it the default intent is used | 0.05 |
| defaultIntent | string | Default intent (used when recognition fails) | Default |

### LocalIntent Structure

| Field | Type | Description |
|------|------|------|
| name | string | Intent name (used as the Relation Type for routing) |
| description | string | Intent description (participates in semantic matching) |
| examples | []string | Typical utterances for the intent; 8-10 recommended |

### Intent File Format

Both YAML and JSON are supported:

**YAML:**
```yaml
intents:
  - name: createRule
    description: "创建条件触发的自动化联动规则"
    examples:
      - "有人就开灯"
      - "温度大于30度开空调"
      - "水浸时开风机"
      - "下雨天自动关窗"
      - "离开家的时候关掉所有电器"
      - "每天早上7点开窗帘"
      - "空气质量差就开净化器"
      - "燃气泄漏立刻关阀门"
  - name: control
    description: "控制设备开关或调节参数"
    examples:
      - "打开灯光"
      - "把风机关闭"
      - "关闭客厅灯"
      - "空调调到26度"
      - "让窗帘拉下来"
      - "把门锁上"
      - "电视声音大一点"
      - "关掉所有灯"
      - "启动扫地机器人"
  - name: query
    description: "查询设备当前状态或数值"
    examples:
      - "当前温度多少"
      - "灯是不是开着的"
      - "风机状态怎么样"
      - "空调现在几度"
      - "窗帘拉开着吗"
      - "门锁了没"
      - "现在湿度多少"
      - "热水器还在加热吗"
```

> The sample utterances above are in Chinese because the example uses a Chinese embedding model — write your examples in the language your users speak.

**JSON:**
```json
{
  "intents": [
    {
      "name": "createRule",
      "description": "创建条件触发的自动化联动规则",
      "examples": ["有人就开灯", "温度大于30度开空调", "水浸时开风机", "下雨天自动关窗"]
    }
  ]
}
```

## How Matching Works

1. At initialization, the `description` and `examples` of every intent are vectorized by the embedding model (API called in batches of 10)
2. At runtime, the user input is vectorized by the same model
3. Cosine similarity is computed between the input vector and every intent vector
4. If the top score is below `threshold`, or the gap between the top two scores is below `minGap`, `defaultIntent` is used
5. Otherwise the top-scoring intent wins

## Execution Result

- The recognized intent is written to `msg.Metadata["intent"]`; `msg.Data` is left untouched (the original message passes through)
- Routed via `TellNext(msg, intentName)` to the matching connection type
- `defaultIntent` is used when the thresholds are not met

## Best Practices

### Writing Descriptions

`description` participates directly in the vector computation — its quality caps the matching quality:

- **Describe the intent semantics precisely**, avoid vagueness: "control device on/off or adjust parameters" beats "control devices"
- **Emphasize distinctions from other intents**: "create condition-triggered automation linkage rules" beats "create linkage rules"
- Do not include the intent name itself; the description should carry the semantics on its own

### Writing Examples

Examples are the core of generalization — they determine whether the model recognizes utterances it has never seen:

- **Cover different devices**: don't use only lights and fans; add curtains, locks, air conditioners, robots, etc.
- **Cover different sentence patterns**: imperative ("turn on the light"), colloquial ("is the light on"), interrogative ("is the AC running?"), negative ("stop the washing machine")
- **Cover different action verbs**: "turn on", "switch off", "set to", "start", "pull down", etc.
- **8-10 examples per intent**: fewer under-generalizes (tests showed a 0% generalization rate with only 2), more adds noise
- Avoid semantic overlap between examples of different intents

### Tuning the Threshold

- `0.65` (default): for scenarios with well-separated intents — few mis-matches, but may reject some valid inputs
- `0.50-0.60`: for intents with some mutual similarity — higher recall at the cost of more mis-matches
- Keep `minGap` at `0.05` to catch ambiguous inputs whose top-two scores are close
- Tune with real business data: collect typical utterances, lower the threshold step by step until mis-matches appear, then back off by 0.05
- Vector spaces differ across embedding models — re-tune the threshold after switching models

## Configuration Example

```json
{
  "id": "node_local_intent",
  "type": "ai/localIntent",
  "name": "Local Intent Classification",
  "configuration": {
    "url": "https://ai.gitee.com/v1/embeddings",
    "key": "sk-xxx",
    "model": "Qwen3-Embedding-8B",
    "threshold": 0.65,
    "minGap": 0.05,
    "intents": [
      {
        "name": "createRule",
        "description": "创建条件触发的自动化联动规则",
        "examples": [
          "有人就开灯", "温度大于30度开空调", "水浸时开风机",
          "下雨天自动关窗", "离开家的时候关掉所有电器", "每天早上7点开窗帘",
          "空气质量差就开净化器", "燃气泄漏立刻关阀门"
        ]
      },
      {
        "name": "control",
        "description": "控制设备开关或调节参数",
        "examples": [
          "打开灯光", "把风机关闭", "关闭客厅灯",
          "空调调到26度", "让窗帘拉下来", "把门锁上",
          "电视声音大一点", "关掉所有灯", "启动扫地机器人"
        ]
      },
      {
        "name": "query",
        "description": "查询设备当前状态或数值",
        "examples": [
          "当前温度多少", "灯是不是开着的", "风机状态怎么样",
          "空调现在几度", "窗帘拉开着吗", "门锁了没",
          "现在湿度多少", "热水器还在加热吗"
        ]
      }
    ],
    "defaultIntent": "unknown"
  }
}
```

## Application Example

**IoT smart routing (cloud embedding API):**

```json
{
  "ruleChain": {"id": "iot-router", "name": "IoT Smart Router", "root": true},
  "metadata": {
    "firstNodeIndex": 0,
    "nodes": [
      {
        "id": "node_local_intent", "type": "ai/localIntent", "name": "Local Intent",
        "configuration": {
          "url": "https://ai.gitee.com/v1/embeddings",
          "key": "sk-xxx",
          "model": "Qwen3-Embedding-8B",
          "threshold": 0.65,
          "minGap": 0.05,
          "intents": [
            {
              "name": "createRule",
              "description": "创建条件触发的自动化联动规则",
              "examples": [
                "有人就开灯", "温度大于30度开空调", "水浸时开风机",
                "下雨天自动关窗", "离开家的时候关掉所有电器", "每天早上7点开窗帘",
                "空气质量差就开净化器", "燃气泄漏立刻关阀门"
              ]
            },
            {
              "name": "control",
              "description": "控制设备开关或调节参数",
              "examples": [
                "打开灯光", "把风机关闭", "关闭客厅灯",
                "空调调到26度", "让窗帘拉下来", "把门锁上",
                "电视声音大一点", "关掉所有灯", "启动扫地机器人"
              ]
            },
            {
              "name": "query",
              "description": "查询设备当前状态或数值",
              "examples": [
                "当前温度多少", "灯是不是开着的", "风机状态怎么样",
                "空调现在几度", "窗帘拉开着吗", "门锁了没",
                "现在湿度多少", "热水器还在加热吗"
              ]
            }
          ],
          "defaultIntent": "unknown"
        }
      },
      {"id": "node_create", "type": "restApiCall", "name": "Create Rule",
        "configuration": {"url": "http://api/createRule", "requestMethod": "POST"}},
      {"id": "node_control", "type": "restApiCall", "name": "Control Device",
        "configuration": {"url": "http://api/control", "requestMethod": "POST"}},
      {"id": "node_query", "type": "restApiCall", "name": "Query Status",
        "configuration": {"url": "http://api/query", "requestMethod": "POST"}},
      {"id": "node_unknown", "type": "ai/llm", "name": "Fallback Reply",
        "configuration": {"url": "https://ai.gitee.com/v1", "key": "sk-xxx", "model": "Qwen2-7B-Instruct", "systemPrompt": "你是一个IoT助手，帮助用户解答问题"}}
    ],
    "connections": [
      {"fromId": "node_local_intent", "toId": "node_create", "type": "createRule"},
      {"fromId": "node_local_intent", "toId": "node_control", "type": "control"},
      {"fromId": "node_local_intent", "toId": "node_query", "type": "query"},
      {"fromId": "node_local_intent", "toId": "node_unknown", "type": "unknown"}
    ]
  }
}
```

**Private local deployment (offline, no internet required):**

```json
{
  "id": "node_local_intent",
  "type": "ai/localIntent",
  "name": "Offline Intent",
  "configuration": {
    "url": "http://localhost:8080/v1/embeddings",
    "model": "BAAI/bge-small-zh-v1.5",
    "threshold": 0.60,
    "intentsFile": "/etc/rulego/intents.yaml"
  }
}
```

**Multilingual intent recognition:**

```json
{
  "id": "node_local_intent",
  "type": "ai/localIntent",
  "name": "Multilingual Intent",
  "configuration": {
    "url": "https://ai.gitee.com/v1/embeddings",
    "key": "sk-xxx",
    "model": "Qwen3-Embedding-8B",
    "threshold": 0.65,
    "intents": [
      {
        "name": "control",
        "description": "Control device on/off or adjust parameters",
        "examples": [
          "打开灯光", "Turn on the light", "把风机关闭",
          "Close the curtain", "空调调到26度", "Lock the door"
        ]
      }
    ]
  }
}
```

## Self-Hosting an Embedding Model

Local intent recognition relies on an embedding model. Besides cloud APIs, you can self-host with HuggingFace [Text Embeddings Inference (TEI)](https://github.com/huggingface/text-embeddings-inference) for fully offline operation.

### Recommended Models

| Model | Parameters | Dimensions | Strengths | Use case |
|------|--------|------|------|----------|
| BAAI/bge-small-zh-v1.5 | 33M | 512 | Light and fast, good Chinese quality | Edge gateways, constrained devices |
| BAAI/bge-base-zh-v1.5 | 102M | 768 | Quality/speed balance | General server deployment |
| BAAI/bge-large-zh-v1.5 | 326M | 1024 | Highest accuracy | Accuracy-critical scenarios |
| Qwen/Qwen3-Embedding-0.6B | 600M | 1024 | Multilingual | Mixed Chinese/English or multilingual |

> Model selection: start small (bge-small-zh); upgrade only if accuracy is insufficient.

### Deploying TEI with Docker

**GPU (recommended):**

```bash
model=BAAI/bge-small-zh-v1.5
volume=$PWD/data

docker run -d --gpus all -p 8080:80 \
  -v $volume:/data \
  --name tei-server \
  ghcr.io/huggingface/text-embeddings-inference:latest \
  --model-id $model
```

**CPU:**

```bash
model=BAAI/bge-small-zh-v1.5
volume=$PWD/data

docker run -d -p 8080:80 \
  -v $volume:/data \
  --name tei-server \
  ghcr.io/huggingface/text-embeddings-inference:latest \
  --model-id $model
```

> The first start downloads model weights from HuggingFace automatically. Mount a volume to avoid re-downloading.

### Mirror Acceleration (China)

If `ghcr.io` is unreachable, use a mirror:

```bash
# Pull the image
docker pull docker.aityp.com/ghcr.io/huggingface/text-embeddings-inference:latest

# Run with the local image
docker run -d -p 8080:80 \
  -v $PWD/data:/data \
  --name tei-server \
  docker.aityp.com/ghcr.io/huggingface/text-embeddings-inference:latest \
  --model-id BAAI/bge-small-zh-v1.5
```

### Offline Deployment (No Network)

Download the weights in advance, then load them in the offline environment:

```bash
# 1. Download the model on a networked machine (requires git-lfs)
git lfs install
git clone https://huggingface.co/BAAI/bge-small-zh-v1.5 models/bge-small-zh-v1.5

# 2. Copy the models directory to the offline machine

# 3. Start with the local model mounted
docker run -d -p 8080:80 \
  -v $PWD/models:/data \
  --name tei-server \
  ghcr.io/huggingface/text-embeddings-inference:latest \
  --model-id /data/bge-small-zh-v1.5
```

### Verifying the Deployment

```bash
# Test the embedding endpoint
curl http://localhost:8080/v1/embeddings \
  -H "Content-Type: application/json" \
  -d '{"input": "打开灯光", "model": "BAAI/bge-small-zh-v1.5"}'

# Should return a JSON response containing the embedding vector
```

### Connecting LocalIntentNode

TEI exposes an OpenAI-compatible `/v1/embeddings` endpoint — just point `url` at it:

```json
{
  "url": "http://localhost:8080/v1/embeddings",
  "model": "BAAI/bge-small-zh-v1.5",
  "key": ""
}
```

> A local TEI deployment needs no API key; leave `key` empty.
