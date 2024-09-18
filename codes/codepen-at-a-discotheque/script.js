/*********
* made by Matthias Hurrle (@atzedent)
*/

/** @type {HTMLCanvasElement} */
const canvas = window.canvas
const gl = canvas.getContext('webgl2')
const dpr = .5 * window.devicePixelRatio
/** @type {Map<string,PointerEvent>} */
const touches = new Map()

const vertexSource = `#version 300 es
precision highp float;

in vec2 position;

void main(void) {
    gl_Position = vec4(position, 0., 1.);
}
`
const fragmentSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*/

precision highp float;

uniform vec2 resolution;
uniform float time;
uniform vec2 touch;
uniform int pointerCount;

const float TAU = radians(360.);
const float PI = TAU * .5;

#define T 4. + time

out vec4 fragColor;

#define MAX_STEPS 80
#define MAX_DIST 20.
#define SURF_DIST .01

struct Material {
	float dist;
	int idx;
};

Material MatMin(Material a, Material b) {
	if (a.dist < b.dist) return a;

	return b;
}

vec3 hsv2rgb(vec3 c) {
	const vec4 K = vec4(1., 2. / 3., 1. / 3., 3.);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6. - K.www);

	return c.z * mix(K.xxx, clamp(p - K.xxx, .0, 1.), c.y);
}

float displacement(in vec3 p, float v) {
	return
	sin(v * p.x) *
	sin(v * p.y) *
	sin(v * p.z);
}

float Rythm() {
	float md = mod(-T, 1.);
	float rhm =
	-max(
		md * (.5 * -cos(T) - .5),
		md * (.5 * sin(T) - .5)
	);

	return rhm;
}

mat2 Rot(float a) {
	float s = sin(a), c = cos(a);

	return mat2(c, -s, s, c);
}

float BoxFrame(vec3 p, vec3 b, float e) {
	p = abs(p)-b;
	vec3 q = abs(p+e)-e;
	const float r = .05;

	return min(min(
		length(
			max(vec3(p.x, q.y, q.z), 0.0))+
		min(max(p.x, max(q.y, q.z)), 0.0) - r,
		length(
			max(vec3(q.x, p.y, q.z), 0.0))+
		min(max(q.x, max(p.y, q.z)), 0.0) - r),
		length(
			max(vec3(q.x, q.y, p.z), 0.0))+
		min(max(q.x, max(q.y, p.z)), 0.0) - r);
}

Material GetDist(in vec3 p) {
	const vec3 pos = vec3(0);
	vec3 q = p - pos;

	q *= 1. + vec3(-1,1,-1) * .1 *
	(.5 * sin(T * 10.) + .5) * .5;

	float sdf = BoxFrame(q, vec3(1., .5, 1.), .125);
	sdf = sdf + displacement(q, 22.*Rythm());

	return
		MatMin(
			MatMin(
				// object
				Material(sdf, 1),
				// wall
				Material(-(length(p.xz)-9.), 2)
			),
			MatMin(
				// floor
				Material(p.y + 2., 0),
				// ceiling
				Material(dot(
        	p,
        	normalize(vec3(0,-1,0))
      	) + 9., 3)
			)
		);
}

Material RayMarch(vec3 ro, vec3 rd) {
	float d = .0;
	Material mat;

	for (int i = 0; i < MAX_STEPS; i++) {
		vec3 p = ro + rd * d;
		mat = GetDist(p);
		d += mat.dist;

		if (d > MAX_DIST || abs(d) < SURF_DIST) break;
	}

	return Material(d, mat.idx);
}

vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
	vec3 f = normalize(l-p),
	r = normalize(cross(vec3(0, 1, 0), f)),
	u = cross(f, r),
	c = f*z,
	i = c + uv.x*r + uv.y*u,
	d = normalize(i);

	return d;
}

vec3 GetNormal(in vec3 p) {
	const vec2 e = vec2(.01, .0);
	float d = GetDist(p).dist;
	vec3 n = d - vec3(
		GetDist(p - e.xyy).dist,
		GetDist(p - e.yxy).dist,
		GetDist(p - e.yyx).dist
	);

	return normalize(n);
}

