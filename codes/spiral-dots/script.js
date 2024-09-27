const pi = Math.PI,
tau = 2 * Math.PI;

let cv = document.createElement('canvas'),
ctx = cv.getContext('2d');

cv.width = innerWidth * devicePixelRatio;
cv.height = innerHeight * devicePixelRatio;
ctx.translate(cv.width / 2, cv.height / 2);
ctx.scale(devicePixelRatio, devicePixelRatio);
document.body.appendChild(cv);

class Ring {
  constructor(r, d, s) {
    // tau * r * (tau / d) / tau
    let arc_l = tau * r / d;

    while (arc_l > s) {
      // d *= 2
      // arc_l /= 2
      d += 2;
      arc_l = tau * r / d;
    }

    this.r = r;
    this.d = d;
    this.a = 0;
    this.v = r / 50000;

    this.t = r;
    this.s = 2;
    // this.v = (1 - 2 * Math.random()) / 500
    // console.log(this.r, this.d)
  }

  draw(ctx) {
    ctx.fillStyle = '#fff';
    for (let i = 0; i < this.d; i++) {
      let a = tau * i / this.d + this.a,
      x = this.r * Math.cos(a) - this.s / 2,
      y = this.r * Math.sin(a) - this.s / 2;
      ctx.fillRect(x, y, this.s, this.s);
    }
  }

  update() {
    this.t--;
    this.s = 2 + Math.cos(this.t / 40);
    this.a += this.v;
  }}



let rings = [];

let r = 0;
for (let i = 0; i < 100; i++) {
  rings.push(new Ring(r + i * 8.1, 3, 17));
}

function animate() {
  ctx.clearRect(-cv.width / 2, -cv.height / 2, cv.width, cv.height);
  for (let ring of rings) {
    ring.draw(ctx);
    ring.update();
  }
  requestAnimationFrame(animate);
}

animate();