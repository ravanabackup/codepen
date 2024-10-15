const c = document.querySelector('canvas');
const ctx = c.getContext('2d');
const dpr = devicePixelRatio;
const w = 500;
const h = 500;
const cx = w / 2;
const cy = h / 2;
const count = 17;
c.width = w * dpr;
c.height = h * dpr;
ctx.scale(dpr, dpr);
function loop() {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, w, h);
  let now = Date.now();
  let mod = Math.sin(now * 0.002);
  let modj = Math.sin(now * 0.004);
  let countk = 1 + 7 + mod * 8;
  let i = Math.ceil(countk);
  while (i--) {
    let segments = 3 + i;
    ctx.beginPath();
    for (let j = 0; j < segments; j++) {
      let a = j / segments * Math.PI * 2 - Math.PI * -0.5 + modj * 0.1;
      a += 1 / segments * Math.PI;
      let r = 45 + i * 11.5 + mod * 25;
      let x = cx + Math.cos(a) * r;
      let y = cy + Math.sin(a) * r + (countk - segments) * 3.3 * mod;
      ctx[j === 0 ? 'moveTo' : 'lineTo'](x, y);
    }
    ctx.closePath();
    ctx.lineWidth = 2 - i / count * 1.5;
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = `hsla(0, 100%, 100%, ${0.02 + (count - i) / count * 0.98})`;
    ctx.stroke();
  }
}
loop();