let conf = {
  FRAME_RATE: 30,
  BG: [242, 225, 222, 150],
  // NUM: 80,
  // VELOCITY:6,
  // DRAW: true,
  // SCALE: 8,
  // LENGTH: 10,
  // HUE: 70,
};


class Layer {
  constructor() {
    this.shapes = [];
  }
  addShape(shape) {
    this.shapes.push(shape);
  }
  shapes(){
    return this.shapes;
  }
  draw() {
    this.shapes.forEach(s => s.draw());
  }
}
class Shape {
  constructor({x, y, s, r, p, co, cf}) {
    this.x = x !== undefined ? x : width / 2;
    this.y = y !== undefined ? y : height / 2;
    this.s = s !== undefined ? s : 1;
    this.co = co !== undefined ? co : [0, 0, 0, 128];
    this.cf = cf !== undefined ? cf : [255, 255, 255, 255];
    this.r = r !== undefined ? r : 0;
    this.points = p !== undefined ? p.map(pt => ({...pt})) : [];
  }
  draw(){
    let {x, y, r} = this;
    stroke(this.co);
    // noStroke()
    // fill(this.cf);
    beginShape();
    this.points.forEach(pt => {
      if (pt.cx === undefined || r !== pt.r) {
        pt.a = Math.atan2(pt.y, pt.x) + r;
        pt.d = Math.sqrt(pt.x * pt.x + pt.y * pt.y);
        pt.cx = Math.cos(pt.a) * pt.d;
        pt.cy = Math.sin(pt.a) * pt.d;
        pt.r = r;
      }
      const rx = pt.cx + x
      const ry = pt.cy + y
      if(pt.type === 'c') {
        curveVertex(rx, ry);
      } else {
        vertex(rx, ry);
      }
    })
    endShape();
  }
}

let width = 520; //window.innerWidth
let height = 520; //window.innerHeight;
let vectorField = [];

let points_1 = [
  {x:-60, y:0},
  {x:-60, y:0, type: 'c'},
  {x:-40, y:230, type: 'c'},
  {x:-70, y:280, type: 'c'},
  {x: 0, y:355, type: 'c'},
  {x:70, y:280, type: 'c'},
  {x:40, y:230, type: 'c'},
  {x:60, y:0, type: 'c'},
  {x:60, y:0},
]

let points_2 = [
  {x:-10, y:0},
  {x:-10, y:0, type: 'c'},
  {x:-45, y:30, type: 'c'},
  {x:-10, y:180, type: 'c'},
  {x:-210, y:120, type: 'c'},
  {x: 0, y:340, type: ''},
  {x:210, y:120, type: 'c'},
  {x:10, y:180, type: 'c'},
  {x:45, y:30, type: 'c'},
  {x:10, y:0, type: 'c'},
  {x:10, y:0},
]

let numShapes = 30;
let layer_1 = new Layer();
for (let i = 0; i < numShapes; i ++ ){
  let shape_1 = new Shape({
    r: Math.PI * 2 * i / numShapes,
    p: points_1,
    cf: [229, 123, 44]
  });
  layer_1.addShape(shape_1);
}

numShapes = 19
let layer_2 = new Layer();
for (let i = 0; i < numShapes; i ++ ){
  let shape_2 = new Shape({
    r: Math.PI * 2 * i / numShapes,
    p: points_2,
    cf: [229, 83, 44]
  });
  layer_2.addShape(shape_2);
}

setup = () => {
  // colorMode(HSB, 255);
  // width = window.innerWidth
  // height = window.innerHeight;
  createCanvas(width, height);
  frameRate(conf.FRAME_RATE);
  noFill();
  strokeWeight(1.4);
};

draw = () => {
  if (conf.DRAW === false) {
    return;
  }
  background(conf.BG); 
  layer_1.draw();
  layer_1.shapes.forEach(s => s.r += 0.0015)
  layer_2.draw();
  layer_2.shapes.forEach(s => s.r -= 0.0015)
}