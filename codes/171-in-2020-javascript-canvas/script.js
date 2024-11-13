/*
* File Name / glitchClock.js
* Created Date / Sep 03, 2020
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
    // canvas other infomation.
    this.width > this.height ? this.clockRadius = this.height / 3 : this.clockRadius = this.width / 2.5;
    this.clock;
    // noisy
    this.glitch;
  }
  
  // init, render, resize
  init() {
    this.clock = new Clock(this.ctx, this.width / 2, this.height / 2, this.clockRadius);
    this.glitch = new Glitch(this.ctx);
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.clock.render();
    //this.glitch.render();
  }
  
  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.width > this.height ? this.clockRadius = this.height / 3 : this.clockRadius = this.width / 2.5;
    this.splitY =  this.height / this.splitNum;
    this.init();
  }
}

/*
  Clock Class.
*/

class Clock {
  constructor(ctx, x, y, r) {
    this.ctx = ctx;
    this.init(x, y, r);
  }

  init(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = 'white';
  }

  drawHand(loc, isSecond, isMinute, isHour) {
    const ctx = this.ctx;
    const angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2;
    // needle length.
    let handRadius;
    if (isHour === true) handRadius = this.r * 0.6;
    if (isHour === false) handRadius = this.r * 0.9;
    // needle thick.
    let lw = 10;
    if (isSecond === true) lw = 1;
    if (isMinute === true) lw = 5;

    let lineEnd = {
      x: this.x + Math.cos(angle) * handRadius,
      y: this.y + Math.sin(angle) * handRadius
    };

    ctx.save();
    ctx.lineWidth = lw;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(lineEnd.x, lineEnd.y);
    ctx.stroke();
    ctx.restore();
  }

  drawHands() {
    const date = new Date();
    let hour = date.getHours();
    this.drawHand(date.getSeconds(), true, false, false);
    hour = hour > 12 ? hour - 12 : hour;
    this.drawHand(date.getMinutes(), false, true, false);
    this.drawHand(hour * 5 + (date.getMinutes() / 60) * 5, false, false, true);
  }

  drawClockFace() {
    const ctx = this.ctx;
    ctx.save();
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.stroke();
    if (!ctx.isPointInPath(canvas.mouseX, canvas.mouseY)) {
      canvas.glitch.render();
    }
    ctx.restore();
  }

  drawNumber(string) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 23 + 'px  sans-serif';
    const rad = Math.PI * 2 / string.length;
    for (let i = 0; i < string.length; i++) {
      const character = string[i];
      ctx.fillText(character, Math.cos(rad * i) * this.r * 0.75 + this.x, Math.sin(rad * i) * this.r * 0.75 + this.y);
    }
    ctx.restore();
  }

  drawLine() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    const rad = Math.PI * 2 / 60;
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.cos(rad * i) * this.r * 0.85 + this.x, Math.sin(rad * i) * this.r * 0.85 + this.y);
      ctx.lineTo(Math.cos(rad * i) * this.r * 0.9 + this.x, Math.sin(rad * i) * this.r * 0.9 + this.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  render() {
    this.drawNumber([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]);
    this.drawHands();
    this.drawLine();
    this.drawClockFace();
  }
}

/*
  Glitch class.
*/

class Glitch {
  constructor(ctx) {
    this.ctx = ctx;
    this.splitNum = 200;
    this.splitY =  canvas.height / this.splitNum;
    this.angles = [];
    this.anglesForRGB = [];
    this.dataArr = [];
    this.getAngles();
    this.getAnglesForRGB();
  }

  getAnglesForRGB() {
    for (let i = 0; i < 3; i++) {
      const a = Tool.randomNumber(0, 360);
      const r = a * Math.PI / 180;
      const arr = [a, r];
      this.anglesForRGB.push(arr);
    }
  }

  getAngles() {
    for (var i = 0; i < this.splitNum ; i++) {
      const angle = Tool.randomNumber(0, 360);
      const gap = Tool.randomNumber(5, 20);
      const arr = [angle, gap];
      this.angles.push(arr);
    }
  }
  
  getImageData() {
    for (let i = 0; i < this.splitNum ; i++) {
      let d = this.ctx.getImageData(0, this.splitY * i, canvas.width, this.splitY + 1);
      let data = d.data;
      for (let i = 3; i < data.length - 4; i += 4) {
        if (data[i] > 0) {
          data[i] = 255;
          data[i - 1] = Math.sin(this.anglesForRGB[0][1]) * 255;
          data[i - 2] = Math.cos(this.anglesForRGB[1][1]) * 255;
          data[i - 3] = Math.tan(this.anglesForRGB[2][1]) * 255;
        }
      }
      this.dataArr.push(d);
    }
  }

  updateAnglesForRGB() {
    for (let i = 0; i < this.anglesForRGB.length; i++) {
      this.anglesForRGB[i][1] += Tool.randomNumber(-1, 1) * Math.random();
    }
  }
  
  addImage(){
    for (let i = 0; i < this.splitNum ; i++) {
      if (Math.random() > 0.02) {
        this.ctx.putImageData(this.dataArr[i], Math.sin(this.angles[i][0] * Math.PI / 180) * this.angles[i][1], this.splitY * i);
      } else {
        this.ctx.putImageData(this.dataArr[Tool.randomNumber(0, this.splitNum - 1)], Math.sin(this.angles[i][0] * Math.PI / 180) * canvas.width, this.splitY * i);
      } 
    }
  }

  changeAngle() {
    for (var i = 0; i < this.angles.length; i++) {
      this.angles[i][0] += Tool.randomNumber(-50, 50);
    }
  }
  
  render() {
    this.dataArr = [];
    this.getImageData();
    this.changeAngle();
    this.updateAnglesForRGB();
    this.addImage();
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

    window.addEventListener('mousemove', function(e) {
      canvas.mouseX = e.clientX;
      canvas.mouseY = e.clientY;
    });

    // smartphone.
    canvas.canvas.addEventListener('touchmove', function(e) {
      const touch = e.targetTouches[0];
      canvas.mouseX = touch.pageX;
      canvas.mouseY = touch.pageY;
    }, false);

    canvas.canvas.addEventListener('touchend', function(e) {
      canvas.mouseX = null;
      canvas.mouseY = null;
    }, false);

  });
})();