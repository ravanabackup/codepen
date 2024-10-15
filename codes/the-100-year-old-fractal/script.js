/*
  Johan Karlsson (DonKarlssonSan)
  
  A one hundred year old fractal!
  
  "The Sierpinski carpet is a plane fractal first described by Wacław Sierpiński in 1916" - Wikipedia

  As clean/simple code as I could. The second if statement for ignoring the fifth square could be left out, I kept it because it feels more "correct".

*/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var size = canvas.width = canvas.height = 1200;

function carpet(size, level, x0, y0) {
  if(level === 0) return;
  var s = size / 3;
  level--;
  ctx.fillRect(s + x0, s + y0, s, s);
  for(var x = 0; x < 3; x++) {
    for(var y = 0; y < 3; y++) {
      if(!(x === 1 && y === 1)) {
        carpet(s, level, x0 + x * s, y0 + y * s);
      }
    }
  }
}

carpet(size, 6, 0, 0);