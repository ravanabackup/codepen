const texturesize = 2048;
const particles = texturesize * texturesize;

const GPUComputationRenderer = THREE.GPUComputationRenderer;

let container;
let camera, scene, renderer, controls;
let cloud_obj;
let uniforms;
let gpuComputationRenderer,dataPos,dataVel,textureArraySize = texturesize * texturesize * 4.;

let textureVelocity, texturePosition;

const particleVert = document.getElementById('vertexShaderParticle').textContent;
const particleFrag = document.getElementById('fragmentShaderParticle').textContent;
const velocityFrag = document.getElementById('fragmentShaderVelocity').textContent;
const positionFrag = document.getElementById('fragmentShaderPosition').textContent;

let loader = new THREE.TextureLoader();
let texture;
loader.setCrossOrigin("anonymous");
loader.load(
'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
function do_something_with_texture(tex) {
  texture = tex;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  init();
  animate();
});


function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(45, 1, 0.001, Math.pow(2, 16));
  camera.position.x = -10;
  camera.position.y = -10;
  camera.position.z = -30.;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // create out particles
  // ----------------------------
  let vertices = new Float32Array(particles * 3).fill(0);
  let references = new Float32Array(particles * 2);

  for (let i = 0; i < references.length; i += 2) {
    let index = i / 2;

    references[i] = index % texturesize / texturesize;
    references[i + 1] = Math.floor(index / texturesize) / texturesize;
  }

  let geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.addAttribute('reference', new THREE.BufferAttribute(references, 2));

  // Create our particle material
  // ----------------------------
  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_noise: { type: "t", value: texture },
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_texturePosition: { value: null },
    u_clicked: { type: 'b', value: true } };

  let particleMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: particleVert,
    fragmentShader: particleFrag,
    side: THREE.DoubleSide,
    transparent: true });

  particleMaterial.transparent = true;
  particleMaterial.blending = THREE.MultiplyBlending;
  particleMaterial.depthTest = false;
  particleMaterial.extensions.derivatives = true;

  // Create the particle cloud object
  // ----------------------------
  cloud_obj = new THREE.Points(geometry, particleMaterial);
  scene.background = new THREE.Color(0x000000);
  cloud_obj.material.blending = THREE.AdditiveBlending;

  // Create the renderer and controls and add them to the scene
  // ----------------------------
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(6);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  window.controls = controls;

  container.appendChild(renderer.domElement);

  // Finally, add everything to stage
  // ----------------------------
  scene.add(cloud_obj);

  // Add the computational renderer and populate it with data
  // ----------------------------
  gpuComputationRenderer = new GPUComputationRenderer(texturesize, texturesize, renderer);
  dataPos_orig = gpuComputationRenderer.createTexture();
  dataPos = gpuComputationRenderer.createTexture();
  dataVel = gpuComputationRenderer.createTexture();

  for (let i = 0; i < textureArraySize; i += 4) {
    let radius = 1;
    let phi = Math.random() * Math.PI * 2.;
    let costheta = Math.random() * 2. - 1.;
    let u = Math.random();

    let theta = Math.acos(costheta);
    let r = radius * Math.cbrt(u);

    let x = r * Math.sin(theta) * Math.cos(phi);
    let y = r * Math.sin(theta) * Math.sin(phi);
    let z = r * Math.cos(theta);

    dataPos.image.data[i] = x;
    dataPos.image.data[i + 1] = y;
    dataPos.image.data[i + 2] = z;
    dataPos.image.data[i + 3] = 1;

    dataPos_orig.image.data[i] = x;
    dataPos_orig.image.data[i + 1] = y;
    dataPos_orig.image.data[i + 2] = z;
    dataPos_orig.image.data[i + 3] = 1;

    dataVel.image.data[i] = x * 3.;
    dataVel.image.data[i + 1] = y * 3.;
    dataVel.image.data[i + 2] = z * 3.;
    dataVel.image.data[i + 3] = 1;
  }

  textureVelocity = gpuComputationRenderer.addVariable('v_samplerVelocity', velocityFrag, dataVel);
  texturePosition = gpuComputationRenderer.addVariable('v_samplerPosition', positionFrag, dataPos);

  texturePosition.material.uniforms.delta = { value: 0 };
  texturePosition.material.uniforms.v_samplerPosition_orig = { type: "t", value: dataPos_orig };
  textureVelocity.material.uniforms.u_time = { value: -1000 };
  textureVelocity.material.uniforms.u_mousex = { value: 0 };
  texturePosition.material.uniforms.u_time = { value: 0 };

  gpuComputationRenderer.
  setVariableDependencies(textureVelocity, [textureVelocity, texturePosition]);
  gpuComputationRenderer.
  setVariableDependencies(texturePosition, [textureVelocity, texturePosition]);

  texturePosition.wrapS = THREE.RepeatWrapping;
  texturePosition.wrapT = THREE.RepeatWrapping;
  textureVelocity.wrapS = THREE.RepeatWrapping;
  textureVelocity.wrapT = THREE.RepeatWrapping;

  const gpuComputationRendererError = gpuComputationRenderer.init();
  if (gpuComputationRendererError) {
    console.error('ERROR', gpuComputationRendererError);
  }

  // Add event listeners for resize and mouse move
  // ----------------------------
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('pointermove', pointerMove);
  // document.addEventListener('click', onClick);

  // initialise the video renderer
  // toggleCapture();
}

