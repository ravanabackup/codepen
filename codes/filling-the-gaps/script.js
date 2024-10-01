const spinner = document.querySelector('svg');
const control = document.querySelector('#rate');
const rotation = document.querySelector('#rotate');
const spinning = spinner.animate({
  transform: ['rotate(0)', 'rotate(1turn)']
}, {
  duration: 266.6667,
  iterations: Infinity
});
spinning.playbackRate = control.value;

control.addEventListener('input', e => {
  const value = parseFloat(e.currentTarget.value);
  console.log(value)
  if (spinning.updatePlaybackRate) {
    spinning.updatePlaybackRate(value);
  } else {
    spinning.playbackRate = value;
  }
});

rotation.addEventListener('input', e => {
  document.body.style.setProperty('--rotate', `${rotation.value}deg`)
})