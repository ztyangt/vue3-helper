import { createApp, type Directive, nextTick } from "vue";
import LoadingComponent from "./loading.ts";
import type { LoadingBinding } from "./types.ts";

// 存储加载实例的 WeakMap
const loadingInstances = new WeakMap<HTMLElement, any>();

// 创建加载实例
const createLoadingInstance = (el: HTMLElement, binding: any) => {
  const options = typeof binding.value === "boolean" ? { loading: binding.value } : binding.value;

  const instance = createApp(LoadingComponent, {
    text: options.text,
    background: options.background,
    spinnerColor: options.spinnerColor,
    textColor: options.textColor,
    size: options.size,
    customClass: options.customClass,
  });

  const loadingEl = document.createElement("div");
  el.appendChild(loadingEl);
  instance.mount(loadingEl);

  loadingInstances.set(el, instance);
  return instance;
};

// 销毁加载实例
const destroyLoadingInstance = (el: HTMLElement) => {
  const instance = loadingInstances.get(el);
  if (instance) {
    instance.unmount();
    loadingInstances.delete(el);
  }
};

// 获取元素定位样式
const getPositionStyle = (el: HTMLElement) => {
  const position = getComputedStyle(el).position;
  if (position === "static" || position === "") {
    el.style.position = "relative";
  }
};

export const vLoading: Directive<HTMLElement, LoadingBinding> = {
  mounted(el, binding) {
    const options = typeof binding.value === "boolean" ? { loading: binding.value } : binding.value;

    // 确保元素有定位
    getPositionStyle(el);

    if (options.loading) {
      createLoadingInstance(el, binding);
    }
  },

  updated(el, binding) {
    const options = typeof binding.value === "boolean" ? { loading: binding.value } : binding.value;

    const oldOptions = typeof binding.oldValue === "boolean" ? { loading: binding.oldValue } : binding.oldValue;

    // 如果加载状态发生变化
    if (options.loading !== oldOptions?.loading) {
      if (options.loading) {
        nextTick(() => {
          createLoadingInstance(el, binding);
        });
      } else {
        destroyLoadingInstance(el);
      }
    }
    // 如果选项发生变化但加载状态不变
    else if (options.loading && JSON.stringify(options) !== JSON.stringify(oldOptions)) {
      destroyLoadingInstance(el);
      nextTick(() => {
        createLoadingInstance(el, binding);
      });
    }
  },

  unmounted(el) {
    destroyLoadingInstance(el);
  },
};

export default vLoading;
