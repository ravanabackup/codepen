/**
 * Referred | https://tympanus.net/codrops/2020/12/17/recreating-a-dave-whyte-animation-in-react-three-fiber/
 * It's an amazing article.
 * Thank you so much!
 */

var W, M, c, C, WW, WH, CW, CH,
    params, length,
    animationId;

/** amazing code */
var roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);
};

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
  length = 3;
  c.style.background = 'black';
};

var getParams = function () {
  for (var i = 1; i <= 8; i++) {
    for (var j = 0; j < i * 6; j++) {
      var x = M.cos(M.PI * 2 / (6 * i) * j) * length * 10 * i;
      var y = M.sin(M.PI * 2 / (6 * i) * j) * length * 10 * i;
      var a = M.atan2(y, x);
      var d = M.sqrt(x * x + y * y);
      
      params.push([x, y, a, d]);
    }
  }
};

var draw = function (t) {
  t *= 0.001;
  C.save();
  C.clearRect(0, 0, WW, WH);
  C.globalCompositeOperation = 'lighter';
  C.translate(CW, CH);
  
  for (var j = 0; j < 3; j++) {
    if (j === 0) C.fillStyle = '#FF0000';
    if (j === 1) C.fillStyle = '#00FF00';
    if (j === 2) C.fillStyle = '#0000FF';
    
    for (var i = 0; i < params.length; i++) {
      var w = roundedSquareWave(t - params[i][3] * 0.002, 0.1, 1 + j * 0.05, 1 / 4);
      var x = params[i][0] - Math.cos(params[i][2]) * 30 * w;
      var y = params[i][1] - Math.sin(params[i][2]) * 30 * w;
      
      C.beginPath();
      C.arc(x, y, M.abs(length * w), 0, M.PI * 2, false);
      C.fill();
    }
  }
  C.restore();
  animationId = requestAnimationFrame(draw);
};

window.onload = function () {
  console.clear();
  makeCanvas();
  initialize();
  getParams();
  draw();
  
  W.onresize = function () {
    cancelAnimationFrame(animationId);
    initialize();
    getParams();
    draw();
  };
};