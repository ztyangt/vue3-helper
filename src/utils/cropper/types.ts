export interface CropperOptions {
  /**
   * 宽高比
   */
  aspectRatio?: number;
  /**
   * 裁剪区域宽度
   */
  cropWidth?: number;
  /**
   * 裁剪区域高度
   */
  cropHeight?: number;
  /**
   * 是否显示裁剪区域
   */
  showCropArea?: boolean;
  /**
   * 裁剪区域边框颜色
   */
  cropBorderColor?: string;
  /**
   * 裁剪区域边框宽度
   */
  cropBorderWidth?: number;
  /**
   * 遮罩颜色
   */
  maskColor?: string;
  /**
   * 是否显示拖拽手柄
   */
  showHandles?: boolean;
  /**
   * 拖拽手柄大小
   */
  handleSize?: number;
  /**
   * 拖拽手柄颜色
   */
  handleColor?: string;
}

/**
 * 裁剪区域信息
 */
export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 拖拽状态
 */
export enum DragState {
  None = 0,
  Move = 1,
  ResizeTopLeft = 2,
  ResizeTopRight = 3,
  ResizeBottomLeft = 4,
  ResizeBottomRight = 5,
  ResizeLeft = 6,
  ResizeTop = 7,
  ResizeRight = 8,
  ResizeBottom = 9,
}
