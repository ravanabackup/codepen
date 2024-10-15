/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

const svgNs = "http://www.w3.org/2000/svg";
let svg;
let w = 1000;
let h = 1000;
let zoom;
let simplex;

function createLineElement(x, y, size) {
  let n = simplex.noise2D(x / zoom, y / zoom);
  let direction = n > 0.5 ? -1 : 1;
  let x1 = x - size / 2;
  let y1 = y - size / 2 * direction;
  let x2 = x + size / 2;
  let y2 = y + size / 2 * direction;
  let lineElement = document.createElementNS(svgNs, "line");
  lineElement.setAttribute("x1", x1);
  lineElement.setAttribute("y1", y1);
  lineElement.setAttribute("x2", x2);
  lineElement.setAttribute("y2", y2);
  return lineElement;
}
  
function drawLines(groupElement) {
  let size = 100 / (Math.random() * 10 + 2);
  for(let x = size/2; x <= w; x += size) {
    for(let y = size/2; y <= h; y += size) {
      let line = createLineElement(x, y, size);
      groupElement.appendChild(line);
    }
  }
}
  
function setup() {
  svg = document.querySelector("svg");
  document.addEventListener("click", draw);
  document.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", onResize);
  onResize();
}
  
function onKeyDown (e) {
  if(e.code === "KeyD") {
    download();
  }
}

function onResize() {
  w = window.innerWidth;
  h = window.innerHeight;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  draw();
}

function download() {
  let svgDoc = svg.outerHTML;
  let filename = "10print-simplex-noise.svg";
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
  zoom = Math.random() * 600 + 100;
  simplex = new SimplexNoise();
  let group = document.querySelector("g");
  if(group) {
    group.remove();
  }
  group = document.createElementNS(svgNs, "g");
  let strokeWidth = Math.ceil(Math.random() * 5);
  group.setAttribute("stroke-width", strokeWidth);
  group.setAttribute("stroke-linecap", "round");
  group.setAttribute("stroke-linejoin", "round");
  group.setAttribute("stroke", "black");
  
  drawLines(group);
  svg.appendChild(group);
}

setup();