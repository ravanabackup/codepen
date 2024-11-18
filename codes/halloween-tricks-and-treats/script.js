// Track the collection count of each bonus emoji
let bonusTarget = {
	"🎃": 0,
	"🍬": 0,
	"🍫": 0,
	"🧁": 0,
	"🍭": 0,
	"🍡": 0
};
const targetGoal = 1; // Set the goal for each bonus emoji
const targetDisplay = document.getElementById("target-display");

// Initialize the target display with default values
function updateTargetDisplay() {
	targetDisplay.innerHTML = "";
	for (const emoji in bonusTarget) {
		const currentCount = bonusTarget[emoji];

		// Create a slider element
		const sliderHTML = `
            <div style="margin: 10px 0;">
                <span>${emoji}: ${currentCount} / ${targetGoal}</span>
                <input type="range" min="0" max="${targetGoal}" value="${currentCount}" disabled />
            </div>
        `;

		targetDisplay.innerHTML += sliderHTML;
	}
}

// Update the player's collection status when a bonus is collected
function checkBonusCollisions() {
	const playerRect = playerFish.sections[0].element.getBoundingClientRect();
	bonuses.forEach((bonus, index) => {
		const bonusRect = bonus.getBoundingClientRect();
		if (isColliding(playerRect, bonusRect)) {
			score += 10;
			scoreElement.textContent = `Score: ${score}`;
			bonusTarget[bonus.textContent] += 1; // Update the bonus count
			updateTargetDisplay(); // Refresh the target status display
			bonus.remove();
			bonuses.splice(index, 1);
			createBonus(); // Create a new bonus

			// Check for completion of all targets
			if (checkCompletion()) {
				displayCongratulations(); // Show congratulations if all targets are met
			}
		}
	});
}

// Function to check if all bonus targets are completed
function checkCompletion() {
	for (const emoji in bonusTarget) {
		if (bonusTarget[emoji] < targetGoal) {
			return false; // If any target is not met, return false
		}
	}
	return true; // All targets are met
}
// Function to display a congratulations message
function displayCongratulations() {
	// Clear the game area
	fishTank.innerHTML = "";

	// Create a congratulatory message
	const congratsMessage = document.createElement("div");
	congratsMessage.classList.add("congrats-message");
	congratsMessage.innerText =
		"🎉 Congratulations! You collected all the candies! 🎉";

	// Append the message to the body
	document.body.appendChild(congratsMessage);
}

// Initialize the display when the game starts
updateTargetDisplay();

// Configurations
const numFish = 10;
let fishes = [];
let obstacles = [];
let bonuses = [];
const fishTank = document.querySelector(".fish-tank");
const scoreElement = document.getElementById("score");
let score = 0;

let tankWidth = fishTank.offsetWidth;
let tankHeight = fishTank.offsetHeight;

const bonusEmojis = ["🎃", "🍬", "🍫", "🧁", "🍭", "🍡"];

// Player fish class
class PlayerFish {
	constructor(size = 25, speed = 10) {
		this.sections = [];
		this.size = size;
		this.speed = speed;
		this.direction = 0;
		this.parentElement = this.createParentDiv("player-1"); // Create player fish parent div
		this.createFish("gold", 10); // Create player fish sections
	}

	createParentDiv(className) {
		const parentDiv = document.createElement("div");
		parentDiv.classList.add(className); // Add unique class for the player fish
		fishTank.appendChild(parentDiv); // Add the parent div to the tank
		return parentDiv;
	}

	createFish(color, numSections) {
		for (let i = 0; i < numSections; i++) {
			const section = document.createElement("div");
			section.classList.add("fish-section"); // Add section class
			let size = this.size * (1 - i / numSections);
			section.style.width = `${size}px`;
			section.style.height = `${size}px`;
			section.style.backgroundColor = color;
			section.id = `player-section-${i}`;

			this.parentElement.appendChild(section); // Append each section to the parent div
			this.sections.push({
				element: section,
				x: tankWidth / 2, // Start at the center
				y: tankHeight / 2,
				size: size,
				angle: 0
			});
		}
	}

