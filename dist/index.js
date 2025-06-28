var me = Object.defineProperty;
var pe = (t, e, n) => e in t ? me(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var w = (t, e, n) => pe(t, typeof e != "symbol" ? e + "" : e, n);
import { useDark as ge } from "@vueuse/core";
import { ref as E, onMounted as Z, onBeforeUnmount as ve, defineComponent as F, h as C, createApp as ye, nextTick as J, computed as X, watch as _e, createVNode as $, Fragment as we } from "vue";
import { onBeforeRouteLeave as be } from "vue-router";
const nt = (t) => typeof t == "string", rt = (t) => typeof t == "number", it = (t) => typeof t == "object", st = (t) => typeof t == "function", at = (t) => Array.isArray(t), ot = (t) => typeof t == "boolean", lt = (t) => t === null, ct = (t) => t === void 0, ut = (t) => t instanceof RegExp, dt = (t) => t instanceof Promise, ht = (t) => t instanceof Date, ft = (t) => t == null, mt = (t) => /^http[s]?:\/\/.*/.test(t), pt = (t) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(t), gt = (t) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(t), vt = (t) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(t), yt = (t) => /^[\u4e00-\u9fa5]{0,}$/.test(t), _t = (t) => /^[a-zA-Z]+$/.test(t), wt = (t) => /^[A-Za-z0-9]+$/.test(t), bt = (t) => /^[A-Za-z0-9_]+$/.test(t), xt = (t) => /^[A-Z]+$/.test(t), St = (t) => /^[a-z]+$/.test(t), Et = (t) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(t), Tt = (t) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(t), $t = (t) => t == null || t === "" || t === 0 || t === !1 || Array.isArray(t) && t.length === 0 || typeof t == "object" && Object.keys(t).length === 0;
async function xe(t) {
  try {
    if (navigator.clipboard && window.isSecureContext)
      return await navigator.clipboard.writeText(t), !0;
    const e = document.createElement("textarea");
    e.value = t, e.style.position = "fixed", e.style.left = "-9999px", e.style.top = "0", e.style.opacity = "0", document.body.appendChild(e), e.select();
    let n = !1;
    try {
      n = document.execCommand("copy");
    } catch (r) {
      console.warn("Copy to clipboard failed:", r);
    }
    return document.body.removeChild(e), n;
  } catch (e) {
    return console.error("Copy to clipboard failed:", e), !1;
  }
}
function Ct(t, e) {
  xe(t).then(e).catch(() => e(!1));
}
function Lt(t, e, n, r = !1) {
  t.addEventListener && typeof t.addEventListener == "function" && t.addEventListener(e, n, r);
}
function Rt(t, e, n, r = !1) {
  t.removeEventListener && typeof t.removeEventListener == "function" && t.removeEventListener(e, n, r);
}
var Se = `#version 300 es

in vec4 a_Position;

void main(){
  gl_PointSize=10.;
  gl_Position=a_Position;
}`, Ee = `#version 300 es
precision highp float;

out vec4 outColor;

void main(){
  outColor=vec4(1.,0.,0.,1.);
}`;
class Te {
  constructor(e, n = {}) {
    w(this, "gl");
    w(this, "vertexShader");
    w(this, "fragmentShader");
    w(this, "program");
    w(this, "canvas");
    w(this, "compileError");
    let r = null;
    if (typeof e == "string" ? r = document.getElementById(e) : r = e, !r) throw new Error("Canvas not found");
    this.canvas = r;
    const i = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * i, this.canvas.height = this.canvas.clientHeight * i;
    const s = r.getContext("webgl2", { alpha: !1 });
    if (!s) throw new Error("WebGL2 not supported");
    this.gl = s, this.resizeCanvas(), this.program = this.initProgram(n.vertexShaderSource || Se, n.fragmentShaderSource || Ee);
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
    const r = this.gl.createShader(e);
    if (!r) throw new Error("Unable to create shader");
    if (this.gl.shaderSource(r, n), this.gl.compileShader(r), this.gl.getShaderParameter(r, this.gl.COMPILE_STATUS))
      return this.compileError = null, r;
    this.compileError = this.gl.getShaderInfoLog(r), this.gl.deleteShader(r);
  }
  // 初始化着色器程序
  initProgram(e, n) {
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, e), this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, n);
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
    const e = window.devicePixelRatio || 1, { clientWidth: n, clientHeight: r } = this.canvas;
    this.gl.canvas.width = n * e, this.gl.canvas.height = r * e;
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
class Mt extends Te {
  // 控制渲染的标志
  constructor(n, r) {
    super(n, { vertexShaderSource: $e, fragmentShaderSource: r });
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
class Pt {
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
    const r = (...i) => {
      n(...i), this.off(e, r);
    };
    this._onceListeners.set(n, r), this.on(e, r);
  }
  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给监听器的参数
   */
  emit(e, ...n) {
    const r = this._listeners[e];
    r && new Set(r).forEach((s) => s(...n));
  }
  /**
   * 移除事件监听器
   * @param eventName 事件名称
   * @param listener 要移除的回调函数（可选）
   */
  off(e, n) {
    if (this._listeners[e])
      if (n) {
        const r = this._onceListeners.get(n);
        r ? (this._listeners[e].delete(r), this._onceListeners.delete(n)) : this._listeners[e].delete(n);
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
const L = {
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
class Dt {
  /**
   * 计算时间差或格式化日期
   * @param date 目标日期
   * @param baseDate 基准日期（默认当前时间）
   * @param options 配置选项
   * @returns 时间差结果或格式化后的日期字符串
   */
  static diff(e, n = /* @__PURE__ */ new Date(), r = {}) {
    const i = this.parseDate(e), s = this.parseDate(n), a = s.getTime();
    return r.range && !this.checkRelativeTimeRange(i, a, r.range) ? this.formatOutOfRange(i, r.range.outOfRangeFormat) : this.calculateTimeDiff(i, s, r);
  }
  /**
   * 解析时间范围值为毫秒
   * @param value 时间范围值
   * @returns 毫秒数
   */
  static parseTimeRangeValue(e) {
    if (typeof e == "number") return e;
    const [n, r] = e.split(" "), i = parseFloat(n);
    if (isNaN(i) || !L[r])
      throw new Error(`无效的时间范围值: ${e}`);
    return i * L[r];
  }
  /**
   * 检查日期是否在相对时间范围内
   * @param targetDate 目标日期
   * @param now 当前时间戳（毫秒）
   * @param range 范围配置
   * @returns 是否在范围内
   */
  static checkRelativeTimeRange(e, n, r) {
    const { earliest: i, latest: s, inclusive: a = !0 } = r, l = e.getTime();
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
  static calculateTimeDiff(e, n, r) {
    const i = Math.abs(n.getTime() - e.getTime()), s = ["year", "month", "day", "hour", "minute", "second"], a = r.units || s, l = r.round !== !1, o = {
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
      if (L[m]) {
        const g = u / L[m];
        o[m] = l ? Math.round(g) : g, u -= o[m] * L[m];
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
  static formatOutOfRange(e, n) {
    return typeof n == "function" ? n(e) : n ? n.replace("{yyyy}", e.getFullYear().toString()).replace("{MM}", (e.getMonth() + 1).toString().padStart(2, "0")).replace("{dd}", e.getDate().toString().padStart(2, "0")).replace("{HH}", e.getHours().toString().padStart(2, "0")).replace("{mm}", e.getMinutes().toString().padStart(2, "0")).replace("{ss}", e.getSeconds().toString().padStart(2, "0")) : e.toLocaleString();
  }
  /**
   * 获取可读的时间差描述（中文）
   * @param date 目标日期
   * @param baseDate 基准日期（默认当前时间）
   * @returns 人类友好的时间差描述
   */
  static humanize(e, n) {
    const r = this.parseDate(e), i = this.parseDate(/* @__PURE__ */ new Date()).getTime();
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
  static parseDate(e) {
    if (e instanceof Date) return e;
    if (typeof e == "number") {
      const n = e.toString();
      if (n.length === 10)
        return new Date(e * 1e3);
      if (n.length === 13)
        return new Date(e);
      throw new Error("无效的时间戳格式：只支持10位（秒）或13位（毫秒）时间戳");
    }
    if (typeof e == "string") {
      const n = new Date(e);
      if (!isNaN(n.getTime())) return n;
      if (/^\d+$/.test(e))
        return this.parseDate(Number(e));
      throw new Error("无效的日期字符串格式");
    }
    throw new Error("不支持的日期类型");
  }
}
class At {
  /**
   * 生成随机字符串
   * @param length 字符串长度
   * @returns 随机字符串
   */
  static string(e) {
    const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let r = "";
    for (let i = 0; i < e; i++)
      r += n.charAt(Math.floor(Math.random() * n.length));
    return r;
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
    const r = {};
    for (const i in e)
      if (e.hasOwnProperty(i)) {
        const s = typeof e[i];
        s === "string" ? r[i] = this.string(10) : s === "number" ? r[i] = this.number(0, 100) : s === "boolean" ? r[i] = this.boolean() : Array.isArray(e[i]) && (r[i] = this.array(e[i], n));
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
    let r = "";
    for (let i = 0; i < e; i++)
      r += n.charAt(Math.floor(Math.random() * n.length));
    return r;
  }
}
class M {
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
    let r = Array.isArray(e) ? [] : {};
    n.set(e, r);
    for (let i in e)
      e.hasOwnProperty(i) && (r[i] = M.deepClone(e[i], n));
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
  static deepMerge(e, n, r = { overwrite: !0, cloneDeep: !0 }) {
    if (n == null)
      return e;
    if (e == null)
      return r.cloneDeep ? this.deepClone(n) : n;
    if (typeof e != "object" || typeof n != "object")
      return r.overwrite ? r.cloneDeep ? this.deepClone(n) : n : e;
    if (Array.isArray(n))
      return r.overwrite && (e = r.cloneDeep ? this.deepClone(n) : n), e;
    if (n instanceof Date || n instanceof RegExp)
      return r.overwrite && (e = r.cloneDeep ? this.deepClone(n) : n), e;
    for (const i in n)
      Object.prototype.hasOwnProperty.call(n, i) && (n[i] && typeof n[i] == "object" && e[i] && typeof e[i] == "object" && !(n[i] instanceof Date) && !(n[i] instanceof RegExp) && !Array.isArray(n[i]) ? this.deepMerge(e[i], n[i], r) : (r.overwrite || !(i in e)) && (e[i] = r.cloneDeep ? this.deepClone(n[i]) : n[i]));
    return e;
  }
  /**
   * @description 从对象中移除指定键
   * @param obj 对象
   * @param keys 键数组
   * @returns 移除指定键后的对象
   */
  static omit(e, n) {
    const r = M.deepClone(e);
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
  static pick(e, n) {
    const r = M.deepClone(e);
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
      const r = Object.keys(e), i = Object.keys(n);
      if (r.length !== i.length) return !1;
      for (const s of r)
        if (!i.includes(s) || !this.isEqual(e[s], n[s]))
          return !1;
      return !0;
    }
    return !1;
  }
}
const It = () => {
  const t = ge({
    selector: "html",
    attribute: "class",
    valueDark: "dark",
    valueLight: "light"
  });
  return { isDark: t, toggleTheme: async (n, r = !1) => {
    if (!r) {
      t.value = !t.value;
      return;
    }
    if (!n) {
      t.value = !t.value;
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
      }), await o.finished, t.value = !t.value;
    } catch {
      t.value = !t.value;
    }
  } };
}, Ot = (t = !1) => {
  const e = E(t);
  return {
    loading: e,
    setLoading: (i) => {
      e.value = i;
    },
    toggleLoading: () => {
      e.value = !e.value;
    }
  };
}, kt = (t) => {
  const e = (a) => {
    const l = document.createElement("input");
    return l.type = "file", l.multiple = !!a.multiple, a.directory && (l.webkitdirectory = !0, l.mozdirectory = !0), a.accept && a.accept.length > 0 && (l.accept = a.accept.join(",")), l;
  }, n = () => {
    const { dragRef: a } = t || {};
    if (!(a != null && a.value)) return;
    const l = a.value, o = (c) => {
      c.preventDefault();
    }, u = (c) => {
      c.preventDefault(), l.classList.add("drag-active");
    }, m = (c) => {
      c.preventDefault(), l.classList.remove("drag-active");
    }, g = (c) => {
      var _;
      c.preventDefault(), l.classList.remove("drag-active"), (_ = t == null ? void 0 : t.dragCallback) == null || _.call(t, c);
    };
    return l.addEventListener("dragover", o), l.addEventListener("dragenter", u), l.addEventListener("dragleave", m), l.addEventListener("drop", g), () => {
      l.removeEventListener("dragover", o), l.removeEventListener("dragenter", u), l.removeEventListener("dragleave", m), l.removeEventListener("drop", g);
    };
  }, r = (a) => new Promise((l, o) => {
    const u = e(a);
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
function zt(t = {}) {
  const { enabled: e = E(!0), message: n = "确定要离开此页面吗？未保存的更改可能会丢失。" } = t, r = typeof e == "boolean" ? E(e) : e, i = (s) => {
    if (r.value)
      return s.preventDefault(), s.returnValue = n, n;
  };
  return be((s, a, l) => {
    if (r.value && !confirm(t.message || "确定要离开吗？"))
      return l(!1);
    l();
  }), Z(() => {
    window.addEventListener("beforeunload", i);
  }), ve(() => {
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
  mounted: function(t) {
    t.style.cursor = "move", t.style.position = "absolute", t.onmousedown = function(e) {
      let n = e.pageX - t.offsetLeft, r = e.pageY - t.offsetTop;
      document.onmousemove = function(i) {
        let s = i.pageX - n, a = i.pageY - r, l = parseInt(window.getComputedStyle(t.parentNode).width) - parseInt(window.getComputedStyle(t).width), o = parseInt(window.getComputedStyle(t.parentNode).height) - parseInt(window.getComputedStyle(t).height);
        s < 0 ? s = 0 : s > l && (s = l), a < 0 ? a = 0 : a > o && (a = o), t.style.left = s + "px", t.style.top = a + "px";
      }, document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
}, Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ce
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
    return C(
      "div",
      {
        class: ["loading-overlay", { "show-loading-overlay": this.visible }]
      },
      [
        C("div", {
          class: this.styleClass || "loading-spinner",
          style: {
            borderTopColor: this.spinnerColor
          }
        }),
        this.text ? C("div", { class: "loading-text" }, this.text) : null
      ]
    );
  }
}), Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: K
}, Symbol.toStringTag, { value: "Module" })), Me = {
  mounted(t, e) {
    t.style.position = "relative";
    const n = typeof e.value == "boolean" ? { value: e.value } : e.value || {}, r = n.delay || 50;
    let i = null;
    const s = () => {
      const a = ye(K, {
        text: n.text,
        background: n.background,
        spinnerColor: n.spinnerColor,
        style: n.style || "loader-l13",
        visible: n.value ?? !0
      }), l = a.mount(document.createElement("div"));
      t._loadingInstance = l, t._loadingApp = a, t.appendChild(l.$el), J(() => {
        A(t, e);
      });
    };
    n.value && (i = window.setTimeout(() => {
      n.value && s();
    }, r)), t._loadingTimeoutId = i;
  },
  updated(t, e) {
    if (JSON.stringify(e.oldValue) !== JSON.stringify(e.value)) {
      const n = typeof e.value == "boolean" ? { value: e.value } : e.value || {};
      if (t._loadingTimeoutId && (clearTimeout(t._loadingTimeoutId), t._loadingTimeoutId = null), !n.value) {
        A(t, e);
        return;
      }
      const r = n.delay || 0;
      t._loadingTimeoutId = window.setTimeout(() => {
        n.value && A(t, e);
      }, r);
    }
  },
  unmounted(t) {
    var e, n, r;
    t._loadingTimeoutId && clearTimeout(t._loadingTimeoutId), (e = t._loadingApp) == null || e.unmount(), (r = (n = t._loadingInstance) == null ? void 0 : n.$el) == null || r.remove(), t._loadingInstance = void 0, t._loadingApp = void 0;
  }
};
function A(t, e) {
  var i, s, a;
  if (!t._loadingInstance) return;
  const n = typeof e.value == "boolean" ? e.value : ((i = e.value) == null ? void 0 : i.value) ?? !0;
  t.style.position = n ? "relative" : "";
  const r = t._loadingInstance.$el.parentElement;
  r && r.parentNode === t && r !== t.lastElementChild && t.appendChild(r), (a = (s = t._loadingInstance).setVisible) == null || a.call(s, n), t._loadingInstance.$el && (t._loadingInstance.$el.style.display = n ? "flex" : "none");
}
const Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), De = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Ae = {
  mounted(t, e) {
    var H, W;
    t.style.position = "absolute", t.style.userSelect = "none";
    const n = () => {
      var f;
      const h = document.createElement("div");
      return h.style.position = "absolute", h.style.pointerEvents = "none", h.style.border = "2px dashed #3498db", h.style.backgroundColor = "rgba(52, 152, 219, 0.1)", h.style.zIndex = "1000", h.style.display = "none", (f = t.parentElement) == null || f.appendChild(h), h;
    }, r = (h) => {
      const f = document.createElement("div");
      return f.className = `resize-handle resize-handle-${h}`, f.style.position = "absolute", f.style.width = "10px", f.style.height = "10px", f.style.backgroundColor = "#fff", f.style.opacity = "0", f.style.border = "1px solid #333", f.style.zIndex = "100", f.style.touchAction = "none", h.includes("top") && (f.style.top = "-5px"), h.includes("bottom") && (f.style.bottom = "-5px"), h.includes("left") && (f.style.left = "-5px"), h.includes("right") && (f.style.right = "-5px"), h === "top-left" && (f.style.cursor = "nwse-resize"), h === "top-right" && (f.style.cursor = "nesw-resize"), h === "bottom-left" && (f.style.cursor = "nesw-resize"), h === "bottom-right" && (f.style.cursor = "nwse-resize"), t.appendChild(f), f;
    };
    t.__dragPreview = n();
    const i = [
      r("top-left"),
      r("top-right"),
      r("bottom-left"),
      r("bottom-right")
    ];
    t.__resizeHandles = i, t.__resizeListeners = [];
    const s = t.parentElement;
    if (!s) return;
    getComputedStyle(s).position === "static" && (s.style.position = "relative");
    const a = ((H = e.value) == null ? void 0 : H.minWidth) ?? 50, l = ((W = e.value) == null ? void 0 : W.minHeight) ?? 50;
    let o = !1, u = null, m = 0, g = 0, c = 0, _ = 0, d = 0, v = 0, p = 0, y = 0, S = 0, b = 0;
    const D = () => ({
      left: 0,
      top: 0,
      right: s.clientWidth,
      bottom: s.clientHeight
    }), ue = () => {
      if (!t.__dragPreview) return;
      const h = t.__dragPreview;
      h.style.display = "block", h.style.left = `${S}px`, h.style.top = `${b}px`, h.style.width = `${p}px`, h.style.height = `${y}px`;
    }, de = () => {
      t.__dragPreview && (t.__dragPreview.style.display = "none");
    }, he = (h, f) => {
      h.preventDefault(), h.stopPropagation(), o = !0, u = f, m = h.clientX, g = h.clientY, c = t.offsetWidth, _ = t.offsetHeight, d = t.offsetLeft, v = t.offsetTop, p = c, y = _, S = d, b = v, document.addEventListener("mousemove", B), document.addEventListener("mouseup", U);
    }, B = (h) => {
      if (!o || !u) return;
      const f = h.clientX - m, T = h.clientY - g, x = D();
      switch (u) {
        case "top-left":
          p = Math.max(a, c - f), y = Math.max(l, _ - T), S = d + (c - p), b = v + (_ - y);
          break;
        case "top-right":
          p = Math.max(a, c + f), y = Math.max(l, _ - T), b = v + (_ - y);
          break;
        case "bottom-left":
          p = Math.max(a, c - f), y = Math.max(l, _ + T), S = d + (c - p);
          break;
        case "bottom-right":
          p = Math.max(a, c + f), y = Math.max(l, _ + T);
          break;
      }
      S < x.left && (S = x.left, u.includes("left") && (p = c + d - x.left)), b < x.top && (b = x.top, u.includes("top") && (y = _ + v - x.top)), S + p > x.right && (p = x.right - S), b + y > x.bottom && (y = x.bottom - b), p = Math.max(a, p), y = Math.max(l, y), ue();
    }, U = () => {
      o && (o = !1, t.style.width = `${p}px`, t.style.height = `${y}px`, t.style.left = `${S}px`, t.style.top = `${b}px`, de(), document.removeEventListener("mousemove", B), document.removeEventListener("mouseup", U));
    };
    i.forEach((h, f) => {
      var Y;
      const T = ["top-left", "top-right", "bottom-left", "bottom-right"], x = (fe) => he(fe, T[f]);
      h.addEventListener("mousedown", x), (Y = t.__resizeListeners) == null || Y.push({ mousedown: x });
    });
  },
  unmounted(t) {
    t.__resizeHandles && t.__resizeHandles.forEach((e) => {
      e.remove();
    }), t.__resizeListeners && t.__resizeListeners.forEach((e, n) => {
      var r;
      (r = t.__resizeHandles) != null && r[n] && t.__resizeHandles[n].removeEventListener("mousedown", e.mousedown);
    }), t.__dragPreview && t.__dragPreview.remove();
  }
}, Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ae
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
}, Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_PLUGIN_OPTIONS: Q
}, Symbol.toStringTag, { value: "Module" })), ee = ({
  borderTopLeftRadius: t,
  borderTopRightRadius: e,
  borderBottomLeftRadius: n,
  borderBottomRightRadius: r
}) => {
  const i = document.createElement("div");
  return i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%", i.style.position = "absolute", i.style.borderRadius = `${t} ${e} ${r} ${n}`, i.style.overflow = "hidden", i.style.pointerEvents = "none", i.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", i;
}, ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: ee
}, Symbol.toStringTag, { value: "Module" })), te = (t, e, n, r, i) => {
  const s = document.createElement("div");
  return s.style.position = "absolute", s.style.width = r.center ? `${Math.sqrt(i.width * i.width + i.height * i.height)}px` : `${n * 2}px`, s.style.height = r.center ? `${Math.sqrt(i.width * i.width + i.height * i.height)}px` : `${n * 2}px`, s.style.top = r.center ? `${i.height / 2}px` : `${e}px`, s.style.left = r.center ? `${i.width / 2}px` : `${t}px`, s.style.background = r.color, s.style.borderRadius = "50%", s.style.opacity = `${r.initialOpacity}`, s.style.transform = "translate(-50%,-50%) scale(0)", s.style.transition = `transform ${r.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${r.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, s;
}, ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: te
}, Symbol.toStringTag, { value: "Module" }));
function R(t, e, n, r) {
  const i = t - n, s = e - r;
  return Math.sqrt(i * i + s * s);
}
function ne(t, { width: e, height: n, left: r, top: i }) {
  const s = t.clientX - r, a = t.clientY - i, l = R(s, a, 0, 0), o = R(s, a, e, 0), u = R(s, a, 0, n), m = R(s, a, e, n), g = Math.max(l, o, u, m);
  return {
    x: s,
    y: a,
    diameter: g
  };
}
const Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: ne,
  getPythagoreanDistance: R
}, Symbol.toStringTag, { value: "Module" })), N = "vRippleCountInternal";
function re(t, e) {
  t.dataset[N] = e.toString();
}
function P(t) {
  return parseInt(t.dataset[N] ?? "0", 10);
}
function ie(t) {
  const e = P(t);
  re(t, e + 1);
}
function se(t) {
  const e = P(t);
  re(t, e - 1);
}
function ae(t) {
  delete t.dataset[N];
}
const Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: se,
  deleteRippleCount: ae,
  getRippleCount: P,
  incrementRippleCount: ie
}, Symbol.toStringTag, { value: "Module" })), Be = 1.05, I = /* @__PURE__ */ new WeakMap(), Ue = { ...Q }, He = (t, e, n) => {
  const r = e.getBoundingClientRect(), i = window.getComputedStyle(e), { diameter: s, x: a, y: l } = ne(t, r), o = ee(i), u = te(a, l, s * Be, n, r);
  let m = "", g = !1, c;
  function _() {
    u.style.transition = "opacity 120ms ease in out", u.style.opacity = "0", setTimeout(() => {
      o.remove(), se(e), P(e) === 0 && (ae(e), e.style.position = m);
    }, 100);
  }
  function d(p) {
    typeof p < "u" && document.removeEventListener("pointerup", d), g ? _() : g = !0;
  }
  function v() {
    clearTimeout(c), o.remove(), document.removeEventListener("pointerup", d), document.removeEventListener("pointercancel", d), document.removeEventListener("pointercancel", v);
  }
  ie(e), i.position === "static" && (e.style.position && (m = e.style.position), e.style.position = "relative"), o.appendChild(u), e.appendChild(o), document.addEventListener("pointerup", d), document.addEventListener("pointercancel", d), c = setTimeout(() => {
    document.removeEventListener("pointercancel", v), u.style.transform = "translate(-50%,-50%) scale(1)", u.style.opacity = `${n.finalOpacity}`, setTimeout(() => d(), n.duration);
  }, n.delay), document.addEventListener("pointercancel", v);
}, We = {
  mounted(t, e) {
    I.set(t, e.value ?? {}), t.addEventListener("pointerdown", (n) => {
      var i;
      const r = I.get(t);
      (i = e.value) != null && i.disabled || r !== !1 && He(n, t, {
        ...Ue,
        ...r
      });
    });
  },
  updated(t, e) {
    I.set(t, e.value ?? {});
  }
}, Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: We
}, Symbol.toStringTag, { value: "Module" })), V = 50, j = 500, oe = /* @__PURE__ */ new WeakMap(), Xe = (t) => {
  const e = new IntersectionObserver((n) => {
    for (const r of n)
      if (r.isIntersecting) {
        const i = oe.get(r.target);
        i && i.play(), e.unobserve(t);
      }
  });
  e.observe(t);
}, Ve = (t, e) => t.getBoundingClientRect().top - e > window.innerHeight, je = {
  mounted(t, e) {
    let n = V, r = j;
    if (typeof e.value == "number" ? n = e.value : e.value && typeof e.value == "object" && (n = e.value.distance ?? V, r = e.value.duration ?? j), !Ve(t, n))
      return;
    const i = t.animate(
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
    i.pause(), oe.set(t, i), Xe(t);
  }
}, Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: je
}, Symbol.toStringTag, { value: "Module" })), G = /* @__PURE__ */ Object.assign({ "./draggable/index.ts": Le, "./loading/index.ts": Pe, "./loading/loading.ts": Re, "./loading/types.ts": De, "./resize/index.ts": Ie, "./ripple/index.ts": Ye, "./ripple/options.ts": Oe, "./ripple/utils/create-container-element.ts": ke, "./ripple/utils/create-ripple-element.ts": ze, "./ripple/utils/get-element-position-utils.ts": Fe, "./ripple/utils/ripple-count.ts": Ne, "./slide-in/index.ts": Ge }), Ft = {
  install: function(t) {
    for (const e in G) {
      const n = G[e].default;
      if (!n) continue;
      const r = e.split("/")[1];
      e.split("/")[2] === "index.ts" && t.directive(r, n);
    }
  }
}, qe = "C", Ze = "cl", z = (t) => `${Ze}__${t}`, le = (t) => `${qe}${t || ""}`, O = F({
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
    const { type: t, size: e, color: n, name: r, spin: i } = this, s = z(`${t}-icon`), a = i ? z(`${t}-icon-spin`) : "";
    return t === "svg" ? C(
      "svg",
      {
        class: [s, a],
        style: {
          width: `${e}px`,
          height: `${e}px`
        }
      },
      {
        default: () => [C("use", { "xlink:href": `#${r}` })]
      }
    ) : C("i", {
      class: ["ri-" + r, s, a],
      style: {
        fontSize: `${e}px`,
        color: n
      }
    });
  }
}), ce = Object.assign(O, {
  install(t) {
    t.component(le(O.name), O);
  }
}), k = /* @__PURE__ */ F({
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
    const r = z("segmented"), i = E(null), s = E(null), a = E(-1), l = E(!1), o = X(() => t.options.findIndex((d) => d.value === t.value)), u = (d) => {
      t.disabled || t.value !== d && (e("update:value", d), e("change", d));
    }, m = async (d = !1) => {
      if (!i.value || !s.value) return;
      await J();
      const v = i.value, p = s.value, y = v.parentElement;
      if (!y) return;
      const S = y.getBoundingClientRect(), b = v.getBoundingClientRect();
      if (d && (p.style.transition = "none"), p.style.width = `${b.width}px`, p.style.height = `${b.height}px`, p.style.left = `${b.left - S.left}px`, !d && a.value !== -1 && o.value !== -1) {
        const D = o.value > a.value ? "right" : "left";
        p.classList.remove(`${r}-thumb-left`, `${r}-thumb-right`), p.classList.add(`${r}-thumb-${D}`);
      }
      d && requestAnimationFrame(() => {
        p.style.transition = "";
      }), a.value = o.value;
    };
    Z(() => {
      l.value = !0, m(!0);
    }), _e(() => t.value, () => m());
    const g = X(() => ({
      [r]: !0,
      [`${r}-block`]: t.block,
      [`${r}-disabled`]: t.disabled,
      [`${r}-${t.size}`]: !0
    })), c = (d) => ({
      [`${r}-item`]: !0,
      [`${r}-item-selected`]: t.value === d.value,
      [`${r}-item-disabled`]: d.disabled
    }), _ = (d) => {
      const v = `label-${d.value}`;
      return n[v] ? n[v]({
        option: d
      }) : $(we, null, [d.icon && $(ce, {
        class: "mr-5",
        name: d.icon
      }, null), $("span", {
        class: `${r}-item-label`
      }, [d.label])]);
    };
    return () => $("div", {
      class: g.value
    }, [$("div", {
      ref: s,
      class: `${r}-thumb`
    }, null), t.options.map((d, v) => $("div", {
      ref: t.value === d.value ? i : null,
      key: d.value,
      class: c(d),
      onClick: () => !d.disabled && u(d.value),
      "data-index": v
    }, [_(d)]))]);
  }
}), Je = Object.assign(k, {
  install(t) {
    t.component(le(k.name), k);
  }
}), q = {
  Icon: ce,
  Segmented: Je
}, Nt = (t) => {
  Object.keys(q).forEach((e) => {
    t.use(q[e]);
  });
};
export {
  Mt as BaseCanvas,
  Te as BaseGL,
  ce as CIcon,
  Je as CSegmented,
  Pt as Emitter,
  At as Random,
  Nt as RegisterComponents,
  Ft as RegisterDirectives,
  Dt as TimeDiff,
  Lt as addEventListen,
  xe as copyToClipboard,
  Ct as copyToClipboardWithCallback,
  _t as isAlpha,
  wt as isAlphaNum,
  bt as isAlphaNumUnderline,
  at as isArray,
  $t as isBlank,
  ot as isBoolean,
  yt as isChinese,
  ht as isDate,
  pt as isEmail,
  st as isFunction,
  vt as isIdCard,
  St as isLower,
  lt as isNull,
  ft as isNullOrUndefined,
  rt as isNumber,
  it as isObject,
  gt as isPhone,
  Tt as isPort,
  dt as isPromise,
  ut as isRegExp,
  nt as isString,
  Et as isTel,
  ct as isUndefined,
  xt as isUpper,
  mt as isUrl,
  M as objectUtils,
  Rt as removeEventListen,
  kt as useFileSelect,
  zt as useLeaveConfirm,
  Ot as useLoading,
  It as useTheme
};
