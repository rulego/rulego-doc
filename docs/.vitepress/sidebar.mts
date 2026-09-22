// 由 scripts/migrate.mjs 生成：目录树 + frontmatter title，阅读顺序=原编号顺序。勿手改。
import type { DefaultTheme } from 'vitepress'

export const zhSidebar: DefaultTheme.Sidebar = [
  {
    "text": "快速入门",
    "collapsed": true,
    "items": [
      {
        "text": "简介",
        "link": "/pages/introduction/"
      },
      {
        "text": "使用场景",
        "link": "/pages/use-cases/"
      },
      {
        "text": "快速开始",
        "link": "/pages/quick-start/"
      },
      {
        "text": "动态刷新规则链",
        "link": "/pages/dynamic-refresh/"
      }
    ]
  },
  {
    "text": "规则链",
    "collapsed": true,
    "items": [
      {
        "text": "规则链概述",
        "link": "/pages/rule-chain-overview/"
      },
      {
        "text": "规则链",
        "link": "/pages/rule-chain/"
      },
      {
        "text": "消息",
        "link": "/pages/rule-chain-message/"
      },
      {
        "text": "规则节点",
        "link": "/pages/rule-node/"
      },
      {
        "text": "Relation Type",
        "link": "/pages/relation-type/"
      }
    ]
  },
  {
    "text": "标准组件",
    "collapsed": true,
    "items": [
      {
        "text": "标准组件概述",
        "link": "/pages/standard-components/"
      },
      {
        "text": "公共组件",
        "collapsed": true,
        "items": [
          {
            "text": "节点引用",
            "link": "/pages/ref/"
          },
          {
            "text": "节点组",
            "link": "/pages/group-action/"
          },
          {
            "text": "迭代器",
            "link": "/pages/iterator/"
          },
          {
            "text": "遍历",
            "link": "/pages/for/"
          },
          {
            "text": "并行网关",
            "link": "/pages/fork/"
          },
          {
            "text": "汇聚",
            "link": "/pages/join/"
          },
          {
            "text": "条件分支",
            "link": "/pages/switch/"
          },
          {
            "text": "包容分支",
            "link": "/pages/inclusive/"
          },
          {
            "text": "中断（break）",
            "link": "/pages/break/"
          },
          {
            "text": "While循环",
            "link": "/pages/while/"
          },
          {
            "text": "结束节点",
            "link": "/pages/end/"
          }
        ]
      },
      {
        "text": "过滤器",
        "collapsed": true,
        "items": [
          {
            "text": "js脚本过滤器",
            "link": "/pages/js-filter/"
          },
          {
            "text": "字段过滤器",
            "link": "/pages/field-filter/"
          },
          {
            "text": "消息路由",
            "link": "/pages/msg-type-switch/"
          },
          {
            "text": "js脚本路由",
            "link": "/pages/js-switch/"
          },
          {
            "text": "过滤器组",
            "link": "/pages/group-filter/"
          },
          {
            "text": "表达式过滤器",
            "link": "/pages/expr-filter/"
          }
        ]
      },
      {
        "text": "动作",
        "collapsed": true,
        "items": [
          {
            "text": "记录日志",
            "link": "/pages/log/"
          },
          {
            "text": "函数处理",
            "link": "/pages/functions/"
          },
          {
            "text": "延迟",
            "link": "/pages/delay/"
          },
          {
            "text": "命令",
            "link": "/pages/exec/"
          },
          {
            "text": "获取节点输出",
            "link": "/pages/fetch-node-output/"
          }
        ]
      },
      {
        "text": "转换器",
        "collapsed": true,
        "items": [
          {
            "text": "脚本转换器",
            "link": "/pages/js-transform/"
          },
          {
            "text": "表达式转换器",
            "link": "/pages/expr-transform/"
          },
          {
            "text": "元数据转换器",
            "link": "/pages/metadata-transform/"
          },
          {
            "text": "模板解析器",
            "link": "/pages/template/"
          }
        ]
      },
      {
        "text": "外部的",
        "collapsed": true,
        "items": [
          {
            "text": "HTTP客户端",
            "link": "/pages/rest-api-call/"
          },
          {
            "text": "MQTT客户端",
            "link": "/pages/mqtt-client/"
          },
          {
            "text": "发送邮件",
            "link": "/pages/send-mail/"
          },
          {
            "text": "数据库客户端",
            "link": "/pages/db-client/"
          },
          {
            "text": "ssh",
            "link": "/pages/ssh/"
          },
          {
            "text": "TCP/UDP客户端",
            "link": "/pages/net/"
          },
          {
            "text": "WebSocket客户端",
            "link": "/pages/ws/"
          },
          {
            "text": "缓存设置",
            "link": "/pages/cache-set/"
          },
          {
            "text": "缓存获取",
            "link": "/pages/cache-get/"
          },
          {
            "text": "缓存删除",
            "link": "/pages/cache-delete/"
          }
        ]
      },
      {
        "text": "流",
        "collapsed": true,
        "items": [
          {
            "text": "子规则链",
            "link": "/pages/sub-rule-chain/"
          }
        ]
      }
    ]
  },
  {
    "text": "扩展组件",
    "collapsed": true,
    "items": [
      {
        "text": "扩展组件概述",
        "link": "/pages/extension-overview/"
      },
      {
        "text": "过滤器",
        "collapsed": true,
        "items": [
          {
            "text": "lua脚本过滤器",
            "link": "/pages/lua-filter/"
          }
        ]
      },
      {
        "text": "动作",
        "collapsed": true,
        "items": [
          {
            "text": "Python脚本节点",
            "link": "/pages/python-node/"
          }
        ]
      },
      {
        "text": "转换器",
        "collapsed": true,
        "items": [
          {
            "text": "lua脚本转换器",
            "link": "/pages/lua-transform/"
          }
        ]
      },
      {
        "text": "外部的",
        "collapsed": true,
        "items": [
          {
            "text": "redis客户端",
            "link": "/pages/redis-client/"
          },
          {
            "text": "kafka客户端",
            "link": "/pages/kafka-producer/"
          },
          {
            "text": "nats客户端",
            "link": "/pages/nats-client/"
          },
          {
            "text": "rabbitmq客户端",
            "link": "/pages/rabbitmq-client/"
          },
          {
            "text": "opengemini写客户端",
            "link": "/pages/opengemini-write/"
          },
          {
            "text": "opengemini读客户端",
            "link": "/pages/opengemini-query/"
          },
          {
            "text": "MongoDB户端",
            "link": "/pages/mongodb-client/"
          },
          {
            "text": "redis发布",
            "link": "/pages/redis-pub/"
          },
          {
            "text": "gRPC客户端",
            "link": "/pages/grpc-client/"
          },
          {
            "text": "OpenTelemetry",
            "link": "/pages/open-telemetry/"
          },
          {
            "text": "BeanstalkdWorker",
            "link": "/pages/beanstalkd-worker/"
          },
          {
            "text": "BeanstalkdTube",
            "link": "/pages/beanstalkd-tube/"
          },
          {
            "text": "WukongimSender",
            "link": "/pages/wukongim-sender/"
          },
          {
            "text": "NSQ客户端",
            "link": "/pages/nsq-client/"
          },
          {
            "text": "Pulsar客户端",
            "link": "/pages/pulsar-client/"
          },
          {
            "text": "邮件接收",
            "link": "/pages/receive-email/"
          }
        ]
      },
      {
        "text": "AI 组件",
        "collapsed": true,
        "items": [
          {
            "text": "智能体",
            "link": "/pages/ai-agent/"
          },
          {
            "text": "LLM",
            "link": "/pages/llm/"
          },
          {
            "text": "图像生成",
            "link": "/pages/create-image/"
          },
          {
            "text": "意图识别",
            "link": "/pages/ai-intent/"
          },
          {
            "text": "本地意图识别",
            "link": "/pages/ai-local-intent/"
          },
          {
            "text": "MCP 客户端",
            "link": "/pages/ai-mcp-client/"
          },
          {
            "text": "MCP 服务端",
            "link": "/pages/ai-mcp-server/"
          },
          {
            "text": "Jev 决策",
            "link": "/pages/ai-jev/"
          },
          {
            "text": "Jev 过滤",
            "link": "/pages/ai-jev-filter/"
          }
        ]
      },
      {
        "text": "CI",
        "collapsed": true,
        "items": [
          {
            "text": "git拉取",
            "link": "/pages/ci-git-clone/"
          },
          {
            "text": "git 提交",
            "link": "/pages/ci-git-commit/"
          },
          {
            "text": "git创建标签",
            "link": "/pages/ci-git-create-tag/"
          },
          {
            "text": "git推送",
            "link": "/pages/ci-git-push/"
          },
          {
            "text": "git 日志",
            "link": "/pages/ci-git-log/"
          },
          {
            "text": "服务器指标监控",
            "link": "/pages/ci-server-monitoring/"
          }
        ]
      },
      {
        "text": "IoT",
        "collapsed": true,
        "items": [
          {
            "text": "IoT 组件概览",
            "link": "/pages/iot-overview/"
          },
          {
            "text": "OPC_UA订阅",
            "link": "/pages/opcua-subscription/"
          },
          {
            "text": "OPC_UA Read",
            "link": "/pages/x-opcua-read/"
          },
          {
            "text": "时序数据库写",
            "link": "/pages/x-tsdb-write/"
          },
          {
            "text": "控制定时器",
            "link": "/pages/x-control-timer/"
          },
          {
            "text": "SNMP 告警端点",
            "link": "/pages/endpoint-snmp/"
          },
          {
            "text": "OPC_UA Write",
            "link": "/pages/x-opcua-write/"
          },
          {
            "text": "时序数据库查",
            "link": "/pages/x-tsdb-query/"
          },
          {
            "text": "控制看门狗",
            "link": "/pages/x-control-watchdog/"
          },
          {
            "text": "Modbus 从站端点",
            "link": "/pages/endpoint-modbus-server/"
          },
          {
            "text": "Modbus Node",
            "link": "/pages/x-modbus/"
          },
          {
            "text": "InfluxDB 写",
            "link": "/pages/x-influxdb-write/"
          },
          {
            "text": "HJ212 接收端点",
            "link": "/pages/endpoint-hj212/"
          },
          {
            "text": "串口通信",
            "link": "/pages/x-serial/"
          },
          {
            "text": "InfluxDB 查",
            "link": "/pages/x-influxdb-query/"
          },
          {
            "text": "S7 读",
            "link": "/pages/x-s7-read/"
          },
          {
            "text": "TDengine 写",
            "link": "/pages/x-tdengine-write/"
          },
          {
            "text": "S7 写",
            "link": "/pages/x-s7-write/"
          },
          {
            "text": "TDengine 查",
            "link": "/pages/x-tdengine-query/"
          },
          {
            "text": "EtherNet/IP 读",
            "link": "/pages/x-eip-read/"
          },
          {
            "text": "TimescaleDB 写",
            "link": "/pages/x-timescaledb-write/"
          },
          {
            "text": "EtherNet/IP 写",
            "link": "/pages/x-eip-write/"
          },
          {
            "text": "TimescaleDB 查",
            "link": "/pages/x-timescaledb-query/"
          },
          {
            "text": "SNMP 读",
            "link": "/pages/x-snmp-read/"
          },
          {
            "text": "Prometheus Remote Write",
            "link": "/pages/x-promremote-write/"
          },
          {
            "text": "SNMP 写",
            "link": "/pages/x-snmp-write/"
          },
          {
            "text": "Modbus 点位读",
            "link": "/pages/x-modbus-read/"
          },
          {
            "text": "Modbus 点位写",
            "link": "/pages/x-modbus-write/"
          },
          {
            "text": "通用采集读",
            "link": "/pages/x-iot-read/"
          },
          {
            "text": "IoT 写",
            "link": "/pages/x-iot-write/"
          },
          {
            "text": "IEC 104 读",
            "link": "/pages/x-iec104-read/"
          },
          {
            "text": "IEC 104 写",
            "link": "/pages/x-iec104-write/"
          },
          {
            "text": "BACnet 读",
            "link": "/pages/x-bacnet-read/"
          },
          {
            "text": "BACnet 写",
            "link": "/pages/x-bacnet-write/"
          },
          {
            "text": "FINS 读",
            "link": "/pages/x-fins/"
          },
          {
            "text": "FINS 写",
            "link": "/pages/x-fins-write/"
          },
          {
            "text": "MC Node",
            "link": "/pages/x-mc/"
          },
          {
            "text": "MC 读",
            "link": "/pages/x-mc-read/"
          },
          {
            "text": "MC 写",
            "link": "/pages/x-mc-write/"
          },
          {
            "text": "DL/T 645 Node",
            "link": "/pages/x-dlt645/"
          },
          {
            "text": "DL/T 645 读",
            "link": "/pages/x-dlt645-read/"
          },
          {
            "text": "IoT 场景示例",
            "link": "/pages/iot-scenarios/"
          },
          {
            "text": "DL/T 645 写",
            "link": "/pages/x-dlt645-write/"
          }
        ]
      },
      {
        "text": "流式计算",
        "collapsed": true,
        "items": [
          {
            "text": "流式计算",
            "link": "/pages/stream-computing/"
          },
          {
            "text": "流聚合器",
            "link": "/pages/x-stream-aggregator/"
          },
          {
            "text": "流转换器",
            "link": "/pages/x-stream-transform/"
          }
        ]
      },
      {
        "text": "服务发现",
        "collapsed": true,
        "items": [
          {
            "text": "服务发现组件概览",
            "link": "/pages/discovery-overview/"
          },
          {
            "text": "Nacos 服务调用",
            "link": "/pages/x-nacos-service-call/"
          },
          {
            "text": "Nacos 配置获取",
            "link": "/pages/x-nacos-config-get/"
          },
          {
            "text": "Nacos 配置监听端点",
            "link": "/pages/endpoint-nacos/"
          },
          {
            "text": "Nacos 配置写入",
            "link": "/pages/x-nacos-config-set/"
          }
        ]
      },
      {
        "text": "文件",
        "collapsed": true,
        "items": [
          {
            "text": "文件组件",
            "link": "/pages/file/"
          }
        ]
      }
    ]
  },
  {
    "text": "自定义组件",
    "collapsed": true,
    "items": [
      {
        "text": "自定义组件概述",
        "link": "/pages/custom-components-overview/"
      },
      {
        "text": "组件可视化配置",
        "link": "/pages/custom-component-visual/"
      }
    ]
  },
  {
    "text": "组件市场",
    "collapsed": true,
    "items": [
      {
        "text": "动态组件",
        "link": "/pages/marketplace/"
      },
      {
        "text": "动态组件安装",
        "link": "/pages/dc-install/"
      },
      {
        "text": "动态组件发布",
        "link": "/pages/dc-publish/"
      }
    ]
  },
  {
    "text": "可视化",
    "collapsed": true,
    "items": [
      {
        "text": "可视化二次开发概述",
        "link": "/pages/visualization-overview/"
      },
      {
        "text": "获取组件配置表单",
        "link": "/pages/get-component-form/"
      },
      {
        "text": "组件配置表单约定",
        "link": "/pages/component-form-conventions/"
      },
      {
        "text": "获取规则链配置",
        "link": "/pages/get-rule-chain-config/"
      },
      {
        "text": "获取规则链节点配置",
        "link": "/pages/get-rule-node-config/"
      },
      {
        "text": "批量初始化规则链",
        "link": "/pages/batch-init-rule-chains/"
      },
      {
        "text": "删除规则链实例",
        "link": "/pages/delete-rule-chain-instance/"
      },
      {
        "text": "保存规则链坐标信息",
        "link": "/pages/save-rule-chain-layout/"
      }
    ]
  },
  {
    "text": "AOP",
    "collapsed": true,
    "items": [
      {
        "text": "AOP概述",
        "link": "/pages/aop-overview/"
      },
      {
        "text": "Before 增强点",
        "link": "/pages/before-advice/"
      },
      {
        "text": "After 增强点",
        "link": "/pages/after-advice/"
      },
      {
        "text": "Around 增强点",
        "link": "/pages/around-advice/"
      },
      {
        "text": "Start 增强点",
        "link": "/pages/start-advice/"
      },
      {
        "text": "End 增强点",
        "link": "/pages/end-advice/"
      },
      {
        "text": "Completed 增强点",
        "link": "/pages/completed-advice/"
      },
      {
        "text": "OnChainBeforeInit 增强点",
        "link": "/pages/on-chain-before-init-advice/"
      },
      {
        "text": "OnNodeBeforeInit 增强点",
        "link": "/pages/on-node-before-init-advice/"
      },
      {
        "text": "OnCreated 增强点",
        "link": "/pages/on-created-advice/"
      },
      {
        "text": "OnReload 增强点",
        "link": "/pages/on-reload-advice/"
      },
      {
        "text": "OnDestroy 增强点",
        "link": "/pages/on-destroy-advice/"
      },
      {
        "text": "内置切片",
        "collapsed": true,
        "items": [
          {
            "text": "节点调试切面",
            "link": "/pages/debug-aspect/"
          },
          {
            "text": "节点故障降级切面",
            "link": "/pages/fallback-aspect/"
          },
          {
            "text": "指标统计切面",
            "link": "/pages/metrics-aspect/"
          },
          {
            "text": "并发限制切面",
            "link": "/pages/limiter-aspect/"
          },
          {
            "text": "规则链初始化校验器切面",
            "link": "/pages/validator-aspect/"
          }
        ]
      }
    ]
  },
  {
    "text": "触发器",
    "collapsed": true,
    "items": [
      {
        "text": "触发器",
        "link": "/pages/trigger-overview/"
      }
    ]
  },
  {
    "text": "高级主题",
    "collapsed": true,
    "items": [
      {
        "text": "Config",
        "link": "/pages/config/"
      },
      {
        "text": "Options",
        "link": "/pages/options/"
      },
      {
        "text": "共享数据",
        "link": "/pages/share-data/"
      },
      {
        "text": "执行规则链",
        "link": "/pages/execute-rule-chain/"
      },
      {
        "text": "组件配置变量",
        "link": "/pages/component-configuration-variables/"
      },
      {
        "text": "组件连接复用",
        "link": "/pages/component-connection-reuse/"
      },
      {
        "text": "性能",
        "link": "/pages/performance/"
      },
      {
        "text": "至多一次执行",
        "link": "/pages/locker/"
      }
    ]
  },
  {
    "text": "智能体框架",
    "collapsed": true,
    "items": [
      {
        "text": "AI 智能体开发框架概述",
        "link": "/pages/ai-agent-overview/"
      },
      {
        "text": "架构设计",
        "link": "/pages/ai-agent-architecture/"
      },
      {
        "text": "智能体节点",
        "link": "/pages/ai-agent-node/"
      },
      {
        "text": "工具系统",
        "link": "/pages/ai-agent-tools/"
      },
      {
        "text": "切面框架（Aspect）",
        "link": "/pages/ai-agent-aspect/"
      },
      {
        "text": "会话管理（Session）",
        "link": "/pages/ai-agent-session/"
      },
      {
        "text": "开发指南",
        "link": "/pages/ai-agent-guide/"
      },
      {
        "text": "智能体编排案例",
        "link": "/pages/ai-agent-orchestration/"
      },
      {
        "text": "应用案例：智能助手平台",
        "link": "/pages/ai-agent-case-study/"
      }
    ]
  },
  {
    "text": "RuleGo-Server",
    "collapsed": true,
    "items": [
      {
        "text": "概述与快速开始",
        "link": "/pages/rulego-server/"
      },
      {
        "text": "安装与部署",
        "link": "/pages/rulego-server-install/"
      },
      {
        "text": "用户认证与权限",
        "link": "/pages/rulego-server-auth/"
      },
      {
        "text": "REST API 参考",
        "link": "/pages/rulego-server-api/"
      },
      {
        "text": "MCP 服务",
        "link": "/pages/rulego-server-mcp/"
      },
      {
        "text": "AI 功能",
        "link": "/pages/rulego-server-ai/"
      },
      {
        "text": "组件市场",
        "link": "/pages/rulego-server-marketplace/"
      },
      {
        "text": "运行日志",
        "link": "/pages/rulego-server-runlog/"
      },
      {
        "text": "国际化",
        "link": "/pages/rulego-server-i18n/"
      },
      {
        "text": "二次开发",
        "link": "/pages/rulego-server-development/"
      },
      {
        "text": "分布式部署",
        "link": "/pages/rulego-server-distributed/"
      },
      {
        "text": "规则链部署与调用",
        "link": "/pages/rulego-server-deploy-rule-chain/"
      },
      {
        "text": "可视化编辑器",
        "collapsed": true,
        "items": [
          {
            "text": "可视化编辑器",
            "link": "/pages/rulego-server-editor/"
          },
          {
            "text": "AI 助手使用教程",
            "link": "/pages/rulego-server-ai-tutorial/"
          },
          {
            "text": "调试规则链",
            "link": "/pages/rulego-server-debug/"
          },
          {
            "text": "创建智能体教程",
            "link": "/pages/rulego-server-create-agent/"
          }
        ]
      }
    ]
  },
  {
    "text": "常见问题",
    "collapsed": true,
    "items": [
      {
        "text": "关于规则引擎执行中断恢复",
        "link": "/pages/interrupt-recovery/"
      },
      {
        "text": "FAQ",
        "link": "/pages/faq/"
      },
      {
        "text": "注册gRPC反射服务示例",
        "link": "/pages/grpc-reflection-example/"
      }
    ]
  },
  {
    "text": "Endpoint",
    "collapsed": true,
    "items": [
      {
        "text": "Endpoint概述",
        "link": "/pages/endpoint-overview/"
      },
      {
        "text": "快速入门",
        "link": "/pages/endpoint-quickstart/"
      },
      {
        "text": "路由",
        "link": "/pages/endpoint-router/"
      },
      {
        "text": "DSL",
        "link": "/pages/endpoint-dsl/"
      },
      {
        "text": "API",
        "link": "/pages/endpoint-api/"
      },
      {
        "text": "Options",
        "link": "/pages/endpoint-options/"
      },
      {
        "text": "组件",
        "collapsed": true,
        "items": [
          {
            "text": "Rest Endpoint",
            "link": "/pages/endpoint-rest/"
          },
          {
            "text": "Websocket Endpoint",
            "link": "/pages/endpoint-websocket/"
          },
          {
            "text": "MQTT Endpoint",
            "link": "/pages/endpoint-mqtt/"
          },
          {
            "text": "Schedule Endpoint",
            "link": "/pages/endpoint-schedule/"
          },
          {
            "text": "Net Endpoint",
            "link": "/pages/endpoint-net/"
          },
          {
            "text": "Kafka Endpoint",
            "link": "/pages/endpoint-kafka/"
          },
          {
            "text": "Nats Endpoint",
            "link": "/pages/endpoint-nats/"
          },
          {
            "text": "Redis Sub Endpoint",
            "link": "/pages/endpoint-redis-sub/"
          },
          {
            "text": "Redis Steam Endpoint",
            "link": "/pages/endpoint-redis-stream/"
          },
          {
            "text": "Rabbitmq Endpoint",
            "link": "/pages/endpoint-rabbitmq/"
          },
          {
            "text": "MYSQL CDC Endpoint",
            "link": "/pages/mysql-cdc/"
          },
          {
            "text": "OPC_UA Endpoint",
            "link": "/pages/endpoint-opcua/"
          },
          {
            "text": "GRPC Stream Endpoint",
            "link": "/pages/endpoint-grpc-stream/"
          },
          {
            "text": "Beanstalkd Endpoint",
            "link": "/pages/endpoint-beanstalkd/"
          },
          {
            "text": "Wukongim Endpoint",
            "link": "/pages/endpoint-wukongim/"
          },
          {
            "text": "扩展Endpoint",
            "link": "/pages/endpoint-extension/"
          },
          {
            "text": "NSQ Endpoint",
            "link": "/pages/endpoint-nsq/"
          },
          {
            "text": "Pulsar Endpoint",
            "link": "/pages/endpoint-pulsar/"
          },
          {
            "text": "Net Client Endpoint",
            "link": "/pages/endpoint-net-client/"
          },
          {
            "text": "Websocket Client Endpoint",
            "link": "/pages/endpoint-ws-client/"
          }
        ]
      }
    ]
  },
  {
    "text": "StreamSQL",
    "collapsed": true,
    "items": [
      {
        "text": "概述",
        "link": "/pages/streamsql-overview/"
      },
      {
        "text": "快速开始",
        "link": "/pages/streamsql-quickstart/"
      },
      {
        "text": "核心概念",
        "link": "/pages/streamsql-concepts/"
      },
      {
        "text": "SQL参考",
        "link": "/pages/streamsql-sql/"
      },
      {
        "text": "API参考",
        "link": "/pages/streamsql-api/"
      },
      {
        "text": "RuleGo集成",
        "link": "/pages/streamsql-rulego/"
      },
      {
        "text": "加入社区讨论",
        "link": "/pages/streamsql-community/"
      },
      {
        "text": "Schema 校验",
        "link": "/pages/streamsql-schema/"
      },
      {
        "text": "分析函数",
        "link": "/pages/streamsql-analytic/"
      },
      {
        "text": "进阶示例",
        "link": "/pages/streamsql-advanced-examples/"
      },
      {
        "text": "模式识别（CEP）",
        "link": "/pages/streamsql-cep/"
      },
      {
        "text": "函数",
        "collapsed": true,
        "items": [
          {
            "text": "聚合函数",
            "link": "/pages/streamsql-aggregate-functions/"
          },
          {
            "text": "分析函数",
            "link": "/pages/streamsql-analytical-functions/"
          },
          {
            "text": "窗口函数",
            "link": "/pages/streamsql-window-functions/"
          },
          {
            "text": "数学函数",
            "link": "/pages/streamsql-math-functions/"
          },
          {
            "text": "字符串函数",
            "link": "/pages/streamsql-string-functions/"
          },
          {
            "text": "类型转换函数",
            "link": "/pages/streamsql-conversion-functions/"
          },
          {
            "text": "时间日期函数",
            "link": "/pages/streamsql-datetime-functions/"
          },
          {
            "text": "JSON函数",
            "link": "/pages/streamsql-json-functions/"
          },
          {
            "text": "哈希函数",
            "link": "/pages/streamsql-hash-functions/"
          },
          {
            "text": "数组函数",
            "link": "/pages/streamsql-array-functions/"
          },
          {
            "text": "类型检查函数",
            "link": "/pages/streamsql-type-check-functions/"
          },
          {
            "text": "条件函数",
            "link": "/pages/streamsql-conditional-functions/"
          },
          {
            "text": "多行函数",
            "link": "/pages/streamsql-multirow-functions/"
          },
          {
            "text": "表达式函数",
            "link": "/pages/streamsql-expression-functions/"
          },
          {
            "text": "自定义函数",
            "link": "/pages/streamsql-functions/"
          }
        ]
      },
      {
        "text": "案例集锦",
        "collapsed": true,
        "items": [
          {
            "text": "案例集锦概述",
            "link": "/pages/streamsql-cases-overview/"
          },
          {
            "text": "流表 JOIN 元数据增强",
            "link": "/pages/streamsql-case-join/"
          },
          {
            "text": "会话窗口与设备在线分析",
            "link": "/pages/streamsql-case-session/"
          },
          {
            "text": "变更数据捕获案例",
            "link": "/pages/streamsql-cdc/"
          },
          {
            "text": "滑动窗口与持续检测",
            "link": "/pages/streamsql-case-sliding/"
          },
          {
            "text": "数据过滤与转换",
            "link": "/pages/streamsql-case-filter/"
          },
          {
            "text": "IoT 温度告警与指标聚合",
            "link": "/pages/streamsql-case-iot-temperature/"
          },
          {
            "text": "设备故障模式识别（MATCH_RECOGNIZE）",
            "link": "/pages/streamsql-case-cep/"
          }
        ]
      }
    ]
  },
  {
    "text": "支持与社区",
    "collapsed": true,
    "items": [
      {
        "text": "支持这个项目",
        "link": "/pages/support/"
      },
      {
        "text": "加入社区讨论",
        "link": "/pages/community/"
      }
    ]
  }
]

