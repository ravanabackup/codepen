"use strict";

// Create the canvas
const canvas = document.createElement("canvas");
// set dimentions of the canvas
const w = (canvas.width = 1920);
const h = (canvas.height = 1080);
// get the context of the canvas (CanvasRenderingContext2D)
const ctx = canvas.getContext("2d");
// Set font and size
ctx.font = "1cm arial";

// Attach the canvas to the body, you can also use document.appendChild
document.body.prepend(canvas);

// Toggle fullscreen on click
canvas.onclick = (e) =>
	document.fullscreenElement
		? document.exitFullscreen()
		: canvas.requestFullscreen();

// Restart the animation/rendering when space is pressed
onkeydown = (e) => {
	if (Y >= h && e.code === "Space") {
		ctx.clearRect(0, 0, w, h);
		Y = 0;
		animate();
	}
};

// Magic recursive fractal function : pretty standard julia fractal function
const f = (X, Y, n = 80) =>
	X * X + Y * Y < n ? f(X * X - Y * Y - 0.8, 2 * X * Y - 0.2, --n) : n / 80;

// Since recursion is not permittet in GLSL... just testing...
const nonRecursiveJulia = (X, Y, n = 80) => {
	for (let nextY = 0; n > 0 && X * X + Y * Y < n; n--) {
		nextY = 2 * X * Y - 0.2;
		X = X * X - Y * Y - 0.8;
		Y = nextY;
	}
	return n / 80;
};

// Magic color function : Custom function to render the color of each pixel
const cF = (s) => `hsl(${s * 90 - 200},${200 - s * 200}%,${(1 - s) * 99}%)`;
// Variable to track the scanline (Y position)
let Y = 0;
// Scalar variable, used to calculate the color of each pixels
let s = 0;

// Main animation
function animate() {
	for (let X = 0; X < w; X++) {
		// Set the scale/zoom of the fractal image (pr pixel)
		s = f(X / 600 - 1.6, Y / 600 - 0.9);

		// Set til fillcolor
		ctx.fillStyle = cF(s);

		// create a flame like animation: plain scanline animation vould be:
		// ctx.fillRect(X, Y, 1, 1);
		ctx.fillRect(X, h - Y, 1, -((1 + s) ** 8));

		/*//
		ctx.fillStyle=`hsl(${Y*3+X/5.6},100%,50%)`
		ctx.fillRect(X, h - 3, 1,3);
		//*/
	}
	// No need to keep animating afte the image is renderes
	// I use setTimeout in stead fo requestAnimationFrame to
	// have the fastest animation as posible, this means the animation
	// is hardware dependant (cpu speed insted of screen refresh rate)
	if (Y++ < h) setTimeout(animate);
	else {
		// When the image is done print a message on screen
		ctx.fillStyle = "#fff"; // css hex shorthand for white
		ctx.fillText("Press space to restart", 40, 70);
	}
}

// Start the animation
animate();