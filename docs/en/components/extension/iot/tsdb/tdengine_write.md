---
title: TDengine Write
permalink: /pages/x-tdengine-write/
---
`x/tdengineWrite` component: <Badge text="v0.37.0+"/> writes to the TDengine time-series database (REST/SQL INSERT). Input must be a JSON SeriesPoint list.

> Requires the extension library: [rulego-components-iot](https://github.com/rulego/rulego-components-iot)

## Data Storage Model

TDengine is a schema-first database; the component does not create tables and users must pre-create the target table structures. Two behaviors depending on whether SeriesPoints carry tags:

- **With tags** (recommended, common IoT scenario): written under the super-table (STable) model. `measurement` is the **super-table name**, tags become sub-table tag values; sub-tables are **auto-created** via `INSERT ... USING ... TAGS(...)` when absent, no pre-creation needed. Sub-table name = sanitized prefix (`measurement` + tag values concatenated in tag-key lexicographic order, illegal characters replaced with `_`) + an 8-character hex hash suffix (computed from the raw values, so sanitized duplicates such as `dev-01`/`dev_01` hash differently and never mix up rows between tables), total length capped at 192 bytes.
- **Without tags**: written to a **normal table** named after `measurement`, which must be pre-created.

Column layout convention: the first data column is fixed as `ts` (TIMESTAMP), the remaining columns are the field keys; super-table TAGS columns are the tag keys. Super-table example (TAGS columns correspond to the `tags` configuration, data columns correspond to collection points / the `fields` configuration):

```sql
CREATE STABLE db0.device_data (ts TIMESTAMP, temp DOUBLE, humidity DOUBLE)
TAGS (device_id NCHAR(64), site NCHAR(32));
```

Write behavior notes:

- Batched points within one message are merged into a **multi-table INSERT** statement (multiple sub-tables/normal tables can share one statement); when points in the same sub-table differ in field sets, columns take the superset with missing fields filled as `NULL`; statements exceeding the single-statement byte budget (~512KB; taosAdapter `maxSQLLength` defaults to 1MB) are split automatically into multiple statements executed sequentially;
- Timestamps (nanoseconds) are written as ISO8601 string literals with timezone offsets, parsed automatically by TDengine according to the target database precision (`ms`/`us`/`ns`, specified via `CREATE DATABASE ... PRECISION 'ns'` at database creation), so no precision configuration is needed in the component; `timestamp=0` writes `NOW()`; timestamps earlier than 1970 are treated as invalid;
- Fields whose value is null or NaN/±Inf are skipped; when every point in a batch is invalid (no valid fields or timestamp out of range) the message routes to Failure.

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| dsn | string | DSN, format `root:taosdata@http(host:6041)/`. Supports `ref://` connection reuse within the chain | Required |
| db | string | Database name, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
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
