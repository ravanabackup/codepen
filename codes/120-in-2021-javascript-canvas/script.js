var w, m, c, C, W, H, HW, HH, r, radius;

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
  HW = W / 2;
  HH = H / 2;
  radius = 20;
};

var f = function (t) {
  t /= 1000;
  C.clearRect(0, 0, W, H);
  C.globalCompositeOperation = 'lighter';
  for (var k = 0; k < 3; k++) {
    if (k === 0) C.fillStyle = '#FF0000';
    if (k === 1) C.fillStyle = '#00FF00';
    if (k === 2) C.fillStyle = '#0000FF';
    for (var i = 0; i < 24; i++) {
      var index = i * m.sin(t) * 5;
      C.save();
      C.translate(W / 2, H / 2);
      C.rotate(t / i);
      C.scale(
        m.sin(index * m.PI / 180 + t + k / 20) * 0.5 + 1,
        m.tan(index * m.PI / 180 + t + k / 20) * 0.5 + 1
      );
      C.translate(-W / 2, -H / 2);
      if (i === 0) {
        C.fillRect(HW - radius / 2, HH - radius / 2, radius, radius);
      }
      for (var j = 0; j < i * 6; j++) {
        C.fillRect(
          m.cos(m.PI * 2 / (6 * i) * j) * radius * 2 * i + HW - radius / 2,
          m.sin(m.PI * 2 / (6 * i) * j) * radius * 2 * i + HH - radius / 2,
          radius,
          radius
        );
      }
      C.restore();
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