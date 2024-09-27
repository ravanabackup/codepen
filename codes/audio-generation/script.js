(function() {
	var actx = window['AudioContext'] ? new AudioContext() : window['webkitAudioContext'] ? new webkitAudioContext() : null;
	if(!actx) return;
	function clip(n, m, M) { return n < M ? n > m ? n : m : M; }
	var c = document.getElementById('c'), ctx = c.getContext('2d');
	ctx.strokeStyle = 'white';
	var w = c.width, h = c.height;
	var gain = actx.createGain();
	gain.connect(actx.destination);
	gain.gain.value = 0.1;
	var oscx, oscy;
	var mouse = {x: 0, y: 0};
	c.oncontextmenu = function(e) { e.preventDefault(); };
	c.onmousedown = function(e)
	{
		e.preventDefault();
		if(oscx) return;
		oscx = actx.createOscillator();
		oscy = actx.createOscillator();
		oscx.connect(gain);
		oscy.connect(gain);
		oscx.type = oscy.type = ['sine', 'square', 'sawtooth'][clip(e.button, 0, 2)];
		oscx.frequency.value = 10000 * mouse.x / w;
		oscy.frequency.value = 10000 * mouse.y / h;
		oscx.start(0);
		oscy.start(0);
	};
	c.onmousemove = function(e)
	{
		e.preventDefault();
		mouse.x = e.offsetX || e.clientX - c.offsetLeft;
		mouse.y = e.offsetY || e.clientY - c.offsetTop;
		if(!oscx) return;
		oscx.frequency.value = 10000 * mouse.x / w;
		oscy.frequency.value = 10000 * mouse.y / h;
	};
	c.onmouseup = function(e)
	{
		e.preventDefault();
		if(!oscx) return;
		oscx.stop(0);
		oscy.stop(0);
		oscx = null;
		oscy = null;
	};
	function step()
	{
		requestAnimationFrame(step);
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.arc(mouse.x,mouse.y,10,0,Math.PI*2,false);
		ctx.moveTo(mouse.x,0);
		ctx.lineTo(mouse.x,h);
		ctx.moveTo(0,mouse.y);
		ctx.lineTo(w,mouse.y);
		ctx.stroke();
	}
	requestAnimationFrame(step);
})();