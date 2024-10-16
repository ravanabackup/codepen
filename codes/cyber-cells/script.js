(function() {
    "use strict";
/* This is a total mess, sorry. Will clean up eventually */

    // Canvas things
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        canvasWidth = canvas.width = window.innerWidth,
        canvasHeight = canvas.height = window.innerHeight;

    // Mouse things
    var mouseX,
        mouseY,
        pop = false,
        attract = false;

    // Check if mouse event is over a bubble
    var mouseOver = function(x, y, radius) {
        var diffX = mouseX - x;
        var diffY = mouseY - y;

        if (diffX < radius && diffX > (radius * -1) && diffY < radius && diffY > (radius * -1)) {
            return true;
        }

        return false;
    }

    // Used for randomizing everything
    var randomNum = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Used for changing settings with a random number
    var changeSettings = function(setting, min, max, prob) {
        var chance = randomNum(0, prob);

        if(setting < min || chance === 1) {
            return 1;
        } else if (setting > max || chance === 2) {
            return -1;
        } else {
            return 0;
        }
    };

    // Bubble config
    var bubbles = [], // Holds all the bubbles as objects
        count = 0, // Bubble count
        maxCount = 60, // Max bubbles to render on start
        minSize = 5,
        maxSize = 15,
        minSpeed = 10,
        maxSpeed = 40,
        bgcolor = 'hsla(240,50%,9%,0.2)', // Canvas bg
        colors = [ // Color palette
           // { color1 : 'hsl(60,100%,75%)', color2 : 'hsl(10,100%,30%)'},
            { color1 : 'hsl(120,100%,75%)', color2 : 'hsl(10,100%,30%)'},
            { color1 : 'hsl(155,100%,75%)', color2 : 'hsl(10,100%,30%)'},
            { color1 : 'hsl(180,100%,75%)', color2 : 'hsl(10,100%,30%)'},
            { color1 : 'hsl(360,100%,75%)', color2 : 'hsl(10,100%,30%)'},
          
            { color1 : 'hsl(10,100%,52%)', color2 : 'hsl(55,100%,72% )'},
            { color1 : 'hsl(180,100%,75%)',color2 : 'hsl(120,100%,72%)'},
            { color1 : 'hsl(60,100%,75%)', color2 : 'hsl(155,100%,65%)'},
            { color1 : 'hsl(10,100%,52%)', color2 : 'hsl(180,100%,52%)'}
        ];

    // Bubble constructor
    var Bubble = function(x, y, size) {
        this.id = count+1;
        this.x = x || randomNum(0, canvasWidth);
        this.y =  y || randomNum(0, canvasHeight);
        this.radius = size || randomNum(minSize, maxSize);
        this.color = colors[randomNum(0,colors.length-1)];

        this.speed = randomNum(minSpeed, maxSpeed)/10;
        this.speedBackup = this.speed;
        this.directionX = randomNum(-1,1) || 1;
        this.directionY = randomNum(-1,1) || 1;
        this.flicker = 0;

        count++; // Number bubbles
        bubbles[count] = this; // Add to main object
    };

    // Bubble drawing animation
    Bubble.prototype.draw = function() {

        // Change direction randomly, default to same direction
        this.directionX = changeSettings(this.x, 0, canvasWidth, 500) || this.directionX;
        this.directionY = changeSettings(this.y, 0, canvasHeight, 500) || this.directionY;

        // Reset speed
        this.speed = this.speedBackup;

        // If mouse is held down & bubble is within 200px of mouse
        if (attract === true && mouseOver(this.x,this.y,200)) {
            var moveTowardMouse = randomNum(0,15); // Chance of being attracted by mouse
            if(moveTowardMouse === 5){
                this.directionX = mouseX - this.x > 0 ? 1 : -1;
            } else if (moveTowardMouse === 1) {
                this.directionY = mouseY - this.y > 0 ? 1 : -1;
            }

            this.speed = 1.25; // Slow down
        }

        // Move bubbles
        this.x += this.speed * this.directionX;
        this.y += this.speed * this.directionY;

        // Change radius
        this.radius += changeSettings(this.radius, minSize, maxSize, 10);

        // Draw the bubbles
        ctx.save();
        ctx.globalCompositeOperation = 'color-dodge';
        ctx.beginPath();

        var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color.color1);
        gradient.addColorStop(0.33, 'hsla(0,100%,10%,0)');
        gradient.addColorStop(0.65, this.color.color2);
        gradient.addColorStop(1, 'hsla(0,100%,10%,0)');

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        // Pop bubbles if mouse coords match
        if(pop === true && mouseOver(this.x,this.y,this.radius)) {
            bubbles[this.id].destroy();
            pop = false;
        }

    };

    // Create initial bubbles
    for (var i = 0; i < maxCount; i++) {
        new Bubble();
    }

    // Call animation
    var animate = function() {

        // Clear canvas and fill with background color
        ctx.fillStyle = bgcolor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Draw bubbles
        for (var i = 1; i <= count; i++) {
            bubbles[i].draw();
        }

        requestAnimationFrame(animate);

    };

    requestAnimationFrame(animate);

    // Click to add new bubble
    canvas.addEventListener('click',function(e){
        new Bubble(e.pageX, e.pageY);
    });

    // Attract bubbles
    var startAttracting;
  
    canvas.addEventListener('mousedown',function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
      
        // Wait 0.5s before attracting bubbles
        clearTimeout(startAttracting);
        startAttracting = setTimeout(function(){
            return attract = true;
        }, 500);
    });

    // If mouse held down, update coords as the mouse moves
    canvas.addEventListener('mousemove',function(e){
        if(attract) {
            mouseX = e.pageX;
            mouseY = e.pageY;
        }
    });

    // Clear attract
    canvas.addEventListener('mouseup',function(e){
        clearTimeout(startAttracting);
        attract = false;
    });
  
    // Resize canvas with window resize
    var resizing;

    window.addEventListener('resize', function(){
        clearTimeout(resizing);
        resizing = setTimeout(function(){
          canvasWidth = canvas.width = window.innerWidth;
          canvasHeight = canvas.height = window.innerHeight;
        }, 500);
    });

}());