var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
    leftToRight = select('#leftToRight'),
    rightToLeft = select('#rightToLeft'),
    wholeGroup = select('#wholeGroup'),
    ball = select('#ball'),
    particlePool = [],
  pContainer = select('.pContainer'),
  particleCount = 0,
  numParticles = 600,
  dotRadius = 30,
  dot = select('#dot'),
  platformBounce = 6


TweenMax.set('svg', {
  visibility: 'visible'
})
TweenMax.set(ball, {
  transformOrigin:'50% 50%'
})

TweenMax.set(dot, {
  attr: {
    rx: dotRadius,
    ry:dotRadius
  },
  transformOrigin:'50% 50%'
})
var leftToRightBezier = MorphSVGPlugin.pathDataToBezier(leftToRight.getAttribute('d'), {
  offsetX: 0,
  offsetY: 0
})
var rightToLeftBezier = MorphSVGPlugin.pathDataToBezier(rightToLeft.getAttribute('d'), {
  offsetX: 0,
  offsetY: 0
})
var ease = CubicBezier.config(0.11, 0.28, 0.68, 0.4);

var leftToRightTl = new TimelineMax({paused:true});
leftToRightTl.to(ball, 5, {
    bezier: {
      type: "cubic",
      values: leftToRightBezier,
      autoRotate: true
    },
    ease: Linear.easeNone
  })
  
var rightToLeftTl = new TimelineMax({paused:true});
rightToLeftTl.to(ball, 5, {
    bezier: {
      type: "cubic",
      values: rightToLeftBezier,
      autoRotate: true
    },
    ease: Linear.easeNone
  })
var bothTl = new TimelineMax({repeat:-1, onUpdate:playParticle});
bothTl.from('#platformL', 1, {
  rotation:-platformBounce,
  immediateRender:false,
   onStart:hitDot,
  transformOrigin:'100% 100%',
  ease:Elastic.easeOut.config(1.7,0.37)
})
.to(ball, 0.2, {
  attr:{
    rx:8
  }
},'-=1')
.to(ball, 0.5, {
  attr:{
    rx:10
  }
},'-=0.8')
 .to(leftToRightTl, 1, {
  time:leftToRightTl.duration(),
  ease:ease
},'-=1')

.from('#platformR', 1, {
  rotation:platformBounce,
  immediateRender:false,
  onStart:hitDot,
  transformOrigin:'0% 100%',
  ease:Elastic.easeOut.config(1.7,0.37)
})
.to(ball, 0.2, {
  attr:{
    rx:8
  }
},'-=1')
.to(ball, 0.5, {
  attr:{
    rx:10
  }
},'-=0.8')
.to(rightToLeftTl, 1, {
  time:rightToLeftTl.duration(),
  ease:ease
},'-=1')
.to(wholeGroup, 2, {
  y:-200,
  ease:Linear.easeNone
},'-=2')


function createParticle() {
  var p, d = select('#dot');
  for (var i = 0; i < numParticles; i++) {

    p = d.cloneNode(true);
    pContainer.appendChild(p);
    particlePool.push(p);
    TweenMax.set(p, {
      transformOrigin: '50% 50%',
      alpha:0.5,
      x:-100,
      y:-100
    })
  }
}

function playParticle() {
  var p = particlePool[particleCount];
  //var elPoint = (particleCount %2) ? "5 81" : "321 81";
  var elPoint = '10 10', el =ball;
  
  //console.log(el)
  CSSTransform.get(p).align({point:'50% 50%', elementPoint:elPoint, element:el, duration:0});


  var tl = new TimelineMax();
  tl.to(p, 3, {
    //paused:true,
    physics2D: {
      velocity: 80,
      //angle:(deg % 2) ? deg : deg - 180,//randomBetween(-95, -85),
      //angle: (particleCount % 2) ? -lineGroup._gsTransform.rotation : 180 - lineGroup._gsTransform.rotation,
      //angle:-23,
      angle:-el._gsTransform.rotation,
      gravity: 80
    },

    //scale:0,
    //rotation:randomBetween(180, 780),
    onComplete: completeParticle,
    onCompleteParams: [p],
    attr: {
      rx: 0,
      ry:0
    },
    alpha: 0,
    //skewY:(Math.random() * 180),
    ease: Expo.easeOut
   // ease: Linear.easeNone
      //onStart:flicker,
      //onStartParams:[p]

  })
  particleCount++;

  particleCount = (particleCount >= numParticles) ? 0 : particleCount;

  //console.log(d)
}

function completeParticle(p) {
  TweenMax.set(p, {
    x: -100,
    y: -100,
    alpha: 0.5,
    attr: {
      rx: dotRadius,
      ry:dotRadius
    },
    stroke:dot.getAttribute('stroke'),
    strokeWidth:dot.getAttribute('stroke-width'),
    fill:dot.getAttribute('fill')
  })
}
function hitDot(){
    TweenMax.set(particlePool[particleCount], {
      //fill:'#FFF',
      strokeWidth:10,
      //stroke:'#CFD3DC',
      alpha:0.4
    })
  }

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

createParticle();

bothTl.timeScale(1.6);
TweenMax.globalTimeScale(1)
//ScrubGSAPTimeline(bothTl)