var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  }
  
CustomEase.create("creep", "M0,0 C0.25,0 0.144,0.287 0.204,0.348 0.288,0.433 0.466,0.292 0.498,0.502 0.532,0.73 0.67,0.57 0.75,0.65 0.815,0.714 0.698,1 1,1");
CustomEase.create("probe", "M0,0 C0.25,0 0.41,0.259 0.48,0.396 0.558,0.55 0.518,0.951 0.66,1.026 0.846,1.124 0.94,0.946 1,1");

TweenMax.set('svg', {
  visibility: 'visible'
})

var tl = new TimelineMax({repeat:-1}).timeScale(1.8);
tl .staggerTo('.shapeGroup rect', 2, {
 x:'+=223',
 ease:'creep'
},0.23)
 .to('.shapeGroup',tl.duration(), {
 x:'-=223',
 ease:Linear.easeNone
},'-=' + tl.duration())