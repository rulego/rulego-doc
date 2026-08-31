---
title: InfluxDB Write
permalink: /pages/x-influxdb-write/
---
`x/influxdbWrite` component: <Badge text="v0.37.0+"/> writes to the InfluxDB 2.x time-series database, supporting JSON SeriesPoint and line protocol. Designed to pair with the unified [`x/tsdbWrite`](/en/pages/x-tsdb-write/) abstraction.

> Requires the extension library: [rulego-components-iot](https://github.com/rulego/rulego-components-iot)

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| url | string | Service address, format `http://host:port`, e.g. `http://localhost:8086`. Supports `ref://` connection reuse within the chain | Required |
| bucket | string | Bucket name, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
| org | string | Organization name, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
| token | string | InfluxDB access token | Required |
| measurement | string | Measurement name (optional). When set, collection-point arrays are pivoted directly into SeriesPoint, or flat maps / map arrays are converted row by row; when empty the input must already be SeriesPoint | empty |
| tags | array | Storage index dimensions, see table below | empty |
| fields | array | Storage field mapping, see table below; empty = expand all (collection points) or the whole map row as fields | empty |

### tags

Each entry is a key/value pair:

| key | value |
|-----|-------|
| Index dimension name | Index value, supports `${msg.xx}` templates |

### fields

Each entry is a field mapping:

| key | source |
|-----|--------|
| Storage field name | Collection-point name or map key; empty = expand all |

## Input Format (msg.Data)

Input is a SeriesPoint JSON array (or single object); line protocol text is also accepted. With `measurement` configured, `iot_points.Data` collection-point arrays are auto-pivoted into SeriesPoint, or flat maps / map arrays converted row by row. The SeriesPoint structure is the same as [`x/tsdbWrite`](/en/pages/x-tsdb-write/).
