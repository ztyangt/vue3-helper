---
outline: deep
---

# 主题切换

:::info
提供响应式的暗黑/明亮主题切换功能，支持平滑的过渡动画效果。基于 VueUse 的 `useDark` 实现，并扩展了 View Transition API 动画效果。
:::

## 类型声明

```ts
/**
 * 创建主题管理对象
 * @returns 返回包含主题状态和切换方法的对象
 */
export declare function useTheme(): {
  isDark: Ref<boolean>;
  toggleTheme: (event?: MouseEvent, animate?: boolean) => Promise<void>;
};
```

## 使用示例

### 基本用法
```ts
import { useTheme } from '@wiit/vue3-helper'

const { isDark, toggleTheme } = useTheme()

// 切换主题（无动画）
toggleTheme()

// 获取当前主题状态
console.log(isDark.value) // true 表示暗黑模式
```

### 带动画切换
```vue
<script setup>
import { useTheme } from '@wiit/vue3-helper'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button @click="(e) => toggleTheme(e, true)">
    {{ isDark ? '切换到明亮模式' : '切换到暗黑模式' }}
  </button>
</template>
```

## 返回值

| 属性名      | 类型                                                                 | 说明                                   |
|-------------|----------------------------------------------------------------------|----------------------------------------|
| isDark      | `Ref<boolean>`                                                      | 响应式的主题状态（true 表示暗黑模式）  |
| toggleTheme | `(event?: MouseEvent, animate?: boolean) => Promise<void>`          | 切换主题的方法                         |

## toggleTheme 参数

| 参数名  | 类型          | 默认值     | 说明                               |
|---------|---------------|------------|------------------------------------|
| event   | `MouseEvent`  | undefined  | 用于确定动画起始位置的鼠标事件对象  |
| animate | `boolean`     | false      | 是否启用平滑过渡动画               |

## 实现细节

- 使用 `@vueuse/core` 的 `useDark` 作为基础实现
- 默认修改 html 元素的 class 属性（`dark`/`light`）
- 当启用动画时，使用 View Transition API 创建圆形扩散/收缩效果
- 动画起始位置由点击事件坐标决定
- 自动处理浏览器兼容性问题，在不支持 View Transition API 时会回退到无动画切换


## 注意事项

1. 动画效果需要浏览器支持 View Transition API
2. 动画效果仅在用户交互（如点击事件）中可用
