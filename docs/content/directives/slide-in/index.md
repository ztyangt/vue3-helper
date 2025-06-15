---
outline: deep
---

# 滑动进入动画指令

:::info
提供元素进入视口时从下方平滑滑动出现的动画效果，支持自定义滑动距离和动画时长。
:::

## v-slide-in

### 类型声明

```ts
/**
 * 滑动进入动画指令
 * @param el - 应用指令的HTML元素
 * @param binding - 指令绑定值，可以是数字或配置对象
 */
export declare const slideIn: Directive<HTMLElement, number | SlideInOptions>;

interface SlideInOptions {
  distance?: number; // 滑动距离(px)
  duration?: number; // 动画持续时间(ms)
}
```

### 使用示例

#### 基本用法（使用默认值）
```vue
<template>
  <div v-slide-in>默认滑动效果</div>
</template>
```

#### 指定滑动距离
```vue
<template>
  <div v-slide-in="100">从100px滑动进入</div>
</template>
```

#### 完整配置
```vue
<template>
  <div v-slide-in="{ distance: 80, duration: 800 }">
    自定义距离和时长的滑动效果
  </div>
</template>
```

### 参数配置

| 参数形式 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| 不传参数 | - | distance: 50px<br>duration: 500ms | 使用默认配置 |
| 数字 | `number` | - | 只设置滑动距离，时长使用默认值 |
| 配置对象 | `{ distance?: number, duration?: number }` | - | 可分别设置距离和时长 |

### 默认值

```ts
const DEFAULT_DISTANCE = 50; // 默认滑动距离: 50px
const DEFAULT_DURATION = 500; // 默认动画时长: 500ms
```

### 实现原理

1. **初始化检查**：
   - 判断元素是否在视口下方，如果在视口内则不创建动画

2. **动画创建**：
   - 使用Web Animation API创建平移和透明度动画
   - 初始状态：元素向下偏移指定距离且半透明
   - 结束状态：元素回到原位且完全不透明

3. **智能触发**：
   - 使用IntersectionObserver监听元素进入视口
   - 只在元素进入视口时触发动画
   - 动画播放后自动停止观察

4. **内存管理**：
   - 使用WeakMap存储动画实例，避免内存泄漏
   - 元素被移除时自动回收相关资源

### 注意事项

1. **浏览器兼容性**：
   - 需要支持IntersectionObserver和Web Animations API
   - 现代浏览器均支持

2. **性能优化**：
   - 动画使用硬件加速（transform属性）
   - 只对不可见元素创建动画
   - 每个元素只观察一次

3. **使用建议**：
   - 适合列表项、卡片等需要渐进显示的元素
   - 对于大量元素，建议配合v-for使用
   - 可以搭配CSS will-change属性优化性能
