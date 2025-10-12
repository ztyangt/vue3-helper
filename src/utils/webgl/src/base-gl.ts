import VertexShaderSource from "./shader/vertex.glsl";
import FragmentShaderSource from "./shader/fragment.glsl";
import type { BaseGLOptions } from "./types";

export class BaseGL {
  gl: WebGL2RenderingContext;
  vertexShader?: WebGLShader;
  fragmentShader?: WebGLShader;
  program: WebGLProgram;
  canvas: HTMLCanvasElement;
  compileError?: string | null;

  constructor(target: string | HTMLCanvasElement, options: BaseGLOptions = {}) {
    let canvas: HTMLCanvasElement | null = null;
    if (typeof target === "string") {
      canvas = document.getElementById(target) as HTMLCanvasElement;
    } else {
      canvas = target;
    }
    if (!canvas) throw new Error("Canvas not found");
    this.canvas = canvas;

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;

    // 初始化 WebGL 上下文
    const gl = canvas.getContext("webgl2", { alpha: false });
    if (!gl) throw new Error("WebGL2 not supported");
    this.gl = gl;

    // 设置初始画布尺寸
    this.resizeCanvas();

    // 初始化着色器程序
    this.program = this.initProgram(options.vertexShaderSource || VertexShaderSource, options.fragmentShaderSource || FragmentShaderSource);
  }

  // 更新片段着色器
  updateFragmentShader(source: string) {
    // 1. 创建新的片段着色器
    const newFragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, source);
    if (!newFragmentShader) return;

    // 2. 分离旧的片段着色器
    if (this.fragmentShader) {
      this.gl.detachShader(this.program, this.fragmentShader);
      this.gl.deleteShader(this.fragmentShader); // 可选：删除旧的着色器
    }

    // 3. 附加新的片段着色器
    this.gl.attachShader(this.program, newFragmentShader);
    this.fragmentShader = newFragmentShader;

    // 4. 重新链接程序
    this.gl.linkProgram(this.program);
    const success = this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS);
    if (success) {
      this.gl.useProgram(this.program); // 重新使用程序
      return;
    }

    // 5. 处理链接失败
    console.warn(this.gl.getProgramInfoLog(this.program));
    throw new Error("Unable to initialize the shader program");
  }

  private createShader(type: GLenum, source: string) {
    const shader = this.gl.createShader(type);
    if (!shader) throw new Error("Unable to create shader");
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      this.compileError = null;
      return shader;
    }
    this.compileError = this.gl.getShaderInfoLog(shader);
    this.gl.deleteShader(shader);
  }

  // 初始化着色器程序
  private initProgram(vShaderSource: string, fShaderSource: string) {
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, vShaderSource);
    this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fShaderSource);

    const program = this.gl.createProgram();
    if (!program) throw new Error("Unable to create shader program");
    this.vertexShader && this.gl.attachShader(program, this.vertexShader);
    this.fragmentShader && this.gl.attachShader(program, this.fragmentShader);
    this.gl.linkProgram(program);

    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (!success) {
      console.warn(this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
      throw new Error("Unable to initialize the shader program");
    }

    this.gl.useProgram(program);
    return program;
  }

  // 清除画布
  clearGL() {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.resizeCanvas();
    this.updateViewport();
  }

  destory() {
    this.clearGL();
    this.gl.deleteProgram(this.program);
    if (this.vertexShader) this.gl.deleteShader(this.vertexShader);
    if (this.fragmentShader) this.gl.deleteShader(this.fragmentShader);
    this.canvas.style.opacity = "0";

    this.gl.getExtension("WEBGL_lose_context")?.loseContext();
  }

  // 坐标归一化处理
  protected normalizeCoords(x: number, y: number) {
    return [(2 * x) / this.canvas.width - 1, 1 - (2 * y) / this.canvas.height];
  }

  protected normalizeX(x: number) {
    return (2 * x) / this.canvas.width - 1;
  }

  protected normalizeY(y: number) {
    return 1 - (2 * y) / this.canvas.height;
  }

  // 调整画布尺寸
  protected resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const { clientWidth, clientHeight } = this.canvas;
    this.gl.canvas.width = clientWidth * dpr;
    this.gl.canvas.height = clientHeight * dpr;
  }

  // 更新 WebGL 视口
  protected updateViewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
}
