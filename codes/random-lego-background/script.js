const legoColors = [
	"#FFFFFF", // White
	"#111111", // Black
	"#0055BF", // Blue
	"#FFD500", // Yellow
	"#C91A09", // Red
	"#6D6E5C", // Dark Stone Grey
	"#F2CD37", // Bright Yellow
	"#008F9B", // Dark Turquoise
	"#B40000", // Dark Red
	"#4B9F4A", // Bright Green
	"#FF8A01", // Bright Orange
	"#9BA19D", // Silver
	"#FCFCFC", // Light Grey
	"#0D325B", // Earth Blue
	"#AEEFEC", // Aqua
	"#0061B0", // Medium Blue
	"#C870A0", // Lavender
	"#923978", // Magenta
	"#E4ADC8", // Light Pink
	"#A2A4A4" // Silver Metallic
];
const COL_1_CHANCE = 30;
const COL_2_CHANCE = 20;
const randInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function legoMyEggo() {
	let mult = randInt(5, 20) / 10;
	let hh = window.innerHeight * mult;
	let ww = window.innerWidth * mult;
	let cols = Math.ceil(ww / 100);
	let rows = Math.ceil(hh / 33);
	document.querySelector("#legos").setAttribute("viewBox", `0 0 ${ww} ${hh}`);
	let legosHere = document.querySelector("#legosHere");
	legosHere.innerHTML = "";
	for (let row = rows - 1; row >= 0; row--) {
		for (let col = 0; col < cols; col++) {
			let x = col * 100;
			let y = row * 33;
			if (Math.random() * 100 < COL_1_CHANCE) {
				legosHere.innerHTML += `<use href="#lego" x="${x}" y="${y}" fill="${legoColors[randInt(0, legoColors.length - 1)]}" />`;
			}
			if (Math.random() * 100 < COL_2_CHANCE) {
				legosHere.innerHTML += `<use href="#lego" x="${x - 50}" y="${y + 28}" fill="${legoColors[randInt(0, legoColors.length - 1)]}" />`;
			}
		}
	}
}
document.querySelector("#legos").addEventListener("click", legoMyEggo);
// window.addEventListener("resize", legoMyEggo);
document.addEventListener('DOMContentLoaded', legoMyEggo);