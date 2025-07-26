export class Time {
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
  static format(date: Date | number = new Date(), format: string = "YYYY-MM-DD HH:mm:ss"): string {
    const d = date instanceof Date ? date : new Date(date);

    if (!this.isValid(d)) {
      return "Invalid Date";
    }

    const pad = (num: number, length: number = 2): string => {
      return num.toString().padStart(length, "0");
    };

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const milliseconds = d.getMilliseconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    const twelveHour = hours % 12 || 12;

    const replacements: Record<string, string> = {
      YYYY: year.toString(),
      YY: year.toString().slice(-2),
      MM: pad(month),
      M: month.toString(),
      DD: pad(day),
      D: day.toString(),
      HH: pad(hours),
      H: hours.toString(),
      hh: pad(twelveHour),
      h: twelveHour.toString(),
      mm: pad(minutes),
      m: minutes.toString(),
      ss: pad(seconds),
      s: seconds.toString(),
      SSS: pad(milliseconds, 3),
      A: ampm,
      a: ampm.toLowerCase(),
    };

    return format.replace(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g, (match) => replacements[match]);
  }

  /**
   * 获取人性化时间（带范围限制）
   * @param date 日期对象或时间戳
   * @param options 配置选项
   *   - now: 当前时间，默认为 new Date()
   *   - format: 超出范围时的格式，默认为 'YYYY-MM-DD'
   *   - ranges: 人性化展示的时间范围配置（单位：秒）
   *     - seconds: 秒范围，默认为 60
   *     - minutes: 分钟范围，默认为 3600 (60*60)
   *     - hours: 小时范围，默认为 86400 (24*60*60)
   *     - days: 天范围，默认为 2592000 (30*24*60*60)
   *     - months: 月范围，默认为 31536000 (12*30*24*60*60)
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
  ): string {
    const { now = new Date(), format = "YYYY-MM-DD", ranges = {} } = options;

    // 默认范围配置（单位：秒）
    const defaultRanges = {
      seconds: 60,
      minutes: 60 * 60,
      hours: 24 * 60 * 60,
      days: 30 * 24 * 60 * 60,
      months: 12 * 30 * 24 * 60 * 60,
    };

    // 合并用户自定义范围
    const mergedRanges = {
      seconds: ranges.seconds ?? defaultRanges.seconds,
      minutes: ranges.minutes ?? defaultRanges.minutes,
      hours: ranges.hours ?? defaultRanges.hours,
      days: ranges.days ?? defaultRanges.days,
      months: ranges.months ?? defaultRanges.months,
    };

    const d = date instanceof Date ? date : new Date(date);
    const n = now instanceof Date ? now : new Date(now);

    if (!this.isValid(d) || !this.isValid(n)) {
      return this.format(d, format);
    }

    const diffInSeconds = Math.floor((n.getTime() - d.getTime()) / 1000);
    const absDiff = Math.abs(diffInSeconds);

    // 检查是否在人性化展示范围内
    const inRange =
      absDiff < mergedRanges.seconds ||
      (absDiff < mergedRanges.minutes && absDiff >= mergedRanges.seconds) ||
      (absDiff < mergedRanges.hours && absDiff >= mergedRanges.minutes) ||
      (absDiff < mergedRanges.days && absDiff >= mergedRanges.hours) ||
      (absDiff < mergedRanges.months && absDiff >= mergedRanges.days);

    if (!inRange) {
      return this.format(d, format);
    }

    if (absDiff < mergedRanges.seconds) {
      return diffInSeconds < 0 ? `${absDiff}秒后` : absDiff <= 5 ? "刚刚" : `${absDiff}秒前`;
    }

    const diffInMinutes = Math.floor(absDiff / 60);
    if (absDiff < mergedRanges.minutes) {
      return diffInSeconds < 0 ? `${diffInMinutes}分钟后` : `${diffInMinutes}分钟前`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (absDiff < mergedRanges.hours) {
      return diffInSeconds < 0 ? `${diffInHours}小时后` : `${diffInHours}小时前`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (absDiff < mergedRanges.days) {
      return diffInSeconds < 0 ? `${diffInDays}天后` : `${diffInDays}天前`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (absDiff < mergedRanges.months) {
      return diffInSeconds < 0 ? `${diffInMonths}个月后` : `${diffInMonths}个月前`;
    }

    return this.format(d, format);
  }

  /**
   * 获取两个日期之间的差值
   * @param date1 第一个日期
   * @param date2 第二个日期，默认为当前时间
   * @returns 差值对象，包含年、月、日、小时、分钟、秒、毫秒
   */
  static diff(
    date1: Date | number,
    date2: Date | number = new Date()
  ): { years: number; months: number; days: number; hours: number; minutes: number; seconds: number; milliseconds: number } {
    const d1 = date1 instanceof Date ? date1 : new Date(date1);
    const d2 = date2 instanceof Date ? date2 : new Date(date2);

    if (!this.isValid(d1) || !this.isValid(d2)) {
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    }

    const diffInMs = d2.getTime() - d1.getTime();
    const absDiff = Math.abs(diffInMs);

    return {
      years: Math.floor(absDiff / (365.25 * 24 * 60 * 60 * 1000)),
      months: Math.floor(absDiff / (30.44 * 24 * 60 * 60 * 1000)),
      days: Math.floor(absDiff / (24 * 60 * 60 * 1000)),
      hours: Math.floor(absDiff / (60 * 60 * 1000)),
      minutes: Math.floor(absDiff / (60 * 1000)),
      seconds: Math.floor(absDiff / 1000),
      milliseconds: absDiff,
    };
  }

  /**
   * 添加时间
   * @param date 原始日期
   * @param value 要添加的值
   * @param unit 时间单位 ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond')
   * @returns 新的Date对象
   */
  static add(date: Date | number, value: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond"): Date {
    const d = date instanceof Date ? new Date(date) : new Date(date);

    if (!this.isValid(d)) {
      return new Date(NaN);
    }

    switch (unit) {
      case "year":
        d.setFullYear(d.getFullYear() + value);
        break;
      case "month":
        d.setMonth(d.getMonth() + value);
        break;
      case "day":
        d.setDate(d.getDate() + value);
        break;
      case "hour":
        d.setHours(d.getHours() + value);
        break;
      case "minute":
        d.setMinutes(d.getMinutes() + value);
        break;
      case "second":
        d.setSeconds(d.getSeconds() + value);
        break;
      case "millisecond":
        d.setMilliseconds(d.getMilliseconds() + value);
        break;
    }

    return d;
  }

  /**
   * 减去时间
   * @param date 原始日期
   * @param value 要减去的值
   * @param unit 时间单位 ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond')
   * @returns 新的Date对象
   */
  static subtract(date: Date | number, value: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond"): Date {
    return this.add(date, -value, unit);
  }

  /**
   * 检查日期是否有效
   * @param date 日期对象或时间戳
   * @returns 是否有效
   */
  static isValid(date: Date | number): boolean {
    try {
      const d = date instanceof Date ? date : new Date(date);
      return !isNaN(d.getTime());
    } catch {
      return false;
    }
  }

  /**
   * 获取当前时间戳（毫秒）
   * @returns 当前时间戳
   */
  static now(): number {
    return Date.now();
  }

  /**
   * 获取某个月的第一天
   * @param date 日期对象或时间戳
   * @returns 该月第一天的Date对象
   */
  static startOfMonth(date: Date | number): Date {
    const d = date instanceof Date ? new Date(date) : new Date(date);

    if (!this.isValid(d)) {
      return new Date(NaN);
    }

    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  /**
   * 获取某个月的最后一天
   * @param date 日期对象或时间戳
   * @returns 该月最后一天的Date对象
   */
  static endOfMonth(date: Date | number): Date {
    const d = date instanceof Date ? new Date(date) : new Date(date);

    if (!this.isValid(d)) {
      return new Date(NaN);
    }

    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  }

  /**
   * 获取某天的开始时间（00:00:00.000）
   * @param date 日期对象或时间戳
   * @returns 该天开始的Date对象
   */
  static startOfDay(date: Date | number): Date {
    const d = date instanceof Date ? new Date(date) : new Date(date);

    if (!this.isValid(d)) {
      return new Date(NaN);
    }

    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  /**
   * 获取某天的结束时间（23:59:59.999）
   * @param date 日期对象或时间戳
   * @returns 该天结束的Date对象
   */
  static endOfDay(date: Date | number): Date {
    const d = date instanceof Date ? new Date(date) : new Date(date);

    if (!this.isValid(d)) {
      return new Date(NaN);
    }

    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
  }

  /**
   * 比较两个日期
   * @param date1 第一个日期
   * @param date2 第二个日期
   * @returns 比较结果：
   *   -1: date1 在 date2 之前
   *    0: date1 等于 date2
   *    1: date1 在 date2 之后
   */
  static compare(date1: Date | number, date2: Date | number): number {
    const d1 = date1 instanceof Date ? date1 : new Date(date1);
    const d2 = date2 instanceof Date ? date2 : new Date(date2);

    if (!this.isValid(d1) || !this.isValid(d2)) {
      return NaN;
    }

    const time1 = d1.getTime();
    const time2 = d2.getTime();

    if (time1 < time2) return -1;
    if (time1 > time2) return 1;
    return 0;
  }

  /**
   * 检查日期是否在范围内
   * @param date 要检查的日期
   * @param start 范围开始日期
   * @param end 范围结束日期
   * @returns 是否在范围内
   */
  static isBetween(date: Date | number, start: Date | number, end: Date | number): boolean {
    const d = date instanceof Date ? date : new Date(date);
    const s = start instanceof Date ? start : new Date(start);
    const e = end instanceof Date ? end : new Date(end);

    if (!this.isValid(d) || !this.isValid(s) || !this.isValid(e)) {
      return false;
    }

    const time = d.getTime();
    return time >= s.getTime() && time <= e.getTime();
  }
}
