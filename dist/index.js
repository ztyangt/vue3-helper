var ue = Object.defineProperty;
var he = (e, t, n) => t in e ? ue(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var y = (e, t, n) => he(e, typeof t != "symbol" ? t + "" : t, n);
import { useDark as pe } from "@vueuse/core";
import { ref as T, defineComponent as F, h as C, createApp as me, nextTick as V, computed as H, onMounted as ge, watch as fe, createVNode as L, Fragment as ve } from "vue";
const Je = (e) => typeof e == "string", Ke = (e) => typeof e == "number", Qe = (e) => typeof e == "object", et = (e) => typeof e == "function", tt = (e) => Array.isArray(e), nt = (e) => typeof e == "boolean", st = (e) => e === null, it = (e) => e === void 0, rt = (e) => e instanceof RegExp, ot = (e) => e instanceof Promise, at = (e) => e instanceof Date, lt = (e) => e == null, ct = (e) => /^http[s]?:\/\/.*/.test(e), dt = (e) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e), ut = (e) => /^0?(13[0-9]|15[012356789]|18[0-9]|14[123578]|16[6]|17[035768]|19[19])[0-9]{8}$/.test(e), ht = (e) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e), pt = (e) => /^[\u4e00-\u9fa5]{0,}$/.test(e), mt = (e) => /^[a-zA-Z]+$/.test(e), gt = (e) => /^[A-Za-z0-9]+$/.test(e), ft = (e) => /^[A-Za-z0-9_]+$/.test(e), vt = (e) => /^[A-Z]+$/.test(e), yt = (e) => /^[a-z]+$/.test(e), _t = (e) => /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/.test(e), bt = (e) => /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(e), wt = (e) => e == null || e === "" || e === 0 || e === !1 || Array.isArray(e) && e.length === 0 || typeof e == "object" && Object.keys(e).length === 0;
async function ye(e) {
  try {
    if (navigator.clipboard && window.isSecureContext)
      return await navigator.clipboard.writeText(e), !0;
    const t = document.createElement("textarea");
    t.value = e, t.style.position = "fixed", t.style.left = "-9999px", t.style.top = "0", t.style.opacity = "0", document.body.appendChild(t), t.select();
    let n = !1;
    try {
      n = document.execCommand("copy");
    } catch (s) {
      console.warn("Copy to clipboard failed:", s);
    }
    return document.body.removeChild(t), n;
  } catch (t) {
    return console.error("Copy to clipboard failed:", t), !1;
  }
}
function St(e, t) {
  ye(e).then(t).catch(() => t(!1));
}
function xt(e, t, n, s = !1) {
  e.addEventListener && typeof e.addEventListener == "function" && e.addEventListener(t, n, s);
}
function Et(e, t, n, s = !1) {
  e.removeEventListener && typeof e.removeEventListener == "function" && e.removeEventListener(t, n, s);
}
var _e = `#version 300 es

in vec4 a_Position;

void main(){
  gl_PointSize=10.;
  gl_Position=a_Position;
}`, be = `#version 300 es
precision highp float;

out vec4 outColor;

void main(){
  outColor=vec4(1.,0.,0.,1.);
}`;
class we {
  constructor(t, n = {}) {
    y(this, "gl");
    y(this, "vertexShader");
    y(this, "fragmentShader");
    y(this, "program");
    y(this, "canvas");
    y(this, "compileError");
    let s = null;
    if (typeof t == "string" ? s = document.getElementById(t) : s = t, !s) throw new Error("Canvas not found");
    this.canvas = s;
    const i = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * i, this.canvas.height = this.canvas.clientHeight * i;
    const r = s.getContext("webgl2", { alpha: !1 });
    if (!r) throw new Error("WebGL2 not supported");
    this.gl = r, this.resizeCanvas(), this.program = this.initProgram(n.vertexShaderSource || _e, n.fragmentShaderSource || be);
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
    const s = this.gl.createShader(t);
    if (!s) throw new Error("Unable to create shader");
    if (this.gl.shaderSource(s, n), this.gl.compileShader(s), this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS))
      return this.compileError = null, s;
    this.compileError = this.gl.getShaderInfoLog(s), this.gl.deleteShader(s);
  }
  // 初始化着色器程序
  initProgram(t, n) {
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, t), this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, n);
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
    const t = window.devicePixelRatio || 1, { clientWidth: n, clientHeight: s } = this.canvas;
    this.gl.canvas.width = n * t, this.gl.canvas.height = s * t;
  }
  // 更新 WebGL 视口
  updateViewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
}
var Se = `#version 300 es

in vec4 a_Position;

void main(){
  gl_Position=a_Position;
}`;
class Lt extends we {
  // 控制渲染的标志
  constructor(n, s) {
    super(n, { vertexShaderSource: Se, fragmentShaderSource: s });
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
  updateFragmentShader(n) {
    super.updateFragmentShader(n);
  }
  render() {
    if (!this.program || !this.isRendering) return;
    this.clearGL();
    const n = performance.now(), s = n - this.lastFrameTime;
    this.frameCount++, s >= 1e3 && (this.fps = parseFloat((this.frameCount / (s / 1e3)).toFixed(2)), this.frameCount = 0, this.lastFrameTime = n);
    const i = this.gl.getUniformLocation(this.program, "iResolution");
    this.gl.uniform2f(i, this.gl.canvas.width, this.gl.canvas.height);
    const r = this.gl.getUniformLocation(this.program, "iTime");
    this.endTime = performance.now(), this.gl.uniform1f(r, (this.endTime - this.startTime) / 1e3), this.gl.drawArrays(this.gl.TRIANGLES, 0, 6), this.isRendering && (this.currentAnimationFrame = requestAnimationFrame(() => this.render()));
  }
  initRect() {
    const n = this.gl.getAttribLocation(this.program, "a_Position");
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer()), this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]), this.gl.STATIC_DRAW), this.gl.vertexAttribPointer(n, 2, this.gl.FLOAT, !1, 0, 0), this.gl.enableVertexAttribArray(n);
  }
}
class Ct {
  constructor(t) {
    y(this, "_listeners");
    y(this, "_onceListeners");
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
    const s = (...i) => {
      n(...i), this.off(t, s);
    };
    this._onceListeners.set(n, s), this.on(t, s);
  }
  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给监听器的参数
   */
  emit(t, ...n) {
    const s = this._listeners[t];
    s && new Set(s).forEach((r) => r(...n));
  }
  /**
   * 移除事件监听器
   * @param eventName 事件名称
   * @param listener 要移除的回调函数（可选）
   */
  off(t, n) {
    if (this._listeners[t])
      if (n) {
        const s = this._onceListeners.get(n);
        s ? (this._listeners[t].delete(s), this._onceListeners.delete(n)) : this._listeners[t].delete(n);
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
const Tt = () => {
  const e = pe({
    selector: "html",
    attribute: "class",
    valueDark: "dark",
    valueLight: "light"
  });
  return { isDark: e, toggleTheme: async (n, s = !1) => {
    if (!s) {
      e.value = !e.value;
      return;
    }
    if (!n) {
      e.value = !e.value;
      return;
    }
    try {
      const i = n.clientX, r = n.clientY, o = Math.hypot(Math.max(i, innerWidth - i), Math.max(r, innerHeight - r));
      let a;
      const p = document.startViewTransition(() => {
        const d = document.documentElement;
        a = d.classList.contains("dark"), d.classList.add(a ? "light" : "dark"), d.classList.remove(a ? "dark" : "light");
      });
      p.ready.then(() => {
        const d = [`circle(0px at ${i}px ${r}px)`, `circle(${o}px at ${i}px ${r}px)`];
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
      }), await p.finished, e.value = !e.value;
    } catch {
      e.value = !e.value;
    }
  } };
}, Pt = (e = !1) => {
  const t = T(e);
  return {
    loading: t,
    setLoading: (i) => {
      t.value = i;
    },
    toggleLoading: () => {
      t.value = !t.value;
    }
  };
}, $t = (e) => {
  const t = (o) => {
    const a = document.createElement("input");
    return a.type = "file", a.multiple = !!o.multiple, o.directory && (a.webkitdirectory = !0, a.mozdirectory = !0), o.accept && o.accept.length > 0 && (a.accept = o.accept.join(",")), a;
  }, n = () => {
    const { dragRef: o } = e || {};
    if (!(o != null && o.value)) return;
    const a = o.value, p = (h) => {
      h.preventDefault();
    }, d = (h) => {
      h.preventDefault(), a.classList.add("drag-active");
    }, _ = (h) => {
      h.preventDefault(), a.classList.remove("drag-active");
    }, b = (h) => {
      var v;
      h.preventDefault(), a.classList.remove("drag-active"), (v = e == null ? void 0 : e.dragCallback) == null || v.call(e, h);
    };
    return a.addEventListener("dragover", p), a.addEventListener("dragenter", d), a.addEventListener("dragleave", _), a.addEventListener("drop", b), () => {
      a.removeEventListener("dragover", p), a.removeEventListener("dragenter", d), a.removeEventListener("dragleave", _), a.removeEventListener("drop", b);
    };
  }, s = (o) => new Promise((a, p) => {
    const d = t(o);
    d.style.display = "none";
    const _ = setTimeout(() => {
      p(new Error("选择取消或超时")), document.body.removeChild(d);
    }, 3e4);
    d.onchange = (b) => {
      clearTimeout(_);
      const h = b.target.files;
      h != null && h.length ? a(h) : p(new Error("未选择文件")), document.body.removeChild(d);
    }, document.body.appendChild(d), d.click();
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
}, xe = {
  mounted: function(e) {
    e.style.cursor = "move", e.style.position = "absolute", e.onmousedown = function(t) {
      let n = t.pageX - e.offsetLeft, s = t.pageY - e.offsetTop;
      document.onmousemove = function(i) {
        let r = i.pageX - n, o = i.pageY - s, a = parseInt(window.getComputedStyle(e.parentNode).width) - parseInt(window.getComputedStyle(e).width), p = parseInt(window.getComputedStyle(e.parentNode).height) - parseInt(window.getComputedStyle(e).height);
        r < 0 ? r = 0 : r > a && (r = a), o < 0 ? o = 0 : o > p && (o = p), e.style.left = r + "px", e.style.top = o + "px";
      }, document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
}, Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xe
}, Symbol.toStringTag, { value: "Module" })), q = F({
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
}), Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: q
}, Symbol.toStringTag, { value: "Module" })), Ce = {
  mounted(e, t) {
    e.style.position = "relative";
    const n = typeof t.value == "boolean" ? { value: t.value } : t.value || {}, s = n.delay || 300;
    let i = null;
    const r = () => {
      const o = me(q, {
        text: n.text,
        background: n.background,
        spinnerColor: n.spinnerColor,
        style: n.style || "loader-l13",
        visible: n.value ?? !0
      }), a = o.mount(document.createElement("div"));
      e._loadingInstance = a, e._loadingApp = o, e.appendChild(a.$el), V(() => {
        I(e, t);
      });
    };
    n.value && (i = window.setTimeout(() => {
      n.value && r();
    }, s)), e._loadingTimeoutId = i;
  },
  updated(e, t) {
    if (JSON.stringify(t.oldValue) !== JSON.stringify(t.value)) {
      const n = typeof t.value == "boolean" ? { value: t.value } : t.value || {};
      if (e._loadingTimeoutId && (clearTimeout(e._loadingTimeoutId), e._loadingTimeoutId = null), !n.value) {
        I(e, t);
        return;
      }
      const s = n.delay || 0;
      e._loadingTimeoutId = window.setTimeout(() => {
        n.value && I(e, t);
      }, s);
    }
  },
  unmounted(e) {
    var t, n, s;
    e._loadingTimeoutId && clearTimeout(e._loadingTimeoutId), (t = e._loadingApp) == null || t.unmount(), (s = (n = e._loadingInstance) == null ? void 0 : n.$el) == null || s.remove(), e._loadingInstance = void 0, e._loadingApp = void 0;
  }
};
function I(e, t) {
  var i, r, o;
  if (!e._loadingInstance) return;
  const n = typeof t.value == "boolean" ? t.value : ((i = t.value) == null ? void 0 : i.value) ?? !0;
  e.style.position = n ? "relative" : "";
  const s = e._loadingInstance.$el.parentElement;
  s && s.parentNode === e && s !== e.lastElementChild && e.appendChild(s), (o = (r = e._loadingInstance).setVisible) == null || o.call(r, n), e._loadingInstance.$el && (e._loadingInstance.$el.style.display = n ? "flex" : "none");
}
const Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ce
}, Symbol.toStringTag, { value: "Module" })), Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), $e = {
  mounted(e, t) {
    var U, B;
    e.style.position = "absolute", e.style.userSelect = "none";
    const n = () => {
      var u;
      const c = document.createElement("div");
      return c.style.position = "absolute", c.style.pointerEvents = "none", c.style.border = "2px dashed #3498db", c.style.backgroundColor = "rgba(52, 152, 219, 0.1)", c.style.zIndex = "1000", c.style.display = "none", (u = e.parentElement) == null || u.appendChild(c), c;
    }, s = (c) => {
      const u = document.createElement("div");
      return u.className = `resize-handle resize-handle-${c}`, u.style.position = "absolute", u.style.width = "10px", u.style.height = "10px", u.style.backgroundColor = "#fff", u.style.opacity = "0", u.style.border = "1px solid #333", u.style.zIndex = "100", u.style.touchAction = "none", c.includes("top") && (u.style.top = "-5px"), c.includes("bottom") && (u.style.bottom = "-5px"), c.includes("left") && (u.style.left = "-5px"), c.includes("right") && (u.style.right = "-5px"), c === "top-left" && (u.style.cursor = "nwse-resize"), c === "top-right" && (u.style.cursor = "nesw-resize"), c === "bottom-left" && (u.style.cursor = "nesw-resize"), c === "bottom-right" && (u.style.cursor = "nwse-resize"), e.appendChild(u), u;
    };
    e.__dragPreview = n();
    const i = [
      s("top-left"),
      s("top-right"),
      s("bottom-left"),
      s("bottom-right")
    ];
    e.__resizeHandles = i, e.__resizeListeners = [];
    const r = e.parentElement;
    if (!r) return;
    getComputedStyle(r).position === "static" && (r.style.position = "relative");
    const o = ((U = t.value) == null ? void 0 : U.minWidth) ?? 50, a = ((B = t.value) == null ? void 0 : B.minHeight) ?? 50;
    let p = !1, d = null, _ = 0, b = 0, h = 0, v = 0, l = 0, g = 0, m = 0, f = 0, x = 0, w = 0;
    const R = () => ({
      left: 0,
      top: 0,
      right: r.clientWidth,
      bottom: r.clientHeight
    }), ae = () => {
      if (!e.__dragPreview) return;
      const c = e.__dragPreview;
      c.style.display = "block", c.style.left = `${x}px`, c.style.top = `${w}px`, c.style.width = `${m}px`, c.style.height = `${f}px`;
    }, le = () => {
      e.__dragPreview && (e.__dragPreview.style.display = "none");
    }, ce = (c, u) => {
      c.preventDefault(), c.stopPropagation(), p = !0, d = u, _ = c.clientX, b = c.clientY, h = e.offsetWidth, v = e.offsetHeight, l = e.offsetLeft, g = e.offsetTop, m = h, f = v, x = l, w = g, document.addEventListener("mousemove", D), document.addEventListener("mouseup", j);
    }, D = (c) => {
      if (!p || !d) return;
      const u = c.clientX - _, E = c.clientY - b, S = R();
      switch (d) {
        case "top-left":
          m = Math.max(o, h - u), f = Math.max(a, v - E), x = l + (h - m), w = g + (v - f);
          break;
        case "top-right":
          m = Math.max(o, h + u), f = Math.max(a, v - E), w = g + (v - f);
          break;
        case "bottom-left":
          m = Math.max(o, h - u), f = Math.max(a, v + E), x = l + (h - m);
          break;
        case "bottom-right":
          m = Math.max(o, h + u), f = Math.max(a, v + E);
          break;
      }
      x < S.left && (x = S.left, d.includes("left") && (m = h + l - S.left)), w < S.top && (w = S.top, d.includes("top") && (f = v + g - S.top)), x + m > S.right && (m = S.right - x), w + f > S.bottom && (f = S.bottom - w), m = Math.max(o, m), f = Math.max(a, f), ae();
    }, j = () => {
      p && (p = !1, e.style.width = `${m}px`, e.style.height = `${f}px`, e.style.left = `${x}px`, e.style.top = `${w}px`, le(), document.removeEventListener("mousemove", D), document.removeEventListener("mouseup", j));
    };
    i.forEach((c, u) => {
      var N;
      const E = ["top-left", "top-right", "bottom-left", "bottom-right"], S = (de) => ce(de, E[u]);
      c.addEventListener("mousedown", S), (N = e.__resizeListeners) == null || N.push({ mousedown: S });
    });
  },
  unmounted(e) {
    e.__resizeHandles && e.__resizeHandles.forEach((t) => {
      t.remove();
    }), e.__resizeListeners && e.__resizeListeners.forEach((t, n) => {
      var s;
      (s = e.__resizeHandles) != null && s[n] && e.__resizeHandles[n].removeEventListener("mousedown", t.mousedown);
    }), e.__dragPreview && e.__dragPreview.remove();
  }
}, Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $e
}, Symbol.toStringTag, { value: "Module" })), Z = {
  directive: "ripple",
  color: "var(--ripple-color)",
  initialOpacity: 0.1,
  finalOpacity: 0.05,
  duration: 350,
  easing: "ease-out",
  delay: 60,
  disabled: !1,
  center: !1
}, Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_PLUGIN_OPTIONS: Z
}, Symbol.toStringTag, { value: "Module" })), J = ({
  borderTopLeftRadius: e,
  borderTopRightRadius: t,
  borderBottomLeftRadius: n,
  borderBottomRightRadius: s
}) => {
  const i = document.createElement("div");
  return i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%", i.style.position = "absolute", i.style.borderRadius = `${e} ${t} ${s} ${n}`, i.style.overflow = "hidden", i.style.pointerEvents = "none", i.style.webkitMaskImage = "-webkit-radial-gradient(white, black)", i;
}, ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createContainer: J
}, Symbol.toStringTag, { value: "Module" })), K = (e, t, n, s, i) => {
  const r = document.createElement("div");
  return r.style.position = "absolute", r.style.width = s.center ? `${Math.sqrt(i.width * i.width + i.height * i.height)}px` : `${n * 2}px`, r.style.height = s.center ? `${Math.sqrt(i.width * i.width + i.height * i.height)}px` : `${n * 2}px`, r.style.top = s.center ? `${i.height / 2}px` : `${t}px`, r.style.left = s.center ? `${i.width / 2}px` : `${e}px`, r.style.background = s.color, r.style.borderRadius = "50%", r.style.opacity = `${s.initialOpacity}`, r.style.transform = "translate(-50%,-50%) scale(0)", r.style.transition = `transform ${s.duration / 1e3}s   cubic-bezier(0, 0.5, 0.25, 1)
  , opacity ${s.duration / 1e3}s
  cubic-bezier(0.0, 0, 0.2, 1)
  `, r;
}, Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRippleElement: K
}, Symbol.toStringTag, { value: "Module" }));
function P(e, t, n, s) {
  const i = e - n, r = t - s;
  return Math.sqrt(i * i + r * r);
}
function Q(e, { width: t, height: n, left: s, top: i }) {
  const r = e.clientX - s, o = e.clientY - i, a = P(r, o, 0, 0), p = P(r, o, t, 0), d = P(r, o, 0, n), _ = P(r, o, t, n), b = Math.max(a, p, d, _);
  return {
    x: r,
    y: o,
    diameter: b
  };
}
const Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDistanceToFurthestCorner: Q,
  getPythagoreanDistance: P
}, Symbol.toStringTag, { value: "Module" })), O = "vRippleCountInternal";
function ee(e, t) {
  e.dataset[O] = t.toString();
}
function $(e) {
  return parseInt(e.dataset[O] ?? "0", 10);
}
function te(e) {
  const t = $(e);
  ee(e, t + 1);
}
function ne(e) {
  const t = $(e);
  ee(e, t - 1);
}
function se(e) {
  delete e.dataset[O];
}
const ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decrementRippleCount: ne,
  deleteRippleCount: se,
  getRippleCount: $,
  incrementRippleCount: te
}, Symbol.toStringTag, { value: "Module" })), Fe = 1.05, z = /* @__PURE__ */ new WeakMap(), Oe = { ...Z }, De = (e, t, n) => {
  const s = t.getBoundingClientRect(), i = window.getComputedStyle(t), { diameter: r, x: o, y: a } = Q(e, s), p = J(i), d = K(o, a, r * Fe, n, s);
  let _ = "", b = !1, h;
  function v() {
    d.style.transition = "opacity 120ms ease in out", d.style.opacity = "0", setTimeout(() => {
      p.remove(), ne(t), $(t) === 0 && (se(t), t.style.position = _);
    }, 100);
  }
  function l(m) {
    typeof m < "u" && document.removeEventListener("pointerup", l), b ? v() : b = !0;
  }
  function g() {
    clearTimeout(h), p.remove(), document.removeEventListener("pointerup", l), document.removeEventListener("pointercancel", l), document.removeEventListener("pointercancel", g);
  }
  te(t), i.position === "static" && (t.style.position && (_ = t.style.position), t.style.position = "relative"), p.appendChild(d), t.appendChild(p), document.addEventListener("pointerup", l), document.addEventListener("pointercancel", l), h = setTimeout(() => {
    document.removeEventListener("pointercancel", g), d.style.transform = "translate(-50%,-50%) scale(1)", d.style.opacity = `${n.finalOpacity}`, setTimeout(() => l(), n.duration);
  }, n.delay), document.addEventListener("pointercancel", g);
}, je = {
  mounted(e, t) {
    z.set(e, t.value ?? {}), e.addEventListener("pointerdown", (n) => {
      var i;
      const s = z.get(e);
      (i = t.value) != null && i.disabled || s !== !1 && De(n, e, {
        ...Oe,
        ...s
      });
    });
  },
  updated(e, t) {
    z.set(e, t.value ?? {});
  }
}, Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: je
}, Symbol.toStringTag, { value: "Module" })), W = 50, X = 500, ie = /* @__PURE__ */ new WeakMap(), Be = (e) => {
  const t = new IntersectionObserver((n) => {
    for (const s of n)
      if (s.isIntersecting) {
        const i = ie.get(s.target);
        i && i.play(), t.unobserve(e);
      }
  });
  t.observe(e);
}, Ne = (e, t) => e.getBoundingClientRect().top - t > window.innerHeight, He = {
  mounted(e, t) {
    let n = W, s = X;
    if (typeof t.value == "number" ? n = t.value : t.value && typeof t.value == "object" && (n = t.value.distance ?? W, s = t.value.duration ?? X), !Ne(e, n))
      return;
    const i = e.animate(
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
    i.pause(), ie.set(e, i), Be(e);
  }
}, We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: He
}, Symbol.toStringTag, { value: "Module" })), Y = /* @__PURE__ */ Object.assign({ "./draggable/index.ts": Ee, "./loading/index.ts": Te, "./loading/loading.ts": Le, "./loading/types.ts": Pe, "./resize/index.ts": Re, "./ripple/index.ts": Ue, "./ripple/options.ts": Ie, "./ripple/utils/create-container-element.ts": ze, "./ripple/utils/create-ripple-element.ts": Ae, "./ripple/utils/get-element-position-utils.ts": Me, "./ripple/utils/ripple-count.ts": ke, "./slide-in/index.ts": We }), Rt = {
  install: function(e) {
    for (const t in Y) {
      const n = Y[t].default;
      if (!n) continue;
      const s = t.split("/")[1];
      t.split("/")[2] === "index.ts" && e.directive(s, n);
    }
  }
}, Xe = "C", Ye = "cl", k = (e) => `${Ye}__${e}`, re = (e) => `${Xe}${e || ""}`, A = F({
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
    const { type: e, size: t, color: n, name: s, spin: i } = this, r = k(`${e}-icon`), o = i ? k(`${e}-icon-spin`) : "";
    return e === "svg" ? C(
      "svg",
      {
        class: [r, o],
        style: {
          width: `${t}px`,
          height: `${t}px`
        }
      },
      {
        default: () => [C("use", { "xlink:href": `#${s}` })]
      }
    ) : C("i", {
      class: ["ri-" + s, r, o],
      style: {
        fontSize: `${t}px`,
        color: n
      }
    });
  }
}), oe = Object.assign(A, {
  install(e) {
    e.component(re(A.name), A);
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
    slots: n
  }) {
    const s = k("segmented"), i = T(null), r = T(null), o = T(-1), a = T(!1), p = H(() => e.options.findIndex((l) => l.value === e.value)), d = (l) => {
      e.disabled || e.value !== l && (t("update:value", l), t("change", l));
    }, _ = async (l = !1) => {
      if (!i.value || !r.value) return;
      await V();
      const g = i.value, m = r.value, f = g.parentElement;
      if (!f) return;
      const x = f.getBoundingClientRect(), w = g.getBoundingClientRect();
      if (l && (m.style.transition = "none"), m.style.width = `${w.width}px`, m.style.height = `${w.height}px`, m.style.left = `${w.left - x.left}px`, !l && o.value !== -1 && p.value !== -1) {
        const R = p.value > o.value ? "right" : "left";
        m.classList.remove(`${s}-thumb-left`, `${s}-thumb-right`), m.classList.add(`${s}-thumb-${R}`);
      }
      l && requestAnimationFrame(() => {
        m.style.transition = "";
      }), o.value = p.value;
    };
    ge(() => {
      a.value = !0, _(!0);
    }), fe(() => e.value, () => _());
    const b = H(() => ({
      [s]: !0,
      [`${s}-block`]: e.block,
      [`${s}-disabled`]: e.disabled,
      [`${s}-${e.size}`]: !0
    })), h = (l) => ({
      [`${s}-item`]: !0,
      [`${s}-item-selected`]: e.value === l.value,
      [`${s}-item-disabled`]: l.disabled
    }), v = (l) => {
      const g = `label-${l.value}`;
      return n[g] ? n[g]({
        option: l
      }) : L(ve, null, [l.icon && L(oe, {
        class: "mr-5",
        name: l.icon
      }, null), L("span", {
        class: `${s}-item-label`
      }, [l.label])]);
    };
    return () => L("div", {
      class: b.value
    }, [L("div", {
      ref: r,
      class: `${s}-thumb`
    }, null), e.options.map((l, g) => L("div", {
      ref: e.value === l.value ? i : null,
      key: l.value,
      class: h(l),
      onClick: () => !l.disabled && d(l.value),
      "data-index": g
    }, [v(l)]))]);
  }
}), Ge = Object.assign(M, {
  install(e) {
    e.component(re(M.name), M);
  }
}), G = {
  Icon: oe,
  Segmented: Ge
}, It = (e) => {
  Object.keys(G).forEach((t) => {
    e.use(G[t]);
  });
};
export {
  Lt as BaseCanvas,
  we as BaseGL,
  oe as CIcon,
  Ge as CSegmented,
  Ct as Emitter,
  It as RegisterComponents,
  Rt as RegisterDirectives,
  xt as addEventListen,
  ye as copyToClipboard,
  St as copyToClipboardWithCallback,
  mt as isAlpha,
  gt as isAlphaNum,
  ft as isAlphaNumUnderline,
  tt as isArray,
  wt as isBlank,
  nt as isBoolean,
  pt as isChinese,
  at as isDate,
  dt as isEmail,
  et as isFunction,
  ht as isIdCard,
  yt as isLower,
  st as isNull,
  lt as isNullOrUndefined,
  Ke as isNumber,
  Qe as isObject,
  ut as isPhone,
  bt as isPort,
  ot as isPromise,
  rt as isRegExp,
  Je as isString,
  _t as isTel,
  it as isUndefined,
  vt as isUpper,
  ct as isUrl,
  Et as removeEventListen,
  $t as useFileSelect,
  Pt as useLoading,
  Tt as useTheme
};
