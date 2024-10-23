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

function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 600;
  // camera.position.x = -300;
  console.log(camera.lookAt(0, 0, 0));

  scene = new THREE.Scene();

  var geometry = new THREE.Geometry();

  var particleCount = 150000;
  // particleCount = 100;

  for (i = 0; i < particleCount; i++) {

    var vertex = new THREE.Vector3();

    vertex.x = 0;
    vertex.y = 0;
    vertex.z = i;

    geometry.vertices.push(vertex);
  }

  uniforms = {
    u_time: { type: "f", value: -10000.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() } };


  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent });

  material.transparent = true;
  material.blending = THREE.AdditiveBlending;
  material.depthTest = false;

  var mesh = new THREE.Points(geometry, material);
  // var mesh = new THREE.Mesh( geometry, starsMaterial );
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  // renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setPixelRatio(1);

  container.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  document.onmousemove = function (e) {

    // camera.position.x = -300 + e.pageX / window.innerWidth * 600;
    // camera.position.y = 300 + e.pageY / window.innerHeight * -600;
    // console.log(camera.lookAt(0,0,0));

    uniforms.u_mouse.value.x = e.pageX;
    uniforms.u_mouse.value.y = e.pageY;
  };
}

function onWindowResize(event) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  uniforms.u_time.value += 0.02;
  renderer.render(scene, camera);
}



init();
animate();