---
outline: deep
---

# 元素缩放

:::info
提供一个可自定义的指令，允许通过拖拽元素的四个角落来调整元素大小，支持最小尺寸限制和边界检查。
:::

## resize

### 类型声明

```ts
/**
 * 元素缩放指令
 * @param el - 要应用指令的HTML元素
 * @param binding - 指令绑定对象，包含配置参数
 */
export declare const resize: Directive<ResizableElement, ResizeOptions>;

interface ResizableElement extends HTMLElement {
  __resizeHandles?: HTMLElement[];
  __resizeListeners?: {
    mousedown: (e: MouseEvent) => void;
  }[];
  __dragPreview?: HTMLElement;
}

interface ResizeOptions {
  minWidth?: number;
  minHeight?: number;
}
```

### 使用示例

#### 基本用法
```vue
<template>
  <div v-resize class="resizable-box">
    可调整大小的元素
  </div>
</template>

<script setup>
import { resize } from '@wiit/vue3-helper'
</script>

<style>
.resizable-box {
  width: 200px;
  height: 200px;
  background: #f0f0f0;
}
</style>
```

#### 自定义最小尺寸
```vue
<template>
  <div v-resize="{ minWidth: 100, minHeight: 100 }" class="resizable-box">
    最小100x100的元素
  </div>
</template>
```

### 参数

| 参数名    | 类型   | 默认值 | 说明               |
| --------- | ------ | ------ | ------------------ |
| minWidth  | number | 50     | 元素最小宽度(px)   |
| minHeight | number | 50     | 元素最小高度(px)   |

### 功能特性

1. **四个角落拖拽手柄**：在元素四个角落显示可拖拽区域
2. **实时预览**：拖拽时显示半透明预览框
3. **边界限制**：自动限制在父容器范围内
4. **最小尺寸限制**：确保元素不小于指定最小尺寸
5. **平滑过渡**：拖拽结束后应用最终尺寸

### 实现细节

- 使用绝对定位实现拖拽手柄
- 通过鼠标事件计算新尺寸和位置
- 自动处理父容器边界检查

### 注意事项

1. **父容器要求**：
   - 父容器需要有定位（非static）
   - 指令会自动将父容器设为relative（如果原本是static）

2. **样式要求**：
   - 目标元素需要设置初始尺寸
   - 建议为可调整元素设置`position: absolute`

3. **浏览器兼容性**：
   - 现代浏览器完全支持

### 清理机制

指令会在组件卸载时自动清理：
- 移除所有事件监听器
- 删除创建的拖拽手柄
- 移除预览层元素

### 自定义样式

可以通过CSS自定义手柄和预览样式：
```css
.resize-handle {
  /* 手柄基础样式 */
}

.resize-handle-top-left {
  /* 左上角手柄特定样式 */
}

.resize-handle:hover {
  /* 手柄悬停样式 */
}
```