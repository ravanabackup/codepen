/*
  Johan Karlsson (DonKarlssonSan) 
*/
var tick;
var r;
var d;
var backgroundImage;
var points;
var textsize;

function setup() {
  textsize = 32;
  tick = 0;
  r = 50;
  d = 2 * r;
  points = [];

  for (var x = 0; x < 5; x++) {
    points[x] = [];
    for (var y = 0; y < 5; y++) {
      points[x][y] = {
        x: 0,
        y: 0 };

    }
  }

  createCanvas(700, 700);
  textSize(textsize);

  backgroundImage = createGraphics(700, 700);
  backgroundImage.noStroke();
}

function drawCirc(x0, y0, speed) {
  var x1 = cos(tick * speed) * r;
  var y1 = sin(tick * speed) * r;
  ellipse(x0, y0, d, d);
  var w = textWidth(speed);
  text(speed, x0 - w / 2, y0 + textsize / 3);
  var x2 = x0 + x1;
  var y2 = y0 + y1;
  ellipse(x2, y2, 4, 4);
  if (speed % 2 == 0) {
    line(x2, y2, 650, y2);
    for (var x = 0; x < 5; x++) {
      points[x][speed / 2 - 1].y = y2;
    }
  } else {
    line(x2, y2, x2, 50);
    for (var y = 0; y < 5; y++) {
      points[(speed - 1) / 2][y].x = x2;
    }
  }
}

function drawPoints() {
  for (var x = 0; x < 5; x++) {
    for (var y = 0; y < 5; y++) {
      var p = points[x][y];
      backgroundImage.rect(p.x, p.y, 1, 1);
      backgroundImage.fill(0);
      //backgroundImage.stroke(0);
      //backgroundImage.point(p.x, p.y);
    }
  }
}

function draw() {
  background(255);

  image(backgroundImage, 0, 0);
  for (var i = 1; i < 6; i++) {
    drawCirc(100, 100 * i, 12 - 2 * i);
    drawCirc(100 + 100 * i, 600, i * 2 - 1);
  }

  drawPoints();

  tick += 0.0051;
}