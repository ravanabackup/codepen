~ function() { 

	'use strict';

	function run() {

		requestAnimationFrame(run);
		webgl.clear(0, 0.05, 0.1);

		if (pointer.isDown) {
			cx += (pointer.x - pointer.xb) / 2000;
			cy += (pointer.y - pointer.yb) / 2000;
			cz = 0.015;
		}

		cx *= 0.98;
		cy *= 0.98;
		cz *= 0.98;

		camera.move(cx, cy, cz+0.01);
		gl.drawArrays(gl.TRIANGLES, 0, 30 * nCubes);

		pointer.xb = pointer.x;
		pointer.yb = pointer.y;

	}

	// init

	var size = 64, 
		vertices = new Float32Array(90 + 90 * size * size), 
		normals = new Float32Array(90 + 90 * size * size),
		nCubes = 0, cx = 0, cy = 0, cz = 0;

	// webgl
	var gl = webgl.context('canvas');
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);

	// create cubes

	function createCube (x, y, z, l, h, w) {

		l /= 2;
		w /= 2;
		h /= 2;

		// vertices

		vertices.set([
			x-l,y-h,z+w,x+l,y-h,z+w,x+l,y+h,z+w,x-l,y-h,z+w,x+l,y+h,z+w,x-l,y+h,z+w,
			x-l,y-h,z-w,x-l,y+h,z-w,x+l,y+h,z-w,x-l,y-h,z-w,x+l,y+h,z-w,x+l,y-h,z-w,
			x-l,y+h,z-w,x-l,y+h,z+w,x+l,y+h,z+w,x-l,y+h,z-w,x+l,y+h,z+w,x+l,y+h,z-w,
			x+l,y-h,z-w,x+l,y+h,z-w,x+l,y+h,z+w,x+l,y-h,z-w,x+l,y+h,z+w,x+l,y-h,z+w,
			x-l,y-h,z-w,x-l,y-h,z+w,x-l,y+h,z+w,x-l,y-h,z-w,x-l,y+h,z+w,x-l,y+h,z-w
		], nCubes * 5 * 18);

		// normals

		normals.set([
			0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,
			0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,
			0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,
			1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,
			-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0
		], nCubes * 5 * 18);

		nCubes++;

	}

	// create pointer

	var pointer = {
		x: 0,
		y: 0,
		xb: 0,
		yb: 0,
		isDown: false,
		add: function(elem, events, fn) {
			for (var i = 0, e = events.split(','); i < e.length; i++) {
				elem.addEventListener(e[i], fn.bind(pointer), false);
			}
		},
		pointer: function(e) {
			var touchMode = e.targetTouches, pointer;
			if (touchMode) {
				e.preventDefault();
				pointer = touchMode[0];
			} else pointer = e;
			this.x = pointer.clientX;
			this.y = pointer.clientY;
		}
	};

	// pointer events

	pointer.add(window, 'mousemove,touchmove', function(e) {this.pointer(e);});
	pointer.add(webgl.canvas, 'mousedown,touchstart', function(e) {
		this.pointer(e);
		this.xb = this.x;
		this.yb = this.y;
		this.isDown = true;
	});
	pointer.add(window, 'mouseup,touchend,touchcancel', function(e) {this.isDown = false;});

	// camera
	
	var camera = webgl.camera.init(60);
	camera.x = 0;
	camera.y = -2;
	camera.z = size / 3;
	camera.ax = 0;
	camera.ay = 0;

	camera.move = function (deltaX, deltaY, deltaZ) {

		this.ax -= deltaX / 10;
		this.ay -= deltaY / 10;

		this.x -= Math.sin(this.ax) * deltaZ;
		this.z -= Math.cos(this.ax) * deltaZ;
		this.y -= Math.sin(this.ay) * deltaZ;

		if (this.y > -0.5) this.y = -0.5; 
		if (this.x > size * 0.5) this.x = size * 0.5; else if (this.x < -size * 0.5) this.x = -size * 0.5;
		if (this.z > size * 0.5) this.z = size * 0.5; else if (this.z < -size * 0.5) this.z = -size * 0.5;

		this.mvMatrix.identity().rotateX(-this.ay).rotateY(-this.ax).translate([-this.x, this.y, -this.z]);

		this.webgl.uniforms.uMVMatrix.set(this.mvMatrix);
		this.normalMatrix.normalFromMat4(this.mvMatrix);
		this.webgl.uniforms.uNMatrix.set(this.normalMatrix);

	};

	// create world

	createCube(0, -0.1, 0, size * 20, 0.1, size * 20);

	for (var x = 0; x < size; x++) {
		for (var y = 0; y < size; y++) {
			var xf = x - size * 0.5,
				yf = y - size * 0.5,
				d = Math.sqrt(xf * xf + yf * yf),
				h = 0.25 + 30 * Math.random() / d,
				w = 0.7;
			if (d < size * 0.5) createCube(xf, h * 0.5, yf, w, h, w);
		}
	}

	webgl.attributes.aVertexPosition.load(vertices, 3);
	webgl.attributes.aVertexNormal.load(normals, 3);

	// set lightning

	webgl.uniforms.uAmbientColor.set(0,0,0);
	webgl.uniforms.uPointLightingLocation.set(0, -1, -10);
	webgl.uniforms.uPointLightingSpecularColor.set(1,0.55,0.15);
	webgl.uniforms.uPointLightingDiffuseColor.set(0,0.25,0.5);

	run();

} ();