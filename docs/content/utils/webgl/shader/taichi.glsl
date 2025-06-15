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