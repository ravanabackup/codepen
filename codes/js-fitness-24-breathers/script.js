Object.getOwnPropertyNames(Math).map(function(p) {
  window[p] = Math[p];
});

var rand = function(max, min, isInt) {
  var max = max || 1, min = min || 0, 
      gen = min + (max - min)*random();
  
  return (isInt)?(~~gen):gen;
};

var c = document.querySelector('canvas'), 
    ctxt = c.getContext('2d'), 
    n = 512, dots = [], t = 0, k = 1/sqrt(2);

var Dot = function() {
  var x = rand(500, 0, 1), 
      y = rand(500, 0, 1), 
      dx = x - 250, dy = y - 250, 
      d = ~~sqrt(dx*dx + dy*dy);
    
  this.draw = function(ctx) {
    var r = ~~(1 + 14*(k + max(-k, min(k, sin(d/120 - t/15)))));
        
    ctx.moveTo(x + r, y);
    ctx.arc(x, y, r, 0, 2*PI);
  };
};

var init = function() {
  for(var i = 0; i < n; i++) {
    dots.push(new Dot());
  }
  ani();
};

var ani = function() {
  ctxt.clearRect(0, 0, 500, 500);
  ctxt.beginPath();
  for(var i = 0; i < n; i++) {
    dots[i].draw(ctxt);
  }
  ctxt.closePath();
  ctxt.fill();
  
  t++;
  requestAnimationFrame(ani);
}

init();