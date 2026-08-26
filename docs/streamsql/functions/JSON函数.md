---
title: JSON函数
permalink: /pages/streamsql-json-functions/
---
# StreamSQL JSON函数

JSON函数用于处理JSON数据。

## TO_JSON - 转换为JSON函数
**语法**: `to_json(value)`  
**描述**: 将值转换为JSON字符串。  
 
## FROM_JSON - 从JSON解析函数
**语法**: `from_json(json_str)`  
**描述**: 从JSON字符串解析值。  
 
## JSON_EXTRACT - JSON提取函数
**语法**: `json_extract(json_source, path)`  
**描述**: 从JSON字符串、Map或Array中提取指定路径的值。支持嵌套对象和数组索引。

**参数**:
- `json_source`: 输入数据，可以是JSON格式字符串，也可以是Map或Array类型对象
- `path`: 提取路径，支持 `.` 访问字段，`[]` 访问数组索引或Map Key

**示例**:
```sql
-- 提取基本字段
json_extract('{"name": "Alice"}', 'name') -- 返回 "Alice"
json_extract('{"name": "Alice"}', '$.name') -- 返回 "Alice"

-- 提取嵌套字段
json_extract('{"user": {"address": {"city": "New York"}}}', 'user.address.city') -- 返回 "New York"
json_extract('{"user": {"address": {"city": "New York"}}}', '$.user.address.city') -- 返回 "New York"

-- 提取数组元素
json_extract('[10, 20, 30]', '[1]') -- 返回 20
json_extract('[10, 20, 30]', '$[1]') -- 返回 20

-- 复杂嵌套提取
json_extract('{"users": [{"name": "Alice"}, {"name": "Bob"}]}', 'users[1].name') -- 返回 "Bob"
``` 
 
## JSON_VALID - JSON验证函数
**语法**: `json_valid(json_str)`  
**描述**: 验证字符串是否为有效的JSON。  

## JSON_TYPE - JSON类型函数
**语法**: `json_type(json_str)`  
**描述**: 返回JSON值的类型。  

## JSON_LENGTH - JSON长度函数
**语法**: `json_length(json_str)`  
**描述**: 返回JSON数组或对象的长度。  

## 📚 相关文档

- [时间日期函数](/pages/streamsql-datetime-functions/) - 了解时间日期函数的详细用法
- [哈希函数](/pages/streamsql-hash-functions/) - 了解哈希函数的详细用法
- [SQL参考](/pages/streamsql-sql/) - 查看完整的SQL语法参考