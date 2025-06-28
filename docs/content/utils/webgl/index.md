---
outline: deep
---

<script setup>
import Demo from './demo/demo.vue'
import Taichi from './demo/taichi.vue'
import Star from './demo/star.vue'
</script>

# WebGL 着色器 <Badge type="tip" text="类" />

:::info
提供 WebGL2 基础着色器功能，封装了 WebGL2 的初始化、着色器管理和渲染循环控制。
:::

## BaseGL

### 类型声明

```ts
/**
 * WebGL 基础类
 * @param target 目标 canvas 元素或元素 ID
 * @param options 配置选项
 * @param options.vertexShaderSource 顶点着色器源码，可选
 * @param options.fragmentShaderSource 片段着色器源码，可选
 */
export default class BaseGL {
  constructor(target: string | HTMLCanvasElement, options?: BaseGLOptions);
  
  /**
   * 更新片段着色器
   * @param source 新的片段着色器源码
   */
  updateFragmentShader(source: string): void;
  
  /**
   * 清除 WebGL 画布
   */
  clearGL(): void;
  
  /**
   * 销毁 WebGL 资源
   */
  destory(): void;
  
  /**
   * 归一化坐标处理
   * @param x x坐标
   * @param y y坐标
   * @returns 归一化后的坐标数组
   */
  protected normalizeCoords(x: number, y: number): [number, number];
  
  /**
   * 归一化 x 坐标
   * @param x x坐标
   * @returns 归一化后的x值
   */
  protected normalizeX(x: number): number;
  
  /**
   * 归一化 y 坐标
   * @param y y坐标
   * @returns 归一化后的y值
   */
  protected normalizeY(y: number): number;
}
```

### 参数说明

#### BaseGLOptions

| 参数名               | 类型     | 默认值            | 说明                     |
|----------------------|----------|-------------------|--------------------------|
| vertexShaderSource   | string   | 内置顶点着色器    | 顶点着色器 GLSL 源码     |
| fragmentShaderSource | string   | 内置片段着色器    | 片段着色器 GLSL 源码     |

## BaseCanvas

### 类型声明

```ts
/**
 * 基础矩形画布
 * @param target 目标 canvas 元素或元素 ID
 * @param fragmentShaderSource 片段着色器源码，可选
 */
export class BaseCanvas extends BaseGL {
  constructor(target: string | HTMLCanvasElement, fragmentShaderSource?: string);
  
  /**
   * 暂停渲染循环
   */
  pause(): void;
  
  /**
   * 停止渲染循环并重置计时器
   */
  stop(): void;
  
  /**
   * 重新开始渲染循环
   */
  restart(): void;
  
  /**
   * 恢复暂停的渲染循环
   */
  resume(): void;
  
  /**
   * 获取程序运行时间（秒）
   * @returns 运行时间（秒）
   */
  runTime(): number;
  
  /**
   * 获取当前 FPS
   * @returns 当前帧率
   */
  getFps(): number;
  
  /**
   * 更新片段着色器
   * @param fragmentShaderSource 新的片段着色器源码
   */
  updateFragmentShader(fragmentShaderSource: string): void;
}
```

### 使用示例

<Demo />

**着色器代码 `base.glgl`**

```glsl
#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;

out vec4 fragColor;

void main(){
  vec2 uv=gl_FragCoord.xy/iResolution.xy;
  vec3 col=.5+.5*cos(iTime+uv.xyx+vec3(0,2,4));
  fragColor=vec4(col,1.);
}
```

**vue代码**

```vue
<template>
  <div class="overhide br-5">
    <canvas class="gl-demo w-100" ref="canvasRef" />
  </div>
</template>

<script setup lang="ts">
import { BaseCanvas } from "@wiit/vue3-helper";
import { ref, onMounted, onBeforeUnmount } from "vue";
import fragmentShader from "./base.glsl";

let shader: BaseCanvas | null = null;
const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  if (!canvasRef.value) return;
  shader = new BaseCanvas(canvasRef.value, fragmentShader);
});

onBeforeUnmount(() => {
  shader?.destory();
});
</script>

<style lang="scss" scoped>
.gl-demo {
  aspect-ratio: 16/9;
}
</style>

```

## 特性说明

1. **自动适配高DPI屏幕**：根据设备像素比自动调整画布尺寸
2. **渲染控制**：提供暂停、恢复、停止和重启渲染循环的方法
3. **性能监控**：内置 FPS 计算功能
4. **着色器热更新**：支持运行时更新片段着色器
5. **坐标归一化**：提供将像素坐标转换为 WebGL 标准化坐标的方法

