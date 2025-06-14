import { describe, it, expect } from "vitest";
import { isObject } from "../type";

describe("isObject", () => {
  it("should return true if the value is a object", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(null)).toBe(true);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new Map())).toBe(true);
    expect(isObject(new Set())).toBe(true);
    expect(isObject(new WeakMap())).toBe(true);
    expect(isObject(new WeakSet())).toBe(true);
    expect(isObject(new ArrayBuffer())).toBe(true);
    expect(isObject(new DataView(new ArrayBuffer()))).toBe(true);
    expect(isObject(new Int8Array())).toBe(true);
    expect(isObject(new Uint8Array())).toBe(true);
    expect(isObject(new Uint8ClampedArray())).toBe(true);
    expect(isObject(new Int16Array())).toBe(true);
    expect(isObject(new Uint16Array())).toBe(true);
    expect(isObject(new Int32Array())).toBe(true);
    expect(isObject(new Uint32Array())).toBe(true);
    expect(isObject(new Float32Array())).toBe(true);
    expect(isObject(new Float64Array())).toBe(true);
    expect(isObject(new BigInt64Array())).toBe(true);
    expect(isObject(new BigUint64Array())).toBe(true);
    expect(isObject(new Promise(() => {}))).toBe(true);
    expect(isObject(new Error())).toBe(true);
  });
});
