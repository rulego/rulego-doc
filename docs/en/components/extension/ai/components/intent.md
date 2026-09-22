---
title: Intent Recognition

permalink: /pages/ai-intent/
---

The `ai/intent` component: <Badge text="v0.36.0+"/> classifies user input into intents using an LLM, and routes the result to matching downstream nodes as a Relation Type — AI-based smart routing.

For latency- and cost-sensitive scenarios, use [Local Intent Recognition](/en/pages/ai-local-intent/) instead.

## Configuration

| Field | Type | Description | Default |
|------|------|------|--------|
| url | string | OpenAI API-compatible endpoint | `https://ai.gitee.com/v1` |
| key | string | API key | |
| model | string | Model name | `Qwen2.5-72B-Instruct` |
| input | string | User input expression, supports `${msg.key}` and `${metadata.key}`. Empty = `msg.GetData()` | |
| intents | []Intent | Predefined intent list (at least one required) | |
| defaultIntent | string | Default intent (used when recognition fails) | `default` |
| systemPrompt | string | Custom system prompt, supports `${include()}` file references. Empty = built-in default prompt | |
| temperature | float32 | Model temperature | 0.1 |
| maxTokens | int | Maximum output length, 0 = model default | 0 |

### Intent Structure

| Field | Type | Description |
|------|------|------|
| name | string | Intent name (used as the Relation Type for routing) |
| description | string | Intent description (helps the LLM distinguish intents) |

## Execution Result

- The recognized intent is written to `msg.Metadata["intent"]`; `msg.Data` is left untouched (the original message passes through)
- Routed via `TellNext(msg, intentName)` to the matching connection type
- If the result is not in the predefined list, `defaultIntent` is used

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
      {"name": "query", "description": "The user asks for information or a question"},
      {"name": "action", "description": "The user requests an operation"},
      {"name": "complaint", "description": "The user complains or expresses dissatisfaction"},
      {"name": "greeting", "description": "The user greets"}
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
            {"name": "query", "description": "Ask for information"},
            {"name": "action", "description": "Perform an operation"},
            {"name": "complaint", "description": "File a complaint"}
          ],
          "defaultIntent": "unknown"
        }
      },
      {"id": "node_query", "type": "ai/llm", "name": "Answer Query",
        "configuration": {"url": "...", "key": "...", "model": "...", "systemPrompt": "Answer the user's question"}},
      {"id": "node_action", "type": "restApiCall", "name": "Execute Action",
        "configuration": {"url": "http://api/action", "requestMethod": "POST"}},
      {"id": "node_complaint", "type": "restApiCall", "name": "Escalate to Human",
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
