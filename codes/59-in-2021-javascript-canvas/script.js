/**
 * create multiple array
 */

function createMultipleArray(number_one, number_two) {
  var num_one = number_one;
  var num_two = number_two;
  var arr = new Array(num_one);
  for (var y = 0; y < num_one; y++) {
    arr[y] = new Array(num_one);
    for (var x = 0; x < num_two; x++) {
      arr[y][x] = 0;
    }
  }
  return arr;
}

/**
 * get random number
 */

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

/**
 * File Name / pixcelDataMap.js (prototype version)
 * Created Date / Jan 18, 2021
 * Aurhor / Toshiya Marukubo
 * Twitter / https://twitter.com/toshiyamarukubo
 */

function PixcelDataMap(ctx, x, y) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.mod = 50;
  this.state = createMultipleArray(this.y, this.x);
  this.lastState = createMultipleArray(this.y, this.x);
  this.d = this.ctx.createImageData(this.x, this.y);
  this.setup();
}

PixcelDataMap.prototype.updateImageData = function() {
  for (var y = 0; y < this.y; y++) {
    for (var x = 0; x < this.x; x++) {
      var i = y * this.x + x;
      this.d.data[4 * i + 0] = 0x00;
      this.d.data[4 * i + 1] = 0x00;
      this.d.data[4 * i + 2] = 0x00;
      this.d.data[4 * i + 3] = i % this.mod === 0 ? this.state[y][x] : 0xff;
    }
  }
  this.mod = Math.floor(Math.sin(Date.now() / 1000) * 50);
  if (Math.random() < 0.1) this.mod = Math.floor(50 * Math.random());
};

PixcelDataMap.prototype.setup = function() {
  for (var y = 0; y < this.y; y++) {
    for (var x = 0; x < this.x; x++) {
      var i = y * this.x + x;
      if (y === this.y / 2 && x === this.x / 2) {
        this.state[y][x] = Math.floor(Math.random() * 256);
      }
    }
  }
};

PixcelDataMap.prototype.drawImageData = function() {
  this.ctx.putImageData(this.d, 0, 0);
};

PixcelDataMap.prototype.updateState = function() {
  var array = createMultipleArray(this.y, this.x);
  
  for (var y = 0; y < this.y; y++) {
    for (var x = 0; x < this.x; x++) {
      var total = 0;
      var above = y - 1;
      var below = y + 1;
      var left = x - 1;
      var right = x + 1;
      
      if (above < 0) above = this.y - 1;
      if (below == this.y) below = 0;
      if (left < 0) left = this.x - 1;
      if (right == this.x) right = 0;
      
      var t = this.state[above][x]; // top
      var r = this.state[y][right]; // right
      var b = this.state[below][x]; // bottom
      var l = this.state[y][left]; // left
      var tl = this.state[above][left]; // top left
      var bl = this.state[below][left]; // bottom left
      var br = this.state[below][right]; // bottom right
      var tr = this.state[above][right]; // top right
      
      total = t + r + b + l + tl + bl + br + tr;
      
      var average = Math.floor(total / 8);
      var nextStateNum;
      
      if (average == 255) {
        nextStateNum = 0;
      } else if (average == 0) {
        nextStateNum = 255;
      } else {
        nextStateNum = this.state[y][x] + average;
        if (this.lastState[y][x] > 0) {
          nextStateNum =  nextStateNum - this.lastState[y][x];
        }
        if (nextStateNum > 255) {
          nextStateNum = 255;
        } else if (nextStateNum < 0) {
          nextStateNum = 0;
        }
      }
      array[y][x] = nextStateNum;
    }
  }
  this.lastState = this.state;
  this.state = array;
};

PixcelDataMap.prototype.render = function() {
  this.drawImageData();
  this.updateImageData();
  this.updateState();
};

/**
 * Glitch
 */

function Glitch(ctx, width, height) {
  this.time;
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.splitH = this.height / this.splitNum;
  this.dataArr = [];
  this.yPosArr = [];
}

Glitch.prototype.getImageData = function () {
  var startHeight = 0;
  for (var i = 0; i < this.height; i += randomHeight) {
    var rand = Math.random();
    var randomHeight = Math.floor(getRandomNumber(1, 50));
    var d = this.ctx.getImageData(0, startHeight, this.width, startHeight + randomHeight);
    if (rand < 0.05) {
      for (var j = 0; j < d.data.length; j++) {
        d.data[j * 4 + 0] = Math.floor(getRandomNumber(0, 60));
        d.data[j * 4 + 1] = Math.floor(getRandomNumber(150, 200));
        d.data[j * 4 + 2] = Math.floor(getRandomNumber(150, 200));
        d.data[j * 4 + 3] = 100;
      }
    }
    if (rand > 0.05 && rand < 0.1) {
      for (var j = 0; j < d.data.length; j++) {
        d.data[j * 4 + 0] = Math.floor(getRandomNumber(200, 255));
        d.data[j * 4 + 1] = Math.floor(getRandomNumber(0, 20));
        d.data[j * 4 + 2] = Math.floor(getRandomNumber(0, 100));
        d.data[j * 4 + 3] = 100;
      }
    }
    startHeight += randomHeight;
    this.dataArr.push(d);
    this.yPosArr.push(startHeight);
  }
};

Glitch.prototype.addImage = function () {
  for (var i = 0; i < this.dataArr.length; i++) {
    if (Math.random() < 0.9) {
      this.ctx.putImageData(
        this.dataArr[i],
        Math.sin(this.time * 1 + i * 10 * Math.PI / 180) * 10,
        this.yPosArr[i]
      );
    } else {
      this.ctx.putImageData(
        this.dataArr[getRandomNumber(0, this.dataArr.length - 1)],
        this.width * Math.random(),
        this.yPosArr[i]
      );
    }
  }
};

Glitch.prototype.render = function () {
  this.time = Date.now() / 100;
  this.dataArr = [];
  this.yPosArr = [];
  this.getImageData();
  this.addImage();
};

(function() {
  'use strict';
  window.addEventListener('load', function() {
    var canvas = document.getElementById('canvas');
    if (!canvas || !canvas.getContext) return false;
    var c = canvas.getContext('2d');
    var x = canvas.width = 300;
    var y = canvas.height = 300;

    var p = new PixcelDataMap(c, x, y);
    //var g = new Glitch(c, x, y);

    function render() {
      c.clearRect(0, 0, x, y);
      p.render();
      //if (Math.random() < 0.1) g.render();
      window.requestAnimationFrame(render);
    }
    
    render();
  }, false);
})();