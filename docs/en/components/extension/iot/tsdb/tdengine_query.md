---
title: TDengine Query
permalink: /pages/x-tdengine-query/
---
`x/tdengineQuery` component: <Badge text="v0.37.0+"/> executes TDengine SQL queries and returns the results. Suited to time-series readback, reconciliation, and query analytics.

> Requires the extension library: [rulego-components-iot](https://github.com/rulego/rulego-components-iot)

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| dsn | string | DSN, format `root:taosdata@http(localhost:6041)/`. Supports `ref://` connection reuse within the chain | Required |
| db | string | Database name, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
| query | string | SQL query statement, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
