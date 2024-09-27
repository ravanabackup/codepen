var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

var w = canvas.width = innerWidth;
var h = canvas.height = innerHeight;

// Variables
var mouse = {
  x: undefined,
  y: undefined };


var colors = [
"#C501E1",
"#9A26F8",
"#6564FE",
"#2B97FA",
"#02C4E7",
"#16E6CC",
"#2EF9A0",
"#C6E501",
"#E7C501",
"#FF6A63",
"#F82D98",
"#E830CE"];

var mouseDown = 0;
document.body.onmousedown = function () {
  ++mouseDown;
};
document.body.onmouseup = function () {
  --mouseDown;
};
// Event Listeners
canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
canvas.addEventListener("touchmove", function (event) {
  mouse.y = event.targetTouches[0].pageY;
  mouse.x = event.targetTouches[0].pageX;
});

addEventListener("resize", function () {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
  init();
});

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function Dot(x, y, color) {
  this.x = x;
  this.y = y;
  this.dx = x;
  this.dy = y;
  this.color = color;
  this.radius = 6;

  //    this.distanceFromCenter = randomIntFromRange(50, 120);
}
Dot.prototype.update = function () {
  var rad = 1000;
  var disX = this.x - mouse.x;
  var disY = this.y - mouse.y;
  var ds = disX * disX + disY * disY;
  var angle = Math.atan2(disY, disX);
  var dist = rad / ds;
  if (ds < rad && mouseDown) {
    this.x += Math.cos(angle) * dist * 0.6;
    this.y += Math.sin(angle) * dist * 0.6;
  } else {
    if (this.x < this.dx) this.x -= Math.cos(angle) * dist;
    if (this.y < this.dy) this.y -= Math.cos(angle) * dist;
    // this.y = this.dy;
  }
  if (this.x < 0 || this.x > w) this.x = this.dx;
  if (this.y < 0 || this.y > h) this.y = this.dy;

  this.draw();
};
Dot.prototype.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.fill();
  c.closePath();
};

var dots = [];
var spacing = 20;

function init() {
  dots = [];
  for (var x = spacing / 2; x < w; x += spacing) {
    for (var y = spacing / 2; y < h; y += spacing) {
      var color = randomColor(colors);
      var dot = new Dot(x, y, color);
      dots.push(dot);
      dot.draw();
    }
  }
}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach(dot => {
    dot.update();
  });
  requestAnimationFrame(animate);
}

init();
animate();