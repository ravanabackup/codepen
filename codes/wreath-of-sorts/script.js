var SIZE = 3; //vmin
var GREENERY = '#056949';
var lists = [].slice.call(document.querySelectorAll('ul'));

//document.documentElement.classList.add('hexagon');

lists.forEach(function(list, u) {
  var items = list.querySelectorAll('li');
  var length = items.length;
  var translate = 'translateY(-' + (SIZE * length/6) + 'vmin)';
  for (var i = 0; i < length; ++i) {
    items[i].style.transform = 'rotate(' + (i / length) + 'turn) ' + translate;
    var rando = Math.random();
    // if (rando < .096) {
    //   items[i].classList.add('berry');
    // }
    if (rando > .45 && rando < .6) {
      items[i].classList.add('light');
    }
    items[i].style.animationDelay = (Math.random() * (-8000) - 3000) + 'ms'
  }

  if (list.animate) {
    var degree = (lists.length - u) * (3) / 2;
    list.animate([
      {transform: 'translate3d(-50%,-50%, 0px) rotate(-'+degree+'deg)'},
      {transform: 'translate3d(-50%,-50%,0px) rotate('+degree+'deg)'}
    ], {
      duration: 36000 + Math.random() * 10000,
      iterations: Infinity,
      direction: 'alternate',
      delay: -56000 * Math.random()
    });
  }
});

var allItems = [].slice.call(document.querySelectorAll('li:not(.light)'));

function startSparkle() {
  sparkle(allItems[Math.floor(allItems.length * Math.random())]);
}

function sparkle(item) {
  var filter = getComputedStyle(item).filter;
  filter = filter === 'none' ? '' : filter;
  var keyframes = [
    { backgroundColor: GREENERY, filter: filter + ' blur(0)', offset: 0},
    { backgroundColor: 'silver', filter: filter + ' blur(1px)', offset: .1},
    { backgroundColor: 'silver', filter: filter + ' blur(2px)', offset: .5},
    { backgroundColor: 'silver', filter: filter + ' blur(1px)', offset: .9},
    { backgroundColor: GREENERY, filter: filter + ' blur(0)', offset: 1}
  ];
  console.log(keyframes[1])
  item.animate(keyframes, {
    duration: 1000 * Math.random() + 500,
    delay: 1000 * Math.random()
  }).onfinish = startSparkle;
}

if (document.documentElement.animate) {
  //startSparkle();
}

document.getElementById('shape').addEventListener('change', function(e) {
  var cl =document.documentElement.classList;
  if (cl.contains('hexagon')) {
    cl.remove('hexagon');
  } else {
    cl.add('hexagon');
  }
})