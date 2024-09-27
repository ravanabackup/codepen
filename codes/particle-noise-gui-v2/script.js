const tau = 2 * Math.PI;
const { random } = _;
const { abs, ceil, floor, log, max, min, sqrt, sin, cos } = Math;

// Vector and Path come from imported codepen
// https://codepen.io/ajm13/pen/oMoWZm

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
    let fx = floor(x),
    fy = floor(y),
    dx1 = x - fx,
    dy1 = y - fy,
    dx0 = 1 - dx1,
    dy0 = 1 - dy1;

    // dx0 = min(1, dx0 * Math.SQRT1_2)
    // dx1 = min(1, dx1 * Math.SQRT1_2)
    // dy0 = min(1, dy0 * Math.SQRT1_2)
    // dy1 = min(1, dy1 * Math.SQRT1_2)

    // let x0s = dx1 * dx1,
    //     x1s = dx0 * dx0,
    //     y0s = dy1 * dy1,
    //     y1s = dy0 * dy0

    // let a00 = max(0, 1 - (x0s + y0s)),
    //     a01 = max(0, 1 - (x0s + y1s)),
    //     a10 = max(0, 1 - (x1s + y0s)),
    //     a11 = max(0, 1 - (x1s + y1s))

    let a00 = dx0 * dy0,
    a01 = dx0 * dy1,
    a10 = dx1 * dy0,
    a11 = dx1 * dy1;

    let d00 = this.drawCell(fx + 0, fy + 0, c, a00),
    d01 = this.drawCell(fx + 0, fy + 1, c, a01),
    d10 = this.drawCell(fx + 1, fy + 0, c, a10),
    d11 = this.drawCell(fx + 1, fy + 1, c, a11);

    return d00 || d01 || d10 || d11;
  }

  // set color of cell with alpha, for drawPixel
  drawCell(x, y, c, a) {
    // ignore out of bounds and invisible
    if (x < 0 || x >= this.width) return false;
    if (y < 0 || y >= this.height) return false;
    if ((a *= c[3]) < 0.002) return false;

    let data = this.buf.data,
    i = 4 * (x + y * this.width),
    r = data[i + 0],
    g = data[i + 1],
    b = data[i + 2];

    r += ~~(c[0] * a);
    g += ~~(c[1] * a);
    b += ~~(c[2] * a);

    // overflow color math so red + red = white
    let t = (c[0] + c[1] + c[2]) / 255 * 3,
    ro = max(0, r - 255),
    go = max(0, g - 255),
    bo = max(0, b - 255),
    to = (ro + bo + go) / t;

    data[i + 0] = r + to;
    data[i + 1] = g + to;
    data[i + 2] = b + to;

    return true;
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
      let r = Vector.fromPolar(127.5, random(0, tau));
      data[i + 0] = 127.5 + r.x;
      data[i + 1] = 127.5 + r.y;
      data[i + 2] = 0; // not used for now
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
      let noise = Noise.noise(w >> i || 1, h >> i || 1);
      ctx.drawImage(noise, 0, 0, w, h);
    }

    return cv;
  }

  preview() {
    let cv = document.createElement('canvas');
    cv.width = this.width;
    cv.height = this.height;
    let ctx = cv.getContext('2d');

    let img = ctx.getImageData(0, 0, cv.width, cv.height);
    for (let i = 0; i < img.data.length; i += 4) {
      let d = new Vector(
      this.data[i + 0] / 127.5 - 1,
      this.data[i + 1] / 127.5 - 1);

      let h = (d.a + 5 * tau / 4) / tau;
      let l = d.r / 2;
      let rgb = hsl2rgb(h, 1, l);

      img.data[i + 0] = rgb[0];
      img.data[i + 1] = rgb[1];
      img.data[i + 2] = rgb[2];
      img.data[i + 3] = 255;
    }

    ctx.putImageData(img, 0, 0);
    document.getElementById('noise-d').src = cv.toDataURL();
    document.getElementById('noise-t').src = this.canvas.toDataURL();
  }

  // returns noise value from -1.0 to 1.0
  getNoise(x, y, ch = 0) {
    // if out of bounds, sample reflect
    if (x >= this.width) x = 2 * this.width - 1 - x;else
    if (x < 0) x = -x;

    if (y >= this.height) y = 2 * this.height - 1 - y;else
    if (y < 0) y = -y;

    // if still out of bounds, return 0
    if (x < 0 || x >= this.width) return 0;
    if (y < 0 || y >= this.height) return 0;

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
    this.alive = true;
  }

  update() {
    let { noise, rotate, overlap, mirror, center } = this.system,
    p = this.pos.clone(),
    s = 0;

    // TODO: figure out better way to sample rotate
    if (rotate && !overlap) {
      p.sub(center);
      s = p.a + tau / 4;
      let a = (s + tau) % (tau / (rotate + 1));
      p.a = a - tau / 4;
      p.add(center);
      s = s == a ? 0 : a - s;
    }

    if (mirror && p.x > center.x) {
      p.x = 2 * center.x - p.x;
    }

    let { x, y } = p,
    dx = noise.getNoise(x, y, 0),
    dy = noise.getNoise(x, y, noise.type == 2 ? 0 : 1),
    d = new Vector(dx, dy);

    if (this.system.colorType == 'noise') {
      let a = (d.a + 5 * tau / 4) % tau;
      let rgb = hsl2rgb(a / tau, d.r / 2 + 0.5, 0.5);
      this.col = [...rgb, this.col[3]];
    }

    if (s) d.a -= s;

    this.col[3] *= this.system.alphaFade;

    this.vel.mul(1 - this.system.friction);
    this.vel.add(d.mul(noise.strength));

    if (this.system.colorType == 'direction') {
      let a = (this.vel.a + 5 * tau / 4) % tau;
      let rgb = hsl2rgb(a / tau, 1, 0.5);
      this.col = [...rgb, this.col[3]];
    }

    if (noise.type == 0 && this.vel.r > this.system.speed ||
    noise.type == 1)
    this.vel.r = this.system.speed;
  }}


