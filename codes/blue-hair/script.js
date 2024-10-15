/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
  
  A.K.A. Blueberry muffin with frosting
  A.K.A. Particles in Circular Force Field
*/

class Particle {
  constructor(x, y, startangle) {
    this.pos = new Vector(x, y);
    let vx = Math.cos(startangle);
    let vy = Math.sin(startangle);
    this.vel = new Vector(vx, vy);
  }
  
  move(acc) {
    this.vel.addTo(acc);
    this.pos.addTo(this.vel);
    if(this.vel.getLength() > 1) {
      this.vel.setLength(1);
    }
  }
  
  draw() {
    ctx.fillRect(this.pos.x, this.pos.y, settings.size, settings.size);
  }
}

let canvas;
let ctx;
let w, h;
let particles;
let settings;
let simplex;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
  canvas.addEventListener("click", draw);
  settings = {
    iterations: 80,
    zoom: 90,
    noiseStrength: 0.07,
    circularForceStrength: 0.12,
    alpha: 0.2,
    numberOfParticles: w * h / 30,
    size: 1,
  };
}

function setupParticles() {
  particles = [];
  let center = new Vector(w / 2, h / 2);

  for(let i = 0; i < settings.numberOfParticles; i++) {
    let pos = new Vector(Math.random() * w, Math.random() * h);
    let angle = pos.sub(center).getAngle();
    
    let particle = new Particle(pos.x, pos.y, angle);
    particles.push(particle);
  }
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function draw() {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgb(9, 0, 0)";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  simplex = new SimplexNoise();
  setupParticles();
  drawStuff();
}

function drawStuff() {
  let gravity = new Vector(settings.x, settings.y);
  let alpha = settings.alpha;
  let blue = Math.floor(Math.random() * 55 + 200);
  ctx.fillStyle = `rgba(120, 120, ${blue}, ${alpha})`; 
  let iterations = settings.iterations;
  let force = new Vector(0, 0);
  let noise = new Vector(0, 0);
  let center = new Vector(w / 2, h / 2);
  for(let i = 0; i < iterations; i++) {
    particles.forEach(p => {
      p.draw();
      let noiseAngle = (simplex.noise2D(p.pos.x / settings.zoom, p.pos.y / settings.zoom) + 1) * Math.PI;
      noise.x = settings.noiseStrength;
      noise.y = settings.noiseStrength;
      noise.setAngle(noiseAngle);
      let angle = p.pos.sub(center).getAngle();
      force.x = Math.cos(angle) * settings.circularForceStrength;
      force.y = Math.sin(angle) * settings.circularForceStrength;
      force.addTo(noise);
      p.move(force);
    });
  }
}

window.CP.shouldStopExecution = function () {
  return false;
}

setup();
draw();