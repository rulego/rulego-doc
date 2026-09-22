---
title: Agent

permalink: /pages/ai-agent/
---

The `ai/agent` component: <Badge text="v0.36.0+"/> an AI agent node based on the ReAct (Reasoning + Acting) pattern. It autonomously completes user tasks through multi-round reasoning and tool-calling loops, in both synchronous and streaming modes.

As a rule chain node, the agent can be freely composed with other RuleGo nodes to build complex AI workflows.

## Two Implementations <Badge text="v0.38.0+"/>

`ai/agent` has two implementations sharing the same type name, with an identical chain DSL:

| | Full (`agent` package) | Lite (`agent/lite` package) |
|---|---|---|
| Dependencies | eino (via sonic) | stdlib only, compiles on 32-bit platforms (386/armv7) |
| Tools | Self-assembles builtin/rule chain/sub-agent/MCP (incl. remote) | Host-injected `types.MCPToolProvider`, filtered by a string allowlist |
| Exclusive fields | messages preset, streamRetryMode, streamToolCallCheck, full params | skillsDir/skills (prompt-injection skills) |
| failover | Includes per-endpoint params override | url/key/model + circuitCooldownSec |

Both share identical I/O contracts (request messages, SSE frames, metadata), and the fields implemented in both align in name, behavior, and defaults. When both packages are imported into the same binary, **the first one to register wins** — the `all` bundle imports the full version first; importing only the lite package (or building for 32-bit) lets the lite version take over, and existing `ai/agent` chains keep running. Fields exclusive to the full version are silently ignored by the lite version; the **string form of `tools` works on both** (see [Tool System · String Shorthand](/en/pages/ai-agent-tools/#string-shorthand)), while object descriptors are supported by the full version only.

## Configuration

| Field | Type | Description | Default |
|------|------|------|--------|
| url | string | OpenAI API-compatible endpoint. Supports `${global.xxx}` variables | |
| key | string | API key. Supports `${global.xxx}` variables | |
| model | string | Model name, e.g. `deepseek-chat`, `qwen-plus`. Supports `${global.xxx}` variables | |
| systemPrompt | string | System prompt defining the agent's behavior and role. Supports `${}` placeholders and `${include("path")}` file inclusion | |
| messages | []ChatMessage | Preset context messages (full version only) | |
| images | []string | Input images: URL, base64, or local file path; requires a vision-capable model | |
| maxStep | int | Maximum ReAct loop steps (one reasoning + tool call = one step) | 50 |
| maxToolOutputLength | int | Maximum tool output length before truncation (by character, no multi-byte breakage) | 50000 |
| maxRetries | int | Maximum retries for LLM calls (automatically handles 429/5xx/network errors/timeouts) | 3 |
| streamRetryMode | string | Streaming mid-stream retry mode: `off` (default, retry within the probe window only, keeps real-time) / `full` (full buffered replay, trades real-time for mid-stream retry). Full version only | off |
| streamToolCallCheck | string | Streaming tool-call detection mode: empty=auto (default); `firstContent`=decide on first text; `drain`=read the whole stream before deciding. See [Streaming Tool Call Detection](#streaming-tool-call-detection-streamtoolcallcheck). Full version only | |
| failover | []FailoverEndpoint | Failover endpoints by priority; the primary endpoint is failed over after retries are exhausted. Empty = failover disabled | |
| circuitCooldownSec | int | Primary endpoint circuit-breaker cooldown in seconds, 0=default 60. The primary is tripped once its retries are exhausted; while cooling down, requests skip straight to backups. Sustained failures double the cooldown, capped at 10 minutes | 60 |
| params | ModelParams | LLM parameters | |
| tools | []Tool / []string | Tool list; object descriptors and string shorthand can be mixed. See [Tool System](/en/pages/ai-agent-tools/) | |
| skillsDir | string | Skills directory (`*/SKILL.md` layout); the skill catalog is injected into the systemPrompt. Lite version only | |
| skills | []string | Skill-name allowlist; empty = all enabled skills in the directory. Lite version only | |

### LLM Parameters (params)

| Field | Type | Description | Default |
|------|------|------|--------|
| temperature | float32 | Sampling temperature, controls randomness. Range [0.0, 2.0] | 0.7 |
| topP | float32 | Nucleus sampling threshold. Range [0.0, 1.0] | 0.9 |
| frequencyPenalty | float32 | Frequency penalty, suppresses repetition. Range [0.0, 1.0] | 0.5 |
| presencePenalty | float32 | Presence penalty, encourages topic diversity. Range [0.0, 1.0] | 0.5 |
| maxTokens | int | Maximum output tokens, 0 = model default. Mapped to OpenAI's `max_completion_tokens` on the wire | 0 |
| stop | []string | Stop sequences | |
| responseFormat | string | Output format: `text`, `json_object`, `json_schema` | text |
| jsonSchema | string | JSON Schema (used when responseFormat is `json_schema`) | |
| keepThink | bool | Keep the reasoning process (text format only) | false |
| extraFields | map | Extra fields for model-specific parameters such as `thinking_type`, `thinking_budget_tokens`, `reasoning_effort` | |

### ChatMessage Structure

| Field | Type | Description |
|------|------|------|
| role | string | Message role: `user`, `assistant`, `system` |
| content | string/array | Message content: a string or an OpenAI multimodal ContentPart array |

### Failover and Circuit Breaking

With `failover` endpoints configured, when the primary endpoint (same model) still fails after exhausting retries, requests switch to backup endpoints by priority. Combined with the circuit breaker, a long-failing primary is skipped automatically instead of every request waiting for its retries to exhaust.

**FailoverEndpoint structure**

| Field | Type | Description | Default |
|------|------|------|--------|
| url | string | Backup endpoint URL | |
| key | string | Backup API key | |
| model | string | Backup model name; empty = inherit the primary model | |
| params | ModelParams | Optional, overrides primary params; omitted = inherit primary Params | |

**Circuit breaking and probe backoff** (effective only when `failover` is enabled):

- The primary trips once its retries are exhausted; while cooling down, requests skip straight to backups
- When the cooldown expires it enters half-open: exactly one request probes the primary — success restores it, failure re-trips the breaker
- Sustained primary failures double the probe cooldown each time (60s → 120s → 240s …), capped at 10 minutes; a successful probe resets it to the base cooldown
- The cooldown is controlled by `circuitCooldownSec` (default 60s)

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

### Streaming Tool Call Detection (streamToolCallCheck)

In streaming output, the agent must decide whether the model is making tool calls, to either execute tools or stream text straight through. The difficulty: in the OpenAI-compatible streaming protocol, a "plain text answer" and "some text followed by tool calls" are indistinguishable until they happen — no mid-stream marker announces whether `tool_calls` will appear later.

| Mode | Behavior | Use case |
|------|------|------|
| Auto (default, empty) | No tools configured: first text decides plain text, real-time streaming. Tools configured: keep watching 500ms after the first text — tool calls within the window execute tools, continuous plain text is released to the stream | Most scenarios |
| `firstContent` | First non-empty text decides plain text, no observation | Models whose tool calls precede text (OpenAI-style), lowest first-token latency |
| `drain` | Read the entire stream before deciding | Models that emit long text before tool calls; never misjudges, but text is batched — first-token latency equals the full stream duration |

Model behavior differences:

- **OpenAI-style** (gpt series, deepseek, most compatible gateways): tool-call deltas (`delta.tool_calls`) precede or accompany no text — `firstContent` is safe
- **GLM / Claude native style** (some compatibility layers): may emit explanatory text before tool calls. Such preamble is usually short (e.g. "Let me check…"), covered by the auto-mode observation window; longer preamble followed by tool calls self-heals in auto mode (below)

Self-healing: if the preamble exceeds the observation window, tool calls get skipped. The streaming executor detects this misjudgment (log keyword `routed as plain text`), automatically upgrades the detection mode to `drain` and re-runs the current round; the agent instance then stays in `drain` (a restart restores the configured value). The upgrade overrides an explicit `firstContent` — the trigger occurs only when tools were actually skipped, so it never fires spuriously.

Troubleshooting: if streaming answers work but **tools never execute**, and the log shows `routed as plain text and not executed` (upgraded but the current stream exceeded the chunk limit, or an agent with no tools configured), the misjudgment wasn't covered by the re-run — set `streamToolCallCheck` to `drain`.

This applies only to agents with tools configured; pure-conversation agents always stream in real time and can ignore it.

## Execution Result

- **Synchronous mode**: the result is written to `msg.Data` and flows to the next node via the `Success` relation
- **Streaming mode**: intermediate results are emitted chunk by chunk via the `Stream` relation; a final `Success` message (metadata `full_content=true`) carries the complete merged content
- **Failure**: the error is written to `msg.Data` and flows via the `Failure` relation

## Relation Types

| Relation | Description |
|----------|------|
| Success | Synchronous execution succeeded |
| Stream | Streaming output |
| Failure | Execution failed |

## Configuration Examples

### Basic Conversational Agent

```json
{
  "id": "node_agent",
  "type": "ai/agent",
  "name": "Assistant",
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
    "tools": ["bash", "read", "write"]
  }
}
```

Writing tool names as strings in `tools` (the string shorthand) is the portable form shared by both implementations; use object descriptors when you need custom tool configuration (e.g. a workDir) or rule chain/sub-agent/MCP tools — the two forms can be mixed.

### Agent with a Workspace

The system prompt loads dynamically from workspace files, supporting per-agent customization:

```json
{
  "id": "node_agent",
  "type": "ai/agent",
  "name": "main-agent",
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

### Multi-Tool Collaborative Agent

Combining builtin tools, MCP tools, and sub-agents:

```json
{
  "id": "node_agent",
  "type": "ai/agent",
  "name": "full-stack-assistant",
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

## Related Documentation

- [Agent Node](/en/pages/ai-agent-node/) — ReAct loop, system prompt templates, dynamic model switching, advanced features
- [Overview](/en/pages/ai-agent-overview/) — framework positioning and core concepts
- [Tool System](/en/pages/ai-agent-tools/) — tool types, builtin tools, MCP integration
- [Aspect Framework](/en/pages/ai-agent-aspect/) — the AOP aspect system and custom extensions
- [Development Guide](/en/pages/ai-agent-guide/) — the complete workflow for building agent applications on the framework
