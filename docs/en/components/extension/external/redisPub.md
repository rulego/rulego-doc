---
title: Redis Publisher
permalink: /pages/redis-pub/
---
`x/redisPub` Component: Redis publishing component. Publish data to a specified channel.

## Configuration

This component allows for the reuse of shared Redis connection clients through the `server` field. See [Component Connection Reuse](/pages/component-connection-reuse/).

| Field    | Type   | Description                                                                     | Default |
|----------|--------|---------------------------------------------------------------------------------|---------|
| server   | string | Redis server address                                                            | None    |
| password | string | Password                                                                        | None    |
| poolSize | int    | Connection pool size                                                            | 0       |
| db       | int    | Database                                                                        | None    |
| channel  | string | Publishing channel, can use [Component Configuration Variables](/en/pages/component-configuration-variables/) | None    |

## Relation Type

- ***Success:*** On successful execution, the message is sent to the `Success` chain.
- ***Failure:*** On failure, the message is sent to the `Failure` chain.

## Execution Result

- The message payload remains unchanged.
- The number of subscribers who received the message can be obtained through `msg.metadata.result`.
