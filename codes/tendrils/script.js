var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
    oDot = select('.orangeDot'), bDot = select('.blueDot'), wDot = select('.whiteDot'),
    dotsArr = [oDot, bDot, wDot],
    lineArr = selectAll('.tendrils path'),
    num = lineArr.length,
    dotContainer = select('.dotContainer'),
    pathArr = []
  
CustomEase.create("creep", "M0,0 C0.018,0.318 0.04,0.97 1,1");
CustomEase.create("drop", "M0,0 C0.172,0 0.952,-0.082 1,1")
TweenMax.set('svg', {
  visibility: 'visible'
})

var mainTl = new TimelineMax({repeat:-1, yoyo:true, repeatDelay:1});
var introTl = new TimelineMax();
introTl
 .to('.centerDot',1, {
 attr:{
  rx:36,
  ry:36
 },
 strokeWidth:50,
 fill:'#ff5d55',
 stroke:'#ff5d55',
 ease:'drop'
})
.staggerTo('.centerPulse', 3, {
 cycle:{
  stroke:['#7AC8F0','#ff5d55','#ededed']
 },
 attr:{
  r:230
 },
 strokeWidth:0,
 
 alpha:0,
 ease:Expo.easeOut
}, 0.196,'-=0.051')

mainTl.add(introTl);

function createPaths(){
 
 TweenMax.set('.whole', {
  //rotation:randomBetween(0, 360),
  transformOrigin:'50% 50%'
 })
 var path, dot, dur, line, rot, g ;
 for(var i = 0; i < num; i++){
  g = document.createElementNS(xmlns, 'g');
  dotContainer.appendChild(g);
  
  line = lineArr[i];
  line.setAttribute('stroke', '#ededed');
  line.setAttribute('stroke-width', '0.75');
  line.setAttribute('fill', 'none');
   path = MorphSVGPlugin.pathDataToBezier(line.getAttribute('d'), {
    offsetX: 0,
    offsetY: 0
 })
  g.appendChild(line);
  dot = createDot();
  g.appendChild(dot);
  dur = randomBetween(40, 80)/10;
  rot = randomBetween(50, 70);
  
  TweenMax.set(dot, {
   attr:{
    r:randomBetween(30, 90)/10
   },
   x:path[0].x,
   y:path[0].y
  })
  
  
  
  var tl = new TimelineMax();
  tl.to(dot, dur, {
    bezier: {
      type: "cubic",
      values: path,
      autoRotate: false
    },
    ease: 'creep'
  })  
.from(line, dur, {
    drawSVG:'0% 0%',
    ease: 'creep'
  },'-='+dur)  
 .to(g,dur, {
   rotation:rot,
   svgOrigin:'400 300',
    ease: 'creep'
  },'-=' + dur) 
  
  mainTl.add(tl, 1);
    
 } 
 
 
}


function createDot(){
 var r = Math.floor(Math.random()*3);
 return dotsArr[r].cloneNode(true);
}


createPaths()

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}