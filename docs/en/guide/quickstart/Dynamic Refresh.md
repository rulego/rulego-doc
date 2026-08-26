---
title: Dynamic Refresh Rule Chain
permalink: /pages/dynamic-refresh/
---
You can dynamically update the rule chain at runtime, change the behavior and business logic of the rule chain, and achieve non-stop update and expansion of business logic.

- Update the root rule chain

```go
err := ruleEngine.ReloadSelf([]byte(ruleFile))

```

- Update a node of the root rule chain
```go
//Update the sub-rule chain
ruleEngine.ReloadChild(types.EmptyRuleNodeId, types.RuleNodeId{Id: "s1"}, []byte(modifyNodeFile))

```
