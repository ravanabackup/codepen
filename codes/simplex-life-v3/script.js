function getRandomWave(x, y) {
  return noise.simplex2(x, y);
}

function adjustCanvas(canvasElement) {
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  return canvasElement;
}

window.addEventListener('resize', _ => adjustCanvas(canvas));

var canvas = adjustCanvas(document.createElement('canvas'));
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.addEventListener('click', reset);

var noiseX, noiseY, difference, x, y, thickness, frequency, gap, wavelength, baseY;

reset();

function reset() {
  noiseX = noiseY = 0;
  x = y = 0;
  difference = .0125;
  thickness = 8 + Math.round(Math.random() * 5);
  frequency = 1;
  gap = thickness + Math.round(Math.random() * 9);
  wavelength = 100;
  baseY = -wavelength;
  noise.seed(Math.random());
  draw(null, true);
}

function draw(ts, isFirst) {
  if (baseY < window.innerHeight + wavelength) {
    requestAnimationFrame(draw);
  }

  if (isFirst) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  x = 0;
  baseY += gap;
  noiseX = 0;
  noiseY += difference;

  while (x < window.innerWidth) {
    ctx.beginPath();
    ctx.moveTo(x, y + baseY);

    x += frequency;

    y = getRandomWave(
    noiseX += .004,
    noiseY) *
    wavelength;

    ctx.lineTo(x, y + baseY);
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

}