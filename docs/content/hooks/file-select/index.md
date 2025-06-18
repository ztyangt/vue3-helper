---
outline: deep
---

# 文件选择

:::info
提供完整的文件选择解决方案，支持单选/多选、文件夹选择、文件类型过滤和拖拽上传功能。
:::

## useFileSelect

### 类型声明

```ts
interface SelectionOptions {
  dragRef?: Readonly<ShallowRef<HTMLElement | null>>;  // 拖拽区域引用
  selectFile?: (e: Event) => void;                     // 文件选择回调
  selectFolder?: (e: Event) => void;                   // 文件夹选择回调
  dragCallback?: (e: DragEvent) => void;               // 拖拽完成回调
}

interface FileSelectOptions {
  multiple?: boolean;      // 是否允许多选
  accept?: string[];       // 允许的文件类型
  directory?: boolean;     // 是否选择文件夹
}

export function useFileSelect(options?: SelectionOptions): {
  selectFile: (selectOptions?: { multiple?: boolean; accept?: string[] }) => Promise<FileList>;
  selectFolder: () => Promise<FileList>;
  initDragDom: () => () => void;
};
```

### 使用示例

#### 基本文件选择
```vue
<script setup>
import { useFileSelect } from '@wiit/vue3-helper'

const { selectFile } = useFileSelect()

const handleSelect = async () => {
  try {
    const files = await selectFile()
    console.log('Selected files:', files)
  } catch (err) {
    console.error('Selection error:', err)
  }
}
</script>

<template>
  <button @click="handleSelect">选择文件</button>
</template>
```

#### 带类型限制的单选
```vue
<script setup>
const { selectFile } = useFileSelect()

const selectImage = async () => {
  const files = await selectFile({
    multiple: false,
    accept: ['image/png', 'image/jpeg']
  })
  // 处理选择的图片
}
</script>
```

#### 拖拽上传区域
```vue
<script setup>
import { ref } from 'vue'

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
  <div 
    ref="dropZone" 
    class="drop-zone"
    @click="selectFile"
  >
    点击或拖拽文件到此处
  </div>
</template>

<style>
.drop-zone {
  border: 2px dashed #ccc;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
}

.drag-active {
  border-color: #3498db;
  background: rgba(52, 152, 219, 0.1);
}
</style>
```

### 方法说明

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `selectFile` | `{ multiple?: boolean, accept?: string[] }` | `Promise<FileList>` | 选择文件，可配置多选和文件类型 |
| `selectFolder` | - | `Promise<FileList>` | 选择文件夹 |
| `initDragDom` | - | - | 初始化拖拽区域DOM引用 |

### 配置选项

#### 全局选项 (SelectionOptions)
| 参数 | 类型 | 说明 |
|------|------|------|
| `dragRef` | `ShallowRef<HTMLElement>` | 拖拽区域DOM引用 |
| `selectFile` | `(e: Event) => void` | 文件选择成功回调 |
| `selectFolder` | `(e: Event) => void` | 文件夹选择成功回调 |
| `dragCallback` | `(e: DragEvent) => void` | 文件拖拽完成回调 |

#### 文件选择选项 (FileSelectOptions)
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `multiple` | `boolean` | `true` | 是否允许多选 |
| `accept` | `string[]` | - | 允许的文件MIME类型数组 |
| `directory` | `boolean` | `false` | 是否选择文件夹 |

### 功能特性

1. **灵活选择模式**：
   - 支持单选/多选文件
   - 支持文件夹选择
   - 支持文件类型过滤

2. **拖拽上传**：
   - 可视化拖拽状态反馈
   - 自动处理拖拽事件
   - 支持自定义拖拽回调

3. **类型安全**：
   - 完整的TypeScript支持
   - 明确的参数和返回类型

4. **用户体验优化**：
   - 自动重置input元素
   - 清晰的错误反馈
   - 可定制的UI反馈

### 实现细节

1. **动态创建input元素**：
   ```ts
   const fileInput = document.createElement("input")
   fileInput.type = "file"
   fileInput.multiple = config.multiple
   fileInput.accept = config.accept?.join(",") || ""
   ```

2. **拖拽事件处理**：
   ```ts
   element.addEventListener("dragover", (e) => {
     e.preventDefault()
     element.classList.add("drag-active")
   })
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

### 最佳实践

1. **文件类型过滤**：
   ```ts
   // 只允许图片文件
   accept: ['image/png', 'image/jpeg', 'image/gif']
   ```

2. **错误处理**：
   ```ts
   try {
     const files = await selectFile()
   } catch (err) {
     showToast('请选择有效的文件')
   }
   ```

### 扩展用法

#### 结合上传组件
```vue
<script setup>
const { selectFile } = useFileSelect()

const uploadFiles = async () => {
  const files = await selectFile({
    accept: ['.pdf', '.docx']
  })
  await uploadToServer(files)
}
</script>
```