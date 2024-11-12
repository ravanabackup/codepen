var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
w = ctx.canvas.width = window.innerWidth;
h = ctx.canvas.height = window.innerHeight;

window.onresize = function() {
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight;
};

pixels = [];
emitterCount = 3;
pixelSize = 6;
gap = 2;
lineWidth = 1;
maxLifetime = 3000;
minLifetime = 1000;
spawnRate = 500;
shape = "rect"; // rect/arc
style = "stroke"; // fill/stroke
opacity = 0.2;
hue = 0; // Starting Hue (0-360)
hueRange = 50; // Hue +/-

function emit(){
  for(var i=0; i<emitterCount; i++){
    pixels.push({
      x:Math.ceil((Math.random()*w)/(pixelSize+gap))*(pixelSize+gap),//Remove +gap for intersection
      y:Math.ceil((Math.random()*h)/(pixelSize+gap))*(pixelSize+gap),
      t:Math.random()*(maxLifetime - minLifetime) + minLifetime,
      s:Date.now(),
      h:Math.random()*((hue+hueRange)-(hue-hueRange))+(hue-hueRange)
    });
  }
}

style=="stroke"?gap*=2:0;

function draw(){
  for(var i=0; i<pixels.length; i++){
    ctx.beginPath();
    ctx.globalAlpha = opacity;
    ctx.lineWidth = lineWidth;
    diff = (Date.now()-pixels[i].s)/pixels[i].t;
    perc = Math.round(diff*100);
    ctx.strokeStyle="hsl("+pixels[i].h+","+perc+"%,50%)";
    ctx.fillStyle="hsl("+pixels[i].h+","+perc+"%,50%)";
    
    if(shape=="rect"){
      ctx.rect(pixels[i].x,pixels[i].y,pixelSize,pixelSize);
    }else if(shape=="arc"){
      ctx.arc(pixels[i].x,pixels[i].y,pixelSize,0,2*Math.PI);
    }
    if(style=="stroke"){
      ctx.stroke();
    }else if(style=="fill"){
      ctx.fill();
    }
    ctx.closePath();
  }
}

function animate(){
  for(var i=0; i<pixels.length; i++){
    if(pixels[i].s+pixels[i].t<Date.now()){
      pixels.splice(i, 1);
    } else {
      var dir = Math.round(Math.random() * 8) % 8;
      switch(dir){
        case 0: // N
          pixels[i].y -= gap+pixelSize;
          break;
        case 1: // NE
          pixels[i].x += gap+pixelSize;
          pixels[i].y -= gap+pixelSize;
          break;
        case 2: // E
          pixels[i].x += gap+pixelSize;
          break;
        case 3: // SE
          pixels[i].x += gap+pixelSize;
          pixels[i].y += gap+pixelSize;
          break;
        case 4: // S
          pixels[i].y += gap+pixelSize;
          break;
        case 5: // SW
          pixels[i].x -= gap+pixelSize;
          pixels[i].y += gap+pixelSize;
          break;
        case 6: // W
          pixels[i].x -= gap+pixelSize;
          break;
        case 7: // NW
          pixels[i].x -= gap+pixelSize;
          pixels[i].y -= gap+pixelSize;
          break;
      }
    }
  }
}

canvas.onclick = function(){
  ctx.clearRect(0,0,w,h);
}

function render(){
  draw();
  animate();
  window.requestAnimationFrame(render);
}
emit();
setInterval(emit, spawnRate);
window.requestAnimationFrame(render);