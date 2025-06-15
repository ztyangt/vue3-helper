import{v as k}from"./chunks/theme.D867yB04.js";import{d as t,p as e,v as r,$ as E,c as n,o as l,j as d,_ as g,ag as a,G as h}from"./chunks/framework.Do3N3WoO.js";var F=`#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;

out vec4 fragColor;

void main(){
  vec2 uv=gl_FragCoord.xy/iResolution.xy;
  vec3 col=.5+.5*cos(iTime+uv.xyx+vec3(0,2,4));
  fragColor=vec4(col,1.);
}`;const o={class:"overhide br-5"},b=t({__name:"demo",setup(p){let i=null;const s=e();return r(()=>{s.value&&(i=new k(s.value,F))}),E(()=>{i==null||i.destory()}),(y,c)=>(l(),n("div",o,[d("canvas",{class:"gl-demo w-100",ref_key:"canvasRef",ref:s},null,512)]))}}),u=g(b,[["__scopeId","data-v-ae507068"]]);var A=`#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
out vec4 fragColor;

void main(){
  vec2 uv=(gl_FragCoord.xy-.5*iResolution)/min(iResolution.x,iResolution.y)*2.;
  
  
  float angle=iTime*.5;
  mat2 rot=mat2(cos(angle),-sin(angle),
  sin(angle),cos(angle));
  vec2 rotatedUV=rot*uv;
  
  float d=length(uv);
  
  vec3 color=mix(vec3(.455,.478,.910),vec3(1.),1.-d*.8);
  
  if(d<1.)color=vec3(0.);
  
  
  bool inTopHalfCircle=rotatedUV.y<sqrt(.25-pow(rotatedUV.x-.5,2.));
  bool inBottomHalfCircle=rotatedUV.y<-sqrt(.25-pow(rotatedUV.x+.5,2.));
  
  if(d<1.&&(inTopHalfCircle||inBottomHalfCircle))color=vec3(1.);
  if(length(rotatedUV-vec2(.5,0))<.1)color=vec3(0);
  if(length(rotatedUV-vec2(-.5,0))<.1)color=vec3(1);
  
  fragColor=vec4(color,1.);
}`;const D={class:"overhide mt-10 br-5"},C=t({__name:"taichi",setup(p){let i=null;const s=e();return r(()=>{s.value&&(i=new k(s.value,A))}),E(()=>{i==null||i.destory()}),(y,c)=>(l(),n("div",D,[d("canvas",{class:"gl-demo w-100",ref_key:"canvasRef",ref:s},null,512)]))}}),m=g(C,[["__scopeId","data-v-a72541c8"]]);var v=`#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;

out vec4 fragColor;

vec4 _TopColor=vec4(.24,.27,.41,1);
vec4 _BottomColor=vec4(.07,.11,.21,1);

vec4 _Star1Color=vec4(1,.94,.72,.7);
vec4 _Star2Color=vec4(.18,.03,.41,.7);
vec4 _Star3Color=vec4(.63,.50,.81,.7);

float _Grid=40.;
float _Size=.15;

vec2 _Speed=vec2(0,3);

        vec2 randVector(in vec2 vec,in float seed){
          return vec2(fract(sin(vec.x*999.9+vec.y)*seed),fract(sin(vec.y*999.9+vec.x)*seed));
        }
        
        
        void drawStars(inout vec4 fragColor,in vec4 color,in vec2 uv,in float grid,in float size,in vec2 speed,in float seed)
        {
          uv+=iTime*speed;
          
          
          vec2 local=mod(uv,grid)/grid;
          
          
          vec2 randv=randVector(floor(uv/grid),seed)-.5;
          float len=length(randv);
          
          
          if(len<.5){
            
            float radius=1.-distance(local,vec2(.5,.5)+randv)/(size*(.5-len));
            if(radius>0.)fragColor+=color*radius;
          }
        }
        
        void main(){
          vec2 uv=gl_FragCoord.xy/iResolution.xy;
          vec3 col=.5+.5*cos(iTime+uv.xyx+vec3(0,2,4));
          fragColor=vec4(col,1.);
          
          
          fragColor=mix(_TopColor,_BottomColor,gl_FragCoord.x/iResolution.y);
          
          
          drawStars(fragColor,_Star1Color,gl_FragCoord.xy,_Grid,_Size,_Speed,123456.789);
          drawStars(fragColor,_Star2Color,gl_FragCoord.xy,_Grid*2./3.,_Size,_Speed/1.2,345678.912);
          drawStars(fragColor,_Star3Color,gl_FragCoord.xy,_Grid/2.,_Size*3./4.,_Speed/1.6,567891.234);
        }`;const B={class:"overhide br-5 mt-10"},f=t({__name:"star",setup(p){let i=null;const s=e();return r(()=>{s.value&&(i=new k(s.value,v))}),E(()=>{i==null||i.destory()}),(y,c)=>(l(),n("div",B,[d("canvas",{class:"gl-demo w-100",ref_key:"canvasRef",ref:s},null,512)]))}}),_=g(f,[["__scopeId","data-v-9e35bc88"]]),q=JSON.parse('{"title":"WebGL 基础着色器","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"utils/webgl/index.md","filePath":"content/utils/webgl/index.md","lastUpdated":1749968519000}'),x={name:"utils/webgl/index.md"},R=Object.assign(x,{setup(p){return(i,s)=>(l(),n("div",null,[s[0]||(s[0]=a("",12)),h(u),s[1]||(s[1]=a("",8)),h(_),s[2]||(s[2]=a("",2)),h(m),s[3]||(s[3]=a("",6))]))}});export{q as __pageData,R as default};
