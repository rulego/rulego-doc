---
home: true
heroImage: /img/logo.png
heroText: RuleGo
tagline: 🚀A lightweight, high-performance, embedded, next-generation component-orchestrated rule engine based on Go language
actionText: Quick Start →
actionLink: /en/pages/0f6af2/
bannerBg: none
features: 
  - 
    title: 🧩Componentized
    details: Everything is a component. Built-in a large number of components, you can flexibly configure and reuse them.
  - 
    title: ☘️Hot Reload
    details: Without restarting the application, replace or add business logic.
  - 
    title: ✨Lightweight
    details: Extremely low resource consumption. Born for the Internet of Things, but far more than the Internet of Things.
  - 
    title: 🎯Embedded
    details: Self-developed architecture, strong scalability. It can be seamlessly integrated into the project. No dependency on any third-party components, simple deployment.
  - 
    title: 📑Configurable
    details: By configuring the rule chain and endpoint, build blocks to achieve your highly variable business needs.
  - 
    title: 🔥Application Integration
    details: You can use RuleGo as glue to connect various systems or protocols.
postList: none
hideRightBar: true
notices: 
  - 
    id: RuleGo-0.27.0
    title: 📢 RuleGo v0.27.0 released!
    content: '<div><p>2024/12/09</p><ul> <li>feat: Add Disabled field to the rule chain DSL</li><li>feat(endpoint/rest): Allow setting cross-origin</li><li>feat(restApiCallNode): Allow configuring to not verify certificates </li><li>feat(flow): Sub-rule chains are allowed to be set to inherit mode</li><li>refactor(server): Refactor rulego-server API </li></ul><p style="text-align: center;"><a href="https://github.com/rulego/rulego/blob/main/doc/CHANGELOG.md" target="_blank">查看详情</a></p></div>'
    isHtmlContent: true
title: index
date: 2023-12-13 09:17:46
permalink: /pages/2c4d43/
---

<Notice :data="$frontmatter.notices"/>

### 🏆Special Users

::: cardList
```yaml
- name: Sagoo IOT
  desc: An enterprise-level open source Internet of Things system based on Golang development
  avatar: /img/sponsors/shaguo.png
  link: https://iotdoc.sagoo.cn/?from=rulego
  bgColor: '#f8c567' # Optional, default var(--bodyBg). When the color value has a #, please add single quotes
  textColor: '#1f2328' # Optional, default var(--textColor)
  expired: '2024-10-07'
```  
:::

<p align="center">
  <a class="become-sponsor iconfont " href="/en/pages/ccf224">Support this project</a>
  <a class="become-sponsor iconfont icon-github " href="https://github.com/rulego/rulego" target="_blank">Star RuleGo</a>
  <a class="become-sponsor iconfont icon-gitee" href="https://gitee.com/rulego/rulego" target="_blank">Star RuleGo</a>
</p>

<style>
  .become-sponsor{
    padding: 8px 20px;
    display: inline-block;
    color: #11a8cd;
    border-radius: 30px;
    box-sizing: border-box;
    border: 1px solid #11a8cd;
  }
 .become-sponsor:hover{
    border: 1px solid #13bee8;
    color: #13bee8;
  }
</style>

<br/>


### 🚀Features

* **Lightweight:** No external middleware dependencies, it can sink to the edge server, implement the Internet of Things edge computing solution, or deploy on the cloud as a rule engine service.
* **High performance:** Thanks to the high-performance characteristics of `Go`, and the use of technologies such as coroutine pool and object pool.
* **Dual Mode:** Embedded and Standalone Deployment modes. Supports embedding `RuleGo` into existing applications. It can also be deployed independently as middleware, providing rule engine and orchestration services.
* **Componentized:** All business logic are components, and can be flexibly configured and reused. You can also encapsulate your business into `RuleGo` components, and then build blocks to achieve your highly variable business needs.
* **Rule chain:** You can flexibly combine and reuse different components to achieve highly customized and extensible business processes.
* **Process orchestration:** Support dynamic orchestration of rule chain components, without restarting the application, replace or add business logic.
* **Easy to extend:** Provide rich and flexible extension interfaces, which can easily implement custom components or introduce third-party components.
* **Dynamic loading:** Support dynamic loading of components and extension components through `Go plugin`.
* **Rule chain nesting:** Support sub-rule chain nesting, achieve process reuse.
* **Built-in a large number of components:** `Message type routing`, `Script routing`, `Script filter`, `Script converter`, `HTTP push`, `MQTT push`, `Send email`, `Log record`, `Database operation`
  and other components. You can also extend custom components by yourself.
* **Context isolation mechanism:** Reliable context isolation mechanism, no need to worry about data cross-flow in high-concurrency situations.
* **AOP:** Allows adding extra behavior to the execution of the rule chain, or directly replacing the original rule chain or node logic, without modifying the original logic of the rule chain or node.

### 🎯Typical use cases

* **Edge computing:** You can deploy `RuleGo` on the edge server, preprocess the data, filter, aggregate or calculate and then report to the cloud. The data processing rules and distribution rules can be dynamically configured and modified by the rule chain without restarting the system.
* **Internet of Things:** Collect device data reporting, after the rule chain's rule judgment, trigger one or more actions, such as: send email, send alarm, and linkage with other devices or systems.
* **Data distribution:** You can distribute data to different systems according to different message types, such as HTTP, MQTT or gRPC.
* **Application integration:** Use `RuleGo` as glue to connect various systems or protocols, such as: ssh, webhook, kafka, message queue, database, chatGPT, third-party application systems.
* **Heterogeneous system data centralized processing:** Receive data from different data sources (such as MQTT, HTTP, TCP/UDP, etc.), and then filter, format conversion, and distribute to databases, business systems or dashboards.
* **Highly customized business:** Decouple highly customized or frequently changing business and hand it over to `RuleGo` rule chain for management. Business needs change without restarting the main program.
* **Complex business orchestration:** Encapsulate business into custom components, and use `RuleGo` to orchestrate and drive these custom components, and support dynamic adjustment and replacement of business logic.
* **Microservice orchestration:** Use `RuleGo` to orchestrate and drive microservices, or dynamically call third-party services to process business and return results.
* **Decoupling of business code and business logic:** For example: user points calculation system, risk control system.
* **Automation:** For example: CI/CD systems, process automation systems, marketing automation systems, quantitative Trading System.
* **Low-code:** For example: low-code platforms, iPaaS systems, ETL, Langflow-like/dify-like systems (connecting to 'large models' to extract user intent, then triggering rule chains to interact with other systems or to process business operations).
* **Flexible configuration and highly customized event processing framework:** For different message types, perform asynchronous or synchronous processing.

### 🎈Code hosting

> **[Gitee](https://gitee.com/rulego/rulego)** | **[Github](https://github.com/rulego/rulego)**

### 🧸Participate in contribution

We look forward to your PR!

- Contribute code: Code Repository [RuleGo](https://github.com/rulego/rulego) , welcome to submit Issue or Pull Requests
- Maintain documentation: Documentation Repository [RuleGo-Doc](https://github.com/rulego/rulego-doc) , welcome to participate in translation and revision

### 🧲 Friendly links

<div class="row">
    <span class="link">
        <a href="https://baomidou.com" target="_blank" title="MybatisPlus">
            <img :src="$withBase('/img/links/mybatis-plus-logo.png')" class="no-zoom">
        </a>
    </span>

</div>

<style>
  .link {
    width: 10em;
    text-align: left;
  }
  .link img {
    height:1.8em;
    max-width:180px;
    margin: 14px;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
</style>