var lastUpdate;
var container;
var camera, scene, renderer;
var uniforms, updateUniforms;
var opts;

function randomColor() {
  return (Math.floor(Math.random()*0xff) << 16) + (Math.floor(Math.random()*0xff) << 8) + Math.floor(Math.random()*0xff);
}

var Options = function() {
  this.fuzziness = 0.62;
  this.fireSpeed = 1.67;
  this.brightnessMultiplier = 1.2;
  this.noiseMultiplier = 36.31;
  this.noiseScale = 0.46;
  this.baseSize = 2.44;
  this.outerStep = 0.1;
  this.innerStep = 2.57;
  this.distortionPower = 5.49;
  this.innerVerticalFalloff = 1.65;
  this.outerColorBase = 0xbb1c2f;
  this.innerColorBase = 0xa7b104;
  this.randomizeValues = function() {
    this.fuzziness = Math.floor((0.01 + Math.random() * 0.99) * 100) / 100;
    this.fireSpeed = Math.floor(Math.random() * 2 * 100) / 100;
    this.brightnessMultiplier = Math.floor(Math.random() * 3 * 100) / 100;
    this.noiseMultiplier = Math.floor(Math.random() * 50 * 100) / 100;
    this.noiseScale = Math.floor(Math.random() * 2 * 100) / 100;
    this.baseSize = Math.floor(Math.random() * 3 * 100) / 100;
    this.outerStep = Math.floor(Math.random() * 1.5 * 100) / 100;
    this.innerStep = Math.floor((this.outerStep + Math.random() * (3-this.outerStep)) * 100) / 100;
    this.distortionPower = Math.floor((1 + Math.random() * 9) * 100) / 100;
    this.innerVerticalFalloff = Math.floor((1 + Math.random() * 4) * 100) / 100;
    this.outerColorBase = randomColor();
    this.innerColorBase = randomColor();
    updateUniforms();
  };
};

