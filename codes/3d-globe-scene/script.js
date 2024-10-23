const sceneWidth = 600;
const sceneHeight = 400;
var renderer;
var lightDir;
var lightAngle;
var scene;
var camera;
var earth;
var star;
var canvas;
var targetTheta = 0;
var curTheta = 0;
var prevMouseX;
var isMousedown = false;

// initialize all components for this demo
init();
// render webgl every frame
animate();

function init() {
  createRenderer();
  createScene();
  createCamera();
  createEarth();
  createStar();

  addMouseEvent();
}

function createRenderer() {
  canvas = document.getElementById('canvas');
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas });

  renderer.setSize(sceneWidth, sceneHeight);
}

function createScene() {
  scene = new THREE.Scene();
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight, 0.1, 1000);
  camera.position.z = 5;
}

function createEarth() {
  const vertexShaderSrc = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform sampler2D uElvTex;
  
varying vec2 vUv;
varying vec3 vPosition;
void main(){
    vec4 elCol = texture2D(uElvTex, uv);
    float r =  ( 1.0 + 0.06 * elCol.r);

    vec4 modelPosition = modelMatrix * vec4( r * position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vUv = uv;
    vPosition = modelPosition.xyz;
}
`;
  const fragmentShaderSrc = `
precision highp float;

varying vec2 vUv;

uniform sampler2D uBaseTex;
uniform sampler2D uElvTex;
uniform sampler2D uNightTex;
uniform vec3 uDir;

varying vec3 vPosition;

void main(){
    vec4 texCol = texture2D(uBaseTex, vUv);
    vec4 nightCol = texture2D(uNightTex, vUv);
    vec3 normalVec = -uDir;
    float dotVal = max(dot(normalVec, vPosition), 0.0);

    gl_FragColor = mix(nightCol, texCol, dotVal);
}
`;

  lightAngle = 0;
  lightDir = new THREE.Vector3(Math.cos(lightAngle), 0.0, Math.sin(lightAngle));

  const earthImgUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/earthmap1k_tiny.jpg';
  const earthNightImgUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/earthlights.jpg';
  const earthElvImgUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/earthbump.jpg';

  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin("anonymous");
  var baseTexture = loader.load(earthImgUrl);
  baseTexture.minFilter = THREE.LinearFilter;
  baseTexture.magFilter = THREE.LinearFilter;

  var elloader = new THREE.TextureLoader();
  elloader.setCrossOrigin("anonymous");
  var elvTexture = elloader.load(earthElvImgUrl);
  elvTexture.minFilter = THREE.LinearFilter;
  elvTexture.magFilter = THREE.LinearFilter;

  var nightloader = new THREE.TextureLoader();
  nightloader.setCrossOrigin("anonymous");
  var nightTexture = nightloader.load(earthNightImgUrl);
  nightTexture.minFilter = THREE.LinearFilter;
  nightTexture.magFilter = THREE.LinearFilter;

  var geometry = new THREE.SphereGeometry(1, 100, 100);
  var material = new THREE.RawShaderMaterial({
    vertexShader: vertexShaderSrc,
    fragmentShader: fragmentShaderSrc,
    uniforms: {
      uNightTex: { value: nightTexture },
      uElvTex: { value: elvTexture },
      uBaseTex: { value: baseTexture },
      uDir: { value: lightDir } } });


  earth = new THREE.Mesh(geometry, material);

  scene.add(earth);
}


function createStar() {
  const vertexShader = `
precision highp float;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;

varying float vAlpha;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

  gl_PointSize =  ( 20.0 / -mvPosition.z );
  vAlpha = min(3.0 / -mvPosition.z, 1.0);

  gl_Position = projectionMatrix * mvPosition;

}
`;
  const fragmentShader = `
precision highp float;
varying float vAlpha;
void main() {
  gl_FragColor = vec4( 1.0, 1.0, 1.0,  vAlpha );
}
`;

  var vertices = [];

  for (var i = 0; i < 10000; i++) {
    const rad = Math.random() * 10 + 6;
    const theta = Math.PI * Math.random();
    const phi = 2 * Math.PI * Math.random();

    var x = rad * Math.sin(theta) * Math.cos(phi);
    var y = rad * Math.cos(theta);
    var z = rad * Math.sin(theta) * Math.sin(phi);

    vertices.push(x, y, z);
  }

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  var material = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true });


  var points = new THREE.Points(geometry, material);

  scene.add(points);
}

function addMouseEvent() {
  canvas.addEventListener('mousedown', onMouseDownHandler);
  canvas.addEventListener('mouseup', onMouseUpHandler);
  canvas.addEventListener('mouseleave', onMouseUpHandler);
  canvas.addEventListener('mousemove', onMouseMoveHandler);
}

function onMouseDownHandler(event) {
  prevMouseX = event.clientX;
  isMousedown = true;
}

function onMouseUpHandler(event) {
  isMousedown = false;
}

function onMouseMoveHandler(event) {
  if (isMousedown) {
    const dx = event.clientX - prevMouseX;
    prevMouseX = event.clientX;
    targetTheta += dx / 100;
  }
}

function animate() {
  curTheta += (targetTheta - curTheta) / 20;
  camera.position.z = 5 * Math.sin(curTheta);
  camera.position.x = 5 * Math.cos(curTheta);
  camera.lookAt(new THREE.Vector3());

  earth.rotation.y -= 1 / 300;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}