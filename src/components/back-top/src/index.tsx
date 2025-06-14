import type { PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BackTop",
  props: {
    /**
     * @description 显示回到顶部按钮的触发滚动高度
     * @default 200
     */
    visibleHeight: {
      type: Number as PropType<number>,
      default: 200,
    },
    /**
     * @description 滚动到顶部的动画时间
     * @default 400
     */
    duration: {
      type: Number as PropType<number>,
      default: 200,
    },
    /**
     * @description 滚动事件的监听容器
     * */
    targetContainer: {
      type: [String, Object] as PropType<string | HTMLElement>,
    },
    /**
     * @description 滚动动画的缓动方式，可选值参考 [BTween](https://github.com/PengJiyuan/b-tween)
     */
      easing: {
        type: String,
        default: 'quartOut',
      },
  }
})