---
title: MongoDB Client
permalink: /pages/mongodb-client/
---
`x/mongodbClient` component: <Badge text="v0.26.0+"/> MongoDB client. It can perform CRUD operations on MongoDB.

## Configuration
This component allows the reuse of shared connection clients through the `server` field. See [Component Connection Reuse](/en/pages/component-connection-reuse/).

| Field      | Type   | Description                                                                                                                   | Default |
|------------|--------|-------------------------------------------------------------------------------------------------------------------------------|---------|
| server     | string | Database service address, example: mongodb://localhost:27017                                                                  | None    |
| database   | string | Database, can use [component configuration variables](/en/pages/component-configuration-variables/)                                                      | None    |
| collection | string | Collection name, can use [component configuration variables](/en/pages/component-configuration-variables/)                                               | None    |
| opType     | string | Operation type INSERT, UPDATE, DELETE, QUERY                                                                                  | QUERY   |
| filter     | string | Filter conditions. Example: {"age": {"$gte": 18}}. Can use [component configuration variables](/en/pages/component-configuration-variables/)             | None    |
| doc        | string | Update/insert document. Example: {"name": "test", "age": 18}.  Can use [component configuration variables](/en/pages/component-configuration-variables/) | None    |
| one        | bool   | Whether to operate on only one piece of data                                                                                  | None    |

## Relation Type

- ***Success:*** Execution is successful, and the message is sent to the `Success` chain.
- ***Failure:*** Execution fails, and the message is sent to the `Failure` chain.

## Execution Result

The query result is assigned to the message payload and passed to the next node.
