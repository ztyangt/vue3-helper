---
outline: deep
---

<script setup>
import CropperDemo from './demo/index.vue'
</script>

# 图片裁剪器

<CropperDemo />

## 功能介绍

一个功能强大的图片裁剪工具，支持以下特性：

- ✅ 图片拖拽和缩放
- ✅ 裁剪区域移动和大小调整
- ✅ 自定义宽高比限制
- ✅ 实时预览功能
- ✅ 多格式图片导出（PNG、JPEG、WebP）
- ✅ 触摸设备支持
- ✅ 自定义样式（边框、遮罩、手柄）

## 安装和使用

### 基本使用

```typescript
import { Cropper } from 'cool-helper/utils/cropper'

// 创建裁剪器实例
const cropper = new Cropper(containerElement, {
  aspectRatio: 16 / 9,
  cropWidth: 400,
  cropHeight: 225
})

// 设置图片
cropper.setImage('https://example.com/image.jpg')

// 获取裁剪后的图片
const croppedImageUrl = cropper.crop()
```

### Vue 组件中使用

```vue
<template>
  <div class="cropper-container">
    <div ref="cropperContainer"></div>
    <button @click="cropImage">裁剪图片</button>
    <img v-if="croppedImage" :src="croppedImage" alt="裁剪结果">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Cropper } from 'cool-helper/utils/cropper'

const cropperContainer = ref<HTMLDivElement>()
const croppedImage = ref<string>()
let cropper: Cropper

onMounted(() => {
  if (cropperContainer.value) {
    cropper = new Cropper(cropperContainer.value, {
      aspectRatio: 1,
      cropWidth: 300,
      cropHeight: 300
    })
    cropper.setImage('https://example.com/image.jpg')
    
    // 监听预览事件
    cropper.on('preview', (previewUrl) => {
      console.log('裁剪区域变化，预览URL:', previewUrl)
    })
  }
})

onUnmounted(() => {
  if (cropper) {
    cropper.destroy()
  }
})

const cropImage = () => {
  const result = cropper.crop({
    format: 'jpeg',
    quality: 0.9,
    outputWidth: 800,
    outputHeight: 800
  })
  croppedImage.value = result
}
</script>

<style scoped>
.cropper-container {
  width: 600px;
  height: 600px;
  margin: 0 auto;
}
</style>
```

## API 文档

### 构造函数

```typescript
new Cropper(container: HTMLElement, options?: CropperOptions)
```

#### 参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| `container` | `HTMLElement` | 裁剪器容器元素 |
| `options` | `CropperOptions` | 裁剪器配置选项 |

### 方法

#### setImage(imageSrc: string | File)

设置要裁剪的图片。

| 参数名 | 类型 | 描述 |
|--------|------|------|
| `imageSrc` | `string \| File` | 图片URL或File对象 |

#### crop(options?: CropOptions): string

裁剪图片并返回裁剪后的图片URL。

| 参数名 | 类型 | 描述 |
|--------|------|------|
| `options` | `CropOptions` | 裁剪选项 |

**返回值**：裁剪后的图片数据URL

#### getCropArea(): CropArea

获取当前裁剪区域信息。

**返回值**：裁剪区域信息对象

#### `setCropArea(cropArea: Partial<CropArea>)`

设置裁剪区域。

| 参数名 | 类型 | 描述 |
|--------|------|------|
| `cropArea` | `Partial<CropArea>` | 裁剪区域信息 |

#### rotate(angle: number)

旋转图片。

| 参数名 | 类型 | 描述 |
|--------|------|------|
| `angle` | `number` | 旋转角度（弧度） |

#### reset()

重置裁剪器状态。

#### destroy()

销毁裁剪器实例，清理资源。

### 事件

#### preview

当裁剪区域变化时触发，返回实时预览的图片URL。

```typescript
cropper.on('preview', (previewUrl: string) => {
  // 处理预览图片
})
```

## 配置选项

| 选项名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `aspectRatio` | `number &#124; null` | `null` | 裁剪区域宽高比，null表示不限制 |
| `cropWidth` | `number` | `300` | 初始裁剪区域宽度 |
| `cropHeight` | `number` | `300` | 初始裁剪区域高度 |
| `showCropArea` | `boolean` | `true` | 是否显示裁剪区域 |
| `cropBorderColor` | `string` | `#39f` | 裁剪区域边框颜色 |
| `cropBorderWidth` | `number` | `2` | 裁剪区域边框宽度 |
| `maskColor` | `string` | `rgba(0, 0, 0, 0.5)` | 遮罩颜色 |
| `showHandles` | `boolean` | `true` | 是否显示调整手柄 |
| `handleSize` | `number` | `10` | 调整手柄大小 |
| `handleColor` | `string` | `#39f` | 调整手柄颜色 |

## 类型定义

### CropperOptions

```typescript
interface CropperOptions {
  aspectRatio?: number;
  cropWidth?: number;
  cropHeight?: number;
  showCropArea?: boolean;
  cropBorderColor?: string;
  cropBorderWidth?: number;
  maskColor?: string;
  showHandles?: boolean;
  handleSize?: number;
  handleColor?: string;
}
```

### CropArea

```typescript
interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}
```

### CropOptions

```typescript
interface CropOptions {
  outputWidth?: number;
  outputHeight?: number;
  format?: 'png' | 'jpeg' | 'webp';
  quality?: number;
}
```

## 高级用法

### 自定义样式

```typescript
const cropper = new Cropper(containerElement, {
  cropBorderColor: '#ff5722',
  cropBorderWidth: 3,
  maskColor: 'rgba(255, 255, 255, 0.7)',
  handleColor: '#ff5722',
  handleSize: 12
})
```

### 固定宽高比裁剪

```typescript
// 1:1 正方形裁剪
const cropper = new Cropper(containerElement, {
  aspectRatio: 1,
  cropWidth: 400,
  cropHeight: 400
})

// 16:9 宽屏裁剪
const cropper = new Cropper(containerElement, {
  aspectRatio: 16 / 9,
  cropWidth: 800,
  cropHeight: 450
})
```

### 导出不同格式和质量

```typescript
// 导出高质量JPEG
const jpegUrl = cropper.crop({
  format: 'jpeg',
  quality: 0.95,
  outputWidth: 1920,
  outputHeight: 1080
})

// 导出WebP格式
const webpUrl = cropper.crop({
  format: 'webp',
  quality: 0.8,
  outputWidth: 1200,
  outputHeight: 675
})
```

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 支持触摸的移动设备

## 注意事项

1. 确保容器元素有明确的宽高
2. 图片资源需要支持跨域访问，否则可能无法正常裁剪
3. 使用完毕后记得调用 `destroy()` 方法清理资源
4. 实时预览功能会生成临时URL，注意及时释放资源

:::tip
在Vue组件中使用时，建议在 `onUnmounted` 钩子中调用 `destroy()` 方法清理资源。
:::