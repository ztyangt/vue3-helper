import { Random } from ".";
import { describe, expect, test } from "vitest";

describe("Random", () => {
  test("string", () => {
    expect(Random.string(10)).toHaveLength(10);
    console.log(Random.string(10)); // 生成随机字符串
    console.log(Random.uuid());
    console.log(Random.date());
    console.log(Random.color());
    console.log(Random.password(24));
    console.log(Random.number(10, 100));
  });
});
