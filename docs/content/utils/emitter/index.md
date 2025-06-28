---
outline: deep
---

# Emitter  事件发布订阅 <Badge type="tip" text="类" />

:::info
提供一个完全类型安全的事件发射/订阅系统，支持强类型的事件参数、一次性监听器和完善的内存管理。
:::

## Emitter 类

### 类型声明

```ts
export class Emitter<T extends string, EventMap extends Record<T, any[]>> {
  constructor(eventNameList: T[]);

  on<K extends T>(eventName: K, listener: Listener<EventMap[K]>): void;
  once<K extends T>(eventName: K, listener: Listener<EventMap[K]>): void;
  emit<K extends T>(eventName: K, ...args: EventMap[K]): void;
  off<K extends T>(eventName: K, listener?: Listener<EventMap[K]>): void;
  listenerCount(eventName: T): number;
  clear(): void;
}

type Listener<T extends any[]> = (...args: T) => void;
```

### 使用示例

#### 基本用法
```ts
// 1. 定义事件类型和参数
type AppEvents = {
  'click': [x: number, y: number];       // 点击事件带坐标参数
  'search': [query: string, filters: any]; // 搜索事件
  'loaded': [];                          // 无参数事件
};

// 2. 创建发射器实例
const emitter = new Emitter<keyof AppEvents, AppEvents>(['click', 'search', 'loaded']);

// 3. 添加类型安全的监听器
emitter.on('click', (x, y) => {
  console.log(`Clicked at (${x}, ${y})`);
});

// 4. 触发事件（自动类型检查）
emitter.emit('click', 100, 200);  // 正确
emitter.emit('click', '100', 200); // 类型错误！
```

#### Vue组件集成
```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

type ComponentEvents = {
  'mounted': [timestamp: number];
  'data-loaded': [data: any[], total: number];
};

const emitter = new Emitter<keyof ComponentEvents, ComponentEvents>(['mounted', 'data-loaded']);

onMounted(() => {
  emitter.on('data-loaded', (data, total) => {
    console.log(`Loaded ${total} items`);
  });
  
  emitter.emit('mounted', Date.now());
});

onUnmounted(() => {
  emitter.clear();
});
</script>
```

### 方法说明

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `on` | `eventName: K`, `listener: Listener<EventMap[K]>` | `void` | 注册持久事件监听器 |
| `once` | `eventName: K`, `listener: Listener<EventMap[K]>` | `void` | 注册一次性监听器(触发后自动移除) |
| `emit` | `eventName: K`, `...args: EventMap[K]` | `void` | 触发指定事件 |
| `off` | `eventName: K`, `listener?: Listener<EventMap[K]>` | `void` | 移除指定监听器(不传则移除所有) |
| `listenerCount` | `eventName: T` | `number` | 获取指定事件的监听器数量 |
| `clear` | - | `void` | 清除所有事件监听器 |

### 类型安全特性

1. **事件参数类型推断**：
   ```ts
   emitter.on('search', (query, filters) => {
     // query自动推断为string
     // filters自动推断为any
   });
   ```

2. **严格的参数检查**：
   ```ts
   emitter.emit('click', 100); // 错误: 缺少y参数
   emitter.emit('loaded', 123); // 错误: 该事件不应有参数
   ```

3. **事件名称自动补全**：
   ```ts
   emitter.on('') // 输入时会自动提示已定义的事件名称
   ```

### 实现亮点

1. **高效存储**：
   - 使用`Set`存储监听器确保唯一性
   - `WeakMap`存储一次性监听器避免内存泄漏

2. **安全触发**：
   ```ts
   // 触发时创建副本避免迭代时修改
   const listenersCopy = new Set(listeners);
   listenersCopy.forEach(listener => listener(...args));
   ```

3. **自动清理**：
   ```ts
   onceWrapper = (...args) => {
     listener(...args);
     this.off(eventName, onceWrapper); // 自动移除
   }
   ```

### 最佳实践

1. **事件命名规范**：
   ```ts
   type AppEvents = {
     'user:login': [userId: string];
     'cart:updated': [items: CartItem[]];
   };
   ```

2. **错误处理**：
   ```ts
   emitter.on('error', (err: Error) => {
     console.error('Event error:', err);
   });
   ```

3. **性能敏感场景**：
   ```ts
   // 高频事件使用防抖
   import { debounce } from 'lodash';
   emitter.on('scroll', debounce(handleScroll, 100));
   ```

### 扩展应用

#### 全局事件总线
```ts
// event-bus.ts
type GlobalEvents = {
  'auth:changed': [user: User];
  'notification:new': [message: string, type: 'info'|'error'];
};

export const bus = new Emitter<keyof GlobalEvents, GlobalEvents>([
  'auth:changed',
  'notification:new'
]);

// 组件A
bus.emit('auth:changed', currentUser);

// 组件B
bus.on('auth:changed', (user) => {
  console.log('User changed:', user.name);
});
```

#### 状态管理集成
```ts
class StateManager {
  private emitter = new Emitter<...>();
  
  onStateChange<K extends keyof StateEvents>(
    event: K, 
    listener: Listener<StateEvents[K]>
  ) {
    this.emitter.on(event, listener);
  }
  
  setState<K extends keyof StateEvents>(
    event: K,
    ...args: StateEvents[K]
  ) {
    this.emitter.emit(event, ...args);
  }
}
```

#### 性能监控
```ts
const monitoredEmitter = new Proxy(emitter, {
  get(target, prop) {
    if (prop === 'emit') {
      return function(eventName: string, ...args: any[]) {
        console.time(`event_${eventName}`);
        target.emit(eventName, ...args);
        console.timeEnd(`event_${eventName}`);
      }
    }
    return target[prop];
  }
});
```