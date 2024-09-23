var ww = window.innerWidth,
    wh = window.innerHeight;

var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
  antialias : true
});
renderer.setClearColor(0x000000);
renderer.setSize(ww, wh);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(50, ww / wh, 1, 5000);
camera.position.set(0, 0, 130);
TweenMax.to(camera.rotation, 12,{
  z: Math.PI*2,
  ease:Elastic.easeInOut.config(0.8, 0.5),
  yoyo:true,
  repeat:-1
});

function Curve(index){
  this.index = index;
  this.radius = index*70;
  this.oRadius = index*70;
  this.offsetX = 0;
  this.offsetY = 0;
  this.color = new THREE.Color("hsl("+180+",50%,"+Math.round((1-this.index)*90)+"%)");
  this.rotation = Math.random()*Math.PI;
  this.oRotation = Math.random()*Math.PI;
  var points = [];
  this.detail = 100;

  this.buffergeometry = new THREE.BufferGeometry();
  this.position = new THREE.Float32BufferAttribute( this.detail * 3 +3, 3 );
  this.buffergeometry.addAttribute( 'position', this.position );

  this.material = new THREE.ShaderMaterial({
    uniforms: {
        color: {
          value: this.color
        }
    },
    vertexShader: document.getElementById("wrapVertexShader").textContent,
    fragmentShader: document.getElementById("wrapFragmentShader").textContent
  });
  this.mesh = new THREE.Line( this.buffergeometry, this.material );
  scene.add(this.mesh)
}

Curve.prototype.update = function(a){
    var array = this.buffergeometry.attributes.position.array;
    for(var i=0;i<array.length;i+=3){
      var vector = new THREE.Vector3(array[i],array[i+1],array[i+2]);
      vector.x = Math.cos((i/3)/this.detail * Math.PI*2)*this.radius + this.offsetX;
      vector.y = Math.sin((i/3)/this.detail * Math.PI*2)*this.radius + this.offsetY;
      vector.z = noise.simplex2( array[i]*0.01,array[i+1]*0.01+a*0.0005)*10;
      vector.applyMatrix4( new THREE.Matrix4().makeRotationY(this.rotation + a*0.0003));
      vector.applyMatrix4( new THREE.Matrix4().makeRotationX(this.rotation + a*0.0003));
      array[i] = vector.x;
      array[i+1] = vector.y;
      array[i+2] = vector.z;
    }
    this.buffergeometry.attributes.position.needsUpdate = true;
    this.material.uniforms.color.value.offsetHSL( 0.0005, 0, 0 );
}

var total = 150;
var curves = [];
for(var i=0;i<total;i++){
  curves.push(new Curve(i/total));
}

var mouse = new THREE.Vector2(0,0);
window.addEventListener("mousedown", onDown);
window.addEventListener("touchdown", onDown);
window.addEventListener("mouseup", onUp);
window.addEventListener("touchleave", onUp);
function onDown(){
  for(var i=0;i<total;i++){
    TweenMax.to(curves[i],1, {
      rotation:0,
      ease: Power2.easeOut
    });
  }
}
function onUp(){
   for(var i=0;i<total;i++){
    TweenMax.to(curves[i], 2, {
      rotation:curves[i].oRotation,
      ease: Back.easeOut
    });
  }
}
window.addEventListener("mousemove", function(e) {
  mouse.x = (e.clientX - ww*0.5)/(ww*0.5);
  mouse.y = (wh*0.5 - e.clientY)/(wh*0.5);
  updateOffsets();
});
window.addEventListener("touchmove", function(e) {
  e.preventDefault();
  mouse.x = (e.touches[0].clientX - ww*0.5)/(ww*0.5);
  mouse.y = (wh*0.5 - e.touches[0].clientY)/(wh*0.5);
  updateOffsets();
});
function updateOffsets(){
  for(var i=0;i<total;i++){
    TweenMax.to(curves[i], 1, {
      offsetX:mouse.x*20,
      offsetY:mouse.y*20,
      ease: Power3.easeOut
    });
  }
}

window.addEventListener("resize", function() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, wh);
});

function render(a) {
  requestAnimationFrame(render);
  
  for(var i=0;i<total;i++){
    curves[i].update(a);
  }

  renderer.render(scene, camera);
}

requestAnimationFrame(render);