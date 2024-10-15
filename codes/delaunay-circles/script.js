/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
  
  https://en.wikipedia.org/wiki/Delaunay_triangulation
  
  https://en.wikipedia.org/wiki/Bowyer%E2%80%93Watson_algorithm
  
  https://en.wikipedia.org/wiki/Circumscribed_circle
*/

class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  vertexes() {
    return [this.a, this.b, this.c];
  }

  edges() {
    return [
    [this.a, this.b],
    [this.b, this.c],
    [this.c, this.a]];

  }

  sharesAVertexWith(triangle) {
    // TODO: optimize me please!
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let v = this.vertexes()[i];
        let vv = triangle.vertexes()[j];
        if (v.equals(vv)) {
          return true;
        }
      }
    }
    return false;
  }

  hasEdge(edge) {
    for (let i = 0; i < 3; i++) {
      let e = this.edges()[i];
      if (e[0].equals(edge[0]) && e[1].equals(edge[1]) ||
      e[1].equals(edge[0]) && e[0].equals(edge[1])) {
        return true;
      }
    }
    return false;
  }

  circumcenter() {
    let d = 2 * (this.a.x * (this.b.y - this.c.y) +
    this.b.x * (this.c.y - this.a.y) +
    this.c.x * (this.a.y - this.b.y));

    let x = 1 / d * ((this.a.x * this.a.x + this.a.y * this.a.y) * (this.b.y - this.c.y) +
    (this.b.x * this.b.x + this.b.y * this.b.y) * (this.c.y - this.a.y) +
    (this.c.x * this.c.x + this.c.y * this.c.y) * (this.a.y - this.b.y));

    let y = 1 / d * ((this.a.x * this.a.x + this.a.y * this.a.y) * (this.c.x - this.b.x) +
    (this.b.x * this.b.x + this.b.y * this.b.y) * (this.a.x - this.c.x) +
    (this.c.x * this.c.x + this.c.y * this.c.y) * (this.b.x - this.a.x));

    return new Vector(x, y);
  }

  circumradius() {
    return this.circumcenter().sub(this.a).getLength();
  }

  pointIsInsideCircumcircle(point) {
    let circumcenter = this.circumcenter();

    let circumradius = circumcenter.sub(this.a).getLength();

    let dist = point.sub(circumcenter).getLength();

    return dist < circumradius;
  }

  draw() {
    ctx.strokeStyle = "gray";
    ctx.fillStyle = getRandomColor();
    ctx.beginPath();
    ctx.lineTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.lineTo(this.c.x, this.c.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }}


let canvas;
let ctx;
let w, h;
let colors;
let colorSchemeIndex;

function setup() {
  setupColors();
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
  canvas.addEventListener("click", draw);
}

function setupColors() {
  colors = [
  [
  "#3a405a",
  "#f9dec9",
  "#99b2dd",
  "#e9afa3",
  "#685044"],

  [
  "#002626",
  "#0e4749",
  "#95c623",
  "#e55812",
  "#efe7da"],

  [
  "#231942",
  "#5e548e",
  "#9f86c0",
  "#be95c4",
  "#e0b1cb"],

  [
  "#64a6bd",
  "#90a8c3",
  "#ada7c9",
  "#d7b9d5",
  "#f4cae0"],

  [
  "#ddd8c4",
  "#a3c9a8",
  "#84b59f",
  "#69a297",
  "#50808e"],

  [
  "#250902",
  "#38040e",
  "#640d14",
  "#800e13",
  "#ad2831"],

  [
  "#faa275",
  "#ff8c61",
  "#ce6a85",
  "#985277",
  "#5c374c"]];


}

function getRandomColor() {
  let len = colors[colorSchemeIndex].length;
  let randomIndex = Math.floor(Math.random() * len);
  return colors[colorSchemeIndex][randomIndex];
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  draw();
}

function getRandomPoints() {
  let pointList = [];
  let nrOfCircles = Math.random() * 3 + 2;
  for (let c = 0; c < nrOfCircles; c++) {
    let r = Math.random() * Math.min(w, h) * 0.4 + 20;
    let centerX = w / 2 + (Math.random() - 0.5) * 40;
    let centerY = h / 2 + (Math.random() - 0.5) * 40;
    let nrOfPoints = Math.random() * 10 + 10;
    for (let i = 0; i < nrOfPoints; i++) {
      let angle = Math.random() * Math.PI * 2;
      let x = Math.cos(angle) * r + centerX;
      let y = Math.sin(angle) * r + centerY;
      pointList.push(new Vector(x, y));
    }
  }

  return pointList;
}

function bowyerWatson(superTriangle, pointList) {
  // pointList is a set of coordinates defining the 
  // points to be triangulated
  let triangulation = [];

  // add super-triangle to triangulation 
  // must be large enough to completely contain all 
  // the points in pointList
  triangulation.push(superTriangle);

  // add all the points one at a time to the triangulation
  pointList.forEach(point => {
    let badTriangles = [];

    // first find all the triangles that are no 
    // longer valid due to the insertion
    triangulation.forEach(triangle => {
      if (triangle.pointIsInsideCircumcircle(point)) {
        badTriangles.push(triangle);
      }
    });
    let polygon = [];

    // find the boundary of the polygonal hole
    badTriangles.forEach(triangle => {
      triangle.edges().forEach(edge => {
        let edgeIsShared = false;
        badTriangles.forEach(otherTriangle => {
          if (triangle !== otherTriangle && otherTriangle.hasEdge(edge)) {
            edgeIsShared = true;
          }
        });
        if (!edgeIsShared) {
          //edge is not shared by any other 
          // triangles in badTriangles
          polygon.push(edge);
        }
      });
    });

    // remove them from the data structure
    badTriangles.forEach(triangle => {
      let index = triangulation.indexOf(triangle);
      if (index > -1) {
        triangulation.splice(index, 1);
      }
    });

    // re-triangulate the polygonal hole
    polygon.forEach(edge => {
      //form a triangle from edge to point
      let newTri = new Triangle(edge[0], edge[1], point);
      triangulation.push(newTri);
    });
  });

  // done inserting points, now clean up
  let i = triangulation.length;
  while (i--) {
    let triangle = triangulation[i];
    if (triangle.sharesAVertexWith(superTriangle)) {
      //remove triangle from triangulation
      let index = triangulation.indexOf(triangle);
      if (index > -1) {
        triangulation.splice(index, 1);
      }
    }
  }

  return triangulation;
}

function draw() {
  let nrOfColorSchemes = colors.length;
  colorSchemeIndex = Math.floor(Math.random() * nrOfColorSchemes);
  ctx.fillStyle = getRandomColor();
  ctx.fillRect(0, 0, w, h);

  let superTriangle = new Triangle(
  new Vector(-w * 10, h * 10),
  new Vector(w * 10, h * 10),
  new Vector(w / 2, -h * 10));


  let pointList = getRandomPoints();
  let triangles = bowyerWatson(superTriangle, pointList);
  triangles.forEach(t => t.draw());
}

setup();