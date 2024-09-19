window.addEventListener("load",function() {

  let dotRadius, dotDiam;

  let canv, ctx;    // canvas and context
  let img;
  let maxx, maxy;   // canvas dimensions
  let tWidth, tHeight;
  let goodImage;
  let constantRadius;
  let bg, fg;
  let srcData, hue;
  let brightness, contrast;
  let brFactor, conFactor;

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

//------------------------------------------------------------------------

function hslString(h, s, l) {
  return `hsl(${h},${s}%,${l}%)`;
} // hslString

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

function createImage() {

  let nbx, nby;
  let dimx, dimy;

  readUI();
  if (!goodImage) return; // no picture to work on

/* read user's choice and choose functions accordingly */

  let srcCanvas = document.getElementById('reference');
  let srcCtx = srcCanvas.getContext ('2d');

//  let destCanvas = document.getElementById('destCanvas');
//  destCtx = destCanvas.getContext ('2d');

  const hSize = img.width; // original image
  const vSize = img.height;

/* target size, adjusted for an integer number of dots */
  dimx = tWidth;
  dimy = tWidth * img.height / img.width;
  nbx = mround(dimx / dotDiam);
  nby = mround(dimy / dotDiam);

  srcCanvas.width = nbx
  srcCanvas.height = nby;
  srcCtx.drawImage(img, 0, 0, nbx, nby);

//  destCtx.imageSmoothingEnabled = false;
  srcData = srcCtx.getImageData(0, 0, nbx, nby);

  drawImage ();

} // function createImage

//------------------------------------------------------------------------
function drawImage () {

  if (!goodImage) return; // no picture to work on

  const nbx = srcData.width;
  const nby = srcData.height;
  const dimx = nbx * dotDiam;
  const dimy = nby * dotDiam;
  const data = srcData.data;
  let darkDots;

  let lum, rad, glsat;

  canv.width = dimx;
  canv.height = dimy;

  switch(bg) {
    case "black" : ctx.fillStyle = '#000'; break
    case "dark"  : ctx.fillStyle = hslString(hue, 100, 20); break;
    case "light" : ctx.fillStyle = hslString(hue, 100, 80); break;
    case "white" : ctx.fillStyle = '#fff'; break
  }
  ctx.fillRect (0, 0, dimx, dimy);

// fillStyle for dots
  if (!constantRadius) {
    switch(bg) {
      case "black" :
      case "dark"  :
        darkDots = false;
        ctx.fillStyle = (fg == "bw") ? '#fff' : hslString(hue, 100, 60);
        break;
      case "light" :
      case "white" :
        darkDots = true;
        ctx.fillStyle = (fg == "bw") ? '#000' : hslString(hue, 100, 20);
        break;
    } // switch
  } else {
    glsat = (fg == "bw" ? 0 : 100);
  }

  let offs = 0; // pointer into data array

  for (let ky = 0; ky < nby; ++ky) {
    for (let kx = 0; kx < nbx; ++kx) {
      lum = 0.3 * data[offs++] + 0.5 * data[offs++] + 0.2 * data[offs++];
      offs++;
      lum += brFactor; // bright
      lum = conFactor * (lum - 128) + 128;
      lum /= 255; // for a 0..1 range
      lum = mmax(0,mmin(1, lum)); // limit to 0..1
      ctx.beginPath();
      if (constantRadius) {
        ctx.fillStyle = `hsl(${hue}, ${glsat}%, ${(100 * lum)}%)`;
        ctx.arc((kx + 0.5) * dotDiam, (ky + 0.5) * dotDiam, dotRadius-0.2, 0, m2PI);
      } else {
        rad = dotRadius * (msqrt(darkDots ? (1 - lum) : lum));
        ctx.arc((kx + 0.5) * dotDiam, (ky + 0.5) * dotDiam, rad, 0, m2PI);
      }
      ctx.fill();
    } // for kx

  } // for ky

} // drawImage
//------------------------------------------------------------------------

function readUI()  {

  let ctrl, x;
  
  readTWidth(null, true);
  readDotRadius(null, true);
  readConstantRadius(null, true);
  readFg(null, true);
  readBg(null, true);
  readHue(null, true);
  readBrightness(null, true);
  readContrast(null, true);

}

//------------------------------------------------------------------------
function readTWidth(event, noUpdate) {
  let ctrl, x;

  ctrl = document.getElementById('tWidth');
  x = parseInt(ctrl.value, 10);
  if (isNaN (x)) { x = tWidth }
  if (x < 200) x = 200;
  if (x > 2000) x = 2000;
  ctrl.value = tWidth = x;
  if (noUpdate) return;
  createImage();

} // readTWidth()

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function readDotRadius(event, noUpdate) {
  let ctrl, x;
  ctrl = document.getElementById('dRadius');
  x = parseFloat(ctrl.value, 10);
  if (isNaN (x)) { x = dotRadius }
  if (x < 2) x = 2;
  if (x > 20) x = 20;
  ctrl.value = dotRadius = x;
  dotDiam = 2 * dotRadius;
  if (noUpdate) return;
  createImage();
} // readDotRadius

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function readConstantRadius(event, noUpdate) {

  constantRadius = document.getElementById('constant').checked;
  if (noUpdate) return;
  drawImage();

} // readConstantRadius

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function readBg (event, noUpdate) {

  bg = document.querySelector(`input[name="bg"]:checked`).value;
  if (noUpdate) return;
  drawImage();

} // readBg

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function readFg (event, noUpdate) {

  fg = document.querySelector(`input[name="fg"]:checked`).value;
  if (noUpdate) return;
  drawImage();
} // readFg

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function readHue (event, noUpdate) {

  let x;
  const ctrl = document.getElementById('hue')
  x = ctrl.value;
  if (isNaN (x)) { x = hue }
  if (x < 0) x = 0;
  if (x > 359) x = 359;
  ctrl.value = hue = x;
  document.getElementById("showHue").style.backgroundColor = hslString(hue, 100, 50);
  if (noUpdate) return;
  drawImage();
} // readHue

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function readBrightness (event, noUpdate) {

  let x;
  const ctrl = document.getElementById('brightness')
  x = ctrl.value;
  if (isNaN (x)) { x = brightness }
  if (x < -1) x = -1;
  if (x > 1) x = 1;
  ctrl.value = brightness = x;
  brFactor =  x * (1 + mabs(x)) * 100; // +/- 200
  if (noUpdate) return;
  drawImage();
} // readBrightness

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function resetBrightness () {

  const ctrl = document.getElementById('brightness')
  ctrl.value = brightness = 0;
  readBrightness();
} // readBrightness

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function readContrast (event, noUpdate) {

  let x;
  const ctrl = document.getElementById('contrast')
  x = ctrl.value;
  if (isNaN (x)) { x = contrast }
  if (x < -1) x = -1;
  if (x > 1) x = 1;
  ctrl.value = contrast = x;
  conFactor =  (1 + 0.95 * contrast) / (1 - 0.95 * contrast);
  if (noUpdate) return;
  drawImage();
} // readContrast
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function resetContrast () {

  const ctrl = document.getElementById('contrast')
  ctrl.value = contrast = 0;
  readContrast();
} // readBrightness


//------------------------------------------------------------------------

function loadUserImage() {

  let inp = document.getElementById('userfile');
  inp.onchange = function() {
// check a few points
    if (this.files.length < 1) {
      callBackKO();
      return;
    }
    let file = this.files[0];

    if (file.type.substr(0,6) != 'image/'){
      callBackKO();
      return;
    }

    if (file.size < 1) {
      callBackKO();
      return;
    }

    let reader = new FileReader();
    reader.onload = function(e) {
            img.src = e.target.result;

            callBackOK();
            return;
          };

    reader.readAsDataURL(file);
   } // inp.onchange

  inp.click(); // click hidden button, open control to load file

  function callBackOK() {
    
  }
  function callBackKO() {
    throw ('callBackKO');
  }
} // loadUserImage

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function loaded() {

  goodImage = true;
  createImage();
}

//------------------------------------------------------------------------
//------------------------------------------------------------------------

function startOver() {

  let offsx, offsy;
  let centrx, centry;

// canvas dimensions

  maxx = window.innerWidth;
  maxy = window.innerHeight;

  canv.width = maxx;
  canv.height = maxy;
  ctx.lineJoin = 'bevel';
  ctx.lineCap = 'round';

  ctx.fillStyle = '#000'
  ctx.fillRect(0,0,maxx,maxy);

  return true;

} // startOver

//------------------------------------------------------------------------
//------------------------------------------------------------------------
// beginning of execution

  {
    canv = document.createElement('canvas');
    canv.style.position="absolute";
    document.body.appendChild(canv);
    ctx = canv.getContext('2d');

  } // création CANVAS

  img = new Image();
  img.addEventListener('load', loaded);

  document.getElementById('tWidth').addEventListener('change', readTWidth);
  document.getElementById('dRadius').addEventListener('change', readDotRadius);
  document.getElementById('constant').addEventListener('change', readConstantRadius);
  document.getElementsByName('bg').forEach (ctrl => ctrl.addEventListener('change', readBg));
  document.getElementsByName('fg').forEach (ctrl => ctrl.addEventListener('change', readFg));
  document.getElementById('hue').addEventListener('change', readHue);
  document.getElementById('brightness').addEventListener('change', readBrightness);
  document.getElementById('contrast').addEventListener('change', readContrast);
  document.getElementById('loadButton').addEventListener ('click', loadUserImage);
  document.getElementById('resetBrightness').addEventListener ('click', resetBrightness);
  document.getElementById('resetContrast').addEventListener ('click', resetContrast);

  readUI();
  goodImage = false;
  img.src = woman_600_800;

  startOver();

}); // window load listener