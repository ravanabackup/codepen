var container, camera, scene, renderer;

var controls;

var shaderUniforms,
  shaderAttributes,
  particleSystem,
  geometry,
  material;

var gui, guiGeomFolder, guiShaderFolder,
  geometryGUI = [];

var styles = ['solid', 'wireframe', 'pointcloud'],
  geometries = ["sphere", "cylinder", "cube", "torus", "icosahedron", "tetrahedron", "octahedron"];

var settings = {};
settings.style = styles[1];
settings.geometry = geometries[0];
settings.speed = 0.1;
settings.waves = 6;
settings.damping = 0.9;
settings.dotSize = 1;
settings.factorX = 1;
settings.factorY = 1;
settings.factorZ = 1;
settings.fuzzyness = 1;

var sphereSettings = {};
sphereSettings.radius = 100;
sphereSettings.segmentsW = 128;
sphereSettings.segmentsH = 128;

var cylinderSettings = {};
cylinderSettings.radiusTop = 100;
cylinderSettings.radiusBottom = 100;
cylinderSettings.height = 200;
cylinderSettings.segmentsW = 128;
cylinderSettings.segmentsH = 128;
cylinderSettings.openEnded = true;

var cubeSettings = {};
cubeSettings.width = 100;
cubeSettings.height = 100;
cubeSettings.depth = 100;
cubeSettings.segmentsW = 128;
cubeSettings.segmentsH = 128;
cubeSettings.segmentsD = 128;

var torusSettings = {};
torusSettings.radius = 100;
torusSettings.diameter = 100;
torusSettings.segmentsW = 256;
torusSettings.segmentsH = 256;
torusSettings.arc = Math.PI * 2;

var tetrahedronSettings = {};
tetrahedronSettings.radius = 100;
tetrahedronSettings.detail = 4;

var icosahedronSettings = {};
icosahedronSettings.radius = 100;
icosahedronSettings.detail = 4;

var octahedronSettings = {};
octahedronSettings.radius = 100;
octahedronSettings.detail = 4;

var animationTime = 0;

init();
tick();

function init() {
  createScene();
  createControls();
  createParticleSystem();

  createGUI();

  window.addEventListener('resize', onWindowResize, false);
}