function onWindowResize(event) {
  let w = window.innerWidth;
  let h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function pointerMove(event) {
  let ratio = window.innerHeight / window.innerWidth;
  textureVelocity.material.uniforms.u_mousex.value = event.pageX;
  uniforms.u_mouse.value.x = (event.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
  uniforms.u_mouse.value.y = (event.pageY - window.innerHeight / 2) / window.innerHeight * -1;

  event.preventDefault();
}

function onClick() {
  // return;
  let newval = !uniforms.u_clicked.value;
  uniforms.u_clicked.value = newval;
  console.log(cloud_obj.material.blending);
  if (newval === false) {
    scene.background = new THREE.Color(0xffffff);
    cloud_obj.material.blending = THREE.MultiplyBlending;
  } else {
    scene.background = new THREE.Color(0x000000);
    cloud_obj.material.blending = THREE.AdditiveBlending;
  }
}

function animate(delta) {
  requestAnimationFrame(animate);
  render(delta);
}



let capturer = new CCapture({
  verbose: true,
  framerate: 30,
  // motionBlurFrames: 4,
  quality: 90,
  format: 'webm',
  workersPath: 'js/' });

let capturing = false;

isCapturing = function (val) {
  if (val === false && window.capturing === true) {
    capturer.stop();
    capturer.save();
    // renderer.setPixelRatio( window.devicePixelRatio );
  } else if (val === true && window.capturing === false) {
    capturer.start();
    controls.enabled = false;
    // renderer.setPixelRatio( 1 );
  }
  capturing = val;
};
toggleCapture = function () {
  isCapturing(!capturing);
};
let b = document.querySelector('button');
if (b) b.addEventListener('click', e => toggleCapture());

window.addEventListener('keyup', function (e) {if (e.keyCode == 68) toggleCapture();});

let then = 0;
function render(delta) {

  let now = Date.now() / 1000;
  let _delta = now - then;
  then = now;

  gpuComputationRenderer.compute();

  texturePosition.material.uniforms.delta.value = Math.min(_delta, 0.5);
  textureVelocity.material.uniforms.u_time.value += .0005;
  texturePosition.material.uniforms.u_time.value += _delta;

  uniforms.u_time.value += _delta;
  uniforms.u_texturePosition.value = gpuComputationRenderer.getCurrentRenderTarget(texturePosition).texture;

  window.pos = gpuComputationRenderer.getCurrentRenderTarget(texturePosition);

  renderer.render(scene, camera);

  if (capturing) {
    capturer.capture(renderer.domElement);
  }
}