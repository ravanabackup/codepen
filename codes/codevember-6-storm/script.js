var width, height
var step = 0;
var canvas = document.createElement('canvas')
var canvas2 = document.createElement('canvas')
var canvas3 = document.createElement('canvas')
var ctx = canvas.getContext('2d')
var ctx2 = canvas2.getContext('2d')
var ctx3 = canvas3.getContext('2d')
var bg = [13, 27, 34]



// document.getElementsByTagName('body')[0].appendChild(canvas)
// document.getElementsByTagName('body')[0].appendChild(canvas2)
document.getElementsByTagName('body')[0].appendChild(canvas3)

// mouse coordinates
// var mousex = window.innerWidth / 2, mousey = window.innerHeight;
// document.onmousedown = function(e){
//   // pt = pt === pt1 ? pt2 : pt1
//   pt1.x = e.pageX;
//   pt1.y = e.pageY;
// }
document.onmousemove = function(e){
  pt2.x = e.pageX;
  pt2.y = e.pageY;
}
var pt1 = {x:window.innerWidth*0.5, y:window.innerHeight*0.1}
var pt2 = {x:window.innerWidth*0.5, y:window.innerHeight*0.8}
    
window.addEventListener('resize', setup)

setup()

function setup() {
  canvas3.width = canvas2.width = canvas.width = width = window.innerWidth
  canvas3.height = canvas2.height = canvas.height = height = window.innerHeight
  
  ctx.beginPath();
  ctx.rect(0, 0, width, height)
  // ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${1})`
  ctx.fillStyle = `rgba(0, 0, 0, ${1})`
  ctx.fill()
  
  ctx2.beginPath();
  ctx2.rect(0, 0, width, height)
  // ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${1})`
  ctx2.fillStyle = `rgba(0, 0, 0, 1)`
  ctx2.fill()
  
  ctx3.beginPath();
  ctx3.rect(0, 0, width, height)
  // ctx3.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${1})`
  ctx3.fillStyle = `rgba(0, 0, 0, 1)`
  ctx3.fill()
  
  pt1 = {x:window.innerWidth*0.5, y:window.innerHeight*0.1}
  // pt1 = {x:window.innerWidth*0.2, y:window.innerHeight*0.2}
  pt2 = {x:window.innerWidth*0.5, y:window.innerHeight*0.8}
  // draw()
}

setInterval(animate, 60)
// window.requestAnimationFrame(animate);
// animate()

function blur(ctx,canvas,amt) {
  ctx.filter = `blur(${amt}px)`
  ctx.drawImage(canvas, 0, 0)
  ctx.filter = 'none'
}

function fade(ctx, amt, width, height, color) {
  ctx.beginPath();
  ctx.rect(0, 0, width, height)
  // ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${amt})`
  ctx.fillStyle = color || `rgba(0, 0, 0, ${amt})`
  ctx.fill()
}

function animate() {
  step++
  
  blur(ctx, canvas, 1)
  draw()
  blur(ctx2, canvas2, 5)
  fade(ctx, 0.17, width, height, `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${0.3})`)
  fade(ctx, 0.17, width, height)
  fade(ctx2, 0.2, width, height)
  
  // pt2.x += (Math.random() - 0.5) * 15
  // window.requestAnimationFrame(function(){animate()})
  // ctx3.globalCompositeOperation = "normal";
  // ctx3.drawImage(canvas3, 0, -0.001);
  // fade(ctx3, 0.19, width, height)
  ctx3.globalCompositeOperation = "normal";
  ctx2.globalAlpha = 0.8;
  ctx3.drawImage(canvas, 0, 0);
  // fade(ctx3, 0.19, width, height)
  ctx3.globalCompositeOperation = "screen";
  ctx3.drawImage(canvas2, 0, 0);
  
  if (Math.random() > 0.8){
    pt1 = {
      x:window.innerWidth * (0.6 * Math.random() + 0.3),
      y:window.innerHeight * (0.1 * Math.random() + 0.1)
    }
    pt2 = {
      x:window.innerWidth * (0.8 * Math.random() + 0.2),
      y:window.innerHeight * (0.25 * Math.random() + 0.7)
    }
  }
}

function draw () {
  var iterations = [pt1, pt2]
  var newiterations, i, j
  for (i = 0; i < 6; i++) {
    newiterations = [iterations[0]]
    for(j = 1; j < iterations.length; j++) {
      newiterations.push(getRandMidpoint(iterations[j-1], iterations[j], 200/(i*i+1)))
      newiterations.push(iterations[j])
    }
    iterations = newiterations.concat([])
  }
  ctx.beginPath();
  ctx.moveTo(iterations[0].x, iterations[0].y);
  ctx.lineWidth = 0.3;
  // ctx.strokeStyle = `hsla(${Math.sin( step / 30) * 50 + 200},${90}%,${70}%,1)`
  var ii = 0
  for (i = 1; i < iterations.length; i++) {
    ii = i / iterations.length
    ctx.moveTo(iterations[i-1].x, iterations[i-1].y);
    ctx.lineTo(iterations[i].x, iterations[i].y);
    ctx.strokeStyle = `hsla(${Math.sin( step  / 30) * 50 + 220}, ${90}%, ${60 + Math.random()*4}%, 1)`;
    ctx.lineWidth = ( Math.sin(ii * Math.PI )+ 0.5) * (Math.cos(ii*11)* 0.5 + 0.7) *( Math.cos( step % 15  / 1.2) * 1.3) + 0.4;
    
    ctx.stroke()
    ctx.beginPath();
  }
  ctx.closePath();
  
  for (j = 0; j < 20 + window.innerWidth/20; j ++){
    ctx2.beginPath();
    ctx2.ellipse(window.innerWidth*(Math.random() * 0.8 + 0.1) ,15 + Math.random() * 70, 50 + Math.random() * 30, 20, 0, 0, 2*Math.PI);
    ctx2.fillStyle = `hsla(230, 20%, ${20+Math.random()*10}%, 0.14)`;
    ctx2.fill();
    ctx2.closePath();
  }
}

function getRandMidpoint(pa, pb, range) {
  var a = Math.atan2(pb.y-pa.y, pb.x-pa.x) + Math.PI/2
  var n = Math.random() * 0.4 + 0.3
  var half = {y:(pb.y-pa.y)*n + pa.y, x:(pb.x-pa.x)*(1 - n) + pa.x}
  var offset = (Math.random()-0.5) * range 
  var ho = {
    x: Math.cos(a) * offset + half.x,
    y: Math.sin(a) * offset + half.y
  }
  return ho
}