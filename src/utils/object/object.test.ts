import { describe, expect, test } from "vitest";
import { objectUtils } from "./index";

describe("objectUtils", () => {
  test("对象判空测试", () => {
    expect(objectUtils.isEmpty(null)).toBe(true);
    expect(objectUtils.isEmpty(undefined)).toBe(true);
    expect(objectUtils.isEmpty({})).toBe(true);
    expect(objectUtils.isEmpty({ key: "value" })).toBe(false);
  });

  test("深拷贝测试", () => {
    const obj = { a: 1, b: { c: 2 } };
    const clonedObj = objectUtils.deepClone(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.b).not.toBe(obj.b);
  });

  test("深拷贝测试，包含循环引用", () => {
    const obj: any = { a: 1 };
    obj.self = obj;
    const clonedObj = objectUtils.deepClone(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj.self).toBe(clonedObj);
  });

  test("深拷贝测试，包含日期和正则表达式", () => {
    const date = new Date();
    const regex = /test/;
    const clonedDate = objectUtils.deepClone(date);
    const clonedRegex = objectUtils.deepClone(regex);
    expect(clonedDate).toEqual(date);
    expect(clonedRegex).toEqual(regex);
    expect(clonedDate).not.toBe(date);
    expect(clonedRegex).not.toBe(regex);
  });

  test("深度合并对象", () => {
    const target = { a: 1, b: { c: 2 } };
    const source = { b: { d: 3 }, e: 4 };
    const result = objectUtils.deepMerge(target, source);
    expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
  });

  test("对象Omit测试", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = objectUtils.omit(obj, ["b", "c"]);
    expect(result).toEqual({ a: 1 });
  });

  test("对象Pick测试", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = objectUtils.pick(obj, ["a", "c"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  test("对象isEqual测试", () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 3 };
    const obj3 = { a: 1, b: 2, c: 4 };
    expect(objectUtils.isEqual(obj1, obj2)).toBe(true);
    expect(objectUtils.isEqual(obj1, obj3)).toBe(false);
  });
});
