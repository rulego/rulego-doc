---
title: FAQ
permalink: /pages/faq/
---
### RuleGo 常见问题解答 (FAQ)

### 1. 如何限制规则链的并发处理数据？
使用内置 [LimiterAspect](/pages/limiter-aspect/) 来限制规则链的并发执行，示例代码如下：
```go
ruleEngine, err := rulego.New(chainId, ruleFile, types.WithAspects(aspect.NewConcurrencyLimiterAspect(1)))
```

### 2. 关于规则引擎执行中断恢复？
详情参考：[关于规则引擎执行中断恢复](/pages/interrupt-recovery/)

### 3. 其他语言怎样使用RuleGo？
使用[RuleGo-Server](/pages/rulego-server/) ，先把[RuleGo-Server](/pages/rulego-server/) 作为中间件独立运行，然后使用`API`([文档](https://apifox.com/apidoc/shared-d17a63fe-2201-4e37-89fb-f2e8c1cbaf40) ) 来执行或者执行指定规则链

### 4. 规则链可视化？
我们提供了RuleGo-Editor作为规则链可视化工具，详情参考：[RuleGo-Editor](/pages/rulego-server-editor/)

### 5. endpoint组件和节点组件（普通组件）有什么区别？

| 对比项 | endpoint组件 | 节点组件 |
|--------|-------------|---------|
| 位置 | 规则链之外，负责接收外部数据并触发规则链 | 规则链之内，负责处理链上流转的消息 |
| 方向 | 只有输出（把外部数据转成消息交给规则链），不能作为链的中间节点 | 有输入有输出，通过 Relation Type 连接上下游 |
| 典型代表 | endpoint/rest、endpoint/mqtt、endpoint/kafka、endpoint/schedule | jsFilter、jsTransform、restApiCall、mqttClient |

简言之：**endpoint 是消息的入口（触发器），节点组件是消息在链上的加工器**。endpoint 详见 [Endpoint 模块](/pages/endpoint-overview/)。

### 6. 提示 `component not found: xxx` 怎么办？
规则链 DSL 里的 `type` 在组件注册表中找不到。常见原因：
- 该组件属于[扩展组件库](/pages/extension-overview/)（`rulego-components` 等），内置注册表不含它，需要 `import _ "github.com/rulego/rulego-components/xxx"` 引入注册，或改用内置了全部扩展组件的 [RuleGo-Server](/pages/rulego-server/)
- `type` 名拼写错误（区分大小写），可在[标准组件](/pages/standard-components/)列表核对

### 7. jsTransform 转换后消息没有变化？
`jsTransform` 等脚本转换组件要求脚本 **return 一个包含 `msg`、`metadata`、`msgType` 的对象**，只修改 `msg` 不返回是无效的：
```js
msg.temperature = msg.temperature / 10;
return {'msg': msg, 'metadata': metadata, 'msgType': msgType};
```

### 8. endpoint 启动报端口被占用？
同一地址只能被一个服务监听。检查 `config.conf` 或 endpoint 配置里的端口（如 http 的 `server: ":9090"`）是否与其他进程或另一条规则链的 endpoint 冲突，改端口或释放端口后重启。

### 9. 热更新规则链不生效？
`ReloadSelf` 的入参是**完整的规则链 DSL**，不是增量片段，未包含的节点和连接会被删除；另外确认修改的是通过 `rulego.Get(id)` 取到的同一个实例。详见[动态刷新](/pages/dynamic-refresh/)。

### 10. 打不开可视化编辑器（404）？
编辑器内置在 `rulego-server-all-*` 发布包中，纯后端包 `rulego-server-*` 不含。请下载 `-all` 包，或参考[安装与部署](/pages/rulego-server-install/)单独安装编辑器。

### 11. 外部系统如何触发一条规则链？
三种常用方式：
- 在规则链 DSL 的 `metadata.endpoints` 配置触发器（http/mqtt/kafka/schedule 等），详见 [Endpoint DSL](/pages/endpoint-dsl/)
- 通过 REST API 直接提交消息执行，详见[执行规则链](/pages/execute-rule-chain/)
- 代码方式：`ruleEngine.OnMsg(msg)` 把消息交给引擎，见[快速开始](/pages/quick-start/)
