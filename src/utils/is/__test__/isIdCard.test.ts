import { describe, it, expect } from "vitest";
import { isIdCard } from "../regex";

// 描述测试套件
describe("isIdCard", () => {
  // 测试用例：有效身份证号码，包含 15 位身份证号
  it("should return true for valid id card numbers", () => {
    const validIds = [
      "11010519491231002X",
      "11010518491231002X",
      "11010520491231002X",
      "11010523491231002X",
      // '110105491231002' // 15 位有效身份证号
    ];
    validIds.forEach((id) => {
      expect(isIdCard(id)).toBe(true);
    });
  });

  // 测试用例：无效 15 位身份证号码
  it("should return false for invalid 15-bit id card numbers", () => {
    const invalid15BitIds = [
      "010105491231002", // 第一位为 0
      "110105491331002", // 月份为 13
      "110105491232002", // 日期为 32
      "abcdef491231002", // 包含非数字字符
    ];
    invalid15BitIds.forEach((id) => {
      expect(isIdCard(id)).toBe(false);
    });
  });

  // 测试用例：无效身份证号码
  it("should return false for invalid id card numbers", () => {
    const invalidIds = [
      "01010519491231002X", // 第一位为 0
      "11010519491331002X", // 月份为 13
      "11010519491232002X", // 日期为 32
      "11010519491231002Y", // 校验位为 Y
      "abcdefghijklmnopqrs", // 非数字和 Xx
      123456789012345678, // 数字类型
      null, // null
      undefined, // undefined
    ];
    invalidIds.forEach((id) => {
      expect(isIdCard(id)).toBe(false);
    });
  });
});
