var W, M, c, C, WW, WH, CW, CH,
    params, rad, num, radius,
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
  params = new Array();
  num = 72;
  radius = 100;
  rad = Math.PI * 2 / num;
  c.style.background = 'black';
};

var getOptions = function () {
  for (var i = 0; i < num; i++) {
    var r = rad * i;
    var x = M.cos(r) * radius;
    var y = M.sin(r) * radius;
    var a = M.atan2(y, x);
    params.push([x, y, a]);
  }
};

var f = function (t) {
  t /= 400;
  C.save();
  C.fillStyle = 'rgba(0, 0, 0, 0.1)';
  C.fillRect(0, 0, WW, WH);
  C.globalCompositeOperation = 'lighter';
  C.translate(CW, CH);
  C.rotate(t / 2)
  for (var j = 0; j < 3; j++) {
    if (j === 0) C.fillStyle = '#FF0000';
    if (j === 1) C.fillStyle = '#00FF00';
    if (j === 2) C.fillStyle = '#0000FF';
    for (var i = 0; i < num; i++) {
      C.save();
      var q = M.sin(M.cos(params[i][2] * (M.sin(t / 10) * 6)) - t - j * 0.08);
      var x = params[i][0] * q;
      var y = params[i][1] * q;
      C.translate(params[i][0], params[i][1]);
      C.rotate(M.sin(t * 0.5));
      C.translate(-params[i][0], -params[i][1]);
      C.beginPath();
      C.arc(x, y, M.abs(8 * q), 0, M.PI * 2, false);
      C.fill();
      C.restore();
    }
  }
  C.restore();
  animationId = requestAnimationFrame(f);
};

window.onload = function () {
  makeCanvas();
  initialize();
  getOptions();
  f();
  W.onresize = function () {
    cancelAnimationFrame(animationId);
    initialize();
    getOptions();
    f();
  };
};