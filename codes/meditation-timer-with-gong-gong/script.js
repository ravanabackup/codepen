//Timer Preferens
gongAfterStart = true; // Gonggong Start
gongAfterHalfTime = false; // Gonggong after halftime
backgrondImages = false; // Background images from unsplash

//Setup
const slider = document.getElementById("slider");
const output = document.getElementById("countdown");
const button = document.getElementById("button");
var sliderValue = slider.value;
output.innerHTML = sliderValue + " SECONDS";
button.addEventListener("click", start);
if (backgrondImages == true) {
	document.body.style.backgroundSize = "cover";
	document.body.style.backgroundImage =
		"url('https://images.unsplash.com/photo-1535242208474-9a2793260ca8?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjYzOTkzMTN8&ixlib=rb-4.0.3&q=85')";
	document.documentElement.style.setProperty(
		"--maincolor",
		"rgba(255,255,255,0.8)"
	);
	document.documentElement.style.setProperty(
		"--secondcolor",
		"rgba(255,255,255,0.5)"
	);
	document.documentElement.style.setProperty(
		"--textcolor",
		"rgba(0,50,0,1)"
	);
}

//Main timer
function start() {
	var sliderValue = slider.value;
	var tl = gsap.timeline();

	// Reset timer
	tl.to("#gonggong", {
		duration: 1,
		ease: "power1.out",
		y: 290,
		onComplete: () => {
			if (gongAfterStart) {
				playGongGong(0.5, 10);
			}
		}
	});

	// Hide & Disable while animating
	tl.to(
		".inputs",
		{ opacity: 0.2, duration: 1, onComplete: toggleDisabled },
		"<"
	);

	// Animate timer and update remaining seconds
	tl.to("#gonggong", {
		duration: sliderValue,
		ease: "none",
		y: 0,
		onComplete: () => {
			playGongGong(0.5, 20);
		},
		onUpdate: function () {
			const remainingSeconds =
				sliderValue - Math.ceil(this.progress() * sliderValue);
			document.getElementById("countdown").textContent =
				remainingSeconds + " SECONDS";
		}
	});

	// Gonggong after halftime
	if (gongAfterHalfTime == true) {
		gsap.delayedCall(sliderValue / 2, function () {
			playGongGong(0.2, 10);
		});
	}

	// Show & Enable after animation
	tl.to(".inputs", { opacity: 1, duration: 1, onComplete: toggleDisabled });
}

// Disabled/Enable button and slider
function toggleDisabled() {
	button.disabled = !button.disabled;
	slider.disabled = !slider.disabled;
}

// Slider update when change
slider.oninput = function () {
	var sliderValue = this.value;
	output.innerHTML = sliderValue + " SECONDS";
};

// Play Sound
function playGongGong(volum, duration) {
	const audioCtx = new AudioContext();
	const oscillator = audioCtx.createOscillator("triangle");
	oscillator.frequency.setValueAtTime(180, audioCtx.currentTime);
	const gainNode = audioCtx.createGain();
	gainNode.gain.setValueAtTime(volum, audioCtx.currentTime);
	oscillator.connect(gainNode).connect(audioCtx.destination);
	oscillator.start();
	oscillator.stop(audioCtx.currentTime + 20);
	gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
}