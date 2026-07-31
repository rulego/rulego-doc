---
title: Nacos Config Listen Endpoint
article: false
author:
  name: rulego
  link: https://github.com/rulego/rulego
date: 2026-07-31 00:00:00
permalink: /pages/endpoint-nacos/
---

`endpoint/nacos`: subscribes to nacos config; a config change auto-triggers the rule chain. Router `from.path` is the nacos Data ID (comma-separated for multiple).

> Requires extension library: [rulego-components-discovery](https://github.com/rulego/rulego-components-discovery)

## Configuration

Inherits [Common Connection Config](/en/pages/discovery-overview/#common-connection-config). Extra fields:

| Field | Type | Description | Default |
|---|---|---|---|
| group | string | Config group (endpoint-level, shared by all routers) | DEFAULT_GROUP |

Router:

| Field | Description |
|---|---|
| from.path | Data ID(s) to listen; comma-separated for multiple |
| to.path | Rule chain ID to trigger on change (usually the current chain) |

> nacos config listen subscribes per `(dataId, group)`; **wildcards or "listen all" are not supported**. To listen to multiple Data IDs, list them comma-separated in `from.path`.

## Triggered Message

On config change the rule chain receives:

- `msg.Data` = new config content
- `metadata.dataId` = the Data ID that changed

## Example

Listen to `app.json`, trigger the current chain on change (processed by jsTransform):

```json
{
  "ruleChain": {"id": "cfg-listen", "root": true},
  "metadata": {
    "firstNodeIndex": 0,
    "endpoints": [
      {
        "id": "ep_cfg",
        "type": "endpoint/nacos",
        "configuration": {
          "server": "127.0.0.1:8848",
          "group": "DEFAULT_GROUP"
        },
        "routers": [
          {"from": {"path": "app.json"}, "to": {"path": "cfg-listen"}}
        ]
      }
    ],
    "nodes": [
      {"id": "n1", "type": "jsTransform", "configuration": {
        "jsScript": "return {msg:'config['+metadata.dataId+']='+msg,metadata:metadata,msgType:msgType};"
      }}
    ]
  }
}
```

## Related

- Service call: [x/nacosServiceCall](/en/pages/x-nacos-service-call/)
- Config read: [x/nacosConfigGet](/en/pages/x-nacos-config-get/)
- Config write: [x/nacosConfigSet](/en/pages/x-nacos-config-set/)
