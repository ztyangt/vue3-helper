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
float _Grid=80.;
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