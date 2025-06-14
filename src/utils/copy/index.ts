/**
 * 将文本复制到剪贴板
 * @param text 要复制的文本
 * @returns 返回一个Promise，成功时为true，失败时为false
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // 方法1: 使用现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // 方法2: 使用document.execCommand作为降级方案
    const textarea = document.createElement("textarea");
    textarea.value = text;

    // 使textarea在视口外且不可见
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.select();

    // 尝试执行复制命令
    let success = false;
    try {
      success = document.execCommand("copy");
    } catch (err) {
      console.warn("Copy to clipboard failed:", err);
    }

    document.body.removeChild(textarea);

    return success;
  } catch (err) {
    console.error("Copy to clipboard failed:", err);
    return false;
  }
}

// 可选：添加一个简单的回调版本
/**
 * 将文本复制到剪贴板（回调版本）
 * @param text 要复制的文本
 * @param callback 完成后的回调函数，参数为是否成功
 */
export function copyToClipboardWithCallback(text: string, callback: (success: boolean) => void): void {
  copyToClipboard(text)
    .then(callback)
    .catch(() => callback(false));
}
