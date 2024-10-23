let container;
let camera, scene, renderer;
let uniforms;

function init() {
  container = document.getElementById( 'container' );

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

  var colours = [];
  colours.push([138, 79, 125]);
  colours.push([136, 120, 128]);
  colours.push([136, 160, 150]);
  colours.push([187, 171, 139]);
  colours.push([239, 130, 117]);
  for(var i = 0; i < colours.length; i++) {
    var c = colours[i];
    colours[i] = new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255);
  }
  window.colours = colours;
  
  uniforms = {
    u_time: { type: "f", value: 100000.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_colours: { type: "v3v", value: colours }
  };

  var material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  } );

  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );

  container.appendChild( renderer.domElement );

  onWindowResize();
  window.addEventListener( 'resize', onWindowResize, false );

  document.onmousemove = function(e){
    uniforms.u_mouse.value.x = e.pageX
    uniforms.u_mouse.value.y = e.pageY
  }
}

function onWindowResize( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  // console.log(uniforms.u_colours);
  requestAnimationFrame( animate );
  render();
}

function render() {
  uniforms.u_time.value += 0.05;
  renderer.render( scene, camera );
}



init();
animate();