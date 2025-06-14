/**
 * 判断是否是 url
 * @param value any
 * @returns boolean
 */
export const isUrl = (value: any): value is string => {
  return /^http[s]?:\/\/.*/.test(value);
};

/**
 * 判断是否是邮箱
 * @param value any
 * @returns boolean
 */
export const isEmail = (value: any): value is string => {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
  // return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
};

/**
 * 判断是否是手机号
 * @param value any
 * @returns boolean
 */
export const isPhone = (value: any): value is string => {
  return /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(value);
};

/**
 * 判断是否是身份证号(第二代)
 * @param value any
 * @returns boolean
 *  */
export const isIdCard = (value: any): value is string => {
  return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value);
};

/**
 * 判断是否是中文
 * @param value any
 * @returns boolean
 */
export const isChinese = (value: any): value is string => {
  return /^[\u4e00-\u9fa5]{0,}$/.test(value);
};

/**
 * 判断是否是英文
 * @param value any
 * @returns boolean
 * */
export const isAlpha = (value: any): value is string => {
  return /^[a-zA-Z]+$/.test(value);
};

/**
 * 判断是否是数字和英文
 * @param value any
 * @returns boolean
 * */
export const isAlphaNum = (value: any): value is string => {
  return /^[A-Za-z0-9]+$/.test(value);
};

/**
 * 判断是否是数字和英文和下划线
 * @param value any
 * @returns boolean
 * */
export const isAlphaNumUnderline = (value: any): value is string => {
  return /^[A-Za-z0-9_]+$/.test(value);
};

/**
 * 判断是否是大写字母
 * @param value any
 * @returns boolean
 * */
export const isUpper = (value: any): value is string => {
  return /^[A-Z]+$/.test(value);
};

/**
 * 判断是否是小写字母
 * @param value any
 * @returns boolean
 * */
export const isLower = (value: any): value is string => {
  return /^[a-z]+$/.test(value);
};

/**
 * 判断是否为固话
 * @param value any
 * @returns boolean
 */
export const isTel = (value: any): value is string => {
  return /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(value);
};

/**
 * 判断是否为端口号
 * @param value any
 * @returns boolean
 *  */
export const isPort = (value: any): value is string => {
  return /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value);
};
