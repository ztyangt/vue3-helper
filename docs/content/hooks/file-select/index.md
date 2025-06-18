---
outline: deep
---

# 文件选择

:::info
提供一个组合式函数，用于处理文件选择和文件夹选择操作，支持拖拽上传和自定义回调。
:::

## useFileSelect

### 类型声明

```ts
/**
 * 文件选择组合函数
 * @param options - 配置选项
 * @returns 返回文件选择方法
 */
export function useFileSelect(options?: SelectionOptions): {
  selectFile: () => Promise<FileList>;
  selectFolder: () => Promise<FileList>;
};

interface SelectionOptions {
  dragRef?: Readonly<ShallowRef<HTMLDivElement | null>>; // 拖拽区域引用
  selectFile?: (e: Event) => void;                       // 文件选择回调
  selectFolder?: (e: Event) => void;                     // 文件夹选择回调
  dragCallback?: (e: DragEvent) => void;                 // 拖拽完成回调
}
```

### 使用示例

#### 基本用法
```vue
<script setup>
import { ref } from 'vue'
import { useFileSelect } from '@wiit/vue3-helper'

const { selectFile, selectFolder } = useFileSelect()

const handleFiles = async () => {
  try {
    const files = await selectFile()
    console.log('Selected files:', files)
  } catch (err) {
    console.error('File selection error:', err)
  }
}
</script>

<template>
  <button @click="handleFiles">选择文件</button>
  <button @click="selectFolder">选择文件夹</button>
</template>
```

#### 拖拽上传
```vue
<script setup>
import { ref } from 'vue'
import { useFileSelect } from '@wiit/vue3-helper'

const dropZone = ref(null)

const { selectFile } = useFileSelect({
  dragRef: dropZone,
  dragCallback: (e) => {
    const files = e.dataTransfer?.files
    if (files) {
      console.log('Dropped files:', files)
    }
  }
})
</script>

<template>
  <div ref="dropZone" class="drop-area">
    拖拽文件到此处
  </div>
</template>

<style>
.drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
}

.drag-active {
  border-color: #3498db;
  background-color: rgba(52, 152, 219, 0.1);
}
</style>
```

### 方法说明

| 方法名 | 返回值 | 说明 |
|--------|--------|------|
| `selectFile` | `Promise<FileList>` | 打开文件选择对话框(多选) |
| `selectFolder` | `Promise<FileList>` | 打开文件夹选择对话框 |

### 配置选项

| 参数名 | 类型 | 说明 |
|--------|------|------|
| `dragRef` | `ShallowRef<HTMLDivElement>` | 拖拽区域DOM引用 |
| `selectFile` | `(e: Event) => void` | 文件选择成功回调 |
| `selectFolder` | `(e: Event) => void` | 文件夹选择成功回调 |
| `dragCallback` | `(e: DragEvent) => void` | 文件拖拽完成回调 |

### 功能特性

1. **文件选择**：
   - 支持多文件选择
   - 返回原生FileList对象
   - 自动重置input元素

2. **文件夹选择**：
   - 支持webkitdirectory/mozdirectory
   - 返回文件夹内所有文件

3. **拖拽上传**：
   - 自动处理拖拽状态样式
   - 支持拖拽事件回调
   - 自动清理事件监听器

4. **类型安全**：
   - 完整的TypeScript支持
   - 明确的返回类型

### 实现细节

1. **动态创建input**：
   ```ts
   const fileInput = document.createElement("input")
   fileInput.type = "file"
   fileInput.multiple = config.multiple
   ```

2. **拖拽区域处理**：
   ```ts
   dragElement.addEventListener("dragover", handleDragEvent)
   dragElement.addEventListener("drop", handleDrop)
   ```

3. **Promise封装**：
   ```ts
   return new Promise((resolve, reject) => {
     fileInput.onchange = (e) => {
       const files = (e.target as HTMLInputElement).files
       files ? resolve(files) : reject(new Error("No files selected"))
     }
   })
   ```

### 注意事项

1. **浏览器兼容性**：
   - 文件夹选择需要现代浏览器
   - 移动端需额外处理触摸事件

2. **样式要求**：
   - 拖拽区域需要自定义样式
   - 建议添加过渡效果

3. **安全限制**：
   - 文件选择必须由用户交互触发
   - 不能自动获取文件路径

### 扩展用法

#### 自定义文件过滤
```ts
const { selectFile } = useFileSelect({
  selectFile: (e) => {
    const input = e.target as HTMLInputElement
    const files = Array.from(input.files || [])
      .filter(file => file.type.startsWith('image/'))
    console.log('Filtered files:', files)
  }
})
```

#### 结合上传组件
```vue
<script setup>
const { selectFile } = useFileSelect()

const uploadFiles = async () => {
  const files = await selectFile()
  // 调用上传API
  await api.upload(files)
}
</script>
```