import type { TimeUnit, TimeDiffOptions, TimeRangeOptions, TimeRangeValue, TimeDiffResult } from "./types";

const TIME_UNITS: Record<TimeUnit, number> = {
  year: 31536000000, // 365 days
  month: 2592000000, // 30 days
  week: 604800000,
  day: 86400000,
  hour: 3600000,
  minute: 60000,
  second: 1000,
};

export class TimeDiff {
  /**
   * 计算时间差或格式化日期
   * @param date 目标日期
   * @param baseDate 基准日期（默认当前时间）
   * @param options 配置选项
   * @returns 时间差结果或格式化后的日期字符串
   */
  static diff(
    date: Date | string | number,
    baseDate: Date | string | number = new Date(),
    options: TimeDiffOptions = {}
  ): string | string[] | TimeDiffResult | Record<string, number> {
    const targetDate = this.parseDate(date);
    const referenceDate = this.parseDate(baseDate);
    const now = referenceDate.getTime();

    // 检查时间范围
    if (options.range) {
      const isInRange = this.checkRelativeTimeRange(targetDate, now, options.range);
      if (!isInRange) {
        return this.formatOutOfRange(targetDate, options.range.outOfRangeFormat);
      }
    }

    // 计算时间差
    return this.calculateTimeDiff(targetDate, referenceDate, options);
  }

  /**
   * 解析时间范围值为毫秒
   * @param value 时间范围值
   * @returns 毫秒数
   */
  private static parseTimeRangeValue(value: TimeRangeValue): number {
    if (typeof value === "number") return value;

    const [amountStr, unit] = value.split(" ") as [string, TimeUnit];
    const amount = parseFloat(amountStr);

    if (isNaN(amount) || !TIME_UNITS[unit]) {
      throw new Error(`无效的时间范围值: ${value}`);
    }

    return amount * TIME_UNITS[unit];
  }

  /**
   * 检查日期是否在相对时间范围内
   * @param targetDate 目标日期
   * @param now 当前时间戳（毫秒）
   * @param range 范围配置
   * @returns 是否在范围内
   */
  private static checkRelativeTimeRange(targetDate: Date, now: number, range: TimeRangeOptions): boolean {
    const { earliest, latest, inclusive = true } = range;
    const targetTime = targetDate.getTime();

    // 检查最早时间限制
    if (earliest !== undefined) {
      const earliestMs = this.parseTimeRangeValue(earliest);
      const earliestTime = now - Math.abs(earliestMs);
      if (inclusive ? targetTime < earliestTime : targetTime <= earliestTime) {
        return false;
      }
    }

    // 检查最晚时间限制
    if (latest !== undefined) {
      const latestMs = this.parseTimeRangeValue(latest);
      const latestTime = now + Math.abs(latestMs);
      if (inclusive ? targetTime > latestTime : targetTime >= latestTime) {
        return false;
      }
    }

    return true;
  }

  /**
   * 计算两个日期的时间差
   * @param date1 开始日期
   * @param date2 结束日期
   * @param options 配置选项
   * @returns 时间差结果
   */
  private static calculateTimeDiff(
    date1: Date,
    date2: Date,
    options: TimeDiffOptions
  ): string | string[] | TimeDiffResult | Record<string, number> {
    const diffMs = Math.abs(date2.getTime() - date1.getTime());

    const defaultUnits: TimeUnit[] = ["year", "month", "day", "hour", "minute", "second"];
    const units = options.units || defaultUnits;
    const round = options.round !== false;

    const result: TimeDiffResult = {
      year: 0,
      month: 0,
      week: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    };

    let remaining = diffMs;

    units.forEach((unit) => {
      if (TIME_UNITS[unit]) {
        const value = remaining / TIME_UNITS[unit];
        result[unit] = round ? Math.round(value) : value;
        remaining -= result[unit] * TIME_UNITS[unit];
      }
    });

    switch (options.format) {
      case "object":
        return result;

      case "array":
        return units.map((unit) => `${result[unit]} ${unit}${result[unit] !== 1 ? "s" : ""}`);

      case "short":
        return units
          .filter((unit) => result[unit] > 0)
          .map((unit) => `${result[unit]}${unit[0]}`)
          .join(" ");

      case "long":
        return units
          .filter((unit) => result[unit] > 0)
          .map((unit) => `${result[unit]} ${unit}${result[unit] !== 1 ? "s" : ""}`)
          .join(" ");

      case "full":
      default:
        const parts = units.filter((unit) => result[unit] > 0).map((unit) => `${result[unit]} ${unit}${result[unit] !== 1 ? "s" : ""}`);

        if (parts.length === 0) return "0秒";
        if (parts.length === 1) return parts[0];

        const last = parts.pop();
        return `${parts.join("、")}和${last}`;
    }
  }

