// https://github.com/oframe/ogl
const { Renderer, Camera, Transform, Program, Mesh, Vec2, Plane } = ogl;
const UPS = 120;

const uniforms = {
  time: { value: 0.0 },
  mouse_pos: { value: new Vec2(1.0, 1.0) },
  mouse_active: { value: false },
  resolution: { value: new Vec2() },
};

function init() {
  
}

function update() {
  
}


//****** BOILERPLATE ******//
const $container = document.getElementById('scene');
const vertexShader = document.getElementById('vertex-shader').textContent;
const fragmentShader = document.getElementById('fragment-shader').textContent;

let width, height, aspect;
let renderer, gl, camera, scene;

const Time = {
  t: 0,
  dt: 0,
  frame: 0,
  frameTime: 0,
  fps: 0,
};

// Init
function _initScene() {
  renderer = new Renderer();
  gl = renderer.gl;
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  $container.appendChild(gl.canvas);
  camera = new Camera(gl, { fov: 45 });
  camera.position.set(0, 0, 1);
  _setRendererSize();

  scene = new Transform();
  const geometry = new Plane(gl, {
    width: 2.0,
    height: 2.0,
  });
  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms,
  });
  const mesh = new Mesh(gl, { geometry, program });
  mesh.setParent(scene);
}

// Resize
window.addEventListener('resize', _setRendererSize, false);
function _setRendererSize() {
  const bounds = $container.getBoundingClientRect();
  width = bounds.width;
  height = bounds.height;
  aspect = width / height;
  uniforms.resolution.value.x = width;
  uniforms.resolution.value.y = height;
  renderer.setSize(width, height);
  camera.perspective({ aspect });
}

// Mouse
if ('ontouchstart' in window) {
  $container.addEventListener('touchstart', _setMousePosition, false);
  $container.addEventListener('touchmove', _setMousePosition, false);
  $container.addEventListener('touchend', _setMouseExit, false);
} else {
  $container.addEventListener('mousemove', _setMousePosition, false);
  $container.addEventListener('mouseleave', _setMouseExit, false);
}
function _setMousePosition(e) {
  if (!uniforms.mouse_active.value) {
    uniforms.mouse_active.value = true;
  }
  const bounds = $container.getBoundingClientRect();
  const touch = e.changedTouches && e.changedTouches[0];
  const x = touch ? touch.clientX : e.clientX;
  const y = touch ? touch.clientY : e.clientY;
  const u = (x - bounds.x) / width;
  const v = 1.0 - (y - bounds.y) / height;
  uniforms.mouse_pos.value.set(u, v);
}
function _setMouseExit() {
  uniforms.mouse_active.value = false;
}

// Main loop
let _startTime = performance.now();
let _lastTick = performance.now();
const _timestep = 1000 / UPS;
let _currentFrame = 0;
let _fps = 60;
let _lastFpsUpdate = 0;
let _framesSinceFPSUpdate = 0;
function _mainLoop() {
  const frameID = requestAnimationFrame(_mainLoop);
  
  try {
    const t = performance.now();
    const nextTick = _lastTick + _timestep;
    let numTicks = 0;
    if (t > nextTick) {
      numTicks = Math.floor((t - _lastTick) / _timestep);
    }
    if (numTicks > 4) {
      console.log(`dropping ${numTicks} frames`);
      numTicks = 0;
      _lastTick = t;
    }
    
    if (t - _lastFpsUpdate > 200) {
      _fps = 0.9 * _framesSinceFPSUpdate * 1000 / (t - _lastFpsUpdate) + 0.1 * _fps;
      Time.fps = _fps;
      _lastFpsUpdate = t;
      _framesSinceFPSUpdate = 0;
    }
    
    _framesSinceFPSUpdate++;

    // Update
    for (let i = 0; i < numTicks; i++) {
      _lastTick += _timestep;
      Time.t = _lastTick - _startTime;
      Time.dt = _timestep;
      update();
    }

    // Draw
    Time.frame = _currentFrame;
    Time.frameTime = t;
    uniforms.time.value = (t - _startTime) / 1000;
    renderer.render({ scene, camera });
    _currentFrame++;
  } catch (e) {
    cancelAnimationFrame(frameID);
    throw(e);
  }
}

// Go
console.clear();
_initScene();
init();
_mainLoop();