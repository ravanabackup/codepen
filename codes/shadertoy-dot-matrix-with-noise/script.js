/*
Animated Colorful Dot Matrix with Noise
https://www.shadertoy.com/view/X3dfRr
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

// Written by tommyho510@gmail.com

float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

// Simple random function based on a seed value
float rand(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Improved noise function using interpolation
float noise(vec2 p) {
    vec2 ip = floor(p);           // Integer part of p
    vec2 u = fract(p);            // Fractional part of p
    u = u * u * (3.0 - 2.0 * u);  // Smoothstep to smooth interpolation

    // Interpolate between four random values
    float res = mix(
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y
    );
    return res * res;  // Smooth the result by squaring it
}

// Function to pick one of five colors based on a pseudorandom index
vec3 getTileColor(float index) {
    if (index < 0.2) return vec3(1.0, 0.33, 0.33); // Red
    if (index < 0.4) return vec3(0.33, 0.33, 1.0); // Blue
    if (index < 0.6) return vec3(1.0, 1.0, 0.33);  // Yellow
    if (index < 0.8) return vec3(0.33, 1.0, 0.33); // Green
    return vec3(0.7, 0.0, 0.7);                   // Purple
}

// Color palette function
vec3 palette(float t) {
    return 0.5 + 0.5 * cos(6.28318 * (vec3(0.5, 0.3, 0.2) + t));
}

// 2D rotation matrix function
mat2 rot(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

// Function to create a simple pattern
vec2 pattern(vec2 uv, float scale) {
    vec2 p = fract(uv * scale) - 0.5;
    return vec2(dot(p, p), fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453));
}

// Function to calculate a hue-based color
vec3 hue(float h, float s) {
    return vec3(0.5 + 0.5 * cos(6.28318 * (vec3(h, h + s, h - s))));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Normalize coordinates to [-1, 1], with aspect ratio correction
    vec2 uv = fragCoord / iResolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    // Apply rotation to UV coordinates
    float rotationAngle = cos(0.5 * iTime);
    uv *= rot(rotationAngle);

    // Initialize the base color
    vec3 C = vec3(0.0);

    // Scaling loop
    float scale = 8.0;
    for (float i = 0.0; i < 4.0; i++) {
        float ff = (i * 0.05) + 0.2;

        // Time-based shifting of UV
        uv.x -= 0.2 * iTime * ff;

        // Pattern calculation
        float px = fwidth(uv.x * scale);
        vec2 d = pattern(uv, scale);

        // Hue color based on UV
        vec3 clr = hue(sin(uv.x + (i * 8.0)) * 0.2 + 0.4, (0.5 + i) * 0.15);

        // Mix colors based on pattern
        C = mix(C, vec3(0.001), smoothstep(px, -px, d.y - 0.04));
        C = mix(C, clr, smoothstep(px, -px, d.x));

        // Update scale for next iteration
        scale *= 0.5;
    }

    // Combine with the tile color logic
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    float tileSize = 0.1;
    float ringIndex = floor(radius / tileSize);
    float snappedRadius = (ringIndex + 0.5) * tileSize;
    float tilesInRing = max(1.0, floor(2.0 * 3.14159265 * snappedRadius / tileSize));
    float tileAngle = 2.0 * 3.14159265 / tilesInRing;
    float snappedAngle = floor(angle / tileAngle) * tileAngle;
    vec2 tileCenter = vec2(cos(snappedAngle), sin(snappedAngle)) * snappedRadius;
    vec2 gridUV = (uv - tileCenter) / tileSize;
    gridUV = floor(gridUV) + 0.5;
    vec2 diff = (uv - tileCenter) / tileSize - gridUV;
    float squareDist = max(abs(diff.x), abs(diff.y));
    float tileHash = hash(ringIndex + floor(snappedAngle / tileAngle) * 57.0);
    vec3 tileColor = getTileColor(tileHash);
    float border = smoothstep(0.5, 0.52, squareDist);
    
    // Generate a noise value for the texture
    float n = noise(uv * 5.0 + iTime * 0.2); // Scaled by 5.0 for a more detailed noise pattern

    // Color cycling effect
    float colorShift = fract(iTime * 0.1);
    vec3 color = palette(colorShift + n * 0.5);  // Combine the noise with the color palette

    // Smooth blending based on the noise pattern
    float intensity = smoothstep(0.2, 0.8, n);
    vec3 finalColor = mix(color, vec3(0.0), intensity);

    // Output the final color combining scale effects and tile
    // fragColor = vec4(C * (1.0 - border) + tileColor * border, 1.0);
    fragColor = vec4(C * (1.0 - border) + finalColor * 0.3, 1.0);
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