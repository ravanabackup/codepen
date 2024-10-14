/*--------------------
Utils
--------------------*/
const scale = (v, x1, y1, x2, y2) => (v - x1) * (y2 - x2) / (y1 - x1) + x2;
const deg = a => a * Math.PI / 180;
const turnAround = t => t * deg(360);


/*--------------------
Settings
--------------------*/
const settings = {
  times: 10,
  startRadius: 0,
  endRadius: 300,
  startStroke: 15,
  endStroke: 50,
  offsetX: deg(-.5),
  offsetY: 0,
  startColor: 'rgb(123,0,7)',
  endColor: 'rgb(255,185,18)',
  backgroundColor: 'rgb(0, 0, 0)',
  speed: 1 };



/*--------------------
Setup
--------------------*/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const win = {
  w: window.innerWidth,
  h: window.innerHeight };

const mouse = {
  x: win.w / 2,
  y: win.h / 2 };

let loop = 0;
let animation = 0;


/*--------------------
Listeners
--------------------*/
window.addEventListener('resize', () => {
  win.w = window.innerWidth;
  win.h = window.innerHeight;
});

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});


/*--------------------
Reset
--------------------*/
const reset = () => {
  canvas.width = win.w * 2;
  canvas.height = win.h * 2;
  canvas.style.width = `${win.w}px`;
  canvas.style.height = `${win.h}px`;
  ctx.fillStyle = settings.backgroundColor;
  ctx.fillRect(0, 0, win.w * 2, win.h * 2);
  ctx.closePath();
  ctx.scale(2, 2);
  ctx.translate(win.w / 2, win.h / 2);
};


/*--------------------
Generate Vortex
--------------------*/
const vortex = () => {
  const times = turnAround(settings.times);
  for (let i = 0; i < times; i += deg(1)) {

    const c1 = settings.startColor.match(/\d+/g).map(Number);
    const c2 = settings.endColor.match(/\d+/g).map(Number);
    const r = scale(i, 0, times, c1[0], c2[0]);
    const g = scale(i, 0, times, c1[1], c2[1]);
    const b = scale(i, 0, times, c1[2], c2[2]);
    const color = `rgba(${r}, ${g}, ${b})`;
    ctx.fillStyle = color;

    const width = scale(i, 0, times, settings.startStroke, settings.endStroke);
    ctx.lineWidth = width;

    const radius = scale(i, 0, turnAround(settings.times), settings.startRadius, settings.endRadius);
    const x = (Math.sin(i + animation) + settings.offsetX * i) * radius;
    const y = (Math.cos(i + animation) + settings.offsetY * i) * radius;

    ctx.beginPath();
    ctx.arc(x, y, width, 0, deg(360));
    ctx.fill();
    ctx.closePath();
  }
};


/*--------------------
Dat Gui
--------------------*/
const randomize = () => {
  settings.times = Math.random() * 20;
  settings.startRadius = Math.random() * win.w / 4;
  settings.endRadius = Math.random() * win.w / 4;
  settings.startStroke = Math.random() * 130;
  settings.endStroke = Math.random() * 130;
  settings.offsetX = deg(-1 + Math.random() * 2);
  settings.offsetY = deg(-1 + Math.random() * 2);
  const c1 = [
  Math.floor(Math.random() * 200),
  Math.floor(Math.random() * 200),
  Math.floor(Math.random() * 200)];

  const c2 = [
  Math.floor(Math.random() * 200),
  Math.floor(Math.random() * 200),
  Math.floor(Math.random() * 200)];

  settings.startColor = `rgba(${c1[0]}, ${c1[1]}, ${c1[2]})`;
  settings.endColor = `rgba(${c2[0]}, ${c2[1]}, ${c2[2]})`;
  gui.destroy();
  datgui();
};


/*--------------------
Dat Gui
--------------------*/
const saveImage = () => {
  const image = canvas.toDataURL("image/png");
  const a = document.createElement('a');
  a.href = image;
  a.setAttribute('download', '');
  console.log(a);
  document.body.appendChild(a);
  a.click();
};


/*--------------------
Dat Gui
--------------------*/
let gui;
const datgui = () => {
  gui = new dat.GUI();
  let f1 = gui.addFolder('Loops');
  f1.add(settings, "times", 1, 20).step(deg(1));
  f1.add(settings, "speed", 0, 10).step(1);
  f1.open();

  let f2 = gui.addFolder('Radius');
  f2.add(settings, "startRadius", 0, win.w * 0.7).step(1);
  f2.add(settings, "endRadius", 0, win.w * 0.7).step(1);

  let f3 = gui.addFolder('Stroke');
  f3.add(settings, "startStroke", 1, 200).step(1);
  f3.add(settings, "endStroke", 1, 200).step(1);

  let f4 = gui.addFolder('Offset');
  f4.add(settings, "offsetX", -deg(4), deg(4)).step(deg(.1));
  f4.add(settings, "offsetY", -deg(4), deg(4)).step(deg(.1));

  let f5 = gui.addFolder('Colors');
  f5.addColor(settings, "startColor");
  f5.addColor(settings, "endColor");
  f5.addColor(settings, "backgroundColor");

  const save = { Download: () => saveImage() };
  gui.add(save, 'Download');

  console.log(settings);
  if (win.w < 500) {
    gui.close();
  }
};
datgui();
vortex();

/*--------------------
Animate
--------------------*/
const animate = () => {
  animation = settings.speed * loop;
  reset();
  vortex();
  loop += 0.01;
  requestAnimationFrame(animate);
};
animate();