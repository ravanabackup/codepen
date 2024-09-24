var w = c.width = 400,
    h = c.height = 400,
    ctx = c.getContext('2d'),
    
    tau = Math.PI*2,
    delta = .004,
    thickness = .2,
    
    frame = 0;

function anim(){
  window.requestAnimationFrame(anim);
  
  ++frame;
  
  ctx.fillStyle = 'rgba(0, 0, 0, repAl)'.replace('repAl', alp.value/100);
  ctx.fillRect(0, 0, w, h);
  
  for(var i = 0; i < w; ++i){
    ctx.strokeStyle = 'hsl(hue, 80%, 50%)'.replace('hue',
            (360 / (w/3) * i - frame) % 360
        );
    ctx.beginPath();
    ctx.arc(w/2, h/2, (i + frame)%w/2,
            (frame*delta + i)%tau,
            (delta*frame + thickness + i)%tau
           );
    ctx.stroke();
    ctx.closePath();
  }
}
anim();