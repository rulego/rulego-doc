---
title: FAQ
permalink: /pages/faq/
---
### RuleGo 常见问题解答 (FAQ)

### 1. 如何限制规则链的并发处理数据？
使用内置 [LimierAspect](/pages/limiter-aspect/) 来限制规则链的并发执行，示例代码如下：
```go
ruleEngine, err := rulego.New(chainId, ruleFile, types.WithAspects(&aspect.NewConcurrencyLimiterAspect(1)))
```

### 2. 关于规则引擎执行中断恢复？
详情参考：[关于规则引擎执行中断恢复](/pages/interrupt-recovery/)

### 3. 其他语言怎样使用RuleGo？
使用[RuleGo-Server](/pages/rulego-server/) ，先把[RuleGo-Server](/pages/rulego-server/) 作为中间件独立运行，然后使用`API`([文档](https://apifox.com/apidoc/shared-d17a63fe-2201-4e37-89fb-f2e8c1cbaf40) ) 来执行或者执行指定规则链

### 4. 规则链可视化？
我们提供了RuleGo-Editor作为规则链可视化工具，详情参考：[RuleGo-Editor](/pages/rulego-server-editor/)

### 5. endpoint组件和节点组件区别？
endpoint组件是用于接收外部数据或者产生数据，并转发到规则引擎的组件。节点组件是规则引擎中的组件，用于处理规则引擎中的数据。
endpoint组件的不允许有输入，只有输出。

### 6. 如何用 RuleGo 做审批工作流（OA 请假、合同会签这类流程）？
审批场景推荐使用 GFlow——流程定义直接复用 RuleGo 规则链 JSON DSL，不用再学一套流程建模语言：

- [gflow-engine](https://github.com/rulego/gflow-engine)：可嵌入的审批工作流引擎（纯 Go 库），任务/实例/历史自动持久化，全程只需 7 张表，适合嵌进你自己的系统
- [GFlow 极风工作流](https://gflow.rulego.cc/)：基于 gflow-engine 的开箱即用审批平台，含可视化流程设计器

官网与在线演示：<https://gflow.rulego.cc/>