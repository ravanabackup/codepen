let gui, canvas, c, width, height, id, shapes, size, num, maxDist;

const setupGui = () => {
  gui = new dat.GUI();
  
  gui.params = {
    timeScale: 0.0002,
    number: 10,
    size: 40,
    reset: () => initialize()
  };

  gui.ctrls = {
    timeScale: gui.add(gui.params, 'timeScale', 0.0002, 0.005, 0.0001),
    number: gui.add(gui.params, 'number', 1, 30)
      .onChange(() => initialize()),
    size: gui.add(gui.params, 'size', 1, 500, 1)
      .onChange(() => initialize()),
    reset: gui.add(gui.params, 'reset')
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
  
  shapes = new Array();
  size = gui.params.size;
  num = gui.params.number;
  maxDist = 0;
  
  const ajust = num * size / 2 - size / 2;
  
  for (let y = 0; y < num; y++) {
    for (let x = 0; x < num; x++) {
      const params = {};
      const ny = size * y - ajust;
      const nx = size * x - ajust;
      const dist = Math.sqrt(nx * nx + ny * ny);
      const scale = Math.random() * 5;
      const index = y;
      const rand = Math.random();
      
      params.x = nx;
      params.y = ny;
      params.d = dist;
      params.s = scale;
      params.i = y;
      params.r = rand;
      
      maxDist = Math.max(dist, maxDist);
      
      shapes.push(params);
    }
  }
  
  draw(0);
};

// Referred to https://easings.net/ Thank you so much.
const ease = (x) => {
  const c5 = (2 * Math.PI) / 4.5;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
};

const drawPolygon = (x, y, num, size, fillStyle, strokeStyle) => {
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
  c.stroke();
};

const draw = (t) => {
  t *= gui.params.timeScale;
  
  c.save();
  
  c.clearRect(0, 0, width, height);
  c.translate(width / 2, height / 2);
  c.globalCompositeOperation = 'lighter';
  
  for (let j = 0; j < 3; j++) {
    if (j === 0) c.fillStyle = '#FF0000';
    if (j === 1) c.fillStyle = '#00FF00';
    if (j === 2) c.fillStyle = '#0000FF';
    
    for (let i = 0; i < shapes.length; i++) {
      c.save();

      let scaledT = (t - j * 0.01 - (shapes[i].i / shapes.length)) % 1;
      scaledT = ease(Math.abs(scaledT));

      c.translate(shapes[i].x, shapes[i].y);
      let moveY;
      if (scaledT < 0.5) {
        moveY = Utils.map(scaledT, 0, 0.5, 0, 30 * shapes[i].r);
        c.scale(Utils.map(scaledT, 0, 0.5, 1, shapes[i].s), Utils.map(scaledT, 0, 0.5, 1, shapes[i].s));
      } else {
        moveY = Utils.map(scaledT, 0.5, 1.0, 30 * shapes[i].r, 0);
        c.scale(Utils.map(scaledT, 0.5, 1.0, shapes[i].s, 1), Utils.map(scaledT, 0.5, 1.0, shapes[i].s, 1));
      }
      c.translate(-shapes[i].x, -shapes[i].y);

      c.beginPath();
      c.arc(shapes[i].x, shapes[i].y + moveY, size / 4, 0, Math.PI * 2, false);
      c.fill();

      c.restore();
    }
  }
  
  c.restore();
  
  id = requestAnimationFrame(draw);
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

class Utils{
  static norm(value, min, max) {
    return (value - min) / (max - min);
  }

  static lerp(norm, min, max) {
    return (max - min) * norm + min;
  }

  static map(value, sourceMin, sourceMax, destMin, destMax) {
    return this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax);
  }

  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  static distance(x0, y0, x1, y1) {
    const dx = x1 - x0;
    const dy = y1 - y0;

    return Math.sqrt(dx * dx + dy * dy);
  }

  static randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  static randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  static randomDist(min, max, iterations) {
    let total = 0;

    for (let i = 0; i < iterations; i++) {
      total += this.randomRange(min, max);
    }

    return total / iterations;
  }

  static degreesToRads(degrees) {
    return degrees / 180 * Math.PI;
  }

  static radsToDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  static roundToPlaces(value, places) {
    const mult = Math.pow(10, places);

    return Math.round(value * mult) / mult;
  }

  static roundNearest(value, nearest) {
    return Math.round(value / nearest) * nearest;
  }
}