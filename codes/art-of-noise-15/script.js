let canvas, ctx, field, w, h, fieldSize, columns, rows, noiseZ, particles, hue;
noiseZ = 0;

particleCount          = 500; // canvas.width * canvas.height / 1000
particleSize           = 10;
borderSize             = 2;
speedSizeScale         = 4;
fieldSize              = 5;
fieldForce             = 0.3;
noiseSpeed             = 0.001;
dff                    = false; // Show Flow-Field?
sORp                   = true; // true=simplex / false=perlin
trailLength            = 0.1;
particleColor          = "rgb(0,0,0)";
borderColor            = "rgb(255,255,255)";
fieldColor             = "rgb(90,90,90)";
backgroundColor        = "rgb(0,0,0)";

var ui = new function() {
  this.particleCount   = particleCount;
  this.particleSize    = particleSize;
  this.borderSize      = borderSize;
  this.speedSizeScale  = speedSizeScale;
  this.fieldSize       = fieldSize;
  this.fieldForce      = fieldForce;
  this.noiseSpeed      = noiseSpeed;
  this.showFlowField   = dff;
  this.simplexOrPerlin = sORp;
  this.trailLength     = trailLength;
  this.particleColor   = particleColor;
  this.borderColor     = borderColor;
  this.fieldColor      = fieldColor;
  this.backgroundColor = backgroundColor;

  this.reset = function() {
    particleCount      = ui.particleCount;
    reset();
  }
  
  this.live = function(){
    particleSize       = ui.particleSize;
    borderSize         = ui.borderSize;
    backgroundColor    = ui.backgroundColor;
    trailLength        = ui.trailLength;
    particleColor      = ui.particleColor;
    borderColor        = ui.borderColor;
    fieldColor         = ui.fieldColor;
    speedSizeScale     = ui.speedSizeScale;
    fieldSize          = ui.fieldSize;
    fieldForce         = ui.fieldForce;
    noiseSpeed         = ui.noiseSpeed;
    ui.showFlowField?dff=1:dff=0;
    ui.simplexOrPerlin?sORp=1:sORp=0;
  }
}();

var gui = new dat.GUI({ resizable: false });
f1 = gui.addFolder("Colors");
f2 = gui.addFolder("Particles");
f3 = gui.addFolder("Behaviour");
f2.add(ui, "particleCount", 100, 2000).step(100).onChange(ui.reset);
f2.add(ui, "particleSize", 1, 10).onChange(ui.live);
f2.add(ui, "borderSize", 0, 5).onChange(ui.live);
f2.add(ui, "speedSizeScale", 1, 5).onChange(ui.live);
f2.add(ui, "trailLength", 0, 1.00).onChange(ui.live);
f3.add(ui, "fieldSize", 5, 50).step(1).onChange(ui.live);
f3.add(ui, "fieldForce", 0.1, 1).onChange(ui.live);
f3.add(ui, "noiseSpeed", 0.001, 0.005).onChange(ui.live);
f3.add(ui, "showFlowField").onChange(ui.live);
f3.add(ui, "simplexOrPerlin").onChange(ui.live);
f1.addColor(ui, "particleColor").onChange(ui.live);
f1.addColor(ui, "borderColor").onChange(ui.live);
f1.addColor(ui, "backgroundColor").onChange(ui.live);
f1.addColor(ui, "fieldColor").onChange(ui.live);
gui.close();

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
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, (particleSize+borderSize)*Math.abs(this.vel.x+this.vel.y)/speedSizeScale, 0, 2 * Math.PI);
    ctx.fillStyle = borderColor;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, particleSize*Math.abs(this.vel.x+this.vel.y)/speedSizeScale, 0, 2 * Math.PI);
    ctx.fillStyle = particleColor;
    ctx.fill();
    ctx.closePath();
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
    let particle = new Particle(w/2,h/2);
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
        let length = noise.simplex3(x / 40 + 40000, y / 40 + 40000, noiseZ) * fieldForce;
        field[x][y].setLength(length);
        field[x][y].setAngle(angle);
      }
    }
  } else {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        let angle = noise.perlin3(x / 20, y / 20, noiseZ) * Math.PI * 2;
        let length = noise.perlin3(x / 40 + 40000, y / 40 + 40000, noiseZ) * fieldForce;
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