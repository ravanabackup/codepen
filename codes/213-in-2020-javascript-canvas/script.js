/*
* File Name / .js
* Created Date / Sep 04, 2020
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
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
    // noisy
    this.shapes = [];
    this.dist = 15;
  }
  
  // init, render, resize
  init() {
    for (let x = 0; x < this.width + this.dist; x += this.dist) {
      for (let y = 0; y < this.height + this.dist; y += this.dist) {
        const s = new Shape(this.ctx, x, y, this.dist);
        this.shapes.push(s);
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].render();
    }
  }
  
  resize() {
    this.shapes = [];
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.init();
  }
}

/*
  Shape class.
*/

class Shape {
  constructor(ctx, x, y, d) {
    this.ctx = ctx;
    this.init(x, y, d);
  }

  init(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.a = new Angle(0);
  }

  draw() {
    const ctx = this.ctx;
    const scale = 0.001;
    const noise = Math.tan(Math.pow(simplex.noise3D(this.x * scale, this.y * scale, this.a.rad), 2)) * Math.PI * 2;
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.cos(noise) * 5;
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.tan(noise));
    ctx.translate(-this.x, -this.y);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.d * 10, this.y);
    ctx.stroke();
    ctx.restore();
  }

  render() {
    this.draw();
    this.a.incDec(0.5);
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