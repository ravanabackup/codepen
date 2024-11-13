import {Ease}   from 'https://assets.codepen.io/3919397/ease.js';
import {Utils}  from 'https://assets.codepen.io/3919397/utilities.js';
import {Vector} from 'https://assets.codepen.io/3919397/vector.js';
import {Points} from 'https://assets.codepen.io/3919397/points.js';
import {Grid}   from 'https://assets.codepen.io/3919397/grid.js';

/**
 * @class - sketch class
 */
function Sketch() {
  this.vector = new Vector();
  this.simplex = new SimplexNoise();
  this.setupGUI();
  this.setupCanvas();
  this.setupEvents();
  
  this.initialize();
}

Sketch.prototype.setupGUI = function() {
  this.gui = new dat.GUI();
  
  let that = this;
  this.gui.params = {
    scaleToTime: 0.0001,
    ease: 'easeInOutSine',
    number: 1,
    scale: 200,
    frame: false,
    start: () => that.start(),
    stop: () => that.stop()
  };

  this.gui.ctrls = {
    scaleToTime: that.gui.add(that.gui.params, 'scaleToTime', 0.0001, 0.005, 0.0001),
    ease: that.gui.add(that.gui.params, 'ease', Ease.returnEaseType())
      .onChange(() => that.initialize()),
    number: that.gui.add(that.gui.params, 'number', 1, 30, 1)
      .onChange(() => that.initialize()),
    scale: that.gui.add(that.gui.params, 'scale', 1, 500, 1)
      .onChange(() => that.initialize()),
    frame: that.gui.add(that.gui.params, 'frame', false),
    start: that.gui.add(that.gui.params, 'start'),
    stop: that.gui.add(that.gui.params, 'stop')
  };
  
  this.gui.close();
};

Sketch.prototype.setupCanvas = function() {
  this.canvas = document.createElement('canvas');
  document.getElementsByTagName('body')[0].appendChild(this.canvas);
  this.ctx = this.canvas.getContext('2d');
  
  this.canvas.style.display = 'block';
  this.canvas.style.height = '100%';
  this.canvas.style.width = '100%';
  this.canvas.style.position = 'absolute';
  this.canvas.style.top = '0';
  this.canvas.style.left = '0';
  this.canvas.style.zIndex = '-1';
  this.canvas.style.background = '#000';
};

Sketch.prototype.setupEvents = function() {
  window.addEventListener('resize', this.onResize.bind(this));
};

Sketch.prototype.onResize = function() {
  this.initialize();
};

Sketch.prototype.start = function() {
  this.initialize();
};

Sketch.prototype.stop = function() {
  if (this.id) {
    cancelAnimationFrame(this.id);
    this.id = null;
  }
};

Sketch.prototype.addFrame = function() {
  this.ctx.rect(
    this.width / 2 - this.frameSize / 2,
    this.height / 2 - this.frameSize / 2,
    this.frameSize,
    this.frameSize
  );
  this.ctx.clip();
};

Sketch.prototype.initialize = function() {
  if (this.id) {
    cancelAnimationFrame(this.id);
    this.id = null;
  }

  this.ease = Ease.returnEaseFunc(this.gui.params.ease);
  this.simplex = new SimplexNoise();
  this.width = this.canvas.width = Math.floor(window.innerWidth * 0.5);
  this.height = this.canvas.height = Math.floor(window.innerHeight * 0.5);
  this.frameSize = Math.min(this.width * 0.9, this.height * 0.9);
  this.scale = this.gui.params.scale;
  this.number = this.gui.params.number;
  
  this.setupShapes();
  
  this.glitch = new Glitch(this.ctx, this.width, this.height, 10, 30);
  
  this.draw(0);
};

Sketch.prototype.setupShapes = function() {
  // choise shape size
  //this.size = Math.floor(this.scale * Math.sqrt(2) / 2);
  this.size = Math.floor(this.scale / 2); // square
  //this.size = Math.floor(Math.sqrt(3) * this.scale / 2 / 2); // hex
  //this.size = Math.floor(this.scale * 0.4 * 2 * Math.PI / this.number / 2); // circle
  
  // choise shape pattern
  this.pointsA = Points.rose(this.vector, 36, 6, 1, 1);
  this.pointsB = Points.rose(this.vector, 36, 12, 3, 3);
  
  // choise grid or ...
  //this.shapes = Grid.square(this.vector, this.number, this.scale);
  
  let shape = {
    v: this.vector.create(0, 0),
    d: 1
  };
  
  this.shapes = [shape, shape, shape];
  
  // calculate max distance 
  this.maxDist = Grid.maxDist(this.shapes);
};

