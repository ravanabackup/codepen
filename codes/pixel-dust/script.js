// Pixel Dust - click and drag and draw out the pixel dust
// by Paul Neave
// @neave

// Based on http://www.dgp.toronto.edu/people/stam/reality/Research/pdf/GDC03.pdf

function FluidField() {
	var iterations = 4;
	var dt = 0.05;
	var damp = 0.99;
	var dens;
	var dens_prev;
	var u;
	var u_prev;
	var v;
	var v_prev;
	var width;
	var height;
	var rowSize;
	var size;
	var uiCallback;
	var displayFunc;
	
	function Field(dens, u, v) {
		this.getDensity = function(x, y) {
			return dens[(x + 1) + (y + 1) * rowSize];
		};
		
		this.setDensity = function(x, y, d) {
			dens[(x + 1) + (y + 1) * rowSize] = d;
		};
		
		this.setVelocity = function(x, y, xv, yv) {
			u[(x + 1) + (y + 1) * rowSize] = xv;
			v[(x + 1) + (y + 1) * rowSize] = yv;
		};
	}
	
   	function addFields(x, s) {
		for (var i = size; i--; ) x[i] += s[i] * dt;
	}
	
	function setBoundary(b, x) {
		if (b == 1) {
			for (var i = 1; i <= width; i++) {
				x[i] = x[i + rowSize];
				x[i + (height+1) *rowSize] = x[i + height * rowSize];
			}
			
			for (var j = 1; i <= height; i++) {
				x[j * rowSize] = -x[1 + j * rowSize];
				x[(width + 1) + j * rowSize] = -x[width + j * rowSize];
			}
		}
		else if (b == 2) {
			for (var i = 1; i <= width; i++) {
				x[i] = -x[i + rowSize];
				x[i + (height + 1) * rowSize] = -x[i + height * rowSize];
			}
			
			for (var j = 1; j <= height; j++) {
				x[j * rowSize] = x[1 + j * rowSize];
				x[(width + 1) + j * rowSize] = x[width + j * rowSize];
			}
		}
		else {
			for (var i = 1; i <= width; i++) {
				x[i] = x[i + rowSize];
				x[i + (height + 1) * rowSize] = x[i + height * rowSize];
			}
			
			for (var j = 1; j <= height; j++) {
				x[j * rowSize] = x[1 + j * rowSize];
				x[(width + 1) + j * rowSize] = x[width + j * rowSize];
			}
		}
		
		var maxEdge = (height + 1) * rowSize;
		x[0] = 0.5 * (x[1] + x[rowSize]);
		x[maxEdge] = 0.5 * (x[1 + maxEdge] + x[height * rowSize]);
		x[(width + 1)] = 0.5 * (x[width] + x[(width + 1) + rowSize]);
		x[(width + 1) + maxEdge] = 0.5 * (x[width + maxEdge] + x[(width + 1) + height * rowSize]);
	}
	
	function diffuse(b, x, x0) {
		var a = 0;
		solveLinear(b, x, x0, a, 1 + 4 * a);
	}
	
	function diffuse2(x, x0, y, y0) {
		var a = 0;
		solveLinear2(x, x0, y, y0, a, 4 * a + 1);
	}
	
	function solveLinear(b, x, x0, a, c) {
		if (a == 0 && c == 1) {
			for (var j = 1; j <= height; j++) {
				var currentRow = j * rowSize;
				currentRow++;
				
				for (var i = 0; i < width; i++) {
					x[currentRow] = x0[currentRow];	
					currentRow++;
				}
			}
			
			setBoundary(b, x);
		}
		else {
			var invC = 1 / c;
			for (var k = 0 ; k < iterations; k++) {
				for (var j = 1 ; j <= height; j++) {
					var lastRow = (j - 1) * rowSize;
					var currentRow = j * rowSize;
					var nextRow = (j + 1) * rowSize;
					var lastX = x[currentRow];
					currentRow++;
					
					for (var i = 1; i <= width; i++) {
						lastX = x[currentRow] = (x0[currentRow] + a * (lastX + x[++currentRow] + x[++lastRow] + x[++nextRow])) * invC;
					}
				}
				
				setBoundary(b, x);
			}
		}
	}
	
	function solveLinear2(x, x0, y, y0, a, c) {
		if (a == 0 && c == 1) {
			for (var j = 1; j <= height; j++) {
				var currentRow = j * rowSize;
				currentRow++;
				
				for (var i = 0; i < width; i++) {
					x[currentRow] = x0[currentRow];
					y[currentRow] = y0[currentRow];
					currentRow++;
				}
			}
			
			setBoundary(1, x);
			setBoundary(2, y);
		}
		else {
			var invC = 1 / c;
			for (var k = 0 ; k < iterations; k++) {
				for (var j = 1 ; j <= height; j++) {
					var lastRow = (j - 1) * rowSize;
					var currentRow = j * rowSize;
					var nextRow = (j + 1) * rowSize;
					var lastX = x[currentRow];
					var lastY = y[currentRow];
					currentRow++;
					
					for (var i = 1; i <= width; i++) {
						lastX = x[currentRow] = (x0[currentRow] + a * (lastX + x[currentRow] + x[lastRow] + x[nextRow])) * invC;
						lastY = y[currentRow] = (y0[currentRow] + a * (lastY + y[++currentRow] + y[++lastRow] + y[++nextRow])) * invC;
					}
				}
				
				setBoundary(1, x);
				setBoundary(2, y);
			}
		}
	}
	
	function advect(b, d, d0, u, v) {
		var wdt0 = width * dt;
		var hdt0 = height * dt;
		var wp5 = width + 0.5;
		var hp5 = height + 0.5;
		
		for (var j = 1; j<= height; j++) {
			var pos = j * rowSize;
			for (var i = 1; i <= width; i++) {
				var x = i - wdt0 * u[++pos]; 
				var y = j - hdt0 * v[pos];
				
				if (x < 0.5) x = 0.5;
				else if (x > wp5) x = wp5;
				
				var i0 = x | 0;
				var i1 = i0 + 1;
				
				if (y < 0.5) y = 0.5;
				else if (y > hp5) y = hp5;
				
				var j0 = y | 0;
				var j1 = j0 + 1;
				var s1 = x - i0;
				var s0 = 1 - s1;
				var t1 = y - j0;
				var t0 = 1 - t1;
				var row1 = j0 * rowSize;
				var row2 = j1 * rowSize;
				
				d[pos] = s0 * (t0 * d0[i0 + row1] + t1 * d0[i0 + row2]) + s1 * (t0 * d0[i1 + row1] + t1 * d0[i1 + row2]);
			}
		}
		
		setBoundary(b, d);
	}
	
	function project(u, v, p, div) {
		var h = -0.5 / Math.sqrt(width * height);
		for (var j = 1 ; j <= height; j++) {
			var row = j * rowSize;
			var prevRow = (j - 1) * rowSize;
			var prevValue = row - 1;
			var currentRow = row;
			var nextValue = row + 1;
			var nextRow = (j + 1) * rowSize;
			
			for (var i = 1; i <= width; i++) {
				div[++currentRow] = h * (u[++nextValue] - u[++prevValue] + v[++nextRow] - v[++prevRow]);
				p[currentRow] = 0;
			}
		}
		
		setBoundary(0, div);
		setBoundary(0, p);
		solveLinear(0, p, div, 1, 4);
		
		var wScale = 0.5 * width;
		var hScale = 0.5 * height;
		
		for (var j = 1; j<= height; j++) {
			var prevPos = j * rowSize - 1;
			var currentPos = j * rowSize;
			var nextPos = j * rowSize + 1;
			var prevRow = (j - 1) * rowSize;
			var currentRow = j * rowSize;
			var nextRow = (j + 1) * rowSize;
			
			for (var i = 1; i<= width; i++) {
				u[++currentPos] -= wScale * (p[++nextPos] - p[++prevPos]);
				v[currentPos] -= hScale * (p[++nextRow] - p[++prevRow]);
			}
		}
		
		setBoundary(1, u);
		setBoundary(2, v);
	}
	
	function densityStep(x, x0, u, v) {
		addFields(x, x0);
		diffuse(0, x0, x);
		advect(0, x, x0, u, v);
	}
	
	function velocityStep(u, v, u0, v0) {
		addFields(u, u0);
		addFields(v, v0);
		
		var temp = u0;
		u0 = u;
		u = temp;
		
		temp = v0;
		v0 = v;
		v = temp;
		
		diffuse2(u, u0, v, v0);
		project(u, v, u0, v0);
		
		temp = u0;
		u0 = u;
		u = temp;
		
		temp = v0;
		v0 = v;
		v = temp;
		
		advect(1, u, u0, u0, v0);
		advect(2, v, v0, u0, v0);
		project(u, v, u0, v0);
	}
	
	this.update = function() {
		for (var i = size; i--; ) {
			u_prev[i] = v_prev[i] = dens_prev[i] = 0;
			dens[i] *= damp;
		}
		
		uiCallback(new Field(dens_prev, u_prev, v_prev));
		velocityStep(u, v, u_prev, v_prev);
		densityStep(dens, dens_prev, u, v);
		displayFunc(new Field(dens, u, v));
	};
	
	this.setDisplayFunction = function(func) {
		displayFunc = func;
	};

	this.setUICallback = function(callback) {
		uiCallback = callback;
	};
	
	this.reset = function() {
		rowSize = width + 2;
		size = (width + 2) * (height + 2);
		
		dens = new Array(size);
		dens_prev = new Array(size);
		
		u = new Array(size);
		u_prev = new Array(size);
		
		v = new Array(size);
		v_prev = new Array(size);
		
		for (var i = size; i--; ) {
			dens_prev[i] = u_prev[i] = v_prev[i] = dens[i] = u[i] = v[i] = 0;
		}
	};
	
	this.setResolution = function(w, h) {
		width = w;
		height = h;
		this.reset();
	};
}




