//WCCChallenge
//random walk snails (no feet, lots of coffee)
//click to pause, space to change mode, s to save
let snail = [];
let snailSet = [];
let nSnails = 200;
let playBool = true;
let snailMode = 3;
function preload() {
	for (let i = 1; i < 5; i++) {
		snail[i - 1] = loadImage(
			"https://assets.codepen.io/4559259/snail" + i + ".png"
		);
	}
}
function setup() {
	nSnails = random(50, 300);
	c = min(windowWidth, windowHeight);
	cnv = createCanvas(windowWidth, windowHeight);
	background(25);
	for (let i = 0; i < nSnails; i++) {
		snailSet.push(new vibratingSnail());
	}
}

function draw() {
	translate(width / 2, height / 2);
	if (playBool) {
		for (let i = 0; i < snailSet.length; i++) {
			snailSet[i].display();
			if (
				snailSet[i].x > width ||
				snailSet[i].y > height ||
				snailSet[i].x < -width ||
				snailSet[i].y < -height
			) {
				snailSet.splice(i, 1);
			}
		}
	}
}

class vibratingSnail {
	//coffee+snails=happy
	constructor() {
		this.x = random(-c, c);
		this.y = random(-c, c);
		this.dx = random(1, 20);
		this.dy = random(1, 20);
	}
	display() {
		if (snailMode === 0) {
			this.x = this.x + random(-this.dx / 2, this.dx);
			this.y = this.y + random(-this.dy / 2, this.dy);
			image(snail[frameCount % 4], this.x, this.y, 100, 100);
			image(snail[frameCount % 4], this.y, this.x, 100, 100);
		}
		if (snailMode === 1) {
			this.x =
				this.x +
				sin(frameCount / (this.dx * 10)) +
				random(-this.dx / 5, this.dx / 3);
			this.y =
				this.y +
				sin(frameCount / (this.dy * 20)) +
				random(-this.dy / 5, this.dy / 3);
			image(
				snail[frameCount % 4],
				this.x,
				this.y,
				70 - 20 * sin(frameCount / 50),
				70 - 20 * sin(frameCount / 50)
			);
		}
		if (snailMode === 2) {
			this.x =
				this.x +
				2 * sin(frameCount / (this.dx * 10)) +
				random(-this.dx / 5, this.dx / 3);
			this.y = this.y + random(-this.dy / 5, this.dy / 3);
			image(
				snail[frameCount % 4],
				this.x,
				this.y,
				70 - 50 * sin(frameCount / 100),
				70 - 50 * sin(frameCount / 100)
			);
		}
		if (snailMode === 3) {
			push();
			rotate(frameCount / 200);
			this.x = this.x + random(-this.dx / 2, this.dx) / 3;
			this.y = this.y + random(-this.dy / 2, this.dy) / 3;
			image(
				snail[frameCount % 4],
				this.x,
				this.y,
				20 - 30 * sin(frameCount / 100),
				20 - 30 * sin(frameCount / 100)
			);
			image(
				snail[frameCount % 4],
				this.y,
				this.x,
				20 - 30 * sin(frameCount / 100),
				20 - 30 * sin(frameCount / 100)
			);
			pop();
		}
		if (snailMode === 4) {
			this.x = this.x + random(-this.dx, this.dx / 5);
			this.y = this.y + random(-this.dy / 3, this.dy / 3);
			image(
				snail[frameCount % 4],
				this.x,
				this.y,
				70 - 30 * sin(frameCount / 100),
				70 - 30 * sin(frameCount / 100)
			);
		}
		if (snailMode === 5) {
			//a truely random walk
			this.x = this.x + random(-this.dx, this.dx);
			this.y = this.y + random(-this.dy, this.dy);
			image(snail[frameCount % 4], this.x, this.y, 100, 100);
		}
		if (snailMode === 6) {
			push();
			rotate(-frameCount / 200);
			this.x = this.x + random(-this.dx / 2, this.dx) / 2;
			this.y = this.y + random(-this.dy / 2, this.dy) / 2;
			image(
				snail[frameCount % 4],
				this.x,
				this.y,
				100 * sin(frameCount / 100),
				100 * sin(frameCount / 100) * sin(frameCount / 100)
			);
			pop();
		}
		if (snailMode === 7) {
			//spinny
			push();
			rotate(-frameCount / 100);
			this.x = this.x + random(-this.dx / 2, this.dx) / 3;
			this.y = this.y + random(-this.dy / 2, this.dy) / 3;
			image(
				snail[frameCount % 4],
				this.x,
				this.y,
				70 - 30 * sin(frameCount / 100),
				70 - 30 * sin(frameCount / 100)
			);
			pop();
		}
		if (snailMode === 8) {
			this.x = this.x + random(-this.dx / 2, this.dx) / 3;
			this.y = this.y + random(-this.dy / 2, this.dy) / 3;
			image(
				snail[frameCount % 4],
				this.x,
				this.y,
				20 - 30 * sin(frameCount / 100),
				20 - 30 * sin(frameCount / 100)
			);
			image(
				snail[frameCount % 4],
				this.y,
				this.x,
				20 - 30 * sin(frameCount / 100),
				20 - 30 * sin(frameCount / 100)
			);
		}
	}
}
function mousePressed() {
	playBool = !playBool;
}
function keyPressed() {
	if (keyCode === 32) {
		frameCount = 0;
		snailMode = (snailMode + 1) % 9;
		snailSet = [];
		playBool = true;
		setup();
		draw();
	}
	if (keyCode === 83) {
		save(cnv, "snails", "png");
	}
}