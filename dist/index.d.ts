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
    type: IconType;
    size: string | number;
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
    type: IconType;
    size: string | number;
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
type: IconType;
size: string | number;
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
type: IconType_2;
size: string | number;
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

export declare const useFileSelect: (options?: SelectionOptions) => {
    selectFile: (selectOptions?: {
        multiple?: boolean;
        accept?: string[];
    }) => Promise<FileList>;
    selectFolder: () => Promise<FileList>;
    initDragDom: () => () => void;
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
