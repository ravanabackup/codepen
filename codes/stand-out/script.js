const freaks = [];
const colors =[
  "#f8be0a",
  "#f45706",
  "#f4026f",
  "#8337ec",
  "#3986ff",
];
  
const freakWidth = 50;
const freakHeight = freakWidth * 2;

let freaksWide;
let freaksTall;

class Freak {
  constructor(x,y,c,f=false) {
    this.x = x;
    this.y = y;
    this.color = color(c);
    this.isFreak = f;
  }
  draw(i) {
    
    push()
    let mouse = createVector(mouseX,mouseY); 
    if((mouseX == 0 && mouseY == 0) || !this.isFreak) {
      mouse = createVector(this.x,this.y);
    }
    let freakPos = createVector(this.x, this.y);
    let newTarget = p5.Vector.sub(mouse, freakPos);
    newTarget.normalize();
    
    
    //body
    stroke(0);
    fill(this.isFreak ? this.color : color(150));
    ellipse(this.x, this.y + freakWidth, freakWidth, freakHeight);
    
    // head
    fill("white");
    ellipse(this.x,this.y,freakWidth * .5,freakHeight * .3);
    // eyes
    let xShift = newTarget.x * (freakWidth * .05);
    let yShift = newTarget.y * (freakWidth * .05);
    fill(0)
    ellipse(this.x - (freakWidth * .1) + xShift,this.y + yShift,5,5)
    ellipse(this.x + (freakWidth * .1) + xShift,this.y + yShift,5,5)
    //pupils
    xShift = newTarget.x * (freakWidth * .08);
    yShift = newTarget.y * (freakWidth * .08);
    noStroke()
    fill(255)
    ellipse(this.x - (freakWidth * .1) + xShift,this.y + yShift,3,3)
    ellipse(this.x + (freakWidth * .1) + xShift,this.y + yShift,3,3)
    pop()
  }
  
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  ellipseMode(CENTER);
  freaksWide = ceil(width / (freakWidth * .75));
  freaksTall = ceil(height / (freakHeight * .5));
  
  for(let y = -1; y <= freaksTall; y += 1) {
    for(let x = 0; x <= freaksWide; x+= 1) {
      const xWiggle = (y % 2 == 0) ? freakWidth * .25 : freakWidth * -.25;
      freaks.push(
        new Freak(
          (x*freakWidth) + xWiggle,
          y*freakHeight * .6,
          random(colors)
        )
      );
    }
  }
  let freak = getFreak()
  freak.isFreak = true;
}
function getFreak () {
  const freak = random(freaks);
  if( freak.x < freakHeight) return getFreak();
  if( freak.x > width - freakWidth) return getFreak();
  if( freak.y < freakHeight) return getFreak();
  if( freak.y > height - freakHeight) return getFreak();
  
  return freak;
}

function draw() {
  background(255);
  freaks.forEach((freak, i) => {
    freak.draw(i);
  })
}