import "./index.scss";
import { defineComponent, computed, ref, watch, nextTick, onMounted } from "vue";
import type { SegmentedOption } from "./types";
import { getPrefixCls } from "@/components/_utils/config";
import Icon from "../../icon";

export default defineComponent({
  name: "Segmented",
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as () => SegmentedOption[],
      required: true,
      validator: (value: SegmentedOption[]) => {
        return value.length > 0 && value.every((option) => "value" in option && "label" in option);
      },
    },
    value: {
      type: [String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as () => "small" | "medium" | "large",
      default: "medium",
      validator: (value: string) => ["small", "medium", "large"].includes(value),
    },
  },
  emits: {
    "update:value": (_value: string | number) => true,
    change: (_value: string | number) => true,
  },
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls("segmented");
    const selectedElement = ref<HTMLElement | null>(null);
    const thumbElement = ref<HTMLElement | null>(null);
    const previousIndex = ref(-1);
    const isMounted = ref(false);

    const currentIndex = computed(() => {
      return props.options.findIndex((option) => option.value === props.value);
    });

    const onChange = (value: string | number) => {
      if (props.disabled) return;
      if (props.value !== value) {
        emit("update:value", value);
        emit("change", value);
      }
    };

    const updateThumbPosition = async (immediate = false) => {
      if (!selectedElement.value || !thumbElement.value) return;

      await nextTick();

      const selectedEl = selectedElement.value;
      const thumbEl = thumbElement.value;
      const containerEl = selectedEl.parentElement;

      if (!containerEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const selectedRect = selectedEl.getBoundingClientRect();

      // 初始状态立即定位，无动画
      if (immediate) {
        thumbEl.style.transition = "none";
      }

      thumbEl.style.width = `${selectedRect.width}px`;
      thumbEl.style.height = `${selectedRect.height}px`;
      thumbEl.style.left = `${selectedRect.left - containerRect.left}px`;

      // 添加方向类名（非初始状态）
      if (!immediate && previousIndex.value !== -1 && currentIndex.value !== -1) {
        const direction = currentIndex.value > previousIndex.value ? "right" : "left";
        thumbEl.classList.remove(`${prefixCls}-thumb-left`, `${prefixCls}-thumb-right`);
        thumbEl.classList.add(`${prefixCls}-thumb-${direction}`);
      }

      // 恢复过渡动画
      if (immediate) {
        requestAnimationFrame(() => {
          thumbEl.style.transition = "";
        });
      }

      previousIndex.value = currentIndex.value;
    };

    // 初始化和值变化时更新滑块位置
    onMounted(() => {
      isMounted.value = true;
      updateThumbPosition(true); // 初始状态立即定位
    });

    watch(
      () => props.value,
      () => updateThumbPosition()
    );

    const segmentedClasses = computed(() => ({
      [prefixCls]: true,
      [`${prefixCls}-block`]: props.block,
      [`${prefixCls}-disabled`]: props.disabled,
      [`${prefixCls}-${props.size}`]: true,
    }));

    const optionClasses = (option: SegmentedOption) => ({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-selected`]: props.value === option.value,
      [`${prefixCls}-item-disabled`]: option.disabled,
    });

    const renderLabel = (option: SegmentedOption) => {
      const slotName = `label-${option.value}`;
      if (slots[slotName]) {
        return slots[slotName]!({ option });
      }

      return (
        <>
          {option.icon && <Icon class="mr-5" name={option.icon} />}
          <span class={`${prefixCls}-item-label`}>{option.label}</span>
        </>
      );
    };

    return () => (
      <div class={segmentedClasses.value}>
        {/* 滑动指示器 */}
        <div ref={thumbElement} class={`${prefixCls}-thumb`} />

        {props.options.map((option, index) => (
          <div
            ref={props.value === option.value ? selectedElement : null}
            key={option.value}
            class={optionClasses(option)}
            onClick={() => !option.disabled && onChange(option.value)}
            data-index={index}
          >
            {renderLabel(option)}
          </div>
        ))}
      </div>
    );
  },
});
