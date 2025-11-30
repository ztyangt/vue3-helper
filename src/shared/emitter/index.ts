import type { EventListener, EventCallback } from "./types";

export class EventEmitter {
  private events: Map<string, EventListener[]> = new Map();

  /**
   * 监听事件
   * @param eventName 事件名称
   * @param callback 回调函数
   * @param once 是否只执行一次
   */
  on(eventName: string, callback: EventCallback, once?: boolean): this {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    const listeners = this.events.get(eventName) || [];

    // 避免重复添加相同的回调
    if (!listeners.some((listener) => listener.callback === callback)) {
      listeners.push({ callback, once });
    }

    return this;
  }

  /**
   * 监听事件，只执行一次
   * @param eventName 事件名称
   * @param callback 回调函数
   */
  once(eventName: string, callback: EventCallback): this {
    return this.on(eventName, callback, true);
  }

  /**
   * 移除事件监听
   * @param eventName 事件名称
   * @param callback 要移除的回调函数（可选，不传则移除该事件所有监听）
   */
  off(eventName: string, callback?: EventCallback): this {
    if (!this.events.has(eventName)) {
      return this;
    }

    if (!callback) {
      // 移除该事件的所有监听
      this.events.delete(eventName);
      return this;
    }

    const listeners = this.events.get(eventName) || [];
    const filteredListeners = listeners.filter((listener) => listener.callback !== callback);

    if (filteredListeners.length === 0) {
      this.events.delete(eventName);
    } else {
      this.events.set(eventName, filteredListeners);
    }

    return this;
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给回调函数的参数
   */
  emit(eventName: string, ...args: any[]): boolean {
    if (!this.events.has(eventName)) {
      return false;
    }

    const listeners = this.events.get(eventName) || [];
    // 创建副本避免在遍历过程中修改数组导致的问题
    const listenersCopy = [...listeners];
    const listenersToExecute = listenersCopy.filter((listener) => !listener.once);
    const onceListeners = listenersCopy.filter((listener) => listener.once);

    // 执行普通监听器
    listenersToExecute.forEach((listener) => {
      try {
        listener.callback.apply(this, args);
      } catch (error) {
        console.error(`Error in event listener for "${eventName}":`, error);
      }
    });

    // 执行一次性监听器并从列表中移除
    onceListeners.forEach((listener) => {
      try {
        listener.callback.apply(this, args);
      } catch (error) {
        console.error(`Error in once event listener for "${eventName}":`, error);
      }
    });

    // 更新事件监听器列表
    if (onceListeners.length > 0) {
      const remainingListeners = listeners.filter((listener) => !onceListeners.includes(listener));

      if (remainingListeners.length === 0) {
        this.events.delete(eventName);
      } else {
        this.events.set(eventName, remainingListeners);
      }
    }

    return true;
  }

  /**
   * 清除所有事件监听
   */
  clear(): this {
    this.events.clear();
    return this;
  }

  /**
   * 获取某个事件的监听器数量
   * @param eventName 事件名称
   */
  listenerCount(eventName: string): number {
    if (!this.events.has(eventName)) {
      return 0;
    }
    return this.events.get(eventName)!.length;
  }

  /**
   * 获取所有已注册的事件名称
   */
  eventNames(): string[] {
    return Array.from(this.events.keys());
  }

  /**
   * 移除所有事件监听（别名方法）
   */
  removeAllListeners(): this {
    return this.clear();
  }
}
