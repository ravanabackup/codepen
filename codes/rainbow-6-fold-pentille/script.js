/*
  Johan Karlsson (DonKarlssonSan)
*/

function incX(angle, length) {
  return Math.cos(angle) * length;
}

function incY(angle, length) {
  return Math.sin(angle) * length * -1;
}

function dist(x0, y0, x1, y1) {
  var xDelta = x1 - x0;
  var yDelta = y1 - y0;
  return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
}

function setupEventListers() {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseleave", onMouseLeave);
  canvas.addEventListener("mouseenter", onMouseEnter);
}

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function onMouseLeave() {
  mouseHasLeft = true;
}

function onMouseEnter() {
  mouseHasLeft = false;
}

function average(array, index) {
  return array.
  map(p => p[index]).
  reduce((a, b) => a + b) / array.length;
}

function drawPentagon(x, y) {
  var angle = 0;
  for (var i = 0; i < 6; i++) {
    var points = [];
    ctx.beginPath();
    points.push([x, y]);

    ctx.moveTo(x, y);
    x += incX(angle, size * 2);
    y += incY(angle, size * 2);
    points.push([x, y]);
    ctx.lineTo(x, y);
    angle += Math.PI / 3;
    x += incX(angle, size);
    y += incY(angle, size);
    points.push([x, y]);
    ctx.lineTo(x, y);
    angle += Math.PI / 3;
    x += incX(angle, size);
    y += incY(angle, size);
    points.push([x, y]);
    ctx.lineTo(x, y);
    angle += Math.PI / 3;
    x += incX(angle, size);
    y += incY(angle, size);
    points.push([x, y]);
    ctx.lineTo(x, y);
    angle += Math.PI / 3;
    x += incX(angle, size * 2);
    y += incY(angle, size * 2);
    points.push([x, y]);
    ctx.lineTo(x, y);

    var xAverage = average(points, 0);
    var yAverage = average(points, 1);

    var d = dist(xAverage, yAverage, mouseX, mouseY);
    var color = Math.round(d / width * 360);
    ctx.fillStyle = `hsl(${color}, 100%, 50%)`;
    ctx.fill();
    ctx.stroke();

    angle += Math.PI / 3;
  }
}

function fakeMoveMouse(now) {
  if (mouseHasLeft) {
    mouseX = Math.cos(now / 1000) * width / 3 + width / 2;
    mouseY = Math.sin(now / 1000) * height / 3 + height / 2;
  }
}

var canvas = document.getElementById("canvas");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var mouseX = width / 2;
var mouseY = height / 2;
var mouseHasLeft = true;

// Some magic values
// Found by trial and error...
var size = 20;
var a = 90;
var b = 17;
var c = 30;
var d = 86;

function draw(now) {
  requestAnimationFrame(draw);
  fakeMoveMouse(now);
  ctx.clearRect(0, 0, width, height);
  var cols = width / a + 2;
  var rows = height / b + 2;

  for (var x = -1; x < cols; x++) {
    for (var y = -1; y < rows; y++) {
      var x1 = x * a + y * c;
      var y1 = x * b + y * d;
      // Prevent pentagons from going off canvas
      x1 -= a * Math.round(y / 4);
      y1 -= b * Math.round(y / 4);
      x1 -= c * Math.round(x / 7);
      y1 -= d * Math.round(x / 7);
      drawPentagon(x1, y1);
    }
  }
}

setupEventListers();
draw(1);