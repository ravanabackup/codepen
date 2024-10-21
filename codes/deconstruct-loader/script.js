const tl = new TimelineMax({repeat:-1, yoyo:true});


tl.staggerTo(".shape", 1, {
  bezier:{curviness:1.5,values:[{x:0,y:0},{x:-50,y:-50},{x:0,y:-100},{x:50,y:-50},{x:0,y:0}]},
  opacity: 0,
  ease: SlowMo.ease.config(0.3, 0.4, false),
  scaleX: 0,
  rotation: -180
}, -0.1)