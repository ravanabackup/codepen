var RENDERER = {
	LINE_COUNT : 50,
	PARTICLE_COUNT : 150,
	
	init : function(){
		this.setParameters();
		this.createElements();
		this.reconstructMethods();
		this.bindEvent();
		this.render();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$container = $('#jsi-scene-container');
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.context = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container).get(0).getContext('2d');
		this.lines = [];
		this.particles = [];
	},
	createElements : function(){
		for(var i = 0, count = this.LINE_COUNT; i < count; i++){
			this.lines.push(new LINE(this));
		}
		for(var i = 0, count = this.PARTICLE_COUNT; i < count; i++){
			this.particles.push(new PARTICLE(this));
		}
	},
	reconstructMethods : function(){
		this.render = this.render.bind(this);
		this.repelOn = this.repelOn.bind(this);
		this.repelOff = this.repelOff.bind(this);
	},
	bindEvent : function(){
		this.$container.on('mousemove', this.repelOn);
		this.$container.on('mouseout', this.repelOff);
	},
	getRandomValue : function(min, max){
		return min + (max - min) * Math.random();
	},
	repelOn : function(event){
		var offset = this.$container.offset(),
			x = event.clientX - offset.left + this.$window.scrollLeft(),
			y = event.clientY - offset.top + this.$window.scrollTop();
			
		for(var i = 0, count = this.particles.length; i < count; i++){
			this.particles[i].repelOn(x, y);
		}
	},
	repelOff : function(){
		for(var i = 0, count = this.particles.length; i < count; i++){
			this.particles[i].repelOff();
		}
	},
	render : function(){
		requestAnimationFrame(this.render);
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.globalCompositeOperation = 'lighter';
		
		for(var i = 0, count = this.lines.length; i < count; i++){
			this.lines[i].render(this.context);
		}
		for(var i = 0, count = this.particles.length; i < count; i++){
			this.particles[i].render(this.context);
		}
	}
};
var LINE = function(renderer){
	this.renderer = renderer;
	this.init();
};
LINE.prototype = {
	INIT_HUE : 210,
	DELTA_HUE : 0.5,
	
	init : function(){
		this.sy = this.renderer.getRandomValue(this.renderer.height * 19 / 40, this.renderer.width * 21 / 40);
		this.ey = this.renderer.getRandomValue(this.renderer.height * 19 / 40, this.renderer.width * 21 / 40);
		this.cx1 = this.renderer.getRandomValue(this.renderer.width / 8, this.renderer.width * 3 / 8);
		this.cx2 = this.renderer.getRandomValue(this.renderer.width * 5 / 8, this.renderer.width * 7 / 8);
		this.cy1 = this.renderer.getRandomValue(0, this.renderer.height / 2);
		this.cy2 = this.renderer.getRandomValue(this.renderer.height / 2, this.renderer.height);
		this.velocity =  this.renderer.getRandomValue(Math.PI / 500, Math.PI / 200);
		this.theta = this.renderer.getRandomValue(0, Math.PI * 2);
		this.hue = this.INIT_HUE;
	},
	getY : function(y){
		return this.renderer.height / 2 + (y - this.renderer.height / 2) * Math.sin(this.theta)
	},
	render : function(context){
		var gradient = context.createLinearGradient(0, 0, this.renderer.width, 0);
		gradient.addColorStop(0, 'hsla(' + this.hue + ', 30%, 10%, 0)');
		gradient.addColorStop(0.5, 'hsla(' + this.hue + ', 100%, 50%, 1)');
		gradient.addColorStop(1, 'hsla(' + this.hue + ', 30%, 10%, 0)');
		context.lineWidth = 1;
		context.strokeStyle = gradient;
		context.beginPath();
		context.moveTo(0, this.getY(this.sy));
		context.bezierCurveTo(this.cx1, this.getY(this.cy1), this.cx2, this.getY(this.cy2), this.renderer.width, this.getY(this.ey));
		context.stroke();
		
		this.theta += this.velocity;
		this.theta %= Math.PI * 2;
		this.hue += this.DELTA_HUE;
		this.hue %= 360;
	}
};
var PARTICLE = function(renderer){
	this.renderer = renderer;
	this.init();
};
PARTICLE.prototype = {
	RADIUS : 120,
	THRESHOLD : 200,
	REPELLING_COEFFICIENT : 0.003,
	TENSION_COEFFICIENT : 0.001,
	FRICTION_COEFFICIENT : 0.98,
	
	init : function(){
		this.x0 = this.renderer.getRandomValue(-this.RADIUS, this.renderer.width + this.RADIUS);
		this.y0 = this.renderer.getRandomValue(-this.RADIUS, this.renderer.height + this.RADIUS);
		this.x = this.x0;
		this.y = this.y0;
		this.vx0 = this.renderer.getRandomValue(-0.5, 0.5);
		this.vy0 = this.renderer.getRandomValue(-0.5, 0.5);
		this.vx = 0;
		this.vy = 0;
		this.ax = 0;
		this.ay = 0;
		this.gravity = false;
	},
	repelOn : function(x, y){
		this.gx = x;
		this.gy = y;
		this.gravity = true;
	},
	repelOff : function(){
		this.gravity = false;
	},
	render : function(context){
		var dx0 = this.x0 - this.x,
			dy0 = this.y0 - this.y;
			
		this.ax = dx0 * this.TENSION_COEFFICIENT;
		this.ay = dy0 * this.TENSION_COEFFICIENT;
		
		if(this.gravity){
			var dx = this.x - this.gx,
				dy = this.y - this.gy,
				d = Math.sqrt(dx * dx + dy * dy);
				
			if(d < this.THRESHOLD){
				var f = (this.THRESHOLD - d) / this.THRESHOLD;
				this.ax += dx * f * this.REPELLING_COEFFICIENT;
				this.ay += dy * f * this.REPELLING_COEFFICIENT;
			}
		}
		this.vx += this.ax;
		this.vy += this.ay;
		this.vx *= this.FRICTION_COEFFICIENT;
		this.vy *= this.FRICTION_COEFFICIENT;
		this.x0 += this.vx0;
		this.y0 += this.vy0;
		this.x += this.vx + this.vx0;
		this.y += this.vy + this.vy0;
		
		var gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.RADIUS);
		gradient.addColorStop(0, 'hsla(210, 80%, 10%, 1)');
		gradient.addColorStop(1, 'hsla(210, 80%, 10%, 0)');
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(this.x, this.y, this.RADIUS, 0, Math.PI * 2, false);
		context.fill();
		
		if(this.x0 <= 0 || this.x0 >= this.renderer.width){
			this.vx0 *= -1;
		}
		if(this.y0 <= 0 || this.y0 >= this.renderer.height){
			this.vy0 *= -1;
		}
	}
};
$(function(){
	RENDERER.init();
});