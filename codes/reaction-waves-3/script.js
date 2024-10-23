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

let divisor = 1 / 8;
let textureFraction = 1 / 1;

let w = 2048;
let h = 1024;
let tw = 128.;
let th = 128.;
let tw2 = 512.;
let th2 = 512.;

let newmouse = {
  x: 0,
  y: 0 };


let loader = new THREE.TextureLoader();
let texture, rtTexture, rtTexture2;
let rt2Texture, rt2Texture2;
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

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry(2, 2);

  rtTexture = new THREE.WebGLRenderTarget(tw, th);
  rtTexture2 = new THREE.WebGLRenderTarget(tw, th);
  rt2Texture = new THREE.WebGLRenderTarget(tw2, th2);
  rt2Texture2 = new THREE.WebGLRenderTarget(tw2, th2);

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_noise: { type: "t", value: texture },
    u_buffer: { type: "t", value: rtTexture.texture },
    u_buffer2: { type: "t", value: rt2Texture.texture },
    u_mouse: { type: "v3", value: new THREE.Vector3() },
    u_frame: { type: "i", value: -1. },
    u_renderpass: { type: 'b', value: false },
    u_renderpass2: { type: 'b', value: false },
    u_mousemoved: { type: 'b', value: false } };


  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent });

  material.extensions.derivatives = true;

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);


  document.addEventListener('pointermove', e => {
    uniforms.u_mousemoved.value = true;
    let ratio = window.innerHeight / window.innerWidth;
    if (window.innerHeight > window.innerWidth) {
      newmouse.x = (e.pageX - window.innerWidth / 2) / window.innerWidth;
      newmouse.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1 * ratio;
    } else {
      newmouse.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
      newmouse.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;
    }

    e.preventDefault();
  });
  document.addEventListener('pointerdown', e => {
    if (e.button === 0) {
      uniforms.u_mouse.value.z = 1;
    } else if (e.button === 2) {
      uniforms.u_mouse.value.w = 1;
    }
    e.preventDefault();
  });
  document.addEventListener('pointerup', e => {
    if (e.button === 0) {
      uniforms.u_mouse.value.z = 0;
    } else if (e.button === 2) {
      uniforms.u_mouse.value.w = 0;
    }
    e.preventDefault();
  });
}

function onWindowResize(event) {
  w = 2048;
  h = 1024;
  w = window.innerWidth;
  h = window.innerHeight;

  renderer.setSize(w, h);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;

  uniforms.u_frame.value = 0;

  // rtTexture = new THREE.WebGLRenderTarget(w * textureFraction, h * textureFraction);
  // rtTexture2 = new THREE.WebGLRenderTarget(w * textureFraction, h * textureFraction);
  rtTexture = new THREE.WebGLRenderTarget(tw, th);
  rtTexture2 = new THREE.WebGLRenderTarget(tw, th);
  rt2Texture = new THREE.WebGLRenderTarget(tw2, th2);
  rt2Texture2 = new THREE.WebGLRenderTarget(tw2, th2);

  rtTexture.texture.wrapS = THREE.RepeatWrapping;
  rtTexture.texture.wrapT = THREE.RepeatWrapping;
  rtTexture.texture.minFilter = THREE.LinearFilter;
  rtTexture.texture.magFilter = THREE.LinearFilter;
  rtTexture2.texture.wrapS = THREE.RepeatWrapping;
  rtTexture2.texture.wrapT = THREE.RepeatWrapping;
  rtTexture2.texture.minFilter = THREE.LinearFilter;
  rtTexture2.texture.magFilter = THREE.LinearFilter;


  rt2Texture.texture.wrapS = THREE.RepeatWrapping;
  rt2Texture.texture.wrapT = THREE.RepeatWrapping;
  rt2Texture.texture.minFilter = THREE.LinearFilter;
  rt2Texture.texture.magFilter = THREE.LinearFilter;
  rt2Texture2.texture.wrapS = THREE.RepeatWrapping;
  rt2Texture2.texture.wrapT = THREE.RepeatWrapping;
  rt2Texture2.texture.minFilter = THREE.LinearFilter;
  rt2Texture2.texture.magFilter = THREE.LinearFilter;
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
  } else if (val === true && window.capturing === false) {
    capturer.start();
  }
  capturing = val;
};
toggleCapture = function () {
  isCapturing(!capturing);
};

window.addEventListener('keyup', function (e) {if (e.keyCode == 68) toggleCapture();
  onWindowResize();});

let then = 0;
let odims = uniforms.u_resolution.value.clone();
function renderTexture(delta) {

  let odims = uniforms.u_resolution.value.clone();
  uniforms.u_resolution.value.x = tw;
  uniforms.u_resolution.value.y = th;

  uniforms.u_buffer.value = rtTexture2.texture;

  uniforms.u_renderpass.value = true;

  window.rtTexture = rtTexture;
  renderer.setRenderTarget(rtTexture);
  renderer.render(scene, camera, rtTexture, true);

  let buffer = rtTexture;
  rtTexture = rtTexture2;
  rtTexture2 = buffer;

  uniforms.u_buffer.value = rtTexture.texture;
  // uniforms.u_resolution.value = odims;
  uniforms.u_renderpass.value = false;



  uniforms.u_resolution.value.x = tw2;
  uniforms.u_resolution.value.y = th2;

  uniforms.u_buffer2.value = rt2Texture2.texture;

  uniforms.u_renderpass2.value = true;

  window.rt2Texture = rt2Texture;
  renderer.setRenderTarget(rt2Texture);
  renderer.render(scene, camera, rt2Texture, true);

  buffer = rt2Texture;
  rt2Texture = rt2Texture2;
  rt2Texture2 = buffer;

  uniforms.u_buffer2.value = rt2Texture.texture;
  uniforms.u_resolution.value = odims;
  uniforms.u_renderpass2.value = false;
}
function render(delta) {
  uniforms.u_frame.value++;

  uniforms.u_mouse.value.x += (newmouse.x - uniforms.u_mouse.value.x) * divisor;
  uniforms.u_mouse.value.y += (newmouse.y - uniforms.u_mouse.value.y) * divisor;

  uniforms.u_time.value = delta * 0.0005;
  renderer.render(scene, camera);
  renderTexture();
  renderTexture();
  renderTexture();
  renderTexture();
  renderTexture();
  renderTexture();
  renderTexture();
  renderTexture();

  if (capturing) {
    capturer.capture(renderer.domElement);
  }
}