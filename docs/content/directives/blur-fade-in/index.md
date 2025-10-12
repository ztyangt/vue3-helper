---
outline: deep
---

# BlurFadeIn 图片模糊渐入指令

为图片提供优雅的加载效果，支持模糊渐入动画、加载占位符、错误处理和缩略图预览功能。

## 功能特性

- **模糊渐入效果**：图片加载时从模糊状态平滑过渡到清晰状态
- **加载占位符**：可自定义的加载动画和占位样式
- **错误处理**：图片加载失败时显示备用图片或错误占位符
- **缩略图支持**：可先显示低质量缩略图，再加载原图
- **自动重试**：智能处理图片加载失败情况
- **响应式更新**：绑定值变化时自动重新应用效果

## 指令注册

### 全局注册

```ts
import { createApp } from 'vue'
import App from './App.vue'
import blurFadeInDirective from './directives/blurFadeIn'

const app = createApp(App)
app.directive('blur-fade-in', blurFadeInDirective)
app.mount('#app')
```

### 局部注册

```vue
<script setup>
import blurFadeInDirective from './directives/blurFadeIn'

const vBlurFadeIn = blurFadeInDirective
</script>

<template>
  <img v-blur-fade-in="{ /* 配置选项 */ }" src="image.jpg" />
</template>
```

## 类型定义

### BlurFadeInOptions

```ts
export interface BlurFadeInOptions {
  /** 模糊程度，默认 5px */
  blurAmount?: number;
  /** 动画持续时间（秒），默认 1s */
  duration?: number;
  /** 缩略图URL，加载时先显示缩略图 */
  thumbnail?: string;
  /** 占位符配置，true 使用默认，false 禁用，对象可自定义 */
  placeholder?: boolean | {
    /** 自定义CSS类名 */
    className?: string;
    /** 自定义CSS样式 */
    style?: string;
  };
  /** 错误时显示的备用图片URL */
  errorImage?: string;
}

export type BlurFadeInBindingValue = BlurFadeInOptions | undefined;
```

## 使用示例

### 基础用法

```vue
<template>
  <img 
    v-blur-fade-in 
    src="https://example.com/image.jpg" 
    alt="示例图片"
  />
</template>
```

### 自定义模糊效果

```vue
<template>
  <img 
    v-blur-fade-in="{ 
      blurAmount: 10, 
      duration: 2 
    }" 
    src="https://example.com/image.jpg" 
    alt="自定义模糊效果"
  />
</template>
```

### 使用缩略图

```vue
<template>
  <img 
    v-blur-fade-in="{ 
      thumbnail: 'https://example.com/thumbnail.jpg' 
    }" 
    src="https://example.com/large-image.jpg" 
    alt="带缩略图的图片"
  />
</template>
```

### 自定义占位符

```vue
<template>
  <img 
    v-blur-fade-in="{ 
      placeholder: {
        className: 'custom-loader',
        style: `
          .custom-loader {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }
    }" 
    src="https://example.com/image.jpg" 
    alt="自定义占位符"
  />
</template>
```

### 错误处理配置

```vue
<template>
  <img 
    v-blur-fade-in="{ 
      errorImage: 'https://example.com/fallback.jpg',
      placeholder: true 
    }" 
    src="https://example.com/may-fail.jpg" 
    alt="带错误处理的图片"
  />
</template>
```

### 禁用占位符

```vue
<template>
  <img 
    v-blur-fade-in="{ 
      placeholder: false 
    }" 
    src="https://example.com/image.jpg" 
    alt="无占位符图片"
  />
</template>
```

### 批量处理容器内图片

```vue
<template>
  <div v-blur-fade-in="{ blurAmount: 8, duration: 1.5 }">
    <img src="image1.jpg" alt="图片1" />
    <img src="image2.jpg" alt="图片2" />
    <img src="image3.jpg" alt="图片3" />
  </div>
</template>
```

## 配置参数

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `blurAmount` | `number` | `5` | 初始模糊程度（像素） |
| `duration` | `number` | `1` | 动画持续时间（秒） |
| `thumbnail` | `string` | `""` | 缩略图URL地址 |
| `placeholder` | `boolean \| object` | `true` | 占位符配置，可自定义样式 |
| `errorImage` | `string` | `""` | 加载失败时显示的备用图片 |

### placeholder 配置详情

当 `placeholder` 为对象时：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `className` | `string` | 自定义CSS类名 |
| `style` | `string` | 自定义CSS样式字符串 |

## 实现原理

1. **初始化阶段**：设置图片模糊和透明状态，创建占位符元素
2. **加载阶段**：监听图片加载事件，加载完成后移除模糊效果
3. **错误处理**：加载失败时尝试显示备用图片或错误占位符
4. **动画效果**：使用CSS transition实现平滑的模糊渐入效果
5. **样式注入**：动态注入必要的CSS样式到文档头部

## 注意事项

- 指令会自动将父元素设置为 `position: relative`（如果尚未设置）
- 错误图片应避免与原始图片相同，防止无限循环
- 自定义样式需要提供完整的CSS规则，包括动画定义
- 指令支持响应式更新，绑定值变化时会重新应用效果

## 浏览器兼容性

- 支持所有现代浏览器
- 依赖CSS filter和transition特性
- 优雅降级：在不支持的浏览器中显示正常加载行为

## 性能优化

- 样式只注入一次，避免重复创建
- 使用事件委托，减少内存占用
- 自动清理不再需要的DOM元素和事件监听器