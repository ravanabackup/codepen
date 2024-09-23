// multiple passes
// brings deeper understanding
// radial - days - nights

let img1, img2;
let a, b, c, d;

let stars = []

function preload() {
  img1 = loadImage("https://assets.codepen.io/4559259/radial.jpg");

  img2 = loadImage("https://assets.codepen.io/4559259/star.png");
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  imageMode(CENTER);
  nStars = int(random(2000,2000))
  for (let i = 0;i<nStars;i++){
    stars[i] = {
      r : random(0,width),
      a : random(0,360),
      s : randomGaussian(2,5)
    }
  }
}

function draw() {
  translate(width / 2, height / 2);
  push();
  image(img1, 0, 0, 600, 600);
  image(img2, 0, 0, 200, 200);
  n = 1
  for(let i = 0;i<n;i++){
 radial(360*abs(sin(40*n*i+frameCount/20)))
  }
}
function radial(t1){
  
  c = 20 ;
  stroke(255,255,255,30)
  line(0,0,width*cos(t1),width*sin(t1))
  for(let i = 0;i<nStars;i++){
   if((t1-stars[i].a) >=0 && t1-(stars[i].a) <=c ){
     image(img2,stars[i].r*cos(stars[i].a),stars[i].r*sin(stars[i].a),c+stars[i].s-(t1-stars[i].a),c+stars[i].s-(t1-stars[i].a))
   }else{image(img2,stars[i].r*cos(stars[i].a),stars[i].r*sin(stars[i].a),stars[i].s,stars[i].s)}
      
  }
}