var displayWidth = 800;
var displayHeight = 800;
var fieldSize = 4;
var fieldWidth = Math.round(displayWidth / fieldSize);
var fieldHeight = Math.round(displayHeight / fieldSize);
var omx = 0;
var omy = 0;
var mx = 0;
var my = 0;
var density = 200;
var running = false;
var drawing = false;
var canvas;
var context;
var buffer;
var bufferData;
var fluid;

function initBuffer() {
	var bufferCanvas = document.createElement('canvas');
	bufferCanvas.width = fieldWidth;
	bufferCanvas.height = fieldHeight;
  
	try {
		buffer = bufferCanvas.getContext('2d').createImageData(fieldWidth, fieldHeight);
		bufferData = buffer.data;
		var size = fieldWidth * fieldHeight * 4;
		for (var i = 3; i < size; i += 4) {
			bufferData[i] = 0xFF;
		}
	}
	catch (e) { }
}

function updateFrame(field) {
	if (drawing) {
		var dx = mx - omx;
		var dy = my - omy;
		var length = (Math.sqrt(dx * dx + dy * dy) + 0.5) | 0;
		if (length < 1) length = 1;
		
		for (var i = 0; i < length; i++) {
			var x = ((omx + dx * i / length) / displayWidth * fieldWidth) | 0
			var y = ((omy + dy * i / length) / displayHeight * fieldHeight) | 0;
			field.setVelocity(x, y, dx, dy);
			field.setDensity(x, y, density);
		}
	
		omx = mx;
		omy = my;
	}
}

