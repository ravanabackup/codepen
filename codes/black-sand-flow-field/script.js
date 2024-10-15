const $ = {};

$.rand = function (min, max) {
  return Math.random() * (max - min) + min;
};

$.point = function (parent, index) {
  this.parent = parent;
  this.index = index;
  this.reset();
};

$.point.prototype = THREE.Vector3;

$.point.prototype.reset = function () {
  this.noiseDirection = 0;
  this.noiseMagnitude = 0;
  this.speed = $.rand(4, 6);
  this.x = $.rand(-$.w / 2, $.w / 2);
  this.y = $.rand(-$.h / 2, $.h / 2);
  this.z = 0;
  this.cx = 0;
  this.cy = 0;
  this.vx = $.rand(-1, 1);
  this.vy = $.rand(-1, 1);
};

$.point.prototype.setColor = function (color) {
  $.points.geometry.colors[this.index] = new THREE.Color().setHSL(0, 0, 0.9);
};

$.point.prototype.step = function () {
  this.x += this.vx;
  this.y += this.vy;
  this.cx = Math.max(0, Math.min($.cols - 1, Math.floor((this.x + $.w / 2) / $.unitW)));
  this.cy = Math.max(0, Math.min($.rows - 1, Math.floor((this.y + $.h / 2) / $.unitH)));

  let _noise1 = $.noiseDirectionLookup[this.cx * $.cols + this.cy];
  _noise1 = Math.min(1, _noise1);
  _noise1 = Math.max(-1, _noise1);
  this.noiseDirection = (_noise1 + 1) * Math.PI * 2;

  let _noise2 = $.noiseMagnitudeLookup[this.cx * $.cols + this.cy];
  _noise2 = Math.min(1, _noise2);
  _noise2 = Math.max(-1, _noise2);
  this.noiseMagnitude = 0.2 + (_noise2 + 1) / 2;

  this.vxTarget = Math.cos(this.noiseDirection + $.rand(-0.05, 0.05)) * this.noiseMagnitude * this.speed;
  this.vyTarget = Math.sin(this.noiseDirection + $.rand(-0.05, 0.05)) * this.noiseMagnitude * this.speed;

  this.vx += (this.vxTarget - this.vx) * 0.05;
  this.vy += (this.vyTarget - this.vy) * 0.05;

  if (
  this.x > $.w / 2 ||
  this.x < -$.w / 2 ||
  this.y > $.h / 2 ||
  this.y < -$.h / 2)
  {
    this.reset();
  }
};

$.init = function () {
  $.w = 400;
  $.h = 400;
  $.cols = 24,
  $.rows = 24,
  $.unitW = $.w / $.cols;
  $.unitH = $.h / $.rows;
  $.offInc = 0.06,
  $.tickMult = 0.003,
  $.tick = 0,
  $.simplex = new SimplexNoise();
  $.scene = new THREE.Scene();
  $.scene.background = new THREE.Color(0xffffff);
  $.noiseDirectionLookup = [];
  $.noiseMagnitudeLookup = [];

  $.camera = new THREE.OrthographicCamera(-$.w / 2, $.w / 2, $.h / 2, -$.h / 2, 1, 10000);
  $.camera.position.z = $.w / 2;

  $.renderer = new THREE.WebGLRenderer({
    antialias: true });

  $.renderer.setSize($.w, $.h);
  $.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  document.body.appendChild($.renderer.domElement);

  $.count = 60000;
  $.geometry = new THREE.Geometry();
  for (let i = 0; i < $.count; i++) {
    $.geometry.vertices.push(new $.point($.geometry, i));
  }
  $.material = new THREE.PointsMaterial({
    blending: THREE.MultiplyBlending,
    size: 1,
    transparent: true,
    vertexColors: THREE.VertexColors });

  $.points = new THREE.Points($.geometry, $.material);
  $.scene.add($.points);

  $.points.geometry.vertices.forEach(function (point) {
    point.setColor();
  });

  $.loop();
};

$.step = function () {
  for (let i = 0; i < $.cols * $.rows; i++) {
    let _cx = i % $.cols;
    let _cy = Math.floor(i / $.cols);
    $.noiseDirectionLookup[i] = $.simplex.noise3D($.offInc * _cx, $.offInc * _cy, $.tick * $.tickMult);
    $.noiseMagnitudeLookup[i] = $.simplex.noise3D($.offInc * _cx, $.offInc * _cy, $.tick * $.tickMult + 1000);
  }

  $.points.geometry.vertices.forEach(function (point) {
    point.step();
  });

  $.points.geometry.verticesNeedUpdate = true;

  $.tick++;
};

$.loop = function () {
  requestAnimationFrame($.loop);
  $.step();
  $.renderer.render($.scene, $.camera);
};

$.init();