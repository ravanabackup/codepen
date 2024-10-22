var RENDERER1 = {
	BUILDING_COUNT : 20,
	CAR_COUNT : 5,
	BASE_Y_RATE : 2 / 3,
	OFFSET_Y : 5,
	
	init : function(){
		this.setParameters();
		this.setup();
		this.reconstructMethods();
		this.render();
		return this;
	},
	setParameters : function(){
		this.$container = $('#jsi-landscape-container');
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.$canvas = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container);
		this.context = this.$canvas.get(0).getContext('2d');
		this.baseY = this.height * this.BASE_Y_RATE;
		this.buildings = [];
		this.cars = [];
		this.brightness = 0;
	},
	setup : function(){
		this.buildings.length = 0;
		this.cars.length = 0;
		this.baseY = this.height * this.BASE_Y_RATE;
		this.brightness = 0;
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.$canvas.attr({width : this.width, height : this.height});
		this.createElements();
	},
	createElements : function(){
		for(var i = 0, length = this.BUILDING_COUNT * this.width / 500; i < length; i++){
			this.buildings.push(new BUILDING(this));
		}
		for(var i = 0, length = this.CAR_COUNT * this.width / 500 | 0; i < length; i++){
			this.cars.push(new CAR(this));
		}
		this.moon = MOON.init(this);
	},
	reconstructMethods : function(){
		this.render = this.render.bind(this);
	},
	getRandomValue : function(min, max, weight){
		return min + Math.round((max - min) * Math.pow(Math.random(), weight));
	},
	render : function(){
		requestAnimationFrame(this.render);
		this.context.clearRect(0, 0, this.width, this.height);
		
		var gradient = this.context.createLinearGradient(0, 0, 0, this.baseY - this.OFFSET_Y);
		gradient.addColorStop(0, 'hsl(220, 100%, ' + (20 + 20 * this.brightness) + '%)');
		gradient.addColorStop(1, 'hsl(220, 100%, 0%)');
		this.context.fillStyle = gradient;
		this.context.fillRect(0, 0, this.width, this.baseY - this.OFFSET_Y);
		this.brightness = this.moon.render(this.context);
		
		this.buildings.sort(function(buildings1, buildings2){
			return buildings2.z - buildings1.z;
		});
		for(var i = 0, length = this.buildings.length; i < length; i++){
			this.buildings[i].render(this.context, (this.brightness + 1) / 2);
		}
		this.context.clearRect(0, this.baseY - this.OFFSET_Y, this.width, this.OFFSET_Y * 2);
		this.context.fillStyle = 'hsla(0, 0%, 0%, 0.4)';
		this.context.fillRect(0, this.baseY + this.OFFSET_Y, this.width, this.height - this.baseY - this.OFFSET_Y);
		
		for(var i = 0, length = this.cars.length; i < length; i++){
			this.cars[i].render(this.context);
		}
	}
};
var BUILDING = function(renderer){
	this.renderer = renderer;
	this.init(false);
};
BUILDING.prototype = {
	FOCUS_POSITION : 500,
	FAR_LIMIT : 800,
	WINDOW_RATE : 0.8,
	LIGHT_RATE : 0.3,
	VELOCITY : 0.2,
	
	init : function(toReset){
		this.setParameters(toReset);
		this.createObjects();
	},
	setParameters : function(toReset){
		this.x = toReset ? this.renderer.width : this.renderer.getRandomValue(-this.renderer.width, this.renderer.width, 1);
		this.y = this.renderer.OFFSET_Y;
		this.z = this.renderer.getRandomValue(0, this.FAR_LIMIT, 1);
		this.vx = -this.VELOCITY;
		this.height = Math.round(this.renderer.getRandomValue(this.renderer.height / 8, this.renderer.baseY , 4) / 10) * 10;
		this.width = Math.round(this.renderer.height / 6 * Math.sqrt(this.height / this.renderer.height) / 10) * 10;
		this.y += this.height;
		this.offsetX = 0;
		this.hue = this.renderer.getRandomValue(220, 260, 1);
		this.windows = [];
		this.lights = [];
	},
	createObjects : function(){
		var axis = this.getAxis();
		
		for(var row = 0, rowMax = this.height / 10; row < rowMax; row++){
			for(var column = 0, columnMax = this.width / 10; column < columnMax; column++){
				if(Math.random() <= this.WINDOW_RATE){
					this.windows.push(new WINDOW(axis.x + 3 + 10 * column * axis.rate, axis.y + 3 + 10 * row * axis.rate, 4 * axis.rate, 4 * axis.rate, axis.rate, this.renderer));
				}
			}
		}
		if(Math.random() < this.LIGHT_RATE && this.z < this.FAR_LIMIT / 3){
			for(var column = 0, columnMax = this.renderer.getRandomValue(3, 5, 1); column < columnMax; column++){
				this.lights.push(new LIGHT(axis.x + axis.width * (column + 0.5) / columnMax, axis.y - 3 * axis.rate, 3 * axis.rate, axis.rate, this.renderer));
			}
		}
	},
	getAxis : function(){
		var rate = this.FOCUS_POSITION / (this.z + this.FOCUS_POSITION);
		return {x : this.x * rate, y : -this.y * rate, width : this.width * rate, height : this.height * rate, rate : rate};
	},
	render : function(context, brightness){
		var axis = this.getAxis();
		this.offsetX += this.vx * axis.rate;
		
		if(axis.x + this.offsetX > this.renderer.width / 2){
			return;
		}else if(axis.x + axis.width + this.renderer.width / 2 + this.offsetX < 0){
			this.init(true);
			return;
		}
		context.save();
		context.translate(this.renderer.width / 2 + this.offsetX, this.renderer.baseY);
		
		for(var i = -0.5; i <= 1; i += 1.5){
			context.save();
			context.scale(1, i);
			
			var gradient = context.createLinearGradient(axis.x, axis.y, axis.x, axis.y + axis.height);
			gradient.addColorStop(0, 'hsl(' + this.hue + ', ' + (30 + 30 * i) + '%, ' + 30 * axis.rate * brightness + '%)');
			gradient.addColorStop(1, 'hsl(' + this.hue + ', ' + (30 + 30 * i) + '%, ' + 5 * axis.rate * brightness + '%)');
			context.fillStyle = gradient;
			context.fillRect(axis.x, axis.y, axis.width, axis.height);
			
			for(var j = 0, length = this.windows.length; j < length; j++){
				this.windows[j].render(context);
			}
			for(var j = 0, length = this.lights.length; j < length; j++){
				this.lights[j].render(context);
			}
			context.restore();
		}
		context.restore();
	}
};
var WINDOW = function(x, y, width, height, rate, renderer){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.rate = rate;
	this.renderer = renderer;
	this.init();
};
WINDOW.prototype = {
	RATE : 0.00005,
	
	init : function(){
		this.hue = this.renderer.getRandomValue(100, 240, 1);
		this.light = Math.random() >= this.RATE;
	},
	render : function(context){
		if(Math.random() < this.RATE){
			this.light = !this.light;
		}
		if(!this.light){
			return;
		}
		context.fillStyle = 'hsl(' + this.hue + ', 100%, ' + 80 * this.rate + '%)';
		context.fillRect(this.x, this.y, this.width, this.height);
	}
};
var LIGHT = function(x, y, radius, rate, renderer){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.rate = rate;
	this.renderer = renderer;
	this.init();
};
LIGHT.prototype = {
	DELTA_THETA : Math.PI / 500,
	
	init : function(){
		this.theta = this.renderer.getRandomValue(0, Math.PI * 2, 1);
	},
	render : function(context){
		var gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius),
			rate = Math.abs(Math.sin(this.theta));
		gradient.addColorStop(0, 'hsl(0, 100%, ' + 100 * this.rate * rate + '%)');
		gradient.addColorStop(0.3, 'hsl(0, 100%, ' + 80 * this.rate * rate + '%)');
		gradient.addColorStop(1, 'hsl(0, 100%, ' + 30 * this.rate * rate + '%)');
		
		context.save();
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.restore();
		
		this.theta += this.DELTA_THETA;
		this.theta %= Math.PI * 2;
	}
};
var MOON = {
	RADIUS : 100,
	DELTA_THETA : Math.PI / 2000,
	
	init : function(renderer){
		this.x = renderer.width / 2;
		this.y = renderer.baseY;
		this.theta = Math.PI * 3 / 2;
		this.phi = Math.PI;
		return this;
	},
	render : function(context){
		for(var i = -0.5; i <= 1; i += 1.5){
			context.save();
			context.translate(this.x, this.y);
			context.scale(1, i);
			context.shadowColor = 'hsl(60, 90%, 90%)';
			context.shadowBlur = 20;
			context.save();
			
			var gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.RADIUS);
			gradient.addColorStop(0, 'hsl(60, ' + (40 + 20 * i) + '%, 60%)');
			gradient.addColorStop(0.8, 'hsl(60,' + (40 + 20 * i) + '%, 80%)');
			gradient.addColorStop(1, 'hsl(60,' + (40 + 20 * i) + '%, 80%)');
			context.fillStyle = gradient;
			context.beginPath();
			context.translate(0, -this.y * 2 / 3);
			context.rotate(Math.PI * 3 / 4 + this.phi);
			context.save();
			context.scale(1, Math.cos(this.theta));
			context.arc(0, 0, this.RADIUS, 0, Math.PI, false);
			context.restore();
			context.arc(0, 0, this.RADIUS, Math.PI, Math.PI * 2, false);
			context.fill();
			context.restore();
			context.restore();
		}
		this.theta += this.DELTA_THETA;
		this.phi = (this.theta >= Math.PI && this.theta <= Math.PI * 2) ? Math.PI : 0;
		this.theta %= Math.PI * 2;
		return Math.cos(this.theta);
	}
};
var CAR = function(renderer){
	this.renderer = renderer;
	this.init(false);
};
CAR.prototype = {
	RADIUS : 4,
	
	init : function(toReset){
		var upper = Math.random() > 0.5;
		this.x = toReset ? (upper ? -this.RADIUS : this.renderer.width) : this.renderer.getRandomValue(0, this.renderer.width, 1);
		this.y = this.renderer.baseY + this.renderer.OFFSET_Y * (upper ? -1 : 0);
		this.vx = this.renderer.getRandomValue(5, 8, 1) / 10 * (upper ? 1 : -1);
	},
	render : function(context){
		context.save();
		context.translate(this.x, this.y);
		context.scale(1, 0.6);
		context.shadowColor = 'hsl(220, 90%, 90%)';
		context.shadowOffsetX = this.RADIUS * (this.vx >= 0 ? 1 : -1);
		context.shadowBlur = this.RADIUS * 1.5;
		
		var gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.RADIUS);
		gradient.addColorStop(0, 'hsl(220, 80%, 100%)');
		gradient.addColorStop(0.3, 'hsl(220, 80%, 90%)');
		gradient.addColorStop(1, 'hsl(220, 80%, 30%)');
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(0, 0, this.RADIUS, 0, Math.PI * 2, false);
		context.fill();
		context.restore();
		this.x += this.vx;
		
		if(this.x < -this.RADIUS || this.x > this.renderer.width + this.RADIUS){
			this.init(true);
		}
	}
};
var RENDERER2 = {
	WATCH_INTERVAL : 300,
	OFFSET_Y : 0.1,
	OFFSET_COUNT : 10,
	GRASS_COUNT : 100,
	FIREFLY_COUNT : 10,
	
	init : function(background){
		this.background = background;
		this.setParameters();
		this.reconstructMethods();
		this.setup();
		this.bindEvent();
		this.render();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$container = $('#jsi-landscape-container');
		this.$canvas = $('<canvas />');
		this.context = this.$canvas.appendTo(this.$container).get(0).getContext('2d');
		this.terrains = [];
		this.grasses = [];
		this.fireflies = [];
		this.watchIds = [];
	},
	reconstructMethods : function(){
		this.watchWindowSize = this.watchWindowSize.bind(this);
		this.jdugeToStopResize = this.jdugeToStopResize.bind(this);
		this.watchMouse = this.watchMouse.bind(this);
		this.render = this.render.bind(this);
	},
	setup : function(){
		this.terrains.length = 0;
		this.grasses.length = 0;
		this.fireflies.length = 0;
		this.watchIds.length = 0;
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.offsetX = {base : this.width / 2, source : this.width / 2, destination : this.width / 2};
		this.offsetY = {base : 0, source : 0, destination : 0};
		this.offsetCount = 0;
		this.$canvas.attr({width : this.width, height : this.height});
		this.createElements();
	},
	createElements : function(){
		this.terrains.push(new TERRAIN(this, 1));
		this.terrains.push(new TERRAIN(this, -1));
		
		for(var i = 0, length = this.GRASS_COUNT * this.width / 500; i < length; i++){
			this.grasses.push(new GRASS(this.width, this.height, this));
		}
		for(var i = 0, length = this.FIREFLY_COUNT * this.width / 500; i < length; i++){
			this.fireflies.push(new FIREFLY(this.width, this.height, this));
		}
	},
	watchWindowSize : function(){
		this.clearTimer();
		this.tmpWidth = this.$window.width();
		this.tmpHeight = this.$window.height();
		this.watchIds.push(setTimeout(this.jdugeToStopResize, this.WATCH_INTERVAL));
	},
	clearTimer : function(){
		while(this.watchIds.length > 0){
			clearTimeout(this.watchIds.pop());
		}
	},
	jdugeToStopResize : function(){
		var width = this.$window.width(),
			height = this.$window.height(),
			stopped = (width == this.tmpWidth && height == this.tmpHeight);
			
		this.tmpWidth = width;
		this.tmpHeight = height;
		
		if(stopped){
			this.setup();
			this.background.setup();
		}
	},
	watchMouse : function(event){
		this.offsetY.source = this.offsetY.base;
		this.offsetY.destination = -(event.clientY - this.$container.offset().top + this.$window.scrollTop() - this.height / 2) * this.OFFSET_Y;
		this.offsetCount = 0;
	},
	getRandomValue : function(min, max){
		return min + (max - min) * Math.random();
	},
	bindEvent : function(){
		this.$window.on('resize', this.watchWindowSize);
		this.$container.on('mousemove', this.watchMouse);
	},
	render : function(){
		requestAnimationFrame(this.render);
		
		this.context.save();
		this.context.clearRect(0, 0, this.width, this.height);
		
		for(var i = 0, count = this.terrains.length; i < count; i++){
			this.terrains[i].render(this.context, this.offsetY.base);
		}
		for(var i = 0, length = this.grasses.length; i < length; i++){
			this.grasses[i].render(this.context);
		}
		for(var i = 0, length = this.fireflies.length; i < length; i++){
			this.fireflies[i].render(this.context);
		}
		this.context.restore();
		
		if(this.offsetCount < this.OFFSET_COUNT){
			this.offsetCount++;
		}
		this.offsetY.base = this.offsetY.source + (this.offsetY.destination - this.offsetY.source) * this.offsetCount / this.OFFSET_COUNT;
	}
};
var TERRAIN = function(renderer, offset){
	this.renderer = renderer;
	this.offset = offset;
	this.init();
};
TERRAIN.prototype = {
	DISPLACEMENT : 80,
	DELTA_DESPLACEMENT : 0.6,
	TICK : 2,
	
	init : function(){
		this.vertices = this.createVertices();
		this.count = this.vertices.length;
	},
	createVertices : function(base){
		var power = Math.pow(2, Math.ceil(Math.log(this.renderer.width / this.TICK + 1) / Math.log(2))),
			displacement = this.renderer.height / this.renderer.getRandomValue(5, 10),
			vertices = [];
			
		vertices[0] = base ? base : (this.renderer.height * (0.5 + this.renderer.getRandomValue(0.05, 0.3) * this.offset));
		vertices[power] = this.renderer.height * (0.5 + this.renderer.getRandomValue(0.05, 0.3) * this.offset);
		
		for(var i = 1; i < power; i *= 2) {
			var offset = power / i / 2;
			
			for(var j = offset; j < power; j += offset * 2) {
				vertices[j] = ((vertices[j - offset] + vertices[j + offset]) / 2) + Math.floor(displacement * (1 - Math.random())) * this.offset;
			}
		  	displacement *= this.DELTA_DESPLACEMENT;
		}
		return vertices.slice(2);
	},
	render : function(context, offsetY){
		this.vertices = this.vertices.slice(1);
		
		if(this.vertices.length < this.count){
			this.vertices = this.vertices.concat(this.createVertices(this.vertices[this.vertices.length - 1]));
		}
		var base = this.renderer.height / 2 * (1 + this.offset);
		
		context.fillStyle = 'hsl(0, 0%, 0%)';
		context.beginPath();
		context.moveTo(0, base);
		
		for(var i = 0, count = this.vertices.length; i < count; i++){
			context.lineTo(this.TICK * i, this.vertices[i] + offsetY);
		}
		context.lineTo(this.renderer.width, base);
		context.closePath();
		context.fill();
	}
};
var GRASS = function(width, height, manager){
	this.width = width;
	this.height = height;
	this.manager = manager;
	this.init();
};
GRASS.prototype = {
	GRASS_COLOR : 'hsl(%hue, 100%, 20%)',
	SHAKING_FREQUENCY : Math.PI / 100,
	MAX_SHAKING_RATE : 0.2,
	GRASS_WIDTH : 4,
	BOTTOM_OFFSET : 0.01,
	THRESHOLD : 100,
	
	init : function(){
		var hue = this.manager.getRandomValue(80, 160) | 0;
		
		this.darkColor = this.GRASS_COLOR.replace('%hue', hue);
		this.lightColor = this.GRASS_COLOR.replace('%hue', hue);
		this.theta = Math.PI * 2 * Math.random();
		this.grassHeight = this.height * this.manager.getRandomValue(0.2, 0.5);
		this.centerX = this.manager.getRandomValue(-this.THRESHOLD, this.width + this.THRESHOLD);
		this.bottom = this.height * (1 + this.BOTTOM_OFFSET * Math.random());
	},
	render : function(context){
		var dx = Math.sin(this.theta) * this.grassHeight * this.MAX_SHAKING_RATE;
		
		context.fillStyle =  this.darkColor;
		context.beginPath();
		context.moveTo(this.centerX - this.GRASS_WIDTH / 2, this.bottom);
		context.quadraticCurveTo(this.centerX + dx / 2, this.bottom - this.grassHeight / 2, this.centerX + this.GRASS_WIDTH / 2 + dx, this.bottom - this.grassHeight);
		context.quadraticCurveTo(this.centerX + this.GRASS_WIDTH / 2 + dx / 2, this.bottom - this.grassHeight / 2, this.centerX + this.GRASS_WIDTH / 2, this.bottom);
		context.closePath();
		context.fill();
		
		this.theta += this.SHAKING_FREQUENCY;
		this.centerX--;
		
		if(this.centerX < -this.THRESHOLD){
			this.centerX += this.width + this.THRESHOLD * 2;
		}
	}
};
var FIREFLY = function(width, height, manager){
	this.width = width;
	this.height = height;
	this.manager = manager;
	this.init();
};
FIREFLY.prototype = {
	RANGE_MARGIN : 10,
	VELOCITY : 1,
	
	init : function(){
		this.radius = this.manager.getRandomValue(4, 6);
		this.x = this.width * Math.random();
		this.y = this.manager.getRandomValue(this.height / 2, this.height);
		this.velocityRate = this.VELOCITY * Math.pow(this.radius / 6, 3);
		this.phi = Math.PI * 2 * Math.random();
		this.vx = Math.cos(this.phi) * this.velocityRate;
		this.vy = Math.sin(this.phi) * this.velocityRate;
		this.accelaration = this.manager.getRandomValue(-Math.PI / 300, Math.PI / 300);
		this.frequency = this.manager.getRandomValue(Math.PI / 200, Math.PI / 100);
		this.theta = Math.PI * 2 * Math.random();
		this.opacity = 0.5 + 0.3 * Math.sin(this.theta);
	},
	render : function(context){
		var gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
		gradient.addColorStop(0, 'hsla(60,  80%, 100%,' + this.opacity + ')');
		gradient.addColorStop(0.3, 'hsla(60, 80%, 80%,' + this.opacity + ')');
		gradient.addColorStop(0.4, 'hsla(60, 80%, 60%,' + this.opacity + ')');
		gradient.addColorStop(0.6, 'hsla(60, 80%, 40%,' + this.opacity * 0.7 + ')');
		gradient.addColorStop(1, 'hsla(60, 80%, 40%, 0)');
		
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		
		this.x += this.vx;
		this.y += this.vy;
		
		if(this.x < -this.RANGE_MARGIN || this.x > this.width + this.RANGE_MARGIN
			|| this.y < this.height / 2 && this.opacity < 0.1 || this.y > this.height + this.RANGE_MARGIN){
			this.x = this.manager.getRandomValue(0, this.width);
			this.y = this.manager.getRandomValue(this.height / 2, this.height);
			this.theta = 0;
		}
		this.theta += this.frequency;
		this.opacity = 0.5 - 0.5 * Math.cos(this.theta);
		
		if(this.theta > Math.PI * 2){
			this.accelaration = this.manager.getRandomValue(-Math.PI / 300, Math.PI / 300);
			this.theta %= Math.PI * 2;
		}
		this.phi += this.accelaration;
		this.phi %= Math.PI * 2;
		this.vx = Math.cos(this.phi) * this.velocityRate;
		this.vy = Math.sin(this.phi) * this.velocityRate;
	}
};
$(function(){
	RENDERER2.init(RENDERER1.init());
});