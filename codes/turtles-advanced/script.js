canvas = document.querySelector('#canvas')
canvas.width = 1920
canvas.height = 1080
ctx = canvas.getContext('2d')
C = Math.cos
S = Math.sin
t = 0
T = Math.tan

rsz=window.onresize=()=>{
  setTimeout(()=>{
    if(document.body.clientWidth > document.body.clientHeight*1.77777778){
      canvas.style.height = '100vh'
      setTimeout(()=>canvas.style.width = canvas.clientHeight*1.77777778+'px',0)
    }else{
      canvas.style.width = '100vw'
      setTimeout(()=>canvas.style.height =     canvas.clientWidth/1.77777778 + 'px',0)
    }
  },0)
}
rsz()


function initVars(){

  pi=Math.PI;
  canvas=document.querySelector("#canvas");
  canvas.onmousemove = mouse
  //ctx=canvas.getContext("2d");
  //canvas.width=document.body.clientWidth;
  //canvas.height=document.body.clientHeight;
  mx=my=leftButton=rightButton=x1=y1=0;
  cursorOccupied=0;

  cx=canvas.width/2;
  cy=canvas.height/2;
  window.addEventListener("resize",function(){
    //canvas.width=document.body.clientWidth;
    //canvas.height=document.body.clientHeight;
    cx=canvas.width/2;
    cy=canvas.height/2;
  });
  turtles=[];
  food=[];

  initialFood=20;
  frames=0;
  seed=11;
  res=8;
  cols=16*res;
  rows=8*res;
  tileWidth=cx*2/cols;
  tileHeight=cy*2/rows;

  sliders=new Array();
  sliders.push(new Slider(cx*2-125,75,1,10,2.5,"Turt.Speed"));
  sliders.push(new Slider(cx*2-125,400,1,10,2.5,"Turn Radius"));
  sliders.push(new Slider(cx*2-250,400,1,10,3.5,"Food Freq."));
  sliders.push(new Slider(cx*2-250,75,1,10,3,"Max PopX10"));
  sliders.push(new Slider(cx*2-375,400,0,9,.75,"Trails"));
  sliders.push(new Slider(cx*2-375,75,0,9,1.5,"Env. Speed"));
  showControls=false;


  turtleSpeed=2.5/2;
  turnRadius=2.5*2;
  foodFreq=3.5/5;
  maxPop=120;
  trails=.75;
  envSpeed=1.5/2;
}

function Turtle(x,y,size,theta){
  this.x=x, this.y=y, this.size=size, this.theta=theta, this.health=1;
}

