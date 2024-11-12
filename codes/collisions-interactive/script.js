function getRandomInt(min, max, except) {
  var i = Math.floor(Math.random() * (max - min + 1)) + min;
  if (typeof except == "undefined") return i;
  else if (typeof except == "number" && i == except) return getRandomInt(min, max, except);
  else if (typeof except == "object" && (i >= except[0] && i <= except[1])) return getRandomInt(min, max, except);
  else return i;
}

function isEven(n) {
  return n == parseFloat(n) ? !(n % 2) : void 0;
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

var colors = [];
colors[0] = [];
colors[0]["background"] = "black";// "#272822";
colors[0][1] = "#e6db74";
colors[0][2] = "#f92672";
colors[0][3] = "#53d2ef";
colors[0][4] = "#fd8b20";
colors[0][5] = "#a6e22e";

function Person(id) {
    this.id                         = id;
    this.width                      = getRandomInt(5,12);
    this.height                     = this.width;
    this.x                          = getRandomInt(0,(canvas.width-this.width));
    this.y                          = getRandomInt(0,(canvas.height-this.height));
    this.color                      = "white";
    this.direction                  = getRandomInt(0,360);
    this.isHit                      = false;
    this.nextActionIndex            = 0;
    this.job                        = 'unemployed';
    this.shadowBlur                 = getRandomInt(10,50);
}

Person.prototype.checkIfPositionIsEmpty = function() {
    var initialPosition = [];
    initialPosition = this.readMatrix(this.x, this.y, this.width, this.height, this.id);
    if (initialPosition.length == 0 || typeof initialPosition[0] == 'undefined') {
        this.writeMatrix(this.x, this.y, this.width, this.height, this.id);
        return;
    } else {
        this.x = getRandomInt(0,(canvas.width-this.width));
        this.y = getRandomInt(0,(canvas.height-this.height));
        this.checkIfPositionIsEmpty();
    }
}

Person.prototype.nextAction = function() {
    switch (this.nextActionIndex) {
        case 0 : return this.walk();
        case 1 : return this.stop();
        default : this.walk();
    }
}

Person.prototype.stop = function() {
    this.update();
}

Person.prototype.walk = function() {

    var next_x = this.x + Math.cos(degToRad(this.direction))*params.speed,
        next_y = this.y + Math.sin(degToRad(this.direction))*params.speed;

    // Limites du canvas
    if (next_x >= (canvas.width - this.width) && (this.direction < 90 || this.direction > 270)) {
        next_x = canvas.width - this.width;
        this.direction = getRandomInt(90,270,this.direction);
    }
    if (next_x <= 0 && (this.direction > 90 && this.direction < 270)) {
        next_x = 0;
        var exept = [90,270];
        this.direction = getRandomInt(0,360,exept);
    }
    if (next_y >= (canvas.height - this.height) && (this.direction > 0 && this.direction < 180)) {
        next_y = canvas.height - this.height;
        this.direction = getRandomInt(180,360,this.direction);
    }
    if (next_y <= 0 && (this.direction > 180 && this.direction < 360)) {
        next_y = 0;
        this.direction = getRandomInt(0,180,this.direction);
    }

    // Vérifie si la place dans la matrice est libre
    var nextMatrixPosition = [];
    nextMatrixPosition = this.readMatrix(next_x, next_y, this.width, this.height, this.id);
    if (nextMatrixPosition.length == 0 || typeof nextMatrixPosition[0] == 'undefined') {
        this.eraseMatrix(this.x, this.y, this.width, this.height);

        this.x = next_x;
        this.y = next_y;

        // Enregistre la position dans la matrice
        this.writeMatrix(this.x, this.y, this.width, this.height, this.id);

        this.update();
    }

    // La place dans la matrice est déjà prise -> collision
    else {
        var e = 0;
        while(e <= nextMatrixPosition.length) {
            if (typeof nextMatrixPosition[e] != 'undefined') this.hit(nextMatrixPosition[e]);
            e++;
        }

        this.takeOppositeDirection();

        this.update();
    }      
}


Person.prototype.eraseMatrix = function(x, y, width, height) {
    var x = Math.floor(x),
        y = Math.floor(y);
    var i = x;
    while (i < (x+width)) {
        var u = y;
        while (u < (y+height)) {
            if (matrix[i][u] >= 0) { 
                delete matrix[i][u];
            }
            u++;
        }
        i++;
    }
}


Person.prototype.writeMatrix = function(x, y, width, height, id) {
    var x = Math.floor(x),
        y = Math.floor(y);
    var i = x;
    while (i < (x+width)) {
        var u = y;
        while (u < (y+height)) {
            matrix[i][u] = id;
            u++;
        }
        i++;
    }
}


Person.prototype.readMatrix = function(x, y, width, height, id) {
    var results = [];
    var x = Math.floor(x),
        y = Math.floor(y);
    var i = x;
    while (i < (x+width)) {
        var u = y;
        while (u < (y+height)) {
            // On ne prend pas en compte le résultat s'il correspond à l'id
            //console.log(i, u);
            if (typeof matrix[i][u] != 'undefined' && matrix[i][u] != id) { 
                // On vérifie que l'objet n'a pas déjà été enregistré dans les résultats
                if (results.length > 0) {
                    for (var o in results) {
                        if (matrix[i][u] != results[o]) results[results.length] = matrix[i][u];
                    }
                }
                else results[results.length] = matrix[i][u];
            }
            u++;
        }
        i++;
    }
    return results;
}


Person.prototype.takeOppositeDirection = function() {
    // Droite -> Gauche
    if ((this.direction >= 0 && this.direction < 90) || (this.direction > 270 && this.direction <= 360)){
        this.direction = getRandomInt(90,270);
        return;
    }
    // Gauche -> Droite
    if (this.direction > 90 && this.direction < 270){
        var exept = [90,270];
        this.direction = getRandomInt(0,360,exept);
        return;
    }
    // Bas -> Haut
    if (this.direction > 0 && this.direction < 180) {
        this.direction = getRandomInt(180,360);
        return;
    }
    // Haut -> Bas
    if (this.direction > 180) {
        this.direction = getRandomInt(0,180);
    }
}


Person.prototype.hit = function(objectId) {
    bursts[bursts.length] = new Burst(bursts.length, this.x, this.y);
    this.color = this.color == "white" ? colors[params.theme][getRandomInt(1, colors[params.theme].length-1)] : "white";
    persons[objectId].color = persons[objectId].color == "white" ? colors[params.theme][getRandomInt(1, colors[params.theme].length-1)] : "white";
    persons[objectId].direction = getRandomInt(0,360,persons[objectId].direction);
}


Person.prototype.update = function() {
    context.beginPath();

    context.fillStyle = this.color;
    context.arc(this.x+(this.width/2), this.y+(this.height/2), this.width/2, 0, 2 * Math.PI, false);
    context.shadowColor = this.color;
    context.shadowBlur = this.shadowBlur;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fill();  
}



var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  canvasWidth = document.documentElement.clientWidth,
  canvasHeight = document.documentElement.clientHeight;

var persons = [],
  bursts = [],
  numberOfPerson = canvasWidth * canvasHeight <= 320000 ? 25 : 60,
  matrix = createMatrixArray(),
  worldIsPaused = false,
  carpentersCount = numberOfPerson / 10,
  soldiersCount = numberOfPerson / 10,
  priestsCount = numberOfPerson / 10
  params = {
    speed: 2,
    theme: 0
  };

var gui;
gui = new dat.GUI();
gui.add(params, 'speed').min(0).max(5).step(1).name('Speed');
gui.close();

canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);

