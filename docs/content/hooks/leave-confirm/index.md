---
outline: deep
---

# 页面离开确认 Hook

:::info
提供页面离开保护功能，当用户尝试离开或刷新页面时显示确认提示，防止意外数据丢失。
:::

## useLeaveConfirm

### 类型声明

```ts
interface Options {
  enabled?: Ref<boolean> | boolean; // 是否启用（可动态控制）
  message?: string; // 自定义提示消息
}

export function useLeaveConfirm(options?: Options): {
  setEnabled: (value: boolean) => void;
}
```

### 功能特性

- **双重防护**：同时处理浏览器标签关闭/刷新和路由跳转
- **灵活控制**：支持动态启用/禁用保护
- **自定义提示**：可配置提示消息内容
- **自动清理**：组件卸载时自动移除事件监听

### 使用示例

#### 基本用法

```vue
<script setup>
import { useLeaveConfirm } from '@/composables/useLeaveConfirm'

// 默认启用，使用默认提示消息
useLeaveConfirm()
</script>
```

#### 动态控制

```vue
<script setup>
import { ref } from 'vue'
import { useLeaveConfirm } from '@/composables/useLeaveConfirm'

const hasUnsavedChanges = ref(true)

// 根据 hasUnsavedChanges 状态动态启用/禁用
const { setEnabled } = useLeaveConfirm({ 
  enabled: hasUnsavedChanges,
  message: '您有未保存的修改！'
})

// 保存完成后禁用保护
const handleSave = async () => {
  await saveData()
  setEnabled(false)
}
</script>
```

#### 表单场景

```vue
<script setup>
import { ref, watch } from 'vue'
import { useLeaveConfirm } from '@/composables/useLeaveConfirm'

const formData = ref(initialData)
const initialData = { /*...*/ }

// 当表单数据变化时启用保护
const isDirty = ref(false)
watch(formData, () => isDirty.value = true, { deep: true })

useLeaveConfirm({ enabled: isDirty })
</script>
```

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options.enabled` | `Ref<boolean> \| boolean` | `true` | 是否启用保护，传入 Ref 可动态控制 |
| `options.message` | `string` | "确定要离开此页面吗？未保存的更改可能会丢失。" | 自定义提示消息 |

### 返回值

| 方法 | 说明 |
|------|------|
| `setEnabled` | 手动设置启用/禁用状态 `(value: boolean) => void` |

### 实现原理

1. **浏览器级别防护**：
   - 通过 `beforeunload` 事件监听页面刷新/关闭
   - 设置 `event.preventDefault()` 和 `event.returnValue`

2. **路由级别防护**：
   - 使用 `onBeforeRouteLeave` 路由守卫
   - 调用 `confirm()` 显示确认对话框

3. **自动清理**：
   - 组件卸载时自动移除事件监听器
   - 避免内存泄漏

### 注意事项

1. **浏览器兼容性**：
   - 现代浏览器都支持但可能不显示自定义消息
   - 部分移动浏览器可能限制此功能

2. **用户体验**：
   - 不宜过度使用，仅在真正需要时启用
   - 重要操作建议添加自动保存功能

3. **消息显示**：
   - 浏览器可能忽略自定义消息显示默认文本
   - 路由跳转使用 `confirm()` 可确保消息显示

### 最佳实践

```vue
<script setup>
// 推荐结合表单脏检查使用
const form = ref(null)
const isDirty = ref(false)

// 只有表单有修改且未提交时才启用保护
useLeaveConfirm({ 
  enabled: computed(() => isDirty.value && !isSubmitted.value)
})
</script>
```

### 替代方案

对于复杂场景，可以考虑：

1. **自动保存**：
   ```ts
   watch(formData, debounce(autoSave, 500), { deep: true })
   ```

2. **自定义弹窗**：
   ```vue
   <Modal v-if="showConfirm" @confirm="navigate" />
   ```

3. **路由元信息**：
   ```ts
   {
     path: '/edit',
     meta: { requiresConfirm: true }
   }
   ```