//fractalkitty.com
function preload(){
  //reference: https://svs.gsfc.nasa.gov/vis/a000000/a003800/a003895/starmap_4k.jpg
 stars=loadImage('https://assets.codepen.io/4559259/starmap_4k.jpeg')
}
function setup(){
 cnv=createCanvas(windowWidth,windowHeight,WEBGL);
  noStroke();
  angleMode(DEGREES)
}
function draw(){
  background(0);
  ambientLight(205,255,255);
  texture(stars);
  rotateX(90);
  push()
    rotateZ(frameCount/4);
    sphere(height/4,25,25);
    sphere(height/1.2,24,24);
    sphere(height*4,24,24);
    sphere(height/10,24,24);
    sphere(height/45,24,24);
    torus(height*2,height*2-1,24,24);
  pop()
 t=frameCount/40;
  x=height*4.4*sin(t)*sin(t);
  if(x>height*2){
    x=height*7*sin(t*3)*sin(t*3)
  }
  //comment out line below and uncomment orbitcontrol to drive the camera yourself
  camera(x, 0, 0, 0, 0, 0, 0, 1, 0);
  //orbitControl(0.01,0.01,0.01);
}