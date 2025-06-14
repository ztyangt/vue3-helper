import { describe, it, expect } from "vitest";
import { isString } from "../type";

describe("isString", () => {
  it("should return true if the value is a string", () => {
    expect(isString("hello")).toBe(true);
    expect(isString("123")).toBe(true);
    expect(isString("")).toBe(true);
  });
});
