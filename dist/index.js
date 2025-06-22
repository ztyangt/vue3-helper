var me = Object.defineProperty;
var fe = (e, t, n) => t in e ? me(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var b = (e, t, n) => fe(e, typeof t != "symbol" ? t + "" : t, n);
import { useDark as pe } from "@vueuse/core";
import { ref as E, onMounted as q, onBeforeUnmount as ge, defineComponent as k, h as L, createApp as ve, nextTick as Z, computed as W, watch as ye, createVNode as $, Fragment as _e } from "vue";
import { onBeforeRouteLeave as be } from "vue-router";
const tt = (e) => typeof e == "string", nt = (e) => typeof e == "number", rt = (e) => typeof e == "object", st = (e) => typeof e == "function", it = (e) => Array.isArray(e), ot = (e) => typeof e == "boolean", at = (e) => e === null, lt = (e) => e === void 0, ct = (e) => e instanceof RegExp, ut = (e) => e instanceof Promise, dt = (e) => e instanceof Date, ht = (e) => e == null, mt = (e) => /^http[s]?:\/\/.*/.test(e), ft = (e) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e), pt = (e) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(e), gt = (e) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e), vt = (e) => /^[\u4e00-\u9fa5]{0,}$/.test(e), yt = (e) => /^[a-zA-Z]+$/.test(e), _t = (e) => /^[A-Za-z0-9]+$/.test(e), bt = (e) => /^[A-Za-z0-9_]+$/.test(e), wt = (e) => /^[A-Z]+$/.test(e), xt = (e) => /^[a-z]+$/.test(e), St = (e) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(e), Et = (e) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(e), Tt = (e) => e == null || e === "" || e === 0 || e === !1 || Array.isArray(e) && e.length === 0 || typeof e == "object" && Object.keys(e).length === 0;
async function we(e) {
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
function $t(e, t) {
  we(e).then(t).catch(() => t(!1));
}
function Lt(e, t, n, r = !1) {
  e.addEventListener && typeof e.addEventListener == "function" && e.addEventListener(t, n, r);
}
function Ct(e, t, n, r = !1) {
  e.removeEventListener && typeof e.removeEventListener == "function" && e.removeEventListener(t, n, r);
}
var xe = `#version 300 es

in vec4 a_Position;

void main(){
  gl_PointSize=10.;
  gl_Position=a_Position;
}`, Se = `#version 300 es
precision highp float;

out vec4 outColor;

void main(){
  outColor=vec4(1.,0.,0.,1.);
}`;
class Ee {
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
    this.gl = i, this.resizeCanvas(), this.program = this.initProgram(n.vertexShaderSource || xe, n.fragmentShaderSource || Se);
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
var Te = `#version 300 es

in vec4 a_Position;

void main(){
  gl_Position=a_Position;
}`;
class Mt extends Ee {
  // 控制渲染的标志
  constructor(n, r) {
    super(n, { vertexShaderSource: Te, fragmentShaderSource: r });
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
class Rt {
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
class Pt {
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
      const a = this.parseTimeRangeValue(s), u = n - Math.abs(a);
      if (o ? l < u : l <= u)
        return !1;
    }
    if (i !== void 0) {
      const a = this.parseTimeRangeValue(i), u = n + Math.abs(a);
      if (o ? l > u : l >= u)
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
    let u = s;
    switch (o.forEach((f) => {
      if (C[f]) {
        const g = u / C[f];
        a[f] = l ? Math.round(g) : g, u -= a[f] * C[f];
      }
    }), r.format) {
      case "object":
        return a;
      case "array":
        return o.map((c) => `${a[c]} ${c}${a[c] !== 1 ? "s" : ""}`);
      case "short":
        return o.filter((c) => a[c] > 0).map((c) => `${a[c]}${c[0]}`).join(" ");
      case "long":
        return o.filter((c) => a[c] > 0).map((c) => `${a[c]} ${c}${a[c] !== 1 ? "s" : ""}`).join(" ");
      case "full":
      default:
        const f = o.filter((c) => a[c] > 0).map((c) => `${a[c]} ${c}${a[c] !== 1 ? "s" : ""}`);
        if (f.length === 0) return "0秒";
        if (f.length === 1) return f[0];
        const g = f.pop();
        return `${f.join("、")}和${g}`;
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
      const u = Math.round(a / 7);
      return i < 0 ? `${u}周后` : `${u}周前`;
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
class It {
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
    for (let s = 0; s < t; s++)
      r += n.charAt(Math.floor(Math.random() * n.length));
    return r;
  }
}
const Dt = () => {
  const e = pe({
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
        const u = document.documentElement;
        l = u.classList.contains("dark"), u.classList.add(l ? "light" : "dark"), u.classList.remove(l ? "dark" : "light");
      });
      a.ready.then(() => {
        const u = [`circle(0px at ${s}px ${i}px)`, `circle(${o}px at ${s}px ${i}px)`];
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
      }), await a.finished, e.value = !e.value;
    } catch {
      e.value = !e.value;
    }
  } };
}, At = (e = !1) => {
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
}, zt = (e) => {
  const t = (o) => {
    const l = document.createElement("input");
    return l.type = "file", l.multiple = !!o.multiple, o.directory && (l.webkitdirectory = !0, l.mozdirectory = !0), o.accept && o.accept.length > 0 && (l.accept = o.accept.join(",")), l;
  }, n = () => {
    const { dragRef: o } = e || {};
    if (!(o != null && o.value)) return;
    const l = o.value, a = (c) => {
      c.preventDefault();
    }, u = (c) => {
      c.preventDefault(), l.classList.add("drag-active");
    }, f = (c) => {
      c.preventDefault(), l.classList.remove("drag-active");
    }, g = (c) => {
      var _;
      c.preventDefault(), l.classList.remove("drag-active"), (_ = e == null ? void 0 : e.dragCallback) == null || _.call(e, c);
    };
    return l.addEventListener("dragover", a), l.addEventListener("dragenter", u), l.addEventListener("dragleave", f), l.addEventListener("drop", g), () => {
      l.removeEventListener("dragover", a), l.removeEventListener("dragenter", u), l.removeEventListener("dragleave", f), l.removeEventListener("drop", g);
    };
  }, r = (o) => new Promise((l, a) => {
    const u = t(o);
    u.style.display = "none";
    const f = setTimeout(() => {
      a(new Error("选择取消或超时")), document.body.removeChild(u);
    }, 3e4);
    u.onchange = (g) => {
      clearTimeout(f);
      const c = g.target.files;
      c != null && c.length ? l(c) : a(new Error("未选择文件")), document.body.removeChild(u);
    }, document.body.appendChild(u), u.click();
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
function Ot(e = {}) {
  const { enabled: t = E(!0), message: n = "确定要离开此页面吗？未保存的更改可能会丢失。" } = e, r = typeof t == "boolean" ? E(t) : t, s = (i) => {
    if (r.value)
      return i.preventDefault(), i.returnValue = n, n;
  };
  return be((i, o, l) => {
    if (r.value && !confirm(e.message || "确定要离开吗？"))
      return l(!1);
    l();
  }), q(() => {
    window.addEventListener("beforeunload", s);
  }), ge(() => {
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
const $e = {
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
}, Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $e
}, Symbol.toStringTag, { value: "Module" })), J = k({
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
}), Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: J
}, Symbol.toStringTag, { value: "Module" })), Me = {
  mounted(e, t) {
    e.style.position = "relative";
    const n = typeof t.value == "boolean" ? { value: t.value } : t.value || {}, r = n.delay || 300;
    let s = null;
    const i = () => {
      const o = ve(J, {
        text: n.text,
        background: n.background,
        spinnerColor: n.spinnerColor,
        style: n.style || "loader-l13",
        visible: n.value ?? !0
      }), l = o.mount(document.createElement("div"));
      e._loadingInstance = l, e._loadingApp = o, e.appendChild(l.$el), Z(() => {
        I(e, t);
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
        I(e, t);
        return;
      }
      const r = n.delay || 0;
      e._loadingTimeoutId = window.setTimeout(() => {
        n.value && I(e, t);
      }, r);
    }
  },
  unmounted(e) {
    var t, n, r;
    e._loadingTimeoutId && clearTimeout(e._loadingTimeoutId), (t = e._loadingApp) == null || t.unmount(), (r = (n = e._loadingInstance) == null ? void 0 : n.$el) == null || r.remove(), e._loadingInstance = void 0, e._loadingApp = void 0;
  }
};
function I(e, t) {
  var s, i, o;
  if (!e._loadingInstance) return;
  const n = typeof t.value == "boolean" ? t.value : ((s = t.value) == null ? void 0 : s.value) ?? !0;
  e.style.position = n ? "relative" : "";
  const r = e._loadingInstance.$el.parentElement;
  r && r.parentNode === e && r !== e.lastElementChild && e.appendChild(r), (o = (i = e._loadingInstance).setVisible) == null || o.call(i, n), e._loadingInstance.$el && (e._loadingInstance.$el.style.display = n ? "flex" : "none");
}
const Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Ie = {
  mounted(e, t) {
    var U, B;
    e.style.position = "absolute", e.style.userSelect = "none";
    const n = () => {
      var m;
      const h = document.createElement("div");
      return h.style.position = "absolute", h.style.pointerEvents = "none", h.style.border = "2px dashed #3498db", h.style.backgroundColor = "rgba(52, 152, 219, 0.1)", h.style.zIndex = "1000", h.style.display = "none", (m = e.parentElement) == null || m.appendChild(h), h;
    }, r = (h) => {
      const m = document.createElement("div");
      return m.className = `resize-handle resize-handle-${h}`, m.style.position = "absolute", m.style.width = "10px", m.style.height = "10px", m.style.backgroundColor = "#fff", m.style.opacity = "0", m.style.border = "1px solid #333", m.style.zIndex = "100", m.style.touchAction = "none", h.includes("top") && (m.style.top = "-5px"), h.includes("bottom") && (m.style.bottom = "-5px"), h.includes("left") && (m.style.left = "-5px"), h.includes("right") && (m.style.right = "-5px"), h === "top-left" && (m.style.cursor = "nwse-resize"), h === "top-right" && (m.style.cursor = "nesw-resize"), h === "bottom-left" && (m.style.cursor = "nesw-resize"), h === "bottom-right" && (m.style.cursor = "nwse-resize"), e.appendChild(m), m;
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
    const o = ((U = t.value) == null ? void 0 : U.minWidth) ?? 50, l = ((B = t.value) == null ? void 0 : B.minHeight) ?? 50;
    let a = !1, u = null, f = 0, g = 0, c = 0, _ = 0, d = 0, v = 0, p = 0, y = 0, S = 0, w = 0;
    const P = () => ({
      left: 0,
      top: 0,
      right: i.clientWidth,
      bottom: i.clientHeight
    }), ce = () => {
      if (!e.__dragPreview) return;
      const h = e.__dragPreview;
      h.style.display = "block", h.style.left = `${S}px`, h.style.top = `${w}px`, h.style.width = `${p}px`, h.style.height = `${y}px`;
    }, ue = () => {
      e.__dragPreview && (e.__dragPreview.style.display = "none");
    }, de = (h, m) => {
      h.preventDefault(), h.stopPropagation(), a = !0, u = m, f = h.clientX, g = h.clientY, c = e.offsetWidth, _ = e.offsetHeight, d = e.offsetLeft, v = e.offsetTop, p = c, y = _, S = d, w = v, document.addEventListener("mousemove", j), document.addEventListener("mouseup", N);
    }, j = (h) => {
      if (!a || !u) return;
      const m = h.clientX - f, T = h.clientY - g, x = P();
      switch (u) {
        case "top-left":
          p = Math.max(o, c - m), y = Math.max(l, _ - T), S = d + (c - p), w = v + (_ - y);
          break;
        case "top-right":
          p = Math.max(o, c + m), y = Math.max(l, _ - T), w = v + (_ - y);
          break;
        case "bottom-left":
          p = Math.max(o, c - m), y = Math.max(l, _ + T), S = d + (c - p);
          break;
        case "bottom-right":
          p = Math.max(o, c + m), y = Math.max(l, _ + T);
          break;
      }
      S < x.left && (S = x.left, u.includes("left") && (p = c + d - x.left)), w < x.top && (w = x.top, u.includes("top") && (y = _ + v - x.top)), S + p > x.right && (p = x.right - S), w + y > x.bottom && (y = x.bottom - w), p = Math.max(o, p), y = Math.max(l, y), ce();
    }, N = () => {
      a && (a = !1, e.style.width = `${p}px`, e.style.height = `${y}px`, e.style.left = `${S}px`, e.style.top = `${w}px`, ue(), document.removeEventListener("mousemove", j), document.removeEventListener("mouseup", N));
    };
    s.forEach((h, m) => {
      var H;
      const T = ["top-left", "top-right", "bottom-left", "bottom-right"], x = (he) => de(he, T[m]);
      h.addEventListener("mousedown", x), (H = e.__resizeListeners) == null || H.push({ mousedown: x });
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
}, De = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ie
}, Symbol.toStringTag, { value: "Module" })), K = {
  directive: "ripple",
  color: "var(--ripple-color)",
  initialOpacity: 0.1,
  finalOpacity: 0.05,
  duration: 350,
  easing: "ease-out",
  delay: 60,
  disabled: !1,
  center: !1
}, Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_PLUGIN_OPTIONS: K
}, Symbol.toStringTag, { value: "Module" })), Q = ({
  borderTopLeftRadius: e,
  borderTopRightRadius: t,
  borderBottomLeftRadius: n,
  borderBottomRightRadius: r
}) => {
  const s = document.createElement("div");
  return s.style.top = "0", s.style.left = "0", s.style.width = "100%", s.style.height = "100%", s.style.position = "absolute", s.style.borderRadius = `${e} ${t} ${r} ${n}`, s.style.overflow = "hidden", s.style.pointerEvents = "none", s.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", s;
}, ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: Q
}, Symbol.toStringTag, { value: "Module" })), ee = (e, t, n, r, s) => {
  const i = document.createElement("div");
  return i.style.position = "absolute", i.style.width = r.center ? `${Math.sqrt(s.width * s.width + s.height * s.height)}px` : `${n * 2}px`, i.style.height = r.center ? `${Math.sqrt(s.width * s.width + s.height * s.height)}px` : `${n * 2}px`, i.style.top = r.center ? `${s.height / 2}px` : `${t}px`, i.style.left = r.center ? `${s.width / 2}px` : `${e}px`, i.style.background = r.color, i.style.borderRadius = "50%", i.style.opacity = `${r.initialOpacity}`, i.style.transform = "translate(-50%,-50%) scale(0)", i.style.transition = `transform ${r.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${r.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, i;
}, Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: ee
}, Symbol.toStringTag, { value: "Module" }));
function M(e, t, n, r) {
  const s = e - n, i = t - r;
  return Math.sqrt(s * s + i * i);
}
function te(e, { width: t, height: n, left: r, top: s }) {
  const i = e.clientX - r, o = e.clientY - s, l = M(i, o, 0, 0), a = M(i, o, t, 0), u = M(i, o, 0, n), f = M(i, o, t, n), g = Math.max(l, a, u, f);
  return {
    x: i,
    y: o,
    diameter: g
  };
}
const ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: te,
  getPythagoreanDistance: M
}, Symbol.toStringTag, { value: "Module" })), F = "vRippleCountInternal";
function ne(e, t) {
  e.dataset[F] = t.toString();
}
function R(e) {
  return parseInt(e.dataset[F] ?? "0", 10);
}
function re(e) {
  const t = R(e);
  ne(e, t + 1);
}
function se(e) {
  const t = R(e);
  ne(e, t - 1);
}
function ie(e) {
  delete e.dataset[F];
}
const Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: se,
  deleteRippleCount: ie,
  getRippleCount: R,
  incrementRippleCount: re
}, Symbol.toStringTag, { value: "Module" })), je = 1.05, D = /* @__PURE__ */ new WeakMap(), Ne = { ...K }, Ue = (e, t, n) => {
  const r = t.getBoundingClientRect(), s = window.getComputedStyle(t), { diameter: i, x: o, y: l } = te(e, r), a = Q(s), u = ee(o, l, i * je, n, r);
  let f = "", g = !1, c;
  function _() {
    u.style.transition = "opacity 120ms ease in out", u.style.opacity = "0", setTimeout(() => {
      a.remove(), se(t), R(t) === 0 && (ie(t), t.style.position = f);
    }, 100);
  }
  function d(p) {
    typeof p < "u" && document.removeEventListener("pointerup", d), g ? _() : g = !0;
  }
  function v() {
    clearTimeout(c), a.remove(), document.removeEventListener("pointerup", d), document.removeEventListener("pointercancel", d), document.removeEventListener("pointercancel", v);
  }
  re(t), s.position === "static" && (t.style.position && (f = t.style.position), t.style.position = "relative"), a.appendChild(u), t.appendChild(a), document.addEventListener("pointerup", d), document.addEventListener("pointercancel", d), c = setTimeout(() => {
    document.removeEventListener("pointercancel", v), u.style.transform = "translate(-50%,-50%) scale(1)", u.style.opacity = `${n.finalOpacity}`, setTimeout(() => d(), n.duration);
  }, n.delay), document.addEventListener("pointercancel", v);
}, Be = {
  mounted(e, t) {
    D.set(e, t.value ?? {}), e.addEventListener("pointerdown", (n) => {
      var s;
      const r = D.get(e);
      (s = t.value) != null && s.disabled || r !== !1 && Ue(n, e, {
        ...Ne,
        ...r
      });
    });
  },
  updated(e, t) {
    D.set(e, t.value ?? {});
  }
}, He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Be
}, Symbol.toStringTag, { value: "Module" })), Y = 50, X = 500, oe = /* @__PURE__ */ new WeakMap(), We = (e) => {
  const t = new IntersectionObserver((n) => {
    for (const r of n)
      if (r.isIntersecting) {
        const s = oe.get(r.target);
        s && s.play(), t.unobserve(e);
      }
  });
  t.observe(e);
}, Ye = (e, t) => e.getBoundingClientRect().top - t > window.innerHeight, Xe = {
  mounted(e, t) {
    let n = Y, r = X;
    if (typeof t.value == "number" ? n = t.value : t.value && typeof t.value == "object" && (n = t.value.distance ?? Y, r = t.value.duration ?? X), !Ye(e, n))
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
    s.pause(), oe.set(e, s), We(e);
  }
}, Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xe
}, Symbol.toStringTag, { value: "Module" })), V = /* @__PURE__ */ Object.assign({ "./draggable/index.ts": Le, "./loading/index.ts": Re, "./loading/loading.ts": Ce, "./loading/types.ts": Pe, "./resize/index.ts": De, "./ripple/index.ts": He, "./ripple/options.ts": Ae, "./ripple/utils/create-container-element.ts": ze, "./ripple/utils/create-ripple-element.ts": Oe, "./ripple/utils/get-element-position-utils.ts": ke, "./ripple/utils/ripple-count.ts": Fe, "./slide-in/index.ts": Ve }), kt = {
  install: function(e) {
    for (const t in V) {
      const n = V[t].default;
      if (!n) continue;
      const r = t.split("/")[1];
      t.split("/")[2] === "index.ts" && e.directive(r, n);
    }
  }
}, Ge = "C", qe = "cl", O = (e) => `${qe}__${e}`, ae = (e) => `${Ge}${e || ""}`, A = k({
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
    const { type: e, size: t, color: n, name: r, spin: s } = this, i = O(`${e}-icon`), o = s ? O(`${e}-icon-spin`) : "";
    return e === "svg" ? L(
      "svg",
      {
        class: [i, o],
        style: {
          width: `${t}px`,
          height: `${t}px`
        }
      },
      {
        default: () => [L("use", { "xlink:href": `#${r}` })]
      }
    ) : L("i", {
      class: ["ri-" + r, i, o],
      style: {
        fontSize: `${t}px`,
        color: n
      }
    });
  }
}), le = Object.assign(A, {
  install(e) {
    e.component(ae(A.name), A);
  }
}), z = /* @__PURE__ */ k({
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
    const r = O("segmented"), s = E(null), i = E(null), o = E(-1), l = E(!1), a = W(() => e.options.findIndex((d) => d.value === e.value)), u = (d) => {
      e.disabled || e.value !== d && (t("update:value", d), t("change", d));
    }, f = async (d = !1) => {
      if (!s.value || !i.value) return;
      await Z();
      const v = s.value, p = i.value, y = v.parentElement;
      if (!y) return;
      const S = y.getBoundingClientRect(), w = v.getBoundingClientRect();
      if (d && (p.style.transition = "none"), p.style.width = `${w.width}px`, p.style.height = `${w.height}px`, p.style.left = `${w.left - S.left}px`, !d && o.value !== -1 && a.value !== -1) {
        const P = a.value > o.value ? "right" : "left";
        p.classList.remove(`${r}-thumb-left`, `${r}-thumb-right`), p.classList.add(`${r}-thumb-${P}`);
      }
      d && requestAnimationFrame(() => {
        p.style.transition = "";
      }), o.value = a.value;
    };
    q(() => {
      l.value = !0, f(!0);
    }), ye(() => e.value, () => f());
    const g = W(() => ({
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
      }) : $(_e, null, [d.icon && $(le, {
        class: "mr-5",
        name: d.icon
      }, null), $("span", {
        class: `${r}-item-label`
      }, [d.label])]);
    };
    return () => $("div", {
      class: g.value
    }, [$("div", {
      ref: i,
      class: `${r}-thumb`
    }, null), e.options.map((d, v) => $("div", {
      ref: e.value === d.value ? s : null,
      key: d.value,
      class: c(d),
      onClick: () => !d.disabled && u(d.value),
      "data-index": v
    }, [_(d)]))]);
  }
}), Ze = Object.assign(z, {
  install(e) {
    e.component(ae(z.name), z);
  }
}), G = {
  Icon: le,
  Segmented: Ze
}, Ft = (e) => {
  Object.keys(G).forEach((t) => {
    e.use(G[t]);
  });
};
export {
  Mt as BaseCanvas,
  Ee as BaseGL,
  le as CIcon,
  Ze as CSegmented,
  Rt as Emitter,
  It as Random,
  Ft as RegisterComponents,
  kt as RegisterDirectives,
  Pt as TimeDiff,
  Lt as addEventListen,
  we as copyToClipboard,
  $t as copyToClipboardWithCallback,
  yt as isAlpha,
  _t as isAlphaNum,
  bt as isAlphaNumUnderline,
  it as isArray,
  Tt as isBlank,
  ot as isBoolean,
  vt as isChinese,
  dt as isDate,
  ft as isEmail,
  st as isFunction,
  gt as isIdCard,
  xt as isLower,
  at as isNull,
  ht as isNullOrUndefined,
  nt as isNumber,
  rt as isObject,
  pt as isPhone,
  Et as isPort,
  ut as isPromise,
  ct as isRegExp,
  tt as isString,
  St as isTel,
  lt as isUndefined,
  wt as isUpper,
  mt as isUrl,
  Ct as removeEventListen,
  zt as useFileSelect,
  Ot as useLeaveConfirm,
  At as useLoading,
  Dt as useTheme
};
