import "./index.scss";
import { defineComponent, h, computed, type PropType } from "vue";

// Loading
export default defineComponent({
  name: "LoadingComponent",

  props: {
    text: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    background: {
      type: String as PropType<string>,
      default: "rgba(0, 0, 0, 0.4)",
    },
    spinnerColor: {
      type: String as PropType<string>,
      default: "#409eff",
    },
    textColor: {
      type: String as PropType<string>,
      default: "#409eff",
    },
    size: {
      type: String as PropType<"small" | "medium" | "large">,
      default: "medium",
    },
    customClass: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
  },

  setup(props) {
    const sizeMap = {
      small: { spinner: 20, text: 12 },
      medium: { spinner: 42, text: 14 },
      large: { spinner: 64, text: 16 },
    };

    const currentSize = computed(() => sizeMap[props.size]);

    // 使用 h 函数创建 SVG 加载动画
    const renderSpinner = () => {
      return h(
        "div",
        {
          class: "custom-loading-circular",
        },
        [
          h(
            "svg",
            {
              class: "circular",
              viewBox: "25 25 50 50",
              style: {
                height: `${currentSize.value.spinner}px`,
                width: `${currentSize.value.spinner}px`,
              },
            },
            [
              h("circle", {
                cx: "50",
                cy: "50",
                r: "20",
                fill: "none",
                class: "path",
                style: {
                  stroke: props.spinnerColor,
                },
              }),
            ]
          ),
        ]
      );
    };

    const renderText = () => {
      if (!props.text) return null;

      return h(
        "span",
        {
          class: "custom-loading-text",
          style: {
            color: props.textColor,
            fontSize: `${currentSize.value.text}px`,
          },
        },
        props.text
      );
    };

    return () =>
      h(
        "div",
        {
          class: ["custom-loading-mask", props.customClass],
          style: {
            backgroundColor: props.background,
          },
        },
        [h("div", { class: "custom-loading-spinner" }, [renderSpinner(), renderText()])]
      );
  },
});
