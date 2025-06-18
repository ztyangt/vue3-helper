var re = Object.defineProperty;
var se = (e, t, n) => t in e ? re(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var m = (e, t, n) => se(e, typeof t != "symbol" ? t + "" : t, n);
import { useDark as oe } from "@vueuse/core";
import { ref as ae, defineComponent as N, h as L, createApp as le, nextTick as ce } from "vue";
const We = (e) => typeof e == "string", Xe = (e) => typeof e == "number", Ye = (e) => typeof e == "object", Ge = (e) => typeof e == "function", Ve = (e) => Array.isArray(e), Ze = (e) => typeof e == "boolean", qe = (e) => e === null, Je = (e) => e === void 0, Ke = (e) => e instanceof RegExp, Qe = (e) => e instanceof Promise, et = (e) => e instanceof Date, tt = (e) => e == null, nt = (e) => /^http[s]?:\/\/.*/.test(e), it = (e) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e), rt = (e) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(e), st = (e) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e), ot = (e) => /^[\u4e00-\u9fa5]{0,}$/.test(e), at = (e) => /^[a-zA-Z]+$/.test(e), lt = (e) => /^[A-Za-z0-9]+$/.test(e), ct = (e) => /^[A-Za-z0-9_]+$/.test(e), dt = (e) => /^[A-Z]+$/.test(e), ut = (e) => /^[a-z]+$/.test(e), ht = (e) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(e), pt = (e) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(e), mt = (e) => e == null || e === "" || e === 0 || e === !1 || Array.isArray(e) && e.length === 0 || typeof e == "object" && Object.keys(e).length === 0;
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
function vt(e, t, n, i = !1) {
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
    m(this, "gl");
    m(this, "vertexShader");
    m(this, "fragmentShader");
    m(this, "program");
    m(this, "canvas");
    m(this, "compileError");
    let i = null;
    if (typeof t == "string" ? i = document.getElementById(t) : i = t, !i) throw new Error("Canvas not found");
    this.canvas = i;
    const r = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * r, this.canvas.height = this.canvas.clientHeight * r;
    const s = i.getContext("webgl2", { alpha: !1 });
    if (!s) throw new Error("WebGL2 not supported");
    this.gl = s, this.resizeCanvas(), this.program = this.initProgram(n.vertexShaderSource || ue, n.fragmentShaderSource || he);
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
class _t extends pe {
  // 控制渲染的标志
  constructor(n, i) {
    super(n, { vertexShaderSource: me, fragmentShaderSource: i });
    m(this, "startTime");
    m(this, "endTime");
    m(this, "currentAnimationFrame", 0);
    m(this, "lastFrameTime", performance.now());
    // 上一帧的时间
    m(this, "frameCount", 0);
    // 帧数计数器
    m(this, "fps", 0);
    // 当前 FPS
    m(this, "isRendering", !0);
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
    const r = this.gl.getUniformLocation(this.program, "iResolution");
    this.gl.uniform2f(r, this.gl.canvas.width, this.gl.canvas.height);
    const s = this.gl.getUniformLocation(this.program, "iTime");
    this.endTime = performance.now(), this.gl.uniform1f(s, (this.endTime - this.startTime) / 1e3), this.gl.drawArrays(this.gl.TRIANGLES, 0, 6), this.isRendering && (this.currentAnimationFrame = requestAnimationFrame(() => this.render()));
  }
  initRect() {
    const n = this.gl.getAttribLocation(this.program, "a_Position");
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer()), this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]), this.gl.STATIC_DRAW), this.gl.vertexAttribPointer(n, 2, this.gl.FLOAT, !1, 0, 0), this.gl.enableVertexAttribArray(n);
  }
}
class yt {
  constructor(t) {
    m(this, "_listeners");
    m(this, "_onceListeners");
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
    const i = (...r) => {
      n(...r), this.off(t, i);
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
    i && new Set(i).forEach((s) => s(...n));
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
  const e = oe({
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
      const r = n.clientX, s = n.clientY, o = Math.hypot(Math.max(r, innerWidth - r), Math.max(s, innerHeight - s));
      let a;
      const h = document.startViewTransition(() => {
        const d = document.documentElement;
        a = d.classList.contains("dark"), d.classList.add(a ? "light" : "dark"), d.classList.remove(a ? "dark" : "light");
      });
      h.ready.then(() => {
        const d = [`circle(0px at ${r}px ${s}px)`, `circle(${o}px at ${r}px ${s}px)`];
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
      }), await h.finished, e.value = !e.value;
    } catch {
      e.value = !e.value;
    }
  } };
}, wt = (e = !1) => {
  const t = ae(e);
  return {
    loading: t,
    setLoading: (r) => {
      t.value = r;
    },
    toggleLoading: () => {
      t.value = !t.value;
    }
  };
}, St = (e) => {
  const t = (o) => {
    const a = document.createElement("input");
    return a.type = "file", a.multiple = !!o.multiple, o.directory && (a.webkitdirectory = !0, a.mozdirectory = !0), o.accept && o.accept.length > 0 && (a.accept = o.accept.join(",")), a;
  }, n = () => {
    const { dragRef: o } = e || {};
    if (!(o != null && o.value)) return;
    const a = o.value, h = (u) => {
      u.preventDefault();
    }, d = (u) => {
      u.preventDefault(), a.classList.add("drag-active");
    }, _ = (u) => {
      u.preventDefault(), a.classList.remove("drag-active");
    }, y = (u) => {
      var g;
      u.preventDefault(), a.classList.remove("drag-active"), (g = e == null ? void 0 : e.dragCallback) == null || g.call(e, u);
    };
    return a.addEventListener("dragover", h), a.addEventListener("dragenter", d), a.addEventListener("dragleave", _), a.addEventListener("drop", y), () => {
      a.removeEventListener("dragover", h), a.removeEventListener("dragenter", d), a.removeEventListener("dragleave", _), a.removeEventListener("drop", y);
    };
  }, i = (o) => new Promise((a, h) => {
    const d = t(o);
    d.style.display = "none";
    const _ = setTimeout(() => {
      h(new Error("选择取消或超时")), document.body.removeChild(d);
    }, 3e4);
    d.onchange = (y) => {
      clearTimeout(_);
      const u = y.target.files;
      u != null && u.length ? a(u) : h(new Error("未选择文件")), document.body.removeChild(d);
    }, document.body.appendChild(d), d.click();
  });
  return {
    selectFile: (o) => i({
      multiple: (o == null ? void 0 : o.multiple) ?? !0,
      accept: o == null ? void 0 : o.accept,
      directory: !1
    }),
    selectFolder: () => i({
      multiple: !1,
      directory: !0
    }),
    initDragDom: n
  };
}, ge = {
  mounted: function(e) {
    e.style.cursor = "move", e.style.position = "absolute", e.onmousedown = function(t) {
      let n = t.pageX - e.offsetLeft, i = t.pageY - e.offsetTop;
      document.onmousemove = function(r) {
        let s = r.pageX - n, o = r.pageY - i, a = parseInt(window.getComputedStyle(e.parentNode).width) - parseInt(window.getComputedStyle(e).width), h = parseInt(window.getComputedStyle(e.parentNode).height) - parseInt(window.getComputedStyle(e).height);
        s < 0 ? s = 0 : s > a && (s = a), o < 0 ? o = 0 : o > h && (o = h), e.style.left = s + "px", e.style.top = o + "px";
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
}), ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: H
}, Symbol.toStringTag, { value: "Module" })), _e = {
  mounted(e, t) {
    e.style.position = "relative";
    const n = typeof t.value == "boolean" ? { value: t.value } : t.value || {}, i = n.delay || 300;
    let r = null;
    const s = () => {
      const o = le(H, {
        text: n.text,
        background: n.background,
        spinnerColor: n.spinnerColor,
        style: n.style || "loader-l13",
        visible: n.value ?? !0
      }), a = o.mount(document.createElement("div"));
      e._loadingInstance = a, e._loadingApp = o, e.appendChild(a.$el), ce(() => {
        P(e, t);
      });
    };
    n.value && (r = window.setTimeout(() => {
      n.value && s();
    }, i)), e._loadingTimeoutId = r;
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
  var r, s, o;
  if (!e._loadingInstance) return;
  const n = typeof t.value == "boolean" ? t.value : ((r = t.value) == null ? void 0 : r.value) ?? !0;
  e.style.position = n ? "relative" : "";
  const i = e._loadingInstance.$el.parentElement;
  i && i.parentNode === e && i !== e.lastElementChild && e.appendChild(i), (o = (s = e._loadingInstance).setVisible) == null || o.call(s, n), e._loadingInstance.$el && (e._loadingInstance.$el.style.display = n ? "flex" : "none");
}
const ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _e
}, Symbol.toStringTag, { value: "Module" })), be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), we = {
  mounted(e, t) {
    var M, O;
    e.style.position = "absolute", e.style.userSelect = "none";
    const n = () => {
      var c;
      const l = document.createElement("div");
      return l.style.position = "absolute", l.style.pointerEvents = "none", l.style.border = "2px dashed #3498db", l.style.backgroundColor = "rgba(52, 152, 219, 0.1)", l.style.zIndex = "1000", l.style.display = "none", (c = e.parentElement) == null || c.appendChild(l), l;
    }, i = (l) => {
      const c = document.createElement("div");
      return c.className = `resize-handle resize-handle-${l}`, c.style.position = "absolute", c.style.width = "10px", c.style.height = "10px", c.style.backgroundColor = "#fff", c.style.opacity = "0", c.style.border = "1px solid #333", c.style.zIndex = "100", c.style.touchAction = "none", l.includes("top") && (c.style.top = "-5px"), l.includes("bottom") && (c.style.bottom = "-5px"), l.includes("left") && (c.style.left = "-5px"), l.includes("right") && (c.style.right = "-5px"), l === "top-left" && (c.style.cursor = "nwse-resize"), l === "top-right" && (c.style.cursor = "nesw-resize"), l === "bottom-left" && (c.style.cursor = "nesw-resize"), l === "bottom-right" && (c.style.cursor = "nwse-resize"), e.appendChild(c), c;
    };
    e.__dragPreview = n();
    const r = [
      i("top-left"),
      i("top-right"),
      i("bottom-left"),
      i("bottom-right")
    ];
    e.__resizeHandles = r, e.__resizeListeners = [];
    const s = e.parentElement;
    if (!s) return;
    getComputedStyle(s).position === "static" && (s.style.position = "relative");
    const o = ((M = t.value) == null ? void 0 : M.minWidth) ?? 50, a = ((O = t.value) == null ? void 0 : O.minHeight) ?? 50;
    let h = !1, d = null, _ = 0, y = 0, u = 0, g = 0, b = 0, w = 0, p = 0, f = 0, S = 0, x = 0;
    const Q = () => ({
      left: 0,
      top: 0,
      right: s.clientWidth,
      bottom: s.clientHeight
    }), ee = () => {
      if (!e.__dragPreview) return;
      const l = e.__dragPreview;
      l.style.display = "block", l.style.left = `${S}px`, l.style.top = `${x}px`, l.style.width = `${p}px`, l.style.height = `${f}px`;
    }, te = () => {
      e.__dragPreview && (e.__dragPreview.style.display = "none");
    }, ne = (l, c) => {
      l.preventDefault(), l.stopPropagation(), h = !0, d = c, _ = l.clientX, y = l.clientY, u = e.offsetWidth, g = e.offsetHeight, b = e.offsetLeft, w = e.offsetTop, p = u, f = g, S = b, x = w, document.addEventListener("mousemove", z), document.addEventListener("mouseup", A);
    }, z = (l) => {
      if (!h || !d) return;
      const c = l.clientX - _, E = l.clientY - y, v = Q();
      switch (d) {
        case "top-left":
          p = Math.max(o, u - c), f = Math.max(a, g - E), S = b + (u - p), x = w + (g - f);
          break;
        case "top-right":
          p = Math.max(o, u + c), f = Math.max(a, g - E), x = w + (g - f);
          break;
        case "bottom-left":
          p = Math.max(o, u - c), f = Math.max(a, g + E), S = b + (u - p);
          break;
        case "bottom-right":
          p = Math.max(o, u + c), f = Math.max(a, g + E);
          break;
      }
      S < v.left && (S = v.left, d.includes("left") && (p = u + b - v.left)), x < v.top && (x = v.top, d.includes("top") && (f = g + w - v.top)), S + p > v.right && (p = v.right - S), x + f > v.bottom && (f = v.bottom - x), p = Math.max(o, p), f = Math.max(a, f), ee();
    }, A = () => {
      h && (h = !1, e.style.width = `${p}px`, e.style.height = `${f}px`, e.style.left = `${S}px`, e.style.top = `${x}px`, te(), document.removeEventListener("mousemove", z), document.removeEventListener("mouseup", A));
    };
    r.forEach((l, c) => {
      var F;
      const E = ["top-left", "top-right", "bottom-left", "bottom-right"], v = (ie) => ne(ie, E[c]);
      l.addEventListener("mousedown", v), (F = e.__resizeListeners) == null || F.push({ mousedown: v });
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
  const r = document.createElement("div");
  return r.style.top = "0", r.style.left = "0", r.style.width = "100%", r.style.height = "100%", r.style.position = "absolute", r.style.borderRadius = `${e} ${t} ${i} ${n}`, r.style.overflow = "hidden", r.style.pointerEvents = "none", r.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", r;
}, Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: X
}, Symbol.toStringTag, { value: "Module" })), Y = (e, t, n, i, r) => {
  const s = document.createElement("div");
  return s.style.position = "absolute", s.style.width = i.center ? `${Math.sqrt(r.width * r.width + r.height * r.height)}px` : `${n * 2}px`, s.style.height = i.center ? `${Math.sqrt(r.width * r.width + r.height * r.height)}px` : `${n * 2}px`, s.style.top = i.center ? `${r.height / 2}px` : `${t}px`, s.style.left = i.center ? `${r.width / 2}px` : `${e}px`, s.style.background = i.color, s.style.borderRadius = "50%", s.style.opacity = `${i.initialOpacity}`, s.style.transform = "translate(-50%,-50%) scale(0)", s.style.transition = `transform ${i.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${i.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, s;
}, Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: Y
}, Symbol.toStringTag, { value: "Module" }));
function T(e, t, n, i) {
  const r = e - n, s = t - i;
  return Math.sqrt(r * r + s * s);
}
function G(e, { width: t, height: n, left: i, top: r }) {
  const s = e.clientX - i, o = e.clientY - r, a = T(s, o, 0, 0), h = T(s, o, t, 0), d = T(s, o, 0, n), _ = T(s, o, t, n), y = Math.max(a, h, d, _);
  return {
    x: s,
    y: o,
    diameter: y
  };
}
const Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: G,
  getPythagoreanDistance: T
}, Symbol.toStringTag, { value: "Module" })), R = "vRippleCountInternal";
function V(e, t) {
  e.dataset[R] = t.toString();
}
function C(e) {
  return parseInt(e.dataset[R] ?? "0", 10);
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
  delete e.dataset[R];
}
const Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: q,
  deleteRippleCount: J,
  getRippleCount: C,
  incrementRippleCount: Z
}, Symbol.toStringTag, { value: "Module" })), Pe = 1.05, $ = /* @__PURE__ */ new WeakMap(), $e = { ...W }, Ie = (e, t, n) => {
  const i = t.getBoundingClientRect(), r = window.getComputedStyle(t), { diameter: s, x: o, y: a } = G(e, i), h = X(r), d = Y(o, a, s * Pe, n, i);
  let _ = "", y = !1, u;
  function g() {
    d.style.transition = "opacity 120ms ease in out", d.style.opacity = "0", setTimeout(() => {
      h.remove(), q(t), C(t) === 0 && (J(t), t.style.position = _);
    }, 100);
  }
  function b(p) {
    typeof p < "u" && document.removeEventListener("pointerup", b), y ? g() : y = !0;
  }
  function w() {
    clearTimeout(u), h.remove(), document.removeEventListener("pointerup", b), document.removeEventListener("pointercancel", b), document.removeEventListener("pointercancel", w);
  }
  Z(t), r.position === "static" && (t.style.position && (_ = t.style.position), t.style.position = "relative"), h.appendChild(d), t.appendChild(h), document.addEventListener("pointerup", b), document.addEventListener("pointercancel", b), u = setTimeout(() => {
    document.removeEventListener("pointercancel", w), d.style.transform = "translate(-50%,-50%) scale(1)", d.style.opacity = `${n.finalOpacity}`, setTimeout(() => b(), n.duration);
  }, n.delay), document.addEventListener("pointercancel", w);
}, Re = {
  mounted(e, t) {
    $.set(e, t.value ?? {}), e.addEventListener("pointerdown", (n) => {
      var r;
      const i = $.get(e);
      (r = t.value) != null && r.disabled || i !== !1 && Ie(n, e, {
        ...$e,
        ...i
      });
    });
  },
  updated(e, t) {
    $.set(e, t.value ?? {});
  }
}, ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Re
}, Symbol.toStringTag, { value: "Module" })), k = 50, D = 500, K = /* @__PURE__ */ new WeakMap(), Ae = (e) => {
  const t = new IntersectionObserver((n) => {
    for (const i of n)
      if (i.isIntersecting) {
        const r = K.get(i.target);
        r && r.play(), t.unobserve(e);
      }
  });
  t.observe(e);
}, Me = (e, t) => e.getBoundingClientRect().top - t > window.innerHeight, Oe = {
  mounted(e, t) {
    let n = k, i = D;
    if (typeof t.value == "number" ? n = t.value : t.value && typeof t.value == "object" && (n = t.value.distance ?? k, i = t.value.duration ?? D), !Me(e, n))
      return;
    const r = e.animate(
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
    r.pause(), K.set(e, r), Ae(e);
  }
}, Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oe
}, Symbol.toStringTag, { value: "Module" })), j = /* @__PURE__ */ Object.assign({ "./draggable/index.ts": fe, "./loading/index.ts": ye, "./loading/loading.ts": ve, "./loading/types.ts": be, "./resize/index.ts": Se, "./ripple/index.ts": ze, "./ripple/options.ts": xe, "./ripple/utils/create-container-element.ts": Ee, "./ripple/utils/create-ripple-element.ts": Le, "./ripple/utils/get-element-position-utils.ts": Te, "./ripple/utils/ripple-count.ts": Ce, "./slide-in/index.ts": Fe }), xt = {
  install: function(e) {
    for (const t in j) {
      const n = j[t].default;
      if (!n) continue;
      const i = t.split("/")[1];
      t.split("/")[2] === "index.ts" && e.directive(i, n);
    }
  }
}, ke = "C", De = "cl", U = (e) => `${De}__${e}`, je = (e) => `${ke}${e || ""}`, I = N({
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
    const { type: e, size: t, color: n, name: i, spin: r } = this, s = U(`${e}-icon`), o = r ? U(`${e}-icon-spin`) : "";
    return e === "svg" ? L(
      "svg",
      {
        class: [s, o],
        style: {
          width: `${t}px`,
          height: `${t}px`
        }
      },
      {
        default: () => [L("use", { "xlink:href": `#${i}` })]
      }
    ) : L("i", {
      class: ["ri-" + i, s, o],
      style: {
        fontSize: `${t}px`,
        color: n
      }
    });
  }
}), Ue = Object.assign(I, {
  install(e) {
    e.component(je(I.name), I);
  }
}), B = {
  Icon: Ue
}, Et = (e) => {
  Object.keys(B).forEach((t) => {
    e.use(B[t]);
  });
};
export {
  _t as BaseCanvas,
  pe as BaseGL,
  Ue as CIcon,
  yt as Emitter,
  Et as RegisterComponents,
  xt as RegisterDirectives,
  ft as addEventListen,
  de as copyToClipboard,
  gt as copyToClipboardWithCallback,
  at as isAlpha,
  lt as isAlphaNum,
  ct as isAlphaNumUnderline,
  Ve as isArray,
  mt as isBlank,
  Ze as isBoolean,
  ot as isChinese,
  et as isDate,
  it as isEmail,
  Ge as isFunction,
  st as isIdCard,
  ut as isLower,
  qe as isNull,
  tt as isNullOrUndefined,
  Xe as isNumber,
  Ye as isObject,
  rt as isPhone,
  pt as isPort,
  Qe as isPromise,
  Ke as isRegExp,
  We as isString,
  ht as isTel,
  Je as isUndefined,
  dt as isUpper,
  nt as isUrl,
  vt as removeEventListen,
  St as useFileSelect,
  wt as useLoading,
  bt as useTheme
};
