window.addEventListener('resize', setup)

let C = {total:130, update:function(){}}
let R = {}

let firstrun = function() {
	//firstrun = function(){}
	//randomSeed(1)
  
  
  R.r1 = random() > 0.5
  R.r2 = random() > 0.3
  R.r3 = random() > 0.4
  
	R.n1 = random() > 0.8 ? 6 : 4
	R.n2 = random() > 0.9 ? 4 : 6
	R.s1 = random() > 0.7 ? 0.3 : 0.5
	R.s2 = random() > 0.7 ? 0.4 : 0.8
  
  switch (floor(random(0,3))) {
    case 0:
      R.palette = [
          color('#2b2d42').levels,
          color('#8d99ae').levels,
          color('#edf2f4').levels,
          color('#ef233c').levels,
          color('#ba1200').levels,
        ]
      break;
    case 1:
      R.palette = [
      		color('#272d2d').levels,
          color('#4fbac6').levels,
          color('#a7c4c7').levels,
          color('#ead758').levels,
          color('#e5dda4').levels,
        ]
      break;

    default:
      	R.palette = [
      		color('#efd2c2').levels,
          color('#a69cac').levels,
          color('#474973').levels,
          color('#161b33').levels,
          color('#0d0c1d').levels,
        ]
      break;
  }
  
  C.n = 0
  C.update = function() {
  	C.n = (C.n + 1) % C.total
    C.nNorm = C.n / C.total
    C.c = cos(C.nNorm * TWO_PI) * 0.5 + 0.5
    C.s = sin(C.nNorm * TWO_PI) * 0.5 + 0.5
    C.c2 = cos(C.nNorm * 2 * TWO_PI) * 0.5 + 0.5
    C.s2 = sin(C.nNorm * 2 * TWO_PI) * 0.5 + 0.5
    C.c3 = cos(C.nNorm * 3 * TWO_PI) * 0.5 + 0.5
    C.s3 = sin(C.nNorm * 3 * TWO_PI) * 0.5 + 0.5
  }
  
  C.update();
}

function setup() {
  firstrun()
  createCanvas(window.innerWidth, window.innerHeight)
  //noLoop()
  draw()
  
}

function draw() {
  C.update();
  background(R.palette[0])
  fill(130)
  let s = (height > width ? width : height) / 2;
  
  
  R.r1 && drawLines(
  	R.palette[1],
    R.n1,
    s * lerp(0.5, 0.7, pow(C.s2, 2)),
    s * lerp(0.6, 0.8, pow(C.s2, 2))
  )
  
  R.r2 && drawNgonA(
  	R.palette[1],
    R.n1,
    s * R.s1 * lerp(0.9, 1, C.c2),
    3,
    C.nNorm * TWO_PI / R.n1 // limit rotation to partial turn
  )
  
  R.r3 && drawNgonA(
  	R.palette[4],
    R.n1,
    s * R.s2 * lerp(0.94, 1, C.c),
    1,
    lerp(0, TWO_PI / R.n1, pow(C.s,6))
  )
 
  
  R.r1 && drawNgonB(
  	R.palette[2],
    R.n1,
    s * R.s2 * lerp(1, 0.6, pow(C.s2, 6)),
    s * R.s1 * 0.2
  )
  
  !R.r1 && drawNgonC(
  	R.palette[3],
    6,
    s * R.s1 * lerp(0.6, 1, C.s),
    s * R.s1 * 0.25,
    R.n2,
    C.nNorm * TWO_PI / R.n2
  )
  
  !R.r1 && drawNgonB(
    R.palette[2],
    R.n2, s * R.s2,
    s * 0.05 * lerp(0.5, 1, sin(pow(C.s,6) * PI)),
    s * R.s1 * 0.3
  )
  
  !R.r2 && drawLines(
  	R.palette[3],
    R.n1*2,
    s * R.s1 * 0.5 * lerp(1, 0.94, C.c),
    s * lerp(0.3, 0.5, pow(C.s2, 6))
  )
  
  R.r1 && drawNgonB(
    R.palette[2],
    R.n1,
    s * R.s2*1.2
  )
  
  R.r3 && drawTriangles(
  	R.palette[2],
    6,
    s * R.s2 * 0.8 * lerp(0.5, 1, cos(C.s * PI)),
    -s * 0.08 * lerp(0.5, 1, pow(C.s,3))
  )
}

function drawLines(col, n, a, b) {
  push()
  noFill()
  stroke(col)
  strokeWeight(3)
  translate(width / 2, height / 2)
  beginShape()
  for (let i = 0; i < n; i++) {
    rotate(TWO_PI / n)
    line(
    	0, a,
      0, b
    )
  }
  endShape()
  pop()
}

function drawNgonA(col, numPoints, size, numNgons, rotateAmt) {
  if(numNgons === undefined) numNgons = 1;
  
  push()
  noFill()
  strokeWeight(3)
  stroke(col)
  translate(width / 2, height / 2)
  
  if(rotateAmt !== undefined) rotate(rotateAmt);
  
  for (let i = 0; i < numNgons; i++) {
  	rotate(TWO_PI / numNgons / numPoints)
  	utilNgon(numPoints, size)
  }
  pop()
}

function drawNgonB(col, numPoints, offset, size, rotateAmt) {
  push()
  noFill()
  strokeWeight(3)
  stroke(col)
  translate(width / 2, height / 2)
  if(rotateAmt !== undefined) {rotate(rotateAmt)}
  
  for (let i = 0; i < numPoints; i++) {
  	push()
  	translate(0, offset)
    utilNgon(numPoints, size)
  	pop()
    rotate(TWO_PI / numPoints )
  }
  pop()
}

function drawNgonC(col, n, a, b, p, rotateAmt) {
  push()
  noStroke()
  fill(col)
  translate(width / 2, height / 2)
  if(rotateAmt !== undefined) {rotate(rotateAmt)}
  else {rotate(PI / 2)}
  
  for (let i = 0; i < p; i++) {
  	push()
  	translate(0, a)
    utilNgon(n, b)
  	pop()
    rotate(TWO_PI / p )
  }
  pop()
}

function drawTriangles(col, n, a, s) {
  push()
  translate(width / 2, height / 2)
  fill(col)
  noStroke()
  for (let i = 0; i < n; i++) {
    rotate(TWO_PI / n)
    push()
    translate(a, 0)
		utilNgon(3, s)
    pop()
  }
  pop()
}

function utilNgon(n, r){
  beginShape()
  let angle = TWO_PI / n
  for (let i = 0; i <= n; i++) {
    vertex(
      cos(i * angle) * r,
      sin(i * angle) * r,
    )
  }
  endShape()
}