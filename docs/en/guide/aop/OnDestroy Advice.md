---
title: OnDestroy Advice
permalink: /pages/on-destroy-advice/
---
OnDestroy Advice: Executed after the rule engine is successfully destroyed.

## Interface

```go
// Order returns the execution order, the smaller the value, the higher the priority
Order() int
// New creates a new instance
New() Aspect
// OnDestroy is the advice after the rule engine is successfully destroyed
OnDestroy(chainCtx NodeCtx)
```