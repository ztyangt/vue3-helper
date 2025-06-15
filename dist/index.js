var se = Object.defineProperty;
var oe = (e, t, n) => t in e ? se(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var p = (e, t, n) => oe(e, typeof t != "symbol" ? t + "" : t, n);
import { useDark as re } from "@vueuse/core";
import { ref as ae, defineComponent as N, h as T, createApp as le, nextTick as ce } from "vue";
const We = (e) => typeof e == "string", Xe = (e) => typeof e == "number", Ye = (e) => typeof e == "object", Ge = (e) => typeof e == "function", Ve = (e) => Array.isArray(e), Ze = (e) => typeof e == "boolean", qe = (e) => e === null, Je = (e) => e === void 0, Ke = (e) => e instanceof RegExp, Qe = (e) => e instanceof Promise, et = (e) => e instanceof Date, tt = (e) => e == null, nt = (e) => /^http[s]?:\/\/.*/.test(e), it = (e) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e), st = (e) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(e), ot = (e) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e), rt = (e) => /^[\u4e00-\u9fa5]{0,}$/.test(e), at = (e) => /^[a-zA-Z]+$/.test(e), lt = (e) => /^[A-Za-z0-9]+$/.test(e), ct = (e) => /^[A-Za-z0-9_]+$/.test(e), dt = (e) => /^[A-Z]+$/.test(e), ut = (e) => /^[a-z]+$/.test(e), ht = (e) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(e), pt = (e) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(e), mt = (e) => e == null || e === "" || e === 0 || e === !1 || Array.isArray(e) && e.length === 0 || typeof e == "object" && Object.keys(e).length === 0;
async function de(e) {
  try {
    if (navigator.clipboard && window.isSecureContext)
      return await navigator.clipboard.writeText(e), !0;
    const t = document.createElement("textarea");
    t.value = e, t.style.position = "fixed", t.style.left = "-9999px", t.style.top = "0", t.style.opacity = "0", document.body.appendChild(t), t.select();
    let n = !1;
    try {
      n = document.execCommand("copy");
    } catch (i) {
      console.warn("Copy to clipboard failed:", i);
    }
    return document.body.removeChild(t), n;
  } catch (t) {
    return console.error("Copy to clipboard failed:", t), !1;
  }
}
function gt(e, t) {
  de(e).then(t).catch(() => t(!1));
}
function ft(e, t, n, i = !1) {
  e.addEventListener && typeof e.addEventListener == "function" && e.addEventListener(t, n, i);
}
function _t(e, t, n, i = !1) {
  e.removeEventListener && typeof e.removeEventListener == "function" && e.removeEventListener(t, n, i);
}
var ue = `#version 300 es

in vec4 a_Position;

void main(){
  gl_PointSize=10.;
  gl_Position=a_Position;
}`, he = `#version 300 es
precision highp float;

out vec4 outColor;

void main(){
  outColor=vec4(1.,0.,0.,1.);
}`;
class pe {
  constructor(t, n = {}) {
    p(this, "gl");
    p(this, "vertexShader");
    p(this, "fragmentShader");
    p(this, "program");
    p(this, "canvas");
    p(this, "compileError");
    let i = null;
    if (typeof t == "string" ? i = document.getElementById(t) : i = t, !i) throw new Error("Canvas not found");
    this.canvas = i;
    const s = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * s, this.canvas.height = this.canvas.clientHeight * s;
    const o = i.getContext("webgl2", { alpha: !1 });
    if (!o) throw new Error("WebGL2 not supported");
    this.gl = o, this.resizeCanvas(), this.program = this.initProgram(n.vertexShaderSource || ue, n.fragmentShaderSource || he);
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
    const i = this.gl.createShader(t);
    if (!i) throw new Error("Unable to create shader");
    if (this.gl.shaderSource(i, n), this.gl.compileShader(i), this.gl.getShaderParameter(i, this.gl.COMPILE_STATUS))
      return this.compileError = null, i;
    this.compileError = this.gl.getShaderInfoLog(i), this.gl.deleteShader(i);
  }
  // 初始化着色器程序
  initProgram(t, n) {
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, t), this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, n);
    const i = this.gl.createProgram();
    if (!i) throw new Error("Unable to create shader program");
    if (this.vertexShader && this.gl.attachShader(i, this.vertexShader), this.fragmentShader && this.gl.attachShader(i, this.fragmentShader), this.gl.linkProgram(i), !this.gl.getProgramParameter(i, this.gl.LINK_STATUS))
      throw console.warn(this.gl.getProgramInfoLog(i)), this.gl.deleteProgram(i), new Error("Unable to initialize the shader program");
    return this.gl.useProgram(i), i;
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
    const t = window.devicePixelRatio || 1, { clientWidth: n, clientHeight: i } = this.canvas;
    this.gl.canvas.width = n * t, this.gl.canvas.height = i * t;
  }
  // 更新 WebGL 视口
  updateViewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
}
var me = `#version 300 es

in vec4 a_Position;

void main(){
  gl_Position=a_Position;
}`;
class vt extends pe {
  // 控制渲染的标志
  constructor(n, i) {
    super(n, { vertexShaderSource: me, fragmentShaderSource: i });
    p(this, "startTime");
    p(this, "endTime");
    p(this, "currentAnimationFrame", 0);
    p(this, "lastFrameTime", performance.now());
    // 上一帧的时间
    p(this, "frameCount", 0);
    // 帧数计数器
    p(this, "fps", 0);
    // 当前 FPS
    p(this, "isRendering", !0);
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
    const n = performance.now(), i = n - this.lastFrameTime;
    this.frameCount++, i >= 1e3 && (this.fps = parseFloat((this.frameCount / (i / 1e3)).toFixed(2)), this.frameCount = 0, this.lastFrameTime = n);
    const s = this.gl.getUniformLocation(this.program, "iResolution");
    this.gl.uniform2f(s, this.gl.canvas.width, this.gl.canvas.height);
    const o = this.gl.getUniformLocation(this.program, "iTime");
    this.endTime = performance.now(), this.gl.uniform1f(o, (this.endTime - this.startTime) / 1e3), this.gl.drawArrays(this.gl.TRIANGLES, 0, 6), this.isRendering && (this.currentAnimationFrame = requestAnimationFrame(() => this.render()));
  }
  initRect() {
    const n = this.gl.getAttribLocation(this.program, "a_Position");
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer()), this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]), this.gl.STATIC_DRAW), this.gl.vertexAttribPointer(n, 2, this.gl.FLOAT, !1, 0, 0), this.gl.enableVertexAttribArray(n);
  }
}
class yt {
  constructor(t) {
    p(this, "_listeners");
    p(this, "_onceListeners");
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
    const i = (...s) => {
      n(...s), this.off(t, i);
    };
    this._onceListeners.set(n, i), this.on(t, i);
  }
  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给监听器的参数
   */
  emit(t, ...n) {
    const i = this._listeners[t];
    i && new Set(i).forEach((o) => o(...n));
  }
  /**
   * 移除事件监听器
   * @param eventName 事件名称
   * @param listener 要移除的回调函数（可选）
   */
  off(t, n) {
    if (this._listeners[t])
      if (n) {
        const i = this._onceListeners.get(n);
        i ? (this._listeners[t].delete(i), this._onceListeners.delete(n)) : this._listeners[t].delete(n);
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
const bt = () => {
  const e = re({
    selector: "html",
    attribute: "class",
    valueDark: "dark",
    valueLight: "light"
  });
  return { isDark: e, toggleTheme: async (n, i = !1) => {
    if (!i) {
      e.value = !e.value;
      return;
    }
    if (!n) {
      e.value = !e.value;
      return;
    }
    try {
      const s = n.clientX, o = n.clientY, l = Math.hypot(Math.max(s, innerWidth - s), Math.max(o, innerHeight - o));
      let c;
      const u = document.startViewTransition(() => {
        const d = document.documentElement;
        c = d.classList.contains("dark"), d.classList.add(c ? "light" : "dark"), d.classList.remove(c ? "dark" : "light");
      });
      u.ready.then(() => {
        const d = [`circle(0px at ${s}px ${o}px)`, `circle(${l}px at ${s}px ${o}px)`];
        document.documentElement.animate(
          {
            clipPath: c ? [...d].reverse() : d
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement: c ? "::view-transition-old(root)" : "::view-transition-new(root)"
          }
        );
      }), await u.finished, e.value = !e.value;
    } catch {
      e.value = !e.value;
    }
  } };
}, wt = (e = !1) => {
  const t = ae(e);
  return {
    loading: t,
    setLoading: (s) => {
      t.value = s;
    },
    toggleLoading: () => {
      t.value = !t.value;
    }
  };
}, ge = {
  mounted: function(e) {
    e.style.cursor = "move", e.style.position = "absolute", e.onmousedown = function(t) {
      let n = t.pageX - e.offsetLeft, i = t.pageY - e.offsetTop;
      document.onmousemove = function(s) {
        let o = s.pageX - n, l = s.pageY - i, c = parseInt(window.getComputedStyle(e.parentNode).width) - parseInt(window.getComputedStyle(e).width), u = parseInt(window.getComputedStyle(e.parentNode).height) - parseInt(window.getComputedStyle(e).height);
        o < 0 ? o = 0 : o > c && (o = c), l < 0 ? l = 0 : l > u && (l = u), e.style.left = o + "px", e.style.top = l + "px";
      }, document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
}, fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ge
}, Symbol.toStringTag, { value: "Module" })), H = N({
  name: "LoadingOverlay",
  props: {
    text: {
      type: String,
      default: ""
    },
    background: {
      type: String,
      default: "rgba(255, 255, 255, 0.2)"
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
    return T(
      "div",
      {
        class: ["loading-overlay", { "show-loading-overlay": this.visible }],
        style: {
          backgroundColor: this.background
        }
      },
      [
        T("div", {
          class: this.styleClass || "loading-spinner",
          style: {
            borderTopColor: this.spinnerColor
          }
        }),
        this.text ? T("div", { class: "loading-text" }, this.text) : null
      ]
    );
  }
}), _e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: H
}, Symbol.toStringTag, { value: "Module" })), ve = {
  mounted(e, t) {
    e.style.position = "relative";
    const n = typeof t.value == "boolean" ? { value: t.value } : t.value || {}, i = n.delay || 300;
    let s = null;
    const o = () => {
      const l = le(H, {
        text: n.text,
        background: n.background,
        spinnerColor: n.spinnerColor,
        style: n.style || "loader-l13",
        visible: n.value ?? !0
      }), c = l.mount(document.createElement("div"));
      e._loadingInstance = c, e._loadingApp = l, e.appendChild(c.$el), ce(() => {
        P(e, t);
      });
    };
    n.value && (s = window.setTimeout(() => {
      n.value && o();
    }, i)), e._loadingTimeoutId = s;
  },
  updated(e, t) {
    if (JSON.stringify(t.oldValue) !== JSON.stringify(t.value)) {
      const n = typeof t.value == "boolean" ? { value: t.value } : t.value || {};
      if (e._loadingTimeoutId && (clearTimeout(e._loadingTimeoutId), e._loadingTimeoutId = null), !n.value) {
        P(e, t);
        return;
      }
      const i = n.delay || 0;
      e._loadingTimeoutId = window.setTimeout(() => {
        n.value && P(e, t);
      }, i);
    }
  },
  unmounted(e) {
    var t, n, i;
    e._loadingTimeoutId && clearTimeout(e._loadingTimeoutId), (t = e._loadingApp) == null || t.unmount(), (i = (n = e._loadingInstance) == null ? void 0 : n.$el) == null || i.remove(), e._loadingInstance = void 0, e._loadingApp = void 0;
  }
};
function P(e, t) {
  var s, o, l;
  if (!e._loadingInstance) return;
  const n = typeof t.value == "boolean" ? t.value : ((s = t.value) == null ? void 0 : s.value) ?? !0;
  e.style.position = n ? "relative" : "";
  const i = e._loadingInstance.$el.parentElement;
  i && i.parentNode === e && i !== e.lastElementChild && e.appendChild(i), (l = (o = e._loadingInstance).setVisible) == null || l.call(o, n), e._loadingInstance.$el && (e._loadingInstance.$el.style.display = n ? "flex" : "none");
}
const ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" })), be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), we = {
  mounted(e, t) {
    var O, M;
    e.style.position = "absolute", e.style.userSelect = "none";
    const n = () => {
      var a;
      const r = document.createElement("div");
      return r.style.position = "absolute", r.style.pointerEvents = "none", r.style.border = "2px dashed #3498db", r.style.backgroundColor = "rgba(52, 152, 219, 0.1)", r.style.zIndex = "1000", r.style.display = "none", (a = e.parentElement) == null || a.appendChild(r), r;
    }, i = (r) => {
      const a = document.createElement("div");
      return a.className = `resize-handle resize-handle-${r}`, a.style.position = "absolute", a.style.width = "10px", a.style.height = "10px", a.style.backgroundColor = "#fff", a.style.opacity = "0", a.style.border = "1px solid #333", a.style.zIndex = "100", a.style.touchAction = "none", r.includes("top") && (a.style.top = "-5px"), r.includes("bottom") && (a.style.bottom = "-5px"), r.includes("left") && (a.style.left = "-5px"), r.includes("right") && (a.style.right = "-5px"), r === "top-left" && (a.style.cursor = "nwse-resize"), r === "top-right" && (a.style.cursor = "nesw-resize"), r === "bottom-left" && (a.style.cursor = "nesw-resize"), r === "bottom-right" && (a.style.cursor = "nwse-resize"), e.appendChild(a), a;
    };
    e.__dragPreview = n();
    const s = [
      i("top-left"),
      i("top-right"),
      i("bottom-left"),
      i("bottom-right")
    ];
    e.__resizeHandles = s, e.__resizeListeners = [];
    const o = e.parentElement;
    if (!o) return;
    getComputedStyle(o).position === "static" && (o.style.position = "relative");
    const l = ((O = t.value) == null ? void 0 : O.minWidth) ?? 50, c = ((M = t.value) == null ? void 0 : M.minHeight) ?? 50;
    let u = !1, d = null, S = 0, x = 0, f = 0, v = 0, _ = 0, y = 0, h = 0, m = 0, b = 0, w = 0;
    const Q = () => ({
      left: 0,
      top: 0,
      right: o.clientWidth,
      bottom: o.clientHeight
    }), ee = () => {
      if (!e.__dragPreview) return;
      const r = e.__dragPreview;
      r.style.display = "block", r.style.left = `${b}px`, r.style.top = `${w}px`, r.style.width = `${h}px`, r.style.height = `${m}px`;
    }, te = () => {
      e.__dragPreview && (e.__dragPreview.style.display = "none");
    }, ne = (r, a) => {
      r.preventDefault(), r.stopPropagation(), u = !0, d = a, S = r.clientX, x = r.clientY, f = e.offsetWidth, v = e.offsetHeight, _ = e.offsetLeft, y = e.offsetTop, h = f, m = v, b = _, w = y, document.addEventListener("mousemove", A), document.addEventListener("mouseup", I);
    }, A = (r) => {
      if (!u || !d) return;
      const a = r.clientX - S, E = r.clientY - x, g = Q();
      switch (d) {
        case "top-left":
          h = Math.max(l, f - a), m = Math.max(c, v - E), b = _ + (f - h), w = y + (v - m);
          break;
        case "top-right":
          h = Math.max(l, f + a), m = Math.max(c, v - E), w = y + (v - m);
          break;
        case "bottom-left":
          h = Math.max(l, f - a), m = Math.max(c, v + E), b = _ + (f - h);
          break;
        case "bottom-right":
          h = Math.max(l, f + a), m = Math.max(c, v + E);
          break;
      }
      b < g.left && (b = g.left, d.includes("left") && (h = f + _ - g.left)), w < g.top && (w = g.top, d.includes("top") && (m = v + y - g.top)), b + h > g.right && (h = g.right - b), w + m > g.bottom && (m = g.bottom - w), h = Math.max(l, h), m = Math.max(c, m), ee();
    }, I = () => {
      u && (u = !1, e.style.width = `${h}px`, e.style.height = `${m}px`, e.style.left = `${b}px`, e.style.top = `${w}px`, te(), document.removeEventListener("mousemove", A), document.removeEventListener("mouseup", I));
    };
    s.forEach((r, a) => {
      var k;
      const E = ["top-left", "top-right", "bottom-left", "bottom-right"], g = (ie) => ne(ie, E[a]);
      r.addEventListener("mousedown", g), (k = e.__resizeListeners) == null || k.push({ mousedown: g });
    });
  },
  unmounted(e) {
    e.__resizeHandles && e.__resizeHandles.forEach((t) => {
      t.remove();
    }), e.__resizeListeners && e.__resizeListeners.forEach((t, n) => {
      var i;
      (i = e.__resizeHandles) != null && i[n] && e.__resizeHandles[n].removeEventListener("mousedown", t.mousedown);
    }), e.__dragPreview && e.__dragPreview.remove();
  }
}, Se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: we
}, Symbol.toStringTag, { value: "Module" })), W = {
  directive: "ripple",
  color: "var(--ripple-color)",
  initialOpacity: 0.1,
  finalOpacity: 0.05,
  duration: 350,
  easing: "ease-out",
  delay: 60,
  disabled: !1,
  center: !1
}, xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_PLUGIN_OPTIONS: W
}, Symbol.toStringTag, { value: "Module" })), X = ({
  borderTopLeftRadius: e,
  borderTopRightRadius: t,
  borderBottomLeftRadius: n,
  borderBottomRightRadius: i
}) => {
  const s = document.createElement("div");
  return s.style.top = "0", s.style.left = "0", s.style.width = "100%", s.style.height = "100%", s.style.position = "absolute", s.style.borderRadius = `${e} ${t} ${i} ${n}`, s.style.overflow = "hidden", s.style.pointerEvents = "none", s.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", s;
}, Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: X
}, Symbol.toStringTag, { value: "Module" })), Y = (e, t, n, i, s) => {
  const o = document.createElement("div");
  return o.style.position = "absolute", o.style.width = i.center ? `${Math.sqrt(s.width * s.width + s.height * s.height)}px` : `${n * 2}px`, o.style.height = i.center ? `${Math.sqrt(s.width * s.width + s.height * s.height)}px` : `${n * 2}px`, o.style.top = i.center ? `${s.height / 2}px` : `${t}px`, o.style.left = i.center ? `${s.width / 2}px` : `${e}px`, o.style.background = i.color, o.style.borderRadius = "50%", o.style.opacity = `${i.initialOpacity}`, o.style.transform = "translate(-50%,-50%) scale(0)", o.style.transition = `transform ${i.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${i.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, o;
}, Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: Y
}, Symbol.toStringTag, { value: "Module" }));
function L(e, t, n, i) {
  const s = e - n, o = t - i;
  return Math.sqrt(s * s + o * o);
}
function G(e, { width: t, height: n, left: i, top: s }) {
  const o = e.clientX - i, l = e.clientY - s, c = L(o, l, 0, 0), u = L(o, l, t, 0), d = L(o, l, 0, n), S = L(o, l, t, n), x = Math.max(c, u, d, S);
  return {
    x: o,
    y: l,
    diameter: x
  };
}
const Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: G,
  getPythagoreanDistance: L
}, Symbol.toStringTag, { value: "Module" })), z = "vRippleCountInternal";
function V(e, t) {
  e.dataset[z] = t.toString();
}
function C(e) {
  return parseInt(e.dataset[z] ?? "0", 10);
}
function Z(e) {
  const t = C(e);
  V(e, t + 1);
}
function q(e) {
  const t = C(e);
  V(e, t - 1);
}
function J(e) {
  delete e.dataset[z];
}
const Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: q,
  deleteRippleCount: J,
  getRippleCount: C,
  incrementRippleCount: Z
}, Symbol.toStringTag, { value: "Module" })), Pe = 1.05, R = /* @__PURE__ */ new WeakMap(), Re = { ...W }, $e = (e, t, n) => {
  const i = t.getBoundingClientRect(), s = window.getComputedStyle(t), { diameter: o, x: l, y: c } = G(e, i), u = X(s), d = Y(l, c, o * Pe, n, i);
  let S = "", x = !1, f;
  function v() {
    d.style.transition = "opacity 120ms ease in out", d.style.opacity = "0", setTimeout(() => {
      u.remove(), q(t), C(t) === 0 && (J(t), t.style.position = S);
    }, 100);
  }
  function _(h) {
    typeof h < "u" && document.removeEventListener("pointerup", _), x ? v() : x = !0;
  }
  function y() {
    clearTimeout(f), u.remove(), document.removeEventListener("pointerup", _), document.removeEventListener("pointercancel", _), document.removeEventListener("pointercancel", y);
  }
  Z(t), s.position === "static" && (t.style.position && (S = t.style.position), t.style.position = "relative"), u.appendChild(d), t.appendChild(u), document.addEventListener("pointerup", _), document.addEventListener("pointercancel", _), f = setTimeout(() => {
    document.removeEventListener("pointercancel", y), d.style.transform = "translate(-50%,-50%) scale(1)", d.style.opacity = `${n.finalOpacity}`, setTimeout(() => _(), n.duration);
  }, n.delay), document.addEventListener("pointercancel", y);
}, ze = {
  mounted(e, t) {
    R.set(e, t.value ?? {}), e.addEventListener("pointerdown", (n) => {
      var s;
      const i = R.get(e);
      (s = t.value) != null && s.disabled || i !== !1 && $e(n, e, {
        ...Re,
        ...i
      });
    });
  },
  updated(e, t) {
    R.set(e, t.value ?? {});
  }
}, Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ze
}, Symbol.toStringTag, { value: "Module" })), F = 50, j = 500, K = /* @__PURE__ */ new WeakMap(), Ie = (e) => {
  const t = new IntersectionObserver((n) => {
    for (const i of n)
      if (i.isIntersecting) {
        const s = K.get(i.target);
        s && s.play(), t.unobserve(e);
      }
  });
  t.observe(e);
}, Oe = (e, t) => e.getBoundingClientRect().top - t > window.innerHeight, Me = {
  mounted(e, t) {
    let n = F, i = j;
    if (typeof t.value == "number" ? n = t.value : t.value && typeof t.value == "object" && (n = t.value.distance ?? F, i = t.value.duration ?? j), !Oe(e, n))
      return;
    const s = e.animate(
      [
        { transform: `translateY(${n}px)`, opacity: 0.5 },
        // 起始状态：向下偏移，半透明
        { transform: "translateY(0)", opacity: 1 }
        // 结束状态：回到原位，完全不透明
      ],
      {
        duration: i,
        // 动画持续时间
        easing: "ease-in-out",
        // 缓动函数：平滑进出
        fill: "forwards"
        // 动画结束后保持最终状态
      }
    );
    s.pause(), K.set(e, s), Ie(e);
  }
}, ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), D = /* @__PURE__ */ Object.assign({ "./draggable/index.ts": fe, "./loading/index.ts": ye, "./loading/loading.ts": _e, "./loading/types.ts": be, "./resize/index.ts": Se, "./ripple/index.ts": Ae, "./ripple/options.ts": xe, "./ripple/utils/create-container-element.ts": Ee, "./ripple/utils/create-ripple-element.ts": Te, "./ripple/utils/get-element-position-utils.ts": Le, "./ripple/utils/ripple-count.ts": Ce, "./slide-in/index.ts": ke }), St = {
  install: function(e) {
    for (const t in D) {
      const n = D[t].default;
      if (!n) continue;
      const i = t.split("/")[1];
      t.split("/")[2] === "index.ts" && e.directive(i, n);
    }
  }
}, Fe = "C", je = "cl", U = (e) => `${je}__${e}`, De = (e) => `${Fe}${e || ""}`, $ = N({
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
      type: Number,
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
    const { type: e, size: t, color: n, name: i, spin: s } = this, o = U(`${e}-icon`), l = s ? U(`${e}-icon-spin`) : "";
    return e === "svg" ? T(
      "svg",
      {
        class: [o, l],
        style: {
          width: `${t}px`,
          height: `${t}px`
        }
      },
      {
        default: () => [T("use", { "xlink:href": `#${i}` })]
      }
    ) : T("i", {
      class: ["ri-" + i, o, l],
      style: {
        fontSize: `${t}px`,
        color: n
      }
    });
  }
}), Ue = Object.assign($, {
  install(e) {
    e.component(De($.name), $);
  }
}), B = {
  Icon: Ue
}, xt = (e) => {
  Object.keys(B).forEach((t) => {
    e.use(B[t]);
  });
};
export {
  vt as BaseCanvas,
  pe as BaseGL,
  Ue as CIcon,
  yt as Emitter,
  xt as RegisterComponents,
  St as RegisterDirectives,
  ft as addEventListen,
  de as copyToClipboard,
  gt as copyToClipboardWithCallback,
  at as isAlpha,
  lt as isAlphaNum,
  ct as isAlphaNumUnderline,
  Ve as isArray,
  mt as isBlank,
  Ze as isBoolean,
  rt as isChinese,
  et as isDate,
  it as isEmail,
  Ge as isFunction,
  ot as isIdCard,
  ut as isLower,
  qe as isNull,
  tt as isNullOrUndefined,
  Xe as isNumber,
  Ye as isObject,
  st as isPhone,
  pt as isPort,
  Qe as isPromise,
  Ke as isRegExp,
  We as isString,
  ht as isTel,
  Je as isUndefined,
  dt as isUpper,
  nt as isUrl,
  _t as removeEventListen,
  wt as useLoading,
  bt as useTheme
};
