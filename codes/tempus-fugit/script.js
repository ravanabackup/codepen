/*********
 * made by Matthias Hurrle (@atzedent)
 */

/** @type {HTMLCanvasElement} */
const canvas = window.canvas
const gl = canvas.getContext('webgl')
const dpr = window.devicePixelRatio
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches

const vertexSource = `
 #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif
 
  attribute vec2 position;
 
  void main(void)
  {
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

#define SCALE .25
#define PI 3.14159
#define TAU (2. * PI)
#define RAD PI / 180.

uniform bool prefersDark;
uniform float time;
uniform vec2 resolution;
uniform vec3 daytime;

float line(vec2 p, vec2 a, vec2 b) {
	p -= a;
	b -= a;

	float h = clamp(dot(p, b) / dot(b, b), 0., 1.);

	return length(p - b * h);
}

vec2 rot2d(vec2 p, float angle) {
	return mat2(
		cos(angle), - sin(angle),
		sin(angle), cos(angle)
	) * p;
}

float Herp(float x) {
	return 3.*x*x - 2.*x*x*x;
}

vec2 RimSeg(float r, float a, float l, float n) {
	float u = r * (fract(a * n / TAU) - .5) / (n / TAU);
	float v = l - r;

	return vec2(u, v);
}

float Rim(vec2 uv, float scale, float px) {
	uv = rot2d(uv, -PI * .25);
	// radius
	float r = .9 * scale;
	// nbr of segments
	float n = 60.;

	float l = length(uv);
	float a = atan(uv.y, uv.x);
	float i = floor(a * n / TAU) + 3.;

	bool isNotHour = mod(i, 5.) > 0.;
	
	float lb = isNotHour ? .012 * scale : .024 * scale;
	float ub = isNotHour ? .012 * scale + px : .024 * scale + px;
  float d = .03 * scale;
	
	float seg = line (
		vec2(.0),
		RimSeg(r - d, a, l, n),
		RimSeg(r + d, a, l, n)
	);

	return smoothstep(
		lb,
		ub,
		seg
	);
}
  
void main(void) {
	float t = time * .25;
  float scale = SCALE + SCALE * (.5 * sin(t) + .5);
  float mx = min(resolution.x, resolution.y);
  float px = 2. / mx;
  
	vec2 uv = (
    2. * gl_FragCoord.xy - resolution.xy
    ) / mx;
	uv *= scale;

	float k = 90. * RAD;
	float hrs, mns, sec;
	sec = daytime.z * RAD * 6.;
	mns = daytime.y * RAD * 6.;
	hrs = floor(daytime.x * 5. + daytime.y / 12.) * RAD * 6.;

	float alpha, beta, gamma;
	alpha = -sec + k;
	beta = -mns + k;
	gamma = -hrs + k;

  uv += .5;
	uv = rot2d(uv, t);
  uv -= .5;
	float zoom = 1. + 2. * Herp(.5 * sin(t) + 1.);

	vec2 gv = fract(uv * zoom) -.5;
	gv = rot2d(gv, -t);

	float s = line(
		gv,
		vec2(.0),
		vec2(cos(alpha) * .92 * scale, sin(alpha) * .92 * scale)
	);

	float m = line(
		gv,
		vec2(.0),
		vec2(cos(beta) * .92 * scale, sin(beta) * .92 * scale)
	);

	float h = line(
		gv,
		vec2(.0),
		vec2(cos(gamma) * .77 * scale, sin(gamma) * .77 * scale)
	);

	vec3 color = prefersDark ? vec3(.0) : vec3(.96);
	vec3 red = vec3(1., .0, .0);
	vec3 black = vec3(.267);
  vec3 white = vec3(.7);
  vec3 foreground = prefersDark ? white : black;

	float hh = smoothstep(.024 * scale, .024 * scale + px, h);
	float mm = smoothstep(.012 * scale, .012 * scale + px, m);
	float ss = smoothstep(.006 * scale, .006 * scale + px, s);
	float cp = smoothstep(.002 * scale * scale, .002 * scale * scale, dot(gv, gv));

	color = mix(foreground, color, Rim(gv, scale, px));
	color = mix(foreground, color, hh);
	color = mix(foreground, color, mm);
	color = mix(red, color, ss);
	color = mix(red, color, cp);

	gl_FragColor = vec4(color, 1.0);
}
`

let time;
let buffer;
let program;
let resolution;
let daytime;
let prefersDark;
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

function compile(shader, source)
{
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
  {
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

  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
  {
    console.error(gl.getProgramInfoLog(program))
  }

  vertices = [
    -1.0, -1.0,
     1.0, -1.0,
    -1.0, 1.0,
    -1.0, 1.0,
     1.0, -1.0,
     1.0, 1.0
    ]

  buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  const position = gl.getAttribLocation(program, "position")

  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  time = gl.getUniformLocation(program, "time")
  daytime = gl.getUniformLocation(program, 'daytime')
  resolution = gl.getUniformLocation(program, 'resolution')
  prefersDark = gl.getUniformLocation(program, "prefersDark")
}

function draw(now)
{
  gl.clearColor(0, 0, 0, 1.)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

  gl.uniform1i(prefersDark, prefersDarkScheme)
  gl.uniform1f(time, now / 1000)
  gl.uniform2f(
    resolution,
    canvas.width,
    canvas.height
  )
  gl.uniform3fv(daytime, getDaytime());
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

function getDaytime() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  
  return [hours, minutes, seconds]
}

init()

window.onresize = resize