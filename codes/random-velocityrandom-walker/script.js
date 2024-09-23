let walkers = [];
function setup () {
  const size = min(windowWidth, windowHeight) * 0.9;
  createCanvas(size, size);
  walkers.push(new Walker());
  noStroke();
  draw();
}
function windowResized () {
  const size = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(size, size);
  clear();
}
function mouseClicked () {
  const x = mouseX;
  const y = mouseY;
  walkers.push(new Walker(x, y));
}

class Walker {
  constructor (x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.velocityX = 0;
    this.velocityY = 0;
    this.draw();
  }
  isOut () {
    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }
  velocity () {
    this.velocityX += random(-0.25, 0.25);
    this.velocityY += random(-0.25, 0.25);
  }
  move () {  
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  draw () {
    fill('rgba(0, 0, 0, 0.2)');
    circle(this.x, this.y, 10, 10);
  }
}

function draw () {
  walkers.forEach(walker => {
    if (!walker.isOut()) {
      walker.velocity();
      walker.move();
      walker.draw();
    }
  });
}