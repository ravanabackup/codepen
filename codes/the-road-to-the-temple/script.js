var RENDERER = {
	LANTERN_COUNT : 20,
	STAR_COUNT : 100,
	OFFSET_HUE : 30,
	DELTA_HUE : 0.1,
	INTERVAL_Z : 300,
	FOCUS : 100,
	
	init : function(){
		this.setParameters();
		this.createElements();
		this.reconstructMethod();
		this.render();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$container = $('#jsi-temple-container');
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.canvas = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container).get(0);
		this.context = this.canvas.getContext('2d');
		this.fires = [new FIRE(true), new FIRE(false)];
		this.lanterns = [];
		this.stars = [];
		this.hue = 0;
		this.maxZ = this.LANTERN_COUNT * this.INTERVAL_Z - this.FOCUS;
		this.rate = this.width / 250;
	},
	createElements : function(){
		for(var i = 1, count = this.LANTERN_COUNT; i <= count; i++){
			this.lanterns.push(new LANTERN(this, true, this.INTERVAL_Z * (count - i), true));
			this.lanterns.push(new LANTERN(this, false, this.INTERVAL_Z * (count - i), true));
			this.lanterns.push(new LANTERN(this, true, this.INTERVAL_Z * (count - i), false));
			this.lanterns.push(new LANTERN(this, false, this.INTERVAL_Z * (count - i), false));
		}
		for(var i = 0, count = this.STAR_COUNT; i < count; i++){
			this.stars.push(new STAR(this));
		}
	},
	reconstructMethod : function(){
		this.render = this.render.bind(this);
	},
	renderTemple : function(context){
		var gradient =  context.createLinearGradient(0, 4, 0, -10);
		gradient.addColorStop(0, 'hsl(210, 100%, 10%)');
		gradient.addColorStop(1, 'hsl(210, 100%, 20%)');
		context.save();
		context.translate(this.width / 2, this.height / 2);
		context.scale(this.rate, this.rate);
		context.fillStyle = gradient;
		context.beginPath();
		context.moveTo(-12, -3);
		context.quadraticCurveTo(-5, -5, 0, -10);
		context.quadraticCurveTo(5, -5, 12, -3);
		context.lineTo(6, -3);
		context.lineTo(6, 4);
		context.lineTo(-6, 4);
		context.lineTo(-6, -3);
		context.closePath();
		context.fill();
		context.restore();
	},
	renderTiles : function(context){
		var axis = [];
		
		for(var i = 0, length = this.lanterns.length; i < length; i++){
			axis.push(this.lanterns[i].getAxis());
		}
		for(var i = 0, length = axis.length - 4; i < length; i += 4){
			var gradient = context.createLinearGradient(axis[i].x, 0, axis[i + 1].x, 0);
			gradient.addColorStop(0, 'hsl(' + this.hue + ', 10%, ' + 100 * axis[i].rate + '%)');
			gradient.addColorStop(0.5, 'hsl(' + this.hue + ', 10%, ' + 50 * axis[i].rate + '%)');
			gradient.addColorStop(1, 'hsl(' + this.hue + ', 10%, ' + 100 * axis[i].rate + '%)');
			
			context.beginPath();
			context.fillStyle = gradient;
			context.moveTo(axis[i].x + 100 * axis[i].rate * this.rate, axis[i].y);
			context.lineTo(axis[i + 1].x - 100 * axis[i + 1].rate * this.rate, axis[i + 1].y);
			context.lineTo(axis[i + 5].x - 100 * axis[i + 5].rate * this.rate, axis[i + 5].y);
			context.lineTo(axis[i + 4].x + 100 * axis[i + 4].rate * this.rate, axis[i + 4].y);
			context.closePath();
			context.fill();
		}
	},
	render : function(){
		requestAnimationFrame(this.render);
		
		var context = this.context,
			gradient = context.createLinearGradient(0, 0, 0, this.height);
		gradient.addColorStop(0, 'hsl(210, 100%, 20%)');
		gradient.addColorStop(0.52, 'hsl(210, 100%, 10%)');
		gradient.addColorStop(0.53, 'hsl(20, 20%, 0%)');
		gradient.addColorStop(1, 'hsl(20, 20%, 10%)');
		context.fillStyle = gradient;
		context.fillRect(0, 0, this.width, this.height);
		
		for(var i = 0, length = this.fires.length; i < length; i++){
			this.fires[i].render(this.hue + i * this.OFFSET_HUE);
		}
		for(var i = 0, length = this.stars.length; i < length; i++){
			this.stars[i].render(context);
		}
		this.renderTemple(context);
		this.lanterns.sort(function(lantern1, lantern2){
			if(lantern2.z == lantern1.z){
				if(lantern2.isNear == lantern1.isNear){
					return lantern2.isLeftSide ? 1 : -1;
				}else{
					return lantern2.isNear ? 1 : -1;
				}
			}else{
				return lantern2.z - lantern1.z;
			}
		});
		this.renderTiles(context);
		
		for(var i = 0, length = this.lanterns.length; i < length; i++){
			this.lanterns[i].render(context, this.hue);
		}
		this.hue += this.DELTA_HUE;
		this.hue %= 360;
	}
};
var LANTERN = function(renderer, isLeftSide, z, isNear){
	this.renderer = renderer;
	this.isLeftSide = isLeftSide;
	this.z = z;
	this.isNear = isNear;
	this.init();
};
LANTERN.prototype = {
	POSITION_RATE : {X : 1.6, Y : 1.6},
	VELOCITY : 2,
	
	init : function(){
		this.x = this.renderer.width * this.POSITION_RATE.X * (this.isNear ? 1 : 2) * (this.isLeftSide ? -1 : 1);
		this.y = this.renderer.height * this.POSITION_RATE.Y;
	},
	getAxis : function(){
		var rate = this.renderer.FOCUS / (this.renderer.FOCUS + this.z);
		
		return {
			rate  : rate,
			x : this.renderer.width / 2 + this.x * rate,
			y : this.renderer.height / 2 + this.y * rate
		};
	},
	render : function(context, hue){
		var axis = this.getAxis();
		context.save();
		context.translate(axis.x, axis.y);
		context.scale(axis.rate * this.renderer.rate, axis.rate * this.renderer.rate);
		var gradient = context.createRadialGradient(0, -390, 0, 0, -390, 40, 0, Math.PI * 2, false);
		gradient.addColorStop(0, 'hsl(' + hue + ', 10%, ' + 100 * axis.rate + '%)');
		gradient.addColorStop(1, 'hsl(' + hue + ', 10%, ' + 80 * axis.rate + '%)');
		context.fillStyle = gradient;
		context.beginPath();
		context.moveTo(-20, -390);
		context.quadraticCurveTo(-40, -410, 0, -430);
		context.quadraticCurveTo(40, -410, 20, -390);
		context.closePath();
		context.fill();
		
		gradient = context.createRadialGradient(0, -360, 0, 0, -360, 50, 0, Math.PI * 2, false);
		gradient.addColorStop(0, 'hsl(' + hue + ', 10%, ' + 100 * axis.rate + '%)');
		gradient.addColorStop(1, 'hsl(' + hue + ', 10%, ' + 80 * axis.rate + '%)');
		context.fillStyle = gradient;
		context.beginPath();
		context.moveTo(-70, -360);
		context.bezierCurveTo(-60, -410, 60, -410, 70, -360);
		context.closePath();
		context.fill();
		
		gradient = context.createLinearGradient(0, -360, 0, -260);
		gradient.addColorStop(0, 'hsl(' + hue + ', 10%, ' + 60 * axis.rate + '%)');
		gradient.addColorStop(1, 'hsl(' + hue + ', 10%, ' + 100 * axis.rate + '%)');
		context.fillStyle = gradient;
		context.fillRect(-50, -360, 100, 100);
		
		context.save();
		context.beginPath();
		
		for(var y = 0; y < 2; y++){
			for(var x = 0; x < 2; x++){
				context.moveTo(-40 + x * 45, -350 + y * 35);
				context.lineTo(-5 + x * 45, -350 + y * 35);
				context.lineTo(-5 + x * 45, -325 + y * 35);
				context.lineTo(-40 + x * 45, -325 + y * 35);
				context.closePath();
			}
		}
		context.clip();
		context.drawImage(this.renderer.fires[this.isNear ? 0 : 1].canvas, -50, -350);
		context.restore();
		
		gradient = context.createRadialGradient(0, -255, 0, 0, -255, 80, 0, Math.PI * 2, false);
		gradient.addColorStop(0, 'hsl(' + hue + ', 10%, ' + 100 * axis.rate + '%)');
		gradient.addColorStop(1, 'hsl(' + hue + ', 10%, ' + 80 * axis.rate + '%)');
		context.fillStyle = gradient;
		context.fillRect(-70, -260, 140, 30);
		
		gradient = context.createLinearGradient(-30, 0, 30, 0);
		gradient.addColorStop(0, 'hsl(' + hue + ', 10%, ' + 80 * axis.rate + '%)');
		gradient.addColorStop(0.5, 'hsl(' + hue + ', 10%, ' + 100 * axis.rate + '%)');
		gradient.addColorStop(1, 'hsl(' + hue + ', 10%, ' + 80 * axis.rate + '%)');
		context.fillStyle = gradient;
		context.fillRect(-30, -230, 60, 200);
		
		gradient = context.createRadialGradient(0, 0, 0, 0, 0, 50, 0, Math.PI * 2, false);
		gradient.addColorStop(0, 'hsl(' + hue + ', 10%, ' + 100 * axis.rate + '%)');
		gradient.addColorStop(1, 'hsl(' + hue + ', 10%, ' + 80 * axis.rate + '%)');
		context.fillStyle = gradient;
		context.beginPath();
		context.moveTo(-70, 0);
		context.bezierCurveTo(-60, -50, 60, -50, 70, 0);
		context.bezierCurveTo(60, 20, -60, 20, -70, 0);
		context.fill();
		context.restore();
		this.z -= this.VELOCITY;
		
		if(this.z <= -this.renderer.FOCUS){
			this.z = this.renderer.maxZ;
		}
	}
};
var FIRE = function(){
	this.init();
};
FIRE.prototype = {
	SPARK_INIT_COUNT : 4,
	SPARK_ADD_COUNT : 4,
	WIDTH : 100,
	HEIGHT : 100,
	
	init : function(){
		this.setParameters();
		this.createSparks(this.SPARK_INIT_COUNT);
	},
	setParameters : function(){
		this.canvas = $('<canvas />').attr({width : this.WIDTH, height : this.HEIGHT}).get(0);
		this.context = this.canvas.getContext('2d');
		this.sparks = [];
	},
	createSparks : function(count){
		for(var i = 0; i < count; i++){
			this.sparks.push(new SPARK());
		}
	},
	render : function(hue){
		var context = this.context;
		context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
		
		context.save();
		context.translate(this.WIDTH / 2, this.HEIGHT);
		context.globalCompositeOperation = 'lighter';
		
		for(var i = this.sparks.length - 1; i >= 0; i--){
			var axis = this.sparks[i].getAxis();
			
			if(axis.opacity <= 0 || axis.y < -this.HEIGHT){
				this.sparks.splice(i, 1);
				continue;
			}
			context.save();
			context.globalAlpha = axis.opacity;
			context.beginPath();
			context.fillStyle = 'hsl(' + (hue + axis.hue) + ', 50%, 15%)';
			context.arc(axis.x, axis.y, axis.radius, 0, Math.PI * 2, false);
			context.fill();
			context.restore();
		}
		context.restore();
		this.createSparks(this.SPARK_ADD_COUNT);
	}
};
var SPARK = function(x, y){
	this.init();
};
SPARK.prototype = {
	RADIUS : 10,
	DELTA_RADIUS : 0.9985,
	DELTA_OPACITY : 0.01,
	
	init : function(){
		this.x = 0;
		this.y = 0;
		this.vy = -1 - Math.random() * 2;
		this.vx = (0.5 - Math.random()) * 5;
		this.ax = 0;
		this.opacity = 1;
		this.hue = 20 - Math.round(Math.random() * 20);
		this.radius = this.RADIUS * (1 + Math.random());
	},
	getAxis : function(){
		this.x += this.vx;
		this.y += this.vy;
		this.vx += this.ax;
		this.ax = -this.x / 300;
		this.opacity -= this.DELTA_OPACITY;
		this.radius *= this.DELTA_RADIUS;
		return {x : this.x, y : this.y, radius : this.radius, opacity : this.opacity, hue : this.hue};
	}
};
var STAR = function(renderer){
	this.renderer = renderer;
	this.init();
};
STAR.prototype = {
	RADIUS_RANGE : {min : 1, max : 4},
	COUNT_RANGE : {min : 100, max : 1000},
	DELTA_THETA : Math.PI / 30,
	
	init : function(){
		this.x = this.getRandomValue({min : 0, max : this.renderer.width}) | 0;
		this.y = this.getRandomValue({min : 0, max : this.renderer.height / 2}) | 0;
		this.radius = this.getRandomValue(this.RADIUS_RANGE);
		this.maxCount = this.getRandomValue(this.COUNT_RANGE) | 0;
		this.count = this.maxCount;
		this.theta = 0;
		this.gradient = this.renderer.context.createRadialGradient(0, 0, 0, 0, 0, this.radius);
		this.gradient.addColorStop(0, 'hsla(220, 80%, 100%, 1)');
		this.gradient.addColorStop(0.1, 'hsla(220, 80%, 80%, 1)');
		this.gradient.addColorStop(0.25, 'hsla(220, 80%, 50%, 1)');
		this.gradient.addColorStop(1, 'hsla(220, 80%, 30%, 0)');
	},
	getRandomValue : function(range){
		return range.min + (range.max - range.min) * Math.random();
	},
	render : function(context){
		context.save();
		context.globalAlpha = Math.abs(Math.cos(this.theta));
		context.translate(this.x, this.y);
		context.beginPath();
		context.fillStyle = this.gradient;
		context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.restore();
		
		if(--this.count == 0){
			this.theta = Math.PI;
			this.count = this.maxCount;
		}
		if(this.theta > 0){
			this.theta -= this.DELTA_THETA;
		}
	}
};
$(function(){
	RENDERER.init();
});