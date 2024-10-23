const imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/ds.jpg';
const particleUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/particle.png';
const dropColorUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/drop-color.png';
var count = {
  particle0: 800,
  particle1: 200,
  particle2: 600 };

var utils = {
  range: function (min, max) {
    return min + Math.random() * (max - min);
  } };

var prSize = {
  min: 50,
  max: 150 };

var blurMat;
var camera, scene, renderer, mouse, stats, geometry, shaderMaterial, mesh, clock, gui;
var baseMesh, textureMesh, textureScene;
var readRender, outputRender, outputMesh;
var outputMat = new THREE.ShaderMaterial(
{
  uniforms: {
    blurTex: { value: null },
    particleTex: { value: null },
    baseTex: { value: null },
    uRate: { value: 0.5 } },

  vertexShader: document.getElementById('vertex').textContent,
  fragmentShader: document.getElementById('outputFragment').textContent,
  transparent: true });


var blurShader = {
  uniforms: {
    uTex: { value: null },
    uResolution: { value: null },
    uDirection: { value: null } },

  vertexShader: document.getElementById('vertex').textContent,
  fragmentShader: document.getElementById('blurFragment').textContent,
  transparent: true };

var isLoop, swapRendererBase0, swapRendererBase1, blurRenderer, particleRenderer;
var image, particleImg, texture, particleTexture, texWid, texHig, texRate;
var baseRenderer;
var dropImg, dropTexture, particleScene;

var particleCamera, particleScene;

let direction = {
  vertical: new THREE.Vector2(0, 1),
  horizontal: new THREE.Vector2(1, 0) };

let imgCnt = 0;

class ParticleScene extends THREE.Scene {
  constructor(particleTexture, uvTexture) {
    super();

    this.meshes = [];
    for (var ii = 0; ii < count.particle0; ii++) {
      var size;
      if (ii < 0) size = utils.range(500, 800);else
      size = utils.range(prSize.min, prSize.max);

      var geo = new THREE.PlaneBufferGeometry(size, size);
      var xPos = utils.range(-window.innerWidth / 2, window.innerWidth / 2);
      var yPos = utils.range(-window.innerHeight / 2, window.innerHeight / 2);


      var mat = new THREE.ShaderMaterial({
        uniforms: {
          uBaseTexture: { value: particleTexture },
          uUvTexture: { value: uvTexture },
          uTime: { value: null },
          uDuration: { value: null } },

        vertexShader: document.getElementById('vertex').textContent,
        fragmentShader: document.getElementById('particleShader').textContent,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending });

      mat.uniforms.uDuration.value = utils.range(10, 15);
      mat.uniforms.uTime.value = utils.range(-15, 0);
      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(xPos, yPos, 0);
      this.add(mesh);
      this.meshes.push(mesh);
    }

    this.prevTime = 0;
  }

  onUpdate(dt = 1 / 60) {
    // this.meshes.forEach(function(mesh){

    this.meshes.forEach(function (mesh, index) {
      // if(index == 0){
      mesh.material.uniforms.uTime.value += 1 / 60;
      if (mesh.material.uniforms.uTime.value > mesh.material.uniforms.uDuration.value) {
        mesh.material.uniforms.uTime.value = -1.0 - 1.0 * Math.random();
        var xPos = utils.range(-window.innerWidth / 2, window.innerWidth / 2);
        var yPos = utils.range(-window.innerHeight / 2, window.innerHeight / 2);
        mesh.position.set(xPos, yPos, 0);
      }
      // mesh.material.uniforms.uTime.value  = mesh.material.uniforms.uTime.value % mesh.material.uniforms.uDuration.value;

      // console.log(mesh.material.uniforms.uTime.value - this.prevTime );

      // this.prevTime = mesh.material.uniforms.uTime.value;
      // }
    }.bind(this));

    // });

  }}


(() => {
  image = new Image();
  image.onload = onLoadImage;
  image.crossOrigin = "Anonymous";
  image.src = imageUrl;


  particleImg = new Image();
  particleImg.onload = onLoadImage;
  particleImg.crossOrigin = "Anonymous";
  particleImg.src = particleUrl;

  dropImg = new Image();
  dropImg.onload = onLoadImage;
  dropImg.crossOrigin = "Anonymous";
  dropImg.src = dropColorUrl;
})();

function onLoadImage() {
  imgCnt++;

  if (imgCnt < 3) return;

  texture = new THREE.Texture(image);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;

  outputMat.uniforms.baseTex.value = texture;

  particleTexture = new THREE.Texture(particleImg);
  particleTexture.needsUpdate = true;
  particleTexture.minFilter = THREE.LinearFilter;

  dropTexture = new THREE.Texture(dropImg);
  dropTexture.needsUpdate = true;
  dropTexture.minFilter = THREE.LinearFilter;

  texWid = image.width;
  texHig = image.height;

  texRate = texWid / texHig;

  blurShader.uniforms.uTex.value = texture;
  blurShader.uniforms.uResolution.value = new THREE.Vector2(image.width, image.height);
  blurShader.uniforms.uDirection.value = direction.horizontal;
  blurMat = new THREE.ShaderMaterial(blurShader);



  init();
  isLoop = true;
  TweenMax.ticker.addEventListener("tick", loop);
}

