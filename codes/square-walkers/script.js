(function() {
  'use strict';
  
  // Drawing-specific globals
  var gridSpacing = 15;
  var dotRadius = 1;
  var endDotRadius = 0;
  var lineWidth = 5;
  var numWalkers = 3;
  var backgroundColor = "rgba(  0, 0,  0, 1)" // dark-blue;
  var replay = false;
  var palette = [
    "//rgba(255, 255, 255, 1)", // white
    // "rgba(  0,   0,   0, 1)", // black
    // "rgba(255,   0,   0, 0.55)", // red
    // "rgba(255, 167,  30, 0.55)",  // orange
    // "rgba(255, 255,   0, 0.55)",  // yellow
    //"rgba(118, 243, 181, 0.55)", // light green
    //"rgba(  0, 225,   0, 0.55)", // green
    "rgba( 26, 106,  66, 0.55)", // dark green
    "rgba( 35, 255, 244, 0.55)", // light blue
    "rgba( 88, 163, 237, 0.55)", // blue
    "rgba(  0,  86,  82, 0.55)", // dark blue
     "rgba(180,   0, 180, 0.55)", // purple
  ];

  // Canvas Globals
  var canv = document.getElementById('canvas');
  var ctx = canv.getContext('2d');
  var width = window.innerWidth;
  var height = window.innerHeight;
  var animationFrame;
  window.addEventListener('resize', resizeCanvas, false);

  // Pixel image for visualizing the grid (this will enable us to plot colored pixels at all the nodes).
  var pixel = ctx.createImageData(1, 1);
  var pixelData = pixel.data;
  pixelData[0] = 255; //r
  pixelData[1] = 255; //g
  pixelData[2] = 255; //b
  pixelData[3] = 255; //a

  // Node object keeps keeps the (i,j) -> (x, y) mapping and whether or not it has been visited
  var Node = (function() {

    // Constructor
    function Node(i, j) {
      this.x = i * gridSpacing;
      this.y = j * gridSpacing;
      this.visited = false;
    }

    // Node methods
    Node.prototype = {
      // Draw a small dot at each node location.
      display: function() {
        ctx.putImageData(pixel, this.x, this.y);
      }
    };

    return Node;
  })();

  // Grid object contains a window-filling i x j grid based on the global gridSpacing var.  Contents of grid map to (x, y) accordingly.  Each Grid is a collection of Nodes.
  var Grid = (function() {
    // Constructor
    function Grid() {
      this.grid = [];
      this.unvisitedNodes = [];
      this.unvisitedNodeCount = 0;

      for (var i = 0; i <= width / gridSpacing; i++) {
        this.grid[i] = [];
        for (var j = 0; j <= height / gridSpacing; j++) {
          this.grid[i][j] = new Node(i, j);
        }
      }
      this.unvisitedNodeCount = (this.grid.length) * (this.grid[0].length);
    }

    // Grid Methods
    Grid.prototype = {
      display: function() {
        for (var i = 0; i < this.grid.length; i++) {
          for (var j = 0; j < this.grid[0].length; j++) {
            this.grid[i][j].display();
          }
        }
      },
      visit: function(i, j) {
        this.grid[i][j].visited = true;
        this.unvisitedNodeCount -= 1;
      }
    };

    return Grid;
  })();

  // Walker object
  var Walker = (function() {

    // Constructor
    function Walker(i, j, grid, isRandomSpawn) {
      this.prevI = null;
      this.prevJ = null;
      this.fillColor = getRandomColor();

      if (isRandomSpawn) {
        var cont = false;
        while (!cont) {
          var testI = getRandomInt(0, grid.grid.length - 1);
          var testJ = getRandomInt(0, grid.grid[0].length - 1);
          if (!grid.grid[testI][testJ].visited) {
            this.i = testI;
            this.j = testJ;
            cont = true;
          }
        }
      } else {
        this.i = i;
        this.j = j;
      }

      this.prevI = this.i;
      this.prevJ = this.j;
      grid.visit(this.i, this.j);
      this.dead = false;
      this.display(grid);
    }

    // Walker methods
    Walker.prototype = {
      run: function(grid) {
        this.chooseNode(grid);
        this.display(grid);
      },
      chooseNode: function(grid) {
        var possibleNodes = [];
        for (var i = -1; i <= 1; i += 2) {
          var testI = this.i + i;
          if (testI >= 0 && testI <= grid.grid.length - 1) {
            if (grid.grid[testI][this.j].visited === false) {
              possibleNodes.push([testI, this.j]);
            }
          }
        }
        for (var j = -1; j <= 1; j += 2) {
          var testJ = this.j + j;
          if (testJ >= 0 && testJ <= grid.grid[0].length - 1) {
            if (grid.grid[this.i][testJ].visited === false) {
              possibleNodes.push([this.i, testJ]);
            }
          }
        }
        if (possibleNodes.length > 0) {
          var nextNode = getRandomInt(0, possibleNodes.length - 1);
          var nextI = possibleNodes[nextNode][0];
          var nextJ = possibleNodes[nextNode][1];
          this.walk(nextI, nextJ, grid);
        } else {
          this.die();
        }
      },
      walk: function(i, j, grid) {
        this.prevI = this.i;
        this.prevJ = this.j;
        this.i = i;
        this.j = j;
        grid.visit(this.i, this.j);
      },
      display: function(grid) {
        // draw something that represents the transition motion from A(i, j) -> B(i, j).
        ctx.beginPath();
        ctx.arc(grid.grid[this.i][this.j].x, grid.grid[this.i][this.j].y, dotRadius, 0, 2 * Math.PI);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.closePath();
        if (this.i != this.prevI || this.j != this.prevJ) {
          ctx.beginPath();
          ctx.lineJoin = 'round';
          ctx.strokeStyle = this.fillColor;
          ctx.lineWidth = lineWidth;
          ctx.moveTo(grid.grid[this.prevI][this.prevJ].x, grid.grid[this.prevI][this.prevJ].y);
          ctx.lineTo(grid.grid[this.i][this.j].x, grid.grid[this.i][this.j].y);
          ctx.stroke();
          ctx.closePath();
        }
      },
      die: function() {
        this.dead = true;
        ctx.beginPath();
        ctx.arc(grid.grid[this.i][this.j].x, grid.grid[this.i][this.j].y, endDotRadius, 0, 2 * Math.PI);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.closePath();
      }
    };

    return Walker;
  })();

  // Walkers object - basically an array of walkers with an iterator method
  var Walkers = (function() {

    // Constructor
    function Walkers(numWalkers, grid) {
      this.walkers = [];
      var maxWalkers = grid.grid.length * grid.grid[0].length;
      if (numWalkers > maxWalkers) {
        numWalkers = maxWalkers;
      }
      for (var i = 0; i < numWalkers; i++) {
        this.walkers[i] = new Walker(0, 0, grid, true);
      }
    }

    // Walkers methods
    Walkers.prototype = {
      run: function(grid) {
        for (var i = 0; i < this.walkers.length; i++) {
          if (!this.walkers[i].dead) {
            this.walkers[i].run(grid);
          } else if (grid.unvisitedNodeCount > 0) {
            this.walkers[i] = new Walker(0, 0, grid, true);
            this.walkers[i].run(grid);
          } 
        }
      }
    };
    return Walkers;
  })();

  // Initialize grid object (how can I move this and all other future objects out of global scope?)
  var grid = new Grid();
  var walkers = new Walkers(numWalkers, grid);
  // Auto-executing setup function.  Prep the canvas and call the initial requestAnimationFrame.
  function setup() {
    fillBackground(backgroundColor);
    grid.display();
    if (animationFrame) { cancelAnimationFrame(animationFrame); }
    requestAnimationFrame(draw);
  }

  // This repeats on a requestAnimationFrame loop
  function draw() {
    if (grid.unvisitedNodeCount > 0) {
      walkers.run(grid);
      animationFrame = requestAnimationFrame(draw); // loop - disable this line to disable animation
    } else {
      if (replay === true) {
        grid = new Grid();
        walkers = new Walkers(numWalkers, grid);
        setup();
      } else {
        //window.alert('Done!');
        console.log('end');
      }
    }
  }

  // Draw a rectangle of some color for the background
  function fillBackground(color) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Reset all objects upon resize
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canv.width = width;
    canv.height = height;
    grid = new Grid();
    setup();
  }

  // This is used throughout the program to return a random number between a min and a max value.
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Simple implementation
  function getRandomColor() {
    var newColor = palette[Math.round(Math.random() * palette.length)];
    return newColor;
  }

  // this kicks off the drawing/animation
  resizeCanvas();
})();