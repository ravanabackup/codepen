let tl = new TimelineMax({repeat: -1});


TweenMax.to('#glow', 1, {opacity: 0.5, repeat: -1, yoyo: true});


tl.fromTo('#glow', 100, {x: 250, y: -250}, {x: 0, y: 0}, 0);
tl.fromTo('#comet', 100, {x: 500, y: -450}, {x: 230, y: -170}, 0);