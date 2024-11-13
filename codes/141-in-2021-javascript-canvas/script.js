var W, M, c, C, WW, WH,
    xNum, yNum, rad, num, angle, pos,
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
  rad = M.PI / 2;
  pos = [];
  angle = 0;
  length = 20;
  for (var y = 0; y < WH; y+=length) {
    for (var x = 0; x < WW; x+=length) {
      pos.push([x, y, getRandomNumber(0, 1)]);
    }
  }
};

var f = function (t) {
  t /= 200;
  C.save();
  C.clearRect(0, 0, WW, WH);
  C.lineWidth = 5;
  for (var i = 0; i < pos.length; i++) {
    C.save();
    var cy = pos[i][1] - WH / 2;
    var cx = pos[i][0] - WW / 2;
    var dist = M.sqrt(cx * cx + cy * cy) * 0.01;
    var theta = M.atan2(cy, cx);
    var s = M.sin(M.sin(theta * M.PI / 180) + dist - t) + theta * 3 + 1;
    if (M.sin(t + s) > 0) {
      C.translate(pos[i][0] + length / 2, pos[i][1] + length / 2);
      C.strokeStyle = 'hsl(' + M.sin(t + s) * 360 + ', 80%, 60%)';
      C.rotate(t + s);
      C.translate(-pos[i][0] - length / 2, -pos[i][1] - length / 2);
    }
    if (pos[i][2] === 0) {
      C.beginPath();
      C.moveTo(pos[i][0], pos[i][1]);
      C.lineTo(pos[i][0] + length, pos[i][1] + length);
      C.stroke();
    } else {
      C.beginPath();
      C.moveTo(pos[i][0] + length, pos[i][1]);
      C.lineTo(pos[i][0], pos[i][1] + length);
      C.stroke();
    }
    C.restore();
  }
  C.restore();
  angle += 5;
  if (angle > 360) {
    angle = 0;
  }
  animationId = requestAnimationFrame(f);
};

window.onload = function () {
  makeCanvas();
  initialize();
  f();
  W.onresize = function () {
    cancelAnimationFrame(animationId);
    length = 250;
    initialize();
    f();
  };
};