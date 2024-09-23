var width = window.innerWidth;
var height = window.innerHeight;

var options = {
  size: 25,
  bg: 0x000000,
  thick: 1,
  color: 0xffffff,
  radius: 6,
  scale: 450,
  scaleTime: 5000
};

var cols = Math.ceil(width / options.size) + 1;
var rows = Math.ceil(height / options.size) + 1;

var app = new PIXI.Application({
  width: width,
  height: height,
  antialias: true,
  view: document.querySelector('#scene'),
  backgroundColor: options.bg
});

var container = new PIXI.Container();
app.stage.addChild(container);

function createDots () {
  container.children = [];
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var dot = new PIXI.Graphics();
      dot.beginFill(options.color);
      dot.drawCircle(0, 0, options.radius);
      dot.endFill();
      container.addChild(dot);
      
      dot.x = x * options.size;
      dot.y = y * options.size;
      dot.smallX = dot.x / options.scale;
      dot.smallY = dot.y / options.scale;
    }
  }
}
createDots();

function updateLines () {
  var time = app.ticker.lastTime / options.scaleTime;
  for (var i = 0; i < container.children.length; i++) {
    var dot = container.children[i];
    var perlin = (noise.simplex3(dot.smallX, dot.smallY, time) * 6);
    dot.alpha = Math.abs(perlin);
  }
}

app.ticker.add(updateLines);
function onResize () {
  width = window.innerWidth;
  height = window.innerHeight;

  cols = Math.ceil(width / options.size) + 1;
  rows = Math.ceil(height / options.size) + 1;
  
  app.renderer.resize(width, height);
  
  createDots();
}
var debounce = null;
window.addEventListener('resize', function () {
  debounce = window.clearTimeout(debounce);
  debounce = setTimeout(onResize, 200);
});