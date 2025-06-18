import type { ShallowRef } from "vue";

interface SelectionOptions {
  dragRef?: Readonly<ShallowRef<HTMLDivElement | null>>;
  selectFile?: (e: Event) => void;
  selectFolder?: (e: Event) => void;
  dragCallback?: (e: DragEvent) => void;
}

interface FileSelectOptions {
  multiple?: boolean;
  accept?: string[];
  directory?: boolean;
}

export const useFileSelect = (options?: SelectionOptions) => {
  // 创建文件上传 input
  const createFileInput = (config: FileSelectOptions): HTMLInputElement => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = !!config.multiple;

    if (config.directory) {
      fileInput.webkitdirectory = true;
      // @ts-ignore - 非标准属性
      fileInput.mozdirectory = true;
    }

    // 处理 accept 属性
    if (config.accept && config.accept.length > 0) {
      fileInput.accept = config.accept.join(",");
    }

    return fileInput;
  };

  // 初始化拖拽区域
  const initDragDom = () => {
    const { dragRef } = options || {};
    if (!dragRef?.value) return;

    const dragElement = dragRef.value;

    const handleDragEvent = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragElement.classList.add("drag-active");
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragElement.classList.remove("drag-active");
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dragElement.classList.remove("drag-active");
      options?.dragCallback?.(e);
    };

    // 添加事件监听器
    dragElement.addEventListener("dragover", handleDragEvent);
    dragElement.addEventListener("dragenter", handleDragEnter);
    dragElement.addEventListener("dragleave", handleDragLeave);
    dragElement.addEventListener("drop", handleDrop);

    // 返回清理函数，便于组件卸载时移除监听器
    return () => {
      dragElement.removeEventListener("dragover", handleDragEvent);
      dragElement.removeEventListener("dragenter", handleDragEnter);
      dragElement.removeEventListener("dragleave", handleDragLeave);
      dragElement.removeEventListener("drop", handleDrop);
    };
  };

  // 通用选择方法
  const select = (config: FileSelectOptions): Promise<FileList> => {
    return new Promise((resolve, reject) => {
      const fileInput = createFileInput(config);

      fileInput.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length > 0) {
          // 根据是文件还是文件夹调用不同的回调
          if (config.directory) {
            options?.selectFolder?.(e);
          } else {
            options?.selectFile?.(e);
          }
          resolve(files);
        } else {
          reject(new Error("No files selected"));
        }
        fileInput.value = ""; // 重置input值
      };

      fileInput.click();
    });
  };

  // 选择文件（支持多选和accept配置）
  const selectFile = (selectOptions?: { multiple?: boolean; accept?: string[] }): Promise<FileList> => {
    return select({
      multiple: selectOptions?.multiple ?? true,
      accept: selectOptions?.accept,
      directory: false,
    });
  };

  // 选择文件夹
  const selectFolder = (): Promise<FileList> => {
    return select({
      multiple: false,
      directory: true,
    });
  };

  return {
    selectFile,
    selectFolder,
    initDragDom,
  };
};
