/*
* File Name / utils.js
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

class Utils {
  // random number.
  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // random color rgb.
  static randomColorRGB() {
    return (
      "rgb(" +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ")"
    );
  }
  // random color hsl.
  static randomColorHSL(hue, saturation, lightness) {
    return (
      "hsl(" +
      hue +
      ", " +
      saturation +
      "%, " +
      lightness +
      "%)"
    );
  }
  // gradient color.
  static gradientColor(ctx, cr, cg, cb, ca, x, y, r) {
    const col = cr + "," + cg + "," + cb;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(" + col + ", " + (ca * 1) + ")");
    g.addColorStop(0.5, "rgba(" + col + ", " + (ca * 0.5) + ")");
    g.addColorStop(1, "rgba(" + col + ", " + (ca * 0) + ")");
    return g;
  }
  // framerate
  static calcFPS() {
    const now = (+new Date());
    const fps = 1000 / (now - lastTime);
    lastTime = now;
    return fps.toFixed();
  }
}

/*
* File Name / vector2d.js
* Referenced / O'Reilly Programming HTML5 Canvas
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

class Vector2d {
  constructor(x, y) {
    this.vx = x;
    this.vy = y;
  }

  scale(scale) {
    this.vx *= scale;
    this.vy *= scale;
  }

  add(vec2) {
    this.vx += vec2.vx;
    this.vy += vec2.vy
  }

  sub(vec2) {
    this.vx -= vec2.vx;
    this.vy -= vec2.vy;
  }

  negate() {
    this.vx = -this.vx;
    this.vy = -this.vy;
  }

  length() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  lengthSquared() {
    return this.vx * this.vx + this.vy * this.vy;
  }

  normalize() {
    let len = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (len) {
      this.vx /= len;
      this.vy /= len;
    }
    return len;
  }

  rotate(angle) {
    let vx = this.vx;
    let vy = this.vy;
    let cosVal = Math.cos(angle);
    let sinVal = Math.sin(angle);
    this.vx = vx * cosVal - vy * sinVal;
    this.vy = vx * sinVal + vy * cosVal;
  }

  toString() {
    return '(' + this.vx.toFixed(3) + ',' + this.vy.toFixed(3) + ')';
  }
}

/*
* File Name / collision.js
* Referenced / O'Reilly Programming HTML5 Canvas
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

class Collision {
  constructor(targetArr) {
    this.arr = targetArr;
  }

  collideAll() {
    let vec = new Vector2d(0, 0);
    let dist;
    let obj1;
    let obj2;
    let c;
    let i;
    for (c = 0; c < this.arr.length; c++) {
      obj1 = this.arr[c];
      for (i = c + 1; i < this.arr.length; i++) {
        obj2 = this.arr[i];
        vec.vx = obj2.x - obj1.x;
        vec.vy = obj2.y - obj1.y;
        dist = vec.length();
        if (dist < obj1.r + obj2.r) {
          vec.normalize();
          vec.scale(obj1.r + obj2.r - dist);
          vec.negate();
          obj1.x += vec.vx;
          obj1.y += vec.vy;
          this.bounce(obj1, obj2);
        }
      }
    }
  }

  bounce(obj1, obj2) {
    let colnAngle = Math.atan2(obj1.y - obj2.y, obj1.x - obj2.x);
    let length1 = obj1.v.length();
    let length2 = obj2.v.length();
    let dirAngle1 = Math.atan2(obj1.v.vy, obj1.v.vx);
    let dirAngle2 = Math.atan2(obj2.v.vy, obj2.v.vx);
    let newVX1 = length1 * Math.cos(dirAngle1 - colnAngle);
    let newVX2 = length2 * Math.cos(dirAngle2 - colnAngle);
    obj1.v.vy = length1 * Math.sin(dirAngle1 - colnAngle);
    obj2.v.vy = length2 * Math.sin(dirAngle2 - colnAngle);
    obj1.v.vx = ((obj1.r - obj2.r) * newVX1 + (2 * obj2.r) * newVX2) / (obj1.r + obj2.r);
    obj2.v.vx = ((obj2.r - obj1.r) * newVX2 + (2 * obj1.r) * newVX1) / (obj1.r + obj2.r);
    obj1.v.rotate(colnAngle);
    obj2.v.rotate(colnAngle);
  }
}

/*
* File Name / stopwatch.js
* Referenced / O'Reilly Programming HTML5 Canvas
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

class Stopwatch {
  constructor(time) {
    this.startTime = 0;
    this.running = false;
    this.elapsed = undefined;
  }

  start() {
    this.startTime = +new Date();
    this.elapsedTime = null;
    this.running = true;
  }

  stop() {
    this.elapsed = (+new Date()) - this.startTime;
    this.running = false;
  }

  getElapsedTime() {
    if (this.running) {
      return (+new Date()) - this.startTime;
    } else {
      return this.elapsed;
    }
  }

  isRunning() {
    return this.running;
  }

  reset() {
    this.elapsed = 0;
  }
}

/*
* File Name / animationTimer.js
* Referenced / O'Reilly Programming HTML5 Canvas
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

class AnimationTimer {
  constructor(duration, timeWarp) {
    if (duration !== undefined) this.duration = duration;
    if (timeWarp !== undefined) this.timeWarp = timeWarp;
    this.stopwatch = new Stopwatch();
  }

  start() {
    this.stopwatch.start();
  }

  stop() {
    this.stopwatch.stop();
  }

  getElapsedTime() {
    const elapsedTime = this.stopwatch.getElapsedTime();
    const percentComplete = elapsedTime / this.duration;
    if (!this.stopwatch.running) return undefined;
    if (this.timeWarp === undefined) return elapsedTime;
    return elapsedTime * (this.timeWarp(percentComplete) / percentComplete);
  }

  isRunning() {
    return this.stopwatch.running;
  }

  isOver() {
    return this.stopwatch.getElapsedTime() > this.duration;
  }

  makeEaseIn(strength) {
    return function(percentComplete) {
      return Math.pow(percentComplete, strength * 2);
    }
  }

  makeEaseOut(strength) {
    return function(percentComplete) {
      return 1 - Math.pow(1 - percentComplete, strength * 2);
    }
  }

  makeEaseInOut() {
    return function(percentComplete) {
      return percentComplete - Math.sin(percentComplete * 2 * Math.PI) / (2 * Math.PI);
    }
  }

  makeElastic(passes) {
    passes = passes || default_elastic_passes;
    return function(percentComplete) {
      return ((1 - Math.cos(percentComplete * Math.PI * passes)) * (1 - percentComplete)) + percentComplete;
    }
  }

  makeBounce(bounces) {
    const fn = this.makeElastic(bounces);
    return function(percentComplete) {
      percentComplete = fn(percentComplete);
      return percentComplete <= 1 ? percentComplete : 2 - percentComplete;
    }
  }

  makeLinear() {
    return function(percentComplete) {
      return percentComplete;
    }
  }
}

/*
* File Name / angle.js
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

class Angle {
  constructor(angle) {
    this.a = angle;
    this.rad = this.a * Math.PI / 180;
  }

  incDec(num) {
    this.a += num;
    this.rad = this.a * Math.PI / 180;
    return this.rad;
  }
}

/*
* File Name / template.js
* Created Date / xx xx, xxxx
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

//global access
let canvas;
// framerate number
let lastTime = 0;
// simplex noise
const simplex = new SimplexNoise();

/*
* Canvas class
*/

