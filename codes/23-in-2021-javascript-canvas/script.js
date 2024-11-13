/*
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

/*
* File Name / pixcelDataMap.js (prototype version)
* Created Date / Jan 18, 2021
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

function PixcelDataMap(ctx, x, y) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.mod = 3;
  this.state = createMultipleArray(this.y, this.x);
  this.lastState = createMultipleArray(this.y, this.x);
  this.d = this.ctx.createImageData(this.x, this.y);
  this.setup();
}

PixcelDataMap.prototype.updateImageData = function() {
  for (var y = 0; y < this.y; y++) {
    for (var x = 0; x < this.x; x++) {
      var i = y * this.x + x;
      this.d.data[4 * i + 0] = this.state[y][x] * 2;
      this.d.data[4 * i + 1] = this.state[y][x] * Math.random();
      this.d.data[4 * i + 2] = this.state[y][x] * Math.random();
      this.d.data[4 * i + 3] = this.state[y][x] * 2;
    }
  }
};

PixcelDataMap.prototype.setup = function() {
  for (var y = 0; y < this.y; y++) {
    for (var x = 0; x < this.x; x++) {
      var total = 0;
      var average = 0;
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
      
      if (y === 0) {
        this.state[y][x] = Math.floor(Math.random() * 256);
      }
      
      if (y === 1) {
        total = tl + tr + t;
        average = Math.floor(total / 3);
        this.state[y][x] = average;
      }
      
      if (y > 1) {
        var tt = this.state[y - 2][x];
        total = tl + tr + t + tt;
        average = Math.floor(total / 4);
        this.state[y][x] = average;
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
      var average = 0;
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
      
      if (y === 0) {
        array[y][x] = Math.floor(Math.random() * 256);
      }
      
      if (y === 1) {
        total = tl + tr + t;
        average = Math.floor(total / 3);
        array[y][x] = average;
      }
      
      if (y > 1) {
        var tt = this.state[y - 2][x];
        total = tl + tr + t + tt;
        average = Math.floor(total / 4);
        array[y][x] = average;
      }
      
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

(function() {
  'use strict';
  window.addEventListener('load', function() {
    var canvas = document.getElementById('canvas');
    if (!canvas || !canvas.getContext) return false;
    var c = canvas.getContext('2d');
    var x = canvas.width = 500;
    var y = canvas.height = 100;

    var p = new PixcelDataMap(c, x, y);

    function render() {
      c.clearRect(0, 0, x, y);
      p.render();
      window.requestAnimationFrame(render);
    }
    
    render();
    /*
    setInterval(function() {
      c.clearRect(0, 0, x, y);
      p.render();
    }, 40);
    */
  }, false);
})();