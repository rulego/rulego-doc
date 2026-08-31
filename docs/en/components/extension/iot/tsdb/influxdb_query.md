---
title: InfluxDB Query
permalink: /pages/x-influxdb-query/
---
`x/influxdbQuery` component: <Badge text="v0.37.0+"/> executes InfluxDB Flux queries and returns the results. Suited to time-series readback, reconciliation, and query analytics.

> Requires the extension library: [rulego-components-iot](https://github.com/rulego/rulego-components-iot)

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| url | string | Service address, format `http://host:port`, e.g. `http://localhost:8086`. Supports `ref://` connection reuse within the chain | Required |
| bucket | string | Bucket name, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
| org | string | Organization name, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
| token | string | InfluxDB access token | Required |
| query | string | Flux query statement, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
