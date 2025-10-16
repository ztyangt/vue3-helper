// 类型定义
export interface LoadingOptions {
  loading: boolean;
  text?: string;
  background?: string;
  spinnerColor?: string;
  textColor?: string;
  size?: "small" | "medium" | "large";
  customClass?: string;
}
export type LoadingBinding = boolean | LoadingOptions;
