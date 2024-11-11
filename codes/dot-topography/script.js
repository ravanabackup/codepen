console.clear();

// deferred initialization
var animationFrame, gl, nodes, prog;

var config = {
  borderMargin: 0,
  colorBg: [0, 0, 0],
  colorLow: [255, 0, 255],
  colorHigh: [0, 255, 255],
  maxRadius: 2.8,
  posNoise: 0.000998, // noise related to x/y
  spacing: 4.8, // inter-dot distance
  steps: 10, // # of steps between min and max height inclusive
  timeScaling: 0.001459, // noise related to time
  tolerance: 0.28 // basically how fat the color bands are.. at 0.5 the bands should touch
};

// gl attrs
var attributes = {
  a_positions: null };


// gl unis
var uniforms = {
  u_colorLow: null,
  u_colorHigh: null,
  u_maxSteps: null,
  u_pointSize: null,
  u_resolution: null };


// initialized vars
var frame = 0,
simplex = new SimplexNoise();

// fns (alphabetized)
function createProgram(gl, vShader, fShader) {

  function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (success) return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  let vs = createShader(gl, gl.VERTEX_SHADER, vShader),
  fs = createShader(gl, gl.FRAGMENT_SHADER, fShader),
  p = gl.createProgram();


  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);

  if (gl.getProgramParameter(p, gl.LINK_STATUS)) {
    return p;
  } else {
    console.log(gl.getProgramInfo(p));
    gl.deleteProgram(p);
  }
}

function initialize() {
  gl = c.getContext('webgl');
  window.addEventListener('resize', function () {setup();render();});
}

function loadUI() {
  var gui = new dat.GUI();

  var noise = gui.addFolder('Noise');
  noise.add(config, 'posNoise', 0.000001, 0.01).step(0.000001);
  noise.add(config, 'timeScaling', 0.00001, 0.025).step(0.00001);

  var appearance = gui.addFolder('Appearance');
  var bm = appearance.add(config, 'borderMargin', 0, 300).step(1);
  var mr = appearance.add(config, 'maxRadius', 0.1, 20).step(0.25);
  var sp = appearance.add(config, 'spacing', 0.5, 30).step(0.1);
  var st = appearance.add(config, 'steps', 1, 50).step(1);
  appearance.add(config, 'tolerance', 0, 0.5).step(0.01);

  var colors = gui.addFolder('Colors');
  var lc = colors.addColor(config, 'colorLow');
  var hc = colors.addColor(config, 'colorHigh');
  var bg = colors.addColor(config, 'colorBg');

  bm.onChange(function (value) {reset();});
  mr.onChange(function (value) {reset();});
  sp.onChange(function (value) {reset();});
  st.onChange(function (value) {reset();});
  lc.onChange(function (value) {reset();});
  hc.onChange(function (value) {reset();});
  bg.onChange(function (value) {reset();});

  gui.close();
}

function render() {

  let vertices = [],
  fN = frame * config.timeScaling;

  for (var i = 0; i < nodes.length; i++) {
    let xN = nodes[i].x * config.posNoise,
    yN = nodes[i].y * config.posNoise,
    height = scale(simplex.noise3D(xN, yN, fN), -1, 1, 0, config.steps - 1),
    roundedHeight = Math.max(Math.min(Math.round(height), config.steps - 1), 0),
    toAdd = height < roundedHeight + config.tolerance && height > roundedHeight - config.tolerance;

    if (toAdd) {
      vertices.push(nodes[i].x);
      vertices.push(nodes[i].y);
      vertices.push(roundedHeight);
    }
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.drawArrays(gl.POINTS, 0, vertices.length / 3);

  frame++;
  animationFrame = requestAnimationFrame(render);
}

function reset() {
  setup();
  render();
}

function resize(gl) {
  if (animationFrame) cancelAnimationFrame(animationFrame);

  let w = Math.floor(gl.canvas.clientWidth),
  h = Math.floor(gl.canvas.clientHeight);

  if (gl.canvas.width !== w || gl.canvas.height !== h) {
    gl.canvas.width = w;
    gl.canvas.height = h;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}

function scale(x, a, b, A, B) {
  return (x - a) / (b - a) * (B - A) + A;
}

function setup() {
  resize(gl);
  gl.useProgram(prog);

  // bind position attribute
  attributes.a_position = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(attributes.a_position);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.vertexAttribPointer(attributes.a_position, 3, gl.FLOAT, false, 0, 0);

  // bind resolution uniform
  uniforms.u_colorLow = gl.getUniformLocation(prog, 'u_colorLow');
  uniforms.u_colorHigh = gl.getUniformLocation(prog, 'u_colorHigh');
  uniforms.u_maxSteps = gl.getUniformLocation(prog, 'u_maxSteps');
  uniforms.u_pointSize = gl.getUniformLocation(prog, 'u_pointSize');
  uniforms.u_resolution = gl.getUniformLocation(prog, 'u_resolution');

  gl.uniform3f(uniforms.u_colorLow, config.colorLow[0] / 255, config.colorLow[1] / 255, config.colorLow[2] / 255);
  gl.uniform3f(uniforms.u_colorHigh, config.colorHigh[0] / 255, config.colorHigh[1] / 255, config.colorHigh[2] / 255);
  gl.uniform1f(uniforms.u_maxSteps, config.steps - 1);
  gl.uniform1f(uniforms.u_pointSize, config.maxRadius);
  gl.uniform2f(uniforms.u_resolution, gl.canvas.width, gl.canvas.height);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(config.colorBg[0] / 255, config.colorBg[1] / 255, config.colorBg[2] / 255, 1.0);

  let adjustedW = gl.canvas.width - config.borderMargin,
  adjustedH = gl.canvas.height - config.borderMargin;

  nodes = [];

  for (var i = config.borderMargin; i < adjustedW; i += config.spacing) {
    for (var j = config.borderMargin; j < adjustedH; j += config.spacing) {
      nodes.push({
        x: i,
        y: j });

    }
  }
}

initialize();
prog = createProgram(gl, v.text, f.text);
loadUI();
setup();
render();