const animation = document.querySelector('main').animate([
  {clipPath: `polygon(evenodd,${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()})`},{clipPath: `polygon(evenodd,${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()},${p()})`}
], {
  duration: 800,
  direction: 'alternate',
  iterations: Infinity
});

function p() {
  return `${Math.random() * 100}% ${Math.random() * 100}%`;
}