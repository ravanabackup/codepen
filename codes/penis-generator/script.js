console.clear();

const colors = ['#f7d7c5', '#d8af92', '#8e562e', '#603c2f', '#47291f'];
let penis;
const Options = function () {
  this.Length = 0.65;
  this.BallsSize = 0.6;
  this.Thickness = 0.7;
  this.Circumcised = Math.random() > 0.5;
  this.Color = colors[Math.floor(Math.random() * colors.length)];
};
const gui = new dat.GUI({name: 'My GUI'});
let options;

function setup () {
  const size = floor(min(windowWidth, windowHeight) * 0.95);
  createCanvas(size, size);
  
  /* DAT GUI */
  options = new Options();
  gui.add(options, 'Length', 0, 1).onFinishChange(() => penis.update());
  gui.add(options, 'BallsSize', 0, 1).onFinishChange(() => penis.update());
  gui.add(options, 'Thickness', 0, 1).onFinishChange(() => penis.update());
  gui.add(options, 'Circumcised').onFinishChange(() => penis.update());
  gui.addColor(options, 'Color').onFinishChange(() => penis.update());
  
  penis = new Penis();
}

function windowResized () {
  const size = floor(min(windowWidth, windowHeight) * 0.95);
  resizeCanvas(size, size);
  penis.update();
}

class Penis {
  constructor () {
    this.x = 0;
    this.y = 0;
    
    this.circumcised = options.Circumcised;
    this.length = width * ((options.Length * 0.5) + 0.12);
    this.thickness = width * ((options.Thickness * 0.1) + 0.1);
    this.ballSize = width * ((options.BallsSize * 0.12) + 0.18);
    const color = gsap.utils.splitColor(options.Color);
    this.r = color[0];
    this.g = color[1];
    this.b = color[2];
  }
  
  update () {
    const color = gsap.utils.splitColor(options.Color);
    this.circumcised = options.Circumcised;
    gsap.timeline().to(this, {
      r: color[0],
      g: color[1],
      b: color[2],
      duration: 0.6,
      ease: 'power1.inOut'
    }, 0).to(this, {
      length: width * ((options.Length * 0.5) + 0.12),
      ease: 'elastic.out(1.3, 0.4)',
      duration: 2
    }, 0).to(this, {
      ballSize: width * ((options.BallsSize * 0.12) + 0.18),
      ease: 'power2.out',
      duration: 0.3
    }, 0).to(this, {
      thickness: width * ((options.Thickness * 0.11) + 0.1),
      ease: 'power2.out',
      duration: 0.3
    }, 0);
  }
  
  draw () {
    translate(0, width * 0.1);
    fill(this.r, this.g, this.b);
    noStroke();
    // Left ball
    circle((width * 0.49 - (this.ballSize * 0.3)), (width * 0.7), this.ballSize);
    // Middle ball, what?
    circle((width * 0.5), (width * 0.7), this.ballSize * 0.82);
    // Right ball
    circle((width * 0.51 + (this.ballSize * 0.3)), (width * 0.7), this.ballSize);
    // Spongius
    rect((width * 0.5) - this.thickness / 2, (width * 0.7) - this.length, this.thickness, this.length);
    // Glans
    circle((width * 0.5), (width * 0.7) - this.length, this.thickness * 1.1);
    if (this.circumcised) {
      // Urethra
      stroke(255);
      strokeWeight(2);
      line((width * 0.5), (width * 0.7) - this.length - (width * 0.12), (width * 0.5), (width * 0.7) - this.length - (width * 0.05))
    } else {
      // Uncircumcised
      triangle(
        (width * 0.5) - this.thickness / 2, (width * 0.7) - this.length,
        (width * 0.5) + this.thickness / 2, (width * 0.7) - this.length,
        (width * 0.5), (width * 0.7) - this.length - this.thickness);
      fill(255);
      ellipse((width * 0.5), (width * 0.7) - this.length - this.thickness, this.thickness, this.thickness * 0.7);
    }
  }
}

function draw () {
  clear();
  penis.draw();
}