/*
* File Name / circle.js
* Created Date / Sep 04, 2020
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
* inspired / https://codepen.io/DonKarlssonSan/pen/WzbYBr by Johan Karlsson
*/

/*
  Common Tool.
*/

class Tool {
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
}

/*
  When want to use angle.
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
  When want to use controller.
*/

class Controller {
  constructor(id) {
    this.id = document.getElementById(id);
  }
  getVal() {
    return this.id.value;
  }
}

let canvas;
const simplex = new SimplexNoise();

class Canvas {
  constructor(bool) {
    // create canvas.
    this.canvas = document.createElement("canvas");
    // if on screen.
    if (bool === true) {
      this.canvas.style.position = 'fixed';
      this.canvas.style.display = 'block';
      this.canvas.style.top = 0;
      this.canvas.style.left = 0;
      document.getElementsByTagName("body")[0].appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    // mouse infomation.
    this.mouseX = null;
    this.mouseY = null;
    // Shape
    this.shapeNum = 360;
    this.shapes = [];
  }
  
  // init, render, resize
  init() {
    for (let i = 0; i < this.shapeNum; i++) {
      let s = new Shape(this.ctx, this.width / 2, this.height / 2, i);
      this.shapes.push(s);
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].render();
    }
  }
  
  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.shapes = [];
    this.init();
  }
}

/*
  Shape class.
*/

class Shape {
  constructor(ctx, x, y, i) {
    this.ctx = ctx;
    this.init(x, y, i);
  }

  init(x, y, i) {
    this.x = x;
    this.y = y;
    this.r = i * 3;
    this.a = new Angle(0);
    this.c = 'hsl(' + i * 3 + ', 80%, 60%)';
    this.rad = Math.PI * 2 / 120;
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.c;
    ctx.globalCompositeOperation = 'lighter';
    ctx.beginPath();
    for (let i = 0; i < 120; i++) {
      // init position.
      let x = Math.cos(this.rad * i) * this.r + this.x;
      let y = Math.sin(this.rad * i) * this.r + this.y;
      const noise = simplex.noise3D(x / 500, y / 500, this.a.rad) * 100;
      // add noise.
      x = Math.cos(this.rad * i) * (this.r + noise) + this.x;
      y = Math.sin(this.rad * i) * (this.r + noise) + this.y;
      if (i === 0) ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    this.a.incDec(0.5);
  }
  
  updatePosition() {
    this.x = Math.cos(this.a.rad) + this.x;
    this.y = Math.sin(this.a.rad) + this.y;
  }

  render() {
    this.draw();
    //this.updatePosition();
  }
}

(function () {
  "use strict";
  window.addEventListener("load", function () {
    canvas = new Canvas(true);
    canvas.init();
    
    function render() {
      window.requestAnimationFrame(function () {
        canvas.render();
        render();
      });
    }
    
    render();

    // event
    window.addEventListener("resize", function () {
      canvas.resize();
    }, false);

  });
})();