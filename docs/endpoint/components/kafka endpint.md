---
title: Kafka Endpoint
permalink: /pages/endpoint-kafka/
---
***Kafka Endpoint*** 用来创建和启动Kafka订阅服务，它可以订阅不同主题数据，然后路由到不同规则链进行处理。

::: tip 
该组件是扩展组件，需要引入额外的扩展库：[rulego-components](https://github.com/rulego/rulego-components)
:::

## Type

endpoint/kafka

## 启动配置

| 字段                               | 类型       | 是否必填 | 说明                           | 默认值              |
|----------------------------------|----------|------|------------------------------|------------------|
| server                           | string   | 是    | kafka服务器地址列表，多个地址用逗号分隔      | "127.0.0.1:9092" |
| groupId <Badge text="v0.23.0+"/> | string   | 否    | 消费者组ID                       | "rulego"         |
| sasl                             | object   | 否    | SASL认证配置                     | 见下表              |
| tls                              | object   | 否    | TLS配置                        | 见下表              |

### SASL认证配置

| 字段        | 类型     | 是否必填 | 说明                                      | 默认值     |
|-----------|--------|------|----------------------------------------|--------|
| enable    | bool   | 否    | 是否启用SASL认证                            | false  |
| mechanism | string | 否    | 认证机制，支持 PLAIN, SCRAM-SHA-256, SCRAM-SHA-512 | "PLAIN" |
| username  | string | 否    | 用户名                                    | 无      |
| password  | string | 否    | 密码                                     | 无      |

### TLS配置

| 字段                  | 类型   | 是否必填 | 说明         | 默认值   |
|---------------------|------|------|------------|------|
| enable              | bool | 否    | 是否启用TLS    | false |
| insecureSkipVerify  | bool | 否    | 是否跳过证书验证   | false |

## 连接共享

<Badge text="rulego-components"/> `server` 支持 `ref://{资源ID}` 复用共享的 Kafka 连接：把连接信息（brokers、SASL/TLS）保存为[共享节点](/pages/component-connection-reuse/)后，多条规则链的 Kafka 端点与 `x/kafkaProducer` 发布节点可以共用同一个连接，避免重复建连，在编辑器中可通过「共享连接」下拉直接选择。

```json
{
  "id": "shared_kafka",
  "type": "endpoint/kafka",
  "name": "kafka连接池",
  "configuration": {
    "server": "127.0.0.1:9092"
  }
}
```

其他端点或发布节点配置 `"server": "ref://shared_kafka"` 即复用该连接。

::: warning 消费组不可共享
受 sarama 客户端约束（一个 client 不允许被多个 consumer group 共享），每个端点的消费组仍使用共享连接的连接信息（brokers、SASL/TLS）独立建连，`groupId` 等消费侧配置保持各端点独立。
:::

## 响应

`exchange.Out.SetBody`响应之前，需要通过`exchange.Out.Headers()`或者`exchange.Out.Msg.Metadata`指定`responseTopic`参数，组件就会往指定的主题发送数据：

```go
exchange.Out.GetMsg().Metadata.PutValue("responseTopic", "device.msg.response")
// or
exchange.Out.Headers().Add("responseTopic", "device.msg.response")

exchange.Out.SetBody([]byte("ok"))
```

响应参数配置：

| 字段            | 类型     | 是否必填 | 说明    | 默认值 |
|---------------|--------|------|-------|-----|
| responseTopic | string | 是    | 主题    | -   |
| partition     | int    | 否    | 分区    | 0   |
| key           | string | 否    | 分区Key | -   |

## 示例

以下是使用endpoint的示例代码：

- [RestEndpoint](https://github.com/rulego/rulego/tree/main/examples/http_endpoint/http_endpoint.go)
- [WebsocketEndpoint](https://github.com/rulego/rulego/tree/main/endpoint/websocket/websocket_test.go)
- [MqttEndpoint](https://github.com/rulego/rulego/tree/main/endpoint/mqtt/mqtt_test.go)
- [ScheduleEndpoint](https://github.com/rulego/rulego/tree/main/endpoint/schedule/schedule_test.go)
- [NetEndpoint](https://github.com/rulego/rulego-components/blob/main/endpoint/net/net_test.go)
- [KafkaEndpoint](https://github.com/rulego/rulego-components/blob/main/endpoint/kafka/kafka_test.go) （扩展组件库）