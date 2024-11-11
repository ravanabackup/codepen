const TAU = Math.PI * 2,
RTOD = 180 / Math.PI;

let a = 100,
cy = 2,
dt = 1 / 1080,
mc = 25,
ms = 25,
r = 2,
h = c.height = window.innerHeight,
w = c.width = window.innerWidth;

const cx = c.getContext('2d');

cx.fillRect(0, 0, w, h);
cx.translate(w / 2, h / 2);

for (let s = -1; s <= 1; s += 2) {
  for (let t = 0; t < cy * TAU; t += TAU * dt) {
    let sq_t = Math.sqrt(t),
    x = s * a * sq_t * Math.cos(t * mc),
    y = s * a * sq_t * Math.sin(t * ms);
    cx.beginPath();
    cx.arc(x, y, r, 0, TAU);
    cx.fillStyle = 'hsl(' + t * RTOD + ', 100%, 50%)';
    cx.fill();
    cx.closePath();
  }
}