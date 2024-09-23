// created for proccessing.org's decade of code fundraiser: https://donorbox.org/to-the-power-of-10

//merge of mathober day 19 and Ancient with wallpaper sized comments you can change to

//entire canvas is not visible
//press "s" to save after clicking into canvas, click to change
let nPolygons = 5;
let polygons;

function setup() {
  nPolygons = int(random(4, 40));
  // cnv = createCanvas(1080, 1920); //uncomment for phonesize
  //cnv = createCanvas(3840, 2160);//uncomment and swap for 4K size
  cnv = createCanvas(windowWidth, windowHeight); //comment out when switching to other sizes
  c = max(windowWidth, windowHeight);
  noStroke();
  noLoop();
  background(0);
  polygons = [];
  for (let i = 0; i < nPolygons; i++) {
    tmp = int(random(4, 25));
    polygons[i] = createVector(
      tmp,
      int(random(2, tmp - 2)),
      random(2, width / 3)
    );
  }
}
function draw() {
  push();
  translate(c / 2, c / 2);
  sc = random(0.3, 1);
  scale(sc, sc); //variety of zoom
  angleMode(RADIANS);
  rotate(random(-PI, PI)); //variety in angle
  nebula(random(10, 255), random(10, 255), random(10, 255), 3, 6); //dominant color
  stars(); //dots in the sky
  nebula(200, 200, 200, 7, 205); //not a nebula
  nebula(0, 200, 250, 22, 205); //not a nebula
  nebula(250, 100, 250, 25, 205); //not a nebula
  for (let i = 0; i < floor(random(0, 3.1)); i++) {
    cluster(); //not a cluster, but is a cluster
  }
  g = max(10, c / 12);
  for (let i = 0; i < int(random(5, g)); i++) {
    push();
    translate((c / 3) * randomGaussian(), (c / 3) * randomGaussian());
    scale(random(0.5, 1), random(0.5, 1));
    rotate(random(-PI / 4, PI / 4));
    nebula(random(100, 255), random(100, 255), random(100, 255), 15, 100); //not a nebula
    pop();
  }
  pop();

  strokeWeight(0.5);
  fill(255);
  push();
  translate(width / 2, height / 2);
  if (width > height) {
    scale(0.5);
  } else {
    strokeWeight(0.3);
  }
  g = min(400, width / 6);
  for (let i = 1; i < g; i += 1.5) {
    fill(255, 255, 255, i / 100);

    circle(
      0,
      0,
      404 - i + random(g + 2 - i, ((g + 2 - i) * (g + 2 - i)) / 100)
    );
    if (i % 10 === 0) {
      fill(random(200, 255), random(200, 255), random(200, 255), random(3, 10));
      circle(
        randomGaussian(0, width / 2),
        randomGaussian(0, height / 2),
        randomGaussian(20, min(width / 4, 600))
      );
    }
  }
  fill(255);
  circle(0, 0, 2);
  t1 = 0;
  for (let i = 0; i < polygons.length; i++) {
    noFill();
    stroke(
      100 + polygons[i].x * 5,
      150 + polygons[i].x * 10,
      200 + polygons[i].x * 12
    );
    rotate((t1 * polygons[i].y) / 3);
    polygonDraw(i);
  }
  pop();
  scale(random(0.5, 1), random(0.5, 1));
}
//these not nebulas are created with transparent circles
function nebula(r1, b1, g1, s, a) {
  //s is a scaling factor for each not a nebula
  a = a + c / 2000; //because "a" is super descriptive for alpha factor
  n = 8300 + int(c / 3); //change n based on screen size
  p = c / 1500;
  cr = 20; //jiggle in color
  for (let i = 0; i < n; i++) {
    fill(
      r1 + random(cr),
      g1 + random(cr),
      b1 + random(cr),
      abs(randomGaussian()) / 3.9
    );
    circle(
      -c / 2 + (c / 2) * randomGaussian(),
      (c * randomGaussian()) / s,
      randomGaussian(c / 100, c / s + c / 40)
    );
    fill(255, 255, 255, (a * randomGaussian()) / 2);
    circle(
      -c / 2 + (c / 2) * randomGaussian(),
      (c * randomGaussian()) / s,
      p * randomGaussian()
    );
    circle(
      -c / 2 + (c / 2) * randomGaussian(),
      (c * randomGaussian()) / s,
      (p * randomGaussian()) / 2
    );
  }
}

function stars() {
  n = c * 4;
  for (let i = 0; i < n; i++) {
    fill(255, 255, 255, abs(255 * randomGaussian()));
    circle(
      -c / 2 + (c / 2) * randomGaussian(),
      c *
        randomGaussian() *
        randomGaussian() *
        randomGaussian() *
        randomGaussian(),
      0.5 * randomGaussian()
    );
    circle(
      -c / 2 + (c / 2) * randomGaussian(),
      c *
        randomGaussian() *
        randomGaussian() *
        randomGaussian() *
        randomGaussian(),
      0.5 * randomGaussian()
    );
  }
}

function mousePressed() {
  background(0, 0, 0, 250);
  setup();
  draw();
}

function keyPressed() {
  if (keyCode === 83) {
    save(cnv, "Galactic", "png");
  }
}

function cluster() {
  push();
  translate(random(-c / 2, c / 2), random(-c / 20, c / 20));
  nebula(random(100, 255), random(100, 255), random(100, 255), 29, 100);

  for (let i = 1; i < 40; i++) {
    fill(255, 255, 255, i / 2);
    circle(0, 0, 42 - i);
  }

  scale(0.05, 0.05);
  nebula(random(100, 255), random(100, 255), random(100, 255), 10, 2);
  nebula(255, 255, 255, 2, 2);
  stars();
  pop();
}

function windowResized() {
  setup();
  draw();
}

function polygonDraw(n) {
  p = [];
  angle = 360 / polygons[n].x;
  angleMode(DEGREES);
  beginShape();
  for (let i = 0; i <= polygons[n].x; i++) {
    p[i] = createVector(
      polygons[n].z * cos(angle * i),
      polygons[n].z * sin(angle * i)
    );

    vertex(p[i].x, p[i].y);
  }
  s = floor(polygons[n].x / polygons[n].y);
  for (let i = 0; i < polygons[n].x - polygons[n].y; i++) {
    line(p[i].x, p[i].y, p[i + polygons[n].y].x, p[i + polygons[n].y].y);
  }
  endShape();
}