function Food(x1,y1,x2,y2,weight){
  this.x1=x1, this.y1=y1, this.x2=x2, this.y2=y2, this.weight=weight;
  this.size=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

function Slider(x,y,min,max,value,title){

  this.x=x, this.y=y, this.min=min, this.max=max, this.value=value, this.title=title;
  this.hover=0;
}
function rand(){
  seed+=.1234;
  return parseFloat('0.'+Math.sin(seed).toString().substr(6));
}

function loadControlPoints(){

  points=25;
  controls=new Array(points);
  for(i=0;i<points;++i){
    controls[i]=new Object();
    controls[i].x=parseInt(rand()*cols);
    controls[i].y=parseInt(rand()*rows);
    controls[i].vx=.5-rand()/1;
    controls[i].vy=.5-rand()/1;
  }
}

function loadTerrain(){

  terrain=new Array(cols);
  max=0;
  for(i=0;i<cols;++i){
    terrain[i]=new Array(rows);
    for(j=0;j<rows;++j){
      terrain[i][j]=new Object();
      d1=d2=0;
      for(k=0;k<points;++k){
        d1+=Math.sqrt((i-controls[k].x)*(i-controls[k].x)+(j-controls[k].y)*(j-controls[k].y));
      }
      c=1;
      for(k=0;k<points;++k){
        d2=Math.sqrt((i-controls[k].x)*(i-controls[k].x)+(j-controls[k].y)*(j-controls[k].y));
        c*=1-(1-(d2/d1));
      }
      if(c>max)max=c;
      terrain[i][j].color=c;
    }
  }
  for(i=0;i<cols;++i){
    for(j=0;j<rows;++j){
      terrain[i][j].color/=max;
    }
  }
  for(i=0;i<cols;++i){
    for(j=0;j<rows;++j){			
      cell=terrain[i][j];
      l=i?i-1:cols-1;
      u=j?j-1:rows-1;
      r=i<cols-1?i+1:0;
      d=j<rows-1?j+1:0;
      left=terrain[l][j];
      up=terrain[i][u];
      right=terrain[r][j];
      down=terrain[i][d];
      upleft=terrain[l][u];
      upright=terrain[r][u];
      downright=terrain[r][d];
      downleft=terrain[l][d];
      c=parseInt(cell.color*15);
      cell.differentNeighbors=(c!=parseInt(up.color*15)?1:0)+
        (c!=parseInt(down.color*15)?1:0)+
        (c!=parseInt(left.color*15)?1:0)+
        (c!=parseInt(right.color*15)?1:0)+
        (c!=parseInt(upleft.color*15)?1:0)+
        (c!=parseInt(upright.color*15)?1:0)+
        (c!=parseInt(downleft.color*15)?1:0)+
        (c!=parseInt(downright.color*15)?1:0);
    }
  }
}

function mouse(e) {

  var rect = canvas.getBoundingClientRect();
  mx = Math.round((e.clientX-rect.left)/(rect.right-rect.left)*canvas.width);
  my = Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height);
}

canvas.onmousedown=function(event){event.preventDefault();}
//document.body$('body').on('contextmenu', '#canvas', function(e){ return false; });
canvas.addEventListener("mousedown", function(event) {
  switch (event.which) {
    case 1: leftButton=true; break;
    case 3: rightButton=true; break;
  }
});

canvas.addEventListener("mouseup", function(event) {
  switch (event.which) {
    case 1: leftButton=false; break;
    case 3: rightButton=false; break;
  }
  cursorOccupied=false;
});

