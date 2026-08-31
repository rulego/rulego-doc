---
title: MCP Client
permalink: /pages/ai-mcp-client/
---
`x/mcpClient` component: <Badge text="v0.36.0+"/> an MCP (Model Context Protocol) client node that connects to a remote MCP server, invokes specified tools, and writes results into the message payload for downstream nodes. It can also register as an `MCPToolProvider` with the RuleConfig UDF, so that the `self` mode of an `ai/agent` can invoke remote tools.

## Dual Roles

The MCP client can be used in two ways inside a rule chain:

1. **Direct invocation mode**: as a rule chain node, it calls the specified remote MCP tool on `OnMsg`
2. **Tool provider mode**: at startup it automatically discovers all tools of the remote MCP server and registers them as an `MCPToolProvider`, available to the agent's MCP tools (`server: "self"`)

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| server | string | MCP server address. Supports HTTP URLs (`http://`/`https://`) and stdio commands | Required |
| toolName | string | Name of the remote tool to invoke. Supports `${metadata.xxx}` `${msg.xxx}` expressions. When empty, read from `metadata.mcpToolName` | |
| args | string | JSON template of tool arguments. Supports `${msg.xxx}` `${metadata.xxx}` expressions. When empty, the message payload JSON is used | |
| toolFilter | []string | Tool filter (affects only MCPToolProvider registration); empty or `["*"]` registers all tools | |

## Execution Result

- The tool invocation result is written to `msg.Data` and passed to downstream nodes via the `Success` connection type
- On invocation failure, the error is passed via the `Failure` connection type

## Configuration Example

### Invoke a remote tool directly

```json
{
  "id": "s1",
  "type": "x/mcpClient",
  "name": "Get Weather",
  "configuration": {
    "server": "http://localhost:8080/mcp",
    "toolName": "get_weather",
    "args": "{\"city\": \"${msg.city}\", \"unit\": \"celsius\"}"
  }
}
```

### Dynamic tool name (from message metadata)

```json
{
  "id": "s1",
  "type": "x/mcpClient",
  "name": "MCP Tool Call",
  "configuration": {
    "server": "http://localhost:8080/mcp",
    "toolName": "${metadata.mcpToolName}",
    "args": ""
  }
}
```

When `toolName` is empty, the component reads the tool name from `msg.Metadata["mcpToolName"]`. When `args` is empty, the JSON of `msg.Data` is used as tool arguments.

### Stdio mode (local process)

```json
{
  "id": "s1",
  "type": "x/mcpClient",
  "name": "Local MCP Tool",
  "configuration": {
    "server": "mcp-server --port 8080",
    "toolName": "search",
    "args": "{\"query\": \"${msg.query}\"}"
  }
}
```

When `server` is not an HTTP URL, the component parses it as a command line and communicates with the MCP service over stdio transport.

### Acting as a tool provider for agents

At startup (`Start()`), the MCP client connects to the remote server automatically, discovers its tools, and registers them as an `MCPToolProvider`. Once deployed in a rule chain, agents can use these remote tools via the `self` mode:

```json
{
  "tools": [
    {
      "type": "mcp",
      "config": {
        "server": "self",
        "tools": ["get_weather", "search"]
      }
    }
  ]
}
```

`toolFilter` controls which tools are registered with the MCPToolProvider:

```json
{
  "toolFilter": ["get_weather", "search"]
}
```

## Application Example

```json
{
  "ruleChain": {
    "id": "mcp-demo",
    "name": "MCP Call Demo",
    "root": true
  },
  "metadata": {
    "firstNodeIndex": 0,
    "nodes": [
      {
        "id": "node_mcp",
        "type": "x/mcpClient",
        "name": "Call Remote Tool",
        "configuration": {
          "server": "http://localhost:8080/mcp",
          "toolName": "get_weather",
          "args": "{\"city\": \"${msg.city}\"}"
        }
      },
      {
        "id": "node_log",
        "type": "log",
        "name": "Log Result",
        "configuration": {
          "jsScript": "return 'Weather result: ' + msg.data;"
        }
      }
    ],
    "connections": [
      {"fromId": "node_mcp", "toId": "node_log", "type": "Success"}
    ]
  }
}
```
