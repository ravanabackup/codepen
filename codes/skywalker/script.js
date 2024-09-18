/*********
 * made by Matthias Hurrle (@atzedent)
 */

/** @type {HTMLCanvasElement}  */
const canvas = window.canvas;
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
/** @type {HTMLCanvasElement}  */
const cvs = document.createElement("canvas");
const cvtx = cvs.getContext("2d");
/** @type {Walker[]}  */
let walkers = [];
let active = true;

function resize() {
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  cvs.width = canvas.width;
  cvs.height = canvas.height;
}

class Walker {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} r
   * @param {number} c Hue
   * @param {number} f Factor
   */
  constructor(x, y, r, c, f) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dir = 1;
    this.color = c;
    this.factor = f;
  }

  update() {
    let dir = this.dir;

    while (dir === this.dir) {
      dir = 1 + ~~(Math.random() * 8);
    }

    this.dir = dir;

    switch (dir) {
      case 1:
        this.y -= this.factor;
        break;
      case 2:
        this.x += this.factor;
        this.y -= this.factor;
        break;
      case 3:
        this.x += this.factor;
        break;
      case 4:
        this.x += this.factor;
        this.y += this.factor;
        break;
      case 5:
        this.y += this.factor;
        break;
      case 6:
        this.x -= this.factor;
        this.y += this.factor;
        break;
      case 7:
        this.x -= this.factor;
        break;
      case 8:
        this.x -= this.factor;
        this.y -= this.factor;
        break;
    }

    this.color += 0.1;

    const { width, height } = canvas;

    if (this.x - this.r < 0) this.x = this.r;
    if (this.x + this.r > width) this.x = width - this.r;
    if (this.y - this.r < 0) this.y = this.r;
    if (this.y + this.r > height) this.y = height - this.r;
  }

  draw() {
    const strokeStyle = ctx.strokeStyle;

    ctx.strokeStyle = `hsla(${this.color}, 100%, 50%, 50%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 7);
    ctx.stroke();
    ctx.strokeStyle = strokeStyle;
  }
}

function animate() {
  if (active) {
    for (let walker of walkers) {
      walker.update();
      walker.draw();
    }
  }

  cvtx.drawImage(canvas, 0, 0);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    cvs,
    (Math.random() * 1 - 0.5) * dpr,
    (Math.random() * 1 - 0.5) * dpr,
    canvas.width * (Math.random() > 0.5 ? 0.999 : 1.001),
    canvas.height * (Math.random() > 0.5 ? 0.999 : 1.001)
  );

  cvtx.clearRect(0, 0, canvas.width, canvas.height);
}

function loop() {
  animate();

  requestAnimationFrame(loop);
}

function generate(x, y) {
  const { width, height } = canvas;
  const wh = width * 0.5;
  const hh = height * 0.5;

  for (let i = 0; i < 1; i++) {
    walkers.push(
      new Walker(
        x || wh,
        y || hh,
        ~~(8 + Math.random() * 8) * dpr,
        ~~(Math.random() * 360),
        ~~(4 + Math.random() * 6) * dpr
      )
    );
  }
}

function init() {
  resize();

  Array.from(Array(50).keys()).forEach(() => generate());

  loop();
}

init();

canvas.onpointerdown = (e) => {
  active = !active;
};

window.onresize = resize;