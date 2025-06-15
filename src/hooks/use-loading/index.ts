import { ref } from "vue";

/**
 * 创建一个加载状态管理对象
 * @param initValue 初始加载状态，默认为false
 * @returns 返回包含加载状态和操作方法的对象
 */
export const useLoading = (initValue = false) => {
  const loading = ref(initValue);
  const setLoading = (value: boolean) => {
    loading.value = value;
  };
  const toggleLoading = () => {
    loading.value = !loading.value;
  };
  return {
    loading,
    setLoading,
    toggleLoading,
  };
};
