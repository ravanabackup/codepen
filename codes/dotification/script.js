function start() {
	var c = document.getElementById('c'),
		ctx = c.getContext('2d');

	var size = Math.min(c.width, c.height);
	ctx.translate(c.width * .5, c.height * .5);

	var animDur = 4.5;
	var backColor = new Color(236, 240, 241);
	var color = new Color(36, 51, 66);

	var o = {
		clear: .8,
		n: 1, radiusFactor: .8,
		sqSize: .8,
		gRot: 0, sqRot: 0,
		circle: 0
	};
	
	var rot = new Timeline()
		.easing(function(t) {
			return t*t*t*t*t*t;
		}).addFrame(
		0, {
			sqRot: 0
		}).addFrame(
		1, {
			sqRot: 6 * (2 * Math.PI)
		});
	var linear = new Timeline()
		.addFrame(
		0, {
			gRot: 0,
			n: .5,
			sqSize: 1
		}).addFrame(
		.2, {
			sqSize: .8
		}).addFrame(
		.75, {
			radiusFactor: .8,
		}).addFrame(
		.8, {
			clear: .8
		}).addFrame(
		.9, {
			radiusFactor: Math.SQRT2,
			clear: 0
		}).addFrame(
		.95, {
			circle: 0
		}).addFrame(
		1, {
			gRot: -Math.PI * .15,
			n: 30,
			circle: 1
		});
	var allKeyframes = [rot, linear];
	
	function applyState(state) {
		// Not using Object.assign because of IE11 support :'(
		Object.keys(state).forEach(function(key) {
			o[key] = state[key];
		});
	}

	function smoothstep(e0, e1, n) {
		return n <= e0 ? 0 : n >= e1 ? 1 : (n - e0) / (e1 - e0);
	}

	function draw() {
		// ctx.fillStyle = 'rgba(255,255,255,'+o.clear+')';
		ctx.fillStyle = backColor.toString(o.clear);
		ctx.fillRect(-size * .5, -size * .5, size, size);
		var sqSize = o.sqSize * size * .5 / Math.SQRT2 - 2;
		var n = Math.ceil(o.n), gridSize = size / o.n;
		var radius = o.radiusFactor * gridSize * .5;
		ctx.fillStyle = color.toString();
		for(var i = -n; i <= n; i++)
			for(var j = -n; j <= n; j++) {
				var posX = i * gridSize, posY = j * gridSize;
				var d = Math.sqrt(posX * posX + posY * posY), a = Math.atan2(posY, posX) + o.gRot;
				var sqA = a - o.sqRot;
				var dX = 1 - smoothstep(sqSize - radius, sqSize + radius, Math.abs(d * Math.cos(sqA))),
					dY = 1 - smoothstep(sqSize - radius, sqSize + radius, Math.abs(d * Math.sin(sqA)));
				var r = radius * dX * dY;
				ctx.beginPath();
				ctx.arc(d * Math.cos(a), d * Math.sin(a), r, 0, 2 * Math.PI);
				ctx.fill();
			}
		ctx.fillStyle = color.toString(o.circle);
		ctx.beginPath();
		ctx.arc(0, 0, size * o.sqSize * .5, 0, 2 * Math.PI);
		ctx.fill();
	}

	function step(t) {
		// o.sqRot += (Math.abs(Math.sin(t * .0006)) - .3) * .2;
		// o.gridSize = 17 + 5 * Math.cos(t * .00079);
		// o.gRot -= .005;
		var now = t * .001;
		var time = (now % animDur) / animDur;
		allKeyframes.forEach(function(tl) {
			applyState(tl.getState(time));
		});
		draw();
		requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
}

// Utils - @keyframes-like behaviour
function Timeline() {
	this.list = [];
	this.props = [];
	this._easing = function(t) { return t; };
	return this;
}
Timeline.prototype.easing = function(easing) {
	this._easing = easing;
	return this;
};
Timeline.prototype.addFrame = function(time, state) {
	// Not using arrow functions for IE support
	var props = this.props;
	Object.keys(state).forEach(function(key) {
		if(props.indexOf(key) === -1)
			props.push(key);
	});
	var pos = 0, l = this.list.length;
	while(pos < l && time > this.list[pos].time)
		pos++;
	this.list.splice(pos, 0, {
		time: time,
		state: state
	});
	return this;
};
Timeline.prototype.getState = function(time) {
	var full = {};
	var list = this.list;
	var pos = 0, l = this.list.length;
	while(pos < l && time > this.list[pos].time)
		pos++;
	var easing = this._easing;
	this.props.forEach(function(prop) {
		var prev = null, next = null;
		var pTime = null, nTime = null;
		var i;
		for(i = pos - 1; i >= 0; i--) {
			if(list[i].state.hasOwnProperty(prop)) {
				prev = list[i].state[prop];
				pTime = list[i].time;
				break;
			}
		}
		for(i = pos; i < l; i++) {
			if(list[i].state.hasOwnProperty(prop)) {
				next = list[i].state[prop];
				nTime = list[i].time;
				break;
			}
		}
		if(pTime === null) return full[prop] = next;
		if(nTime === null) return full[prop] = prev;
		full[prop] = prev + easing((time - pTime) / (nTime - pTime)) * (next - prev);
	});
	return full;
};

function Color(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
	return this;
}
Color.prototype.toString = function(alpha) {
	if(alpha === undefined) alpha = 1;
	return 'rgba('+this.r+','+this.g+','+this.b+','+alpha+')';
};

start();