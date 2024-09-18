const choose = a => a[Math.floor(Math.random() * a.length)]
const speeds = [.9]
const resont = [.5]
const volmns = [1]
const options = {
  volume: choose(volmns),
  resonance: choose(resont),
  speed: choose(speeds)
}

const Composer = () => {
  let context, main, verb, bus, compressor

  const trigger = Object.freeze({
    trig: function () {
      let prev = 0
      let t = false
      return function (val) {
        t = prev < 0 && val >= 0
        prev = val
        return t
      }
    },
    change: function () {
      let prev = 0
      let t = false
      return function (val) {
        t = prev != val
        prev = val
        return t
      }
    },
    pulse: function (threshold) {
      let prev = 0
      let t = false
      return function (b) {
        if (b) prev++
        if (prev == threshold) {
          t = true
          prev = 0
        } else { t = false }
        return t
      }
    }
  })

  const lowTrig = trigger.trig()
  const highTrig = trigger.trig()
  const bassTrig = trigger.trig()
  const lowChanged = trigger.change()
  const bassChanged = trigger.change()
  const highChanged = trigger.change()
  const pulseTrig = trigger.trig()
  const pulsed = trigger.pulse(10)
  const roots = [21, 23, 24, 26, 28, 30]

  let b = Float32Array.from({ length: 3 }, () => Math.random() * 2 - 1)
  let m = [0, 4, 0, 9, 0, 4, 9]
  let root = pickItem(b[1], 0, 20, roots)

  options.rand = lerp(b[2], -1, 1, 0.05, 1)

  function loop() {
    main.gain.value = dbamp(lerp(options.volume, 0, 1, -60, 3))
    compose()
    setTimeout(() => loop(), expInterp(options.speed, 0, 1, 800, 80))
  }

  function compose() {
    b = Float32Array.from({ length: 24 }, () => Math.random() < .25 ? Math.random() * 2 - 1 : 0)

    if (pulsed(pulseTrig(b[0]))) {
      root = pickItem(b[1], 0, 20, [21, 25, 28, 33])
      console.table(options)
    }

    if (lowTrig(b[21])) {
      const note = pickNote(b[21], 15, 35)
      if (lowChanged(note)) {
        sine(
          midicps(note),
          pickVolume(b[22], -24, -9),
          b[23]
        )
      }
    }

    {
      const note = pickNote(b[11], 20, 40)
      if (highChanged(note)) {
        tri(
          midicps(note),
          pickVolume(b[12], -24, -9),
          b[13]
        )
      }
      sine(
        midicps(pickNote(b[11], 15, 35)),
        pickVolume(b[12], -20, -3),
        b[13]
      )
    }
    if (bassTrig(b[11])) {
      const note = pickNote(b[11], 5, 15)
      if (bassChanged(note)) {
        sine(
          midicps(note),
          pickVolume(b[12], -30, -25),
          b[13]
        )
      }
    }    
    
  }

  function pickItem(v, a, b, array) {
    return array[round(lerp(v, -1, 1, a, b)) % (array.length - 1)]
  }

  function pickNote(v, a, b) {
    return deg2key(lerp(v, -1, 1, a, b), m) + root
  }

  function pickVolume(v, a, b) {
    return dbamp(lerp(v, -1, 1, a, b))
  }

  function mod(n, m) { return ((n % m) + m) % m }

  function div(a, b) { return a / b >> 0 }

  function deg2key(degree, mode) {
    const size = mode.length
    const deg = round(degree)
    return (12 * div(deg, size)) + mode[mod(deg, size)]
  }

  function fractInterp(a, b, fraction) {
    return a + fraction * (b - a)
  }

  function expInterp(x, a, b, c, d) {
    if (x <= a) {
      return c
    }
    if (x >= b) {
      return d
    }
    return Math.pow(d / c, (x - a) / (b - a)) * c
  }

  function lerp(x, a, b, c, d) {
    if (x <= a) {
      return c
    }
    if (x >= b) {
      return d
    }
    return (x - a) * (d - c) / (b - a) + c
  }

  function round(a) { return (a + (a > 0 ? 0.5 : -0.5)) << 0 }

  function midicps(a) { return 440. * Math.pow(2.0, (a - 69.0) * 0.083333333333) }

  function dbamp(a) { return Math.pow(10, a * 0.05) }

  function createReverb(context) {
    const length = 4 * context.sampleRate
    const decay = 0.8
    const buffer = context.createBuffer(2, length, context.sampleRate)
    const noiseData = [buffer.getChannelData(0), buffer.getChannelData(1)]

    const noise = Float32Array.from({ length }, () => Math.random() * 2 - 1)

    for (let i = 0; i < length; i++) {
      const k = noise[i]
      noiseData[0][i] = k * Math.pow(1 - i / length, decay)
      noiseData[1][i] = k * Math.pow(1 - i / length, decay)
    }

    const convolver = context.createConvolver()
    convolver.buffer = buffer

    return convolver
  }

  function init() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext
    context = new AudioContext({ latencyHint: 'balanced' })

    verb = createReverb(context)
    compressor = context.createDynamicsCompressor()
    main = context.createGain()
    bus = context.createGain()
    bus.connect(verb)
    verb.connect(main)
    main.connect(compressor)
    compressor.ratio.value = 4
    compressor.release.value = .25
    compressor.threshold.value = -35
    compressor.connect(context.destination)

    console.table(options)

    requestAnimationFrame(loop)
  }

  function instrument(freq, amp, pan, type, att, rel, detune) {
    const HALF_PI = Math.PI * 0.5
    const vco = context.createOscillator()
    const vca = context.createGain()
    const out = context.createGain()
    const panner = context.createStereoPanner()
    //const wave = context.createPeriodicWave([.8, .75, .125, .0, .03, .25, .3, .1],[0, 0, 0, 0, 0, 0, 0, 0]);
    panner.pan.value = pan
    vco.detune.value = detune
    //vco.setPeriodicWave(wave) // if type is 'custom'
    vco.type = type //triangle, sine, square, sawtooth, custom
    vco.frequency.value = freq
    // xfade resonance
    out.gain.value = Math.cos(options.resonance * HALF_PI)
    bus.gain.value = Math.cos((1.0 - options.resonance) * HALF_PI)
    vco.connect(vca)
    vca.connect(panner)
    panner.connect(out)
    out.connect(main)
    panner.connect(bus)
    // env
    const now = context.currentTime
    const attack = now + att
    const release = attack + rel
    vca.gain.value = .0
    vca.gain.setValueAtTime(vca.gain.value, now)
    vca.gain.linearRampToValueAtTime(amp, attack)
    vca.gain.exponentialRampToValueAtTime(0.001, release)
    vco.start(now)
    // gc
    vco.stop(release + 0.1)
    setTimeout(() => vco.disconnect(), 1000 * (release + 0.2))
  }

  function sine(freq, amp, pan) {
    instrument(freq, amp, pan, 'sine', .01, .125, 0)
  }

  function tri(freq, amp, pan) {
    instrument(freq, amp, pan, 'triangle', .01, .125, Math.sqrt(freq))
  }

  function saw(freq, amp, pan) {
    instrument(freq, amp, pan, 'sawtooth', .025, .85, Math.sqrt(freq))
  }

  let bkpVol = options.volume
  function toggle() {
    if (options.volume > 0) {
      bkpVol = options.volume
      options.volume = 0
    } else {
      options.volume = bkpVol
    }
  }

  play.addEventListener("click", () => {
    if (!context) init()
    else toggle()
  })
}