function init() {
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene = new THREE.Scene();

  particleCamera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, -window.innerHeight / 2, window.innerHeight / 2, 0, 1000);
  particleCamera.position.z = 10;
  particleScene = new ParticleScene(particleTexture, dropTexture);

  textureScene = new THREE.Scene();
  var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: false };
  swapRendererBase0 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, parameters);
  swapRendererBase1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, parameters);
  blurRenderer = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, parameters);
  particleRenderer = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, parameters);
  baseRenderer = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, parameters);

  mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), blurMat);
  scene.add(mesh);

  textureMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), blurMat);
  outputMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), outputMat);

  // gui = new GUI();

  renderer = new THREE.WebGLRenderer({
    alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // stats = new Stats();
  clock = new THREE.Clock();
  // document.body.appendChild(stats.dom);

  document.body.appendChild(renderer.domElement);
  document.addEventListener('mousemove', onDocumentMouseMove, false);

  drawBlurImage();

  onResize();
}

function drawBlurImage() {
  var iteration = 12;
  var rate = 0.4;
  blurShader.uniforms.uDirection.value = direction.horizontal.clone().multiplyScalar(iteration * rate);
  renderer.render(scene, camera, swapRendererBase0);
  readRender = swapRendererBase0;
  outputRender = swapRendererBase1;
  textureMesh.material = blurMat; //new THREE.MeshBasicMaterial();
  scene.remove(mesh);
  scene.add(textureMesh);
  for (var ii = 0; ii < iteration - 1; ii++) {
    var curDir;
    if (ii % 2 == 0) {
      curDir = direction.vertical;
    } else {
      curDir = direction.horizontal;
    }
    var radius = (iteration - ii - 1) * rate;

    blurShader.uniforms.uDirection.value = curDir.clone().multiplyScalar(radius);
    blurShader.uniforms.uTex.value = readRender.texture;
    if (ii == iteration - 2) renderer.render(scene, camera, blurRenderer);else
    renderer.render(scene, camera, outputRender);

    if (readRender == swapRendererBase0) {
      readRender = swapRendererBase1;
      outputRender = swapRendererBase0;
    } else {
      readRender = swapRendererBase0;
      outputRender = swapRendererBase1;
    }
  }
  scene.remove(textureMesh);

  // outputMesh.material.map = blurRenderer.texture;
  // scene.remove(textureMesh);
  // scene.add(outputMesh)
}

function loop() {
  var delta = clock.getDelta();

  particleScene.onUpdate();
  renderer.render(particleScene, particleCamera, particleRenderer);

  // var iteration = 4;
  // var rate = 0.2;
  // blurShader.uniforms.uDirection.value = direction.horizontal.clone().multiplyScalar(iteration * rate);
  // blurShader.uniforms.uTex.value = particleRenderer.texture;
  // scene.add(textureMesh);
  // scene.remove(outputMesh)
  // renderer.render(scene, camera, swapRendererBase0);
  // readRender   = swapRendererBase0;
  // outputRender = swapRendererBase1;
  // textureMesh.material = blurMat;
  //
  // for(var ii = 0; ii < iteration -1; ii++){
  //     var curDir;
  //     if(ii % 2 == 0){
  //         curDir = direction.vertical;
  //     }else{
  //         curDir = direction.horizontal;
  //     }
  //     var radius = (iteration - ii - 1) * rate
  //
  //     blurShader.uniforms.uDirection.value = curDir.clone().multiplyScalar(radius);
  //     blurShader.uniforms.uTex.value = readRender.texture;
  //     if(ii == iteration - 2) renderer.render(scene, camera, particleRenderer);
  //     else                    renderer.render(scene, camera, outputRender);
  //     renderer.render(scene, camera, outputRender);
  //
  //     if(readRender == swapRendererBase0){
  //         readRender = swapRendererBase1;
  //         outputRender = swapRendererBase0;
  //     }else{
  //         readRender = swapRendererBase0;
  //         outputRender = swapRendererBase1;
  //     }
  // }
  //
  // scene.remove(textureMesh);

  scene.add(outputMesh);
  outputMesh.material.uniforms.blurTex.value = blurRenderer.texture;
  outputMesh.material.uniforms.particleTex.value = particleRenderer.texture;



  // outputMesh.material.map = particleRenderer.texture;
  renderer.render(scene, camera);
}


function onDocumentMouseMove(event) {
  event.preventDefault();
  if (!mouse) mouse = new THREE.Vector2();

  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onResize(ev) {
  var windowRate = window.innerWidth / window.innerHeight;
  var scaleW, scaleH;
  camera.updateProjectionMatrix();

  if (texRate > windowRate) {
    scaleH = 1;
    scaleW = texWid / texHig / (window.innerWidth / window.innerHeight);
  } else {
    scaleW = 1;
    scaleH = texHig / texWid / (window.innerHeight / window.innerWidth);
  }

  mesh.scale.set(scaleW, scaleH, 1);

  if (renderer) renderer.setSize(window.innerWidth, window.innerHeight);
  if (swapRendererBase0) swapRendererBase0.setSize(window.innerWidth, window.innerHeight);
  if (swapRendererBase1) swapRendererBase1.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onResize);

window.addEventListener('keydown', function (ev) {
  switch (ev.which) {
    case 27:
      isLoop = !isLoop;
      if (isLoop) {
        clock.stop();
        TweenMax.ticker.addEventListener("tick", loop);
      } else {
        clock.start();
        TweenMax.ticker.removeEventListener("tick", loop);
      }
      break;}

});