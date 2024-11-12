var c = document.getElementById('canv'),
    $ = c.getContext("2d"),
    w = c.width = window.innerWidth/1.1,
    h = c.height = window.innerHeight/1.1,
    p = part({
      num: 4200,
      life: 20,
      fade: 0.02,
      cv: 150,
      vel: accl(rot(Math.PI / 1.223, möb(dbl(1 / 5, Math.PI / 2))))
    });
$.strokeStyle = 'hsla(0, 0%, 90%, 0.6)';
$.fillStyle = 'hsla(0, 0%, 90%, 0.05)';
$.fillRect(0, 0, c.width, c.height);

function txt() {
  var t   =  "Möbius".split("").join(String.fromCharCode(0x2004));
  $.font = "3.5em Righteous";
  $.fillStyle = 'hsla(0, 0%, 0%, .05)';
  $.fillText(t, (c.width - $.measureText(t).width) * 0.5, c.height * 0.95);
}
function rot(yu, loc) {
  return function(x, y, t) {
    return loc(x * Math.cos(yu) - y * Math.sin(yu), x * Math.sin(yu) + y * Math.cos(yu), t);
  };
}
//https://en.wikipedia.org/wiki/M%C3%B6bius_transformation
function möb(loc) {
  return function(x, y, t) {
    var _r = (x - 1) * (x - 1) + y * y,
        _x = (1 - x * x - y * y) / _r,
        _y = 2 * y / _r,
        v = loc(_x, _y, t),
        vx = v[0],
        vy = v[1];
    var d = Math.pow((_x + 1) * (_x + 1) + _y * _y, 2) / 4,
        a = 2 * (_y * _y - (_x + 1) * (_x + 1)),
        b = 4 * (_x + 1) * _y;
      return [(a * vx - b * vy) / d, (b * vx + a * vy) / d];
  };
}
function accl(loc) {
  return function(px, py, t) {
    var calc = Math.min(c.width, c.height) / 4,
      x = (px - c.width / 2) / calc,
      y = (py - c.height / 2) / calc;
    return loc(x, y, t);
  };
}
function dbl(r, theta) {
  var lr = Math.log(r);
  return function(x, y, t) {
    return [x * lr - y * theta, x * theta + y * lr];
  };
}
function part(obj) {
    num = obj.num || 1500,
    life = obj.life || 10,
    fade = obj.fade || 0.02,
    cv = obj.cv || 100,
    vel = obj.vel;

  function trail(op) {
    $.save();
    $.globalAlpha = op;
    $.globalCompositeOperation = "copy";
    $.drawImage(c, 0, 0);
    $.restore();
  }

  var _p = go();
  function go() {
    var _p = [];
    for (var i = 0; i < num; i++)
      _p.push([
        Math.round(Math.random() * (w + 2 * cv)) - cv,
        Math.round(Math.random() * (h + 2 * cv)) - cv,
        Math.round(Math.random() * life) + 1
      ]);
    return _p;
  }

  function draw(t) {
    trail(1 - fade);
    $.save();
    $.setTransform(1, 0, 0, 1, 0, 0);
    for (var i = 0; i < _p.length; i++) {
      var _i = _p[i];
      if (_i[2] == 0) {
        _i[0] = Math.round(Math.random() * (w + 2 * cv)) - cv;
        _i[1] = Math.round(Math.random() * (h + 2 * cv)) - cv;
        _i[2] = 20;
      }
      var v = vel(_i[0], _i[1], t);
      if (v[0] <= w && v[1] <= h) {
        $.beginPath();
        $.moveTo(_i[0], _i[1]);
        $.lineTo(_i[0] + v[0], _i[1] + v[1]);
        $.stroke();
        _i[0] += v[0];
        _i[1] += v[1];
      }
      _i[2]--;
    }
    $.restore();
    txt();
  }
  function run() {
    window.requestAnimationFrame(run);
    draw();
  }
  run();
}
window.addEventListener('resize',function(){
  c.width = w = window.innerWidth/1.1;
  c.height = h = window.innerHeight/1.1;
  $.strokeStyle = 'hsla(0, 0%, 90%, 0.6)';
  $.fillStyle = 'hsla(0, 0%, 90%, 0.05)';
},false);