/*
Source: Animated Centric Mosaic Tiles 
https://www.shadertoy.com/view/43tfRr
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

float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

// Function to pick one of five colors based on a pseudorandom index
vec3 getTileColor(float index) {
    if (index < 0.2) return vec3(1.0, 0.33, 0.33); // Red
    if (index < 0.4) return vec3(0.33, 0.33, 1.0); // Blue
    if (index < 0.6) return vec3(1.0, 1.0, 0.33);  // Yellow
    if (index < 0.8) return vec3(0.33, 1.0, 0.33); // Green
    return vec3(0.66, 0.0, 0.66) ;                 // Purple
}

// 2D rotation matrix function
mat2 rot(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

// Displacement function based on time
float displ = 0.5;
float displSpeed = 4.0;
vec2 disp(float t) {
    return vec2(sin(t * 0.22 * displSpeed), cos(t * 0.175 * displSpeed)) * displ;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Normalize coordinates to [-1, 1], with aspect ratio correction
    vec2 uv = fragCoord / iResolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    // Apply dynamic displacement to UV coordinates
    vec2 displacement = disp(iTime);
    uv += displacement;

    // Apply rotation to UV coordinates
    uv *= rot(cos(0.5 * iTime));

    // Apply mouse-based rotation
    vec2 mousePos = iMouse.xy / iResolution.xy;
    if (iMouse.z > 0.0) { // Only apply if the mouse is pressed
        uv *= rot(-displacement.x * 0.2 + mousePos.x * 3.14159265);
    }

    // Scale the tile size
    float scale = 2.0; // Scaling factor for the tiles (2.0 = double the size)
    float tileSize = 0.1 * scale;

    // Convert to polar coordinates
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);

    // Snap radius to the nearest ring center
    float ringIndex = floor(radius / tileSize);
    float snappedRadius = (ringIndex + 0.5) * tileSize;

    // Calculate the number of tiles in this ring based on circumference
    float tilesInRing = max(1.0, floor(2.0 * 3.14159265 * snappedRadius / tileSize));
    float tileAngle = 2.0 * 3.14159265 / tilesInRing;

    // Snap angle to the nearest tile center
    float snappedAngle = floor(angle / tileAngle) * tileAngle;

    // Convert snapped polar coordinates back to Cartesian
    vec2 tileCenter = vec2(cos(snappedAngle), sin(snappedAngle)) * snappedRadius;

    // Project back to UV space for squares
    vec2 gridUV = (uv - tileCenter) / tileSize;

    // Snap gridUV to the nearest square tile center
    gridUV = floor(gridUV) + 0.5;

    // Calculate the distance to the tile center (in square space)
    vec2 diff = (uv - tileCenter) / tileSize - gridUV;
    float squareDist = max(abs(diff.x), abs(diff.y)); // Distance for a square grid

    // Generate a pseudorandom index for this tile
    float tileHash = hash(ringIndex + floor(snappedAngle / tileAngle) * 57.0);
    vec3 tileColor = getTileColor(tileHash);

    // Add dark edges around the tiles
    float edgeWidth = 0.03; // Thickness of the dark edges
    float edge = smoothstep(0.5 - edgeWidth, 0.5, squareDist);
    vec3 edgeColor = vec3(0.7); // Dark color for the edges

    // Add square borders
    float border = smoothstep(0.5, 0.52, squareDist);

    // Blend the tile color with the edge color
    vec3 finalColor = mix(edgeColor, tileColor, 1.0 - edge);
    
    // Output the final color with border effect
    fragColor = vec4(finalColor * (1.0 - border), 1.0);
    // fragColor = vec4(tileColor * (1.0 - border), 1.0);
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