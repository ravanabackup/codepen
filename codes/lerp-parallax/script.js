var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
w = ctx.canvas.width = window.innerWidth;
h = ctx.canvas.height = window.innerHeight;

dots = [{}];
mx = w/2;   // Mouse Start X
my = h/2;   // Mouse Start Y
nx = .02;  // Maximum Normal
nn = .002; // Minimum Normal
hx = 250;   // Maximum Hue
hn = 150;   // Minimum Hue
tx = 250;   // Maximum Height
tn = 150;   // Minimum Height
md = 300;   // MaxDots
wx = 10;    // Maximum Width
wn = 3;     // Minimum Width
mode = 1;   // Pull or Push
ctx.globalCompositeOperation = "lighter";

window.onresize = function() {
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight;
  ctx.globalCompositeOperation = "lighter";
};

window.onmousemove = function(e){
  mx = e.clientX; my = e.clientY;
}

window.ontouchmove = function(e){
  mx = e.touches[0].clientX; my = e.touches[0].clientY;
}

document.getElementById("info").onclick = function(){
  dots = [];
  hx = Math.random()*360;
  hn = hx-120;
  pushDots();
}

document.onmousedown = function(){mode=2;}
document.ontouchstart = function(){mode=2;}
document.onmouseup = function(){mode=1;}
document.ontouchend = function(){mode=1;}

function pushDots(){
  for(i=1; i<md; i++){
    dots.push({
      x:Math.random()*w,
      y:Math.random()*h,
      nx:Math.random()*(nx-nn)+nn,
      ny:Math.random()*(nx-nn)+nn,
      h:Math.random()*(hx-hn)+hn,
      t:Math.random()*(tx-tn)+tn,
      w:Math.random()*(wx-wn)+wn,
      a:Math.random() >= 0.5
    });
  }
}pushDots();

function render(){
  ctx.clearRect(0,0,w,h);
  for(i=1; i<dots.length; i++){
    ctx.beginPath();
    
    if(dots[i].a){ // Vertical
      ctx.rect(dots[i].x,dots[i].y,dots[i].w,dots[i].t);
      grd = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[i].x+dots[i].w, dots[i].y+dots[i].t);
    } else {// Horizontal
      ctx.rect(dots[i].x,dots[i].y,dots[i].t,dots[i].w);
      grd = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[i].x+dots[i].t, dots[i].y+dots[i].w);
    }
    
    grd.addColorStop(0, "hsla("+dots[i].h+",50%,50%,.0)");
    grd.addColorStop(.3, "hsla("+dots[i].h+",50%,50%,.8)");
    grd.addColorStop(.5, "hsla("+dots[i].h+",70%,60%,.8)");
    grd.addColorStop(.7, "hsla("+dots[i].h+",50%,50%,.8)");
    grd.addColorStop(1, "hsla("+(dots[i].h+100)+",50%,50%,.0)");
    ctx.fillStyle=grd;
    ctx.fill();
    ctx.closePath();
    
    if(mode == 1){
      dots[i].x = lerp(dots[i].x, mx, dots[i].nx);
      dots[i].y = lerp(dots[i].y, my, dots[i].ny);
    } else {
      dots[i].x = lerp(mx, dots[i].x, 1+dots[i].nx);
      dots[i].y = lerp(my, dots[i].y, 1+dots[i].ny);
    }
  }window.requestAnimationFrame(render);
}

function lerp(p, e, n) {
  return (1 - n) * p + n * e;
}

render();