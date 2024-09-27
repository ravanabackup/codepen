var c = document.querySelector('.c') /* canvas element */, 
    w /* canvas width */, h /* canvas height */,
    ctx = c.getContext('2d') /* canvas context */, 
    
    /* previous & current coordinates */
    x0, y0, x, y, 
    t = 0, t_step = 1/60, 
    u = 20, m, 
    tmp, 
    
    /* just me being lazy */
    ceil = Math.ceil, 
    exp = Math.exp, pow = Math.pow, sqrt = Math.sqrt, 
    PI = Math.PI, sin = Math.sin, cos = Math.cos;


/* FUNCTIONS */
/* a random number between min & max */
var rand = function(max, min) {
  var b = (max === 0 || max) ? max : 1, a = min || 0;
  
  return a + (b - a)*Math.random();
};

var trimUnit = function(input_str, unit) {
  return parseInt(input_str.split(unit)[0], 10);
};

var initCanvas = function() {
  var s = getComputedStyle(c);
  
  w = c.width = trimUnit(s.width, 'px');
  h = c.height = trimUnit(s.height, 'px');
  
  m = ceil(w/(2*u)) + 1;
};

var wave = function () {
  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 2;
  
  for(var i = 0; i < m; i++) {
    x0 = -1;
    y0 = i*2*u;
    
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    
    for(x = 0; x < w; x++) {
      y =  u*sin(x/4/(16*i/m + 1) - w*(i/m + 1)*t/30) + i*2*u;
      
      ctx.lineTo(x, y);
      
      x0 = x;
      y0 = y;
    }
    ctx.strokeStyle = 'hsl(' + i*360/m + ', 100%, 75%)';
    ctx.stroke();
  }
  
  
  
  t += t_step;
  
  requestAnimationFrame(wave);
};

/* START THE MADNESS */
setTimeout(function() {
  
  initCanvas();
  wave();
  
  /* fix looks on resize */
  addEventListener('resize', initCanvas, false);
}, 15);