var font;
var myText = "Do or do not, there is no try! ";

function preload(){
	font = loadFont('https://arivaux.com/prototype/codevember2017/SpaceMono-Bold.ttf');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
}

function draw(){
	background(0);
	myText = myText.toUpperCase();
	var charArray = split(myText, "");
	//console.log(charArray.length);
	fill(255);
	noStroke();
	textAlign(CENTER, CENTER);
	textFont(font);
	textSize(15);
	//get the width, height and letter spacing of the letter
	var charWidth = textWidth(charArray[0]);
	var charHeight = textAscent() + textDescent();
	var letterSpacing = 4.0;
	//Define the number of letter per width
	var gridWidth = width / (charWidth + letterSpacing);
	//Define the number of letter per height
	var gridHeight = height / charHeight;
	//Define the max distance between the mouse and the letter (the hypotenuse of the canvas)
	var hypothenuse = sqrt(width * width + height * height);
	//define and offset time for animation
	var offsetTime = millis() * 0.01;
	for(var j=0; j<gridHeight; j++){
		for(var i=0; i<gridWidth; i++){
			//Define the x, y position
			var x = i * (charWidth + letterSpacing);
			var y = j * charHeight;
			//Find the index of the letter in the array using a % of the arry size
			var index = floor(i + j * gridWidth);
			var letterIndex = index % (charArray.length - 1);
			//get the letter
			var letter = charArray[letterIndex];
			//find the angle between the letter and the mouse
			var angleFromMouse = atan2(y - mouseY, x - mouseX);
			//find the distance between the letter and the mouse
			var distanceFromMouse = dist(x, y, mouseX, mouseY);
			//Remap the distance in order to define an increment
			var incPerDistance = map(distanceFromMouse, 0, hypothenuse, 1.0, 0.0);
			//define a new text size
			var newTextSize = 5 + incPerDistance * 10;
			//define a sin wave per letter for their sizes
			var sinPerLetter = sin(index * 5.0 * PI + offsetTime);
			var sinInc = map(sinPerLetter, -1, 1, 0.5, 1.0);
			var sinSize = map(sinPerLetter, -1, 1, 0.0, 5.0);
			var noi = noise(i * 0.25, j*0.25, millis() * 0.001);
			var theta = HALF_PI - noi * PI;
			//draw the elements
			push();
			translate(x, y);
			rotate(theta);//angleFromMouse + PI);
			noStroke();
			fill(255 * sinInc);
			textSize(newTextSize + sinSize)
			text(letter, (charWidth + letterSpacing) * 0.5, -charHeight * 0.5);
			pop();
		}
	}
}