class ParticleSystem {
  constructor(settings, noise, buffer) {
    this.noise = noise;
    this.buffer = buffer;
    this.particles = [];

    let n = (1 + settings.rotate) * (1 + settings.mirror);
    this.num = floor(settings.numParticles / n);
    this.subFrames = settings.subFrames;
    this.colorType = settings.colorType;
    this.alphaFade = settings.alphaFade;

    this.rotate = settings.rotate;
    this.overlap = settings.overlap;
    this.mirror = settings.mirror;
    this.center = new Vector(settings.width, settings.height).mul(0.5);

    this.speed = settings.speed;
    this.friction = settings.friction;

    for (let i = 0; i < this.num; i++)
    this.particles.push(new Particle(this));

    let r = min(this.center.x, this.center.y) * settings.radius;

    switch (settings.shape) {
      case 'circle':this.circle(r);break;
      case 'triangle':this.polygon(r, 3);break;
      case 'triangle2':this.polygon(r, 3, tau / 2);break;
      case 'square':this.polygon(r, 4, tau / 8);break;
      case 'square2':this.polygon(r, 4);break;
      case 'hexagon':this.polygon(r, 6);break;
      case 'hexagon2':this.polygon(r, 6, tau / 12);break;
      case 'heart':this.heart(r);break;
      case 'star':this.star(r);break;
      case 'random':this.random(r);break;}


    this.setVels(settings.velocity, this.speed);

    if (['solid', 'randomize', 'noise', 'direction'].includes(this.colorType))
    this.colorify(settings.color.concat(settings.alpha));

    if (this.colorType == 'rainbow')
    this.rainbowify(settings.alpha);
  }

