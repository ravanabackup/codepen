var w, m, c, C, W, H, r, i, j, k;
var a = function () {
  document
    .getElementsByTagName("body")[0]
    .appendChild(document.createElement("canvas"));
  w = window;
  m = Math;
  c = document.getElementsByTagName("canvas")[0];
  C = c.getContext("2d");
  W = c.width = w.innerWidth;
  H = c.height = w.innerHeight;
};
var f = function (t) {
  t /= 3000;
  C.clearRect(0, 0, W, H);
  for (i = 0; i < H; i+=10) {
    for (j = 0; j < W; j+=10) {
      k = i * W + j;
      C.globalAlpha = 1 - m.tan(i * j - m.sin(k) + t);
      C.fillRect(m.tan(i * j - m.sin(k) + t) * j, i, 10, 10);
    }
  }
  r = requestAnimationFrame(f);
};
window.onload = function () {
  a();
  f();
  w.onresize = function () {
    cancelAnimationFrame(r);
    W = c.width = w.innerWidth;
    H = c.height = w.innerHeight;
    f();
  };
};