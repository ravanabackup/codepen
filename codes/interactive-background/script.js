const canvas = document.createElement("canvas")
const gl = canvas.getContext("webgl2")

document.title = "🤖"
document.body.innerHTML = ""
document.body.appendChild(canvas)
document.body.style = "margin:0;touch-action:none;overflow:hidden;"
canvas.style.width = "100%"
canvas.style.height = "auto"
canvas.style.userSelect = "none"

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
     *
     * Adaptation of "Jello Lights" by yozic
     * Source: https://www.shadertoy.com/view/tttfR2
     */
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;https://codepen.io/atzedent
    #endif
    
    out vec4 fragColor;
    
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 touch;
    uniform int pointerCount;
    
    #define mouse (touch/resolution)
    #define P pointerCount
    #define T (42.+time)
    #define S smoothstep
    #define PI 3.14159265
    #define TAU 6.2831853
    
    #define FAC 42.
    #define KEY 1.1
    #define POW 3.5
    #define ZOOM 300.
    
    float rnd(float a) {
    	return fract(sin(a*12.599)*78.233);
    }
    
    float curve(float t, float e) {
    	t/=e;
    
    	return mix(
    		rnd(floor(t)),
    		rnd(floor(t)+1.),
    		pow(S(.0,1.,fract(t)),10.)
    	);
    }
    
    void main(void) {
    	vec2 uv = (
    		gl_FragCoord.xy -.5 * resolution
    	) / min(resolution.x, resolution.y);
    
    	vec3 col = vec3(0);
    
    	uv *= ZOOM;
    	const float steps = 20.;
    
    	for (float i=.0; i<steps; i++) {
        uv.y -= sin(T)*.125;
    		uv.x += i*2e1*sin(uv.x*.1)*.2*cos(uv.y*.05)*.2;
    
    		float
    		t = FAC*i*PI/steps+T*.2,
    	  x = cos(t),
    	  y = sin(t*.1);
    
    		vec2 p = 15e1*vec2(x,y)/sin(TAU*(sin(uv.x*.025+(P>0?1.-mouse.x*.78:.2*T-curve(T*.1, 1.2)))));
    	  col += 1.1*i/length(uv-p)*(cos(vec3(0,1,-1)*PI*KEY+PI*i*.2)*.5+.5);
    	}

      col = pow(col, vec3(POW));
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

window.addEventListener("pointermove", e => mouse.update(e.clientX, e.clientY, e.pointerId))
window.addEventListener("pointerout", e => mouse.remove(e.pointerId))