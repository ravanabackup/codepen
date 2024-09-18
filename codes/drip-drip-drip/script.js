/*********
 * made by Matthias Hurrle (@atzedent)
 */

/** @type {HTMLCanvasElement} */
const canvas = window.canvas
const gl = canvas.getContext("webgl2")
const dpr = Math.max(1, .5*window.devicePixelRatio)
/** @type {Map<string,PointerEvent>} */
const touches = new Map()

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
uniform vec2 touch;
uniform float time;
uniform int pointerCount;

const float dither=2.;
const vec3 lcol=vec3(1);

#define mouse (touch/resolution)
#define P pointerCount
#define T mod(time,150.)
#define S smoothstep

float rnd(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

float smin(float a, float b, float k) {
  float h =
  clamp(
    .5+.5*(b-a)/k,
    .0,
    1.
  );

  return mix(b, a, h)-k*h*(1.-h);
}

mat3 rotX(float a) {
  float s = sin(a),
  c = cos(a);

  return mat3(
    vec3(1, 0, 0),
    vec3(0, c, -s),
    vec3(0, s, c)
  );
}

mat3 rotY(float a) {
  float s = sin(a),
  c = cos(a);

  return mat3(
    vec3(c, 0, s),
    vec3(0, 1, 0),
    vec3(-s, 0, c)
  );
}

mat3 rotZ(float a) {
  float s = sin(a),
  c = cos(a);

  return mat3(
    vec3(c, -s, 0),
    vec3(s, c, 0),
    vec3(0, 0, 1)
  );
}

float sph(vec3 p, float s) {
  return length(p)-s;
}

float box(vec3 p, vec3 s, float r) {
  p = abs(p)-s;

  return length(max(p,.0))+
  min(.0, max(max(p.x, p.y), p.z))-r;
}

float map(vec3 p) {
  p.y -= T*2.5;
  p.y = mod(p.y, 5.)-2.5;
  vec3 q = p;
  q.y += T*5.;
  q.y = mod(q.y, 5.)-2.5;
  p *= rotZ(T);
  float sph = sph(q, .5);
  float box = box(p, vec3(1), .05);
  float d = smin(box, -sph, -.25);
  d = min(d, sph);

  return d*.5;
}

vec3 dir(vec2 uv, vec3 ro, vec3 target, float zoom) {
  vec3 up = vec3(0, 1, 0),
  f = normalize(target-ro),
  r = normalize(cross(up, f)),
  u = cross(f, r),
  c = f*zoom,
  i = c+uv.x*r+uv.y*u,
  d = normalize(i);

  return d;
}

vec3 norm(vec3 p) {
  vec2 e = vec2(1e-1, 0);
  float d = map(p);
  vec3 n = d - vec3(
    map(p-e.xyy),
    map(p-e.yxy),
    map(p-e.yyx)
  );

  return normalize(n);
}

void cam(inout vec3 p) {
  if (P > 0) {
    p *= rotX(clamp(mouse.y,.25,.75)*acos(-1.)+acos(.0));
    p *= rotY(mouse.x*acos(-1.)*2.);
  } else {
    p *= rotX(.5770-cos(T*.25)*.6);
    p *= rotY(.5770+T*.25);
  }
}

void main(void) {
  vec2 uv = (
    gl_FragCoord.xy -.5 * resolution.xy
  ) / min(resolution.x, resolution.y);

  vec3 col = vec3(0),
  ro = vec3(0, 0, (P > 0?.0: exp(-cos(T*.5)*.6))-6.),
  lp = vec3(1, 2, -6.5);

  cam(ro);

  vec3 rd = dir(uv, ro, vec3(0), 1.),
  //-S(.1,.9,sin(.5*T)*.5+.5)*.2),
  p = ro;

  const float steps = 400., maxd = 20.;
  float dd = .0,
  ii = .0,
  at = .0,
  atl = .0,
  side = 1.;
  for (float i = .0; i < steps; i++, ii = i) {
    float d = map(p)*side;

    if (d < 1e-3) {
      vec3 r = normalize(rd);
      vec3 n = norm(p)*side;
      vec3 l = normalize(lp-p);

      if (dot(l, n) < .0) l = -l;

      vec3 h = normalize(l-r);

      float diff = max(.0, dot(l, n)),
      fres = pow(.25-max(.0, dot(n, r)), 9.),
      dnh = max(.0, dot(n, h)),
      fade = pow(S(.0, 1.,1./dot(p-lp, p-lp)),.25),
      shds = pow(dnh, 128.);

      col += diff*(
        5.*fres+.24*pow(dnh, 32.)+
        .125*shds
      )*fade*10.;

      col += shds*
      lcol*
      dither*rnd(T+(p*12.599).yz);

      side = -side;
      d = 1e-1;

      rd = refract(rd, n, 1.+.45*side);
    }
    if (dd > maxd) {
      dd = maxd;
      break;
    }
    p += rd*d;
    dd += d;
    at += .1*(1./dd);
    atl += .5*exp(dither*rnd(T+(p*45.657).xz)-dot(p-lp, p-lp)*.25);
  }

  col += ii*4e-4;
  col += pow(S(-.5, 1.5, at)*88e-2, 24.);
  col += pow(atl, 4.)*lcol;
  col = exp(-col*8.);
  col = sqrt(col);
  col = exp(-col*4.);

  fragColor = vec4(col, 1);
}
`
let time
let buffer
let program
let touch
let resolution
let pointerCount
let vertices = []
let touching = false

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
    touch = gl.getUniformLocation(program, "touch")
    pointerCount = gl.getUniformLocation(program, "pointerCount")
    resolution = gl.getUniformLocation(program, "resolution")
}

function draw(now) {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

    gl.uniform1f(time, now * 0.001)
    gl.uniform2f(touch, ...getTouches())
    gl.uniform1i(pointerCount, touches.size)
    gl.uniform2f(resolution, canvas.width, canvas.height)
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length * 0.5)
}

function getTouches() {
    if (!touches.size) {
        return [0, 0]
    }

    for (let [id, t] of touches) {
        const result = [dpr * t.clientX, dpr * (innerHeight - t.clientY)]

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