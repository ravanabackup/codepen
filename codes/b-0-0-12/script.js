var body, svg, particle;

var body = document.getElementsByTagName('body')[0]
var svg = document.getElementsByTagName('svg')[0]
// var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
body.appendChild(svg);

function setup () {
  width = window.innerWidth;
  height = window.innerHeight;
  svg.setAttribute('width', width );
  svg.setAttribute('height', height);
}
setup()
window.addEventListener('resize', setup)
svg.addEventListener('click', function (event) {
  // reset
  boids.boids.forEach(function(b){
    b.reset()
  })
}, true);

var rangeMin = 20
var rangeMax = 50

var boids = new Boids(svg);
for(var i = 0; i < 120; i ++){
  boids.createBoid()
}

var pt = svg.createSVGPoint();
svg.addEventListener('mousemove',function(evt){
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  pt = pt.matrixTransform(svg.getScreenCTM().inverse());
},false);

function Boids (svg) {
  this.svg = svg
  this.boids = [];
  this.play = true;
  this.canvas = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.canvas2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.canvas2.setAttribute('filter', `url('#goo')`);
  this.svg.appendChild(this.canvas2)
  this.svg.appendChild(this.canvas)
  var self = this;
  this.createBoid = function (options) {
    var boid = new Boid(options || {})
    this.boids.push(boid)
    this.canvas.appendChild(boid.view)
    this.canvas2.appendChild(boid.view2)
  }
  this.updateBoids = function (){
    this.findBoidsWithinRange()
    var centerpoint
    this.boids.forEach(function(boid){
      var x, y
      // centerpoint = boid.findCentreOfBoidsWithinRange()
      // if (centerpoint !== null) {
      //   x = centerpoint.x - boid.x
      //   y = centerpoint.y - boid.y
      //   boid.forces.push({x, y, v:0.02})
      //   // boid.move(Math.random()*5-2.5, Math.random()*5-2.5)
      // }
      
      var br = 10
      if (boid.x < br) {
        x = Math.min(br-boid.x, 7)
        y = 0;
        boid.forces.push({x, y, v:0.02})
      }
      if (boid.y < br) {
        x = 0
        y = Math.min(br-boid.y, 7)
        boid.forces.push({x, y, v:0.02})
      }
      if (boid.x > svg.clientWidth - br) {
        x = Math.max(svg.clientWidth - br-boid.x, -7)
        y = 0
        boid.forces.push({x, y, v:0.02})
      }
      if (boid.y > svg.clientHeight - br) {
        x = 0
        y = Math.max(svg.clientHeight - br-boid.x, -7)
        boid.forces.push({x, y, v:0.02})
      }
      
      boid.boidsInRange.forEach(function (b) {
        x = b.x - boid.x;
        y = b.y - boid.y;
        boid.forces.push({x, y, v:0.1})
      })
      
      boid.boidsTooClose.forEach(function (b) {
        x = boid.x - b.x;
        y = boid.y - b.y;
        boid.forces.push({x, y, v:1.5})
      })
      boid.boidsTooClose = []
      
      // follow some point
      if (pt.x && pt.y) {
        // x = Math.max(Math.min(pt.x - boid.x, 10), -10)
        // y = Math.max(Math.min(pt.y - boid.y, 10), -10)
        x = pt.x - boid.x
        y = pt.y - boid.y
        boid.forces.push({x, y, v:0.04})
      }
      
      
      boid.updatePosition()
      // boid.moveTo(centerpoint.x, centerpoint.y)
    })
  }
  this.findBoidsWithinRange = function () {
    var bi, bj, ro, ri, d, dx, dy
    for (var i = 0; i < this.boids.length; i++){
      bi = this.boids[i]
      bi.boidsInRange = []
      ro = rangeMax * rangeMax
      ri = rangeMin * rangeMin
      for (var j = 0; j < i; j++) {
        bj = this.boids[j]
        dx = bj.x - bi.x
        dy = bj.y - bi.y
        d = dx * dx + dy * dy
        if (ro >= d){
          if (ri > d){
            bi.boidsTooClose.push(bj)
            bj.boidsTooClose.push(bi)
          } else {
            bi.boidsInRange.push(bj)
            bj.boidsInRange.push(bi)
          }
        }
      }
    }
  }
  this.animate = function () {
    if (self.play) {
      window.requestAnimationFrame(self.animate);
    }
    self.updateBoids()
  }
  this.animate()
}

function Boid (options) {
  this.options = options || {}
  this.view = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.view2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.radius = 2
  this.color = 'rgba(256,188,0,1)'
  this.stroke = 'none'
  this.boidsInRange = []
  this.boidsTooClose = []
  this.forces = []
  this.x = options.x !== undefined ? options.x : svg.clientWidth * Math.random()
  this.y = options.y !== undefined ? options.y : svg.clientHeight * Math.random()
  this.hx = Math.random()* 4 - 2;
  this.hy = Math.random()* 4 - 2;
  this.hr = this.radius
  //
  this.reset = function () {
    this.x = svg.clientWidth * Math.random()
    this.y = svg.clientHeight * Math.random()
    this.hx = Math.random()* 4 - 2;
    this.hy = Math.random()* 4 - 2;
    this.hr = this.radius
  }
  
  this.draw = function () {
    this.a = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.a.setAttribute("r", this.radius);
    this.a.setAttribute('stroke', this.stroke);
    this.a.setAttribute('fill', this.color);
    
    this.view.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    
    // show range
    // this.r1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    // this.r1.setAttribute("r", rangeMax);
    // this.r1.setAttribute('stroke', 'none');
    // this.r1.setAttribute('fill', 'rgba(80,80,80,1)');
    // this.view2.appendChild(this.r1);
    
    this.r2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.r2.setAttribute("r", rangeMin);
    this.r2.setAttribute('fill', 'rgba(240,240,240,0.7)');
    this.r2.setAttribute('stroke', 'none');
    this.view2.appendChild(this.r2);
    
    this.view.appendChild(this.a)
  }
  
  this.updatePosition = function () {
    var self = this;
    var x = 0, y = 0;
    this.forces.forEach(function (f) {
      x += f.x * f.v
      y += f.y * f.v
    })
    this.forces = []
    this.move(x, y)
  }
  
  this.findCentreOfBoidsWithinRange = function () {
    if (this.boidsInRange.length === 0) {
      return null
    }
    var pt = {x:0, y:0} 
    this.boidsInRange.forEach(function(boid, i, a) {
      pt.x = pt.x + boid.x / a.length
      pt.y = pt.y + boid.y / a.length
    })
    return pt
  }
  
  this.moveTo = function (x, y) {
    var v = 0.05
    this.x = this.x * (1 - v) + x * v
    this.y = this.y * (1 - v) + y * v
    this.view.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    this.view2.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    // console.log(this.boidsInRange.length)
    this.a.setAttribute("r", this.radius + this.boidsInRange.length);
  }
  
  this.move = function (x, y) {
    this.hx = this.hx * 0.99 + x * 0.02
    this.hy = this.hy * 0.99 + y * 0.02
    var rn = Math.max(this.boidsInRange.length, 10)*0.12
    this.hr = this.hr * 0.98 + (this.radius + rn) * 0.02
    this.x += this.hx
    this.y += this.hy
    this.view.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    this.view2.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    // console.log(this.boidsInRange.length)
    this.a.setAttribute("r", this.hr);
  }
  
  this.draw()
}