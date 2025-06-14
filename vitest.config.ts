import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "**/__tests__/**/*.{test,spec}.{js,ts}", // 匹配 __tests__ 目录
      "**/*.{test,spec}.{js,ts}", // 或同级测试文件
    ],
    // environment: "jsdom", // 组件测试需要
  },
});
