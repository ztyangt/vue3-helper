/**
 * 判断是否为空
 * @param value any
 * @description 空值包括 null, undefined, "", [], {}, 0, false
 * @returns boolean
 */
export const isBlank = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    value === 0 ||
    value === false ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};
