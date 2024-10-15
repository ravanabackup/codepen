let c,
ctx,
w,
h,
count,
lines,
tick;

function rand(min, max) {
  return Math.random() * (max - min) + min;
};

class Line {
  constructor(opt) {
    Object.assign(this, opt);
    this.rx = this.x;
  }
  step() {
    this.rx = this.x + Math.sin((tick + this.offset) / this.div) * this.range;
  }
  draw() {
    ctx.fillStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + this.alpha + ')';
    ctx.fillRect(this.rx - this.w / 2 + rand(-2, 2), ~~(this.y - this.h / 2), this.w + rand(-2, 2), ~~this.h);
  }}


function init() {
  c = document.querySelector('canvas');
  ctx = c.getContext('2d');
  w = 300;
  h = 300;
  count = 250;
  lines = [];
  tick = 0;
  reset();
  loop();
}

function reset() {
  c.width = w;
  c.height = h;
  lines.length = 0;
  for (let i = 0; i < count; i++) {
    lines.push(new Line({
      x: w / 2,
      y: 50 + count - i,
      w: (count - i) * 1,
      h: 1,
      range: i / 8 + rand(0, (count - i) / 10),
      div: 40,
      offset: i + rand(0, 20),
      hue: 0,
      saturation: 0,
      lightness: 0,
      alpha: (count - i * 0.9) / count * 0.9 }));

  }
}

function step() {
  let i = count;
  while (i--) {lines[i].step();}
  tick += rand(0, 1) > 0.2 ? 1 : rand(5, 10);
}

function draw() {
  ctx.fillStyle = 'hsla(' + (260 + tick + rand(0, 90)) + ', ' + rand(75, 100) + '%, ' + rand(45, 55) + '%, 0.1)';
  ctx.fillRect(0, 0, w, h);
  let i = count;
  while (i--) {lines[i].draw();}
  if (rand(0, 1) > 0.5) {
    ctx.save();
    if (rand(0, 1) > 0.5) {
      ctx.globalCompositeOperation = 'overlay';
    } else {
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.2;
    }
    ctx.translate(w / 2 + rand(-0.1, 0.1), h / 2 + rand(-0.1, 0.1));
    ctx.scale(rand(1, 1.1), rand(0.98, 1.02));
    ctx.rotate(rand(-0.005, 0.005));
    ctx.translate(-w / 2 + rand(-0.1, 0.1), -h / 2 + rand(-0.1, 0.1));
    ctx.drawImage(c, 0, 0);
    ctx.restore();
  }
}

function loop() {
  requestAnimationFrame(loop);
  step();
  draw();
}

init();