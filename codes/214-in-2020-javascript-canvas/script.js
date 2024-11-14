/*
* File Name / cellautomaton.js
* Created Date / Aug 25, 2020
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
  When want to use Angle and radian.
*/

class Angle {
  constructor(a) {
    this.a = a;
    this.rad = (this.a * Math.PI) / 180;
  }

  incDec(num) {
    this.a += num;
    this.rad = (this.a * Math.PI) / 180;
  }
}

/*
  variable for canvas.
*/

let canvas;

class Canvas {
  constructor(bool) {
    // create canvas.
    this.canvas = document.createElement("canvas");
    // if on screen.
    if (bool === true) {
      this.canvas.style.position = 'relative';
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
    // sprite array and quantity.
    this.cellSize = 20;
    this.cellArr = [];
    // number
    this.numX = Math.floor(this.width / this.cellSize) + 2;
    this.numY = Math.floor(this.height / this.cellSize) + 2;
  }

  init() {
    this.cellArr = [this.numY];
    
    for (let i = 0; i < this.numX; i++) {
      this.cellArr[i] = [this.numX];
    }
    
    for (let x = 0; x < this.numX; x++) {
      for (let y = 0; y < this.numY; y++) {
        const c = new Cell(this.ctx, x, y);
        this.cellArr[x][y] = c;
      }
    }

    for (let x = 0; x < this.numX; x++) {
      for (let y = 0; y < this.numY; y++) {
        let above = y - 1;
        let below = y + 1;
        let left = x - 1;
        let right = x + 1;

        if (above < 0) above = this.numY - 1;
        if (below == this.numY) below = 0;
        if (left < 0) left = this.numX - 1;
        if (right == this.numX) right = 0;

        this.cellArr[x][y].addNeighbour(this.cellArr[left][above]);
        this.cellArr[x][y].addNeighbour(this.cellArr[left][y]);
        this.cellArr[x][y].addNeighbour(this.cellArr[left][below]);
        this.cellArr[x][y].addNeighbour(this.cellArr[x][below]);
        this.cellArr[x][y].addNeighbour(this.cellArr[right][below]);
        this.cellArr[x][y].addNeighbour(this.cellArr[right][y]);
        this.cellArr[x][y].addNeighbour(this.cellArr[right][above]);
        this.cellArr[x][y].addNeighbour(this.cellArr[x][above]);

      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let x = 0; x < this.numX; x++) {
      for (let y = 0; y < this.numY; y++) {
        this.cellArr[x][y].calc();
      }
    }
    for (let x = 0; x < this.numX; x++) {
      for (let y = 0; y < this.numY; y++) {
        this.cellArr[x][y].render();
      }
    }
  }

  resize() {
    this.cellArr = [];
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.numX = Math.floor(this.width / this.cellSize) + 2;
    this.numY = Math.floor(this.height / this.cellSize) + 2;
    this.init();
  }
}

class Cell {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.init(x, y);
  }

  init(x, y) {
    this.x = x;
    this.y = y;
    this.r = canvas.cellSize / 2;
    this.c = Tool.randomColorHSL(Tool.randomNumber(0, 360), 80, 60);
    this.neighbours = [];
    Math.random() < 0.5 ? this.nextState = true : this.nextState = false;
    this.state = this.nextState;
  }

  addNeighbour(cell) {
    this.neighbours.push(cell);
  }

  calc() {
    let liveCount = 0;
    if (this.state) {
      liveCount++;
    }
    for (let i = 0; i < this.neighbours.length; i++) {
      if (this.neighbours[i].state == true) {
        liveCount++;
      }
    }

    if (liveCount <= 4) {
      this.nextState = false;
    } else if (liveCount > 4) {
      this.nextState = true;
    }
   
    if (liveCount == 4|| liveCount == 5) {
      this.nextState = !this.nextState;
    }
  }

  calci() {
    let liveCount = 0;
    
    for (let i = 0; i < this.neighbours.length; i++) {
      if (this.neighbours[i].state == true) {
        liveCount++;
      }
    }

    if (this.state == true) {
      if (liveCount == 2 || liveCount == 3) {
        this.nextState = true;
      } else {
        this.nextState = false;
      }
    } else {
      if (liveCount == 3) {
        this.nextState = true;
      } else {
        this.nextState = false;
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    this.state = this.nextState;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    if (this.state === true) {
      ctx.fillStyle = 'black';
    } else {
      ctx.fillStyle = 'white';
    }
    ctx.beginPath();
    ctx.arc(this.x * canvas.cellSize, this.y * canvas.cellSize, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }

  render() {
    this.draw();
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