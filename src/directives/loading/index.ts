import { createApp, type Directive, type App, type ComponentPublicInstance, type DirectiveBinding, nextTick } from "vue";
import LoadingComponent from "./loading.ts";
import type { LoadingOptions, LoadingBinding } from "./types.ts";

// 定义 Loading 组件实例类型
interface LoadingInstance extends ComponentPublicInstance {
  setText?: (text: string) => void;
  setVisible?: (visible: boolean) => void;
}

// 定义元素扩展类型
interface LoadingEl extends HTMLElement {
  _loadingInstance?: LoadingInstance;
  _loadingApp?: App<Element>;
  _loadingTimeoutId?: number | null;
}

// 创建 loading 指令
const loadingDirective: Directive<LoadingEl, LoadingBinding> = {
  mounted(el: LoadingEl, binding: DirectiveBinding<LoadingBinding>) {
    el.style.position = "relative";
    const options: LoadingOptions = typeof binding.value === "boolean" ? { value: binding.value } : binding.value || {};

    // 添加延迟处理
    const delay = options.delay || 300;
    let timeoutId: number | null = null;

    const showLoading = () => {
      const app = createApp(LoadingComponent, {
        text: options.text,
        background: options.background,
        spinnerColor: options.spinnerColor,
        style: options.style || "loader-l13",
        visible: options.value ?? true,
      });

      const instance = app.mount(document.createElement("div")) as LoadingInstance;
      el._loadingInstance = instance;
      el._loadingApp = app;
      el.appendChild(instance.$el);

      nextTick(() => {
        updateLoading(el, binding);
      });
    };

    if (options.value) {
      timeoutId = window.setTimeout(() => {
        if (options.value) {
          showLoading();
        }
      }, delay);
    }

    // 保存timeoutId以便后续清除
    el._loadingTimeoutId = timeoutId;
  },
  updated(el: LoadingEl, binding: DirectiveBinding<LoadingBinding>) {
    // 深度比较对象值变化
    if (JSON.stringify(binding.oldValue) !== JSON.stringify(binding.value)) {
      const options: LoadingOptions = typeof binding.value === "boolean" ? { value: binding.value } : binding.value || {};

      // 清除之前的定时器
      if (el._loadingTimeoutId) {
        clearTimeout(el._loadingTimeoutId);
        el._loadingTimeoutId = null;
      }

      // 如果loading变为false，直接更新状态
      if (!options.value) {
        updateLoading(el, binding);
        return;
      }

      // 设置新的延迟定时器
      const delay = options.delay || 0;
      el._loadingTimeoutId = window.setTimeout(() => {
        if (options.value) {
          updateLoading(el, binding);
        }
      }, delay);
    }
  },
  unmounted(el: LoadingEl) {
    // 清除定时器
    if (el._loadingTimeoutId) {
      clearTimeout(el._loadingTimeoutId);
    }
    el._loadingApp?.unmount();
    el._loadingInstance?.$el?.remove();
    el._loadingInstance = undefined;
    el._loadingApp = undefined;
  },
};

function updateLoading(el: LoadingEl, binding: DirectiveBinding<LoadingBinding>) {
  if (!el._loadingInstance) return;

  const isLoading = typeof binding.value === "boolean" ? binding.value : binding.value?.value ?? true;

  // 设置父元素定位
  el.style.position = isLoading ? "relative" : "";

  // 确保loading容器是最后一个子元素
  const container = el._loadingInstance.$el.parentElement;
  if (container && container.parentNode === el && container !== el.lastElementChild) {
    el.appendChild(container);
  }

  // 更新显示状态
  el._loadingInstance.setVisible?.(isLoading);

  // 直接控制显示，双重保障
  if (el._loadingInstance.$el) {
    el._loadingInstance.$el.style.display = isLoading ? "flex" : "none";
  }
}

export default loadingDirective;
