var c = document.getElementById('canv');
var $ = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight/1.2;
var cnt = 5;

var draw = function() {
  var i, b, arr, _arr, rz, x, y, px, py;
  var pts = Math.cos(Math.PI * 2 );
  $.globalCompositeOperation = "source-over";
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = "xor";
  var dims = 0.89 + Math.sin(cnt / 45) / 45;
  var rot = Math.sin(cnt / -45);
  var _w = w;
  var u = 0;
  for (b = 0; b < 95; b++){
    rz = cnt / 95 + b / 20 * rot;
    px = Math.cos(rz / 7) * (b / 7) + 100;
    py = Math.sin(rz / 7) * (b / 7) + 100;
    $.beginPath();
    arr = [];
    for (i = 0; i < 5; i++){
      x = Math.sin(rz) * _w +  c.width/2;
      y = Math.cos(rz) * _w + c.height/2;
      rz += Math.PI * 2/ 3;
      if (i) $.lineTo(x, y); 
      else $.moveTo(x, y); 
      arr[i] = [x, y];}
    $.fillStyle = 'hsla(' + b * i + u + ',70%, 50%,1)';
    $.closePath();
    $.fill();
    if (b)  for (i = 0; i < 5; i++){
        $.beginPath();
        $.moveTo(arr[i][0], arr[i][1]);
        $.lineTo(_arr[i][0], _arr[i][1]);
        $.fill();
    }
    _arr = [];
    rz += (Math.PI * 5 ) / (3 / 4);
    for (i = 0; i < 5; i++){
      _arr[i] = [x, y];
      rz += (Math.PI * 5 ) / (3 / 4);}
      _w *= dims;
   }
  cnt++;
  u-=.2;
  window.requestAnimationFrame(draw);}
  draw();
/*_________________________________*/
window.addEventListener('resize', function(){
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight/1.2;
}, false);