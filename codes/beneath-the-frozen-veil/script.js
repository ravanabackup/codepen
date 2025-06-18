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
uniform float time;
uniform int pointerCount;
uniform vec2 touch;

#define mouse (touch/resolution)
#define P pointerCount
#define T time
#define S smoothstep
#define syl(p,s) (length(p)-s)

#define TAU 6.2831853
#define ESN 1.5707963
#define PI 3.14159265

vec3 palette(vec3 k) {
  vec3
  a = vec3(.5),
  b = a,
  c = a+a,
  d = vec3(.3,.2,.2);

  return a+b*cos(TAU*(c*k+d));
}

float tick(float t) {
    return floor(t)+sign(fract(t-5.));
}

mat2 rot(float a) {
  float c = cos(a),
  s = sin(a);
  return mat2(c, -s, s, c);
}

float map(vec3 p) {
  const float n = 3.5;
  vec3
  st = p,
  lp = vec3(8.5, 8.15, 2.95),
  rp = vec3(8.5, 8.85, 2.5);

  for (float i = .0; i < 3.; i++) {
    float d = 1., e = .0;

    for (float j = .0; j < 3.; j++) {
      p = lp-abs(p-rp);
      e = (18.+(9.*step(.5, sin(T*.5))))/(floor(dot(p, p))+pow(S(.0, 1., fract(dot(p, p))), .5));
      d *= e;
      p = abs(p)*e;
    }

    st = st-abs(p);
    st = max(abs(st), -p);
  }

  return syl(st, 1.2);
}

void cam(inout vec3 p) {
  if (P > 0) {
    p.yz *= rot(-mouse.y*PI+ESN);
    p.xz *= rot(PI-mouse.x*TAU);
  } else {
    p.xz *= rot(PI-T*.1);
  }
}

void main(void) {
  float
  mx = max(resolution.x, resolution.y),
  mn = min(resolution.x, resolution.y),
  pr = min(2.,mx/mn);
  vec2 uv = (
    gl_FragCoord.xy-.5*resolution
  )/mn;

  vec3 col = vec3(0),
  ro = vec3(0),
  rd = normalize(vec3(uv, 1./pr));

  cam(ro);
  cam(rd);

  vec3 p = ro;

  const float steps = 30., maxd = 60.;
  for (float i = .0; i < steps; i++) {
    float d = map(p);

    if (d < 1e-3) {
      d = 1e-1;
    }

    if (d > maxd) {
      break;
    }

    p += rd*d;

    col += exp(-log(d))*15e-4;
  }
  
  col *= palette(PI-TAU*sign(sin(PI+T*.25))+exp(-col*4.));
  
  float frq = PI+T*2.;
  
  if (P == 0 && sin(frq*(PI/(3.*TAU))) > .0) {
    float
    b = 125e-4,
    w = b*15.,
    ping = S(b, -b, abs(sin(frq-7.5*length(uv)) - (.5 - w)) - w);    
    col = max(col, mix(col, max(vec3(1), ping), ping*.35*(.45-length(uv))));
  }
  
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