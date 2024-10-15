/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

class Particle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    let angle = simplex.noise2D(x / settings.zoom, y / settings.zoom) * Math.PI * 2;
    let vx = Math.cos(angle);
    let vy = Math.sin(angle);
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
    iterations: 500,
    zoom: 90,
    strength: 200,
    alpha: 0.031,
    numberOfParticles: w * h / 90,
    size: 1,
  };
}

function setupParticles() {
  particles = [];
  for(let i = 0; i < settings.numberOfParticles; i++) {
    let particle = new Particle(Math.random() * w, Math.random() * h);
    particles.push(particle);
  }
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function draw() {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  simplex = new SimplexNoise();
  setupParticles();
  drawStuff();
}

function drawStuff() {
  let gravity = new Vector(settings.x, settings.y);
  let alpha = settings.alpha;
  ctx.fillStyle = `rgba(255, 235, 118, ${alpha})`;
  let iterations = settings.iterations;
  let force = new Vector(0, 0);
  let center = new Vector(w / 2, h / 2);
  for(let i = 0; i < iterations; i++) {
    particles.forEach(p => {
      p.draw();
      let strength = simplex.noise2D(p.pos.x / settings.zoom, p.pos.y / settings.zoom) * settings.strength / 1000 + 0.01;
      let angle = p.pos.sub(center).getAngle();
      force.x = Math.cos(angle) * strength;
      force.y = Math.sin(angle) * strength;
      p.move(force);
    });
  }
}

window.CP.shouldStopExecution = function () {
  return false;
}

setup();
draw();