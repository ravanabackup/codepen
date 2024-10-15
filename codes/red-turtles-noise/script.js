var turtles;

function setup() {
  turtles = [];
  for (var i = 0; i < 90; i++) {
    turtles.push(new Turtle());
  }
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
}

function draw() {
  colorMode(RGB);
  background(0, 20);
  turtles.forEach((t, i) => t.update());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function Turtle() {
  this.reset();
  this.dir = 0;
  this.speed = 3;
  this.size = 60;
  this.extra = round(random(0, 1));
}

Turtle.prototype.reset = function () {
  this.x = windowWidth / 2;
  this.y = windowHeight / 2;
  this.offset = random(1000);
};

Turtle.prototype.move = function () {
  this.x += cos(this.dir) * this.speed;
  this.y += sin(this.dir) * this.speed;
  if (this.x < -this.size ||
  this.y < -this.size ||
  this.x > windowWidth + this.size ||
  this.y > windowHeight + this.size) {
    this.reset();
  }
};

Turtle.prototype.draw = function () {
  colorMode(HSB);
  var h = noise(frameCount / 190 + this.offset) * 100 + 300;
  fill(h, 100, 30 + this.extra * 60, 0.8);
  ellipse(this.x, this.y, this.size, this.size);
};

Turtle.prototype.update = function () {
  this.dir = noise(frameCount / 500 + this.offset) * PI * 4;
  this.move();
  this.draw();
};