const canvas = document.createElement("canvas")
const gl = canvas.getContext("webgl2")

document.title = "🎄"
document.body.innerHTML = ""
document.body.appendChild(canvas)
document.body.style = "margin:0;touch-action:none;overflow:hidden"
canvas.style.width = "100%"
canvas.style.height = "auto"
canvas.style.userSelect = "none"

const style = document.createElement("style")
style.innerHTML = `
input {
  all: unset;
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 2rem;
  opacity: .2;
  filter: saturate(0) invert(1);
  cursor: pointer;
  transition: opacity 500ms ease-in-out;
}

input:hover {
  opacity: 1;
}

input::after {
  content: '${"\\1f508"}';
}

input:checked::after {
  content: '${"\\1f50a"}';
}
`
document.body.appendChild(style)

const playCtrl = document.createElement("input")
playCtrl.setAttribute("type", "checkbox")
playCtrl.setAttribute("id", "play")
playCtrl.style = "position:fixed;top:1rem;right:1rem;"
document.body.appendChild(playCtrl)

Composer()

const dpr = window.devicePixelRatio

function resize() {
  const {
    innerWidth: width,
    innerHeight: height
  } = window

  canvas.width = width * dpr
  canvas.height = height * dpr

  gl.viewport(0, 0, width * dpr, height * dpr)
}
window.onresize = resize

