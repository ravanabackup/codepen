var canvas = document.createElement("canvas")
var canvas2 = document.createElement("canvas")
document.getElementsByTagName("body")[0].appendChild(canvas)
var ctx = canvas.getContext("2d")
var ctx2 = canvas2.getContext("2d")
var bg = [ 39, 12, 67]
var num_particles = 62
var particles = []

var cols = ['#FF5722', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#B71C1C', '#00BCD4', '#00BCD4', '#009688']
var cols2 = ['#7b1fa2', '#4a148c', '#b71c1c', '#e91e63', '#4a148c', '#e91e63', '#4d1935', '#16082b', '#ffc107', '#ffc107']
var step = 0
setup()

window.addEventListener("resize", setup)

function getRandCol () {
  if (step > 210){
    return cols2[Math.floor(Math.random() * cols.length)]
  }
  return cols[Math.floor(Math.random() * cols.length)]
}

function setup() {
  canvas.width =  window.innerWidth
  canvas.height =  window.innerHeight
  canvas2.width = canvas.width
  canvas2.height = canvas.height
  ctx2.translate(canvas2.width/2, canvas2.height/2);
  fill(1)
  // drop old
  while(particles.length > 0) {
    particles.pop()
  }
  
  //add new
  var child = null
  while (particles.length < num_particles) {
    var x = canvas.width * 0.5 
    var y = canvas.height * 0.5 
    var p = new Particle(x, y, ctx2) 
    p.r = 2 + 2 * Math.ceil(particles.length / 2 )* 2
    p.s = 0.07 - 0.04 * Math.random()
    if (child !== null) {
      p.child = child
    }
    child = p
    particles.push(p)
  }
  
}

function fill(amt) {
  ctx2.beginPath();
  ctx2.rect(-canvas2.width/2, -canvas2.height/2, canvas2.width, canvas2.height)
  ctx2.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${amt})`
  ctx2.fill()
}

setInterval(animate, 1000 / 30)
// window.requestAnimationFrame(animate);
function animate() {
  if (step < 150) {
    fill(0.006)
  }
  draw()
  // window.requestAnimationFrame(function(){animate()})
}

function draw() {
  step = (step + 1)% 360
  
  for (var i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw()
    // change color
    if (Math.random() < 0.2) {
      particles[i].color = getRandCol()
    }
  }
  
  // resize
  var s = 1
  var s = 1.0209 - Math.cos(step / 360 * Math.PI *2) *0.005
  // set registration point
  // ctx2.rotate(0.0005)
  ctx2.rotate(Math.sin(step / 360 * Math.PI * 2)*0.002)
  ctx2.drawImage(canvas2, -s/2 * canvas2.width, -s/2 * canvas2.height, s * canvas2.width, s * canvas2.height)
  // add second canvas
  ctx.drawImage(canvas2, 0, 0)
  
  /*
  ctx2.lineWidth = 8
  ctx2.beginPath()
  ctx2.lineCap = "round"
  ctx2.moveTo(particles[0].x, particles[0].y)
  for (var i = 1; i < particles.length; i++) { 
    if(particles[i].x !== null){
      ctx2.strokeStyle = "rgba(0, 0, 0, 0.01)"
      ctx2.lineTo(particles[i].x, particles[i].y)
    }
  }
  ctx2.stroke()
  */
}

function Particle (x, y, ctx) {
  this.cx = x
  this.cy = y
  this.x = null
  this.y = null
  this.px = null
  this.py = null
  this.r = 120
  this.phase = Math.random()
  this.s = 0.07
  this.ctx = ctx
  this.color = getRandCol() //"#ee9977"
  this.child = null
  
  this.calculatePosition = function () {
    this.px = this.x
    this.py = this.y
    this.x = this.r * Math.cos(this.phase) //+ this.cx
    this.y = this.r * Math.sin(this.phase) //+ this.cy
  }
  
  this.update = function () {
    this.phase += this.s
    this.phase %= Math.PI * 2
    this.calculatePosition()
  }
  
  this.draw = function () {
    if (this.px !== null) {
      var v = Math.min(this.vsq(), 10)
      ctx.lineWidth = 2
      ctx.beginPath()

      ctx.moveTo(this.px, this.py)
      ctx.strokeStyle = getRandCol() //"#000000"
      ctx.strokeStyle = this.color
      ctx.lineTo(this.x, this.y)
      ctx.lineCap = "round"
      ctx.stroke()
      
      
      // ctx.fillStyle = this.color
      // ctx.arc(this.x, this.y, 6, 0, Math.PI*2)
      // ctx.fill()
    }
  }
  
  this.vsq = function() {
    var x = this.px - this.x
    var y = this.py - this.y
    return x * x + y * y
  }
}