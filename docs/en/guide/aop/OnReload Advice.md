---
title: OnReload Advice
permalink: /pages/on-reload-advice/
---
OnReload Advice: Executed after the rule engine reloads the rule chain or the sub-node configuration.

## Interface

```go
// Order returns the execution order, the smaller the value, the higher the priority
Order() int
// New creates a new instance
New() Aspect
// OnReload is the advice after the rule engine reloads the rule chain or the sub-node configuration
OnReload(chainCtx NodeCtx)
```