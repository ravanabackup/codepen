(function () {	
	function GLParticleSystem(count, attributes) {
		THREE.Points.call(this);
		var self = this;
		this.count = count;
		this.geometry = new THREE.BufferGeometry();
		Object.keys(attributes).forEach(function(name) {
			self.addAttribute(name, attributes[name]);
		});
	}
	GLParticleSystem.prototype = Object.create(THREE.Points.prototype);
	GLParticleSystem.prototype.constructor = GLParticleSystem;
	GLParticleSystem.prototype.addAttribute = function(name, width) {
		width = width || 1;
		var values = new Float32Array(this.count * width);
		for(var i = 0, l = values.length; i < l; i++) values[i] = 0;
		this.geometry.addAttribute(name, new THREE.BufferAttribute(values, width));
	};
	
	THREE.GLParticleSystem = GLParticleSystem;
})();

(function () {
//var particleSprite = 'data:image/png;base64,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';
var xenocideSprites = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMzAyOEQwNzIyMjZFNTExQjEzNUI1NDU4NzI0MzZCRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNjcwOTc4REY4QzAxMUU1Qjk1MUZFRjFBNDM2QjM4OSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNjcwOTc4Q0Y4QzAxMUU1Qjk1MUZFRjFBNDM2QjM4OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2MTEyRkNBQjBGOEU1MTE4M0Y3RjY0RDcxRkU0NkZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMzMDI4RDA3MjIyNkU1MTFCMTM1QjU0NTg3MjQzNkJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TUa/zgAAAW5QTFRFtra2kpKSoqKicXFxYWFhy8vLgoKCngAA4+PjAAC2bQAAhgAAzwAAaWn/UVH/AG0AtmEAAJ4AAM8AVQAAAAD//5oAUVFR/8sA/zgAtgAAODj/hkkAgoL/AADnAFUAAIYA/+MA/wAAAOcAAACe/4KC5wAA/7IA////RUVFmpr//2kA/4IAsrL/trYAnlUA//8A/1EA5+cAAADP/5qaALYAAP8AOP8453kAy////zg4/4YAmv+a/2lp/7Kyy//Lsv//af9pbTwAODg4/1FRqgAAAACGgv+C//84/8vLz20AFBQU/4444+P/y8v/Uf9RUf//LCwsXVUg/5pROP//gv//mnE4AABt//9pVVVVsv+yw45RAJ6e//9VAFVV4///AG1tdV0gAOfnqqqqAP//AABV//+C/6ZpaV0kz88Anp4A/76a//+yVUkQ/7KCAM/PRUEQsoJJsv/L4//jLCQI05JZ//9RWTAA56pl/8uy////TbQ3RQAAAHp0Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wDoP+gmAAAuDElEQVR42uydB2PbSJatCSKRAEiKmZQoMUikJVKBrWDZcpJzt9322O72tNvT29MTtifsvt2dnX0B//7dKqQqEKQoi07yObZlXQQGnK9u3SqQQMrlskzTcmWVrbI7RUmr0smbpuILbDt5w+TFk1tnXGiR8g0yr1835RVW07Flm62AkbLtNK35AEhNWtog2QmL7Tm3BAHvAYB8jpSPlnrxdds33vbi+z4B9vX49uR/2ph4aD2tJDxjo1qtTvhqNyaW2XzDhAfIkGDcQgHIcT/zeb9920Fse/5fD+L7XpaI1oc5Ip3WDSPuvz4JBQegXo+7TWbHl9nedskA6Ck4t0AAPDfzy5VV7v91KXZNIfYsiuLrAQEMAC3uf8ZnguXylAjAHjnbiEGxJ7vdiC9Kh/0BByAN6xYGAOXzfGtrq1VZza5Tg3fk2LVisbS9Y00B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AAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAAAAOAQAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAAAA4BAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEAAIBDAAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAECu+/8FGACQV8+lLEpF0AAAAABJRU5ErkJggg==';
//var shipSprites = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAMAAACROYkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTc5Q0U4NDJGOEJDMTFFNTlEODRBOUEwQjc1MjdBRDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTc5Q0U4NDNGOEJDMTFFNTlEODRBOUEwQjc1MjdBRDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNzlDRTg0MEY4QkMxMUU1OUQ4NEE5QTBCNzUyN0FEOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNzlDRTg0MUY4QkMxMUU1OUQ4NEE5QTBCNzUyN0FEOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjnYwjgAAAA8UExURQAAtmlp/1FR/20AAIKC/4YAAJ4AALKy/5qa/1UAAP84ODg4/wAA5wAA/wAAns8AALYAAMvL//9RUQAAAGljMvMAAAAUdFJOU/////////////////////////8AT0/nEQAAARVJREFUeNp8k9uWwyAIRRHERHuJrf//r1VQI51meMnakQOIAEWMQqBiLVIsF7YegX5CSsE6UT7YRqCRI/KRyQZAVw1PX+XEXcjK7x6B0+IvAZwwYo/Pg1n1afBbqzzPa42g+kp4e9xFnwyXsLCWdHLiCFIv+n33jzs8a8LDcqEvNv4HAQXhbfMOAALFvLImvOYcoVWI+/baPNYf9S1o5S64ZCojwLa7mwYoK1Ox3K5kuV0B0XsvDO2hVs7Rcm1yttyaWPvpUFibtPBBlqk12fi3orD2U62P0eTUhpEXDu2Zjb9orL7wYJZhDunUkwzaPJ+j/Jz166garqOozHPhlBNfLJNZlnWLfi0b/Frnfzb5j9NHgAEA32QnwVUj2+4AAAAASUVORK5CYII=';
var animFps = 5;
var maxSpeed = 0.1;
var maxAge = 20000;
var particleCount = 1000000;
var renderer, scene, camera, controls;
var particleSystem;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var animations = [
	[0, 1, 2, 3],
	[4, 5, 6, 7, 8, 9, 10],
	[32, 33, 34, 35],
	[41, 42, 43, 45, 46, 47, 48],
	[32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48],
	[128, 129, 130, 131],
	[160, 161, 162, 163],
	[70, 74, 78, 74],
	[74, 74, 74, 82, 86, 90, 82, 86, 90, 82, 86, 90, 82, 86, 90],
	[176, 177, 178, 179, 180, 181],
	[207, 208, 209, 210, 211, 212, 213, 214, 215],
	[216, 217, 218, 219],
	[220, 221, 222, 223],
	[224, 225, 226, 227, 228, 229, 230, 231],
	[304, 305, 306, 307],
];

init();
animate();

function initGeometry(geometry) {
	var attributes = geometry.attributes;
	var age = attributes.age.array;
	var velocity = attributes.velocity.array;
	var anim = attributes.anim.array;
	var animation = attributes.animation.array;
	var frame = attributes.frame.array;
	var count = age.length;
	var color = new THREE.Color();
	var v = new THREE.Vector3();
	for (var i = 0, i3 = 0, l = count; i < l; i++, i3 += 3) {
		age[i] = Math.floor(Math.random()*maxAge);
		color.setHSL(Math.random(), 1.0, 0.5);
		v.set((Math.random()*2-1)*maxSpeed, (Math.random()*2-1)*maxSpeed / 10, (Math.random()*2-1)*maxSpeed);
		v.normalize().multiplyScalar(maxSpeed);
		velocity[i3+0] = v.x;
		velocity[i3+1] = v.y;
		velocity[i3+2] = v.z;
		var animIdx = Math.floor(Math.random()*animations.length);
		animation[i] = animIdx;
		frame = 0;
		anim[i3+0] = animations[animIdx][0];
		anim[i3+1] = animations[animIdx][1];
		anim[i3+2] = animations[animIdx][2];
	}
	attributes.age.needsUpdate = true;
	attributes.velocity.needsUpdate = true;
	attributes.anim.needsUpdate = true;
	attributes.frame.needsUpdate = true;
}
function updateGeometry(geometry) {
	var age = geometry.attributes.age.array;
	var animation = geometry.attributes.animation.array;
	var frame = geometry.attributes.frame.array;
	var i = age.length; while(i--) {
		var animFrames = animations[animation[i]];
		frame[i] = animFrames[Math.floor(age[i] * animFps / 60) % animFrames.length];
		if(age[i]++ >= maxAge) age[i] = 0;
	}
	geometry.attributes.age.needsUpdate = true;
	geometry.attributes.frame.needsUpdate = true;
}

function initScene() {
	camera = new THREE.PerspectiveCamera(90, WIDTH / HEIGHT, 1, 100000);
	camera.position.z = 800;
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(new THREE.Color(0x010101), 1);
	document.body.appendChild(renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
	controls = new THREE.OrbitControls(camera, renderer.domElement);
}
function initParticleSystem() {
	particleSystem = new THREE.GLParticleSystem(particleCount, {
		age: 1,
		position: 3, // Unused
		velocity: 3,
		anim: 3,
		animation: 1,
		frame: 1
	});
	var vertexShader =  document.getElementById('vertexshader').textContent;
	var fragmentShader = document.getElementById('fragmentshader').textContent;
	var texture = new THREE.TextureLoader().load(xenocideSprites);
	texture.minFilter = THREE.NearestFilter;
	texture.magFilter = THREE.NearestFilter;
	texture.generateMipmaps = false;
	texture.flipY = false;
	particleSystem.material = new THREE.ShaderMaterial({
		uniforms: {
			color: {type: "c", value: new THREE.Color(0xffffff)},
			texture: {type: "t", value: texture}
		},
		defines: {
			MAXAGE: maxAge.toFixed(6),
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		//blending: THREE.CustomBlending,
		//blendSrc: THREE.SrcAlphaFactor,
		//blendDst: THREE.OneMinusSrcAlphaFactor,
		//depthTest: false,
		transparent: true
	});
	scene.add(particleSystem);
	initGeometry(particleSystem.geometry);
}
function init() {
	console.clear();
	initScene();
	initParticleSystem();
	window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
	requestAnimationFrame(animate);
	updateGeometry(particleSystem.geometry);
	//particleSystem.rotation.x += 0.0003;
	particleSystem.rotation.x = 20 * Math.PI / 180;
	particleSystem.rotation.y += 0.002;
	camera.position.z = 600 + (1 + Math.cos(time * 0.0002)) * 800;
	renderer.render(scene, camera);
}

})();