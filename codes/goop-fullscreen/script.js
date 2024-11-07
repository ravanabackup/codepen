// Constants
const STROKE_COLOR = 'rgba(255, 255, 255, 0)';
const LINE_WIDTH = 4;
const PEAK_AGE = 20;
const DECAY_LENGTH_FACTOR = 20;
const DECAY_WIDTH_FACTOR = 1 / 25;
const SPEED = 1;
const WOBBLE_SPEED = 1 / 300;
const LINE_SPACING_PX = 20;
const NODE_SPACING_PX = 10;
const NEIGHBOR_GAP = 3;
const AMPLITUDE_PX = 6;
const PEAK_HEIGHT_PX = 80;
const DEBUG_COLORS = false;

// State
// Keeping the baseline offset decoupled from `t` lets us transition smoothly
// to !isMoving, etc
let t = 0;
let baselineOffset = 0;
let phase = 0;
let isMoving = true;
let peak = {};

// Simplex noise kicks Perlin noise's butt! Don't let the name fool you :D
const simplex = new SimplexNoise();

// DOM things
const container = document.querySelector('.container');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const h = canvas.height = container.offsetHeight;
const w = canvas.width = container.offsetWidth;
container.appendChild(canvas);

peak.x = w / 2;
peak.y = h;

canvas.addEventListener('mousemove', e => peak = mouseCoords(e));
canvas.addEventListener('click', e => isMoving = !isMoving);

ctx.strokeStyle = STROKE_COLOR;
ctx.lineWidth = LINE_WIDTH;

// Each line is a typed array of node height values.
const MAX_INT_16_VALUE = Math.pow(2, Int16Array.BYTES_PER_ELEMENT * 8 - 1) - 1;
const numNodes = Math.floor(w / NODE_SPACING_PX) + 1;
const numLines = Math.floor(h / LINE_SPACING_PX) + 2 +
Math.ceil(PEAK_HEIGHT_PX / LINE_SPACING_PX);
const lines = Array.from({ length: numLines }, () => {
  const buffer = new ArrayBuffer(numNodes * Int16Array.BYTES_PER_ELEMENT);
  return new Int16Array(buffer);
});

// We also record the ages of peak nodes on a line.
const linePeaks = Array.from({ length: numLines }, () => {
  const buffer = new ArrayBuffer(numNodes * Uint16Array.BYTES_PER_ELEMENT);
  return new Uint16Array(buffer);
});

const hTotal = numLines * LINE_SPACING_PX;

