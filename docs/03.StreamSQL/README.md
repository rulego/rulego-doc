---
title: StreamSQL 概述
date: 2024-01-15 10:00:00
permalink: /pages/streamsql-overview/
article: false
author: 
  name: StreamSQL
  link: https://github.com/rulego/streamsql
---

# StreamSQL - 轻量级物联网边缘流处理引擎

StreamSQL 是一个基于 Golang 实现的轻量级、基于 SQL 的物联网边缘流处理引擎。它为边缘设备提供实时数据流处理和分析能力，支持复杂的流式查询、窗口函数和自定义函数扩展。

## 🚀 核心特性

### 超轻量设计
- **零外部依赖**：纯 Go 实现，无需安装其他组件
- **内存高效**：低内存占用，适合资源受限的边缘设备
- **快速启动**：秒级启动时间，适合短生命周期应用
- **小体积**：编译后体积小，便于部署

### 完整的SQL支持
- **标准SQL语法**：SELECT、FROM、WHERE、GROUP BY、HAVING、LIMIT
- **嵌套字段访问**：支持点号语法 (`device.info.name`) 访问嵌套结构化数据
- **窗口函数**：滚动窗口、滑动窗口、计数窗口、会话窗口
- **聚合函数**：60+ 内置函数，支持复杂数据分析
- **表达式计算**：支持算术、逻辑、字符串表达式

### 高扩展性
- **自定义函数**：运行时动态注册，无需重启
- **8种函数类型**：数学、字符串、转换、聚合、分析等
- **热插拔**：支持函数的注册、注销和更新
- **RuleGo集成**：与RuleGo生态系统无缝集成

### 高性能处理
- **流式处理**：实时数据处理，低延迟响应
- **窗口优化**：高效的时间窗口管理
- **并发安全**：多协程并发处理
- **性能模式**：支持高性能、低延迟、零数据丢失等多种模式

## 📊 应用场景

### ✅ 适合场景
- **工业物联网**：设备数据实时监控和分析
- **智能建筑**：传感器数据聚合和告警
- **车联网**：车辆数据流处理和分析
- **边缘计算**：本地数据预处理和过滤
- **实时告警**：基于阈值的实时监控告警
- **数据清洗**：实时数据格式转换和标准化

### 🎯 解决的问题
- **资源受限环境**：在边缘设备上进行复杂数据分析
- **实时性要求**：毫秒级数据处理响应
- **部署复杂度**：简化流处理系统的部署和维护
- **学习成本**：使用熟悉的SQL语法降低开发门槛

## 🚀 5分钟快速开始

### 安装

```bash
go get github.com/rulego/streamsql
```

### 第一个程序 - 实时数据过滤

```go
package main

import (
    "fmt"
    "time"
    "github.com/rulego/streamsql"
)

func main() {
    // 创建StreamSQL实例
    ssql := streamsql.New()
    defer ssql.Stop()
    
    // 定义SQL查询 - 过滤高温数据
    sql := "SELECT deviceId, temperature FROM stream WHERE temperature > 30"
    
    // 执行SQL
    err := ssql.Execute(sql)
    if err != nil {
        panic(err)
    }
    
    // 添加结果处理
    ssql.Stream().AddSink(func(result interface{}) {
        fmt.Printf("高温告警: %v\n", result)
    })
    
    // 发送测试数据
    ssql.AddData(map[string]interface{}{
        "deviceId": "sensor001",
        "temperature": 35.5, // 触发告警
    })
    
    time.Sleep(1 * time.Second)
}
```

### 窗口聚合示例

```go
// 每5秒计算平均温度
sql := `SELECT deviceId, 
               AVG(temperature) as avg_temp,
               window_start() as start_time
        FROM stream 
        WHERE temperature > 0
        GROUP BY deviceId, TumblingWindow('5s')`
```

## 📖 文档导航

本文档将指导您从零开始学习和使用StreamSQL：

### 基础入门
1. **[概述](01.概述/)** - 了解StreamSQL的架构和设计理念
2. **[快速开始](02.快速开始/)** - 5分钟上手指南和基础示例
3. **[核心概念](03.核心概念/)** - 理解流处理的基本概念

### 功能参考
4. **[SQL参考](04.SQL参考/)** - 完整的SQL语法参考手册
5. **[窗口函数](05.窗口函数/)** - 时间窗口的使用方法和最佳实践
6. **[自定义函数](06.自定义函数/)** - 扩展您的数据处理能力

### 实践指南
7. **[示例集合](07.示例/)** - 丰富的实际应用案例
8. **[API参考](08.API参考/)** - 完整的API文档和接口说明
9. **[最佳实践](09.最佳实践/)** - 生产环境使用建议和性能优化

## 🔗 相关资源

- **GitHub仓库**: [github.com/rulego/streamsql](https://github.com/rulego/streamsql)
- **RuleGo项目**: [github.com/rulego/rulego](https://github.com/rulego/rulego)
- **问题反馈**: [GitHub Issues](https://github.com/rulego/streamsql/issues)
- **社区讨论**: [GitHub Discussions](https://github.com/rulego/streamsql/discussions)

## 🤝 社区支持

如果您在使用过程中遇到问题，欢迎通过以下方式获取帮助：

- 📝 [提交Issue](https://github.com/rulego/streamsql/issues/new)
- 💬 [参与讨论](https://github.com/rulego/streamsql/discussions)
- 📚 查阅本文档的详细章节
- 🔍 查看[示例代码](07.示例/)

---

**下一步**: 建议从 [概述](01.概述/) 开始，了解StreamSQL的核心架构和设计理念。