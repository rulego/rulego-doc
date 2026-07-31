---
title: Nacos Config Get
article: false
author:
  name: rulego
  link: https://github.com/rulego/rulego
date: 2026-07-31 00:00:00
permalink: /pages/x-nacos-config-get/
---

`x/nacosConfigGet`: reads the config content of a Data ID from nacos into `msg.Data`. Routes to `Success` on success, `Failure` on error.

> Requires extension library: [rulego-components-discovery](https://github.com/rulego/rulego-components-discovery)

## Configuration

Inherits [Common Connection Config](/en/pages/discovery-overview/#common-connection-config). Extra fields:

| Field | Type | Description | Default |
|---|---|---|---|
| dataId | string | Config Data ID | none (required) |
| group | string | Config group | DEFAULT_GROUP |

## Output

Config content (raw string) is written to `msg.Data`, ready to be parsed by a downstream node (e.g. `jsTransform`).

## Example

```json
{
  "id": "get_cfg",
  "type": "x/nacosConfigGet",
  "configuration": {
    "server": "127.0.0.1:8848",
    "dataId": "app.json",
    "group": "DEFAULT_GROUP"
  }
}
```

## Related

- Service call: [x/nacosServiceCall](/en/pages/x-nacos-service-call/)
- Config write: [x/nacosConfigSet](/en/pages/x-nacos-config-set/)
- Config listen: [endpoint/nacos](/en/pages/endpoint-nacos/)
