console.clear();

// setup three.js

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
var camera = new THREE.PerspectiveCamera(80);
var scene = new THREE.Scene();

document.querySelector('#three').appendChild(renderer.domElement);

// camera config

var controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 150;
// camera.position.x = 200;
camera.lookAt(scene.position);

// lights

var light;

light = new THREE.DirectionalLight(0xff0000, 1);
light.position.set(-1, 1, 1);
scene.add(light);

light = new THREE.DirectionalLight(0x0000ff, 1);
light.position.set(1, 1, 1);
scene.add(light);

light = new THREE.PointLight(0x00ff00, 1, 200);
scene.add(light);

// create meshes

var cubes;
var geometry;
var material;
var debug;

var config = {
  cubeCount: 100000,
  duration: 6.0,
  totalDelay: 6.0
}

function createCubes() {
  // dispose previous cubes
  dispose();
  
  // create the geometry that will be repeated in the buffer geometry
  // I refer to this 'base' geometry as a prefab
  var cubeSize = 1.0;
  var prefab = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  
  // create the buffer geometry where a set number of prefabs are repeated
  // PrefabBufferGeometry offers some utility methods for working with such geometries
  geometry = new THREE.BAS.PrefabBufferGeometry(prefab, config.cubeCount);
  
  // create a buffer for the offset, with an item size of 3 (x, y, z)
  var offsetBuffer = geometry.createAttribute('offset', 3);
  // create a buffer for rotation with 4 components per vertex
  var rotationBuffer = geometry.createAttribute('rotation', 4);
  // create a buffer for duration per prefab, with the item size of 1
  var durationBuffer = geometry.createAttribute('duration', 1);
  // create a buffer for start time per prefab, with the item size of 1
  var startTimeBuffer = geometry.createAttribute('startTime', 1);
  
  // populate the buffers

  var cubeIndex = 0;
  // reuse the same array each loop iteration
  var tmpa = [];
  var tmpv = new THREE.Vector3();
  
  for (var x = 0; x < config.cubeCount; x++) {
    
    tmpa[0] = THREE.Math.randFloatSpread(16);
    tmpa[1] = THREE.Math.randFloatSpread(16);
    tmpa[2] = THREE.Math.randFloatSpread(16);
    geometry.setPrefabData(offsetBuffer, cubeIndex, tmpa);

    // get a random axis
    THREE.BAS.Utils.randomAxis(tmpv);
    // store the x, y and z values in the array
    tmpv.toArray(tmpa);
    // set the rotation 
    tmpa[3] = Math.PI * 32;

    geometry.setPrefabData(rotationBuffer, cubeIndex, tmpa);
    
    // duration
    tmpa[0] = config.duration;
    geometry.setPrefabData(durationBuffer, cubeIndex, tmpa);

    // startTime (delay)
    tmpa[0] = (config.totalDelay / config.cubeCount) * cubeIndex;
    geometry.setPrefabData(startTimeBuffer, cubeIndex, tmpa);

    // increment the cubeIndex for the next iteration
    cubeIndex++;
  }
  
  // create the animation material
  // it 'extends' THREE.MeshPhongMaterial by injecting arbitrary GLSL code at key places in the shader code
  material = new THREE.BAS.PhongAnimationMaterial({
    shading: THREE.FlatShading,
    // define a time uniform that will control the state of the animation
    // the uniform will be the same for each vertex
    uniforms: {
      time: {value: 0},
      // store values relating to the spiral
      spiralRadius: {value: 80},
      spiralHeight: {value: 40},
      spiralAngle: {value: Math.PI * 8}
    },
    // add GLSL definitions for the uniform and the 4 attributes we defined on the geometry
    // the names and types must be the same as defined above
    vertexParameters: [
      'uniform float time;',
      'uniform float spiralRadius;',
      'uniform float spiralHeight;',
      'uniform float spiralAngle;',

      'attribute vec3 offset;',
      'attribute vec4 rotation;',
      'attribute float startTime;',
      'attribute float duration;',
      
      // definition of our paramteric function
      // note that the current build of THREE.BAS (1.3.0) does not allow functions to use uniforms or attributes directly
      // so we define it here instead of the functions block
      // this will likely change in the future
      'vec3 sample(float p) {',
        'vec3 pos;',
        'float angle = spiralAngle * p;',

        'pos.x = sin(angle) * spiralRadius;',
        'pos.z = cos(angle) * spiralRadius;',
        'pos.y = (p * 2.0 - 1.0) * spiralHeight;',

        'return pos;',
      '}'
    ],
    // add definitions for functions to be used in the vertex shader
    vertexFunctions: [
      THREE.BAS.ShaderChunk['quaternion_rotation'],
      THREE.BAS.ShaderChunk['ease_cubic_out']
    ],
    // add the GLSL animation update logic
    vertexPosition: [
      // progress is calculated based on the time uniform, and the duration and startTime attributes
      'float progress = clamp(time - startTime, 0.0, duration) / duration;',

      'progress = easeCubicOut(progress);',
      
      // rotate the vertex
      'vec4 quat = quatFromAxisAngle(rotation.xyz, rotation.w * progress);',
      'transformed = rotateVector(quat, transformed);',
      
      // scale based on progress
      // progress 0.0 = scale 0.0
      // progress 0.5 = scale 1.0
      // progress 1.0 = scale 0.0
      'float scl = progress * 2.0 - 1.0;',
      'scl = 1.0 - scl * scl;',
      'transformed *= scl;',
      
      // use the parametric function to sample the position offset based on progress
      'vec3 pos = sample(progress);',
      
      // add position and offset to transformed
      'transformed += (pos + offset);',
    ]
  });
  
  // once the geometry and metrials are defined we can use them to create one single mesh, and add it to the scene
  cubes = new THREE.Mesh(geometry, material);
  scene.add(cubes);
}

function dispose() {
  cubes && scene.remove(cubes);
  debug && scene.remove(debug);
  geometry && geometry.dispose();
  material && material.dispose();
}

window.onload = createCubes;

// loop

var stats = new Stats();
document.body.appendChild(stats.dom);

function tick() {
  stats.begin();
  update();
  render();
  stats.end();
  
  requestAnimationFrame(tick);
}

function update() {
  if (!cubes) return;
  // increment global time
  cubes.material.uniforms.time.value += 1/60;
  // reset time when it exceeds the total duration
  cubes.material.uniforms.time.value %= (config.duration + config.totalDelay);
}

function render() {
  renderer.render(scene, camera);
}

requestAnimationFrame(tick);

// resize

function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

// helpers

function PointHelper(color, size, position) {
  THREE.Mesh.call(this,
    new THREE.SphereGeometry(size || 1.0, 8, 8),
    new THREE.MeshBasicMaterial({
      color: color || 0xff0000,
      wireframe: true,
      depthWrite: false,
      depthTest: false
    })
  );

  position && this.position.copy(position);
}
PointHelper.prototype = Object.create(THREE.Mesh.prototype);
PointHelper.prototype.constructor = PointHelper;

function LineHelper(points, params) {
  var g = new THREE.Geometry();
  var m = new THREE.LineBasicMaterial(params);

  g.vertices = points;

  THREE.Line.call(this, g, m);
}
LineHelper.prototype = Object.create(THREE.Line.prototype);
LineHelper.prototype.constructor = LineHelper;