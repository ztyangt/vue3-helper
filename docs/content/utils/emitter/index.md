---
outline: deep
---

# 事件发布订阅

:::info
提供一个类型安全、功能完善的事件发布/订阅系统，支持一次性监听器、精确类型推断和高效内存管理。
:::

## Emitter 类

### 类型声明

```ts
/**
 * 事件发射器
 * @template T - 事件名称的字符串字面量类型
 */
export class Emitter<T extends string> {
  /**
   * 创建事件发射器实例
   * @param eventNameList - 初始化支持的事件名称数组
   */
  constructor(eventNameList: T[]);

  /**
   * 注册持久事件监听器
   * @param eventName - 事件名称
   * @param listener - 事件监听函数
   */
  on<U extends any[]>(eventName: T, listener: Listener<U>): void;

  /**
   * 注册一次性事件监听器
   * @param eventName - 事件名称
   * @param listener - 事件监听函数
   */
  once<U extends any[]>(eventName: T, listener: Listener<U>): void;

  /**
   * 触发事件
   * @param eventName - 事件名称
   * @param args - 传递给监听函数的参数
   */
  emit<U extends any[]>(eventName: T, ...args: U): void;

  /**
   * 移除事件监听器
   * @param eventName - 事件名称
   * @param listener - 要移除的监听函数(可选)
   */
  off<U extends any[]>(eventName: T, listener?: Listener<U>): void;

  /**
   * 获取事件监听器数量
   * @param eventName - 事件名称
   * @returns 监听器数量
   */
  listenerCount(eventName: T): number;

  /**
   * 清除所有事件监听器
   */
  clear(): void;
}

type Listener<T extends any[]> = (...args: T) => void;
```

### 使用示例

#### 基本用法
```ts
import { Emitter } from '@wiit/vue3-helper'

// 定义事件类型
type AppEvents = 'click' | 'data-loaded' | 'error'

// 创建发射器实例
const emitter = new Emitter<AppEvents>(['click', 'data-loaded', 'error'])


// 持久监听器
emitter.on('click', (x: number, y: number) => {
  console.log(`Clicked at (${x}, ${y})`)
})

// 一次性监听器
emitter.once('data-loaded', (data: string[]) => {
  console.log('Data loaded (this will only run once)')
})

// 触发事件
emitter.emit('click', 100, 200)  // 会触发
emitter.emit('data-loaded', ['a', 'b']) // 会触发
emitter.emit('data-loaded', ['c', 'd']) // 不会触发

// 获取监听器数量
console.log(emitter.listenerCount('click')) // 1
```

:::tip

使用 `as const` 断言，将事件数组转换为只读的元组类型，并保留每个元素的字面量类型，避免事件名重复定义的同时，还能保证类型安全。

```ts
import { Emitter } from '@wiit/vue3-helper'

// 定义事件类型
const eventList = ['click', 'data-loaded', 'error'] as const
const emitter = new Emitter<AppEvents>([...eventList])
```
:::

#### Vue组件集成
```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Emitter } from '@wiit/vue3-helper'

type ComponentEvents = 'mounted' | 'before-unmount'

const emitter = new Emitter<ComponentEvents>(['mounted', 'before-unmount'])

const handleMounted = () => console.log('Component mounted')

onMounted(() => {
  emitter.on('mounted', handleMounted)
  emitter.emit('mounted')
})

onUnmounted(() => {
  emitter.off('mounted', handleMounted)
  emitter.emit('before-unmount')
})
</script>
```

### 方法详解

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `on` | `eventName: T`, `listener: Listener<U>` | `void` | 注册持久事件监听器 |
| `once` | `eventName: T`, `listener: Listener<U>` | `void` | 注册一次性监听器(触发后自动移除) |
| `emit` | `eventName: T`, `...args: U` | `void` | 触发指定事件 |
| `off` | `eventName: T`, `listener?: Listener<U>` | `void` | 移除指定监听器(不传listener则移除所有) |
| `listenerCount` | `eventName: T` | `number` | 获取指定事件的监听器数量 |
| `clear` | - | `void` | 清除所有事件的所有监听器 |

### 类型安全增强

1. **参数类型推断**：
   ```ts
   emitter.on('click', (x: number, y: number) => {})
   // 会报错，因为参数类型不匹配
   emitter.emit('click', '100', '200')
   ```

2. **事件名称检查**：
   ```ts
   // 会报错，因为'unknown'不是AppEvents类型
   emitter.emit('unknown')
   ```

3. **一次性监听器类型安全**：
   ```ts
   emitter.once('data-loaded', (data: string[]) => {})
   // 会报错，因为参数类型不匹配
   emitter.emit('data-loaded', 123)
   ```

### 实现优化

1. **内存管理**：
   - 使用`WeakMap`存储一次性监听器包装函数
   - 自动清理无引用的监听器

2. **性能优化**：
   - 触发事件时创建监听器副本避免迭代时修改
   - `Set`数据结构确保监听器唯一性

3. **动态扩展**：
   - 支持运行时动态添加新事件类型
   - 自动初始化新事件的监听器集合

### 最佳实践

1. **事件命名**：
   ```ts
   // 推荐使用动词过去式或名词形式
   type GoodEvents = 'user-logged-in' | 'data-fetched' | 'upload-progress'
   ```

2. **错误处理**：
   ```ts
   emitter.on('error', (err: Error) => {
     console.error('Error occurred:', err)
   })
   ```

3. **组件集成**：
   ```ts
   // 在组件销毁时清理
   onUnmounted(() => {
     emitter.clear()
   })
   ```

### 扩展场景

#### 全局事件总线
```ts
// event-bus.ts
import { Emitter } from '@wiit/vue3-helper'

type GlobalEvents = 'auth-changed' | 'notification' | 'network-status'

export const bus = new Emitter<GlobalEvents>([
  'auth-changed', 
  'notification',
  'network-status'
])

// 组件A
bus.emit('auth-changed', { userId: '123' })

// 组件B
bus.once('auth-changed', (payload) => {
  console.log('Auth changed:', payload)
})
```

#### 带命名空间的事件
```ts
class NamespacedEmitter {
  private emitters: Record<string, Emitter<any>> = {}

  namespace<T extends string>(ns: string, events: T[]): Emitter<T> {
    if (!this.emitters[ns]) {
      this.emitters[ns] = new Emitter(events)
    }
    return this.emitters[ns]
  }
}
```