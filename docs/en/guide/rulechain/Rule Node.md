---
title: Rule Node
permalink: /pages/rule-node/
---
Rule nodes mainly include component type (type) and configuration (configuration). Nodes are distinguished by their component type, such as: js filter component, mqtt push component, restApiCall component, etc. The node behavior and capabilities are dynamically changed by the component configuration.
Component list and configuration reference: [Standard Components](/en/pages/standard-components/) | [Extension Components](/en/pages/extension-overview/) | [Custom Components](/en/pages/custom-components-overview/)

The following is an example of rule node configuration:
```json
  {
    "id": "s3",
    "type": "restApiCall",
    "name": "Push data",
    "debugMode": true,
    "configuration": {
      "restEndpointUrlPattern": "http://192.168.216.21:9099/api/socket/msg",
      "requestMethod": "POST",
      "maxParallelRequestsCount": 200
    }
  }
```