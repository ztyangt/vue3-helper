var _e = Object.defineProperty;
var be = (e, t, n) => t in e ? _e(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var b = (e, t, n) => be(e, typeof t != "symbol" ? t + "" : t, n);
import { useDark as we } from "@vueuse/core";
import { ref as D, onMounted as ne, onBeforeUnmount as xe, defineComponent as H, computed as F, h as E, nextTick as N, createApp as Se, watch as Ee, createVNode as M, Fragment as De } from "vue";
import { onBeforeRouteLeave as Ce } from "vue-router";
const mt = (e) => typeof e == "string", pt = (e) => typeof e == "number", gt = (e) => typeof e == "object", yt = (e) => typeof e == "function", vt = (e) => Array.isArray(e), _t = (e) => typeof e == "boolean", bt = (e) => e === null, wt = (e) => e === void 0, xt = (e) => e instanceof RegExp, St = (e) => e instanceof Promise, Et = (e) => e instanceof Date, Dt = (e) => e == null, Ct = (e) => /^http[s]?:\/\/.*/.test(e), Mt = (e) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e), Lt = (e) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(e), Tt = (e) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e), Pt = (e) => /^[\u4e00-\u9fa5]{0,}$/.test(e), $t = (e) => /^[a-zA-Z]+$/.test(e), kt = (e) => /^[A-Za-z0-9]+$/.test(e), Rt = (e) => /^[A-Za-z0-9_]+$/.test(e), zt = (e) => /^[A-Z]+$/.test(e), At = (e) => /^[a-z]+$/.test(e), It = (e) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(e), Ot = (e) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(e), Ft = (e) => e == null || e === "" || e === 0 || e === !1 || Array.isArray(e) && e.length === 0 || typeof e == "object" && Object.keys(e).length === 0;
async function Me(e) {
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
function Nt(e, t) {
  Me(e).then(t).catch(() => t(!1));
}
function Yt(e, t, n, r = !1) {
  e.addEventListener && typeof e.addEventListener == "function" && e.addEventListener(t, n, r);
}
function Bt(e, t, n, r = !1) {
  e.removeEventListener && typeof e.removeEventListener == "function" && e.removeEventListener(t, n, r);
}
var Le = `#version 300 es

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
class Pe {
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
    const s = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * s, this.canvas.height = this.canvas.clientHeight * s;
    const i = r.getContext("webgl2", { alpha: !1 });
    if (!i) throw new Error("WebGL2 not supported");
    this.gl = i, this.resizeCanvas(), this.program = this.initProgram(n.vertexShaderSource || Le, n.fragmentShaderSource || Te);
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
    this.gl.clearColor(0, 0, 0, 0), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT), this.resizeCanvas(), this.updateViewport();
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
class Ht extends Pe {
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
    const s = this.gl.getUniformLocation(this.program, "iResolution");
    this.gl.uniform2f(s, this.gl.canvas.width, this.gl.canvas.height);
    const i = this.gl.getUniformLocation(this.program, "iTime");
    this.endTime = performance.now(), this.gl.uniform1f(i, (this.endTime - this.startTime) / 1e3), this.gl.drawArrays(this.gl.TRIANGLES, 0, 6), this.isRendering && (this.currentAnimationFrame = requestAnimationFrame(() => this.render()));
  }
  initRect() {
    const n = this.gl.getAttribLocation(this.program, "a_Position");
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer()), this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]), this.gl.STATIC_DRAW), this.gl.vertexAttribPointer(n, 2, this.gl.FLOAT, !1, 0, 0), this.gl.enableVertexAttribArray(n);
  }
}
class Ut {
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
    const r = (...s) => {
      n(...s), this.off(t, r);
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
    r && new Set(r).forEach((i) => i(...n));
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
class Vt {
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
  static format(t = /* @__PURE__ */ new Date(), n = "YYYY-MM-DD HH:mm:ss") {
    const r = new Date(t);
    if (!this.isValid(r))
      return "Invalid Date";
    const s = (v, y = 2) => v.toString().padStart(y, "0"), i = r.getFullYear(), o = r.getMonth() + 1, a = r.getDate(), u = r.getHours(), l = r.getMinutes(), m = r.getSeconds(), p = r.getMilliseconds(), d = u >= 12 ? "PM" : "AM", f = u % 12 || 12, c = {
      YYYY: i.toString(),
      YY: i.toString().slice(-2),
      MM: s(o),
      M: o.toString(),
      DD: s(a),
      D: a.toString(),
      HH: s(u),
      H: u.toString(),
      hh: s(f),
      h: f.toString(),
      mm: s(l),
      m: l.toString(),
      ss: s(m),
      s: m.toString(),
      SSS: s(p, 3),
      A: d,
      a: d.toLowerCase()
    };
    return n.replace(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g, (v) => c[v]);
  }
  /**
   * 人性化时间展示
   * @param date 日期对象或时间戳
   * @param options 配置选项
   * @returns 人性化时间字符串或格式化后的时间字符串
   */
  static humanize(t, n = {}) {
    const {
      threshold: r = 6048e5,
      // 7天
      defaultFormat: s = "YYYY-MM-DD",
      now: i = /* @__PURE__ */ new Date(),
      showSuffix: o = !0
    } = n, a = t instanceof Date ? t : new Date(t), u = i instanceof Date ? i : new Date(i);
    if (!this.isValid(a))
      return "Invalid Date";
    const l = u.getTime() - a.getTime(), m = Math.abs(l);
    if (m > r)
      return this.format(a, s);
    const p = [
      { unit: "年", ms: 31536e6, past: "年前", future: "年后" },
      { unit: "个月", ms: 2592e6, past: "个月前", future: "个月后" },
      { unit: "天", ms: 864e5, past: "天前", future: "天后" },
      { unit: "小时", ms: 36e5, past: "小时前", future: "小时后" },
      { unit: "分钟", ms: 6e4, past: "分钟前", future: "分钟后" },
      { unit: "秒", ms: 1e3, past: "秒前", future: "秒后" }
    ];
    for (const { unit: d, ms: f, past: c, future: v } of p)
      if (m >= f) {
        const y = Math.floor(m / f), _ = o ? l >= 0 ? c : v : d;
        return `${y}${_}`;
      }
    return o ? l >= 0 ? "刚刚" : "现在" : "刚刚";
  }
  /**
   * 获取两个日期之间的差值
   * @param date1 第一个日期
   * @param date2 第二个日期，默认为当前时间
   * @returns 差值对象，包含年、月、日、小时、分钟、秒、毫秒，带有符号表示方向（正数表示date2较晚）
   */
  static diff(t, n = /* @__PURE__ */ new Date()) {
    const r = t instanceof Date ? t : new Date(t), s = n instanceof Date ? n : new Date(n);
    if (!this.isValid(r) || !this.isValid(s))
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      };
    const i = s.getTime() - r.getTime(), o = Math.sign(i), a = Math.abs(i) / 1e3, u = a / 60, l = u / 60, m = l / 24;
    let p = s.getFullYear() - r.getFullYear(), d = s.getMonth() - r.getMonth(), f = s.getDate() - r.getDate();
    if (f < 0) {
      d--;
      const c = new Date(s.getFullYear(), s.getMonth(), 0).getDate();
      f += c;
    }
    return d < 0 && (p--, d += 12), {
      years: o * Math.abs(p),
      // 符号化年差
      months: o * Math.abs(p * 12 + d),
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
  static add(t, n, r) {
    const s = t instanceof Date ? new Date(t) : new Date(t);
    if (!this.isValid(s))
      return /* @__PURE__ */ new Date(NaN);
    switch (r) {
      case "year":
        s.setFullYear(s.getFullYear() + n);
        break;
      case "month":
        const i = s.getDate();
        s.setMonth(s.getMonth() + n), s.getDate() !== i && s.setDate(0);
        break;
      case "day":
        s.setDate(s.getDate() + n);
        break;
      case "hour":
        s.setHours(s.getHours() + n);
        break;
      case "minute":
        s.setMinutes(s.getMinutes() + n);
        break;
      case "second":
        s.setSeconds(s.getSeconds() + n);
        break;
      case "millisecond":
        s.setMilliseconds(s.getMilliseconds() + n);
        break;
    }
    return s;
  }
  /**
   * 减去时间
   * @param date 原始日期
   * @param value 要减去的值
   * @param unit 时间单位 ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond')
   * @returns 新的Date对象
   */
  static subtract(t, n, r) {
    return this.add(t, -n, r);
  }
  /**
   * 检查日期是否有效
   * @param date 日期对象或时间戳
   * @returns 是否有效
   */
  static isValid(t) {
    try {
      const n = t instanceof Date ? t : new Date(t);
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
  static startOfMonth(t) {
    const n = t instanceof Date ? new Date(t) : new Date(t);
    return this.isValid(n) ? new Date(n.getFullYear(), n.getMonth(), 1) : /* @__PURE__ */ new Date(NaN);
  }
  /**
   * 获取某个月的最后一天
   * @param date 日期对象或时间戳
   * @returns 该月最后一天的Date对象
   */
  static endOfMonth(t) {
    const n = t instanceof Date ? new Date(t) : new Date(t);
    return this.isValid(n) ? new Date(n.getFullYear(), n.getMonth() + 1, 0) : /* @__PURE__ */ new Date(NaN);
  }
  /**
   * 获取某天的开始时间（00:00:00.000）
   * @param date 日期对象或时间戳
   * @returns 该天开始的Date对象
   */
  static startOfDay(t) {
    const n = t instanceof Date ? new Date(t) : new Date(t);
    return this.isValid(n) ? new Date(n.getFullYear(), n.getMonth(), n.getDate()) : /* @__PURE__ */ new Date(NaN);
  }
  /**
   * 获取某天的结束时间（23:59:59.999）
   * @param date 日期对象或时间戳
   * @returns 该天结束的Date对象
   */
  static endOfDay(t) {
    const n = t instanceof Date ? new Date(t) : new Date(t);
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
  static compare(t, n) {
    const r = t instanceof Date ? t : new Date(t), s = n instanceof Date ? n : new Date(n);
    if (!this.isValid(r) || !this.isValid(s))
      return NaN;
    const i = r.getTime(), o = s.getTime();
    return i < o ? -1 : i > o ? 1 : 0;
  }
  /**
   * 检查日期是否在范围内
   * @param date 要检查的日期
   * @param start 范围开始日期
   * @param end 范围结束日期
   * @returns 是否在范围内
   */
  static isBetween(t, n, r) {
    const s = t instanceof Date ? t : new Date(t), i = n instanceof Date ? n : new Date(n), o = r instanceof Date ? r : new Date(r);
    if (!this.isValid(s) || !this.isValid(i) || !this.isValid(o))
      return !1;
    const a = s.getTime();
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
function ke(e, t, n) {
  const r = [[0, 360]], s = [[50, 100]], i = [[30, 70]], o = e && e.length > 0 ? e : r, a = t && t.length > 0 ? t : s, u = n && n.length > 0 ? n : i, l = (f) => {
    const c = f[Math.floor(Math.random() * f.length)];
    return Math.floor(Math.random() * (c[1] - c[0] + 1)) + c[0];
  }, m = l(o), p = l(a), d = l(u);
  return Re(m, p, d);
}
function Re(e, t, n) {
  t /= 100, n /= 100;
  const r = (1 - Math.abs(2 * n - 1)) * t, s = r * (1 - Math.abs(e / 60 % 2 - 1)), i = n - r / 2;
  let o = 0, a = 0, u = 0;
  0 <= e && e < 60 ? (o = r, a = s, u = 0) : 60 <= e && e < 120 ? (o = s, a = r, u = 0) : 120 <= e && e < 180 ? (o = 0, a = r, u = s) : 180 <= e && e < 240 ? (o = 0, a = s, u = r) : 240 <= e && e < 300 ? (o = s, a = 0, u = r) : 300 <= e && e < 360 && (o = r, a = 0, u = s);
  const l = (m) => {
    const p = Math.round((m + i) * 255).toString(16);
    return p.length === 1 ? "0" + p : p;
  };
  return `#${l(o)}${l(a)}${l(u)}`.toUpperCase();
}
class Wt {
  /**
   * 生成随机字符串
   * @param length 字符串长度
   * @returns 随机字符串
   */
  static string(t) {
    const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let r = "";
    for (let s = 0; s < t; s++)
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
    for (const s in t)
      if (t.hasOwnProperty(s)) {
        const i = typeof t[s];
        i === "string" ? r[s] = this.string(10) : i === "number" ? r[s] = this.number(0, 100) : i === "boolean" ? r[s] = this.boolean() : Array.isArray(t[s]) && (r[s] = this.array(t[s], n));
      }
    return r;
  }
  /**
   * 生成随机十六进制颜色
   * @returns 颜色代码，如 #ff0000
   */
  static color(...t) {
    return ke(...t);
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
    for (let s = 0; s < t; s++)
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
    for (let s in t)
      t.hasOwnProperty(s) && (r[s] = P.deepClone(t[s], n));
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
    for (const s in n)
      Object.prototype.hasOwnProperty.call(n, s) && (n[s] && typeof n[s] == "object" && t[s] && typeof t[s] == "object" && !(n[s] instanceof Date) && !(n[s] instanceof RegExp) && !Array.isArray(n[s]) ? this.deepMerge(t[s], n[s], r) : (r.overwrite || !(s in t)) && (t[s] = r.cloneDeep ? this.deepClone(n[s]) : n[s]));
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
    return n.forEach((s) => {
      delete r[s];
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
    return Object.keys(r).forEach((s) => {
      n.includes(s) || delete r[s];
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
      const r = Object.keys(t), s = Object.keys(n);
      if (r.length !== s.length) return !1;
      for (const i of r)
        if (!s.includes(i) || !this.isEqual(t[i], n[i]))
          return !1;
      return !0;
    }
    return !1;
  }
}
const jt = () => {
  const e = we({
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
      const s = n.clientX, i = n.clientY, o = Math.hypot(Math.max(s, innerWidth - s), Math.max(i, innerHeight - i));
      let a;
      const u = document.startViewTransition(() => {
        const l = document.documentElement;
        a = l.classList.contains("dark"), l.classList.add(a ? "light" : "dark"), l.classList.remove(a ? "dark" : "light");
      });
      u.ready.then(() => {
        const l = [`circle(0px at ${s}px ${i}px)`, `circle(${o}px at ${s}px ${i}px)`];
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
      }), await u.finished, e.value = !e.value;
    } catch {
      e.value = !e.value;
    }
  } };
}, Xt = (e = !1) => {
  const t = D(e);
  return {
    loading: t,
    setLoading: (s) => {
      t.value = s;
    },
    toggleLoading: () => {
      t.value = !t.value;
    }
  };
}, qt = (e) => {
  const t = (o) => {
    const a = document.createElement("input");
    return a.type = "file", a.multiple = !!o.multiple, o.directory && (a.webkitdirectory = !0, a.mozdirectory = !0), o.accept && o.accept.length > 0 && (a.accept = o.accept.join(",")), a;
  }, n = () => {
    const { dragRef: o } = e || {};
    if (!(o != null && o.value)) return;
    const a = o.value, u = (d) => {
      d.preventDefault();
    }, l = (d) => {
      d.preventDefault(), a.classList.add("drag-active");
    }, m = (d) => {
      d.preventDefault(), a.classList.remove("drag-active");
    }, p = (d) => {
      var f;
      d.preventDefault(), a.classList.remove("drag-active"), (f = e == null ? void 0 : e.dragCallback) == null || f.call(e, d);
    };
    return a.addEventListener("dragover", u), a.addEventListener("dragenter", l), a.addEventListener("dragleave", m), a.addEventListener("drop", p), () => {
      a.removeEventListener("dragover", u), a.removeEventListener("dragenter", l), a.removeEventListener("dragleave", m), a.removeEventListener("drop", p);
    };
  }, r = (o) => new Promise((a, u) => {
    const l = t(o);
    l.style.display = "none";
    const m = setTimeout(() => {
      u(new Error("选择取消或超时")), document.body.removeChild(l);
    }, 3e4);
    l.onchange = (p) => {
      clearTimeout(m);
      const d = p.target.files;
      d != null && d.length ? a(d) : u(new Error("未选择文件")), document.body.removeChild(l);
    }, document.body.appendChild(l), l.click();
  });
  return {
    selectFile: (o) => r({
      multiple: (o == null ? void 0 : o.multiple) ?? !0,
      accept: o == null ? void 0 : o.accept,
      directory: !1
    }),
    selectFolder: () => r({
      multiple: !1,
      directory: !0
    }),
    initDragDom: n
  };
};
function Gt(e = {}) {
  const { enabled: t = D(!0), message: n = "确定要离开此页面吗？未保存的更改可能会丢失。" } = e, r = typeof t == "boolean" ? D(t) : t, s = (i) => {
    if (r.value)
      return i.preventDefault(), i.returnValue = n, n;
  };
  return Ce((i, o, a) => {
    if (r.value && !confirm(e.message || "确定要离开吗？"))
      return a(!1);
    a();
  }), ne(() => {
    window.addEventListener("beforeunload", s);
  }), xe(() => {
    window.removeEventListener("beforeunload", s);
  }), {
    /**
     * 手动启用/禁用提示
     * @example setEnabled(false)
     */
    setEnabled: (i) => {
      r.value = i;
    }
  };
}
const ze = {
  blurAmount: 5,
  duration: 1,
  thumbnail: "",
  placeholder: !0,
  errorImage: ""
}, Ae = `
.loader {
  width: 50px;
  aspect-ratio: 1;
  box-shadow: 0 0 0 3px #fff inset;
  border-radius: 50%;
  position: relative;
  animation: l11 7s infinite;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: calc(100% + 3px);
  left: calc(50% - 12.5px);
  box-shadow: inherit;
  width: 25px;
  aspect-ratio: 1;
  border-radius: 50%;
  transform-origin: 50% -28px;
  animation: l11 1.5s infinite;
}
.loader:after {
  animation-delay: -0.75s;
}
@keyframes l11 {
  100% {
    transform: rotate(360deg);
  }
}`;
function G(e, t) {
  const n = document.createElement("div");
  n.className = "loader-wrap", n.style.position = "absolute", n.style.display = "flex", n.style.justifyContent = "center", n.style.alignItems = "center";
  const r = document.createElement("div");
  return n.appendChild(r), r.className = "loader", t && typeof t == "object" && t.className && (r.className += " " + t.className), r.style.position = "absolute", r.style.zIndex = e === "error" ? "10" : "5", n;
}
function Z(e) {
  var r;
  const t = "blur-fade-in-loader-style";
  let n = document.getElementById(t);
  n || (n = document.createElement("style"), n.id = t, document.head.appendChild(n)), (r = n.textContent) != null && r.includes(e.trim()) || (n.textContent += e);
}
function T(e, t = {}) {
  var l, m, p;
  const n = { ...ze, ...t };
  e.style.transition = `filter ${n.duration}s ease, opacity ${n.duration}s ease`, e.style.filter = `blur(${n.blurAmount}px)`, e.style.opacity = "0", e.parentElement && !["relative", "absolute", "fixed", "sticky"].includes(getComputedStyle(e.parentElement).position) && (e.parentElement.style.position = "relative"), Z(Ae), n.placeholder && typeof n.placeholder == "object" && n.placeholder.style && Z(n.placeholder.style);
  const r = (l = e.parentElement) == null ? void 0 : l.querySelector(".blur-fade-in-placeholder"), s = (m = e.parentElement) == null ? void 0 : m.querySelector(".blur-fade-in-error");
  r == null || r.remove(), s == null || s.remove();
  let i = null;
  n.placeholder && !n.thumbnail && (i = G("placeholder", n.placeholder), i.classList.add("blur-fade-in-placeholder"), (p = e.parentElement) == null || p.insertBefore(i, e));
  const o = () => {
    var d, f;
    i == null || i.remove(), (f = (d = e.parentElement) == null ? void 0 : d.querySelector(".blur-fade-in-error")) == null || f.remove(), e.offsetWidth, e.style.filter = "blur(0)", e.style.opacity = "1", e.removeEventListener("load", o), e.removeEventListener("error", a);
  }, a = () => {
    var d, f;
    if (console.error("Image failed to load", e.src), i == null || i.remove(), (f = (d = e.parentElement) == null ? void 0 : d.querySelector(".blur-fade-in-error")) == null || f.remove(), n.errorImage)
      if (e.src !== n.errorImage) {
        const c = new Image();
        c.onload = () => {
          e.src = n.errorImage, e.style.backgroundImage = "none", e.style.filter = "blur(0)", e.style.opacity = "1";
        }, c.onerror = () => {
          u();
        }, c.src = n.errorImage;
      } else
        u();
    else
      u(), e.style.display = "none";
    e.removeEventListener("load", o), e.removeEventListener("error", a);
  };
  function u() {
    var d;
    if (e.style.filter = "blur(0)", e.style.opacity = "1", n.placeholder) {
      const f = G("error", n.placeholder);
      f.classList.add("blur-fade-in-error"), (d = e.parentElement) == null || d.insertBefore(f, e);
    }
  }
  e.complete ? e.naturalWidth === 0 ? a() : o() : (e.addEventListener("load", o), e.addEventListener("error", a)), n.thumbnail && (e.style.backgroundImage = `url(${n.thumbnail})`, e.style.backgroundSize = "cover", e.style.backgroundPosition = "center", e.style.backgroundRepeat = "no-repeat", i == null || i.remove());
}
const Ie = {
  mounted(e, t) {
    if (e.tagName === "IMG")
      T(e, t.value);
    else {
      const n = e.getElementsByTagName("img");
      Array.from(n).forEach((r) => {
        T(r, t.value);
      });
    }
  },
  updated(e, t) {
    if (e.tagName === "IMG")
      T(e, t.value);
    else {
      const n = e.getElementsByTagName("img");
      Array.from(n).forEach((r) => {
        T(r, t.value);
      });
    }
  }
}, Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ie
}, Symbol.toStringTag, { value: "Module" })), Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Ne = {
  mounted: function(e) {
    e.style.cursor = "move", e.style.position = "absolute", e.onmousedown = function(t) {
      let n = t.pageX - e.offsetLeft, r = t.pageY - e.offsetTop;
      document.onmousemove = function(s) {
        let i = s.pageX - n, o = s.pageY - r, a = parseInt(window.getComputedStyle(e.parentNode).width) - parseInt(window.getComputedStyle(e).width), u = parseInt(window.getComputedStyle(e.parentNode).height) - parseInt(window.getComputedStyle(e).height);
        i < 0 ? i = 0 : i > a && (i = a), o < 0 ? o = 0 : o > u && (o = u), e.style.left = i + "px", e.style.top = o + "px";
      }, document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
}, Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" })), re = H({
  name: "LoadingComponent",
  props: {
    text: {
      type: String,
      default: void 0
    },
    background: {
      type: String,
      default: "rgba(0, 0, 0, 0.4)"
    },
    spinnerColor: {
      type: String,
      default: "#409eff"
    },
    textColor: {
      type: String,
      default: "#409eff"
    },
    size: {
      type: String,
      default: "medium"
    },
    customClass: {
      type: String,
      default: void 0
    }
  },
  setup(e) {
    const t = {
      small: { spinner: 20, text: 12 },
      medium: { spinner: 42, text: 14 },
      large: { spinner: 64, text: 16 }
    }, n = F(() => t[e.size]), r = () => E(
      "div",
      {
        class: "custom-loading-circular"
      },
      [
        E(
          "svg",
          {
            class: "circular",
            viewBox: "25 25 50 50",
            style: {
              height: `${n.value.spinner}px`,
              width: `${n.value.spinner}px`
            }
          },
          [
            E("circle", {
              cx: "50",
              cy: "50",
              r: "20",
              fill: "none",
              class: "path",
              style: {
                stroke: e.spinnerColor
              }
            })
          ]
        )
      ]
    ), s = () => e.text ? E(
      "span",
      {
        class: "custom-loading-text",
        style: {
          color: e.textColor,
          fontSize: `${n.value.text}px`
        }
      },
      e.text
    ) : null;
    return () => E(
      "div",
      {
        class: ["custom-loading-mask", e.customClass],
        style: {
          backgroundColor: e.background
        }
      },
      [E("div", { class: "custom-loading-spinner" }, [r(), s()])]
    );
  }
}), Be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: re
}, Symbol.toStringTag, { value: "Module" })), Y = /* @__PURE__ */ new WeakMap(), R = (e, t) => {
  const n = typeof t.value == "boolean" ? { loading: t.value } : t.value, r = Se(re, {
    text: n.text,
    background: n.background,
    spinnerColor: n.spinnerColor,
    textColor: n.textColor,
    size: n.size,
    customClass: n.customClass
  }), s = document.createElement("div");
  return e.appendChild(s), r.mount(s), Y.set(e, r), r;
}, z = (e) => {
  const t = Y.get(e);
  t && (t.unmount(), Y.delete(e));
}, He = (e) => {
  const t = getComputedStyle(e).position;
  (t === "static" || t === "") && (e.style.position = "relative");
}, J = {
  mounted(e, t) {
    const n = typeof t.value == "boolean" ? { loading: t.value } : t.value;
    He(e), n.loading && R(e, t);
  },
  updated(e, t) {
    const n = typeof t.value == "boolean" ? { loading: t.value } : t.value, r = typeof t.oldValue == "boolean" ? { loading: t.oldValue } : t.oldValue;
    n.loading !== (r == null ? void 0 : r.loading) ? n.loading ? N(() => {
      R(e, t);
    }) : z(e) : n.loading && JSON.stringify(n) !== JSON.stringify(r) && (z(e), N(() => {
      R(e, t);
    }));
  },
  unmounted(e) {
    z(e);
  }
}, Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: J,
  vLoading: J
}, Symbol.toStringTag, { value: "Module" })), Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), We = {
  mounted(e, t) {
    var j, X;
    e.style.position = "absolute", e.style.userSelect = "none";
    const n = () => {
      var g;
      const h = document.createElement("div");
      return h.style.position = "absolute", h.style.pointerEvents = "none", h.style.border = "2px dashed #3498db", h.style.backgroundColor = "rgba(52, 152, 219, 0.1)", h.style.zIndex = "1000", h.style.display = "none", (g = e.parentElement) == null || g.appendChild(h), h;
    }, r = (h) => {
      const g = document.createElement("div");
      return g.className = `resize-handle resize-handle-${h}`, g.style.position = "absolute", g.style.width = "10px", g.style.height = "10px", g.style.backgroundColor = "#fff", g.style.opacity = "0", g.style.border = "1px solid #333", g.style.zIndex = "100", g.style.touchAction = "none", h.includes("top") && (g.style.top = "-5px"), h.includes("bottom") && (g.style.bottom = "-5px"), h.includes("left") && (g.style.left = "-5px"), h.includes("right") && (g.style.right = "-5px"), h === "top-left" && (g.style.cursor = "nwse-resize"), h === "top-right" && (g.style.cursor = "nesw-resize"), h === "bottom-left" && (g.style.cursor = "nesw-resize"), h === "bottom-right" && (g.style.cursor = "nwse-resize"), e.appendChild(g), g;
    };
    e.__dragPreview = n();
    const s = [
      r("top-left"),
      r("top-right"),
      r("bottom-left"),
      r("bottom-right")
    ];
    e.__resizeHandles = s, e.__resizeListeners = [];
    const i = e.parentElement;
    if (!i) return;
    getComputedStyle(i).position === "static" && (i.style.position = "relative");
    const o = ((j = t.value) == null ? void 0 : j.minWidth) ?? 50, a = ((X = t.value) == null ? void 0 : X.minHeight) ?? 50;
    let u = !1, l = null, m = 0, p = 0, d = 0, f = 0, c = 0, v = 0, y = 0, _ = 0, S = 0, w = 0;
    const k = () => ({
      left: 0,
      top: 0,
      right: i.clientWidth,
      bottom: i.clientHeight
    }), pe = () => {
      if (!e.__dragPreview) return;
      const h = e.__dragPreview;
      h.style.display = "block", h.style.left = `${S}px`, h.style.top = `${w}px`, h.style.width = `${y}px`, h.style.height = `${_}px`;
    }, ge = () => {
      e.__dragPreview && (e.__dragPreview.style.display = "none");
    }, ye = (h, g) => {
      h.preventDefault(), h.stopPropagation(), u = !0, l = g, m = h.clientX, p = h.clientY, d = e.offsetWidth, f = e.offsetHeight, c = e.offsetLeft, v = e.offsetTop, y = d, _ = f, S = c, w = v, document.addEventListener("mousemove", V), document.addEventListener("mouseup", W);
    }, V = (h) => {
      if (!u || !l) return;
      const g = h.clientX - m, C = h.clientY - p, x = k();
      switch (l) {
        case "top-left":
          y = Math.max(o, d - g), _ = Math.max(a, f - C), S = c + (d - y), w = v + (f - _);
          break;
        case "top-right":
          y = Math.max(o, d + g), _ = Math.max(a, f - C), w = v + (f - _);
          break;
        case "bottom-left":
          y = Math.max(o, d - g), _ = Math.max(a, f + C), S = c + (d - y);
          break;
        case "bottom-right":
          y = Math.max(o, d + g), _ = Math.max(a, f + C);
          break;
      }
      S < x.left && (S = x.left, l.includes("left") && (y = d + c - x.left)), w < x.top && (w = x.top, l.includes("top") && (_ = f + v - x.top)), S + y > x.right && (y = x.right - S), w + _ > x.bottom && (_ = x.bottom - w), y = Math.max(o, y), _ = Math.max(a, _), pe();
    }, W = () => {
      u && (u = !1, e.style.width = `${y}px`, e.style.height = `${_}px`, e.style.left = `${S}px`, e.style.top = `${w}px`, ge(), document.removeEventListener("mousemove", V), document.removeEventListener("mouseup", W));
    };
    s.forEach((h, g) => {
      var q;
      const C = ["top-left", "top-right", "bottom-left", "bottom-right"], x = (ve) => ye(ve, C[g]);
      h.addEventListener("mousedown", x), (q = e.__resizeListeners) == null || q.push({ mousedown: x });
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
}, je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: We
}, Symbol.toStringTag, { value: "Module" })), se = {
  directive: "ripple",
  color: "var(--ripple-color)",
  initialOpacity: 0.1,
  finalOpacity: 0.05,
  duration: 350,
  easing: "ease-out",
  delay: 60,
  disabled: !1,
  center: !1
}, Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_PLUGIN_OPTIONS: se
}, Symbol.toStringTag, { value: "Module" })), ie = ({
  borderTopLeftRadius: e,
  borderTopRightRadius: t,
  borderBottomLeftRadius: n,
  borderBottomRightRadius: r
}) => {
  const s = document.createElement("div");
  return s.style.top = "0", s.style.left = "0", s.style.width = "100%", s.style.height = "100%", s.style.position = "absolute", s.style.borderRadius = `${e} ${t} ${r} ${n}`, s.style.overflow = "hidden", s.style.pointerEvents = "none", s.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", s;
}, qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: ie
}, Symbol.toStringTag, { value: "Module" })), oe = (e, t, n, r, s) => {
  const i = document.createElement("div");
  return i.style.position = "absolute", i.style.width = r.center ? `${Math.sqrt(s.width * s.width + s.height * s.height)}px` : `${n * 2}px`, i.style.height = r.center ? `${Math.sqrt(s.width * s.width + s.height * s.height)}px` : `${n * 2}px`, i.style.top = r.center ? `${s.height / 2}px` : `${t}px`, i.style.left = r.center ? `${s.width / 2}px` : `${e}px`, i.style.background = r.color, i.style.borderRadius = "50%", i.style.opacity = `${r.initialOpacity}`, i.style.transform = "translate(-50%,-50%) scale(0)", i.style.transition = `transform ${r.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${r.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, i;
}, Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: oe
}, Symbol.toStringTag, { value: "Module" }));
function L(e, t, n, r) {
  const s = e - n, i = t - r;
  return Math.sqrt(s * s + i * i);
}
function ae(e, { width: t, height: n, left: r, top: s }) {
  const i = e.clientX - r, o = e.clientY - s, a = L(i, o, 0, 0), u = L(i, o, t, 0), l = L(i, o, 0, n), m = L(i, o, t, n), p = Math.max(a, u, l, m);
  return {
    x: i,
    y: o,
    diameter: p
  };
}
const Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: ae,
  getPythagoreanDistance: L
}, Symbol.toStringTag, { value: "Module" })), U = "vRippleCountInternal";
function le(e, t) {
  e.dataset[U] = t.toString();
}
function $(e) {
  return parseInt(e.dataset[U] ?? "0", 10);
}
function ce(e) {
  const t = $(e);
  le(e, t + 1);
}
function ue(e) {
  const t = $(e);
  le(e, t - 1);
}
function de(e) {
  delete e.dataset[U];
}
const Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: ue,
  deleteRippleCount: de,
  getRippleCount: $,
  incrementRippleCount: ce
}, Symbol.toStringTag, { value: "Module" })), Ke = 1.05, A = /* @__PURE__ */ new WeakMap(), Qe = { ...se }, et = (e, t, n) => {
  const r = t.getBoundingClientRect(), s = window.getComputedStyle(t), { diameter: i, x: o, y: a } = ae(e, r), u = ie(s), l = oe(o, a, i * Ke, n, r);
  let m = "", p = !1, d;
  function f() {
    l.style.transition = "opacity 120ms ease in out", l.style.opacity = "0", setTimeout(() => {
      u.remove(), ue(t), $(t) === 0 && (de(t), t.style.position = m);
    }, 100);
  }
  function c(y) {
    typeof y < "u" && document.removeEventListener("pointerup", c), p ? f() : p = !0;
  }
  function v() {
    clearTimeout(d), u.remove(), document.removeEventListener("pointerup", c), document.removeEventListener("pointercancel", c), document.removeEventListener("pointercancel", v);
  }
  ce(t), s.position === "static" && (t.style.position && (m = t.style.position), t.style.position = "relative"), u.appendChild(l), t.appendChild(u), document.addEventListener("pointerup", c), document.addEventListener("pointercancel", c), d = setTimeout(() => {
    document.removeEventListener("pointercancel", v), l.style.transform = "translate(-50%,-50%) scale(1)", l.style.opacity = `${n.finalOpacity}`, setTimeout(() => c(), n.duration);
  }, n.delay), document.addEventListener("pointercancel", v);
}, tt = {
  mounted(e, t) {
    A.set(e, t.value ?? {}), e.addEventListener("pointerdown", (n) => {
      var s;
      const r = A.get(e);
      (s = t.value) != null && s.disabled || r !== !1 && et(n, e, {
        ...Qe,
        ...r
      });
    });
  },
  updated(e, t) {
    A.set(e, t.value ?? {});
  }
}, nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tt
}, Symbol.toStringTag, { value: "Module" })), K = 50, Q = 500, fe = /* @__PURE__ */ new WeakMap(), rt = (e) => {
  const t = new IntersectionObserver((n) => {
    for (const r of n)
      if (r.isIntersecting) {
        const s = fe.get(r.target);
        s && s.play(), t.unobserve(e);
      }
  });
  t.observe(e);
}, st = (e, t) => e.getBoundingClientRect().top - t > window.innerHeight, it = {
  mounted(e, t) {
    let n = K, r = Q;
    if (typeof t.value == "number" ? n = t.value : t.value && typeof t.value == "object" && (n = t.value.distance ?? K, r = t.value.duration ?? Q), !st(e, n))
      return;
    const s = e.animate(
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
    s.pause(), fe.set(e, s), rt(e);
  }
}, ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: it
}, Symbol.toStringTag, { value: "Module" })), ee = /* @__PURE__ */ Object.assign({ "./blur-fade-in/index.ts": Oe, "./blur-fade-in/types.ts": Fe, "./draggable/index.ts": Ye, "./loading/index.ts": Ue, "./loading/loading.ts": Be, "./loading/types.ts": Ve, "./resize/index.ts": je, "./ripple/index.ts": nt, "./ripple/options.ts": Xe, "./ripple/utils/create-container-element.ts": qe, "./ripple/utils/create-ripple-element.ts": Ge, "./ripple/utils/get-element-position-utils.ts": Ze, "./ripple/utils/ripple-count.ts": Je, "./slide-in/index.ts": ot }), Zt = {
  install: function(e) {
    for (const t in ee) {
      const n = ee[t].default;
      if (!n) continue;
      const r = t.split("/")[1];
      t.split("/")[2] === "index.ts" && e.directive(r, n);
    }
  }
}, at = "C", lt = "cl", B = (e) => `${lt}__${e}`, he = (e) => `${at}${e || ""}`, I = H({
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
    const { type: e, size: t, color: n, name: r, spin: s } = this, i = B(`${e}-icon`), o = s ? B(`${e}-icon-spin`) : "";
    return e === "svg" ? E(
      "svg",
      {
        class: [i, o],
        style: {
          width: `${t}px`,
          height: `${t}px`
        }
      },
      {
        default: () => [E("use", { "xlink:href": `#${r}` })]
      }
    ) : E("i", {
      class: ["ri-" + r, i, o],
      style: {
        fontSize: `${t}px`,
        color: n
      }
    });
  }
}), me = Object.assign(I, {
  install(e) {
    e.component(he(I.name), I);
  }
}), O = /* @__PURE__ */ H({
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
    const r = B("segmented"), s = D(null), i = D(null), o = D(-1), a = D(!1), u = F(() => e.options.findIndex((c) => c.value === e.value)), l = (c) => {
      e.disabled || e.value !== c && (t("update:value", c), t("change", c));
    }, m = async (c = !1) => {
      if (!s.value || !i.value) return;
      await N();
      const v = s.value, y = i.value, _ = v.parentElement;
      if (!_) return;
      const S = _.getBoundingClientRect(), w = v.getBoundingClientRect();
      if (c && (y.style.transition = "none"), y.style.width = `${w.width}px`, y.style.height = `${w.height}px`, y.style.left = `${w.left - S.left}px`, !c && o.value !== -1 && u.value !== -1) {
        const k = u.value > o.value ? "right" : "left";
        y.classList.remove(`${r}-thumb-left`, `${r}-thumb-right`), y.classList.add(`${r}-thumb-${k}`);
      }
      c && requestAnimationFrame(() => {
        y.style.transition = "";
      }), o.value = u.value;
    };
    ne(() => {
      a.value = !0, m(!0);
    }), Ee(() => e.value, () => m());
    const p = F(() => ({
      [r]: !0,
      [`${r}-block`]: e.block,
      [`${r}-disabled`]: e.disabled,
      [`${r}-${e.size}`]: !0
    })), d = (c) => ({
      [`${r}-item`]: !0,
      [`${r}-item-selected`]: e.value === c.value,
      [`${r}-item-disabled`]: c.disabled
    }), f = (c) => {
      const v = `label-${c.value}`;
      return n[v] ? n[v]({
        option: c
      }) : M(De, null, [c.icon && M(me, {
        class: "mr-5",
        name: c.icon
      }, null), M("span", {
        class: `${r}-item-label`
      }, [c.label])]);
    };
    return () => M("div", {
      class: p.value
    }, [M("div", {
      ref: i,
      class: `${r}-thumb`
    }, null), e.options.map((c, v) => M("div", {
      ref: e.value === c.value ? s : null,
      key: c.value,
      class: d(c),
      onClick: () => !c.disabled && l(c.value),
      "data-index": v
    }, [f(c)]))]);
  }
}), ct = Object.assign(O, {
  install(e) {
    e.component(he(O.name), O);
  }
}), te = {
  Icon: me,
  Segmented: ct
}, Jt = (e) => {
  Object.keys(te).forEach((t) => {
    e.use(te[t]);
  });
};
export {
  Ht as BaseCanvas,
  Pe as BaseGL,
  me as CIcon,
  ct as CSegmented,
  Ut as Emitter,
  Wt as Random,
  Jt as RegisterComponents,
  Zt as RegisterDirectives,
  Vt as Time,
  Yt as addEventListen,
  Me as copyToClipboard,
  Nt as copyToClipboardWithCallback,
  $t as isAlpha,
  kt as isAlphaNum,
  Rt as isAlphaNumUnderline,
  vt as isArray,
  Ft as isBlank,
  _t as isBoolean,
  Pt as isChinese,
  Et as isDate,
  Mt as isEmail,
  yt as isFunction,
  Tt as isIdCard,
  At as isLower,
  bt as isNull,
  Dt as isNullOrUndefined,
  pt as isNumber,
  gt as isObject,
  Lt as isPhone,
  Ot as isPort,
  St as isPromise,
  xt as isRegExp,
  mt as isString,
  It as isTel,
  wt as isUndefined,
  zt as isUpper,
  Ct as isUrl,
  P as objectUtils,
  Bt as removeEventListen,
  qt as useFileSelect,
  Gt as useLeaveConfirm,
  Xt as useLoading,
  jt as useTheme
};
