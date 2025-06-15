---
outline: deep
---

# 加载状态指令

:::info
提供一个全功能的加载状态指令，支持自定义加载样式、文本、颜色和延迟显示等配置。
:::

## v-loading

### 类型声明

```ts
/**
 * 加载状态指令
 * @param el - 应用指令的HTML元素
 * @param binding - 指令绑定值，可以是布尔值或配置对象
 */
export declare const loadingDirective: Directive<LoadingEl, LoadingBinding>;

interface LoadingOptions {
  value?: boolean;          // 是否显示加载状态
  text?: string;            // 加载文本
  background?: string;      // 背景颜色
  spinnerColor?: string;    // 加载动画颜色
  style?: string;           // 加载动画样式类
  delay?: number;           // 延迟显示时间(ms)
}

type LoadingBinding = boolean | LoadingOptions;
```

### 使用示例

#### 基本用法
```vue
<template>
  <div v-loading="isLoading">内容区域</div>
</template>

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)
</script>
```

#### 自定义配置
```vue
<template>
  <div 
    v-loading="{
      value: isLoading,
      text: '加载中...',
      background: 'rgba(0,0,0,0.5)',
      spinnerColor: '#ff0000',
      delay: 500
    }"
  >
    内容区域
  </div>
</template>
```

#### 动态修改配置
```vue
<template>
  <div v-loading="loadingOptions">内容区域</div>
  <button @click="startLoading">开始加载</button>
</template>

<script setup>
import { ref } from 'vue'
const loadingOptions = ref({
  value: false,
  text: '处理中...'
})

const startLoading = () => {
  loadingOptions.value = {
    ...loadingOptions.value,
    value: true
  }
}
</script>
```

### 参数配置

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | boolean | true | 是否显示加载状态 |
| text | string | '' | 加载提示文本 |
| background | string | 'rgba(255,255,255,0.2)' | 遮罩背景色 |
| spinnerColor | string | '#3498db' | 加载动画颜色 |
| style | string | 'loader-l13' | 加载动画样式类 |
| delay | number | 300 | 延迟显示时间(ms) |

### 功能特性

1. **灵活配置**：
   - 支持简单布尔值控制
   - 支持完整配置对象
   - 支持动态更新配置

2. **性能优化**：
   - 延迟加载机制避免闪烁
   - 自动清理资源防止内存泄漏
   - 使用Vue组件系统实现

3. **视觉定制**：
   - 完全可定制的加载动画
   - 支持自定义文本和颜色
   - 响应式布局适应容器

4. **智能处理**：
   - 自动处理父元素定位
   - 确保加载层始终在最上层
   - 平滑显示/隐藏过渡

### 实现原理

1. **指令生命周期**：
   - `mounted`: 创建加载组件实例
   - `updated`: 响应式更新状态
   - `unmounted`: 清理资源

2. **延迟处理**：
   ```ts
   setTimeout(() => {
     if (options.value) {
       showLoading();
     }
   }, delay);
   ```

3. **状态更新**：
   ```ts
   el._loadingInstance.setVisible?.(isLoading);
   el._loadingInstance.$el.style.display = isLoading ? "flex" : "none";
   ```

### 注意事项

1. **样式要求**：
   - 确保导入相关SCSS样式文件
   - 父元素需要有非static定位

2. **性能考虑**：
   - 对于频繁切换的场景，适当设置delay
   - 大量使用时应考虑全局loading

3. **浏览器兼容**：
   - 需要现代浏览器支持
   - 不支持IE11及以下版本

### 扩展用法

#### 全局配置默认值
```ts
import LoadingDirective from './directives/loading'

app.directive('loading', LoadingDirective)

// 修改全局默认配置
app.config.globalProperties.$loadingDefaults = {
  background: 'rgba(0,0,0,0.7)',
  delay: 500
}
```

#### 自定义加载动画
```scss
// 在样式文件中添加自定义动画类
.my-custom-loader {
  /* 自定义动画样式 */
}
```

```vue
<template>
  <div v-loading="{ style: 'my-custom-loader' }"></div>
</template>
```
