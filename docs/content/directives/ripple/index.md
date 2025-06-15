---
outline: deep
---

# 水波纹效果

:::info
提供一个点击水波纹效果指令，模拟Material Design风格的点击涟漪效果，支持高度自定义配置。
:::

## v-ripple

### 类型声明

```ts
/**
 * 水波纹指令
 * @param el - 应用指令的HTML元素
 * @param binding - 指令绑定配置对象
 */
export declare const ripple: Directive;

interface IRippleDirectiveOptions {
  color: string;          // 波纹颜色
  initialOpacity: number; // 初始透明度
  finalOpacity: number;   // 结束透明度
  duration: number;       // 动画持续时间(ms)
  easing: string;         // 动画缓动函数
  delay: number;          // 延迟时间(ms)
  disabled: boolean;      // 是否禁用
  center: boolean;        // 是否从中心扩散
}
```

### 使用示例

#### 基本用法
```vue
<template>
  <button v-ripple>点击我</button>
</template>

<script setup>
import { ripple } from '@wiit/vue3-helper'
</script>
```

#### 自定义配置
```vue
<template>
  <button 
    v-ripple="{
      color: 'rgba(255,0,0,0.3)',
      duration: 500,
      center: true
    }"
  >
    红色中心扩散效果
  </button>
</template>
```

#### 禁用效果
```vue
<template>
  <button v-ripple="{ disabled: true }">
    禁用波纹效果
  </button>
</template>
```

### 参数配置

| 参数名          | 类型    | 默认值               | 说明                          |
|-----------------|---------|----------------------|-----------------------------|
| color           | string  | 'var(--ripple-color)'| 波纹颜色，支持CSS变量         |
| initialOpacity  | number  | 0.1                  | 波纹初始透明度(0-1)          |
| finalOpacity    | number  | 0.05                 | 波纹消失时透明度(0-1)        |
| duration        | number  | 350                  | 动画持续时间(毫秒)           |
| easing          | string  | 'ease-out'           | CSS动画缓动函数              |
| delay           | number  | 60                   | 动画延迟时间(毫秒)           |
| disabled        | boolean | false                | 是否禁用波纹效果             |
| center          | boolean | false                | 是否从元素中心开始扩散       |

### 全局默认配置

```ts
export const DEFAULT_PLUGIN_OPTIONS: IRipplePluginOptions = {
  directive: 'ripple',      // 指令名称
  color: 'var(--ripple-color)',
  initialOpacity: 0.1,
  finalOpacity: 0.05,
  duration: 350,
  easing: 'ease-out',
  delay: 60,
  disabled: false,
  center: false
}
```

### 实现原理

1. **波纹生成**：
   - 计算点击位置到元素最远角的距离
   - 创建圆形波纹元素并定位到点击位置
   - 应用缩放动画实现扩散效果

2. **视觉效果**：
   - 使用多层透明度实现渐变消失效果
   - 支持从点击位置或中心点开始扩散
   - 自动适应元素形状和位置

3. **性能优化**：
   - 使用CSS过渡实现平滑动画
   - 自动清理已完成动画的元素
   - 支持多波纹同时存在

### 注意事项

1. **元素定位要求**：
   - 目标元素需要非static定位
   - 指令会自动将static定位改为relative

2. **CSS变量支持**：
   ```css
   :root {
     --ripple-color: currentColor; /* 默认使用文字颜色 */
   }
   ```

3. **浏览器兼容性**：
   - 需要支持PointerEvent API
   - 现代浏览器完全支持

4. **移动端适配**：
   - 完美支持触摸事件
   - 自动处理触摸取消事件