class Canvas {
  constructor(bool) {
    // create canvas.
    this.canvas = document.createElement("canvas");
    // if on screen.
    if (bool === true) {
      this.canvas.style.position = 'relative';
      this.canvas.style.display = 'block';
      this.canvas.style.backgroundColor = 'black';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      document.getElementsByTagName("body")[0].appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    // mouse infomation.
    this.mouseX = null;
    this.mouseY = null;
    this.mouseZ = null;
    // shape
    this.number_of_shapes = 5;
    this.shapes_array = [];
  }
  
  // init, render, resize
  init() {
    for (let i = 0; i < this.number_of_shapes; i++) {
      const f = new FractalRoot(this.ctx, this.width / 2, this.height / 2, i);
      this.shapes_array.push(f);
    }
  }

  render() {
    if (Math.random() < 0.001) this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.shapes_array.length; i++) {
      this.shapes_array[i].drawShape();
    }
    //this.drawFPS();
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  drawFPS() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(Utils.calcFPS() + ' FPS', this.width, this.height);
    ctx.restore();
  }
  
  resize() {
    this.shapes_array = [];
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.init();
  }
}

/*
* point object
*/

class PointObj {
  constructor(ex, ey) {
    this.x = ex;
    this.y = ey;
  }
}

/*
* Fractal root
*/

class FractalRoot {
  constructor(ctx, x, y, i) {
    this.random = Math.random();
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.i = i;
    this.a = 0;
    this.r = 100;
    this.ri = this.r;
    this.maxLevels = 4;
    this.structFactor = null;
    this.rootBranch = null;
    this.numSlides = 5;
    this.pointArr = new Array(this.numSlides);
    this.angleStep = 360 / this.numSlides;
    this.init();
  }
  
  init(time, noise) {
    let count = 0;
    for (let i = 0; i < 360; i += this.angleStep) {
      let x = this.x + (this.r * Math.cos((this.a + i) * Math.PI / 180));
      let y = this.y + (this.r * Math.sin((this.a + i) * Math.PI / 180));
      this.pointArr[count] = new PointObj(x, y);
      count++;
    }
    this.rootBranch = new Branch(
      this.ctx,
      0,
      0,
      this.pointArr,
      this.structFactor,
      this.maxLevels,
      time,
      noise
    );
  }
  
