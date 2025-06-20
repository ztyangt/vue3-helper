import { type Listener } from "./types";

export class Emitter<T extends string, EventMap extends Record<T, any[]>> {
  private _listeners: Partial<Record<T, Set<Listener<any>>>>;
  private _onceListeners: WeakMap<Listener<any>, Listener<any>>;

  constructor(eventNameList: T[]) {
    this._listeners = {};
    this._onceListeners = new WeakMap();

    // 初始化所有事件类型的监听器集合
    for (const eventName of eventNameList) {
      this._listeners[eventName] = new Set();
    }
  }

  /**
   * 注册事件监听器
   * @param eventName 事件名称
   * @param listener 回调函数
   */
  on<U extends EventMap[K], K extends T>(eventName: K, listener: Listener<U>): void {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = new Set();
    }
    this._listeners[eventName]!.add(listener);
  }

  /**
   * 注册一次性事件监听器
   * @param eventName 事件名称
   * @param listener 回调函数
   */
  once<U extends EventMap[K], K extends T>(eventName: K, listener: Listener<U>): void {
    const onceWrapper: Listener<U> = (...args) => {
      // 执行原监听器
      listener(...args);
      // 执行后立即移除
      this.off(eventName, onceWrapper);
    };

    // 保存原始监听器引用，便于后续移除
    this._onceListeners.set(listener, onceWrapper);
    this.on(eventName, onceWrapper);
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给监听器的参数
   */
  emit<U extends EventMap[K], K extends T>(eventName: K, ...args: U): void {
    const listeners = this._listeners[eventName];
    if (listeners) {
      // 创建副本避免在迭代过程中修改集合
      const listenersCopy = new Set(listeners);
      listenersCopy.forEach((listener) => listener(...args));
    }
  }

  /**
   * 移除事件监听器
   * @param eventName 事件名称
   * @param listener 要移除的回调函数（可选）
   */
  off<U extends EventMap[K], K extends T>(eventName: K, listener?: Listener<U>): void {
    if (!this._listeners[eventName]) return;

    if (listener) {
      // 检查是否为一次性监听器
      const wrappedListener = this._onceListeners.get(listener);
      if (wrappedListener) {
        this._listeners[eventName]!.delete(wrappedListener);
        this._onceListeners.delete(listener);
      } else {
        this._listeners[eventName]!.delete(listener);
      }
    } else {
      // 如果没有指定监听器，则移除所有监听器
      this._listeners[eventName]!.clear();
    }
  }

  /**
   * 获取某个事件的监听器数量
   * @param eventName 事件名称
   */
  listenerCount(eventName: T): number {
    return this._listeners[eventName]?.size || 0;
  }

  /**
   * 清除所有事件监听器
   */
  clear(): void {
    for (const eventName of Object.keys(this._listeners) as T[]) {
      this._listeners[eventName]!.clear();
    }
    this._onceListeners = new WeakMap();
  }
}
