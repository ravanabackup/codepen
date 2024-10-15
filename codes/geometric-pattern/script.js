/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let colors;
let colorSchemeIndex;

function setup() {
  setupColors();
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });
  canvas.addEventListener("click", draw);
}

function setupColors() {
  //https://coolors.co
  colors = [
  [
  "#000",
  "#fff"],

  [
  "#ffb5a7",
  "#fcd5ce",
  "#f8edeb",
  "#f9dcc4",
  "#fec89a"],

  [
  "#03045e",
  "#0077b6",
  "#00b4d8",
  "#90e0ef",
  "#caf0f8"],

  [
  "#07beb8",
  "#3dccc7",
  "#68d8d6",
  "#9ceaef",
  "#c4fff9"],

  [
  "#ffaf87",
  "#ff8e72",
  "#ed6a5e",
  "#4ce0b3",
  "#377771"],

  [
  "#cebebe",
  "#ece2d0",
  "#d5b9b2",
  "#a26769",
  "#6d2e46"]];


}

function getTwoDifferentRandomColors() {
  let len = colors[colorSchemeIndex].length;
  let randomIndex1 = Math.floor(Math.random() * len);
  let randomIndex2;
  do {
    randomIndex2 = Math.floor(Math.random() * len);
  } while (randomIndex2 === randomIndex1);
  let color1 = colors[colorSchemeIndex][randomIndex1];
  let color2 = colors[colorSchemeIndex][randomIndex2];
  return [color1, color2];
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  let nrOfColorSchemes = colors.length;
  colorSchemeIndex = Math.floor(Math.random() * nrOfColorSchemes);

  drawSquares();
}

function drawSquares() {
  let size = Math.round(Math.random() * 40 + 20);
  for (let x = 0; x < w + size; x += size) {
    for (let y = 0; y < h + size; y += size) {
      drawSquare(x, y, size);
    }
  }

  let nrOfBigShapes = Math.round(Math.random() * 5) + 2;
  for (let i = 0; i < nrOfBigShapes; i++) {
    let x = Math.round(Math.random() * w / size) * size;
    let y = Math.round(Math.random() * h / size) * size;
    drawSquare(x, y, size * 2);
  }
}

function drawSquare(x, y, size) {
  let [color1, color2] = getTwoDifferentRandomColors();

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x + size, y + size);
  ctx.lineTo(x + size, y);
  ctx.closePath();
  ctx.fillStyle = color1;
  ctx.fill();
  ctx.clip();

  ctx.translate(x + size / 2, y + size / 2);
  let angle = Math.floor(Math.random() * 4) * Math.PI / 2;
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.fillStyle = color2;
  drawRandomShape(size);
  drawSpots(size);
  ctx.restore();
}

function drawRandomShape(size) {
  let shape = Math.floor(Math.random() * 6);
  switch (shape) {
    case 0:
      ctx.arc(size / 2, size / 2, size, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 1:
      ctx.moveTo(-size / 2, -size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.lineTo(size / 2, -size / 2);
      ctx.closePath();
      ctx.fill();
      break;
    case 2:
      ctx.fillRect(-size / 2, -size / 2, size / 2, size / 2);
      break;
    case 3:
      ctx.arc(size / 2, 0, size / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 4:
      ctx.moveTo(-size / 2, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.lineTo(0, -size / 2);
      ctx.closePath();
      ctx.fill();
      break;
    case 5:
      ctx.moveTo(-size / 2, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      break;}

}

function drawSpots(size) {
  ctx.save();
  ctx.fillStyle = `rgba(0, 0, 0, 0.07)`;

  let nrOfSpots = size * size / 2;
  for (let i = 0; i < nrOfSpots; i++) {
    let x = Math.random() * size - size / 2;
    let y = Math.random() * size - size / 2;
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.restore();
}

setup();
draw();