function createScene() {
  container = document.getElementById('container');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 600;
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({
    antialias: false
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1);

  container.appendChild(renderer.domElement);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.noPan = true;
}

function createParticleSystem() {
  if (particleSystem) {
    geometry.dispose();
    material.dispose();
    scene.remove(particleSystem);
  }

  animationTime = 0;

  shaderAttributes = {
    index: {
      type: "f",
      value: []
    },
    random: {
      type: "f",
      value: []
    }
  };

  shaderUniforms = {
    delta: {
      type: "f",
      value: 0
    },
    time: {
      type: "f",
      value: 0
    },
    damping: {
      type: "f",
      value: 1 - settings.damping
    },
    dotSize: {
      type: "f",
      value: settings.dotSize
    },
    modifiers: {
      type: "v4",
      value: new THREE.Vector4(settings.factorX, settings.factorY, settings.factorZ, settings.fuzzyness)
    },
    resolution: {
      type: "v2",
      value: new THREE.Vector2(window.innerWidth, window.innerHeight)
    }
  };

  material = new THREE.ShaderMaterial({
    attributes: shaderAttributes,
    uniforms: shaderUniforms,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
    wireframe: (settings.style === 'wireframe')
  });

  switch (settings.geometry) {
    case "sphere":
      geometry = new THREE.SphereGeometry(sphereSettings.radius, sphereSettings.segmentsW, sphereSettings.segmentsH);
      break;
    case "cylinder":
      geometry = new THREE.CylinderGeometry(cylinderSettings.radiusTop, cylinderSettings.radiusBottom, cylinderSettings.height, cylinderSettings.segmentsW, cylinderSettings.segmentsH, cylinderSettings.openEnded);
      break;
    case "cube":
      geometry = new THREE.CubeGeometry(cubeSettings.width, cubeSettings.height, cubeSettings.depth, cubeSettings.segmentsW, cubeSettings.segmentsH, cubeSettings.segmentsD);
      break;
    case "torus":
      geometry = new THREE.TorusGeometry(torusSettings.radius, torusSettings.diameter, torusSettings.segmentsW, torusSettings.segmentsH, torusSettings.arc);
      break;
    case "icosahedron":
      geometry = new THREE.IcosahedronGeometry(icosahedronSettings.radius, icosahedronSettings.detail);
      break;
    case "tetrahedron":
      geometry = new THREE.TetrahedronGeometry(tetrahedronSettings.radius, tetrahedronSettings.detail);
      break;
    case "octahedron":
      geometry = new THREE.OctahedronGeometry(octahedronSettings.radius, octahedronSettings.detail);
      break;
  }

  shaderUniforms.delta.value = Math.PI * settings.waves / geometry.vertices.length;

  for (var i = 0; i < geometry.vertices.length; i++) {
    shaderAttributes.index.value[i] = i;
    shaderAttributes.random.value[i] = 0.5 + Math.random() * 1;
  }

  switch (settings.style) {
    case 'solid':
    case 'wireframe':
      particleSystem = new THREE.Mesh(geometry, material);
      break;
    case 'pointcloud':
      particleSystem = new THREE.PointCloud(geometry, material);
      break;
  }

  scene.add(particleSystem);
}

// GUI CREATION

function createGUI() {
  gui = new dat.GUI();
  guiGeomFolder = gui.addFolder("shape settings");
  guiGeomFolder.add(settings, "style", styles).name("style");
  guiGeomFolder.add(settings, "geometry", geometries).name("shape").onChange(createGeometryGUI);

  guiShaderFolder = gui.addFolder("shader settings");
  guiShaderFolder.add(settings, "speed", 0.01, 1).name("time scale");
  guiShaderFolder.add(settings, "waves", 2, 100).step(2).name("number of waves").onChange(wavesChangedHandler);
  guiShaderFolder.add(settings, "damping", 0, 0.99).onChange(dampingChangedHandler);
  guiShaderFolder.add(settings, "dotSize", 1, 10).name("dot size").onChange(dotSizeChangedHandler);
  guiShaderFolder.add(settings, "factorX", -10, 10).name("x offset").onChange(factorXChangedHandler);
  guiShaderFolder.add(settings, "factorY", -10, 10).name("y offset").onChange(factorYChangedHandler);
  guiShaderFolder.add(settings, "factorZ", -10, 10).name("z offset").onChange(factorZChangedHandler);
  guiShaderFolder.add(settings, "fuzzyness", 0, 10).name("fuzzyness").onChange(randomnessChangedHandler);

  createGeometryGUI();

  guiGeomFolder.open();
  guiShaderFolder.open();
}

function createGeometryGUI() {
  clearGeometryGUI();

  switch (settings.geometry) {
    case "sphere":
      geometryGUI.push(guiGeomFolder.add(sphereSettings, "radius", 1, 200));
      geometryGUI.push(guiGeomFolder.add(sphereSettings, "segmentsW", 4, 516).step(1));
      geometryGUI.push(guiGeomFolder.add(sphereSettings, "segmentsH", 4, 516).step(1));
      break;
    case "cylinder":
      geometryGUI.push(guiGeomFolder.add(cylinderSettings, "radiusTop", 1, 200));
      geometryGUI.push(guiGeomFolder.add(cylinderSettings, "radiusBottom", 1, 200));
      geometryGUI.push(guiGeomFolder.add(cylinderSettings, "height", 1, 600));
      geometryGUI.push(guiGeomFolder.add(cylinderSettings, "segmentsW", 4, 516).step(1));
      geometryGUI.push(guiGeomFolder.add(cylinderSettings, "segmentsH", 4, 516).step(1));
      geometryGUI.push(guiGeomFolder.add(cylinderSettings, "openEnded"));
      break;
    case "cube":
      geometryGUI.push(guiGeomFolder.add(cubeSettings, "width", 1, 200));
      geometryGUI.push(guiGeomFolder.add(cubeSettings, "height", 1, 200));
      geometryGUI.push(guiGeomFolder.add(cubeSettings, "depth", 1, 200));
      geometryGUI.push(guiGeomFolder.add(cubeSettings, "segmentsW", 4, 516).step(1));
      geometryGUI.push(guiGeomFolder.add(cubeSettings, "segmentsH", 4, 516).step(1));
      geometryGUI.push(guiGeomFolder.add(cubeSettings, "segmentsD", 4, 516).step(1));
      break;
    case "torus":
      geometryGUI.push(guiGeomFolder.add(torusSettings, "radius", 1, 200));
      geometryGUI.push(guiGeomFolder.add(torusSettings, "diameter", 1, 200));
      geometryGUI.push(guiGeomFolder.add(torusSettings, "segmentsW", 4, 516).step(1));
      geometryGUI.push(guiGeomFolder.add(torusSettings, "segmentsH", 4, 516).step(1));
      geometryGUI.push(guiGeomFolder.add(torusSettings, "arc", 0, Math.PI * 2));
      break;
    case "icosahedron":
      geometryGUI.push(guiGeomFolder.add(icosahedronSettings, "radius", 1, 200));
      geometryGUI.push(guiGeomFolder.add(icosahedronSettings, "detail", 0, 5).step(1));
      break;
    case "tetrahedron":
      geometryGUI.push(guiGeomFolder.add(tetrahedronSettings, "radius", 1, 200));
      geometryGUI.push(guiGeomFolder.add(tetrahedronSettings, "detail", 0, 8).step(1));
      break;
    case "octahedron":
      geometryGUI.push(guiGeomFolder.add(octahedronSettings, "radius", 1, 200));
      geometryGUI.push(guiGeomFolder.add(octahedronSettings, "detail", 0, 8).step(1));
      break;
  }

  geometryGUI.push(guiGeomFolder.add(window, "updateGeometry").name("> apply settings"));
}

function clearGeometryGUI() {
  for (var i = 0; i < geometryGUI.length; i++) {
    guiGeomFolder.remove(geometryGUI[i]);
  }

  geometryGUI = [];
}

// SETTINGS UPDATE HANDLERS

function updateGeometry() {
  createParticleSystem();
}

function wavesChangedHandler() {
  shaderUniforms.delta.value = Math.PI * settings.waves / geometry.vertices.length;
  shaderUniforms.delta.needsUpdate = true;
}

function dampingChangedHandler() {
  shaderUniforms.damping.value = 1 - settings.damping;
  shaderUniforms.damping.needsUpdate = true;
}

function dotSizeChangedHandler() {
  shaderUniforms.dotSize.value = settings.dotSize;
  shaderUniforms.dotSize.needsUpdate = true;
}

function factorXChangedHandler() {
  shaderUniforms.modifiers.value.x = settings.factorX;
  shaderUniforms.modifiers.needsUpdate = true;
}

function factorYChangedHandler() {
  shaderUniforms.modifiers.value.y = settings.factorY;
  shaderUniforms.modifiers.needsUpdate = true;
}

function factorZChangedHandler() {
  shaderUniforms.modifiers.value.z = settings.factorZ;
  shaderUniforms.modifiers.needsUpdate = true;
}

function randomnessChangedHandler() {
  shaderUniforms.modifiers.value.w = settings.fuzzyness;
  shaderUniforms.modifiers.needsUpdate = true;
}

// LOOP

function tick() {
  requestAnimationFrame(tick);

  update();
  render();
}

function update() {
  shaderUniforms.time.value = animationTime;
  animationTime += settings.speed;

  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}