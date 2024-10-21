console.clear();
const [ww, wh] = [window.innerWidth, window.innerHeight];

// WebGL Rendering Engine
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(ww, wh);
document.body.appendChild(renderer.domElement);

// New Scene
const scene = new THREE.Scene();

// Perspective Camera
const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.1, 150);

// Position x,y,z axis of camera
camera.position.set(0, 0, 40);

// create the mesh from geometry and material
const geometry = new THREE.SphereGeometry(10, 64, 64);
const loader = new THREE.TextureLoader();
loader.crossOrigin = true;
const texture = loader.load('https://cdn.jsdelivr.net/gh/josephrexme/csa@06f87acdf9143c20af12203a399684cf10b57e86/images/map-texture.jpg');
const material = new THREE.MeshLambertMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);

// Light
const light = new THREE.AmbientLight(0xa0a0a0);
const hlight = new THREE.HemisphereLight(0xfefefe, 0x000000, 1);

// adding objects to the scene
scene.add(light);
scene.add(mesh);
scene.add(hlight);

// render the scene
const render = () => {
  requestAnimationFrame(render);
  mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
};

render();