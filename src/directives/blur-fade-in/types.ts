export interface BlurFadeInOptions {
  blurAmount?: number;
  duration?: number;
  thumbnail?: string;
  placeholder?: boolean | {
    /** 自定义CSS类名 */
    className?: string;
    /** 自定义CSS样式 */
    style?: string;
  };
  errorImage?: string;
}

export type BlurFadeInBindingValue = BlurFadeInOptions | undefined;
