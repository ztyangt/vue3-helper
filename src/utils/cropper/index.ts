import { CropperOptions, CropArea, DragState } from "./types";
import { EventEmitter } from "../../shared";

export class Cropper extends EventEmitter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private container: HTMLElement;
  private options: CropperOptions;
  private img: HTMLImageElement | null = null;
  private scale: number = 1;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private rotation: number = 0;
  private isDragging: boolean = false;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;

  // 裁剪区域相关属性
  private cropArea: CropArea = { x: 0, y: 0, width: 0, height: 0 };
  private dragState: DragState = DragState.None;
  private isCropAreaDragging: boolean = false;
  private lastCropMouseX: number = 0;
  private lastCropMouseY: number = 0;

  // 默认配置
  private defaultOptions: CropperOptions = {
    aspectRatio: null,
    cropWidth: 300,
    cropHeight: 300,
    showCropArea: true,
    cropBorderColor: "#39f",
    cropBorderWidth: 2,
    maskColor: "rgba(0, 0, 0, 0.5)",
    showHandles: true,
    handleSize: 10,
    handleColor: "#39f",
  };

  constructor(container: HTMLElement, options?: CropperOptions) {
    super();

    this.container = container;
    this.options = { ...this.defaultOptions, ...options };

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;

    this.init();
  }

  private init() {
    const { clientWidth, clientHeight } = this.container;

    // 获取window缩放比例
    const scale = window.devicePixelRatio || 1;
    this.canvas.width = clientWidth * scale;
    this.canvas.height = clientHeight * scale;
    this.ctx.scale(scale, scale);

    this.canvas.style.width = `${clientWidth}px`;
    this.canvas.style.height = `${clientHeight}px`;

    // 设置container网格背景
    const containerStyles = {
      backgroundImage: `repeating-conic-gradient(rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%    )`,
      backgroundColor: "#fff",
      backgroundSize: "1rem 1rem",
      backgroundPosition: "0 0, 0.5rem 0.5rem",
      position: "relative",
      overflo: "hidden",
    };

    Object.assign(this.container.style, containerStyles);

    this.container.appendChild(this.canvas);
    this.bindEvents();
  }

  /**
   * 初始化裁剪区域
   */
  private initCropArea() {
    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;

    let cropWidth = this.options.cropWidth || 300;
    let cropHeight = this.options.cropHeight || 300;

    // 应用宽高比
    if (this.options.aspectRatio) {
      // 如果只有一个尺寸设置，根据宽高比计算另一个
      if (cropWidth && !cropHeight) {
        cropHeight = cropWidth / this.options.aspectRatio;
      } else if (cropHeight && !cropWidth) {
        cropWidth = cropHeight * this.options.aspectRatio;
      } else {
        // 两者都设置了，以宽度为基准调整高度
        cropHeight = cropWidth / this.options.aspectRatio;
      }
    }

    // 确保裁剪区域不超过容器大小
    cropWidth = Math.min(cropWidth, containerWidth);
    cropHeight = Math.min(cropHeight, containerHeight);

    // 居中放置裁剪区域
    const x = (containerWidth - cropWidth) / 2;
    const y = (containerHeight - cropHeight) / 2;

    this.cropArea = { x, y, width: cropWidth, height: cropHeight };
  }

  /**
   * 绑定事件
   */
  private bindEvents() {
    // 鼠标滚轮缩放
    this.canvas.addEventListener("wheel", this.handleWheel.bind(this));
    // 触摸缩放
    this.canvas.addEventListener("touchstart", this.handleTouchStart.bind(this));
    this.canvas.addEventListener("touchmove", this.handleTouchMove.bind(this));
    // 鼠标拖拽
    this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this.canvas.addEventListener("mouseleave", this.handleMouseUp.bind(this));
    // 触摸拖拽
    this.canvas.addEventListener("touchstart", this.handleTouchStart.bind(this));
    this.canvas.addEventListener("touchmove", this.handleTouchMove.bind(this));
    this.canvas.addEventListener("touchend", this.handleTouchEnd.bind(this));
  }

  /**
   * 处理鼠标滚轮缩放
   */
  private handleWheel(e: WheelEvent) {
    e.preventDefault();
    if (!this.img) return;

    // 计算缩放比例（每次缩放10%）
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    this.scale *= delta;

    // 限制缩放范围
    this.scale = Math.max(0.1, Math.min(this.scale, 5));

    // 重绘图片
    this.drawImageToCanvas(this.img);
  }

  /**
   * 处理鼠标按下事件
   */
  private handleMouseDown(e: MouseEvent) {
    e.preventDefault();

    // 获取鼠标在canvas上的位置
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 检查是否点击了裁剪区域或手柄
    this.dragState = this.getDragState(x, y);

    if (this.dragState !== DragState.None) {
      // 开始拖拽裁剪区域或调整大小
      this.isCropAreaDragging = true;
      this.lastCropMouseX = e.clientX;
      this.lastCropMouseY = e.clientY;
    } else if (this.img) {
      // 开始拖拽图片
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    }
  }

  /**
   * 处理鼠标移动事件
   */
  private handleMouseMove(e: MouseEvent) {
    e.preventDefault();

    if (this.isCropAreaDragging) {
      // 计算移动距离
      const dx = e.clientX - this.lastCropMouseX;
      const dy = e.clientY - this.lastCropMouseY;

      // 处理裁剪区域移动
      this.handleCropAreaMove(dx, dy);

      // 更新鼠标位置
      this.lastCropMouseX = e.clientX;
      this.lastCropMouseY = e.clientY;

      // 重绘
      if (this.img) {
        this.drawImageToCanvas(this.img);
      }
    } else if (this.isDragging && this.img) {
      // 处理图片拖拽
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;

      // 更新偏移量
      this.offsetX += dx;
      this.offsetY += dy;

      // 更新鼠标位置
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;

      // 重绘图片
      this.drawImageToCanvas(this.img);
    } else {
      // 更新光标样式
      this.updateCursor(e.clientX, e.clientY);
    }
  }

  /**
   * 更新光标样式
   */
  private updateCursor(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // 获取拖拽状态
    const dragState = this.getDragState(x, y);

    // 设置相应的光标样式
    switch (dragState) {
      case DragState.Move:
        this.canvas.style.cursor = "move";
        break;
      case DragState.ResizeTopLeft:
      case DragState.ResizeBottomRight:
        this.canvas.style.cursor = "nwse-resize";
        break;
      case DragState.ResizeTopRight:
      case DragState.ResizeBottomLeft:
        this.canvas.style.cursor = "nesw-resize";
        break;
      case DragState.ResizeLeft:
      case DragState.ResizeRight:
        this.canvas.style.cursor = "ew-resize";
        break;
      case DragState.ResizeTop:
      case DragState.ResizeBottom:
        this.canvas.style.cursor = "ns-resize";
        break;
      default:
        this.canvas.style.cursor = "default";
    }
  }

  /**
   * 处理鼠标释放事件
   */
  private handleMouseUp(e: MouseEvent) {
    e.preventDefault();
    this.isDragging = false;
    this.isCropAreaDragging = false;
    this.dragState = DragState.None;
  }

  /**
   * 触摸起始位置
   */
  private touchStartDistance: number | null = null;
  private isTouchDragging: boolean = false;
  private lastTouchX: number = 0;
  private lastTouchY: number = 0;

  /**
   * 处理触摸开始事件
   */
  private handleTouchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      // 单指操作
      const rect = this.canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;

      // 检查是否点击了裁剪区域或手柄
      this.dragState = this.getDragState(x, y);

      if (this.dragState !== DragState.None) {
        // 开始拖拽裁剪区域或调整大小
        this.isCropAreaDragging = true;
        this.lastCropMouseX = e.touches[0].clientX;
        this.lastCropMouseY = e.touches[0].clientY;
      } else if (this.img) {
        // 开始拖拽图片
        this.isTouchDragging = true;
        this.lastTouchX = e.touches[0].clientX;
        this.lastTouchY = e.touches[0].clientY;
      }
    } else if (e.touches.length === 2) {
      // 双指缩放
      const [touch1, touch2] = e.touches;
      this.touchStartDistance = Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2));
    }
  }

  /**
   * 处理触摸移动事件
   */
  private handleTouchMove(e: TouchEvent) {
    if (e.touches.length === 1) {
      e.preventDefault();

      if (this.isCropAreaDragging) {
        // 处理裁剪区域拖拽或调整大小
        const dx = e.touches[0].clientX - this.lastCropMouseX;
        const dy = e.touches[0].clientY - this.lastCropMouseY;

        // 处理裁剪区域移动
        this.handleCropAreaMove(dx, dy);

        // 更新触摸位置
        this.lastCropMouseX = e.touches[0].clientX;
        this.lastCropMouseY = e.touches[0].clientY;

        // 重绘
        if (this.img) {
          this.drawImageToCanvas(this.img);
        }
      } else if (this.isTouchDragging && this.img) {
        // 处理图片拖拽
        const dx = e.touches[0].clientX - this.lastTouchX;
        const dy = e.touches[0].clientY - this.lastTouchY;

        this.offsetX += dx;
        this.offsetY += dy;

        this.lastTouchX = e.touches[0].clientX;
        this.lastTouchY = e.touches[0].clientY;

        this.drawImageToCanvas(this.img);
      }
    } else if (e.touches.length === 2 && this.touchStartDistance && this.img) {
      // 双指缩放
      e.preventDefault();
      const [touch1, touch2] = e.touches;
      const currentDistance = Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2));

      // 计算缩放比例
      const delta = currentDistance / this.touchStartDistance;
      this.scale *= delta;

      // 限制缩放范围
      this.scale = Math.max(0.1, Math.min(this.scale, 5));

      // 更新起始距离
      this.touchStartDistance = currentDistance;

      // 重绘图片
      this.drawImageToCanvas(this.img);
    }
  }

  /**
   * 处理触摸结束事件
   */
  private handleTouchEnd(e: TouchEvent) {
    this.isTouchDragging = false;
    this.touchStartDistance = null;
    this.isCropAreaDragging = false;
    this.dragState = DragState.None;
  }

  /**
   * 获取拖拽状态
   */
  private getDragState(x: number, y: number): DragState {
    if (!this.options.showCropArea) return DragState.None;

    const { x: cropX, y: cropY, width, height } = this.cropArea;
    const handleSize = this.options.handleSize || 10;

    // 检查是否点击了拖拽手柄
    if (this.options.showHandles) {
      // 检查四个角的手柄
      if (this.isPointInRect(x, y, cropX - handleSize / 2, cropY - handleSize / 2, handleSize, handleSize)) {
        return DragState.ResizeTopLeft;
      }
      if (this.isPointInRect(x, y, cropX + width - handleSize / 2, cropY - handleSize / 2, handleSize, handleSize)) {
        return DragState.ResizeTopRight;
      }
      if (this.isPointInRect(x, y, cropX - handleSize / 2, cropY + height - handleSize / 2, handleSize, handleSize)) {
        return DragState.ResizeBottomLeft;
      }
      if (this.isPointInRect(x, y, cropX + width - handleSize / 2, cropY + height - handleSize / 2, handleSize, handleSize)) {
        return DragState.ResizeBottomRight;
      }

      // 检查四个边的手柄
      if (this.isPointInRect(x, y, cropX - handleSize / 2, cropY + height / 2 - handleSize / 2, handleSize, handleSize)) {
        return DragState.ResizeLeft;
      }
      if (this.isPointInRect(x, y, cropX + width - handleSize / 2, cropY + height / 2 - handleSize / 2, handleSize, handleSize)) {
        return DragState.ResizeRight;
      }
      if (this.isPointInRect(x, y, cropX + width / 2 - handleSize / 2, cropY - handleSize / 2, handleSize, handleSize)) {
        return DragState.ResizeTop;
      }
      if (this.isPointInRect(x, y, cropX + width / 2 - handleSize / 2, cropY + height - handleSize / 2, handleSize, handleSize)) {
        return DragState.ResizeBottom;
      }
    }

    // 检查是否点击了裁剪区域内部
    if (this.isPointInRect(x, y, cropX, cropY, width, height)) {
      return DragState.Move;
    }

    return DragState.None;
  }

  /**
   * 检查点是否在矩形内
   */
  private isPointInRect(x: number, y: number, rectX: number, rectY: number, rectWidth: number, rectHeight: number): boolean {
    return x >= rectX && x <= rectX + rectWidth && y >= rectY && y <= rectY + rectHeight;
  }

  /**
   * 处理裁剪区域移动
   */
  private handleCropAreaMove(dx: number, dy: number) {
    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;
    const minSize = 50; // 最小裁剪区域尺寸

    if (this.dragState === DragState.Move) {
      // 移动整个裁剪区域
      let newX = this.cropArea.x + dx;
      let newY = this.cropArea.y + dy;

      // 限制裁剪区域在容器内
      newX = Math.max(0, Math.min(newX, containerWidth - this.cropArea.width));
      newY = Math.max(0, Math.min(newY, containerHeight - this.cropArea.height));

      this.cropArea.x = newX;
      this.cropArea.y = newY;
    } else {
      // 调整裁剪区域大小
      let newX = this.cropArea.x;
      let newY = this.cropArea.y;
      let newWidth = this.cropArea.width;
      let newHeight = this.cropArea.height;

      // 根据拖拽状态调整大小和位置
      switch (this.dragState) {
        case DragState.ResizeTopLeft:
          newWidth -= dx;
          newHeight -= dy;
          newX += dx;
          newY += dy;
          break;
        case DragState.ResizeTopRight:
          newWidth += dx;
          newHeight -= dy;
          newY += dy;
          break;
        case DragState.ResizeBottomLeft:
          newWidth -= dx;
          newHeight += dy;
          newX += dx;
          break;
        case DragState.ResizeBottomRight:
          newWidth += dx;
          newHeight += dy;
          break;
        case DragState.ResizeLeft:
          newWidth -= dx;
          newX += dx;
          break;
        case DragState.ResizeRight:
          newWidth += dx;
          break;
        case DragState.ResizeTop:
          newHeight -= dy;
          newY += dy;
          break;
        case DragState.ResizeBottom:
          newHeight += dy;
          break;
      }

      // 应用宽高比限制
      if (this.options.aspectRatio) {
        const aspectRatio = this.options.aspectRatio;

        // 确定哪个方向是主要调整方向
        let isWidthPrimary = false;
        switch (this.dragState) {
          case DragState.ResizeTopRight:
          case DragState.ResizeBottomRight:
          case DragState.ResizeRight:
          case DragState.ResizeLeft:
            isWidthPrimary = true;
            break;
          default:
            isWidthPrimary = false;
        }

        // 根据主要调整方向和宽高比计算新的尺寸
        if (isWidthPrimary) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }

      // 确保尺寸不小于最小值
      if (newWidth < minSize) {
        newWidth = minSize;
        if (this.options.aspectRatio) {
          newHeight = newWidth / this.options.aspectRatio;
        }
      }

      if (newHeight < minSize) {
        newHeight = minSize;
        if (this.options.aspectRatio) {
          newWidth = newHeight * this.options.aspectRatio;
        }
      }

      // 确保裁剪区域不超出容器边界
      if (newX < 0) {
        newX = 0;
      }
      if (newY < 0) {
        newY = 0;
      }
      if (newX + newWidth > containerWidth) {
        newX = containerWidth - newWidth;
      }
      if (newY + newHeight > containerHeight) {
        newY = containerHeight - newHeight;
      }

      // 更新裁剪区域
      this.cropArea = { x: newX, y: newY, width: newWidth, height: newHeight };

      // 生成并发送预览blob URL
      const previewBlobURL = this.generatePreviewBlobURL();
      this.emit("preview", previewBlobURL);
    }
  }

  /**
   * 设置cropper图片
   * @param image 图片资源
   */
  setImage(image: string | File) {
    const loadImage = (src: string) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        this.drawImageToCanvas(img);
      };
    };

    if (typeof image === "string") {
      loadImage(image);
    } else if (image instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        loadImage(reader.result as string);
      };
    }
  }

  /**
   * 将图片绘制到canvas上，保持原始比例并居中显示
   * @param img 图片对象
   */
  private drawImageToCanvas(img: HTMLImageElement) {
    // 保存图片对象
    this.img = img;

    // 获取canvas和图片的尺寸
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    // 计算初始缩放比例和居中位置
    if (this.scale === 1) {
      const containerWidth = this.container.clientWidth;
      const containerHeight = this.container.clientHeight;
      const canvasRatio = containerWidth / containerHeight;
      const imgRatio = imgWidth / imgHeight;

      // 根据宽高比确定初始缩放比例
      if (canvasRatio > imgRatio) {
        // canvas更宽，以高度为基准缩放
        this.scale = containerHeight / imgHeight;
      } else {
        // canvas更高，以宽度为基准缩放
        this.scale = containerWidth / imgWidth;
      }

      // 计算初始居中位置（使用container尺寸而不是canvas实际尺寸）
      const scaledWidth = imgWidth * this.scale;
      const scaledHeight = imgHeight * this.scale;
      this.offsetX = ((canvasWidth / (window.devicePixelRatio || 1) - scaledWidth) / 2) * (window.devicePixelRatio || 1);
      this.offsetY = ((canvasHeight / (window.devicePixelRatio || 1) - scaledHeight) / 2) * (window.devicePixelRatio || 1);
    }

    // 计算缩放后的图片尺寸
    const scaledWidth = imgWidth * this.scale;
    const scaledHeight = imgHeight * this.scale;

    // 清空canvas
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 保存当前上下文状态
    this.ctx.save();

    // 计算旋转中心
    const centerX = this.offsetX + scaledWidth / 2;
    const centerY = this.offsetY + scaledHeight / 2;

    // 应用旋转
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(this.rotation);
    this.ctx.translate(-centerX, -centerY);

    // 绘制图片
    this.ctx.drawImage(img, this.offsetX, this.offsetY, scaledWidth, scaledHeight);

    // 恢复上下文状态
    this.ctx.restore();

    // 初始化并绘制裁剪区域
    if (this.options.showCropArea && !this.cropArea.width) {
      this.initCropArea();
    }

    this.drawCropArea();
  }

  /**
   * 绘制裁剪区域
   */
  private drawCropArea() {
    if (!this.options.showCropArea) return;

    const { x, y, width, height } = this.cropArea;
    const borderColor = this.options.cropBorderColor || "#39f";
    const borderWidth = this.options.cropBorderWidth || 2;
    const handleSize = this.options.handleSize || 10;
    const handleColor = this.options.handleColor || "#39f";

    // 绘制遮罩
    this.drawMask();

    // 绘制裁剪区域边框
    this.ctx.strokeStyle = borderColor;
    this.ctx.lineWidth = borderWidth;
    this.ctx.setLineDash([5, 5]);
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.setLineDash([]);

    // 绘制拖拽手柄
    if (this.options.showHandles) {
      this.drawHandles(x, y, width, height, handleSize, handleColor);
    }
  }

  /**
   * 绘制遮罩
   */
  private drawMask() {
    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;
    const maskColor = this.options.maskColor || "rgba(0, 0, 0, 0.5)";

    // 绘制遮罩
    this.ctx.fillStyle = maskColor;

    // 使用路径绘制遮罩，中间留空裁剪区域
    this.ctx.beginPath();

    // 绘制整个容器
    this.ctx.rect(0, 0, containerWidth, containerHeight);

    // 减去裁剪区域
    this.ctx.rect(this.cropArea.x, this.cropArea.y, this.cropArea.width, this.cropArea.height);

    // 填充遮罩
    this.ctx.fill("evenodd");
  }

  /**
   * 绘制拖拽手柄
   */
  private drawHandles(x: number, y: number, width: number, height: number, handleSize: number, handleColor: string) {
    // 计算手柄位置
    const handles = [
      { x: x - handleSize / 2, y: y - handleSize / 2 }, // 左上角
      { x: x + width - handleSize / 2, y: y - handleSize / 2 }, // 右上角
      { x: x - handleSize / 2, y: y + height - handleSize / 2 }, // 左下角
      { x: x + width - handleSize / 2, y: y + height - handleSize / 2 }, // 右下角
      { x: x - handleSize / 2, y: y + height / 2 - handleSize / 2 }, // 左侧
      { x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2 }, // 右侧
      { x: x + width / 2 - handleSize / 2, y: y - handleSize / 2 }, // 顶部
      { x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2 }, // 底部
    ];

    // 绘制手柄
    this.ctx.fillStyle = handleColor;
    handles.forEach((handle) => {
      this.ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
    });
  }

  /**
   * 旋转图片
   * @param angle 旋转角度（弧度）
   */
  rotate(angle: number) {
    this.rotation += angle;
    if (this.img) {
      this.drawImageToCanvas(this.img);
    }
  }

  /**
   * 重置图片位置、缩放和旋转
   */
  reset() {
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = 0;
    if (this.img) {
      this.drawImageToCanvas(this.img);
    }
  }

  /**
   * 裁剪图片
   * @param options 裁剪选项
   * @returns 裁剪后的图片数据URL
   */
  crop(options?: {
    /**
     * 输出宽度
     */
    outputWidth?: number;
    /**
     * 输出高度
     */
    outputHeight?: number;
    /**
     * 图片格式
     */
    format?: "png" | "jpeg" | "webp";
    /**
     * 图片质量 (0-1)
     */
    quality?: number;
  }): string {
    if (!this.img) {
      throw new Error("No image loaded");
    }

    const { x, y, width, height } = this.cropArea;
    const format = options?.format || "png";
    const quality = options?.quality || 0.9;
    const outputWidth = options?.outputWidth || width;
    const outputHeight = options?.outputHeight || height;

    // 创建临时canvas用于裁剪
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d")!;

    // 设置临时canvas尺寸
    tempCanvas.width = outputWidth;
    tempCanvas.height = outputHeight;

    // 计算图片缩放比例
    const scaleX = this.img.width / (this.img.width * this.scale);
    const scaleY = this.img.height / (this.img.height * this.scale);

    // 计算裁剪区域在缩放后图片上的位置
    let cropX = (x - this.offsetX) * scaleX;
    let cropY = (y - this.offsetY) * scaleY;
    let cropWidth = width * scaleX;
    let cropHeight = height * scaleY;

    // 边界检查，确保裁剪区域不会超出图片范围
    cropX = Math.max(0, Math.min(cropX, this.img.width));
    cropY = Math.max(0, Math.min(cropY, this.img.height));
    cropWidth = Math.min(cropWidth, this.img.width - cropX);
    cropHeight = Math.min(cropHeight, this.img.height - cropY);

    // 保存临时canvas的上下文状态
    tempCtx.save();

    // 处理旋转
    if (this.rotation !== 0) {
      // 对于旋转的图片，我们需要创建另一个临时canvas来处理旋转
      const rotateCanvas = document.createElement("canvas");
      const rotateCtx = rotateCanvas.getContext("2d")!;

      // 根据旋转角度调整canvas尺寸
      const radians = this.rotation;
      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));
      const rotatedWidth = this.img.width * cos + this.img.height * sin;
      const rotatedHeight = this.img.width * sin + this.img.height * cos;

      rotateCanvas.width = rotatedWidth;
      rotateCanvas.height = rotatedHeight;

      // 在旋转canvas上绘制旋转后的完整图片
      rotateCtx.save();
      rotateCtx.translate(rotatedWidth / 2, rotatedHeight / 2);
      rotateCtx.rotate(radians);
      rotateCtx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
      rotateCtx.restore();

      // 计算旋转后的裁剪区域位置
      const centerX = this.img.width / 2;
      const centerY = this.img.height / 2;

      // 计算裁剪区域在旋转前的中心位置
      const originalCropCenterX = cropX + cropWidth / 2;
      const originalCropCenterY = cropY + cropHeight / 2;

      // 计算旋转后的裁剪区域中心位置
      const rotatedCropCenterX = (originalCropCenterX - centerX) * cos - (originalCropCenterY - centerY) * sin + rotatedWidth / 2;
      const rotatedCropCenterY = (originalCropCenterX - centerX) * sin + (originalCropCenterY - centerY) * cos + rotatedHeight / 2;

      // 计算旋转后的裁剪区域位置
      const rotatedCropX = rotatedCropCenterX - cropWidth / 2;
      const rotatedCropY = rotatedCropCenterY - cropHeight / 2;

      // 在最终canvas上绘制旋转裁剪后的图片
      tempCtx.drawImage(rotateCanvas, rotatedCropX, rotatedCropY, cropWidth, cropHeight, 0, 0, outputWidth, outputHeight);

      // 释放旋转canvas资源
      rotateCanvas.width = 0;
      rotateCanvas.height = 0;
    } else {
      // 对于没有旋转的图片，直接绘制
      tempCtx.drawImage(this.img, cropX, cropY, cropWidth, cropHeight, 0, 0, outputWidth, outputHeight);
    }

    // 恢复上下文状态
    tempCtx.restore();

    // 获取裁剪后的图片数据URL
    const dataURL = tempCanvas.toDataURL(`image/${format}`, quality);

    // 释放临时canvas资源
    tempCanvas.width = 0;
    tempCanvas.height = 0;

    return dataURL;
  }

  /**
   * 生成预览blob URL
   * @param options 裁剪选项
   * @returns 裁剪后的图片blob URL
   */
  private generatePreviewBlobURL(options?: {
    /**
     * 输出宽度
     */
    outputWidth?: number;
    /**
     * 输出高度
     */
    outputHeight?: number;
    /**
     * 图片格式
     */
    format?: "png" | "jpeg" | "webp";
    /**
     * 图片质量 (0-1)
     */
    quality?: number;
  }): string {
    if (!this.img) {
      return "";
    }

    const { x, y, width, height } = this.cropArea;
    const format = options?.format || "png";
    const quality = options?.quality || 0.8; // 预览图可以使用较低质量
    const outputWidth = options?.outputWidth || Math.min(width, 500); // 预览图限制最大宽度
    const outputHeight = options?.outputHeight || Math.min(height, 500); // 预览图限制最大高度

    // 创建临时canvas用于裁剪
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d")!;

    // 设置临时canvas尺寸
    tempCanvas.width = outputWidth;
    tempCanvas.height = outputHeight;

    // 计算图片缩放比例
    const scaleX = this.img.width / (this.img.width * this.scale);
    const scaleY = this.img.height / (this.img.height * this.scale);

    // 计算裁剪区域在缩放后图片上的位置
    let cropX = (x - this.offsetX) * scaleX;
    let cropY = (y - this.offsetY) * scaleY;
    let cropWidth = width * scaleX;
    let cropHeight = height * scaleY;

    // 边界检查，确保裁剪区域不会超出图片范围
    cropX = Math.max(0, Math.min(cropX, this.img.width));
    cropY = Math.max(0, Math.min(cropY, this.img.height));
    cropWidth = Math.min(cropWidth, this.img.width - cropX);
    cropHeight = Math.min(cropHeight, this.img.height - cropY);

    // 保存临时canvas的上下文状态
    tempCtx.save();

    // 处理旋转
    if (this.rotation !== 0) {
      // 对于旋转的图片，我们需要创建另一个临时canvas来处理旋转
      const rotateCanvas = document.createElement("canvas");
      const rotateCtx = rotateCanvas.getContext("2d")!;

      // 根据旋转角度调整canvas尺寸
      const radians = this.rotation;
      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));
      const rotatedWidth = this.img.width * cos + this.img.height * sin;
      const rotatedHeight = this.img.width * sin + this.img.height * cos;

      rotateCanvas.width = rotatedWidth;
      rotateCanvas.height = rotatedHeight;

      // 在旋转canvas上绘制旋转后的完整图片
      rotateCtx.save();
      rotateCtx.translate(rotatedWidth / 2, rotatedHeight / 2);
      rotateCtx.rotate(radians);
      rotateCtx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
      rotateCtx.restore();

      // 计算旋转后的裁剪区域位置
      const centerX = this.img.width / 2;
      const centerY = this.img.height / 2;

      // 计算裁剪区域在旋转前的中心位置
      const originalCropCenterX = cropX + cropWidth / 2;
      const originalCropCenterY = cropY + cropHeight / 2;

      // 计算旋转后的裁剪区域中心位置
      const rotatedCropCenterX = (originalCropCenterX - centerX) * cos - (originalCropCenterY - centerY) * sin + rotatedWidth / 2;
      const rotatedCropCenterY = (originalCropCenterX - centerX) * sin + (originalCropCenterY - centerY) * cos + rotatedHeight / 2;

      // 计算旋转后的裁剪区域位置
      const rotatedCropX = rotatedCropCenterX - cropWidth / 2;
      const rotatedCropY = rotatedCropCenterY - cropHeight / 2;

      // 在最终canvas上绘制旋转裁剪后的图片
      tempCtx.drawImage(rotateCanvas, rotatedCropX, rotatedCropY, cropWidth, cropHeight, 0, 0, outputWidth, outputHeight);

      // 释放旋转canvas资源
      rotateCanvas.width = 0;
      rotateCanvas.height = 0;
    } else {
      // 对于没有旋转的图片，直接绘制
      tempCtx.drawImage(this.img, cropX, cropY, cropWidth, cropHeight, 0, 0, outputWidth, outputHeight);
    }

    // 恢复上下文状态
    tempCtx.restore();

    // 先获取dataURL，再转换为blob和blobURL
    const dataURL = tempCanvas.toDataURL(`image/${format}`, quality);

    // 释放临时canvas资源
    tempCanvas.width = 0;
    tempCanvas.height = 0;

    // 将dataURL转换为blob
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    return URL.createObjectURL(blob);
  }

  /**
   * 获取裁剪区域信息
   * @returns 裁剪区域信息
   */
  getCropArea(): CropArea {
    return { ...this.cropArea };
  }

  /**
   * 设置裁剪区域
   * @param cropArea 裁剪区域信息
   */
  setCropArea(cropArea: Partial<CropArea>) {
    this.cropArea = { ...this.cropArea, ...cropArea };
    if (this.img) {
      this.drawImageToCanvas(this.img);

      // 生成并发送预览blob URL
      const previewBlobURL = this.generatePreviewBlobURL();
      this.emit("preview", previewBlobURL);
    }
  }

  /**
   * 销毁cropper
   */
  destroy() {
    // 移除事件监听器
    this.canvas.removeEventListener("wheel", this.handleWheel.bind(this));
    this.canvas.removeEventListener("touchstart", this.handleTouchStart.bind(this));
    this.canvas.removeEventListener("touchmove", this.handleTouchMove.bind(this));
    this.canvas.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    this.canvas.removeEventListener("mousedown", this.handleMouseDown.bind(this));
    this.canvas.removeEventListener("mousemove", this.handleMouseMove.bind(this));
    this.canvas.removeEventListener("mouseup", this.handleMouseUp.bind(this));
    this.canvas.removeEventListener("mouseleave", this.handleMouseUp.bind(this));
    // 移除canvas元素
    this.container.removeChild(this.canvas);
    // 清空裁剪区域
    this.cropArea = { x: 0, y: 0, width: 0, height: 0 };
    // 清空图片引用
    this.img = null;
  }
}
