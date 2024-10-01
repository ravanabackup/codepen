const mode = document.getElementById('mode');
mode.addEventListener('change', e => {
  document.body.style.setProperty('--enable-3d', e.currentTarget.value);
});

const playState = document.getElementById('animate');
playState.value = getComputedStyle(document.body).getPropertyValue('--animate').trim();
playState.addEventListener('change', e => {
  document.body.style.setProperty('--animate', e.currentTarget.value);
});


//This JS is only here because I wanted to make it so you can add as many circles as you want and didn't want to use Sass for offsetting the animation delays.
var followers = document.querySelectorAll('.left .spiral-follower');
var followersRight = document.querySelectorAll('.right .spiral-follower');
var duration = parseFloat(getComputedStyle(document.body).getPropertyValue('--duration'));

for (var i = 0, l = followers.length; i < l; ++i) {
  var follower = followers[i];
  var follower2 = followersRight[i];
  var delay = -(i * duration / l+ 8800) + 'ms';
  follower.style.setProperty('animation-delay', delay);
  follower2.style.setProperty('animation-delay', delay);
  follower.style.setProperty('--size', `${10 + 50 * i / followers.length}vmin`);
  follower2.style.setProperty('--size', `${10 + 50 * i / followers.length}vmin`);
}