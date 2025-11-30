import{H as e}from"./chunks/theme.OG7ZUnQq.js";import{d as r,p as E,v as d,$ as g,c as h,o as k,j as a,_ as y,C as o,aa as l,G as p,a as F}from"./chunks/framework.De8Tkxod.js";var b=`#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;

out vec4 fragColor;

void main(){
  vec2 uv=gl_FragCoord.xy/iResolution.xy;
  vec3 col=.5+.5*cos(iTime+uv.xyx+vec3(0,2,4));
  fragColor=vec4(col,1.);
}`;const u={class:"overhide br-5"},A=r({__name:"demo",setup(t){let i=null;const s=E();return d(()=>{s.value&&(i=new e(s.value,b))}),g(()=>{i==null||i.destory()}),(n,c)=>(k(),h("div",u,[a("canvas",{class:"gl-demo w-100",ref_key:"canvasRef",ref:s},null,512)]))}}),D=y(A,[["__scopeId","data-v-ae507068"]]);var C=`#version 300 es
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
}`;const m={class:"overhide mt-10 br-5"},v=r({__name:"taichi",setup(t){let i=null;const s=E();return d(()=>{s.value&&(i=new e(s.value,C))}),g(()=>{i==null||i.destory()}),(n,c)=>(k(),h("div",m,[a("canvas",{class:"gl-demo w-100",ref_key:"canvasRef",ref:s},null,512)]))}}),B=y(v,[["__scopeId","data-v-a72541c8"]]);var f=`#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;

out vec4 fragColor;

vec4 _TopColor=vec4(.24,.27,.41,1);
vec4 _BottomColor=vec4(.07,.11,.21,1);

vec4 _Star1Color=vec4(1,.94,.72,.7);
vec4 _Star2Color=vec4(.18,.03,.41,.7);
vec4 _Star3Color=vec4(.63,.50,.81,.7);

float _Grid=80.;
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
        }`;const _={class:"overhide br-5 mt-10"},x=r({__name:"star",setup(t){let i=null;const s=E();return d(()=>{s.value&&(i=new e(s.value,f))}),g(()=>{i==null||i.destory()}),(n,c)=>(k(),h("div",_,[a("canvas",{class:"gl-demo w-100",ref_key:"canvasRef",ref:s},null,512)]))}}),S=y(x,[["__scopeId","data-v-9e35bc88"]]),T={id:"webgl-着色器",tabindex:"-1"},V=JSON.parse('{"title":"WebGL 着色器","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"utils/webgl/index.md","filePath":"content/utils/webgl/index.md","lastUpdated":1751087584000}'),q={name:"utils/webgl/index.md"},G=Object.assign(q,{setup(t){return(i,s)=>{const n=o("Badge");return k(),h("div",null,[a("h1",T,[s[0]||(s[0]=F("WebGL 着色器 ")),p(n,{type:"tip",text:"类"}),s[1]||(s[1]=F()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#webgl-着色器","aria-label":'Permalink to "WebGL 着色器 <Badge type="tip" text="类" />"'},"​",-1))]),s[3]||(s[3]=l("",11)),p(D),s[4]||(s[4]=l("",8)),p(S),s[5]||(s[5]=l("",2)),p(B),s[6]||(s[6]=l("",6))])}}});export{V as __pageData,G as default};