function doLogic(){
  turtleSpeed=sliders[0].value/2;
  turnRadius=sliders[1].value*2;
  foodFreq=sliders[2].value/5;
  maxPop=sliders[3].value*40;
  trails=sliders[4].value;
  envSpeed=sliders[5].value/2;

  for(i=0;i<controls.length;++i){
    vx=controls[i].vx*envSpeed;
    vy=controls[i].vy*envSpeed;
    if(controls[i].x+vx>=cols || controls[i].x+vx<0)controls[i].vx*=-1;
    if(controls[i].y+vy>=rows || controls[i].y+vy<0)controls[i].vy*=-1;
    controls[i].x+=vx;
    controls[i].y+=vy;
  }
  loadTerrain();

  for(i=0;i<cols;++i){
    for(j=0;j<rows;++j){
      if(parseInt(terrain[i][j].color*15)==2){
        for(k=0;k<turtles.length;++k){
          x=i*tileWidth+tileWidth/2;
          y=j*tileHeight+tileHeight/2;
          d=Math.sqrt((turtles[k].x-x)*(turtles[k].x-x)+(turtles[k].y-y)*(turtles[k].y-y));
          if(d<turtles[k].size*2){
            p=Math.atan2(x-turtles[k].x,y-turtles[k].y);
            s=turtles[k].size*2-d;
            turtles[k].x-=Math.sin(p)*s;
            turtles[k].y-=Math.cos(p)*s;
          }
        }
        for(k=0;k<food.length;++k){
          x1=i*tileWidth+tileWidth/2;
          y1=j*tileHeight+tileHeight/2;
          x2=(food[k].x1+food[k].x2)/2;
          y2=(food[k].y1+food[k].y2)/2;
          d=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
          if(d<food[k].size){
            p=Math.atan2(x1-x2,y1-y2);
            s=food[k].size-d;
            food[k].x1-=Math.sin(p)*s;
            food[k].y1-=Math.cos(p)*s;
            food[k].x2-=Math.sin(p)*s;
            food[k].y2-=Math.cos(p)*s;
          }
        }
      }
    }
  }

  if(turtles.length){
    if(rand()<.01+foodFreq-.2){
      weight=10+rand()*20;
      x1=100+rand()*(cx*2-200);
      y1=100+rand()*(cy*2-200);
      p=pi*2*rand();
      x2=x1+Math.sin(p)*weight;
      y2=y1+Math.cos(p)*weight;
      food.push(new Food(x1,y1,x2,y2,weight));
    }
  }
  for(i=0;i<turtles.length;++i){
    turtles[i].x-=Math.sin(turtles[i].theta)*(4+turtles[i].size/6)*turtleSpeed;
    turtles[i].y-=Math.cos(turtles[i].theta)*(4+turtles[i].size/6)*turtleSpeed;
    if(turtles[i].x<-turtles[i].size)turtles[i].x+=cx*2;
    if(turtles[i].y<-turtles[i].size)turtles[i].y+=cy*2;
    if(turtles[i].x>cx*2+turtles[i].size)turtles[i].x-=cx*2;
    if(turtles[i].y>cy*2+turtles[i].size)turtles[i].y-=cy*2;
    mind=10000000;
    t=-1;
    for(j=0;j<food.length;++j){
      x=(food[j].x1+food[j].x2)/2;
      y=(food[j].y1+food[j].y2)/2;
      d=(turtles[i].x-x)*(turtles[i].x-x)+(turtles[i].y-y)*(turtles[i].y-y);
      if(d<mind){
        mind=d;
        t=j;
      }
      if(d<turtles[i].size*turtles[i].size*2){
        if(turtles[i].size<50){
          turtles[i].size+=food[j].weight/10+turtles[i].size/350;
        }else{
          for(k=0;k<=3;++k){
            p=pi*2/3*k+turtles[i].theta+pi;
            s=turtles[i].size*(!k||k==3?2:1);
            x2=x1;
            y2=y1;
            x1=turtles[i].x+Math.sin(p)*s;
            y1=turtles[i].y+Math.cos(p)*s;
            if(k){
              for(m=0;m<12;++m){
                x1a=x1+(x2-x1)/12*m;
                y1a=y1+(y2-y1)/12*m;
                x2a=x1+(x2-x1)/12*(m+1);
                y2a=y1+(y2-y1)/12*(m+1);
                food.push(new Food(x1a,y1a,x2a,y2a,1+turtles[i].size/8));
              }
            }
          }
          for(k=0;k<2+turtles[i].health*6;++k){
            if(turtles.length<maxPop)turtles.push(new Turtle(turtles[i].x,turtles[i].y,10,rand()*pi*2));
          }
          t=-1;
          turtles.splice(i,1);
          break;
        }
        t=-1;
        food.splice(j,1);
        turtles[i].health=1;
      }
    }
    if(t!=-1){
      while(turtles[i].theta>pi*2)turtles[i].theta-=pi*2;
      while(turtles[i].theta<0)turtles[i].theta+=pi*2;
      x=(food[t].x1+food[t].x2)/2;
      y=(food[t].y1+food[t].y2)/2;
      p=Math.atan2(turtles[i].x-x,turtles[i].y-y);
      d=Math.abs(p-turtles[i].theta);
      if(d>pi){
        p+=pi*2*(p>turtles[i].theta?-1:1);
      }
      d=Math.abs(p-turtles[i].theta);
      if(p>turtles[i].theta){
        turtles[i].theta+=d/(1+turnRadius);
      }else{
        turtles[i].theta-=d/(1+turnRadius);
      }
    }
    if(turtles[i].health>0){
      turtles[i].health-=.005;
    }else{
      for(k=0;k<=3;++k){
        p=pi*2/3*k+turtles[i].theta+pi;
        s=turtles[i].size*(!k||k==3?2:1);
        x2=x1;
        y2=y1;
        x1=turtles[i].x+Math.sin(p)*s;
        y1=turtles[i].y+Math.cos(p)*s;
        if(k){
          for(m=0;m<12;++m){
            x1a=x1+(x2-x1)/12*m;
            y1a=y1+(y2-y1)/12*m;
            x2a=x1+(x2-x1)/12*(m+1);
            y2a=y1+(y2-y1)/12*(m+1);
            food.push(new Food(x1a,y1a,x2a,y2a,turtles[i].size/8));
          }
        }
      }
      turtles.splice(i,1);
    }
    if(i>maxPop)turtles.splice(i,1);
  }

  if(showControls){		
    for(i=0;i<sliders.length;++i){
      if(mx>sliders[i].x&&mx<sliders[i].x+100&&my>sliders[i].y&&my<sliders[i].y+300){
        x=sliders[i].x+30;
        y=sliders[i].y+35+225/(sliders[i].max-sliders[i].min)*(sliders[i].value-sliders[i].min);
        if(mx>x&&mx<x+50&&my>y&&my<y+20){
        }
        sliders[i].hover=1;
      }else{
        sliders[i].hover=0;
      }
    }
    if(leftButton){
      if(!cursorOccupied || cursorOccupied==1){
        for(i=0;i<sliders.length;++i){
          if(sliders[i].hover==1){
            x=sliders[i].x+30;
            y=sliders[i].y+35+225/(sliders[i].max-sliders[i].min)*(sliders[i].value-sliders[i].min);
            y2=sliders[i].y+35+225;
            sliders[i].value=(my-(sliders[i].y+20-0*i+(i>3?25:0)))/(225)*(sliders[i].max-sliders[i].min);
            if(sliders[i].value<sliders[i].min) sliders[i].value=sliders[i].min;
            if(sliders[i].value>sliders[i].max) sliders[i].value=sliders[i].max;
            cursorOccupied=1;
          }
        }
      }
      if(!cursorOccupied || cursorOccupied==2){
        cursorOccupied=2;
      }
    }
  }
}

