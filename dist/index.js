var pe = Object.defineProperty;
var ge = (e, t, n) => t in e ? pe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var b = (e, t, n) => ge(e, typeof t != "symbol" ? t + "" : t, n);
import { useDark as ve } from "@vueuse/core";
import { ref as E, onMounted as J, onBeforeUnmount as ye, defineComponent as N, h as $, createApp as _e, nextTick as K, computed as V, watch as be, createVNode as L, Fragment as we } from "vue";
import { onBeforeRouteLeave as xe } from "vue-router";
const ct = (e) => typeof e == "string", ut = (e) => typeof e == "number", dt = (e) => typeof e == "object", ft = (e) => typeof e == "function", ht = (e) => Array.isArray(e), mt = (e) => typeof e == "boolean", pt = (e) => e === null, gt = (e) => e === void 0, vt = (e) => e instanceof RegExp, yt = (e) => e instanceof Promise, _t = (e) => e instanceof Date, bt = (e) => e == null, wt = (e) => /^http[s]?:\/\/.*/.test(e), xt = (e) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e), St = (e) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(e), Et = (e) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e), Tt = (e) => /^[\u4e00-\u9fa5]{0,}$/.test(e), Lt = (e) => /^[a-zA-Z]+$/.test(e), $t = (e) => /^[A-Za-z0-9]+$/.test(e), Ct = (e) => /^[A-Za-z0-9_]+$/.test(e), Mt = (e) => /^[A-Z]+$/.test(e), Rt = (e) => /^[a-z]+$/.test(e), Pt = (e) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(e), Dt = (e) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(e), It = (e) => e == null || e === "" || e === 0 || e === !1 || Array.isArray(e) && e.length === 0 || typeof e == "object" && Object.keys(e).length === 0;
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
function At(e, t) {
  Se(e).then(t).catch(() => t(!1));
}
function Ot(e, t, n, r = !1) {
  e.addEventListener && typeof e.addEventListener == "function" && e.addEventListener(t, n, r);
}
function kt(e, t, n, r = !1) {
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
    const s = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * s, this.canvas.height = this.canvas.clientHeight * s;
    const i = r.getContext("webgl2", { alpha: !1 });
    if (!i) throw new Error("WebGL2 not supported");
    this.gl = i, this.resizeCanvas(), this.program = this.initProgram(n.vertexShaderSource || Ee, n.fragmentShaderSource || Te);
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
class zt extends Le {
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
class Ft {
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
class Nt {
  /**
   * 计算时间差或格式化日期
   * @param date 目标日期
   * @param baseDate 基准日期（默认当前时间）
   * @param options 配置选项
   * @returns 时间差结果或格式化后的日期字符串
   */
  static diff(t, n = /* @__PURE__ */ new Date(), r = {}) {
    const s = this.parseDate(t), i = this.parseDate(n), o = i.getTime();
    return r.range && !this.checkRelativeTimeRange(s, o, r.range) ? this.formatOutOfRange(s, r.range.outOfRangeFormat) : this.calculateTimeDiff(s, i, r);
  }
  /**
   * 解析时间范围值为毫秒
   * @param value 时间范围值
   * @returns 毫秒数
   */
  static parseTimeRangeValue(t) {
    if (typeof t == "number") return t;
    const [n, r] = t.split(" "), s = parseFloat(n);
    if (isNaN(s) || !C[r])
      throw new Error(`无效的时间范围值: ${t}`);
    return s * C[r];
  }
  /**
   * 检查日期是否在相对时间范围内
   * @param targetDate 目标日期
   * @param now 当前时间戳（毫秒）
   * @param range 范围配置
   * @returns 是否在范围内
   */
  static checkRelativeTimeRange(t, n, r) {
    const { earliest: s, latest: i, inclusive: o = !0 } = r, l = t.getTime();
    if (s !== void 0) {
      const a = this.parseTimeRangeValue(s), c = n - Math.abs(a);
      if (o ? l < c : l <= c)
        return !1;
    }
    if (i !== void 0) {
      const a = this.parseTimeRangeValue(i), c = n + Math.abs(a);
      if (o ? l > c : l >= c)
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
    const s = Math.abs(n.getTime() - t.getTime()), i = ["year", "month", "day", "hour", "minute", "second"], o = r.units || i, l = r.round !== !1, a = {
      year: 0,
      month: 0,
      week: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    };
    let c = s;
    switch (o.forEach((h) => {
      if (C[h]) {
        const p = c / C[h];
        a[h] = l ? Math.round(p) : p, c -= a[h] * C[h];
      }
    }), r.format) {
      case "object":
        return a;
      case "array":
        return o.map((u) => `${a[u]} ${u}${a[u] !== 1 ? "s" : ""}`);
      case "short":
        return o.filter((u) => a[u] > 0).map((u) => `${a[u]}${u[0]}`).join(" ");
      case "long":
        return o.filter((u) => a[u] > 0).map((u) => `${a[u]} ${u}${a[u] !== 1 ? "s" : ""}`).join(" ");
      case "full":
      default:
        const h = o.filter((u) => a[u] > 0).map((u) => `${a[u]} ${u}${a[u] !== 1 ? "s" : ""}`);
        if (h.length === 0) return "0秒";
        if (h.length === 1) return h[0];
        const p = h.pop();
        return `${h.join("、")}和${p}`;
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
    const r = this.parseDate(t), s = this.parseDate(/* @__PURE__ */ new Date()).getTime();
    if (n != null && n.range && !this.checkRelativeTimeRange(r, s, n.range))
      return this.formatOutOfRange(r, n.range.outOfRangeFormat);
    const i = s - r.getTime(), o = Math.abs(i);
    if (o < 1e3)
      return i < 0 ? "即将" : "刚刚";
    if (o < 6e4) {
      const a = Math.round(o / 1e3);
      return i < 0 ? `${a}秒后` : `${a}秒前`;
    }
    if (o < 36e5) {
      const a = Math.round(o / 6e4);
      return i < 0 ? `${a}分钟后` : `${a}分钟前`;
    }
    if (o < 864e5) {
      const a = Math.round(o / 36e5);
      return i < 0 ? `${a}小时后` : `${a}小时前`;
    }
    if (o < 2592e6) {
      const a = Math.round(o / 864e5);
      if (a === 1) return i < 0 ? "明天" : "昨天";
      if (a < 7)
        return i < 0 ? `${a}天后` : `${a}天前`;
      const c = Math.round(a / 7);
      return i < 0 ? `${c}周后` : `${c}周前`;
    }
    if (o < 31536e6) {
      const a = Math.round(o / 2592e6);
      return i < 0 ? `${a}个月后` : `${a}个月前`;
    }
    const l = Math.round(o / 31536e6);
    return i < 0 ? `${l}年后` : `${l}年前`;
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
function Ce(e, t, n) {
  const r = [[0, 360]], s = [[50, 100]], i = [[30, 70]], o = e && e.length > 0 ? e : r, l = t && t.length > 0 ? t : s, a = n && n.length > 0 ? n : i, c = (v) => {
    const d = v[Math.floor(Math.random() * v.length)];
    return Math.floor(Math.random() * (d[1] - d[0] + 1)) + d[0];
  }, h = c(o), p = c(l), u = c(a);
  return Me(h, p, u);
}
function Me(e, t, n) {
  t /= 100, n /= 100;
  const r = (1 - Math.abs(2 * n - 1)) * t, s = r * (1 - Math.abs(e / 60 % 2 - 1)), i = n - r / 2;
  let o = 0, l = 0, a = 0;
  0 <= e && e < 60 ? (o = r, l = s, a = 0) : 60 <= e && e < 120 ? (o = s, l = r, a = 0) : 120 <= e && e < 180 ? (o = 0, l = r, a = s) : 180 <= e && e < 240 ? (o = 0, l = s, a = r) : 240 <= e && e < 300 ? (o = s, l = 0, a = r) : 300 <= e && e < 360 && (o = r, l = 0, a = s);
  const c = (h) => {
    const p = Math.round((h + i) * 255).toString(16);
    return p.length === 1 ? "0" + p : p;
  };
  return `#${c(o)}${c(l)}${c(a)}`.toUpperCase();
}
class Bt {
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
   * 生成随机十六进制颜色代码
   * @returns 颜色代码，如 #ff0000
   */
  static color(...t) {
    return Ce(...t);
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
const Ut = () => {
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
      const s = n.clientX, i = n.clientY, o = Math.hypot(Math.max(s, innerWidth - s), Math.max(i, innerHeight - i));
      let l;
      const a = document.startViewTransition(() => {
        const c = document.documentElement;
        l = c.classList.contains("dark"), c.classList.add(l ? "light" : "dark"), c.classList.remove(l ? "dark" : "light");
      });
      a.ready.then(() => {
        const c = [`circle(0px at ${s}px ${i}px)`, `circle(${o}px at ${s}px ${i}px)`];
        document.documentElement.animate(
          {
            clipPath: l ? [...c].reverse() : c
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement: l ? "::view-transition-old(root)" : "::view-transition-new(root)"
          }
        );
      }), await a.finished, e.value = !e.value;
    } catch {
      e.value = !e.value;
    }
  } };
}, Ht = (e = !1) => {
  const t = E(e);
  return {
    loading: t,
    setLoading: (s) => {
      t.value = s;
    },
    toggleLoading: () => {
      t.value = !t.value;
    }
  };
}, Wt = (e) => {
  const t = (o) => {
    const l = document.createElement("input");
    return l.type = "file", l.multiple = !!o.multiple, o.directory && (l.webkitdirectory = !0, l.mozdirectory = !0), o.accept && o.accept.length > 0 && (l.accept = o.accept.join(",")), l;
  }, n = () => {
    const { dragRef: o } = e || {};
    if (!(o != null && o.value)) return;
    const l = o.value, a = (u) => {
      u.preventDefault();
    }, c = (u) => {
      u.preventDefault(), l.classList.add("drag-active");
    }, h = (u) => {
      u.preventDefault(), l.classList.remove("drag-active");
    }, p = (u) => {
      var v;
      u.preventDefault(), l.classList.remove("drag-active"), (v = e == null ? void 0 : e.dragCallback) == null || v.call(e, u);
    };
    return l.addEventListener("dragover", a), l.addEventListener("dragenter", c), l.addEventListener("dragleave", h), l.addEventListener("drop", p), () => {
      l.removeEventListener("dragover", a), l.removeEventListener("dragenter", c), l.removeEventListener("dragleave", h), l.removeEventListener("drop", p);
    };
  }, r = (o) => new Promise((l, a) => {
    const c = t(o);
    c.style.display = "none";
    const h = setTimeout(() => {
      a(new Error("选择取消或超时")), document.body.removeChild(c);
    }, 3e4);
    c.onchange = (p) => {
      clearTimeout(h);
      const u = p.target.files;
      u != null && u.length ? l(u) : a(new Error("未选择文件")), document.body.removeChild(c);
    }, document.body.appendChild(c), c.click();
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
function jt(e = {}) {
  const { enabled: t = E(!0), message: n = "确定要离开此页面吗？未保存的更改可能会丢失。" } = e, r = typeof t == "boolean" ? E(t) : t, s = (i) => {
    if (r.value)
      return i.preventDefault(), i.returnValue = n, n;
  };
  return xe((i, o, l) => {
    if (r.value && !confirm(e.message || "确定要离开吗？"))
      return l(!1);
    l();
  }), J(() => {
    window.addEventListener("beforeunload", s);
  }), ye(() => {
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
const Re = {
  blurAmount: 5,
  duration: 1,
  thumbnail: ""
};
function R(e, t = {}) {
  const n = { ...Re, ...t };
  e.style.transition = `filter ${n.duration}s ease, opacity ${n.duration}s ease`, e.style.filter = `blur(${n.blurAmount}px)`, e.style.opacity = "0";
  const r = () => {
    e.style.backgroundImage = "none", e.offsetWidth, e.style.filter = "blur(0)", e.style.opacity = "1", e.removeEventListener("load", r), e.removeEventListener("error", s);
  }, s = () => {
    console.error("Image failed to load", e.src), e.removeEventListener("load", r), e.removeEventListener("error", s);
  };
  e.complete ? r() : (e.addEventListener("load", r), e.addEventListener("error", s)), n.thumbnail && (e.style.backgroundImage = `url(${n.thumbnail})`, e.style.backgroundSize = "cover", e.style.backgroundPosition = "center");
}
const Pe = {
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
}, De = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pe
}, Symbol.toStringTag, { value: "Module" })), Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Ae = {
  mounted: function(e) {
    e.style.cursor = "move", e.style.position = "absolute", e.onmousedown = function(t) {
      let n = t.pageX - e.offsetLeft, r = t.pageY - e.offsetTop;
      document.onmousemove = function(s) {
        let i = s.pageX - n, o = s.pageY - r, l = parseInt(window.getComputedStyle(e.parentNode).width) - parseInt(window.getComputedStyle(e).width), a = parseInt(window.getComputedStyle(e.parentNode).height) - parseInt(window.getComputedStyle(e).height);
        i < 0 ? i = 0 : i > l && (i = l), o < 0 ? o = 0 : o > a && (o = a), e.style.left = i + "px", e.style.top = o + "px";
      }, document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
}, Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ae
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
}), ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Q
}, Symbol.toStringTag, { value: "Module" })), ze = {
  mounted(e, t) {
    e.style.position = "relative";
    const n = typeof t.value == "boolean" ? { value: t.value } : t.value || {}, r = n.delay || 50;
    let s = null;
    const i = () => {
      const o = _e(Q, {
        text: n.text,
        background: n.background,
        spinnerColor: n.spinnerColor,
        style: n.style || "loader-l13",
        visible: n.value ?? !0
      }), l = o.mount(document.createElement("div"));
      e._loadingInstance = l, e._loadingApp = o, e.appendChild(l.$el), K(() => {
        A(e, t);
      });
    };
    n.value && (s = window.setTimeout(() => {
      n.value && i();
    }, r)), e._loadingTimeoutId = s;
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
  var s, i, o;
  if (!e._loadingInstance) return;
  const n = typeof t.value == "boolean" ? t.value : ((s = t.value) == null ? void 0 : s.value) ?? !0;
  e.style.position = n ? "relative" : "";
  const r = e._loadingInstance.$el.parentElement;
  r && r.parentNode === e && r !== e.lastElementChild && e.appendChild(r), (o = (i = e._loadingInstance).setVisible) == null || o.call(i, n), e._loadingInstance.$el && (e._loadingInstance.$el.style.display = n ? "flex" : "none");
}
const Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ze
}, Symbol.toStringTag, { value: "Module" })), Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Be = {
  mounted(e, t) {
    var W, j;
    e.style.position = "absolute", e.style.userSelect = "none";
    const n = () => {
      var m;
      const f = document.createElement("div");
      return f.style.position = "absolute", f.style.pointerEvents = "none", f.style.border = "2px dashed #3498db", f.style.backgroundColor = "rgba(52, 152, 219, 0.1)", f.style.zIndex = "1000", f.style.display = "none", (m = e.parentElement) == null || m.appendChild(f), f;
    }, r = (f) => {
      const m = document.createElement("div");
      return m.className = `resize-handle resize-handle-${f}`, m.style.position = "absolute", m.style.width = "10px", m.style.height = "10px", m.style.backgroundColor = "#fff", m.style.opacity = "0", m.style.border = "1px solid #333", m.style.zIndex = "100", m.style.touchAction = "none", f.includes("top") && (m.style.top = "-5px"), f.includes("bottom") && (m.style.bottom = "-5px"), f.includes("left") && (m.style.left = "-5px"), f.includes("right") && (m.style.right = "-5px"), f === "top-left" && (m.style.cursor = "nwse-resize"), f === "top-right" && (m.style.cursor = "nesw-resize"), f === "bottom-left" && (m.style.cursor = "nesw-resize"), f === "bottom-right" && (m.style.cursor = "nwse-resize"), e.appendChild(m), m;
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
    const o = ((W = t.value) == null ? void 0 : W.minWidth) ?? 50, l = ((j = t.value) == null ? void 0 : j.minHeight) ?? 50;
    let a = !1, c = null, h = 0, p = 0, u = 0, v = 0, d = 0, y = 0, g = 0, _ = 0, S = 0, w = 0;
    const I = () => ({
      left: 0,
      top: 0,
      right: i.clientWidth,
      bottom: i.clientHeight
    }), de = () => {
      if (!e.__dragPreview) return;
      const f = e.__dragPreview;
      f.style.display = "block", f.style.left = `${S}px`, f.style.top = `${w}px`, f.style.width = `${g}px`, f.style.height = `${_}px`;
    }, fe = () => {
      e.__dragPreview && (e.__dragPreview.style.display = "none");
    }, he = (f, m) => {
      f.preventDefault(), f.stopPropagation(), a = !0, c = m, h = f.clientX, p = f.clientY, u = e.offsetWidth, v = e.offsetHeight, d = e.offsetLeft, y = e.offsetTop, g = u, _ = v, S = d, w = y, document.addEventListener("mousemove", U), document.addEventListener("mouseup", H);
    }, U = (f) => {
      if (!a || !c) return;
      const m = f.clientX - h, T = f.clientY - p, x = I();
      switch (c) {
        case "top-left":
          g = Math.max(o, u - m), _ = Math.max(l, v - T), S = d + (u - g), w = y + (v - _);
          break;
        case "top-right":
          g = Math.max(o, u + m), _ = Math.max(l, v - T), w = y + (v - _);
          break;
        case "bottom-left":
          g = Math.max(o, u - m), _ = Math.max(l, v + T), S = d + (u - g);
          break;
        case "bottom-right":
          g = Math.max(o, u + m), _ = Math.max(l, v + T);
          break;
      }
      S < x.left && (S = x.left, c.includes("left") && (g = u + d - x.left)), w < x.top && (w = x.top, c.includes("top") && (_ = v + y - x.top)), S + g > x.right && (g = x.right - S), w + _ > x.bottom && (_ = x.bottom - w), g = Math.max(o, g), _ = Math.max(l, _), de();
    }, H = () => {
      a && (a = !1, e.style.width = `${g}px`, e.style.height = `${_}px`, e.style.left = `${S}px`, e.style.top = `${w}px`, fe(), document.removeEventListener("mousemove", U), document.removeEventListener("mouseup", H));
    };
    s.forEach((f, m) => {
      var Y;
      const T = ["top-left", "top-right", "bottom-left", "bottom-right"], x = (me) => he(me, T[m]);
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
}, Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Be
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
}, He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_PLUGIN_OPTIONS: ee
}, Symbol.toStringTag, { value: "Module" })), te = ({
  borderTopLeftRadius: e,
  borderTopRightRadius: t,
  borderBottomLeftRadius: n,
  borderBottomRightRadius: r
}) => {
  const s = document.createElement("div");
  return s.style.top = "0", s.style.left = "0", s.style.width = "100%", s.style.height = "100%", s.style.position = "absolute", s.style.borderRadius = `${e} ${t} ${r} ${n}`, s.style.overflow = "hidden", s.style.pointerEvents = "none", s.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", s;
}, We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: te
}, Symbol.toStringTag, { value: "Module" })), ne = (e, t, n, r, s) => {
  const i = document.createElement("div");
  return i.style.position = "absolute", i.style.width = r.center ? `${Math.sqrt(s.width * s.width + s.height * s.height)}px` : `${n * 2}px`, i.style.height = r.center ? `${Math.sqrt(s.width * s.width + s.height * s.height)}px` : `${n * 2}px`, i.style.top = r.center ? `${s.height / 2}px` : `${t}px`, i.style.left = r.center ? `${s.width / 2}px` : `${e}px`, i.style.background = r.color, i.style.borderRadius = "50%", i.style.opacity = `${r.initialOpacity}`, i.style.transform = "translate(-50%,-50%) scale(0)", i.style.transition = `transform ${r.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${r.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, i;
}, je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: ne
}, Symbol.toStringTag, { value: "Module" }));
function M(e, t, n, r) {
  const s = e - n, i = t - r;
  return Math.sqrt(s * s + i * i);
}
function re(e, { width: t, height: n, left: r, top: s }) {
  const i = e.clientX - r, o = e.clientY - s, l = M(i, o, 0, 0), a = M(i, o, t, 0), c = M(i, o, 0, n), h = M(i, o, t, n), p = Math.max(l, a, c, h);
  return {
    x: i,
    y: o,
    diameter: p
  };
}
const Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: re,
  getPythagoreanDistance: M
}, Symbol.toStringTag, { value: "Module" })), B = "vRippleCountInternal";
function se(e, t) {
  e.dataset[B] = t.toString();
}
function D(e) {
  return parseInt(e.dataset[B] ?? "0", 10);
}
function ie(e) {
  const t = D(e);
  se(e, t + 1);
}
function oe(e) {
  const t = D(e);
  se(e, t - 1);
}
function ae(e) {
  delete e.dataset[B];
}
const Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: oe,
  deleteRippleCount: ae,
  getRippleCount: D,
  incrementRippleCount: ie
}, Symbol.toStringTag, { value: "Module" })), Xe = 1.05, O = /* @__PURE__ */ new WeakMap(), Ge = { ...ee }, qe = (e, t, n) => {
  const r = t.getBoundingClientRect(), s = window.getComputedStyle(t), { diameter: i, x: o, y: l } = re(e, r), a = te(s), c = ne(o, l, i * Xe, n, r);
  let h = "", p = !1, u;
  function v() {
    c.style.transition = "opacity 120ms ease in out", c.style.opacity = "0", setTimeout(() => {
      a.remove(), oe(t), D(t) === 0 && (ae(t), t.style.position = h);
    }, 100);
  }
  function d(g) {
    typeof g < "u" && document.removeEventListener("pointerup", d), p ? v() : p = !0;
  }
  function y() {
    clearTimeout(u), a.remove(), document.removeEventListener("pointerup", d), document.removeEventListener("pointercancel", d), document.removeEventListener("pointercancel", y);
  }
  ie(t), s.position === "static" && (t.style.position && (h = t.style.position), t.style.position = "relative"), a.appendChild(c), t.appendChild(a), document.addEventListener("pointerup", d), document.addEventListener("pointercancel", d), u = setTimeout(() => {
    document.removeEventListener("pointercancel", y), c.style.transform = "translate(-50%,-50%) scale(1)", c.style.opacity = `${n.finalOpacity}`, setTimeout(() => d(), n.duration);
  }, n.delay), document.addEventListener("pointercancel", y);
}, Ze = {
  mounted(e, t) {
    O.set(e, t.value ?? {}), e.addEventListener("pointerdown", (n) => {
      var s;
      const r = O.get(e);
      (s = t.value) != null && s.disabled || r !== !1 && qe(n, e, {
        ...Ge,
        ...r
      });
    });
  },
  updated(e, t) {
    O.set(e, t.value ?? {});
  }
}, Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ze
}, Symbol.toStringTag, { value: "Module" })), X = 50, G = 500, le = /* @__PURE__ */ new WeakMap(), Ke = (e) => {
  const t = new IntersectionObserver((n) => {
    for (const r of n)
      if (r.isIntersecting) {
        const s = le.get(r.target);
        s && s.play(), t.unobserve(e);
      }
  });
  t.observe(e);
}, Qe = (e, t) => e.getBoundingClientRect().top - t > window.innerHeight, et = {
  mounted(e, t) {
    let n = X, r = G;
    if (typeof t.value == "number" ? n = t.value : t.value && typeof t.value == "object" && (n = t.value.distance ?? X, r = t.value.duration ?? G), !Qe(e, n))
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
    s.pause(), le.set(e, s), Ke(e);
  }
}, tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: et
}, Symbol.toStringTag, { value: "Module" })), q = /* @__PURE__ */ Object.assign({ "./blur-fade-in/index.ts": De, "./blur-fade-in/types.ts": Ie, "./draggable/index.ts": Oe, "./loading/index.ts": Fe, "./loading/loading.ts": ke, "./loading/types.ts": Ne, "./resize/index.ts": Ue, "./ripple/index.ts": Je, "./ripple/options.ts": He, "./ripple/utils/create-container-element.ts": We, "./ripple/utils/create-ripple-element.ts": je, "./ripple/utils/get-element-position-utils.ts": Ye, "./ripple/utils/ripple-count.ts": Ve, "./slide-in/index.ts": tt }), Yt = {
  install: function(e) {
    for (const t in q) {
      const n = q[t].default;
      if (!n) continue;
      const r = t.split("/")[1];
      t.split("/")[2] === "index.ts" && e.directive(r, n);
    }
  }
}, nt = "C", rt = "cl", F = (e) => `${rt}__${e}`, ce = (e) => `${nt}${e || ""}`, k = N({
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
    const { type: e, size: t, color: n, name: r, spin: s } = this, i = F(`${e}-icon`), o = s ? F(`${e}-icon-spin`) : "";
    return e === "svg" ? $(
      "svg",
      {
        class: [i, o],
        style: {
          width: `${t}px`,
          height: `${t}px`
        }
      },
      {
        default: () => [$("use", { "xlink:href": `#${r}` })]
      }
    ) : $("i", {
      class: ["ri-" + r, i, o],
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
    const r = F("segmented"), s = E(null), i = E(null), o = E(-1), l = E(!1), a = V(() => e.options.findIndex((d) => d.value === e.value)), c = (d) => {
      e.disabled || e.value !== d && (t("update:value", d), t("change", d));
    }, h = async (d = !1) => {
      if (!s.value || !i.value) return;
      await K();
      const y = s.value, g = i.value, _ = y.parentElement;
      if (!_) return;
      const S = _.getBoundingClientRect(), w = y.getBoundingClientRect();
      if (d && (g.style.transition = "none"), g.style.width = `${w.width}px`, g.style.height = `${w.height}px`, g.style.left = `${w.left - S.left}px`, !d && o.value !== -1 && a.value !== -1) {
        const I = a.value > o.value ? "right" : "left";
        g.classList.remove(`${r}-thumb-left`, `${r}-thumb-right`), g.classList.add(`${r}-thumb-${I}`);
      }
      d && requestAnimationFrame(() => {
        g.style.transition = "";
      }), o.value = a.value;
    };
    J(() => {
      l.value = !0, h(!0);
    }), be(() => e.value, () => h());
    const p = V(() => ({
      [r]: !0,
      [`${r}-block`]: e.block,
      [`${r}-disabled`]: e.disabled,
      [`${r}-${e.size}`]: !0
    })), u = (d) => ({
      [`${r}-item`]: !0,
      [`${r}-item-selected`]: e.value === d.value,
      [`${r}-item-disabled`]: d.disabled
    }), v = (d) => {
      const y = `label-${d.value}`;
      return n[y] ? n[y]({
        option: d
      }) : L(we, null, [d.icon && L(ue, {
        class: "mr-5",
        name: d.icon
      }, null), L("span", {
        class: `${r}-item-label`
      }, [d.label])]);
    };
    return () => L("div", {
      class: p.value
    }, [L("div", {
      ref: i,
      class: `${r}-thumb`
    }, null), e.options.map((d, y) => L("div", {
      ref: e.value === d.value ? s : null,
      key: d.value,
      class: u(d),
      onClick: () => !d.disabled && c(d.value),
      "data-index": y
    }, [v(d)]))]);
  }
}), st = Object.assign(z, {
  install(e) {
    e.component(ce(z.name), z);
  }
}), Z = {
  Icon: ue,
  Segmented: st
}, Vt = (e) => {
  Object.keys(Z).forEach((t) => {
    e.use(Z[t]);
  });
};
export {
  zt as BaseCanvas,
  Le as BaseGL,
  ue as CIcon,
  st as CSegmented,
  Ft as Emitter,
  Bt as Random,
  Vt as RegisterComponents,
  Yt as RegisterDirectives,
  Nt as TimeDiff,
  Ot as addEventListen,
  Se as copyToClipboard,
  At as copyToClipboardWithCallback,
  Lt as isAlpha,
  $t as isAlphaNum,
  Ct as isAlphaNumUnderline,
  ht as isArray,
  It as isBlank,
  mt as isBoolean,
  Tt as isChinese,
  _t as isDate,
  xt as isEmail,
  ft as isFunction,
  Et as isIdCard,
  Rt as isLower,
  pt as isNull,
  bt as isNullOrUndefined,
  ut as isNumber,
  dt as isObject,
  St as isPhone,
  Dt as isPort,
  yt as isPromise,
  vt as isRegExp,
  ct as isString,
  Pt as isTel,
  gt as isUndefined,
  Mt as isUpper,
  wt as isUrl,
  P as objectUtils,
  kt as removeEventListen,
  Wt as useFileSelect,
  jt as useLeaveConfirm,
  Ht as useLoading,
  Ut as useTheme
};
