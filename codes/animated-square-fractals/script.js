var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  phi = (1 + Math.sqrt(5)) / 2,
  angle,
  coeff = 1.85,
  requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var WIDTH, HEIGHT;

window.addEventListener('load', init);

function init() {
  
  WIDTH = document.documentElement.clientWidth;
  HEIGHT = document.documentElement.clientHeight;

  canvas.setAttribute('width', WIDTH);
  canvas.setAttribute('height', HEIGHT);

  animate();

}

function Shape(id, x, y, r, coef) {
  this.id = id;
  this.color = "rgba(80,210,240,.25)";
  this.x = x;
  this.y = y;
  this.hasChildren = (this.id <= 6) ? true : false;
  this.r = r;
  this.coef = coef;
  this.childrenr = this.r / this.coef; //this.r*1/Math.PI;

}

Shape.prototype.draw = function() {  
  ctx.beginPath();
  ctx.strokeRect(this.x - this.r / 2, this.y - this.r / 2, this.r, this.r);
  ctx.strokeStyle = this.color;
  ctx.closePath();

  if (this.hasChildren) {

    var gen = this.id + 1;
    this.child1 = new Shape(gen, this.x + this.r / 2, this.y, this.childrenr, this.coef);
    this.child1.draw();

    this.child2 = new Shape(gen, this.x - this.r / 2, this.y, this.childrenr, this.coef);
    this.child2.draw();

    this.child3 = new Shape(gen, this.x, this.y + this.r / 2, this.childrenr, this.coef);
    this.child3.draw();

    this.child4 = new Shape(gen, this.x, this.y - this.r / 2, this.childrenr, this.coef);
    this.child4.draw();

  }
}

function animate() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  coeff -= .0015;
  var shape = new Shape(1, WIDTH / 2, HEIGHT / 2, 600-Math.abs(coeff*1000), coeff);
  shape.draw();
  if (coeff > -3) requestAnimationFrame(animate);
}