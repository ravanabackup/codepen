"use strict";

window.addEventListener("load",function() {

  const SIDE_MIN = 50;
  const SIDE_MAX = 50;
  const STEP_TIME = 100; // ms

  let canv, ctx;    // canvas and context
  let maxx, maxy;   // canvas dimensions
  let offsx, offsy; // offset for centering of vertices
  let sideLength, ballStep;
  let nbx, nby;     // number of cells in width, height
  let cells, grid;
  let balls;
  let bgColor, lineColor, vertexColor;

// for animation
  let events;

// shortcuts for Math.
  const mrandom = Math.random;
  const mfloor = Math.floor;
  const mround = Math.round;
  const mceil = Math.ceil;
  const mabs = Math.abs;
  const mmin = Math.min;
  const mmax = Math.max;

  const mPI = Math.PI;
  const mPIS2 = Math.PI / 2;
  const mPIS3 = Math.PI / 3;
  const m2PI = Math.PI * 2;
  const m2PIS3 = Math.PI * 2 / 3;
  const msin = Math.sin;
  const mcos = Math.cos;
  const matan2 = Math.atan2;

  const mhypot = Math.hypot;
  const msqrt = Math.sqrt;

  const rac3   = msqrt(3);
  const rac3s2 = rac3 / 2;

//------------------------------------------------------------------------

function alea (mini, maxi) {
// random number in given range

  if (typeof(maxi) == 'undefined') return mini * mrandom(); // range 0..mini

  return mini + mrandom() * (maxi - mini); // range mini..maxi
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function intAlea (mini, maxi) {
// random integer in given range (mini..maxi - 1 or 0..mini - 1)
//
  if (typeof(maxi) == 'undefined') return mfloor(mini * mrandom()); // range 0..mini - 1
  return mini + mfloor(mrandom() * (maxi - mini)); // range mini .. maxi - 1
}

//------------------------------------------------------------------------
function Vertex (x, y) {
  this.x = x;
  this.y = y;
  this.blinking = false;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Vertex.prototype.blink = function() {
  this.blinking = true;;
  this.blinkCounter = 0;
  this.blinkNumber = 5;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Vertex.prototype.draw = function() {

const radius1 = 5;
const radius2 = 2.5;
const radius3 = 10;

  if (this.blinking) {
    if (this.blinkCounter < 5) ctx.fillStyle = "#fe8"; else ctx.fillStyle = "#c90"
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius3, 0, m2PI);
    ctx.fill();
    ++this.blinkCounter;
    if (this.blinkCounter >= 10) {
      this.blinkCounter = 0;
      if (--this.blinkNumber == 0) this.blinking = false;
    }
  }

  ctx.beginPath();
  ctx.arc(this.x, this.y, radius1, 0, m2PI);
  ctx.fillStyle = vertexColor;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(this.x, this.y, radius2, 0, m2PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
} //

//------------------------------------------------------------------------
function Cell(kx, ky) {
  this.kx = kx;
  this.ky = ky;
// base point of the cell
  this.x = offsx + kx * sideLength;
  this.y = offsy + ky * sideLength;
// all points
  this.points = [];
  this.points.push(new Vertex(this.x, this.y));              // top left
  this.points.push(new Vertex(this.x + sideLength, this.y)); // top right
  this.points.push(new Vertex(this.x, this.y + sideLength)); // bottom left
  this.points.push(new Vertex(this.x + sideLength, this.y + sideLength)); // bottom right
  this.points.push(new Vertex(this.x + sideLength / 2, this.y + sideLength / 2)); // center
  this.setLines();

} // Cell

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Cell.prototype.setLines = function() {

  let kPoint, activePoints;
  do {
    activePoints = [];
    for (let k = 0; k < 5; ++k) {
      kPoint = intAlea(5);
      if (activePoints.includes(kPoint)) continue; // there likely will be less than 5 points
      activePoints.push(kPoint);
    } // for k
  } while (activePoints.length < 2); // at least 2 points

  this.lines = [];
  for (let k = 0; k < activePoints.length - 1; ++k) {
    this.lines.push(new Line(this.points[activePoints[k]], this.points[activePoints[k + 1]]));
  } // for k

} //setLines
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Cell.prototype.draw = function() {
  this.lines.forEach(line => line.draw());
} // cell draw

//------------------------------------------------------------------------
function Line(p0, p1) {
  this.p0 = p0;
  this.p1 = p1;
} // Line

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Line.prototype.draw = function() {

  ctx.beginPath();
  ctx.moveTo (this.p0.x,this.p0.y);
  ctx.lineTo (this.p1.x,this.p1.y);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  this.p0.draw();
  this.p1.draw();

}

//------------------------------------------------------------------------
function Ball(kx, ky) {
/* kx and ky are only for initial position, they can be forgotten then */

  this.x = offsx + kx * sideLength;
  this.y = offsy + ky * sideLength;

  this.prevx = this.tailx = this.x;
  this.prevy = this.taily = this.y;
  this.radius = 10;

  this.cntStepTail = 0;
  this.setDir();
  this.cntNoCollision = 0;

} // Ball
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Ball.prototype.draw = function() {

  if (++this.cntStepTail >= 3) {
    this.cntStepTail = 0;
    this.tailx = this.prevx;
    this.taily = this.prevy;
  }

  // tail
  ctx.beginPath();
  ctx.arc(this.tailx, this.taily, 3, 0, m2PI);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ff0";
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.stroke();
  // head
  ctx.beginPath();
  ctx.arc(this.x, this.y,5, 0, m2PI);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ff0";
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(this.tailx, this.taily);
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = "#880";
  ctx.lineWidth = 3;
  ctx.stroke();

} // Ball.draw

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Ball.prototype.setDir = function() {
  this.dir = intAlea(8); // 0 : N, 1: NE, 2: E ... 7 : NW
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Ball.prototype.move = function() {

  let reeval;
  let dist, dxb, dyb, dxl, dyl, alpha, lngball, lng;

  if (intAlea(10) == 0) this.setDir();

  this.prevx = this.x;
  this.prevy = this.y;

  do {
    reeval = false;
    this.x = this.prevx + ballStep * [0,1,1,1,0,-1,-1,-1] [this.dir];
    this.y = this.prevy - ballStep * [-1,-1,0,1,1,1,0,-1] [this.dir];
    if (this.x < 0 || this.x >= maxx) {
      this.dir = 8 - this.dir; // bounce against right or left side
      reeval = true;
    }
    if (this.y < 0 || this.y >= maxy) {
      this.dir = [4,3,2,1,0,7,6,5][this.dir]; // bounce against top or bottom side
      reeval = true;
    }
  } while (reeval);

// ignore collision with other balls

// eval collision with line

  if (this.cntNoCollision > 0) {
    --this.cntNoCollision;
    return;
  }

// first evaluate block position
  let kbx = mfloor((this.x - offsx) / sideLength);
  let kby = mfloor((this.y - offsy) / sideLength);

// scan area + / - 1 cell vertically and horizontally
  
searchCollision:
  for (let ky = mmax(kby - 1, 0); ky <= mmin(kby + 1, nby - 1); ++ky) {
    for (let kx = mmax(kbx - 1, 0); kx <= mmin(kbx + 1, nbx - 1); ++kx) {
      if (! grid[ky][kx]) continue; // if no cell here
      const cell = grid[ky][kx];
      for (let kl = cell.lines.length - 1; kl >= 0; --kl) {
        if (!cell.lines[kl]) continue; // not all lines exist
// find projection alpha of ball on line (unit : line length)
        const {p0, p1} = cell.lines[kl];
        dxb = this.x - p0.x;
        dyb = this.y - p0.y;
        dxl = p1.x - p0.x;
        dyl = p1.y - p0.y;
        lng = mhypot(dxl, dyl); // length of line
        alpha = (dxb * dxl + dyb * dyl) / lng / lng;
        lngball = mhypot(dxb, dyb); // distance p0 line to ball
        if (alpha >= 0 && alpha <= 1) {
          dist = msqrt(lngball * lngball - alpha * alpha * lng * lng);
        } else if (alpha < 0) {
          dist = lngball
        } else { // (alpha > 1)
          dist = mhypot(this.x - p1.x, this.y - p1.y)
        }
        if (dist < this.radius) { // close enough to line !
          p0.blink();
          p1.blink();
          cell.setLines();
          this.dir += intAlea(1,8); // 1 to 7 -> direction change
          this.dir %= 8;
          this.cntNoCollision = 2; // number of moves without collision detection
          break searchCollision;
        }
      } // for kl;
    } // for kx
  } // for ky

} // Ball.move

//------------------------------------------------------------------------

function pickCells() {
  cells = [];
  grid = new Array(nby).fill(0).map(()=>[]);
  for (let ky = 0; ky < nby; ++ky) {
    for (let kx = 0; kx < nbx; ++kx) {
      if (alea(1) > 0.5) cells.push(grid[ky][kx] = new Cell(kx, ky));
    } // for kx
  } // for ky
} // pickCells

//------------------------------------------------------------------------

function drawCells() {
  cells.forEach(cell => cell.draw());
} // pickCells

//------------------------------------------------------------------------

function pickBalls() {

  let kx, ky;
  let nbBalls = nbx * nby / 24;
  nbBalls = mmax(1, nbBalls); // at least 1!
// create array of indices of initial balls positions
  balls = [];
  do {
    kx = intAlea(1, nbx); // not on edges!
    ky = intAlea(1, nby); // not on edges!
    if (balls.some(otherBall => otherBall[0] == kx && otherBall[1] == ky)) continue; // not two at the same place
    balls.push([kx, ky]);
  } while (balls.length < nbBalls);

// replace indices with actual Ball objects
  balls = balls.map(kball => new Ball(kball[0],kball[1]));

} // pickBalls

//------------------------------------------------------------------------

function drawBalls() {
  balls.forEach(ball => ball.draw());
} // pickCells

//------------------------------------------------------------------------

let animate;

{ // scope for animate

let animState = 0;
let tNext;

animate = function(tStamp) {

  let event;

  event = events.shift();
  if (event && event.event == 'reset') animState = 0;
  if (event && event.event == 'click') animState = 0;
  window.requestAnimationFrame(animate)

  switch (animState) {

    case 0 :
      if (startOver()) {
        ++animState;
        tNext = tStamp + STEP_TIME;
      }
      break;

    case 1 :
      if (tStamp < tNext) break;
      tNext = tStamp + STEP_TIME;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0,0,maxx,maxy);
      drawCells();
      balls.forEach(ball => {
        ball.move();
        ball.draw();
      });
//      ++animState;
      break;

    case 2:
      break;

  } // switch


} // animate
} // scope for animate

//------------------------------------------------------------------------
//------------------------------------------------------------------------

function startOver() {

// canvas dimensions

  maxx = window.innerWidth;
  maxy = window.innerHeight;

  canv.width = maxx;
  canv.height = maxy;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

// pick a length for cell
  sideLength = alea(SIDE_MIN, SIDE_MAX);
  ballStep = sideLength / 10;

// calculate number of cells of offset for centering
  nbx = mfloor(maxx / sideLength);
  nby = mfloor(maxy / sideLength);
  nbx = mmax(nbx, 2); // not less than 2 cells in width
  nby = mmax(nby, 2); // not less than 2 cells in height
  offsx = (maxx - nbx * sideLength) / 2;
  offsy = (maxy - nby * sideLength) / 2;

  let hue = intAlea(360);
  hue = 0;
  bgColor = `hsl(${hue}, 100%, 5%)`;
  lineColor = `hsl(${hue + 180}, 100%, 30%)`;
  vertexColor = `hsl(${hue + 180}, 100%, 60%)`;
// pick cells and balls
  pickCells();
  pickBalls();
  drawCells();
  drawBalls();
  return true;

} // startOver

//------------------------------------------------------------------------

function mouseClick (event) {

  events.push({event:'click'});;

} // mouseClick

//------------------------------------------------------------------------
//------------------------------------------------------------------------
// beginning of execution

  {
    canv = document.createElement('canvas');
    canv.style.position="absolute";
    document.body.appendChild(canv);
    ctx = canv.getContext('2d');
    canv.setAttribute ('title','click me');
  } // création CANVAS
  canv.addEventListener('click',mouseClick);
  events = [{event:'reset'}];
  requestAnimationFrame (animate);

}); // window load listener