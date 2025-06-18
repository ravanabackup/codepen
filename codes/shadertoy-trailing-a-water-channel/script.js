/*
Trailing a Water Channel
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

float g(vec4 p, float s) {
    return abs(dot(sin(p *= s), cos(p.zxwy)) - 1.0) / s;
}

void mainImage(out vec4 O, vec2 C) {
    float i = 0.0, d = 0.0, z = 0.0, s;
    vec4 o = vec4(0.0);
    vec4 q, p, U = vec4(2.0, 1.0, 0.0, 3.0);
    vec2 r = iResolution.xy;

    for (; i < 50.0; i++) {
        z += d + 0.0005;

        // Ray direction (normalized)
        q = vec4(normalize(vec3((C + C - r) / r.y, 2.0)) * z, 0.2);

        // Scroll forward in z (time-based movement)
        q.z += iTime / 30.0;

        // Save sign before mirroring for reflection effect
        s = q.y + 0.1;
        q.y = abs(s);

        // Distorted coordinates
        p = q;
        p.y -= 0.11;
        p.xy *= mat2(cos(11.0 * U.zywz - 2.0 * p.z));
        p.y -= 0.2;

        // Distance field difference
        d = abs(g(p, 8.0) - g(p, 24.0)) / 4.0;

        // Light flickering color blob
        p = 1.0 + cos(0.7 * U + 5.0 * q.z);

        // Accumulate color
        o += (s > 0.0 ? 1.0 : 0.1) * p.w * p / max(s > 0.0 ? d : d*d*d, 0.0005);
    }

    // Add a glowing light in the distance
    o += (1.4 + sin(iTime) * sin(1.7 * iTime) * sin(2.3 * iTime)) * 1000.0 * U / length(q.xy);

    // Tone mapping for final output
    O = tanh(o / 100000.0);
}

/*--- END OF SHADERTOY ---*/

void main() {
    mainImage(fragColor, gl_FragCoord.xy);
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