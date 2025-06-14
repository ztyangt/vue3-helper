/**
 * 判断是否是字符串
 * @param value any
 * @returns boolean
 */
export const isString = (value: any): value is string => {
  return typeof value === "string";
};

/**
 * 判断是否是数字
 * @param value any
 * @returns boolean
 */
export const isNumber = (value: any): value is number => {
  return typeof value === "number";
};

/**
 * 判断是否是对象
 * @param value any
 * @returns boolean
 */
export const isObject = (value: any): value is object => {
  return typeof value === "object";
};

/**
 * 判断是否是函数
 * @param value any
 * @returns boolean
 */
export const isFunction = (value: any): value is Function => {
  return typeof value === "function";
};

/**
 * 判断是否是数组
 * @param value any
 * @returns boolean
 */
export const isArray = (value: any): value is Array<any> => {
  return Array.isArray(value);
};

/**
 * 判断是否是布尔值
 * @param value any
 * @returns boolean
 */
export const isBoolean = (value: any): value is boolean => {
  return typeof value === "boolean";
};

/**
 * 判断是否是null
 * @param value any
 * @returns boolean
 */
export const isNull = (value: any): value is null => {
  return value === null;
};

/**
 * 判断是否是undefined
 * @param value any
 * @returns boolean
 */
export const isUndefined = (value: any): value is undefined => {
  return value === undefined;
};

/**
 * 判断是否是regexp
 * @param value any
 * @returns boolean
 */
export const isRegExp = (value: any): value is RegExp => {
  return value instanceof RegExp;
};

/**
 * 判断是否是promise
 * @param value any
 * @returns boolean
 * */
export const isPromise = (value: any): value is Promise<any> => {
  return value instanceof Promise;
};

/**
 * 判断是否是Date
 * @param value any
 * @returns boolean
 * */
export const isDate = (value: any): value is Date => {
  return value instanceof Date;
};

/**
 * 判断是否是 null 或 undefined
 * @param value any
 * @returns boolean
 */
export const isNullOrUndefined = (value: any): value is null | undefined => {
  return value === null || value === undefined;
};
