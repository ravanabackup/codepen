const tau = 2 * Math.PI;
const { random } = _;
const { abs, max, sin, cos } = Math;

// a collection of Vector methods
class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static fromPolar(r, a) {
    let x = r * cos(a),
    y = r * sin(a);
    return new Vector(x, y);
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  mul(x) {
    this.x *= x;
    this.y *= x;
    return this;
  }

  dist(v) {
    let dx, dy;
    return Math.sqrt(
    (dx = this.x - v.x) * dx,
    (dy = this.y - v.y) * dy);
  }

  get r() {
    return Math.sqrt(
    this.x * this.x +
    this.y * this.y);
  }

  set r(r) {
    let n = this.norm();
    this.x = r * n.x;
    this.y = r * n.y;
    return r;
  }

  get a() {
    return Math.atan2(this.y, this.x);
  }

  set a(a) {
    let r = this.r;
    this.x = r * cos(a);
    this.y = r * sin(a);
    return a;
  }

  norm() {
    let r = this.r;
    return new Vector(
    this.x / r, this.y / r);
  }}


// canvas' built-in drawing methods have a lot of
// overhead. this buffer class is for optimized
// drawing of pixels with alpha. it works by directly 
// manipulating pixel data and flushing to the canvas
// by calling putImageData
class CanvasBuffer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.center = new Vector(this.width / 2, this.height / 2);
    this.ncenter = this.center.clone().mul(-1);
    this.clear();
  }

  clear() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.buf = this.ctx.getImageData(0, 0, this.width, this.height);
  }

  // draws floating point coordinate pixel
  // with bilinear interpolation
  drawPixel(x, y, c) {
    let fx = ~~x,
    fy = ~~y,
    dx = x - fx,
    dy = y - fy;

    this.drawCell(fx, fy, c, (1 - dx) * (1 - dy));
    this.drawCell(fx + 1, fy, c, dx * (1 - dy));
    this.drawCell(fx, fy + 1, c, (1 - dx) * dy);
    this.drawCell(fx + 1, fy + 1, c, dx * dy);
  }

  // set color of cell with alpha, for drawPixel
  drawCell(x, y, c, a) {
    if (x < 0 || x >= this.width) return;
    if (y < 0 || y >= this.height) return;

    let data = this.buf.data,
    i = 4 * (x + y * this.width),
    r = data[i + 0],
    g = data[i + 1],
    b = data[i + 2];

    a *= c[3];
    r += c[0] * a;
    g += c[1] * a;
    b += c[2] * a;

    // overflow color math so red + red = white
    let ro = max(0, r - 255),
    go = max(0, g - 255),
    bo = max(0, b - 255),
    to = (ro + bo + go) / 6;

    data[i + 0] = r + to;
    data[i + 1] = g + to;
    data[i + 2] = b + to;
  }

  flush() {
    this.ctx.putImageData(this.buf, 0, 0);
  }}


// a class for generating composite noise textures
// and reading values of the texture at a position
class Noise {
  constructor(settings) {
    this.width = settings.width;
    this.height = settings.height;
    this.type = settings.type;
    this.strength = settings.strength;

    this.canvas = Noise.compositeNoise(
    this.width, this.height, settings.startOctave, settings.endOctave);
    let ctx = this.canvas.getContext('2d');
    this.data = ctx.getImageData(0, 0, this.width, this.height).data;
  }

  // create w by h noise
  static noise(w, h) {
    let cv = document.createElement('canvas'),
    ctx = cv.getContext('2d');

    cv.width = w;
    cv.height = h;

    let img = ctx.getImageData(0, 0, w, h),
    data = img.data;

    for (let i = 0, l = data.length; i < l; i += 4) {
      data[i + 0] = random(0, 255);
      data[i + 1] = random(0, 255);
      data[i + 2] = random(0, 255);
      data[i + 3] = 255;
    }

    ctx.putImageData(img, 0, 0);
    return cv;
  }

  // create composite noise with multiple octaves
  static compositeNoise(w, h, soct, eoct) {
    let cv = document.createElement('canvas'),
    ctx = cv.getContext('2d');

    cv.width = w;
    cv.height = h;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 1 / (eoct - soct);

    for (let i = soct; i < eoct; i++) {
      let noise = Noise.noise(w >> i, h >> i);
      ctx.drawImage(noise, 0, 0, w, h);
    }

    return cv;
  }

  // returns noise value from -1.0 to 1.0
  getNoise(x, y, ch = 0) {
    // bitwise ~~ to floor
    let i = (~~x + ~~y * this.width) * 4;
    return this.data[i + ch] / 127.5 - 1;
  }}


class Particle {
  constructor(system, x = 0, y = 0) {
    this.system = system;
    this.pos = new Vector(x, y);
    this.vel = new Vector();
    this.col = [255, 255, 255, 0.1];
  }

  update() {
    let { x, y } = this.pos,
    noise = this.system.noise,
    dx = noise.getNoise(x, y, 0),
    dy = noise.getNoise(x, y, noise.type == 2 ? 0 : 1),
    d = new Vector(dx, dy).mul(noise.strength);

    this.col[3] *= 0.99;

    this.vel.mul(1 - this.system.friction);
    this.vel.add(d);

    if (noise.type == 0 && this.vel.r > this.system.speed ||
    noise.type == 1)
    this.vel.r = this.system.speed;
  }}


