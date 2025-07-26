var me = Object.defineProperty;
var ge = (t, e, n) => e in t ? me(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var w = (t, e, n) => ge(t, typeof e != "symbol" ? e + "" : e, n);
import { useDark as pe } from "@vueuse/core";
import { ref as D, onMounted as Z, onBeforeUnmount as ve, defineComponent as F, h as L, createApp as ye, nextTick as J, computed as W, watch as _e, createVNode as M, Fragment as we } from "vue";
import { onBeforeRouteLeave as be } from "vue-router";
const lt = (t) => typeof t == "string", ct = (t) => typeof t == "number", ut = (t) => typeof t == "object", dt = (t) => typeof t == "function", ft = (t) => Array.isArray(t), ht = (t) => typeof t == "boolean", mt = (t) => t === null, gt = (t) => t === void 0, pt = (t) => t instanceof RegExp, vt = (t) => t instanceof Promise, yt = (t) => t instanceof Date, _t = (t) => t == null, wt = (t) => /^http[s]?:\/\/.*/.test(t), bt = (t) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(t), xt = (t) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(t), St = (t) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(t), Dt = (t) => /^[\u4e00-\u9fa5]{0,}$/.test(t), Et = (t) => /^[a-zA-Z]+$/.test(t), Mt = (t) => /^[A-Za-z0-9]+$/.test(t), Lt = (t) => /^[A-Za-z0-9_]+$/.test(t), Tt = (t) => /^[A-Z]+$/.test(t), Ct = (t) => /^[a-z]+$/.test(t), $t = (t) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(t), Pt = (t) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(t), At = (t) => t == null || t === "" || t === 0 || t === !1 || Array.isArray(t) && t.length === 0 || typeof t == "object" && Object.keys(t).length === 0;
async function xe(t) {
  try {
    if (navigator.clipboard && window.isSecureContext)
      return await navigator.clipboard.writeText(t), !0;
    const e = document.createElement("textarea");
    e.value = t, e.style.position = "fixed", e.style.left = "-9999px", e.style.top = "0", e.style.opacity = "0", document.body.appendChild(e), e.select();
    let n = !1;
    try {
      n = document.execCommand("copy");
    } catch (s) {
      console.warn("Copy to clipboard failed:", s);
    }
    return document.body.removeChild(e), n;
  } catch (e) {
    return console.error("Copy to clipboard failed:", e), !1;
  }
}
function Rt(t, e) {
  xe(t).then(e).catch(() => e(!1));
}
function It(t, e, n, s = !1) {
  t.addEventListener && typeof t.addEventListener == "function" && t.addEventListener(e, n, s);
}
function kt(t, e, n, s = !1) {
  t.removeEventListener && typeof t.removeEventListener == "function" && t.removeEventListener(e, n, s);
}
var Se = `#version 300 es

in vec4 a_Position;

void main(){
  gl_PointSize=10.;
  gl_Position=a_Position;
}`, De = `#version 300 es
precision highp float;

out vec4 outColor;

void main(){
  outColor=vec4(1.,0.,0.,1.);
}`;
class Ee {
  constructor(e, n = {}) {
    w(this, "gl");
    w(this, "vertexShader");
    w(this, "fragmentShader");
    w(this, "program");
    w(this, "canvas");
    w(this, "compileError");
    let s = null;
    if (typeof e == "string" ? s = document.getElementById(e) : s = e, !s) throw new Error("Canvas not found");
    this.canvas = s;
    const r = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * r, this.canvas.height = this.canvas.clientHeight * r;
    const i = s.getContext("webgl2", { alpha: !1 });
    if (!i) throw new Error("WebGL2 not supported");
    this.gl = i, this.resizeCanvas(), this.program = this.initProgram(n.vertexShaderSource || Se, n.fragmentShaderSource || De);
  }
  // 更新片段着色器
  updateFragmentShader(e) {
    const n = this.createShader(this.gl.FRAGMENT_SHADER, e);
    if (!n) return;
    if (this.fragmentShader && (this.gl.detachShader(this.program, this.fragmentShader), this.gl.deleteShader(this.fragmentShader)), this.gl.attachShader(this.program, n), this.fragmentShader = n, this.gl.linkProgram(this.program), this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      this.gl.useProgram(this.program);
      return;
    }
    throw console.warn(this.gl.getProgramInfoLog(this.program)), new Error("Unable to initialize the shader program");
  }
  createShader(e, n) {
    const s = this.gl.createShader(e);
    if (!s) throw new Error("Unable to create shader");
    if (this.gl.shaderSource(s, n), this.gl.compileShader(s), this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS))
      return this.compileError = null, s;
    this.compileError = this.gl.getShaderInfoLog(s), this.gl.deleteShader(s);
  }
  // 初始化着色器程序
  initProgram(e, n) {
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, e), this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, n);
    const s = this.gl.createProgram();
    if (!s) throw new Error("Unable to create shader program");
    if (this.vertexShader && this.gl.attachShader(s, this.vertexShader), this.fragmentShader && this.gl.attachShader(s, this.fragmentShader), this.gl.linkProgram(s), !this.gl.getProgramParameter(s, this.gl.LINK_STATUS))
      throw console.warn(this.gl.getProgramInfoLog(s)), this.gl.deleteProgram(s), new Error("Unable to initialize the shader program");
    return this.gl.useProgram(s), s;
  }
  // 清除画布
  clearGL() {
    this.gl.clearColor(0, 0, 0, 1), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT), this.resizeCanvas(), this.updateViewport();
  }
  destory() {
    var e;
    this.clearGL(), this.gl.deleteProgram(this.program), this.vertexShader && this.gl.deleteShader(this.vertexShader), this.fragmentShader && this.gl.deleteShader(this.fragmentShader), this.canvas.style.opacity = "0", (e = this.gl.getExtension("WEBGL_lose_context")) == null || e.loseContext();
  }
  // 坐标归一化处理
  normalizeCoords(e, n) {
    return [2 * e / this.canvas.width - 1, 1 - 2 * n / this.canvas.height];
  }
  normalizeX(e) {
    return 2 * e / this.canvas.width - 1;
  }
  normalizeY(e) {
    return 1 - 2 * e / this.canvas.height;
  }
  // 调整画布尺寸
  resizeCanvas() {
    const e = window.devicePixelRatio || 1, { clientWidth: n, clientHeight: s } = this.canvas;
    this.gl.canvas.width = n * e, this.gl.canvas.height = s * e;
  }
  // 更新 WebGL 视口
  updateViewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
}
var Me = `#version 300 es

in vec4 a_Position;

void main(){
  gl_Position=a_Position;
}`;
class Ot extends Ee {
  // 控制渲染的标志
  constructor(n, s) {
    super(n, { vertexShaderSource: Me, fragmentShaderSource: s });
    w(this, "startTime");
    w(this, "endTime");
    w(this, "currentAnimationFrame", 0);
    w(this, "lastFrameTime", performance.now());
    // 上一帧的时间
    w(this, "frameCount", 0);
    // 帧数计数器
    w(this, "fps", 0);
    // 当前 FPS
    w(this, "isRendering", !0);
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
    const n = performance.now(), s = n - this.lastFrameTime;
    this.frameCount++, s >= 1e3 && (this.fps = parseFloat((this.frameCount / (s / 1e3)).toFixed(2)), this.frameCount = 0, this.lastFrameTime = n);
    const r = this.gl.getUniformLocation(this.program, "iResolution");
    this.gl.uniform2f(r, this.gl.canvas.width, this.gl.canvas.height);
    const i = this.gl.getUniformLocation(this.program, "iTime");
    this.endTime = performance.now(), this.gl.uniform1f(i, (this.endTime - this.startTime) / 1e3), this.gl.drawArrays(this.gl.TRIANGLES, 0, 6), this.isRendering && (this.currentAnimationFrame = requestAnimationFrame(() => this.render()));
  }
  initRect() {
    const n = this.gl.getAttribLocation(this.program, "a_Position");
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer()), this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]), this.gl.STATIC_DRAW), this.gl.vertexAttribPointer(n, 2, this.gl.FLOAT, !1, 0, 0), this.gl.enableVertexAttribArray(n);
  }
}
class zt {
  constructor(e) {
    w(this, "_listeners");
    w(this, "_onceListeners");
    this._listeners = {}, this._onceListeners = /* @__PURE__ */ new WeakMap();
    for (const n of e)
      this._listeners[n] = /* @__PURE__ */ new Set();
  }
  /**
   * 注册事件监听器
   * @param eventName 事件名称
   * @param listener 回调函数
   */
  on(e, n) {
    this._listeners[e] || (this._listeners[e] = /* @__PURE__ */ new Set()), this._listeners[e].add(n);
  }
  /**
   * 注册一次性事件监听器
   * @param eventName 事件名称
   * @param listener 回调函数
   */
  once(e, n) {
    const s = (...r) => {
      n(...r), this.off(e, s);
    };
    this._onceListeners.set(n, s), this.on(e, s);
  }
  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给监听器的参数
   */
  emit(e, ...n) {
    const s = this._listeners[e];
    s && new Set(s).forEach((i) => i(...n));
  }
  /**
   * 移除事件监听器
   * @param eventName 事件名称
   * @param listener 要移除的回调函数（可选）
   */
  off(e, n) {
    if (this._listeners[e])
      if (n) {
        const s = this._onceListeners.get(n);
        s ? (this._listeners[e].delete(s), this._onceListeners.delete(n)) : this._listeners[e].delete(n);
      } else
        this._listeners[e].clear();
  }
  /**
   * 获取某个事件的监听器数量
   * @param eventName 事件名称
   */
  listenerCount(e) {
    var n;
    return ((n = this._listeners[e]) == null ? void 0 : n.size) || 0;
  }
  /**
   * 清除所有事件监听器
   */
  clear() {
    for (const e of Object.keys(this._listeners))
      this._listeners[e].clear();
    this._onceListeners = /* @__PURE__ */ new WeakMap();
  }
}
class Ft {
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
  static format(e = /* @__PURE__ */ new Date(), n = "YYYY-MM-DD HH:mm:ss") {
    const s = e instanceof Date ? e : new Date(e);
    if (!this.isValid(s))
      return "Invalid Date";
    const r = (y, v = 2) => y.toString().padStart(v, "0"), i = s.getFullYear(), o = s.getMonth() + 1, a = s.getDate(), u = s.getHours(), l = s.getMinutes(), m = s.getSeconds(), g = s.getMilliseconds(), d = u >= 12 ? "PM" : "AM", p = u % 12 || 12, c = {
      YYYY: i.toString(),
      YY: i.toString().slice(-2),
      MM: r(o),
      M: o.toString(),
      DD: r(a),
      D: a.toString(),
      HH: r(u),
      H: u.toString(),
      hh: r(p),
      h: p.toString(),
      mm: r(l),
      m: l.toString(),
      ss: r(m),
      s: m.toString(),
      SSS: r(g, 3),
      A: d,
      a: d.toLowerCase()
    };
    return n.replace(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g, (y) => c[y]);
  }
  /**
   * 人性化时间展示
   * @param date 日期对象或时间戳
   * @param options 配置选项
   * @returns 人性化时间字符串或格式化后的时间字符串
   */
  static humanize(e, n = {}) {
    const {
      threshold: s = 6048e5,
      // 7天
      defaultFormat: r = "YYYY-MM-DD",
      now: i = /* @__PURE__ */ new Date(),
      showSuffix: o = !0
    } = n, a = e instanceof Date ? e : new Date(e), u = i instanceof Date ? i : new Date(i);
    if (!this.isValid(a))
      return "Invalid Date";
    const l = u.getTime() - a.getTime(), m = Math.abs(l);
    if (m > s)
      return this.format(a, r);
    const g = [
      { unit: "年", ms: 31536e6, past: "年前", future: "年后" },
      { unit: "个月", ms: 2592e6, past: "个月前", future: "个月后" },
      { unit: "天", ms: 864e5, past: "天前", future: "天后" },
      { unit: "小时", ms: 36e5, past: "小时前", future: "小时后" },
      { unit: "分钟", ms: 6e4, past: "分钟前", future: "分钟后" },
      { unit: "秒", ms: 1e3, past: "秒前", future: "秒后" }
    ];
    for (const { unit: d, ms: p, past: c, future: y } of g)
      if (m >= p) {
        const v = Math.floor(m / p), _ = o ? l >= 0 ? c : y : d;
        return `${v}${_}`;
      }
    return o ? l >= 0 ? "刚刚" : "现在" : "刚刚";
  }
  /**
   * 获取两个日期之间的差值
   * @param date1 第一个日期
   * @param date2 第二个日期，默认为当前时间
   * @returns 差值对象，包含年、月、日、小时、分钟、秒、毫秒，带有符号表示方向（正数表示date2较晚）
   */
  static diff(e, n = /* @__PURE__ */ new Date()) {
    const s = e instanceof Date ? e : new Date(e), r = n instanceof Date ? n : new Date(n);
    if (!this.isValid(s) || !this.isValid(r))
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      };
    const i = r.getTime() - s.getTime(), o = Math.sign(i), a = Math.abs(i) / 1e3, u = a / 60, l = u / 60, m = l / 24;
    let g = r.getFullYear() - s.getFullYear(), d = r.getMonth() - s.getMonth(), p = r.getDate() - s.getDate();
    if (p < 0) {
      d--;
      const c = new Date(r.getFullYear(), r.getMonth(), 0).getDate();
      p += c;
    }
    return d < 0 && (g--, d += 12), {
      years: o * Math.abs(g),
      // 符号化年差
      months: o * Math.abs(g * 12 + d),
      // 符号化总月差
      days: o * Math.floor(m),
      // 符号化天差（基于24小时制）
      hours: o * Math.floor(l),
      // 符号化小时差
      minutes: o * Math.floor(u),
      // 符号化分钟差
      seconds: o * Math.floor(a),
      // 符号化秒差
      milliseconds: i
      // 原始毫秒差（已带符号）
    };
  }
  static add(e, n, s) {
    const r = e instanceof Date ? new Date(e) : new Date(e);
    if (!this.isValid(r))
      return /* @__PURE__ */ new Date(NaN);
    switch (s) {
      case "year":
        r.setFullYear(r.getFullYear() + n);
        break;
      case "month":
        const i = r.getDate();
        r.setMonth(r.getMonth() + n), r.getDate() !== i && r.setDate(0);
        break;
      case "day":
        r.setDate(r.getDate() + n);
        break;
      case "hour":
        r.setHours(r.getHours() + n);
        break;
      case "minute":
        r.setMinutes(r.getMinutes() + n);
        break;
      case "second":
        r.setSeconds(r.getSeconds() + n);
        break;
      case "millisecond":
        r.setMilliseconds(r.getMilliseconds() + n);
        break;
    }
    return r;
  }
  /**
   * 减去时间
   * @param date 原始日期
   * @param value 要减去的值
   * @param unit 时间单位 ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond')
   * @returns 新的Date对象
   */
  static subtract(e, n, s) {
    return this.add(e, -n, s);
  }
  /**
   * 检查日期是否有效
   * @param date 日期对象或时间戳
   * @returns 是否有效
   */
  static isValid(e) {
    try {
      const n = e instanceof Date ? e : new Date(e);
      return !isNaN(n.getTime());
    } catch {
      return !1;
    }
  }
  /**
   * 获取当前时间戳（毫秒）
   * @returns 当前时间戳
   */
  static now() {
    return Date.now();
  }
  /**
   * 获取某个月的第一天
   * @param date 日期对象或时间戳
   * @returns 该月第一天的Date对象
   */
  static startOfMonth(e) {
    const n = e instanceof Date ? new Date(e) : new Date(e);
    return this.isValid(n) ? new Date(n.getFullYear(), n.getMonth(), 1) : /* @__PURE__ */ new Date(NaN);
  }
  /**
   * 获取某个月的最后一天
   * @param date 日期对象或时间戳
   * @returns 该月最后一天的Date对象
   */
  static endOfMonth(e) {
    const n = e instanceof Date ? new Date(e) : new Date(e);
    return this.isValid(n) ? new Date(n.getFullYear(), n.getMonth() + 1, 0) : /* @__PURE__ */ new Date(NaN);
  }
  /**
   * 获取某天的开始时间（00:00:00.000）
   * @param date 日期对象或时间戳
   * @returns 该天开始的Date对象
   */
  static startOfDay(e) {
    const n = e instanceof Date ? new Date(e) : new Date(e);
    return this.isValid(n) ? new Date(n.getFullYear(), n.getMonth(), n.getDate()) : /* @__PURE__ */ new Date(NaN);
  }
  /**
   * 获取某天的结束时间（23:59:59.999）
   * @param date 日期对象或时间戳
   * @returns 该天结束的Date对象
   */
  static endOfDay(e) {
    const n = e instanceof Date ? new Date(e) : new Date(e);
    return this.isValid(n) ? new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59, 59, 999) : /* @__PURE__ */ new Date(NaN);
  }
  /**
   * 比较两个日期
   * @param date1 第一个日期
   * @param date2 第二个日期
   * @returns 比较结果：
   *   -1: date1 在 date2 之前
   *    0: date1 等于 date2
   *    1: date1 在 date2 之后
   */
  static compare(e, n) {
    const s = e instanceof Date ? e : new Date(e), r = n instanceof Date ? n : new Date(n);
    if (!this.isValid(s) || !this.isValid(r))
      return NaN;
    const i = s.getTime(), o = r.getTime();
    return i < o ? -1 : i > o ? 1 : 0;
  }
  /**
   * 检查日期是否在范围内
   * @param date 要检查的日期
   * @param start 范围开始日期
   * @param end 范围结束日期
   * @returns 是否在范围内
   */
  static isBetween(e, n, s) {
    const r = e instanceof Date ? e : new Date(e), i = n instanceof Date ? n : new Date(n), o = s instanceof Date ? s : new Date(s);
    if (!this.isValid(r) || !this.isValid(i) || !this.isValid(o))
      return !1;
    const a = r.getTime();
    return a >= i.getTime() && a <= o.getTime();
  }
  /**
   * 转换不同精度的时间戳为毫秒
   * @param timestamp 时间戳
   * @param precision 精度 ('ms' | 's' | 'us' | 'ns')
   * @returns 毫秒时间戳
   */
  // private static normalizeTimestamp(timestamp: number, precision: "ms" | "s" | "us" | "ns" = "ms"): number {
  //   switch (precision) {
  //     case "s": // 秒级时间戳
  //       return timestamp * 1000;
  //     case "us": // 微秒级时间戳
  //       return timestamp / 1000;
  //     case "ns": // 纳秒级时间戳
  //       return timestamp / 1000000;
  //     case "ms": // 毫秒级时间戳
  //     default:
  //       return timestamp;
  //   }
  // }
}
function Le(t, e, n) {
  const s = [[0, 360]], r = [[50, 100]], i = [[30, 70]], o = t && t.length > 0 ? t : s, a = e && e.length > 0 ? e : r, u = n && n.length > 0 ? n : i, l = (p) => {
    const c = p[Math.floor(Math.random() * p.length)];
    return Math.floor(Math.random() * (c[1] - c[0] + 1)) + c[0];
  }, m = l(o), g = l(a), d = l(u);
  return Te(m, g, d);
}
function Te(t, e, n) {
  e /= 100, n /= 100;
  const s = (1 - Math.abs(2 * n - 1)) * e, r = s * (1 - Math.abs(t / 60 % 2 - 1)), i = n - s / 2;
  let o = 0, a = 0, u = 0;
  0 <= t && t < 60 ? (o = s, a = r, u = 0) : 60 <= t && t < 120 ? (o = r, a = s, u = 0) : 120 <= t && t < 180 ? (o = 0, a = s, u = r) : 180 <= t && t < 240 ? (o = 0, a = r, u = s) : 240 <= t && t < 300 ? (o = r, a = 0, u = s) : 300 <= t && t < 360 && (o = s, a = 0, u = r);
  const l = (m) => {
    const g = Math.round((m + i) * 255).toString(16);
    return g.length === 1 ? "0" + g : g;
  };
  return `#${l(o)}${l(a)}${l(u)}`.toUpperCase();
}
class Yt {
  /**
   * 生成随机字符串
   * @param length 字符串长度
   * @returns 随机字符串
   */
  static string(e) {
    const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let s = "";
    for (let r = 0; r < e; r++)
      s += n.charAt(Math.floor(Math.random() * n.length));
    return s;
  }
  /**
   * 生成指定范围内的随机数
   * @param min 最小值
   * @param max 最大值
   * @returns 随机数
   */
  static number(e, n) {
    return Math.floor(Math.random() * (n - e + 1)) + e;
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
  static array(e, n) {
    return [...e].sort(() => 0.5 - Math.random()).slice(0, n);
  }
  /**
   * 生成包含随机值的对象
   * @param object 模板对象
   * @param length 数组长度（如果属性是数组）
   * @returns 填充随机值的对象
   */
  static object(e, n) {
    const s = {};
    for (const r in e)
      if (e.hasOwnProperty(r)) {
        const i = typeof e[r];
        i === "string" ? s[r] = this.string(10) : i === "number" ? s[r] = this.number(0, 100) : i === "boolean" ? s[r] = this.boolean() : Array.isArray(e[r]) && (s[r] = this.array(e[r], n));
      }
    return s;
  }
  /**
   * 生成随机十六进制颜色
   * @returns 颜色代码，如 #ff0000
   */
  static color(...e) {
    return Le(...e);
  }
  /**
   * 生成随机日期
   * @returns 随机日期对象
   */
  static date() {
    const e = new Date(2e3, 0, 1), n = /* @__PURE__ */ new Date();
    return new Date(e.getTime() + Math.random() * (n.getTime() - e.getTime()));
  }
  /**
   * 生成随机UUID
   * @returns UUID字符串
   */
  static uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
      const n = Math.random() * 16 | 0;
      return (e === "x" ? n : n & 3 | 8).toString(16);
    });
  }
  /**
   * 生成随机密码
   * @param length 密码长度，默认为12
   * @returns 随机密码
   */
  static password(e = 12) {
    const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let s = "";
    for (let r = 0; r < e; r++)
      s += n.charAt(Math.floor(Math.random() * n.length));
    return s;
  }
}
class $ {
  /**
   * @description 检查对象是否为空
   * @param obj
   * @returns {boolean}
   * */
  static isEmpty(e) {
    return e == null || Object.keys(e).length === 0;
  }
  /**
   * @description 深拷贝
   * @param obj
   * @param hash 缓存对象，避免循环引用
   * @returns {any}
   */
  static deepClone(e, n = /* @__PURE__ */ new WeakMap()) {
    if (e === null || typeof e != "object")
      return e;
    if (n.has(e))
      return n.get(e);
    if (e instanceof Date)
      return new Date(e);
    if (e instanceof RegExp)
      return new RegExp(e);
    let s = Array.isArray(e) ? [] : {};
    n.set(e, s);
    for (let r in e)
      e.hasOwnProperty(r) && (s[r] = $.deepClone(e[r], n));
    return s;
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
  static deepMerge(e, n, s = { overwrite: !0, cloneDeep: !0 }) {
    if (n == null)
      return e;
    if (e == null)
      return s.cloneDeep ? this.deepClone(n) : n;
    if (typeof e != "object" || typeof n != "object")
      return s.overwrite ? s.cloneDeep ? this.deepClone(n) : n : e;
    if (Array.isArray(n))
      return s.overwrite && (e = s.cloneDeep ? this.deepClone(n) : n), e;
    if (n instanceof Date || n instanceof RegExp)
      return s.overwrite && (e = s.cloneDeep ? this.deepClone(n) : n), e;
    for (const r in n)
      Object.prototype.hasOwnProperty.call(n, r) && (n[r] && typeof n[r] == "object" && e[r] && typeof e[r] == "object" && !(n[r] instanceof Date) && !(n[r] instanceof RegExp) && !Array.isArray(n[r]) ? this.deepMerge(e[r], n[r], s) : (s.overwrite || !(r in e)) && (e[r] = s.cloneDeep ? this.deepClone(n[r]) : n[r]));
    return e;
  }
  /**
   * @description 从对象中移除指定键
   * @param obj 对象
   * @param keys 键数组
   * @returns 移除指定键后的对象
   */
  static omit(e, n) {
    const s = $.deepClone(e);
    return n.forEach((r) => {
      delete s[r];
    }), s;
  }
  /**
   * @description 从对象中提取指定键
   * @param obj 对象
   * @param keys 键数组
   * @returns 提取指定键后的对象
   */
  static pick(e, n) {
    const s = $.deepClone(e);
    return Object.keys(s).forEach((r) => {
      n.includes(r) || delete s[r];
    }), s;
  }
  /**
   * @description 深度比较两个对象是否相等
   * @param obj1 第一个要比较的对象
   * @param obj2 第二个要比较的对象
   * @returns {boolean} 如果两个对象深度相等则返回true，否则返回false
   */
  static isEqual(e, n) {
    if (e === n) return !0;
    if (e == null || n == null)
      return e === n;
    if (typeof e != typeof n) return !1;
    if (e instanceof Date && n instanceof Date)
      return e.getTime() === n.getTime();
    if (e instanceof RegExp && n instanceof RegExp)
      return e.toString() === n.toString();
    if (typeof e == "object") {
      const s = Object.keys(e), r = Object.keys(n);
      if (s.length !== r.length) return !1;
      for (const i of s)
        if (!r.includes(i) || !this.isEqual(e[i], n[i]))
          return !1;
      return !0;
    }
    return !1;
  }
}
const Nt = () => {
  const t = pe({
    selector: "html",
    attribute: "class",
    valueDark: "dark",
    valueLight: "light"
  });
  return { isDark: t, toggleTheme: async (n, s = !1) => {
    if (!s) {
      t.value = !t.value;
      return;
    }
    if (!n) {
      t.value = !t.value;
      return;
    }
    try {
      const r = n.clientX, i = n.clientY, o = Math.hypot(Math.max(r, innerWidth - r), Math.max(i, innerHeight - i));
      let a;
      const u = document.startViewTransition(() => {
        const l = document.documentElement;
        a = l.classList.contains("dark"), l.classList.add(a ? "light" : "dark"), l.classList.remove(a ? "dark" : "light");
      });
      u.ready.then(() => {
        const l = [`circle(0px at ${r}px ${i}px)`, `circle(${o}px at ${r}px ${i}px)`];
        document.documentElement.animate(
          {
            clipPath: a ? [...l].reverse() : l
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement: a ? "::view-transition-old(root)" : "::view-transition-new(root)"
          }
        );
      }), await u.finished, t.value = !t.value;
    } catch {
      t.value = !t.value;
    }
  } };
}, Ht = (t = !1) => {
  const e = D(t);
  return {
    loading: e,
    setLoading: (r) => {
      e.value = r;
    },
    toggleLoading: () => {
      e.value = !e.value;
    }
  };
}, Bt = (t) => {
  const e = (o) => {
    const a = document.createElement("input");
    return a.type = "file", a.multiple = !!o.multiple, o.directory && (a.webkitdirectory = !0, a.mozdirectory = !0), o.accept && o.accept.length > 0 && (a.accept = o.accept.join(",")), a;
  }, n = () => {
    const { dragRef: o } = t || {};
    if (!(o != null && o.value)) return;
    const a = o.value, u = (d) => {
      d.preventDefault();
    }, l = (d) => {
      d.preventDefault(), a.classList.add("drag-active");
    }, m = (d) => {
      d.preventDefault(), a.classList.remove("drag-active");
    }, g = (d) => {
      var p;
      d.preventDefault(), a.classList.remove("drag-active"), (p = t == null ? void 0 : t.dragCallback) == null || p.call(t, d);
    };
    return a.addEventListener("dragover", u), a.addEventListener("dragenter", l), a.addEventListener("dragleave", m), a.addEventListener("drop", g), () => {
      a.removeEventListener("dragover", u), a.removeEventListener("dragenter", l), a.removeEventListener("dragleave", m), a.removeEventListener("drop", g);
    };
  }, s = (o) => new Promise((a, u) => {
    const l = e(o);
    l.style.display = "none";
    const m = setTimeout(() => {
      u(new Error("选择取消或超时")), document.body.removeChild(l);
    }, 3e4);
    l.onchange = (g) => {
      clearTimeout(m);
      const d = g.target.files;
      d != null && d.length ? a(d) : u(new Error("未选择文件")), document.body.removeChild(l);
    }, document.body.appendChild(l), l.click();
  });
  return {
    selectFile: (o) => s({
      multiple: (o == null ? void 0 : o.multiple) ?? !0,
      accept: o == null ? void 0 : o.accept,
      directory: !1
    }),
    selectFolder: () => s({
      multiple: !1,
      directory: !0
    }),
    initDragDom: n
  };
};
function Ut(t = {}) {
  const { enabled: e = D(!0), message: n = "确定要离开此页面吗？未保存的更改可能会丢失。" } = t, s = typeof e == "boolean" ? D(e) : e, r = (i) => {
    if (s.value)
      return i.preventDefault(), i.returnValue = n, n;
  };
  return be((i, o, a) => {
    if (s.value && !confirm(t.message || "确定要离开吗？"))
      return a(!1);
    a();
  }), Z(() => {
    window.addEventListener("beforeunload", r);
  }), ve(() => {
    window.removeEventListener("beforeunload", r);
  }), {
    /**
     * 手动启用/禁用提示
     * @example setEnabled(false)
     */
    setEnabled: (i) => {
      s.value = i;
    }
  };
}
const Ce = {
  blurAmount: 5,
  duration: 1,
  thumbnail: ""
};
function C(t, e = {}) {
  const n = { ...Ce, ...e };
  t.style.transition = `filter ${n.duration}s ease, opacity ${n.duration}s ease`, t.style.filter = `blur(${n.blurAmount}px)`, t.style.opacity = "0";
  const s = () => {
    t.style.backgroundImage = "none", t.offsetWidth, t.style.filter = "blur(0)", t.style.opacity = "1", t.removeEventListener("load", s), t.removeEventListener("error", r);
  }, r = () => {
    console.error("Image failed to load", t.src), t.removeEventListener("load", s), t.removeEventListener("error", r);
  };
  t.complete ? s() : (t.addEventListener("load", s), t.addEventListener("error", r)), n.thumbnail && (t.style.backgroundImage = `url(${n.thumbnail})`, t.style.backgroundSize = "cover", t.style.backgroundPosition = "center");
}
const $e = {
  mounted(t, e) {
    if (t.tagName === "IMG")
      C(t, e.value);
    else {
      const n = t.getElementsByTagName("img");
      Array.from(n).forEach((s) => {
        C(s, e.value);
      });
    }
  },
  updated(t, e) {
    if (t.tagName === "IMG")
      C(t, e.value);
    else {
      const n = t.getElementsByTagName("img");
      Array.from(n).forEach((s) => {
        C(s, e.value);
      });
    }
  }
}, Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $e
}, Symbol.toStringTag, { value: "Module" })), Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Re = {
  mounted: function(t) {
    t.style.cursor = "move", t.style.position = "absolute", t.onmousedown = function(e) {
      let n = e.pageX - t.offsetLeft, s = e.pageY - t.offsetTop;
      document.onmousemove = function(r) {
        let i = r.pageX - n, o = r.pageY - s, a = parseInt(window.getComputedStyle(t.parentNode).width) - parseInt(window.getComputedStyle(t).width), u = parseInt(window.getComputedStyle(t.parentNode).height) - parseInt(window.getComputedStyle(t).height);
        i < 0 ? i = 0 : i > a && (i = a), o < 0 ? o = 0 : o > u && (o = u), t.style.left = i + "px", t.style.top = o + "px";
      }, document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
}, Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Re
}, Symbol.toStringTag, { value: "Module" })), K = F({
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
    return L(
      "div",
      {
        class: ["loading-overlay", { "show-loading-overlay": this.visible }]
      },
      [
        L("div", {
          class: this.styleClass || "loading-spinner",
          style: {
            borderTopColor: this.spinnerColor
          }
        }),
        this.text ? L("div", { class: "loading-text" }, this.text) : null
      ]
    );
  }
}), ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: K
}, Symbol.toStringTag, { value: "Module" })), Oe = {
  mounted(t, e) {
    t.style.position = "relative";
    const n = typeof e.value == "boolean" ? { value: e.value } : e.value || {}, s = n.delay || 50;
    let r = null;
    const i = () => {
      const o = ye(K, {
        text: n.text,
        background: n.background,
        spinnerColor: n.spinnerColor,
        style: n.style || "loader-l13",
        visible: n.value ?? !0
      }), a = o.mount(document.createElement("div"));
      t._loadingInstance = a, t._loadingApp = o, t.appendChild(a.$el), J(() => {
        R(t, e);
      });
    };
    n.value && (r = window.setTimeout(() => {
      n.value && i();
    }, s)), t._loadingTimeoutId = r;
  },
  updated(t, e) {
    if (JSON.stringify(e.oldValue) !== JSON.stringify(e.value)) {
      const n = typeof e.value == "boolean" ? { value: e.value } : e.value || {};
      if (t._loadingTimeoutId && (clearTimeout(t._loadingTimeoutId), t._loadingTimeoutId = null), !n.value) {
        R(t, e);
        return;
      }
      const s = n.delay || 0;
      t._loadingTimeoutId = window.setTimeout(() => {
        n.value && R(t, e);
      }, s);
    }
  },
  unmounted(t) {
    var e, n, s;
    t._loadingTimeoutId && clearTimeout(t._loadingTimeoutId), (e = t._loadingApp) == null || e.unmount(), (s = (n = t._loadingInstance) == null ? void 0 : n.$el) == null || s.remove(), t._loadingInstance = void 0, t._loadingApp = void 0;
  }
};
function R(t, e) {
  var r, i, o;
  if (!t._loadingInstance) return;
  const n = typeof e.value == "boolean" ? e.value : ((r = e.value) == null ? void 0 : r.value) ?? !0;
  t.style.position = n ? "relative" : "";
  const s = t._loadingInstance.$el.parentElement;
  s && s.parentNode === t && s !== t.lastElementChild && t.appendChild(s), (o = (i = t._loadingInstance).setVisible) == null || o.call(i, n), t._loadingInstance.$el && (t._loadingInstance.$el.style.display = n ? "flex" : "none");
}
const ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oe
}, Symbol.toStringTag, { value: "Module" })), Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Ye = {
  mounted(t, e) {
    var B, U;
    t.style.position = "absolute", t.style.userSelect = "none";
    const n = () => {
      var h;
      const f = document.createElement("div");
      return f.style.position = "absolute", f.style.pointerEvents = "none", f.style.border = "2px dashed #3498db", f.style.backgroundColor = "rgba(52, 152, 219, 0.1)", f.style.zIndex = "1000", f.style.display = "none", (h = t.parentElement) == null || h.appendChild(f), f;
    }, s = (f) => {
      const h = document.createElement("div");
      return h.className = `resize-handle resize-handle-${f}`, h.style.position = "absolute", h.style.width = "10px", h.style.height = "10px", h.style.backgroundColor = "#fff", h.style.opacity = "0", h.style.border = "1px solid #333", h.style.zIndex = "100", h.style.touchAction = "none", f.includes("top") && (h.style.top = "-5px"), f.includes("bottom") && (h.style.bottom = "-5px"), f.includes("left") && (h.style.left = "-5px"), f.includes("right") && (h.style.right = "-5px"), f === "top-left" && (h.style.cursor = "nwse-resize"), f === "top-right" && (h.style.cursor = "nesw-resize"), f === "bottom-left" && (h.style.cursor = "nesw-resize"), f === "bottom-right" && (h.style.cursor = "nwse-resize"), t.appendChild(h), h;
    };
    t.__dragPreview = n();
    const r = [
      s("top-left"),
      s("top-right"),
      s("bottom-left"),
      s("bottom-right")
    ];
    t.__resizeHandles = r, t.__resizeListeners = [];
    const i = t.parentElement;
    if (!i) return;
    getComputedStyle(i).position === "static" && (i.style.position = "relative");
    const o = ((B = e.value) == null ? void 0 : B.minWidth) ?? 50, a = ((U = e.value) == null ? void 0 : U.minHeight) ?? 50;
    let u = !1, l = null, m = 0, g = 0, d = 0, p = 0, c = 0, y = 0, v = 0, _ = 0, S = 0, b = 0;
    const A = () => ({
      left: 0,
      top: 0,
      right: i.clientWidth,
      bottom: i.clientHeight
    }), ue = () => {
      if (!t.__dragPreview) return;
      const f = t.__dragPreview;
      f.style.display = "block", f.style.left = `${S}px`, f.style.top = `${b}px`, f.style.width = `${v}px`, f.style.height = `${_}px`;
    }, de = () => {
      t.__dragPreview && (t.__dragPreview.style.display = "none");
    }, fe = (f, h) => {
      f.preventDefault(), f.stopPropagation(), u = !0, l = h, m = f.clientX, g = f.clientY, d = t.offsetWidth, p = t.offsetHeight, c = t.offsetLeft, y = t.offsetTop, v = d, _ = p, S = c, b = y, document.addEventListener("mousemove", N), document.addEventListener("mouseup", H);
    }, N = (f) => {
      if (!u || !l) return;
      const h = f.clientX - m, E = f.clientY - g, x = A();
      switch (l) {
        case "top-left":
          v = Math.max(o, d - h), _ = Math.max(a, p - E), S = c + (d - v), b = y + (p - _);
          break;
        case "top-right":
          v = Math.max(o, d + h), _ = Math.max(a, p - E), b = y + (p - _);
          break;
        case "bottom-left":
          v = Math.max(o, d - h), _ = Math.max(a, p + E), S = c + (d - v);
          break;
        case "bottom-right":
          v = Math.max(o, d + h), _ = Math.max(a, p + E);
          break;
      }
      S < x.left && (S = x.left, l.includes("left") && (v = d + c - x.left)), b < x.top && (b = x.top, l.includes("top") && (_ = p + y - x.top)), S + v > x.right && (v = x.right - S), b + _ > x.bottom && (_ = x.bottom - b), v = Math.max(o, v), _ = Math.max(a, _), ue();
    }, H = () => {
      u && (u = !1, t.style.width = `${v}px`, t.style.height = `${_}px`, t.style.left = `${S}px`, t.style.top = `${b}px`, de(), document.removeEventListener("mousemove", N), document.removeEventListener("mouseup", H));
    };
    r.forEach((f, h) => {
      var V;
      const E = ["top-left", "top-right", "bottom-left", "bottom-right"], x = (he) => fe(he, E[h]);
      f.addEventListener("mousedown", x), (V = t.__resizeListeners) == null || V.push({ mousedown: x });
    });
  },
  unmounted(t) {
    t.__resizeHandles && t.__resizeHandles.forEach((e) => {
      e.remove();
    }), t.__resizeListeners && t.__resizeListeners.forEach((e, n) => {
      var s;
      (s = t.__resizeHandles) != null && s[n] && t.__resizeHandles[n].removeEventListener("mousedown", e.mousedown);
    }), t.__dragPreview && t.__dragPreview.remove();
  }
}, Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ye
}, Symbol.toStringTag, { value: "Module" })), Q = {
  directive: "ripple",
  color: "var(--ripple-color)",
  initialOpacity: 0.1,
  finalOpacity: 0.05,
  duration: 350,
  easing: "ease-out",
  delay: 60,
  disabled: !1,
  center: !1
}, He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_PLUGIN_OPTIONS: Q
}, Symbol.toStringTag, { value: "Module" })), ee = ({
  borderTopLeftRadius: t,
  borderTopRightRadius: e,
  borderBottomLeftRadius: n,
  borderBottomRightRadius: s
}) => {
  const r = document.createElement("div");
  return r.style.top = "0", r.style.left = "0", r.style.width = "100%", r.style.height = "100%", r.style.position = "absolute", r.style.borderRadius = `${t} ${e} ${s} ${n}`, r.style.overflow = "hidden", r.style.pointerEvents = "none", r.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", r;
}, Be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: ee
}, Symbol.toStringTag, { value: "Module" })), te = (t, e, n, s, r) => {
  const i = document.createElement("div");
  return i.style.position = "absolute", i.style.width = s.center ? `${Math.sqrt(r.width * r.width + r.height * r.height)}px` : `${n * 2}px`, i.style.height = s.center ? `${Math.sqrt(r.width * r.width + r.height * r.height)}px` : `${n * 2}px`, i.style.top = s.center ? `${r.height / 2}px` : `${e}px`, i.style.left = s.center ? `${r.width / 2}px` : `${t}px`, i.style.background = s.color, i.style.borderRadius = "50%", i.style.opacity = `${s.initialOpacity}`, i.style.transform = "translate(-50%,-50%) scale(0)", i.style.transition = `transform ${s.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${s.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, i;
}, Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: te
}, Symbol.toStringTag, { value: "Module" }));
function T(t, e, n, s) {
  const r = t - n, i = e - s;
  return Math.sqrt(r * r + i * i);
}
function ne(t, { width: e, height: n, left: s, top: r }) {
  const i = t.clientX - s, o = t.clientY - r, a = T(i, o, 0, 0), u = T(i, o, e, 0), l = T(i, o, 0, n), m = T(i, o, e, n), g = Math.max(a, u, l, m);
  return {
    x: i,
    y: o,
    diameter: g
  };
}
const Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: ne,
  getPythagoreanDistance: T
}, Symbol.toStringTag, { value: "Module" })), Y = "vRippleCountInternal";
function se(t, e) {
  t.dataset[Y] = e.toString();
}
function P(t) {
  return parseInt(t.dataset[Y] ?? "0", 10);
}
function re(t) {
  const e = P(t);
  se(t, e + 1);
}
function ie(t) {
  const e = P(t);
  se(t, e - 1);
}
function oe(t) {
  delete t.dataset[Y];
}
const We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: ie,
  deleteRippleCount: oe,
  getRippleCount: P,
  incrementRippleCount: re
}, Symbol.toStringTag, { value: "Module" })), Xe = 1.05, I = /* @__PURE__ */ new WeakMap(), je = { ...Q }, Ge = (t, e, n) => {
  const s = e.getBoundingClientRect(), r = window.getComputedStyle(e), { diameter: i, x: o, y: a } = ne(t, s), u = ee(r), l = te(o, a, i * Xe, n, s);
  let m = "", g = !1, d;
  function p() {
    l.style.transition = "opacity 120ms ease in out", l.style.opacity = "0", setTimeout(() => {
      u.remove(), ie(e), P(e) === 0 && (oe(e), e.style.position = m);
    }, 100);
  }
  function c(v) {
    typeof v < "u" && document.removeEventListener("pointerup", c), g ? p() : g = !0;
  }
  function y() {
    clearTimeout(d), u.remove(), document.removeEventListener("pointerup", c), document.removeEventListener("pointercancel", c), document.removeEventListener("pointercancel", y);
  }
  re(e), r.position === "static" && (e.style.position && (m = e.style.position), e.style.position = "relative"), u.appendChild(l), e.appendChild(u), document.addEventListener("pointerup", c), document.addEventListener("pointercancel", c), d = setTimeout(() => {
    document.removeEventListener("pointercancel", y), l.style.transform = "translate(-50%,-50%) scale(1)", l.style.opacity = `${n.finalOpacity}`, setTimeout(() => c(), n.duration);
  }, n.delay), document.addEventListener("pointercancel", y);
}, qe = {
  mounted(t, e) {
    I.set(t, e.value ?? {}), t.addEventListener("pointerdown", (n) => {
      var r;
      const s = I.get(t);
      (r = e.value) != null && r.disabled || s !== !1 && Ge(n, t, {
        ...je,
        ...s
      });
    });
  },
  updated(t, e) {
    I.set(t, e.value ?? {});
  }
}, Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qe
}, Symbol.toStringTag, { value: "Module" })), X = 50, j = 500, ae = /* @__PURE__ */ new WeakMap(), Je = (t) => {
  const e = new IntersectionObserver((n) => {
    for (const s of n)
      if (s.isIntersecting) {
        const r = ae.get(s.target);
        r && r.play(), e.unobserve(t);
      }
  });
  e.observe(t);
}, Ke = (t, e) => t.getBoundingClientRect().top - e > window.innerHeight, Qe = {
  mounted(t, e) {
    let n = X, s = j;
    if (typeof e.value == "number" ? n = e.value : e.value && typeof e.value == "object" && (n = e.value.distance ?? X, s = e.value.duration ?? j), !Ke(t, n))
      return;
    const r = t.animate(
      [
        { transform: `translateY(${n}px)`, opacity: 0.5 },
        // 起始状态：向下偏移，半透明
        { transform: "translateY(0)", opacity: 1 }
        // 结束状态：回到原位，完全不透明
      ],
      {
        duration: s,
        // 动画持续时间
        easing: "ease-in-out",
        // 缓动函数：平滑进出
        fill: "forwards"
        // 动画结束后保持最终状态
      }
    );
    r.pause(), ae.set(t, r), Je(t);
  }
}, et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qe
}, Symbol.toStringTag, { value: "Module" })), G = /* @__PURE__ */ Object.assign({ "./blur-fade-in/index.ts": Pe, "./blur-fade-in/types.ts": Ae, "./draggable/index.ts": Ie, "./loading/index.ts": ze, "./loading/loading.ts": ke, "./loading/types.ts": Fe, "./resize/index.ts": Ne, "./ripple/index.ts": Ze, "./ripple/options.ts": He, "./ripple/utils/create-container-element.ts": Be, "./ripple/utils/create-ripple-element.ts": Ue, "./ripple/utils/get-element-position-utils.ts": Ve, "./ripple/utils/ripple-count.ts": We, "./slide-in/index.ts": et }), Vt = {
  install: function(t) {
    for (const e in G) {
      const n = G[e].default;
      if (!n) continue;
      const s = e.split("/")[1];
      e.split("/")[2] === "index.ts" && t.directive(s, n);
    }
  }
}, tt = "C", nt = "cl", z = (t) => `${nt}__${t}`, le = (t) => `${tt}${t || ""}`, k = F({
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
      validator: (t) => ["remix", "svg"].includes(t)
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
    const { type: t, size: e, color: n, name: s, spin: r } = this, i = z(`${t}-icon`), o = r ? z(`${t}-icon-spin`) : "";
    return t === "svg" ? L(
      "svg",
      {
        class: [i, o],
        style: {
          width: `${e}px`,
          height: `${e}px`
        }
      },
      {
        default: () => [L("use", { "xlink:href": `#${s}` })]
      }
    ) : L("i", {
      class: ["ri-" + s, i, o],
      style: {
        fontSize: `${e}px`,
        color: n
      }
    });
  }
}), ce = Object.assign(k, {
  install(t) {
    t.component(le(k.name), k);
  }
}), O = /* @__PURE__ */ F({
  name: "Segmented",
  props: {
    block: {
      type: Boolean,
      default: !1
    },
    options: {
      type: Array,
      required: !0,
      validator: (t) => t.length > 0 && t.every((e) => "value" in e && "label" in e)
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
      validator: (t) => ["small", "medium", "large"].includes(t)
    }
  },
  emits: {
    "update:value": (t) => !0,
    change: (t) => !0
  },
  setup(t, {
    emit: e,
    slots: n
  }) {
    const s = z("segmented"), r = D(null), i = D(null), o = D(-1), a = D(!1), u = W(() => t.options.findIndex((c) => c.value === t.value)), l = (c) => {
      t.disabled || t.value !== c && (e("update:value", c), e("change", c));
    }, m = async (c = !1) => {
      if (!r.value || !i.value) return;
      await J();
      const y = r.value, v = i.value, _ = y.parentElement;
      if (!_) return;
      const S = _.getBoundingClientRect(), b = y.getBoundingClientRect();
      if (c && (v.style.transition = "none"), v.style.width = `${b.width}px`, v.style.height = `${b.height}px`, v.style.left = `${b.left - S.left}px`, !c && o.value !== -1 && u.value !== -1) {
        const A = u.value > o.value ? "right" : "left";
        v.classList.remove(`${s}-thumb-left`, `${s}-thumb-right`), v.classList.add(`${s}-thumb-${A}`);
      }
      c && requestAnimationFrame(() => {
        v.style.transition = "";
      }), o.value = u.value;
    };
    Z(() => {
      a.value = !0, m(!0);
    }), _e(() => t.value, () => m());
    const g = W(() => ({
      [s]: !0,
      [`${s}-block`]: t.block,
      [`${s}-disabled`]: t.disabled,
      [`${s}-${t.size}`]: !0
    })), d = (c) => ({
      [`${s}-item`]: !0,
      [`${s}-item-selected`]: t.value === c.value,
      [`${s}-item-disabled`]: c.disabled
    }), p = (c) => {
      const y = `label-${c.value}`;
      return n[y] ? n[y]({
        option: c
      }) : M(we, null, [c.icon && M(ce, {
        class: "mr-5",
        name: c.icon
      }, null), M("span", {
        class: `${s}-item-label`
      }, [c.label])]);
    };
    return () => M("div", {
      class: g.value
    }, [M("div", {
      ref: i,
      class: `${s}-thumb`
    }, null), t.options.map((c, y) => M("div", {
      ref: t.value === c.value ? r : null,
      key: c.value,
      class: d(c),
      onClick: () => !c.disabled && l(c.value),
      "data-index": y
    }, [p(c)]))]);
  }
}), st = Object.assign(O, {
  install(t) {
    t.component(le(O.name), O);
  }
}), q = {
  Icon: ce,
  Segmented: st
}, Wt = (t) => {
  Object.keys(q).forEach((e) => {
    t.use(q[e]);
  });
};
export {
  Ot as BaseCanvas,
  Ee as BaseGL,
  ce as CIcon,
  st as CSegmented,
  zt as Emitter,
  Yt as Random,
  Wt as RegisterComponents,
  Vt as RegisterDirectives,
  Ft as Time,
  It as addEventListen,
  xe as copyToClipboard,
  Rt as copyToClipboardWithCallback,
  Et as isAlpha,
  Mt as isAlphaNum,
  Lt as isAlphaNumUnderline,
  ft as isArray,
  At as isBlank,
  ht as isBoolean,
  Dt as isChinese,
  yt as isDate,
  bt as isEmail,
  dt as isFunction,
  St as isIdCard,
  Ct as isLower,
  mt as isNull,
  _t as isNullOrUndefined,
  ct as isNumber,
  ut as isObject,
  xt as isPhone,
  Pt as isPort,
  vt as isPromise,
  pt as isRegExp,
  lt as isString,
  $t as isTel,
  gt as isUndefined,
  Tt as isUpper,
  wt as isUrl,
  $ as objectUtils,
  kt as removeEventListen,
  Bt as useFileSelect,
  Ut as useLeaveConfirm,
  Ht as useLoading,
  Nt as useTheme
};
