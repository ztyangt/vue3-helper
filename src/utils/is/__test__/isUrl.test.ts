import { describe, it, expect } from "vitest";
import { isUrl } from "../regex";

describe("isUrl", () => {
  it("should return true if the value is a valid URL", () => {
    expect(isUrl("https://www.google.com")).toBe(true);
    expect(isUrl("http://www.google.com")).toBe(true);
    expect(isUrl("http://192.168.0.1")).toBe(true);
  });
});
