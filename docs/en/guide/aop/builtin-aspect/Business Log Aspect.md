---
title: Business Log Aspect
permalink: /en/pages/business-log-aspect/
---
Business Log Aspect: a built-in aspect, automatically imported. It asynchronously dispatches business log events produced by rule chain executions to an optional handler chain, or records them in run logs, without affecting the business flow.

Two event kinds:

- **Node log events** (scope=node): a node configured with `logConfig` before/after templates emits an `in` event on entry and an `out` event on completion. `Data` is the rendered template result.
- **Chain end event** (scope=chain): with chain configuration `logEvents: ["chainEnd"]`, an `end` event is emitted each time the execution reaches a terminal branch. `Data` is the message data at the trigger point.

:::tip
This aspect will be automatically imported and does not require manual introduction.
:::

## Event structure

An event is a message with `type=log`; the handler chain receives it as-is:

| Field | Description |
|---|---|
| Data | Node events: rendered template text. End events: message data at the trigger point (the end node's input is the author-designated output) |
| metadata.scope | `node` / `chain` |
| metadata.phase | `in` / `out` / `end` |
| metadata.nodeId, nodeName | Node events only |
| metadata.relationType | Output relation of out/end events: Success, Failure, True, False, etc. |
| metadata.error | Error text on failure (end events carry a wrapped error with chain and node context) |
| metadata.chainId, msgId, ts | Source chain, source message ID, nanosecond timestamp |

## Chain end trigger points

Follows the engine's end-node semantics, no deduplication:

- Chain with an **end node**: only the end node triggers, exactly one event
- Chain without end nodes: every leaf terminal triggers one event each

Failures trigger as well: `relationType=Failure` with `metadata.error` set.

## Configuration

Node log templates: right-click a node and choose "Log". Chain end reporting: right-click blank canvas and choose "Log Report Settings", or write the DSL directly:

```json
{
  "ruleChain": {
    "configuration": {
      "logHandler": "handler chain id",
      "logEvents": ["chainEnd"]
    }
  }
}
```

| Field | Type | Description |
|---|---|---|
| logHandler | string | Handler chain id, optional; empty means run-log only |
| logEvents | []string | Only `chainEnd` is supported |

:::warning
Values of `${global.x}` are masked to `***` before template rendering to avoid leaking host configuration.
:::

## Handler chain

The handler chain is an ordinary rule chain. Filter nodes can branch on `metadata.scope`, `metadata.relationType`, etc. Dispatch failures only log a warning and never affect the business chain.
