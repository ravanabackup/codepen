/*
Most of the stuff in here is just bootstrapping. Essentially it's just
setting ThreeJS up so that it renders a flat surface upon which to draw 
the shader. The only thing to see here really is the uniforms sent to 
the shader. Apart from that all of the magic happens in the HTML view
under the fragment shader.
*/

let container;
let camera, scene, renderer;
let uniforms;

let loader = new THREE.TextureLoader();
let textures = {
  noise: {
    url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
    loaded: false },

  map_colour: {
    url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/Lava_001_COLOR.png',
    loaded: false },

  map_normal: {
    url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/Lava_001_NRM.png',
    loaded: false },

  map_roughness: {
    url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/Lava_001_OCC.png',
    loaded: false },

  map_disp: {
    url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/Lava_001_DISP.png',
    loaded: false } };


let texture;
let map_normal, map_colour, map_roughness;
loader.setCrossOrigin("anonymous");
let loadtex = () => {
  let allLoaded = true;
  for (let i in textures) {
    let tex = textures[i];
    if (tex.loaded === false) {
      allLoaded = false;
      loader.load(tex.url, texture => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        tex.texture = texture;
        tex.loaded = true;
        loadtex();
      });
      break;
    }
  }
  if (allLoaded === true) {
    init();
    animate();
  }
};
loadtex();

function init() {
  container = document.getElementById('container');

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() } };

  for (let i in textures) {
    uniforms['u_' + i] = { type: "t", value: textures[i].texture };
  }

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent });

  material.extensions.derivatives = true;

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(1);

  container.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  document.addEventListener('pointermove', e => {
    let ratio = window.innerHeight / window.innerWidth;
    uniforms.u_mouse.value.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
    uniforms.u_mouse.value.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;

    e.preventDefault();
  });
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate(delta) {
  requestAnimationFrame(animate);
  render(delta);
}






let capturer = new CCapture({
  verbose: true,
  framerate: 60,
  // motionBlurFrames: 4,
  quality: 90,
  format: 'webm',
  workersPath: 'js/' });

let capturing = false;

isCapturing = function (val) {
  if (val === false && window.capturing === true) {
    capturer.stop();
    capturer.save();
  } else if (val === true && window.capturing === false) {
    capturer.start();
  }
  capturing = val;
};
toggleCapture = function () {
  isCapturing(!capturing);
};

window.addEventListener('keyup', function (e) {if (e.keyCode == 68) toggleCapture();});

let then = 0;
function render(delta) {

  uniforms.u_time.value = delta * 0.0005;
  renderer.render(scene, camera);

  if (capturing) {
    capturer.capture(renderer.domElement);
  }
}