import { describe, it, expect } from "vitest";
import { isNumber } from "../type";

describe("isNumber", () => {
  it("should return true if the value is a number", () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-123)).toBe(true);
    expect(isNumber(1.23)).toBe(true);
    expect(isNumber(-1.23)).toBe(true);
  });
});
