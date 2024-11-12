var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
w = ctx.canvas.width = window.innerWidth;
h = ctx.canvas.height = window.innerHeight;

window.onresize = function() {
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight;
  rect = [];
  clear();
};

rect = [];
angle = 0;

// Settings
growSpeed = 2; // In pixels
spawnSpeed = 1000; // In milliseconds
rotateSpeed = 0.5; // In degrees (0 and minus is allowed)
lineWidth = 2; // In pixels

// Redraw with offset for a 3D Look
redraws = 5; // Number of offset-lines
offset = 2; // Distance between offset-lines

function pushRect(){
  rect.push({
    x: w/2,
    y: h/2,
    w: 0,
    h: 0
  });
}

function clear(){
  ctx.fillStyle="#000";
  ctx.rect(0,0,w,h);
  ctx.fill();
}

function render(){
  clear();
  for(var i = 0; i<rect.length; i++){
    // Rotation
    ctx.save();
    ctx.translate(w/2,h/2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-rect[i].x, -rect[i].y);
    
    // Draw the Rectangle
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "hsla("+200+(rect[i].h/10)+", 100%, 50%, 1)";
    for(var j = 0; j<=redraws; j++){
      ctx.rect(
        rect[i].x-(rect[i].w/2)+(j*(lineWidth+offset)),
        rect[i].y-(rect[i].h/2)+(j*(lineWidth+offset)),
        rect[i].w,
        rect[i].h
      );
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    
    // Animate the width/height
    rect[i].w += growSpeed;
    rect[i].h += growSpeed;
    
    // Clear Rectangles if they leave the Canvas
    if(rect[i].w>w){
      rect.splice(i,1);
    }
  }
  
  // Animate the Rotation
  angle += rotateSpeed;
  
  requestAnimationFrame(render);
}

setInterval(pushRect, spawnSpeed);
render();