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
  radius = 10;
};

var f = function (t) {
  t /= 300;
  C.clearRect(0, 0, W, H);
  C.globalCompositeOperation = 'lighter';
  for (var k = 0; k < 3; k++) {
    if (k === 0) C.fillStyle = '#FF0000';
    if (k === 1) C.fillStyle = '#00FF00';
    if (k === 2) C.fillStyle = '#0000FF';
    for (var i = 0; i < 12; i++) {
      var index = i * m.sin(t) * 10;
      C.save();
      C.translate(W / 2, H / 2);
      C.scale(
        m.sin(index * m.PI / 180 + t + k / 5) * 0.2 + 1,
        m.cos(index * m.PI / 180 + t + k / 5) * 0.2 + 1
      );
      C.translate(-W / 2, -H / 2);
      if (i === 0) {
        C.beginPath();
        C.arc(
          HW,
          HH,
          radius * 0.9,
          0, m.PI * 2, false
        );
        C.fill();
      }
      for (var j = 0; j < i * 6; j++) {
        C.beginPath();
        C.arc(
          m.cos(m.PI * 2 / (6 * i) * j) * radius * 2 * i + HW,
          m.sin(m.PI * 2 / (6 * i) * j) * radius * 2 * i + HH,
          radius * 0.9,
          0, m.PI * 2, false
        );
        C.fill();
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