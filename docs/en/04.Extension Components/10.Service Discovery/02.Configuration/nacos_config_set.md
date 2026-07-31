---
title: Nacos Config Set
article: false
author:
  name: rulego
  link: https://github.com/rulego/rulego
date: 2026-07-31 00:00:00
permalink: /pages/x-nacos-config-set/
---

`x/nacosConfigSet`: writes (publishes) config to nacos — creates if absent, overwrites if present. Routes to `Success` on success, `Failure` on error.

> Requires extension library: [rulego-components-discovery](https://github.com/rulego/rulego-components-discovery)

## Configuration

Inherits [Common Connection Config](/en/pages/discovery-overview/#common-connection-config). Extra fields:

| Field | Type | Description | Default |
|---|---|---|---|
| dataId | string | Config Data ID | none (required) |
| group | string | Config group | DEFAULT_GROUP |
| content | string | Config content, supports `${msg.xx}` | empty |
| format | string | Config format: json/yaml/properties/text | json |

## Behavior

- **Full overwrite**: nacos stores config as text; writing replaces the whole content (nacos is not structure-aware; no field-level API).
- **Template**: `content` supports `${msg.xx}` dynamic rendering.
- **Patch one field**: use a read-modify-write chain, see below.

## Output

On success the `msg` flows to `Success` unchanged (the node does not read back).

## Examples

Write a fixed config:

```json
{
  "id": "set_cfg",
  "type": "x/nacosConfigSet",
  "configuration": {
    "server": "127.0.0.1:8848",
    "dataId": "app.json",
    "group": "DEFAULT_GROUP",
    "content": "{\"featureX\":true}",
    "format": "json"
  }
}
```

### Read-modify-write (patch one field)

`x/nacosConfigGet` reads → `jsTransform` parses & patches → `x/nacosConfigSet` writes back:

```json
{
  "ruleChain": {"name": "config-patch", "root": true},
  "metadata": {
    "nodes": [
      {"id": "g", "type": "x/nacosConfigGet", "configuration": {
        "server": "127.0.0.1:8848", "dataId": "app.json"}},
      {"id": "p", "type": "jsTransform", "configuration": {
        "jsScript": "var c=JSON.parse(msg); c.featureX=true; return {msg:JSON.stringify(c),metadata:metadata,msgType:msgType};"}},
      {"id": "s", "type": "x/nacosConfigSet", "configuration": {
        "server": "ref://g", "dataId": "app.json", "format": "json", "content": "${msg}"}}
    ],
    "connections": [
      {"fromId": "g", "toId": "p", "type": "Success"},
      {"fromId": "p", "toId": "s", "type": "Success"}
    ]
  }
}
```

> Read-modify-write is not atomic; concurrent writes to the same dataId may suffer last-write-wins. Config changes are usually low-frequency, so the risk is small.

## Related

- Config read: [x/nacosConfigGet](/en/pages/x-nacos-config-get/)
- Config listen: [endpoint/nacos](/en/pages/endpoint-nacos/)
