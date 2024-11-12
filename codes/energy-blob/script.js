import * as THREE from 'three';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {AfterimagePass} from 'three/addons/postprocessing/AfterimagePass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

/* ========== S E T T I N G S ========== */
let configs = [
  { // ==================== 1
    useHDR: true,
    blob: {
      geometry: {
        segments: 256,
        scale: 1
      },
      material: {
        flatShading: false,
        wireframe: false,
        color: "#dfc5f7",
        roughness: 0.25,
        metalness: 0.75
      }
    },
    camera: {
      z: 4.8,
      y: 0,
      x: 0
    },
    lighting1: {
      color: "#ffa2a2",
      intensity: 3,
      distance: 30,
      decay: 2,
      pos: {
        x: 0,
        y: 0,
        z: 15
      }
    },
    lighting2: {
      color: "#08088e",
      intensity: 3,
      distance: 86,
      decay: 2,
      pos: {
        x: 0,
        y: 0,
        z: -15
      }
    },
    ambient: {
      color: "#ffffff",
      intensity: 0
    },
    noise: {
      roughness: 2,
      is_perlin: true,
      distortion: {
        x: 1.5,
        y: 0.8,
        z: 1.1
      },
      speed: {
        x: 0,
        y: -1,
        z: 1
      }
    }
  }
];

let currentBlob = 0;
let config = configs[currentBlob];

// const default_config = {...config}; // might use for reset or smth idk
// var theta1 = 0;

let secondsPassed = 0;
let oldTimeStamp = 0;
let timePassed = 0;
let blob_is_animated = false;
let blob_is_transitioned = false;


/* ========== S C E N E  S E T U P ========== */
let composer, model1, blob, blob_mat, blob_geo;
var renderer = new THREE.WebGLRenderer({ canvas : document.getElementById('blob_canvas'), antialias:true, alpha: true});
renderer.setClearColor(0xffffff, 0);

// use device aspect ratio
renderer.setPixelRatio(window.devicePixelRatio);
// set size of canvas within window
renderer.setSize(window.innerWidth, window.innerHeight);

var scene = new THREE.Scene();



/* ========== H D R ========== */
const hdrEquirect = new RGBELoader()
.setPath( 'https://assets.codepen.io/1692350/' )
.load( 'istockphoto-1314573738-612x612.hdr', function () {

  hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
} );

if(config.useHDR)
  scene.environment = hdrEquirect;



/* ========== C A M E R A ========== */
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = config.camera.z;
camera.position.y = config.camera.y;
camera.position.x = config.camera.x;



/* ========== L I G H T I N G ========== */
const lighting1 = new THREE.PointLight (config.lighting1.color, config.lighting1.intensity, config.lighting1.distance);
lighting1.position.set (config.lighting1.pos.x, config.lighting1.pos.z, config.lighting1.pos.y);
scene.add(lighting1);

const lighting2 = new THREE.PointLight (config.lighting2.color, config.lighting2.intensity, config.lighting2.distance);
lighting2.position.set (config.lighting2.pos.x, config.lighting2.pos.z, config.lighting2.pos.y);
scene.add(lighting2); 

const ambient = new THREE.AmbientLight(config.ambient.color, config.ambient.intensity);
scene.add(ambient);



/* ========== M E S H ========== */
updateBlob();



/* ========== P O S T  P R O C E S S I N G ========== */
const renderScene = new RenderPass(scene, camera);


const afterimagePass = new AfterimagePass();
afterimagePass.uniforms[ 'damp' ].value = 0.93;

const bloomparams = {
	exposure: 1,
	bloomStrength: 1,
	bloomThreshold: 0.1,
	bloomRadius: 1
};

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = bloomparams.bloomThreshold;
bloomPass.strength = bloomparams.bloomStrength;
bloomPass.radius = bloomparams.bloomRadius;

composer = new EffectComposer( renderer );
composer.addPass(renderScene);
composer.addPass( afterimagePass );
composer.addPass( bloomPass );



/* ========== E V E N T S ========== */
window.addEventListener( 'resize', onWindowResize );

