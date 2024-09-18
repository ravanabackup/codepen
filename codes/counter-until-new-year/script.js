const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: 0x000000
});
document.body.appendChild(app.view);

const textContainer = new PIXI.Container();
app.stage.addChild(textContainer);

const endDate = new Date("2025-01-01T00:00:00Z").getTime();

let lastFetchTime = 0;
const fetchInterval = 1000;

async function updateCounter() {
	const now = Date.now();
	if (now - lastFetchTime < fetchInterval) {
		useLocalTime();
		return;
	}
	lastFetchTime = now;

	try {
		const response = await fetch("http://worldtimeapi.org/api/ip");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		const utcTime = new Date(data.utc_datetime).getTime();
		const timeLeft = endDate - utcTime;

		if (timeLeft <= 0) {
			textContainer.removeChildren();
			const endText = new PIXI.Text("Happy New Year 2025!", {
				fontFamily: "Press Start 2P",
				fontSize: 48,
				fill: "#ff0000"
			});
			endText.anchor.set(0.5);
			endText.position.set(app.screen.width / 2, app.screen.height / 2);
			textContainer.addChild(endText);
			triggerFireworks();
			return;
		}

		const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
		const milliseconds = Math.floor((timeLeft % 1000) / 10);

		const formattedSeconds = String(seconds).padStart(2, "0");
		const formattedMilliseconds = String(milliseconds).padStart(2, "0");

		const timeString = `${days}d ${hours}h ${minutes}m ${formattedSeconds}s ${formattedMilliseconds}ms`;

		textContainer.removeChildren();

		const timerText = new PIXI.Text(timeString, {
			fontFamily: "Press Start 2P",
			fontSize: 48,
			fill: "#00ff00"
		});
		timerText.anchor.set(0.5);
		timerText.position.set(app.screen.width / 2, app.screen.height / 2);
		textContainer.addChild(timerText);

		gsap.to(timerText, { alpha: 0.7, duration: 1, yoyo: true, repeat: -1 });

		document.getElementById("timer").innerText = timeString;
		document.getElementById("timer").classList.remove("calculating");
	} catch (error) {
		console.error("Error fetching time:", error);
		useLocalTime();
	}
}

function useLocalTime() {
	const now = new Date().getTime();
	const timeLeft = endDate - now;

	if (timeLeft <= 0) {
		textContainer.removeChildren();
		const endText = new PIXI.Text("Happy New Year 2025!", {
			fontFamily: "Press Start 2P",
			fontSize: 48,
			fill: "#ff0000"
		});
		endText.anchor.set(0.5);
		endText.position.set(app.screen.width / 2, app.screen.height / 2);
		textContainer.addChild(endText);
		triggerFireworks();
		return;
	}

	const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
	const milliseconds = Math.floor((timeLeft % 1000) / 10);

	const formattedSeconds = String(seconds).padStart(2, "0");
	const formattedMilliseconds = String(milliseconds).padStart(2, "0");

	const timeString = `${days}d ${hours}h ${minutes}m ${formattedSeconds}s ${formattedMilliseconds}ms`;

	textContainer.removeChildren();

	const timerText = new PIXI.Text(timeString, {
		fontFamily: "Press Start 2P",
		fontSize: 48,
		fill: "#00ff00"
	});
	timerText.anchor.set(0.5);
	timerText.position.set(app.screen.width / 2, app.screen.height / 2);
	textContainer.addChild(timerText);

	gsap.to(timerText, { alpha: 0.7, duration: 1, yoyo: true, repeat: -1 });

	document.getElementById("timer").innerText = timeString;
	document.getElementById("timer").classList.remove("calculating");
}

function triggerFireworks() {
	const fireworksContainer = new PIXI.Container();
	app.stage.addChild(fireworksContainer);

	for (let i = 0; i < 100; i++) {
		const firework = new PIXI.Graphics();
		firework.beginFill(0xffffff);
		firework.drawCircle(0, 0, 2);
		firework.endFill();
		firework.x = Math.random() * app.screen.width;
		firework.y = Math.random() * app.screen.height;
		fireworksContainer.addChild(firework);

		gsap.to(firework, {
			x: firework.x + (Math.random() - 0.5) * 200,
			y: firework.y + (Math.random() - 0.5) * 200,
			alpha: 0,
			duration: 2,
			onComplete: () => {
				fireworksContainer.removeChild(firework);
			}
		});
	}
}

function goFullScreen() {
	const elem = document.documentElement;
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) {
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen();
	}
}

function typewriterEffect(text, element, delay = 50) {
	let index = 0;
	element.innerText = "";

	function type() {
		if (index < text.length) {
			element.innerText += text.charAt(index);
			index++;
			setTimeout(type, delay);
		}
	}

	type();
}

document.getElementById("start-button").addEventListener("click", () => {
	goFullScreen();
	document.getElementById("start-button").style.display = "none";
	updateCounter();
	setInterval(updateCounter, 100);

	const typewriterText = document.getElementById("typewriter-text");
	const messages = [
		"The counter is set to an atomic clock.",
		"The delay can be quite long before the display.",
		"Be patient.",
		" ",
		"The counter is based on UTC time.",
		" ",
		"Code and Graphics by : HL",
		" "
	];

	let index = 0;

	function displayNextMessage() {
		if (index < messages.length) {
			typewriterEffect(messages[index], typewriterText);
			index++;
		} else {
			index = 0;
			typewriterEffect(messages[index], typewriterText);
			index++;
		}
		setTimeout(displayNextMessage, messages[index - 1].length * 50 + 1000);
	}

	displayNextMessage();
});

const particlesContainer = new PIXI.Container();
app.stage.addChild(particlesContainer);

function createParticle() {
	const particle = new PIXI.Graphics();
	particle.beginFill(0xffffff);
	particle.drawCircle(0, 0, 2);
	particle.endFill();
	particle.x = Math.random() * app.screen.width;
	particle.y = Math.random() * app.screen.height;
	particlesContainer.addChild(particle);

	gsap.to(particle, {
		x: particle.x + (Math.random() - 0.5) * 200,
		y: particle.y + (Math.random() - 0.5) * 200,
		alpha: 0,
		duration: 2,
		onComplete: () => {
			particlesContainer.removeChild(particle);
		}
	});
}

setInterval(createParticle, 100);

gsap.to("#background-image", {
	rotationX: 0,
	rotationY: 0,
	duration: 2,
	repeat: -1,
	yoyo: true,
	delay: 0
});

gsap.to("#timer-container", {
	rotationX: 0,
	rotationY: 0,
	duration: 2,
	repeat: -1,
	yoyo: true,
	delay: 1
});