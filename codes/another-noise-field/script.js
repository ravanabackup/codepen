const points = []
const n = 6000
let t = 0
let cc;

function setup() {
	const s = min(windowWidth, windowHeight)
  createCanvas(s,s)
  cc = {
    x: s * 0.5,
    y: s * 0.5
  };
  for (i = 0; i < n; i++) {
    points[i] = {
      x: random(s*0.1, s*0.9),
      y: random(s*0.1, s*0.9)
    };
  }
  background(0);
}

function draw() {
  strokeWeight(0.9)
  stroke(255, t);
	const noiseOffset = 0.01 + ((t/8000)%100)/300;
  for (let p of points) {
    let n = (noise(p.x * noiseOffset, p.y * noiseOffset) * TWO_PI * 1.2) % TWO_PI
    let a = getAngleBetweenPts(p, cc)
    let d = ptDist(p, cc) / min(width, height)
    //n = sin(d) * a - n * 0.5
    //m = sin(d * a * 3 * TWO_PI) * 6;
    //m = 2 + d * 4; //lerp(d, 0, 5)
    //m = sin(3 * a * TWO_PI) * 3 + 3
    m = 3 * sin(1.5 * d * PI)
		
    //n = TWO_PI / m * round( n / TWO_PI * m) + a;
    n = stepVal(n, m / TWO_PI) - stepVal(a, 5 / TWO_PI)
    n = n + a

    p.x += cos(n);
    p.y += sin(n);
    point(p.x, p.y)
  }
  t++;
}

function getAngleBetweenPts(pt1, pt2) {
  return atan2(pt2.y - pt1.y, pt2.x - pt1.x);
}

function ptDist(pt1, pt2) {
  return dist(pt1.x, pt1.y, pt2.x, pt2.y)
}

function stepVal(val, steps){
	return round(val * steps)/steps
}