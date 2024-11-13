var w, m, c, C, W, H, r, l;

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
  W = c.width = w.innerWidth;
  H = c.height = w.innerHeight;
  l = 30;
  hl = l / 2;
};

var f = function (t) {
  t /= 1000;
  C.clearRect(0, 0, W, H);
  C.globalCompositeOperation = 'lighter';
  for (var k = 0; k < 3; k++) {
    if (k === 0) C.fillStyle = 'rgb(255, 0, 0)';
    if (k === 1) C.fillStyle = 'rgb(0, 255, 0)';
    if (k === 2) C.fillStyle = 'rgb(0, 0, 255)';
    for (var y = 0; y < H; y+=l) {
      for (var x = 0; x < W; x+=l) {
        var i = y * W + x;
        C.save();
        C.translate(x + hl, y + hl);
        C.rotate(y / 5 * m.PI / 180 + t);
        C.scale(
          m.sin(y / 5 * m.PI / 180 + t + k / 20),
          m.sin(y / 5 * m.PI / 180 + t + k / 20)
        );
        C.translate(-x - hl, -y - hl);
        C.fillRect(x, m.sin(y / 10 + t) + y, l, l);
        C.restore();
      }
    }
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