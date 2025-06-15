---
outline: deep
---

# 事件监听

:::info
提供安全的事件监听和移除功能，封装了标准的 `addEventListener` 和 `removeEventListener` 方法，并添加了类型检查和函数存在性验证。
:::

## addEventListen

### 类型声明

```ts
/**
 * 添加事件监听器
 * @param target 监听目标，可以是Window或HTMLElement
 * @param event 事件名称
 * @param handler 事件处理函数
 * @param capture 是否在捕获阶段触发，默认为false
 */
export declare function addEventListen(
  target: Window | HTMLElement,
  event: string,
  handler: EventListenerOrEventListenerObject,
  capture?: boolean
): void;
```

### 使用示例

```ts
import { addEventListen } from '@wiit/vue3-helper'

const handler = () => console.log('Clicked!');
addEventListen(document.getElementById('myButton'), 'click', handler);
```

### 参数

| 参数名   | 类型                             | 默认值  | 说明                          |
| -------- | -------------------------------- | ------- | ----------------------------- |
| target   | Window \| HTMLElement            | -       | 要添加事件监听的目标元素      |
| event    | string                           | -       | 要监听的事件名称              |
| handler  | EventListenerOrEventListenerObject | -       | 事件处理函数                  |
| capture  | boolean                          | false   | 是否在捕获阶段触发事件监听    |

## removeEventListen

### 类型声明

```ts
/**
 * 移除事件监听器
 * @param target 监听目标，可以是Window或HTMLElement
 * @param event 事件名称
 * @param handler 事件处理函数
 * @param capture 是否在捕获阶段触发，默认为false
 */
export declare function removeEventListen(
  target: Window | HTMLElement,
  event: string,
  handler: EventListenerOrEventListenerObject,
  capture?: boolean
): void;
```

### 使用示例

```ts
import { removeEventListen } from '@wiit/vue3-helper'

const handler = () => console.log('Clicked!');
removeEventListen(document.getElementById('myButton'), 'click', handler);
```

### 参数

| 参数名   | 类型                             | 默认值  | 说明                          |
| -------- | -------------------------------- | ------- | ----------------------------- |
| target   | Window \| HTMLElement            | -       | 要移除事件监听的目标元素      |
| event    | string                           | -       | 要移除的事件名称              |
| handler  | EventListenerOrEventListenerObject | -       | 要移除的事件处理函数          |
| capture  | boolean                          | false   | 是否在捕获阶段触发事件监听    |

## 特性说明

1. **安全调用**：在调用原生方法前会检查方法是否存在
2. **类型安全**：严格限制参数类型，避免运行时错误
3. **统一接口**：提供一致的调用方式处理Window和HTMLElement对象
4. **默认参数**：capture参数默认为false，符合大多数使用场景

## 最佳实践

```ts
// 定义处理函数时使用具名函数，方便移除
function handleClick() {
  console.log('Button clicked');
}

// 添加监听
addEventListen(buttonElement, 'click', handleClick);

// 移除监听（确保参数与添加时一致）
removeEventListen(buttonElement, 'click', handleClick);
```
