/*********
 * made by Matthias Hurrle (@atzedent)
 */

/** @type {HTMLCanvasElement} */
const canvas = window.canvas
const gl = canvas.getContext('webgl')
const dpr = window.devicePixelRatio

const vertexSource = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec2 position;

void main(void) {
    gl_Position = vec4(position, 0., 1.);
}
`
const fragmentSource = `
/*********
* made by Matthias Hurrle (@atzedent)
*/

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

const float PI = radians(180.);
const float TAU = 2. * PI;

#define T 4.8 + time
#define S smoothstep

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1., 2. / 3., 1. / 3., 3.);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6. - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, .0, 1.), c.y);
}

mat2 rot( in float a) {
  float s = sin(a),
    c = cos(a);

  return mat2(c, -s, s, c);
}

float dist(vec2 p) {
  p = abs(p);

  float c = dot(p, normalize(vec2(1, 1.73)));
  c = max(c, p.x);

  return c;
}

vec4 coord(vec2 uv) {
  vec2 r = vec2(1., 1.73);
  vec2 h = r * .5;
  vec2 a = mod(uv, r) - h;
  vec2 b = mod(uv - h, r) - h;

  vec2 gv = length(a) < length(b) ? a : b;

  float x = atan(gv.x, gv.y);
  float y = .5 - dist(gv);
  vec2 id = uv - gv;

  return vec4(x, y, id.x, id.y);
}


void main(void) {
  float mn = max(resolution.x, resolution.y);
  float rhm = .5 + .5 * sin(T * .1);
  float zoom = .5 + .5 * S(.0, 1., rhm);
  vec2 uv = (
    gl_FragCoord.xy - .5 * resolution.xy
  ) / (mn - mn * .4 * rhm);

  uv *= rot(T * .1) * zoom;

  vec4 grid = coord(uv * 10.);
  float beat = .5 + .5 * S(.0, 1., rhm * .5);
  float fig = 4. * TAU;

  vec3 color = hsv2rgb(
    vec3(
      mod(T - T * beat + fig *
      grid.y, 360.) / 2.*(1./zoom),
      1.,
      exp(log(rhm))
    )
  );

  color = normalize(color);
  
  gl_FragColor = vec4(color, 1.);
}
`
let time;
let buffer;
let program;
let resolution;
let vertices = []

function resize() {
  const {
    innerWidth: width,
    innerHeight: height
  } = window

  canvas.width = width * dpr
  canvas.height = height * dpr

  gl.viewport(0, 0, width * dpr, height * dpr)
}

function compile(shader, source) {
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
  }
}

function setup() {
  const vs = gl.createShader(gl.VERTEX_SHADER)
  const fs = gl.createShader(gl.FRAGMENT_SHADER)

  program = gl.createProgram()

  compile(vs, vertexSource)
  compile(fs, fragmentSource)

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
  }

  vertices = [
		-1.0,
		-1.0,
		1.0,
		-1.0,
		-1.0,
		1.0,
		-1.0,
		1.0,
		1.0,
		-1.0,
		1.0,
		1.0
	]

  buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  const position = gl.getAttribLocation(program, "position")

  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  time = gl.getUniformLocation(program, "time")
  resolution = gl.getUniformLocation(program, 'resolution')
}

function draw(now) {
  gl.clearColor(0, 0, 0, 1.)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

  gl.uniform1f(time, now * .001)
  gl.uniform2f(
    resolution,
    canvas.width,
    canvas.height
  )
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length * .5)
}

function loop(now) {
  draw(now)
  requestAnimationFrame(loop)
}

function init() {
  setup()
  resize()
  loop(0)
}

document.body.onload = init
window.onresize = resize