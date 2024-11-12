var canvas = document.createElement("canvas");
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

var fov = 45;
step = 20;
R=230;G=130;B=30;A=255;

var px = [];
for(var x=-w; x<w; x+=step) {
  for(var z=-h; z<w; z+=step) {
    px.push({x:x, y:250, z:z});
  }
}

function render() {
  ctx.clearRect(0,0,w,h);
  var imageData = ctx.getImageData(0,0,w,h);
  var i = px.length;
  
  for(i=0; i<px.length; i++){
    var pixel = px[i];
    var scale = fov/(fov+pixel.z);
    var x2d = pixel.x * scale + w/2;
    var y2d = pixel.y * scale + h/2;
    if(x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
        var c = (Math.round(y2d) * imageData.width + Math.round(x2d))*4;
        imageData.data[c] = R;
        imageData.data[c+1] = G;
        imageData.data[c+2] = B;
        imageData.data[c+3] = A;
    }
    pixel.z -= 1;
		if(pixel.z < -fov) pixel.z += 2*fov;
  }
  
  for(i=0; i<px.length; i++){
    var pixel = px[i];
    pixel.y *= -1;
    var scale = fov/(fov+pixel.z);
    var x2d = pixel.x * scale + w/2;
    var y2d = pixel.y * scale + h/2;
    if(x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
        var c = (Math.round(y2d) * imageData.width + Math.round(x2d))*4;
        imageData.data[c] = R;
        imageData.data[c+1] = G;
        imageData.data[c+2] = B;
        imageData.data[c+3] = A;
    }
    pixel.z -= 1;
		if(pixel.z < -fov) pixel.z += 2*fov;
  }
  
  ctx.putImageData(imageData,0,0);
}
setInterval(render, 1000/60);