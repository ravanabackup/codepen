var RENDERER = {
	RESIZE_INTERVAL : 30,
	RADIUS : 30,
	MOVE_COUNT : 10,
	RATE : 0.95,
	HUE : {MIN : 200, MAX : 280},
	
	init : function(){
		this.setParameters();
		this.setup();
		this.reconstructMethods();
		this.bindEvent();
		this.render();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$container = $('#jsi-hex-container');
		this.$canvas = $('<canvas />');
		this.context = this.$canvas.appendTo(this.$container).get(0).getContext('2d');
		this.hexagons = [];
		this.resizeIds = [];
	},
	setup : function(){
		this.hexagons.length = 0;
		this.resizeIds.length = 0;
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.$canvas.attr({width : this.width, height : this.height});
		this.lightAxis = {x : this.width / 2, y : this.height / 2, dx : 0, dy : 0, count : 0};
		this.hue = (this.HUE.MIN + this.HUE.MAX) / 2;
		this.createHexagons();
	},
	createHexagons : function(){
		this.radius = this.RADIUS * this.RATE;
		this.vertices = [];
		
		for(var i = 0; i < 6; i++){
			this.vertices.push({x : this.radius * Math.sin(Math.PI / 3 * i), y : -this.radius * Math.cos(Math.PI / 3 * i)});
		}
		this.vertices.push(this.vertices[0]);
		this.hexWidth = this.RADIUS * Math.cos(Math.PI / 6) * 2;
		this.hexHeight = this.RADIUS * (2 - Math.sin(Math.PI / 6));
		this.countX = Math.ceil(this.width / this.hexWidth) + 1;
		this.countY = Math.ceil(this.height / this.hexHeight) + 1;
		
		var offsetX = -(this.countX * this.hexWidth - this.width) / 2,
			offsetY = -(this.countY * this.hexHeight - this.height) / 2;
			
		this.countX++;
		
		for(var y = 0; y < this.countY; y++){
			for(var x = 0; x < this.countX; x++){
				this.hexagons.push(new HEXAGON(this, offsetX + (x + 0.5) * this.hexWidth - (y % 2 == 1 ? 0 : this.hexWidth / 2), offsetY + (y + 0.5) * this.hexHeight));
			}
		}
	},
	watchWindowSize : function(){
		while(this.resizeIds.length > 0){
			clearTimeout(this.resizeIds.pop());
		}
		this.tmpWidth = this.$window.width();
		this.tmpHeight = this.$window.height();
		this.resizeIds.push(setTimeout(this.jdugeToStopResize, this.RESIZE_INTERVAL));
	},
	jdugeToStopResize : function(){
		var width = this.$window.width(),
			height = this.$window.height(),
			stopped = (width == this.tmpWidth && height == this.tmpHeight);
			
		this.tmpWidth = width;
		this.tmpHeight = height;
		
		if(stopped){
			this.setup();
		}
	},
	reconstructMethods : function(){
		this.moveLight = this.moveLight.bind(this);
		this.selectHexagon = this.selectHexagon.bind(this);
		this.watchWindowSize = this.watchWindowSize.bind(this);
		this.jdugeToStopResize = this.jdugeToStopResize.bind(this);
		this.render = this.render.bind(this);
	},
	moveLight : function(event){
		var axis = this.getAxis(event);
		this.lightAxis.dx = (axis.x - this.lightAxis.x) / this.MOVE_COUNT;
		this.lightAxis.dy = (axis.y - this.lightAxis.y) / this.MOVE_COUNT;
		this.lightAxis.count = this.MOVE_COUNT;
		this.hue = this.HUE.MIN + (this.HUE.MAX - this.HUE.MIN) * (this.width - this.lightAxis.x) / this.width;
	},
	selectHexagon : function(event){
		var axis = this.getAxis(event);
		
		for(var i = 0, count = this.hexagons.length; i < count; i++){
			this.hexagons[i].select(axis.x, axis.y);
		}
	},
	getAxis : function(event){
		var offset = this.$container.offset();
		return {x : event.clientX - offset.left + this.$window.scrollLeft(), y : event.clientY - offset.top + this.$window.scrollTop()};
	},
	bindEvent : function(){
		this.$window.on('resize', this.watchWindowSize);
		this.$container.on('mousemove', this.moveLight);
		this.$container.on('click', this.selectHexagon);
	},
	render : function(){
		requestAnimationFrame(this.render);
		
		this.context.fillStyle = 'hsla(' + this.hue + ', 80%, 10%, 0.05)';
		this.context.fillRect(0, 0, this.width, this.height);
		
		for(var i = 0, count = this.hexagons.length; i < count; i++){
			this.hexagons[i].render(this.context);
		}
		this.context.save();
		this.context.globalCompositeOperation = 'lighter';
		
		var gradient = this.context.createRadialGradient(this.lightAxis.x, this.lightAxis.y, 0, this.lightAxis.x, this.lightAxis.y, Math.max(this.width, this.height));
		gradient.addColorStop(0,  'hsla(' + this.hue + ', 80%, 40%, 0.5)');
		gradient.addColorStop(1,  'hsla(' + this.hue + ', 80%, 5%, 0.5)');
		
		for(var i = 0, count = this.hexagons.length; i < count; i++){
			this.hexagons[i].renderLight(this.context, this.lightAxis, gradient);
		}
		this.context.restore();
		
		if(this.lightAxis.count > 0){
			this.lightAxis.count--;
			this.lightAxis.x += this.lightAxis.dx;
			this.lightAxis.y += this.lightAxis.dy;
		}
	}
};
var HEXAGON = function(renderer, x, y){
	this.renderer = renderer;
	this.x = x;
	this.y = y;
	this.selected = Math.random() < this.RATE;
};
HEXAGON.prototype = {
	VELOCITY : 2,
	RATE : 0.05,
	
	select : function(x, y){
		if(x < this.x - this.renderer.hexWidth / 2 || x > this.x + this.renderer.hexWidth / 2
			|| y < this.y - this.renderer.radius || y > this.y + this.renderer.radius
			|| y < this.y && Math.abs((x - this.x) / (y - this.y + this.renderer.radius)) > Math.tan(Math.PI / 3)
			|| y > this.y && Math.abs((x - this.x) / (y - this.y - this.renderer.radius)) > Math.tan(Math.PI / 3)){
			return;
		}
		this.selected = true;
	},
	render : function(context){
		if(this.selected){
			return;
		}
		this.renderHexagon(context, 30);
	},
	renderHexagon : function(context, luminance){
		context.save();
		context.translate(this.x, this.y);
		context.fillStyle = 'hsla(' + this.renderer.hue + ', 90%, ' + luminance + '%, 0.3)';
		context.beginPath();
		
		for(var i = 0, vertices = this.renderer.vertices; i < 6; i++){
			context[i == 0 ? 'moveTo' : 'lineTo'](vertices[i].x, vertices[i].y);
		}
		context.closePath();
		context.fill();
		context.restore();
	},
	renderLight : function(context, axis, color){
		if(this.selected){
			this.renderHexagon(context, 50);
			
			context.save();
			context.translate(this.x, this.y);
			context.fillStyle = color;
			
			for(var i = 0, vertices = this.renderer.vertices; i < 6; i++){
				var theta0 = Math.atan2(vertices[i].y - axis.y + this.y, vertices[i].x - axis.x + this.x),
					theta1 = Math.atan2(vertices[i + 1].y - axis.y + this.y, vertices[i + 1].x - axis.x + this.x);
					
				context.beginPath();
				context.moveTo(vertices[i].x, vertices[i].y);
				context.lineTo(vertices[i + 1].x, vertices[i + 1].y);
				context.lineTo(vertices[i + 1].x + this.renderer.width * Math.cos(theta1), vertices[i + 1].y + this.renderer.width * Math.sin(theta1));
				context.lineTo(vertices[i].x + this.renderer.width * Math.cos(theta0), vertices[i].y + this.renderer.width * Math.sin(theta0));
				context.closePath();
				context.fill();
			}
			context.restore();
		}
		this.x -= this.VELOCITY;
		
		if(this.x + this.renderer.hexWidth / 2 < 0){
			this.x += this.renderer.countX * this.renderer.hexWidth;
			this.selected = Math.random() < this.RATE;
		}
	}
};
$(function(){
	RENDERER.init();
});