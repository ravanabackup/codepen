var select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  }, 
  animationWindow = select('#animationWindow'),
  anim = lottie.loadAnimation({
  container: animationWindow, 
  renderer: 'svg',
  loop: true,
  autoplay: true,
  //initialSegment: [0, 1140],
  path: 'https://assets.codepen.io/35984/palette_morph.json' 
});

 anim.addEventListener('DOMLoaded', onDOMLoaded);
 anim.setSpeed(1);

function onDOMLoaded(e){ 


}
//ScrubLottieTimeline(anim)