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
    // const d = date instanceof Date ? date : new Date(date);
    const d = new Date(date);

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
  ): string {
    const {
      threshold = 604800000, // 7天
      defaultFormat = "YYYY-MM-DD",
      now = new Date(),
      showSuffix = true,
    } = options;

    const d = date instanceof Date ? date : new Date(date);
    const current = now instanceof Date ? now : new Date(now);

    if (!this.isValid(d)) {
      return "Invalid Date";
    }

    const diffMs = current.getTime() - d.getTime();
    const absDiffMs = Math.abs(diffMs);

    // 如果时间差超出阈值，则使用默认格式返回
    if (absDiffMs > threshold) {
      return this.format(d, defaultFormat);
    }

    // 定义时间单位和对应的毫秒数
    const units: Array<{ unit: string; ms: number; past: string; future: string }> = [
      { unit: "年", ms: 31536000000, past: "年前", future: "年后" },
      { unit: "个月", ms: 2592000000, past: "个月前", future: "个月后" },
      { unit: "天", ms: 86400000, past: "天前", future: "天后" },
      { unit: "小时", ms: 3600000, past: "小时前", future: "小时后" },
      { unit: "分钟", ms: 60000, past: "分钟前", future: "分钟后" },
      { unit: "秒", ms: 1000, past: "秒前", future: "秒后" },
    ];

    // 查找最合适的时间单位
    for (const { unit, ms, past, future } of units) {
      if (absDiffMs >= ms) {
        const value = Math.floor(absDiffMs / ms);
        const suffix = showSuffix ? (diffMs >= 0 ? past : future) : unit;
        return `${value}${suffix}`;
      }
    }

    // 小于1秒则显示"刚刚"或"现在"
    return showSuffix ? (diffMs >= 0 ? "刚刚" : "现在") : "刚刚";
  }

  /**
   * 获取两个日期之间的差值
   * @param date1 第一个日期
   * @param date2 第二个日期，默认为当前时间
   * @returns 差值对象，包含年、月、日、小时、分钟、秒、毫秒，带有符号表示方向（正数表示date2较晚）
   */
  static diff(
    date1: Date | number,
    date2: Date | number = new Date()
  ): { years: number; months: number; days: number; hours: number; minutes: number; seconds: number; milliseconds: number } {
    // 转换为Date对象（如果输入是时间戳）
    const d1 = date1 instanceof Date ? date1 : new Date(date1);
    const d2 = date2 instanceof Date ? date2 : new Date(date2);

    // 检查日期有效性
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

    // 计算毫秒级差值（date2较晚则为正数）
    const diffInMs = d2.getTime() - d1.getTime();
    const sign = Math.sign(diffInMs); // 保存差值的正负符号

    // 计算各时间单位的绝对值差值
    const seconds = Math.abs(diffInMs) / 1000; // 总秒数
    const minutes = seconds / 60; // 总分钟数
    const hours = minutes / 60; // 总小时数
    const days = hours / 24; // 总天数

    // 计算实际的年月日差异（考虑日历月份天数变化）
    let years = d2.getFullYear() - d1.getFullYear(); // 年份差
    let months = d2.getMonth() - d1.getMonth(); // 月份差
    let daysDiff = d2.getDate() - d1.getDate(); // 天数差

    // 处理天数差为负的情况（如1月31日到2月1日）
    if (daysDiff < 0) {
      months--; // 借一个月
      // 获取上个月的最后一天
      const lastDayOfMonth = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
      daysDiff += lastDayOfMonth; // 补上借用的天数
    }

    // 处理月份差为负的情况（如12月到1月）
    if (months < 0) {
      years--; // 借一年
      months += 12; // 补上借用的12个月
    }

    // 返回带符号的结果
    return {
      years: sign * Math.abs(years), // 符号化年差
      months: sign * Math.abs(years * 12 + months), // 符号化总月差
      days: sign * Math.floor(days), // 符号化天差（基于24小时制）
      hours: sign * Math.floor(hours), // 符号化小时差
      minutes: sign * Math.floor(minutes), // 符号化分钟差
      seconds: sign * Math.floor(seconds), // 符号化秒差
      milliseconds: diffInMs, // 原始毫秒差（已带符号）
    };
  }

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
        // 特殊处理月份加减，防止跨月边界问题
        const originalDate = d.getDate();
        d.setMonth(d.getMonth() + value);

        // 检查是否跨月（如1月31日加到2月）
        if (d.getDate() !== originalDate) {
          // 回退到上个月的最后一天
          d.setDate(0);
        }
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

  /**
   * 转换不同精度的时间戳为毫秒
   * @param timestamp 时间戳
   * @param precision 精度 ('ms' | 's' | 'us' | 'ns')
   * @returns 毫秒时间戳
   */
  // private static normalizeTimestamp(timestamp: number, precision: "ms" | "s" | "us" | "ns" = "ms"): number {
  //   switch (precision) {
  //     case "s": // 秒级时间戳
  //       return timestamp * 1000;
  //     case "us": // 微秒级时间戳
  //       return timestamp / 1000;
  //     case "ns": // 纳秒级时间戳
  //       return timestamp / 1000000;
  //     case "ms": // 毫秒级时间戳
  //     default:
  //       return timestamp;
  //   }
  // }
}
