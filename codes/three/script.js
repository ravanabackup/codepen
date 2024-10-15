var scene, 
    camera, 
    renderer, 
    geometry, 
    light;



init();

function init() {

    // S C E N E
    scene = new THREE.Scene();


    // C A M E R A
    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.0001, 1000 );
    camera.lookAt( scene.position );
    camera.position.set( 0, 0, 0 );
    scene.add( camera );


    // R E N D E R E R
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.querySelector('[data-js="stage"]').appendChild(renderer.domElement);
  
    scene.fog = new THREE.Fog(0x000000, 0.001, 60);

}






/////////////////////////////////////
// T U B E
/////////////////////////////////////

var tube;

function initTube() {
  
  var tubeLength = 2000;
  
  tube = new THREE.Mesh(
    new THREE.CylinderGeometry( 5, 5, tubeLength, 6, 500, true ),
    new THREE.MeshBasicMaterial({ 
      wireframe: true,
      wireframeLinewidth: 0.1,
      transparent: true,
      opacity: 0.3
    })
  );
  tube.position.set( 0, 0, (tubeLength/-2) );
  tube.rotation.set( Math.PI/2, 0, 0 );
  
  scene.add( tube );
  
  TweenMax.to( tube.position, 240, { z: tubeLength/2.1, repeat: -1 } );
  TweenMax.to( tube.rotation, 10, { y: Math.PI, repeat: -1, ease: Power0.easeNone } );
  
}

initTube();









/////////////////////////////////////
// R E S I Z E
/////////////////////////////////////

window.addEventListener('resize', resizeHandler);

function resizeHandler() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}




/////////////////////////////////////
// R E N D E R E R
/////////////////////////////////////

function render() {

  requestAnimationFrame(render);
  // glowHelper.visible = false;
  // cubeCamera.updateCubeMap(renderer, scene);
  // glowHelper.visible = true;
  
  renderer.render(scene, camera);

}

render();