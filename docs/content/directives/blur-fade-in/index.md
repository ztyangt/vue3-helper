
---
outline: deep
---

# Blur Fade-In 指令

:::info
提供图片加载时的模糊淡入动画效果，支持自定义参数和缩略图占位，提升用户体验。
:::

## 功能特性

- **平滑过渡**：图片加载时从模糊到清晰的渐变效果
- **淡入动画**：配合透明度变化实现柔和显示
- **缩略图支持**：可设置低分辨率预览图先行展示
- **自适应处理**：支持直接作用于`<img>`标签或容器元素
- **响应式更新**：动态参数变化会自动重新应用效果

## 基本用法

### 全局注册指令

```ts
// main.ts
import { blurFadeInDirective } from '@/directives/blur-fade-in'

app.directive('blur-fade-in', blurFadeInDirective)
```

### 在组件中使用

```vue
<template>
  <!-- 基本用法 -->
  <img v-blur-fade-in src="large-image.jpg" alt="示例图片">
  
  <!-- 自定义参数 -->
  <img 
    v-blur-fade-in="{ 
      blurAmount: 10, 
      duration: 1,
      thumbnail: 'thumbnail.jpg'
    }"
    src="large-image.jpg"
    alt="示例图片"
  >
  
  <!-- 容器用法（作用于所有子图片） -->
  <div v-blur-fade-in="{ duration: 0.8 }">
    <img src="image1.jpg" alt="图片1">
    <img src="image2.jpg" alt="图片2">
  </div>
</template>
```

## 配置参数

### BlurFadeInOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `blurAmount` | `number` | `5` | 初始模糊程度（像素） |
| `duration` | `number` | `0.5` | 动画持续时间（秒） |
| `thumbnail` | `string` | `''` | 缩略图URL（可选） |

## 实现细节

### 动画原理

1. **初始状态**：
   ```css
   filter: blur(5px);
   opacity: 0;
   transition: filter 0.5s ease, opacity 0.5s ease;
   ```

2. **加载完成**：
   ```css
   filter: blur(0);
   opacity: 1;
   ```

3. **缩略图处理**：
   ```css
   background-image: url(thumbnail.jpg);
   background-size: cover;
   ```

### 生命周期

1. **指令挂载**：
   - 检查图片是否已加载
   - 应用初始样式
   - 设置加载监听器

2. **图片加载**：
   - 移除缩略图背景
   - 触发重绘
   - 应用动画效果

3. **指令更新**：
   - 参数变化时重新应用效果

## 最佳实践

### 性能优化

```vue
<template>
  <!-- 对重要图片使用 -->
  <img 
    v-blur-fade-in="{ thumbnail: 'low-res.jpg' }"
    src="high-res.jpg"
    loading="lazy"
    alt="优化示例"
  >
</template>
```

### 错误处理

```ts
// 自定义错误处理
app.directive('blur-fade-in', {
  ...blurFadeInDirective,
  mounted(el, binding) {
    const options = {
      ...binding.value,
      onError: () => {
        // 自定义错误处理逻辑
      }
    }
    blurFadeInDirective.mounted(el, { ...binding, value: options })
  }
})
```

## 样式定制

### 扩展动画效果

```scss
// 添加额外的动画效果
img[data-blur-fade-in] {
  transform: scale(0.95);
  transition: filter 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
  
  &.loaded {
    transform: scale(1);
  }
}
```

### 主题适配

```scss
.dark-mode {
  img[data-blur-fade-in] {
    background-color: #333;
  }
}
```

## 注意事项

1. **浏览器支持**：
   - 需要支持CSS `filter`属性
   - 过渡效果需要硬件加速

2. **性能影响**：
   - 避免在大量图片上同时使用
   - 对移动设备考虑减少模糊程度

3. **图片加载**：
   - 建议配合`loading="lazy"`使用
   - 重要图片可预加载

## 扩展建议

### 自定义指令选项

```ts
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    vBlurFadeIn?: {
      defaultOptions?: BlurFadeInOptions
    }
  }
}

app.config.globalProperties.vBlurFadeIn = {
  defaultOptions: {
    blurAmount: 3,
    duration: 0.3
  }
}
```

### 动画回调

```ts
interface BlurFadeInOptions {
  onLoad?: () => void
  onError?: () => void
  onComplete?: () => void
}
```