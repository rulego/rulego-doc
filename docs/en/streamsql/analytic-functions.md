---
title: Analytic Functions
permalink: /pages/streamsql-analytic/
---
# Analytic Functions

Analytic functions perform cross-event state computation on **windowless continuous event streams**—things like "the previous value", "has anything changed", or "a running total". Every event is evaluated the moment it arrives, and state is retained across events.

::: tip When to use analytic functions vs. window aggregation
- **Change detection / context lookback / lifetime accumulation** ("did it change versus last time", "what was the previous value", "how much has accumulated since startup") → use **analytic functions**.
- **Time-interval statistics / duration detection** ("minimum over the past 10 seconds", "average per minute") → use **window aggregation + HAVING**.
Analytic functions can also be used inside window queries (evaluated over the window output, with state retained across windows, see [Using Analytic Functions in Window Queries](#using-analytic-functions-in-window-queries)); but pure threshold/duration detection is expressed more directly with windows + HAVING.
:::

## Overview

| Dimension | Analytic Functions | Window Aggregation Functions |
|------|---------|------------|
| Trigger timing | Evaluated immediately on arrival of **every event** | Evaluated in batch when the window fires |
| State | Retained across events (stream-level state machine) | Aggregated within a window, cleared after firing |
| Allowed positions | `SELECT`, `WHERE` | `SELECT`, `HAVING` |
| Typical use cases | Change detection, lag, accumulation | Count, average, min/max, duration detection |
| Requires GROUP BY | **No** (pure analytic queries take the direct path) | Yes |

## OVER Clause

Analytic functions may carry an `OVER` clause controlling state partitioning and update conditions:

```
func(args) OVER ( [PARTITION BY col[, col...]] [WHEN condition] )
```

- **`PARTITION BY`**: partitions by field; each partition maintains independent state (e.g., "each device's own previous value").
- **`WHEN condition`**: only events satisfying the condition update the state; non-matching events **reuse the previous result** (conditional-state semantics).
- **Not supported:** `ORDER BY` / `ROWS BETWEEN` (that is Flink's window frame model; streamsql's analytic functions are per-event state machines).

```sql
-- No OVER: one global state
SELECT lag(temperature) AS prev FROM stream

-- PARTITION BY: independent state per device
SELECT lag(temperature) OVER (PARTITION BY deviceId) AS prev FROM stream

-- WHEN: update state only when temperature > 20
SELECT lag(temperature) OVER (WHEN temperature > 20) AS prev FROM stream

-- Combined: per device, updated only on valid events
SELECT lag(temperature) OVER (PARTITION BY deviceId WHEN temperature > 20) AS prev FROM stream
```

## Evaluation Timing and Allowed Positions

Analytic functions are evaluated **immediately as each event arrives, before WHERE**—which is exactly why WHERE can reference their results (the core of CDC change detection).

| Position | Supported | Notes |
|------|---------|------|
| `SELECT` | ✅ | Projected output; the primary use case |
| `WHERE` | ✅ | Filter with an analytic function, e.g. `WHERE lag(current) < 300` |
| `HAVING` | ❌ | HAVING applies only to window/aggregation queries; analytic functions cannot enter HAVING |
| Inside a window query (SELECT) | ✅ | Evaluated over the rows a window produces, state retained across windows (see [Using Analytic Functions in Window Queries](#using-analytic-functions-in-window-queries)) |

## Function List

### lag — Previous Value

Returns the value of the event `offset` positions before the current row.

```
lag(field [, offset [, default [, ignoreNull]]])
```

| Parameter | Default | Description |
|------|------|------|
| `field` | required | Target field |
| `offset` | 1 | How many steps to look back |
| `default` | nil | Value returned when history is shorter than the offset |
| `ignoreNull` | false | When `true`, nil values are skipped and not counted in history |

```sql
SELECT temperature, lag(temperature) AS prev FROM stream
SELECT lag(value, 2, -1, true) AS prev2 FROM stream   -- look back 2 steps, default -1, skip nulls
```

### latest — Latest Non-Nil Value

Returns the most recent non-nil value of the given field; nil does not update the state.

```
latest(field [, default])
```

```sql
SELECT latest(temperature) AS lt FROM stream
```

### had_changed — Change Detection

Returns a boolean: whether anything changed relative to the previous event (the first event counts as a change).

```
had_changed(ignoreNull, field[, field...])
```

- `ignoreNull=true`: nil neither triggers a change nor pollutes the baseline.
- Multiple columns supported: any column changing yields `true`.
- `had_changed(ignoreNull, "*")`: detects changes across **all columns of the whole row** (`*` expansion).

```sql
SELECT had_changed(true, temperature) AS chg FROM stream
SELECT ts FROM stream WHERE had_changed(true, status) == true
SELECT * FROM stream WHERE had_changed(true, "*") == true   -- any column changes
```

### changed_col — Changed Column Value (single-column scalar)

Returns the new value on change, nil when nothing changed. Usable in both `WHERE` and `SELECT`.

```
changed_col(ignoreNull, field)
```

```sql
SELECT changed_col(true, temperature) AS chg FROM stream
```

### changed_cols — Multi-Column Changed Values (SELECT only, dynamic columns)

Detects changes across multiple columns and **outputs only the columns that changed**, with output column names = `prefix + original column name`. Supports `"*"` for whole-row detection.

```
changed_cols(prefix, ignoreNull, field[, field...])
```

```sql
-- temperature changed → outputs c_temperature; humidity changed → outputs c_humidity
SELECT changed_cols("c_", true, temperature, humidity) FROM stream
SELECT changed_cols("d_", true, "*") FROM stream   -- every column of the row
```

::: tip omitEmpty
When `changed_cols` is the sole output of the query and nothing changed this time, the whole row is suppressed (event compression). Combined with ordinary fields, the ordinary fields are emitted as usual and only the changed columns appear on demand.
:::

### acc_* — Lifetime Accumulation

Accumulates continuously over the entire rule lifetime and never resets with windows.

| Function | Description |
|------|------|
| `acc_sum(field)` | Running sum |
| `acc_max(field)` | Running maximum |
| `acc_min(field)` | Running minimum |
| `acc_count(field)` | Running count (non-nil) |
| `acc_avg(field)` | Running average |

```sql
SELECT acc_sum(power) AS total, acc_max(power) AS peak, acc_count(*) AS cnt FROM stream
```

**Difference from the aggregate `sum`**: `sum` aggregates within a window and clears at the end of every window; `acc_sum` adds up across the whole lifetime without resetting, running as a per-event state machine (works with `EmitSync`).

```sql
-- sum: one sum over the events of each 5-second batch, cleared when the window ends
SELECT deviceId, sum(current) FROM stream GROUP BY deviceId, TumblingWindow('5s')
-- acc_sum: each device keeps accumulating since power-on, never resetting
SELECT acc_sum(current) OVER (PARTITION BY deviceId) AS total FROM stream
```

::: warning acc_* accumulation silently resets to zero on partition eviction
`acc_*` does not reset with windows, but if the partition gets evicted by the PARTITION cap (see "Pitfall 3" below), the accumulated value **silently restarts from 0**—a device returning after a period of silence will not continue counting; it behaves like a brand-new device. When accurate totals matter, set the cap above your active partition count.
:::

#### Conditional Accumulation (start / reset points)

`acc_*` can additionally accept two boolean expressions: the first is the **start point** (accumulation begins once satisfied and continues thereafter), the second is the **reset point** (once satisfied the value zeroes out and stops until the start condition is met again).

```
acc_count(expr, startExpr, resetExpr)
```

```sql
-- Start counting only after a > 1; zero out when a < 0
SELECT acc_count(a, a > 1, a < 0) AS c FROM stream
-- Input a: 1,2,1,3,-1,1 → c: 0,1,2,3,0,0
```

## Using Analytic Functions in Window Queries

Analytic functions work inside **window queries**: they are evaluated **over the rows the window produces**, and their state is **retained across windows** (never cleared by a window firing)—equivalent to running change detection / lookback / accumulation over each window's output. `PARTITION` defaults to the `GROUP BY` keys—each group maintains its own state across windows, with no cross-talk.

An analytic function argument may itself be an aggregate function (inline form), e.g. change detection over windowed aggregate results:

```sql
-- One counting window per two events computing the average; output the windows whose mean temperature changed
SELECT changed_cols("t", true, avg(temperature))
FROM stream
GROUP BY CountingWindow(2)
-- Input temperatures 23,23,23,25,25,25,25,25 → window means 23,24,25,25
-- Output {tavg:23} {tavg:24} {tavg:25} (the final 25→25 shows no change and is suppressed)
```

```sql
-- Cross-window running total: accumulate the mean of each window
SELECT acc_sum(avg(temperature)) AS total FROM stream GROUP BY CountingWindow(2)
```

::: tip Alias form
You can also alias the aggregate first, then feed the alias into the analytic function: `SELECT avg(temperature) AS a, changed_col(true, a) AS chg ... GROUP BY <window>`. Inline and alias forms are equivalent.
:::

::: warning Arguments must reference window output fields
Inside a window query, an analytic function's arguments must be aggregate functions or `GROUP BY` fields—those are what actually appear in the window's output rows. Referencing a **bare raw column** (neither aggregated nor a grouping key) yields no value.
:::

## Detailed Examples

### Example 1: CDC change detection — current spiking across a threshold

**Scenario**: emit whenever a device's current jumps from low to high across the 300A threshold. Requirement: "current > 300 AND previous < 300".

**Data**:
```json
{"current": 300, "deviceId": 1, "ts": 1}
{"current": 200, "deviceId": 1, "ts": 2}
{"current": 500, "deviceId": 1, "ts": 3}   // Device 1: 200→500 crosses the threshold
{"current": 200, "deviceId": 2, "ts": 4}
{"current": 600, "deviceId": 2, "ts": 5}   // Device 2: 200→600 crosses the threshold
```

**SQL** (`lag` with `PARTITION BY`, used in `WHERE`):
```sql
SELECT current, deviceId, ts
FROM stream
WHERE current > 300 AND lag(current) OVER (PARTITION BY deviceId) < 300
```

**Output**:
```json
{"current": 500, "deviceId": 1, "ts": 3}
{"current": 600, "deviceId": 2, "ts": 5}
```

**Key point**: `PARTITION BY deviceId` lets each device maintain its own "last current"; `lag` is evaluated before WHERE, so WHERE can reference it.

### Example 2: State-change filtering — output only changed rows

**Scenario**: suppress output while the temperature stays the same; emit only on change.

**SQL**:
```sql
SELECT ts, temperature
FROM stream
WHERE had_changed(true, temperature) == true
```

**Input/output**:
```
{ts:1, temperature:23} → output (first event counts as a change)
{ts:2, temperature:23} → suppressed (unchanged)
{ts:3, temperature:25} → output (changed)
```

### Example 3: Event compression — send only the fields that changed

**Scenario**: uplink bandwidth is scarce; each message carries only the fields that changed, prefixed with `c_`.

**SQL**:
```sql
SELECT changed_cols("c_", true, temperature, humidity) FROM stream
```

**Input/output**:
```
{temperature:23, humidity:50} → {c_temperature:23, c_humidity:50}   // first event: everything changed
{temperature:23, humidity:55} → {c_humidity:55}                     // only humidity changed
{temperature:23, humidity:55} → (no output)                         // nothing changed, whole row suppressed
```

### Example 4: Per-device previous reading

**Scenario**: a report shows the current temperature alongside each device's previous one.

```sql
SELECT deviceId, temperature, lag(temperature) OVER (PARTITION BY deviceId) AS prev_temp
FROM stream
```

### Example 5: Cumulative statistics

**Scenario**: track total energy consumption, peak power and number of samples since power-on.

```sql
SELECT acc_sum(power) AS total, acc_max(power) AS peak, acc_count(*) AS cnt, acc_avg(power) AS avg_power
FROM stream
```

### Example 6: Conditional state — update only on valid events

**Scenario**: devices occasionally report abnormal readings (temperature ≤ 0 is invalid). `lag` should ignore invalid events and refresh its baseline only on valid ones.

```sql
SELECT lag(temperature) OVER (WHEN temperature > 0) AS prev_valid FROM stream
```

Events failing `temperature > 0` do not touch the state; `prev_valid` reuses the last valid value.

### Example 7: Sustained over-threshold detection (window + HAVING)

::: warning Note
Do **not** implement "N seconds sustained above a threshold" with analytic functions or `over(when)` on a window—mainstream engines (Flink/Spark, etc.) all solve this with **window aggregation + HAVING**.
:::

**Scenario**: raise an alarm only when current stays above 200A for a full 10 seconds.

```sql
SELECT min(concurrency) AS mn, count(*) AS c
FROM stream
GROUP BY SlidingWindow('10s', '1s')
HAVING mn > 200
```

**How it works**: the sliding window aggregates **all** events within those 10 seconds (including dips below 200), and `HAVING mn > 200` filters out every window that contained a dip—whatever survives is a window ">200 throughout". When no window satisfies HAVING, **nothing is emitted** (each window runs through HAVING individually; if all fail, that cycle has no output).

::: tip HAVING references aliases
streamsql's `HAVING` references the **alias** defined in `SELECT` (`mn`); repeating the aggregate expression does not work (`HAVING min(concurrency) > 200` has no effect).
:::

### Example 8: In-window change detection — report only when the average moves

**Scenario**: uplink bandwidth is scarce; average every two samples and report only when the **mean changes** (stay silent while it holds steady).

```sql
SELECT changed_cols("t", true, avg(temperature)) FROM stream GROUP BY CountingWindow(2)
```

**Input/output** (temperature sequence 23,23,23,25,25,25,25,25):
```
Window means: 23, 24, 25, 25
Output: {tavg:23} {tavg:24} {tavg:25}   ← the final 25→25 shows no change and is suppressed
```

The analytic function evaluates the mean **after** each window emits, keeps state across windows, and compares against the previous window's mean.

### Example 9: Per-device cross-window changes — independent tracking per device

**Scenario**: multiple devices share one stream; each device tracks changes of its own window means independently, with no cross-talk.

```sql
SELECT deviceId, changed_col(true, avg(temp)) AS chg
FROM stream
GROUP BY deviceId, CountingWindow(2)
```

**Input/output** (A: 10,20,30,40; B: 5,5):
```
A window means: 15 (first → change), 35 (change)   → {deviceId:A, chg:15} {deviceId:A, chg:35}
B window means: 5 (first → change)                 → {deviceId:B, chg:5}
```

In window queries, analytic functions are partitioned by the `GROUP BY` keys by default, so each device maintains state across windows independently.

### Example 10: Conditional accumulation — counting within an overload pulse

**Scenario**: count the events within each overload pulse (current >200A); zero out when the current drops back (<10A) and start counting afresh on the next pulse.

```sql
SELECT acc_count(current, current > 200, current < 10) AS c FROM stream
```

**Input/output** (current: 50, 250, 300, 5, 280):
```
50  → 0   (overload not entered, not counted)
250 → 1   (current>200, counting starts)
300 → 2
5   → 0   (current<10, zeroed)
280 → 1   (overload again, counting restarts)
```

::: tip Use comparison operators in conditional expressions
The start/reset conditions of `acc_*` are boolean expressions built with **comparison operators** such as `>` `<` `>=` `==` (they run through the expression engine). Note that SQL's `=` does not act as an equality test inside analytic-function arguments; use `==` for string equality.
:::

## Common Pitfalls

### Pitfall 1: `over(when)` attached to a window vs. attached to an analytic function

```sql
-- ✅ over attached to the analytic function lag: valid, the CDC pattern
WHERE lag(current) OVER (PARTITION BY deviceId) < 300

-- ❌ over attached to the GROUP BY window: unsupported, raises an error
GROUP BY SlidingWindow(ss, 10) OVER (WHEN concurrency > 200)
```

Threshold/duration detection on windows belongs in `HAVING` (see Example 7).

### Pitfall 2: analytic functions cannot enter HAVING; avoid bare columns inside window queries

Analytic functions **cannot enter `HAVING`** (HAVING applies only to window/aggregation queries).

They **may** appear in the SELECT of a window query (evaluating the window output, see [Using Analytic Functions in Window Queries](#using-analytic-functions-in-window-queries)), but their arguments must be aggregate functions or `GROUP BY` fields. The following reference to a **bare raw column** yields no value (`temperature` is absent from the window output row):

```sql
-- ⚠️ lag(temperature) inside a window query: temperature is not aggregated, so it is missing from the window output → returns nil
SELECT lag(temperature) FROM stream GROUP BY TumblingWindow('5s')
```

To look back over the windowed temperature, aggregate first, then analyze: `lag(avg(temperature))`, or alias it first with `avg(temperature) AS a` and apply `lag(a)`.

### Pitfall 3: high-cardinality memory under `partition by`

The number of `PARTITION BY` partitions grows with distinct key values (e.g., massive fleets of deviceIds). streamsql caps the partition count per analytic-function field (default 10000) and, beyond the cap, evicts the least-recently-used partitions via LRU to prevent unbounded memory growth. A reappearing evicted partition starts from its initial state: `lag` returns nil again, `had_changed`/`changed_col` treat it as a first event, and **`acc_*` totals silently drop back to zero**.

The default 10000 covers common device scales on a single edge node (roughly 150B per partition; wide rows from `changed_cols`/`had_changed(*)` can reach several hundred bytes, so 10000 partitions cost on the order of a few MB—still within the edge positioning). On aggregation gateways serving tens of thousands of devices with memory to spare, raise it via `WithAnalyticMaxPartitions`:

```go
ssql := streamsql.New(streamsql.WithAnalyticMaxPartitions(50000))
```

::: tip When to raise it
Raise the cap only when the partition key is genuinely high-cardinality (e.g., tens of thousands of devices on one node) and memory allows. Partitioning on a near-unique field (timestamps, event ids) makes the partition count explode—raising the limit only postpones the problem there; switch to a low-cardinality key instead.
:::
