if (window.CSS && CSS.registerProperty) {
  document.documentElement.classList.add('css-vars-in-keyframes-supported');
  
  ['x1','x2','x3','y1','y2','y3','z1','z2']
    .forEach(prop => {
      CSS.registerProperty({
        name: `--t${prop}`,
        syntax: '<length>',
        inherits: false,
        initialValue: '0px'
      });
      CSS.registerProperty({
        name: `--r${prop}`,
        syntax: '<angle>',
        inherits: true,
        initialValue: '0deg'
      });
    });
  
  CSS.registerProperty({
    name: `--s1`,
    syntax: '<number>',
    inherits: false,
    initialValue: 1.01
  });
}


//A little variation on hsl values and delay
let tiles = Array.from(document.querySelectorAll('li'));
let hue = 343;
tiles.forEach((tile, i) => {
  tile.style.setProperty('--hue', hue);
  tile.style.setProperty('--saturation', 1 - (i % 11 * .01));
  tile.style.setProperty('--lightness', .5 - (i % 6 * .03));
  tile.style.animationDelay = `${Math.random() * 260}ms`;
  
  //Uncomment if you want a dance of the comedy and tragedy
  // tile.style.background = 'transparent';
  // tile.textContent = ': ) :'
});


//And with a mouse or pointer events (sorry, iOS), add an extra X/Y rotation (only for the fancy "We're just animating the custom properties thanks to Houdini" dance)
let tileGroup = document.querySelector('ul');
let lastTimeout = 0;
const deg = 125;
const move = throttle(e => {
  tileGroup.style.setProperty('--rx3', `${(e.clientY * 2) / window.innerHeight * deg - deg}deg`)
  tileGroup.style.setProperty('--ry3', `${e.clientX * 2 / window.innerWidth * deg - deg}deg`)
}, 100);
const leave = (e => {
  clearTimeout(lastTimeout);
  tileGroup.style.setProperty('--rx3', `0deg`)
  tileGroup.style.setProperty('--ry3', `0deg`)
});
if (window.PointerEvent) { //Since as of 2/2018 this is only in Chrome Canary, this will always be true
  document.addEventListener('pointermove', move)
  document.addEventListener('pointerleave', leave)
  document.addEventListener('pointercancel', leave)
} else {
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseout', leave)
}

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(lastTimeout);
      lastTimeout = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}