// Self-executing game loop. Here we go!
(function step() {
  // Line & node index for the center of our bell curve.
  const peakNode = {
    x: mod(Math.ceil(peak.x / NODE_SPACING_PX), numNodes),
    y: mod(Math.ceil(peak.y / LINE_SPACING_PX) + 1, numLines) };


  // Clear the last frame
  ctx.clearRect(0, 0, w, h);

  if (isMoving) {
    ++baselineOffset;

    if (t % LINE_SPACING_PX === 0) {
      // Whenever a line shifts off the screen's top, we move it to the
      // front of our array. `phase` keeps track of the array's offset.
      // We could be more clever about this and keep the array intact,
      // but this method has the advantage of matching idx to draw order.
      lines.unshift(lines.pop());
      phase = mod(phase + 1, numLines);
      linePeaks[phase].fill(0);
      baselineOffset = 0;
    }
  }

  // Draw each line sequentially. A few definitions, before we get into it:
  //
  // lineIdx: Loop index. Represents the order things are drawn to the canvas
  //          in, which means it holds a steady y position on the canvas,
  //          independent of phase.
  // phase: Entries in our `lines` array are frequently shifted from the back
  //        of the array to the front. `phase` records how many times the
  //        array has been shifted so we can keep track of specific lines.
  // adjustedLineIdx: The actual line index that should be drawn on this
  //                  step. Represents a single characteristic line that
  //                  evolves over time via the simplex function.
  // peakNode: line (y) and node (x) coordinates of wherever the mouse is.

  for (let lineIdx = 0; lineIdx < numLines; ++lineIdx) {
    // Update our nodes with the next simplex value times a gaussian curve
    // centred on peakNode.
    const adjustedLineIdx = mod(lineIdx + phase, numLines);
    const nodes = lines[adjustedLineIdx];
    const peakNodes = linePeaks[adjustedLineIdx];
    const isHighlighted = peakNode.y === lineIdx;

    if (isHighlighted && !peakNodes[peakNode.x]) {
      let newAge = 1;
      for (let i = peakNode.x - NEIGHBOR_GAP, _len = peakNode.x + NEIGHBOR_GAP; i < _len; ++i) {
        if (peakNodes[i]) {
          newAge = 0;
          break;
        }
      }
      peakNodes[peakNode.x] = newAge;
    }

    for (let nodeIdx = 0; nodeIdx < numNodes; ++nodeIdx) {
      const noise = simplex.noise3D(
      adjustedLineIdx, nodeIdx, t * SPEED * WOBBLE_SPEED);
      let peaksValue = 0;
      let numPeaks = 0;

      for (let peakNodeIdx = 0; peakNodeIdx < numNodes; ++peakNodeIdx) {
        const age = peakNodes[peakNodeIdx] * SPEED;
        if (age) {
          ++numPeaks;
          const ageDiff = age - PEAK_AGE;
          const rising = ageDiff <= 0;
          peaksValue += (noise + 1) / 2 * gaussian2d(
          PEAK_HEIGHT_PX,

          age,
          nodeIdx - peakNodeIdx,

          PEAK_AGE,
          0,

          10 * SPEED * (rising ? 1 : 1 + DECAY_LENGTH_FACTOR),
          0.5 / SPEED * (rising ? 1 : 1 + ageDiff * DECAY_WIDTH_FACTOR * 2));

        }
      }

      // Normalize it. Commented out for now, because the abrupt jump
      // doesn't cut it.
      //
      // peaksValue /= numPeaks || 1;

      // Put some bounds on our node height.
      peaksValue = Math.max(Math.min(peaksValue, PEAK_HEIGHT_PX * 3), 0);

      nodes[nodeIdx] =
      Math.min(MAX_INT_16_VALUE, noise * AMPLITUDE_PX - peaksValue);
    }

    // Visual debugging is fun debugging : )
    if (DEBUG_COLORS) {
      if (false) 'noop';else
      if (adjustedLineIdx === 42) {ctx.strokeStyle = 'orange';} else
      if (lineIdx === 42) {ctx.strokeStyle = 'magenta';} else
      if (phase === lineIdx) {ctx.strokeStyle = 'cyan';} else
      if (phase === 0) {ctx.strokeStyle = 'limegreen';} else
      {ctx.strokeStyle = STROKE_COLOR;}
    }

    // Rainbow!
    ctx.fillStyle = `hsl(${adjustedLineIdx / 7 * 360}, 100%, 50%)`;

    // Draw the line
    const baseline =
    mod(lineIdx * LINE_SPACING_PX - baselineOffset, hTotal) - PEAK_HEIGHT_PX - LINE_SPACING_PX;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, baseline - nodes[0]);
    for (let x = 1; x < numNodes - 1; ++x) {
      const y = nodes[x];

      const midX = x + 0.5;
      const midY = (y + nodes[x + 1]) / 2;

      // Rather than drawing straight lines between nodes, this gives us
      // a curve that *approximates* each node value. If we were trying
      // to represent real data, this wouldn't fly.
      ctx.quadraticCurveTo(x * NODE_SPACING_PX, baseline - y,
      midX * NODE_SPACING_PX, baseline - midY);
    }
    ctx.lineTo(w, baseline);
    ctx.lineTo(w, h);
    ctx.fill();
    ctx.stroke();

    // Increment the peak nodes' ages once we've drawn our line (Probably
    // nicer to set age = timestamp and compare against `t`, but this
    // works).
    for (let peakNodeIdx = 0; peakNodeIdx < numNodes; ++peakNodeIdx) {
      if (peakNodes[peakNodeIdx]) ++peakNodes[peakNodeIdx];
    }
  };

  // And around and around we go...
  t += 1;
  window.requestAnimationFrame(step);
})();

// Util functions
function mouseCoords({ clientX, clientY }) {
  const { left, top } = canvas.getBoundingClientRect();
  return {
    x: clientX - left,
    y: clientY - top + PEAK_HEIGHT_PX / 2 + LINE_SPACING_PX // Fudge
  };
}

// Proper modulo :-)
function mod(a, b) {
  return (a % b + b) % b;
}

function gaussian2d(a, x, y, x0, y0, sigmaX, sigmaY) {
  return a * Math.exp(
  -Math.pow(x - x0, 2) / 2 / Math.pow(sigmaX, 2) -
  Math.pow(y - y0, 2) / 2 / Math.pow(sigmaY, 2));

}