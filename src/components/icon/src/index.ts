import { h, defineComponent } from "vue";
import { getPrefixCls } from "@/components/_utils/config";
import type { IconType } from "./type";
import "./index.scss";

/**
 * 图标组件，支持 remix 和 svg 两种类型的图标
 *
 * @example
 * <Icon type="svg" name="close" size="20" />
 * <Icon type="iconfont" name="home" color="#1890ff" spin />
 */
export default defineComponent({
  name: "Icon",
  props: {
    /**
     * 图标类型
     * @type {'remix' | 'svg'}
     * @default 'remix'
     * @example 'remix' | 'svg'
     */
    type: {
      type: String as () => IconType,
      default: "remix",
      validator: (value: string) => ["remix", "svg"].includes(value),
    },

    /**
     * 图标尺寸（单位：px）
     * @type {number}
     * @default 16
     */
    size: {
      type: Number,
      default: 16,
    },

    /**
     * 图标颜色（仅在 type="iconfont" 时生效）
     * @type {string}
     * @default '#333'
     */
    color: {
      type: String,
      default: "#333",
    },

    /**
     * 图标名称
     * @type {string}
     * @required
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * 是否旋转图标
     * @type {boolean}
     * @default false
     */
    spin: {
      type: Boolean,
      default: false,
    },
  },

  render() {
    const { type, size, color, name, spin } = this;
    const cls = getPrefixCls(`${type}-icon`);
    const spinClass = spin ? getPrefixCls(`${type}-icon-spin`) : "";

    if (type === "svg") {
      return h(
        "svg",
        {
          class: [cls, spinClass],
          style: {
            width: `${size}px`,
            height: `${size}px`,
          },
        },
        {
          default: () => [h("use", { "xlink:href": `#${name}` })],
        }
      );
    } else {
      return h("i", {
        class: ["ri-" + name, cls, spinClass],
        style: {
          fontSize: `${size}px`,
          color,
        },
      });
    }
  },
});
