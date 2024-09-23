//genuary2024 - skeumorphism ;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  strokeCap(SQUARE);
  c1 = random(200, 255);
  c2 = random(200, 255);
  c3 = random(200, 255);
}

function draw() {
  background(c1 - 200, c2 - 200, c3 - 200);

  strokeWeight(6);
  translate(width / 2, height / 2);
  t = frameCount / 6;
  push();
  rotate(-PI / 2);
  gearCircle(240, 50, 500, 33, 24, 10, 0);
  strokeWeight(2);
  gearCircle(180, 10, 255, 9, 60, 10, 1);
  strokeWeight(2);
  gearCircle(150, 8, 245, 7, 60, 10, 2);
  pop();

  border();
}

function gearCircle(r1, r2, d1, d2, nRot, ngears, mode) {
  for (let i = 0; i < nRot; i++) {
    if (
      (mode === 0 && i === hour()) ||
      (mode === 1 && i === minute()) ||
      (mode === 2 && i === second())
    ) {
      color1 = 255;
      color3 = color(255, 255, 255, 40 - mode * 15);
    } else {
      color1 = [c1 - 180, c2 - 180, c3 - 180];
      color3 = color(c1 - 180, c2 - 180, c3 - 100, 10);
    }
    for (let j = 0; j < ngears / 2; j++) {
      if (i % 2 === 0) {
        dt = t / 100;
      } else {
        dt = -t / 100 + TAU / ngears / 2;
      }

      push();
      translate(r1 * cos((i * TAU) / nRot), r1 * sin((i * TAU) / nRot));
      // translate(r,0)
      rotate((j * TAU) / (ngears / 2) + dt);
      stroke(color3);
      line(-d1 * 4, 0, d1 * 4, 0);
      stroke(color1);
      line(-d2, 0, d2, 0);
      pop();
    }
  }
  for (let i = 0; i < nRot; i++) {
    if (
      (mode === 0 && i === hour()) ||
      (mode === 1 && i === minute()) ||
      (mode === 2 && i === second())
    ) {
      a = 255;
      b = 255;
      c = 255;
    } else {
      a = c1 - 100;
      b = c2 - 100;
      c = c3 - 100;
    }
    noStroke();
    for (let k = 20; k > 0; k--) {
      push();
      fill(a - k * 4, b - k * 4, c - k * 4);
      translate(r1 * cos((i * TAU) / nRot), r1 * sin((i * TAU) / nRot));
      circle(0, 0, (r2 / 20) * k);
      pop();
    }
  }
}

function border() {
  noFill();
  stroke(c1 - 20, c2 - 20, c3 - 20);
  strokeWeight(4);
  rect(0, 0, width - 20, height - 20);
}

function mousePressed() {
  setup();
  draw();
}