const wrapperEl = document.querySelector('.wrapper');
const numberOfEls = 360;
const delay = 10;
const duration = 1000;

anime.easings['inOut'] = function(t) {
  return Math.pow(Math.sin(t * 3), 3);
}

function createEl(i) {
  let el = {};
  el.node = document.createElement('div');
  el.node.classList.add('el');
  el.node.style.backgroundColor = 'hsl(0, 50%, 50%)';
  el.node.style.transform = 'rotate('+180 + i+'deg)';
  el.animation = anime({
    targets: el.node,
    rotate: '+=10',
    scale: [1, 1.2],
    opacity: {
      value: [1, 1],
      duration: ((numberOfEls) * delay) - (i * delay) + duration
    },
    backgroundColor: '#fff',
    easing: 'inOut',
    delay: i * delay,
    duration: duration,
    loop: true,
    autoplay: true
  });
  wrapperEl.appendChild(el.node);
}

for (let i = 0; i < numberOfEls; i++) createEl(i);