function createMatrixArray() {
  var matrix = [], i = 0;
  while (i <= canvasWidth) {
    matrix[i] = [];
    i++;
  }
  return matrix;
}

function start() {
  instantiatePopulation();
  animate();

}

start();

function instantiatePopulation() {
  var i = 0;
  while (i < numberOfPerson) {
    persons[i] = new Person(i);
    persons[i].checkIfPositionIsEmpty();
    i++;
  }
}

function animate() {
  if (worldIsPaused) return;

  //context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = colors[params.theme]["background"];
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Création d'une copie de l'array persons
  persons_order = persons.slice(0);
  // Tri par ordre de position sur l'axe y (afin de gérer les z-index)
  persons_order.sort(function(a, b) {
    return a.y - b.y;
  });

  // Paint les instances dans l'ordre trié
  for (var i in persons_order) {
    var u = persons_order[i].id;
    persons[u].nextAction();
  }

  for (var i in bursts) {
    bursts[i].draw();
  }

  requestAnimationFrame(animate);
}

function kill(objectId) {
  persons[objectId].eraseMatrix(
    persons[objectId].x,
    persons[objectId].y,
    persons[objectId].width,
    persons[objectId].height
  );
  persons[objectId] = null;
  delete persons[objectId];
}

canvas.onclick = function(e) {
  var i = persons.length;
  persons[i] = new Person(i);
  persons[i].x = e.layerX;
  persons[i].y = e.layerY;
};



function Burst(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.r = 1;
  this.a = getRandomInt(2,7)/10;
}

Burst.prototype.draw = function() {

  context.beginPath();
  context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  context.closePath();
  context.strokeStyle = "rgba(100,100,100,"+this.a+")";
  context.shadowBlur = 0;
  context.stroke();
  this.a -= .01;
  if (this.a <= 0) this.die();
  else this.r ++ ;
}

Burst.prototype.die = function() {
  bursts[this.id] = null;
  delete(bursts[this.id]);
}