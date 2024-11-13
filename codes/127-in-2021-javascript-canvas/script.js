var w, m, c, C, W, H, r;

var a = function () {
  document
    .getElementsByTagName("body")[0]
    .appendChild(document.createElement("canvas"));
  w = window;
  m = Math;
  c = document.getElementsByTagName("canvas")[0];
  c.style.background = 'black';
  C = c.getContext("2d");
};

var b = function () {
  pos = [];
  W = c.width = w.innerWidth;
  H = c.height = w.innerHeight;
  HW = W / 2;
  HH = H / 2;
  p = 5;
};

var f = function (t) {
  t /= 1000;
  C.clearRect(0, 0, W, H);
  C.globalCompositeOperation = 'lighter';
  C.lineWidth = 5;
  C.lineJoin = "bevel";
  for (var k = 0; k < 3; k++) {
    if (k === 0) C.strokeStyle = 'rgb(255, 0, 0)';
    if (k === 1) C.strokeStyle = 'rgb(0, 255, 0)';
    if (k === 2) C.strokeStyle = 'rgb(0, 0, 255)';
    for (var x = 0; x < W + 20; x++) {
      if (x === 0) {
        C.beginPath();
        C.moveTo(x, m.sin(x / 3 * m.PI / 180 + t * 10 + k / 30) * 100 + HH);
      } 
      if (x < HW) {
        C.lineTo(x, m.sin(x / 3 * m.PI / 180 + t * 10 + k / 30) * 100 + HH);
      }
      if (x > HW) {
        C.lineTo(x, m.sin(x * 20 * m.PI / 180 + t * 20 + k / 30) * 100 + HH);
      }
    }
    C.stroke();
  }
  r = requestAnimationFrame(f);
};

window.onload = function () {
  a();
  b();
  f();
  w.onresize = function () {
    cancelAnimationFrame(r);
    b();
    f();
  };
};