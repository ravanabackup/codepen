var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var c = {}
var cw = canvas.width = 600;
c.x = 3 * cw / 4;
var ch = canvas.height = 500;
c.y = ch / 3
var frames = 0;
var requestId = null;
var stopped = false;
var cos = Math.cos(-Math.PI / 2);
var sin = Math.sin(-Math.PI / 2);
var len = 6;
var speed = 6;
var ry = [c, {
  x: c.x + len,
  y: c.y
}];

for (var j = 0; j < 12; j++) {
  var center = ry[ry.length - 1];
  for (var i = ry.length - 1; i >= 0; i--) {
    var p = Rot(ry[i], center);
    ry.push(p);
  }
}

function Draw() {
  requestId = window.requestAnimationFrame(Draw);
  if (frames < ry.length - speed) {
    ctx.strokeStyle = "hsl(15, 100%," + (25 + .5 * frames % 50) + "%)";
    ctx.beginPath();
    ctx.moveTo(ry[frames].x, ry[frames].y);
    for (var i = 0; i < speed - 1; i++) {
      //for (var i = 0; i < speed; i++) {
      ctx.lineTo(ry[frames + i].x, ry[frames + i].y);
    }
    ctx.stroke();
  } else {
    window.cancelAnimationFrame(requestId);
    stopped = true;
  }
  frames += speed;
}

function start() {
     requestId = window.requestAnimationFrame(Draw);
     ctx.clearRect(0, 0, cw, ch);
     frames = 0;
     stopped = false;
}
function stopAnim() {
     if (requestId) {
     window.cancelAnimationFrame(requestId);
     }
     stopped = true;
     }

canvas.addEventListener("click", function(){(stopped == true) ? start() : stopAnim();} ,false)
window.addEventListener("load",start,false);

function Rot(p, center) {
  return {
    x: center.x + (p.x - center.x) * cos - (p.y - center.y) * sin,
    y: center.y + (p.x - center.x) * sin + (p.y - center.y) * cos
  }
}