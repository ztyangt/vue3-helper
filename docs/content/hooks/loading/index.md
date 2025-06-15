---
outline: deep
---

# 加载状态

:::info
提供一个响应式的加载状态及其操作方法，适用于管理异步操作的加载状态。
:::

## 类型声明

```ts
/**
 * 创建一个加载状态管理对象
 * @param initValue 初始加载状态，默认为false
 * @returns 返回包含加载状态和操作方法的对象
 */
export declare function useLoading(initValue?: boolean): {
  loading: Ref<boolean>;
  setLoading: (value: boolean) => void;
  toggleLoading: () => void;
};
```

## 使用示例

```ts
import { useLoading } from '@wiit/vue3-helper'

const { loading, setLoading, toggleLoading } = useLoading()

// 开始加载
setLoading(true)

// 切换加载状态
toggleLoading()

// 直接访问加载状态
console.log(loading.value)
```

## 参数

| 参数名    | 类型    | 默认值   | 说明               |
| --------- | ------- | -------- | ------------------ |
| initValue | boolean | false    | 初始加载状态值     |

## 返回值

| 属性名       | 类型                  | 说明                     |
| ------------ | --------------------- | ------------------------ |
| loading      | Ref\<boolean\>        | 响应式的加载状态         |
| setLoading   | (value: boolean) => void | 设置加载状态的方法       |
| toggleLoading| () => void            | 切换加载状态的方法       |

## 使用场景

```vue
<script setup>
import { useLoading } from '@wiit/vue3-helper'

const { loading, setLoading } = useLoading()

async function fetchData() {
  setLoading(true)
  try {
    // 执行异步操作
    await api.getData()
  } finally {
    setLoading(false)
  }
}
</script>

<template>
  <button @click="fetchData" :disabled="loading">
    {{ loading ? '加载中...' : '获取数据' }}
  </button>
</template>
```