class ParticleSystem {
  constructor(settings, noise, buffer) {
    this.noise = noise;
    this.buffer = buffer;
    this.particles = [];

    this.num = settings.numParticles;
    this.subFrames = settings.subFrames;

    this.speed = settings.speed;
    this.friction = settings.friction;

    for (let i = 0; i < this.num; i++)
    this.particles.push(new Particle(this));

    let r = this.buffer.height / 2 * settings.radius;

    switch (settings.shape) {
      case 'circle':this.circle(r);break;
      case 'triangle':this.polygon(r, 3);break;
      case 'triangle2':this.polygon(r, 3, tau / 2);break;
      case 'square':this.polygon(r, 4, tau / 8);break;
      case 'square2':this.polygon(r, 4);break;
      case 'hexagon':this.polygon(r, 6);break;
      case 'hexagon2':this.polygon(r, 6, tau / 12);break;
      case 'star':this.star(r);break;
      case 'random':this.random(r);break;}


    this.setVels(settings.velocity, this.speed);

    if (settings.colorType == 'solid')
    this.colorify(settings.color.concat(settings.alpha));

    if (settings.colorType == 'rainbow')
    this.rainbowify(settings.alpha);
  }

  circle(radius, thickness = 0) {
    for (let p of this.particles) {
      // get random radius and angle
      let r1 = radius + thickness * random(-0.5, 0.5),
      a1 = random(0, tau),
      r2 = random(0, 1, true),
      a2 = random(0, tau);

      let pos = Vector.fromPolar(r1, a1),
      vel = Vector.fromPolar(-3, a1);

      pos.add(this.buffer.center);

      p.pos = pos;
      p.vel = vel;
    }
  }

  polygon(radius, sides, angle = 0) {
    // calculate lines of polygon
    let lines = [];
    for (let i = 0; i < sides; i++) {
      let a = i * tau / sides - tau / 4 + angle,
      x1 = radius * cos(a),
      y1 = radius * sin(a),
      x2 = radius * cos(a + tau / sides),
      y2 = radius * sin(a + tau / sides);
      lines.push({ x1, y1, x2, y2 });
    }

    let yd = (abs(lines[0].y1) - abs(lines[sides >> 1].y1)) / 2;
    if (lines[0].y1 > lines[sides >> 1].y1) yd *= -1;

    for (let p of this.particles) {
      // choose random line
      let { x1, x2, y1, y2 } = lines[random(0, sides - 1)];
      // lerp between points
      let t = random(0, 1, true),
      x = x1 + t * (x2 - x1),
      y = y1 + t * (y2 - y1);

      let pos = new Vector(x, y);

      // center on canvas
      pos.add(this.buffer.center);
      pos.y += yd;

      p.pos = pos;
    }
  }

  star(radius) {
    // calculate lines of star
    let lines = [];
    for (let i = 0; i < 5; i++) {
      let a = i * tau / 5 - tau / 4,
      x1 = radius * cos(a),
      y1 = radius * sin(a),
      x2 = radius * cos(a + tau * 2 / 5),
      y2 = radius * sin(a + tau * 2 / 5);
      lines.push({ x1, y1, x2, y2 });
    }

    // centering factor
    let yd = (abs(lines[0].y1) - abs(lines[2].y1)) / 2;

    for (let p of this.particles) {
      // choose random line 
      let { x1, x2, y1, y2 } = lines[random(0, 4)];

      // magic number is tip to valley on star
      let t = random(0, 0.381966011250105);
      if (random(0, 1)) t = 1 - t;

      // lerp between points
      let x = x1 + t * (x2 - x1),
      y = y1 + t * (y2 - y1);

      let pos = new Vector(x, y);

      // center on canvas
      pos.add(this.buffer.center);
      pos.y += yd;

      p.pos = pos;
    }
  }

  fn(fn, domain) {
    for (let p of this.particles) {
      let x = random(...domain, 1),
      y = fn(x),
      t = (x + domain[0]) / (domain[1] - domain[0]),
      rgb = hsl2rgb(t, 1, 0.5);

      let pos = new Vector(x, y);

      pos.add(this.buffer.center);
      rgb.push(p.col[3]);

      p.col = rgb;
      p.pos = pos;
    }
  }

  random() {
    for (let p of this.particles) {
      let x = random(0, this.buffer.width, true),
      y = random(0, this.buffer.height, true);
      p.pos = new Vector(x, y);
    }
  }

  // 0 = frozen, 1 = outward, 2 = inward
  setVels(dir, speed) {
    for (let p of this.particles) {
      if (dir == 0) {
        p.vel.mul(0);
      } else {
        let vel = p.pos.clone().add(this.buffer.ncenter);
        vel.r = (dir == 2 ? -1 : 1) * speed;
        p.vel = vel;
      }
    }
  }

