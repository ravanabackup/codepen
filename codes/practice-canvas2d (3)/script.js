import {Ease} from 'https://assets.codepen.io/3919397/ease.js';
import {Utils} from 'https://assets.codepen.io/3919397/utilities.js';

let gui, canvas, c, width, height, id, ease, shapes, scale, size, num, maxDist;

const setupGui = () => {
  gui = new dat.GUI();
  
  gui.params = {
    timeScale: 0.0002,
    ease: 'easeInSine',
    number: 5,
    size: 30,
    start: () => start(),
    stop: () => stop()
  };

  gui.ctrls = {
    timeScale: gui.add(gui.params, 'timeScale', 0.0001, 0.005, 0.0001),
    ease: gui.add(gui.params, 'ease', Ease.returnEaseType())
      .onChange(() => initialize()),
    number: gui.add(gui.params, 'number', 1, 30, 1)
      .onChange(() => initialize()),
    size: gui.add(gui.params, 'size', 1, 500, 1)
      .onChange(() => initialize()),
    start: gui.add(gui.params, 'start'),
    stop: gui.add(gui.params, 'stop')
  };
  
  gui.close();
};

const setupCanvas = () => {
  canvas = document.createElement('canvas');
  document.getElementsByTagName('body')[0].appendChild(canvas);
  c = canvas.getContext('2d');
};

const initialize = () => {
  if (id) {
    cancelAnimationFrame(id);
  }

  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  
  ease = Ease.returnEaseFunc(gui.params.ease);
  
  shapes = new Array();
  scale = gui.params.size;
  num = gui.params.number;
  maxDist = 0;
  
  size = Math.floor(scale * Math.sqrt(2) / 2);
  
  shapes = getSquareGrid(num);
  
  draw(0);
};

const getSquareGrid = (num) => {
  const vectors = new Array();
  
  for (let x = -num; x <= num; x++) {
    for (let y = -num; y <= num; y++) {
      vectors.push([x, y]);
    }
  }
  
  const tmp = new Array();
  
  for (let i = 0; i < vectors.length; i++) {
    const params = {};
    const x = vectors[i][0] * scale;
    const y = vectors[i][1] * scale;
    const d = Math.sqrt(x * x + y * y);
    
    params.x = x;
    params.y = y;
    params.d = d;
    
    maxDist = Math.max(d, maxDist);
    
    tmp.push(params);
  }
  
  return tmp;
};

const drawPolygon = (x, y, num, size, fillStyle, strokeStyle) => {
  c.save();
  c.translate(x, y);
  c.rotate(Math.PI / 4);
  c.translate(-x, -y);
  c.fillStyle = fillStyle;
  c.strokeStyle = strokeStyle;
  c.beginPath();
  for (let i = 0; i < num; i++) {
    const nx = Math.cos(i / num * Math.PI * 2) * size + x;
    const ny = Math.sin(i / num * Math.PI * 2) * size + y;
    
    if (i === 0) {
      c.moveTo(nx, ny);
    } else {
      c.lineTo(nx, ny);
    }
  }
  c.closePath();
  c.fill();
  //c.stroke();
  
  c.restore();
};

const draw = (t) => {
  t *= gui.params.timeScale;
  
  c.save();
  
  c.clearRect(0, 0, width, height);
  c.translate(width / 2, height / 2);
  c.globalCompositeOperation = 'xor';
  
  for (let i = 0; i < shapes.length; i++) {
    let scaledT = (t - (shapes[i].d / maxDist)) % 1;
    scaledT = ease(Math.abs(scaledT));
    c.save();
    
    let ga = 1;
    
    c.translate(shapes[i].x, shapes[i].y);
    if (scaledT < 0.1) {
      c.scale(Utils.map(scaledT, 0, 0.1, 0, 1), Utils.map(scaledT, 0, 0.1, 0, 1));
    } else if (scaledT >= 0.1 && scaledT < 0.2) {
      //c.rotate(Utils.map(scaledT, 0.1, 0.2, 0, Math.PI * 2 / 3));
      c.scale(Utils.map(scaledT, 0.1, 0.2, 1, 1), Utils.map(scaledT, 0.1, 0.2, 1, 1));
    } else if (scaledT >= 0.2 && scaledT < 0.3) {
      c.scale(Utils.map(scaledT, 0.2, 0.3, 1, 1), Utils.map(scaledT, 0.2, 0.3, 1, 1));
    } else if (scaledT >= 0.3 && scaledT < 0.4) {
      c.scale(Utils.map(scaledT, 0.3, 0.4, 1, 2), Utils.map(scaledT, 0.3, 0.4, 1, 2));
    } else if (scaledT >= 0.4 && scaledT < 0.8) {
      c.scale(Utils.map(scaledT, 0.3, 0.4, 2, 2), Utils.map(scaledT, 0.3, 0.4, 2, 2));
    } else {
      ga = Utils.map(scaledT, 0.8, 1.0, 1, 0);
      c.rotate(Utils.map(scaledT, 0.8, 1.0, 0, Math.PI / 2));
      c.scale(Utils.map(scaledT, 0.8, 1.0, 2, 0), Utils.map(scaledT, 0.8, 1.0, 2, 0));
    }
    c.translate(-shapes[i].x, -shapes[i].y);
    
    drawPolygon(shapes[i].x, shapes[i].y, 4, size, 'black', 'black');
    
    c.restore();
  }
  
  c.restore();
  
  id = requestAnimationFrame(draw);
};

const start = () => {
  initialize();
};

const stop = () => {
  if (id) {
    cancelAnimationFrame(id);
    id = null;
  }
};

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    console.clear();

    setupGui();
    setupCanvas();
    
    initialize();
  });

  window.addEventListener('resize', () => {
    initialize();
  });
})();