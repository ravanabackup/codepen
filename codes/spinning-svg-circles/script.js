/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

const svgNs = "http://www.w3.org/2000/svg";
let svg = document.querySelector("svg");

function drawCircle(x, y, r, width) {
  let circle = document.createElementNS(svgNs, "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r.toString());
  circle.setAttribute("stroke", "black");
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke-width", width.toString());
  circle.setAttribute("stroke-dasharray", getRandomDashArray());
  svg.appendChild(circle);
}

function getRandomDashArray() {
  let dashArray = [];
  let nrOfDashes = Math.random() * 6;
  for(let i = 0; i < nrOfDashes; i++) {
    let value = Math.round(Math.random() * 140 + 10);
    dashArray.push(value.toString());
  }
  return dashArray.join(" ");
}

function draw() {
  let width = 12;
  let nrOfCircles = 1000 / width / 2 - 4;
  for(let i = nrOfCircles; i > 0; i--) {
    let r = i * width;
    drawCircle(500, 500, r, width * 1.1);
  }
  logo = new Logo(950, 960);
  logo.draw(svg);
}
  
draw();