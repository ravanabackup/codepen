var boxes = $(".box"),
    stage = $(".stage");

var angle = 180 / 13; 

TweenLite.set(stage, {
    perspective: 1000,
    transformStyle: "preserve-3d",
});

TweenMax.staggerTo(boxes,1,{
  transformOrigin: "0% 0%",
  cycle:{
    rotationY: function(i){ return i*-angle; }
  },
  repeat:-1,
  yoyo:true
})