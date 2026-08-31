---
title: Prometheus Remote Write
permalink: /pages/x-promremote-write/
---
`x/promremoteWrite` component: <Badge text="v0.37.0+"/> writes via the Prometheus Remote Write protocol to backends such as Prometheus, VictoriaMetrics, and Mimir. Only numeric fields are written; metric names are composed from measurement/field combinations.

> Requires the extension library: [rulego-components-iot](https://github.com/rulego/rulego-components-iot)

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| url | string | Remote Write HTTP address, e.g. `http://localhost:8428/api/v1/write`. Supports `ref://` connection reuse within the chain | Required |
| measurement | string | Measurement name (optional). When set, collection-point arrays are pivoted directly into SeriesPoint, or flat maps / map arrays are converted row by row; when empty the input must already be SeriesPoint | empty |
| tags | array | Storage index dimensions (used as metric labels), see table below | empty |
| fields | array | Storage field mapping, see table below; empty = expand all (collection points) or the whole map row as fields | empty |

### tags

Each entry is a key/value pair:

| key | value |
|-----|-------|
| Label name | Label value, supports `${msg.xx}` templates |

### fields

Each entry is a field mapping:

| key | source |
|-----|--------|
| Metric field name | Collection-point name or map key; empty = expand all |

## Input Format (msg.Data)

Input is a SeriesPoint JSON array (or single object). With `measurement` configured, `iot_points.Data` collection-point arrays are auto-pivoted into SeriesPoint, or flat maps / map arrays converted row by row. The SeriesPoint structure is the same as [`x/tsdbWrite`](/en/pages/x-tsdb-write/).

> Only numeric fields are written; non-numeric fields are ignored. Metric names are composed as `{measurement}_{field}`, with tags used as labels.
