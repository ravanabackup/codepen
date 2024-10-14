let p1 = "4D3D3D-D4AE6C-E0CBB2-CB6B74-6B4249".split("-").map((c) => "#" + c);
let p2 = "e7f2f8-74bdcb-ffa384-efe7bc".split("-").map((c) => "#" + c);
let p3 = "8490B0-454C68-323446-C86D43-DBD0C8".split("-").map((c) => "#" + c);
let p4 = "A8E6CF-DCEDC1-FFD3B6-FFAAA5-FF8B94".split("-").map((c) => "#" + c);
let p5 = "DBF4F0-FFCCCB-EEEBE2-C7EDDC-7FB9BC".split("-").map((c) => "#" + c);

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  dpr: 1,
  seed: 2120,
  size: 200,
  palette: [...p3],
  numX: 1,
  numY: 1,
  animate: true,
};

let shapes = [];

function setup() {
  if (config.seed > 0) {
    randomSeed(config.seed);
  }
  doSetup();
}

function doSetup() {
  config.width = window.innerWidth;
  config.height = window.innerHeight;
  createCanvas(config.width, config.height);
  pixelDensity(config.dpr);
  noiseSeed(config.seed);
  config.numY = config.height / config.size;
  config.numX = config.width / config.size;
  shapes = [];

  let xoffset;
  for (let y = 0.65; y < config.numY - 0.5; y += 0.5) {
    xoffset = y % 1;
    for (let x = 0.5 + xoffset; x < config.numX - 0.7; x += 1) {
      shapes.push(createShape(x, y, config.size));
    }
  }
  draw();
}

function line2(x0, y0, x1, y1, a) {
  // some hash value for consistant randomness
  let h = round(sin(x0 * y1 * 21911 + y0 * 17.3 + x1 * 0.012) * 1000) / 1000;
  // (+/-) multiplier for pixel based offset
  let s = h > 0 ? -1 : 1;
  let s2 = abs(h) > 0.5 ? -1 : 1;
  //
  let r = abs(h) / 3 + 0.1;
  let rn = 1 - r;
  let r1 = (h / 2 + 0.5) / 3 + 0.1;
  let r1n = 1 - r1;

  //let r = random()
  beginShape();
  curveVertex(x0, y0);
  curveVertex(x0 - s / 2, y0 + s / 2);
  curveVertex(x0 * rn + x1 * r - a * s, y0 * rn + y1 * r + a * s2);
  curveVertex(x0 * r1 + x1 * r1n - a * s2, y0 * r1 + y1 * r1n);
  curveVertex(x1 + (a / 3) * s, y1);
  curveVertex(x1 - (a / 2) * s, y1 + (a / 2) * s);

  endShape();
}

function lines(x0, y0, x1, y1, x2, y2, x3, y3, n) {
  let dx01 = x1 - x0;
  let sx01 = dx01 / n;
  let dy01 = y1 - y0;
  let sy01 = dy01 / n;
  let dx23 = x3 - x2;
  let sx23 = dx23 / n;
  let dy23 = y3 - y2;
  let sy23 = dy23 / n;
  let $x0;
  let $y0;
  let $x1;
  let $y1;

  let io;

  for (let i = 0; i < n; i++) {
    io = i + 0.5;
    $x0 = x0 + io * sx01;
    $y0 = y0 + io * sy01;
    $x1 = x2 + io * sx23;
    $y1 = y2 + io * sy23;
    line2($x0, $y0, $x1, $y1, config.width * 0.0005);
    line2($x0, $y0, $x1, $y1, config.width * 0.0012);
  }
}

function createShape(x, y, size) {
  const shape = {
    x,
    y,
    size,
    ns: noise(x * 3, y * 30, 1), 
    n: noise(x * size * 30, y * size * 30, 100),
    n2: noise((x / size) * 1000, (y / size) * 1000, 20)
  };
  
  shape.updateNoise = (z) => {
    shape.n = noise(x * size * 30, y * size * 30, z);
    shape.n2 = noise((x / size) * 1000, (y / size) * 1000, z);
  }

  shape.draw = () => {
    let x = shape.x * shape.size + (config.width - shape.size * (config.numX - 0.2)) * 0.5;
    let y = shape.y * shape.size + (config.height - shape.size * (config.numY - 0.2)) * 0.5;
    let s = shape.size * 0.45;
    let c1 = config.palette[floor(config.palette.length * shape.n)];
    let c2 = config.palette[floor(config.palette.length * shape.n2 + 0.8) % config.palette.length];

    let pts1 = [
      [x, y - s],
      [x + s, y],
      [x, y + s],
      [x - s, y]
    ];

    s = shape.size * 0.39 - shape.size * shape.ns * 0.25;
    let pts2 = [
      [x, y - s],
      [x + s, y],
      [x, y + s],
      [x - s, y]
    ];

    stroke(c2);
    lines(
      pts1[0][0], pts1[0][1],
      pts2[0][0], pts2[0][1],
      pts1[1][0], pts1[1][1],
      pts2[1][0], pts2[1][1],
      2 + floor(shape.ns * 12)
    );
    lines(
      pts1[1][0], pts1[1][1],
      pts2[1][0], pts2[1][1],
      pts1[2][0], pts1[2][1],
      pts2[2][0], pts2[2][1],
      2 + floor(shape.ns * 12)
    );
    stroke(c1);
    lines(
      pts1[2][0], pts1[2][1],
      pts2[2][0], pts2[2][1],
      pts1[3][0], pts1[3][1],
      pts2[3][0], pts2[3][1],
      2 + floor(shape.ns * 12)
    );
    lines(
      pts1[3][0], pts1[3][1],
      pts2[3][0], pts2[3][1],
      pts1[0][0], pts1[0][1],
      pts2[0][0], pts2[0][1],
      2 + floor(shape.ns * 12)
    );
  };

  return shape;
}

let nZ = 0;
function draw() {
  background(29);
  
  nZ += 0.005;
  strokeWeight(0.98);
  stroke(230);
  noFill();

  shapes.forEach((s) => {
    s.updateNoise(nZ);
    s.draw();
  });
  
  config.animate || noLoop();
}

function windowResized() {
  doSetup();
}