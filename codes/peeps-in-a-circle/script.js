// You can play with the animation by changing these vars
var container = $('#ringoffire');
var incrementRotation = [18, 11, 8, 6];
var ringCount = [20, 33, 45, 58];

var incrementTop = 170;
var incrementDelay = 75;
 
var r = 0; // rotation amount
var t = 250; // offset top
var d = 0; // delay var

// outer loop to create circle sets
for (var i = 0; i < 4; i++) {
  // nested loop to create people
  for (var x = ringCount[i]; x > 0; x--) {
    // create person DOM
  	var person = $('<div class="person"></div>');
  
    // set origins and sprite positions
    // opacity: 0 to prep for animation IN
    person.css({
      transformOrigin: '50% -' + t + 'px',
      backgroundPosition: '-'+ (getRNum(0,23) * 65) +'px 0',
      opacity: 0
    }).attr({
      // data attributes will be used to animate TO
      'data-in-position': t,
      'data-in-rotation': r
    });

    // add the modified DOM to the container
    container.append(person);
    
    r += incrementRotation[i];
  }
  
  // prepare for another ring of people
  t += incrementTop;
}

// use velocity to animate each person IN
$('.person').each(function(i){
  // cache the element wrapped in jquery
  var $el = $(this);
  
  $el.velocity({
    // from -100 to inPosition, use physics easing
    translateY: [[$el.data().inPosition, -300], [ 250, 15 ]],
    // no physics for rotate or opacity, save some GPU
    rotateZ: [$el.data().inRotation, $el.data().inRotation],
    opacity: [1,0]
  }, {
    // apply the delay
    delay: d,
    duration: 800
  });
  
  d += incrementDelay;
});

setTimeout(function(){
  showMessage();
}, 4000);

function showMessage() {
  $('.message > *').velocity('transition.bounceIn', {
    stagger: 500,
    drag: true,
    display: null
  });
}

function getRNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* TIMER*/

function makeTimer() {
	var endTime = new Date("January 23, 2015 18:00:00 PDT");
	var endTime = (Date.parse(endTime)) / 1000;
	var now = new Date();
	var now = (Date.parse(now) / 1000);
	var timeLeft = endTime - now;
	var days = Math.floor(timeLeft / 86400);
	var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
	var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
	var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
	if (hours < "10") {
		hours = "0" + hours;
	}
	if (minutes < "10") {
		minutes = "0" + minutes;
	}
	if (seconds < "10") {
		seconds = "0" + seconds;
	}
	$("#days").html(days);
	$("#hours").html(hours);
	$("#minutes").html(minutes);
	$("#seconds").html(seconds);
}
setInterval(function() {
	makeTimer();
}, 1000);