function setup(){
	createCanvas(windowWidth, windowHeight);
}

function draw(){
	background(0);
	var res = 10;
	var gridWidth = width/res;
	var gridHeight = height/res;
	for(var i=0; i<gridWidth; i++){
		for(var j=0; j<gridHeight; j++){
			var x = i * res + res/2;
			var y = j * res + res/2;
			var noi = noise(i*0.1, j*0.1 + millis() * 0.001, millis() * 0.001);
			var angle = noi * TWO_PI;
			
			if(noi > 0.5){
				var newnoi = map(noi, 0.5, 1.0, 0.1, 1.0);
				stroke(255 * newnoi);
				strokeWeight(5.0 * newnoi)
				push();
				translate(x, y);
				rotate(angle);
				line(0, -res * 0.5 * noi, 0, res * 0.5 * noi);
				pop();
			}else{
				var rectnoi = map(noi, 0.0, 0.5, 0.0, 1.0);
				strokeWeight(1);
				noFill();
				stroke(noi * 40);
				rectMode(CENTER);
				rect(x, y, res * rectnoi, res * rectnoi);
			}
		
		}
	}
}