---
title: natsClient
permalink: /pages/nats-client/
---
`natsClient` component: <Badge text="v0.21.0+"/> nats client. Publish the current message data to the specified topic of the nats server.

## Configuration

This component allows the reuse of shared connection clients through the `server` field. See [Component Connection Reuse](/en/pages/component-connection-reuse/) for reference.

| Field    | Type   | Description                                                                      | Default value |
|----------|--------|----------------------------------------------------------------------------------|---------------|
| topic    | string | Publish topic, can using [Component Configuration Variables](/en/pages/component-configuration-variables/). | None          |
| server   | string | nats server address                                                              | None          |
| username | string | Username                                                                         | None          |
| password | string | Password                                                                         | None          |


## Relation Type

- ***Success:*** Execution successful, send the message to the `Success` chain
- ***Failure:*** Execution failed, send the message to the `Failure` chain

## Execution result

This component will not change the content of `msg`, `metadata` and `msgType`.

## Configuration example

```json
   {
    "id": "s2",
    "type": "natsClient",
    "name": "Push data to nats server",
    "configuration": {
      "server": "127.0.0.1:4222",
      "topic": "/device/msg/${deviceId}"
    }
  }
```