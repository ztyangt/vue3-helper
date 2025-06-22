import { onMounted, onBeforeUnmount, ref, type Ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

interface Options {
  enabled?: Ref<boolean> | boolean; // 是否启用（可动态控制）
  message?: string; // 自定义提示消息（部分浏览器可能不显示）
}

/**
 * 离开网站确认提示 Hook
 * @param options 配置选项
 *
 * 使用示例：
 * 1. 基本用法（始终启用）：
 *    useLeaveConfirm();
 *
 * 2. 动态控制：
 *    const hasUnsavedChanges = ref(true);
 *    useLeaveConfirm({ enabled: hasUnsavedChanges });
 *
 * 3. 自定义消息：
 *    useLeaveConfirm({ message: '您有未保存的更改！' });
 */
export function useLeaveConfirm(options: Options = {}) {
  const { enabled = ref(true), message = "确定要离开此页面吗？未保存的更改可能会丢失。" } = options;

  const isEnabled = typeof enabled === "boolean" ? ref(enabled) : enabled;

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (!isEnabled.value) return;

    event.preventDefault();
    // 现代浏览器需要设置 returnValue，但自定义消息可能不会显示
    event.returnValue = message;

    // 兼容旧浏览器（可能显示自定义消息）
    return message;
  };

  onBeforeRouteLeave((_to, _from, next) => {
    if (isEnabled.value && !confirm(options.message || "确定要离开吗？")) {
      return next(false); // 取消导航
    }
    next();
  });

  onMounted(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  });

  return {
    /**
     * 手动启用/禁用提示
     * @example setEnabled(false)
     */
    setEnabled: (value: boolean) => {
      isEnabled.value = value;
    },
  };
}