## 最佳实践

### 满船星梦

<Star />

```glsl
#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;

out vec4 fragColor;

// 渐变背景
vec4 _TopColor=vec4(.24,.27,.41,1);
vec4 _BottomColor=vec4(.07,.11,.21,1);

// 星星颜色
vec4 _Star1Color=vec4(1,.94,.72,.7);
vec4 _Star2Color=vec4(.18,.03,.41,.7);
vec4 _Star3Color=vec4(.63,.50,.81,.7);

// 网格大小
float _Grid=40.;
float _Size=.15;

// 视差速度
vec2 _Speed=vec2(0,3);

// 生成一个随机2D向量
// seed必须是较大的数字
// 输出范围：([0..1[,[0..1[)
vec2 randVector(in vec2 vec,in float seed){
  return vec2(fract(sin(vec.x*999.9+vec.y)*seed),fract(sin(vec.y*999.9+vec.x)*seed));
}
        
// 绘制星星网格
void drawStars(inout vec4 fragColor,in vec4 color,in vec2 uv,in float grid,in float size,in vec2 speed,in float seed)
{
  uv+=iTime*speed;
  
  // 局部网格
  vec2 local=mod(uv,grid)/grid;
  
  // 每个网格单元格的随机向量
  vec2 randv=randVector(floor(uv/grid),seed)-.5;
  float len=length(randv);
  
  // 如果中心 随机向量位于单元格内画圆
  if(len<.5){
    // 绘制局部网格上的圆
    float radius=1.-distance(local,vec2(.5,.5)+randv)/(size*(.5-len));
    if(radius>0.)fragColor+=color*radius;
  }
}

void main(){
  vec2 uv=gl_FragCoord.xy/iResolution.xy;
  vec3 col=.5+.5*cos(iTime+uv.xyx+vec3(0,2,4));
  fragColor=vec4(col,1.);
  
  // 背景
  fragColor=mix(_TopColor,_BottomColor,gl_FragCoord.x/iResolution.y);
  
  // 星星
  drawStars(fragColor,_Star1Color,gl_FragCoord.xy,_Grid,_Size,_Speed,123456.789);
  drawStars(fragColor,_Star2Color,gl_FragCoord.xy,_Grid*2./3.,_Size,_Speed/1.2,345678.912);
  drawStars(fragColor,_Star3Color,gl_FragCoord.xy,_Grid/2.,_Size*3./4.,_Speed/1.6,567891.234);
}
```

### 旋转太极图

<Taichi />

```glsl
#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
out vec4 fragColor;

void main(){
  vec2 uv=(gl_FragCoord.xy-.5*iResolution)/min(iResolution.x,iResolution.y)*2.;
  
  // 旋转UV坐标（每秒旋转π/2弧度）
  float angle=iTime*.5;
  mat2 rot=mat2(cos(angle),-sin(angle),
  sin(angle),cos(angle));
  vec2 rotatedUV=rot*uv;
  
  float d=length(uv);
  // 蓝白渐变背景
  vec3 color=mix(vec3(.455,.478,.910),vec3(1.),1.-d*.8);
  
  if(d<1.)color=vec3(0.);
  
  // 使用旋转后的UV坐标创建图案
  bool inTopHalfCircle=rotatedUV.y<sqrt(.25-pow(rotatedUV.x-.5,2.));
  bool inBottomHalfCircle=rotatedUV.y<-sqrt(.25-pow(rotatedUV.x+.5,2.));
  
  if(d<1.&&(inTopHalfCircle||inBottomHalfCircle))color=vec3(1.);
  if(length(rotatedUV-vec2(.5,0))<.1)color=vec3(0);
  if(length(rotatedUV-vec2(-.5,0))<.1)color=vec3(1);
  
  fragColor=vec4(color,1.);
}
```

## 内置着色器变量

在片段着色器中可以使用以下内置 uniform 变量：

- `iResolution` (vec2): 画布分辨率（像素）
- `iTime` (float): 着色器运行时间（秒）

示例着色器代码：

```glsl
#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;

out vec4 fragColor;

void main(){
  vec2 uv=gl_FragCoord.xy/iResolution.xy;
  vec3 col=.5+.5*cos(iTime+uv.xyx+vec3(0,2,4));
  fragColor=vec4(
    uv.x,
    uv.y,
    sin(iTime) * 0.5 + 0.5,
    1.0
  );;
}
```
