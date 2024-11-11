function rgb(col){

  col += 0.000001;
  var r = parseInt((0.5+Math.sin(col)*0.5)*256);
  var g = parseInt((0.5+Math.cos(col)*0.5)*256);
  var b = parseInt((0.5-Math.sin(col)*0.5)*256);
  return "#"+("0" + r.toString(16) ).slice (-2)+("0" + g.toString(16) ).slice (-2)+("0" + b.toString(16) ).slice (-2);
}

function Vert(x,y){
  this.x = x;
  this.y = y;
  this.ox = x;
  this.oy = y;
  this.ox2 = x;
  this.oy2 = y;
}

function process(vars){

  var p,d,x,y,t;
  for(var i=0;i<vars.particles.length;++i){
    x=vars.particles[i].ox;
    y=vars.particles[i].oy;
    if(y>vars.canvas.height){
      vars.particles[i].oy=0;
      vars.particles[i].ox=Math.random()*vars.canvas.width;
    }
    vars.particles[i].oy+=2;
    d=Math.sqrt((vars.cx-x)*(vars.cx-x)+(vars.cy-y)*(vars.cy-y));
    vars.particles[i].dist=d;
    t=1/(2+d/2000);
    p=Math.atan2(vars.cx-x,vars.cy-y)+Math.sin(vars.frameNo/65)*Math.PI*2/(1+d/200)-Math.sin(vars.frameNo/65)*2;
    x=vars.cx-Math.sin(p)*d/t;
    y=vars.cy-Math.cos(p)*d/t;
    vars.particles[i].x=x;
    vars.particles[i].y=y;
  }
}

function draw(vars){

  vars.ctx.globalAlpha=.1;
  vars.ctx.fillStyle="#000";
  vars.ctx.fillRect(0, 0, canvas.width, canvas.height);

  var x,y,size=15;
  vars.ctx.globalAlpha=1;
  for(var i=0;i<vars.particles.length;++i){
    vars.ctx.fillStyle=rgb(vars.particles[i].dist/150-vars.frameNo/10);
    x=vars.particles[i].x;
    y=vars.particles[i].y;
    vars.ctx.fillRect(x-size/2,y-size/2,size,size);
  }
}


function loadScene(vars){

  vars.particles=[];
  var initParticles=10000;
  var x,y;
  for(var i=0;i<initParticles;++i){
    x=Math.random()*vars.canvas.width;
    y=Math.random()*vars.canvas.height;
    vars.particles.push(new Vert(x,y));
  }
}

function frame(vars) {

  if(vars === undefined){
    var vars={};
    vars.canvas = document.querySelector("canvas");
    vars.ctx = vars.canvas.getContext("2d");
    vars.canvas.width = 1366*1.5;
    vars.canvas.height = 768*1.5;
    window.addEventListener("resize", function(){
      vars.canvas.width = 1366*1.5;
      vars.canvas.height = 768*1.5;
      vars.cx=vars.canvas.width/2;
      vars.cy=vars.canvas.height/2;
      loadScene(vars);
    }, true);
    vars.canvas.oncontextmenu = function (e) { e.preventDefault(); };
    vars.canvas.addEventListener("mousemove", function(e){
      var rect = vars.canvas.getBoundingClientRect();
      vars.mx = Math.round((e.clientX-rect.left)/(rect.right-rect.left)*vars.canvas.width);
      vars.my = Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*vars.canvas.height);
    }, true);
    vars.canvas.addEventListener("mousedown", function(e){
      switch(e.which){
        case 1: vars.leftButton=1; break;
        case 3: vars.rightButton=1; break;
                    }
    }, true);
    vars.canvas.addEventListener("mouseup", function(e){
      switch(e.which){
        case 1: vars.leftButton=0; break;
        case 3: vars.rightButton=0; break;
                    }
    }, true);
    vars.canvas.addEventListener("mousewheel", function(e){
      var e = window.event || e; // old IE support
      vars.wheelDelta = Math.max(-1, Math.min(1, (e.wheelDelta/120 || -e.detail)));
    }, true);
    vars.canvas.addEventListener("touchstart", function(e){
      vars.leftButton=1;
      e.preventDefault();
      var rect = vars.canvas.getBoundingClientRect();
      vars.omx=vars.mx;
      vars.omy=vars.my;
      vars.mx = Math.round((e.changedTouches[0].pageX-rect.left)/(rect.right-rect.left)*vars.canvas.width);
      vars.my = Math.round((e.changedTouches[0].pageY-rect.top)/(rect.bottom-rect.top)*vars.canvas.height);
    }, true);
    vars.canvas.addEventListener("touchend", function(e){
      vars.leftButton=0;
    }, true);
    vars.canvas.addEventListener("touchmove", function(e){
      e.preventDefault();
      var rect = vars.canvas.getBoundingClientRect();
      vars.mx = Math.round((e.changedTouches[0].pageX-rect.left)/(rect.right-rect.left)*vars.canvas.width);
      vars.my = Math.round((e.changedTouches[0].pageY-rect.top)/(rect.bottom-rect.top)*vars.canvas.height);
    }, true);
    vars.frameNo=0;

    vars.cx=vars.canvas.width/2;
    vars.cy=vars.canvas.height/2;
    vars.mx=vars.cx;
    vars.my=vars.cy;
    loadScene(vars);
  }

  vars.frameNo++;
  requestAnimationFrame(function() {
    frame(vars);
  });

  process(vars);
  draw(vars);
}

frame();