function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
	background(0);
	rotateY(millis() * 0.001)
	
	var res = 10;
	var gridWidth = width/res;
	var gridHeight = height/res;
	noStroke();
	for(var i=0; i<gridWidth; i++){
		for(var j=0; j<gridHeight; j++){
			var x = i * res + res/2 - width/2;
			var y = j * res + res/2 - height/2;
			var noi = noise(i*0.1, j*0.1 + millis() * 0.001, millis() * 0.001);
			var dist = 250 * noi;
			push();
			translate(x, y, dist);
			fill(255 * noi);
			rectMode(CENTER);
			rect(0, 0, res, res);
			pop();
		}
	}
}