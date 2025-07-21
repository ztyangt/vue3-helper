import { generateRandomColorInRanges } from "./color";

export class Random {
  /**
   * 生成随机字符串
   * @param length 字符串长度
   * @returns 随机字符串
   */
  static string(length: number): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * 生成指定范围内的随机数
   * @param min 最小值
   * @param max 最大值
   * @returns 随机数
   */
  static number(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * 生成随机布尔值
   * @returns 随机 true 或 false
   */
  static boolean(): boolean {
    return Math.random() > 0.5;
  }

  /**
   * 从数组中随机选择指定数量的元素
   * @param array 源数组
   * @param length 要选择的元素数量
   * @returns 随机元素数组
   */
  static array<T>(array: T[], length: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, length);
  }

  /**
   * 生成包含随机值的对象
   * @param object 模板对象
   * @param length 数组长度（如果属性是数组）
   * @returns 填充随机值的对象
   */
  static object<T>(object: T, length: number): T {
    const result: any = {};
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const type = typeof object[key];
        if (type === "string") {
          result[key] = this.string(10);
        } else if (type === "number") {
          result[key] = this.number(0, 100);
        } else if (type === "boolean") {
          result[key] = this.boolean();
        } else if (Array.isArray(object[key])) {
          result[key] = this.array((object as any)[key], length);
        }
      }
    }
    return result;
  }

  /**
   * 生成随机十六进制颜色
   * @returns 颜色代码，如 #ff0000
   */
  static color(...params: Parameters<typeof generateRandomColorInRanges>): string {
    // return `#${Math.floor(Math.random() * 0xffffff)
    //   .toString(16)
    //   .padStart(6, "0")}`;
    return generateRandomColorInRanges(...params);
  }

  /**
   * 生成随机日期
   * @returns 随机日期对象
   */
  static date(): Date {
    const start = new Date(2000, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  /**
   * 生成随机UUID
   * @returns UUID字符串
   */
  static uuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * 生成随机密码
   * @param length 密码长度，默认为12
   * @returns 随机密码
   */
  static password(length: number = 12): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
