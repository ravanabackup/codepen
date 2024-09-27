var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  particlePool = [],
  mainSVG = select('.mainSVG'),
  lineGroup = select('.lineGroup'),
  allLines = selectAll('.lineGroup g'),
  pContainer = select('.pContainer'),
  particleCount = 0,
  numParticles = 600,
  dotRadius = 3,
  dot = select('#dot'),
  trailPointArray = ['2 350', '2 300', '0 230', '2 130', '2 40']

TweenMax.set('svg', {
  visibility: 'visible'
})

TweenMax.set(dot, {
  attr: {
    r: dotRadius
  },
  transformOrigin:'50% 50%',
  fill: '#FFF'
})

TweenMax.set(allLines, {
  transformOrigin:'50% 0%'
})

TweenMax.set(lineGroup, {
  y:'+=100',
  transformOrigin:'50% 50%'
})

function createJetParticle() {
  var p, d = select('#dot');
  for (var i = 0; i < numParticles; i++) {

    p = d.cloneNode(true);
    pContainer.appendChild(p);
    particlePool.push(p);
    TweenMax.set(p, {
      transformOrigin: '50% 50%',
      x:-20,
      y:-20
    })
  }
}

function playJetParticle() {
  var p = particlePool[particleCount], count =  particleCount % allLines.length;
  var elPoint = trailPointArray[count], el = select('#line' + ((count) +1));

  CSSTransform.get(p).align({point:'50% 50%', elementPoint:elPoint, element:el, duration:0});


  var tl = new TimelineMax();
  tl.to(p, 2, {
    physics2D: {
      velocity: 10,
      angle:el._gsTransform.rotation,
      gravity: -20
    },

    onComplete: completeParticle,
    onCompleteParams: [p],
    attr: {
      r: 0
    }


  })
  particleCount++;

  particleCount = (particleCount >= numParticles) ? 0 : particleCount;

}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
createJetParticle();


TweenMax.staggerFromTo(allLines, 10, {
  rotation:-360
},{
  rotation:360,
  cycle:{
    duration:function(i){
      return 30 - (2 * (i+2))
    }
  },
  repeat:-1,
  yoyo:false,
 // ease:Elastic.easeInOut.config(0.6, 0.7),
  ease:Anticipate.easeIn,
  onUpdate:playJetParticle
},0.3)

function completeParticle(p) {
  TweenMax.set(p, {
    x: -10,
    y: -10,
    alpha: 1,
    attr: {
      r: dotRadius
    }
  })
}

TweenMax.to(lineGroup, 23, {
  rotation:'-=360',
  repeat:-1,
  ease:Linear.easeNone
})

 function streamTrack(){
  
  SC.stream('/tracks/226730091').then(function(player){
if (player.options.protocols[0] === 'rtmp') {
        player.options.protocols.splice(0, 1);
    }    
    player.play();
  });  

   
}

SC.initialize({
    client_id: '516b790a82b7c6d89856376fa4ced361',
    redirect_uri: 'https://storymore/soundcloud'
  });


 streamTrack();