export const enSidebar: DefaultTheme.Sidebar = [
  {
    "text": "Quick Start",
    "collapsed": true,
    "items": [
      {
        "text": "Introduction",
        "link": "/en/pages/introduction/"
      },
      {
        "text": "Use Cases",
        "link": "/en/pages/use-cases/"
      },
      {
        "text": "Quick Start",
        "link": "/en/pages/quick-start/"
      },
      {
        "text": "Dynamic Refresh Rule Chain",
        "link": "/en/pages/dynamic-refresh/"
      }
    ]
  },
  {
    "text": "Rule Chain",
    "collapsed": true,
    "items": [
      {
        "text": "Rule Chain Overview",
        "link": "/en/pages/rule-chain-overview/"
      },
      {
        "text": "Rule Chain",
        "link": "/en/pages/rule-chain/"
      },
      {
        "text": "Message",
        "link": "/en/pages/rule-chain-message/"
      },
      {
        "text": "Rule Node",
        "link": "/en/pages/rule-node/"
      },
      {
        "text": "Relation Type",
        "link": "/en/pages/relation-type/"
      }
    ]
  },
  {
    "text": "Standard Components",
    "collapsed": true,
    "items": [
      {
        "text": "Standard Components Overview",
        "link": "/en/pages/standard-components/"
      },
      {
        "text": "Common",
        "collapsed": true,
        "items": [
          {
            "text": "Node Reference",
            "link": "/en/pages/ref/"
          },
          {
            "text": "groupAction",
            "link": "/en/pages/group-action/"
          },
          {
            "text": "iterator",
            "link": "/en/pages/iterator/"
          },
          {
            "text": "for",
            "link": "/en/pages/for/"
          },
          {
            "text": "fork",
            "link": "/en/pages/fork/"
          },
          {
            "text": "join",
            "link": "/en/pages/join/"
          },
          {
            "text": "Switch",
            "link": "/en/pages/switch/"
          },
          {
            "text": "Inclusive",
            "link": "/en/pages/inclusive/"
          },
          {
            "text": "Break",
            "link": "/en/pages/break/"
          },
          {
            "text": "While Loop",
            "link": "/en/pages/while/"
          },
          {
            "text": "End Node",
            "link": "/en/pages/end/"
          }
        ]
      },
      {
        "text": "Filter",
        "collapsed": true,
        "items": [
          {
            "text": "jsFilter",
            "link": "/en/pages/js-filter/"
          },
          {
            "text": "fieldFilter",
            "link": "/en/pages/field-filter/"
          },
          {
            "text": "msgTypeSwitch",
            "link": "/en/pages/msg-type-switch/"
          },
          {
            "text": "jsSwitch",
            "link": "/en/pages/js-switch/"
          },
          {
            "text": "groupFilter",
            "link": "/en/pages/group-filter/"
          },
          {
            "text": "exprFilter",
            "link": "/en/pages/expr-filter/"
          }
        ]
      },
      {
        "text": "Action",
        "collapsed": true,
        "items": [
          {
            "text": "log",
            "link": "/en/pages/log/"
          },
          {
            "text": "functions",
            "link": "/en/pages/functions/"
          },
          {
            "text": "delay",
            "link": "/en/pages/delay/"
          },
          {
            "text": "exec",
            "link": "/en/pages/exec/"
          },
          {
            "text": "fetchNodeOutput",
            "link": "/en/pages/fetch-node-output/"
          }
        ]
      },
      {
        "text": "Transform",
        "collapsed": true,
        "items": [
          {
            "text": "jsTransform",
            "link": "/en/pages/js-transform/"
          },
          {
            "text": "exprTransform",
            "link": "/en/pages/expr-transform/"
          },
          {
            "text": "metadataTransform",
            "link": "/en/pages/metadata-transform/"
          },
          {
            "text": "text/template",
            "link": "/en/pages/template/"
          }
        ]
      },
      {
        "text": "External",
        "collapsed": true,
        "items": [
          {
            "text": "restApiCall",
            "link": "/en/pages/rest-api-call/"
          },
          {
            "text": "mqttClient",
            "link": "/en/pages/mqtt-client/"
          },
          {
            "text": "sendEmail",
            "link": "/en/pages/send-mail/"
          },
          {
            "text": "dbClient",
            "link": "/en/pages/db-client/"
          },
          {
            "text": "ssh",
            "link": "/en/pages/ssh/"
          },
          {
            "text": "net",
            "link": "/en/pages/net/"
          },
          {
            "text": "WebSocket Client",
            "link": "/en/pages/ws/"
          },
          {
            "text": "Cache Set",
            "link": "/en/pages/cache-set/"
          },
          {
            "text": "Cache Get",
            "link": "/en/pages/cache-get/"
          },
          {
            "text": "Cache Delete",
            "link": "/en/pages/cache-delete/"
          }
        ]
      },
      {
        "text": "Flow",
        "collapsed": true,
        "items": [
          {
            "text": "Sub Rule Chain",
            "link": "/en/pages/sub-rule-chain/"
          }
        ]
      }
    ]
  },
  {
    "text": "Extension Components",
    "collapsed": true,
    "items": [
      {
        "text": "Extension Components Overview",
        "link": "/en/pages/extension-overview/"
      },
      {
        "text": "Filter",
        "collapsed": true,
        "items": [
          {
            "text": "luaFilter",
            "link": "/en/pages/lua-filter/"
          }
        ]
      },
      {
        "text": "Action",
        "collapsed": true,
        "items": [
          {
            "text": "Python Script Node",
            "link": "/en/pages/python-node/"
          }
        ]
      },
      {
        "text": "Transform",
        "collapsed": true,
        "items": [
          {
            "text": "luaTransform",
            "link": "/en/pages/lua-transform/"
          }
        ]
      },
      {
        "text": "External",
        "collapsed": true,
        "items": [
          {
            "text": "redisClient",
            "link": "/en/pages/redis-client/"
          },
          {
            "text": "kafkaProducer",
            "link": "/en/pages/kafka-producer/"
          },
          {
            "text": "natsClient",
            "link": "/en/pages/nats-client/"
          },
          {
            "text": "rabbitmqClient",
            "link": "/en/pages/rabbitmq-client/"
          },
          {
            "text": "opengeminiWrite",
            "link": "/en/pages/opengemini-write/"
          },
          {
            "text": "opengeminiQuery",
            "link": "/en/pages/opengemini-query/"
          },
          {
            "text": "MongoDB Client",
            "link": "/en/pages/mongodb-client/"
          },
          {
            "text": "Redis Publisher",
            "link": "/en/pages/redis-pub/"
          },
          {
            "text": "grpcClient",
            "link": "/en/pages/grpc-client/"
          },
          {
            "text": "OpenTelemetry",
            "link": "/en/pages/open-telemetry/"
          },
          {
            "text": "BeanstalkdWorker",
            "link": "/en/pages/beanstalkd-worker/"
          },
          {
            "text": "BeanstalkdTube",
            "link": "/en/pages/beanstalkd-tube/"
          },
          {
            "text": "WukongimSender",
            "link": "/en/pages/wukongim-sender/"
          },
          {
            "text": "NSQ Client",
            "link": "/en/pages/nsq-client/"
          },
          {
            "text": "Pulsar Client",
            "link": "/en/pages/pulsar-client/"
          },
          {
            "text": "Receive Email",
            "link": "/en/pages/receive-email/"
          }
        ]
      },
      {
        "text": "AI",
        "collapsed": true,
        "items": [
          {
            "text": "Agent",
            "link": "/en/pages/ai-agent/"
          },
          {
            "text": "LLM",
            "link": "/en/pages/llm/"
          },
          {
            "text": "Create Image",
            "link": "/en/pages/create-image/"
          },
          {
            "text": "Intent Recognition",
            "link": "/en/pages/ai-intent/"
          },
          {
            "text": "Local Intent Recognition",
            "link": "/en/pages/ai-local-intent/"
          },
          {
            "text": "MCP Client",
            "link": "/en/pages/ai-mcp-client/"
          },
          {
            "text": "MCP Server",
            "link": "/en/pages/ai-mcp-server/"
          },
          {
            "text": "Jev Decision",
            "link": "/en/pages/ai-jev/"
          },
          {
            "text": "Jev Filter",
            "link": "/en/pages/ai-jev-filter/"
          }
        ]
      },
      {
        "text": "CI",
        "collapsed": true,
        "items": [
          {
            "text": "gitClone",
            "link": "/en/pages/ci-git-clone/"
          },
          {
            "text": "gitCommit",
            "link": "/en/pages/ci-git-commit/"
          },
          {
            "text": "gitCreateTag",
            "link": "/en/pages/ci-git-create-tag/"
          },
          {
            "text": "gitPush",
            "link": "/en/pages/ci-git-push/"
          },
          {
            "text": "git log",
            "link": "/en/pages/ci-git-log/"
          },
          {
            "text": "Server Metrics Monitoring",
            "link": "/en/pages/ci-server-monitoring/"
          }
        ]
      },
      {
        "text": "IoT",
        "collapsed": true,
        "items": [
          {
            "text": "IoT Components Overview",
            "link": "/en/pages/iot-overview/"
          },
          {
            "text": "OPC_UA Subscribe",
            "link": "/en/pages/opcua-subscription/"
          },
          {
            "text": "OPC_UA Read",
            "link": "/en/pages/x-opcua-read/"
          },
          {
            "text": "TSDB Write Node",
            "link": "/en/pages/x-tsdb-write/"
          },
          {
            "text": "Control Timer",
            "link": "/en/pages/x-control-timer/"
          },
          {
            "text": "HJ212 Endpoint",
            "link": "/en/pages/endpoint-hj212/"
          },
          {
            "text": "SNMP Trap Endpoint",
            "link": "/en/pages/endpoint-snmp/"
          },
          {
            "text": "OPC_UA Write",
            "link": "/en/pages/x-opcua-write/"
          },
          {
            "text": "TSDB Query Node",
            "link": "/en/pages/x-tsdb-query/"
          },
          {
            "text": "InfluxDB Write",
            "link": "/en/pages/x-influxdb-write/"
          },
          {
            "text": "InfluxDB Query",
            "link": "/en/pages/x-influxdb-query/"
          },
          {
            "text": "TDengine Write",
            "link": "/en/pages/x-tdengine-write/"
          },
          {
            "text": "TDengine Query",
            "link": "/en/pages/x-tdengine-query/"
          },
          {
            "text": "TimescaleDB Write",
            "link": "/en/pages/x-timescaledb-write/"
          },
          {
            "text": "TimescaleDB Query",
            "link": "/en/pages/x-timescaledb-query/"
          },
          {
            "text": "Prometheus Remote Write",
            "link": "/en/pages/x-promremote-write/"
          },
          {
            "text": "Control Watchdog",
            "link": "/en/pages/x-control-watchdog/"
          },
          {
            "text": "Modbus Server Endpoint",
            "link": "/en/pages/endpoint-modbus-server/"
          },
          {
            "text": "Modbus Node",
            "link": "/en/pages/x-modbus/"
          },
          {
            "text": "Serial Communication",
            "link": "/en/pages/x-serial/"
          },
          {
            "text": "S7 Read",
            "link": "/en/pages/x-s7-read/"
          },
          {
            "text": "S7 Write",
            "link": "/en/pages/x-s7-write/"
          },
          {
            "text": "EtherNet/IP Read",
            "link": "/en/pages/x-eip-read/"
          },
          {
            "text": "EtherNet/IP Write",
            "link": "/en/pages/x-eip-write/"
          },
          {
            "text": "SNMP Read",
            "link": "/en/pages/x-snmp-read/"
          },
          {
            "text": "SNMP Write",
            "link": "/en/pages/x-snmp-write/"
          },
          {
            "text": "Modbus Read Points Node",
            "link": "/en/pages/x-modbus-read/"
          },
          {
            "text": "Modbus Write Points Node",
            "link": "/en/pages/x-modbus-write/"
          },
          {
            "text": "Universal Acquisition Read",
            "link": "/en/pages/x-iot-read/"
          },
          {
            "text": "IoT Write",
            "link": "/en/pages/x-iot-write/"
          },
          {
            "text": "IEC 104 Read",
            "link": "/en/pages/x-iec104-read/"
          },
          {
            "text": "IEC 104 Write",
            "link": "/en/pages/x-iec104-write/"
          },
          {
            "text": "FINS Read",
            "link": "/en/pages/x-fins-read/"
          },
          {
            "text": "FINS Write",
            "link": "/en/pages/x-fins-write/"
          },
          {
            "text": "MC Node",
            "link": "/en/pages/x-mc/"
          },
          {
            "text": "MC Read",
            "link": "/en/pages/x-mc-read/"
          },
          {
            "text": "MC Write",
            "link": "/en/pages/x-mc-write/"
          },
          {
            "text": "DL/T 645 Node",
            "link": "/en/pages/x-dlt645/"
          },
          {
            "text": "DL/T 645 Read",
            "link": "/en/pages/x-dlt645-read/"
          },
          {
            "text": "IoT Scenarios",
            "link": "/en/pages/iot-scenarios/"
          },
          {
            "text": "DL/T 645 Write",
            "link": "/en/pages/x-dlt645-write/"
          },
          {
            "text": "BACnet Read",
            "link": "/en/pages/x-bacnet-read/"
          },
          {
            "text": "BACnet Write",
            "link": "/en/pages/x-bacnet-write/"
          }
        ]
      },
      {
        "text": "Stream Processing",
        "collapsed": true,
        "items": [
          {
            "text": "Stream Processing",
            "link": "/en/pages/stream-computing/"
          },
          {
            "text": "Stream Aggregator",
            "link": "/en/pages/x-stream-aggregator/"
          },
          {
            "text": "Stream Transformer",
            "link": "/en/pages/x-stream-transform/"
          }
        ]
      },
      {
        "text": "Service Discovery",
        "collapsed": true,
        "items": [
          {
            "text": "Service Discovery Overview",
            "link": "/en/pages/discovery-overview/"
          },
          {
            "text": "Nacos Service Call",
            "link": "/en/pages/x-nacos-service-call/"
          },
          {
            "text": "Nacos Config Listen Endpoint",
            "link": "/en/pages/endpoint-nacos/"
          },
          {
            "text": "Nacos Config Get",
            "link": "/en/pages/x-nacos-config-get/"
          },
          {
            "text": "Nacos Config Set",
            "link": "/en/pages/x-nacos-config-set/"
          }
        ]
      },
      {
        "text": "File",
        "collapsed": true,
        "items": [
          {
            "text": "File Component",
            "link": "/en/pages/file/"
          }
        ]
      }
    ]
  },
  {
    "text": "Custom Components",
    "collapsed": true,
    "items": [
      {
        "text": "Custom Components Overview",
        "link": "/en/pages/custom-components-overview/"
      },
      {
        "text": "Component Visual Configuration",
        "link": "/en/pages/custom-component-visual/"
      }
    ]
  },
  {
    "text": "Components Marketplace",
    "collapsed": true,
    "items": [
      {
        "text": "Dynamic Components",
        "link": "/en/pages/marketplace/"
      },
      {
        "text": "Dynamic Component Installation",
        "link": "/en/pages/dc-install/"
      },
      {
        "text": "Dynamic Component Publishing",
        "link": "/en/pages/dc-publish/"
      }
    ]
  },
  {
    "text": "Visualization",
    "collapsed": true,
    "items": [
      {
        "text": "Visualization Development Overview",
        "link": "/en/pages/visualization-overview/"
      },
      {
        "text": "Get Component Configuration Forms",
        "link": "/en/pages/get-component-form/"
      },
      {
        "text": "Component Form Conventions",
        "link": "/en/pages/component-form-conventions/"
      },
      {
        "text": "Get Rule Chain Configuration",
        "link": "/en/pages/get-rule-chain-config/"
      },
      {
        "text": "Get Rule Chain Node Configuration",
        "link": "/en/pages/get-rule-node-config/"
      },
      {
        "text": "Batch Initialize Rule Chain",
        "link": "/en/pages/batch-init-rule-chains/"
      },
      {
        "text": "Delete Rule Chain Instance",
        "link": "/en/pages/delete-rule-chain-instance/"
      },
      {
        "text": "Save Rule Chain Coordinate Information",
        "link": "/en/pages/save-rule-chain-layout/"
      }
    ]
  },
  {
    "text": "AOP",
    "collapsed": true,
    "items": [
      {
        "text": "AOP Overview",
        "link": "/en/pages/aop-overview/"
      },
      {
        "text": "Before Advice",
        "link": "/en/pages/before-advice/"
      },
      {
        "text": "After Advice",
        "link": "/en/pages/after-advice/"
      },
      {
        "text": "Around Advice",
        "link": "/en/pages/around-advice/"
      },
      {
        "text": "Start Advice",
        "link": "/en/pages/start-advice/"
      },
      {
        "text": "End Advice",
        "link": "/en/pages/end-advice/"
      },
      {
        "text": "Completed Advice",
        "link": "/en/pages/completed-advice/"
      },
      {
        "text": "OnChainBeforeInit Advice",
        "link": "/en/pages/on-chain-before-init-advice/"
      },
      {
        "text": "OnNodeBeforeInit 增强点",
        "link": "/en/pages/on-node-before-init-advice/"
      },
      {
        "text": "OnCreated Advice",
        "link": "/en/pages/on-created-advice/"
      },
      {
        "text": "OnReload Advice",
        "link": "/en/pages/on-reload-advice/"
      },
      {
        "text": "OnDestroy Advice",
        "link": "/en/pages/on-destroy-advice/"
      },
      {
        "text": "Builtin Aspects",
        "collapsed": true,
        "items": [
          {
            "text": "Debug Aspect",
            "link": "/en/pages/debug-aspect/"
          },
          {
            "text": "Fallback Aspect",
            "link": "/en/pages/fallback-aspect/"
          },
          {
            "text": "Metrics Aspect",
            "link": "/en/pages/metrics-aspect/"
          },
          {
            "text": "Concurrency Limiter Aspect",
            "link": "/en/pages/limiter-aspect/"
          },
          {
            "text": "RuleChain Validator Aspect",
            "link": "/en/pages/validator-aspect/"
          }
        ]
      }
    ]
  },
  {
    "text": "Trigger",
    "collapsed": true,
    "items": [
      {
        "text": "Trigger",
        "link": "/en/pages/trigger-overview/"
      }
    ]
  },
  {
    "text": "Advanced Topics",
    "collapsed": true,
    "items": [
      {
        "text": "Config",
        "link": "/en/pages/config/"
      },
      {
        "text": "Options",
        "link": "/en/pages/options/"
      },
      {
        "text": "Share data",
        "link": "/en/pages/share-data/"
      },
      {
        "text": "Execute Rule Chain",
        "link": "/en/pages/execute-rule-chain/"
      },
      {
        "text": "Component Configuration Variables",
        "link": "/en/pages/component-configuration-variables/"
      },
      {
        "text": "Component Connection Reuse",
        "link": "/en/pages/component-connection-reuse/"
      },
      {
        "text": "Performance",
        "link": "/en/pages/performance/"
      },
      {
        "text": "Other",
        "link": "/en/pages/interrupt-recovery/"
      },
      {
        "text": "At-Most-Once Execution",
        "link": "/en/pages/locker/"
      }
    ]
  },
  {
    "text": "Agent Framework",
    "collapsed": true,
    "items": [
      {
        "text": "AI Agent Development Framework Overview",
        "link": "/en/pages/ai-agent-overview/"
      },
      {
        "text": "Architecture Design",
        "link": "/en/pages/ai-agent-architecture/"
      },
      {
        "text": "Agent Node",
        "link": "/en/pages/ai-agent-node/"
      },
      {
        "text": "Tool System",
        "link": "/en/pages/ai-agent-tools/"
      },
      {
        "text": "Aspect Framework (Aspect)",
        "link": "/en/pages/ai-agent-aspect/"
      },
      {
        "text": "Session Management (Session)",
        "link": "/en/pages/ai-agent-session/"
      },
      {
        "text": "Development Guide",
        "link": "/en/pages/ai-agent-guide/"
      },
      {
        "text": "Agent Orchestration Examples",
        "link": "/en/pages/ai-agent-orchestration/"
      },
      {
        "text": "Application Case Study: Smart Assistant Platform",
        "link": "/en/pages/ai-agent-case-study/"
      }
    ]
  },
  {
    "text": "RuleGo-Server",
    "collapsed": true,
    "items": [
      {
        "text": "Overview and Quick Start",
        "link": "/en/pages/rulego-server/"
      },
      {
        "text": "Installation and Deployment",
        "link": "/en/pages/rulego-server-install/"
      },
      {
        "text": "Authentication and Authorization",
        "link": "/en/pages/rulego-server-auth/"
      },
      {
        "text": "REST API Reference",
        "link": "/en/pages/rulego-server-api/"
      },
      {
        "text": "MCP Service",
        "link": "/en/pages/rulego-server-mcp/"
      },
      {
        "text": "AI Features",
        "link": "/en/pages/rulego-server-ai/"
      },
      {
        "text": "Component Marketplace",
        "link": "/en/pages/rulego-server-marketplace/"
      },
      {
        "text": "Run Logs",
        "link": "/en/pages/rulego-server-runlog/"
      },
      {
        "text": "Internationalization",
        "link": "/en/pages/rulego-server-i18n/"
      },
      {
        "text": "Extension Development",
        "link": "/en/pages/rulego-server-development/"
      },
      {
        "text": "Distributed Deployment",
        "link": "/en/pages/rulego-server-distributed/"
      },
      {
        "text": "Deploying and Invoking Rule Chains",
        "link": "/en/pages/rulego-server-deploy-rule-chain/"
      },
      {
        "text": "Visual Editor",
        "collapsed": true,
        "items": [
          {
            "text": "Visual Editor",
            "link": "/en/pages/rulego-server-editor/"
          },
          {
            "text": "AI Assistant Tutorial",
            "link": "/en/pages/rulego-server-ai-tutorial/"
          },
          {
            "text": "Debugging Rule Chains",
            "link": "/en/pages/rulego-server-debug/"
          },
          {
            "text": "Creating an Agent Tutorial",
            "link": "/en/pages/rulego-server-create-agent/"
          }
        ]
      }
    ]
  },
      {
        "text": "FAQ",
        "collapsed": true,
        "items": [
          {
            "text": "FAQ",
            "link": "/en/pages/faq/"
          },
          {
            "text": "Registering a gRPC Reflection Service",
            "link": "/en/pages/grpc-reflection-example/"
          }
        ]
      },
  {
    "text": "Endpoint",
    "collapsed": true,
    "items": [
      {
        "text": "Endpoint Overview",
        "link": "/en/pages/endpoint-overview/"
      },
      {
        "text": "Quick Start",
        "link": "/en/pages/endpoint-quickstart/"
      },
      {
        "text": "Router",
        "link": "/en/pages/endpoint-router/"
      },
      {
        "text": "DSL",
        "link": "/en/pages/endpoint-dsl/"
      },
      {
        "text": "API",
        "link": "/en/pages/endpoint-api/"
      },
      {
        "text": "Options",
        "link": "/en/pages/endpoint-options/"
      },
      {
        "text": "Components",
        "collapsed": true,
        "items": [
          {
            "text": "Rest Endpoint",
            "link": "/en/pages/endpoint-rest/"
          },
          {
            "text": "Websocket Endpoint",
            "link": "/en/pages/endpoint-websocket/"
          },
          {
            "text": "MQTT Endpoint",
            "link": "/en/pages/endpoint-mqtt/"
          },
          {
            "text": "Schedule Endpoint",
            "link": "/en/pages/endpoint-schedule/"
          },
          {
            "text": "Net Endpoint",
            "link": "/en/pages/endpoint-net/"
          },
          {
            "text": "Kafka Endpoint",
            "link": "/en/pages/endpoint-kafka/"
          },
          {
            "text": "Nats Endpoint",
            "link": "/en/pages/endpoint-nats/"
          },
          {
            "text": "Redis Sub Endpoint",
            "link": "/en/pages/endpoint-redis-sub/"
          },
          {
            "text": "Redis Stream Endpoint",
            "link": "/en/pages/endpoint-redis-stream/"
          },
          {
            "text": "Rabbitmq Endpoint",
            "link": "/en/pages/endpoint-rabbitmq/"
          },
          {
            "text": "MYSQL CDC Endpoint",
            "link": "/en/pages/mysql-cdc/"
          },
          {
            "text": "OPC_UA Endpoint",
            "link": "/en/pages/endpoint-opcua/"
          },
          {
            "text": "gRPC Stream Endpoint",
            "link": "/en/pages/endpoint-grpc-stream/"
          },
          {
            "text": "Beanstalkd Endpoint",
            "link": "/en/pages/endpoint-beanstalkd/"
          },
          {
            "text": "Wukongim Endpoint",
            "link": "/en/pages/endpoint-wukongim/"
          },
          {
            "text": "Extend Endpoint",
            "link": "/en/pages/endpoint-extension/"
          },
          {
            "text": "NSQ Endpoint",
            "link": "/en/pages/endpoint-nsq/"
          },
          {
            "text": "Pulsar Endpoint",
            "link": "/en/pages/endpoint-pulsar/"
          },
          {
            "text": "Net Client Endpoint",
            "link": "/en/pages/endpoint-net-client/"
          },
          {
            "text": "Websocket Client Endpoint",
            "link": "/en/pages/endpoint-ws-client/"
          }
        ]
      }
    ]
  },
  {
    "text": "StreamSQL",
    "collapsed": true,
    "items": [
      {
        "text": "Overview",
        "link": "/en/pages/streamsql-overview/"
      },
      {
        "text": "Quick Start",
        "link": "/en/pages/streamsql-quickstart/"
      },
      {
        "text": "Core Concepts",
        "link": "/en/pages/streamsql-concepts/"
      },
      {
        "text": "SQL Reference",
        "link": "/en/pages/streamsql-sql/"
      },
      {
        "text": "API Reference",
        "link": "/en/pages/streamsql-api/"
      },
          {
            "text": "RuleGo Integration",
            "link": "/en/pages/streamsql-rulego/"
          },
          {
            "text": "Join the Community",
            "link": "/en/pages/streamsql-community/"
          },
      {
        "text": "Schema Validation",
        "link": "/en/pages/streamsql-schema/"
      },
      {
        "text": "Analytic Functions",
        "link": "/en/pages/streamsql-analytic/"
      },
      {
        "text": "Advanced Examples",
        "link": "/en/pages/streamsql-advanced-examples/"
      },
      {
        "text": "Pattern Matching (CEP)",
        "link": "/en/pages/streamsql-cep/"
      },
      {
        "text": "Functions",
        "collapsed": true,
        "items": [
          {
            "text": "Aggregate Functions",
            "link": "/en/pages/streamsql-aggregate-functions/"
          },
          {
            "text": "Analytical Functions",
            "link": "/en/pages/streamsql-analytical-functions/"
          },
          {
            "text": "Window Functions",
            "link": "/en/pages/streamsql-window-functions/"
          },
          {
            "text": "Math Functions",
            "link": "/en/pages/streamsql-math-functions/"
          },
          {
            "text": "String Functions",
            "link": "/en/pages/streamsql-string-functions/"
          },
          {
            "text": "Conversion Functions",
            "link": "/en/pages/streamsql-conversion-functions/"
          },
          {
            "text": "DateTime Functions",
            "link": "/en/pages/streamsql-datetime-functions/"
          },
          {
            "text": "JSON Functions",
            "link": "/en/pages/streamsql-json-functions/"
          },
          {
            "text": "Hash Functions",
            "link": "/en/pages/streamsql-hash-functions/"
          },
          {
            "text": "Array Functions",
            "link": "/en/pages/streamsql-array-functions/"
          },
          {
            "text": "Type Check Functions",
            "link": "/en/pages/streamsql-type-check-functions/"
          },
          {
            "text": "Conditional Functions",
            "link": "/en/pages/streamsql-conditional-functions/"
          },
          {
            "text": "Multi-row Functions",
            "link": "/en/pages/streamsql-multirow-functions/"
          },
          {
            "text": "Expression Functions",
            "link": "/en/pages/streamsql-expression-functions/"
          },
          {
            "text": "Custom Functions",
            "link": "/en/pages/streamsql-functions/"
          }
        ]
      },
      {
        "text": "Case Studies",
        "collapsed": true,
        "items": [
          {
            "text": "Case Studies Overview",
            "link": "/en/pages/streamsql-cases-overview/"
          },
          {
            "text": "Stream-Table JOIN Metadata Enrichment",
            "link": "/en/pages/streamsql-case-join/"
          },
          {
            "text": "Session Window and Device Online Analysis",
            "link": "/en/pages/streamsql-case-session/"
          },
          {
            "text": "Change Data Capture Case Study",
            "link": "/en/pages/streamsql-cdc/"
          },
          {
            "text": "Sliding Window and Continuous Detection",
            "link": "/en/pages/streamsql-case-sliding/"
          },
          {
            "text": "Data Filtering and Transformation",
            "link": "/en/pages/streamsql-case-filter/"
          },
          {
            "text": "IoT Temperature Alerting and Metrics Aggregation",
            "link": "/en/pages/streamsql-case-iot-temperature/"
          },
          {
            "text": "Device Fault Pattern Recognition (MATCH_RECOGNIZE)",
            "link": "/en/pages/streamsql-case-cep/"
          }
        ]
      }
    ]
  },
  {
    "text": "Support & Community",
    "collapsed": true,
    "items": [
      {
        "text": "Support this project",
        "link": "/en/pages/support/"
      }
    ]
  }
]
