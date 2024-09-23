let t
let illusion = 1;
let nIllusion = 17;
function setup() {
  createCanvas(600, 600);
  background(50);
}
function draw() {
  t = frameCount/1000
  
  illusionPicker(illusion)
}
function mousePressed(){
  if(illusion<nIllusion){
    illusion++
  }else{
    illusion=1
  }
}

function illusionPicker(n) {
  //Ouchi Illusion
  if (n === 1) {
    //ouchi(); //masking is too blury with create graphics
    ouchi2();
  }
  if (n===2){
    cafeWall()
  }
  if (n===3){
    pinna()
  }
  if (n===4){
    herman()
  }
  if(n===5){
    kanizsaTriangle()
  }
  if(n===6){
    ehrenstein()
  }
  if(n===7){
    squares()
  }
  if(n===8){
    hering()
  }
  if(n===9){
    mullerLyer()
  }
  if(n===10){
    ponzo()
  }
  if(n===11){
    fraser()
  }
  if(n===12){
    poggendorff()
  }
  if(n===13){
    originalEhrenstein()
  }
  if(n===14){
    orbison()
  }
  if(n===15){
    contrast()
  }
  if(n===16){
    twistedCord()
  }
  if(n===17){
    periphrealDrift()
  }
  
}
function ouchi2() {
  p = 30;
  c = 5;
  d = floor(width / p);
  noStroke();
 
  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      if (
        (j % d < floor(d / 2) && i % (d * 2) < floor(d)) ||
        (j % d > floor(d / 2) && i % (d * 2) > floor(d))
      ) {
        fill(255);
      } else {
        fill(0);
      }

      rect(i, j, 1, 1);
    }
  }

  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      if (
        (i % d < floor(d / 2) && j % (d * 2) < floor(d)) ||
        (i % d > floor(d / 2) && j % (d * 2) > floor(d))
      ) {
        fill(255);
      } else {
        fill(0);
      }
      if (dist(i, j, width / 2, height / 2) >= 120) {
        rect(i, j, 1, 1);
      }
    }
  }
}
function cafeWall() {
  background(0)
  let n1 = 25;
  stroke(0);
  for (let i = 0; i < n1; i++) {
    push();
    translate(n1 * sin(i), (i * width) / n1);
    rowDraw();
    pop();
  }
  function rowDraw() {
    for (i = 0; i < n1; i++) {
      if (i % 2 === 0) {
        fill(0);
      } else {
        fill(255);
      }
      rect((i * width) / n1, 0, width / n1, width / n1);
    }
  }
}
function pinna(){
  push()
    translate(width/2, height/2)
    background(180)
    noFill()
    strokeWeight(2.5)
    for(let i=0;i<10;i++){
      let r = (i*31)//make sure multiplier is odd
        let n1=floor(r/2)
      if(n1%2===1){
      n1=n1+1;
    }
    if (r%2===0){
       c=-1
    }else{c=1}
    for(let i=0;i<n1;i++){
        if(i%2==0){
          stroke(255)
        }else{
          stroke(0)
        }
        push()
        rotate(PI/15*c)
        rect(r*sin(TWO_PI/n1*i),r*cos(TWO_PI/n1*i),7,7)
        pop()
      }

  }
  pop()
}
function herman(){
  push()
  background(255)
  fill(0)
  d = width/20
  for(let i=0;i<12;i++){
    for(let j=0;j<12;j++){
      rect(width/9+i*(d+10),width/9+j*(d+10),d,d)
    }
  }
  pop()
}
function kanizsaTriangle(){
  push()
  background(255)
  let r = 200;
   translate(width/2,height/2)
    strokeWeight(3)
    stroke(0);
    noFill();
    push()
    rotate(PI/6)
    beginShape();
  for (let a = 0; a < TWO_PI; a += TWO_PI / 3) {
    vertex(cos(a) * r, sin(a) * r);
  }
  endShape(CLOSE);
    pop()
    noStroke()
    fill(0)
    circle(r*cos(-5*PI/6),r*sin(-5*PI/6),r/2)
    circle(r*cos(-PI/6),r*sin(-PI/6),r/2)
    circle(r*cos(3*PI/6),r*sin(3*PI/6),r/2)
    fill(255);
    push()
    rotate(-PI/6)
    beginShape();
  for (let a = 0; a < TWO_PI; a += TWO_PI / 3) {
    vertex(cos(a) * r, sin(a) * r);
  }
  endShape(CLOSE);
    pop()
pop()
}
function ehrenstein(){
  push()
  background(255)
  noFill()
   translate(width/2,height/2)//center at origin
  circleSet()//draw circles
   strokeWeight(3)
  rect(-width/4,-width/4,width/2,width/2)//draw square
  
function circleSet(){
  strokeWeight(1)
  for (let i=0;i<20;i++){
    circle(0,0,20+i*20)
  }
 
}
   pop()
}//also an orbison variation
function squares(){
  push()
  background(255);
  let n1 = 21
  let t = 0;
  for (let i = 0; i < n1; i++) {
    for (let j = 0; j < n1; j++) {
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
        c = 255;//color based on even/odd
      } else {
        c = 0;
      }
      fill(255-c)
      rectMode(CORNER);//background rectangles drawn from corners
      w =width / n1;
      x=i * w
      y=j * w
      rect(x, y, w);//background rectangles
      fill(c);
      rectMode(RADIUS);//small rectangles drawn in radius mode
      if ((i > 2) & (j > 2) && i < n1 - 3 && j < n1 - 3 ) {
        if (i < n1 / 2&&i!=floor(n1/2)) {
          rect(x + w/2 + (n1 / 3) * sin( 45),y + w/2 + (n1 / 3) * cos(45),w / 7);
          rect(x + w/2 + (n1 / 3) * sin( 225),y + w/2 + (n1 / 3) * cos(225),w / 7);
        }else if(i===floor(n1/2)){
          if(j>floor(n1/2)){
            rect(x + w/4,y + w/4,w/7);
            rect((i+1) * w - w/4, j*w + w/4,w/7);
          }else{
            rect(x + w/4,(j+1)*w - w/4,w / 7);
            rect((i+1) * w - w/4,(j+1)*w - w/4,w/7);
          }    
                 } 
        else {
          rect(x + w/2 + (n1 / 3) * sin(45),y + w/2 + (n1/3) * cos(45),w/7);
          rect(x + w/2 + (n1 / 3) * sin(225),y +w/2 +(n1/3) * cos(225),w/7);
        }
      }
    }
  }
  pop()
}
function hering(){
  push()
  translate(width/2,height/2)
  background(255)
  let n1 = 30
  let r = width/2
  for(let i=0;i<n1;i++){ 
   if(i>2&&i<n1-2) line(r*sin(PI/n1*i),r*cos(PI/n1*i),r*sin(PI/n1*i+PI),r*cos(PI/n1*i+PI));//Activity: Try to rewrite this code using slope instead of a rotation
  }
  strokeWeight(2)
  stroke(200,0,0)
  line(-width/6,-400,-width/6,400)
  line(width/6,-400,width/6,400)
  pop()
}
function mullerLyer(){
  background(255);
  push()
  translate(width/2,height/2);
  strokeWeight(10);
  stroke(0)
  line(-100,-100, 100, -100)
  line(100,-100,100+100*sqrt(2)/4,-100-100*sqrt(2)/4)
  line(100,-100,100+100*sqrt(2)/4,-100+100*sqrt(2)/4)
  line(-100,-100,-100-100*sqrt(2)/4,-100*sqrt(2)/2)
  line(-100,-100,-100-100*sqrt(2)/4,-100-100*sqrt(2)/4)
  
  
  line(-100,100, 100, 100)
  line(100,100,100*sqrt(2)/2,100*sqrt(2)/2)
  line(100,100,100*sqrt(2)/2,100+100*sqrt(2)/4)
  line(-100,100,-100+100*sqrt(2)/4,100*sqrt(2)/2)
  line(-100,100,-100+100*sqrt(2)/4,100+100*sqrt(2)/4)
  pop()
}
function ponzo(){
  push()
  translate(width/2,height/2);
  strokeWeight(5);
  background(255)
  stroke(200,0,0)
  line(-100,-160, 100, -160)
  line(-100,160, 100, 160)
  stroke(0)
  line(-10,-height/2,-240,height/2)
  line(10,-height/2,240,height/2)
  m = height/180;
  for(let i = 0;i<20;i++){
    line(-m*(i*i),-height/2+5*i*i-20,m*(i*i),-height/2+5*i*i-20)
  }
  pop()
}
function fraser(){
  background(155);
  push()
  translate(width/2,height/2)
  d = 100;
  let n1=20
  noFill()
  for(let j = 0;j<20;j+=1){
  d = j*j;
  strokeWeight(j*4)
    n1 = 20+j*3
  for(let i = 0;i<n1;i++){
    if(i%2!=0){
      stroke(0,0,0,100)
    }else{
      stroke(255,255,255,100)
    }
    arc(d*sin(PI/(n1/2)*i),d*cos(PI/(n1/2)*i),d,d,PI/4+PI/10-TWO_PI/n1*i,PI/2-TWO_PI/n1*i)
    
  }
  }
  
  for(let j = 0;j<20;j+=1){
  d = j*j;
  strokeWeight(j)
    n1 = 20+j*2
  for(let i = 0;i<n1;i++){
    if(i%2===0){
      stroke(0)
    }else{
      stroke(255)
    }
    arc(d*sin(PI/(n1/2)*i),d*cos(PI/(n1/2)*i),d,d,PI/4+PI/10-TWO_PI/n1*i,PI/2-TWO_PI/n1*i)
    
  }
  }

  pop()
}
function poggendorff(){
  background(255)
  push()
  strokeWeight(2)
  let n1 = 8;
  
  for(let i = 1;i<n1;i++){
    push()
    translate(width/n1*(i),height/2)
    stroke(0)
    push()
    rotate(PI/2+PI/n1*i)
    line(-2*width/(3*n1),0,2*width/(3*n1),0)
    pop()
    fill(68,192, 225)
    noStroke()
    rect(-width/(3*n1)/3,-2*width/(3*n1),width/(3*n1)/1.5,4*width/(3*n1))
    pop()
  }
  pop()
}
function originalEhrenstein(){
  background(255)
  let n1=8
  let d = width/n1*0.8;
  let d2 = width/n1
  strokeWeight(2)
  stroke(0)
  for(let i = 0;i<n1+1;i++){
    for(let j = 0;j<n1+1;j++){
      push()
        translate(i*d2,j*d2);
        line(0,-d/2,0,d/2);
        line(-d/2,0,d/2,0);
        line(d2/2,-d/2+d2/2,d2/2,d/2+d2/2)
      line(-d/2+d2/2,d2/2,d/2+d2/2,d2/2)
      pop()
    }
  }
}
function orbison(){
  background(255)
  push()
  stroke(50,100,150)
  strokeWeight(2)
  let n1 = 30;
  let d = width/n1
  for(let i = -n1;i<n1;i++){
    line(i*d,0,i*d+width,width/2);
    line(i*d,height,i*d+width,width/2);
  }
  push()
  translate(width/2,height/2)
  noFill()
  strokeWeight(3)
  rectMode(CENTER)
  rotate(PI/4)
  stroke(200,0,0)
  rect(0,0,150,150)
  pop()
  pop()
}
function contrast(){
  background(255)
  push()
  translate(40,0)
  push()
  translate(width/4,height/2)
  fill(40)
  circle(0,0,50)
  for(let i = 0;i<6;i++){
    push()
    rotate(PI/3*i);
    fill(70,90,100)
    translate(100,0)
    circle(0,0,90)
    pop()
  }
  pop()
  push()
  translate(3*width/4,height/2)
  fill(40)
  circle(0,0,50)
  for(let i = 0;i<8;i++){
    push()
    rotate(PI/4*i);
    fill(70,90,100)
    translate(50,0)
    circle(0,0,30)
    pop()
  }
  pop()
  pop()
}
function twistedCord(){
  background(255)
  noStroke()
  let n1 = 13;
  let d1 = width/n1
  for(let i = 0;i<n1;i++){
    for(let j = 0;j<n1;j++){
      if((i%2 ===0 && j%2===0)||(i%2===1 && j%2===1)){
        fill(100)
      }else{
        fill(255)
      }
      rect(i*d1,j*d1,d1,d1)
    }
  }
  d2 = width/(n1*6)
  for(let k = 1;k<n1;k++){
  for(let i = 0;i<2;i++){
    for(let j = 0;j<2;j++){
      if((i%2 ===0 && j%2===0)||(i%2===1 && j%2===1)){
        fill(0 )
      }else{
        fill(255)
      }
      push()
      translate(k*d1,k*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      
      if(k<n1-2){
      push()
      translate((k+2)*d1,k*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      
      if(k<n1-5){
        push()
        translate((k+5)*d1,k*d1-d1/8)
        rectMode(CENTER)
        rotate(PI/4)
        rect(i*d2,j*d2,d2,d2)
        pop()
      }
      if(k<n1-7){
        push()
        translate((k+7)*d1,k*d1-d1/8)
        rectMode(CENTER)
        rotate(PI/4)
        rect(i*d2,j*d2,d2,d2)
        pop()
      }
    if(k<n1-8){
        push()
        translate((k+8)*d1,k*d1-d1/8)
        rectMode(CENTER)
        rotate(PI/4)
        rect(i*d2,j*d2,d2,d2)
        pop()
      }
      if(k<n1-10){
        push()
        translate((k+10)*d1,k*d1-d1/8)
        rectMode(CENTER)
        rotate(PI/4)
        rect(i*d2,j*d2,d2,d2)
        pop()
      }
      if(k<n1-1){
      push()
      translate(k*d1,(k+1)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      if(k<n1-3){
      push()
      translate(k*d1,(k+3)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      if(k<n1-6){
      push()
      translate(k*d1,(k+6)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      if(k<n1-8){
      push()
      translate(k*d1,(k+8)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      if(k<n1-11){
      push()
      translate(k*d1,(k+11)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      
    }
    
  }
  }
  for(let k = 1;k<n1-1;k++){
  for(let i = 0;i<2;i++){
    for(let j = 0;j<2;j++){
      if((i%2 ===0 && j%2===0)||(i%2===1 && j%2===1)){
        fill(255 )
      }else{
        fill(0)
      }
      push()
      translate((k+1)*d1,k*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      if(k<n1-3){
        push()
        translate((k+3)*d1,k*d1-d1/8)
        rectMode(CENTER)
        rotate(PI/4)
        rect(i*d2,j*d2,d2,d2)
        pop()
      }
      if(k<n1-4){
        push()
        translate((k+4)*d1,k*d1-d1/8)
        rectMode(CENTER)
        rotate(PI/4)
        rect(i*d2,j*d2,d2,d2)
        pop()
      }
      if(k<n1-6){
        push()
        translate((k+6)*d1,k*d1-d1/8)
        rectMode(CENTER)
        rotate(PI/4)
        rect(i*d2,j*d2,d2,d2)
        pop()
      }
      if(k<n1-9){
        push()
        translate((k+9)*d1,k*d1-d1/8)
        rectMode(CENTER)
        rotate(PI/4)
        rect(i*d2,j*d2,d2,d2)
        pop()
      }
      if(k<n1-11){
        push()
        translate((k+11)*d1,k*d1-d1/8)
        rectMode(CENTER)
        rotate(PI/4)
        rect(i*d2,j*d2,d2,d2)
        pop()
      }
      if(k<n1-2){
      push()
      translate(k*d1,(k+2)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      if(k<n1-4){
      push()
      translate(k*d1,(k+4)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      if(k<n1-5){
      push()
      translate(k*d1,(k+5)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      if(k<n1-7){
      push()
      translate(k*d1,(k+7)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      if(k<n1-9){
      push()
      translate(k*d1,(k+9)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
      if(k<n1-10){
      push()
      translate(k*d1,(k+10)*d1-d1/8)
      rectMode(CENTER)
      rotate(PI/4)
      rect(i*d2,j*d2,d2,d2)
      pop()
      }
    }
  }
  }
  
  
}
function periphrealDrift(){
  background(255)
  push()
  translate(width/2,height/2)
  rectMode(CENTER)
  noStroke()
  p = 245
  q = 3
  let c1 = color(150,220,150);
  let c2 = color(150,150,250);
  for(let i = 0;i<q;i++){
    for(let j = 0;j<q;j++){
      push()
        translate(-p+i*p,-p+j*p)
        circ()
      pop()
      
    }
  }
  for(let i = -1;i<q;i++){
    for(let j = -1;j<q;j++){
      
      push()
        translate(-p/2+i*p,-p/2+j*p)
        circ()
      pop()
    }
  }
  
  
  
  function circ(){
    let d = 20
  let n1 = 20
  let r = 80
  
    for(let j = 1;j<10;j++){
    r = 65 - j*6.3 -sqrt(j*8)
    fill(255)
    circle(0,0,r*4.4) 
    d = 20-j*1.5
    
  for(let i =0;i<n1;i++){
    push()
    rotate(i*TWO_PI/n1+j*1.1618033)
    translate(0,r*2)
    fill(0)
    rect(0,0,d/2,d)
    fill(c1)
    ellipse(d/3,0,d/3,d)
    fill(c2)
    ellipse(-d/3,0,d/3,d)
    pop()
  }
  }
  }
  pop()
}




















//not used /blurry
function ouchi() {
  let patternImage = createGraphics(width, height);
  let img = createImage(width, height);
  let p = 50;
  for (let i = 0; i < p; i++) {
    for (j = 0; j < p / 2; j++) {
      if ((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
        patternImage.fill(0);
      } else {
        patternImage.fill(255);
      }
      patternImage.rect(
        (i * width) / p,
        (j * width) / (p / 2),
        width / p,
        width / (p / 2)
      );
    }
  }
  image(patternImage, 0, 0);

  let patternImage2 = createGraphics(width, height);
  patternImage2.pixelDensity(5);
  for (let i = 0; i < p / 2; i++) {
    for (j = 0; j < p; j++) {
      if ((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
        patternImage2.fill(0);
      } else {
        patternImage2.fill(255);
      }
      patternImage2.rect(
        (i * width) / (p / 2),
        (j * width) / p,
        width / (p / 2),
        width / p
      );
    }
  }
  //image(patternImage2, 0, 0);
  let mk = createGraphics(width, height);
  mk.circle(width / 2, height / 2, width/2);

  (imgClone = patternImage2.get()).mask(mk.get());
  //patternImage2.mask(mk)

  image(imgClone, 0, 0);
}