'use strict';
console.clear();

// lil discovery while experimenting. code inefficient and incomplete.
// spherical spiral where we find the normal of each point and then 
// scale it with a periodic function (tangent) that phases according to the point's index.
// don't actually have to do find the normal, i was working towards something else.

let minDotsPerTurn = 15, 
    maxDotsPerTurn = 45,
    maxMarkerSize = 4,
    radius = 200,
    rotationRate = 0.0015,
    spiralAngle = 0.1, // something like that
    turns = 60;

let points;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  camera(0, -radius / 2, radius * 3, 0, 0, 0, 0, 1, 0);
  noStroke();
  smooth(8);
  //noLoop();
  points = [];
  let tMax = TAU * turns / 2;
  let t = -tMax;
  
  while (t <= tMax) {
    let c = atan(spiralAngle * t),
        v = createVector(
          radius * cos(t) * cos(c),
          -radius * sin(c),
          radius * sin(t) * cos(c)
        ),
        s = magnitude(v.x, v.z) / radius,
        r = maxMarkerSize * s;
    
    points.push({v: v, r: r});
    t += TAU/map(s, 0, 1, minDotsPerTurn, maxDotsPerTurn);
  }
}

function draw() {
  orbitControl();
  background(30);
  shininess(3);
  ambientLight(0, 80, 60);
  pointLight(0, 140, 80, -radius * 2 * cos(frameCount * 0.021), -radius / 2, radius * 2 * sin(frameCount * 0.021));
  pointLight(0, 60, 80, radius * 2 * cos(PI + frameCount * 0.024), radius / 2 , radius * 2 * sin(PI + frameCount * 0.024));
  pointLight(50, 0, 0, 0, radius * 8 * cos(frameCount * 0.005), 0);
  specularMaterial(50, 125, 80);

  rotateY(frameCount * rotationRate);
  
  for (let i = 0; i < points.length; i++) {
    let v_n = p5.Vector.normalize(points[i].v).mult(50 * tan((i/points.length) + frameCount * 0.0025));
    let w = p5.Vector.add(points[i].v, v_n);
    push();
    translate(w.x, w.y, w.z);
    sphere(points[i].r);
    pop();
  }
}

function magnitude(x, y) {
  return sqrt(pow(x, 2) + pow(y, 2));
}