Sketch.prototype.draw = function(t) {
  t *= this.gui.params.scaleToTime;
  this.ctx.save();
  if (this.gui.params.frame) this.addFrame();
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.translate(this.width / 2, this.height / 2);
  this.ctx.globalCompositeOperation = 'lighter';
  
  for (let i = 0; i < this.shapes.length; i++) {
    if (i === 0) this.ctx.fillStyle = '#FF0000';
    if (i === 1) this.ctx.fillStyle = '#00FF00';
    if (i === 2) this.ctx.fillStyle = '#0000FF';
    
    let x = this.shapes[i].v.getX();
    let y = this.shapes[i].v.getY();
    
    let st = (t - (i * 0.005)) % 1;
    st = this.ease(st);
    
    this.ctx.save();
    
    this.ctx.translate(x, y);
    if (st < 0.5) {
      this.ctx.scale(Utils.map(st, 0, 0.5, 1, 2), Utils.map(st, 0, 0.5, 1, 2));
    } else {
      this.ctx.rotate(Utils.map(st, 0.5, 1, 0, Math.PI / 2));
      this.ctx.scale(Utils.map(st, 0.5, 1, 2, 1), Utils.map(st, 0.5, 1, 2, 1));
    }
    this.ctx.translate(-x, -y);
    
    let newPoints = this.getNewPoints(st, this.pointsA, this.pointsB);
    
    this.drawShape(this.ctx, newPoints, x, y, this.size);
    
    this.ctx.restore();
  }
  
  this.glitch.render(t);
  
  this.ctx.restore();
  this.id = requestAnimationFrame(this.draw.bind(this));
};

Sketch.prototype.drawShape = function(ctx, points, x, y, size) {
  ctx.save();
  
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    
    if (i === 0) {
      this.ctx.moveTo(p.getX() * this.size + x, p.getY() * this.size + y);
    } else {
      this.ctx.lineTo(p.getX() * this.size + x, p.getY() * this.size + y);
    }
  }
  ctx.closePath();
  ctx.fill();
  //c.stroke();
  
  ctx.restore();
};

Sketch.prototype.drawPoints = function(ctx, points, x, y, size, pointSize) {
  ctx.save();
  
  for (let i = 0; i < points.length; i++) {
    let nx = points[i].getX() * size + x;
    let ny = points[i].getY() * size + y;
    
    ctx.beginPath();
    ctx.arc(nx, ny, pointSize, 0, Math.PI * 2, false);
    ctx.fill();
    //c.stroke();
  }
  
  ctx.restore();
};

Sketch.prototype.drawTrailLine = function(ctx, points, t, size) {
  let index = Math.floor(Utils.map(t, 0, 1, 0, points.length - 1));
  let endex = Math.ceil(Utils.map(t, 0, 1, index + 1, points.length - 1));
  
  //let color = `hsl(${360 * t}, 80%, 60%)`;
  let color = 'black';
  
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;

  ctx.beginPath();
  ctx.moveTo(points[index].getX() * size, points[index].getY() * size);
  for (let i = index; i < endex; i++) {
    let p = points[i];
    
    ctx.lineTo(p.getX() * size, p.getY() * size);
  }
  ctx.stroke();    
};

Sketch.prototype.getNewPoints = function(t, pointA, pointB) {
  let newPointArray = [];
  
  for (let i = 0; i < pointA.length; i++) {
    let aP = pointA[i];
    let bP = pointB[i];
    
    let x, y;
    if (t < 0.5) {
      x = Utils.map(t, 0, 0.5, aP.getX(), bP.getX());
      y = Utils.map(t, 0, 0.5, aP.getY(), bP.getY());
    } else {
      x = Utils.map(t, 0.5, 1, bP.getX(), aP.getX());
      y = Utils.map(t, 0.5, 1, bP.getY(), aP.getY());
    }
    
    let v = this.vector.create(x, y);

    newPointArray.push(v);
  }

  return newPointArray;
};

(function() {
  window.addEventListener('load', function() {
    console.clear();
    new Sketch();
  });
})();

function Glitch(ctx, width, height, min, max) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.min = min;
  this.max = max;
  this.imageArr = [];
  this.heightArr = [];
}

/**
 * @params {number} t - time
 */
Glitch.prototype.getImageData = function(t) {
  let preHeight = 0;
  let addHeight = 0;
  for (let i = 0; i < this.height; i += addHeight) {
    addHeight = Math.floor((this.max - this.min) * Math.random() + this.min);
    
    let image = this.ctx.getImageData(0, preHeight, this.width, preHeight + addHeight);
    
    this.dataArr.push(image);
    this.heightArr.push(preHeight);
    
    preHeight += addHeight
  }
};

/**
 * @params {number} t - time
 */
Glitch.prototype.addImage = function(t) {
  for (let i = 0; i < this.dataArr.length ; i++) {
    if (Math.random() > 0.005) {
      this.ctx.putImageData(
        this.dataArr[i],
        Math.sin(this.heightArr[i] * 0.1 + t) * 3 * Math.random(),
        this.heightArr[i]
      );
    } else {
      this.ctx.putImageData(
        this.dataArr[Math.floor(this.dataArr.length * Math.random())],
        this.width * Math.random() - this.width / 2,
        this.heightArr[i]
      );
    }
  }
};

/**
 * @params {number} t - time
 */
Glitch.prototype.render = function(t) {
  this.dataArr = [];
  this.heightArr = [];
  this.getImageData(t);
  this.addImage(t);
};