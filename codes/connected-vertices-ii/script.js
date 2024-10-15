var p1, p2, v;
var vertices = [];
var num = 150,
  d = 100,
  maxDist = 20,
  minDist = 20, counter = 100;

function setup() {
  createCanvas(windowWidth, windowHeight-4);
  for (var i = 0; i < num; i++) {
    var x = width / 2 + sin(TWO_PI / num * i) * d;
    var y = height / 2 + cos(TWO_PI / num * i) * d;
    vertices[i] = createVector(x, y);
  }
  setShadow(5,5,10,"rgba(0,0,0,0.55)");
}

function draw() {
  background(238);
  var r = 1;
  beginShape();
  fill(225, 76, 69);
  stroke(34);
  strokeWeight(8);
  for (var i = 0; i < vertices.length; i++) {

    vertices[i].x += random(-r, r);
    vertices[i].y += random(-r, r);
    var next = (i + 1) % num;
    vertices[next].x += random(-r, r);
    vertices[next].y += random(-r, r);

    // always keep same distance to next vertex

    v = p5.Vector.sub(vertices[next], vertices[i]);
    v.normalize();
    v.setMag(maxDist);
    vertices[next] = p5.Vector.add(vertices[i], v);

    //keep minimum distance between all vertices

    for (var j = 0; j < vertices.length; j++) {
      if (j != i) {
        var d = p5.Vector.dist(vertices[i], vertices[j]);
        if (d < minDist) {
          var temp = p5.Vector.sub(vertices[i], vertices[j]);
          temp.normalize();
          temp.setMag(minDist);
          vertices[i] = p5.Vector.add(vertices[j], temp);
        }
      }
    }
    vertex(vertices[i].x, vertices[i].y);

  // makes angles less sharp

    var i2 = i;
    if (i==0) i2 = num;
    var a = vertices[(i2 - 1) % num];
    var b = vertices[i];
    var c = vertices[(i + 1) % num];

    var AB = p5.Vector.sub(b, a);
    var BC = p5.Vector.sub(c, b);

    var angle2 = acos(p5.Vector.dot(AB, BC) / (AB.mag() * BC.mag()));

    //println(angle2);

    if (angle2 > 2.5) {
      var tx = (a.x + b.x + c.x) / 3;
      var ty = (a.y + b.y + c.y) / 3;
      b.x = tx;
      b.y = ty;
    }
  }

  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-4);
}

function setShadow(x,y,b,c) {
    drawingContext.shadowBlur = b;
    drawingContext.shadowColor = c;
    drawingContext.shadowOffsetX = x;
    drawingContext.shadowOffSetY = y;
}