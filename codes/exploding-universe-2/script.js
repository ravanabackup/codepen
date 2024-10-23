/*
Most of the stuff in here is just bootstrapping. Essentially it's just
setting ThreeJS up so that it renders a flat surface upon which to draw 
the shader. The only thing to see here really is the uniforms sent to 
the shader. Apart from that all of the magic happens in the HTML view
under the fragment shader.
*/

const texturesize = 1024;
const particles = texturesize * texturesize;

const GPUComputationRenderer = THREE.GPUComputationRenderer;

let container;
let camera, scene, renderer, controls;
let uniforms;
let gpuComputationRenderer,dataPosition,dataVelocity,textureArraySize = texturesize * texturesize * 4.;

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

  // camera.position.x = 1;
  // camera.position.y = -6;
  // camera.position.z = 7;
  // camera.position.setLength(20.);

  camera.position.x = -3;
  camera.position.y = .3;
  camera.position.z = 8;
  window.cam = camera;

  scene = new THREE.Scene();

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
    u_texturePositionOriginal: { value: null } };

  let particleMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: particleVert,
    fragmentShader: particleFrag,
    side: THREE.DoubleSide,
    transparent: true });

  particleMaterial.transparent = true;
  particleMaterial.blending = THREE.AdditiveBlending;
  particleMaterial.depthTest = false;
  particleMaterial.extensions.derivatives = true;

  // Create the particle cloud object
  // ----------------------------
  let cloud_obj = new THREE.Points(geometry, particleMaterial);

  // Create the renderer and controls and add them to the scene
  // ----------------------------
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  window.controls = controls;

  container.appendChild(renderer.domElement);

  // Finally, add everything to stage
  // ----------------------------
  scene.add(cloud_obj);

  // Add the computational renderer and populate it with data
  // ----------------------------
  gpuComputationRenderer = new GPUComputationRenderer(texturesize, texturesize, renderer);
  dataPos = gpuComputationRenderer.createTexture();
  dataVel = gpuComputationRenderer.createTexture();
  textureArraySize = texturesize * texturesize * 4;

  for (let i = 0; i < textureArraySize; i += 4) {
    let r = Math.random() < .4 ? Math.random() * .01 : Math.random() * 10;
    let a = Math.random() * Math.PI;

    dataPos.image.data[i] = r * Math.sin(a) * Math.cos(i);
    dataPos.image.data[i + 1] = r * Math.sin(a) * Math.sin(i);
    dataPos.image.data[i + 2] = r * Math.cos(a);
    dataPos.image.data[i + 3] = Math.random() * Math.random();
  }

  dataVel.image.data = dataPos.image.data;

  textureVelocity = gpuComputationRenderer.addVariable('v_samplerVelocity', velocityFrag, dataVel);
  texturePosition = gpuComputationRenderer.addVariable('v_samplerPosition', positionFrag, dataPos);

  texturePosition.material.uniforms.delta = { value: 0 };

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
  uniforms.u_mouse.value.x = (event.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
  uniforms.u_mouse.value.y = (event.pageY - window.innerHeight / 2) / window.innerHeight * -1;

  event.preventDefault();
}

function animate(delta) {
  requestAnimationFrame(animate);
  render(delta);
}

let then = 0;
let positionOriginal = null;
function render(delta) {

  let now = Date.now() / 1000;
  let _delta = now - then;
  then = now;

  gpuComputationRenderer.compute();

  texturePosition.material.uniforms.delta.value = Math.min(_delta, 0.5);

  uniforms.u_time.value += _delta;
  uniforms.u_texturePosition.value = gpuComputationRenderer.getCurrentRenderTarget(texturePosition).texture;
  if (positionOriginal === null) {
    positionOriginal = gpuComputationRenderer.getCurrentRenderTarget(texturePosition).texture.clone();
    uniforms.u_texturePositionOriginal.value = positionOriginal;
  }

  // window.pos = gpuComputationRenderer.getCurrentRenderTarget(texturePosition);

  renderer.render(scene, camera);
}