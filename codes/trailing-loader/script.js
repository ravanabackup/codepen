const tl = new TimelineMax({repeat: -1});

const sq = document.getElementsByClassName("square");

const dur = 1;
const int  = -0.1;

tl.set(sq, {
  transformOrigin: "50% 50%"
})
.staggerTo(sq, dur, {
  x: 125
 }, int)
.staggerTo(sq, dur, {
  y: 125,
  rotation: 90
}, int)
.staggerTo(sq, dur, {
  x: 0
}, int)
.staggerTo(sq, dur, {
  y: 0,
  rotation: -90
}, int)