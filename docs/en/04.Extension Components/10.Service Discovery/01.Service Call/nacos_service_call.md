---
title: Nacos Service Call
article: false
author:
  name: rulego
  link: https://github.com/rulego/rulego
date: 2026-07-31 00:00:00
permalink: /pages/x-nacos-service-call/
---

`x/nacosServiceCall`: discovers a healthy instance via nacos, calls the cluster microservice over HTTP, and writes the response to `msg.Data`. Routes to `Success` on success, `Failure` on error (including HTTP ≥ 400).

> Requires extension library: [rulego-components-discovery](https://github.com/rulego/rulego-components-discovery)

## Configuration

Inherits [Common Connection Config](/en/pages/discovery-overview/#common-connection-config). Extra fields:

| Field | Type | Description | Default |
|---|---|---|---|
| serviceName | string | nacos-registered service name | none (required) |
| groupName | string | Service group | DEFAULT_GROUP |
| method | string | HTTP method (GET/POST/PUT/DELETE/PATCH) | GET |
| path | string | Request path, supports `${msg.xx}` | empty |
| body | string | Request body, supports `${msg.xx}`; empty uses `msg.Data` | empty |

## Behavior

- **Instance selection**: picks a healthy instance from nacos with **round-robin** load balancing.
- **Request body**: if `body` is configured (with `${}` template or a literal) it is rendered; otherwise the current message content (`msg.Data`) is passed through as the body.
- **Response**: backend response body is written to `msg.Data`; HTTP status ≥ 400 triggers `Failure`.

## Examples

GET call to `user-service` registered in nacos:

```json
{
  "id": "call_user",
  "type": "x/nacosServiceCall",
  "configuration": {
    "server": "127.0.0.1:8848",
    "serviceName": "user-service",
    "groupName": "DEFAULT_GROUP",
    "method": "GET",
    "path": "/info"
  }
}
```

POST with a templated body:

```json
{
  "id": "create_order",
  "type": "x/nacosServiceCall",
  "configuration": {
    "server": "127.0.0.1:8848",
    "serviceName": "order-service",
    "method": "POST",
    "path": "/orders",
    "body": "${msg.payload}"
  }
}
```

## Related

- Config read: [x/nacosConfigGet](/en/pages/x-nacos-config-get/)
- Config listen: [endpoint/nacos](/en/pages/endpoint-nacos/)
