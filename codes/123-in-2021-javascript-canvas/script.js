var w, m, c, C, W, H, HW, HH, r, d;

var a = function () {
  document
    .getElementsByTagName("body")[0]
    .appendChild(document.createElement("canvas"));
  w = window;
  m = Math;
  c = document.getElementsByTagName("canvas")[0];
  c.style.width = '100%';
  c.style.height = '100%';
  C = c.getContext("2d");
};

var b = function () {
  W = c.width = m.floor(w.innerWidth / 2);
  H = c.height = m.floor(w.innerHeight / 2);
  HW = W / 2;
  HH = H / 2;
  d = C.createImageData(W, H);
};

// Referenced / https://twitter.com/aemkei/status/1378106731386040322
var f = function (t) {
  t /= 10;
  for (var y = 0; y < H; y++) {
    for (var x = 0; x < W; x++) {
      var i = (y * W + x) * 4;
      d.data[i + 0] = ((y | x) + t) % 256 + m.random() * 100;
      d.data[i + 1] = ((y ^ x) + t) % 256 + m.random() * 100;
      d.data[i + 2] = ((y & x) + t) % 256 + m.random() * 100;
      d.data[i + 3] = 0xff;
    }
  }
  C.putImageData(d, 0, 0);
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