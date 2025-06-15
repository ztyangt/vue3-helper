---
outline: deep
---


# 复制

:::info
将内容复制到剪贴板，先尝试使用 `navigator.clipboard.writeText`，如果失败则使用 `document.execCommand('copy')`。
:::

## copyToClipboard

### 类型声明

```ts
/**
 * 将文本复制到剪贴板
 * @param text 要复制的文本
 * @returns 返回一个Promise，成功时为true，失败时为false
 */
export declare function copyToClipboard(text: string): Promise<boolean>;
```

### 使用示例

```ts
import { copyToClipboard } from '@wiit/vue3-helper'

copyToClipboard('hello world')
```

### 参数

| 参数名 | 类型   | 默认值 | 说明     |
| ------ | ------ | ------ | -------- |
| text   | string | -      | 需要复制的内容 |

### 返回值

| 类型   | 说明         |
| ------ | ------------ |
| Promise | 复制成功返回 |

## copyToClipboardWithCallback

### 类型声明

```ts
/**
 * 将文本复制到剪贴板（回调版本）
 * @param text 要复制的文本
 * @param callback 完成后的回调函数，参数为是否成功
 */
export declare function copyToClipboardWithCallback(text: string, callback: (success: boolean) => void): void;
```

### 使用示例

```ts
import { copyToClipboardWithCallback } from '@wiit/vue3-helper'

copyToClipboardWithCallback('hello world', (success) => {
  if (success) {
    console.log('复制成功')
  } else {
    console.log('复制失败')
  }
}
```

### 参数

| 参数名 | 类型   | 默认值 | 说明     |
| ------ | ------ | ------ | -------- |
| text   | string | -      | 需要复制的内容 |
| callback | (success: boolean) => void | - | 复制完成后的回调函数，参数为是否成功 |  