  update() {
    let n = this.subFrames;

    // break up into n steps to make smooth lines
    for (let p of this.particles) {
      p.update(this.noise);
      let step = p.vel.clone().mul(1 / n);
      for (let i = 0; i < n; i++) {
        this.buffer.drawPixel(p.pos.x, p.pos.y, p.col);
        p.pos.add(step);
      }
    }

    this.buffer.flush();
  }

  rainbowify(alpha) {
    for (let p of this.particles) {
      let c = p.pos.clone().add(this.buffer.ncenter),
      a = (c.a + tau / 4) / tau,
      rgb = hsl2rgb(a, 1, 0.5);

      rgb.push(alpha);
      p.col = rgb;
    }
  }

  colorify(col) {
    for (let p of this.particles)
    p.col = col.slice();
  }}


class ParticleNoise {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderID = 0;
  }

  generate(settings) {
    let {
      width, height, shape,
      startOctave, endOctave,
      numParticles, numFrames } =
    settings;

    this.frame = 0;
    this.numFrames = numFrames;
    this.shape = shape;

    this.canvas.width = width;
    this.canvas.height = height;

    this.buffer = new CanvasBuffer(this.canvas);
    this.noise = new Noise(settings);
    this.particles = new ParticleSystem(settings, this.noise, this.buffer);

    this.stop();
    this.render();
  }

  render() {
    this.frame++;
    this.particles.update();

    // update progress bar at 30fps
    if (this.frame == this.numFrames || this.frame % 2 == 0)
    settings.progress = 100 * this.frame / this.numFrames;

    if (this.frame < this.numFrames)
    this.renderID = window.requestAnimationFrame(this.render.bind(this));else
    {
      this.renderID = 0;
      if (settings.autogenerate)
      this.generate(settings);
    }
  }

  save() {
    let rnd = new Array(5).fill(0).map(() => Math.floor(36 * Math.random()).toString(36)).join('');
    let name = `noise-${this.shape}-${rnd}.png`;
    this.canvas.toBlob(blob => {
      saveAs(blob, name);
    });
  }

  stop() {
    if (this.renderID) {
      window.cancelAnimationFrame(this.renderID);
      this.renderID = 0;
      settings.progress = 0;
    }
  }

  invert() {
    this.stop();
    let ctx = this.canvas.getContext('2d');
    let img = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < img.data.length; i += 4) {
      img.data[i + 0] = 255 - img.data[i + 0];
      img.data[i + 1] = 255 - img.data[i + 1];
      img.data[i + 2] = 255 - img.data[i + 2];
    }
    ctx.putImageData(img, 0, 0);
  }}


let PN = new ParticleNoise(document.getElementById('noise'));
let dpr = window.devicePixelRatio;

let settings = {
  width: window.innerWidth * dpr,
  height: window.innerHeight * dpr,
  type: 0,
  strength: 1,
  startOctave: 5,
  endOctave: 8,
  numParticles: 10000,
  numFrames: 300,
  subFrames: 4,
  progress: 0,
  shape: 'triangle',
  radius: 0.7,
  colorType: 'rainbow',
  color: [127, 0, 255],
  alpha: 0.1,
  velocity: 0,
  speed: 3,
  friction: 0.05,
  autogenerate: true,
  save: () => PN.save(),
  stop: () => PN.stop(),
  invert: () => PN.invert(),
  generate: () => PN.generate(settings) };


settings.generate();

let gui = new dat.GUI();

let rndr = gui.addFolder('rendering');
rndr.add(settings, 'width');
rndr.add(settings, 'height');
rndr.add(settings, 'numParticles', 10, 3e4, 1);
rndr.add(settings, 'numFrames', 1, 600, 1);
rndr.add(settings, 'subFrames', 1, 10, 1);
rndr.open();

let col = gui.addFolder('particles');
col.add(settings, 'shape', ['circle', 'triangle', 'triangle2', 'square', 'square2', 'hexagon', 'hexagon2', 'star', 'random']);
col.add(settings, 'radius', 0.1, 1);
col.add(settings, 'velocity', { 'none': 0, 'outward': 1, 'inward': 2 }).name('initial velocity');
col.add(settings, 'speed', 0.1, 10);
col.add(settings, 'friction', 0, 1);
col.add(settings, 'colorType', ['solid', 'rainbow']);
col.addColor(settings, 'color');
col.add(settings, 'alpha', 0, 1);
col.open();

let nz = gui.addFolder('noise');
nz.add(settings, 'type', { 'ink': 0, 'loop': 1, 'streak': 2 });
nz.add(settings, 'strength', 0.1, 10, 0.1);
nz.add(settings, 'startOctave', 0, 10, 1).onChange(update);
nz.add(settings, 'endOctave', 0, 11, 1).onChange(update);
nz.open();

gui.add(settings, 'invert');
gui.add(settings, 'save');
gui.add(settings, 'stop');
gui.add(settings, 'autogenerate');
gui.add(settings, 'progress', 0, 100, 1).listen();
gui.add(settings, 'generate');

function update() {
  for (let c of nz.__controllers) {
    switch (c.property) {
      case "endOctave":
        let min = settings.startOctave + 1;
        if (c.getValue() < min)
        c.setValue(min);
        break;}

  }
}