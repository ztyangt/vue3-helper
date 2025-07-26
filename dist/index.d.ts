import { AllowedComponentProps } from 'vue';
import { App } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsBase } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { CreateComponentPublicInstanceWithMixins } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { GlobalComponents } from 'vue';
import { GlobalDirectives } from 'vue';
import { IconType } from './src/type';
import { PublicProps } from 'vue';
import { Ref } from 'vue';
import { SegmentedOption } from './src/types';
import { ShallowRef } from 'vue';
import { VNodeProps } from 'vue';
import { WritableComputedRef } from 'vue';

/**
 * 添加事件监听器
 * @param target 监听目标，可以是Window或HTMLElement
 * @param event 事件名称
 * @param handler 事件处理函数
 * @param capture 是否在捕获阶段触发，默认为false
 */
export declare function addEventListen(target: Window | HTMLElement, event: string, handler: EventListenerOrEventListenerObject, capture?: boolean): void;

/**
 * 基础矩形画布
 * @param target 目标 canvas 元素或元素 ID
 * @param fragmentShaderSource 片段着色器源码，可选
 */
export declare class BaseCanvas extends BaseGL {
    private startTime;
    private endTime;
    private currentAnimationFrame;
    private lastFrameTime;
    private frameCount;
    private fps;
    private isRendering;
    constructor(target: string | HTMLCanvasElement, fragmentShaderSource?: string);
    pause(): void;
    stop(): void;
    restart(): void;
    resume(): void;
    runTime(): number;
    getFps(): number;
    updateFragmentShader(fragmentShaderSource: string): void;
    private render;
    private initRect;
}

export declare class BaseGL {
    gl: WebGL2RenderingContext;
    vertexShader?: WebGLShader;
    fragmentShader?: WebGLShader;
    program: WebGLProgram;
    canvas: HTMLCanvasElement;
    compileError?: string | null;
    constructor(target: string | HTMLCanvasElement, options?: BaseGLOptions);
    updateFragmentShader(source: string): void;
    private createShader;
    private initProgram;
    clearGL(): void;
    destory(): void;
    protected normalizeCoords(x: number, y: number): number[];
    protected normalizeX(x: number): number;
    protected normalizeY(y: number): number;
    protected resizeCanvas(): void;
    protected updateViewport(): void;
}

declare type BaseGLOptions = {
    vertexShaderSource?: string;
    fragmentShaderSource?: string;
};

