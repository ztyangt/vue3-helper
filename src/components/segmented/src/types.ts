export interface SegmentedOption {
  label?: string; // 选项名
  icon?: string; // 选项图标
  value: string | number; // 选项值
  disabled?: boolean; // 是否禁用选项
}

export interface SegmentedProps {
  block?: boolean; // 是否将宽度调整为父元素宽度，同时所有选项占据相同的宽度
  disabled?: boolean; // 是否禁用
  options?: SegmentedOption[]; // 选项数据
  value?: string | number; // (v-model) 当前选中的值
}
