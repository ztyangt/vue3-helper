var pe = Object.defineProperty;
var ge = (e, t, n) => t in e ? pe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var b = (e, t, n) => ge(e, typeof t != "symbol" ? t + "" : t, n);
import { useDark as ve } from "@vueuse/core";
import { ref as E, onMounted as J, onBeforeUnmount as ye, defineComponent as N, h as $, createApp as _e, nextTick as K, computed as X, watch as be, createVNode as L, Fragment as we } from "vue";
import { onBeforeRouteLeave as xe } from "vue-router";
const ot = (e) => typeof e == "string", lt = (e) => typeof e == "number", ct = (e) => typeof e == "object", ut = (e) => typeof e == "function", dt = (e) => Array.isArray(e), ft = (e) => typeof e == "boolean", ht = (e) => e === null, mt = (e) => e === void 0, pt = (e) => e instanceof RegExp, gt = (e) => e instanceof Promise, vt = (e) => e instanceof Date, yt = (e) => e == null, _t = (e) => /^http[s]?:\/\/.*/.test(e), bt = (e) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e), wt = (e) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(e), xt = (e) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e), St = (e) => /^[\u4e00-\u9fa5]{0,}$/.test(e), Et = (e) => /^[a-zA-Z]+$/.test(e), Tt = (e) => /^[A-Za-z0-9]+$/.test(e), Lt = (e) => /^[A-Za-z0-9_]+$/.test(e), $t = (e) => /^[A-Z]+$/.test(e), Ct = (e) => /^[a-z]+$/.test(e), Mt = (e) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(e), Rt = (e) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(e), Pt = (e) => e == null || e === "" || e === 0 || e === !1 || Array.isArray(e) && e.length === 0 || typeof e == "object" && Object.keys(e).length === 0;
async function Se(e) {
  try {
    if (navigator.clipboard && window.isSecureContext)
      return await navigator.clipboard.writeText(e), !0;
    const t = document.createElement("textarea");
    t.value = e, t.style.position = "fixed", t.style.left = "-9999px", t.style.top = "0", t.style.opacity = "0", document.body.appendChild(t), t.select();
    let n = !1;
    try {
      n = document.execCommand("copy");
    } catch (r) {
      console.warn("Copy to clipboard failed:", r);
    }
    return document.body.removeChild(t), n;
  } catch (t) {
    return console.error("Copy to clipboard failed:", t), !1;
  }
}
function Dt(e, t) {
  Se(e).then(t).catch(() => t(!1));
}
function It(e, t, n, r = !1) {
  e.addEventListener && typeof e.addEventListener == "function" && e.addEventListener(t, n, r);
}
function At(e, t, n, r = !1) {
  e.removeEventListener && typeof e.removeEventListener == "function" && e.removeEventListener(t, n, r);
}
var Ee = `#version 300 es

in vec4 a_Position;

void main(){
  gl_PointSize=10.;
  gl_Position=a_Position;
}`, Te = `#version 300 es
precision highp float;

out vec4 outColor;

void main(){
  outColor=vec4(1.,0.,0.,1.);
}`;
class Le {
  constructor(t, n = {}) {
    b(this, "gl");
    b(this, "vertexShader");
    b(this, "fragmentShader");
    b(this, "program");
    b(this, "canvas");
    b(this, "compileError");
    let r = null;
    if (typeof t == "string" ? r = document.getElementById(t) : r = t, !r) throw new Error("Canvas not found");
    this.canvas = r;
    const i = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * i, this.canvas.height = this.canvas.clientHeight * i;
    const s = r.getContext("webgl2", { alpha: !1 });
    if (!s) throw new Error("WebGL2 not supported");
    this.gl = s, this.resizeCanvas(), this.program = this.initProgram(n.vertexShaderSource || Ee, n.fragmentShaderSource || Te);
  }
  // 更新片段着色器
  updateFragmentShader(t) {
    const n = this.createShader(this.gl.FRAGMENT_SHADER, t);
    if (!n) return;
    if (this.fragmentShader && (this.gl.detachShader(this.program, this.fragmentShader), this.gl.deleteShader(this.fragmentShader)), this.gl.attachShader(this.program, n), this.fragmentShader = n, this.gl.linkProgram(this.program), this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      this.gl.useProgram(this.program);
      return;
    }
    throw console.warn(this.gl.getProgramInfoLog(this.program)), new Error("Unable to initialize the shader program");
  }
  createShader(t, n) {
    const r = this.gl.createShader(t);
    if (!r) throw new Error("Unable to create shader");
    if (this.gl.shaderSource(r, n), this.gl.compileShader(r), this.gl.getShaderParameter(r, this.gl.COMPILE_STATUS))
      return this.compileError = null, r;
    this.compileError = this.gl.getShaderInfoLog(r), this.gl.deleteShader(r);
  }
  // 初始化着色器程序
  initProgram(t, n) {
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, t), this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, n);
    const r = this.gl.createProgram();
    if (!r) throw new Error("Unable to create shader program");
    if (this.vertexShader && this.gl.attachShader(r, this.vertexShader), this.fragmentShader && this.gl.attachShader(r, this.fragmentShader), this.gl.linkProgram(r), !this.gl.getProgramParameter(r, this.gl.LINK_STATUS))
      throw console.warn(this.gl.getProgramInfoLog(r)), this.gl.deleteProgram(r), new Error("Unable to initialize the shader program");
    return this.gl.useProgram(r), r;
  }
  // 清除画布
  clearGL() {
    this.gl.clearColor(0, 0, 0, 1), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT), this.resizeCanvas(), this.updateViewport();
  }
  destory() {
    var t;
    this.clearGL(), this.gl.deleteProgram(this.program), this.vertexShader && this.gl.deleteShader(this.vertexShader), this.fragmentShader && this.gl.deleteShader(this.fragmentShader), this.canvas.style.opacity = "0", (t = this.gl.getExtension("WEBGL_lose_context")) == null || t.loseContext();
  }
  // 坐标归一化处理
  normalizeCoords(t, n) {
    return [2 * t / this.canvas.width - 1, 1 - 2 * n / this.canvas.height];
  }
  normalizeX(t) {
    return 2 * t / this.canvas.width - 1;
  }
  normalizeY(t) {
    return 1 - 2 * t / this.canvas.height;
  }
  // 调整画布尺寸
  resizeCanvas() {
    const t = window.devicePixelRatio || 1, { clientWidth: n, clientHeight: r } = this.canvas;
    this.gl.canvas.width = n * t, this.gl.canvas.height = r * t;
  }
  // 更新 WebGL 视口
  updateViewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
}
var $e = `#version 300 es

in vec4 a_Position;

void main(){
  gl_Position=a_Position;
}`;
class Ot extends Le {
  // 控制渲染的标志
  constructor(n, r) {
    super(n, { vertexShaderSource: $e, fragmentShaderSource: r });
    b(this, "startTime");
    b(this, "endTime");
    b(this, "currentAnimationFrame", 0);
    b(this, "lastFrameTime", performance.now());
    // 上一帧的时间
    b(this, "frameCount", 0);
    // 帧数计数器
    b(this, "fps", 0);
    // 当前 FPS
    b(this, "isRendering", !0);
    this.initRect(), this.startTime = performance.now(), this.endTime = performance.now(), this.render();
  }
  pause() {
    cancelAnimationFrame(this.currentAnimationFrame), this.isRendering = !1;
  }
  stop() {
    this.pause(), this.frameCount = 0, this.fps = 0, this.lastFrameTime = performance.now();
  }
  restart() {
    this.stop(), this.resume();
  }
  resume() {
    this.startTime += performance.now() - this.endTime, this.isRendering = !0, this.render();
  }
  runTime() {
    return (this.endTime - this.startTime) / 1e3;
  }
  getFps() {
    return this.fps;
  }
  updateFragmentShader(n) {
    super.updateFragmentShader(n);
  }
  render() {
    if (!this.program || !this.isRendering) return;
    this.clearGL();
    const n = performance.now(), r = n - this.lastFrameTime;
    this.frameCount++, r >= 1e3 && (this.fps = parseFloat((this.frameCount / (r / 1e3)).toFixed(2)), this.frameCount = 0, this.lastFrameTime = n);
    const i = this.gl.getUniformLocation(this.program, "iResolution");
    this.gl.uniform2f(i, this.gl.canvas.width, this.gl.canvas.height);
    const s = this.gl.getUniformLocation(this.program, "iTime");
    this.endTime = performance.now(), this.gl.uniform1f(s, (this.endTime - this.startTime) / 1e3), this.gl.drawArrays(this.gl.TRIANGLES, 0, 6), this.isRendering && (this.currentAnimationFrame = requestAnimationFrame(() => this.render()));
  }
  initRect() {
    const n = this.gl.getAttribLocation(this.program, "a_Position");
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer()), this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]), this.gl.STATIC_DRAW), this.gl.vertexAttribPointer(n, 2, this.gl.FLOAT, !1, 0, 0), this.gl.enableVertexAttribArray(n);
  }
}
class kt {
  constructor(t) {
    b(this, "_listeners");
    b(this, "_onceListeners");
    this._listeners = {}, this._onceListeners = /* @__PURE__ */ new WeakMap();
    for (const n of t)
      this._listeners[n] = /* @__PURE__ */ new Set();
  }
  /**
   * 注册事件监听器
   * @param eventName 事件名称
   * @param listener 回调函数
   */
  on(t, n) {
    this._listeners[t] || (this._listeners[t] = /* @__PURE__ */ new Set()), this._listeners[t].add(n);
  }
  /**
   * 注册一次性事件监听器
   * @param eventName 事件名称
   * @param listener 回调函数
   */
  once(t, n) {
    const r = (...i) => {
      n(...i), this.off(t, r);
    };
    this._onceListeners.set(n, r), this.on(t, r);
  }
  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给监听器的参数
   */
  emit(t, ...n) {
    const r = this._listeners[t];
    r && new Set(r).forEach((s) => s(...n));
  }
  /**
   * 移除事件监听器
   * @param eventName 事件名称
   * @param listener 要移除的回调函数（可选）
   */
  off(t, n) {
    if (this._listeners[t])
      if (n) {
        const r = this._onceListeners.get(n);
        r ? (this._listeners[t].delete(r), this._onceListeners.delete(n)) : this._listeners[t].delete(n);
      } else
        this._listeners[t].clear();
  }
  /**
   * 获取某个事件的监听器数量
   * @param eventName 事件名称
   */
  listenerCount(t) {
    var n;
    return ((n = this._listeners[t]) == null ? void 0 : n.size) || 0;
  }
  /**
   * 清除所有事件监听器
   */
  clear() {
    for (const t of Object.keys(this._listeners))
      this._listeners[t].clear();
    this._onceListeners = /* @__PURE__ */ new WeakMap();
  }
}
const C = {
  year: 31536e6,
  // 365 days
  month: 2592e6,
  // 30 days
  week: 6048e5,
  day: 864e5,
  hour: 36e5,
  minute: 6e4,
  second: 1e3
};
class zt {
  /**
   * 计算时间差或格式化日期
   * @param date 目标日期
   * @param baseDate 基准日期（默认当前时间）
   * @param options 配置选项
   * @returns 时间差结果或格式化后的日期字符串
   */
  static diff(t, n = /* @__PURE__ */ new Date(), r = {}) {
    const i = this.parseDate(t), s = this.parseDate(n), a = s.getTime();
    return r.range && !this.checkRelativeTimeRange(i, a, r.range) ? this.formatOutOfRange(i, r.range.outOfRangeFormat) : this.calculateTimeDiff(i, s, r);
  }
  /**
   * 解析时间范围值为毫秒
   * @param value 时间范围值
   * @returns 毫秒数
   */
  static parseTimeRangeValue(t) {
    if (typeof t == "number") return t;
    const [n, r] = t.split(" "), i = parseFloat(n);
    if (isNaN(i) || !C[r])
      throw new Error(`无效的时间范围值: ${t}`);
    return i * C[r];
  }
  /**
   * 检查日期是否在相对时间范围内
   * @param targetDate 目标日期
   * @param now 当前时间戳（毫秒）
   * @param range 范围配置
   * @returns 是否在范围内
   */
  static checkRelativeTimeRange(t, n, r) {
    const { earliest: i, latest: s, inclusive: a = !0 } = r, l = t.getTime();
    if (i !== void 0) {
      const o = this.parseTimeRangeValue(i), u = n - Math.abs(o);
      if (a ? l < u : l <= u)
        return !1;
    }
    if (s !== void 0) {
      const o = this.parseTimeRangeValue(s), u = n + Math.abs(o);
      if (a ? l > u : l >= u)
        return !1;
    }
    return !0;
  }
  /**
   * 计算两个日期的时间差
   * @param date1 开始日期
   * @param date2 结束日期
   * @param options 配置选项
   * @returns 时间差结果
   */
  static calculateTimeDiff(t, n, r) {
    const i = Math.abs(n.getTime() - t.getTime()), s = ["year", "month", "day", "hour", "minute", "second"], a = r.units || s, l = r.round !== !1, o = {
      year: 0,
      month: 0,
      week: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    };
    let u = i;
    switch (a.forEach((m) => {
      if (C[m]) {
        const g = u / C[m];
        o[m] = l ? Math.round(g) : g, u -= o[m] * C[m];
      }
    }), r.format) {
      case "object":
        return o;
      case "array":
        return a.map((c) => `${o[c]} ${c}${o[c] !== 1 ? "s" : ""}`);
      case "short":
        return a.filter((c) => o[c] > 0).map((c) => `${o[c]}${c[0]}`).join(" ");
      case "long":
        return a.filter((c) => o[c] > 0).map((c) => `${o[c]} ${c}${o[c] !== 1 ? "s" : ""}`).join(" ");
      case "full":
      default:
        const m = a.filter((c) => o[c] > 0).map((c) => `${o[c]} ${c}${o[c] !== 1 ? "s" : ""}`);
        if (m.length === 0) return "0秒";
        if (m.length === 1) return m[0];
        const g = m.pop();
        return `${m.join("、")}和${g}`;
    }
  }
  /**
   * 格式化超出范围的日期
   * @param date 日期
   * @param format 格式化方式
   * @returns 格式化后的字符串
   */
  static formatOutOfRange(t, n) {
    return typeof n == "function" ? n(t) : n ? n.replace("{yyyy}", t.getFullYear().toString()).replace("{MM}", (t.getMonth() + 1).toString().padStart(2, "0")).replace("{dd}", t.getDate().toString().padStart(2, "0")).replace("{HH}", t.getHours().toString().padStart(2, "0")).replace("{mm}", t.getMinutes().toString().padStart(2, "0")).replace("{ss}", t.getSeconds().toString().padStart(2, "0")) : t.toLocaleString();
  }
  /**
   * 获取可读的时间差描述（中文）
   * @param date 目标日期
   * @param baseDate 基准日期（默认当前时间）
   * @returns 人类友好的时间差描述
   */
  static humanize(t, n) {
    const r = this.parseDate(t), i = this.parseDate(/* @__PURE__ */ new Date()).getTime();
    if (n != null && n.range && !this.checkRelativeTimeRange(r, i, n.range))
      return this.formatOutOfRange(r, n.range.outOfRangeFormat);
    const s = i - r.getTime(), a = Math.abs(s);
    if (a < 1e3)
      return s < 0 ? "即将" : "刚刚";
    if (a < 6e4) {
      const o = Math.round(a / 1e3);
      return s < 0 ? `${o}秒后` : `${o}秒前`;
    }
    if (a < 36e5) {
      const o = Math.round(a / 6e4);
      return s < 0 ? `${o}分钟后` : `${o}分钟前`;
    }
    if (a < 864e5) {
      const o = Math.round(a / 36e5);
      return s < 0 ? `${o}小时后` : `${o}小时前`;
    }
    if (a < 2592e6) {
      const o = Math.round(a / 864e5);
      if (o === 1) return s < 0 ? "明天" : "昨天";
      if (o < 7)
        return s < 0 ? `${o}天后` : `${o}天前`;
      const u = Math.round(o / 7);
      return s < 0 ? `${u}周后` : `${u}周前`;
    }
    if (a < 31536e6) {
      const o = Math.round(a / 2592e6);
      return s < 0 ? `${o}个月后` : `${o}个月前`;
    }
    const l = Math.round(a / 31536e6);
    return s < 0 ? `${l}年后` : `${l}年前`;
  }
  /**
   * 解析日期输入
   * @param date 日期输入
   * @returns 解析后的Date对象
   * @throws 如果输入格式无效将抛出错误
   */
  static parseDate(t) {
    if (t instanceof Date) return t;
    if (typeof t == "number") {
      const n = t.toString();
      if (n.length === 10)
        return new Date(t * 1e3);
      if (n.length === 13)
        return new Date(t);
      throw new Error("无效的时间戳格式：只支持10位（秒）或13位（毫秒）时间戳");
    }
    if (typeof t == "string") {
      const n = new Date(t);
      if (!isNaN(n.getTime())) return n;
      if (/^\d+$/.test(t))
        return this.parseDate(Number(t));
      throw new Error("无效的日期字符串格式");
    }
    throw new Error("不支持的日期类型");
  }
}
class Ft {
  /**
   * 生成随机字符串
   * @param length 字符串长度
   * @returns 随机字符串
   */
  static string(t) {
    const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let r = "";
    for (let i = 0; i < t; i++)
      r += n.charAt(Math.floor(Math.random() * n.length));
    return r;
  }
  /**
   * 生成指定范围内的随机数
   * @param min 最小值
   * @param max 最大值
   * @returns 随机数
   */
  static number(t, n) {
    return Math.floor(Math.random() * (n - t + 1)) + t;
  }
  /**
   * 生成随机布尔值
   * @returns 随机 true 或 false
   */
  static boolean() {
    return Math.random() > 0.5;
  }
  /**
   * 从数组中随机选择指定数量的元素
   * @param array 源数组
   * @param length 要选择的元素数量
   * @returns 随机元素数组
   */
  static array(t, n) {
    return [...t].sort(() => 0.5 - Math.random()).slice(0, n);
  }
  /**
   * 生成包含随机值的对象
   * @param object 模板对象
   * @param length 数组长度（如果属性是数组）
   * @returns 填充随机值的对象
   */
  static object(t, n) {
    const r = {};
    for (const i in t)
      if (t.hasOwnProperty(i)) {
        const s = typeof t[i];
        s === "string" ? r[i] = this.string(10) : s === "number" ? r[i] = this.number(0, 100) : s === "boolean" ? r[i] = this.boolean() : Array.isArray(t[i]) && (r[i] = this.array(t[i], n));
      }
    return r;
  }
  /**
   * 生成随机十六进制颜色代码
   * @returns 颜色代码，如 #ff0000
   */
  static color() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
  }
  /**
   * 生成随机日期
   * @returns 随机日期对象
   */
  static date() {
    const t = new Date(2e3, 0, 1), n = /* @__PURE__ */ new Date();
    return new Date(t.getTime() + Math.random() * (n.getTime() - t.getTime()));
  }
  /**
   * 生成随机UUID
   * @returns UUID字符串
   */
  static uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
      const n = Math.random() * 16 | 0;
      return (t === "x" ? n : n & 3 | 8).toString(16);
    });
  }
  /**
   * 生成随机密码
   * @param length 密码长度，默认为12
   * @returns 随机密码
   */
  static password(t = 12) {
    const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let r = "";
    for (let i = 0; i < t; i++)
      r += n.charAt(Math.floor(Math.random() * n.length));
    return r;
  }
}
class P {
  /**
   * @description 检查对象是否为空
   * @param obj
   * @returns {boolean}
   * */
  static isEmpty(t) {
    return t == null || Object.keys(t).length === 0;
  }
  /**
   * @description 深拷贝
   * @param obj
   * @param hash 缓存对象，避免循环引用
   * @returns {any}
   */
  static deepClone(t, n = /* @__PURE__ */ new WeakMap()) {
    if (t === null || typeof t != "object")
      return t;
    if (n.has(t))
      return n.get(t);
    if (t instanceof Date)
      return new Date(t);
    if (t instanceof RegExp)
      return new RegExp(t);
    let r = Array.isArray(t) ? [] : {};
    n.set(t, r);
    for (let i in t)
      t.hasOwnProperty(i) && (r[i] = P.deepClone(t[i], n));
    return r;
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
  static deepMerge(t, n, r = { overwrite: !0, cloneDeep: !0 }) {
    if (n == null)
      return t;
    if (t == null)
      return r.cloneDeep ? this.deepClone(n) : n;
    if (typeof t != "object" || typeof n != "object")
      return r.overwrite ? r.cloneDeep ? this.deepClone(n) : n : t;
    if (Array.isArray(n))
      return r.overwrite && (t = r.cloneDeep ? this.deepClone(n) : n), t;
    if (n instanceof Date || n instanceof RegExp)
      return r.overwrite && (t = r.cloneDeep ? this.deepClone(n) : n), t;
    for (const i in n)
      Object.prototype.hasOwnProperty.call(n, i) && (n[i] && typeof n[i] == "object" && t[i] && typeof t[i] == "object" && !(n[i] instanceof Date) && !(n[i] instanceof RegExp) && !Array.isArray(n[i]) ? this.deepMerge(t[i], n[i], r) : (r.overwrite || !(i in t)) && (t[i] = r.cloneDeep ? this.deepClone(n[i]) : n[i]));
    return t;
  }
  /**
   * @description 从对象中移除指定键
   * @param obj 对象
   * @param keys 键数组
   * @returns 移除指定键后的对象
   */
  static omit(t, n) {
    const r = P.deepClone(t);
    return n.forEach((i) => {
      delete r[i];
    }), r;
  }
  /**
   * @description 从对象中提取指定键
   * @param obj 对象
   * @param keys 键数组
   * @returns 提取指定键后的对象
   */
  static pick(t, n) {
    const r = P.deepClone(t);
    return Object.keys(r).forEach((i) => {
      n.includes(i) || delete r[i];
    }), r;
  }
  /**
   * @description 深度比较两个对象是否相等
   * @param obj1 第一个要比较的对象
   * @param obj2 第二个要比较的对象
   * @returns {boolean} 如果两个对象深度相等则返回true，否则返回false
   */
  static isEqual(t, n) {
    if (t === n) return !0;
    if (t == null || n == null)
      return t === n;
    if (typeof t != typeof n) return !1;
    if (t instanceof Date && n instanceof Date)
      return t.getTime() === n.getTime();
    if (t instanceof RegExp && n instanceof RegExp)
      return t.toString() === n.toString();
    if (typeof t == "object") {
      const r = Object.keys(t), i = Object.keys(n);
      if (r.length !== i.length) return !1;
      for (const s of r)
        if (!i.includes(s) || !this.isEqual(t[s], n[s]))
          return !1;
      return !0;
    }
    return !1;
  }
}
const Nt = () => {
  const e = ve({
    selector: "html",
    attribute: "class",
    valueDark: "dark",
    valueLight: "light"
  });
  return { isDark: e, toggleTheme: async (n, r = !1) => {
    if (!r) {
      e.value = !e.value;
      return;
    }
    if (!n) {
      e.value = !e.value;
      return;
    }
    try {
      const i = n.clientX, s = n.clientY, a = Math.hypot(Math.max(i, innerWidth - i), Math.max(s, innerHeight - s));
      let l;
      const o = document.startViewTransition(() => {
        const u = document.documentElement;
        l = u.classList.contains("dark"), u.classList.add(l ? "light" : "dark"), u.classList.remove(l ? "dark" : "light");
      });
      o.ready.then(() => {
        const u = [`circle(0px at ${i}px ${s}px)`, `circle(${a}px at ${i}px ${s}px)`];
        document.documentElement.animate(
          {
            clipPath: l ? [...u].reverse() : u
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement: l ? "::view-transition-old(root)" : "::view-transition-new(root)"
          }
        );
      }), await o.finished, e.value = !e.value;
    } catch {
      e.value = !e.value;
    }
  } };
}, Bt = (e = !1) => {
  const t = E(e);
  return {
    loading: t,
    setLoading: (i) => {
      t.value = i;
    },
    toggleLoading: () => {
      t.value = !t.value;
    }
  };
}, Ut = (e) => {
  const t = (a) => {
    const l = document.createElement("input");
    return l.type = "file", l.multiple = !!a.multiple, a.directory && (l.webkitdirectory = !0, l.mozdirectory = !0), a.accept && a.accept.length > 0 && (l.accept = a.accept.join(",")), l;
  }, n = () => {
    const { dragRef: a } = e || {};
    if (!(a != null && a.value)) return;
    const l = a.value, o = (c) => {
      c.preventDefault();
    }, u = (c) => {
      c.preventDefault(), l.classList.add("drag-active");
    }, m = (c) => {
      c.preventDefault(), l.classList.remove("drag-active");
    }, g = (c) => {
      var _;
      c.preventDefault(), l.classList.remove("drag-active"), (_ = e == null ? void 0 : e.dragCallback) == null || _.call(e, c);
    };
    return l.addEventListener("dragover", o), l.addEventListener("dragenter", u), l.addEventListener("dragleave", m), l.addEventListener("drop", g), () => {
      l.removeEventListener("dragover", o), l.removeEventListener("dragenter", u), l.removeEventListener("dragleave", m), l.removeEventListener("drop", g);
    };
  }, r = (a) => new Promise((l, o) => {
    const u = t(a);
    u.style.display = "none";
    const m = setTimeout(() => {
      o(new Error("选择取消或超时")), document.body.removeChild(u);
    }, 3e4);
    u.onchange = (g) => {
      clearTimeout(m);
      const c = g.target.files;
      c != null && c.length ? l(c) : o(new Error("未选择文件")), document.body.removeChild(u);
    }, document.body.appendChild(u), u.click();
  });
  return {
    selectFile: (a) => r({
      multiple: (a == null ? void 0 : a.multiple) ?? !0,
      accept: a == null ? void 0 : a.accept,
      directory: !1
    }),
    selectFolder: () => r({
      multiple: !1,
      directory: !0
    }),
    initDragDom: n
  };
};
function Ht(e = {}) {
  const { enabled: t = E(!0), message: n = "确定要离开此页面吗？未保存的更改可能会丢失。" } = e, r = typeof t == "boolean" ? E(t) : t, i = (s) => {
    if (r.value)
      return s.preventDefault(), s.returnValue = n, n;
  };
  return xe((s, a, l) => {
    if (r.value && !confirm(e.message || "确定要离开吗？"))
      return l(!1);
    l();
  }), J(() => {
    window.addEventListener("beforeunload", i);
  }), ye(() => {
    window.removeEventListener("beforeunload", i);
  }), {
    /**
     * 手动启用/禁用提示
     * @example setEnabled(false)
     */
    setEnabled: (s) => {
      r.value = s;
    }
  };
}
const Ce = {
  blurAmount: 5,
  duration: 1,
  thumbnail: ""
};
function R(e, t = {}) {
  const n = { ...Ce, ...t };
  e.style.transition = `filter ${n.duration}s ease, opacity ${n.duration}s ease`, e.style.filter = `blur(${n.blurAmount}px)`, e.style.opacity = "0";
  const r = () => {
    e.style.backgroundImage = "none", e.offsetWidth, e.style.filter = "blur(0)", e.style.opacity = "1", e.removeEventListener("load", r), e.removeEventListener("error", i);
  }, i = () => {
    console.error("Image failed to load", e.src), e.removeEventListener("load", r), e.removeEventListener("error", i);
  };
  e.complete ? r() : (e.addEventListener("load", r), e.addEventListener("error", i)), n.thumbnail && (e.style.backgroundImage = `url(${n.thumbnail})`, e.style.backgroundSize = "cover", e.style.backgroundPosition = "center");
}
const Me = {
  mounted(e, t) {
    if (e.tagName === "IMG")
      R(e, t.value);
    else {
      const n = e.getElementsByTagName("img");
      Array.from(n).forEach((r) => {
        R(r, t.value);
      });
    }
  },
  updated(e, t) {
    if (e.tagName === "IMG")
      R(e, t.value);
    else {
      const n = e.getElementsByTagName("img");
      Array.from(n).forEach((r) => {
        R(r, t.value);
      });
    }
  }
}, Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), De = {
  mounted: function(e) {
    e.style.cursor = "move", e.style.position = "absolute", e.onmousedown = function(t) {
      let n = t.pageX - e.offsetLeft, r = t.pageY - e.offsetTop;
      document.onmousemove = function(i) {
        let s = i.pageX - n, a = i.pageY - r, l = parseInt(window.getComputedStyle(e.parentNode).width) - parseInt(window.getComputedStyle(e).width), o = parseInt(window.getComputedStyle(e.parentNode).height) - parseInt(window.getComputedStyle(e).height);
        s < 0 ? s = 0 : s > l && (s = l), a < 0 ? a = 0 : a > o && (a = o), e.style.left = s + "px", e.style.top = a + "px";
      }, document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
}, Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: De
}, Symbol.toStringTag, { value: "Module" })), Q = N({
  name: "LoadingOverlay",
  props: {
    text: {
      type: String,
      default: ""
    },
    spinnerColor: {
      type: String,
      default: "#3498db"
    },
    value: {
      type: String,
      default: ""
    },
    styleClass: {
      // 改名为 styleClass 避免与原生 style 属性冲突
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: !1
    }
  },
  render() {
    return $(
      "div",
      {
        class: ["loading-overlay", { "show-loading-overlay": this.visible }]
      },
      [
        $("div", {
          class: this.styleClass || "loading-spinner",
          style: {
            borderTopColor: this.spinnerColor
          }
        }),
        this.text ? $("div", { class: "loading-text" }, this.text) : null
      ]
    );
  }
}), Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Q
}, Symbol.toStringTag, { value: "Module" })), Oe = {
  mounted(e, t) {
    e.style.position = "relative";
    const n = typeof t.value == "boolean" ? { value: t.value } : t.value || {}, r = n.delay || 50;
    let i = null;
    const s = () => {
      const a = _e(Q, {
        text: n.text,
        background: n.background,
        spinnerColor: n.spinnerColor,
        style: n.style || "loader-l13",
        visible: n.value ?? !0
      }), l = a.mount(document.createElement("div"));
      e._loadingInstance = l, e._loadingApp = a, e.appendChild(l.$el), K(() => {
        A(e, t);
      });
    };
    n.value && (i = window.setTimeout(() => {
      n.value && s();
    }, r)), e._loadingTimeoutId = i;
  },
  updated(e, t) {
    if (JSON.stringify(t.oldValue) !== JSON.stringify(t.value)) {
      const n = typeof t.value == "boolean" ? { value: t.value } : t.value || {};
      if (e._loadingTimeoutId && (clearTimeout(e._loadingTimeoutId), e._loadingTimeoutId = null), !n.value) {
        A(e, t);
        return;
      }
      const r = n.delay || 0;
      e._loadingTimeoutId = window.setTimeout(() => {
        n.value && A(e, t);
      }, r);
    }
  },
  unmounted(e) {
    var t, n, r;
    e._loadingTimeoutId && clearTimeout(e._loadingTimeoutId), (t = e._loadingApp) == null || t.unmount(), (r = (n = e._loadingInstance) == null ? void 0 : n.$el) == null || r.remove(), e._loadingInstance = void 0, e._loadingApp = void 0;
  }
};
function A(e, t) {
  var i, s, a;
  if (!e._loadingInstance) return;
  const n = typeof t.value == "boolean" ? t.value : ((i = t.value) == null ? void 0 : i.value) ?? !0;
  e.style.position = n ? "relative" : "";
  const r = e._loadingInstance.$el.parentElement;
  r && r.parentNode === e && r !== e.lastElementChild && e.appendChild(r), (a = (s = e._loadingInstance).setVisible) == null || a.call(s, n), e._loadingInstance.$el && (e._loadingInstance.$el.style.display = n ? "flex" : "none");
}
const ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oe
}, Symbol.toStringTag, { value: "Module" })), ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Fe = {
  mounted(e, t) {
    var W, j;
    e.style.position = "absolute", e.style.userSelect = "none";
    const n = () => {
      var h;
      const f = document.createElement("div");
      return f.style.position = "absolute", f.style.pointerEvents = "none", f.style.border = "2px dashed #3498db", f.style.backgroundColor = "rgba(52, 152, 219, 0.1)", f.style.zIndex = "1000", f.style.display = "none", (h = e.parentElement) == null || h.appendChild(f), f;
    }, r = (f) => {
      const h = document.createElement("div");
      return h.className = `resize-handle resize-handle-${f}`, h.style.position = "absolute", h.style.width = "10px", h.style.height = "10px", h.style.backgroundColor = "#fff", h.style.opacity = "0", h.style.border = "1px solid #333", h.style.zIndex = "100", h.style.touchAction = "none", f.includes("top") && (h.style.top = "-5px"), f.includes("bottom") && (h.style.bottom = "-5px"), f.includes("left") && (h.style.left = "-5px"), f.includes("right") && (h.style.right = "-5px"), f === "top-left" && (h.style.cursor = "nwse-resize"), f === "top-right" && (h.style.cursor = "nesw-resize"), f === "bottom-left" && (h.style.cursor = "nesw-resize"), f === "bottom-right" && (h.style.cursor = "nwse-resize"), e.appendChild(h), h;
    };
    e.__dragPreview = n();
    const i = [
      r("top-left"),
      r("top-right"),
      r("bottom-left"),
      r("bottom-right")
    ];
    e.__resizeHandles = i, e.__resizeListeners = [];
    const s = e.parentElement;
    if (!s) return;
    getComputedStyle(s).position === "static" && (s.style.position = "relative");
    const a = ((W = t.value) == null ? void 0 : W.minWidth) ?? 50, l = ((j = t.value) == null ? void 0 : j.minHeight) ?? 50;
    let o = !1, u = null, m = 0, g = 0, c = 0, _ = 0, d = 0, v = 0, p = 0, y = 0, S = 0, w = 0;
    const I = () => ({
      left: 0,
      top: 0,
      right: s.clientWidth,
      bottom: s.clientHeight
    }), de = () => {
      if (!e.__dragPreview) return;
      const f = e.__dragPreview;
      f.style.display = "block", f.style.left = `${S}px`, f.style.top = `${w}px`, f.style.width = `${p}px`, f.style.height = `${y}px`;
    }, fe = () => {
      e.__dragPreview && (e.__dragPreview.style.display = "none");
    }, he = (f, h) => {
      f.preventDefault(), f.stopPropagation(), o = !0, u = h, m = f.clientX, g = f.clientY, c = e.offsetWidth, _ = e.offsetHeight, d = e.offsetLeft, v = e.offsetTop, p = c, y = _, S = d, w = v, document.addEventListener("mousemove", U), document.addEventListener("mouseup", H);
    }, U = (f) => {
      if (!o || !u) return;
      const h = f.clientX - m, T = f.clientY - g, x = I();
      switch (u) {
        case "top-left":
          p = Math.max(a, c - h), y = Math.max(l, _ - T), S = d + (c - p), w = v + (_ - y);
          break;
        case "top-right":
          p = Math.max(a, c + h), y = Math.max(l, _ - T), w = v + (_ - y);
          break;
        case "bottom-left":
          p = Math.max(a, c - h), y = Math.max(l, _ + T), S = d + (c - p);
          break;
        case "bottom-right":
          p = Math.max(a, c + h), y = Math.max(l, _ + T);
          break;
      }
      S < x.left && (S = x.left, u.includes("left") && (p = c + d - x.left)), w < x.top && (w = x.top, u.includes("top") && (y = _ + v - x.top)), S + p > x.right && (p = x.right - S), w + y > x.bottom && (y = x.bottom - w), p = Math.max(a, p), y = Math.max(l, y), de();
    }, H = () => {
      o && (o = !1, e.style.width = `${p}px`, e.style.height = `${y}px`, e.style.left = `${S}px`, e.style.top = `${w}px`, fe(), document.removeEventListener("mousemove", U), document.removeEventListener("mouseup", H));
    };
    i.forEach((f, h) => {
      var Y;
      const T = ["top-left", "top-right", "bottom-left", "bottom-right"], x = (me) => he(me, T[h]);
      f.addEventListener("mousedown", x), (Y = e.__resizeListeners) == null || Y.push({ mousedown: x });
    });
  },
  unmounted(e) {
    e.__resizeHandles && e.__resizeHandles.forEach((t) => {
      t.remove();
    }), e.__resizeListeners && e.__resizeListeners.forEach((t, n) => {
      var r;
      (r = e.__resizeHandles) != null && r[n] && e.__resizeHandles[n].removeEventListener("mousedown", t.mousedown);
    }), e.__dragPreview && e.__dragPreview.remove();
  }
}, Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fe
}, Symbol.toStringTag, { value: "Module" })), ee = {
  directive: "ripple",
  color: "var(--ripple-color)",
  initialOpacity: 0.1,
  finalOpacity: 0.05,
  duration: 350,
  easing: "ease-out",
  delay: 60,
  disabled: !1,
  center: !1
}, Be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_PLUGIN_OPTIONS: ee
}, Symbol.toStringTag, { value: "Module" })), te = ({
  borderTopLeftRadius: e,
  borderTopRightRadius: t,
  borderBottomLeftRadius: n,
  borderBottomRightRadius: r
}) => {
  const i = document.createElement("div");
  return i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%", i.style.position = "absolute", i.style.borderRadius = `${e} ${t} ${r} ${n}`, i.style.overflow = "hidden", i.style.pointerEvents = "none", i.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", i;
}, Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: te
}, Symbol.toStringTag, { value: "Module" })), ne = (e, t, n, r, i) => {
  const s = document.createElement("div");
  return s.style.position = "absolute", s.style.width = r.center ? `${Math.sqrt(i.width * i.width + i.height * i.height)}px` : `${n * 2}px`, s.style.height = r.center ? `${Math.sqrt(i.width * i.width + i.height * i.height)}px` : `${n * 2}px`, s.style.top = r.center ? `${i.height / 2}px` : `${t}px`, s.style.left = r.center ? `${i.width / 2}px` : `${e}px`, s.style.background = r.color, s.style.borderRadius = "50%", s.style.opacity = `${r.initialOpacity}`, s.style.transform = "translate(-50%,-50%) scale(0)", s.style.transition = `transform ${r.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${r.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, s;
}, He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: ne
}, Symbol.toStringTag, { value: "Module" }));
function M(e, t, n, r) {
  const i = e - n, s = t - r;
  return Math.sqrt(i * i + s * s);
}
function re(e, { width: t, height: n, left: r, top: i }) {
  const s = e.clientX - r, a = e.clientY - i, l = M(s, a, 0, 0), o = M(s, a, t, 0), u = M(s, a, 0, n), m = M(s, a, t, n), g = Math.max(l, o, u, m);
  return {
    x: s,
    y: a,
    diameter: g
  };
}
const We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: re,
  getPythagoreanDistance: M
}, Symbol.toStringTag, { value: "Module" })), B = "vRippleCountInternal";
function ie(e, t) {
  e.dataset[B] = t.toString();
}
function D(e) {
  return parseInt(e.dataset[B] ?? "0", 10);
}
function se(e) {
  const t = D(e);
  ie(e, t + 1);
}
function ae(e) {
  const t = D(e);
  ie(e, t - 1);
}
function oe(e) {
  delete e.dataset[B];
}
const je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: ae,
  deleteRippleCount: oe,
  getRippleCount: D,
  incrementRippleCount: se
}, Symbol.toStringTag, { value: "Module" })), Ye = 1.05, O = /* @__PURE__ */ new WeakMap(), Xe = { ...ee }, Ve = (e, t, n) => {
  const r = t.getBoundingClientRect(), i = window.getComputedStyle(t), { diameter: s, x: a, y: l } = re(e, r), o = te(i), u = ne(a, l, s * Ye, n, r);
  let m = "", g = !1, c;
  function _() {
    u.style.transition = "opacity 120ms ease in out", u.style.opacity = "0", setTimeout(() => {
      o.remove(), ae(t), D(t) === 0 && (oe(t), t.style.position = m);
    }, 100);
  }
  function d(p) {
    typeof p < "u" && document.removeEventListener("pointerup", d), g ? _() : g = !0;
  }
  function v() {
    clearTimeout(c), o.remove(), document.removeEventListener("pointerup", d), document.removeEventListener("pointercancel", d), document.removeEventListener("pointercancel", v);
  }
  se(t), i.position === "static" && (t.style.position && (m = t.style.position), t.style.position = "relative"), o.appendChild(u), t.appendChild(o), document.addEventListener("pointerup", d), document.addEventListener("pointercancel", d), c = setTimeout(() => {
    document.removeEventListener("pointercancel", v), u.style.transform = "translate(-50%,-50%) scale(1)", u.style.opacity = `${n.finalOpacity}`, setTimeout(() => d(), n.duration);
  }, n.delay), document.addEventListener("pointercancel", v);
}, Ge = {
  mounted(e, t) {
    O.set(e, t.value ?? {}), e.addEventListener("pointerdown", (n) => {
      var i;
      const r = O.get(e);
      (i = t.value) != null && i.disabled || r !== !1 && Ve(n, e, {
        ...Xe,
        ...r
      });
    });
  },
  updated(e, t) {
    O.set(e, t.value ?? {});
  }
}, qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ge
}, Symbol.toStringTag, { value: "Module" })), V = 50, G = 500, le = /* @__PURE__ */ new WeakMap(), Ze = (e) => {
  const t = new IntersectionObserver((n) => {
    for (const r of n)
      if (r.isIntersecting) {
        const i = le.get(r.target);
        i && i.play(), t.unobserve(e);
      }
  });
  t.observe(e);
}, Je = (e, t) => e.getBoundingClientRect().top - t > window.innerHeight, Ke = {
  mounted(e, t) {
    let n = V, r = G;
    if (typeof t.value == "number" ? n = t.value : t.value && typeof t.value == "object" && (n = t.value.distance ?? V, r = t.value.duration ?? G), !Je(e, n))
      return;
    const i = e.animate(
      [
        { transform: `translateY(${n}px)`, opacity: 0.5 },
        // 起始状态：向下偏移，半透明
        { transform: "translateY(0)", opacity: 1 }
        // 结束状态：回到原位，完全不透明
      ],
      {
        duration: r,
        // 动画持续时间
        easing: "ease-in-out",
        // 缓动函数：平滑进出
        fill: "forwards"
        // 动画结束后保持最终状态
      }
    );
    i.pause(), le.set(e, i), Ze(e);
  }
}, Qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ke
}, Symbol.toStringTag, { value: "Module" })), q = /* @__PURE__ */ Object.assign({ "./blur-fade-in/index.ts": Re, "./blur-fade-in/types.ts": Pe, "./draggable/index.ts": Ie, "./loading/index.ts": ke, "./loading/loading.ts": Ae, "./loading/types.ts": ze, "./resize/index.ts": Ne, "./ripple/index.ts": qe, "./ripple/options.ts": Be, "./ripple/utils/create-container-element.ts": Ue, "./ripple/utils/create-ripple-element.ts": He, "./ripple/utils/get-element-position-utils.ts": We, "./ripple/utils/ripple-count.ts": je, "./slide-in/index.ts": Qe }), Wt = {
  install: function(e) {
    for (const t in q) {
      const n = q[t].default;
      if (!n) continue;
      const r = t.split("/")[1];
      t.split("/")[2] === "index.ts" && e.directive(r, n);
    }
  }
}, et = "C", tt = "cl", F = (e) => `${tt}__${e}`, ce = (e) => `${et}${e || ""}`, k = N({
  name: "Icon",
  props: {
    /**
     * 图标类型
     * @type {'remix' | 'svg'}
     * @default 'remix'
     * @example 'remix' | 'svg'
     */
    type: {
      type: String,
      default: "remix",
      validator: (e) => ["remix", "svg"].includes(e)
    },
    /**
     * 图标尺寸（单位：px）
     * @type {number}
     * @default 16
     */
    size: {
      type: [Number, String],
      default: 16
    },
    /**
     * 图标颜色（仅在 type="iconfont" 时生效）
     * @type {string}
     * @default '#333'
     */
    color: {
      type: String
    },
    /**
     * 图标名称
     * @type {string}
     * @required
     */
    name: {
      type: String,
      required: !0
    },
    /**
     * 是否旋转图标
     * @type {boolean}
     * @default false
     */
    spin: {
      type: Boolean,
      default: !1
    }
  },
  render() {
    const { type: e, size: t, color: n, name: r, spin: i } = this, s = F(`${e}-icon`), a = i ? F(`${e}-icon-spin`) : "";
    return e === "svg" ? $(
      "svg",
      {
        class: [s, a],
        style: {
          width: `${t}px`,
          height: `${t}px`
        }
      },
      {
        default: () => [$("use", { "xlink:href": `#${r}` })]
      }
    ) : $("i", {
      class: ["ri-" + r, s, a],
      style: {
        fontSize: `${t}px`,
        color: n
      }
    });
  }
}), ue = Object.assign(k, {
  install(e) {
    e.component(ce(k.name), k);
  }
}), z = /* @__PURE__ */ N({
  name: "Segmented",
  props: {
    block: {
      type: Boolean,
      default: !1
    },
    options: {
      type: Array,
      required: !0,
      validator: (e) => e.length > 0 && e.every((t) => "value" in t && "label" in t)
    },
    value: {
      type: [String, Number],
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "medium",
      validator: (e) => ["small", "medium", "large"].includes(e)
    }
  },
  emits: {
    "update:value": (e) => !0,
    change: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: n
  }) {
    const r = F("segmented"), i = E(null), s = E(null), a = E(-1), l = E(!1), o = X(() => e.options.findIndex((d) => d.value === e.value)), u = (d) => {
      e.disabled || e.value !== d && (t("update:value", d), t("change", d));
    }, m = async (d = !1) => {
      if (!i.value || !s.value) return;
      await K();
      const v = i.value, p = s.value, y = v.parentElement;
      if (!y) return;
      const S = y.getBoundingClientRect(), w = v.getBoundingClientRect();
      if (d && (p.style.transition = "none"), p.style.width = `${w.width}px`, p.style.height = `${w.height}px`, p.style.left = `${w.left - S.left}px`, !d && a.value !== -1 && o.value !== -1) {
        const I = o.value > a.value ? "right" : "left";
        p.classList.remove(`${r}-thumb-left`, `${r}-thumb-right`), p.classList.add(`${r}-thumb-${I}`);
      }
      d && requestAnimationFrame(() => {
        p.style.transition = "";
      }), a.value = o.value;
    };
    J(() => {
      l.value = !0, m(!0);
    }), be(() => e.value, () => m());
    const g = X(() => ({
      [r]: !0,
      [`${r}-block`]: e.block,
      [`${r}-disabled`]: e.disabled,
      [`${r}-${e.size}`]: !0
    })), c = (d) => ({
      [`${r}-item`]: !0,
      [`${r}-item-selected`]: e.value === d.value,
      [`${r}-item-disabled`]: d.disabled
    }), _ = (d) => {
      const v = `label-${d.value}`;
      return n[v] ? n[v]({
        option: d
      }) : L(we, null, [d.icon && L(ue, {
        class: "mr-5",
        name: d.icon
      }, null), L("span", {
        class: `${r}-item-label`
      }, [d.label])]);
    };
    return () => L("div", {
      class: g.value
    }, [L("div", {
      ref: s,
      class: `${r}-thumb`
    }, null), e.options.map((d, v) => L("div", {
      ref: e.value === d.value ? i : null,
      key: d.value,
      class: c(d),
      onClick: () => !d.disabled && u(d.value),
      "data-index": v
    }, [_(d)]))]);
  }
}), nt = Object.assign(z, {
  install(e) {
    e.component(ce(z.name), z);
  }
}), Z = {
  Icon: ue,
  Segmented: nt
}, jt = (e) => {
  Object.keys(Z).forEach((t) => {
    e.use(Z[t]);
  });
};
export {
  Ot as BaseCanvas,
  Le as BaseGL,
  ue as CIcon,
  nt as CSegmented,
  kt as Emitter,
  Ft as Random,
  jt as RegisterComponents,
  Wt as RegisterDirectives,
  zt as TimeDiff,
  It as addEventListen,
  Se as copyToClipboard,
  Dt as copyToClipboardWithCallback,
  Et as isAlpha,
  Tt as isAlphaNum,
  Lt as isAlphaNumUnderline,
  dt as isArray,
  Pt as isBlank,
  ft as isBoolean,
  St as isChinese,
  vt as isDate,
  bt as isEmail,
  ut as isFunction,
  xt as isIdCard,
  Ct as isLower,
  ht as isNull,
  yt as isNullOrUndefined,
  lt as isNumber,
  ct as isObject,
  wt as isPhone,
  Rt as isPort,
  gt as isPromise,
  pt as isRegExp,
  ot as isString,
  Mt as isTel,
  mt as isUndefined,
  $t as isUpper,
  _t as isUrl,
  P as objectUtils,
  At as removeEventListen,
  Ut as useFileSelect,
  Ht as useLeaveConfirm,
  Bt as useLoading,
  Nt as useTheme
};
