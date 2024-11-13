const getRandomNumber = function (min, max) {
  
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Time class
 */
class Time {
  constructor(sketch) {
    this.sketch = sketch;
    
    this.initialize();
  }
  
  initialize() {
    const time = Date.now();

    //this.setupCanvas();
    
    this.startTime = time;
    this.lastTime = time;  
  }
  
  setupCanvas() {
    document
      .getElementsByTagName("body")[0]
      .appendChild(document.createElement("canvas"));

    this.canvas = document.getElementsByTagName('canvas')[1];
    this.ctx = this.canvas.getContext('2d');

    this.ctx.font = '16px sans-serif';
    const metrics = this.ctx.measureText('000 FPS');

    this.width = this.canvas.width = metrics.width;
    this.height = this.canvas.height = 16;

    this.canvas.style.position = 'fixed';
    this.canvas.style.zIndex = '9999';
    this.canvas.style.background = 'black';
    this.canvas.style.display = 'block';
    this.canvas.style.bottom = '0';
    this.canvas.style.right = '0';
  }
  
  calculateTime() {
    const time = Date.now();
  
    this.elapsedTime = time - this.startTime;
    this.fps = 1000 / (time - this.lastTime);
    this.lastTime = time;
  }
  
  drawFPS() {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();
    
    ctx.fillStyle = 'rgb(2, 230, 231)';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(this.fps.toFixed() + ' FPS', this.width, this.height);
    
    ctx.restore();
  }
  
  getElapsedTime() {
    
    return this.elapsedTime;
  }
}

/**
 * Dat class
 */
class Dat {
  constructor(sketch) {
    this.sketch = sketch;
  
    this.initialize();
  }
  
  initialize() {
    this.gui = new dat.GUI();
    this.parameters = this.setParameters();
    this.controller = this.setController();
    this.gui.close();
  }
  
  setParameters() {
    let parameters;
  
    parameters = {
      radius: 10,
      scale: 0.2,
      length: 40
    };

    return parameters;
  }
  
  setController() {
    let controller;
  
    controller = {
      radius: this.gui.add(this.parameters, 'radius', 1, 36, 1)
        .onChange(() => this.sketch.initialize()),
      
      scale: this.gui.add(this.parameters, 'scale', 0.01, 0.5, 0.01)
        .onChange(() => this.sketch.initialize()),
      
      length: this.gui.add(this.parameters, 'length', 10, 500, 1)
        .onChange(() => this.sketch.initialize()),
    };

    return controller;
  }
}

/**
 * vector3 class
 * If you want to function please add function.
 */
class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

/**
 * Mouse class
 */
class Mouse {
  constructor(sketch) {
    this.sketch = sketch;
    
    this.initialize();
  }
  
  initialize() {
    this.mouse = new Vector3(0, 0, 0);
    this.touchStart = new Vector3(0, 0, 0);
    this.touchMove = new Vector3(0, 0, 0);
    this.touchEnd = new Vector3(0, 0, 0);
    
    this.delta = 1;
    
    this.setupEvents();
  }
  
  setupEvents() {
    this.sketch.canvas.addEventListener('mousemove', this.onMousemove.bind(this), false);
    this.sketch.canvas.addEventListener('touchstart', this.onTouchstart.bind(this), false);
    this.sketch.canvas.addEventListener('touchmove', this.onTouchmove.bind(this), false);
    this.sketch.canvas.addEventListener('touchend', this.onTouchend.bind(this), false);
    this.sketch.canvas.addEventListener('wheel', this.onWheel.bind(this), false);
  }
  
  onMousemove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.mouse.z = 0;
  }
  
  onTouchstart(e) {
    const touch = e.targetTouches[0];
  
    this.touchStart.x = touch.pageX;
    this.touchStart.y = touch.pageY;
    this.touchStart.z = 0.0;

    this.mouse.x = (touch.pageX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(touch.pageY / window.innerHeight) * 2 + 1;
    this.mouse.z = 0;
  }
  
  onTouchmove(e) {
    const touch = e.targetTouches[0];

    this.touchMove.x = touch.pageX;
    this.touchMove.y = touch.pageY;
    this.touchMove.z = 0.0;

    this.touchEnd.x = this.touchStart.x - this.touchMove.x;
    this.touchEnd.y = this.touchStart.y - this.touchMove.y;
    this.touchEnd.z = 0.0;

    this.mouse.x = (touch.pageX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(touch.pageY / window.innerHeight) * 2 + 1;
    this.mouse.z = 0;
    
    if (this.touchMove.y < this.touchStart.y) {
      this.delta += (this.touchEnd.y - this.touchStart.y) * 0.0001;
    } else {
      this.delta -= (this.touchEnd.y - this.touchStart.y) * 0.0001;
    }
  }
  
  onTouchend(e) {
    this.touchStart.x = null;
    this.touchStart.y = null;
    this.touchStart.z = null;

    this.touchMove.x = null;
    this.touchMove.y = null;
    this.touchMove.z = null;

    this.touchEnd.x = null;
    this.touchEnd.y = null;
    this.touchEnd.z = null;
  }
  
  onWheel(e) {
    this.delta -= e.deltaY * 0.01;
  }
}

/**
 * Sketch class
 */
class Sketch {
  constructor() {
    this.setupCanvas();
    this.setupEvents();

    this.time = new Time(this);
    this.dat = new Dat(this);
    this.mouse = new Mouse(this);
  
    this.initialize();
  }
  
  setupCanvas() {
    document
      .getElementsByTagName("body")[0]
      .appendChild(document.createElement("canvas"));

    this.canvas = document.getElementsByTagName('canvas')[0];
    this.canvas.style.display = 'block';
    this.canvas.style.background = '#000';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
  }
  
  initialize() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = Math.ceil(window.innerWidth);
    this.height = this.canvas.height = Math.ceil(window.innerHeight);

    this.setupShape();

    this.draw();
  }
  
  setupShape() {
    this.num = 10;
    
    this.props = [
       1,  2,  3,	 4,	 5,	 6,	 7,	 8,	 9,	19,
      20,	10,	11,	12,	13,	14,	15,	16,	17,	18,
      21,	22,	23,	24,	25,	26,	27,	28,	29,	39,
      40,	30,	31,	32,	33,	34,	35,	36,	37,	38,
      41,	42,	43,	44,	45,	46,	47,	48,	49,	59,
      60,	50,	51,	52,	53,	54,	55,	56,	57,	58,
      61,	62,	63,	64,	65,	66,	67,	68,	69,	79,
      80,	70,	71,	72,	73,	74,	75,	76,	77,	78,
      81,	82,	83,	84,	85,	86,	87,	88,	89,	99,
       0, 90,	91,	92,	93,	94,	95,	96,	97,	98
    ];
    
    this.shapes = new Array();
    const diff =  this.num * this.dat.parameters.length / 2 - this.dat.parameters.length / 2;
    
    for (let y = 0; y < this.num; y++) {
      for (let x = 0; x < this.num; x++) {
        const i = y * this.num + x;
        const ti = this.props[i];
        
        const s =
              new Shape(
                this,
                x * this.dat.parameters.length - diff,
                y * this.dat.parameters.length - diff,
                i,
                ti
              );
        
        this.shapes.push(s);
      }
    }
  }             
  
  setupEvents() {
    window.addEventListener('resize', this.onResize.bind(this), false);
  }
  
  onResize() {
    this.initialize();
  }
  
  draw() {
    this.ctx.fillStyle = 'rgba(1.0, 1.0, 1.0, 0.08)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    this.time.calculateTime();
    //this.time.drawFPS();
    
    this.checkCompleted();
    
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].render(this.time.getElapsedTime() * 0.001);
    }
    
    this.animationId = requestAnimationFrame(this.draw.bind(this));
  }
  
  checkCompleted() {
    let j = 0;
    
    for (let i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i].complete) {
        j++;
      } else {
        
        return;
      }
    }
    
    if (j === this.shapes.length) {
      for (let k = 0; k < this.shapes.length; k++) {
        this.shapes[k].complete = false;
        this.shapes[k].x = this.shapes[k].ix;
        this.shapes[k].y = this.shapes[k].iy;
      }
    }
  }
}

