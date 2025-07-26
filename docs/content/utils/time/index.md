---
outline: deep
---

# Time 时间工具类

提供日期格式化、人性化时间展示、日期计算等功能的工具类。

## format

### 类型声明

```ts
/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式字符串，支持以下占位符：
 *   YYYY - 四位年份
 *   YY - 两位年份
 *   MM - 两位月份 (01-12)
 *   M - 月份 (1-12)
 *   DD - 两位日期 (01-31)
 *   D - 日期 (1-31)
 *   HH - 24小时制小时 (00-23)
 *   H - 24小时制小时 (0-23)
 *   hh - 12小时制小时 (01-12)
 *   h - 12小时制小时 (1-12)
 *   mm - 分钟 (00-59)
 *   m - 分钟 (0-59)
 *   ss - 秒 (00-59)
 *   s - 秒 (0-59)
 *   SSS - 毫秒 (000-999)
 *   A - 大写的上午/下午
 *   a - 小写的上午/下午
 * @returns 格式化后的日期字符串
 */
static format(date: Date | number = new Date(), format: string = "YYYY-MM-DD HH:mm:ss"): string
```

### 使用示例

```ts
import { Time } from '@wiit/vue3-helper'

// 默认格式
Time.format(new Date()) // "2023-07-20 14:30:00"

// 自定义格式
Time.format(new Date(), 'YYYY年MM月DD日') // "2023年07月20日"

// 使用时间戳
Time.format(1689840000000, 'hh:mm A') // "12:00 PM"
```

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| date | Date \| number | new Date() | 要格式化的日期对象或时间戳 |
| format | string | "YYYY-MM-DD HH:mm:ss" | 格式字符串 |

### 返回值

| 类型 | 说明 |
| ---- | ---- |
| string | 格式化后的日期字符串 |

## humanize

### 类型声明

```ts
/**
 * 人性化时间展示
 * @param date 日期对象或时间戳
 * @param options 配置选项
 * @returns 人性化时间字符串或格式化后的时间字符串
 */
static humanize(
  date: Date | number,
  options: {
    /**
     * 范围阈值（毫秒），在此范围内的时间会显示为相对时间
     * 默认值：7天（604800000毫秒）
     */
    threshold?: number;
    /**
     * 超出范围后的格式化字符串
     * 默认值："YYYY-MM-DD"
     */
    defaultFormat?: string;
    /**
     * 当前时间，默认为 new Date()
     */
    now?: Date | number;
    /**
     * 是否显示相对时间的后缀（如"前"、"后"）
     * 默认值：true
     */
    showSuffix?: boolean;
  } = {}
): string
```

### 使用示例

```ts
import { Time } from '@wiit/vue3-helper'

// 默认设置
Time.humanize(new Date(Date.now() - 3600000)) // "1小时前"

// 自定义阈值和格式
Time.humanize(new Date(2020, 0, 1), {
  threshold: 365 * 86400 * 1000, // 1年
  defaultFormat: 'YYYY年MM月DD日'
}) // "2020年01月01日"

// 不显示后缀
Time.humanize(new Date(Date.now() - 120000), { showSuffix: false }) // "2分钟"
```

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| date | Date \| number | - | 要格式化的日期对象或时间戳 |
| options | object | {} | 配置选项 |
| options.threshold | number | 604800000 (7天) | 显示相对时间的最大时间差(毫秒) |
| options.defaultFormat | string | "YYYY-MM-DD" | 超出阈值后的日期格式 |
| options.now | Date \| number | new Date() | 当前时间参考点 |
| options.showSuffix | boolean | true | 是否显示"前/后"后缀 |

### 返回值

| 类型 | 说明 |
| ---- | ---- |
| string | 人性化时间字符串 |

## diff

### 类型声明

```ts
/**
 * 获取两个日期之间的差值
 * @param date1 第一个日期
 * @param date2 第二个日期，默认为当前时间
 * @returns 差值对象，包含年、月、日、小时、分钟、秒、毫秒，带有符号表示方向
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

const date1 = new Date(2023, 0, 1)
const date2 = new Date(2023, 6, 1)

const difference = Time.diff(date1, date2)
/*
{
  years: 0,
  months: 6,
  days: 181,
  hours: 4344,
  minutes: 260640,
  seconds: 15638400,
  milliseconds: 15638400000
}
*/
```

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| date1 | Date \| number | - | 第一个日期 |
| date2 | Date \| number | new Date() | 第二个日期 |

### 返回值

| 类型 | 说明 |
| ---- | ---- |
| object | 包含各时间单位差值的对象，正数表示date2较晚 |

## add / subtract

### 类型声明

```ts
/**
 * 添加时间
 * @param date 原始日期
 * @param value 要添加的值
 * @param unit 时间单位 ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond')
 * @returns 新的Date对象
 */
static add(date: Date | number, value: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond"): Date

/**
 * 减去时间
 * @param date 原始日期
 * @param value 要减去的值
 * @param unit 时间单位 ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond')
 * @returns 新的Date对象
 */
static subtract(date: Date | number, value: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond"): Date
```

### 使用示例

```ts
import { Time } from '@wiit/vue3-helper'

// 添加时间
Time.add(new Date(), 1, 'day') // 明天此时
Time.add(new Date(2023, 0, 31), 1, 'month') // 2023-02-28 (自动处理月末)

// 减去时间
Time.subtract(new Date(), 2, 'hours') // 两小时前
```

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| date | Date \| number | - | 原始日期 |
| value | number | - | 要加减的值 |
| unit | string | - | 时间单位 |

### 返回值

| 类型 | 说明 |
| ---- | ---- |
| Date | 计算后的新日期对象 |

## 其他实用方法

### startOfMonth / endOfMonth

```ts
/**
 * 获取某个月的第一天
 * @param date 日期对象或时间戳
 * @returns 该月第一天的Date对象
 */
static startOfMonth(date: Date | number): Date

/**
 * 获取某个月的最后一天
 * @param date 日期对象或时间戳
 * @returns 该月最后一天的Date对象
 */
static endOfMonth(date: Date | number): Date
```

### startOfDay / endOfDay

```ts
/**
 * 获取某天的开始时间（00:00:00.000）
 * @param date 日期对象或时间戳
 * @returns 该天开始的Date对象
 */
static startOfDay(date: Date | number): Date

/**
 * 获取某天的结束时间（23:59:59.999）
 * @param date 日期对象或时间戳
 * @returns 该天结束的Date对象
 */
static endOfDay(date: Date | number): Date
```

### compare / isBetween

```ts
/**
 * 比较两个日期
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 比较结果：-1(date1早), 0(相等), 1(date1晚)
 */
static compare(date1: Date | number, date2: Date | number): number

/**
 * 检查日期是否在范围内
 * @param date 要检查的日期
 * @param start 范围开始日期
 * @param end 范围结束日期
 * @returns 是否在范围内
 */
static isBetween(date: Date | number, start: Date | number, end: Date | number): boolean
```

### isValid / now

```ts
/**
 * 检查日期是否有效
 * @param date 日期对象或时间戳
 * @returns 是否有效
 */
static isValid(date: Date | number): boolean

/**
 * 获取当前时间戳（毫秒）
 * @returns 当前时间戳
 */
static now(): number
```