export declare const CIcon: {
    new (...args: any[]): CreateComponentPublicInstanceWithMixins<Readonly<ExtractPropTypes<    {
    type: {
    type: () => IconType;
    default: string;
    validator: (value: string) => boolean;
    };
    size: {
    type: (StringConstructor | NumberConstructor)[];
    default: number;
    };
    color: {
    type: StringConstructor;
    };
    name: {
    type: StringConstructor;
    required: true;
    };
    spin: {
    type: BooleanConstructor;
    default: boolean;
    };
    }>> & Readonly<{}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, {
    size: string | number;
    type: IconType;
    spin: boolean;
    }, true, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
    P: {};
    B: {};
    D: {};
    C: {};
    M: {};
    Defaults: {};
    }, Readonly<ExtractPropTypes<    {
    type: {
    type: () => IconType;
    default: string;
    validator: (value: string) => boolean;
    };
    size: {
    type: (StringConstructor | NumberConstructor)[];
    default: number;
    };
    color: {
    type: StringConstructor;
    };
    name: {
    type: StringConstructor;
    required: true;
    };
    spin: {
    type: BooleanConstructor;
    default: boolean;
    };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
    size: string | number;
    type: IconType;
    spin: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & ComponentOptionsBase<Readonly<ExtractPropTypes<    {
type: {
type: () => IconType;
default: string;
validator: (value: string) => boolean;
};
size: {
type: (StringConstructor | NumberConstructor)[];
default: number;
};
color: {
type: StringConstructor;
};
name: {
type: StringConstructor;
required: true;
};
spin: {
type: BooleanConstructor;
default: boolean;
};
}>> & Readonly<{}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, {
size: string | number;
type: IconType;
spin: boolean;
}, {}, string, {}, GlobalComponents, GlobalDirectives, string, ComponentProvideOptions> & VNodeProps & AllowedComponentProps & ComponentCustomProps & {
    install(app: App): void;
};

/**
 * 将文本复制到剪贴板
 * @param text 要复制的文本
 * @returns 返回一个Promise，成功时为true，失败时为false
 */
export declare function copyToClipboard(text: string): Promise<boolean>;

/**
 * 将文本复制到剪贴板（回调版本）
 * @param text 要复制的文本
 * @param callback 完成后的回调函数，参数为是否成功
 */
export declare function copyToClipboardWithCallback(text: string, callback: (success: boolean) => void): void;

export declare const CSegmented: {
    new (...args: any[]): CreateComponentPublicInstanceWithMixins<Readonly<ExtractPropTypes<    {
    block: {
    type: BooleanConstructor;
    default: boolean;
    };
    options: {
    type: () => SegmentedOption[];
    required: true;
    validator: (value: SegmentedOption[]) => boolean;
    };
    value: {
    type: (StringConstructor | NumberConstructor)[];
    default: string;
    };
    disabled: {
    type: BooleanConstructor;
    default: boolean;
    };
    size: {
    type: () => "small" | "medium" | "large";
    default: string;
    validator: (value: string) => boolean;
    };
    }>> & Readonly<{
    onChange?: (_value: string | number) => any;
    "onUpdate:value"?: (_value: string | number) => any;
    }>, () => any, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    "update:value": (_value: string | number) => true;
    change: (_value: string | number) => true;
    }, PublicProps, {
    value: string | number;
    size: "small" | "medium" | "large";
    block: boolean;
    disabled: boolean;
    }, true, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
    P: {};
    B: {};
    D: {};
    C: {};
    M: {};
    Defaults: {};
    }, Readonly<ExtractPropTypes<    {
    block: {
    type: BooleanConstructor;
    default: boolean;
    };
    options: {
    type: () => SegmentedOption[];
    required: true;
    validator: (value: SegmentedOption[]) => boolean;
    };
    value: {
    type: (StringConstructor | NumberConstructor)[];
    default: string;
    };
    disabled: {
    type: BooleanConstructor;
    default: boolean;
    };
    size: {
    type: () => "small" | "medium" | "large";
    default: string;
    validator: (value: string) => boolean;
    };
    }>> & Readonly<{
    onChange?: (_value: string | number) => any;
    "onUpdate:value"?: (_value: string | number) => any;
    }>, () => any, {}, {}, {}, {
    value: string | number;
    size: "small" | "medium" | "large";
    block: boolean;
    disabled: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & ComponentOptionsBase<Readonly<ExtractPropTypes<    {
block: {
type: BooleanConstructor;
default: boolean;
};
options: {
type: () => SegmentedOption[];
required: true;
validator: (value: SegmentedOption[]) => boolean;
};
value: {
type: (StringConstructor | NumberConstructor)[];
default: string;
};
disabled: {
type: BooleanConstructor;
default: boolean;
};
size: {
type: () => "small" | "medium" | "large";
default: string;
validator: (value: string) => boolean;
};
}>> & Readonly<{
onChange?: (_value: string | number) => any;
"onUpdate:value"?: (_value: string | number) => any;
}>, () => any, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:value": (_value: string | number) => true;
change: (_value: string | number) => true;
}, string, {
value: string | number;
size: "small" | "medium" | "large";
block: boolean;
disabled: boolean;
}, {}, string, {}, GlobalComponents, GlobalDirectives, string, ComponentProvideOptions> & VNodeProps & AllowedComponentProps & ComponentCustomProps & {
    install(app: App): void;
};

/**
 * 图标组件，支持 remix 和 svg 两种类型的图标
 *
 * @example
 * <Icon type="svg" name="close" size="20" />
 * <Icon type="iconfont" name="home" color="#1890ff" spin />
 */
