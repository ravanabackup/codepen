/*

Slices by Drew Dahlman 2016
Inspired by https://25.media.tumblr.com/tumblr_mai8ucdVbd1qzw1qyo1_500.gif

Quick and dirty hack.

*/

// Data
var shape_data = [
  // Bottom Left #1
  {
    x: 137,
    y: 347,
    direction: "none",
    current_x: 0,
    current_y: 0
  },
  // Top Center #2
  {
    x: 250,
    y: 153,
    direction: "none",
    current_x: 0,
    current_y: 0
  },
  // #3
  {
    x: 271.6,
    y: 190.3,
    direction: "none",
    current_x: 0,
    current_y: 0
  },
  // #4
  {
    x: 271.6,
    y: 190.3,
    direction: "up",
    current_x: 0,
    current_y: 0
  },
  // #5
  {
    x: 301.2,
    y: 242.6,
    direction: "up",
    current_x: 0,
    current_y: 0
  },
  // #6
  {
    x: 301.2,
    y: 242.6,
    direction: "none",
    current_x: 0,
    current_y: 0
  },
  // #7 
  {
    x: 301.2,
    y: 242.6,
    direction: "down",
    current_x: 0,
    current_y: 0
  },
  // #8
  {
    x: 331,
    y: 295.1,
    direction: "down",
    current_x: 0,
    current_y: 0
  },
  // #9
  {
    x: 331,
    y: 295.1,
    direction: "none",
    current_x: 0,
    current_y: 0
  },
  // #bottom right #10
  {
    x: 362,
    y: 347,
    direction: "none",
    current_x: 0,
    current_y: 0
  },
  // #11
  {
    x: 301.2,
    y: 347,
    direction: "none",
    current_x: 0,
    current_y: 0
  },
  // #12
  {
    x: 301.2,
    y: 347,
    direction: "down",
    current_x: 0,
    current_y: 0
  },
  // #13
  {
    x: 242,
    y: 347,
    direction: "down",
    current_x: 0,
    current_y: 0
  },
  // #14
  {
    x: 242,
    y: 347,
    direction: "none",
    current_x: 0,
    current_y: 0
  },
  // #15
  {
    x: 242,
    y: 347,
    direction: "up",
    current_x: 0,
    current_y: 0
  },
  // #16
  {
    x: 182.2,
    y: 347,
    direction: "up",
    current_x: 0,
    current_y: 0
  },
  // #17
  {
    x: 182.2,
    y: 347,
    direction: "none",
    current_x: 0,
    current_y: 0
  },
  // End
  {
    x: 137,
    y: 347,
    direction: "none",
    current_x: 0,
    current_y: 0
  }
];

// Elements
var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

// Vars
var colors = ['#ffffff', '#db6428', '#382834'],
    direction = 'forward',
    tick = 0;

// Set Dimensions
canvas.height = 500;
canvas.width = 500;

// Append the canvas
document.body.appendChild(canvas);

// flicker
function flicker(min, max) {
  var p = (Math.random() * min) + max;
  return p;
}


// Shape draw
function draw_shape() {

  // Start
  ctx.beginPath();
  ctx.strokeStyle = "#d95a17";
  ctx.lineWidth = 4;

  ctx.fillStyle = "#fff";

  // Start Line work
  ctx.moveTo(shape_data[0].x, shape_data[0].y);

  // Loop over the data
  for (var i = 1; i < shape_data.length; i++) {

    var x = shape_data[i].x + shape_data[i].current_x,
        y = shape_data[i].y + shape_data[i].current_y;

    ctx.lineTo(x, y);
  }

  // Close Path
  ctx.closePath();

  // Glow
  ctx.shadowColor = "#d95a17";
  ctx.shadowBlur = flicker(8, 10);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

// Gradient draw
function draw_gradient() {
  // draw gradient
  var grd = ctx.createLinearGradient(300, 400 + flicker(50, 100), 500, 200);
  grd.addColorStop(0, colors[0]);
  grd.addColorStop(1, colors[1]);
  ctx.fillStyle = grd;
  ctx.fillRect(100, 100, 300, 300);
}

// Update
function update() {

  // update the shape!
  var move = direction == 'forward' ? [1, 1.75] : [-1, -1.75];

  // pause
  direction == '' ? move = [] : move = move;

  if (tick == 1) {

    // Loop over data and adjust values
    for (var i = 0; i < shape_data.length; i++) {
      shape_data[i].current_x = 0;
      shape_data[i].current_y = 0;
    }

  } else {

    // Loop over data and adjust values
    for (var i = 0; i < shape_data.length; i++) {
      var dir = shape_data[i].direction,
        x = shape_data[i].current_x,
        y = shape_data[i].current_y;
        
      switch (dir) {
        case "up":
          shape_data[i].current_x -= move[0];
          shape_data[i].current_y += move[1];
          break;
        case "down":
          shape_data[i].current_x += move[0];
          shape_data[i].current_y -= move[1];
          break;
      }
    }
  }

  // Call to draw
  draw();
}

// Draw
function draw() {

  // Clear the rect
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw shape
  draw_shape();
  ctx.fill();

  // Mask over the gradient
  ctx.globalCompositeOperation = "source-in";

  // gradient
  draw_gradient();

  // Allow stroke over top
  ctx.globalCompositeOperation = "destination-over";

  // Apply stroke
  ctx.stroke();

  // Kind of gross and could use some love but works
  if (direction == 'reverse' && tick >= -15 || tick <= 0) {
    tick--
    if (tick <= 0) {
      direction = '';
      if (tick <= -15) {
        direction = 'forward';
        tick = 0;
      }
    }
  }
  if (direction == 'forward' && tick <= 25) {
    tick++;
    if (tick >= 25) {
      direction = 'reverse';
    }
  }

  // Animate
  requestAnimationFrame(function() {
    update();
  });

}

// Kick things off
update()