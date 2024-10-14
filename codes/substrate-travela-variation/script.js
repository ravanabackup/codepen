var width, height
var step = 0;
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')
var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
var bg = [256, 256, 256]

document.getElementsByTagName('body')[0].appendChild(canvas)


ctrl = {
  chanceToSplit: 0.50,
  num: 10,
  max: 200,
  // alpha: 1,
  fade: 0.0,
  draw: true,
  clear: function () { removeTravelers(), clear(ctx) },
  numAngles: 6,
  angleOffset: 1/6,
  speed: 3,
}

var angles = []
function updateAngles() {
  angles = []
  for (var i = 0; i < ctrl.numAngles; i++) {
    angles.push(Math.PI * 2 / ctrl.numAngles * i - Math.PI * ctrl.angleOffset)
  }
}

document.onmousedown = function (e) {
  // var a = Math.random() * Math.PI * 2
  var a = angles[Math.floor(Math.random() * angles.length)]
  var s = 3
  var vx = Math.cos(a) * s
  var vy = Math.sin(a) * s
  addTraveler(e.pageX, e.pageY, vx, vy)
}

var gui = new dat.GUI();
gui.add(ctrl, 'num', 0, 150).step(1);
gui.add(ctrl, 'max', 1, 3000).step(1);
gui.add(ctrl, 'chanceToSplit', 0, 1);
gui.add(ctrl, 'fade', 0, 1).step(0.1);
gui.add(ctrl, 'speed', 1.5, 3.5).step(0.25);
gui.add(ctrl, 'numAngles', 0, 25).step(1).onChange(updateAngles);
gui.add(ctrl, 'angleOffset', 0, 1).step(0.05).onChange(updateAngles);
gui.add(ctrl, 'draw');
gui.add(ctrl, 'clear');
gui.closed = true;


window.addEventListener('resize', setup)

setup()

function setup() {
  updateAngles()
  canvas.width = width = window.innerWidth
  canvas.height = height = window.innerHeight

  ctx.beginPath();
  ctx.rect(0, 0, width, height)
  ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${1})`
  ctx.fill()
  
  imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
}

function Traveler(ctx, x, y, vx, vy) {
  this.x = x
  this.y = y;
  this.x1 = x
  this.y1 = y;
  this.vx = vx;
  this.vy = vy;
  this.ctx = ctx;
  this.step = 0;
  this.active = true;
  this.draw = function () {
    if (this.active) {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineWidth = 0.999;
      ctx.strokeStyle = "#000000";
      ctx.moveTo(this.x1, this.y1);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
    }
  };
  this.update = function () {
    if (this.active) {
      this.step++
      if (Math.random() < ctrl.chanceToSplit && travelers.length < ctrl.max) {
        var a = angles[Math.floor(Math.random() * angles.length)]
        var s = ctrl.speed
        var vx = Math.cos(a) * s // new location
        var vy = Math.sin(a) * s
        addTraveler(this.x1 + this.vx, this.y1 + this.vy, vx, vy)
        if (Math.random() > 0.5) {
          this.die()
          return
        }
      }
      this.x1 = this.x
      this.y1 = this.y
      this.x += this.vx
      this.y += this.vy
      if (this.getVal(this.x, this.y) < 0.7) {
        this.active = false;
        return
      }
      if(x < 0 || y < 0 || x > width || y > height) {
        this.die()
        return
      }
    } else {
      this.die()
    }
  }
  this.getVal = function  (x, y) {
    var i = (Math.round(x) + (Math.round(y) * canvas.width)) * 4;
    return imageData.data[i]/255;
  }

  this.die = function () {
    var i = travelers.indexOf(this)
    travelers.splice(i, 1);
    delete this
  }
}

setInterval(animate, 30)


function fade(ctx, amt, width, height) {
  ctx.beginPath();
  ctx.rect(0, 0, width, height)
  ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${amt})`
  ctx.fill()
}

function clear(ctx) {
  ctx.beginPath();
  ctx.rect(0, 0, width, height)
  ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${1})`
  ctx.fill()
}

var travelers = []

function addTraveler(x, y, vx, vy) {
  traveler = new Traveler(ctx, x, y, vx, vy);
  travelers.push(traveler)
}

function animate() {
  if (ctrl.draw) {
    step++;

    if (ctrl.fade > 0) {
      fade(ctx, ctrl.fade / 10, width, height);
    }
    draw()
    // update color sampler ref
    imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
    
  }
}

function draw() {
  var traveler
  for (var t in travelers) {
    traveler = travelers[t]
    traveler.update()
    traveler.draw()
  }
  
  if (travelers.length < ctrl.num) {
    var a = angles[Math.floor(Math.random() * angles.length)]
    var s = ctrl.speed
    var vx = Math.cos(a) * s
    var vy = Math.sin(a) * s
    addTraveler(
      (Math.random() * 0.6 + 0.2) * canvas.width,
      (Math.random() * 0.6 + 0.2) * canvas.height,
      vx,
      vy
    );
  }
}

function removeTravelers() {
  while (travelers.length > 0) {
    delete travelers.pop()
  }
}