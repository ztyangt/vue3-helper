import { Directive, DirectiveBinding } from "vue";
import type { BlurFadeInBindingValue, BlurFadeInOptions } from "./types";

const defaultOptions: Required<BlurFadeInOptions> = {
  blurAmount: 5,
  duration: 1,
  thumbnail: "",
};

function applyBlurFadeInEffect(el: HTMLImageElement, options: BlurFadeInOptions = {}) {
  const finalOptions: Required<BlurFadeInOptions> = { ...defaultOptions, ...options };

  // 设置初始样式
  el.style.transition = `filter ${finalOptions.duration}s ease, opacity ${finalOptions.duration}s ease`;
  el.style.filter = `blur(${finalOptions.blurAmount}px)`;
  el.style.opacity = "0";

  const onLoad = () => {
    el.style.backgroundImage = "none";
    void el.offsetWidth; // 触发重绘
    el.style.filter = "blur(0)";
    el.style.opacity = "1";
    el.removeEventListener("load", onLoad);
    el.removeEventListener("error", onError);
  };

  const onError = () => {
    console.error("Image failed to load", el.src);
    el.removeEventListener("load", onLoad);
    el.removeEventListener("error", onError);
  };

  // 检查图片是否已经加载完成
  if (el.complete) {
    onLoad();
  } else {
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
  }

  // 如果提供了缩略图，先显示缩略图
  if (finalOptions.thumbnail) {
    el.style.backgroundImage = `url(${finalOptions.thumbnail})`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
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
