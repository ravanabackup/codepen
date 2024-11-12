var Utils = {
	setCanvasSize: function(){
			canvas.width = document.documentElement.clientWidth,
		  canvas.height = document.documentElement.clientHeight;                      

			canvas.setAttribute("width", canvas.width);
			canvas.setAttribute("height", canvas.height);
	}, 

	addEvents: function() {
		window.addEventListener(
		    'resize', function() {
		      Utils.setCanvasSize();
          refresh()
        }
		);
	},

	degToRad: function(deg) {
		return deg * Math.PI / 180;
	},

	randInt: function(min, max) {
		return Math.floor(Math.random()*max)+min;
	},

	reload: function() {
		window.location.reload();
	}
};


function Generator(params) {
	this.x = params.x;
	this.y = params.y;
	this.particleCount = 1500;
	this.initialDistance = 100;
	this.distanceThreshold = 10;
	this.thresholdVariation = 100;

	this.seed_1 = 1;
	this.seed_2 = 0;
	this.particleSize = 1;
	this.particleRotationSpeed = .05;
	this.particleDistanceSpeed = 3;
	this.perlinAmp = this.newPerlinAmp = 1;
	this.perlinAmpIncrease = true;
	this.perlinIncreaseSpeed = .2;
	
	this.particles = [];
	this.populate();
}

var G = Generator.prototype;

G.populate = function() {
	for (var i = 0; i < this.particleCount; i++) {
		this.particles.push(new Particle({
			x: this.x, 
			y: this.y, 
			angle: Utils.randInt(1,360),
			distance: this.initialDistance,
			distanceThreshold: this.distanceThreshold,
			thresholdVariation: this.thresholdVariation,
			color: (Math.random() < .5) ? "rgba(51, 204, 255,.02)" : "rgba(255, 50, 50,.02)",
			size: this.particleSize,
		}));
	}
}

G.draw = function() {
	if (this.perlinAmpIncrease) this.newPerlinAmp -= this.perlinIncreaseSpeed;
	this.particles.forEach(function(particle) {
		particle.move();
	});
}


function Particle(params) {
	this.initX = this.x = params.x || canvas.width / 2;
	this.initY = this.y = params.y || canvas.height / 2;
	this.angle = Utils.degToRad(params.angle || Utils.randInt(1,360));
	this.distance = params.distance;
	this.x = this.initX + Math.cos(this.angle) * this.distance;
	this.y = this.initY + Math.sin(this.angle) * this.distance;
	this.distanceThreshold = params.distanceThreshold + Utils.randInt(0,params.thresholdVariation);
	this.color = params.color;
	this.size = params.size || 1;
}

var P = Particle.prototype;

P.move = function() {
	if (this.distance < this.distanceThreshold) {
		this.distance += generator.particleDistanceSpeed + generator.newPerlinAmp * perlin.noise(
			this.x * generator.seed_1, 
			this.y * generator.seed_2, 
			1);
	} else {
		this.distance += generator.newPerlinAmp * perlin.noise(
			this.x * generator.seed_1, 
			this.y * generator.seed_2, 
			1);
	}
	this.angle += Utils.degToRad(generator.particleRotationSpeed);
	this.x = this.initX + Math.cos(this.angle) * this.distance;
	this.y = this.initY + Math.sin(this.angle) * this.distance;
	this.draw();
}

P.draw = function() {
	ctx.fillStyle = this.color;

	ctx.fillRect(this.x, this.y, this.size, this.size);
}


	
var perlin 	= new ClassicalNoise(),
	  canvas  = document.getElementById('canvas'),
	  ctx 		= canvas.getContext('2d'), 
	  generator,
	  gui,
	  globalParams = {
		  compositeOperation: true
	  };

(function init(){
	Utils.setCanvasSize();
	Utils.addEvents();

	generator = new Generator({
		x: canvas.width / 2, 
		y: canvas.height / 2
	});

	gui = new dat.GUI();
	var folder_0 = gui.addFolder('Global');
		folder_0.open();
	    folder_0.add(globalParams, 'compositeOperation').onFinishChange(refresh);

	var folder_1 = gui.addFolder('Generator');
		folder_1.open();
	    folder_1.add(generator, 'particleCount', 1, 5000).step(10).onFinishChange(refresh);
	    folder_1.add(generator, 'initialDistance', -100, 100).step(10).onFinishChange(refresh);
	    folder_1.add(generator, 'distanceThreshold', 0, 1000).step(10).onFinishChange(refresh);
	    folder_1.add(generator, 'seed_1', 0, 5).onFinishChange(refresh);
	    folder_1.add(generator, 'seed_2', 0, 5).onFinishChange(refresh);
	    folder_1.add(generator, 'perlinAmp', 0, 100).step(1).onFinishChange(refresh);
	    folder_1.add(generator, 'perlinAmpIncrease').onFinishChange(refresh);
	    folder_1.add(generator, 'perlinIncreaseSpeed', 0, 10).onFinishChange(refresh);

	var folder_2 = gui.addFolder('Particles');
		folder_2.open();
		folder_2.add(generator, 'thresholdVariation', 0, 500).step(1).onFinishChange(refresh);
		folder_2.add(generator, 'particleSize', 1, 3).step(1).onFinishChange(refresh);
		folder_2.add(generator, 'particleRotationSpeed', 0, 3).onFinishChange(refresh);
		folder_2.add(generator, 'particleDistanceSpeed', 0, 3).onFinishChange(refresh);

	generator.populate();

	animate();
})();

function refresh() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	generator.particles = [];
	generator.newPerlinAmp = generator.perlinAmp;
	generator.populate();
}

function animate() {
    if (globalParams.compositeOperation) {
    	ctx.fillStyle = "rgba(0,0,0,.02)";
    	ctx.fillRect(0, 0, canvas.width, canvas.height);
    	ctx.globalCompositeOperation = "lighter";
    } else {
    	ctx.fillStyle = "rgba(0,0,0,1)";
    	//ctx.fillRect(0, 0, canvas.width, canvas.height);
    	ctx.globalCompositeOperation = "source-over";
    }
    generator.draw();
    requestAnimationFrame(animate);
}