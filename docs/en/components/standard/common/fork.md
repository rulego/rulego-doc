---
title: fork
permalink: /pages/fork/
---
**`fork` Component: Parallel Gateway Node. It splits the flow into multiple parallel execution paths.**

## Configuration

None

## Relation Type

This node is connected to the next node with a `Success` relationship.
## Execution Result

This component does not change the content of `msg`, `metadata`, and `msgType`.

## Configuration Example

```json
{
  "id": "s1",
  "type": "fork",
  "name": "Parallel Gateway"
}
```