	move() {
		const playerHead = this.sections[0];
		const dx = mouseX - playerHead.x;
		const dy = mouseY - playerHead.y;
		const angle = Math.atan2(dy, dx);
		const distance = Math.sqrt(dx * dx + dy * dy);
		const moveStep = Math.min(this.speed, distance);

		playerHead.x += moveStep * Math.cos(angle);
		playerHead.y += moveStep * Math.sin(angle);
		this.updateSections();
	}

	updateSections() {
		for (let j = 1; j < this.sections.length; j++) {
			let prev = this.sections[j - 1];
			let current = this.sections[j];
			let dx = prev.x - current.x;
			let dy = prev.y - current.y;
			let angle = Math.atan2(dy, dx);

			current.x = prev.x - Math.cos(angle) * current.size * 0.9;
			current.y = prev.y - Math.sin(angle) * current.size * 0.9;

			current.element.style.transform = `translate(${current.x}px, ${current.y}px) rotate(${angle}rad)`;
		}

		this.sections[0].element.style.transform = `translate(${this.sections[0].x}px, ${this.sections[0].y}px)`;
	}
}

// Enemy fish class
class EnemyFish {
	constructor(index) {
		this.sections = [];
		this.size = 15; // 50% of original enemy size
		this.speed = getRandomSpeed();
		this.direction = getRandomDirection();
		this.parentElement = this.createParentDiv(`enemy-${index}`); // Create enemy fish parent div
		this.createFish(getRandomColor(), index); // Pass the index for unique class
	}

	createParentDiv(className) {
		const parentDiv = document.createElement("div");
		parentDiv.classList.add(className); // Add unique class for each enemy fish
		fishTank.appendChild(parentDiv); // Add the parent div to the tank
		return parentDiv;
	}

	createFish(color, index) {
		const numSections = 10; // Number of sections for enemy fish
		for (let i = 0; i < numSections; i++) {
			const section = document.createElement("div");
			section.classList.add("fish-section"); // Add section class
			let size = this.size * (1 - i / numSections);
			section.style.width = `${size}px`;
			section.style.height = `${size}px`;
			section.style.backgroundColor = color;

			this.parentElement.appendChild(section); // Append each section to the parent div
			this.sections.push({
				element: section,
				x: Math.random() * (tankWidth - size),
				y: Math.random() * (tankHeight - size),
				size: size,
				angle: 0
			});
		}
	}
	move() {
		let dx = this.speed * Math.cos(this.direction);
		let dy = this.speed * Math.sin(this.direction);
		this.sections[0].x += dx;
		this.sections[0].y += dy;

		if (this.sections[0].x < 0 || this.sections[0].x > tankWidth) {
			this.direction = Math.PI - this.direction;
		}
		if (this.sections[0].y < 0 || this.sections[0].y > tankHeight) {
			this.direction = -this.direction;
		}

		this.updateSections();

		if (Math.random() > 0.98) {
			this.direction += ((Math.random() - 0.5) * Math.PI) / 4;
		}
	}

	updateSections() {
		for (let j = 1; j < this.sections.length; j++) {
			let prev = this.sections[j - 1];
			let current = this.sections[j];
			let dx = prev.x - current.x;
			let dy = prev.y - current.y;
			let angle = Math.atan2(dy, dx);

			current.x = prev.x - Math.cos(angle) * current.size * 0.9;
			current.y = prev.y - Math.sin(angle) * current.size * 0.9;

			current.element.style.transform = `translate(${current.x}px, ${current.y}px) rotate(${angle}rad)`;
		}

		this.sections[0].element.style.transform = `translate(${this.sections[0].x}px, ${this.sections[0].y}px)`;
	}
}

// Utility functions
function getRandomSpeed() {
	return 0 + Math.random() * 1;
}

function getRandomDirection() {
	return Math.random() * 2 * Math.PI;
}

function getRandomColor() {
	const neonColors = ["#8A2BE2"];

	return neonColors[Math.floor(Math.random() * neonColors.length)];
}

