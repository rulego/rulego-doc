---
title: OnCreated Advice
permalink: /pages/on-created-advice/
---
OnCreated Advice: Executed after the rule engine is successfully created.

## Interface

```go
// Order returns the execution order, the smaller the value, the higher the priority
Order() int
// New creates a new instance
New() Aspect
// OnCreated is the advice after the rule engine is successfully created
OnCreated(chainCtx NodeCtx)
```