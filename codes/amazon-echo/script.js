var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  }
  

TweenMax.set('svg', {
  visibility: 'visible'
})

TweenMax.set('.blueRing', {
 rotation:90,
 transformOrigin:'50% 50%'
})



TweenMax.to('.whole', 2.6, {
 rotation:360,
 transformOrigin:'50% 50%',
 ease:Linear.easeNone,
 repeat:-1
})