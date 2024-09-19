const ANTIALIAS = true;
const CAMPOS = [0,-1,-10];
const FOV = 80;

//building height
const heightmap = `
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 f 0 0 f f a f d c 0 c f 0 0 
0 0 3 0 d 5 f 3 0 0 4 0 d 0 0 
0 1 0 8 4 0 0 0 6 0 0 0 f 0 0 
0 0 f 2 0 5 0 f 0 0 2 0 0 9 0 
0 a 0 0 0 0 0 0 0 f 0 0 1 f 0 
0 f 6 0 3 0 0 0 0 0 4 3 0 7 0 
7 f 0 d 1 0 0 0 0 0 0 1 2 6 0 
0 0 2 0 c 0 0 0 0 0 0 2 0 9 0 
0 f 0 c 0 0 0 0 0 0 2 5 f 0 0 
0 0 6 0 d 3 0 0 c 0 0 3 0 a 0 
7 0 0 c f 0 0 2 0 6 0 0 8 0 0 
0 0 d 0 0 f 1 0 0 0 c 0 f 0 0 
0 f 0 e d 0 c d 4 f 0 f 0 0 0 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
`.trim()
.split('\n')
.map(xs=>xs.split(' ').map(x=>parseInt(x,16)));
const SIDE = 10;
const ROWS = heightmap.length;
const COLS = heightmap[0].length;

let controls, camera, scene, renderer, light0;
init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(FOV,innerWidth/innerHeight,1,1000);
  camera.position.set(...CAMPOS);
  controls = new THREE.OrbitControls( camera );
  controls.minPolarAngle = Math.PI/180*150;
  controls.maxPolarAngle = Math.PI/180*180;
  controls.enableZoom = false;
  controls.update();
  
  // scene(fog)
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 0.01, SIDE**2.5);

  // cubes
  for(let i = 0; i < ROWS; i++) {
    for(let j = 0; j < COLS; j++) {
      let height = heightmap[i][j]/0xf*SIDE**2.5;
      let metalness = height ? 0: Math.random();
      let roughness = height ? 1: Math.random();
      const steps = 0xff;
      const norm = heightmap[i][j]/0xf; 
      let color = grayscale(norm*steps|0);
      let emissive = color;
      let emissiveIntensity = 0.5;
      let mesh = genmesh({
        emissive,emissiveIntensity,color,
        height,metalness,roughness});
      let x = (j - ROWS/2)*SIDE;
      let z = (i - COLS/2)*SIDE;
      let y = height/2;
      mesh.position.set(x,y,z);
      scene.add(mesh);
    }
  }

  
  // lights
  light0 = new THREE.PointLight(0x104000, 0, 0, 2);
  light0.position.set(0, SIDE*10, 0);
  scene.add(light0);
  
  renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:ANTIALIAS
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  //
  window.addEventListener("resize", onWindowResize, false);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.0006;
  light0.intensity = Math.min(light0.intensity+0.01, 4);
  renderer.render(scene, camera);
  controls.update();
}


  function genmesh({
    emissiveIntensity, emissive,
    height=100,color=0xffffff,metalness=0,roughness=0.5}={}) {
    var geometry = new THREE.BoxBufferGeometry(SIDE,height,SIDE,3,10,3);
    var material = new THREE.MeshStandardMaterial({ 
      color, metalness, roughness, emissiveIntensity,
      emissive,
      wireframe:true
    });
    return mesh = new THREE.Mesh(geometry, material);
  }

function grayscale(i) {
  return (i << 16)+ (i << 8) + i;
}