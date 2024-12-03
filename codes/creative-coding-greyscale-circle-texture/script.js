// from https://snippet.zone

const canvas = document.createElement('canvas'),
  c = canvas.getContext('2d');
 
document.body.appendChild(canvas);
document.body.style.margin = 0;
 
function brush() {
  let pnts = [];
  let cx = innerWidth * Math.random(),
    cy = innerHeight * Math.random();
  let x = y = 0;
  let ro = innerWidth / (1 + Math.random() * 2);
  let oro = ro;
  let r2 = innerWidth / (2 + Math.random() * 2);
  let rx = innerWidth / 4;
  let ry = rx;
 
  ro = Math.min(300, ro);
 
  let t = 0;
  let vt = 0.05;
  let wt = 0.05;
  let fric = 0.99;
  let t2 = 0;
  let x2 = 0;
  let y2 = 0;
  let vx2 = 0;
  let vy2 = 0;
  let col = ['black', 'white'][Math.floor(Math.random() * 2)];
  let cc = 0; //[0, 255][Math.floor(Math.random() * 2)];
  let s = 0.05 + Math.random() * 0.25;
 
  function draw() {
    c.save();
    c.translate(cx, cy);
    c.scale(s, s);
    for (let i = 0; i < 50; i++) {
      if (Math.random() < 0.13) {
        vt += Math.random() * 0.1 - 0.05;
      }
      if (Math.random() < 0.13) {
        wt += Math.random() * 0.1 - 0.05;
      }
      vt *= 0.99;
      wt *= 0.98;
      rx += (vt + wt * r2 + ro - rx) / 12;
      ry += (vt + wt * r2 + ro - ry) / 12;
 
      if (Math.random() < 0.001) {
        ro += 100 * Math.sin(t2 / 5);
        if (Math.abs(ro) < 50) ro = 50;
      }
      t2 += 0.01;
      x = rx * Math.cos(t / 10) + y2;
      y = ry * Math.sin(t / 10) + x2;
 
      if (Math.random() < 0.01) {
        vx2 += Math.random() * 0.2 - 0.1;
      }
      if (Math.random() < 0.01) {
        vy2 += Math.random() * 0.2 - 0.1;
      }
 
      vx2 *= fric;
      vy2 *= fric;
 
      x2 += vx2;
      y2 += vy2;
      t += vt;
 
      c.fillStyle = col;
      c.fillRect(x, y, 4, 4);
      pnts.push([x, y]);
 
      if (Math.random() < 0.1) {
        const a = pnts[Math.floor(Math.random() * pnts.length)];
        const b = pnts[Math.floor(Math.random() * pnts.length)];
        c.strokeStyle = `rgba(${cc}, ${cc}, ${cc}, ${Math.random() / 2})`;
        c.beginPath();
        c.moveTo(a[0], a[1]);
        c.lineTo(b[0], b[1]);
        c.stroke();
      }
    }
    c.restore();
  }
  return draw;
}
 
const NUM = 20;
let brushes = [];
 
function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  c.fillStyle = 'gray';
  c.fillRect(0, 0, canvas.width, canvas.height);
 
  brushes = [];
  for (let i = 0; i < NUM; i++) {
    brushes.push(brush());
  }
}
addEventListener('resize', resize);
resize();
 
function loop() {
  c.globalAlpha = 1;
  c.fillStyle = 'rgba(155, 155, 155, 0.0018)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.globalAlpha = 0.5;
  for (let i = 0; i < brushes.length; i++) {
    brushes[i]();
  }
  requestAnimationFrame(loop);
}
loop();