const COMPONENT_PREFIX = "Cl"; // 组件前缀
const CLASS_PREFIX = "cl"; // 类名前缀
// const GLOBAL_CONFIG_NAME = "$cl"; // 全局配置名称

/**
 * 获取样式类名
 * @param name class名称
 * @returns string
 */
export const getPrefixCls = (name: string) => {
  return `${CLASS_PREFIX}__${name}`;
};

/**
 * 获取组件名称
 * @param name 组件名称
 * @returns string
 */
export const getComponentPrefix = (name?: string) => {
  return `${COMPONENT_PREFIX}${name || ""}`;
};
