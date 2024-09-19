// Based on https://www.dwitter.net/d/26611
const x = c.getContext("2d");
const { sin, cos, tan } = Math;
const w = c.width;
const h = c.height;
const wh = w * h;
const I = new ImageData(w, h);
c.onclick = (e) => e.target.requestFullscreen();
let Y = 0;

const fractal = (X, Y, n = 0) =>
	X * X + Y * Y > 4 ? n : fractal(2 * X * Y - 0.7, Y * Y - X * X, n + 2);
function animate() {
	for (X = 0; X < h; X++) {
		const s = fractal(Y / w, X / h);
		x.fillStyle = s & 2 ? "#000" : "#fff"; //`hsl(${(s & 2) * 90 + 20 - s*3},100%,50%)`;
		x.fillRect(Y, X, w, 1);
	}
	Y++;
	if (Y < w) setTimeout(animate, 0);
}

animate();