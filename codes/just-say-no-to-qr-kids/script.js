var gridSize = 10;
TweenMax.set(".box",{x:randomPosition,y:randomPosition});
function animateX() {
  TweenMax.staggerTo(".box", Math.random() + .5, {
      x: randomPosition,
      ease: Sine.easeInOut,
      modifiers: {
        x: roundPosition
      }
    },
    .02,
    animateX);
}
animateX();

function animateY() {
  TweenMax.staggerTo(".box", Math.random() + .5, {
      y: randomPosition,
      ease: Sine.easeInOut,
      modifiers: {
        y: roundPosition
      }
    },
    .05,
    animateY);
}

function randomPosition(value) {
  return roundPosition((Math.random() * 290) - 145);
}

function roundPosition(value) {
  return (Math.round(value / gridSize) * gridSize) - 5;
}
animateY();