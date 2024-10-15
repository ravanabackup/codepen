/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

const svgNs = "http://www.w3.org/2000/svg";
let svg;
let simplex;
let xZoom, yZoom;
let deltaX;

class NoiseLine {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.length = length;
  }
    
  draw(groupElement) {
    let path = document.createElementNS(svgNs, "path");
    //path.setAttribute("fill", "none");
    path.setAttribute("stroke", "black");
    let points = this.generatePoints();
    let commands = this.convertPointsToCommands(points);
    path.setAttribute("d", commands); 
    groupElement.appendChild(path);
  }
  
  generatePoints() {
    let points = [];
    let dy = this.length / 300;
    for(let y = 0; y < this.length; y += dy) {
      let x = this.x + (simplex.noise2D(this.x / xZoom, y / yZoom)) * deltaX * 2;
      points.push(`${x}, ${this.y + y}`);
    }
    return points;
  }
  
  convertPointsToCommands(points) {
    let commands = [];
    commands.push(`M ${points[0]}`);
    for(let i = 1; i < points.length; i++) {
      commands.push(`L ${points[i]}`);
    }
    return commands.join(" ");
  }
}

function setup() {
  svg = document.querySelector("svg");
  document.addEventListener("click", draw);
  document.addEventListener("keydown", onKeyDown);
}

function onKeyDown (e) {
  if(e.code === "KeyD") {
    download();
  }
}

function download() {
  let svgDoc = svg.outerHTML;
  let filename = "noisy-vertical-svg-lines.svg";
  let element = document.createElement("a");
  element.setAttribute("href", "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgDoc));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.addEventListener("click", e => e.stopPropagation());
  element.click();
  document.body.removeChild(element);
}

function draw() {
  simplex = new SimplexNoise();
  let group = document.querySelector("g");
  if(group) {
    group.remove();
  }
  
  group = document.createElementNS(svgNs, "g");
  xZoom = Math.random() * 500 + 20;
  yZoom = Math.random() * 500 + 20;
  let lines = [];
  deltaX = Math.random() * 15 + 5;
  for(let x = 100; x <= 900; x += deltaX) {
    line = new NoiseLine(x, 50, 900);
    lines.push(line);
  }
  lines.forEach(l => l.draw(group));
  svg.appendChild(group);
}

setup();
draw();