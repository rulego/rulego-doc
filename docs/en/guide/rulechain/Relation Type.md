---
title: Relation Type
permalink: /pages/relation-type/
---
Relation Type is: the relationship type of the connection between nodes, which determines the path selection of data in the rule chain. Different components provide different path connection relationships, generally speaking:
- The relationships provided by filter-type components are: True/False/Failure;
- The relationships provided by action-type components are: Success/Failure;
- Routing-type components can dynamically control routing or implement more complex relationship routing based on msgType, such as: [jsSwitch](/pages/js-switch/) , [msgTypeSwitch](/pages/msg-type-switch/), etc.

The relationship type of the connection between nodes is configured in the rule chain `connection.type` field, for example:

``` json
  "connections": [
      {
        "fromId": "s1",
        "toId": "s2",
        "type": "True"
      }
    ]
```