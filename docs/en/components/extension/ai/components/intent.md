---
title: Intent Recognition
permalink: /pages/ai-intent/
---
`ai/intent` component: <Badge text="v0.36.0+"/> uses an LLM to classify user input into predefined intents, then routes the recognition result as a Relation Type to matching downstream nodes, enabling AI-based intelligent routing.

For scenarios sensitive to latency and cost, use [local intent recognition](/en/pages/ai-local-intent/) instead.

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| url | string | OpenAI API compatible request URL | `https://ai.gitee.com/v1` |
| key | string | API key | |
| model | string | Model name | `Qwen2.5-72B-Instruct` |
| input | string | User input expression, supports `${msg.key}` and `${metadata.key}`. When empty, `msg.GetData()` is used | |
| intents | []Intent | Predefined intent list (at least one required) | |
| defaultIntent | string | Default intent (used when nothing can be recognized) | `default` |
| systemPrompt | string | Custom system prompt, supports `${include()}` file inclusion. When empty, the built-in default prompt is used | |
| temperature | float32 | Model temperature parameter | 0.1 |
| maxTokens | int | Maximum output length, 0 means the model default | 0 |

### Intent structure

| Field | Type | Description |
|-------|------|-------------|
| name | string | Intent name (used as the routing Relation Type) |
| description | string | Intent description (helps the LLM distinguish intents) |

## Execution Result

- The recognition result is written to `msg.Metadata["intent"]`; `msg.Data` is not modified (the original message passes through downstream)
- Routed via `TellNext(msg, intentName)` to the matching connection type
- When the result is not in the predefined list, `defaultIntent` is used

## Configuration Example

```json
{
  "id": "node_intent",
  "type": "ai/intent",
  "name": "Intent Classification",
  "configuration": {
    "url": "https://ai.gitee.com/v1",
    "key": "sk-xxx",
    "model": "Qwen2.5-72B-Instruct",
    "temperature": 0.1,
    "intents": [
      {"name": "query", "description": "User queries information or asks a question"},
      {"name": "action", "description": "User requests some action to be executed"},
      {"name": "complaint", "description": "User complains or expresses dissatisfaction"},
      {"name": "greeting", "description": "User greets or says hello"}
    ],
    "defaultIntent": "unknown"
  }
}
```

## Application Example

**Smart customer-service routing**:

```json
{
  "ruleChain": {"id": "smart-router", "name": "Smart Router", "root": true},
  "metadata": {
    "firstNodeIndex": 0,
    "nodes": [
      {
        "id": "node_intent", "type": "ai/intent", "name": "Intent Recognition",
        "configuration": {
          "url": "https://ai.gitee.com/v1", "key": "sk-xxx",
          "model": "Qwen2.5-72B-Instruct", "temperature": 0.1,
          "intents": [
            {"name": "query", "description": "Query information"},
            {"name": "action", "description": "Execute an action"},
            {"name": "complaint", "description": "Complaint feedback"}
          ],
          "defaultIntent": "unknown"
        }
      },
      {"id": "node_query", "type": "ai/llm", "name": "Answer Queries",
        "configuration": {"url": "...", "key": "...", "model": "...", "systemPrompt": "Answer user questions"}},
      {"id": "node_action", "type": "restApiCall", "name": "Execute Action",
        "configuration": {"url": "http://api/action", "requestMethod": "POST"}},
      {"id": "node_complaint", "type": "restApiCall", "name": "Transfer to Human Agent",
        "configuration": {"url": "http://api/ticket", "requestMethod": "POST"}}
    ],
    "connections": [
      {"fromId": "node_intent", "toId": "node_query", "type": "query"},
      {"fromId": "node_intent", "toId": "node_action", "type": "action"},
      {"fromId": "node_intent", "toId": "node_complaint", "type": "complaint"}
    ]
  }
}
```
