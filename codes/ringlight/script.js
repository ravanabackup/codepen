function setup() {
  createCanvas(600, 600,WEBGL);
  noStroke();
  specularMaterial(0,200,250);
}

function draw() {
 t=frameCount/100;
  pointLight(50,50,50,200*sin(t),200*cos(t),200*sin(t));
  pointLight(50,50,50,-200*sin(t),-200*cos(t),200*sin(t));
  pointLight(50,50,50,-200*sin(t),200*cos(t),200*sin(t));
  pointLight(50,50,50,200*sin(t),-200*cos(t),200*sin(t));
  pointLight(50,50,50,0,0,200)
  background(0);
  orbitControl();
  torus(150,100,64,64);
}