declare const _default: DefineComponent<ExtractPropTypes<    {
/**
* 图标类型
* @type {'remix' | 'svg'}
* @default 'remix'
* @example 'remix' | 'svg'
*/
type: {
type: () => IconType_2;
default: string;
validator: (value: string) => boolean;
};
/**
* 图标尺寸（单位：px）
* @type {number}
* @default 16
*/
size: {
type: (StringConstructor | NumberConstructor)[];
default: number;
};
/**
* 图标颜色（仅在 type="iconfont" 时生效）
* @type {string}
* @default '#333'
*/
color: {
type: StringConstructor;
};
/**
* 图标名称
* @type {string}
* @required
*/
name: {
type: StringConstructor;
required: true;
};
/**
* 是否旋转图标
* @type {boolean}
* @default false
*/
spin: {
type: BooleanConstructor;
default: boolean;
};
}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {
/**
* 图标类型
* @type {'remix' | 'svg'}
* @default 'remix'
* @example 'remix' | 'svg'
*/
type: {
type: () => IconType_2;
default: string;
validator: (value: string) => boolean;
};
/**
* 图标尺寸（单位：px）
* @type {number}
* @default 16
*/
size: {
type: (StringConstructor | NumberConstructor)[];
default: number;
};
/**
* 图标颜色（仅在 type="iconfont" 时生效）
* @type {string}
* @default '#333'
*/
color: {
type: StringConstructor;
};
/**
* 图标名称
* @type {string}
* @required
*/
name: {
type: StringConstructor;
required: true;
};
/**
* 是否旋转图标
* @type {boolean}
* @default false
*/
spin: {
type: BooleanConstructor;
default: boolean;
};
}>> & Readonly<{}>, {
size: string | number;
type: IconType_2;
spin: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

declare const _default_2: DefineComponent<ExtractPropTypes<    {
block: {
type: BooleanConstructor;
default: boolean;
};
options: {
type: () => SegmentedOption_2[];
required: true;
validator: (value: SegmentedOption_2[]) => boolean;
};
value: {
type: (StringConstructor | NumberConstructor)[];
default: string;
};
disabled: {
type: BooleanConstructor;
default: boolean;
};
size: {
type: () => "small" | "medium" | "large";
default: string;
validator: (value: string) => boolean;
};
}>, () => any, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:value": (_value: string | number) => true;
change: (_value: string | number) => true;
}, string, PublicProps, Readonly<ExtractPropTypes<    {
block: {
type: BooleanConstructor;
default: boolean;
};
options: {
type: () => SegmentedOption_2[];
required: true;
validator: (value: SegmentedOption_2[]) => boolean;
};
value: {
type: (StringConstructor | NumberConstructor)[];
default: string;
};
disabled: {
type: BooleanConstructor;
default: boolean;
};
size: {
type: () => "small" | "medium" | "large";
default: string;
validator: (value: string) => boolean;
};
}>> & Readonly<{
onChange?: (_value: string | number) => any;
"onUpdate:value"?: (_value: string | number) => any;
}>, {
value: string | number;
size: "small" | "medium" | "large";
block: boolean;
disabled: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare class Emitter<T extends string, EventMap extends Record<T, any[]>> {
    private _listeners;
    private _onceListeners;
    constructor(eventNameList: T[]);
    /**
     * 注册事件监听器
     * @param eventName 事件名称
     * @param listener 回调函数
     */
    on<U extends EventMap[K], K extends T>(eventName: K, listener: Listener<U>): void;
    /**
     * 注册一次性事件监听器
     * @param eventName 事件名称
     * @param listener 回调函数
     */
    once<U extends EventMap[K], K extends T>(eventName: K, listener: Listener<U>): void;
    /**
     * 触发事件
     * @param eventName 事件名称
     * @param args 传递给监听器的参数
     */
    emit<U extends EventMap[K], K extends T>(eventName: K, ...args: U): void;
    /**
     * 移除事件监听器
     * @param eventName 事件名称
     * @param listener 要移除的回调函数（可选）
     */
    off<U extends EventMap[K], K extends T>(eventName: K, listener?: Listener<U>): void;
    /**
     * 获取某个事件的监听器数量
     * @param eventName 事件名称
     */
    listenerCount(eventName: T): number;
    /**
     * 清除所有事件监听器
     */
    clear(): void;
}

/**
 * 生成指定 HSL 范围内的随机颜色（支持多范围和空参数）
 * @param hueRanges 色相范围数组，如 [[0, 30], [180, 240]]（0-360），为空时使用默认范围
 * @param saturationRanges 饱和度范围数组，如 [[50, 70], [80, 100]]（0-100），为空时使用默认范围
 * @param lightnessRanges 亮度范围数组，如 [[30, 50], [70, 90]]（0-100），为空时使用默认范围
 * @returns 十六进制颜色字符串，如 "#FF0000"
 */
declare function generateRandomColorInRanges(hueRanges?: [number, number][] | null, saturationRanges?: [number, number][] | null, lightnessRanges?: [number, number][] | null): string;

export declare type IconInstance = InstanceType<typeof _default>;

export declare type IconProps = IconInstance["$props"];

declare type IconType_2 = "iconfont" | "svg";

/**
 * 判断是否是英文
 * @param value any
 * @returns boolean
 * */
export declare const isAlpha: (value: any) => value is string;

/**
 * 判断是否是数字和英文
 * @param value any
 * @returns boolean
 * */
export declare const isAlphaNum: (value: any) => value is string;

/**
 * 判断是否是数字和英文和下划线
 * @param value any
 * @returns boolean
 * */
export declare const isAlphaNumUnderline: (value: any) => value is string;

/**
 * 判断是否是数组
 * @param value any
 * @returns boolean
 */
export declare const isArray: (value: any) => value is Array<any>;

/**
 * 判断是否为空
 * @param value any
 * @description 空值包括 null, undefined, "", [], {}, 0, false
 * @returns boolean
 */
export declare const isBlank: (value: any) => boolean;

/**
 * 判断是否是布尔值
 * @param value any
 * @returns boolean
 */
export declare const isBoolean: (value: any) => value is boolean;

/**
 * 判断是否是中文
 * @param value any
 * @returns boolean
 */
export declare const isChinese: (value: any) => value is string;

/**
 * 判断是否是Date
 * @param value any
 * @returns boolean
 * */
export declare const isDate: (value: any) => value is Date;

/**
 * 判断是否是邮箱
 * @param value any
 * @returns boolean
 */
export declare const isEmail: (value: any) => value is string;

/**
 * 判断是否是函数
 * @param value any
 * @returns boolean
 */
export declare const isFunction: (value: any) => value is Function;

/**
 * 判断是否是身份证号(第二代)
 * @param value any
 * @returns boolean
 *  */
export declare const isIdCard: (value: any) => value is string;

/**
 * 判断是否是小写字母
 * @param value any
 * @returns boolean
 * */
export declare const isLower: (value: any) => value is string;

/**
 * 判断是否是null
 * @param value any
 * @returns boolean
 */
export declare const isNull: (value: any) => value is null;

/**
 * 判断是否是 null 或 undefined
 * @param value any
 * @returns boolean
 */
export declare const isNullOrUndefined: (value: any) => value is null | undefined;

/**
 * 判断是否是数字
 * @param value any
 * @returns boolean
 */
export declare const isNumber: (value: any) => value is number;

/**
 * 判断是否是对象
 * @param value any
 * @returns boolean
 */
export declare const isObject: (value: any) => value is object;

/**
 * 判断是否是手机号
 * @param value any
 * @returns boolean
 */
export declare const isPhone: (value: any) => value is string;

/**
 * 判断是否为端口号
 * @param value any
 * @returns boolean
 *  */
export declare const isPort: (value: any) => value is string;

/**
 * 判断是否是promise
 * @param value any
 * @returns boolean
 * */
export declare const isPromise: (value: any) => value is Promise<any>;

/**
 * 判断是否是regexp
 * @param value any
 * @returns boolean
 */
export declare const isRegExp: (value: any) => value is RegExp;

/**
 * 判断是否是字符串
 * @param value any
 * @returns boolean
 */
export declare const isString: (value: any) => value is string;

/**
 * 判断是否为固话
 * @param value any
 * @returns boolean
 */
export declare const isTel: (value: any) => value is string;

/**
 * 判断是否是undefined
 * @param value any
 * @returns boolean
 */
export declare const isUndefined: (value: any) => value is undefined;

/**
 * 判断是否是大写字母
 * @param value any
 * @returns boolean
 * */
export declare const isUpper: (value: any) => value is string;

/**
 * 判断是否是 url
 * @param value any
 * @returns boolean
 */
export declare const isUrl: (value: any) => value is string;

declare type Listener<T extends any[]> = (...args: T) => void;

export declare class objectUtils {
    /**
     * @description 检查对象是否为空
     * @param obj
     * @returns {boolean}
     * */
    static isEmpty(obj?: any): boolean;
    /**
     * @description 深拷贝
     * @param obj
     * @param hash 缓存对象，避免循环引用
     * @returns {any}
     */
    static deepClone(obj: any, hash?: WeakMap<object, any>): any;
    /**
     * @description 深度合并两个或多个对象
     * @param target 目标对象，合并结果将存储在此对象中
     * @param source 源对象，提供要合并的属性
     * @param options 合并选项
     * @param {boolean} [options.overwrite=true] 是否覆盖目标对象已有值
     * @param {boolean} [options.cloneDeep=true] 是否深拷贝源对象属性
     * @returns {any} 合并后的目标对象
     */
    static deepMerge(target: any, source: any, options?: {
        overwrite?: boolean;
        cloneDeep?: boolean;
    }): any;
    /**
     * @description 从对象中移除指定键
     * @param obj 对象
     * @param keys 键数组
     * @returns 移除指定键后的对象
     */
    static omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
    /**
     * @description 从对象中提取指定键
     * @param obj 对象
     * @param keys 键数组
     * @returns 提取指定键后的对象
     */
    static pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
    /**
     * @description 深度比较两个对象是否相等
     * @param obj1 第一个要比较的对象
     * @param obj2 第二个要比较的对象
     * @returns {boolean} 如果两个对象深度相等则返回true，否则返回false
     */
    static isEqual(obj1: any, obj2: any): boolean;
}

declare interface Options {
    enabled?: Ref<boolean> | boolean;
    message?: string;
}

export declare class Random {
    /**
     * 生成随机字符串
     * @param length 字符串长度
     * @returns 随机字符串
     */
    static string(length: number): string;
    /**
     * 生成指定范围内的随机数
     * @param min 最小值
     * @param max 最大值
     * @returns 随机数
     */
    static number(min: number, max: number): number;
    /**
     * 生成随机布尔值
     * @returns 随机 true 或 false
     */
    static boolean(): boolean;
    /**
     * 从数组中随机选择指定数量的元素
     * @param array 源数组
     * @param length 要选择的元素数量
     * @returns 随机元素数组
     */
    static array<T>(array: T[], length: number): T[];
    /**
     * 生成包含随机值的对象
     * @param object 模板对象
     * @param length 数组长度（如果属性是数组）
     * @returns 填充随机值的对象
     */
    static object<T>(object: T, length: number): T;
    /**
     * 生成随机十六进制颜色
     * @returns 颜色代码，如 #ff0000
     */
    static color(...params: Parameters<typeof generateRandomColorInRanges>): string;
    /**
     * 生成随机日期
     * @returns 随机日期对象
     */
    static date(): Date;
    /**
     * 生成随机UUID
     * @returns UUID字符串
     */
    static uuid(): string;
    /**
     * 生成随机密码
     * @param length 密码长度，默认为12
     * @returns 随机密码
     */
    static password(length?: number): string;
}

export declare const RegisterComponents: (app: App) => void;

export declare const RegisterDirectives: {
    install: (app: App<Element>) => void;
};

/**
 * 移除事件监听器
 * @param target 监听目标，可以是Window或HTMLElement
 * @param event 事件名称
 * @param handler 事件处理函数
 * @param capture 是否在捕获阶段触发，默认为false
 */
export declare function removeEventListen(target: Window | HTMLElement, event: string, handler: EventListenerOrEventListenerObject, capture?: boolean): void;

export declare type SegmentedInstance = InstanceType<typeof _default_2>;

declare interface SegmentedOption_2 {
    label?: string;
    icon?: string;
    value: string | number;
    disabled?: boolean;
}

export declare type SegmentedProps = SegmentedInstance["$props"];

declare interface SelectionOptions {
    dragRef?: Readonly<ShallowRef<HTMLDivElement | null>>;
    selectFile?: (e: Event) => void;
    selectFolder?: (e: Event) => void;
    dragCallback?: (e: DragEvent) => void;
}

export declare class Time {
    /**
     * 格式化日期
     * @param date 日期对象或时间戳
     * @param format 格式字符串，支持以下占位符：
     *   YYYY - 四位年份
     *   YY - 两位年份
     *   MM - 两位月份 (01-12)
     *   M - 月份 (1-12)
     *   DD - 两位日期 (01-31)
     *   D - 日期 (1-31)
     *   HH - 24小时制小时 (00-23)
     *   H - 24小时制小时 (0-23)
     *   hh - 12小时制小时 (01-12)
     *   h - 12小时制小时 (1-12)
     *   mm - 分钟 (00-59)
     *   m - 分钟 (0-59)
     *   ss - 秒 (00-59)
     *   s - 秒 (0-59)
     *   SSS - 毫秒 (000-999)
     *   A - 大写的上午/下午
     *   a - 小写的上午/下午
     * @returns 格式化后的日期字符串
     */
    static format(date?: Date | number, format?: string): string;
    /**
     * 人性化时间展示
     * @param date 日期对象或时间戳
     * @param options 配置选项
     * @returns 人性化时间字符串或格式化后的时间字符串
     */
    static humanize(date: Date | number, options?: {
        /**
         * 范围阈值（毫秒），在此范围内的时间会显示为相对时间
         * 默认值：7天（604800000毫秒）
         */
        threshold?: number;
        /**
         * 超出范围后的格式化字符串
         * 默认值："YYYY-MM-DD"
         */
        defaultFormat?: string;
        /**
         * 当前时间，默认为 new Date()
         */
        now?: Date | number;
        /**
         * 是否显示相对时间的后缀（如"前"、"后"）
         * 默认值：true
         */
        showSuffix?: boolean;
    }): string;
    /**
     * 获取两个日期之间的差值
     * @param date1 第一个日期
     * @param date2 第二个日期，默认为当前时间
     * @returns 差值对象，包含年、月、日、小时、分钟、秒、毫秒，带有符号表示方向（正数表示date2较晚）
     */
    static diff(date1: Date | number, date2?: Date | number): {
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
    };
    static add(date: Date | number, value: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond"): Date;
    /**
     * 减去时间
     * @param date 原始日期
     * @param value 要减去的值
     * @param unit 时间单位 ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond')
     * @returns 新的Date对象
     */
    static subtract(date: Date | number, value: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond"): Date;
    /**
     * 检查日期是否有效
     * @param date 日期对象或时间戳
     * @returns 是否有效
     */
    static isValid(date: Date | number): boolean;
    /**
     * 获取当前时间戳（毫秒）
     * @returns 当前时间戳
     */
    static now(): number;
    /**
     * 获取某个月的第一天
     * @param date 日期对象或时间戳
     * @returns 该月第一天的Date对象
     */
    static startOfMonth(date: Date | number): Date;
    /**
     * 获取某个月的最后一天
     * @param date 日期对象或时间戳
     * @returns 该月最后一天的Date对象
     */
    static endOfMonth(date: Date | number): Date;
    /**
     * 获取某天的开始时间（00:00:00.000）
     * @param date 日期对象或时间戳
     * @returns 该天开始的Date对象
     */
    static startOfDay(date: Date | number): Date;
    /**
     * 获取某天的结束时间（23:59:59.999）
     * @param date 日期对象或时间戳
     * @returns 该天结束的Date对象
     */
    static endOfDay(date: Date | number): Date;
    /**
     * 比较两个日期
     * @param date1 第一个日期
     * @param date2 第二个日期
     * @returns 比较结果：
     *   -1: date1 在 date2 之前
     *    0: date1 等于 date2
     *    1: date1 在 date2 之后
     */
    static compare(date1: Date | number, date2: Date | number): number;
    /**
     * 检查日期是否在范围内
     * @param date 要检查的日期
     * @param start 范围开始日期
     * @param end 范围结束日期
     * @returns 是否在范围内
     */
    static isBetween(date: Date | number, start: Date | number, end: Date | number): boolean;
}

export declare const useFileSelect: (options?: SelectionOptions) => {
    selectFile: (selectOptions?: {
        multiple?: boolean;
        accept?: string[];
    }) => Promise<FileList>;
    selectFolder: () => Promise<FileList>;
    initDragDom: () => () => void;
};

/**
 * 离开网站确认提示 Hook
 * @param options 配置选项
 *
 * 使用示例：
 * 1. 基本用法（始终启用）：
 *    useLeaveConfirm();
 *
 * 2. 动态控制：
 *    const hasUnsavedChanges = ref(true);
 *    useLeaveConfirm({ enabled: hasUnsavedChanges });
 *
 * 3. 自定义消息：
 *    useLeaveConfirm({ message: '您有未保存的更改！' });
 */
export declare function useLeaveConfirm(options?: Options): {
    /**
     * 手动启用/禁用提示
     * @example setEnabled(false)
     */
    setEnabled: (value: boolean) => void;
};

/**
 * 创建一个加载状态管理对象
 * @param initValue 初始加载状态，默认为false
 * @returns 返回包含加载状态和操作方法的对象
 */
export declare const useLoading: (initValue?: boolean) => {
    loading: Ref<boolean, boolean>;
    setLoading: (value: boolean) => void;
    toggleLoading: () => void;
};

export declare const useTheme: () => {
    isDark: WritableComputedRef<boolean, boolean>;
    toggleTheme: (event?: MouseEvent, animate?: boolean) => Promise<void>;
};

export { }