function init(showStats) {
  // stats
  if (showStats) {
    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';
    document.body.appendChild(stats.domElement);
    requestAnimationFrame(function updateStats(){
      stats.update();
      requestAnimationFrame(updateStats);
    });
  }
  
  // dat gui
  opts = new Options();
  gui = new dat.GUI({
    load: {
      remembered: {
        "Default": {"0": {}},
        "Torchlight": {"0": {
          "fuzziness": 0.07,
          "fireSpeed": 1.67,
          "brightnessMultiplier": 1.2,
          "noiseMultiplier": 36.31,
          "noiseScale": 0.46,
          "baseSize": 2.44,
          "outerStep": 0.1,
          "innerStep": 2.57,
          "distortionPower": 5.49,
          "innerVerticalFalloff": 1.65,
          "outerColorBase": 0xbb1c2f,
          "innerColorBase": 0xa7b104,
        }},
        "Black Magic": {"0": {
          "fuzziness": 0.45,
          "fireSpeed": 1.13,
          "brightnessMultiplier": 1.3,
          "noiseMultiplier": 11.92,
          "noiseScale": 0.26,
          "baseSize": 2.29,
          "outerStep": 0.07,
          "innerStep": 1.27,
          "distortionPower": 4.32,
          "innerVerticalFalloff": 2.39,
          "outerColorBase": 0x662d78,
          "innerColorBase": 0xe6da27,
        }},
        "Bonfire": {"0": {
          "fuzziness": 0.27,
          "fireSpeed": 0.61,
          "brightnessMultiplier": 0.81,
          "noiseMultiplier": 5.96,
          "noiseScale": 0.26,
          "baseSize": 2.5,
          "outerStep": 0.28,
          "innerStep": 1.53,
          "distortionPower": 2.24,
          "innerVerticalFalloff": 2.04,
          "outerColorBase": 0x9b1111,
          "innerColorBase": 0xffee00,
        }},
        "Lapis": {"0": {
          "fuzziness": 0.76,
          "fireSpeed": 0.41,
          "brightnessMultiplier": 0.94,
          "noiseMultiplier": 4.88,
          "noiseScale": 0.39,
          "baseSize": 0.42,
          "outerStep": 0.83,
          "innerStep": 2.67,
          "distortionPower": 5.97,
          "innerVerticalFalloff": 1.74,
          "outerColorBase": 0x075aa5,
          "innerColorBase": 0xbb8f25,
        }},
        "Flickering Candle": {"0": {
          "fuzziness": 1.0,
          "fireSpeed": 1.84,
          "brightnessMultiplier": 2.61,
          "noiseMultiplier": 36.19,
          "noiseScale": 0.06,
          "baseSize": 2.84,
          "outerStep": 1.1,
          "innerStep": 1.7,
          "distortionPower": 2.47,
          "innerVerticalFalloff": 2.52,
          "outerColorBase": 0xa84f42,
          "innerColorBase": 0x81c418,
        }},
      }
    }
  });
  gui.addColor(opts, 'outerColorBase')
    .onFinishChange((newValue) => { opts.outerColorBase = newValue; updateUniforms(); });
  gui.addColor(opts, 'innerColorBase')
    .onFinishChange((newValue) => { opts.innerColorBase = newValue; updateUniforms(); });
  gui.add(opts, 'fuzziness', 0.01, 1.0).step(0.01)
    .onFinishChange((newValue) => { opts.fuzziness = newValue; updateUniforms(); });
  gui.add(opts, 'fireSpeed', 0.0, 2.0).step(0.01)
    .onFinishChange((newValue) => { opts.fireSpeed = newValue; updateUniforms(); });
  gui.add(opts, 'brightnessMultiplier', 0.0, 3.0).step(0.01)
    .onFinishChange((newValue) => { opts.brightnessMultiplier = newValue; updateUniforms(); });
  gui.add(opts, 'noiseMultiplier', 0.0, 50.0).step(0.01)
    .onFinishChange((newValue) => { opts.noiseMultiplier = newValue; updateUniforms(); });
  gui.add(opts, 'noiseScale', 0.0, 2.0).step(0.01)
    .onFinishChange((newValue) => { opts.noiseScale = newValue; updateUniforms(); });
  gui.add(opts, 'baseSize', 0.0, 3.0).step(0.01)
    .onFinishChange((newValue) => { opts.baseSize = newValue; updateUniforms(); });
  gui.add(opts, 'outerStep', 0.0, 1.5).step(0.01)
    .onFinishChange((newValue) => { opts.outerStep = newValue; updateUniforms(); });
  gui.add(opts, 'innerStep', 0.0, 3.0).step(0.01)
    .onFinishChange((newValue) => { opts.innerStep = newValue; updateUniforms(); });
  gui.add(opts, 'distortionPower', 1.0, 10.0).step(0.01)
    .onFinishChange((newValue) => { opts.distortionPower = newValue; updateUniforms(); });
  gui.add(opts, 'innerVerticalFalloff', 1.0, 5.0).step(0.01)
    .onFinishChange((newValue) => { opts.innerVerticalFalloff = newValue; updateUniforms(); });
  gui.add(opts, 'randomizeValues')
    .onFinishChange(() => {
      for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
      }
    });
  gui.remember(opts);
  
  this.brightnessMultiplier = 1.0;
  this.noiseMultiplier = 0.0;
  this.noiseScale = 0.5;
  this.baseSize = 1.0;
  this.outerStep = 0.4;
  this.innerStep = 2.0;
  this.distortionPower = 1.0;
  this.innerVerticalFalloff = 1.0;
  
  // basic setup
  container = document.getElementById( 'container' );
  camera = new THREE.Camera();
  camera.position.z = 1;
  scene = new THREE.Scene();
  var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

  // shader stuff
  var tl = new THREE.TextureLoader();
  tl.setCrossOrigin('anonymous');
  var cdnPath = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/';
  uniforms = {
    time: { value: 1.0 },
    resolution: { value: new THREE.Vector2() },
    texNoise: { value: tl.load( cdnPath+'tex-noise-01.png?t=1' ) },
    texMask: { value: tl.load( cdnPath+'tex-simpleMask-gentleFade-01.png?t=1' ) },
    fuzziness: { value: 0.5 },
    fireSpeed: { value: 1.0 },
    brightnessMultiplier: { value: 1.0 },
    noiseMultiplier: { value: 20.0 },
    noiseScale: { value: 0.5 },
    baseSize: { value: 1.0 },
    outerStep: { value: 0.4 },
    innerStep: { value: 2.0 },
    distortionPower: { value: 1.0 },
    innerVerticalFalloff: { value: 1.0 },
    outerColorBase: { value: new THREE.Color( 0xff0000 ) },
    innerColorBase: { value: new THREE.Color( 0xffff00 ) },
  };
  updateUniforms = function updateUniforms() {
    uniforms.fuzziness.value = opts.fuzziness;
    uniforms.fireSpeed.value = opts.fireSpeed;
    uniforms.brightnessMultiplier.value = opts.brightnessMultiplier;
    uniforms.noiseMultiplier.value = opts.noiseMultiplier;
    uniforms.noiseScale.value = opts.noiseScale;
    uniforms.baseSize.value = opts.baseSize;
    uniforms.outerStep.value = opts.outerStep;
    uniforms.innerStep.value = opts.innerStep;
    uniforms.distortionPower.value = opts.distortionPower;
    uniforms.innerVerticalFalloff.value = opts.innerVerticalFalloff;
    uniforms.outerColorBase.value = new THREE.Color( opts.outerColorBase );
    uniforms.innerColorBase.value = new THREE.Color( opts.innerColorBase );
  };
  updateUniforms();
  
  var material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  } );
  lastUpdate = new Date().getTime();

  // put it together for rendering
  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio / 2 );
  container.appendChild( renderer.domElement );
  
  // event listeners
  onWindowResize();
  window.addEventListener( 'resize', onWindowResize, false);
  document.getElementById('resolution').addEventListener('change', onResolutionChange, false);
}

// events
function onWindowResize(evt) {
  renderer.setSize( 0.7 * window.innerHeight, window.innerHeight );
  uniforms.resolution.value.x = renderer.domElement.width;
  uniforms.resolution.value.y = renderer.domElement.height;
}
function onResolutionChange(evt) {
  var newResolutionScale = parseFloat(evt.target.value);
  renderer.setPixelRatio( window.devicePixelRatio / newResolutionScale );
  uniforms.resolution.value.x = renderer.domElement.width;
  uniforms.resolution.value.y = renderer.domElement.height;
}
function animate() {
  var currentTime = new Date().getTime()
  var timeSinceLastUpdate = currentTime - lastUpdate;
  lastUpdate = currentTime;
  
  requestAnimationFrame( animate );
  render(timeSinceLastUpdate);
}
function render(timeDelta) {
  uniforms.time.value += (timeDelta ? timeDelta / 1000 : 0.05);
  renderer.render( scene, camera );
}

// boot
init(true);
animate();