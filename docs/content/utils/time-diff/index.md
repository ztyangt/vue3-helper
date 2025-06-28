---
outline: deep
---

# TimeDiff <Badge type="tip" text="静态类" />

:::info
提供强大的时间差计算和格式化功能，支持多种输出格式、时间范围校验和人性化显示。
:::

## 核心功能

- **精确时间差计算**：支持年/月/周/日/时/分/秒多种单位
- **灵活输出格式**：对象、数组、短格式、长格式、完整语句
- **时间范围校验**：可设置最早/最晚时间限制
- **人性化显示**：自动生成"3天前"等友好格式
- **严格类型校验**：完整的TypeScript类型定义

## 基本用法

### 计算时间差

```ts
import { TimeDiff } from '@wiit/vue3-helper'

// 计算两个日期的时间差
const diff = TimeDiff.diff('2023-01-01', '2023-02-15')
// 输出: "1个月、2周和1天"

// 使用不同格式
TimeDiff.diff('2023-01-01', '2023-02-15', { format: 'short' })
// 输出: "1m 2w 1d"
```

### 人性化显示

```ts
TimeDiff.humanize('2023-01-01') 
// 如果今天是2023-01-20，输出: "19天前"

TimeDiff.humanize('2023-02-01')
// 输出: "12天后"
```

## API 文档

### TimeDiff.diff()

```ts
static diff(
  date: Date | string | number,
  baseDate?: Date | string | number,
  options?: TimeDiffOptions
): string | string[] | TimeDiffResult
```

#### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `date` | `Date | string | number` | - | 目标日期 |
| `baseDate` | `Date | string | number` | `new Date()` | 基准日期 |
| `options` | `TimeDiffOptions` | `{}` | 配置选项 |

#### 返回值

根据`format`选项返回不同格式：

- `"full"`: 完整字符串 (默认)  
  `"1年2个月3天"`
- `"long"`: 长格式  
  `["1 year", "2 months", "3 days"]`
- `"short"`: 短格式  
  `["1y", "2m", "3d"]`
- `"array"`: 数组格式  
  `["1 year", "2 months", "3 days"]`
- `"object"`: 对象格式  
  `{ year: 1, month: 2, day: 3 }`

### TimeDiff.humanize()

```ts
static humanize(
  date: Date | string | number,
  options?: { range?: TimeRangeOptions }
): string
```

生成人性化的时间差描述，如"3天前"、"2小时后"等。

## 配置选项

### TimeDiffOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `format` | `"full" | "long" | "short" | "array" | "object"` | `"full"` | 输出格式 |
| `units` | `TimeUnit[]` | `["year","month","day","hour","minute","second"]` | 使用的单位 |
| `round` | `boolean` | `true` | 是否取整 |
| `range` | `TimeRangeOptions` | - | 时间范围限制 |

### TimeRangeOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `earliest` | `TimeRangeValue` | - | 最早时间(如"2 days") |
| `latest` | `TimeRangeValue` | - | 最晚时间(如"1 hour") |
| `outOfRangeFormat` | `string | ((date: Date) => string)` | - | 超出范围的格式化方式 |
| `inclusive` | `boolean` | `true` | 是否包含边界值 |

## 高级用法

### 自定义单位

```ts
// 只计算天和小时
TimeDiff.diff(startDate, endDate, {
  units: ['day', 'hour']
})
```

### 时间范围限制

```ts
// 只显示最近7天内的日期
TimeDiff.diff(someDate, {
  range: {
    earliest: '7 days',
    outOfRangeFormat: '超出时间范围'
  }
})
```

### 自定义格式化

```ts
TimeDiff.diff(oldDate, {
  range: {
    latest: '1 year',
    outOfRangeFormat: date => `过期于: ${date.toLocaleDateString()}`
  }
})
```

## 类型定义

```ts
type TimeUnit = "year" | "month" | "week" | "day" | "hour" | "minute" | "second";
type TimeDiffResult = Record<TimeUnit, number>;
type TimeDiffFormat = "full" | "short" | "long" | "object" | "array";
type TimeRangeValue = `${number} ${TimeUnit}` | number;
```

## 实现细节

1. **时间解析**：
   - 自动识别时间戳(10位/13位)
   - 支持ISO格式字符串
   - 严格的错误检查

2. **范围校验**：
   ```ts
   if (earliest && date < now - earliestMs) return false
   if (latest && date > now + latestMs) return false
   ```

3. **多语言支持**：
   - 目前内置中文格式
   - 可通过覆盖方法实现多语言

## 使用示例

### Vue组件集成

```vue
<script setup>
import { TimeDiff } from '@wiit/vue3-helper'

const createdTime = ref('2023-01-15')
const timeAgo = computed(() => TimeDiff.humanize(createdTime.value))
</script>

<template>
  <div>发布于: {{ timeAgo }}</div>
</template>
```

### 自定义格式化

```ts
function formatExpiration(date: Date) {
  const diff = TimeDiff.diff(date, { format: 'object' }) as TimeDiffResult
  
  if (diff.year > 0) return `${diff.year}年${diff.month}个月后过期`
  if (diff.month > 0) return `${diff.month}个月${diff.day}天后过期`
  return `${diff.day}天后过期`
}
```