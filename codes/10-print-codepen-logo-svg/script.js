/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

let canvas;
const svgNs = "http://www.w3.org/2000/svg";
let svg;
let w = 800;
let h = 800;
let imageBuffer;

function createLineElement(x, y, size) {
  let index = Math.round(y) * w + Math.round(x);
  let isInside = index < imageBuffer.length && imageBuffer[index];
  let direction = isInside ? -1 : 1;

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
  let size = 8;
  for (let x = size / 2; x < w; x += size) {
    for (let y = size / 2; y < h; y += size) {
      let line = createLineElement(x, y, size);
      groupElement.appendChild(line);
    }
  }
}

async function setup() {
  canvas = document.querySelector("#canvas");
  canvas.width = w;
  canvas.height = h;
  ctx = canvas.getContext("2d");
  svg = document.querySelector("svg");
  document.addEventListener("keydown", onKeyDown);
  await storeImageInBuffer();
}

function onKeyDown(e) {
  if (e.code === "KeyD") {
    download();
  }
}

function download() {
  let svgDoc = svg.outerHTML;
  let filename = "10print-codepen-logo.svg";
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
  let group = document.querySelector("g");
  if (group) {
    group.remove();
  }
  group = document.createElementNS(svgNs, "g");
  group.setAttribute("stroke-width", 3);
  group.setAttribute("stroke-linecap", "round");
  group.setAttribute("stroke-linejoin", "round");
  group.setAttribute("stroke", "black");

  drawLines(group);
  svg.appendChild(group);
}

function storeImageInBuffer() {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.crossOrigin = "anonymous";
    image.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/254249/Button-Black-Large.png";

    //image.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/254249/imageedit_1_3726392014.gif"; //"https://s3-us-west-2.amazonaws.com/s.cdpn.io/254249/Button-Black-Large.png";
    image.onload = () => {
      let leftMargin = (w - image.width) / 2;
      let topMargin = (h - image.height) / 2;
      ctx.drawImage(image, leftMargin, topMargin);
      let imageData = ctx.getImageData(0, 0, w, h);
      imageBuffer = new Uint32Array(imageData.data.buffer);

      resolve();
    };
  });
}

(async function main() {
  await setup();
  draw();
})();