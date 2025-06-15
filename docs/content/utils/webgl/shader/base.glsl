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