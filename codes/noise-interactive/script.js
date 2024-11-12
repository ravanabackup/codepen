var canvas  = document.getElementById('canvas');
ctx = canvas.getContext('2d'),
  requestAnimationFrame = window.requestAnimationFrame || 
  window.mozRequestAnimationFrame || 
  window.webkitRequestAnimationFrame || 
  window.msRequestAnimationFrame;

var WIDTH = document.documentElement.clientWidth,
    HEIGHT = document.documentElement.clientHeight;  

var perlin = new ClassicalNoise();      
var contraction = .005,
    amp = 4,
    size = 15,
    gap = 18,
    xi, yi, 
    variators = [],
    a; 

var mouseX = WIDTH/2,
    mouseY = HEIGHT/2,
    mouseAmp = 15,
    mouseArea = 200,
    base_color; 

for (var i = -gap; i < HEIGHT; i += gap) {
  variators[i] = 0;
}

canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);

function draw() {
  for (var x = -gap; x < WIDTH; x += gap) {
    for (var y = -gap; y < HEIGHT; y += gap) {

      var dx = x - mouseX;
      var dy = y - mouseY;
      var dc = Math.sqrt( dx*dx + dy*dy );
      if (dc <= mouseArea) {
        a = perlin.noise(x*contraction, y*contraction, variators[y]);
        a = Math.abs(a)*mouseAmp;

        var c = 200- Math.floor(a * 255);
        ctx.beginPath();
        ctx.fillRect(x-size, y-size, size*3, size*3);
       //ctx.arc(x, y, size/2, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba("+Math.floor(c/3)+","+Math.floor(c*1)+","+Math.floor(c*1.5)+","+1+")";
      } else {
        a = perlin.noise(x*contraction, y*contraction, variators[y]);
        a = Math.abs(a)*amp;

        var c = 200 - Math.floor(a * 255);
        ctx.beginPath();
        //ctx.fillRect(x-size/2, y-size/2, size, size);
        ctx.arc(x, y, size/2, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba("+c+","+c+","+c+","+.2+")";
      }

      ctx.fill();
      ctx.closePath();

      variators[y] += .0001;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  draw();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});