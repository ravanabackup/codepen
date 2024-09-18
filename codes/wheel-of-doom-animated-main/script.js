var sketchProc = function(processingInstance) {
  with (processingInstance) {
    size(600, 600); 
    frameRate(60);    
    smooth();
    
textFont(createFont("Trebuchet MS"), 30);

var app;
    
var clicked = false, hover = false;
mousePressed = function () {
    clicked = true;
};
    
var Button = (function() {
    var Button = function(args) {
        this.x = args.x;
        this.y = args.y;
        this.w = args.w || 100;
        this.h = args.h || 50;
        this.content = args.content;
        this.textSize = args.textSize || this.w * 0.18;
        this.enabled = true;
        this.hover = false;
        this.func = args.func;
        this.backColor = args.backColor || color(240);
        this.textColor = args.textColor || color(25);
    };
    Button.prototype = {
        over: function() {
            return (mouseX > this.x && 
                    mouseX < this.x + this.w && 
                    mouseY > this.y && 
                    mouseY < this.y + this.h);
        },
        draw: function() {
            noStroke();
            
            this.hover = this.over();

            if(this.enabled && this.hover) {
                hover = true;
            }

            fill(this.backColor, this.enabled && this.hover ? 50 : 100);
            rect(this.x, this.y, this.w, this.h);
    
            pushStyle();
                textAlign(CENTER, CENTER);
                textSize(this.textSize);
                fill(this.enabled ? this.textColor : color(this.textColor, 100));
                text(this.content, this.x + this.w / 2, this.y + this.h / 2);
            popStyle();
    
            if(this.enabled && clicked && this.hover) {
                this.func();
            }
        }
    };
    return Button;
})();

var Person = (function() {
    Person = function(args) {
        this.x = args.x || 300;
        this.y = args.y || 150;
        this.length = args.length || 160;
        this.diameter = args.diameter || this.length / 2;
        this.thickness = args.thickness || 2;
        this.timer = 0;
        this.speed = args.speed || 5;
        this.angle = -10;
        this.colors = args.colors || {
            skin: color(250, 225, 200),
            stroke: color(60),
            feet: color(40)
        };
        this.canChangeSpeed = true;
        this.limbs = args.limbs || [
            { //left arm
                x: 0,
                y: 0,
                offset: 60,
                color: color(252, 101, 106),
                upper: {
                    angle: 10,
                    dist: 70,
                    length: this.length * 0.4
                },
                lower: {
                    angle: -60,
                    dist: 50,
                    length: this.length * 0.34
                }
            },
            { //right arm
                x: 0,
                y: 0,
                offset: 240,
                color: color(222, 89, 93),
                upper: {
                    angle: 10,
                    dist: 70,
                    length: this.length * 0.4
                },
                lower: {
                    angle: -60,
                    dist: 50,
                    length: this.length * 0.34
                }
            },
            { //left leg
                x: 0,
                y: 0,
                offset: 180,
                color: color(252, 101, 106),
                upper: {
                    angle: -10,
                    dist: 60,
                    length: this.length / 2
                },
                lower: {
                    angle: 60,
                    dist: 50,
                    length: this.length * 0.37
                },
                foot: {
                    angle: -70,
                    dist: 20,
                    length: this.length * 0.125
                }
            },
            { //right leg
                x: 0,
                y: 0,
                offset: 0,
                color: color(222, 89, 93),
                upper: {
                    angle: -10,
                    dist: 60,
                    length: this.length / 2
                },
                lower: {
                    angle: 60,
                    dist: 50,
                    length: this.length * 0.37
                },
                foot: {
                    angle: -70,
                    dist: 20,
                    length: this.length * 0.125
                }
            }
        ];
        this.sine = 0;
        this.init();
    };
    Person.prototype = {
        init: function() {
            this.limbs[0].x = this.x;
            this.limbs[0].y = this.y + this.diameter * 0.6;
            
            this.limbs[1].x = this.x;
            this.limbs[1].y = this.y + this.diameter * 0.6;
            
            this.limbs[2].x = this.x;
            this.limbs[2].y = this.y + this.length;
            
            this.limbs[3].x = this.x;
            this.limbs[3].y = this.y + this.length;
        },
        moveArm: function(limb, point) {
            stroke(this.colors.stroke);
            strokeWeight(this.thickness);
            pushMatrix();
                translate(limb.x - point, limb.y);
                rotate(radians(limb.upper.angle + sin(radians((this.timer * this.speed) + limb.offset)) * limb.upper.dist));
                line(0, 0, 0, limb.upper.length);

                translate(0, limb.upper.length);
                rotate(radians(limb.lower.angle + cos(radians((this.timer * this.speed) + limb.offset)) * limb.lower.dist));
                line(0, 0, 0, limb.lower.length);
                
                stroke(this.colors.stroke);
                strokeWeight(this.thickness / 2);
                fill(this.colors.skin);
                //hands
                ellipse(0, limb.lower.length, this.diameter * 0.2, this.diameter * 0.2);
            popMatrix();
        },
        moveLeg: function(limb) {
            stroke(this.colors.stroke);
            strokeWeight(this.thickness);
            pushMatrix();
                translate(limb.x - this.angle, limb.y);
                rotate(radians(limb.upper.angle + cos(radians((this.timer * this.speed) + limb.offset)) * limb.upper.dist));
                line(0, 0, 0, limb.upper.length);
                
                translate(0, limb.upper.length);
                rotate(radians(limb.lower.angle + sin(radians((this.timer * this.speed) + limb.offset)) * limb.lower.dist));
                line(0, 0, 0, limb.lower.length);
                
                translate(0, limb.lower.length);
                rotate(radians(limb.foot.angle + sin(radians((this.timer * this.speed) + limb.offset)) * limb.foot.dist));
                stroke(this.colors.feet);
                strokeWeight(this.thickness * 2.5);
                line(0, 0, 0, limb.foot.length);
            popMatrix();
        },
        draw: function() {
            this.timer++;

            var point = this.angle / dist(this.x, this.y, this.x, this.limbs[2].y) * this.diameter * 0.6;
            
            this.sine = sin(radians(this.timer * this.speed * 2));
            
            pushMatrix();
                translate(0, this.sine * 10);
                
                strokeWeight(this.thickness);
                stroke(this.colors.stroke);
                line(this.x, this.y, this.x - this.angle, this.limbs[2].y);
                
                this.moveArm(this.limbs[0], point);
                this.moveArm(this.limbs[1], point);
                this.moveLeg(this.limbs[2]);
                this.moveLeg(this.limbs[3]);
                
                //hair
                noFill();
                stroke(this.colors.stroke);
                strokeWeight(this.thickness / 4);
                var cosine = cos(radians(this.timer * this.speed * 2));
                bezier( this.x - this.diameter * 0.3, this.y - this.diameter * 0.35,
                        this.x - this.diameter * 0.4, this.y - this.diameter * 0.40 + cosine * 3,
                        this.x - this.diameter * 0.6, this.y - this.diameter * 0.45 + cosine * 3,
                        this.x - this.diameter * 0.7, this.y - this.diameter * 0.4 + cosine * 3);
                        
                bezier( this.x - this.diameter * 0.3, this.y - this.diameter * 0.33,
                        this.x - this.diameter * 0.4, this.y - this.diameter * 0.30 + cosine * 3,
                        this.x - this.diameter * 0.6, this.y - this.diameter * 0.35 + cosine * 3,
                        this.x - this.diameter * 0.7, this.y - this.diameter * 0.30 + cosine * 3.5);
                
                //head
                stroke(this.colors.stroke);
                strokeWeight(this.thickness / 2);
                fill(this.colors.skin);
                ellipse(this.x, this.y, this.diameter, this.diameter);
                
                //eyes
                noStroke();
                fill(80);
                ellipse(this.x + this.diameter * 0.35, this.y - this.diameter * 0.12, this.diameter * 0.15, this.diameter * 0.2);
                ellipse(this.x + this.diameter * 0.18, this.y - this.diameter * 0.10, this.diameter * 0.15, this.diameter * 0.2);
                
                //lines above/below eyes
                noFill();
                stroke(80, 150);
                //above
                arc(this.x + this.diameter * 0.32, this.y - this.diameter * 0.14, 
                    this.diameter * 0.40, this.diameter * 0.25, radians(260), radians(280));
                arc(this.x + this.diameter * 0.15, this.y - this.diameter * 0.12, 
                    this.diameter * 0.40, this.diameter * 0.25, radians(260), radians(280));
                //below
                arc(this.x + this.diameter * 0.36, this.y - this.diameter * 0.10, 
                    this.diameter * 0.40, this.diameter * 0.25, radians(80), radians(100));
                arc(this.x + this.diameter * 0.19, this.y - this.diameter * 0.08, 
                    this.diameter * 0.40, this.diameter * 0.25, radians(80), radians(100));
                
                //mouth
                stroke(80);
                noFill();
                bezier( this.x + this.diameter * 0.45, this.y + this.diameter * 0.15,
                        this.x + this.diameter * 0.45, this.y + this.diameter * 0.10,
                        this.x, this.y + this.diameter * 0.22,
                        this.x, this.y + this.diameter * 0.30);
            
            popMatrix();
        }
    };
    return Person;
})();

var Cog = (function() {
    Cog = function(args) {
        this.x = args.x || 300;
        this.y = args.y || 300;
        this.diameter = args.diameter || 200;
        this.circumference = PI * this.diameter;
        this.angle = 0;
        this.speed = args.speed || 5;
        this.timer = 0;
        this.cog = this.getCog();
    };
    Cog.prototype = {
        getCog: function() {
            background(0, 0);
            pushMatrix();
                translate(this.x, this.y);
                
                pushMatrix();

                    noStroke();
                    for(var i = 0; i < 360; i+= 30) {
                        rotate(radians(30));
                        
                        fill(189, 189, 189);
                        triangle(  -this.diameter * 0.03, -this.diameter * 0.5,
                                    0, -this.diameter * 0.54,
                                    this.diameter * 0.03, -this.diameter * 0.5);
                        
                        fill(102, 102, 102);
                        beginShape();
                            vertex(-this.diameter * 0.1,  -this.diameter * 0.38);
                            vertex(-this.diameter * 0.1,  -this.diameter * 0.45);
                            vertex(-this.diameter * 0.05, -this.diameter * 0.5);
                            vertex( this.diameter * 0.05, -this.diameter * 0.5);
                            vertex( this.diameter * 0.1,  -this.diameter * 0.45);
                            vertex( this.diameter * 0.1,  -this.diameter * 0.38);
                        endShape();
                    }
                    
                    rotate(radians(10));
                    
                    for(var i = 0; i < 360; i+= 60) {
                        rotate(radians(60));
                        fill(102, 102, 102);
                        beginShape();
                            vertex(this.diameter * 0.10, -this.diameter * 0.4);
                            bezierVertex(this.diameter * 0.04, -this.diameter * 0.35,
                                    this.diameter * 0.01, -this.diameter * 0.1,
                                    this.diameter * 0.12, 0);
                            vertex(-this.diameter * 0.12, 0);
                            bezierVertex(-this.diameter * 0.04, -this.diameter * 0.1,
                                    -this.diameter * 0.01, -this.diameter * 0.35,
                                    -this.diameter * 0.10, -this.diameter * 0.4);
                        endShape();
                        
                        fill(145, 145, 145, 50);
                        ellipse(0, -this.diameter * 0.33, this.diameter * 0.02, this.diameter * 0.02);
                        ellipse(0, -this.diameter * 0.18, this.diameter * 0.02, this.diameter * 0.02);
                    }
                popMatrix();
                
                noFill();
                stroke(79, 78, 79);
                strokeWeight(15);
                ellipse(0, 0, this.diameter * 0.8, this.diameter * 0.8);
                noStroke();
                fill(87, 85, 87);
                ellipse(0, 0, this.diameter * 0.3, this.diameter * 0.3);
    
                strokeWeight(2);
                stroke(153, 153, 153, 30);
                for(var i = 0; i < 360; i+= 45) {
                    rotate(radians(i));
                    line(0, 0, 0, -this.diameter * 0.12);
                }
                
                noStroke();
                fill(128, 128, 128, 150);
                ellipse(0, 0, this.diameter * 0.1, this.diameter * 0.1);
            popMatrix();
            
            return get(this.x -this.diameter * 0.55, this.y - this.diameter * 0.55, this.diameter * 1.1, this.diameter * 1.1);
        },
        draw: function() {
            this.timer++;
            
            this.angle+= this.speed / this.circumference * 360;

            pushMatrix();
                translate(this.x, this.y);
                rotate(radians(this.angle));

                image(this.cog, -this.diameter * 0.55, -this.diameter * 0.55);

            popMatrix();
        }
    };
    return Cog;
})();

var App = (function() {
    App = function() {
        this.INITIAL_SPEED = 5;
        this.addParticle = 0;
        this.hit = 0;
        this.moved = false;
        this.particles = [];
        this.mountains = [];
        this.snows = {
            front: [],
            back: []
        };
        this.keys = [];
        this.person = new Person({
            x: 450,
            y: 365,
            length: 90,
            speed: this.INITIAL_SPEED
        });
        this.cog = new Cog({
            x: 180,
            y: this.person.limbs[2].y + this.person.limbs[2].upper.length + this.person.limbs[2].lower.length - 122,
            diameter: 250,
            speed: this.INITIAL_SPEED
        });
        this.groundCoords = {
            x1: -100,
            x2: 799
        };
      this.buttons = {
        slowmo: new Button({
          x: 10,
          y: 540,
          content: "Slowmo",
          func: function() {
            app.cog.speed = 1;
            app.person.speed = 1;
          }
        }),
        normal: new Button({
          x: 120,
          y: 540,
          content: "Normal",
          func: function() {
            app.cog.speed = 5;
            app.person.speed = 5;
          }
        }),
        goburr: new Button({
          x: 230,
          y: 540,
          content: "Go Burr",
          func: function() {
            app.cog.speed = 15;
            app.person.speed = 15;
          }
        })
      }
        this.init();
        this.gradient = this.getGradient();
        this.mountainImage = this.getMountain();
        this.groundImage = this.getGround();
    };
    App.prototype = {
        init: function() {
            //calculate top of the ground
            this.top = this.person.limbs[2].y + this.person.limbs[2].upper.length + this.person.limbs[2].lower.length;
            
            //add mountains
            var noOfMountains = 3;
            for(var i = 0; i <= noOfMountains; i++) {
                this.mountains.push({
                    x: i * width / noOfMountains,
                    y: 550,
                    w: width / noOfMountains,
                    h: random(250, 400) | 0
                });
            }
            
            //add snow
            for(var i = 0; i < 50; i++) {
                //back
                this.snows.back.push({
                    x: random(-100, 1200),
                    y: random(-100, this.top),
                    diameter: random(2, 4),
                    vx: random(-0.4, -0.5),
                    vy: random(0.2, 0.4)
                });
                //front
                this.snows.front.push({
                    x: random(-100, 1200),
                    y: random(-100, this.top),
                    diameter: random(4, 8),
                    vx: random(-0.4, -0.5),
                    vy: random(0.2, 0.4)
                });
            }
        },
        getGradient: function() {
            var c1 = color(207, 116, 128), c2 = color(245, 186, 192);
            noStroke();
            for(var i = 0; i <= height; i++) { 
                fill(lerpColor(c1, c2, i/height));
                rect(0, i, width, 1);
            }
            return get();
        },
        getMountain: function() {
            background(125, 120, 125);

            noStroke();
            fill(235, 232, 235);
            beginShape();
                vertex(78, 154);
                vertex(125, 171);
                vertex(150, 161);
                vertex(184, 154);
                vertex(214, 188);
                vertex(236, 172);
                vertex(269, 182);
                vertex(292, 181);
                vertex(339, 160);
                vertex(338, 1);
                vertex(77, 0);
            endShape(CLOSE);
            
            fill(random(120, 150), 100);
            for(var i = 0; i < 100; i++) {
                var diameter = random(10, 30);
                ellipse(random(width), random(150, height), diameter, diameter);
            }
            
            fill(random(70, 100), 100);
            for(var i = 0; i < 100; i++) {
                var diameter = random(5, 10);
                ellipse(random(width), random(height), diameter, diameter);
            }
            
            var img = get();
            
            background(0);
            
            fill(255);
            beginShape();
                vertex(0, 600);
                vertex(8, 566);
                vertex(32, 509);
                vertex(34, 435);
                vertex(48, 392);
                vertex(55, 328);
                vertex(50, 282);
                vertex(74, 227);
                vertex(94, 194);
                vertex(104, 132);
                vertex(127, 101);
                vertex(124, 54);
                vertex(144, 25);
                vertex(174, 3);
                vertex(200, 20);
                vertex(218, 54);
                vertex(248, 78);
                vertex(263, 117);
                vertex(290, 152);
                vertex(328, 194);
                vertex(339, 248);
                vertex(390, 318);
                vertex(421, 377);
                vertex(471, 408);
                vertex(491, 450);
                vertex(516, 512);
                vertex(546, 533);
                vertex(567, 568);
                vertex(600, 600);
            endShape(CLOSE);
            
            var tri = get();
            
            if(img && tri) {
                img.mask(tri);
            }
            
            background(0, 0);
            
            image(img, 0, 0);
            
            return img;
        },
        getGround: function() {
            var gtx = createGraphics(900, this.top + 400, P2D);
            
            gtx.background(0, 0);
            
            //ground
            gtx.noStroke();
            gtx.fill(87, 87, 87);
            gtx.rect(0, this.top, 900, 400);
                    
            gtx.fill(235, 232, 235);
            gtx.rect(0, this.top, 900, 30);
            
            //add spots on the ground
            var noOfSpots = 100;
            for(var i = 0; i < noOfSpots; i++) {
                var diameter = random(5, 15);
                
                gtx.fill(random() < 0.5 ? color(235, 232, 235) : color(45, 45, 45), random(20, 50));
                gtx.ellipse(random(0, 900), random(550, 800), diameter, diameter);
            }
            
            //add bumps on top of ground
            var bumpGap = 22;
            gtx.fill(235, 232, 235);
            for(var i = 0; i < 900; i+= bumpGap) {
                var diameter = random(10, 20);
                
                gtx.ellipse(i * random(0.8, 1.2),
                        this.top + random(0, 7),
                        diameter,
                        diameter);
                        
                gtx.ellipse(i * random(0.8, 1.2),
                        this.top + random(24, 28),
                        diameter,
                        diameter);
            }
            
            return gtx.get(0, 0, 900, this.top + 400);
        },
        runMountains: function() {
            //loop through each of the mountains in the mountains array
            for(var i = 0; i < this.mountains.length; i++) {
                //move each mountain at the same speed as bb-8
                this.mountains[i].x-= this.cog.speed * 0.4;

                image(   this.mountainImage, 
                            this.mountains[i].x, 
                            this.mountains[i].y - this.mountains[i].h, 
                            this.mountains[i].w, 
                            this.mountains[i].h);
                
                //if a triangle goes off the screen then reset it  with a new random height
                if(this.cog.speed > 0 && this.mountains[i].x + this.mountains[i].w <= -20) {
                    this.mountains[i].x = width;
                    this.mountains[i].h = random(250, 400) | 0;
                }
                else if(this.cog.speed < 0 && this.mountains[i].x >= width) {
                    this.mountains[i].x = -this.mountains[i].w;
                    this.mountains[i].h = random(250, 400) | 0;
                }
            }
        },
        runGround: function() {
            image(this.groundImage, this.groundCoords.x1, 0);
            image(this.groundImage, this.groundCoords.x2, 0);
            
            this.groundCoords.x1-= this.cog.speed;
            this.groundCoords.x2-= this.cog.speed;
            
            if(this.groundCoords.x1 <= -1000) {
                this.groundCoords.x1 = this.groundCoords.x2 + 899;
            }
            if(this.groundCoords.x2 <= -1000) {
                this.groundCoords.x2 = this.groundCoords.x1 + 899;
            }
        },
        runSnow: function(snows) {
            noStroke();
            fill(235, 232, 235);
            
            for(var i = snows.length - 1; i >= 0; i--) {
                var snow = snows[i];
                
                ellipse(snow.x, snow.y, snow.diameter, snow.diameter);
                
                snow.x+= snow.vx * this.cog.speed;
                snow.y+= snow.vy * this.cog.speed;
                
                if(snow.x < -200 || snow.y > this.top + 10) {
                    snow.x = random(-100, 1200);
                    snow.y = -100;
                    snow.vx = random(-0.4, -0.5);
                    snow.vy = random(0.2, 0.4);
                }
            }
        },
        draw: function() {
            background(245, 186, 192);
    
            image(this.gradient, 0, 0);
        
            pushMatrix();
                translate(300, 300);
                rotate(radians(20));
                translate(-250, -420);
                
                //mountains
                this.runMountains();
            
                noStroke();
                
                for(var i = this.particles.length - 1; i >= 0; i--) {
                    var p = this.particles[i];
                    
                    if(p.type === "cog") {
                        pushMatrix();
                            translate(p.x + p.size / 2, p.y + p.size / 2);
                            rotate(radians(p.angle));
                            fill(p.color, p.opacity);
                            rect(-p.size / 2, -p.size / 2, p.size, p.size);
                        popMatrix();
                    }
                    else {
                        fill(p.color, p.opacity);
                        rect(p.x, p.y, p.size, p.size);
                    }

                    p.opacity-= this.cog.speed * 0.5;
                    p.x-= p.vx * this.cog.speed;
                    p.y-= p.vy * this.cog.speed;
                    p.angle+= p.rot;
                    
                    if(p.opacity <= 0) {
                        this.particles.splice(i, 1);
                    }
                }
                
                this.runSnow(this.snows.back);
                
                this.cog.draw();
            
                this.person.draw();
 
                this.runGround();
                
                this.runSnow(this.snows.front);

            popMatrix();
            
            //add particles for cog
            if(this.cog.angle > this.addParticle) {
                this.addParticle = this.cog.angle + 10;
                
                this.particles.push({
                    x: this.cog.x + this.cog.diameter * 0.05,
                    y: this.cog.y + this.cog.diameter * 0.50,
                    size: random(this.cog.diameter * 0.02, this.cog.diameter * 0.04),
                    vx: random(0.5, 0.8),
                    vy: random(0.1, 0.2),
                    color: random() < 0.5 ? color(235, 232, 235) : color(45, 45, 45),
                    opacity: random(220, 250) | 0,
                    angle: 0,
                    rot: random(this.cog.diameter * 0.01, this.cog.diameter * 0.02) * (random() < 0.5 ? -1 : 1),
                    type: "cog"
                });
            }
            
            //add particles when the person's foot hits the ground
            if(this.hit < 0.9 && this.person.sine > 0.9) {
                for(var i = 0; i < 10; i++) {
                    this.particles.push({
                        x: this.person.x + this.person.diameter * 1.35,
                        y: this.person.limbs[2].y + this.person.limbs[2].upper.length + this.person.limbs[2].lower.length + 5,
                        size: random(this.person.diameter * 0.04, this.person.diameter * 0.07),
                        vx: random(0.5, 0.8),
                        vy: random(0.1, 0.2),
                        color: random() < 0.5 ? color(235, 232, 235) : color(45, 45, 45),
                        opacity: random(220, 250) | 0,
                        angle: 0,
                        rot: random(this.person.diameter * 0.01, this.person.diameter * 0.02) * (random() < 0.5 ? -1 : 1),
                        type: "person"
                    });
                }
            }
            this.hit = this.person.sine;
          
          for(var i in this.buttons) {
                this.buttons[i].draw();
            }
        },
        run: function() {
            this.draw();
          
            cursor(hover ? 'pointer' : 'default');    
            hover = clicked = false;
        }
    };
    return App;
})();

app = new App();

draw = function() {
    app.run();
};
    
  }
}

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);