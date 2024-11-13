var w, m, c, C, W, H, r, pos, s, num = 4;

var rand = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var a = function () {
  document
    .getElementsByTagName("body")[0]
    .appendChild(document.createElement("canvas"));
  w = window;
  m = Math;
  c = document.getElementsByTagName("canvas")[0];
  C = c.getContext("2d");
};

var b = function () {
  pos = [];
  W = c.width = window.innerWidth;
  H = c.height = window.innerHeight;
  var s = W > H ? W / num : H / num; 
  var s2 = s / num;
  for (var y = 0; y < num; y++) {
    for (var x = 0; x < num; x++) {
      pos.push([s * x, s * y, s, rand(0, 13)]);
      for (var i = 0; i < num; i++) {
        for (var j = 0; j < num; j++) {
          pos.push([s2 * j + s * x, s2 * i + s * y, s2, rand(0, 13)]);
        }
      }
    }
  }
};

/**
 * Circle
 */
var fillCircle = function (r) {
  var s = r / 2;
  C.beginPath();
  C.arc(s, s, s, 0, m.PI * 2, false);
  C.fill();
};

var strokeCircle = function (r) {
  var s = r / 2;
  var lw = r / 5;
  C.lineWidth = lw;
  C.beginPath();
  C.arc(s, s, s - lw / 2, 0, m.PI * 2, false);
  C.stroke();
};

var evenTileFillCircle = function (r, num, mod) {
  var s = r / num;
  for (var y = 0; y < num; y++) {
    for (var x = 0; x < num; x++) {
      var i = y * num + x;
      if (i % mod === 0) {
        C.beginPath();
        C.arc(s * x + s / 2, s * y + s / 2, s / 2, 0, m.PI * 2, false);
        C.fill();
      }
    }
  }
};

var evenTileStrokeCircle = function (r, num, mod) {
  var s = r / num;
  var lw = r / num / 5;
  C.lineWidth = lw;
  for (var y = 0; y < num; y++) {
    for (var x = 0; x < num; x++) {
      var i = y * num + x;
      if (i % mod === 0) {
        C.beginPath();
        C.arc(s * x + s / 2, s * y + s / 2, (s - lw) / 2, 0, m.PI * 2, false);
        C.stroke();
      }
    }
  }
};

var stackCircle = function (r, num) {
  var s = r / 2;
  var lw = r / 5;
  C.lineWidth = lw;
  for (var i = 2; i > 0; i--) {
    C.beginPath();
    C.arc(s, s, s / i - lw / 2, 0, m.PI * 2, false);
    C.stroke();
  }
};

/**
 * Rect
 */
var fillRect = function (r) {
  C.fillRect(0, 0, r, r);
};

var strokeRect = function (r) {
  var s = r / 5;
  var lw = r / 5;
  C.lineWidth = lw;
  C.strokeRect(0 + lw / 2, 0 + lw / 2, r - lw, r - lw);
};

var evenTileFillRect = function (r, num, mod) {
  var s = r / num;
  for (var y = 0; y < num; y++) {
    for (var x = 0; x < num; x++) {
      var i = y * num + x;
      if (i % mod === 0) {
        C.fillRect(x * s, y * s, s, s);
      }
    }
  }
};

var evenTileStrokeRect = function (r, num, mod) {
  var s = r / num;
  var lw = s / 5;
  C.lineWidth = lw;
  for (var y = 0; y < num; y++) {
    for (var x = 0; x < num; x++) {
      var i = y * num + x;
      if (i % mod === 0) {
        C.strokeRect(s * x + lw / 2, s * y + lw / 2, s - lw, s - lw);
      }
    }
  }
};

var stackStrokeRect = function (r, num) {
  var s = r / 2;
  var rad = m.PI * 2 / num;
  for (var j = 0; j < 2; j++) {
    C.save();
    C.globalCompositeOperation = 'source-over';
    C.translate(s, s);
    C.rotate(45 * j * m.PI / 180);
    C.translate(-s, -s);
    for (var i = 0; i < num; i++) {
      if (i === 0) {
        C.beginPath();
        C.moveTo(m.cos(i * rad) * s + s, m.sin(i * rad) * s + s);
      } else {
        C.lineTo(m.cos(i * rad) * s + s, m.sin(i * rad) * s + s);
      }
    }
    C.fill();  
    C.restore();
  }
};

/**
 * Line
 */
var verLines = function (r, num) {
  var s = r / num;
  C.lineWidth = s; 
  for (var i = 0; i < num; i++) {
    if (i % 2 === 0) {
      C.beginPath();
      C.moveTo(s * i + s / 2, 0);
      C.lineTo(s * i + s / 2, r);
      C.stroke();
    }
  }
};

var horLines = function (r, num) {
  var s = r / num;
  C.lineWidth = s; 
  for (var i = 0; i < num; i++) {
    if (i % 2 === 0) {
      C.beginPath();
      C.moveTo(0, s * i + s / 2);
      C.lineTo(r, s * i + s / 2);
      C.stroke();
    }
  }
};

var crossLine = function (r) {
  var lw = r / 5;
  C.save();
  C.globalCompositeOperation = 'source-over';
  C.lineWidth = lw;
  C.beginPath();
  C.moveTo(lw, lw);
  C.lineTo(r - lw, r - lw);
  C.stroke();
  C.beginPath();
  C.moveTo(r - lw, 0 + lw);
  C.lineTo(0 + lw, r - lw);
  C.stroke();
  C.restore();
};

/**
 * polygon
 */
var polygon = function (r, num) {
  var s = r / 2;
  var rad = m.PI * 2 / num;
  for (var i = 0; i < num; i++) {
    if (i === 0) {
      C.beginPath();
      C.moveTo(m.cos(i * rad) * s + s, m.sin(i * rad) * s + s);
    } else {
      C.lineTo(m.cos(i * rad) * s + s, m.sin(i * rad) * s + s);
    }
  }
  C.fill();
};

var chooseShape = function (num, size) {
  switch (num) {
    case 0:
      fillCircle(size);
      break;
    case 1:
      strokeCircle(size);
      break;
    case 2:
      evenTileFillCircle(size, 3, rand(2, 5));
      break;
    case 3:
      evenTileStrokeCircle(size, 3, rand(2, 5));
      break;
    case 4:
      stackCircle(size, 2);
      break;
    case 5:
      fillRect(size);
      break;
    case 6:
      strokeRect(size);
      break;
    case 7:
      evenTileFillRect(size, 3, rand(2, 5));
      break;
    case 8:
      evenTileStrokeRect(size, 3, rand(2, 5));
      break;
    case 9:
      stackStrokeRect(size, 4);
      break;
    case 10:
      verLines(size, rand(3, 5));
      break;
    case 11:
      horLines(size, rand(3, 5));
      break;
    case 12:
      crossLine(size);
      break;
    case 13:
      polygon(size, 4);
      break;
  }
};

var f = function (t) {
  t /= 1000;
  C.clearRect(0, 0, W, H);
  C.globalCompositeOperation = 'xor';
  for (var i = 0; i < pos.length; i++) {
    C.save();
    C.translate(pos[i][0], pos[i][1]);
    chooseShape(pos[i][3], pos[i][2]);
    C.restore();
  }
  //r = requestAnimationFrame(f);
};

window.onload = function () {
  a();
  b();
  f();
  w.onresize = function () {
    //cancelAnimationFrame(r);
    b();
    f();
  };
  c.onmousemove = function (e) {
    num = m.floor(8 * (e.clientX / W));
    b();
    f();
  };
};