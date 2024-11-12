var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
w = ctx.canvas.width = 300;
h = ctx.canvas.height = 300;
ctx.globalCompositeOperation = "lighter";

noise.seed();
var ntc = Math.random();
var nte = Math.random();
var gui = true;

var conf = {
  hueStart: 230,
  hueRange: 20,
  sat: 100,
  count: 2500,
  smooth: 250,
  lineWidth: 0.07,
  noiseSpeed: 0.004,
  cap: "round"
}

if(gui){
  var gui = new dat.GUI();
  gui.add(conf, "count", 10, 5000).step(1).name("Line Count").onChange(reset);
  gui.add(conf, "hueStart", 0, 360).step(1).name("Color");
  gui.add(conf, "hueRange", 0, 100).step(1).name("Color Range").onChange(reset);
  gui.add(conf, "sat", 0, 100).step(1).name("Saturation");
  gui.add(conf, "lineWidth", 0.01, 1).name("Line Width");
  gui.add(conf, "smooth", 5, 500).step(1).name("Smoothing");
  gui.add(conf, "noiseSpeed", 0.000, 0.1).name("Noise Speed");
}

class Line{
  constructor(){
    var sx = w/2;
    var sy = h/2;
    var cx = Math.random()*1000-500;
    var cy = Math.random()*1000-500;
    var ex = Math.random()*1000-500;
    var ey = Math.random()*1000-500;
    this.sp = new Vector(sx, sy);
    this.cp = new Vector(cx, cy);
    this.ep = new Vector(ex, ey);
    this.hue = Math.random()*(conf.hueRange*2)-conf.hueRange;
  }

  move(i) {
    this.cp.x = (w/2) + (noise.simplex3(this.cp.y/2000, i/conf.smooth, ntc)*100);
    this.cp.y = (h/2) + (noise.simplex3(this.cp.x/200, i/conf.smooth, ntc)*100);
    this.ep.x = (w/2) + (noise.simplex3(this.ep.y/2000, i/conf.smooth, nte)*100);
    this.ep.y = (h/2) + (noise.simplex3(this.ep.x/200, i/conf.smooth, nte)*100);
  }

  draw() {
    ctx.beginPath();
    ctx.lineCap = conf.cap;
    ctx.lineWidth = conf.lineWidth;
    ctx.strokeStyle = "hsl("+(conf.hueStart+this.hue)+", "+conf.sat+"%, 50%)";
    ctx.moveTo(w/2, h/2);
    ctx.quadraticCurveTo(this.cp.x, this.cp.y, this.ep.x, this.ep.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function render(){
  requestAnimationFrame(render);
  ctx.clearRect(0,0,w,h);
  ntc += conf.noiseSpeed;
  nte += conf.noiseSpeed;
  if(!gui)
    conf.hueStart += 0.1;
  lines.forEach((l, i) => {
    l.move(i);
    l.draw();
  })
}

function reset(){
  lines = [];
  for(var i=0; i<conf.count; i++){
    lines.push(new Line());
  }
}

reset();
render();