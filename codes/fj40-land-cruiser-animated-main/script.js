var sketchProc = function(processingInstance) {
  with (processingInstance) {
    size(600, 600); 
    frameRate(60);    
    smooth();
    
var road, truck;

var keys = [];
keyPressed = function() {
    keys[keyCode] = true;
};
keyReleased = function() {
    keys[keyCode] = false;
};

var collision = function(wheel, track) {
    return dist(wheel.x, wheel.y, track.x, track.y) < wheel.diameter / 2;
};

var Truck = (function() {
    Truck = function(args) {
        this.x = args.x || 300;
        this.y = args.y || 200;
        this.w = args.w || 150;
        this.h = args.h || 100;
        this.vx = args.vx || 0;
        this.vy = args.vy || 0;
        this.gravity = args.gravity || 0.2;
        this.angle = 0;
        this.speed = {
            value: 7,
            min: 0,
            max: 20
        };
        this.wheels = [
            {
                x: this.x - this.w * 0.5,
                y: this.y,
                diameter: 57,
                circumference: PI * 58,
                angle: 0,
                vx: 0,
                vy: 0
            },
            {
                x: this.x + this.w * 0.5,
                y: this.y,
                diameter: 58,
                circumference: PI * 58,
                angle: 0,
                vx: 0,
                vy: 0
            }
        ];
        this.colors = {
            outline: color(55, 35, 25),
            body: color(250, 175, 65),
            roof: color(255, 255, 255),
            guards: color(80, 70, 85),
            carriage: color(60, 50, 50),
            accent: color(230, 80, 60),
            windows: color(50, 50, 50, 20)
        };
        this.truckImage = this.getTruck();
        this.wheelImage = this.getWheel();
    };
    Truck.prototype = {
        getTruck: function() {
            background(0, 0, 0, 0);
            
            //curve brace under carriage
            stroke(this.colors.outline);
            strokeWeight(3);
            noFill();
            beginShape();
                vertex(380, 342);
                bezierVertex(380, 352, 375, 359, 366, 361);
                vertex(280, 361);
                bezierVertex(272, 359, 267, 352, 266, 342);
            endShape();
            
            //front bumper
            noStroke();
            fill(this.colors.outline);
            rect(454, 326, 73, 16);
            //line under front bumper
            stroke(this.colors.outline);
            noFill();
            beginShape();
                vertex(517, 336);
                vertex(517, 349);
                vertex(451, 363);
            endShape();
            
            //under carriage
            stroke(this.colors.guards);
            line(124, 337, 160, 337);
            stroke(this.colors.outline);
            fill(this.colors.carriage);
            beginShape();
                vertex(501, 271);
                vertex(502, 300);
                vertex(464, 347);
                vertex(163, 347);
                vertex(125, 314);
                vertex(124, 269);
                vertex(500, 271);
            endShape(CLOSE);
            rect(307, 330, 29, 30);
            
            //springs
            stroke(this.colors.accent);
            for(var i = 0; i < 10; i++) {
                //rear
                line(191, 287 + i * 5, 206, 292 + i * 5);
                //front
                line(441, 287 + i * 5, 456, 292 + i * 5);
            }
            
            //spash guards
            stroke(this.colors.outline);
            fill(this.colors.guards);
            beginShape();
                vertex(120, 269);
                vertex(501, 269);
                vertex(502, 298);
                vertex(492, 292);
                bezierVertex(486, 289, 482, 289, 474, 288);
                vertex(431, 288);
                bezierVertex(423, 289, 418, 292, 414, 296);
                vertex(380, 333);
                vertex(263, 333);
                vertex(237, 299);
                bezierVertex(232, 293, 227, 293, 221, 293);
                vertex(181, 293);
                bezierVertex(173, 293, 169, 297, 166, 300);
                vertex(151, 319);
                vertex(120, 319);
            endShape(CLOSE);
            
            //circles on splash guard
            noStroke();
            fill(0);
            ellipse(490, 286, 5, 5);
            ellipse(476, 283, 5, 5);
            ellipse(457, 283, 5, 5);
            ellipse(439, 283, 5, 5);
            ellipse(420, 284, 5, 5);
            ellipse(408, 294, 5, 5);
            ellipse(398, 304, 5, 5);
            ellipse(388, 315, 5, 5);
            ellipse(378, 326, 5, 5);
            ellipse(265, 328, 5, 5);
            ellipse(257, 317, 5, 5);
            ellipse(249, 306, 5, 5);
            ellipse(241, 296, 5, 5);
            ellipse(231, 286, 5, 5);
            ellipse(216, 285, 5, 5);
            ellipse(202, 285, 5, 5);
            ellipse(185, 285, 5, 5);
            ellipse(170, 287, 5, 5);
            ellipse(159, 297, 5, 5);
            ellipse(150, 308, 5, 5);
            
            //inside of cabin
            noStroke();
            fill(this.colors.outline, 100);
            beginShape();
                vertex(119, 187);
                vertex(142, 187);
                vertex(142, 199);
                vertex(126, 199);
                vertex(126, 246);
                vertex(119, 246);
            endShape(CLOSE);
            
            beginShape();
                vertex(236, 246);
                vertex(236, 199);
                vertex(164, 199);
                vertex(164, 246);
                vertex(144, 246);
                vertex(144, 187);
                vertex(250, 187);
                vertex(250, 246);
            endShape(CLOSE);
            
            beginShape();
                vertex(340, 246);
                vertex(327, 199);
                vertex(278, 199);
                vertex(278, 246);
                vertex(263, 246);
                vertex(263, 187);
                vertex(339, 187);
                vertex(356, 246);
            endShape(CLOSE);
            
            //steering wheel
            stroke(this.colors.outline);
            strokeWeight(5);
            line(334, 227, 326, 246);
            
            //streaks on windows
            noStroke();
            fill(255, 100);
            quad(185, 186, 240, 245, 218, 245, 163, 186);
            quad(156, 186, 211, 245, 205, 245, 150, 186);
            quad(296, 186, 351, 245, 328, 245, 273, 186);
            quad(269, 186, 324, 245, 318, 245, 263, 186);
            
            //windows (all)
            noStroke();
            fill(this.colors.windows);
            quad(118, 184, 340, 184, 355, 247, 118, 247);
            
            //roof
            strokeWeight(3);
            stroke(this.colors.outline);
            fill(this.colors.roof);
            beginShape();
                vertex(349, 184);
                bezierVertex(347, 176, 341, 173, 332, 172);
                vertex(138, 171);
                bezierVertex(126, 172, 119, 177, 119, 184);
            endShape(CLOSE);
            
            //main body
            strokeWeight(3);
            stroke(this.colors.outline);
            fill(this.colors.body);
            beginShape();
                vertex(364, 241);
                vertex(349, 183);
                vertex(331, 183);
                vertex(331, 188);
                bezierVertex(334, 188, 339, 192, 339, 196);
                vertex(348, 233);
                bezierVertex(348, 237, 346, 240, 342, 242);
                vertex(274, 242);
                bezierVertex(268, 241, 267, 237, 267, 232);
                vertex(268, 197);
                bezierVertex(270, 190, 273, 189, 280, 188);
                vertex(331, 188);
                vertex(331, 183);
                vertex(240, 183);
                vertex(239, 188);
                bezierVertex(246, 192, 246, 195, 247, 199);
                vertex(247, 234);
                bezierVertex(247, 236, 246, 240, 238, 243);
                vertex(160, 243);
                bezierVertex(155, 242, 151, 239, 150, 234);
                vertex(150, 199);
                bezierVertex(149, 196, 152, 191, 160, 188);
                vertex(239, 188);
                vertex(239, 183);
                vertex(118, 183);
                vertex(118, 186);
                vertex(127, 186);
                bezierVertex(135, 189, 137, 192, 138, 199);
                vertex(138, 234);
                bezierVertex(136, 240, 132, 242, 126, 243);
                vertex(118, 243);
                vertex(118, 319);
                vertex(132, 319);
                vertex(158, 287);
                bezierVertex(162, 282, 169, 279, 179, 278);
                vertex(224, 278);
                bezierVertex(232, 279, 237, 282, 241, 287);
                vertex(273, 333);
                vertex(362, 333);
                vertex(415, 278);
                vertex(478, 278);
                vertex(499, 283);
                vertex(499, 267);
                bezierVertex(498, 261, 496, 255, 480, 252);
                vertex(364, 242);
            endShape(CLOSE);
            line(118, 240, 118, 187);
            
            noStroke();
            fill(this.colors.body);
            rect(237, 185, 4, 1.6);
            rect(329, 185, 4, 1.6);
            
            //door (outline only)
            stroke(this.colors.outline);
            noFill();
            beginShape();
                vertex(364, 242);
                vertex(363, 290);
                bezierVertex(362, 301, 354, 310, 347, 310);
                vertex(277, 310);
                bezierVertex(266, 309, 259, 303, 258, 290);
                vertex(258, 183);
            endShape();
            
            //squares on top of roof
            noStroke();
            fill(this.colors.outline);
            rect(157, 161, 25, 10);
            rect(286, 161, 25, 10);
            
            //roof rack
            stroke(this.colors.outline);
            noFill();
            beginShape();
                vertex(319, 134);
                bezierVertex(335, 137, 335, 159, 319, 162);
                vertex(147, 162);
                bezierVertex(133, 159, 133, 137, 147, 134);
            endShape(CLOSE);
            
            //lines
            line(137, 148, 329, 148);
            line(173, 135, 173, 160);
            line(199, 135, 199, 160);
            line(225, 135, 225, 160);
            line(251, 135, 251, 160);
            line(277, 135, 277, 160);
            line(303, 135, 303, 160);
            
            //headlight
            fill(this.colors.guards);
            line(329, 148, 337, 148);
            arc(349, 148, 30, 28, radians(90), radians(270));
            stroke(this.colors.roof);
            line(345, 137, 345, 159);
            stroke(this.colors.outline);
            line(349, 135, 349, 160);
            
            //lines on body (decal)
            stroke(this.colors.outline);
            line(372, 244, 372, 258);
            line(406, 252, 406, 260);
            line(415, 252, 415, 260);
            line(424, 252, 424, 260);
            line(270, 253, 284, 253);
            line(415, 268, 415, 276);
            
            //front window separator
            line(322, 190, 322, 240);
            
            //side mirror
            line(348, 236, 356, 244);
            fill(this.colors.guards);
            rect(341, 222, 4, 21);
            
            //line across body
            stroke(this.colors.roof, 70);
            line(121, 266, 361, 266);
            
            //hood
            noFill();
            stroke(this.colors.outline);
            beginShape();
                vertex(389, 245);
                bezierVertex(391, 261, 404, 269, 416, 268);
                vertex(498, 267);
            endShape();
            
            //curved triangle in front of door
            beginShape();
                vertex(384, 283);
                bezierVertex(389, 283, 389, 286, 387, 289);
                vertex(378, 300);
                bezierVertex(374, 301, 374, 298, 374, 297);
                vertex(374, 289);
                bezierVertex(374, 286, 376, 284, 379, 283);
            endShape(CLOSE);
            
            //rear indicator light
            strokeWeight(2);
            fill(this.colors.accent);
            rect(133, 277, 19, 9);
            
            //rear antenna
            strokeWeight(2);
            line(129, 148, 129, 278);
            strokeWeight(4);
            line(129, 276, 129, 293);
            noStroke();
            fill(this.colors.outline);
            ellipse(129, 148, 10, 10);
            
            //door hinges
            strokeWeight(2);
            stroke(this.colors.outline);
            noFill();
            rect(346, 254, 16, 8, 15, 0, 0, 15);
            rect(346, 277, 16, 8, 15, 0, 0, 15);
            noStroke();
            fill(this.colors.outline);
            ellipse(351, 258, 2, 2);
            ellipse(359, 258, 2, 2);
            ellipse(351, 281, 2, 2);
            ellipse(359, 281, 2, 2);
            
            //headlight
            stroke(this.colors.outline);
            fill(this.colors.accent);
            rect(497, 268, 15, 14, 0, 15, 15, 0);
            
            //line under rear bumper
            strokeWeight(3);
            noFill();
            beginShape();
                vertex(118, 320);
                vertex(118, 342);
                vertex(198, 362);
            endShape();
            
            //rear bumper
            fill(this.colors.roof);
            rect(104, 310, 26, 19);
            
            //back tyre
            noStroke();
            fill(this.colors.outline);
            rect(68, 200, 50, 104, 12);
            stroke(this.colors.outline);
            strokeWeight(7);
            line(78, 201, 78, 302);
            line(88, 201, 88, 302);
            line(98, 201, 98, 302);
            line(108, 201, 108, 302);

            return get(66, 130, 512, 235);
        },
        getWheel: function() {
            background(0, 0, 0, 0);
            
            //wheel
            pushMatrix();
                translate(199, 363);
            
                noStroke();
                fill(this.colors.outline);
                ellipse(0, 0, 105, 105);
                
                noFill();
                stroke(this.colors.outline);
                strokeWeight(5);
                for(var i = 0; i < 36; i++) {
                    rotate(radians(10));
                    line(0, 0, 0, -53);
                }
                
                noFill();
                stroke(255, 10);
                strokeWeight(3);
                ellipse(0, 0, 95, 95);
                
                noStroke();
                fill(255);
                ellipse(0, 0, 55, 55);
                
                noStroke();
                fill(this.colors.outline);
                for(var i = 0; i < 10; i++) {
                    rotate(radians(36));
                    ellipse(0, -18, 6, 6);
                }
                
                noFill();
                stroke(this.colors.outline);
                strokeWeight(1);
                ellipse(0, 0, 50, 50);
                
                stroke(this.colors.outline);
                fill(255);
                ellipse(0, 0, 23, 23);
                
                noFill();
                stroke(this.colors.outline);
                strokeWeight(1);
                for(var i = 0; i < 3; i++) {
                    rotate(radians(120));
                    line(0, -11, 0, 11);
                }
                
                stroke(this.colors.outline);
                strokeWeight(1);
                fill(255);
                ellipse(0, 0, 12, 12);
            popMatrix();

            return get(142, 306, 115, 115);
        },
        update: function() {
            this.canJump = false;
            
            this.x = bezierPoint(this.wheels[0].x, this.wheels[0].x, this.wheels[1].x, this.wheels[1].x, 0.5);
            this.y = bezierPoint(this.wheels[0].y, this.wheels[0].y, this.wheels[1].y, this.wheels[1].y, 0.5);
            
            this.angle = atan2(this.wheels[1].y - this.wheels[0].y, this.wheels[1].x - this.wheels[0].x);
            var vx = cos(radians(this.angle));
            var vy = sin(radians(this.angle));
            
            //wheel x based on current angle
            this.wheels[0].x = this.x - vx * this.w / 2;
            this.wheels[1].x = this.x + vx * this.w / 2;

            for(var i = 0; i < this.wheels.length; i++) {
                var wheel = this.wheels[i];
                
                wheel.vy+= this.gravity;
                wheel.y+= wheel.vy;
                wheel.angle+= this.speed.value / wheel.circumference * 360;
        
                var track = road.tracks[wheel.x/road.w | 0];
                if(collision(wheel, track)) {
                    wheel.y = track.y - wheel.diameter / 2 - 2;
                    wheel.vy = 0;
                }
            }
            
            if(keys[LEFT]) {
                this.speed.value = constrain(this.speed.value - 0.1, this.speed.min, this.speed.max);
            }
            if(keys[RIGHT]) {
                this.speed.value = constrain(this.speed.value + 0.1, this.speed.min, this.speed.max);
            }
            
            if(this.speed.value === 0) {
                this.gravity = 0;
            }
            else {
                this.gravity = 0.2;
            }
        },
        draw: function() {
            pushMatrix();
                translate(this.x, this.y);
                scale(0.60);
                rotate(this.angle);
                image(this.truckImage, -this.truckImage.width / 2, -this.truckImage.height);
            popMatrix();

            //draw the rotating wheels
            for(var i = 0; i < this.wheels.length; i++) {
                var wheel = this.wheels[i];
                    
                pushMatrix();
                    translate(wheel.x, wheel.y);
                    scale(0.60);
                    rotate(radians(wheel.angle));
                    image(this.wheelImage, -this.wheelImage.width / 2, -this.wheelImage.height / 2);
                    image(this.wheelImage, -this.wheelImage.width / 2, -this.wheelImage.height / 2);
                popMatrix();
            }
        },
        run: function() {
            this.draw();
            this.update();
        }
    };
    return Truck;
})();

var Road = (function() {
    Road = function(args) {
        this.color = args.color || color(112, 100, 77);
        this.h = args.h || height;
        this.w = args.w || 2;
        this.noise = args.noise | 0;
        this.increment = args.increment || this.w * 0.001;
        this.tracks = [];
        this.setup();
    };
    Road.prototype = {
        setup: function() {
            for(var x = 0; x <= width; x+= this.w) {
                var n = noise(this.noise);
                var y = map(n, 0, 1, 0, 800);
                this.noise+= this.increment;
                this.tracks.push({
                    x: x,
                    y: y
                });
            }
        },
        update: function() {
            for(var i = this.tracks.length - 1; i >= 0; i--) {
                var track = this.tracks[i];
                track.x-= truck.speed.value;
                
                if(track.x < -this.w) {
                    var n = noise(this.noise);
                    var y = map(n, 0, 1, 0, 800);
                    this.noise+= this.increment;
                    this.tracks.push({
                        x: this.tracks[this.tracks.length-1].x + this.w,
                        y: y
                    });
                    
                    this.tracks.splice(i, 1);
                }
            }
        },
        draw: function() {
            pushStyle();
                noStroke();
                fill(this.color);
                for(var i = 0; i < this.tracks.length; i++) {
                    var track = this.tracks[i];
                    rect(track.x, track.y, this.w + 1, this.h);
                }
                
                noFill();
                stroke(50);
                strokeWeight(7);
                for(var i = 1; i < this.tracks.length; i++) {
                    var track = this.tracks[i];
                    line(this.tracks[i-1].x, this.tracks[i-1].y + 2, track.x, track.y + 2);
                }
            popStyle();
        },
        run: function() {
            this.update();
            this.draw();
        }
    };
    return Road;
})();

road = new Road({});

truck = new Truck({});

draw = function() {
    background(119, 161, 209);
    
    truck.run();
    road.run();
};
    
  }
}

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);