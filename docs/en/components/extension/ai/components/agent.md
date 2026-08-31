---
title: AI Agent
permalink: /pages/ai-agent/
---
`ai/agent` component: <Badge text="v0.36.0+"/> an AI agent node based on the ReAct (Reasoning + Acting) pattern. It completes user tasks autonomously through a loop of multi-turn reasoning and tool calls. Both synchronous and streaming execution modes are supported.

As a rule chain node, the agent can be freely combined with other RuleGo nodes to build complex AI workflows.

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| url | string | OpenAI API compatible request URL. Supports `${global.xxx}` variables | |
| key | string | API key. Supports `${global.xxx}` variables | |
| model | string | Model name, e.g. `deepseek-chat`, `qwen-plus`. Supports `${global.xxx}` variables | |
| systemPrompt | string | System prompt defining the agent's behavior and role. Supports `${}` placeholders and `${include("path")}` file inclusion | |
| messages | []ChatMessage | Predefined context message list | |
| images | []string | Input image list; requires a vision-capable model | |
| maxStep | int | Maximum number of ReAct loop steps (one reasoning + tool call counts as one step) | 150 |
| maxToolOutputLength | int | Maximum truncation length of tool output (bytes) | 50000 |
| maxRetries | int | Maximum retries when an LLM call fails (429/5xx/network errors/timeouts handled automatically) | 3 |
| streamRetryMode | string | Streaming mid-stream retry mode: `off` (default, retries only within the probe window, keeps real-time output) / `full` (fully buffers and replays, trading real-time output for mid-stream retryability) | off |
| streamToolCallCheck | string | Streaming tool-call detection mode: empty = auto (default); `firstContent` = decide on first text; `drain` = read the whole stream before deciding. See [Streaming tool-call detection](#streaming-tool-call-detection-streamtoolcallcheck) | |
| failover | []FailoverEndpoint | Failover backup endpoint list, ordered by priority; switched in order after primary-endpoint retries are exhausted. Empty = failover disabled | |
| circuitCooldownSec | int | Circuit breaker cooldown seconds for the primary endpoint, 0 = default 60. The breaker trips as soon as primary retries are exhausted; during cooldown the primary is skipped and backups used directly; under persistent failure the probe cooldown doubles each time, capped at 10 minutes | 60 |
| params | ModelParams | Model parameters | |
| tools | []Tool | Tool list configuration. See [Tool system](/en/pages/ai-agent-tools/) | |

### Model parameters (Params)

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| temperature | float32 | Sampling temperature, controls output randomness. Range [0.0, 2.0] | 0.7 |
| topP | float32 | Nucleus sampling probability threshold. Range [0.0, 1.0] | 0.9 |
| frequencyPenalty | float32 | Frequency penalty, suppresses repeated content. Range [0.0, 1.0] | 0.5 |
| presencePenalty | float32 | Presence penalty, encourages topic diversity. Range [0.0, 1.0] | 0.5 |
| maxTokens | int | Maximum output tokens, 0 means the model default | 0 |
| stop | []string | List of stop sequences | |
| responseFormat | string | Output format: `text`, `json_object`, `json_schema` | text |
| jsonSchema | string | JSON Schema (used when responseFormat is `json_schema`) | |
| keepThink | bool | Whether to keep the reasoning process (only effective for text format) | false |
| extraFields | map | Extra fields for passing model-specific parameters, such as `thinking_type`, `thinking_budget_tokens`, `reasoning_effort` | |

### ChatMessage structure

| Field | Type | Description |
|-------|------|-------------|
| role | string | Message role: `user`, `assistant`, `system` |
| content | string/array | Message content. A string or an OpenAI multimodal ContentPart array |

### Failover and circuit breaking

With `failover` backup endpoints configured, when the primary endpoint (same model) still fails after retries are exhausted, the node switches to backup endpoints in priority order to improve availability. Combined with the circuit breaker, a primary endpoint that stays down is skipped automatically, so requests do not wait for primary retries to be exhausted every time.

**FailoverEndpoint structure**

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| url | string | Backup request URL | |
| key | string | Backup API key | |
| model | string | Backup model name; if empty, the primary endpoint's model is reused | |
| params | ModelParams | Optional; overrides the primary endpoint's parameters; inherits the primary Params when unset | |

**Circuit breaking and probe backoff** (only effective when `failover` is enabled):

- The breaker trips once primary-endpoint retries are exhausted; during cooldown the primary is skipped and backup endpoints used directly
- When the cooldown expires, the circuit enters half-open state and lets exactly one request probe the primary: success restores the primary, failure trips the breaker again
- While the primary keeps failing, the probe cooldown doubles each time (60s → 120s → 240s …), capped at 10 minutes, reducing wasted probes against the failed primary; after a successful probe it resets to the base cooldown
- The cooldown duration is controlled by `circuitCooldownSec` (default 60s)

**Failover configuration example**

```json
{
  "url": "https://api.primary.com/v1",
  "key": "sk-primary",
  "model": "glm-5",
  "maxRetries": 2,
  "circuitCooldownSec": 60,
  "failover": [
    {"url": "https://api.backup1.com/v1", "key": "sk-backup1", "model": "glm-5"},
    {"url": "https://api.backup2.com/v1", "key": "sk-backup2"}
  ]
}
```

### Streaming tool-call detection (streamToolCallCheck)

In streaming output, the agent must determine whether the model initiated a tool call, to decide between executing tools and emitting text directly. The difficulty: in the OpenAI-compatible streaming protocol, a plain-text answer and "a text segment followed by a tool call" cannot be told apart before they happen—no mid-stream marker announces whether `tool_calls` will appear later.

| Mode | Behavior | Use case |
|------|----------|----------|
| Auto (default, empty) | No tools configured: the first text decides plain text, streamed in real time. Tools configured: keeps observing for 500ms after the first text chunk—if a tool call appears within the window, execute the tool; if it remains plain text, let the stream pass through | Vast majority of scenarios |
| `firstContent` | The first non-empty text decides plain text immediately, no observation window | Models whose tool calls precede text (OpenAI-family convention), for the lowest first-token latency |
| `drain` | Reads the entire stream before deciding | Models that emit long text before initiating tool calls; never misjudges, but text comes out in batches and first-token latency equals the full stream generation time |

Behavior differences across models:

- **OpenAI-family convention** (GPT series, deepseek, most compatible gateways): tool-call deltas (`delta.tool_calls`) appear before text or without accompanying text, so `firstContent` is safe
- **GLM / Claude native style** (some compatibility layers): may emit a short lead-in explanation before initiating a tool call. Such lead-in text is usually very short (e.g. "Let me check...") and covered by auto mode's observation window; `drain` is only needed when lead-in text exceeds the window and is still followed by a tool call

Troubleshooting: if streamed answers look normal but **tools never execute**, and logs show `model emitted tool calls after content`, the model's lead-in text exceeded the observation window—set `streamToolCallCheck` to `drain`.

This option only applies to agents with tools configured; pure conversational agents always stream in real time and need not care about it.

## Execution Result

- **Sync mode**: the execution result is written to `msg.Data` and routed to the next node via the `Success` relation
- **Streaming mode**: intermediate results are emitted chunk by chunk, each chunk routed via the `Stream` relation; at the end an extra `Success` message is sent (`full_content=true` in Metadata) containing the complete merged content
- **Failure**: the error is written to `msg.Data` and routed via the `Failure` relation

## Relation Type

| Relation Type | Description |
|---------------|-------------|
| Success | Sync-mode execution succeeded |
| Stream | Streaming-mode output |
| Failure | Execution failed |

## Configuration Example

### Basic conversational agent

```json
{
  "id": "node_agent",
  "type": "ai/agent",
  "name": "AI Assistant",
  "configuration": {
    "url": "https://ai.gitee.com/v1",
    "key": "sk-xxx",
    "model": "deepseek-chat",
    "maxStep": 100,
    "systemPrompt": "You are a helpful AI assistant.",
    "params": {
      "temperature": 0.7,
      "topP": 0.9
    },
    "tools": [
      {"type": "builtin", "name": "bash"},
      {"type": "builtin", "name": "read"},
      {"type": "builtin", "name": "write"}
    ]
  }
}
```

### Agent with a workspace

The system prompt is loaded dynamically from workspace files, allowing personalized configuration:

```json
{
  "id": "node_agent",
  "type": "ai/agent",
  "name": "Main Agent",
  "configuration": {
    "url": "${global.models.providers.default.base_url}",
    "key": "${global.models.providers.default.api_key}",
    "model": "${global.models.providers.default.model}",
    "maxStep": 100,
    "systemPrompt": "${include(global.root_dir+'/workspace/IDENTITY.md')}\n${include(global.root_dir+'/workspace/AGENTS.md')}\n${include(global.root_dir+'/workspace/SOUL.md')}\nCurrent time: ${now()}\nAgent ID: ${ruleChain.id}",
    "params": {
      "temperature": 0.7,
      "maxTokens": 16384
    },
    "tools": [
      {"type": "builtin", "name": "bash", "config": {"workDir": "${global.root_dir}/workspace"}},
      {"type": "builtin", "name": "read", "config": {"workDir": "${global.root_dir}/workspace"}},
      {"type": "builtin", "name": "write", "config": {"workDir": "${global.root_dir}/workspace"}},
      {"type": "builtin", "name": "edit", "config": {"workDir": "${global.root_dir}/workspace"}},
      {
        "type": "builtin", "name": "skill",
        "config": {
          "globalDirs": ["${global.root_dir}/skills"],
          "localDirs": ["${global.root_dir}/workspace/skills"]
        }
      }
    ]
  }
}
```

### Multi-tool collaborative agent

Combines built-in tools, MCP tools, and sub-agents:

```json
{
  "id": "node_agent",
  "type": "ai/agent",
  "name": "Full-stack Assistant",
  "configuration": {
    "url": "${global.models.providers.default.base_url}",
    "key": "${global.models.providers.default.api_key}",
    "model": "${global.models.providers.default.model}",
    "maxStep": 150,
    "systemPrompt": "You are a full-stack development assistant that can write code, run tests, and manage files.",
    "tools": [
      {"type": "builtin", "name": "bash", "config": {"workDir": "${global.root_dir}/project", "timeout": 60000}},
      {"type": "builtin", "name": "read", "config": {"workDir": "${global.root_dir}/project"}},
      {"type": "builtin", "name": "write", "config": {"workDir": "${global.root_dir}/project"}},
      {"type": "builtin", "name": "edit", "config": {"workDir": "${global.root_dir}/project"}},
      {"type": "mcp", "config": {"server": "self", "tools": ["list_rule_chains", "get_rule_chain"]}},
      {"type": "agent", "targetId": "code-reviewer"}
    ]
  }
}
```

## Related Documents

- [Agent node](/en/pages/ai-agent-node/) — ReAct loop, system prompt templates, dynamic model switching, advanced features
- [Overview](/en/pages/ai-agent-overview/) — framework positioning and core concepts
- [Tool system](/en/pages/ai-agent-tools/) — tool types, built-in tools, MCP integration
- [Aspect framework](/en/pages/ai-agent-aspect/) — AOP aspect system and custom extensions
- [Development guide](/en/pages/ai-agent-guide/) — end-to-end workflow for building agent applications on the framework
