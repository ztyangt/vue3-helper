var _e = Object.defineProperty;
var be = (t, e, n) => e in t ? _e(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var _ = (t, e, n) => be(t, typeof e != "symbol" ? e + "" : e, n);
import { useDark as we } from "@vueuse/core";
import { ref as D, onMounted as ne, onBeforeUnmount as xe, defineComponent as B, computed as F, h as E, nextTick as Y, createApp as Se, watch as Ee, createVNode as L, Fragment as De } from "vue";
import { onBeforeRouteLeave as Ce } from "vue-router";
const pt = (t) => typeof t == "string", gt = (t) => typeof t == "number", yt = (t) => typeof t == "object", vt = (t) => typeof t == "function", _t = (t) => Array.isArray(t), bt = (t) => typeof t == "boolean", wt = (t) => t === null, xt = (t) => t === void 0, St = (t) => t instanceof RegExp, Et = (t) => t instanceof Promise, Dt = (t) => t instanceof Date, Ct = (t) => t == null, Lt = (t) => /^http[s]?:\/\/.*/.test(t), Mt = (t) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(t), Tt = (t) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(t), Pt = (t) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(t), $t = (t) => /^[\u4e00-\u9fa5]{0,}$/.test(t), kt = (t) => /^[a-zA-Z]+$/.test(t), Rt = (t) => /^[A-Za-z0-9]+$/.test(t), At = (t) => /^[A-Za-z0-9_]+$/.test(t), zt = (t) => /^[A-Z]+$/.test(t), It = (t) => /^[a-z]+$/.test(t), Ot = (t) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(t), Ft = (t) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(t), Yt = (t) => t == null || t === "" || t === 0 || t === !1 || Array.isArray(t) && t.length === 0 || typeof t == "object" && Object.keys(t).length === 0;
async function Le(t) {
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
function Nt(t, e) {
  Le(t).then(e).catch(() => e(!1));
}
function Ht(t, e, n, s = !1) {
  t.addEventListener && typeof t.addEventListener == "function" && t.addEventListener(e, n, s);
}
function Bt(t, e, n, s = !1) {
  t.removeEventListener && typeof t.removeEventListener == "function" && t.removeEventListener(e, n, s);
}
var Me = `#version 300 es

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
  constructor(e, n = {}) {
    _(this, "gl");
    _(this, "vertexShader");
    _(this, "fragmentShader");
    _(this, "program");
    _(this, "canvas");
    _(this, "compileError");
    let s = null;
    if (typeof e == "string" ? s = document.getElementById(e) : s = e, !s) throw new Error("Canvas not found");
    this.canvas = s;
    const r = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * r, this.canvas.height = this.canvas.clientHeight * r;
    const i = s.getContext("webgl2", { alpha: !1 });
    if (!i) throw new Error("WebGL2 not supported");
    this.gl = i, this.resizeCanvas(), this.program = this.initProgram(n.vertexShaderSource || Me, n.fragmentShaderSource || Te);
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
    this.gl.clearColor(0, 0, 0, 0), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT), this.resizeCanvas(), this.updateViewport();
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
var $e = `#version 300 es

in vec4 a_Position;

void main(){
  gl_Position=a_Position;
}`;
class Ut extends Pe {
  // 控制渲染的标志
  constructor(n, s) {
    super(n, { vertexShaderSource: $e, fragmentShaderSource: s });
    _(this, "startTime");
    _(this, "endTime");
    _(this, "currentAnimationFrame", 0);
    _(this, "lastFrameTime", performance.now());
    // 上一帧的时间
    _(this, "frameCount", 0);
    // 帧数计数器
    _(this, "fps", 0);
    // 当前 FPS
    _(this, "isRendering", !0);
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
class Vt {
  constructor(e) {
    _(this, "_listeners");
    _(this, "_onceListeners");
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
class Wt {
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
    const s = new Date(e);
    if (!this.isValid(s))
      return "Invalid Date";
    const r = (v, y = 2) => v.toString().padStart(y, "0"), i = s.getFullYear(), o = s.getMonth() + 1, a = s.getDate(), l = s.getHours(), c = s.getMinutes(), m = s.getSeconds(), p = s.getMilliseconds(), d = l >= 12 ? "PM" : "AM", f = l % 12 || 12, u = {
      YYYY: i.toString(),
      YY: i.toString().slice(-2),
      MM: r(o),
      M: o.toString(),
      DD: r(a),
      D: a.toString(),
      HH: r(l),
      H: l.toString(),
      hh: r(f),
      h: f.toString(),
      mm: r(c),
      m: c.toString(),
      ss: r(m),
      s: m.toString(),
      SSS: r(p, 3),
      A: d,
      a: d.toLowerCase()
    };
    return n.replace(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g, (v) => u[v]);
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
    } = n, a = e instanceof Date ? e : new Date(e), l = i instanceof Date ? i : new Date(i);
    if (!this.isValid(a))
      return "Invalid Date";
    const c = l.getTime() - a.getTime(), m = Math.abs(c);
    if (m > s)
      return this.format(a, r);
    const p = [
      { unit: "年", ms: 31536e6, past: "年前", future: "年后" },
      { unit: "个月", ms: 2592e6, past: "个月前", future: "个月后" },
      { unit: "天", ms: 864e5, past: "天前", future: "天后" },
      { unit: "小时", ms: 36e5, past: "小时前", future: "小时后" },
      { unit: "分钟", ms: 6e4, past: "分钟前", future: "分钟后" },
      { unit: "秒", ms: 1e3, past: "秒前", future: "秒后" }
    ];
    for (const { unit: d, ms: f, past: u, future: v } of p)
      if (m >= f) {
        const y = Math.floor(m / f), b = o ? c >= 0 ? u : v : d;
        return `${y}${b}`;
      }
    return o ? c >= 0 ? "刚刚" : "现在" : "刚刚";
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
    const i = r.getTime() - s.getTime(), o = Math.sign(i), a = Math.abs(i) / 1e3, l = a / 60, c = l / 60, m = c / 24;
    let p = r.getFullYear() - s.getFullYear(), d = r.getMonth() - s.getMonth(), f = r.getDate() - s.getDate();
    if (f < 0) {
      d--;
      const u = new Date(r.getFullYear(), r.getMonth(), 0).getDate();
      f += u;
    }
    return d < 0 && (p--, d += 12), {
      years: o * Math.abs(p),
      // 符号化年差
      months: o * Math.abs(p * 12 + d),
      // 符号化总月差
      days: o * Math.floor(m),
      // 符号化天差（基于24小时制）
      hours: o * Math.floor(c),
      // 符号化小时差
      minutes: o * Math.floor(l),
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
function ke(t, e, n) {
  const s = [[0, 360]], r = [[50, 100]], i = [[30, 70]], o = t && t.length > 0 ? t : s, a = e && e.length > 0 ? e : r, l = n && n.length > 0 ? n : i, c = (f) => {
    const u = f[Math.floor(Math.random() * f.length)];
    return Math.floor(Math.random() * (u[1] - u[0] + 1)) + u[0];
  }, m = c(o), p = c(a), d = c(l);
  return Re(m, p, d);
}
function Re(t, e, n) {
  e /= 100, n /= 100;
  const s = (1 - Math.abs(2 * n - 1)) * e, r = s * (1 - Math.abs(t / 60 % 2 - 1)), i = n - s / 2;
  let o = 0, a = 0, l = 0;
  0 <= t && t < 60 ? (o = s, a = r, l = 0) : 60 <= t && t < 120 ? (o = r, a = s, l = 0) : 120 <= t && t < 180 ? (o = 0, a = s, l = r) : 180 <= t && t < 240 ? (o = 0, a = r, l = s) : 240 <= t && t < 300 ? (o = r, a = 0, l = s) : 300 <= t && t < 360 && (o = s, a = 0, l = r);
  const c = (m) => {
    const p = Math.round((m + i) * 255).toString(16);
    return p.length === 1 ? "0" + p : p;
  };
  return `#${c(o)}${c(a)}${c(l)}`.toUpperCase();
}
class jt {
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
    return ke(...e);
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
class P {
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
      e.hasOwnProperty(r) && (s[r] = P.deepClone(e[r], n));
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
    const s = P.deepClone(e);
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
    const s = P.deepClone(e);
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
class Ae {
  constructor() {
    _(this, "events", /* @__PURE__ */ new Map());
  }
  /**
   * 监听事件
   * @param eventName 事件名称
   * @param callback 回调函数
   * @param once 是否只执行一次
   */
  on(e, n, s) {
    this.events.has(e) || this.events.set(e, []);
    const r = this.events.get(e) || [];
    return r.some((i) => i.callback === n) || r.push({ callback: n, once: s }), this;
  }
  /**
   * 监听事件，只执行一次
   * @param eventName 事件名称
   * @param callback 回调函数
   */
  once(e, n) {
    return this.on(e, n, !0);
  }
  /**
   * 移除事件监听
   * @param eventName 事件名称
   * @param callback 要移除的回调函数（可选，不传则移除该事件所有监听）
   */
  off(e, n) {
    if (!this.events.has(e))
      return this;
    if (!n)
      return this.events.delete(e), this;
    const r = (this.events.get(e) || []).filter((i) => i.callback !== n);
    return r.length === 0 ? this.events.delete(e) : this.events.set(e, r), this;
  }
  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给回调函数的参数
   */
  emit(e, ...n) {
    if (!this.events.has(e))
      return !1;
    const s = this.events.get(e) || [], r = [...s], i = r.filter((a) => !a.once), o = r.filter((a) => a.once);
    if (i.forEach((a) => {
      try {
        a.callback.apply(this, n);
      } catch (l) {
        console.error(`Error in event listener for "${e}":`, l);
      }
    }), o.forEach((a) => {
      try {
        a.callback.apply(this, n);
      } catch (l) {
        console.error(`Error in once event listener for "${e}":`, l);
      }
    }), o.length > 0) {
      const a = s.filter((l) => !o.includes(l));
      a.length === 0 ? this.events.delete(e) : this.events.set(e, a);
    }
    return !0;
  }
  /**
   * 清除所有事件监听
   */
  clear() {
    return this.events.clear(), this;
  }
  /**
   * 获取某个事件的监听器数量
   * @param eventName 事件名称
   */
  listenerCount(e) {
    return this.events.has(e) ? this.events.get(e).length : 0;
  }
  /**
   * 获取所有已注册的事件名称
   */
  eventNames() {
    return Array.from(this.events.keys());
  }
  /**
   * 移除所有事件监听（别名方法）
   */
  removeAllListeners() {
    return this.clear();
  }
}
class Xt extends Ae {
  constructor(n, s) {
    super();
    _(this, "canvas");
    _(this, "ctx");
    _(this, "container");
    _(this, "options");
    this.container = n, this.options = s, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.init();
  }
  init() {
    console.log(this.options);
    const { clientWidth: n, clientHeight: s } = this.container, r = window.devicePixelRatio || 1;
    this.canvas.width = n * r, this.canvas.height = s * r, this.ctx.scale(r, r), this.canvas.style.width = `${n}px`, this.canvas.style.height = `${s}px`, this.ctx.fillStyle = "red", this.ctx.fillRect(0, 0, n, s), this.ctx.fill(), this.container.appendChild(this.canvas);
  }
}
const qt = () => {
  const t = we({
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
      const l = document.startViewTransition(() => {
        const c = document.documentElement;
        a = c.classList.contains("dark"), c.classList.add(a ? "light" : "dark"), c.classList.remove(a ? "dark" : "light");
      });
      l.ready.then(() => {
        const c = [`circle(0px at ${r}px ${i}px)`, `circle(${o}px at ${r}px ${i}px)`];
        document.documentElement.animate(
          {
            clipPath: a ? [...c].reverse() : c
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement: a ? "::view-transition-old(root)" : "::view-transition-new(root)"
          }
        );
      }), await l.finished, t.value = !t.value;
    } catch {
      t.value = !t.value;
    }
  } };
}, Gt = (t = !1) => {
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
}, Zt = (t) => {
  const e = (o) => {
    const a = document.createElement("input");
    return a.type = "file", a.multiple = !!o.multiple, o.directory && (a.webkitdirectory = !0, a.mozdirectory = !0), o.accept && o.accept.length > 0 && (a.accept = o.accept.join(",")), a;
  }, n = () => {
    const { dragRef: o } = t || {};
    if (!(o != null && o.value)) return;
    const a = o.value, l = (d) => {
      d.preventDefault();
    }, c = (d) => {
      d.preventDefault(), a.classList.add("drag-active");
    }, m = (d) => {
      d.preventDefault(), a.classList.remove("drag-active");
    }, p = (d) => {
      var f;
      d.preventDefault(), a.classList.remove("drag-active"), (f = t == null ? void 0 : t.dragCallback) == null || f.call(t, d);
    };
    return a.addEventListener("dragover", l), a.addEventListener("dragenter", c), a.addEventListener("dragleave", m), a.addEventListener("drop", p), () => {
      a.removeEventListener("dragover", l), a.removeEventListener("dragenter", c), a.removeEventListener("dragleave", m), a.removeEventListener("drop", p);
    };
  }, s = (o) => new Promise((a, l) => {
    const c = e(o);
    c.style.display = "none";
    const m = () => {
      c.parentNode === document.body && document.body.removeChild(c), window.removeEventListener("focus", m);
    };
    window.addEventListener("focus", m), c.onchange = (p) => {
      const d = p.target.files;
      d != null && d.length ? a(d) : l(new Error("未选择文件")), c.parentNode === document.body && document.body.removeChild(c), window.removeEventListener("focus", m);
    }, document.body.appendChild(c), c.click();
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
function Jt(t = {}) {
  const { enabled: e = D(!0), message: n = "确定要离开此页面吗？未保存的更改可能会丢失。" } = t, s = typeof e == "boolean" ? D(e) : e, r = (i) => {
    if (s.value)
      return i.preventDefault(), i.returnValue = n, n;
  };
  return Ce((i, o, a) => {
    if (s.value && !confirm(t.message || "确定要离开吗？"))
      return a(!1);
    a();
  }), ne(() => {
    window.addEventListener("beforeunload", r);
  }), xe(() => {
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
const ze = {
  blurAmount: 5,
  duration: 1,
  thumbnail: "",
  placeholder: !0,
  errorImage: ""
}, Ie = `
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
function G(t, e) {
  const n = document.createElement("div");
  n.className = "loader-wrap", n.style.position = "absolute", n.style.display = "flex", n.style.justifyContent = "center", n.style.alignItems = "center";
  const s = document.createElement("div");
  return n.appendChild(s), s.className = "loader", e && typeof e == "object" && e.className && (s.className += " " + e.className), s.style.position = "absolute", s.style.zIndex = t === "error" ? "10" : "5", n;
}
function Z(t) {
  var s;
  const e = "blur-fade-in-loader-style";
  let n = document.getElementById(e);
  n || (n = document.createElement("style"), n.id = e, document.head.appendChild(n)), (s = n.textContent) != null && s.includes(t.trim()) || (n.textContent += t);
}
function T(t, e = {}) {
  var c, m, p;
  const n = { ...ze, ...e };
  t.style.transition = `filter ${n.duration}s ease, opacity ${n.duration}s ease`, t.style.filter = `blur(${n.blurAmount}px)`, t.style.opacity = "0", t.parentElement && !["relative", "absolute", "fixed", "sticky"].includes(getComputedStyle(t.parentElement).position) && (t.parentElement.style.position = "relative"), Z(Ie), n.placeholder && typeof n.placeholder == "object" && n.placeholder.style && Z(n.placeholder.style);
  const s = (c = t.parentElement) == null ? void 0 : c.querySelector(".blur-fade-in-placeholder"), r = (m = t.parentElement) == null ? void 0 : m.querySelector(".blur-fade-in-error");
  s == null || s.remove(), r == null || r.remove();
  let i = null;
  n.placeholder && !n.thumbnail && (i = G("placeholder", n.placeholder), i.classList.add("blur-fade-in-placeholder"), (p = t.parentElement) == null || p.insertBefore(i, t));
  const o = () => {
    var d, f;
    i == null || i.remove(), (f = (d = t.parentElement) == null ? void 0 : d.querySelector(".blur-fade-in-error")) == null || f.remove(), t.offsetWidth, t.style.filter = "blur(0)", t.style.opacity = "1", t.removeEventListener("load", o), t.removeEventListener("error", a);
  }, a = () => {
    var d, f;
    if (console.error("Image failed to load", t.src), i == null || i.remove(), (f = (d = t.parentElement) == null ? void 0 : d.querySelector(".blur-fade-in-error")) == null || f.remove(), n.errorImage)
      if (t.src !== n.errorImage) {
        const u = new Image();
        u.onload = () => {
          t.src = n.errorImage, t.style.backgroundImage = "none", t.style.filter = "blur(0)", t.style.opacity = "1";
        }, u.onerror = () => {
          l();
        }, u.src = n.errorImage;
      } else
        l();
    else
      l(), t.style.display = "none";
    t.removeEventListener("load", o), t.removeEventListener("error", a);
  };
  function l() {
    var d;
    if (t.style.filter = "blur(0)", t.style.opacity = "1", n.placeholder) {
      const f = G("error", n.placeholder);
      f.classList.add("blur-fade-in-error"), (d = t.parentElement) == null || d.insertBefore(f, t);
    }
  }
  t.complete ? t.naturalWidth === 0 ? a() : o() : (t.addEventListener("load", o), t.addEventListener("error", a)), n.thumbnail && (t.style.backgroundImage = `url(${n.thumbnail})`, t.style.backgroundSize = "cover", t.style.backgroundPosition = "center", t.style.backgroundRepeat = "no-repeat", i == null || i.remove());
}
const Oe = {
  mounted(t, e) {
    if (t.tagName === "IMG")
      T(t, e.value);
    else {
      const n = t.getElementsByTagName("img");
      Array.from(n).forEach((s) => {
        T(s, e.value);
      });
    }
  },
  updated(t, e) {
    if (t.tagName === "IMG")
      T(t, e.value);
    else {
      const n = t.getElementsByTagName("img");
      Array.from(n).forEach((s) => {
        T(s, e.value);
      });
    }
  }
}, Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oe
}, Symbol.toStringTag, { value: "Module" })), Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Ne = {
  mounted: function(t) {
    t.style.cursor = "move", t.style.position = "absolute", t.onmousedown = function(e) {
      let n = e.pageX - t.offsetLeft, s = e.pageY - t.offsetTop;
      document.onmousemove = function(r) {
        let i = r.pageX - n, o = r.pageY - s, a = parseInt(window.getComputedStyle(t.parentNode).width) - parseInt(window.getComputedStyle(t).width), l = parseInt(window.getComputedStyle(t.parentNode).height) - parseInt(window.getComputedStyle(t).height);
        i < 0 ? i = 0 : i > a && (i = a), o < 0 ? o = 0 : o > l && (o = l), t.style.left = i + "px", t.style.top = o + "px";
      }, document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
}, He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" })), se = B({
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
  setup(t) {
    const e = {
      small: { spinner: 20, text: 12 },
      medium: { spinner: 42, text: 14 },
      large: { spinner: 64, text: 16 }
    }, n = F(() => e[t.size]), s = () => E(
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
                stroke: t.spinnerColor
              }
            })
          ]
        )
      ]
    ), r = () => t.text ? E(
      "span",
      {
        class: "custom-loading-text",
        style: {
          color: t.textColor,
          fontSize: `${n.value.text}px`
        }
      },
      t.text
    ) : null;
    return () => E(
      "div",
      {
        class: ["custom-loading-mask", t.customClass],
        style: {
          backgroundColor: t.background
        }
      },
      [E("div", { class: "custom-loading-spinner" }, [s(), r()])]
    );
  }
}), Be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: se
}, Symbol.toStringTag, { value: "Module" })), N = /* @__PURE__ */ new WeakMap(), R = (t, e) => {
  const n = typeof e.value == "boolean" ? { loading: e.value } : e.value, s = Se(se, {
    text: n.text,
    background: n.background,
    spinnerColor: n.spinnerColor,
    textColor: n.textColor,
    size: n.size,
    customClass: n.customClass
  }), r = document.createElement("div");
  return t.appendChild(r), s.mount(r), N.set(t, s), s;
}, A = (t) => {
  const e = N.get(t);
  e && (e.unmount(), N.delete(t));
}, Ue = (t) => {
  const e = getComputedStyle(t).position;
  (e === "static" || e === "") && (t.style.position = "relative");
}, J = {
  mounted(t, e) {
    const n = typeof e.value == "boolean" ? { loading: e.value } : e.value;
    Ue(t), n.loading && R(t, e);
  },
  updated(t, e) {
    const n = typeof e.value == "boolean" ? { loading: e.value } : e.value, s = typeof e.oldValue == "boolean" ? { loading: e.oldValue } : e.oldValue;
    n.loading !== (s == null ? void 0 : s.loading) ? n.loading ? Y(() => {
      R(t, e);
    }) : A(t) : n.loading && JSON.stringify(n) !== JSON.stringify(s) && (A(t), Y(() => {
      R(t, e);
    }));
  },
  unmounted(t) {
    A(t);
  }
}, Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: J,
  vLoading: J
}, Symbol.toStringTag, { value: "Module" })), We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), je = {
  mounted(t, e) {
    var j, X;
    t.style.position = "absolute", t.style.userSelect = "none";
    const n = () => {
      var g;
      const h = document.createElement("div");
      return h.style.position = "absolute", h.style.pointerEvents = "none", h.style.border = "2px dashed #3498db", h.style.backgroundColor = "rgba(52, 152, 219, 0.1)", h.style.zIndex = "1000", h.style.display = "none", (g = t.parentElement) == null || g.appendChild(h), h;
    }, s = (h) => {
      const g = document.createElement("div");
      return g.className = `resize-handle resize-handle-${h}`, g.style.position = "absolute", g.style.width = "10px", g.style.height = "10px", g.style.backgroundColor = "#fff", g.style.opacity = "0", g.style.border = "1px solid #333", g.style.zIndex = "100", g.style.touchAction = "none", h.includes("top") && (g.style.top = "-5px"), h.includes("bottom") && (g.style.bottom = "-5px"), h.includes("left") && (g.style.left = "-5px"), h.includes("right") && (g.style.right = "-5px"), h === "top-left" && (g.style.cursor = "nwse-resize"), h === "top-right" && (g.style.cursor = "nesw-resize"), h === "bottom-left" && (g.style.cursor = "nesw-resize"), h === "bottom-right" && (g.style.cursor = "nwse-resize"), t.appendChild(g), g;
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
    const o = ((j = e.value) == null ? void 0 : j.minWidth) ?? 50, a = ((X = e.value) == null ? void 0 : X.minHeight) ?? 50;
    let l = !1, c = null, m = 0, p = 0, d = 0, f = 0, u = 0, v = 0, y = 0, b = 0, S = 0, w = 0;
    const k = () => ({
      left: 0,
      top: 0,
      right: i.clientWidth,
      bottom: i.clientHeight
    }), pe = () => {
      if (!t.__dragPreview) return;
      const h = t.__dragPreview;
      h.style.display = "block", h.style.left = `${S}px`, h.style.top = `${w}px`, h.style.width = `${y}px`, h.style.height = `${b}px`;
    }, ge = () => {
      t.__dragPreview && (t.__dragPreview.style.display = "none");
    }, ye = (h, g) => {
      h.preventDefault(), h.stopPropagation(), l = !0, c = g, m = h.clientX, p = h.clientY, d = t.offsetWidth, f = t.offsetHeight, u = t.offsetLeft, v = t.offsetTop, y = d, b = f, S = u, w = v, document.addEventListener("mousemove", V), document.addEventListener("mouseup", W);
    }, V = (h) => {
      if (!l || !c) return;
      const g = h.clientX - m, C = h.clientY - p, x = k();
      switch (c) {
        case "top-left":
          y = Math.max(o, d - g), b = Math.max(a, f - C), S = u + (d - y), w = v + (f - b);
          break;
        case "top-right":
          y = Math.max(o, d + g), b = Math.max(a, f - C), w = v + (f - b);
          break;
        case "bottom-left":
          y = Math.max(o, d - g), b = Math.max(a, f + C), S = u + (d - y);
          break;
        case "bottom-right":
          y = Math.max(o, d + g), b = Math.max(a, f + C);
          break;
      }
      S < x.left && (S = x.left, c.includes("left") && (y = d + u - x.left)), w < x.top && (w = x.top, c.includes("top") && (b = f + v - x.top)), S + y > x.right && (y = x.right - S), w + b > x.bottom && (b = x.bottom - w), y = Math.max(o, y), b = Math.max(a, b), pe();
    }, W = () => {
      l && (l = !1, t.style.width = `${y}px`, t.style.height = `${b}px`, t.style.left = `${S}px`, t.style.top = `${w}px`, ge(), document.removeEventListener("mousemove", V), document.removeEventListener("mouseup", W));
    };
    r.forEach((h, g) => {
      var q;
      const C = ["top-left", "top-right", "bottom-left", "bottom-right"], x = (ve) => ye(ve, C[g]);
      h.addEventListener("mousedown", x), (q = t.__resizeListeners) == null || q.push({ mousedown: x });
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
}, Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: je
}, Symbol.toStringTag, { value: "Module" })), re = {
  directive: "ripple",
  color: "var(--ripple-color)",
  initialOpacity: 0.1,
  finalOpacity: 0.05,
  duration: 350,
  easing: "ease-out",
  delay: 60,
  disabled: !1,
  center: !1
}, qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_PLUGIN_OPTIONS: re
}, Symbol.toStringTag, { value: "Module" })), ie = ({
  borderTopLeftRadius: t,
  borderTopRightRadius: e,
  borderBottomLeftRadius: n,
  borderBottomRightRadius: s
}) => {
  const r = document.createElement("div");
  return r.style.top = "0", r.style.left = "0", r.style.width = "100%", r.style.height = "100%", r.style.position = "absolute", r.style.borderRadius = `${t} ${e} ${s} ${n}`, r.style.overflow = "hidden", r.style.pointerEvents = "none", r.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", r;
}, Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: ie
}, Symbol.toStringTag, { value: "Module" })), oe = (t, e, n, s, r) => {
  const i = document.createElement("div");
  return i.style.position = "absolute", i.style.width = s.center ? `${Math.sqrt(r.width * r.width + r.height * r.height)}px` : `${n * 2}px`, i.style.height = s.center ? `${Math.sqrt(r.width * r.width + r.height * r.height)}px` : `${n * 2}px`, i.style.top = s.center ? `${r.height / 2}px` : `${e}px`, i.style.left = s.center ? `${r.width / 2}px` : `${t}px`, i.style.background = s.color, i.style.borderRadius = "50%", i.style.opacity = `${s.initialOpacity}`, i.style.transform = "translate(-50%,-50%) scale(0)", i.style.transition = `transform ${s.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${s.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, i;
}, Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: oe
}, Symbol.toStringTag, { value: "Module" }));
function M(t, e, n, s) {
  const r = t - n, i = e - s;
  return Math.sqrt(r * r + i * i);
}
function ae(t, { width: e, height: n, left: s, top: r }) {
  const i = t.clientX - s, o = t.clientY - r, a = M(i, o, 0, 0), l = M(i, o, e, 0), c = M(i, o, 0, n), m = M(i, o, e, n), p = Math.max(a, l, c, m);
  return {
    x: i,
    y: o,
    diameter: p
  };
}
const Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: ae,
  getPythagoreanDistance: M
}, Symbol.toStringTag, { value: "Module" })), U = "vRippleCountInternal";
function le(t, e) {
  t.dataset[U] = e.toString();
}
function $(t) {
  return parseInt(t.dataset[U] ?? "0", 10);
}
function ce(t) {
  const e = $(t);
  le(t, e + 1);
}
function ue(t) {
  const e = $(t);
  le(t, e - 1);
}
function de(t) {
  delete t.dataset[U];
}
const Ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: ue,
  deleteRippleCount: de,
  getRippleCount: $,
  incrementRippleCount: ce
}, Symbol.toStringTag, { value: "Module" })), Qe = 1.05, z = /* @__PURE__ */ new WeakMap(), et = { ...re }, tt = (t, e, n) => {
  const s = e.getBoundingClientRect(), r = window.getComputedStyle(e), { diameter: i, x: o, y: a } = ae(t, s), l = ie(r), c = oe(o, a, i * Qe, n, s);
  let m = "", p = !1, d;
  function f() {
    c.style.transition = "opacity 120ms ease in out", c.style.opacity = "0", setTimeout(() => {
      l.remove(), ue(e), $(e) === 0 && (de(e), e.style.position = m);
    }, 100);
  }
  function u(y) {
    typeof y < "u" && document.removeEventListener("pointerup", u), p ? f() : p = !0;
  }
  function v() {
    clearTimeout(d), l.remove(), document.removeEventListener("pointerup", u), document.removeEventListener("pointercancel", u), document.removeEventListener("pointercancel", v);
  }
  ce(e), r.position === "static" && (e.style.position && (m = e.style.position), e.style.position = "relative"), l.appendChild(c), e.appendChild(l), document.addEventListener("pointerup", u), document.addEventListener("pointercancel", u), d = setTimeout(() => {
    document.removeEventListener("pointercancel", v), c.style.transform = "translate(-50%,-50%) scale(1)", c.style.opacity = `${n.finalOpacity}`, setTimeout(() => u(), n.duration);
  }, n.delay), document.addEventListener("pointercancel", v);
}, nt = {
  mounted(t, e) {
    z.set(t, e.value ?? {}), t.addEventListener("pointerdown", (n) => {
      var r;
      const s = z.get(t);
      (r = e.value) != null && r.disabled || s !== !1 && tt(n, t, {
        ...et,
        ...s
      });
    });
  },
  updated(t, e) {
    z.set(t, e.value ?? {});
  }
}, st = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nt
}, Symbol.toStringTag, { value: "Module" })), K = 50, Q = 500, fe = /* @__PURE__ */ new WeakMap(), rt = (t) => {
  const e = new IntersectionObserver((n) => {
    for (const s of n)
      if (s.isIntersecting) {
        const r = fe.get(s.target);
        r && r.play(), e.unobserve(t);
      }
  });
  e.observe(t);
}, it = (t, e) => t.getBoundingClientRect().top - e > window.innerHeight, ot = {
  mounted(t, e) {
    let n = K, s = Q;
    if (typeof e.value == "number" ? n = e.value : e.value && typeof e.value == "object" && (n = e.value.distance ?? K, s = e.value.duration ?? Q), !it(t, n))
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
    r.pause(), fe.set(t, r), rt(t);
  }
}, at = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ot
}, Symbol.toStringTag, { value: "Module" })), ee = /* @__PURE__ */ Object.assign({ "./blur-fade-in/index.ts": Fe, "./blur-fade-in/types.ts": Ye, "./draggable/index.ts": He, "./loading/index.ts": Ve, "./loading/loading.ts": Be, "./loading/types.ts": We, "./resize/index.ts": Xe, "./ripple/index.ts": st, "./ripple/options.ts": qe, "./ripple/utils/create-container-element.ts": Ge, "./ripple/utils/create-ripple-element.ts": Ze, "./ripple/utils/get-element-position-utils.ts": Je, "./ripple/utils/ripple-count.ts": Ke, "./slide-in/index.ts": at }), Kt = {
  install: function(t) {
    for (const e in ee) {
      const n = ee[e].default;
      if (!n) continue;
      const s = e.split("/")[1];
      e.split("/")[2] === "index.ts" && t.directive(s, n);
    }
  }
}, lt = "C", ct = "cl", H = (t) => `${ct}__${t}`, he = (t) => `${lt}${t || ""}`, I = B({
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
    const { type: t, size: e, color: n, name: s, spin: r } = this, i = H(`${t}-icon`), o = r ? H(`${t}-icon-spin`) : "";
    return t === "svg" ? E(
      "svg",
      {
        class: [i, o],
        style: {
          width: `${e}px`,
          height: `${e}px`
        }
      },
      {
        default: () => [E("use", { "xlink:href": `#${s}` })]
      }
    ) : E("i", {
      class: ["ri-" + s, i, o],
      style: {
        fontSize: `${e}px`,
        color: n
      }
    });
  }
}), me = Object.assign(I, {
  install(t) {
    t.component(he(I.name), I);
  }
}), O = /* @__PURE__ */ B({
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
    const s = H("segmented"), r = D(null), i = D(null), o = D(-1), a = D(!1), l = F(() => t.options.findIndex((u) => u.value === t.value)), c = (u) => {
      t.disabled || t.value !== u && (e("update:value", u), e("change", u));
    }, m = async (u = !1) => {
      if (!r.value || !i.value) return;
      await Y();
      const v = r.value, y = i.value, b = v.parentElement;
      if (!b) return;
      const S = b.getBoundingClientRect(), w = v.getBoundingClientRect();
      if (u && (y.style.transition = "none"), y.style.width = `${w.width}px`, y.style.height = `${w.height}px`, y.style.left = `${w.left - S.left}px`, !u && o.value !== -1 && l.value !== -1) {
        const k = l.value > o.value ? "right" : "left";
        y.classList.remove(`${s}-thumb-left`, `${s}-thumb-right`), y.classList.add(`${s}-thumb-${k}`);
      }
      u && requestAnimationFrame(() => {
        y.style.transition = "";
      }), o.value = l.value;
    };
    ne(() => {
      a.value = !0, m(!0);
    }), Ee(() => t.value, () => m());
    const p = F(() => ({
      [s]: !0,
      [`${s}-block`]: t.block,
      [`${s}-disabled`]: t.disabled,
      [`${s}-${t.size}`]: !0
    })), d = (u) => ({
      [`${s}-item`]: !0,
      [`${s}-item-selected`]: t.value === u.value,
      [`${s}-item-disabled`]: u.disabled
    }), f = (u) => {
      const v = `label-${u.value}`;
      return n[v] ? n[v]({
        option: u
      }) : L(De, null, [u.icon && L(me, {
        class: "mr-5",
        name: u.icon
      }, null), L("span", {
        class: `${s}-item-label`
      }, [u.label])]);
    };
    return () => L("div", {
      class: p.value
    }, [L("div", {
      ref: i,
      class: `${s}-thumb`
    }, null), t.options.map((u, v) => L("div", {
      ref: t.value === u.value ? r : null,
      key: u.value,
      class: d(u),
      onClick: () => !u.disabled && c(u.value),
      "data-index": v
    }, [f(u)]))]);
  }
}), ut = Object.assign(O, {
  install(t) {
    t.component(he(O.name), O);
  }
}), te = {
  Icon: me,
  Segmented: ut
}, Qt = (t) => {
  Object.keys(te).forEach((e) => {
    t.use(te[e]);
  });
};
export {
  Ut as BaseCanvas,
  Pe as BaseGL,
  me as CIcon,
  ut as CSegmented,
  Xt as Cropper,
  Vt as Emitter,
  Ae as EventEmitter,
  jt as Random,
  Qt as RegisterComponents,
  Kt as RegisterDirectives,
  Wt as Time,
  Ht as addEventListen,
  Le as copyToClipboard,
  Nt as copyToClipboardWithCallback,
  kt as isAlpha,
  Rt as isAlphaNum,
  At as isAlphaNumUnderline,
  _t as isArray,
  Yt as isBlank,
  bt as isBoolean,
  $t as isChinese,
  Dt as isDate,
  Mt as isEmail,
  vt as isFunction,
  Pt as isIdCard,
  It as isLower,
  wt as isNull,
  Ct as isNullOrUndefined,
  gt as isNumber,
  yt as isObject,
  Tt as isPhone,
  Ft as isPort,
  Et as isPromise,
  St as isRegExp,
  pt as isString,
  Ot as isTel,
  xt as isUndefined,
  zt as isUpper,
  Lt as isUrl,
  P as objectUtils,
  Bt as removeEventListen,
  Zt as useFileSelect,
  Jt as useLeaveConfirm,
  Gt as useLoading,
  qt as useTheme
};