/**
 * Shape class
 */
class Shape {
  constructor(sketch, x, y, i, ti) {
    this.sketch = sketch;
    
    this.x = x;
    this.y = y;
    this.ix = x;
    this.iy = y;
    
    this.index = i;
    this.targetIndex = ti;
    
    this.ctx = this.sketch.ctx;

    this.initialize();
  }
  
  initialize() {
    this.complete = false;
    this.r = this.sketch.dat.parameters.radius;
    this.scale = this.sketch.dat.parameters.scale;
  }
  
  updatePosition() {
    this.targetShape = this.sketch.shapes[this.targetIndex];
    
    this.vx = this.targetShape.ix - this.x;
    this.vy = this.targetShape.iy - this.y;
    
    this.x += this.vx * this.scale;
    this.y += this.vy * this.scale;
    
    if (Math.abs(this.vx) < 0.01 && Math.abs(this.vy) < 0.01) {
      this.complete = true;
    }
  }
  
  draw() {
    this.ctx.save();

    this.ctx.translate(this.sketch.width / 2, this.sketch.height / 2);
    this.ctx.scale(this.sketch.mouse.delta, this.sketch.mouse.delta);
    this.ctx.rotate(180 * Math.PI / 180);
    
    this.ctx.fillStyle = 'white';
    if (this.index === 90) this.ctx.globalAlpha = 0.0;
    
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  render() {
    this.draw();
    this.updatePosition();
  }
}

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    console.clear();
    
    new Sketch();
  });
})();