const vertexSource = `#version 300 es
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif
  
  in vec4 position;
  
  void main(void) {
      gl_Position = position;
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
  uniform vec2 touch;
  uniform int pointerCount;
  #define mouse (touch / R)
  #define P pointerCount
  #define T time
  #define R resolution
  #define S smoothstep
  #define hue(a)(.6 + .6 * cos(6.3 * (a) + vec3(0, 23, 21)))
  #define rot(a) mat2(cos(a - vec4(0, 11, 33, 0)))

  float rnd(vec2 p) {
    return fract(sin(dot(p, p.yx+vec2(234,543)))*345678.);
  }
  
  float rnd(float a) {
    return fract(sin(a * 711.599) * 756.839);
  }
  
  float curve(float a, float b) {
    a /= b;
  
    return mix(
      rnd(floor(a)),
      rnd(floor(a) + 1.),
      pow(S(.0, 1., fract(a)), 10.)
    );
  }
  
  float tick(float t, float e) {
    return floor(t) + pow(S(.0, 1., fract(t)), e);
  }
  
  float codepen(vec3 p, vec3 s, float e, float r) {
    p = abs(p) - s;
    vec3 q = abs(p + e) - e;
  
    return min(min(
        length(
          max(vec3(p.x, q.y, q.z), .0)) +
        min(max(p.x, max(q.y, q.z)), .0) - r,
        length(
          max(vec3(q.x, p.y, q.z), .0)) +
        min(max(q.x, max(p.y, q.z)), .0) - r),
      length(
        max(vec3(q.x, q.y, p.z), .0)) +
      min(max(q.x, max(q.y, p.z)), .0) - r);
  }
  
  float map(vec3 p) {
    return codepen(p, vec3(1, .5, 1), .1, .0125);
  }
  
  void cam(inout vec3 p, vec2 uv) {
    if (P > 0) {
      p.yz *= rot(-mouse.y * 3.1415 + 1.5707);
      p.xz *= rot(3.1415 - mouse.x * 6.3);
    } else {
      p.yz *= rot(2. * sin(T * .5) * curve(T * .2, .2));
      p.xz *= rot(
        1.5707 * sin(tick(T, 4.)) *
        (-1. + 2. * curve(
          10. * sin(T) * curve(rnd(uv) * 5. * sin(T), 5.), 4.))
      );
    }
  }
  
  void main(void) {
    vec2 uv = (gl_FragCoord.xy - .5 * R) / min(R.x, R.y);
    vec3 p = vec3(0, 0, -3),
      rd = normalize(vec3(uv, 1));
  
    cam(p, uv);
    cam(rd, uv);
  
    vec3 col = vec3(0);
    for (float i = .0; i < 40.; i++) {
  
      if (abs(p.z) > 4.) break;
  
      float d = map(p) * mix(.75, 1., fract(sin(dot(p.xz, uv + vec2(234, 543))) * 345678.));
  
      if (d < 5e-2) {
        vec3 q=p;
        q.y-=mod(T*.2,90.);
        q.xz*=rot(T*.2);
        d = 5e-1 * (length(cos(dot(sin(q * 20.), vec3(-.8))) * .5));
      }
  
      p += rd * d;
  
      col += 4e-4 / d * (i * hue(sin(T - length(p))));;
    }
  
    fragColor = vec4(col, 1);
  }
  `

function compile(shader, source) {
  gl.shaderSource(shader, source)
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
  }
}

let program

function setup() {
  const vs = gl.createShader(gl.VERTEX_SHADER)
  const fs = gl.createShader(gl.FRAGMENT_SHADER)

  compile(vs, vertexSource)
  compile(fs, fragmentSource)

  program = gl.createProgram()

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
  }
}

let vertices, buffer

function init() {
  vertices = [
      -1., -1., 1.,
      -1., -1., 1.,
      -1., 1., 1.,
      -1., 1., 1.,
    ]

  buffer = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  const position = gl.getAttribLocation(program, "position")

  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  program.resolution = gl.getUniformLocation(program, "resolution")
  program.time = gl.getUniformLocation(program, "time")
  program.touch = gl.getUniformLocation(program, "touch")
  program.pointerCount = gl.getUniformLocation(program, "pointerCount")
}

const mouse = {
  x: 0,
  y: 0,
  touches: new Set(),
  update: function(x, y, pointerId) {
    this.x = x * dpr;
    this.y = (innerHeight - y) * dpr;
    this.touches.add(pointerId)
  },
  remove: function(pointerId) { this.touches.delete(pointerId) }
}

function loop(now) {
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.uniform2f(program.resolution, canvas.width, canvas.height)
  gl.uniform1f(program.time, now * 1e-3)
  gl.uniform2f(program.touch, mouse.x, mouse.y)
  gl.uniform1i(program.pointerCount, mouse.touches.size)
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length * .5)
  requestAnimationFrame(loop)
}

setup()
init()
resize()
loop(0)

window.addEventListener("pointerdown", e => mouse.update(e.clientX, e.clientY, e.pointerId))
window.addEventListener("pointerup", e => mouse.remove(e.pointerId))
window.addEventListener("pointermove", e => {
  if (mouse.touches.has(e.pointerId))
    mouse.update(e.clientX, e.clientY, e.pointerId)
})