---
outline: deep
---

# 可拖拽指令

:::info
提供一个指令，使元素可以在其父容器内自由拖拽，自动处理边界限制。
:::

## v-draggable

### 类型声明

```ts
/**
 * 可拖拽指令
 * @param el - 应用指令的HTML元素
 */
export declare const draggable: Directive;
```

### 使用示例

#### 基本用法
```vue
<template>
  <div class="container">
    <div v-draggable class="draggable-box">可拖拽元素</div>
  </div>
</template>

<script setup>
import { draggable } from '@wiit/vue3-helper'
</script>

<style>
.container {
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
}

.draggable-box {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

### 功能特性

1. **拖拽功能**：
   - 鼠标按下并移动时可拖拽元素
   - 自动显示移动光标样式

2. **边界限制**：
   - 限制元素不能拖出父容器范围
   - 自动计算最大可移动范围

3. **位置控制**：
   - 使用绝对定位控制元素位置
   - 实时更新元素坐标

### 实现原理

1. **鼠标事件处理**：
   - `mousedown`: 计算初始点击位置与元素偏移量
   - `mousemove`: 计算新位置并更新元素样式
   - `mouseup`: 清除事件监听

2. **边界计算**：
   ```ts
   let maxX = parentWidth - elementWidth
   let maxY = parentHeight - elementHeight
   ```

3. **位置更新**：
   ```ts
   el.style.left = x + 'px'
   el.style.top = y + 'px'
   ```

### 注意事项

1. **父容器要求**：
   - 父容器必须有定位（非static）
   - 父容器需要设置明确的宽度和高度

2. **元素要求**：
   - 元素必须设置明确的宽度和高度
   - 元素会被自动设置为绝对定位

3. **浏览器兼容性**：
   - 支持所有现代浏览器
   - 移动端需要额外处理触摸事件

### 扩展用法

#### 限制拖拽方向
```vue
<template>
  <div v-draggable-x>只能水平拖拽</div>
  <div v-draggable-y>只能垂直拖拽</div>
</template>

<script>
// 实现代码可参考主指令，修改位置计算逻辑
</script>
```

#### 拖拽事件回调
```vue
<template>
  <div 
    v-draggable 
    @drag-start="onDragStart"
    @drag-move="onDragMove"
    @drag-end="onDragEnd"
  >
    带回调的可拖拽元素
  </div>
</template>

<script setup>
const onDragStart = (position) => {
  console.log('开始拖拽', position)
}
// 其他回调同理
</script>
```

### 样式定制

可以通过CSS自定义拖拽元素样式：
```css
.draggable-element {
  cursor: grab; /* 抓取状态光标 */
  user-select: none; /* 防止选中文本 */
  transition: box-shadow 0.2s; /* 添加过渡效果 */
}

.draggable-element:active {
  cursor: grabbing; /* 拖拽中光标 */
  box-shadow: 0 0 10px rgba(0,0,0,0.2); /* 拖拽时阴影效果 */
}
```