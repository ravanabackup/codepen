/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });
  canvas.addEventListener("click", draw);
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function draw() {
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "white";
  ctx.shadowColor = "black";
  ctx.shadowOffsetX = 8;
  ctx.shadowOffsetY = 8;
  ctx.shadowBlur = 20;
  let size = Math.random() * 80 + 20;
  let positions = getPositions(size);
  drawRects(positions, size);
}

function getPositions(size) {
  let positions = [];
  positions.push({
    x: w / 2,
    y: h / 2,
    color: "hsl(220, 60%, 50%)",
    angle: 0 });

  let randomAngleOffset = Math.random() * 360;
  let nrOfCircles = Math.max(w, h) * 0.7 / size;
  for (let circle = 0; circle < nrOfCircles; circle++) {
    let r = (circle + 1) * size;
    let points = r * 8 / size;
    let deltaAngle = Math.PI * 2 / points;
    let offsetAngle = Math.random() * Math.PI;
    for (let angle = 0; angle < Math.PI * 2; angle += deltaAngle) {
      let hue = angle / Math.PI / 2 * 360 + randomAngleOffset;
      let l = Math.random() * 40 + 30;
      let color = `hsl(${hue}, 60%, ${l}%)`;
      let x = Math.cos(angle) * r + w / 2;
      let y = Math.sin(angle) * r + h / 2;
      let p = {
        x: x,
        y: y,
        color: color,
        angle: angle };

      positions.push(p);
    }
  }
  return positions;
}

function drawRects(positions, size) {
  let i = positions.length;
  while (i--) {
    let randomIndex = Math.floor(Math.random() * positions.length);
    let p = positions[randomIndex];
    ctx.fillStyle = p.color;
    drawRect(p.x, p.y, size, p.angle);
    positions.splice(randomIndex, 1);
  }
}

function drawRect(x, y, size, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  roundedRectangle(-size / 2, -size / 2, size, size, size / 4);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}


// from https://newfivefour.com/javascript-canvas-rounded-rectangle.html
function roundedRectangle(x, y, width, height, rounded) {
  const radiansInCircle = 2 * Math.PI;
  const halfRadians = Math.PI;
  const quarterRadians = Math.PI / 2;

  // top left arc
  ctx.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true);
  // line from top left to bottom left
  ctx.lineTo(x, y + height - rounded);
  // bottom left arc  
  ctx.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true);
  // line from bottom left to bottom right
  ctx.lineTo(x + width - rounded, y + height);
  // bottom right arc
  ctx.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true);
  // line from bottom right to top right
  ctx.lineTo(x + width, y + rounded);
  // top right arc
  ctx.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true);
  // line from top right to top left
  ctx.lineTo(x + rounded, y);
}

setup();
draw();