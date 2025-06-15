import type { Directive } from "vue";

// 默认的移动距离和动画持续时间
const DEFAULT_DISTANCE = 50; // 默认移动距离：50px
const DEFAULT_DURATION = 500; // 默认动画时长：500ms
const map = new WeakMap(); // 使用WeakMap存储元素与其动画的映射关系

/**
 * 处理元素观察逻辑
 * @param el 目标元素
 * @param distance 移动距离
 * @param duration 动画时长
 */
const handleObserve = (el: HTMLElement, distance: number, duration: number) => {
  // 创建IntersectionObserver观察元素是否进入视口
  const obServer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // 当元素进入视口时，播放动画
        const animate = map.get(entry.target);
        if (animate) animate.play();
        obServer.unobserve(el); // 播放后停止观察该元素
      }
    }
  });
  obServer.observe(el); // 开始观察元素
};

/**
 * 检查元素是否在视口下方
 * @param el 目标元素
 * @param distance 移动距离
 * @returns 布尔值，表示元素是否在视口下方
 */
const isBelowViewport = (el: HTMLElement, distance: number) => {
  const rect = el.getBoundingClientRect();
  return rect.top - distance > window.innerHeight;
};

/**
 * 通用型元素平滑上升指令 v-slide-in
 * 使用方式：
 * - v-slide-in                          // 使用默认值
 * - v-slide-in="100"                   // 只指定距离
 * - v-slide-in="{ distance: 100, duration: 1000 }" // 指定距离和时长
 */
const slideIn: Directive<HTMLElement, number | { distance?: number; duration?: number }> = {
  mounted(el, binding) {
    // 初始化距离和时长，使用默认值
    let distance = DEFAULT_DISTANCE;
    let duration = DEFAULT_DURATION;

    // 处理传入的参数
    if (typeof binding.value === "number") {
      // 如果绑定值是数字，则只设置距离
      distance = binding.value;
    } else if (binding.value && typeof binding.value === "object") {
      // 如果绑定值是对象，则分别设置距离和时长
      distance = binding.value.distance ?? DEFAULT_DISTANCE; // 使用空值合并运算符保持默认值
      duration = binding.value.duration ?? DEFAULT_DURATION;
    }

    // 如果元素不在视口下方，则不执行动画
    if (!isBelowViewport(el, distance)) {
      return;
    }

    // 创建动画效果
    const animation = el.animate(
      [
        { transform: `translateY(${distance}px)`, opacity: 0.5 }, // 起始状态：向下偏移，半透明
        { transform: `translateY(0)`, opacity: 1 }, // 结束状态：回到原位，完全不透明
      ],
      {
        duration, // 动画持续时间
        easing: "ease-in-out", // 缓动函数：平滑进出
        fill: "forwards", // 动画结束后保持最终状态
      }
    );

    animation.pause(); // 先暂停动画
    map.set(el, animation); // 将动画存入WeakMap
    handleObserve(el, distance, duration); // 开始观察元素
  },
};

export default slideIn;
