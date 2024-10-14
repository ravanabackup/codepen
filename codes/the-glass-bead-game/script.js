var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = window.innerWidth,
  cx = cw / 2;
var ch = canvas.height = window.innerHeight,
  cy = ch / 2;

var rad = Math.PI / 180;
var requestId = null;
var spring = .005;
var friction = .96;

var m = {
  x: cx,
  y: cy
}
var ball = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 50
  }

function Dot(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = 'hsla(' + this.x + ', 85%, 60%, 1)';
}
Dot.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x + .5, this.y + .5, this.r, 0, 2 * Math.PI);
  ctx.fill()
}
var dots = [];
var s = 25;
var r = 1;
dotsRy(cw, ch);

function Draw() {
  requestId = window.requestAnimationFrame(Draw);
  ctx.clearRect(0, 0, cw, ch);
  
  var distX = (m.x - ball.x);
  var distY = (m.y - ball.y);
  var accX = distX * spring;
  var accY = distY * spring;
  ball.vx += accX;
  ball.vy += accY;
  ball.vx *= friction;
  ball.vy *= friction;
  ball.x += ball.vx;
  ball.y += ball.vy;

  for (var i = 0; i < dots.length; i++) {
    var dx = (dots[i].x - ball.x);
    var dy = (dots[i].y - ball.y);
    var dist = Math.sqrt(dx * dx + dy * dy);
    dots[i].r = Math.max((ball.r - Math.abs(dist) / 2.5),1);
    ctx.globalCompositeOperation = "difference";
    dots[i].draw();
  }
}

function Init() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = null;
  }
  cw = canvas.width = window.innerWidth, cx = cw / 2;
  ch = canvas.height = window.innerHeight, cy = ch / 2;
  dotsRy(cw, ch);
  Draw();
};

window.setTimeout(function() {
  Init();
  window.addEventListener("resize", Init, false);
}, 15);

function dotsRy(cw, ch) {
  dots.length = 0;
  for (var y = s / 2; y < ch; y += s) {
    for (var x = s / 2; x < cw; x += s) {
      var dot = new Dot(x, y, r);
      dot.draw();
      dots.push(dot);
    }
  }
}

// EVENTS
canvas.addEventListener("mousemove", function(evt) {
  m = oMousePos(canvas, evt);
  
}, false);
canvas.addEventListener("mouseout", function(evt) {
  m = {
    x: cx,
    y: cy
  };
  m={x:cx,y:cy}
}, false);
// UTILIDADES
function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}