---
title: Local Intent Recognition
permalink: /pages/ai-local-intent/
---
`ai/localIntent` component: <Badge text="v0.36.0+"/> local intent classification based on embedding vectors. Without calling an LLM, it matches user input to predefined intents by semantic similarity and routes the recognition result as a Relation Type to matching downstream nodes.

Suited to scenarios with few intents, large semantic gaps, and sensitivity to latency and cost. With many intents or blurry semantic boundaries, [LLM-based intent recognition](/en/pages/ai-intent/) is recommended.

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| url | string | Embedding model API URL | |
| key | string | Embedding model API key; can be empty for private deployments | |
| model | string | Embedding model name | |
| input | string | User input expression, supports `${msg.key}` and `${metadata.key}`. When empty, `msg.GetData()` is used | |
| intents | []LocalIntent | Predefined intent list (at least one required) | 3 built-in example intents |
| intentsFile | string | Path to an external intent configuration file; YAML and JSON formats are supported | |
| threshold | float64 | Minimum similarity threshold for a match; below it the default intent is used | 0.65 |
| minGap | float64 | Minimum gap between the top score and the runner-up; below it the default intent is used | 0.05 |
| defaultIntent | string | Default intent (used when nothing can be recognized) | Default |

### LocalIntent structure

| Field | Type | Description |
|-------|------|-------------|
| name | string | Intent name (used as the routing Relation Type) |
| description | string | Intent description (participates in semantic matching) |
| examples | []string | Typical example utterances for this intent; 8-10 entries recommended |

### Intent file format

Both YAML and JSON formats are supported:

**YAML format:**
```yaml
intents:
  - name: createRule
    description: "Create automation linkage rules triggered by conditions"
    examples:
      - "Turn on the light when someone is present"
      - "Turn on the AC when the temperature exceeds 30 degrees"
      - "Start the fan when water leakage is detected"
      - "Close the windows automatically on rainy days"
      - "Turn off all appliances when leaving home"
      - "Open the curtains at 7 AM every day"
      - "Turn on the purifier when air quality is poor"
      - "Close the gas valve immediately on gas leakage"
  - name: control
    description: "Control device on/off state or adjust parameters"
    examples:
      - "Turn on the light"
      - "Turn off the fan"
      - "Turn off the living room light"
      - "Set the AC to 26 degrees"
      - "Pull the curtains down"
      - "Lock the door"
      - "Turn up the TV volume"
      - "Turn off all lights"
      - "Start the robot vacuum"
  - name: query
    description: "Query current device status or readings"
    examples:
      - "What is the current temperature"
      - "Is the light on"
      - "How is the fan doing"
      - "What temperature is the AC set to"
      - "Are the curtains open"
      - "Is the door locked"
      - "What is the humidity now"
      - "Is the water heater still heating"
```

**JSON format:**
```json
{
  "intents": [
    {
      "name": "createRule",
      "description": "Create automation linkage rules triggered by conditions",
      "examples": ["Turn on the light when someone is present", "Turn on the AC when the temperature exceeds 30 degrees", "Start the fan when water leakage is detected", "Close the windows automatically on rainy days"]
    }
  ]
}
```

## Matching Principle

1. At initialization, vectors are generated for all intents' `description` and `examples` through the embedding model (API called internally in batches of 10)
2. At runtime, the user input is embedded into a vector with the same embedding model
3. Cosine similarity between the user input vector and all intent vectors is computed
4. If the top score is below `threshold`, or the gap between the top score and the runner-up is below `minGap`, `defaultIntent` is used
5. Otherwise, the intent with the highest score is the recognition result

## Execution Result

- The recognition result is written to `msg.Metadata["intent"]`; `msg.Data` is not modified (the original message passes through downstream)
- Routed via `TellNext(msg, intentName)` to the matching connection type
- When the threshold checks fail, `defaultIntent` is used

## Best Practices

### Description guidelines

The `description` participates directly in vector computation; its quality caps matching accuracy:

- **Describe the intent semantics precisely**, avoid vagueness: `"Control device on/off state or adjust parameters"` beats `"Control devices"`
- **Highlight differences from other intents**: `"Create automation linkage rules triggered by conditions"` beats `"Create linkage rules"`
- Do not include the intent name itself; the description should convey the semantics independently