function colorString(arr){

  var r = parseInt(arr[0]*15);
  var g = parseInt(arr[1]*15);
  var b = parseInt(arr[2]*15);
  return "#"+r.toString(16)+g.toString(16)+b.toString(16);
}

function interpolateColors(RGB1,RGB2,degree){

  w1=degree;
  w2=1-w1;
  return colorString([w1*RGB1[0]+w2*RGB2[0],w1*RGB1[1]+w2*RGB2[1],w1*RGB1[2]+w2*RGB2[2]]);
}

function rgb(col){

  col+=.000001;
  var r = parseInt((.5+Math.sin(col)*.5)*16);
  var g = parseInt((.5+Math.cos(col)*.5)*16);
  var b = parseInt((.5-Math.sin(col)*.5)*16);
  return "#"+r.toString(16)+g.toString(16)+b.toString(16);
}

function drawSlider(slider){

  ctx.strokeStyle="#8ff";
  ctx.globalAlpha=.75;
  ctx.fillStyle="#242";
  ctx.fillRect(slider.x,slider.y,100,300);
  ctx.globalAlpha=1;
  ctx.lineWidth=2;
  ctx.strokeRect(slider.x,slider.y,100,300);
  ctx.font="16px monospace";
  ctx.fillStyle="#fff";
  ctx.fillText(slider.title,slider.x+2,slider.y+16);
  t=0
  ctx.textAlign="end";
  for(k=slider.min;k<=slider.max;++k){
    if(slider.title=="Max PopX10"){
      ctx.fillText(k*4,slider.x+25,slider.y+50+225/(slider.max-slider.min)*t);
    }else{
      ctx.fillText(k,slider.x+25,slider.y+50+225/(slider.max-slider.min)*t);			
    }
    ctx.strokeStyle="#fff";
    ctx.beginPath();
    ctx.moveTo(slider.x+25,slider.y+45+225/(slider.max-slider.min)*t);
    ctx.lineTo(slider.x+85,slider.y+45+225/(slider.max-slider.min)*t);
    ctx.stroke();
    t++;
  }
  ctx.beginPath();
  ctx.moveTo(slider.x+55,slider.y+25);
  ctx.lineTo(slider.x+55,slider.y+290);
  ctx.stroke();
  ctx.textAlign="start";

  ctx.lineWidth=2;
  ctx.fillStyle="#0f8";
  ctx.fillRect(slider.x+30,slider.y+35+225/(slider.max-slider.min)*(slider.value-slider.min),50,20);
  ctx.strokeStyle=slider.hover?"#fff":"#000";
  ctx.strokeRect(slider.x+30,slider.y+35+225/(slider.max-slider.min)*(slider.value-slider.min),50,20);
}

