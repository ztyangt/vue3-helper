import { describe, it, expect } from "vitest";
import { isDate } from "../type";

describe("isDate", () => {
  it("should return true if the value  is a Date object", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date(2021, 0, 1))).toBe(true);
    expect(isDate(new Date("2021-01-01"))).toBe(true);
    expect(isDate(new Date("2021-01-01T00:00:00"))).toBe(true);
    expect(isDate(new Date("2021-01-01T00:00:00.000"))).toBe(true);
    expect(isDate(new Date("2021-01-01T00:00:00.000Z"))).toBe(true);
    expect(isDate(new Date("2021-01-01T00:00:00.000+08:00"))).toBe(true);
    expect(isDate(new Date("2021-01-01T00:00:00.000-08:00"))).toBe(true);
    expect(isDate(new Date("2021-01-01T00:00:00.000+08:00"))).toBe(true);
    expect(isDate(new Date("2021-01-01T00:00:00.000-08:00"))).toBe(true);
  });
});
