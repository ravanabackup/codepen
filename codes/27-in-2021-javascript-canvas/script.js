/*
* File Name / utils.js
* Author / Toshiya Marukubo
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
   // create multiple array
  static createMultipleArray(number_one, number_two) {
    let num_one = number_one;
    let num_two = number_two;
    let arr = new Array(num_one);
    for (let i = 0; i < num_one; i++) {
      arr[i] = new Array(num_one);
      for (let j = 0; j < num_two; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
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
* File Name / template.js
* Created Date / xx xx, xxxx
* Author / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

//global access
let canvas;
// framerate number
let lastTime = 0;

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
    this.number_of_shapes = 1;
    this.shapes_array = [];
  }
  
  // init, render, resize
  init() {
    for (let i = 0; i < this.number_of_shapes; i++) {
      const s = new Shape(this.ctx, this.width, this.height, i);
      this.shapes_array.push(s);
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.shapes_array.length; i++) {
      this.shapes_array[i].render();
    }
    this.drawFPS();
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
* Shape class.
*/

class Shape {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.init(x, y);
  }

  init(w, h) {
    this.w = w;
    this.h = h;
    this.i = this.ctx.createImageData(this.w, this.h);
    this.c = 0;
    this.d = 0;
    this.mod = 8;
  }

  draw() {
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const a = 4 / this.w * x - 2;
        const b = 4 / this.h * y - 2;
        this.getColor(this.i, x, y, a, b, this.c, this.d);
      }
    }
    this.ctx.putImageData(this.i, 0, 0);
  }
  
  getColor(i, x, y, a, b, c, d) {
    const ind = (y * this.w + x) * 4;
    const na = a * a - b * b + c;
    const nb = 2 * a * b * d;
    const z = Math.floor(na * na + nb * nb);
    this.i.data[ind] = 0xff;
    this.i.data[ind + 1] = 0xff;
    this.i.data[ind + 2] = 0xff;
    if (z % this.mod === 0) {
      this.i.data[ind + 3] = 0xff;
    } else {
      this.i.data[ind + 3] = 0x00;
    }
  }
  
  updateParams() {
    this.c = Math.sin(Date.now() / 10000) * 10;
    this.d = -Math.sin(Date.now() / 10000) * 10;
  }

  render() {
    this.draw();
    this.updateParams();
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