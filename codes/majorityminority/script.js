"use strict";

window.addEventListener("load",function() {

  let colors = [];

  let canv, ctx;   // canvas and context
  let maxx, maxy;  // canvas sizes (in pixels)

  let grid;  // arrays of cells
  let xDisp,yDisp;  // pre-computed positions of cells on display

  let nbx, nby;     // grid size (in elements, not pixels)

  let events;
  let majority;
  let ui, uiv; // user interface elements and values
  let side;

// shortcuts for Math.…

  const mrandom = Math.random;
  const mfloor = Math.floor;
  const mround = Math.round;
  const mceil = Math.ceil;
  const mabs = Math.abs;
  const mmin = Math.min;
  const mmax = Math.max;

  const mPI = Math.PI;
  const mPIS2 = Math.PI / 2;
  const m2PI = Math.PI * 2;
  const msin = Math.sin;
  const mcos = Math.cos;
  const matan2 = Math.atan2;

  const mhypot = Math.hypot;
  const msqrt = Math.sqrt;

  const rac3   = msqrt(3);
  const rac3s2 = rac3 / 2;
  const mPIS3 = Math.PI / 3;

//-----------------------------------------------------------------------------
// miscellaneous functions
//-----------------------------------------------------------------------------

  function alea (min, max) {
// random number [min..max[ . If no max is provided, [0..min[

    if (typeof max == 'undefined') return min * mrandom();
    return min + (max - min) * mrandom();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function intAlea (min, max) {
// random integer number [min..max[ . If no max is provided, [0..min[

    if (typeof max == 'undefined') {
      max = min; min = 0;
    }
    return mfloor(min + (max - min) * mrandom());
  } // intAlea

//-----------------------------------------------------------------------------
function drawCell (kx, ky, state) {

  ctx.fillStyle = colors[state];
  ctx.fillRect(xDisp[kx], yDisp[ky], side, side);
}

//-----------------------------------------------------------------------------
function setCell (kx, ky, state) {
/* value should be 2 or 1 only */

  if (state == grid[ky][kx]) return; // save time (?)
  grid[ky][kx] = state;
  drawCell(kx, ky, state);
}

//-----------------------------------------------------------------------------

function createGrid() {

  grid = [];
  for (let ky = 0; ky < nby; ++ky) {
    grid [ky] = new Array(nbx);
    for (let kx = 0; kx < nbx; ++kx) {
      setCell(kx, ky, (mrandom() > 0.5 )? 1 : 0);
    } // for kx
  } // for ky
} // createGrid

//-----------------------------------------------------------------------------
function evolution() {
/* picks one cell
detects majority state in its neighborhood (9 cells including itself)
gives central cell color of majority
*/

// random cell
  const x = intAlea(0, nbx);
  const y = intAlea(0, nby);

  let total = 0;
  let nbcells = 0;

  let row;

  for (let ky = y - 1; ky <= y + 1; ++ky) {
    if (ky < 0 || ky >= nby) continue;
    row = grid[ky];
    for (let kx = x - 1; kx <= x + 1; ++kx) {
      if (kx < 0 || kx >= nbx) continue;
      ++nbcells;
      if (row[kx]) ++total;
    } // for kx
  } // for ky
  if (uiv.majority)
   setCell(x, y, (total >= nbcells / 2) ? 1 : 0); //
  else
   setCell(x, y, (total >= nbcells / 2) ? 0 : 1); //

} // evolution
//-----------------------------------------------------------------------------
// returns false if nothing can be done, true if drawing done

function startOver() {

  let hue, offs;

// canvas dimensions

  maxx = window.innerWidth;
  maxy = window.innerHeight;

  canv.style.left = ((window.innerWidth ) - maxx) / 2 + 'px';
  canv.style.top = ((window.innerHeight ) - maxy) / 2 + 'px';

  ctx.canvas.width = maxx;
  ctx.canvas.height = maxy;
//  ctx.lineCap = 'round';   // placed here because reset when canvas resized
  ctx.imageSmoothingEnabled = false;

  nbx = mceil(maxx / uiv.size);
  nby = mceil(maxy / uiv.size);

  if (nbx < 10 || nby < 10) return false; // not interesting
  hue = intAlea(0,360);
  colors = ['#000', `hsl(${hue},100%,80%)`,`hsl(${hue},100%,50%)`];
  ctx.fillStyle='#000';
  ctx.fillRect(0, 0, maxx, maxy);

// calculate positions of columns / rows
  xDisp = [];
  offs = (maxx - nbx * uiv.size) / 2 ;
  for (let kx = 0; kx < nbx; ++kx) xDisp[kx] = offs + kx * uiv.size;

  yDisp = [];
  offs = (maxy - nby * uiv.size) / 2 ;
  for (let ky = 0; ky < nby; ++ky) yDisp[ky] = offs + ky * uiv.size;

  side = uiv.size - ((uiv.size <= 2) ? 0 : 1);
  
  createGrid();

  return true; // ok

} // startOver

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function changeMajority() {
  uiv.majority = true;
  events.push({event:"reset"});
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function changeMinority() {
  uiv.majority = false;
  events.push({event:"reset"});
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function getCoerce(name, min, max, isInt) {

  let parse = isInt ? parseInt : parseFloat
  let ctrl = ui[name];
  let x = parse(ctrl.value, 10);
  if (isNaN (x)) { x = uiv[name] }
  x = mmax(x, min);
  x = mmin(x, max);

  ctrl.value = uiv[name] = x;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function changeSize() {
  getCoerce('size',2,20,true);
  events.push({event:"reset"});
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function clickCanvas(event) {
  if (event.target.tagName == 'CANVAS') {
    events.push({event: 'click'});
  }
} //  clickCanvas

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function resize(event) {
    events.push({event: 'resize'});
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let animate;

let animState;
{ // scope for animate
animate = function (tStamp) {

  let tStart;
  let event = events.pop();
  if (event && event.event == 'reset') animState = 0;
  if (event && event.event == 'click') animState = 0;
  if (event && event.event == 'resize') animState = 0;

  switch(animState) {
    case 0 :
      if (startOver()) ++animState;
      break;

    case 1 :
      let tStart = performance.now();
      do {
        evolution()
      } while (performance.now() - tStart < 5);

  } // switch
  window.requestAnimationFrame(animate);

} // animate

} // end of scope for animate

//------------------------------------------------------------------------
//------------------------------------------------------------------------
// beginning of execution

  {
    canv = document.querySelector('canvas');
    canv.style.position="absolute";
    ctx = canv.getContext('2d');
  } // canvas creation

  ui = {};
  ui.majority = document.getElementById('majority');
  ui.minority = document.getElementById('minority');
  ui.size = document.getElementById('size');

  uiv = {}
  uiv.majority = ui.majority.checked;
  uiv.size = parseInt(ui.size.value, 10);

  ui.majority.addEventListener('change', changeMajority);
  ui.minority.addEventListener('change', changeMinority);
  ui.size.addEventListener('change', changeSize);

  window.addEventListener('click',clickCanvas);
  window.addEventListener('resize',resize);

  events = [{event:'reset'}];
  canv.setAttribute('title','click to restart');

  window.requestAnimationFrame(animate);

}); // window load listener