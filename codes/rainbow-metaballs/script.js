/* hsl to rgb and more:
https://codepen.io/enxaneta/pen/2efc4f0528d674a91f3e8c38801312ca */
//console.clear();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = 600,
  cx = cw / 2;
var ch = canvas.height = 600,
  cy = ch / 2;
ctx.strokeStyle =  "#fff";



var rad = Math.PI / 180;
var frames = 0;
var blobs = [];
var numBlobs = 20;
var m = {x:cx,y:cy}
var imgData=ctx.createImageData(cw,ch);
					
function Blob(x, y) {
  this.pos = {
    x: x,
    y: y
  };
  this.vel = {
    x:(Math.random() * 2 - 1) * 5,
    y:(Math.random() * 2 - 1) * 5
  }
  this.r = 30;

  /*this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
  }*/

  this.update = function() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.x < 0 || this.pos.x > cw) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > ch) {
      this.vel.y *= -1;
    }
  }
}					


for(var i = 0; i < numBlobs;i++){
var blob = new Blob(Math.random()*cw,Math.random()*ch);
  blobs.push(blob);
}

function Draw() {
  requestId = window.requestAnimationFrame(Draw);
  frames++
  
  
  var rgb = hsl2rgb(frames%360, 90, 65)
  
 for (var x = 0; x < imgData.width; x++){
            for (var y = 0; y < imgData.height; y++){
              var i = (x + y*imgData.width)*4;
              
              var sum = 0;
							for(var j = 0; j < blobs.length; j++){
                var d = dist({x:x,y:y}, blobs[j].pos);
							sum += 60*blobs[j].r/d
              }
              
              //var color =  sum < 200 ? 0 : 255;
              //var color =  sum < 200 || sum > 210 ? 0 : 255;
              
              var r = sum < 200 || sum > 210 ? 0 : rgb[0];
              var g = sum < 200 || sum > 210 ? 0 : rgb[1];
              var b = sum < 200 || sum > 210 ? 0 : rgb[2];
              
              imgData.data[i + 0] = r;
              imgData.data[i + 1] = g;
              imgData.data[i + 2] = b;
              imgData.data[i + 3] = 255;
        
							}
            }
					
					ctx.putImageData(imgData,0,0);
 for(var i = 0; i < blobs.length; i++){
  blobs[i].update();
  //blobs[i].draw();
  }
}
Draw();








canvas.addEventListener('mousemove', function(evt){
  m = oMousePos(canvas, evt);

},false);

canvas.addEventListener('mouseleave', function(evt){
  m = {x:cx,y:cy}

},false);


function map(n,a,b,_a,_b){
  var d = b - a;
  var _d = _b -_a;
  var u = _d/d;
  return _a + n*u;
}



function dist(p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function angle(p1,p2){
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.atan2(dy,dx);  
}


function oMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - rect.left),
    y: Math.round(evt.clientY - rect.top)
  }
}

function marker(p,color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
  ctx.fill();
}

function dashedLine(a,b){
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.restore();
}