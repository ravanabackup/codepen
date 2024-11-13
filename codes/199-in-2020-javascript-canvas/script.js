/*
* File Name / no name
* Created Date / Oct 9, 2020
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
  static randomColorHSL(saturation, lightness) {
    return (
      "hsl(" +
      this.randomNumber(0, 360) +
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

/*
  When want to use time.
*/

class Time {
  constructor(time) {
    this.startTime = time;
    this.lastTime;
    this.elapsedTime;
  }

  getElapsedTime() {
    this.lastTime = Date.now();
    this.elapsedTime = (this.startTime - this.lastTime) * -1;
    return this.elapsedTime;
  }
}

let canvas;

class Canvas {
  constructor(bool) {
    // create canvas.
    this.canvas = document.createElement("canvas");
    // if on screen.
    if (bool === true) {
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
    this.mouseZ = null;
    // circle
    this.shapes = [];
    this.size = 100;
    this.behavior = 1;
    this.clearId = [];
  }
  
  // init, render, resize
  init() {
    this.shapes = [];
    let index = 0;
    let p = Promise.resolve();
    let that = this;
    for (let y = canvas.height; y > 0; y -= that.size) {
      for (let x = 0; x < canvas.width; x += that.size) {
        p = p
        .then(function() {
          return new Promise(function(res, rej) {
            that.clearId.push(setTimeout(function() {
              const s = new Shape(that.ctx, x, y, that.size, index);
              that.shapes.push(s);
              index++;
              res();
            }, 100));
          });
        });
      }
    }
    p.then(function() {
      that.clearId.push(setTimeout(function() {
        that.behavior = null; 
        that.shapes[that.shapes.length - 1].behavior = true;
      }, 1000));
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for(let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].render();
    }
  }
  
  resize() {
    for (let i = 0; i < this.clearId.length; i++) {
      clearTimeout(this.clearId[i]);
    }
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.behavior = 1;
    this.init();
  }
}

/*
  Shape class.
*/

class Shape {
  constructor(ctx, x, y, s, i) {
    this.ctx = ctx;
    this.init(x, y, s, i);
  }

  init(x, y, s, i) {
    this.x = canvas.width / 2;
    this.xi = x;
    this.y = -100;
    this.yi = y;
    this.s = s;
    this.i = i;
    this.lw = 10;
    this.a = new Angle(0);
    this.v = {
      x: 0,
      y: 0,
      g: 10
    };
    this.behavior = false;
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    //ctx.fillStyle = 'hsl(' + this.i * 5 + ', 80%, 60%)';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = this.lw;
    if (this.behavior === true) {
      ctx.translate(this.x + this.s, this.y);
      ctx.rotate(this.a.rad);
      ctx.translate(-this.x - this.s, -this.y);
    }
    ctx.beginPath();
    ctx.fillRect(this.x, this.y - this.s, this.s, this.s);
    ctx.strokeRect(this.x, this.y - this.s, this.s, this.s);
    ctx.restore();
  }

  updatePosition() {
    this.v.x = this.xi - this.x;
    this.v.y = this.yi - this.y;
    this.v.x *= 0.1;
    this.v.y *= 0.1;
    this.x += this.v.x;
    this.y += this.v.y;
  }

  updateParams() {
    if (this.a.a < 90) {
      this.a.incDec(this.v.g);
    } else {
      this.a.a = 0;
      this.a.incDec(this.v.g);
      this.x = this.x + this.s;
    }
  }

  render() {
    this.draw();
    if (canvas.behavior === 1) this.updatePosition();
    if (this.behavior === true) {
      this.updateParams();
      if (this.x > canvas.width) {
        if (this.i === 0) {
          canvas.resize();
        } else {
          canvas.shapes[this.i - 1].behavior = true;
        }
      }
    } 
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
    window.addEventListener("resize", function() {
      canvas.resize();
    }, false);

  });
})();