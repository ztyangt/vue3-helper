---
outline: deep
---

# Segmented 分段控制器

:::info
提供美观的分段选择器组件，支持单选操作、平滑滑动动画和高度自定义样式。
:::

## 组件特性

- **类型安全**：完整的TypeScript支持
- **响应式设计**：三种预设尺寸（small/medium/large）
- **灵活配置**：支持图标、禁用状态和自定义插槽
- **平滑动画**：带方向感知的滑动指示器
- **主题定制**：通过SCSS变量全面控制样式

## 基本用法

```vue
<template>
  <Segmented 
    v-model="currentTab"
    :options="tabs"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref('home')
const tabs = [
  { label: '首页', value: 'home' },
  { label: '文档', value: 'docs' },
  { label: '设置', value: 'settings' }
]
</script>
```

## Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | `SegmentedOption[]` | - | **必填**，选项配置数组 |
| `value` | `string \| number` | `''` | 当前选中值，支持 `v-model` |
| `block` | `boolean` | `false` | 是否撑满父容器宽度 |
| `disabled` | `boolean` | `false` | 是否禁用整个组件 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸 |

## 样式定制

### SCSS变量

```scss
// 基础变量
$segmented-bg: #f5f5f5;  // 背景色
$segmented-color: rgba(0, 0, 0, 0.85);  // 文字颜色
$segmented-selected-bg: #fff;  // 选中项背景
$segmented-thumb-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03); // 滑块阴影

// 尺寸变量
$segmented-height-medium: 32px;  // 默认高度
$segmented-font-size-medium: 14px; // 默认字号
$segmented-padding-medium: 0 15px; // 默认内边距
```

### 尺寸变量对照表

| 变量 | small | medium | large |
|------|-------|--------|-------|
| 高度 | 24px | 32px | 40px |
| 字号 | 12px | 14px | 16px |
| 内边距 | 0 11px | 0 15px | 0 19px |

## 高级用法

### 自定义选项内容

```vue
<template>
  <Segmented v-model="value" :options="options">
    <template #label-custom="{ option }">
      <span style="color: red">{{ option.label }}</span>
      <Badge count="5" />
    </template>
  </Segmented>
</template>
```

### 动态禁用选项

```vue
<script setup>
const options = ref([
  { label: '公开', value: 'public' },
  { label: '私有', value: 'private', disabled: true }
])
</script>
```

## 设计细节

### DOM结构

```html
<div class="cl__segmented">
  <div class="cl__segmented-thumb" /> <!-- 滑动指示器 -->
  <div class="cl__segmented-item">选项1</div>
  <div class="cl__segmented-item">选项2</div>
</div>
```

### 动画实现原理

1. **位置计算**：
   ```ts
   thumbEl.style.left = `${selectedRect.left - containerRect.left}px`;
   ```

2. **方向检测**：
   ```ts
   const direction = currentIndex > previousIndex ? 'right' : 'left';
   ```

3. **平滑过渡**：
   ```scss
   transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
   ```

## 最佳实践

1. **选项设计**：
   - 保持选项文字简洁
   - 最多不超过5个选项
   - 重要操作放在左侧

2. **无障碍访问**：
   ```vue
   <Segmented 
     aria-label="内容筛选器"
     :options="options"
   />
   ```

3. **移动端适配**：
   ```scss
   @media (max-width: 768px) {
     .cl__segmented {
       width: 100%;
     }
   }
   ```

## 主题定制示例

```scss
// 深色主题
.dark-mode {
  --segmented-bg: #333;
  --segmented-color: #eee;
  --segmented-selected-bg: #555;
}
```