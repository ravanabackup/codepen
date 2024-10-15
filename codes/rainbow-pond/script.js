var howMany = 15,
  frms = 30;

var discs = [],
  cols = [];

var maxS = 0,
  incr = 0,
  diff = 0,
  colDiff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight-4);
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  noStroke();

  maxS = width * 1.7;
  diff = maxS / howMany;
  incr = maxS / howMany / frms;
  colDiff = 360.0/howMany;

  for (var i = 0; i < howMany; i++) {
    var sz = map(i, 0, howMany, maxS, 0);
    append(discs, sz);
    append(cols, colDiff * i);
  }
}

function draw() {
  //background(colors[colors.length - 1]);

  push();
  translate(width / 2, height / 2);
  rotate(radians(45));

  for (var i = 0; i < discs.length; i++) {
    if (discs[i] > maxS) {
      append(cols, (cols[(discs.length - 1)] + colDiff)% 360);
      cols.splice(0, 1);
      discs.splice(0, 1);
      append(discs, 0);
    }
    var sz = discs[i];
    fill(cols[i],90,90);
    ellipse(0, 0, sz, sz);
    discs[i] += incr;
    //discs[i] += map(mouseX, 0, width, 0, 10);

  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-4);
}