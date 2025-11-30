---
outline: deep
---

# EventEmitter <Badge type="tip" text="类" />

:::info
事件发射器类，提供事件的订阅、发布和管理功能，支持单次事件监听和事件管理。
:::

## 类型声明

```ts
import type { EventListener, EventCallback } from "./types";

export class EventEmitter {
  private events: Map<string, EventListener[]> = new Map();

  /**
   * 监听事件
   * @param eventName 事件名称
   * @param callback 回调函数
   * @param once 是否只执行一次
   */
  on(eventName: string, callback: EventCallback, once?: boolean): this;

  /**
   * 监听事件，只执行一次
   * @param eventName 事件名称
   * @param callback 回调函数
   */
  once(eventName: string, callback: EventCallback): this;

  /**
   * 移除事件监听
   * @param eventName 事件名称
   * @param callback 要移除的回调函数（可选，不传则移除该事件所有监听）
   */
  off(eventName: string, callback?: EventCallback): this;

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给回调函数的参数
   */
  emit(eventName: string, ...args: any[]): boolean;

  /**
   * 清除所有事件监听
   */
  clear(): this;

  /**
   * 获取某个事件的监听器数量
   * @param eventName 事件名称
   */
  listenerCount(eventName: string): number;

  /**
   * 获取所有已注册的事件名称
   */
  eventNames(): string[];

  /**
   * 移除所有事件监听（别名方法）
   */
  removeAllListeners(): this;
}

export type EventCallback = (...args: any[]) => void;

export interface EventListener {
  callback: EventCallback;
  once?: boolean;
}
```

## 使用示例

### 基本用法

```ts
import { EventEmitter } from '@wiit/vue3-helper'

// 创建事件发射器实例
const emitter = new EventEmitter()

// 监听事件
emitter.on('event', (data) => {
  console.log('事件触发:', data)
})

// 触发事件
emitter.emit('event', 'Hello World')
// 输出: 事件触发: Hello World

// 移除事件监听
const handler = (data) => {
  console.log('另一个事件处理:', data)
}
emitter.on('event', handler)
emitter.off('event', handler)
```

### 单次事件监听

```ts
// 使用 once 方法监听事件，只执行一次
emitter.once('once-event', () => {
  console.log('这个事件只执行一次')
})

// 第一次触发有效
emitter.emit('once-event')
// 第二次触发无效，监听器已被自动移除
emitter.emit('once-event')
```

### 事件管理

```ts
// 获取已注册的事件名称
const events = emitter.eventNames()
console.log('已注册的事件:', events)

// 获取某个事件的监听器数量
const count = emitter.listenerCount('event')
console.log('event事件的监听器数量:', count)

// 清除所有事件监听
emitter.clear()
// 或者使用别名方法
// emitter.removeAllListeners()
```

## 方法说明

### on(eventName, callback, once?)

监听指定事件，可选择是否只执行一次。

**参数:**

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| eventName | string | - | 事件名称 |
| callback | EventCallback | - | 事件触发时的回调函数 |
| once | boolean | false | 是否只执行一次 |

**返回值:**

| 类型 | 说明 |
|------|------|
| this | 返回当前实例，支持链式调用 |

### once(eventName, callback)

监听指定事件，仅执行一次，执行后自动移除监听器。

**参数:**

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| eventName | string | - | 事件名称 |
| callback | EventCallback | - | 事件触发时的回调函数 |

**返回值:**

| 类型 | 说明 |
|------|------|
| this | 返回当前实例，支持链式调用 |

### off(eventName, callback?)

移除指定事件的监听器，若不指定回调函数则移除该事件的所有监听器。

**参数:**

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| eventName | string | - | 事件名称 |
| callback | EventCallback | - | 要移除的回调函数（可选） |

**返回值:**

| 类型 | 说明 |
|------|------|
| this | 返回当前实例，支持链式调用 |

### emit(eventName, ...args)

触发指定事件，并传递参数给监听器。

**参数:**

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| eventName | string | - | 事件名称 |
| ...args | any[] | - | 传递给回调函数的参数 |

**返回值:**

| 类型 | 说明 |
|------|------|
| boolean | 是否有监听器被触发 |

### clear()

清除所有事件监听器。

**返回值:**

| 类型 | 说明 |
|------|------|
| this | 返回当前实例，支持链式调用 |

### listenerCount(eventName)

获取指定事件的监听器数量。

**参数:**

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| eventName | string | - | 事件名称 |

**返回值:**

| 类型 | 说明 |
|------|------|
| number | 监听器数量 |

### eventNames()

获取所有已注册的事件名称。

**返回值:**

| 类型 | 说明 |
|------|------|
| string[] | 事件名称数组 |

### removeAllListeners()

清除所有事件监听器（`clear` 方法的别名）。

**返回值:**

| 类型 | 说明 |
|------|------|
| this | 返回当前实例，支持链式调用 |

## 实现细节

1. **事件存储**：使用 `Map<string, EventListener[]>` 存储事件监听器，确保高效的事件查找和管理。

2. **避免重复**：`on` 方法会检查回调函数是否已存在，避免重复添加相同的监听器。

3. **安全执行**：事件触发时使用 `try/catch` 包装回调函数执行，避免单个监听器错误影响其他监听器。

4. **遍历安全**：在触发事件时创建监听器副本进行遍历，避免在遍历过程中修改数组导致的问题。

5. **单次事件处理**：`once` 方法添加的监听器在执行后会被自动移除。

## 最佳实践

### 避免内存泄漏

- 及时使用 `off` 方法移除不再需要的事件监听器
- 在组件卸载时清除所有相关的事件监听

```ts
// Vue 组件示例
import { onUnmounted } from 'vue'
import { EventEmitter } from '@wiit/vue3-helper'

const emitter = new EventEmitter()

onMounted(() => {
  emitter.on('event', handleEvent)
})

onUnmounted(() => {
  emitter.off('event', handleEvent)
  // 或者清除所有事件
  // emitter.clear()
})

const handleEvent = (data) => {
  // 处理事件
}
```

### 命名规范

- 使用语义化的事件名称，如 `user-login`、`data-updated`
- 避免使用过于通用的名称，防止命名冲突
- 可以使用命名空间组织相关事件，如 `user:login`、`user:logout`

### 错误处理

- 监听器内部应包含适当的错误处理逻辑
- 避免在监听器中抛出未捕获的错误

```ts
emitter.on('event', (data) => {
  try {
    // 处理数据
  } catch (error) {
    console.error('事件处理错误:', error)
  }
})
```