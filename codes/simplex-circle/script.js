/*--------------------
Setup
--------------------*/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let time = 0;
const devicePixelRatio = window.devicePixelRatio || 1;
const simplex = new SimplexNoise();
const o = {
  radius: 300,
  segments: 40,
  rows: 45,
  amplitude: 75,
  speed: 0.5,
  noise: 0.023,
  opacity: .3,
  shadow: .3 };



/*--------------------
Resize
--------------------*/
const onResize = () => {
  canvas.width = o.radius * devicePixelRatio;
  canvas.height = o.radius * devicePixelRatio;
  canvas.style.width = `${o.radius}px`;
  canvas.style.height = `${o.radius}px`;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  document.body.style.setProperty('--radius', `${o.radius}px`);
};
onResize();


/*--------------------
Listeners
--------------------*/
window.addEventListener('resize', onResize);


/*--------------------
Clear
--------------------*/
const clear = () => {
  ctx.fillStyle = `rgba(0, 0, 0, ${o.shadow})`;
  ctx.fillRect(0, 0, o.radius, o.radius);
};


/*--------------------
Draw
--------------------*/
const draw = () => {
  ctx.beginPath();
  ctx.strokeStyle = `rgba(255, 255, 255, ${o.opacity})`;
  const x = 0;

  for (let r = 0; r < o.rows; r++) {
    const amp = o.radius * 2 / o.rows;
    const y = -o.radius * .5;
    ctx.beginPath();
    ctx.moveTo(-10, y + r * amp);
    for (let i = 0; i < o.segments; i++) {
      const ind = i / (o.segments - 2);
      const n = simplex.noise3D(i * o.noise, r * o.noise, time * o.speed);
      ctx.lineTo(o.radius * ind, y + r * amp + n * o.amplitude);
    }
    ctx.stroke();
  }
};

/*--------------------
Animate
--------------------*/
const animate = () => {
  time += 0.01;
  clear();
  draw();
  requestAnimationFrame(animate);
};
animate();


/*--------------------
Tweakpane
--------------------*/
const pane = new Tweakpane.Pane();
const f = pane.addFolder({
  title: 'Settings' });

f.addInput(o, 'radius', { min: 100, max: 500, step: 1 }).on('change', onResize);
f.addInput(o, 'noise', { min: 0, max: 0.05, step: .001 });
f.addInput(o, 'rows', { min: 1, max: 100, step: 1 });
f.addInput(o, 'amplitude', { min: 0, max: 200, step: 1 });
f.addInput(o, 'opacity', { min: 0, max: 1, step: .1 });
f.addInput(o, 'speed', { min: 0, max: 2, step: .1 });
f.addInput(o, 'shadow', { min: 0.1, max: 1, step: .1 });