import { describe, it, expect } from "vitest";
import { isChinese } from "../regex";

// 描述测试套件
describe("isChinese", () => {
  // 测试用例：有效中文字符串
  it("should return true for valid Chinese strings", () => {
    const validStrings = ["", "中", "中文", "中文测试"];
    validStrings.forEach((str) => {
      expect(isChinese(str)).toBe(true);
    });
  });

  // 测试用例：无效中文字符串，包含超过 4 个字符、非中文字符等情况
  it("should return false for invalid Chinese strings", () => {
    const invalidStrings = [
      "a", // 英文字符
      "123", // 数字
      "中文a", // 包含非中文字符
      {}, // 对象
      null, // null
      undefined, // undefined
      1234, // 数字类型
    ];
    invalidStrings.forEach((str) => {
      expect(isChinese(str)).toBe(false);
    });
  });
});
