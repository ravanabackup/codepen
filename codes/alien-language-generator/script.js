var outerCell, innerCell;
var r, sz, unit;
var bg = 238;

function setup() {
  createCanvas(windowWidth, windowHeight-4);
  strokeWeight(3);
  stroke(66);
  fill(bg);
  r = .3;
  sz = 10
  outerCell = 75;
  innerCell = outerCell * .4;
  unit = innerCell / 2;
  initStuff();
}

function draw() {

}

function drawPatternA(x, y) {

  if (random(1) > r) {
    strokeCap(SQUARE);
  } else {
    strokeCap(PROJECT);
  }

  push();
  translate(x, y);

  // triangles
  //triangles();

  //cross
  cross();

  //center: square and circle(s) or arc(s)
  centerSymbol();

  //circle(s) or triangle(s) at edges
  symbolsAtEdges();

  pop();
}

function triangles() {
  var unit3 = unit * .35;
  for (var i = 0; i < 8; i++) {
    push();
    rotate(radians(45) * i);
    push();
    translate(-unit * 1.5, 0);
    if (random(1) > r + .3) triangle(-unit3, 0, unit3, -unit3, unit3, unit3);
    pop();
    pop();
  }
}

function cross() {
  if (random(1) > r) {
    if (random(1) > r) line(-unit, 0, unit, 0);
    if (random(1) > r) line(0, -unit, 0, unit);
  } else {
    if (random(1) > r) line(-unit, -unit, unit, unit);
    if (random(1) > r) line(-unit, unit, unit, -unit);
  }
}

function centerSymbol() {
  //center: square and circle(s) or arc(s)
  if (random(1) > r) {
    if (random(1) > r + .2) {
      rectMode(CENTER);
      if (random(1) > r) rectMode(CORNER);
      push();
      //rotate(floor(random(4))*HALF_PI);
      rect(0, 0, sz * 2, sz * 2);
      pop();
    } else {
      var unit2 = unit * 2.75;
      if (random(1) > r) {
        if (random(1) > r + .3) ellipse(0, 0, unit2, unit2);
        if (random(1) > r) ellipse(0, 0, unit2 * .66, unit2 * .66);
      } else {
        noFill();
        for (var i = 0; i < 4; i++) {
          var start = i * HALF_PI;
          if (random(1) > r) arc(0, 0, unit2, unit2, start, start + HALF_PI);
        }
        fill(bg);
      }
    }
  }
}

function symbolsAtEdges() {
  //circle(s) or triangle(s) at edges
  if (random(1) > r) ellipse(0, 0, sz, sz);
  var unit3 = unit * .35;
  for (var i = 0; i < 4; i++) {
    //push();
    rotate(i * HALF_PI);
    if (random(1) > r + .3) {
      if (random(1) > r) {
        ellipse(-unit * 1.4, 0, sz, sz);
      } else {
        push();
        translate(-unit * 1.5, 0);
        if (random(1) > r + .3) triangle(-unit3, 0, unit3, -unit3, unit3, unit3);
        pop();
      }
    }
  }
}

function initStuff() {
  background(bg);
  strokeWeight(3);
  stroke(66);
  for (var x = outerCell / 2; x < width; x += outerCell) {
    for (var y = outerCell / 2; y < height; y += outerCell) {
      drawPatternA(x, y);
    }
  }
}

function mouseReleased() {
  initStuff();
}

function keyTyped() {
  if (key === 's') save(random(123) + '.png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-4);
  initStuff();
}