var w, m, c, C, W, H, r, l;

var a = function () {
  document
    .getElementsByTagName("body")[0]
    .appendChild(document.createElement("canvas"));
  w = window;
  m = Math;
  c = document.getElementsByTagName("canvas")[0];
  C = c.getContext("2d");
  c.style.background = 'black';
};

var b = function () {
  W = c.width = w.innerWidth;
  H = c.height = w.innerHeight;
  HW = W / 2;
  HH = H / 2;
  l = 10;
};

var f = function (t) {
  t /= 500;
  C.fillStyle = 'rgba(0, 0, 0, 0.1)';
  C.fillRect(0, 0, W, H);
  C.fillStyle = 'white';
  for (var i = 0; i < 24; i++) {
    for (var j = 0; j < i * 6; j++) {
      var x = m.cos(m.PI * 2 / (6 * i) * j) * l * 2 * i + HW;
      var y = m.sin(m.PI * 2 / (6 * i) * j) * l * 2 * i + HH;
      var cy = y - HH;
      var cx = x - HW;
      var dist = m.sqrt(cx * cx + cy * cy) * 0.03;
      var theta = m.atan2(cy, cx);
      var s = m.sin(m.sin(theta * m.PI / 180) + dist - t) + 1;
      C.beginPath();
      C.arc(x, m.sin(s / 2) * 50 + y - 50, l / 2 * s, 0, m.PI * 2, false);
      C.fill();
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