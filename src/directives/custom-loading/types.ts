export interface LoadingOptions {
  value?: boolean;
  text?: string;
  background?: string;
  spinnerColor?: string;
  style?: string;
  delay?: number;
}

export type LoadingBinding = boolean | LoadingOptions;
