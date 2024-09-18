const dpr = Math.max(1,.5*window.devicePixelRatio)
const canvas = document.createElement("canvas")

document.body.innerHTML = ""
document.body.appendChild(canvas)
document.body.style = "margin:0;overflow:hidden;"
canvas.style.width = "100%"
canvas.style.height = "auto"
canvas.style.objectFit = "contain"

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
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define R resolution
#define T time
#define TAU 6.312853
#define hue(a) (.6+.6*cos(25.13*(a)+vec3(0,83,21)))

void main(void) {
  vec2 uv = (gl_FragCoord.xy-.5*R)/min(R.x, R.y);
  vec3 col = vec3(0);
  const float steps = 140.;
  float n = steps;

  for (float i = .0; i < steps; i++) {
    float k = i/steps;
    vec2 p = vec2(sin(k*TAU), cos(k*TAU));
    p *= sin(-T+k*42.)*.35;
    float d = pow(distance(p, uv)*.5, i);
    if (d < n) {
      col = vec3(1.-k);
      n = d;
    }
  }

  col = hue(sqrt(col));

  O = vec4(col, 1);
}
`
function compile(shader, source) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
    }
}

let gl, programs = [], vertices, buffer;

function setup() {
    gl = canvas.getContext("webgl2")
    const vs = gl.createShader(gl.VERTEX_SHADER)
    
    compile(vs, vertexSource)

    shaders = [fragmentSource]
    programs = shaders.map(() => gl.createProgram())
    
    for (let i = 0; i < shaders.length; i++) {
        let addr = gl.createShader(gl.FRAGMENT_SHADER)
        let program = programs[i]
        
        compile(addr, shaders[i])
        gl.attachShader(program, vs)
        gl.attachShader(program, addr)
        gl.linkProgram(program)
        
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program))
        }
    }

    vertices = [
        -1.,-1., 1.,
        -1.,-1., 1.,
        -1., 1., 1.,
        -1., 1., 1.,
    ]

    buffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    for (let program of programs) {
        const position = gl.getAttribLocation(program, "position")

        gl.enableVertexAttribArray(position)
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

        // uniforms come here...
        program.resolution = gl.getUniformLocation(program, "resolution")
        program.time = gl.getUniformLocation(program, "time")
    }
}

function dispose() {
    if (gl) {
        const ext = gl.getExtension("WEBGL_lose_context")
        if (ext) ext.loseContext()
        gl = null
    }
}

function draw(now, program) {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // uniforms come here...
    gl.uniform2f(program.resolution, canvas.width, canvas.height)
    gl.uniform1f(program.time, now*1e-3)

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length * .5)
}

function loop(now) {
    draw(now, programs[0])
    requestAnimationFrame(loop)
}

function init() {
    dispose()
    setup()
    resize()
    loop(0)
}

function resize() {
    const {
        innerWidth: width,
        innerHeight: height
    } = window

    canvas.width = width * dpr
    canvas.height = height * dpr

    gl.viewport(0, 0, width * dpr, height * dpr)
}

init()
window.onresize = resize