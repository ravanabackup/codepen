let gui, canvas, c, width, height, id, shapes, size, num, maxDist;

const setupGui = () => {
  gui = new dat.GUI();
  
  gui.params = {
    timeScale: 0.0005,
    number: 10,
    size: 60,
    reset: () => initialize()
  };

  gui.ctrls = {
    timeScale: gui.add(gui.params, 'timeScale', 0.0005, 0.005, 0.0001),
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
  
  /*
  const ajust = num * size / 2 - size / 2;
  
  for (let y = 0; y < num; y++) {
    for (let x = 0; x < num; x++) {
      const params = {};
      const ny = size * y - ajust;
      const nx = size * x - ajust;
      const dist = Math.sqrt(nx * nx + ny * ny);
      const angle = Math.atan2(ny, nx);
      const index = y * num + x;
      
      params.x = nx;
      params.y = ny;
      params.d = dist;
      params.a = angle;
      params.i = index;
      
      maxDist = Math.max(dist, maxDist);
      
      shapes.push(params);
    }
  }
  */
  
  const ajust = num * size / 2 - size / 2;
  
  for (let x = 0; x < num; x++) {
    const params = {};
    const nx = size * x - ajust;
    const dist = Math.sqrt(nx * nx + 0 * 0);
    const angle = Math.atan2(0, nx);

    params.x = nx;
    params.y = 0;
    params.d = dist;
    params.a = angle;
    params.i = x;

    maxDist = Math.max(dist, maxDist);

    shapes.push(params);
  }
  
  //tilingCircular();
  
  draw(0);
};

const tilingCircular = () => {
  for (let i = 1; i <= 8; i++) {
    for (let j = 0; j < i * 6; j++) {
      const params = {};
      const x = Math.cos(Math.PI * 2 / (6 * i) * j) * 3 * 10 * i;
      const y = Math.sin(Math.PI * 2 / (6 * i) * j) * 3 * 10 * i;
      const d = Math.sqrt(x * x + y * y);
      const index = i * (i * 6) + j;
            
      params.x = x;
      params.y = y;
      params.d = d;
      params.i = index;

      maxDist = Math.max(d, maxDist);
      
      shapes.push(params);
    }
  }
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
  c.globalCompositeOperation = 'lighter';
  c.clearRect(0, 0, width, height);
  c.translate(width / 2, height / 2);
  
  for (let j = 0; j < 3; j++) {
    let color;
    
    if (j === 0) color = '#FF0000';
    if (j === 1) color = '#00FF00';
    if (j === 2) color = '#0000FF';
    for (let i = 0; i < shapes.length; i++) {
      c.save();
      
      let scaledT = (t - j * 0.03) % 1;
      scaledT = ease(Math.abs(scaledT));
      
      let moveY = 0;
      let moveX = 0;
      
      if (shapes[i].i % 2 === 0) {
        if (scaledT < 0.25) {
          moveX = Utils.map(scaledT, 0, 0.25, 0, size);
          moveY = Utils.map(scaledT, 0, 0.25, 0, 0);
        } else if (scaledT >= 0.25 && scaledT < 0.5) {
          moveX = Utils.map(scaledT, 0.25, 0.5, size, size);
          moveY = Utils.map(scaledT, 0.25, 0.5, 0, size);
        } else if (scaledT >= 0.5 && scaledT < 0.75) {
          moveX = Utils.map(scaledT, 0.5, 0.75, size, 0);
          moveY = Utils.map(scaledT, 0.5, 0.75, size, size);
        } else {
          moveX = Utils.map(scaledT, 0.75, 1.0, 0, 0);
          moveY = Utils.map(scaledT, 0.75, 1.0, size, 0);
        }
      } else {
        if (scaledT < 0.25) {
          moveX = Utils.map(scaledT, 0, 0.25, 0, -size);
          moveY = Utils.map(scaledT, 0, 0.25, 0, 0);
        } else if (scaledT >= 0.25 && scaledT < 0.5) {
          moveX = Utils.map(scaledT, 0.25, 0.5, -size, -size);
          moveY = Utils.map(scaledT, 0.25, 0.5, 0, -size);
        } else if (scaledT >= 0.5 && scaledT < 0.75) {
          moveX = Utils.map(scaledT, 0.5, 0.75, -size, 0);
          moveY = Utils.map(scaledT, 0.5, 0.75, -size, -size);
        } else {
          moveX = Utils.map(scaledT, 0.75, 1.0, 0, 0);
          moveY = Utils.map(scaledT, 0.75, 1.0, -size, 0);
        }
      }
      
      c.fillStyle = color;
      c.beginPath();
      c.arc(shapes[i].x + moveX, shapes[i].y + moveY, size / 3, 0, Math.PI * 2, false);
      c.fill();
      
      //drawPolygon(shapes[i].x, shapes[i].y, 4, size / 2, color, color);

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