var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

window.onresize = function () {
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight;
}; window.onresize();

nt=0;
conf = {
  backgroundCol: "#000000",
  shapeCol1: "#0c0c0c",
  shapeCol2: "#222222",
  shapeSize: 40,
  // shapeDistance
  shapeLineWidth: 2,
  shapeShadow: 5,
  shapeShadowDistance: 5,
  dotsCount: 50,
  dotsHue: 200,
  dotsSize: 2,
  dotsSpeed: 1
}

var gui = new dat.GUI();
var f1 = gui.addFolder("Shape");
var f2 = gui.addFolder("Dots");
var f3 = gui.addFolder("Others");
f1.addColor(conf, "shapeCol1");
f1.addColor(conf, "shapeCol2");
f1.add(conf, "shapeSize", 10, 100).step(5);
f1.add(conf, "shapeLineWidth", 0, 10).step(1);
f1.add(conf, "shapeShadow", 0, 20).step(1);
f1.add(conf, "shapeShadowDistance", 0, 20).step(1);
f2.add(conf, "dotsCount", 10, 100).step(1).onChange(pushDots);
f2.add(conf, "dotsHue", 0, 360).step(1);
f2.add(conf, "dotsSize", 0.2, 4).step(0.1);
f2.add(conf, "dotsSpeed", 0.2, 4).step(0.1);
f3.addColor(conf, "backgroundCol");

function draw() {
  ctx.globalCompositeOperation = "source-over";
  //var lg = ctx.createLinearGradient(0, 40, 40, 0);
  //lg.addColorStop(0,'rgba( 255, 250, 200, 0.2 )');
  //lg.addColorStop(1,'rgba( 255, 250, 200, 0.1 )');
  // Gradient on Hex?
  ctx.fillStyle = conf.shapeCol1;
  ctx.strokeStyle = conf.shapeCol2;
  ctx.lineWidth = conf.shapeLineWidth;

  var shapeApothem = conf.shapeSize * Math.cos(Math.PI / 6);
  var shapeSideLength = conf.shapeSize * Math.sin(Math.PI / 6);

  for (var i = 0; i < w / (conf.shapeSize + shapeSideLength); i++) {
    for (var j = 0; j < (h + conf.shapeSize) / (conf.shapeSize * 2); j++) {
      var ty = (j * conf.shapeSize * 2) + ((i % 2) * (conf.shapeSize));
      var tx = i * (conf.shapeSize + shapeApothem);

      ctx.beginPath();
      ctx.moveTo(tx + conf.shapeSize * Math.cos(0), ty + conf.shapeSize * Math.sin(0));
      for (var k = 1; k <= 6; k++) {
        ctx.lineTo(tx + conf.shapeSize * Math.cos(k * 2 * Math.PI / 6), ty + conf.shapeSize * Math.sin(k * 2 * Math.PI / 6));
      }
      ctx.shadowBlur = conf.shapeShadow;
      ctx.shadowColor = '#000';
      ctx.shadowOffsetX = conf.shapeShadowDistance;
      ctx.shadowOffsetY = conf.shapeShadowDistance;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowColor = "transparent";
      ctx.stroke();
      ctx.closePath();
    }
  }
}

function pushDots(){
  dots = [];//
  for(var i = 0; i < conf.dotsCount; i++){
    dots.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * (100 - 40) + 40),
      h: Math.random() * 40,
      vx: (Math.random() * (0.4 - 0.2) + 0.2),
      vy: (Math.random() * (0.4 - 0.2) + 0.2)
    });
  }
}
pushDots();

function drawDots() {
  ctx.globalCompositeOperation = "lighter";

  nt += 0.001;
  for(var i = 0; i < dots.length; i++){
    var rn = dots[i].r * conf.dotsSize;
    dots[i].x += dots[i].vx * conf.dotsSpeed;
    dots[i].y += dots[i].vy * conf.dotsSpeed;

    var grd = ctx.createRadialGradient(dots[i].x, dots[i].y, 0, dots[i].x, dots[i].y, rn);
    grd.addColorStop(0, "hsla("+ (conf.dotsHue + dots[i].h) +", 100%, 80%, 1)");
    grd.addColorStop(0.2, "hsla("+ (conf.dotsHue + dots[i].h) +", 100%, 50%, 1)");
    grd.addColorStop(1, "hsla("+ (conf.dotsHue + dots[i].h) +", 100%, 50%, 0)");

    ctx.beginPath();
    ctx.arc(dots[i].x, dots[i].y, rn, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();

    if (dots[i].x < 0 + rn || dots[i].x + rn > w) dots[i].vx = -dots[i].vx;
    if (dots[i].y - rn < 0 || dots[i].y + rn > h) dots[i].vy = -dots[i].vy;
  }
}

function clear() {
  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;
  ctx.fillStyle = conf.backgroundCol;
  ctx.fillRect(0, 0, w, h);
}

function render() {
  clear();
  drawDots();
  draw(w, h);
  requestAnimationFrame(render);
}
render();