  heart(radius) {
    let heart = new Path();

    let hr = 0.4 * Math.SQRT2 * radius;
    let s = 0.9 * Math.SQRT2 * radius;
    let v = new Vector(0, radius);

    heart.moveTo(v);
    v.add(Vector.one.norm().mul(-s));
    heart.lineTo(v);
    let hc = v.clone().add(new Vector(1, -1).norm().mul(hr));
    for (let a = tau / 2; a <= tau; a += tau / 64) {
      let v = Vector.fromPolar(hr, a - tau / 8);
      heart.lineTo(v.add(hc));
    }
    heart.lineTo(new Vector(0, -0.6 * radius));
    hc.x *= -1;
    for (let a = tau / 2; a <= tau; a += tau / 64) {
      let v = Vector.fromPolar(hr, a + tau / 8);
      heart.lineTo(v.add(hc));
    }
    heart.lineTo(new Vector(0, radius));

    for (let p of this.particles) {
      let pos = heart.getRandomPoint();
      p.pos = pos.add(this.buffer.center);
    }
  }

  circle(radius) {
    for (let p of this.particles) {
      let pos = Vector.fromPolar(radius, random(0, tau));
      p.pos = pos.add(this.buffer.center);
    }
  }

  polygon(radius, sides, angle = 0) {
    // calculate lines of polygon
    let poly = new Path();
    for (let i = 0; i <= sides; i++) {
      let a = i * tau / sides + angle - tau / 4,
      v = Vector.fromPolar(radius, a);
      poly[i == 0 ? "moveTo" : "lineTo"](v);
    }

    // let yd = (abs(lines[0].y1) - abs(lines[sides >> 1].y1)) / 2
    // if (lines[0].y1 > lines[sides >> 1].y1) yd *= -1

    for (let p of this.particles) {
      let pos = poly.getRandomPoint();
      pos.add(this.buffer.center);
      // pos.y += yd
      p.pos = pos;
    }
  }

  star(radius) {
    let star = new Path();
    for (let i = 0; i <= 10; i++) {
      let a = i * tau / 10 - tau / 4;
      let r = radius;
      if (i % 2) r *= 0.381966011250105;
      let v = Vector.fromPolar(r, a);
      star[i == 0 ? "moveTo" : "lineTo"](v);
    }

    for (let p of this.particles) {
      let pos = star.getRandomPoint();
      p.pos = pos.add(this.buffer.center);
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
      p.alive = false;
      p.update();

      let a = tau / (this.rotate + 1);
      let step = p.vel.clone().mul(1 / n);
      for (let i = 0; i < n; i++) {
        for (let i = 0; i <= this.rotate; i++) {
          let q = p.pos.clone();

          q.sub(this.center);
          q.a += i * a;
          q.add(this.center);

          p.alive |= this.buffer.drawPixel(q.x, q.y, p.col);

          if (this.mirror) {
            q.sub(this.center);
            q.x *= -1;
            q.add(this.center);
            p.alive |= this.buffer.drawPixel(q.x, q.y, p.col);
          }
        }

        p.pos.add(step);
      }
    }

    // if particle didn't draw, cull
    this.particles = this.particles.filter(p => p.alive);

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
    let { width, height, shape, numFrames } = settings;

    if (settings.randomize)
    randomize();

    this.frame = 0;
    settings.alphaFade = 1 - 0.90 ** (5 - settings.fade) / 100;
    this.numFrames = ceil(log(0.002 / settings.alpha) / log(settings.alphaFade));
    this.shape = shape;

    this.canvas.width = width;
    this.canvas.height = height;

    if (settings.colorType == 'randomize')
    settings.color = hsl2rgb(random(0, 1, 1), 1, 0.5);

    this.buffer = new CanvasBuffer(this.canvas);
    this.noise = new Noise(settings);
    this.noise.preview();

    // document.getElementById('noise-t').src = this.noise.canvas.toDataURL()
    this.system = new ParticleSystem(settings, this.noise, this.buffer);

    this.stop();
    this.render();
  }

