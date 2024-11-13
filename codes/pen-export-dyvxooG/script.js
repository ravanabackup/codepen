// Referenced / https://tomari.org/main/java/kyokusen/top.html
// Thank you so much.

var W, M, c, C, WW, WH, CW, CH,
    depth, angle, length, startX, startY, pos, mx, my, radian,
    animationId;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var makeCanvas = function () {
  document
    .getElementsByTagName("body")[0]
    .appendChild(document.createElement("canvas"));
};

var initialize = function () {
  W = window;
  M = Math;
  c = document.getElementsByTagName("canvas")[0];
  C = c.getContext("2d");
  WW = c.width = M.floor(W.innerWidth);
  WH = c.height = M.floor(W.innerHeight);
  CW = WW / 2;
  CH = WH / 2;
  depth = 5;
  length = 15;
  angle = 0;
  radian = 0;
  startX = CW - length * 31 / 2;
  startY = CH - length * 31 / 2;
  mx = 0;
  my = 0;
  pos = [];
  c.style.background = 'black';
  
  fractal(90, depth);
};

var getCoordinate = function () {
  var rad = angle * Math.PI / 180;
  var nx = M.cos(rad) * length + startX;
  var ny = M.sin(rad) * length + startY;
  var middlex = M.cos(rad) * (length / 2) + startX;
  var middley = M.sin(rad) * (length / 2) + startY;
  var dx = nx - CW;
  var dy = ny - CH;
  var dist = M.sqrt(dx * dx + dy * dy) * 0.01;
  var atan = M.atan2(dy, dx);
  pos.push([startX, startY, nx, ny, dist, atan, middlex, middley]);
  startX = nx;
  startY = ny;
};

var turn = function (increaseNumber) {
  angle += increaseNumber;
};

var fractal = function (angle, depth) {
  if (depth > 0) {
    turn(angle);
    fractal(-angle, depth - 1);
    getCoordinate(length);
    turn(-angle);
    fractal(angle, depth - 1);
    getCoordinate(length);
    fractal(angle, depth - 1);
    turn(-angle);
    getCoordinate(length);
    fractal(-angle, depth - 1);
    turn(angle);
  }
};

var f = function (t) {
  t /= 500;
  C.save();
  C.fillStyle = 'rgba(0, 0, 0, 0.1)';
  C.fillRect(0, 0, WW, WH);
  C.lineWidth = 5;
  C.lineCap = 'square';
  C.globalCompositeOperation = 'lighter';
  /*
  C.translate(CW, CH);
  C.scale(M.cos(t / 10), M.sin(t / 20));
  C.rotate(M.sin(t / 30));
  C.translate(-CW, -CH);
  */
  for (var j = 0; j < 3; j++) {
    if (j === 0) C.strokeStyle = '#FF0000';
    if (j === 1) C.strokeStyle = '#00FF00';
    if (j === 2) C.strokeStyle = '#0000FF';
    for (var i = 0; i < pos.length; i++) {
      C.save();
      var s = M.sin(pos[i][4] - t) + 1;
      C.globalAlpha = M.min(s, 1);
      C.beginPath();
      C.moveTo(pos[i][0], Math.sin(t / 10 + s + j * 0.1) * 10 + pos[i][1]);
      C.lineTo(pos[i][2], Math.tan(t / 10 + s + j * 0.1) * 10 + pos[i][3]);
      C.stroke();
      C.restore();
    }
  }
  C.restore();
  animationId = requestAnimationFrame(f);
};

window.onload = function () {
  makeCanvas();
  initialize();
  f();
  W.onresize = function () {
    cancelAnimationFrame(animationId);
    initialize();
    f();
  };
  c.onmousemove = function (e) {
    var dx = e.clientX - CW;
    var dy = e.clientY - CH;
    var dist = M.sqrt(dx * dx + dy * dy);
    radian = M.atan2(dy, dx);
    mx = dist * 0.1;
    my = dist * 0.1;
  };
  c.ontouchmove = function (e) {
    var dx = e.touches[0].pageX - CW;
    var dy = e.touches[0].pageY - CH;
    var dist = Math.sqrt(dx * dx + dy * dy);
    radian = M.atan2(dy, dx);
    mx = dist * 0.1;
    my = dist * 0.1;
  };
};