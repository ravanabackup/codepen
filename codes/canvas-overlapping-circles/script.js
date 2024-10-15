var canvas = document.getElementById( 'c' ),
    ctx = canvas.getContext( '2d' ),
    width = canvas.width = 300,
    height = canvas.height = 300,
    centerX = width / 2,
    centerY = height / 2,
    lineWidth = 5,
    gapWidth = 5,
    alternations = 100,
    circles = [],
    tick = 0,
    TWO_PI = Math.PI * 2;

circles.push( new Circle( '#000' ) );
circles.push( new Circle( '#f00' ) );
ctx.lineWidth = lineWidth;

function Circle( color ) {
  this.x = 0;
  this.y = centerY;
  this.color = color;
}

Circle.prototype.update = function( i ) {
  var osc = i % 2 == 0 ? Math.sin( -tick / 100 ) : Math.sin( tick / 100 );
  this.x = centerX + osc * ( width / 2 );
};

Circle.prototype.render = function( i ) {
  var radius = lineWidth;
  ctx.strokeStyle = this.color;
  for(var i = 0; i < alternations; i++ ) {
    if( i % 2 == 0 ) {
      ctx.beginPath();
      ctx.arc( this.x, this.y, radius, 0, TWO_PI );
      ctx.stroke();
      radius += lineWidth;
    } else {
      radius += gapWidth;
    }
  }
};

function update() {
  var i = circles.length;
  while( i-- ) {
    circles[ i ].update( i );
  }
}

function render() {
  ctx.clearRect( 0, 0, width,height );
  var i = circles.length;
  while( i-- ) {
    circles[ i ].render( i );
  }
}

function loop() {
  requestAnimationFrame( loop );
  update();
  render();
  tick++;
}

loop();