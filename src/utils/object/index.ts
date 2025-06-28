export class objectUtils {
  /**
   * @description 检查对象是否为空
   * @param obj
   * @returns {boolean}
   * */
  static isEmpty(obj?: any): boolean {
    return obj === null || obj === undefined || Object.keys(obj).length === 0;
  }

  /**
   * @description 深拷贝
   * @param obj
   * @param hash 缓存对象，避免循环引用
   * @returns {any}
   */
  static deepClone(obj: any, hash = new WeakMap()): any {
    // 处理基本类型和null
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    // 处理循环引用
    if (hash.has(obj)) {
      return hash.get(obj);
    }

    // 处理Date
    if (obj instanceof Date) {
      return new Date(obj);
    }

    // 处理RegExp
    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }
    // 处理数组和对象
    let clone = Array.isArray(obj) ? [] : {};
    hash.set(obj, clone);

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = objectUtils.deepClone(obj[key], hash);
      }
    }

    return clone;
  }

  /**
   * @description 深度合并两个或多个对象
   * @param target 目标对象，合并结果将存储在此对象中
   * @param source 源对象，提供要合并的属性
   * @param options 合并选项
   * @param {boolean} [options.overwrite=true] 是否覆盖目标对象已有值
   * @param {boolean} [options.cloneDeep=true] 是否深拷贝源对象属性
   * @returns {any} 合并后的目标对象
   */
  static deepMerge(
    target: any,
    source: any,
    options: { overwrite?: boolean; cloneDeep?: boolean } = { overwrite: true, cloneDeep: true }
  ): any {
    // 处理null或undefined源对象
    if (source == null) {
      return target;
    }

    // 处理目标对象为null或undefined的情况
    if (target == null) {
      return options.cloneDeep ? this.deepClone(source) : source;
    }

    // 处理非对象类型的合并
    if (typeof target !== "object" || typeof source !== "object") {
      return options.overwrite ? (options.cloneDeep ? this.deepClone(source) : source) : target;
    }

    // 处理数组合并（默认替换整个数组）
    if (Array.isArray(source)) {
      if (options.overwrite) {
        target = options.cloneDeep ? this.deepClone(source) : source;
      }
      return target;
    }

    // 处理特殊对象类型（Date, RegExp等）
    if (source instanceof Date || source instanceof RegExp) {
      if (options.overwrite) {
        target = options.cloneDeep ? this.deepClone(source) : source;
      }
      return target;
    }

    // 深度合并普通对象
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        // 如果源值是对象且目标值也是对象，则递归合并
        if (
          source[key] &&
          typeof source[key] === "object" &&
          target[key] &&
          typeof target[key] === "object" &&
          !(source[key] instanceof Date) &&
          !(source[key] instanceof RegExp) &&
          !Array.isArray(source[key])
        ) {
          this.deepMerge(target[key], source[key], options);
        } else if (options.overwrite || !(key in target)) {
          // 覆盖目标属性或目标属性不存在时
          target[key] = options.cloneDeep ? this.deepClone(source[key]) : source[key];
        }
      }
    }

    return target;
  }

  /**
   * @description 从对象中移除指定键
   * @param obj 对象
   * @param keys 键数组
   * @returns 移除指定键后的对象
   */
  static omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const newObj = objectUtils.deepClone(obj);
    keys.forEach((key) => {
      delete newObj[key];
    });
    return newObj;
  }

  /**
   * @description 从对象中提取指定键
   * @param obj 对象
   * @param keys 键数组
   * @returns 提取指定键后的对象
   */
  static pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const newObj = objectUtils.deepClone(obj);
    Object.keys(newObj).forEach((key) => {
      if (!keys.includes(key as K)) {
        delete newObj[key as keyof T];
      }
    });
    return newObj;
  }

  /**
   * @description 深度比较两个对象是否相等
   * @param obj1 第一个要比较的对象
   * @param obj2 第二个要比较的对象
   * @returns {boolean} 如果两个对象深度相等则返回true，否则返回false
   */
  static isEqual(obj1: any, obj2: any): boolean {
    // 处理基本类型的比较
    if (obj1 === obj2) return true;

    // 处理null和undefined
    if (obj1 == null || obj2 == null) {
      return obj1 === obj2;
    }

    // 处理不同类型的比较
    if (typeof obj1 !== typeof obj2) return false;

    // 处理Date对象
    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() === obj2.getTime();
    }

    // 处理RegExp对象
    if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
      return obj1.toString() === obj2.toString();
    }

    // 处理数组和对象的比较
    if (typeof obj1 === "object") {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      // 比较属性数量
      if (keys1.length !== keys2.length) return false;

      // 递归比较每个属性
      for (const key of keys1) {
        if (!keys2.includes(key) || !this.isEqual(obj1[key], obj2[key])) {
          return false;
        }
      }

      return true;
    }

    // 其他情况（如函数、Symbol等）直接返回false
    return false;
  }
}
