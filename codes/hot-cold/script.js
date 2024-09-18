const dpr = window.devicePixelRatio
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
  uniform float time;
  uniform vec2 resolution;
  #define FC gl_FragCoord.xy
  #define R resolution
  #define T time
  #define S smoothstep
  #define hue(a) (.6*.6+cos(10.3*(a)+vec3(0,83,21)))
  
  //	Simplex 4D Noise
  //	by Ian McEwan, Ashima Arts
  //
  vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
  }
  float permute(float x) {
    return floor(mod(((x*34.0)+1.0)*x, 289.0));
  }
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  float taylorInvSqrt(float r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  vec4 grad4(float j, vec4 ip) {
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p,
    s;
  
    p.xyz = floor(fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;
  
    return p;
  }
  
  float snoise(vec4 v) {
    const vec2 C = vec2(0.138196601125010504, // (5 - sqrt(5))/20  G4
      0.309016994374947451); // (sqrt(5) - 1)/4   F4
    // First corner
    vec4 i = floor(v + dot(v, C.yyyy));
    vec4 x0 = v - i + dot(i, C.xxxx);
  
    // Other corners
  
    // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
    vec4 i0;
  
    vec3 isX = step(x0.yzw, x0.xxx);
    vec3 isYZ = step(x0.zww, x0.yyz);
    //  i0.x = dot( isX, vec3( 1.0 ) );
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
  
    //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
  
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;
  
    // i0 now contains the unique values 0,1,2,3 in each channel
    vec4 i3 = clamp(i0, 0.0, 1.0);
    vec4 i2 = clamp(i0-1.0, 0.0, 1.0);
    vec4 i1 = clamp(i0-2.0, 0.0, 1.0);
  
    //  x0 = x0 - 0.0 + 0.0 * C
    vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
    vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
    vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
    vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;
  
    // Permutations
    i = mod(i, 289.0);
    float j0 = permute(permute(permute(permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute(permute(permute(permute (
      i.w + vec4(i1.w, i2.w, i3.w, 1.0))
      + i.z + vec4(i1.z, i2.z, i3.z, 1.0))
      + i.y + vec4(i1.y, i2.y, i3.y, 1.0))
      + i.x + vec4(i1.x, i2.x, i3.x, 1.0));
    // Gradients
    // ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
    // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
  
    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0);
  
    vec4 p0 = grad4(j0, ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);
  
    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4, p4));
  
    // Mix contributions from the five corners
    vec3 m0 = max(0.6 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);
    vec2 m1 = max(0.6 - vec2(dot(x3, x3), dot(x4, x4)), 0.0);
    m0 = m0 * m0;
    m1 = m1 * m1;
    return 49.0 * (dot(m0*m0, vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)))
      + dot(m1*m1, vec2(dot(p3, x3), dot(p4, x4))));
  }
  
  vec2 snoise(vec3 p) {
    return vec2(snoise(vec4(p,1)), snoise(vec4(p,1)+vec4(12345.6789)));
  }
  
  void main(void) {
    vec2 uv = (FC-.5*R)/min(R.x, R.y);
    vec2 pattern =
    snoise(vec3(uv*20.,T*1e-3))*.5+
    snoise(vec3(uv*2., T*.1));
  
    uv *= pattern;
    float t = T*.1;
    vec3 col = hue(cos(12.*atan(uv.y-.75, abs(uv.x-.5))));
  
    col = pow(S(.0, 1., col), vec3(.4));
    col = mix(vec3(.7,.6,.4)*col, col, col);
  
    col = tanh(col*col*col*col);
    col = mix(vec3(.7,.6,.4)*col, col, col);
  
    float mn = min(R.x, R.y),
    bs = mn*.075;
  
    if (FC.x > R.x-bs || FC.x < bs || FC.y > R.y-bs || FC.y < bs) {
      vec3 dte = vec3(.2126,.7152,.0722);
      col = mix(1.-vec3(.7,.6,.4)*3.3, vec3(dot(col, dte)),.75);
    }
  
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