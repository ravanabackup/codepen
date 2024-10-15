/*
  Johan Karlsson, 2021
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

  get circumcenter() {
    if (!this._circumcenter) {
      let d = 2 * (this.a.x * (this.b.y - this.c.y) +
      this.b.x * (this.c.y - this.a.y) +
      this.c.x * (this.a.y - this.b.y));

      let x = 1 / d * ((this.a.x * this.a.x + this.a.y * this.a.y) * (this.b.y - this.c.y) +
      (this.b.x * this.b.x + this.b.y * this.b.y) * (this.c.y - this.a.y) +
      (this.c.x * this.c.x + this.c.y * this.c.y) * (this.a.y - this.b.y));

      let y = 1 / d * ((this.a.x * this.a.x + this.a.y * this.a.y) * (this.c.x - this.b.x) +
      (this.b.x * this.b.x + this.b.y * this.b.y) * (this.a.x - this.c.x) +
      (this.c.x * this.c.x + this.c.y * this.c.y) * (this.b.x - this.a.x));
      this._circumcenter = new Vector(x, y);
    }

    return this._circumcenter;

  }

  get centroid() {
    if (!this._centroid) {
      this._centroid = this.a.add(this.b).add(this.c).div(3);
    }
    return this._centroid;
  }

  get circumradius() {
    if (!this._circumradius) {
      this._circumradius = this.circumcenter().sub(this.a).getLength();
    }
    return this._circumradius;
  }

  pointIsInsideCircumcircle(point) {
    let circumradius = this.circumcenter.sub(this.a).getLength();

    let dist = point.sub(this.circumcenter).getLength();

    return dist < circumradius;
  }

  draw(now) {
    let phaseOffset = this.centroid.sub(center).getLength() / w * 2;
    let m = (Math.sin(now / 1800 + phaseOffset) + 1) * 0.48;
    let a = this.a.lerp(this.centroid, m);
    let b = this.b.lerp(this.centroid, m);
    let c = this.c.lerp(this.centroid, m);

    ctx.beginPath();

    ctx.lineTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }}


let canvas;
let ctx;
let w, h;
let triangles;
let center;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", () => {
    reset();
    setupTriangles();
  });
  canvas.addEventListener("click", setupTriangles);
  reset();
  setupTriangles();
}

function setupTriangles() {
  let superTriangle = new Triangle(
  new Vector(-w * 10, h * 10),
  new Vector(w * 10, h * 10),
  new Vector(w / 2, -h * 10));


  let pointList = getRandomPoints();
  triangles = bowyerWatson(superTriangle, pointList);
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  //ctx.lineCap = "round";
  //ctx.lineJoin = "round";
  center = new Vector(w / 2, h / 2);
}

function getRandomPoints() {
  let extra = 50;

  let pointList = [
  new Vector(-extra, -extra),
  new Vector(-extra, h + extra),
  new Vector(w + extra, -extra),
  new Vector(w + extra, h + extra)];


  let delimiter = Math.random() * 5000 + 300;
  let nrOfPoints = w * h / delimiter;
  for (let i = 0; i < nrOfPoints; i++) {
    pointList.push(new Vector(
    Math.random() * (w + extra * 2) - extra,
    Math.random() * (h + extra * 2) - extra));

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

function draw(now) {
  requestAnimationFrame(draw);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  ctx.lineWidth = 2;
  triangles.forEach(t => t.draw(now));
}

setup();
draw(performance.now());