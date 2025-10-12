import { Directive, DirectiveBinding } from "vue";
import type { BlurFadeInBindingValue, BlurFadeInOptions } from "./types";

const defaultOptions: Required<BlurFadeInOptions> = {
  blurAmount: 5,
  duration: 1,
  thumbnail: "",
  placeholder: true,
  errorImage: "",
};

// 默认的加载动画CSS样式
const defaultLoaderCSS = `
.loader {
  width: 50px;
  aspect-ratio: 1;
  box-shadow: 0 0 0 3px #fff inset;
  border-radius: 50%;
  position: relative;
  animation: l11 7s infinite;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: calc(100% + 3px);
  left: calc(50% - 12.5px);
  box-shadow: inherit;
  width: 25px;
  aspect-ratio: 1;
  border-radius: 50%;
  transform-origin: 50% -28px;
  animation: l11 1.5s infinite;
}
.loader:after {
  animation-delay: -0.75s;
}
@keyframes l11 {
  100% {
    transform: rotate(360deg);
  }
}`;

// 创建加载动画元素的函数
function createLoaderElement(type: "placeholder" | "error", options: any): HTMLDivElement {
  const loaderWrap = document.createElement("div");

  loaderWrap.className = "loader-wrap";
  loaderWrap.style.position = "absolute";
  loaderWrap.style.display = "flex";
  loaderWrap.style.justifyContent = "center";
  loaderWrap.style.alignItems = "center";

  const loader = document.createElement("div");

  loaderWrap.appendChild(loader);
  loader.className = "loader";

  // 如果提供了自定义类名，添加到元素
  if (options && typeof options === "object" && options.className) {
    loader.className += " " + options.className;
  }

  // 设置元素样式
  loader.style.position = "absolute";
  loader.style.zIndex = type === "error" ? "10" : "5";

  return loaderWrap;
}

// 注入CSS样式到文档的函数
function injectCSS(css: string): void {
  const styleId = "blur-fade-in-loader-style";
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  if (!styleElement.textContent?.includes(css.trim())) {
    styleElement.textContent += css;
  }
}

function applyBlurFadeInEffect(el: HTMLImageElement, options: BlurFadeInOptions = {}) {
  const finalOptions: Required<BlurFadeInOptions> = { ...defaultOptions, ...options };

  // 设置初始样式
  el.style.transition = `filter ${finalOptions.duration}s ease, opacity ${finalOptions.duration}s ease`;
  el.style.filter = `blur(${finalOptions.blurAmount}px)`;
  el.style.opacity = "0";

  // 如果父元素不是相对定位或绝对定位，则设置为相对定位
  if (el.parentElement && !["relative", "absolute", "fixed", "sticky"].includes(getComputedStyle(el.parentElement).position)) {
    el.parentElement.style.position = "relative";
  }

  // 注入默认的加载动画CSS
  injectCSS(defaultLoaderCSS);

  // 如果有自定义样式，也注入
  if (finalOptions.placeholder && typeof finalOptions.placeholder === "object" && finalOptions.placeholder.style) {
    injectCSS(finalOptions.placeholder.style);
  }

  // 清除可能存在的旧占位符
  const existingPlaceholder = el.parentElement?.querySelector(".blur-fade-in-placeholder");
  const existingError = el.parentElement?.querySelector(".blur-fade-in-error");
  existingPlaceholder?.remove();
  existingError?.remove();

  // 创建占位符元素
  let placeholderElement: HTMLDivElement | null = null;
  if (finalOptions.placeholder && !finalOptions.thumbnail) {
    placeholderElement = createLoaderElement("placeholder", finalOptions.placeholder);
    placeholderElement.classList.add("blur-fade-in-placeholder");
    el.parentElement?.insertBefore(placeholderElement, el);
  }

  const onLoad = () => {
    // 图片加载成功，移除占位符和错误元素
    placeholderElement?.remove();
    el.parentElement?.querySelector(".blur-fade-in-error")?.remove();

    void el.offsetWidth; // 触发重绘
    el.style.filter = "blur(0)";
    el.style.opacity = "1";
    el.removeEventListener("load", onLoad);
    el.removeEventListener("error", onError);
  };

  const onError = () => {
    console.error("Image failed to load", el.src);

    // 移除占位符
    placeholderElement?.remove();

    // 移除可能存在的旧错误元素
    el.parentElement?.querySelector(".blur-fade-in-error")?.remove();

    // 如果提供了错误图片，则显示错误图片
    if (finalOptions.errorImage) {
      // 避免无限循环：检查当前是否已经是错误图片
      if (el.src !== finalOptions.errorImage) {
        const tempImg = new Image();
        tempImg.onload = () => {
          el.src = finalOptions.errorImage!;
          el.style.backgroundImage = "none";
          el.style.filter = "blur(0)";
          el.style.opacity = "1";
        };
        tempImg.onerror = () => {
          // 如果错误图片也加载失败，则使用占位符替代
          handleErrorWithPlaceholder();
        };
        tempImg.src = finalOptions.errorImage;
      } else {
        // 已经是错误图片了，避免无限循环
        handleErrorWithPlaceholder();
      }
    } else {
      // 如果没有提供错误图片，则使用占位符替代
      handleErrorWithPlaceholder();
      // 隐藏错误图片 img 标签
      el.style.display = "none";
    }

    el.removeEventListener("load", onLoad);
    el.removeEventListener("error", onError);
  };

  // 处理错误时使用占位符的函数
  function handleErrorWithPlaceholder() {
    // 调整图片样式
    el.style.filter = "blur(0)";
    el.style.opacity = "1";

    // 如果需要显示占位符
    if (finalOptions.placeholder) {
      // 创建错误占位符元素
      const errorPlaceholder = createLoaderElement("error", finalOptions.placeholder);
      errorPlaceholder.classList.add("blur-fade-in-error");
      el.parentElement?.insertBefore(errorPlaceholder, el);
    }
  }

  // 检查图片是否已经加载完成
  if (el.complete) {
    // 如果图片已经完成但naturalWidth为0，说明加载失败
    if (el.naturalWidth === 0) {
      onError();
    } else {
      onLoad();
    }
  } else {
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
  }

  // 如果提供了缩略图，继续使用背景图方式
  if (finalOptions.thumbnail) {
    el.style.backgroundImage = `url(${finalOptions.thumbnail})`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.style.backgroundRepeat = "no-repeat";

    // 如果有缩略图，不需要占位符
    placeholderElement?.remove();
  }
}

const blurFadeInDirective: Directive<HTMLElement, BlurFadeInBindingValue> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<BlurFadeInBindingValue>) {
    if (el.tagName === "IMG") {
      applyBlurFadeInEffect(el as HTMLImageElement, binding.value);
    } else {
      // 处理元素内的所有图片
      const images = el.getElementsByTagName("img");
      Array.from(images).forEach((img) => {
        applyBlurFadeInEffect(img, binding.value);
      });
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding<BlurFadeInBindingValue>) {
    // 如果绑定的值发生变化，重新应用效果
    if (el.tagName === "IMG") {
      applyBlurFadeInEffect(el as HTMLImageElement, binding.value);
    } else {
      const images = el.getElementsByTagName("img");
      Array.from(images).forEach((img) => {
        applyBlurFadeInEffect(img, binding.value);
      });
    }
  },
};

export default blurFadeInDirective;
