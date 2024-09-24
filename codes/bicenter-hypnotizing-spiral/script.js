var w=window.innerWidth,
    h=window.innerHeight,
    c=document.getElementById('c'),
    spacing=14,
    p1={x:w/2-spacing/2, y:h/2, sAng:0, eAng:Math.PI},
    p2={x:w/2+spacing/2, y:h/2, sAng:Math.PI, eAng:Math.PI*2},
    points=[p1, p2];
c.width=w;
c.height=h;
var ctx=c.getContext('2d');
ctx.fillRect(0, 0, w, h);
var max=Math.max(w, h);
var point=0;
var frame=0;
ctx.fillStyle='rgba(0, 0, 0, 0.01)';
ctx.strokeStyle='white';
function anim(){
  window.requestAnimationFrame(anim);
  
  ctx.fillRect(0, 0, w, h)
  
  frame+=0.1;
  //frame%=spacing*2;
  point=0;
  
  var exFill=ctx.fillStyle;
  ctx.fillStyle='rgba(200, 200, 200, 0.1)';
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, spacing, Math.PI*2, Math.PI);
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle=exFill;
    for(var i=frame%spacing*2; i<=max; i+=spacing){
      ++point; point%=2;
      var currentPoint=points[point];
      ctx.beginPath();
      ctx.arc(currentPoint.x, currentPoint.y, i, currentPoint.sAng, currentPoint.eAng);
      ctx.stroke();
      ctx.closePath();
    }
  ctx.fillText('Come to me...', w/2, h-30);
  }
anim();