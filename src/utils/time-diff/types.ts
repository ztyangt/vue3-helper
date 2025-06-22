export type TimeUnit = "year" | "month" | "week" | "day" | "hour" | "minute" | "second";
export type TimeDiffResult = Record<TimeUnit, number>;
export type TimeDiffFormat = "full" | "short" | "long" | "object" | "array";
export type TimeRangeValue = `${number} ${TimeUnit}` | number;
export type TimeRangeOptions = {
  /** 最早时间（相对于当前时间），如："2 days" 或毫秒值 */
  earliest?: TimeRangeValue;
  /** 最晚时间（相对于当前时间），如："1 hour" 或毫秒值 */
  latest?: TimeRangeValue;
  /** 超出范围的日期格式化方式 */
  outOfRangeFormat?: string | ((date: Date) => string);
  /** 是否包含边界值（默认包含） */
  inclusive?: boolean;
};
export type TimeDiffOptions = {
  format?: TimeDiffFormat;
  units?: TimeUnit[];
  round?: boolean;
  range?: TimeRangeOptions;
};
