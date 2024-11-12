/* Johan Karlsson's Post about Particles in Flowfields:
https://codepen.io/DonKarlssonSan/post/particles-in-simplex-noise-flow-field */
let canvas, ctx, field, w, h, fieldSize, columns, rows, noiseZ, particles, hue;
hue, (noiseZ = 0);

particleCount = 6000; // canvas.width * canvas.height / 200
particleSize = 0.5;
fieldSize = 20;
fieldForce = 0.3;
noiseSpeed = 0.001;
dff = false; // Show Flow-Field?
sORp = false; // true=simplex / false=perlin
trailLength = 0.03;
particleColor = "rgb(255,255,255)";
fieldColor = "rgb(70,70,70)";
backgroundColor = "rgb(0,0,0)";

var ui = new function() {
  this.particleCount = particleCount;
  this.particleSize = particleSize;
  this.fieldSize = fieldSize;
  this.fieldForce = fieldForce;
  this.noiseSpeed = noiseSpeed;
  this.showFlowField = dff;
  this.simplexOrPerlin = sORp;
  this.trailLength = trailLength;
  this.particleColor = particleColor;
  this.fieldColor = fieldColor;
  this.backgroundColor = backgroundColor;

  this.redraw = function() {
    particleCount = ui.particleCount;
    particleSize = ui.particleSize;
    fieldSize = ui.fieldSize;
    fieldForce = ui.fieldForce;
    noiseSpeed = ui.noiseSpeed;
    particleColor = ui.particleColor;
    fieldColor = ui.fieldColor;
    ui.showFlowField?dff=1:dff=0;
    ui.simplexOrPerlin?sORp=1:sORp=0;
    reset();
  }
  
  this.bgColor = function(){
    backgroundColor = ui.backgroundColor;
    trailLength = ui.trailLength;
  }
}();

var gui = new dat.GUI({ resizable: false });
gui.add(ui, "particleCount", 1000, 20000).step(100).onChange(ui.redraw);
gui.add(ui, "particleSize", 0.1, 3).onChange(ui.redraw);
gui.add(ui, "trailLength", 0, 1.00).onChange(ui.bgColor);
gui.add(ui, "fieldSize", 5, 50).step(1).onChange(ui.redraw);
gui.add(ui, "fieldForce", 0.1, 1).onChange(ui.redraw);
gui.add(ui, "noiseSpeed", 0.001, 0.005).onChange(ui.redraw);
gui.add(ui, "showFlowField").onChange(ui.redraw);
gui.add(ui, "simplexOrPerlin").onChange(ui.redraw);
gui.addColor(ui, "particleColor").onChange(ui.redraw);
gui.addColor(ui, "fieldColor").onChange(ui.redraw);
gui.addColor(ui, "backgroundColor").onChange(ui.bgColor);

class Particle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(Math.random() - 0.5, Math.random() - 0.5);
    this.acc = new Vector(0, 0);
    this.fieldSize = particleSize;
  }

  move(acc) {
    if (acc) {
      this.acc.addTo(acc);
    }
    this.vel.addTo(this.acc);
    this.pos.addTo(this.vel);
    if (this.vel.getLength() > 2) {
      this.vel.setLength(2);
    }
    this.acc.setLength(0);
  }

  draw() {
    ctx.fillRect(this.pos.x, this.pos.y, this.fieldSize, this.fieldSize);
  }

  wrap() {
    if (this.pos.x > w) {
      this.pos.x = 0;
    } else if (this.pos.x < -this.fieldSize) {
      this.pos.x = w - 1;
    }
    if (this.pos.y > h) {
      this.pos.y = 0;
    } else if (this.pos.y < -this.fieldSize) {
      this.pos.y = h - 1;
    }
  }
}

canvas = document.querySelector("#canvas");
ctx = canvas.getContext("2d");
reset();
window.addEventListener("resize", reset);

function initParticles() {
  particles = [];
  let numberOfParticles = particleCount;
  for (let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle(Math.random() * w, Math.random() * h);
    particles.push(particle);
  }
}

function initField() {
  field = new Array(columns);
  for (let x = 0; x < columns; x++) {
    field[x] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      let v = new Vector(0, 0);
      field[x][y] = v;
    }
  }
}

function calcField() {
  if (sORp) {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        let angle = noise.simplex3(x / 20, y / 20, noiseZ) * Math.PI * 2;
        let length =
          noise.simplex3(x / 40 + 40000, y / 40 + 40000, noiseZ) * fieldForce;
        field[x][y].setLength(length);
        field[x][y].setAngle(angle);
      }
    }
  } else {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        let angle = noise.perlin3(x / 20, y / 20, noiseZ) * Math.PI * 2;
        let length =
          noise.perlin3(x / 40 + 40000, y / 40 + 40000, noiseZ) * fieldForce;
        field[x][y].setLength(length);
        field[x][y].setAngle(angle);
      }
    }
  }
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  //ctx.strokeStyle = fieldColor;
  noise.seed(Math.random());
  columns = Math.round(w / fieldSize) + 1;
  rows = Math.round(h / fieldSize) + 1;
  initParticles();
  initField();
}

function draw() {
  requestAnimationFrame(draw);
  calcField();
  noiseZ += noiseSpeed;
  drawBackground();
  dff ? drawFlowField() : 0;
  drawParticles();
}

function drawBackground() {
  var col = ui.backgroundColor.substring(4, ui.backgroundColor.length-1).replace(/ /g, '').split(',');
  backgroundColor = "rgba("+col[0]+","+col[1]+","+col[2]+","+ui.trailLength+")";
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, w, h);
}

function drawParticles() {
  ctx.fillStyle = particleColor;
  particles.forEach(p => {
    p.draw();
    let pos = p.pos.div(fieldSize);
    let v;
    if (pos.x >= 0 && pos.x < columns && pos.y >= 0 && pos.y < rows) {
      v = field[Math.floor(pos.x)][Math.floor(pos.y)];
    }
    p.move(v);
    p.wrap();
  });
}

function drawFlowField() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      ctx.beginPath();
      ctx.strokeStyle = fieldColor;
      let x1 = x * fieldSize;
      let y1 = y * fieldSize;
      ctx.moveTo(x1, y1);
      ctx.lineTo(
        x1 + field[x][y].x * fieldSize * 2,
        y1 + field[x][y].y * fieldSize * 2
      );
      ctx.stroke();
    }
  }
}

draw();