### Examples guidelines

examples drive generalization and directly determine whether the model recognizes expressions it has never seen:

- **Cover different devices**: do not limit yourself to lights and fans—include curtains, door locks, AC units, robots, etc.
- **Cover different sentence patterns**: imperatives ("Turn on the light"), colloquial ("Is the light on"), questions ("Is the AC running"), negatives ("Stop the washing machine")
- **Cover different action words**: "turn on", "turn off", "set to", "start", "pull down", etc.
- **8-10 entries per intent**: too few gives insufficient generalization (testing shows a 0% generalization rate with only 2), too many adds noise
- Avoid semantic overlap between examples of different intents

### Threshold tuning

- `0.65` (default): suits large semantic gaps between intents; few false matches but some valid inputs may be rejected
- `0.50-0.60`: suits somewhat similar intents; improves recall but raises the risk of false matches
- Keep `minGap` at `0.05` in general, to block ambiguous inputs scoring close to the runner-up
- Tune against real business data: collect typical inputs, lower the threshold step by step until false matches appear, then back off by 0.05
- Different embedding models have different vector spaces; re-tune the threshold after switching models

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
        "description": "Create automation linkage rules triggered by conditions",
        "examples": [
          "Turn on the light when someone is present", "Turn on the AC when the temperature exceeds 30 degrees", "Start the fan when water leakage is detected",
          "Close the windows automatically on rainy days", "Turn off all appliances when leaving home", "Open the curtains at 7 AM every day",
          "Turn on the purifier when air quality is poor", "Close the gas valve immediately on gas leakage"
        ]
      },
      {
        "name": "control",
        "description": "Control device on/off state or adjust parameters",
        "examples": [
          "Turn on the light", "Turn off the fan", "Turn off the living room light",
          "Set the AC to 26 degrees", "Pull the curtains down", "Lock the door",
          "Turn up the TV volume", "Turn off all lights", "Start the robot vacuum"
        ]
      },
      {
        "name": "query",
        "description": "Query current device status or readings",
        "examples": [
          "What is the current temperature", "Is the light on", "How is the fan doing",
          "What temperature is the AC set to", "Are the curtains open", "Is the door locked",
          "What is the humidity now", "Is the water heater still heating"
        ]
      }
    ],
    "defaultIntent": "unknown"
  }
}
```

## Application Examples

**IoT device smart routing (cloud embedding API):**

```json
{
  "ruleChain": {"id": "iot-router", "name": "IoT Smart Router", "root": true},
  "metadata": {
    "firstNodeIndex": 0,
    "nodes": [
      {
        "id": "node_local_intent", "type": "ai/localIntent", "name": "Local Intent Recognition",
        "configuration": {
          "url": "https://ai.gitee.com/v1/embeddings",
          "key": "sk-xxx",
          "model": "Qwen3-Embedding-8B",
          "threshold": 0.65,
          "minGap": 0.05,
          "intents": [
            {
              "name": "createRule",
              "description": "Create automation linkage rules triggered by conditions",
              "examples": [
                "Turn on the light when someone is present", "Turn on the AC when the temperature exceeds 30 degrees", "Start the fan when water leakage is detected",
                "Close the windows automatically on rainy days", "Turn off all appliances when leaving home", "Open the curtains at 7 AM every day",
                "Turn on the purifier when air quality is poor", "Close the gas valve immediately on gas leakage"
              ]
            },
            {
              "name": "control",
              "description": "Control device on/off state or adjust parameters",
              "examples": [
                "Turn on the light", "Turn off the fan", "Turn off the living room light",
                "Set the AC to 26 degrees", "Pull the curtains down", "Lock the door",
                "Turn up the TV volume", "Turn off all lights", "Start the robot vacuum"
              ]
            },
            {
              "name": "query",
              "description": "Query current device status or readings",
              "examples": [
                "What is the current temperature", "Is the light on", "How is the fan doing",
                "What temperature is the AC set to", "Are the curtains open", "Is the door locked",
                "What is the humidity now", "Is the water heater still heating"
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
        "configuration": {"url": "https://ai.gitee.com/v1", "key": "sk-xxx", "model": "Qwen2-7B-Instruct", "systemPrompt": "You are an IoT assistant that helps users answer questions"}}
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

**On-premises deployment (runs offline, no internet required):**

```json
{
  "id": "node_local_intent",
  "type": "ai/localIntent",
  "name": "Offline Intent Recognition",
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
  "name": "Multilingual Intent Classification",
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
          "Turn on the light", "Turn on the light please", "Switch off the fan",
          "Close the curtain", "Set the AC to 26 degrees", "Lock the door"
        ]
      }
    ]
  }
}
```

## Private Embedding Model Deployment

Local intent recognition relies on an embedding model to compute semantic vectors. Besides cloud APIs, you can deploy an embedding service locally with HuggingFace [Text Embeddings Inference (TEI)](https://github.com/huggingface/text-embeddings-inference) for fully offline operation.

### Recommended models

| Model | Params | Dim | Notes | Use case |
|-------|--------|-----|-------|----------|
| BAAI/bge-small-zh-v1.5 | 33M | 512 | Lightweight and fast, strong performance on Chinese | Edge gateways, resource-constrained devices |
| BAAI/bge-base-zh-v1.5 | 102M | 768 | Balanced quality and speed | General server-side deployment |
| BAAI/bge-large-zh-v1.5 | 326M | 1024 | Highest accuracy | Accuracy-critical scenarios |
| Qwen/Qwen3-Embedding-0.6B | 600M | 1024 | Multilingual support | Chinese-English mixed or multilingual scenarios |

> Selection principle: start testing with a small model (bge-small-zh) and scale up only if accuracy falls short.

### Deploying TEI with Docker

**GPU deployment (recommended):**

```bash
model=BAAI/bge-small-zh-v1.5
volume=$PWD/data

docker run -d --gpus all -p 8080:80 \
  -v $volume:/data \
  --name tei-server \
  ghcr.io/huggingface/text-embeddings-inference:latest \
  --model-id $model
```

**CPU deployment:**

```bash
model=BAAI/bge-small-zh-v1.5
volume=$PWD/data

docker run -d -p 8080:80 \
  -v $volume:/data \
  --name tei-server \
  ghcr.io/huggingface/text-embeddings-inference:latest \
  --model-id $model
```

> The first startup downloads model weights from HuggingFace automatically. A volume mount is recommended to avoid repeated downloads.

### Mirror registry acceleration

If `ghcr.io` is unreachable, use a mirror registry:

```bash
# Pull the image
docker pull docker.aityp.com/ghcr.io/huggingface/text-embeddings-inference:latest

# Run using the local image
docker run -d -p 8080:80 \
  -v $PWD/data:/data \
  --name tei-server \
  docker.aityp.com/ghcr.io/huggingface/text-embeddings-inference:latest \
  --model-id BAAI/bge-small-zh-v1.5
```

### Offline deployment (no network)

Pre-download the model weights, then load them in the offline environment:

```bash
# 1. Download the model on a machine with internet access (git-lfs required)
git lfs install
git clone https://huggingface.co/BAAI/bge-small-zh-v1.5 models/bge-small-zh-v1.5

# 2. Copy the models directory to the offline machine

# 3. Start on the offline machine with the local model mounted
docker run -d -p 8080:80 \
  -v $PWD/models:/data \
  --name tei-server \
  ghcr.io/huggingface/text-embeddings-inference:latest \
  --model-id /data/bge-small-zh-v1.5
```

### Verifying the deployment

After startup, verify that the service works:

```bash
# Test the embeddings endpoint
curl http://localhost:8080/v1/embeddings \
  -H "Content-Type: application/json" \
  -d '{"input": "Turn on the light", "model": "BAAI/bge-small-zh-v1.5"}'

# A JSON response containing embedding vectors should be returned
```

### Integrating with LocalIntentNode

Once deployed, TEI serves an OpenAI-compatible `/v1/embeddings` endpoint; just set `url` to that address:

```json
{
  "url": "http://localhost:8080/v1/embeddings",
  "model": "BAAI/bge-small-zh-v1.5",
  "key": ""
}
```

> Locally deployed TEI requires no API key; leave `key` empty.