let mouseMoving = false;
let mouseX = tankWidth / 2,
	mouseY = tankHeight / 2; // Start in center
window.addEventListener("mousemove", (e) => {
	mouseMoving = true;
	const bounds = fishTank.getBoundingClientRect();
	mouseX = e.clientX - bounds.left; // Adjust to fish tank coordinates
	mouseY = e.clientY - bounds.top;
});

const playerFish = new PlayerFish(); // Create player fish
for (let i = 0; i < numFish; i++) {
	fishes.push(new EnemyFish(i + 1)); // Create enemy fish with unique classes
}

// Animate fish tank
function animateFishTank() {
	if (mouseMoving) {
		playerFish.move(); // Move player fish
	}

	for (let fish of fishes) {
		fish.move(); // Move enemy fish
	}

	if (checkCollisions()) {
		resetGame();
	}

	checkBonusCollisions();
	checkObstacleCount(); // Check and regenerate obstacles if needed

	requestAnimationFrame(animateFishTank);
}

// Check if obstacles need to be regenerated
function checkObstacleCount() {
	const maxObstacles = 5;
	if (obstacles.length < maxObstacles) {
		createObstacle(); // Generate more obstacles if count is less than desired
	}
}

// Check for collisions (same as before)
function checkCollisions() {
	for (let obstacle of obstacles) {
		const obstacleRect = obstacle.getBoundingClientRect();
		const playerRect = playerFish.sections[0].element.getBoundingClientRect();
		if (isColliding(playerRect, obstacleRect)) {
			return true;
		}
	}

	for (let fish of fishes) {
		const enemyRect = fish.sections[0].element.getBoundingClientRect();
		const playerRect = playerFish.sections[0].element.getBoundingClientRect();
		if (isColliding(playerRect, enemyRect)) {
			return true;
		}
	}

	return false;
}

// Check if two elements are colliding (same as before)
function isColliding(rect1, rect2) {
	return !(
		rect1.right < rect2.left ||
		rect1.left > rect2.right ||
		rect1.bottom < rect2.top ||
		rect1.top > rect2.bottom
	);
}

// Reset game
// Reset game
function resetGame() {
	// Reset the score
	score = 0;
	scoreElement.textContent = `Score: ${score}`;

	// Reset the bonus target counts
	for (let emoji in bonusTarget) {
		bonusTarget[emoji] = 0;
	}

	// Update the target display
	updateTargetDisplay();

	// Shake the fish tank
	fishTank.classList.add("shake");

	// Remove the shake class after the animation ends
	setTimeout(() => {
		fishTank.classList.remove("shake");
	}, 500); // Duration of the shake animation
}

// Create obstacles and bonuses (same as before)
function createObstacle() {
	const obstacle = document.createElement("div");
	obstacle.classList.add("obstacle");
	obstacle.textContent = "🧟‍♂️"; // Example emoji for obstacle
	obstacle.style.left = `${Math.random() * tankWidth}px`;
	obstacle.style.top = `${Math.random() * tankHeight}px`;

	fishTank.appendChild(obstacle);
	obstacles.push(obstacle);
}

function createBonus() {
	const bonus = document.createElement("div");
	bonus.classList.add("bonus");
	bonus.textContent =
		bonusEmojis[Math.floor(Math.random() * bonusEmojis.length)];
	bonus.style.left = `${Math.random() * tankWidth}px`;
	bonus.style.top = `${Math.random() * tankHeight}px`;

	fishTank.appendChild(bonus);
	bonuses.push(bonus);
}

function removeRandomObstacle() {
	if (obstacles.length > 0) {
		const randomIndex = Math.floor(Math.random() * obstacles.length);
		const obstacleToRemove = obstacles[randomIndex];

		obstacleToRemove.remove(); // Remove the obstacle from the DOM
		obstacles.splice(randomIndex, 1); // Remove the obstacle from the array
	}
}

setInterval(createObstacle, 10000);
setInterval(createBonus, 5000);
setInterval(removeRandomObstacle, 5000);

// Start the game
animateFishTank();