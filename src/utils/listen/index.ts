/**
 * 添加事件监听器
 * @param target 监听目标，可以是Window或HTMLElement
 * @param event 事件名称
 * @param handler 事件处理函数
 * @param capture 是否在捕获阶段触发，默认为false
 */
export function addEventListen(target: Window | HTMLElement, event: string, handler: EventListenerOrEventListenerObject, capture = false) {
  if (target.addEventListener && typeof target.addEventListener === "function") {
    target.addEventListener(event, handler, capture);
  }
}

/**
 * 移除事件监听器
 * @param target 监听目标，可以是Window或HTMLElement
 * @param event 事件名称
 * @param handler 事件处理函数
 * @param capture 是否在捕获阶段触发，默认为false
 */
export function removeEventListen(
  target: Window | HTMLElement,
  event: string,
  handler: EventListenerOrEventListenerObject,
  capture = false
) {
  if (target.removeEventListener && typeof target.removeEventListener === "function") {
    target.removeEventListener(event, handler, capture);
  }
}
