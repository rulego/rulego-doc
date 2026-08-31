---
title: HJ212 Endpoint
permalink: /pages/endpoint-hj212/
---
***HJ212 Endpoint*** <Badge text="v0.37.0+"/> listens on a TCP port and passively receives data frames actively reported by pollution-source online monitoring devices conforming to the HJ 212-2017 standard, parsing pollutant factors into the unified `iot_points.Data` that flows into the rule chain. It performs passive collection only and does not actively answer devices (Flag bit0 acknowledgement is handled by downstream rules).

::: tip
1. This component is an extension component and requires an additional extension library: [rulego-components-iot](https://github.com/rulego/rulego-components-iot)
:::

## Type

endpoint/hj212

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| server | string | Listen address (including port), e.g. `0.0.0.0:8005` | `0.0.0.0:8005` |

::: tip Routing
This endpoint passively receives data on a single route with no path distinction; the router configuration is hidden by default (the `from.path='*'` default route is injected automatically on save) and requires no manual configuration.
:::

## Received Message Format

On each frame received, the component converts the parsed pollutant factor point list into a `RuleMsg` that flows into the rule chain, with `msg.type` set to `HJ212`, `dataType` to `JSON`, and `msg.Data` being the point array JSON string:

```json
[
  { "name": "w01018-Rtd", "value": 7.5, "timestamp": 0 }
]
```

| Field | Type | Description |
|-------|------|-------------|
| name | string | Pollutant factor code (e.g. `w01018-Rtd` real-time value) |
| value | any | Factor value |
| timestamp | number | Nanosecond timestamp (0 = current time) |

## Metadata

On each frame received, the component also writes frame-header fields into `msg.Metadata`, so downstream nodes can read them via `${metadata.xx}`:

| key | Description |
|-----|-------------|
| from | Sender device address (`host:port`) |
| mn | Device unique identifier MN |
| st | System code ST (subsystem type) |
| cn | Command code CN (e.g. `2011` real-time data) |
| dataTime | Data time (`YYYY-MM-DD HH:mm:ss`, omitted when the frame does not carry it) |

## Features

- **Passive listening**: never polls devices; only receives frames that devices report proactively per HJ 212-2017.
- **Unified contract**: parsed output is `iot_points.Data`, ready for direct storage by [`x/tsdbWrite`](/en/pages/x-tsdb-write/) (auto-pivoted into time-series points when `measurement` is configured).
- **Optional acknowledgement**: automatically writes back an ACK confirmation frame when Flag bit0=1; otherwise silent.
- **Graceful shutdown**: supports graceful shutdown, waiting for in-flight connections to finish.
