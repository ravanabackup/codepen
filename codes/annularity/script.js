console.clear();

const TAU = Math.PI * 2;

var config = {
  bgColor: 'rgb(255, 255, 255)',
  lineColor: 'rgb(0, 0, 0)',
  lineCount: 42,
  maxLineWidth: 4.43,
  radialScaling: 0.025,
  timeScaling: 0.03674 };


var noise = new SimplexNoise();

var w,h,cx,f = 0;

w = c.width = window.innerWidth;
h = c.height = window.innerHeight;
cx = c.getContext('2d');

var x0 = w / 2,
y0 = h / 2,
minDim = Math.min(w, h) / 2.1;


function loadUI() {
  var gui = new dat.GUI();
  gui.add(config, 'timeScaling', 0, 0.1).step(0.00001);
  gui.add(config, 'radialScaling', 0, 1).step(0.00001);
  gui.add(config, 'lineCount', 1, 100);
  gui.add(config, 'maxLineWidth', 0, 10).step(0.01);
  gui.addColor(config, 'bgColor');
  gui.addColor(config, 'lineColor');
  gui.close();
}

function render() {
  cx.fillStyle = config.bgColor;
  cx.rect(0, 0, w, h);
  cx.fill();

  cx.strokeStyle = config.lineColor;
  var fScaled = f * config.timeScaling,
  rFactor = minDim / config.lineCount;

  for (var i = 0; i < config.lineCount; i++) {
    cx.beginPath();
    cx.lineWidth = scale(noise.noise2D(fScaled, i * config.radialScaling), -1, 1, 0, config.maxLineWidth);
    cx.arc(x0, y0, (i + 1) * rFactor, 0, TAU);
    cx.stroke();
    cx.closePath();
  }
  f++;

  window.requestAnimationFrame(render);
}

function scale(x, xMin, xMax, toMin, toMax) {
  let p = (x - xMin) / (xMax - xMin);
  return p * (toMax - toMin) + toMin;
}

loadUI();
render();