var w = c.width = 400,
    h = c.height = 400,
    ctx = c.getContext('2d'),
    
    frame = 0;

function anim(){
  window.requestAnimationFrame(anim);
  
  ++frame;
  
  for(var i = 0; i < w; ++i){
    ctx.strokeStyle = i%20 === 0 ? 'hsl(hue, 80%, 50%)'.replace('hue',
            (360 / (w/3) * i - frame) % 360
        ) : 'rgba(0, 0, 0, .08)';
    ctx.beginPath();
    ctx.arc(w/2, h/2, (i + frame)%w/2, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }
}
anim();