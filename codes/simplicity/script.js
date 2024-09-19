"use strict";

window.addEventListener("load",function() {


  let canv, ctx;    // canvas and context
  let maxx, maxy;   // canvas dimensions

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
  const matan = Math.atan;

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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function Noise1DOneShot (period, min = 0, max = 1, random) {
/* returns a 1D single-shot noise generator.
   the (optional) random function must return a value between 0 and 1
  the returned function has no parameter, and will return a new number every tiime it is called.
  If the random function provides reproductible values (and is not used elsewhere), this
  one will return reproductible values too.
  period should be > 1. The bigger period is, the smoother output noise is
*/
  random = random || Math.random;
  let currx = random(); // start with random offset
  let y0 = min + (max - min) * random(); // 'previous' value
  let y1 = min + (max - min) * random(); // 'next' value
  let dx = 1 / period;

  return function() {
    currx += dx;
    if (currx > 1) {
      currx -= 1;
      y0 = y1;
      y1 = min + (max - min) * random();
    }
    let z = (3 - 2 * currx) * currx * currx;
    return z * y1 + (1 - z) * y0;
  }
} // Noise1DOneShot
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function Noise1DOneShotHarm (period, min = 0, max = 1, ampl, random) {
/* returns the sum of 2 Noise1D, one of given period and the other of period half
   The harmonic has and amplitude ampl (< 1) times the main signal
   the sum is scaled to fit between min and max
*/

  random = random || Math.random;
  let ampx = 1 / (1 + ampl);
  let rnd1 = Noise1DOneShot(period, ampx * min, ampx * max, random);
  ampx = ampl / (1 + ampl);
  let rnd2 = Noise1DOneShot(period / 2, ampx * min, ampx * max, random);
  return function() {
    return rnd1() + rnd2();
  }
} // Noise1DOneShotHarm

//------------------------------------------------------------------------

let animate;

{ // scope for animate

let animState = 0;
let R;
let fLum;
let hue;
let kStep;
let xc, yc;

animate = function(tStamp) {

  let event;
  let tinit;

  event = events.pop();
  if (event && event.event == 'reset') animState = 0;
  if (event && event.event == 'click') animState = 0;
  window.requestAnimationFrame(animate)

  tinit = performance.now();

  switch (animState) {

  case 0 :
    if (startOver()) {
      ++animState;
      xc = maxx / 2;
      yc = maxy / 2;
      R = (mmin(maxx, maxy) - 10) / 2;
      hue = intAlea(360);
      fLum = Noise1DOneShotHarm(R / alea(5,10), 0, 100, 0.5);
      ctx.lineWidth = 2;
      for (let k = R; k > 0; --k) drawCircle(k);
      kStep = 0.5;
    }
    break;

  case 1 :
    if (kStep > R) { // in increasing radius
      kStep = 0.5;
      break;
    }
    drawCircle(kStep++);
    break;

} // switch

} // animate

function drawCircle(r) {
  ctx.beginPath();
  ctx.arc(xc, yc, r, 0, m2PI);
  ctx.strokeStyle = `hsl(${hue},100%,${fLum()}%)`;
  ctx.stroke();
} // drawCircle

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

  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,maxx,maxy);

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
  window.addEventListener('resize',()=>{events.push({event:'reset'})});
  events = [{event:'reset'}];
  requestAnimationFrame (animate);

}); // window load listener