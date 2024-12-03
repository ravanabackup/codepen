n = 30;
let a, b, c;
let r = 20;
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	background(0);
	noStroke();
	angleMode(DEGREES);
	a = random(-45, 45);
	b = random(-45, 45);
	c = random(-45, 45);
	w = min(width, height);
}
function draw() {
	background(0);
	specularMaterial(255);
	t = frameCount / 1500;
	pointLight(
		105,
		105,
		105,
		5000 * sin(t * 2),
		5000 * sin(t * 2),
		5000 * sin(t * 2)
	);
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			x = (w / 2) * cos(j * a * t + i * b + t * 2);
			y = (w / 2) * sin(j * a * t - i * c + t);
			z = (w / 2) * cos(j * b * t - i * c * t) * sin(j * c + i * a - t * 3);
			push();
			translate(x, y, z);
			sphere(r, 24, 24);
			pop();
		}
	}
	camera(w, w + 100, -w, 0, 0, 0);
}
function mousePressed() {
	a = random(-45, 45);
	b = random(-45, 45);
	c = random(-45, 45);
	frameCount = 0;
	r = int(random(2, 30));
}