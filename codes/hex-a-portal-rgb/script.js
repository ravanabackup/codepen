var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
    container = select('.container');

TweenMax.set(container, {
		position: 'absolute',
		top: '50%',
		left: '50%',
		xPercent: -50,
		yPercent: -50
})
var ease = Linear.easeNone;
var tl = new TimelineMax({repeat:-1,onUpdate:function(){
  TweenMax.to('.chaser', 1, {
    strokeDashoffset:'-=450'
})
}})
tl.to('g', 2, {
  rotation:-360,
  transformOrigin:'50% 50%',
  ease:ease
})

tl.timeScale(1)