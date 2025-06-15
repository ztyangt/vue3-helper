import "./index.scss";
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "LoadingOverlay",
  props: {
    text: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "rgba(255, 255, 255, 0.2)",
    },
    spinnerColor: {
      type: String,
      default: "#3498db",
    },
    value: {
      type: String,
      default: "",
    },
    styleClass: {
      // 改名为 styleClass 避免与原生 style 属性冲突
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    return h(
      "div",
      {
        class: ["loading-overlay", { "show-loading-overlay": this.visible }],
        style: {
          backgroundColor: this.background,
        },
      },
      [
        h("div", {
          class: this.styleClass || "loading-spinner",
          style: {
            borderTopColor: this.spinnerColor,
          },
        }),
        this.text ? h("div", { class: "loading-text" }, this.text) : null,
      ]
    );
  },
});
