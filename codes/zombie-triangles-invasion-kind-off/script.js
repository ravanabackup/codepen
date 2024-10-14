// ZOMBIE INVASION (kind off)
/*
3 steering behavior involved: wander, seek and flee (group steering behavior: separation and cohesion - can be better tuned,  in the future maybe...)

RULES_
vehicles start wandering around the canvas but some of the are infected zombies.
If a zombie gets close enough ("ALERT" range) to his prey, the zombie starts seeking his prey, 
at the same time the passer-by starts fleeing from the zombie. But zombies are pretty fast, damn fast!

If you really like zombies, you can zombifie a random passer-by by pressing your mouse.
In the end, anyway, all zombies will come back normal... and everything will start over and over again.
*/

// A list of vehicles
var vehicles = []; // passers and zombies are the same, they change their status dynamically
var counter = 0; // global variable to keep track of the zombified

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 25; i++) {
    var itsaZombie;
    // itsaZombie = false; // uncomment this line and comment the the following if statement in case you want to start with no infected zombies at all
    if (random(1) >= 0.9) {
      itsaZombie = true;
      counter++;
    } else {
      itsaZombie = false;
    }
    vehicles.push(new Vehicle(random(width), random(height), itsaZombie)); // pushing vehicles into the array. Some of them are going to be active hunters, some won't.
  }
}

function draw() {
  background(51);
  // Update and display all my vehicles
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].run();
    vehicles[i].separate(vehicles); 
    vehicles[i].cohesion(vehicles);
    for (var j = 0; j < vehicles.length; j++) {
      if (i != j) {
        vehicles[i].checkdistance(vehicles[j]);
      }
    }
  }
  // if only zombies are left, I want to start all over again with just one zombie
  if (counter >= vehicles.length) {
    for (var i = vehicles.length - 1; i > 0; i--) {
      vehicles[i].isZombie = false;
    }
    vehicles.splice(0, 1);
    vehicles.push(new Vehicle(random(width), random(height), true));
    counter = 1;
  }
}


function mousePressed() {
  var infect = int(random(0, vehicles.length));
  if (vehicles[infect].isZombie == false){
    vehicles[infect].isZombie = true;
    counter ++;
  }
}

function Vehicle(x, y, virus) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = random(4.5, 5.5);
  this.maxforce = 0.2;
  this.xoff = random(0, 100); // noise offset value for wandering angle
  this.isWandering = true; // boolean value to toggle wandering behavior on/off
  this.isZombie = virus; // boolean value to toggle wandering behavior on/off
  this.alertRange = 200; // zombies smell their prey
  this.infectionRage = 10; // ouch! if you get this close you get infected
  this.r = 6;

  this.timer = new Timer(2000); // how log does it takes to become a zombie after being infected?

  this.seek = function(target) {
    var desired = p5.Vector.sub(target.pos, this.pos);
    desired.setMag(this.maxspeed);
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);
    this.applyForce(steering);

  }

  this.flee = function(target) {
    var desired = p5.Vector.sub(this.pos, target.pos);
    desired.setMag(this.maxspeed * 0.8);
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);
    this.applyForce(steering);

  }

  // Separation 
  this.separate = function(vehicles) {
    var desiredseparation = this.r * 6;
    var sum = createVector();
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < vehicles.length; i++) {
      var d = p5.Vector.dist(this.pos, vehicles[i].pos);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.pos, vehicles[i].pos);
        diff.normalize();
        diff.div(d); // Weight by distance
        sum.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      var steer = p5.Vector.sub(sum, this.vel);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  // Cohesion
  this.cohesion = function(vehicles) {
    if (!this.isDead && !this.isZombie) {
      var desiredcohesion = this.r * 8;
      var sum = createVector();
      var count = 0
      for (var i = 0; i < vehicles.length; i++) {
        if (!vehicles[i].isZombie) {
          var d = p5.Vector.dist(this.pos, vehicles[i].pos);
          if ((d > 0) && (d < desiredcohesion)) {
            // Add location
            sum.add(this.pos)
            count++
          }
        }
      }
      // Average -- divide by how many
      if (count > 0) {
        sum.div(count);
        // Our desired vector is the average scaled to maximum speed
        sum.normalize();
        sum.mult(this.maxspeed);
        // Implement Reynolds: Steering = Desired - Velocity
        var steer = p5.Vector.sub(sum, this.vel);
        steer.limit(this.maxforce);
        this.applyForce(steer);
      }
    }
  }


  this.checkdistance = function(otherVehicle) { // here we switch behaviours based on vehicle's proximity
    var desired = p5.Vector.sub(otherVehicle.pos, this.pos);
    var d = desired.mag();
    if (!this.isDead && !this.isZombie && otherVehicle.isZombie) {
      if (d < this.infectionRage) {
        print("I got you");
        this.isDead = true;
        this.timer.start();
      } else if (d < this.alertRange) {
        otherVehicle.isWandering = false;
        otherVehicle.seek(this);
        this.isWandering = false;
        this.flee(otherVehicle);
      } else {
        //this.isWandering = true;
      }
    }
  }

  this.wander = function() {
    var noisyangle = map(noise(this.xoff), 0, 1, 0, TWO_PI);
    var wandering = p5.Vector.fromAngle(noisyangle);
    wandering.setMag(this.maxspeed * 0.2);
    var steering = p5.Vector.sub(wandering, this.vel);
    steering.limit(this.maxforce);
    this.applyForce(steering);
    this.xoff += 0.005;
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    if (this.isDead) {
      if (this.timer.checkTime()) {
        //println("time is finished");
        this.isZombie = true;
        counter++;
        this.isDead = false;
        println(counter);
      }
    }
  }

  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.vel.heading() + PI / 2;
    if (this.isZombie) {
      fill(255, 0, 0);
    } else if (this.isDead) {
      fill(0);
    } else {
      fill(255);
    }
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }

  this.run = function() {
    this.update();
    this.display();
    this.wrapAround();
    //this.checkEdges();
    
    if (this.isWandering) {
      this.wander();
      this.maxspeed = 4.8;
    } else {
      this.maxspeed = 5;
    }
   
  }

  /*
  this.checkEdges = function() {
    if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x *= -1;
    } else if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -1;
    }
    if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -1;
    } else if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -1;
    }
  }
  */

  this.wrapAround = function() {
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
  }
}

function Timer(tempTotalTime) {
  this.savedTime; // When timed started
  this.totalTime = tempTotalTime; // How long timer should last

  //starting the timer
  this.start = function() {
    this.savedTime = millis();
  }

  this.checkTime = function() {
    // check how much time has passed  
    var passedTime = millis() - this.savedTime;
    if (passedTime > this.totalTime) {
      return true;
    } else {
      return false;
    }
  }
}