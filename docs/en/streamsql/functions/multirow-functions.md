---
title: Multi-row Functions
permalink: /pages/streamsql-multirow-functions/
---
# StreamSQL Multi-row Functions

Multi-row functions are used for handling multi-row data.

## UNNEST - Unnest Function
**Syntax**: `unnest(array)`  
**Description**: Expands an array into multiple rows.  
**Incremental Calculation**: Not Supported  

**Example 1 - Expand Simple Array**:
```sql
SELECT unnest(tags) as tag FROM events
```

Input Data:
```json
{
  "id": 1,
  "tags": ["a", "b", "c"]
}
```

Output Result:
```json
{"tag": "a"}
{"tag": "b"}
{"tag": "c"}
```

**Example 2 - Expand Object Array**:
```sql
SELECT unnest(items) FROM orders
```

Input Data:
```json
{
  "order_id": "O001",
  "items": [
    {"product": "apple", "price": 1.5},
    {"product": "banana", "price": 0.8}
  ]
}
```

Output Result:
```json
{"product": "apple", "price": 1.5}
{"product": "banana", "price": 0.8}
```

## 📚 Related Documentation

- [Conditional Functions](/en/pages/streamsql-conditional-functions/) - Learn detailed usage of conditional functions
- [Expression Functions](/en/pages/streamsql-expression-functions/) - Learn detailed usage of expression functions
- [SQL Reference](/en/pages/streamsql-sql/) - View complete SQL syntax reference