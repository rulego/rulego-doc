---
title: TimescaleDB Query
permalink: /pages/x-timescaledb-query/
---
`x/timescaledbQuery` component: <Badge text="v0.37.0+"/> executes TimescaleDB / PostgreSQL SQL queries and returns the results. Suited to time-series readback, reconciliation, and query analytics.

> Requires the extension library: [rulego-components-iot](https://github.com/rulego/rulego-components-iot)

## Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| dsn | string | PostgreSQL connection string, e.g. `host=localhost port=5432 user=postgres dbname=ts sslmode=disable`. Supports `ref://` connection reuse within the chain | Required |
| db | string | PostgreSQL schema name, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
| query | string | SQL query statement, supports `${msg.xx}`/`${metadata.xx}` templates | Required |