function draw(){

  ctx.closePath();

  ctx.globalAlpha=1/(1+trails);
  ctx.fillStyle="#000";
  ctx.fillRect(0,0,cx*2,cy*2);

  for(i=0;i<cols;++i){
    for(j=0;j<rows;++j){
      if(parseInt(terrain[i][j].color*15)==2){
        x=i*tileWidth;
        y=j*tileHeight;
        ctx.globalAlpha=1;
        col1=[terrain[i][j].color,terrain[i][j].color,terrain[i][j].color];
        c=.75/(1+terrain[i][j].differentNeighbors/2.5);
        ctx.fillStyle=colorString([c,c,c]);
        ctx.fillRect(x,y,tileWidth+1,tileHeight+1);
      }
    }
  }

  if(turtles.length){		
    ctx.globalAlpha=1;
    ctx.strokeStyle="#ff0";
    for(i=0;i<food.length;++i){
      ctx.lineWidth=food[i].weight;
      ctx.beginPath();
      ctx.moveTo(food[i].x1,food[i].y1);
      ctx.lineTo(food[i].x2,food[i].y2);
      ctx.stroke();
    }

    for(i=0;i<turtles.length;++i){
      ctx.lineWidth=1+turtles[i].size/20;
      ctx.strokeStyle=interpolateColors([0,1,0],[1,0,0],turtles[i].health);
      ctx.fillStyle=ctx.strokeStyle;
      for(j=0;j<=3;++j){
        p=pi*2/3*j+turtles[i].theta+pi;
        s=turtles[i].size*(!j||j==3?2:1);
        x=turtles[i].x+Math.sin(p)*s;
        y=turtles[i].y+Math.cos(p)*s;
        if(!j){
          ctx.beginPath();
          ctx.moveTo(x,y);
        }else{
          ctx.lineTo(x,y);
          if(j==3){
            ctx.globalAlpha=1;
            ctx.stroke();
            ctx.globalAlpha=.4;
            ctx.fill();
          }
        }
      }
    }
  }
  if(showControls){
    for(i=0;i<sliders.length;++i){
      drawSlider(sliders[i]);
    }
  }
}

function toggleControls(){

  showControls=!showControls
  if(showControls){
    document.querySelector('#button').innerHTML = 'Hide Controls'
  }else{
    document.querySelector('#button').innerHTML = 'Show Controls'
  }
}
function frame(){
  doLogic();
  draw();
  requestAnimationFrame(frame);
}

function setupBoard(){

  for(i=0;i<initialFood;++i){
    weight=10+rand()*30;
    x1=100+rand()*(cx*2-200);
    y1=100+rand()*(cy*2-200);
    p=pi*2*rand();
    x2=x1+Math.sin(p)*weight;
    y2=y1+Math.cos(p)*weight;
    food.push(new Food(x1,y1,x2,y2,weight));
  }
  turtles.push(new Turtle(cx,cy*1.5,20,0));

  loadControlPoints();
  loadTerrain();
}

initVars();
setupBoard();
frame();