var he = Object.defineProperty;
var me = (e, t, s) => t in e ? he(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var y = (e, t, s) => me(e, typeof t != "symbol" ? t + "" : t, s);
import { useDark as pe } from "@vueuse/core";
import { ref as E, onMounted as G, onBeforeUnmount as fe, defineComponent as F, h as T, createApp as ge, nextTick as q, computed as H, watch as ve, createVNode as C, Fragment as ye } from "vue";
import { onBeforeRouteLeave as _e } from "vue-router";
const et = (e) => typeof e == "string", tt = (e) => typeof e == "number", nt = (e) => typeof e == "object", st = (e) => typeof e == "function", rt = (e) => Array.isArray(e), it = (e) => typeof e == "boolean", ot = (e) => e === null, at = (e) => e === void 0, lt = (e) => e instanceof RegExp, ct = (e) => e instanceof Promise, dt = (e) => e instanceof Date, ut = (e) => e == null, ht = (e) => /^http[s]?:\/\/.*/.test(e), mt = (e) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e), pt = (e) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(e), ft = (e) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e), gt = (e) => /^[\u4e00-\u9fa5]{0,}$/.test(e), vt = (e) => /^[a-zA-Z]+$/.test(e), yt = (e) => /^[A-Za-z0-9]+$/.test(e), _t = (e) => /^[A-Za-z0-9_]+$/.test(e), bt = (e) => /^[A-Z]+$/.test(e), wt = (e) => /^[a-z]+$/.test(e), St = (e) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(e), xt = (e) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(e), Et = (e) => e == null || e === "" || e === 0 || e === !1 || Array.isArray(e) && e.length === 0 || typeof e == "object" && Object.keys(e).length === 0;
async function be(e) {
  try {
    if (navigator.clipboard && window.isSecureContext)
      return await navigator.clipboard.writeText(e), !0;
    const t = document.createElement("textarea");
    t.value = e, t.style.position = "fixed", t.style.left = "-9999px", t.style.top = "0", t.style.opacity = "0", document.body.appendChild(t), t.select();
    let s = !1;
    try {
      s = document.execCommand("copy");
    } catch (n) {
      console.warn("Copy to clipboard failed:", n);
    }
    return document.body.removeChild(t), s;
  } catch (t) {
    return console.error("Copy to clipboard failed:", t), !1;
  }
}
function Lt(e, t) {
  be(e).then(t).catch(() => t(!1));
}
function Ct(e, t, s, n = !1) {
  e.addEventListener && typeof e.addEventListener == "function" && e.addEventListener(t, s, n);
}
function Tt(e, t, s, n = !1) {
  e.removeEventListener && typeof e.removeEventListener == "function" && e.removeEventListener(t, s, n);
}
var we = `#version 300 es

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
class xe {
  constructor(t, s = {}) {
    y(this, "gl");
    y(this, "vertexShader");
    y(this, "fragmentShader");
    y(this, "program");
    y(this, "canvas");
    y(this, "compileError");
    let n = null;
    if (typeof t == "string" ? n = document.getElementById(t) : n = t, !n) throw new Error("Canvas not found");
    this.canvas = n;
    const r = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * r, this.canvas.height = this.canvas.clientHeight * r;
    const i = n.getContext("webgl2", { alpha: !1 });
    if (!i) throw new Error("WebGL2 not supported");
    this.gl = i, this.resizeCanvas(), this.program = this.initProgram(s.vertexShaderSource || we, s.fragmentShaderSource || Se);
  }
  // 更新片段着色器
  updateFragmentShader(t) {
    const s = this.createShader(this.gl.FRAGMENT_SHADER, t);
    if (!s) return;
    if (this.fragmentShader && (this.gl.detachShader(this.program, this.fragmentShader), this.gl.deleteShader(this.fragmentShader)), this.gl.attachShader(this.program, s), this.fragmentShader = s, this.gl.linkProgram(this.program), this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      this.gl.useProgram(this.program);
      return;
    }
    throw console.warn(this.gl.getProgramInfoLog(this.program)), new Error("Unable to initialize the shader program");
  }
  createShader(t, s) {
    const n = this.gl.createShader(t);
    if (!n) throw new Error("Unable to create shader");
    if (this.gl.shaderSource(n, s), this.gl.compileShader(n), this.gl.getShaderParameter(n, this.gl.COMPILE_STATUS))
      return this.compileError = null, n;
    this.compileError = this.gl.getShaderInfoLog(n), this.gl.deleteShader(n);
  }
  // 初始化着色器程序
  initProgram(t, s) {
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, t), this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, s);
    const n = this.gl.createProgram();
    if (!n) throw new Error("Unable to create shader program");
    if (this.vertexShader && this.gl.attachShader(n, this.vertexShader), this.fragmentShader && this.gl.attachShader(n, this.fragmentShader), this.gl.linkProgram(n), !this.gl.getProgramParameter(n, this.gl.LINK_STATUS))
      throw console.warn(this.gl.getProgramInfoLog(n)), this.gl.deleteProgram(n), new Error("Unable to initialize the shader program");
    return this.gl.useProgram(n), n;
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
  normalizeCoords(t, s) {
    return [2 * t / this.canvas.width - 1, 1 - 2 * s / this.canvas.height];
  }
  normalizeX(t) {
    return 2 * t / this.canvas.width - 1;
  }
  normalizeY(t) {
    return 1 - 2 * t / this.canvas.height;
  }
  // 调整画布尺寸
  resizeCanvas() {
    const t = window.devicePixelRatio || 1, { clientWidth: s, clientHeight: n } = this.canvas;
    this.gl.canvas.width = s * t, this.gl.canvas.height = n * t;
  }
  // 更新 WebGL 视口
  updateViewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
}
var Ee = `#version 300 es

