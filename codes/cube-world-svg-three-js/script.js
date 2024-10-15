/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

let scene;
let camera;
let renderer;
// There's some commented code that let's you control the camera position (through the angle variable) with mouse y position
// That gives you more control of the camera position which is good when you'd like to download the SVG for a particular view.
let angle = 0;
let cols = 7;
let rows = 7;
let pages = 7;
let size = 0.3;

function setup() {
  console.clear();
  setupScene();
  setupCamera();
  setupRenderer();
  setupCubes();
  setupEventListeners();
}

function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222233);
}

function setupCamera() {
  let res = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, res, 0.1, 1000);
  camera.position.z = size * 1.01;
}

function setupRenderer() {
  renderer = new THREE.SVGRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupCubes() {
  let boxGeometry = new THREE.BoxGeometry(size, size, size);
  let edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
  let material = new THREE.LineBasicMaterial({ 
    color: 0xdddddd, 
    linewidth: 1 });
  for(let page = 0; page < pages; page++) {
    for(let col = 0; col < cols; col++) {
      for(let row = 0; row < rows; row++) {
        let x = -(cols-1) / 2 + col;
        let y = -(rows-1) / 2 + row;
        let z = -page;
        let cube = new THREE.LineSegments(edgesGeometry, material);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        scene.add(cube);
      }
    }
  }
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
  document.addEventListener("keydown", onKeyDown);
  //window.addEventListener("mousemove", onMouseMove);
}

function onMouseMove() {
  angle = event.clientY / window.innerHeight * Math.PI * 2;
  
  //camera.position.z = event.clientX / window.innerWidth * 10 - 5;

  draw();  
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown (e) {
  if(e.code === "KeyD") {
    download();
  }
}

function download() {
  let svg = document.querySelector("svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("version", "1.1");
  let svgDoc = svg.outerHTML;
  let filename = "cube-world.svg";
  let element = document.createElement("a");
  element.setAttribute("href", "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgDoc));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.addEventListener("click", e => e.stopPropagation());
  element.click();
  document.body.removeChild(element);
}

function draw(now) {
  requestAnimationFrame(draw);
	renderer.render(scene, camera);
  angle = now / 4000;
  let r = cols / 2;
  let x = Math.cos(angle) * r;
  let y = Math.sin(angle) * r;

  camera.position.x = x;
  camera.position.y = y;
  camera.lookAt(0, -rows/2, -pages);
}

setup();
draw(1);