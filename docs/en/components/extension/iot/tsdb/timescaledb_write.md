---
title: TimescaleDB Write
permalink: /pages/x-timescaledb-write/
---
`x/timescaledbWrite` component: <Badge text="v0.37.0+"/> writes to TimescaleDB (PostgreSQL). The target table must already exist as a hypertable and contain a `time` column.

> Requires the extension library: [rulego-components-iot](https://github.com/rulego/rulego-components-iot)

## Data Storage Model

TimescaleDB is a schema-first database and the component does not create tables: the target table name equals the SeriesPoint `measurement` (under the schema specified by the `db` configuration), must be pre-created by the user as a hypertable, and its column layout must cover the written data:

- a `time` column (TIMESTAMPTZ, hypertable time dimension), nanosecond timestamps converted automatically;
- one column per tag key (e.g. `device_id TEXT`);
- one column per field key (e.g. `temp DOUBLE PRECISION`).

```sql
CREATE TABLE public.device_data (time TIMESTAMPTZ NOT NULL, device_id TEXT, temp DOUBLE PRECISION);
SELECT create_hypertable('public.device_data', 'time', if_not_exists => TRUE);
```

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| dsn | string | PostgreSQL connection string, e.g. `host=localhost port=5432 user=postgres dbname=ts sslmode=disable`. Supports `ref://` connection reuse within the chain | Required |
| db | string | PostgreSQL schema name, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
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

Input is a SeriesPoint JSON array (or single object). With `measurement` configured, `iot_points.Data` collection-point arrays are auto-pivoted into SeriesPoint, or flat maps / map arrays converted row by row. The SeriesPoint structure is the same as [`x/tsdbWrite`](/en/pages/x-tsdb-write/).
