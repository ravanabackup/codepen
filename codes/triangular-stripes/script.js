// You can play with these
var lineWidth = 10, lineSpacing = 40;
var color = '#383838';
var duration = 2.5, easingFactor = 3.5;

var linesSize = 450;
var lines = (function() {
	var c = document.createElement('canvas'),
		ctx = c.getContext('2d');
	c.width = c.height = linesSize;
	ctx.fillStyle = color;
	for(var i = -lineWidth*.5 - (lineSpacing - (linesSize*.5) % lineSpacing); i <= linesSize; i += lineSpacing)
		ctx.fillRect(0, i, linesSize, lineWidth);
	return c;
})();

var cube = document.querySelector('.cube');
var faces = Array.prototype.slice.call(document.querySelectorAll('.face'));
var ctxs = faces.map(function(e) {
	var c = document.createElement('canvas'),
		ctx = c.getContext('2d');
	e.appendChild(c);
	c.width = c.offsetWidth;
	c.height = c.offsetHeight;
	ctx.translate(c.width * .5, c.height * .5);
	return ctx;
});

function drawLines(ctx, angle)
{
	var cW = ctx.canvas.width, cH = ctx.canvas.height;
	ctx.clearRect(-cW * .5, -cH * .5, cW, cH);
	ctx.save();
	ctx.rotate(angle);
	ctx.drawImage(lines, -linesSize * .5, -linesSize * .5);
	ctx.restore();
}
var xAngle = -Math.asin(1 / Math.sqrt(3)); // Perfect diagonal
function rotateCube(angle)
{
	cube.style.transform = 'rotateX('+xAngle+'rad) rotateY('+angle+'rad)';
}

function generateEasing(p)
{
	var c = .5 / Math.pow(.5, p);
	return function(t) { return t<.5 ? Math.pow(t,p)*c : 1 - (Math.pow(1 - t, p))*c };
}
var easing = generateEasing(easingFactor);

var pTime, t = 0;
function loop(time)
{
	if(!pTime) pTime = time;
	var dt = (time - pTime) * .001;
	t += dt / duration;
	pTime = time;
	while(t >= 1) t--;
	while(t < 0) t++;
	var v = easing(t);
	var rot = (.5 + v) * Math.PI * .5;
	rotateCube(rot);
	drawLines(ctxs[0], -rot); // front
	drawLines(ctxs[1], -rot + Math.PI * .5); // right
	drawLines(ctxs[2], -rot); // back
	drawLines(ctxs[3], -rot + Math.PI * .5); // left
	drawLines(ctxs[4], rot); // top
	drawLines(ctxs[5], rot); // bottom
	requestAnimationFrame(loop);
}
requestAnimationFrame(loop);