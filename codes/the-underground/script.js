var c = document.getElementById("canv");
var $ = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var _w = w / 2;
var _h = h / 2;

var dp = -0.15;
var t = 0;
var u = 0;

var pt = function() {
  this.set.apply(this, arguments);
};

pt.prototype = {
  set: function(x, y) {
    this.x = x;
    this.y = y;
  }
};

function calc(ang, d) {
  var p1 = w / 10;
  var p2 = h / 2;
  var b = Math.sin(ang + t) + Math.cos(ang + t);

  return new pt(
    _w + (p2 * Math.cos(ang) + p1 * Math.sin(d + 3 * t)) / d + Math.cos(ang) * b,
    _h + (p2 * Math.sin(ang)) / d + Math.sin(ang) * b);
}

function tunnel(ang, deltaA, d, deltaB) {
  var pts = [
    calc(ang, d),
    calc(ang + deltaA, d),
    calc(ang + deltaA, d + deltaB),
    calc(ang, d + deltaB)
  ];
  var i = 1;
  $.beginPath();
  $.moveTo(pts[0].x, pts[0].y);
  while (true) {
    $.lineTo(pts[i].x, pts[i].y);
    if (++i >= pts.length) break;
  }
  $.closePath();
  $.fill();
}

function draw() {
  t += 1 / 50;
  $.fillStyle = 'hsla(0,0%,0%,1)';
  $.fillRect(0, 0, w, h);
  var num = 5;
  var ang = 0;
  var deltaA = Math.PI * 2 / num;
  var d = dp + 10;
  var deltaB = 0.15;
  var dark;
  var lum;

  var i;

  while (true) {
    i = 0;
    while (true) {
      dark = 1 / (Math.max((d + 0.5) - 4, 1));
      if (d <= 2) {
        dark = Math.max(-1, d / 2 * d / 2);
      }
      lum = (125 * (dark * Math.abs(Math.sin(i / num * (Math.PI * 2) + t))));
      lum *= (0.45 + (0.55 * Math.cos((i / num + 0.55) * Math.PI * 3.5)));
      $.fillStyle = 'hsla(' + u + ', 95%,' + lum + '%,1)';
      tunnel(ang, deltaA, d, deltaB);
      ang += deltaA;
      if (++i >= num) break;
    }
    if ((d -= deltaB) <= dp) break;
  }
  if ((dp -= 0.05) <= deltaB) dp += deltaB;
  u -= .5;
}

window.addEventListener('resize',function(){
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);

run();

function run() {
  window.requestAnimationFrame(run);
  draw();
}