var update = function(secondsPassed) {
  var time = performance.now() * 0.001;

  if(blob_is_animated){
    secondsPassed = Math.min(secondsPassed, 0.1); // Limit time factor
    timePassed += secondsPassed;
    blob.rotation.y = easeOutQuint(timePassed, 0, 360 * (Math.PI / 180), 2);
  }

  var k = config.noise.roughness;
  let position = blob.geometry.attributes.position;
  let vector = new THREE.Vector3();
  if(config.noise.is_perlin){
    for (var i = 0; i < position.count; i++) {
      var p = vector.fromBufferAttribute(position, i);
      p.normalize().multiplyScalar(
        1 + 0.3 * noise.perlin3(
          (p.x * config.noise.distortion.x) * k + (time * config.noise.speed.x),
          (p.y * config.noise.distortion.y) * k + (time * config.noise.speed.y),
          (p.z * config.noise.distortion.z) * k + (time * config.noise.speed.z)
        )
      );
      position.setXYZ(i, vector.x, vector.y, vector.z);
    }
  }else{
    for (var i = 0; i < position.count; i++) {
      var p = vector.fromBufferAttribute(position, i);
      p.normalize().multiplyScalar(
        1 + 0.3 * noise.simplex3(
          (p.x * config.noise.distortion.x) * k + (time * config.noise.speed.x),
          (p.y * config.noise.distortion.y) * k + (time * config.noise.speed.y),
          (p.z * config.noise.distortion.z) * k + (time * config.noise.speed.z)
        )
      );
      position.setXYZ(i, vector.x, vector.y, vector.z);
    }
  }
  blob.geometry.computeVertexNormals();
  // blob.geometry.normalsNeedUpdate = true;
  // blob.geometry.verticesNeedUpdate = true;
  blob.geometry.attributes.position.needsUpdate = true;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// Destroys geometry and rebuild it with new parameters
function updateBlob(){
  if(blob){
    scene.remove(blob);
    blob.geometry.dispose(); // Free the internal buffers
  }

  blob_geo = new THREE.SphereGeometry(config.blob.geometry.scale, config.blob.geometry.segments, config.blob.geometry.segments);
  const textureLoader = new THREE.TextureLoader();
  var surf_imp = textureLoader.load("https://assets.codepen.io/1692350/pattern6.png");//1,2,3,4,5,6
  surf_imp.wrapT = THREE.RepeatWrapping;
  surf_imp.wrapS = THREE.RepeatWrapping;
  surf_imp.repeat.set(2,2);

  blob_mat = new THREE.MeshStandardMaterial({
    color: config.blob.material.color,
    wireframe: config.blob.material.wireframe,
    flatShading: config.blob.material.flatShading,
    roughness: config.blob.material.roughness,
    metalness: config.blob.material.metalness,
    roughnessMap: surf_imp
  });

  blob = new THREE.Mesh( blob_geo, blob_mat/*cap*/ );
  scene.add(blob);
}



function updateScene(){
  camera.position.z = config.camera.z;
  
  lighting1.position.x = config.lighting1.pos.x;
  lighting1.position.y = config.lighting1.pos.y;
  lighting1.position.z = config.lighting1.pos.z;
  lighting1.color = new THREE.Color(config.lighting1.color);
  lighting1.intensity = config.lighting1.intensity;
  lighting1.distance = config.lighting1.distance;
  
  lighting2.position.x = config.lighting2.pos.x;
  lighting2.position.y = config.lighting2.pos.y;
  lighting2.position.z = config.lighting2.pos.z;
  lighting2.color = new THREE.Color(config.lighting2.color);
  lighting2.intensity = config.lighting2.intensity;
  lighting2.distance = config.lighting2.distance;
  
  ambient.intensity = config.ambient.intensity;
  ambient.color = new THREE.Color(config.ambient.color);
}



/* ========== R E N D E R I N G ========== */
function animate(timeStamp) {
  // secondsPassed = Math.min(secondsPassed, 0.1);
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  update(secondsPassed);
  composer.render();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);



/* ========== G U I ========== */
let gui = new dat.GUI();
var f0 = gui.addFolder("General");
var f1 = gui.addFolder("Blob Material");
var f2 = gui.addFolder("Blob Geometry");
var f3 = gui.addFolder("Lighting");
var f3_1 = f3.addFolder("Point Light 1");
var f3_2 = f3.addFolder("Point Light 2");
var f3_1_1 = f3_1.addFolder("Position");
var f3_2_1 = f3_2.addFolder("Position");
var f3_3 = f3.addFolder("Ambient Light");
var f4 = gui.addFolder("Noise");
var f4_1 = f4.addFolder("Velocity");
var f4_2 = f4.addFolder("Distortion");
// f0.open();
// f1.open();
// f2.open();
// f3.open();
// f3_1.open();
// f3_2.open();
// f3_3.open();
// f3_1_1.open();
// f3_2_1.open();
// f4.open();
// f4_1.open();
// f4_2.open();

f0.add(config, "useHDR").name("HDR").onChange(function(){
  if(config.useHDR){
    scene.environment = hdrEquirect;
  } else {
    scene.environment = "";
  }
});
f0.add(camera.position, "z", 3, 20).step(0.1).name("Camera Distance");
f1.add(config.blob.material, "wireframe").name("Wireframe").onChange(updateBlob);
f1.add(config.blob.material, "flatShading").name("Flat Shading").onChange(updateBlob);
f1.add(config.blob.material, "roughness", 0, 1).step(0.01).name("Roughness").onChange(function(val){
  blob.material.roughness = val;
});
f1.add(config.blob.material, "metalness", 0, 1).step(0.01).name("Metalness").onChange(function(val){
  blob.material.metalness = val;
});
f1.addColor(config.blob.material, "color").name("Color").onChange(function(val){
  blob.material.color = new THREE.Color(val);
});
f2.add(config.blob.geometry, "segments", 16, 256).step(16).name("Segments").onChange(updateBlob);
// f2.add(config.blob.geometry, "scale", 0.2, 3).step(0.01).name("Scale").onChange(updateBlob);
f3_1.addColor(config.lighting1, "color").name("Color").onChange(function(val){
  lighting1.color = new THREE.Color(val);
});
f3_2.addColor(config.lighting2, "color").name("Color").onChange(function(val){
  lighting2.color = new THREE.Color(val);
});
f3_1.add(lighting1, "intensity", 0.1, 10).step(0.1).name("Intensity");
f3_2.add(lighting2, "intensity", 0.1, 10).step(0.1).name("Intensity");
f3_1.add(lighting1, "distance", 1, 100).step(1).name("Distance");
f3_2.add(lighting2, "distance", 1, 100).step(1).name("Distance");
f3_3.addColor(config.ambient, "color").name("Color").onChange(function(val){
  ambient.color = new THREE.Color(val);
});
f3_3.add(ambient, "intensity", 0, 1).step(0.01).name("Intensity");
f3_1_1.add(lighting1.position, "x", -30, 30).step(0.1).name("X");
f3_1_1.add(lighting1.position, "z", -30, 30).step(0.1).name("Y");
f3_1_1.add(lighting1.position, "y", -30, 30).step(0.1).name("Z");
f3_2_1.add(lighting2.position, "x", -30, 30).step(0.1).name("X");
f3_2_1.add(lighting2.position, "z", -30, 30).step(0.1).name("Y");
f3_2_1.add(lighting2.position, "y", -30, 30).step(0.1).name("Z");
f4_1.add(config.noise.speed, "x", -3, 3).step(0.1).name("X");
f4_1.add(config.noise.speed, "y", -3, 3).step(0.1).name("Y");
f4_1.add(config.noise.speed, "z", -3, 3).step(0.1).name("Z");
f4_2.add(config.noise.distortion, "x", 0, 5).step(0.1).name("X");
f4_2.add(config.noise.distortion, "y", 0, 5).step(0.1).name("Y");
f4_2.add(config.noise.distortion, "z", 0, 5).step(0.1).name("Z");
f4.add(config.noise, "is_perlin").name("Perlin / Simplex");
f4.add(config.noise, "roughness", 0.1, 10).step(0.1).name("Roughness");


/* ========== E A S I N G ========== */
function easeOutQuint(t, b, c, d) {
  var res = c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  if(res >= ((b + c) / 2) && blob_is_transitioned == false){
    blob_is_transitioned = true;
    currentBlob += 1;
    if(currentBlob >= configs.length){
      currentBlob = 0;
    }
    config = configs[currentBlob];
    updateBlob();
    updateScene();
  }
  if(res >= (b + c)){
    blob_is_animated = false;
    blob_is_transitioned = false;
    timePassed = 0;
  }
  return res;
}

/*
t = 0 - Animation is just started. Zero time has passed
b = 200 - The starting position of the objects x-coordinate is 200
c = 300 - The object has to move 300 to the right, ending at 500
d = 1 - The object has one second to perform this motion from 200 to 500
*/

/*document.getElementById("animate").addEventListener("click", function(){
  blob_is_animated = true;
});*/