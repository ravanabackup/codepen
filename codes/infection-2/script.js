(function(){
  'use strict';
  // Configuration options
  var opts = {
    background: 'black',
    numberOrbs: 200, // increase with screen size.  50 to 100 for my 2560 x 1400 monitor
    maxVelocity: 4, // increase with screen size--dramatically affects line density.  2 for me
    orbRadius: 1, // keep small unless you really want to see the dots bouncing. I like <= 1.
    minProximity: 125, // controls how close dots have to come to each other before lines are traced
    initialColorAngle: 7, // 7 initializes the color phaser on red -- not used in this animation
    colorFrequency: 0.3, // 0.3 initializes the color phaser on red and provides a nice rate -- not used in this animation
    colorAngleIncrement: 0.009, // 0.009 is slow and even -- not used in this animation
    globalAlpha: 0.05, // controls alpha for lines, but not dots (despite the name), 0.006 default
    maxInfectionAmount: 600, // 1 = 1 frame
    uninfectedColor: 'rgba(255, 255, 255, 0.5)',
    infectedColor: 'rgba(150, 30, 200, 0.55)',
    healedColor: 'rgba(20, 190, 180, 0.55)',
    // infectedColor: 'rgba(63, 127, 191, 0.55)',
    // healedColor: 'rgba(61, 239, 156, 0.55)',
    firstInfectedSpeed: 1, // keep it slow so he can infect something in a timely manner
    healedThreshold: 300, // above this amount and a healed guy becomes unhealed, but not yet infected
    healIncrement: 3.00 // how much infection is healed per frame per healer in proximity
  };
  
  // Canvas globals
  var canvasTop, linecxt, canvasBottom, cxt, width, height, animationFrame;

  // Global objects
  var orbs;
  
  // Orb object - these are the guys that bounce around the screen.
  // We will draw lines between these dots, but that behavior is found
  // to the Orbs container object.
  var Orb = (function() {
  
    // Constructor
    function Orb(radius, color, infected, healed) {
      this.radius = radius;
      this.color = color;
      this.infected = infected;
      this.healed = healed;
      this.infectionAmount = 0;
      this.uninfectable = false;
      
      if (infected) {
        this.radius = 3 * radius;
        this.color = opts.infectedColor;
        this.infectionAmount = opts.MaxInfectionAmount;
        this.uninfectable = true;
      }
      
      if (healed) {
        this.radius = 3* radius;
        this.color = opts.healedColor;
        this.infectionAmount = 0;
        this.uninfectable = true;
      }
      
      var posX = randBetween(0, width);
      var posY = randBetween(0, height);
      this.position = new Vector(posX, posY);
      
      var velS = this.uninfectable ? opts.firstInfectedSpeed : randBetween(0, opts.maxVelocity); // Velocity scalar
      this.velocity = Vector.randomDirection().multiply(velS).noZ();
      

    }
    
    // Orb methods
    Orb.prototype = {
      update: function() {
        // position = position + velocity
        this.position = this.position.add(this.velocity);
        
        // bounce if the dot reaches the edge of the container.
        // this can be EXTREMELY buggy with large dot radiuses, but it works for this
        // drawing.
        if (this.position.x + this.radius >= width || this.position.x - this.radius <= 0) {
          this.velocity.x = this.velocity.x * -1;
        }
        if (this.position.y + this.radius >= height || this.position.y - this.radius <= 0) {
          this.velocity.y = this.velocity.y * -1;
        }
      },
      display: function() {
        cxt.beginPath();
        cxt.fillStyle = this.color;
        cxt.ellipse(this.position.x, this.position.y, this.radius, this.radius, 0, 0, 2*Math.PI, false);
        cxt.fill();
        cxt.closePath();
      },
      run: function() {
        this.update();
        this.display();
      },
      buildInfection: function() {
        if (this.infectionAmount < opts.maxInfectionAmount && this.uninfectable === false && this.infected === false) {
          this.infectionAmount++;
        }
        if (this.infectionAmount >= opts.healedThreshold && this.infected === false) {
          this.healed = false;
          this.color = opts.uninfectedColor;
        }
        if (this.infectionAmount >= opts.maxInfectionAmount) {
          this.infected = true;
          this.color = opts.infectedColor;
        }
      },
      healInfection: function() {
        if (this.infected && this.infectionAmount > 0 && this.uninfectable === false) {
          this.infectionAmount -= opts.healIncrement;
          if (this.infectionAmount <= 0) {
            this.infected = false;
            this.healed = true;
            this.color = opts.healedColor;
          }
        }
      }
    };
    
    return Orb;
  })();
  
  // Orbs object - this is a container that manages all of the individual Orb objects.
  // In addition, this object holds the color phasing and line-drawing functionality,
  // since it already iterates over all the orbs once per frame anyway.
  var Orbs = (function() {
  
    // Constructor
    function Orbs(numberOrbs, radius, initialColorAngle, globalAlpha, colorAngleIncrement, colorFrequency) {
      this.orbs = [];
      this.colorAngle = initialColorAngle;
      this.colorAngleIncrement = colorAngleIncrement;
      this.globalAlpha = globalAlpha;
      this.colorFrequency = colorFrequency;
      this.color = opts.uninfectedColor;
      
      for (var i = 0; i < numberOrbs; i++) {
        var infected = i === 0 ? true : false; // 1st guy is Patient Zero
        var healed = i === 1 ? true: false; // 2nd guy is Nurse Zero
        this.orbs.push(new Orb(radius, this.color, infected, healed)); 
      }
    }
    
    Orbs.prototype = {
      run: function() {
        //this.phaseColor();
        for (var i = 0; i < this.orbs.length; i++) {
          for (var j = i + 1; j < this.orbs.length; j++) {
            // we only want to compare this orb to orbs which are further along in the array,
            // since any that came before will have already been compared to this orb.
            this.compare(this.orbs[i], this.orbs[j]);
          }
          this.orbs[i].run();
        }
      },
      // this compares the state of two orbs - itcould be cleaned up and DRY'd out quite a bit
      compare: function(orbA, orbB) {
        // Get the distance between the two orbs.
        var distance = Math.abs(orbA.position.subtract(orbB.position).length());
        if (distance <= opts.minProximity) {

          // if either orb is infected, build up infection (in both, for simplicity right now)
          if (orbA.infected || orbB.infected) {
            orbA.buildInfection();
            orbB.buildInfection();
          }
          // if one is healed, lets just go ahead and heal both to make this simple (refactor later)
          if ((orbA.healed && orbB.infected) || (orbA.infected && orbB.healed)) {
            orbA.healInfection();
            orbB.healInfection();
          }
          // but if BOTH are infected, lets link them...
          if (orbA.infected && orbB.infected) {
            linecxt.beginPath();
            linecxt.strokeStyle = opts.infectedColor;
            linecxt.globalAlpha = this.globalAlpha;
            linecxt.moveTo(orbA.position.x, orbA.position.y);
            linecxt.lineTo(orbB.position.x, orbB.position.y);
            linecxt.stroke();
            linecxt.closePath();
          }  
          // ...likewise if both are healed
          if (orbA.healed && orbB.healed) {
            linecxt.beginPath();
            linecxt.strokeStyle = opts.healedColor;
            linecxt.globalAlpha = this.globalAlpha;
            linecxt.moveTo(orbA.position.x, orbA.position.y);
            linecxt.lineTo(orbB.position.x, orbB.position.y);
            linecxt.stroke();
            linecxt.closePath();
          }  
        }
      },
      phaseColor: function() {
        // color component = sin(freq * angle + phaseOffset) => (between -1 and 1) * 127 + 128
        var r = Math.floor(Math.sin(this.colorFrequency*this.colorAngle + Math.PI*0/3) * 127 + 128);
        var g = Math.floor(Math.sin(this.colorFrequency*this.colorAngle + Math.PI*2/3) * 127 + 128);
        var b = Math.floor(Math.sin(this.colorFrequency*this.colorAngle + Math.PI*4/3) * 127 + 128);
        this.color = 'rgba(' + r + ', ' + g + ', ' + b + ', 1)';
        this.colorAngle += this.colorAngleIncrement;
      }
    };
     
    return Orbs;
  })();
  
  // This function is called once and only once to kick off the code.
  // It links DOM objects like the canvas to the respective global variable.
  function initialize() {
    canvasBottom = document.querySelector('#canvas-bottom'); // this canvas is for the dots that bounce around
    canvasTop = document.querySelector('#canvas-top'); // this canvas is for the lines between dots
    cxt = canvasBottom.getContext('2d');
    linecxt = canvasTop.getContext('2d');

    window.addEventListener('resize', resize, false);
    resize();
  }
  
  // This function is called after initialization and window resize.
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    // width = 2560;
    // height = 1440;
    setup();
  }
  
  // after window resize we need to 
  function setup() {
    canvasBottom.width = width;
    canvasBottom.height = height;
    canvasTop.width = width;
    canvasTop.height = height;
    //fillBackground(linecxt); // Enable this line if you want to save an image of the drawing.
    fillBackground(cxt);
    orbs = new Orbs(opts.numberOrbs, opts.orbRadius, opts.initialColorAngle, opts.globalAlpha, opts.colorAngleIncrement, opts.colorFrequency);
    // If we hit this line, it was either via initialization procedures (which means animationFrame is undefined)
    // or through window resize, in which case we need to cancel the old draw loop and make a new one.
    if (animationFrame !== undefined) { cancelAnimationFrame(animationFrame); } 
    draw();
  }
  
  // Notice that we only fillBackground on one of the two canvases.  This is because we want to animate
  // the dot layer (we don't want to leave trails left by the dots), but preserve the line layer.
  function draw() {
    fillBackground(cxt);
    orbs.run();
    // Update the global animationFrame variable -- this enables to cancel the redraw loop on resize
    animationFrame = requestAnimationFrame(draw);
  }
  
  // generic background fill function
  function fillBackground(context) {
    context.fillStyle = opts.background;
    context.fillRect(0, 0, width, height);
  }
  
  // get random float between two numbers, inclusive
  function randBetween(low, high) {
    return Math.random() * (high - low) + low;
  }
  
  // get random INT between two numbers, inclusive
  function randIntBetween(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }
  
  // Start the code already, dammit!
  initialize();
})();