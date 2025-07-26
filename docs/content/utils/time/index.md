---
outline: deep
---

# Time 时间工具类

提供日期格式化、人性化时间显示、日期计算等功能的工具类。

## format

### 类型声明

```ts
/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式字符串
 * @returns 格式化后的日期字符串
 */
static format(date: Date | number = new Date(), format: string = "YYYY-MM-DD HH:mm:ss"): string
```

### 使用示例

```ts
import { Time } from '@wiit/vue3-helper'

// 默认格式
Time.format(new Date()) // "2023-01-01 12:00:00"

// 自定义格式
Time.format(new Date(), 'YYYY年MM月DD日') // "2023年01月01日"

// 使用时间戳
Time.format(1672531200000, 'hh:mm:ss A') // "12:00:00 PM"
```

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| date | Date \| number | new Date() | 要格式化的日期对象或时间戳 |
| format | string | "YYYY-MM-DD HH:mm:ss" | 格式字符串，支持多种占位符 |

### 格式占位符

| 占位符 | 说明 |
| ------ | ---- |
| YYYY | 四位年份 |
| YY | 两位年份 |
| MM | 两位月份 (01-12) |
| M | 月份 (1-12) |
| DD | 两位日期 (01-31) |
| D | 日期 (1-31) |
| HH | 24小时制小时 (00-23) |
| H | 24小时制小时 (0-23) |
| hh | 12小时制小时 (01-12) |
| h | 12小时制小时 (1-12) |
| mm | 分钟 (00-59) |
| m | 分钟 (0-59) |
| ss | 秒 (00-59) |
| s | 秒 (0-59) |
| SSS | 毫秒 (000-999) |
| A | 大写的上午/下午 |
| a | 小写的上午/下午 |

## humanize

### 类型声明

```ts
/**
 * 获取人性化时间（带范围限制）
 * @param date 日期对象或时间戳
 * @param options 配置选项
 * @returns 人性化时间字符串或格式化后的日期
 */
static humanize(
  date: Date | number,
  options: {
    now?: Date | number;
    format?: string;
    ranges?: {
      seconds?: number;
      minutes?: number;
      hours?: number;
      days?: number;
      months?: number;
    };
  } = {}
): string
```

### 使用示例

```ts
import { Time } from '@wiit/vue3-helper'

// 默认行为
Time.humanize(new Date(Date.now() - 5000)) // "5秒前"

// 自定义范围和格式
Time.humanize(new Date(2022, 0, 1), {
  now: new Date(2022, 0, 15),
  format: 'MM/DD',
  ranges: {
    days: 10 // 只在10天内显示人性化时间
  }
}) // "01/01" 因为超过了10天范围
```

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| date | Date \| number | - | 要格式化的日期 |
| options | object | {} | 配置选项 |
| options.now | Date \| number | new Date() | 当前时间 |
| options.format | string | "YYYY-MM-DD" | 超出范围时的日期格式 |
| options.ranges | object | 见下表 | 人性化展示的时间范围配置 |

### ranges 默认值

| 范围 | 默认值(秒) | 说明 |
| ---- | ---------- | ---- |
| seconds | 60 | 秒范围 |
| minutes | 3600 | 分钟范围 |
| hours | 86400 | 小时范围 |
| days | 2592000 | 天范围 |
| months | 31536000 | 月范围 |

## diff

### 类型声明

```ts
/**
 * 获取两个日期之间的差值
 * @param date1 第一个日期
 * @param date2 第二个日期，默认为当前时间
 * @returns 差值对象
 */
static diff(
  date1: Date | number,
  date2: Date | number = new Date()
): {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
```

### 使用示例

```ts
import { Time } from '@wiit/vue3-helper'

const start = new Date(2023, 0, 1)
const end = new Date(2023, 0, 2)

Time.diff(start, end)
// 返回: {
//   years: 0,
//   months: 0,
//   days: 1,
//   hours: 24,
//   minutes: 1440,
//   seconds: 86400,
//   milliseconds: 86400000
// }
```

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| date1 | Date \| number | - | 第一个日期 |
| date2 | Date \| number | new Date() | 第二个日期 |

### 返回值

返回包含以下属性的对象：

| 属性 | 类型 | 说明 |
| ---- | ---- | ---- |
| years | number | 相差年数 |
| months | number | 相差月数 |
| days | number | 相差天数 |
| hours | number | 相差小时数 |
| minutes | number | 相差分钟数 |
| seconds | number | 相差秒数 |
| milliseconds | number | 相差毫秒数 |

## add / subtract

### 类型声明

```ts
/**
 * 添加时间
 */
static add(
  date: Date | number,
  value: number,
  unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond"
): Date

/**
 * 减去时间
 */
static subtract(
  date: Date | number,
  value: number,
  unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond"
): Date
```

### 使用示例

```ts
import { Time } from '@wiit/vue3-helper'

const date = new Date(2023, 0, 1)

// 添加时间
Time.add(date, 1, 'day') // 2023-01-02
Time.add(date, 2, 'months') // 2023-03-01

// 减去时间
Time.subtract(date, 1, 'year') // 2022-01-01
```

### 参数

| 参数名 | 类型 | 说明 |
| ------ | ---- | ---- |
| date | Date \| number | 原始日期 |
| value | number | 要添加/减去的值 |
| unit | string | 时间单位，支持: 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond' |

## 其他实用方法

### isValid

```ts
/**
 * 检查日期是否有效
 */
static isValid(date: Date | number): boolean
```

### now

```ts
/**
 * 获取当前时间戳（毫秒）
 */
static now(): number
```

### startOfMonth / endOfMonth

```ts
/**
 * 获取某个月的第一天/最后一天
 */
static startOfMonth(date: Date | number): Date
static endOfMonth(date: Date | number): Date
```

### startOfDay / endOfDay

```ts
/**
 * 获取某天的开始时间/结束时间
 */
static startOfDay(date: Date | number): Date
static endOfDay(date: Date | number): Date
```

### compare

```ts
/**
 * 比较两个日期
 * @returns -1: date1在date2前, 0: 相等, 1: date1在date2后
 */
static compare(date1: Date | number, date2: Date | number): number
```

### isBetween

```ts
/**
 * 检查日期是否在范围内
 */
static isBetween(date: Date | number, start: Date | number, end: Date | number): boolean
```