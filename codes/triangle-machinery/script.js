var dom = document.documentElement;
window.addEventListener('mousemove', event => {
  requestAnimationFrame(_ => {
    var { innerWidth, innerHeight } = window;
    var { clientX, clientY } = event;
    var relativeX = clientX - innerWidth / 2;
    var relativeY = clientY - innerHeight / 2;
    dom.style.setProperty('--left', relativeX + 'px');
    dom.style.setProperty('--top', relativeY + 'px');
  });
});