  /**
   * 格式化超出范围的日期
   * @param date 日期
   * @param format 格式化方式
   * @returns 格式化后的字符串
   */
  private static formatOutOfRange(date: Date, format?: string | ((date: Date) => string)): string {
    if (typeof format === "function") {
      return format(date);
    }

    if (format) {
      return format
        .replace("{yyyy}", date.getFullYear().toString())
        .replace("{MM}", (date.getMonth() + 1).toString().padStart(2, "0"))
        .replace("{dd}", date.getDate().toString().padStart(2, "0"))
        .replace("{HH}", date.getHours().toString().padStart(2, "0"))
        .replace("{mm}", date.getMinutes().toString().padStart(2, "0"))
        .replace("{ss}", date.getSeconds().toString().padStart(2, "0"));
    }

    // 默认格式化方式
    return date.toLocaleString();
  }

  /**
   * 获取可读的时间差描述（中文）
   * @param date 目标日期
   * @param baseDate 基准日期（默认当前时间）
   * @returns 人类友好的时间差描述
   */
  static humanize(date: Date | string | number, options?: { range?: TimeRangeOptions }): string {
    const targetDate = this.parseDate(date);
    const now = this.parseDate(new Date()).getTime();

    // 检查时间范围
    if (options?.range) {
      const isInRange = this.checkRelativeTimeRange(targetDate, now, options.range);
      if (!isInRange) {
        return this.formatOutOfRange(targetDate, options.range.outOfRangeFormat);
      }
    }

    const diffMs = now - targetDate.getTime();
    const absDiffMs = Math.abs(diffMs);

    if (absDiffMs < 1000) {
      return diffMs < 0 ? "即将" : "刚刚";
    }

    if (absDiffMs < 60000) {
      const seconds = Math.round(absDiffMs / 1000);
      return diffMs < 0 ? `${seconds}秒后` : `${seconds}秒前`;
    }

    if (absDiffMs < 3600000) {
      const minutes = Math.round(absDiffMs / 60000);
      return diffMs < 0 ? `${minutes}分钟后` : `${minutes}分钟前`;
    }

    if (absDiffMs < 86400000) {
      const hours = Math.round(absDiffMs / 3600000);
      return diffMs < 0 ? `${hours}小时后` : `${hours}小时前`;
    }

    if (absDiffMs < 2592000000) {
      const days = Math.round(absDiffMs / 86400000);
      if (days === 1) return diffMs < 0 ? "明天" : "昨天";
      if (days < 7) {
        return diffMs < 0 ? `${days}天后` : `${days}天前`;
      }
      const weeks = Math.round(days / 7);
      return diffMs < 0 ? `${weeks}周后` : `${weeks}周前`;
    }

    if (absDiffMs < 31536000000) {
      const months = Math.round(absDiffMs / 2592000000);
      return diffMs < 0 ? `${months}个月后` : `${months}个月前`;
    }

    const years = Math.round(absDiffMs / 31536000000);
    return diffMs < 0 ? `${years}年后` : `${years}年前`;
  }

  /**
   * 解析日期输入
   * @param date 日期输入
   * @returns 解析后的Date对象
   * @throws 如果输入格式无效将抛出错误
   */
  private static parseDate(date: Date | string | number): Date {
    if (date instanceof Date) return date;

    if (typeof date === "number") {
      // 处理时间戳（10位或13位）
      const timestampStr = date.toString();
      if (timestampStr.length === 10) {
        return new Date(date * 1000);
      } else if (timestampStr.length === 13) {
        return new Date(date);
      }
      throw new Error("无效的时间戳格式：只支持10位（秒）或13位（毫秒）时间戳");
    }

    if (typeof date === "string") {
      // 尝试解析ISO字符串或时间戳字符串
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) return parsed;

      // 尝试解析纯数字字符串（可能是时间戳）
      if (/^\d+$/.test(date)) {
        return this.parseDate(Number(date));
      }

      throw new Error("无效的日期字符串格式");
    }

    throw new Error("不支持的日期类型");
  }
}
