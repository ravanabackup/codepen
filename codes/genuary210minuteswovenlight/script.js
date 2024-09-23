//genuary2023 - day2 - 10minutes to form
let a = []
let t = 0
let nA = 10000
let tm
function setup(){
  cnv = createCanvas(500,500)
  background(0);
  angleMode(DEGREES);
  strokeWeight(0.2)
  noStroke()
  for(let i = 0;i<nA;i++){
    a.push(new beings())
  }
  c1 = color(0,0,0)
  c1.setAlpha( 2);
  t1 = hour()
  t2 = minute()
  t3 = second()
  if (t1===23||t1===11){
    tm = -1
  }else{
    tm = 0
  }
  secInDay = (t1+tm)*60*60+t2*60+t3
  angleMode(DEGREES)
  console.log(hour(),minute(),second(),secInDay)
  noStroke()
}
function draw(){
  translate(width/2,height/2);
  t = frameCount
  secInDay2 = (hour()+tm)*60*60+minute()*60+second()
  for(let i = 0;i<nA;i++){
    a[i].display()
  }
  
  if(secInDay2 >= secInDay+600){
    console.log(hour(),minute(),second())
    save(cnv,"rendered.png")
    noLoop()
    
  } 
}

class beings{
  constructor(){
    this.x = randomGaussian(0, width);
    this.y = randomGaussian(0, height);
    this.r = sqrt(this.x*this.x + this.y*this.y);
    this.d = 0.5//this.r*cos(this.x*this.y)/100

  }
  display(){
    c1 = color(255*sin(t/10+this.y)*sin(t/20+this.x))
  c1.setAlpha( 200*sin(t+this.x*this.r)*sin(t+this.x*this.y));
    fill(c1)
    push()
    rotate(t/10+this.x)
    circle(this.x - this.r*cos(t/50),this.y- this.r*sin(t/50),this.d*cos(t/500))
    pop()
  }
}