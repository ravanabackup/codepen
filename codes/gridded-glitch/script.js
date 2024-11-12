window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var msX = Math.random() * 200,
  msY = Math.random() * 200,
  c = document.getElementById('canv'),
  $ = c.getContext("2d"),
  w = c.width = 1200,
  h = c.height = 1200,

  a = 0.1,
  t = 0,

  clr = function() {
    $.fillStyle = "hsla(0,5%,5%,1)";
    $.fillRect(0, 0, w, h);
  },

  glitched = function(a, s) {
    a = a || 1;
    var i = 3;
    var col = "rgba(";
    while (i--) {
      col += (s * (i + 3) * (msX / 100) * (msY / 100)) % 255 + ",";
    }
    col = col + a + ")";
    return col;
  },

  anim = function() {
    t++;
    var b = h + 20;
    while (b -= 20) {
      var d = w + 20;
      while (d -= 20) {
        $.fillStyle = glitched(a, d + b * t);
        $.fillRect(d - 15, b - 15, 15, 15);
      }
    }
    window.requestAnimFrame(anim);
  };

window.addEventListener('click', function(e) {
  a = (Math.random() * 1) + 0.1;
}, false);

window.addEventListener('touchstart', function(e) {
  a = (Math.random() * 1) + 0.1;
}, false);

window.addEventListener('mousemove', function(e) {
  msX = e.pageX;
  msY = e.pageY;
}, false);

window.addEventListener('touchmove', function(e) {
  msX = e.touches[0].pageX;
  msY = e.touches[0].pageY;
}, false);

anim();