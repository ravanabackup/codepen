/*********
 * made by Matthias Hurrle (@atzedent)
 */

/** @type {HTMLCanvasElement} */
const canvas = window.canvas
const gl = canvas.getContext("webgl2")
const dpr = Math.max(1, .5 * window.devicePixelRatio)

const vertexSource = `#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

in vec2 position;

void main(void) {
    gl_Position = vec4(position, 0., 1.);
}
`
const fragmentSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*/
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

out vec4 fragColor;

uniform vec2 resolution;
uniform float time;

#define T (-mod(time, 240.))
#define S smoothstep
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define hue(a) (.24+.4*cos(10.3*(a)+vec3(0,83,21)))
#define syl(p,s) (length(p)-s)

float rod(vec3 p, vec2 s) {
	p.z -= clamp(p.z,.0, s.y);

	return syl(p, s.x);
}

vec3 tunnel(vec3 p) {
	vec3 off = vec3(0);
	float d = p.z*.02;
	d = floor(d)+S(.0, 1.,S(.0, 1.,fract(d)));
	d *= 1.7;

	off.x += sin(d)*10.;
	off.y += sin(d*.7)*10.;

	return off;
}

float map(vec3 p) {
	float advance=-T*10.;
	
  vec3 q = p;
	q += tunnel(p);
	p = q-vec3(0, 0, 4);
	p.z += advance;
	
  float rhm = (sin(sin(T)*5.+p.z)*1.2*sin(T*.2));
	p.xy *= rot(p.z*.2);
	p.xy += vec2(1, 0)*.2;
	p.xy += vec2(.5*sin(T*2.), cos(T*2.))*rhm;
  p.xy *= rot(p.z*1.1);
	p.z += .25*rhm;

	float d = 5e5,
	tn = length(q.xy)-2.5,
	rd = .5*rod(p, vec2(max(.05, p.z*.2), 10.));

	d = min(d, -tn);
	d = min(d, rd);

	return d;
}

vec3 dir(vec2 uv, vec3 ro, vec3 t, float z) {
	vec3 up = vec3(0, 1, 0),
	f = normalize(t-ro),
	r = normalize(cross(up, f)),
	u = cross(f, r),
	c = f*z,
	i = c+uv.x*r+uv.y*u,
	d = normalize(i);

	return d;
}

void main(void) {
	vec2 uv = (
		gl_FragCoord.xy-.5*resolution
	)/min(resolution.x, resolution.y);

	vec3 col = vec3(0),
	ro = vec3(0, 0, -4),
	ta = vec3(0);

	float advance=-T*10.;

	ro.z -= advance;
	ta.z -= advance;
	ro -= tunnel(ro);
	ta -= tunnel(ta);

	vec3 rd = dir(uv, ro, ta, 1.),
	p = ro;

	const float steps = 200., maxd = 400.;
	float dd = .0;

	for (float i = .0; i < steps; i++) {
		float d = map(p);

		if (d < 1e-3) break;
		if (dd > maxd) {
			dd = maxd;
			break;
		}

		p += rd*d;
		dd += d;
	}

	col += hue(p.z*.05);

	fragColor = vec4(col, 1);
}`

let time
let buffer
let program
let resolution
let vertices = []

function resize() {
    const { innerWidth: width, innerHeight: height } = window

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

    vertices = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]

    buffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "position")

    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    time = gl.getUniformLocation(program, "time")
    resolution = gl.getUniformLocation(program, "resolution")
}

function draw(now) {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

    gl.uniform1f(time, now * 0.001)
    gl.uniform2f(resolution, canvas.width, canvas.height)
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length * 0.5)
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