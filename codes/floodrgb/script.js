console.clear();

let pointsToDo = [];
let pointsDone = [];
let dotSize = 3;
const colorShift = 30;
const count = 1000;
let max = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  let x = floor(width/2);
  let y = floor(height/2);
  max = (width/dotSize) * (height/dotSize);
  pointsToDo.push({
    x: x,
    y: y
  });
}

function draw() {
  for(var i = 0; i < count; i++) {
    iterate();
  }
}

function iterate() {
  if(pointsToDo.length > 1) {
    console.log("-----------")  
  }
  if(pointsToDo.length == 0 ) {
    return false
  }
  const num = floor(random(pointsToDo.length));
  const p = pointsToDo[num];
  
  // console.log(p);
  doneNeighbours = getDoneNeighbours(p);
  // console.log({doneNeighbours})  
  let r = 255;
  let g = 255;
  let b = 255;
  if(doneNeighbours.length != 0) {
    r = getHue(doneNeighbours, "r");
    g = getHue(doneNeighbours, "g");
    b = getHue(doneNeighbours, "b");
  }
  p.r = r;
  p.g = g;
  p.b = b;
  strokeWeight(dotSize);
  stroke(p.r, p.g, p.b);
  // stroke(p.r);
  ellipse(p.x, p.y,dotSize,dotSize);
  // console.log({p})
  // console.log({pointsDone})
  pointsDone.push({
    x: p.x,
    y: p.y,
    r: p.r,
    g: p.g,
    b: p.b,
  });
  // console.log({pointsDone})
  pointsToDo.splice(num,1);
  
  // console.log({doneNeighbours})
  
  // console.log("pointsDone", pointsDone.sort((a,b) => a.y - b.y).sort((a,b) => a.x - b.x))
  // console.log("pointsToDo", pointsToDo)
}
function getHue(points, channel) {
  let c = 0;
  points.forEach(p => c += p[channel]);
  c = c / points.length;
  c += floor(random(colorShift) - (colorShift*.5));
  if(c < 0) c = 0;
  if(c > 255) c = 255;
  
  return c;
}
function getDoneNeighbours(p) {
  let x = p.x;
  let y = p.y;
  let arr = [];
  
  // top left
  if(x > 0 && y > 0 ) {
    chooseToAdd(p, {
      x: x-dotSize,
      y: y-dotSize
    }, arr)
    console.log(arr.length)
  }
  // top center
  if(y > 0 ) {
    chooseToAdd(p, {
      x: x,
      y: y-dotSize
    }, arr)
    console.log(arr.length)
  }
  // top right
  if(x < (width + dotSize) && y > 0 ) {
    chooseToAdd(p, {
      x: x+dotSize,
      y: y-dotSize
    }, arr)
    console.log(arr.length)
  }
  // right right
  if(x < (width + dotSize) ) {
    chooseToAdd(p, {
      x: x+dotSize,
      y: y
    }, arr)
    console.log(arr.length)
  }
  // bottom right
  if(x < (width + dotSize) && y < (height + dotSize) ) {
    chooseToAdd(p, {
      x: x+dotSize,
      y: y+dotSize
    }, arr)
    console.log(arr.length)
  }
  // bottom center
  if(y < (height + dotSize) ) {
    chooseToAdd(p, {
      x: x,
      y: y+dotSize
    }, arr)
    console.log(arr.length)
  }
  // bottom left
  if(x > 0 && y < (height + dotSize) ) {
    chooseToAdd(p, {
      x: x-dotSize,
      y: y+dotSize
    }, arr)
    console.log(arr.length)
  }
  // left left
  if(x > 0) {
    chooseToAdd(p, {
      x: x-dotSize,
      y: y
    }, arr)
    console.log(arr.length)
  }
  return arr;
}
function chooseToAdd(p, np, arr) {
  // debugger;
    let found = pointsDone.find(p => p.x == np.x && p.y == np.y);
    if(found == undefined) {
      found = pointsToDo.find(p => p.x == np.x && p.y == np.y);
      if(found == undefined) {
        return pointsToDo.push(np);
      }
    } else {
      return arr.push(found);
    }
}