  drawShape() {
    const time = Date.now() / 5000 * this.random;
    const noise = simplex.noise3D(this.x, this.y, time);
    this.structFactor = Math.sin(time) * noise * 3;
    this.r = Math.sin(time) * noise * this.ri + 100;
    this.init(time, noise);
    this.rootBranch.drawMe();
    this.a += noise;
  }
}

/*
* Branch
*/

class Branch {
  constructor(ctx, lev, n, points, factor, max, time, noise) {
    this.ctx = ctx;
    this.level = lev;
    this.num = n;
    this.outerPoints = points;
    this.structFactor = factor;
    this.maxLevels = max;
    this.time = time;
    this.noise = noise;
    this.myBranches = [];
    this.midPoints = this.calcMidPoints();
    this.projPoints = this.calcStructPoints();
    if (this.level + 1 < this.maxLevels) {
      let childBranch = new Branch(
        this.ctx,
        this.level + 1,
        0,
        this.projPoints,
        this.structFactor,
        this.maxLevels,
        this.time,
        this.noise
      );
      this.myBranches.push(childBranch);
      for (let i = 0; i < this.outerPoints.length; i++) {
        let n = i - 1;
        if (n < 0) {
          n += this.outerPoints.length;
        }
        let newPoints = [
          this.projPoints[i],
          this.midPoints[i],
          this.outerPoints[i],
          this.midPoints[n],
          this.projPoints[n]
        ];
        let childBranch = new Branch(
          this.ctx,
          this.level + 1,
          i + 1,
          newPoints,
          this.structFactor,
          this.maxLevels,
          this.time,
          this.noise
        );
        this.myBranches.push(childBranch);
      }
    }
  }
  
  drawMe() {
    const ctx = this.ctx;
    ctx.save();
    ctx.lineWidth = 0.1;
    //ctx.globalCompositeOperation = 'xor';
    ctx.strokeStyle = 'hsl(' + 360 * (this.noise * 2) + ', 80% ,60%)';
    //ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(this.outerPoints[0].x,this.outerPoints[0].y);
    for (let i = 1; i < this.outerPoints.length; i++) {
      ctx.lineTo(this.outerPoints[i].x, this.outerPoints[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    for (let i = 0; i < this.myBranches.length; i++) {
      this.myBranches[i].drawMe();
    }
  }
  
  calcMidPoints() {
    let mpArray = [];
    for (let i = 0; i < this.outerPoints.length; i++) {
      let n = i + 1;
      if (n === this.outerPoints.length) {
        n = 0;
      }
      let thisMp = this.calcMidPoint(this.outerPoints[i], this.outerPoints[n]);
      mpArray[i] = thisMp;
    }
    return mpArray;
  }
  
  calcMidPoint(end1, end2) {
    let mx, my;
    if (end1.x > end2.x) {
      mx = end2.x + ((end1.x - end2.x) / 2);
    } else {
      mx = end1.x + ((end2.x - end1.x) / 2);
    }
    if (end1.y > end2.y) {
      my = end2.y + ((end1.y - end2.y) / 2);
    } else {
      my = end1.y + ((end2.y - end1.y) / 2);
    }
    return new PointObj(mx, my);
  }
  
  calcStructPoints() {
    let structArray = new Array(this.midPoints.length);
    for (let i = 0; i < this.midPoints.length; i++) {
      let n = i + 3;
      if (n >= this.midPoints.length) {
        n -= this.midPoints.length;
      }
      let thisSP = this.calcProjPoint(this.midPoints[i], this.outerPoints[n]);
      structArray[i] = thisSP;
    }
    return structArray;
  }
  
  calcProjPoint(mp, op) {
    let px, py, adj, opp;
    if (op.x > mp.x) {
      opp = op.x - mp.x;
    } else {
      opp = mp.x - op.x;
    }
    if (op.y > mp.y) {
      adj = op.y - mp.y;
    } else {
      adj = mp.y - op.y;
    }
    if (op.x > mp.x) {
      px = mp.x + (opp * this.structFactor);
    } else {
      px = mp.x - (opp * this.structFactor);
    }
    if (op.y > mp.y) {
      py = mp.y + (adj * this.structFactor);
    } else {
      py = mp.y - (adj * this.structFactor);
    }
    return new PointObj(px, py);
  }
}

/*
* run
*/

(() => {
  'use strict';
  window.addEventListener('load', () => {
    canvas = new Canvas(true);
    canvas.init();
    canvas.render();
    // event
    window.addEventListener("resize", () => {
      canvas.resize();
    }, false);
  }, false);
})();