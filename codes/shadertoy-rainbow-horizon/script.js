/*
Rainbow Horizon
*/

const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl2');
if (!gl) {
    console.error('WebGL 2 not supported');
    document.body.innerHTML = 'WebGL 2 is not supported in your browser.';
}

const vertexShaderSource = `#version 300 es
in vec4 aPosition;
void main() {
    gl_Position = aPosition;
}`;

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec4 iMouse;
out vec4 fragColor;

/*--- BEGIN OF SHADERTOY ---*/

vec4 getMainImage(vec2 I) {
    float t = iTime, i = 0.0, z = 0.0, d, s;
    vec4 O = vec4(0.0);  // <-- This line was missing

    for(; i++ < 1e2; ) {
        vec3 p = z * normalize(vec3(I + I, 0) - iResolution.xyy);
        for(d = 5.; d < 2e2; d += d)
            p += 0.6 * sin(p.yzx * d - 0.2 * t) / d;

        z += d = 0.005 + max(s = 0.3 - abs(p.y), -s * 0.2) / 4.0;
        O += (cos(s / 0.07 + p.x + 0.5 * t - vec4(3, 4, 5, 0)) + 1.5) * exp(s / 0.1) / d;
    }

    return tanh(O * O / 4e8);
}

vec4 getMainImage2(vec2 o) {
    float i = 0.0, d = 0.0, s, t = iTime;
    vec4 color = vec4(0.0);  // Output color (was missing)

    for(; i++ < 1e2;) {
        vec3 p = d * normalize(vec3(o + o, 0.0) - iResolution.xyy);
        p.z -= t;

        for(s = 0.1; s < 2.0;) {
            p -= dot(cos(t + p * s * 16.0), vec3(0.01)) / s;
            p += sin(p.yzx * 0.9) * 0.3;
            s *= 1.42;
        }

        d += s = 0.02 + abs(3.0 - length(p.yx)) * 0.1;
        color += (1.0 + cos(d + vec4(4, 2, 1, 0))) / s;
    }

    return tanh(color / 2000.0); 
}

 
/*--- END OF SHADERTOY ---*/

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec4 img1 = getMainImage(fragCoord);
    vec4 img2 = getMainImage2(fragCoord);

    // Blend the two results (choose blend strength)
    fragColor = mix(img1, img2, 0.3); 
}
`;

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
const resolutionUniformLocation = gl.getUniformLocation(program, 'iResolution');
const timeUniformLocation = gl.getUniformLocation(program, 'iTime');
const mouseUniformLocation = gl.getUniformLocation(program, 'iMouse');

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

gl.useProgram(program);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

let mouseX = 0, mouseY = 0;
canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = canvas.height - e.clientY;  // Flip Y coordinate
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();  // Call once to set initial size

function render(time) {
    gl.uniform3f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height, 1.0);
    gl.uniform1f(timeUniformLocation, time * 0.001);
    gl.uniform4f(mouseUniformLocation, mouseX, mouseY, 0.0, 0.0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

// Fullscreen toggle functionality
const fullscreenBtn = document.getElementById('fullscreenBtn');
fullscreenBtn.addEventListener('click', toggleFullScreen);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}