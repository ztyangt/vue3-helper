import { describe, it, expect } from "vitest";
import { isEmail } from "../regex";

describe("isEmail", () => {
  it("should return true if the value is a valid email", () => {
    expect(isEmail("test@example.com")).toBe(true);
    expect(isEmail("test.email@example.com")).toBe(true);
    expect(isEmail("test.email+alex@example.com")).toBe(true);
    expect(isEmail("test.email@sub.example.com")).toBe(true);
    expect(isEmail("test@sub.example.com")).toBe(true);
    expect(isEmail("test@sub.example.co.uk")).toBe(true);
  });
});
