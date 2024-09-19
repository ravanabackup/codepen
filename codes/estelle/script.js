"use strict";

/* You'll find the word Lissajous because at the origin, the x and y coordinates were not random numbers. 
*/
window.addEventListener("load",function() {

  const NBLISSAJOUS = 200;

  let canv, ctx;    // canvas and context
  let maxx, maxy;   // canvas dimensions
  let liss;

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
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*	============================================================================
	This is based upon Johannes Baagoe's carefully designed and efficient hash
	function for use with JavaScript.  It has a proven "avalanche" effect such
	that every bit of the input affects every bit of the output 50% of the time,
	which is good.	See: http://baagoe.com/en/RandomMusings/hash/avalanche.xhtml
	============================================================================
*/
/* This function returns a hash function depending on a seed.

if no seed is provided (or a falsy value), Math.random() is used.
The returned function always returns the same number in the range [0..1[ for the
same value of the argument. This argument may be a String or a Number or anything else
which can be 'toStringed'
Two returned functions obtained with two equal seeds are equivalent.
*/

function hashFunction(seed) {
  let n0 = 0xefc8249d;
  let n = n0;
  mash((seed || Math.random())); // pre-compute n for seed
  n0 = n; //

	function mash(data) {
    data = data.toString() + 'U';
    n = n0;
    for (let i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    } // for
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  } // mash
  return mash;
} // hashFunction(seed)

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function Noise1D (period, min = 0, max = 1, hash) {
/* returns a 1D noise function.
   the (mandatory) hash function must return a value between 0 and 1. The hash function
   will be called with an integer number for a parameter.
  the returned function takes one parameter, and will always return the same value if called with the same parameter
  period should be > 1. The bigger period is, the smoother the output noise is

suggestion : the hash parameter could be a function returned from a call to hashFunction above

*/

  let currx, y0, y1;  // cached valued, to reduce number of calls to 'hash'
  let phase = hash(0); // to shift the phase of different generators between each other;

  return function(x) {
    let xx = x / period + phase;
    let intx = mfloor(xx);

    if (intx - 1 === currx) { // next integer interval
      ++currx;
      y0 = y1;
      y1 = min + (max - min) * hash(currx + 1);
    } else if (intx !== currx) { // unrelated interval
      currx = intx;
      y0 = min + (max - min) * hash(currx);
      y1 = min + (max - min) * hash(currx + 1);
    }
    let frac = xx - currx;
    let z = (3 - 2 * frac) * frac * frac;
    return z * y1 + (1 - z) * y0;
  }
} // Noise1D
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function Noise1DHarm (period, min = 0, max = 1, ampl, hash) {
/* returns the sum of 2 Noise1D, one of given period and the other of period half
   The harmonic has and amplitude ampl (< 1) times the main signal
   the sum is scaled to fit between min and max
*/

  let ampx = 1 / (1 + ampl);
  let rnd1 = Noise1D(period, ampx * min, ampx * max, hash);
  ampx = ampl / (1 + ampl);
  let rnd2 = Noise1D(period / 2, ampx * min, ampx * max, hash);
  return function(x) {
    return rnd1(x) + rnd2(x);
  }
} // Noise1DHarm


//------------------------------------------------------------------------
function Lissajous () {

  this.dt = alea(0, 500); // time dispersion
  this.fdx = Noise1D(alea(2000,5000), -Lissajous.cloudSize, Lissajous.cloudSize, hashFunction ());
  this.fdy = Noise1D(alea(2000,5000), -Lissajous.cloudSize, Lissajous.cloudSize, hashFunction ());
  this.dHue = intAlea(30);
  this.sat = intAlea(70,100);
  this.lum = intAlea(30,70);
  this.color = `hsl(${this.hue},${this.sat}%,${this.lum}%)`;
  this.lineWidth = 5;
} // Lissajous

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Lissajous.prototype.draw = function(t) {

  const x = Lissajous.fx(t + this.dt) + this.fdx(t);
  const y = Lissajous.fy(t) + this.fdy(t);

  if (this.prevx !== undefined) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = `hsl(${Lissajous.hue}, ${this.sat}%,${this.lum}%)`;
    ctx.moveTo(this.prevx, this.prevy);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  this.prevx = x;
  this.prevy = y;

} // Lissajous.prototype.draw

//------------------------------------------------------------------------

let animate;

{ // scope for animate

let animState = 0;
let tPrev;
let runningTime;

animate = function(tStamp) {

  let event;
  let tinit;
  let x, y;
  let dt;

  event = events.pop();
  if (event && event.event == 'reset') animState = 0;
  if (event && event.event == 'click') animState = 0;
  window.requestAnimationFrame(animate)

  tinit = performance.now();


  switch (animState) {

    case 0 :
      if (startOver()) {
        ++animState;
        tPrev = tStamp;
        runningTime = performance.now();
      }
      break;


    case 1 :
      dt = mmin(50, tStamp - tPrev); // actual delay between frames, limited to 50 ms
      tPrev = tStamp;

      runningTime += dt; // artificial time line
      Lissajous.hue = (Lissajous.hue + 360 + Lissajous.fdHue(runningTime) * dt) % 360;
      liss.forEach(l=>l.draw(runningTime));

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

  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,maxx,maxy);

  Lissajous.fx = Noise1DHarm(alea(1000,2000), 0, maxx, 0.4, hashFunction ());
  Lissajous.fy = Noise1DHarm(alea(1000,2000), 0, maxy, 0.4, hashFunction ());
  Lissajous.fdHue = Noise1D(alea(1000,2000), -30/1000, 30/1000, hashFunction ());
  Lissajous.hue = intAlea(360);
  Lissajous.cloudSize = mmin(maxx, maxy) / 10;

  liss = new Array(NBLISSAJOUS).fill(0).map(()=> new Lissajous());

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