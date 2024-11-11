const TAU = Math.PI * 2;

var config = {
  borderMargin: 100,
  colorStart: 0, // hue
  colorEnd: 330, // hue
  glitchThreshold: 1, // probably wanna keep this close to 1 (1 disables it completely)
  maxRadius: 1.5,
  posNoise: 0.0035, //0.00229, // noise related to x/y
  spacing: 5, // inter-dot distance
  steps: 25, // # of steps between min and max height inclusive
  timeScaling: 0.015, // noise related to time
  tolerance: 0.5 // basically how fat the color bands are.. at 0.5 the bands should touch
};

// initialized vars
var frame = 0,
simplex = new SimplexNoise(),
nodes = [];

// deferred initialization
var w, h, cx;

function loadUI() {
  // todo
}

function render() {
  cx.beginPath();
  cx.fillStyle = 'black';
  cx.rect(0, 0, w, h);
  cx.fill();
  cx.closePath();

  let colorGroups = [],
  fN = frame * config.timeScaling;

  for (var i = 0; i < config.steps; i++) {colorGroups[i] = [];}

  // figure out the new "height" value for each node... push to the relevant colorGroup index
  for (var i = 0; i < nodes.length; i++) {
    let xN = nodes[i].x * config.posNoise,
    yN = nodes[i].y * config.posNoise,
    height = scale(simplex.noise3D(xN, yN, fN), -1, 1, 0, config.steps - 1),
    roundedHeight = Math.max(Math.min(Math.round(height), config.steps - 1), 0),
    toAdd = height < roundedHeight + config.tolerance &&
    height > roundedHeight - config.tolerance;

    nodes[i].c = `hsla(${scale(roundedHeight, 0, config.steps, config.colorStart, config.colorEnd)}, 100%, 50%, 1)`;

    if (toAdd) {
      nodes[i].h = roundedHeight;
      // try {
      colorGroups[roundedHeight].push(nodes[i]);
      // } catch(e) {
      //   // wtf does this error sometimes?  still working on it...
      //   console.log(e);
      //   console.log(roundedHeight);
      // }
    }
  }

  // optimization:  draw like colors together
  for (var i = 0; i < colorGroups.length; i++) {
    if (colorGroups[i].length > 0) {
      cx.beginPath();
      cx.fillStyle = colorGroups[i][0].c;
      for (var j = 0; j < colorGroups[i].length; j++) {
        if (Math.random() < config.glitchThreshold) {
          // intentional glitch effect.. to end it comment this out or set the glitch threshold to 1
          // what this basically means is that between arc calls, we'll ocassionally not MOVE to the next arc x,y but draw a LINE there
          cx.moveTo(colorGroups[i][j].x, colorGroups[i][j].y);
        }
        cx.arc(colorGroups[i][j].x, colorGroups[i][j].y, config.maxRadius, 0, TAU);
      }
      cx.fill();
      cx.closePath();
    }
  }

  frame++;
  requestAnimationFrame(render);
}

function scale(x, a, b, A, B) {
  return (x - a) / (b - a) * (B - A) + A;
}

function setup() {
  cx = c.getContext('2d');
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;

  let adjustedW = w - config.borderMargin,
  adjustedH = h - config.borderMargin;

  for (var i = config.borderMargin; i < adjustedW; i += config.spacing) {
    for (var j = config.borderMargin; j < adjustedH; j += config.spacing) {
      nodes.push({
        x: i,
        y: j,
        h: 0,
        c: 0 });

    }
  }
}

setup();
render();