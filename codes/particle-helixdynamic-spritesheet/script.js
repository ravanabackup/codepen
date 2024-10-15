// configurable:
var dotSize = 14, blurLevels=9, amp0Amt=1, amp1Amt=0.2, maxDots=3000, speed=2.5;
//var dotSize = 112, blurLevels=9, amp0Amt=1, amp1Amt=2, maxDots=150, speed=0.1;

// globals:
var c = createjs, stage, t=0, count=0, w, h, max, min;
var dotTemplate, dots=[];

setup();
function setup() {
	stage = new c.StageGL("target");
	stage.setClearColor("#201624");
	
	createDots();
	
	onResize();
	c.Ticker.timingMode = c.Ticker.RAF;
	c.Ticker.on("tick", tick);
}

function generateSpriteSheet() {
	// generates a 4x4 sheet of dots at different blur levels.
	var holder = new c.Container(), shape = holder.addChild(new c.Shape()), g=shape.graphics;
	//shape.compositeOperation = "lighter";
	// calculate a size that's a power of 2:
	var pow = Math.ceil(Math.log(dotSize*2.2)/Math.log(2)), size2 = Math.pow(2,pow);
	var rect = new c.Rectangle(-size2/2, -size2/2, size2, size2);
	var builder = new c.SpriteSheetBuilder();
	builder.padding = 0;
	builder.maxWidth = Math.ceil(Math.sqrt(blurLevels))*size2;
	for (var i=0; i<blurLevels; i++) { builder.addFrame(holder, rect, 1, prepFrame, i); }
	return builder.build();
}

function prepFrame(holder, i) {
	var shape = holder.getChildAt(0);
  var g=shape.graphics, m=i/blurLevels, r=dotSize/2*Math.pow(2-m,1.2), x=0*(1-m)*0.2*r;
	g.c().rf(["hsla(270,100%,100%,1)","hsla(270,100%,85%,0)"],[m*0.8+0.1,1],x,0,0,x,0,r).dc(0,0,r);
	// premultiplied alpha causes dark fringes if we composite anything :'(
	//g.rf(["hsla(90,100%,100%,1)","hsla(90,100%,0%,0)"],[m*0.6+0.3,1],-x,0,0,-x,0,r).dc(0,0,r);
	shape.alpha = 0.3+0.7*m;
}

function createDots() {
	while (dots.length < maxDots) { getDot(); }
}

function tick(evt) {
	var d = evt.delta;

	var fov = min*1;
	for (var i=0, l=dots.length; i<l; i++) {
		var dot = dots[i];
		var t = (dot.t += d*0.0001*speed*dot.speed);
		var x = t%1*w-w/2;
		x += Math.cos(t*dot.p1)*min*dot.a1*amp1Amt;
		var y = Math.sin(t*Math.PI*4+Math.PI)*min*dot.r*0.25;
		y += Math.sin(t*dot.p1)*min*dot.a1*amp1Amt
		var z = Math.cos(t*Math.PI*4+Math.PI)*min*dot.r*0.25;
		z += Math.cos(t*dot.p1)*min*dot.a1*amp1Amt;
		
		var s = fov/(z+fov);
		dot.x = x*s+w/2;
		dot.y = y*s+h/2;
		
		dot.scaleX = dot.scaleY = Math.pow(s*(1+dot.size),2)*0.3;
		dot.alpha = s-0.6;
	}
	
	stage.update();
}

function getDot() {
	if (!dotTemplate) { dotTemplate = new c.Sprite(generateSpriteSheet()); }
	dot = dotTemplate.clone();
	dot.t = rnd(Math.PI);
	var seed = rnd(1);
	dot.speed = Math.pow(seed*0.5+0.5,3);
	dot.size = 1-dot.speed;
	dot.a1 = rnd(0.1,0.6)*rnd(0,dot.speed)*(rnd(1)<0.5?-1:1);
	dot.r = 1;//rnd(0.5,1);
	dot.p1 = rnd(0.3,0.7);
	dot.gotoAndStop(seed*blurLevels|0);
	dots.push(dot);
	stage.addChild(dot);
	return dot;
}

function rnd(min, max) {
	if (max === undefined) { max=min; min=0; }
	return Math.random()*(max-min)+min;
}

function onResize() {
	w = window.innerWidth
	h = window.innerHeight;
	max = Math.max(w,h);
	min = Math.min(w,h);
	target.width = w;
	target.height = h;
	stage.updateViewport(w,h);
	stage.update();
}

window.addEventListener("resize", onResize);