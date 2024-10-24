function getRandomWave(x, y) {
  return noise.simplex2(x, y);
}

function adjustCanvas(canvasElement) {
  canvasElement.width = window.innerWidth * 90 / 100;
  canvasElement.height = window.innerWidth * 55 / 100;
  return canvasElement;
}

window.addEventListener('resize', () => {
  adjustCanvas(canvas);
  reset();
});

var canvasContainer = document.getElementById('canvasContainer');
var canvas = adjustCanvas(document.createElement('canvas'));
var ctx = canvas.getContext('2d');
canvasContainer.appendChild(canvas);
canvas.addEventListener('click', reset);

var noiseX, noiseY, difference, x, y, thickness, frequency, gap, wavelength, baseY;

var colors = [
'blue',
'blue',
'hotpink',
'hotpink',
'hotpink',
'hotpink',
'hotpink'];


var texts = [
'Reality',
'Existence',
'Universe',
'Life',
'Eternity'];


function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function maybeNegative(number) {
  return Math.random() >= .5 ? number : -number;
}

function createText(content) {
  const container = document.createElement('div');
  container.classList.add('text-container');
  container.id = 'text-element';
  const child = document.createElement('p');
  child.classList.add('text');
  child.innerHTML = content;
  const y = maybeNegative(Math.random() * 25);
  child.style.setProperty('--y', `${y}deg`);
  const z = maybeNegative(Math.random() * 25);
  child.style.setProperty('--z', `${z}deg`);
  container.appendChild(child);
  return container;
}

reset();

function reset() {
  noiseX = noiseY = 0;
  x = y = 0;
  difference = .025;
  thickness = 2 + Math.round(Math.random() * 1);
  frequency = 2;
  gap = thickness + 1 + Math.round(Math.random() * 1);
  wavelength = 10;
  baseY = -wavelength;
  noise.seed(Math.random());
  draw(null, true);
  var textElement = document.querySelector('#text-element');
  if (textElement) {
    textElement.remove();
  }
  canvasContainer.appendChild(createText(randomFrom(texts)));
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
    ctx.strokeStyle = randomFrom(colors);
    ctx.stroke();
  }

}