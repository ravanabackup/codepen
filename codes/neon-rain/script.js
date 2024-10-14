/* 
Forked from Nate Wiley's pen ( https://codepen.io/natewiley/pen/NNgqVJ/ )
*/
var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var clearColor = 'rgba(0, 0, 0, .13)';
var max = 20;
var drops = [];

function random(min, max) {
	return Math.random() * (max - min) + min;
}

function O() {}

O.prototype = {
	init: function() {
		this.x = random(0, w);
		this.y = 0;
		this.color = 'hsl(180, 100%, 50%)';
		this.w = 2;
		this.h = 1;
		this.vy = random(4, 5);
		this.vw = .8;
		this.vh = .2;
		this.size = 2;
		this.hit = random(h * .8, h * .9);
		this.a = 1;
		this.b = 1;
		this.lw = 4;
		this.va = .9;
	},
	draw: function() {
		if (this.y > this.hit) {
			ctx.globalCompositeOperation = 'screen';
			ctx.beginPath();
			ctx.ellipse(this.x, this.y, this.w, this.h, 0, 0, Math.PI * 2);
			ctx.strokeStyle = 'hsla(180, 100%, ' + (50 + this.b * 50) + '%, ' + this.a + ')';
			ctx.lineWidth = this.lw;
			ctx.stroke();
			ctx.globalCompositeOperation = 'normal';
		} else {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.size, this.size * 5);
		}
		this.update();
	},
	update: function() {
		if (this.y < this.hit) {
			this.y += this.vy;
		} else {
			if (this.a > .03) {
				this.w += this.vw;
				this.h += this.vh;
				if (this.w > 100) {
					this.a *= this.va;
					this.vw *= .98;
					this.vh *= .98;
				}
				if (this.a > .9) {
					this.b -= .015;
					this.lw -= .03
				}
			} else {
				this.init();
			}
		}
	}
}

function resize() {
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
}

function setup() {
	for (var i = 0; i < max; i++) {
		(function(j) {
			setTimeout(function() {
				var o = new O();
				o.init();
				drops.push(o);
			}, j * 200)
		}(i));
	}
}

function anim() {
	ctx.fillStyle = clearColor;
	ctx.fillRect(0, 0, w, h);
	for (var i in drops) {
		drops[i].draw();
	}
	requestAnimationFrame(anim);
}

window.addEventListener("resize", resize);

setup();
anim();