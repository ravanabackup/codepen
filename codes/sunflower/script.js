const canvas = document.createElement('canvas'),_canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d'),_ctx = _canvas.getContext('2d');
const avgGapPx = 12;
const lineWidth = 2;
const margin = 0.2;
const resolutionScale = 2;
const maxWidth = 840;
const maxHeight = maxWidth;

const fullWidth = canvas.width = _canvas.width = Math.min(maxWidth, Math.min(window.innerWidth, window.innerHeight) * resolutionScale);
const fullHeight = canvas.height = _canvas.height = Math.min(maxHeight, fullWidth);
canvas.style.width = `${fullWidth / resolutionScale}px`;
canvas.style.height = `${fullHeight / resolutionScale}px`;

const width = fullWidth * (1 - margin * 2);
const height = fullHeight * (1 - margin * 2);

function draw(t) {
  ctx.clearRect(0, 0, fullWidth, fullHeight);

  ctx.save();
  ctx.strokeStyle = '#972';
  ctx.lineWidth = lineWidth;
  ctx.globalCompositeOperation = 'xor';
  ctx.translate(fullWidth * margin, fullHeight * margin);

  const xDeltas = Array.from({ length: Math.ceil(2 * width / avgGapPx) }, () => avgGapPx * (1.5 - Math.random()));
  const yDeltas = Array.from({ length: Math.ceil(2 * height / avgGapPx) }, () => avgGapPx * (1.5 - Math.random()));
  const points = Array.from(xDeltas, () => Array.from(yDeltas, () => 0));
  for (let yIdx = 0, y = 0, maxXIdx = Infinity; yIdx < yDeltas.length; ++yIdx) {
    let xIdx = 0;
    for (x = 0; xIdx < xDeltas.length; ++xIdx) {
      points[xIdx][yIdx] = [x, y + (Math.random() - 0.5) * avgGapPx];
      if (xIdx && yIdx) {
        ctx.beginPath();
        ctx.moveTo(...points[xIdx - 1][yIdx]);
        ctx.lineTo(x, y);
        ctx.lineTo(...points[xIdx][yIdx - 1]);
        ctx.stroke();
      } else if (xIdx) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(...points[xIdx - 1][yIdx]);
        ctx.stroke();
      } else if (yIdx) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(...points[xIdx][yIdx - 1]);
        ctx.stroke();
      }
      if (x > width || xIdx === maxXIdx) {
        break;
      }
      x += xDeltas[xIdx] + (Math.random() - 0.5) * avgGapPx / 3;
    }
    if (y > height) break;
    maxXIdx = xIdx;
    y += yDeltas[yIdx];
  }
  ctx.restore();

  // Rotate the canvas a few times and stamp it back on itself.
  _ctx.putImageData(ctx.getImageData(0, 0, fullWidth, fullHeight), 0, 0);
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  ctx.clearRect(0, 0, fullWidth, fullHeight);
  for (let r = 0; r < 8; ++r) {
    ctx.save();
    ctx.translate(fullWidth / 2, fullHeight / 2);
    ctx.rotate(0.0625 * r * Math.PI + t / 2e4);
    ctx.translate(-fullWidth / 2, -fullHeight / 2);
    ctx.drawImage(_canvas, 0, 0);
    ctx.restore();
  }
  ctx.restore();
  // console.log(`Took ${(performance.now() - t) / 1e3} seconds to draw.`);
}

// canvas.addEventListener('click', draw);
requestAnimationFrame(function loop(t) {
  draw(t);
  requestAnimationFrame(loop);
});
document.body.append(canvas);