function drawFrame(field) {
	for (var x = fieldWidth; x--; ) {
		for (var y = fieldHeight; y--; ) {
			bufferData[(y * fieldWidth + x) * 4 + Math.floor(Math.random() * 3)] = field.getDensity(x, y) * 0xFF;
		}
	}
	
	context.putImageData(buffer, 0, 0);
}

function startFluid() {
  if (running) return;
  running = true;
	interval = setInterval(fluid.update, 20);
}

function stopFluid() {
    running = false;
    clearTimeout(interval);
}

function resetFluid() {
	fluid.reset();
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function getDocWidth() {
    var D = document;
    return Math.max(
        D.body.scrollWidth, D.documentElement.scrollWidth,
        D.body.offsetWidth, D.documentElement.offsetWidth,
        D.body.clientWidth, D.documentElement.clientWidth
    );
}

function getNormHeight() {
  return getDocHeight() / fieldHeight / fieldSize;
}

function getNormWidth() {
  return getDocWidth() / fieldWidth / fieldSize;
}

function mouseDown(event) {
  omx = mx = event.clientX / getNormWidth();
  omy = my = event.clientY / getNormHeight();
	drawing = true;
	event.preventDefault();
	return false;
}

function mouseMove(event) {
	if (drawing) {
		mx = event.clientX / getNormWidth();
    my = event.clientY / getNormHeight();
		event.preventDefault();
		return false;
	}
}

function mouseUp(event) {
	drawing = false;
}

function touchStart(event) {
	omx = mx = event.changedTouches[0].clientX / getNormWidth();
	omy = my = event.changedTouches[0].clientY / getNormHeight();
	drawing = true;
	event.preventDefault();
	return false;
}

function touchMove(event) {
	if (drawing) {
		var x = event.changedTouches[0].clientX / getNormWidth();
	 	var y = event.changedTouches[0].clientY / getNormHeight();
		mx = x;
		my = y;
		event.preventDefault();
		return false;
	}
}

function touchEnd(event) {
	drawing = false;
}

function stopEvent(event) {
	event.preventDefault();
	return false;
}

window.onload = function() {
  setTimeout(function() {
    canvas = document.getElementById('canvas');
	  context = canvas.getContext('2d');
  	canvas.onmousedown = mouseDown;
  	canvas.onmousemove = mouseMove;
  	onmouseup = mouseUp;
  	onmousedown = stopEvent;
  	onmousemove = stopEvent;
	  canvas.addEventListener('touchstart', touchStart, false);
  	canvas.addEventListener('touchmove', touchMove, false);
  	canvas.addEventListener('touchend', touchEnd, false);
	  document.addEventListener('touchmove', stopEvent, false);
  
    mx = displayWidth = getDocWidth() / 2;
  	my = displayHeight = getDocHeight() / 2;

    fieldWidth = Math.round(displayWidth / fieldSize);
  	fieldHeight = Math.round(displayHeight / fieldSize);
  
	  canvas.width = fieldWidth;
	  canvas.height = fieldHeight;
	
  	fluid = new FluidField();
	  fluid.setResolution(canvas.width, canvas.height);
  	fluid.setUICallback(updateFrame);
	  fluid.setDisplayFunction(drawFrame);
  
  	initBuffer();
  	startFluid();
    
    // Fake some drawing to start with
    drawing = true;
    mouseMove({
      clientX: displayWidth * 4,
      clientY: displayHeight * 4
    });
    drawing = false;
    
  }, 750);
};