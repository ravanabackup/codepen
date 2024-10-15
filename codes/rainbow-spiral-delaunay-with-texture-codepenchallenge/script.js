/*
  Johan Karlsson, 2020
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
      [this.c, this.a]
    ];
  }
  
  sharesAVertexWith(triangle) {
    // TODO: optimize me please!
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        let v = this.vertexes()[i];
        let vv = triangle.vertexes()[j];
        if(v.equals(vv)) {
          return true;
        }
      }
    }
    return false;
  }

  hasEdge(edge) {
    for(let i = 0; i < 3; i++) {
      let e = this.edges()[i];
      if(e[0].equals(edge[0]) && e[1].equals(edge[1]) || 
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
    let c = this.circumcenter();
    ctx.save();
    let color = getColor(this.a, this.b)
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    
    ctx.beginPath();
    ctx.lineTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.lineTo(this.c.x, this.c.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    if(image) {
      ctx.clip();
      ctx.translate(c.x, c.y);
      let angle = Math.random() * Math.PI * 2;
      ctx.rotate(angle);
      let leftMargin = -image.width / 2;
      let topMargin = -image.height / 2;
      ctx.globalAlpha = 0.07;
      ctx.drawImage(image, leftMargin, topMargin); 
    }
    ctx.restore();
  }
}

let canvas;
let ctx;
let w, h;
let simplex;
let zoom;
let image;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", () => {
    reset();
    draw();
  });
  canvas.addEventListener("click", draw);
  loadImage().then(img => {
    image = img;
    draw();
  });
}

function getColor(vec1, vec2) {
  let n = (simplex.noise2D(vec1.x / zoom, vec1.y / zoom) + 1) * 0.5;
  let hue = 360 * n;
  
  var gradient = ctx.createLinearGradient(vec1.x, vec1.y, vec2.x, vec2.y);
  let color1= `hsl(${hue}, 70%, 50%)`;
  let color2= `hsl(${hue + 90}, 70%, 50%)`;
  
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  return gradient;
}

function loadImage() {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.crossOrigin = "anonymous";
    // Sand image from:
    // https://www.merckgroup.com/en/products/pm/117237.html
    image.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/254249/sand1.jpg";
    image.onload = () => {
      resolve(image);
    };
    image.onerror = error => {
      reject(error.srcElement.src);
    }
  });
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function getRandomPoints() {
  let extra = 40;
  let pointList = [
    new Vector(-extra, -extra),
    new Vector(-extra, h + extra),
    new Vector(w + extra, -extra),
    new Vector(w + extra, h + extra)
  ];
  
  let rStep = Math.random()*2 + 0.5;
  let aStep = Math.random() / 2 + 0.05;
  let r = 1;
  let angle = 0;
  let cx = w / 2;
  let cy = h / 2;
  for(let i = 0; i < 1500; i++) {
    let x = Math.cos(angle) * r;
    let y = Math.sin(angle) * r;
    pointList.push(new Vector(x + cx, y + cy));
    r += rStep;
    angle += aStep;
  }
  return pointList;
}

function bowyerWatson (superTriangle, pointList) {
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
      if(triangle.pointIsInsideCircumcircle(point)) {
        badTriangles.push(triangle); 
      }
    });
    let polygon = [];
    
    // find the boundary of the polygonal hole
    badTriangles.forEach(triangle => {
      triangle.edges().forEach(edge => {
        let edgeIsShared = false;
        badTriangles.forEach(otherTriangle => {
          if(triangle !== otherTriangle &&  otherTriangle.hasEdge(edge)) {
            edgeIsShared = true;
          }
        });
        if(!edgeIsShared) {
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
  while(i--) {
    let triangle = triangulation[i];
    if(triangle.sharesAVertexWith(superTriangle)) {
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
  simplex = new SimplexNoise();
  zoom = Math.random() * 1000 + 400;
  
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  
  let superTriangle = new Triangle(
    new Vector(-w * 10, h * 10),
    new Vector(w * 10, h * 10),
    new Vector(w / 2, -h * 10)
  );
  
  let pointList = getRandomPoints();
  let triangles = bowyerWatson(superTriangle, pointList);
  triangles.forEach(t => t.draw());
}

setup();