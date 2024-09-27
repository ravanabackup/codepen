Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};


document.onclick = function(){

	console.clear();
	
	var x = event.clientX;
    var y = event.clientY;
	var lineCoord = [];
	var line = document.createElementNS("http://www.w3.org/2000/svg", 'path');
	this.svg = document.getElementById('stage');
	
	for (var i = 0; i < 23; i++) {
  	var random = Math.floor(Math.random() * 300) + 200  
	lineCoord.push(random);	
	}
	
	lineCoord.insert(0, 'M');
	lineCoord.insert(1, x);
	lineCoord.insert(2, y);
	lineCoord.insert(3, 'Q');
	
	
	
	
	
var path = lineCoord.join(' ');
line.setAttribute('d', path);
line.style.fill = 'none';
line.style.stroke = '#C9EDDC';
line.style.strokeLinecap = "round";
line.style.strokeWidth = '10';

	
while (this.svg.hasChildNodes()) {   
    this.svg.removeChild(this.svg.firstChild);
}
	
this.svg.appendChild(line);

};