in vec4 a_Position;

void main(){
  gl_Position=a_Position;
}`;
class Pt extends xe {
  // 控制渲染的标志
  constructor(s, n) {
    super(s, { vertexShaderSource: Ee, fragmentShaderSource: n });
    y(this, "startTime");
    y(this, "endTime");
    y(this, "currentAnimationFrame", 0);
    y(this, "lastFrameTime", performance.now());
    // 上一帧的时间
    y(this, "frameCount", 0);
    // 帧数计数器
    y(this, "fps", 0);
    // 当前 FPS
    y(this, "isRendering", !0);
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
  updateFragmentShader(s) {
    super.updateFragmentShader(s);
  }
  render() {
    if (!this.program || !this.isRendering) return;
    this.clearGL();
    const s = performance.now(), n = s - this.lastFrameTime;
    this.frameCount++, n >= 1e3 && (this.fps = parseFloat((this.frameCount / (n / 1e3)).toFixed(2)), this.frameCount = 0, this.lastFrameTime = s);
    const r = this.gl.getUniformLocation(this.program, "iResolution");
    this.gl.uniform2f(r, this.gl.canvas.width, this.gl.canvas.height);
    const i = this.gl.getUniformLocation(this.program, "iTime");
    this.endTime = performance.now(), this.gl.uniform1f(i, (this.endTime - this.startTime) / 1e3), this.gl.drawArrays(this.gl.TRIANGLES, 0, 6), this.isRendering && (this.currentAnimationFrame = requestAnimationFrame(() => this.render()));
  }
  initRect() {
    const s = this.gl.getAttribLocation(this.program, "a_Position");
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer()), this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]), this.gl.STATIC_DRAW), this.gl.vertexAttribPointer(s, 2, this.gl.FLOAT, !1, 0, 0), this.gl.enableVertexAttribArray(s);
  }
}
class $t {
  constructor(t) {
    y(this, "_listeners");
    y(this, "_onceListeners");
    this._listeners = {}, this._onceListeners = /* @__PURE__ */ new WeakMap();
    for (const s of t)
      this._listeners[s] = /* @__PURE__ */ new Set();
  }
  /**
   * 注册事件监听器
   * @param eventName 事件名称
   * @param listener 回调函数
   */
  on(t, s) {
    this._listeners[t] || (this._listeners[t] = /* @__PURE__ */ new Set()), this._listeners[t].add(s);
  }
  /**
   * 注册一次性事件监听器
   * @param eventName 事件名称
   * @param listener 回调函数
   */
  once(t, s) {
    const n = (...r) => {
      s(...r), this.off(t, n);
    };
    this._onceListeners.set(s, n), this.on(t, n);
  }
  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给监听器的参数
   */
  emit(t, ...s) {
    const n = this._listeners[t];
    n && new Set(n).forEach((i) => i(...s));
  }
  /**
   * 移除事件监听器
   * @param eventName 事件名称
   * @param listener 要移除的回调函数（可选）
   */
  off(t, s) {
    if (this._listeners[t])
      if (s) {
        const n = this._onceListeners.get(s);
        n ? (this._listeners[t].delete(n), this._onceListeners.delete(s)) : this._listeners[t].delete(s);
      } else
        this._listeners[t].clear();
  }
  /**
   * 获取某个事件的监听器数量
   * @param eventName 事件名称
   */
  listenerCount(t) {
    var s;
    return ((s = this._listeners[t]) == null ? void 0 : s.size) || 0;
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
const Rt = () => {
  const e = pe({
    selector: "html",
    attribute: "class",
    valueDark: "dark",
    valueLight: "light"
  });
  return { isDark: e, toggleTheme: async (s, n = !1) => {
    if (!n) {
      e.value = !e.value;
      return;
    }
    if (!s) {
      e.value = !e.value;
      return;
    }
    try {
      const r = s.clientX, i = s.clientY, o = Math.hypot(Math.max(r, innerWidth - r), Math.max(i, innerHeight - i));
      let a;
      const m = document.startViewTransition(() => {
        const d = document.documentElement;
        a = d.classList.contains("dark"), d.classList.add(a ? "light" : "dark"), d.classList.remove(a ? "dark" : "light");
      });
      m.ready.then(() => {
        const d = [`circle(0px at ${r}px ${i}px)`, `circle(${o}px at ${r}px ${i}px)`];
        document.documentElement.animate(
          {
            clipPath: a ? [...d].reverse() : d
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement: a ? "::view-transition-old(root)" : "::view-transition-new(root)"
          }
        );
      }), await m.finished, e.value = !e.value;
    } catch {
      e.value = !e.value;
    }
  } };
}, It = (e = !1) => {
  const t = E(e);
  return {
    loading: t,
    setLoading: (r) => {
      t.value = r;
    },
    toggleLoading: () => {
      t.value = !t.value;
    }
  };
}, zt = (e) => {
  const t = (o) => {
    const a = document.createElement("input");
    return a.type = "file", a.multiple = !!o.multiple, o.directory && (a.webkitdirectory = !0, a.mozdirectory = !0), o.accept && o.accept.length > 0 && (a.accept = o.accept.join(",")), a;
  }, s = () => {
    const { dragRef: o } = e || {};
    if (!(o != null && o.value)) return;
    const a = o.value, m = (h) => {
      h.preventDefault();
    }, d = (h) => {
      h.preventDefault(), a.classList.add("drag-active");
    }, _ = (h) => {
      h.preventDefault(), a.classList.remove("drag-active");
    }, b = (h) => {
      var v;
      h.preventDefault(), a.classList.remove("drag-active"), (v = e == null ? void 0 : e.dragCallback) == null || v.call(e, h);
    };
    return a.addEventListener("dragover", m), a.addEventListener("dragenter", d), a.addEventListener("dragleave", _), a.addEventListener("drop", b), () => {
      a.removeEventListener("dragover", m), a.removeEventListener("dragenter", d), a.removeEventListener("dragleave", _), a.removeEventListener("drop", b);
    };
  }, n = (o) => new Promise((a, m) => {
    const d = t(o);
    d.style.display = "none";
    const _ = setTimeout(() => {
      m(new Error("选择取消或超时")), document.body.removeChild(d);
    }, 3e4);
    d.onchange = (b) => {
      clearTimeout(_);
      const h = b.target.files;
      h != null && h.length ? a(h) : m(new Error("未选择文件")), document.body.removeChild(d);
    }, document.body.appendChild(d), d.click();
  });
  return {
    selectFile: (o) => n({
      multiple: (o == null ? void 0 : o.multiple) ?? !0,
      accept: o == null ? void 0 : o.accept,
      directory: !1
    }),
    selectFolder: () => n({
      multiple: !1,
      directory: !0
    }),
    initDragDom: s
  };
};
function At(e = {}) {
  const { enabled: t = E(!0), message: s = "确定要离开此页面吗？未保存的更改可能会丢失。" } = e, n = typeof t == "boolean" ? E(t) : t, r = (i) => {
    if (n.value)
      return i.preventDefault(), i.returnValue = s, s;
  };
  return _e((i, o, a) => {
    if (n.value && !confirm(e.message || "确定要离开吗？"))
      return a(!1);
    a();
  }), G(() => {
    window.addEventListener("beforeunload", r);
  }), fe(() => {
    window.removeEventListener("beforeunload", r);
  }), {
    /**
     * 手动启用/禁用提示
     * @example setEnabled(false)
     */
    setEnabled: (i) => {
      n.value = i;
    }
  };
}
const Le = {
  mounted: function(e) {
    e.style.cursor = "move", e.style.position = "absolute", e.onmousedown = function(t) {
      let s = t.pageX - e.offsetLeft, n = t.pageY - e.offsetTop;
      document.onmousemove = function(r) {
        let i = r.pageX - s, o = r.pageY - n, a = parseInt(window.getComputedStyle(e.parentNode).width) - parseInt(window.getComputedStyle(e).width), m = parseInt(window.getComputedStyle(e.parentNode).height) - parseInt(window.getComputedStyle(e).height);
        i < 0 ? i = 0 : i > a && (i = a), o < 0 ? o = 0 : o > m && (o = m), e.style.left = i + "px", e.style.top = o + "px";
      }, document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
}, Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Le
}, Symbol.toStringTag, { value: "Module" })), Z = F({
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
    return T(
      "div",
      {
        class: ["loading-overlay", { "show-loading-overlay": this.visible }]
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
}), Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Z
}, Symbol.toStringTag, { value: "Module" })), Pe = {
  mounted(e, t) {
    e.style.position = "relative";
    const s = typeof t.value == "boolean" ? { value: t.value } : t.value || {}, n = s.delay || 300;
    let r = null;
    const i = () => {
      const o = ge(Z, {
        text: s.text,
        background: s.background,
        spinnerColor: s.spinnerColor,
        style: s.style || "loader-l13",
        visible: s.value ?? !0
      }), a = o.mount(document.createElement("div"));
      e._loadingInstance = a, e._loadingApp = o, e.appendChild(a.$el), q(() => {
        I(e, t);
      });
    };
    s.value && (r = window.setTimeout(() => {
      s.value && i();
    }, n)), e._loadingTimeoutId = r;
  },
  updated(e, t) {
    if (JSON.stringify(t.oldValue) !== JSON.stringify(t.value)) {
      const s = typeof t.value == "boolean" ? { value: t.value } : t.value || {};
      if (e._loadingTimeoutId && (clearTimeout(e._loadingTimeoutId), e._loadingTimeoutId = null), !s.value) {
        I(e, t);
        return;
      }
      const n = s.delay || 0;
      e._loadingTimeoutId = window.setTimeout(() => {
        s.value && I(e, t);
      }, n);
    }
  },
  unmounted(e) {
    var t, s, n;
    e._loadingTimeoutId && clearTimeout(e._loadingTimeoutId), (t = e._loadingApp) == null || t.unmount(), (n = (s = e._loadingInstance) == null ? void 0 : s.$el) == null || n.remove(), e._loadingInstance = void 0, e._loadingApp = void 0;
  }
};
function I(e, t) {
  var r, i, o;
  if (!e._loadingInstance) return;
  const s = typeof t.value == "boolean" ? t.value : ((r = t.value) == null ? void 0 : r.value) ?? !0;
  e.style.position = s ? "relative" : "";
  const n = e._loadingInstance.$el.parentElement;
  n && n.parentNode === e && n !== e.lastElementChild && e.appendChild(n), (o = (i = e._loadingInstance).setVisible) == null || o.call(i, s), e._loadingInstance.$el && (e._loadingInstance.$el.style.display = s ? "flex" : "none");
}
const $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pe
}, Symbol.toStringTag, { value: "Module" })), Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Ie = {
  mounted(e, t) {
    var B, U;
    e.style.position = "absolute", e.style.userSelect = "none";
    const s = () => {
      var u;
      const c = document.createElement("div");
      return c.style.position = "absolute", c.style.pointerEvents = "none", c.style.border = "2px dashed #3498db", c.style.backgroundColor = "rgba(52, 152, 219, 0.1)", c.style.zIndex = "1000", c.style.display = "none", (u = e.parentElement) == null || u.appendChild(c), c;
    }, n = (c) => {
      const u = document.createElement("div");
      return u.className = `resize-handle resize-handle-${c}`, u.style.position = "absolute", u.style.width = "10px", u.style.height = "10px", u.style.backgroundColor = "#fff", u.style.opacity = "0", u.style.border = "1px solid #333", u.style.zIndex = "100", u.style.touchAction = "none", c.includes("top") && (u.style.top = "-5px"), c.includes("bottom") && (u.style.bottom = "-5px"), c.includes("left") && (u.style.left = "-5px"), c.includes("right") && (u.style.right = "-5px"), c === "top-left" && (u.style.cursor = "nwse-resize"), c === "top-right" && (u.style.cursor = "nesw-resize"), c === "bottom-left" && (u.style.cursor = "nesw-resize"), c === "bottom-right" && (u.style.cursor = "nwse-resize"), e.appendChild(u), u;
    };
    e.__dragPreview = s();
    const r = [
      n("top-left"),
      n("top-right"),
      n("bottom-left"),
      n("bottom-right")
    ];
    e.__resizeHandles = r, e.__resizeListeners = [];
    const i = e.parentElement;
    if (!i) return;
    getComputedStyle(i).position === "static" && (i.style.position = "relative");
    const o = ((B = t.value) == null ? void 0 : B.minWidth) ?? 50, a = ((U = t.value) == null ? void 0 : U.minHeight) ?? 50;
    let m = !1, d = null, _ = 0, b = 0, h = 0, v = 0, l = 0, f = 0, p = 0, g = 0, x = 0, w = 0;
    const R = () => ({
      left: 0,
      top: 0,
      right: i.clientWidth,
      bottom: i.clientHeight
    }), le = () => {
      if (!e.__dragPreview) return;
      const c = e.__dragPreview;
      c.style.display = "block", c.style.left = `${x}px`, c.style.top = `${w}px`, c.style.width = `${p}px`, c.style.height = `${g}px`;
    }, ce = () => {
      e.__dragPreview && (e.__dragPreview.style.display = "none");
    }, de = (c, u) => {
      c.preventDefault(), c.stopPropagation(), m = !0, d = u, _ = c.clientX, b = c.clientY, h = e.offsetWidth, v = e.offsetHeight, l = e.offsetLeft, f = e.offsetTop, p = h, g = v, x = l, w = f, document.addEventListener("mousemove", D), document.addEventListener("mouseup", j);
    }, D = (c) => {
      if (!m || !d) return;
      const u = c.clientX - _, L = c.clientY - b, S = R();
      switch (d) {
        case "top-left":
          p = Math.max(o, h - u), g = Math.max(a, v - L), x = l + (h - p), w = f + (v - g);
          break;
        case "top-right":
          p = Math.max(o, h + u), g = Math.max(a, v - L), w = f + (v - g);
          break;
        case "bottom-left":
          p = Math.max(o, h - u), g = Math.max(a, v + L), x = l + (h - p);
          break;
        case "bottom-right":
          p = Math.max(o, h + u), g = Math.max(a, v + L);
          break;
      }
      x < S.left && (x = S.left, d.includes("left") && (p = h + l - S.left)), w < S.top && (w = S.top, d.includes("top") && (g = v + f - S.top)), x + p > S.right && (p = S.right - x), w + g > S.bottom && (g = S.bottom - w), p = Math.max(o, p), g = Math.max(a, g), le();
    }, j = () => {
      m && (m = !1, e.style.width = `${p}px`, e.style.height = `${g}px`, e.style.left = `${x}px`, e.style.top = `${w}px`, ce(), document.removeEventListener("mousemove", D), document.removeEventListener("mouseup", j));
    };
    r.forEach((c, u) => {
      var N;
      const L = ["top-left", "top-right", "bottom-left", "bottom-right"], S = (ue) => de(ue, L[u]);
      c.addEventListener("mousedown", S), (N = e.__resizeListeners) == null || N.push({ mousedown: S });
    });
  },
  unmounted(e) {
    e.__resizeHandles && e.__resizeHandles.forEach((t) => {
      t.remove();
    }), e.__resizeListeners && e.__resizeListeners.forEach((t, s) => {
      var n;
      (n = e.__resizeHandles) != null && n[s] && e.__resizeHandles[s].removeEventListener("mousedown", t.mousedown);
    }), e.__dragPreview && e.__dragPreview.remove();
  }
}, ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ie
}, Symbol.toStringTag, { value: "Module" })), J = {
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
  DEFAULT_PLUGIN_OPTIONS: J
}, Symbol.toStringTag, { value: "Module" })), K = ({
  borderTopLeftRadius: e,
  borderTopRightRadius: t,
  borderBottomLeftRadius: s,
  borderBottomRightRadius: n
}) => {
  const r = document.createElement("div");
  return r.style.top = "0", r.style.left = "0", r.style.width = "100%", r.style.height = "100%", r.style.position = "absolute", r.style.borderRadius = `${e} ${t} ${n} ${s}`, r.style.overflow = "hidden", r.style.pointerEvents = "none", r.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", r;
}, Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: K
}, Symbol.toStringTag, { value: "Module" })), Q = (e, t, s, n, r) => {
  const i = document.createElement("div");
  return i.style.position = "absolute", i.style.width = n.center ? `${Math.sqrt(r.width * r.width + r.height * r.height)}px` : `${s * 2}px`, i.style.height = n.center ? `${Math.sqrt(r.width * r.width + r.height * r.height)}px` : `${s * 2}px`, i.style.top = n.center ? `${r.height / 2}px` : `${t}px`, i.style.left = n.center ? `${r.width / 2}px` : `${e}px`, i.style.background = n.color, i.style.borderRadius = "50%", i.style.opacity = `${n.initialOpacity}`, i.style.transform = "translate(-50%,-50%) scale(0)", i.style.transition = `transform ${n.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${n.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, i;
}, ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: Q
}, Symbol.toStringTag, { value: "Module" }));
function P(e, t, s, n) {
  const r = e - s, i = t - n;
  return Math.sqrt(r * r + i * i);
}
function ee(e, { width: t, height: s, left: n, top: r }) {
  const i = e.clientX - n, o = e.clientY - r, a = P(i, o, 0, 0), m = P(i, o, t, 0), d = P(i, o, 0, s), _ = P(i, o, t, s), b = Math.max(a, m, d, _);
  return {
    x: i,
    y: o,
    diameter: b
  };
}
const Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: ee,
  getPythagoreanDistance: P
}, Symbol.toStringTag, { value: "Module" })), O = "vRippleCountInternal";
function te(e, t) {
  e.dataset[O] = t.toString();
}
function $(e) {
  return parseInt(e.dataset[O] ?? "0", 10);
}
function ne(e) {
  const t = $(e);
  te(e, t + 1);
}
function se(e) {
  const t = $(e);
  te(e, t - 1);
}
function re(e) {
  delete e.dataset[O];
}
const Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: se,
  deleteRippleCount: re,
  getRippleCount: $,
  incrementRippleCount: ne
}, Symbol.toStringTag, { value: "Module" })), De = 1.05, z = /* @__PURE__ */ new WeakMap(), je = { ...J }, Be = (e, t, s) => {
  const n = t.getBoundingClientRect(), r = window.getComputedStyle(t), { diameter: i, x: o, y: a } = ee(e, n), m = K(r), d = Q(o, a, i * De, s, n);
  let _ = "", b = !1, h;
  function v() {
    d.style.transition = "opacity 120ms ease in out", d.style.opacity = "0", setTimeout(() => {
      m.remove(), se(t), $(t) === 0 && (re(t), t.style.position = _);
    }, 100);
  }
  function l(p) {
    typeof p < "u" && document.removeEventListener("pointerup", l), b ? v() : b = !0;
  }
  function f() {
    clearTimeout(h), m.remove(), document.removeEventListener("pointerup", l), document.removeEventListener("pointercancel", l), document.removeEventListener("pointercancel", f);
  }
  ne(t), r.position === "static" && (t.style.position && (_ = t.style.position), t.style.position = "relative"), m.appendChild(d), t.appendChild(m), document.addEventListener("pointerup", l), document.addEventListener("pointercancel", l), h = setTimeout(() => {
    document.removeEventListener("pointercancel", f), d.style.transform = "translate(-50%,-50%) scale(1)", d.style.opacity = `${s.finalOpacity}`, setTimeout(() => l(), s.duration);
  }, s.delay), document.addEventListener("pointercancel", f);
}, Ue = {
  mounted(e, t) {
    z.set(e, t.value ?? {}), e.addEventListener("pointerdown", (s) => {
      var r;
      const n = z.get(e);
      (r = t.value) != null && r.disabled || n !== !1 && Be(s, e, {
        ...je,
        ...n
      });
    });
  },
  updated(e, t) {
    z.set(e, t.value ?? {});
  }
}, Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ue
}, Symbol.toStringTag, { value: "Module" })), W = 50, X = 500, ie = /* @__PURE__ */ new WeakMap(), He = (e) => {
  const t = new IntersectionObserver((s) => {
    for (const n of s)
      if (n.isIntersecting) {
        const r = ie.get(n.target);
        r && r.play(), t.unobserve(e);
      }
  });
  t.observe(e);
}, We = (e, t) => e.getBoundingClientRect().top - t > window.innerHeight, Xe = {
  mounted(e, t) {
    let s = W, n = X;
    if (typeof t.value == "number" ? s = t.value : t.value && typeof t.value == "object" && (s = t.value.distance ?? W, n = t.value.duration ?? X), !We(e, s))
      return;
    const r = e.animate(
      [
        { transform: `translateY(${s}px)`, opacity: 0.5 },
        // 起始状态：向下偏移，半透明
        { transform: "translateY(0)", opacity: 1 }
        // 结束状态：回到原位，完全不透明
      ],
      {
        duration: n,
        // 动画持续时间
        easing: "ease-in-out",
        // 缓动函数：平滑进出
        fill: "forwards"
        // 动画结束后保持最终状态
      }
    );
    r.pause(), ie.set(e, r), He(e);
  }
}, Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xe
}, Symbol.toStringTag, { value: "Module" })), Y = /* @__PURE__ */ Object.assign({ "./draggable/index.ts": Ce, "./loading/index.ts": $e, "./loading/loading.ts": Te, "./loading/types.ts": Re, "./resize/index.ts": ze, "./ripple/index.ts": Ne, "./ripple/options.ts": Ae, "./ripple/utils/create-container-element.ts": Me, "./ripple/utils/create-ripple-element.ts": ke, "./ripple/utils/get-element-position-utils.ts": Fe, "./ripple/utils/ripple-count.ts": Oe, "./slide-in/index.ts": Ye }), Mt = {
  install: function(e) {
    for (const t in Y) {
      const s = Y[t].default;
      if (!s) continue;
      const n = t.split("/")[1];
      t.split("/")[2] === "index.ts" && e.directive(n, s);
    }
  }
}, Ve = "C", Ge = "cl", k = (e) => `${Ge}__${e}`, oe = (e) => `${Ve}${e || ""}`, A = F({
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
    const { type: e, size: t, color: s, name: n, spin: r } = this, i = k(`${e}-icon`), o = r ? k(`${e}-icon-spin`) : "";
    return e === "svg" ? T(
      "svg",
      {
        class: [i, o],
        style: {
          width: `${t}px`,
          height: `${t}px`
        }
      },
      {
        default: () => [T("use", { "xlink:href": `#${n}` })]
      }
    ) : T("i", {
      class: ["ri-" + n, i, o],
      style: {
        fontSize: `${t}px`,
        color: s
      }
    });
  }
}), ae = Object.assign(A, {
  install(e) {
    e.component(oe(A.name), A);
  }
}), M = /* @__PURE__ */ F({
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
    slots: s
  }) {
    const n = k("segmented"), r = E(null), i = E(null), o = E(-1), a = E(!1), m = H(() => e.options.findIndex((l) => l.value === e.value)), d = (l) => {
      e.disabled || e.value !== l && (t("update:value", l), t("change", l));
    }, _ = async (l = !1) => {
      if (!r.value || !i.value) return;
      await q();
      const f = r.value, p = i.value, g = f.parentElement;
      if (!g) return;
      const x = g.getBoundingClientRect(), w = f.getBoundingClientRect();
      if (l && (p.style.transition = "none"), p.style.width = `${w.width}px`, p.style.height = `${w.height}px`, p.style.left = `${w.left - x.left}px`, !l && o.value !== -1 && m.value !== -1) {
        const R = m.value > o.value ? "right" : "left";
        p.classList.remove(`${n}-thumb-left`, `${n}-thumb-right`), p.classList.add(`${n}-thumb-${R}`);
      }
      l && requestAnimationFrame(() => {
        p.style.transition = "";
      }), o.value = m.value;
    };
    G(() => {
      a.value = !0, _(!0);
    }), ve(() => e.value, () => _());
    const b = H(() => ({
      [n]: !0,
      [`${n}-block`]: e.block,
      [`${n}-disabled`]: e.disabled,
      [`${n}-${e.size}`]: !0
    })), h = (l) => ({
      [`${n}-item`]: !0,
      [`${n}-item-selected`]: e.value === l.value,
      [`${n}-item-disabled`]: l.disabled
    }), v = (l) => {
      const f = `label-${l.value}`;
      return s[f] ? s[f]({
        option: l
      }) : C(ye, null, [l.icon && C(ae, {
        class: "mr-5",
        name: l.icon
      }, null), C("span", {
        class: `${n}-item-label`
      }, [l.label])]);
    };
    return () => C("div", {
      class: b.value
    }, [C("div", {
      ref: i,
      class: `${n}-thumb`
    }, null), e.options.map((l, f) => C("div", {
      ref: e.value === l.value ? r : null,
      key: l.value,
      class: h(l),
      onClick: () => !l.disabled && d(l.value),
      "data-index": f
    }, [v(l)]))]);
  }
}), qe = Object.assign(M, {
  install(e) {
    e.component(oe(M.name), M);
  }
}), V = {
  Icon: ae,
  Segmented: qe
}, kt = (e) => {
  Object.keys(V).forEach((t) => {
    e.use(V[t]);
  });
};
export {
  Pt as BaseCanvas,
  xe as BaseGL,
  ae as CIcon,
  qe as CSegmented,
  $t as Emitter,
  kt as RegisterComponents,
  Mt as RegisterDirectives,
  Ct as addEventListen,
  be as copyToClipboard,
  Lt as copyToClipboardWithCallback,
  vt as isAlpha,
  yt as isAlphaNum,
  _t as isAlphaNumUnderline,
  rt as isArray,
  Et as isBlank,
  it as isBoolean,
  gt as isChinese,
  dt as isDate,
  mt as isEmail,
  st as isFunction,
  ft as isIdCard,
  wt as isLower,
  ot as isNull,
  ut as isNullOrUndefined,
  tt as isNumber,
  nt as isObject,
  pt as isPhone,
  xt as isPort,
  ct as isPromise,
  lt as isRegExp,
  et as isString,
  St as isTel,
  at as isUndefined,
  bt as isUpper,
  ht as isUrl,
  Tt as removeEventListen,
  zt as useFileSelect,
  At as useLeaveConfirm,
  It as useLoading,
  Rt as useTheme
};
