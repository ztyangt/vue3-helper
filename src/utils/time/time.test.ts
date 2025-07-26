import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Time } from "./"; // 根据实际路径调整

describe("Time 类", () => {
  describe("format()", () => {
    it("应该正确格式化默认日期", () => {
      const date = new Date(2023, 5, 15, 13, 30, 45, 123);
      const result = Time.format(date);
      expect(result).toBe("2023-06-15 13:30:45");
    });

    it("应该处理时间戳输入", () => {
      const date = new Date(2023, 5, 15).getTime();
      const result = Time.format(date, "YYYY-MM-DD");
      expect(result).toBe("2023-06-15");
    });

    it("应该支持所有格式占位符", () => {
      const date = new Date(2023, 5, 15, 13, 30, 45, 123);
      const format = "YYYY/YY/MM/M/DD/D HH/H/hh/h mm/m ss/s SSS A a";
      const result = Time.format(date, format);
      expect(result).toBe("2023/23/06/6/15/15 13/13/01/1 30/30 45/45 123 PM pm");
    });

    it('应该返回 "Invalid Date" 对于无效日期', () => {
      const result = Time.format(new Date("invalid"));
      expect(result).toBe("Invalid Date");
    });
  });

  describe("humanize()", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2023, 5, 15, 12, 0, 0)); // 2023-06-15 12:00:00
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('应该显示"刚刚"对于当前时间', () => {
      const now = new Date();
      const result = Time.humanize(now);
      expect(result).toBe("刚刚");
    });

    it('应该显示"1分钟前"对于1分钟前的时间', () => {
      const date = new Date(2023, 5, 15, 11, 59, 0);
      const result = Time.humanize(date);
      expect(result).toBe("1分钟前");
    });

    it('应该显示"2小时后"对于2小时后的时间', () => {
      const date = new Date(2023, 5, 15, 14, 0, 0);
      const result = Time.humanize(date, { showSuffix: true });
      expect(result).toBe("2小时后");
    });

    it('应该显示"5天"对于5天前的时间（当showSuffix为false）', () => {
      const date = new Date(2023, 5, 10, 12, 0, 0);
      const result = Time.humanize(date, { showSuffix: false });
      expect(result).toBe("5天");
    });

    it("应该使用默认格式对于超过阈值的时间", () => {
      const date = new Date(2023, 0, 1); // 半年前
      const result = Time.humanize(date);
      expect(result).toBe("2023-01-01");
    });

    it("应该使用自定义阈值和格式", () => {
      const date = new Date(2023, 5, 1); // 14天前
      const result = Time.humanize(date, {
        threshold: 86400000 * 30, // 30天
        defaultFormat: "MM/DD/YYYY",
      });
      expect(result).toBe("14天前");
    });
  });

  describe("diff()", () => {
    it("应该计算两个日期之间的差值", () => {
      const date1 = new Date(2023, 0, 1);
      const date2 = new Date(2024, 0, 1);
      const result = Time.diff(date1, date2);
      console.log("result", result);

      expect(result.years).toBe(1);
      expect(result.months).toBe(12);
      expect(result.days).toBe(365);
    });

    it("应该处理反向日期", () => {
      const date1 = new Date(2024, 0, 1);
      const date2 = new Date(2023, 0, 1);
      const result = Time.diff(date1, date2);

      expect(result.years).toBe(-1);
      expect(result.months).toBe(-12);
      expect(result.days).toBe(-365);
    });

    it("应该返回全0对于无效日期", () => {
      const result = Time.diff(new Date("invalid"), new Date());
      expect(result).toEqual({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });
  });

  describe("add() 和 subtract()", () => {
    it("应该添加年份", () => {
      const date = new Date(2023, 0, 1);
      const result = Time.add(date, 1, "year");
      expect(result.getFullYear()).toBe(2024);
    });

    it("应该减去月份", () => {
      const date = new Date(2023, 5, 1);
      const result = Time.subtract(date, 1, "month");
      expect(result.getMonth()).toBe(4); // 5月
    });

    it("应该处理跨月边界", () => {
      const date = new Date(2023, 0, 31);
      const result = Time.add(date, 1, "month");
      expect(result.getMonth()).toBe(1); // 2月
      expect(result.getDate()).toBe(28); // 2023不是闰年
    });

    it("应该返回无效日期对于无效输入", () => {
      const result = Time.add(new Date("invalid"), 1, "day");
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("isValid()", () => {
    it("应该返回true对于有效日期", () => {
      expect(Time.isValid(new Date())).toBe(true);
      expect(Time.isValid(Date.now())).toBe(true);
    });

    it("应该返回false对于无效日期", () => {
      expect(Time.isValid(new Date("invalid"))).toBe(false);
      expect(Time.isValid(NaN)).toBe(false);
    });
  });

  describe("startOfMonth() 和 endOfMonth()", () => {
    it("应该返回月份的第一天", () => {
      const date = new Date(2023, 5, 15);
      const result = Time.startOfMonth(date);
      expect(result.getDate()).toBe(1);
      expect(result.getMonth()).toBe(5);
    });

    it("应该返回月份的最后一天", () => {
      const date = new Date(2023, 5, 15); // 6月
      const result = Time.endOfMonth(date);
      expect(result.getDate()).toBe(30);
      expect(result.getMonth()).toBe(5);
    });

    it("应该处理闰年二月", () => {
      const date = new Date(2024, 1, 15); // 2024是闰年
      const result = Time.endOfMonth(date);
      expect(result.getDate()).toBe(29);
    });
  });

  describe("startOfDay() 和 endOfDay()", () => {
    it("应该返回当天的开始时间", () => {
      const date = new Date(2023, 5, 15, 12, 30, 45, 123);
      const result = Time.startOfDay(date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("应该返回当天的结束时间", () => {
      const date = new Date(2023, 5, 15, 12, 30, 45, 123);
      const result = Time.endOfDay(date);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe("compare()", () => {
    it("应该正确比较日期", () => {
      const date1 = new Date(2023, 0, 1);
      const date2 = new Date(2023, 0, 2);

      expect(Time.compare(date1, date2)).toBe(-1);
      expect(Time.compare(date2, date1)).toBe(1);
      expect(Time.compare(date1, date1)).toBe(0);
    });

    it("应该返回NaN对于无效日期", () => {
      expect(Time.compare(new Date("invalid"), new Date())).toBeNaN();
    });
  });

  describe("isBetween()", () => {
    it("应该检查日期是否在范围内", () => {
      const date = new Date(2023, 5, 15);
      const start = new Date(2023, 0, 1);
      const end = new Date(2023, 11, 31);

      expect(Time.isBetween(date, start, end)).toBe(true);
      expect(Time.isBetween(new Date(2024, 0, 1), start, end)).toBe(false);
    });

    it("应该处理边界情况", () => {
      const start = new Date(2023, 0, 1);
      const end = new Date(2023, 0, 1);

      expect(Time.isBetween(start, start, end)).toBe(true);
    });

    it("应该返回false对于无效日期", () => {
      expect(Time.isBetween(new Date("invalid"), new Date(), new Date())).toBe(false);
    });
  });

  describe("now()", () => {
    it("应该返回当前时间戳", () => {
      const mockTime = Date.now();
      vi.spyOn(Date, "now").mockReturnValue(mockTime);

      expect(Time.now()).toBe(mockTime);
    });
  });
});