vec3 Render(inout vec3 ro, inout vec3 rd, inout float ref) {
	Material d = RayMarch(ro, rd);
	vec3 col = vec3(0);

	if (d.dist + SURF_DIST > MAX_DIST) return col;

	vec3 p = ro + rd * d.dist;
	vec3 l = ro;
	vec3 n = GetNormal(p);
	vec3 r = reflect(rd, n);
	vec3 rdn = normalize(rd);

	float fres = pow(clamp(1.-dot(n, rd), .0, 1.), 5.);
	vec3 mat = vec3(0);

	// floor
	if (d.idx == 0) {

		mat = hsv2rgb(
			vec3(
				sin(-length(p.xz)/TAU+T),
				1.,
				1.
			)
		);

		ref = mix(.005, .025, fres);

	}
	// object
	else if (d.idx == 1) {

		mat = mix(col, vec3(0,0,.45), fres);
		ref = mix(.005, .125, fres);

	}
	// wall
	else if (d.idx == 2) {
		// adjust to floor level
		vec3 q = p;
		q.y += 2.;

		mat = hsv2rgb(
			vec3(
				sin(-length(q.xy)/TAU+T),
				1.,
				1. + fract(p.xz)
			)
		);

		ref = mix(.005, .025, fres);

	}
	// ceiling
	else if (d.idx == 3) {

		mat = vec3(1);
		ref = mix(.005, .025, fres);

	}

	// light
	float sky = dot(normalize(l), n) * .5 + .5;

	float spot = clamp(
		dot(rdn, reflect(r, vec3(0,1,0))),
		.0,
		1.
	);
	
	float wall = clamp(
		dot(
			rdn,
			reflect(rdn, vec3(0,1,0))
		),
		.0,
		1.
	);

	col += sky;
	col += .5 * pow(spot, 16.);
	col += .25 * pow(wall, 8.);

	ro = p + n * SURF_DIST * 3.;
	rd = r;

	return col * mat;
}

void main(void) {
	float mn = min(resolution.x, resolution.y);
	float mx = max(resolution.x, resolution.y);
	vec2 uv = (
		gl_FragCoord.xy - .5 * resolution.xy
	) / mix(mn, mx, .5 + .5 * sin(T*.25));

	vec2 m = touch.xy / resolution.xy;
	m.y *= .75;
	m.y -= .125;
	m.y = clamp(m.y, .0, .55);

	bool aut = pointerCount == 0;
	float yz = aut ? .25 - .45*(.5+.5*cos(T*.25)) : -m.y * PI + 1.;
	float xz = aut ? T*.5 : -m.x * TAU;

	vec3 ro = vec3(0, 4, -6);
	ro.yz *= Rot(yz);
	ro.xz *= Rot(xz);

	vec3 rd = GetRayDir(uv, ro, vec3(0), 1.);

	float ref;
	vec3 col = Render(ro, rd, ref);

	for (int i = 0; i < 2; i++) {
		col += ref * Render(ro, rd, ref);
	}

	col = pow(col, vec3(.4545));

	fragColor = vec4(col, 1.0);
}
`
let time;
let buffer;
let program;
let touch;
let resolution;
let pointerCount;
let vertices = []
let touching = false;

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
	touch = gl.getUniformLocation(program, 'touch')
	pointerCount = gl.getUniformLocation(program, 'pointerCount')
	resolution = gl.getUniformLocation(program, 'resolution')
}

function draw(now) {
	gl.clearColor(0, 0, 0, 1.)
	gl.clear(gl.COLOR_BUFFER_BIT)

	gl.useProgram(program)
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

	gl.uniform1f(time, now*.001)
	gl.uniform2f(touch, ...getTouches())
	gl.uniform1i(pointerCount, touches.size)
	gl.uniform2f(
		resolution,
		canvas.width,
		canvas.height
	)
	gl.drawArrays(gl.TRIANGLES, 0, vertices.length * .5)
}

function getTouches() {
  if (!touches.size) {
    return [0,0]
  }
  
  for (let [id, t] of touches) {
    const result = [
      dpr*t.clientX,
      dpr*(innerHeight-t.clientY)
      ]
    
    return result
  }
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
canvas.onpointerdown = e => {
  touching = true 
  touches.set(e.pointerId, e)
}
canvas.onpointermove = e => {
  if (!touching) return
  touches.set(e.pointerId, e)
}
canvas.onpointerup = e => {
  touching = false
  touches.clear()
}
canvas.onpointerout = e => {
  touching = false
  touches.clear()
}