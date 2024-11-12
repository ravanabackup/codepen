var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
window.onresize = function() {
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight;
};window.onresize();

conf = {
  width: 10,
  cap: "round",
  dist: 10,
  gap: 10,
  xScale: 20,
  yScale: 200,
  color1: "#e16522",
  color2: "#2d1406",
  nt1: 0,
  nt2: 0,
  ns1: 0.01,
  ns2: 0.002,
}

var gui = new dat.GUI();
f1 = gui.addFolder("General");
f2 = gui.addFolder("Colors");
f1.add(conf, "width", 1, 20).name("Line Width");
f1.add(conf, "cap", {Round:"round", Square:"square"}).name("Line Cap");
f1.add(conf, "dist", 0, 20).name("Gap Horizontal");
f1.add(conf, "gap", 0, 20).name("Gap Vertical");
f1.add(conf, "xScale", 10, 80).name("Horizontal Scale");
f1.add(conf, "yScale", 50, 500).name("Vertical Scale");
f1.add(conf, "ns1", 0, 0.08).step(0.0001).name("Horizontal Speed");
f1.add(conf, "ns2", 0, 0.03).step(0.0001).name("Vertical Speed");
f2.addColor(conf, "color1").name("Color 1");
f2.addColor(conf, "color2").name("Color 2");
f1.open();
f2.open();

function render(){
  ctx.clearRect(0,0,w,h);

  var num = Math.ceil(w / (conf.width + conf.dist));
  var step = conf.width+conf.dist;
  conf.nt1 -= conf.ns1;
  conf.nt2 += conf.ns2;
  for(var i=0; i<num; i++){
    var ny = noise.perlin2(i/conf.xScale+conf.nt1, conf.nt2)*conf.yScale;
    
    var nh = (h/2)+(ny);
    var hh = h/2;
    
    if(nh > hh){
      var hd = nh+(conf.gap+conf.width);
      var hd2 = hh-(conf.gap+conf.width);
    }else{
      var hd = hh+(conf.gap+conf.width);
      var hd2 = nh-(conf.gap+conf.width);
    }
    
    ctx.beginPath();
    ctx.strokeStyle = conf.color1;
    ctx.lineWidth = conf.width;
    ctx.lineCap = conf.cap;
    ctx.moveTo(i*step, (h/2));
    ctx.lineTo(i*step, (h/2)+(ny));
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.strokeStyle = conf.color2;
    ctx.lineWidth = conf.width;
    ctx.lineCap = conf.cap;
    ctx.moveTo(i*step, hd);
    ctx.lineTo(i*step, h);
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.strokeStyle = conf.color2;
    ctx.lineWidth = conf.width;
    ctx.lineCap = conf.cap;
    ctx.moveTo(i*step, hd2);
    ctx.lineTo(i*step, 0);
    ctx.stroke();
    ctx.closePath();
  }

  requestAnimationFrame(render);
}

render();