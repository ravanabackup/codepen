var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = 400,
  cx = cw / 2;
var ch = canvas.height = 400,
  cy = ch / 2;

var rad = Math.PI / 180;
var deg = 180 / Math.PI;
var points = [];

var fl = 450; // focal distance
var m = { // mouse
  x: 200,
  y: 100
}
var speed = 0.0001;
var rotx = 0;
var roty = 0;

function Point(x, y, z) {
  this.r = 15;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.xpos = x;
  this.ypos = y;
  this.zpos = z;
  this.vx = 0;
  this.vy = 0;
  this.vz = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color;
  this.visible = true;

  this.rotateY = function() {
    var rot = (m.y - cy) * speed;
    var cos = Math.cos(rot);
    var sin = Math.sin(rot);
    var x1 = this.xpos * cos - this.zpos * sin;
    var z1 = this.zpos * cos + this.xpos * sin;

    this.xpos = x1;
    this.zpos = z1;

    if (this.zpos > -fl) {
      var scale = fl / (fl + this.zpos);
      this.scaleX = this.scaleY = scale;
      this.x = cx + this.xpos * scale;
      this.y = cy + this.ypos * scale;
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  this.rotateX = function() {
    var rot = (m.x - cx) * speed;
    var cos = Math.cos(rot);
    var sin = Math.sin(rot);
    var y1 = this.ypos * cos - this.zpos * sin;
    var z1 = this.zpos * cos + this.ypos * sin;
    this.ypos = y1;
    this.zpos = z1;
    if (this.zpos > -fl) {
      var scale = fl / (fl + this.zpos);
      this.scaleX = this.scaleY = scale;
      this.x = cx + this.xpos * scale;
      this.y = cy + this.ypos * scale;
      this.visible = true;
    } else {
      this.visible = false;
    }
  }
}
////////////////////////////////////////


for (var phi = 0; phi < 2 * Math.PI; phi += .01) {

  var x = 40 * (Math.sin(phi) + 2 * Math.sin(2 * phi));
  var y = 40 * (Math.cos(phi) - 2 * Math.cos(2 * phi));
  var z = 40 * (Math.sin(3 * phi));
  
  var point = new Point(x, y, z);
  points.push(point);
}
/*
for(var i = 0; i < points.length; i++){
  var hue = map(i, 0, points.length, 0, 360);
  points[i].color = "hsla(" + hue + ",90%,70%,.4)";
}*/

////////////////////////////////////////

function Draw() {
  elId = window.requestAnimationFrame(Draw);
  ctx.clearRect(0, 0, cw, ch);

  for (var i = 0; i < points.length; i++) {
    points[i].rotateY();
    points[i].rotateX();
  }
  
  points.sort(zSort);
  
  for (var i = 0; i < points.length; i++) {
    //ctx.fillStyle = points[i].color;
    var hue = map(i, 0, points.length, 0, 360);
    var color = "hsla(" + hue + ",90%,70%,.4)";
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, points[i].r, 0, 2 * Math.PI);
    ctx.fill();  
  }
}

elId = window.requestAnimationFrame(Draw);

canvas.addEventListener("mousemove", function(e) {
  m = oMousePos(canvas, e)
}, false)

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}

function map(n, a, b, _a, _b) {
  var d = b - a;
  var _d = _b - _a;
  var u = _d / d;
  return _a + n * u;
}

function zSort(a, b) {
  //para que los elementos más alejados sean dibujados debajo de los que estan delante
  return (b.zpos - a.zpos);
}