  render() {
    this.frame++;
    this.system.update();

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
  width: 1920,
  height: 1080,
  particleDensity: 0.4,
  numParticles: 11520,
  type: 0,
  strength: 2,
  startOctave: 3,
  endOctave: 11,
  numFrames: 400,
  subFrames: 4,
  progress: 0,
  shape: 'hexagon',
  radius: 0.7,
  colorType: 'noise',
  color: [255, 64, 0],
  alpha: 0.15,
  fade: 5,
  velocity: 0,
  speed: 2,
  friction: 0.05,
  autogenerate: true,
  rotate: 1,
  overlap: false,
  mirror: true,
  save: () => PN.save(),
  stop: () => PN.stop(),
  invert: () => PN.invert(),
  generate: () => PN.generate(settings)
  // randomize: {
  //   shape: false,
  //   radius: false,
  //   colorType: false,
  //   alpha: false,
  //   type: false,
  //   strength: false,
  //   startOctave: false,
  //   endOctave: false,
  //   rotate: false,
  //   mirror: false
  // }
};

let size = {
  setFromScreen() {
    settings.width = screen.width * dpr;
    settings.height = screen.height * dpr;
    size.calcNumParticles();
  },

  setFromWindow() {
    settings.width = window.innerWidth * dpr;
    settings.height = window.innerHeight * dpr;
    size.calcNumParticles();
  },

  calcNumParticles() {
    let d = sqrt(settings.width * settings.height);
    settings.numParticles = 20 * d * settings.particleDensity;
    gui.__folders.rendering.__controllers[2].updateDisplay();
    gui.__folders.rendering.__controllers[3].updateDisplay();
    gui.__folders.rendering.__controllers[5].updateDisplay();
  } };


let gui = new dat.GUI({
  closeOnTop: true,
  useLocalStorage: true,
  load: {
    "preset": "Ink",
    "remembered": {
      "Default": {},
      "Crystal": {
        "0": {
          "particleDensity": 0.6,
          "subFrames": 6,
          "shape": "random",
          "colorType": "randomize",
          "alpha": 0.3,
          "type": "2",
          "strength": 10,
          "startOctave": 1,
          "endOctave": 9,
          "rotate": 3,
          "overlap": true,
          "mirror": true,
          "velocity": "0",
          "speed": 2,
          "friction": 0.1 } },


      "Flare": {
        "0": {
          "particleDensity": 0.6,
          "subFrames": 6,
          "shape": "triangle",
          "radius": 0.3,
          "colorType": "direction",
          "alpha": 0.15,
          "type": 1,
          "strength": 0.1,
          "startOctave": 4,
          "endOctave": 8,
          "rotate": 0,
          "overlap": false,
          "mirror": false,
          "velocity": "1",
          "speed": 3,
          "friction": 0 } },


      "Flare 2": {
        "0": {
          "particleDensity": 0.6,
          "subFrames": 7,
          "shape": "triangle",
          "radius": 0.4,
          "colorType": "randomize",
          "alpha": 0.15,
          "type": 1,
          "strength": 0.1,
          "startOctave": 4,
          "endOctave": 8,
          "rotate": 0,
          "overlap": false,
          "mirror": false,
          "velocity": "1",
          "speed": 4,
          "friction": 0 } },


      "Fluoresce": {
        "0": {
          "particleDensity": 0.6,
          "subFrames": 6,
          "shape": "random",
          "colorType": "noise",
          "alpha": 0.2,
          "type": "1",
          "strength": 10,
          "startOctave": 4,
          "endOctave": 11,
          "rotate": 3,
          "overlap": false,
          "mirror": true,
          "velocity": 0,
          "speed": 2,
          "friction": 0.05 } },


      "Ink": {
        "0": {
          "subFrames": 6,
          "shape": "hexagon",
          "radius": 0.5,
          "colorType": "randomize",
          "alpha": 0.15,
          "type": 0,
          "strength": 3,
          "startOctave": 5,
          "endOctave": 11,
          "rotate": 0,
          "overlap": false,
          "mirror": false,
          "velocity": "0",
          "speed": 3,
          "friction": 0.1 } },


      "Iris": {
        "0": {
          "subFrames": 6,
          "shape": "circle",
          "radius": 0.3,
          "colorType": "randomize",
          "alpha": 0.15,
          "type": 1,
          "strength": 0.1,
          "startOctave": 4,
          "endOctave": 8,
          "rotate": 5,
          "overlap": true,
          "mirror": false,
          "velocity": "1",
          "speed": 3,
          "friction": 0 } },


      "Iris 2": {
        "0": {
          "particleDensity": 0.7,
          "subFrames": 7,
          "shape": "circle",
          "radius": 0.2,
          "colorType": "randomize",
          "alpha": 0.15,
          "fade": 1,
          "type": "0",
          "strength": 0.1,
          "startOctave": 5,
          "endOctave": 8,
          "rotate": 8,
          "overlap": true,
          "mirror": false,
          "velocity": "1",
          "speed": 4,
          "friction": 0 } },


      "Mandala": {
        "0": {
          "particleDensity": 0.5,
          "subFrames": 6,
          "shape": "random",
          "colorType": "direction",
          "alpha": 0.2,
          "type": "1",
          "strength": 10,
          "startOctave": 4,
          "endOctave": 8,
          "rotate": 8,
          "overlap": true,
          "mirror": true,
          "velocity": "0",
          "speed": 2 } } } } });





gui.remember(settings);

let rndr = gui.addFolder('rendering');
rndr.add(size, 'setFromScreen');
rndr.add(size, 'setFromWindow');
rndr.add(settings, 'width').min(10).onChange(size.calcNumParticles);
rndr.add(settings, 'height').min(10).onChange(size.calcNumParticles);
rndr.add(settings, 'particleDensity', 0.1, 1, 0.1).onChange(size.calcNumParticles);
rndr.add(settings, 'numParticles', 1).listen();
// rndr.add(settings, 'numParticles', 10, 5e4, 1).listen()
rndr.add(settings, 'subFrames', 1, 10, 1);
rndr.open();

let col = gui.addFolder('particles');
col.add(settings, 'shape', ['circle', 'triangle', 'triangle2', 'square', 'square2', 'hexagon', 'hexagon2', 'heart', 'star', 'random']);
col.add(settings, 'radius', 0.1, 1, 0.1);
col.add(settings, 'colorType', ['solid', 'randomize', 'noise', 'direction', 'rainbow']);
col.addColor(settings, 'color').listen();
col.add(settings, 'alpha', 0, 1);
col.add(settings, 'fade', 1, 10, 1);
col.open();

let nz = gui.addFolder('noise');
nz.add(settings, 'type', { 'ink': 0, 'loop': 1, 'streak': 2 });
nz.add(settings, 'strength', 0.1, 10, 0.1);
nz.add(settings, 'startOctave', 0, 10, 1).onChange(update);
nz.add(settings, 'endOctave', 0, 11, 1).onChange(update);
nz.open();

let sm = gui.addFolder('symmetry');
sm.add(settings, 'rotate', 0, 10, 1);
sm.add(settings, 'overlap');
sm.add(settings, 'mirror');
sm.open();

let sim = gui.addFolder('simulation');
sim.add(settings, 'velocity', { 'none': 0, 'outward': 1, 'inward': 2 }).name('initial velocity');
sim.add(settings, 'speed', 0.1, 10);
sim.add(settings, 'friction', 0, 1, 0.01);
sim.open();

// let rnd = gui.addFolder('randomize')
// for (let key of Object.keys(settings.randomize))
//   rnd.add(settings.randomize, key)

gui.add(settings, 'invert');
gui.add(settings, 'save');
gui.add(settings, 'stop');
gui.add(settings, 'autogenerate');
gui.add(settings, 'progress', 0, 100, 1).listen();
gui.add(settings, 'generate');
gui.close();

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

size.setFromWindow();
settings.generate();