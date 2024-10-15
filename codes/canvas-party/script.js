$(function(){
	var doc = document;
	var canvas = doc.createElement('canvas');
	canvas.width = 250;
	canvas.height = 250;
	doc.body.appendChild(canvas);		
	var ctx = canvas.getContext('2d');
	var cWidth = canvas.width;
	var cHeight = canvas.height;
	var shapes;
	var changer;
	ctx.globalCompositeOperation = 'lighter';
    
	function init(){
		shapes = [];
		shapes.length = 0;
		changer = 0;
		var b = 500;
		while(b--){
			var x = cWidth/2;
			var y = cHeight/2; 
			var w = h = changer/500+.5;
			var r = changer/15;
			var a = 0;
			var s = b/100+5;
			var fs = 'hsla('+changer+',50%,30%,'+(changer/b+1)+')';
			shapes.push(new shape(x,y,w,h,r,a,s,fs));
			changer = (changer+1)*1.015;
		}			
	}	
	
	var shape = function(x,y,w,h,r,a,s,fs){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.r = r;
		this.a = a;
		this.s = s;
		this.fs = fs;
	}
	var changer2 = 0;
	function draw(){		
		ctx.clearRect(0,0,cWidth,cHeight);
			
		var i = shapes.length;
		while(i--){
			currShape = shapes[i];
			var x = currShape.x+(currShape.r*Math.cos(currShape.a*(Math.PI/180)));
			var y = currShape.y+(currShape.r*Math.sin(currShape.a*(Math.PI/180)));
      ctx.strokeStyle = currShape.fs;
			ctx.beginPath();
			ctx.arc(x,y,10*currShape.w, 0, Math.PI * 2, false);
			ctx.closePath();
      ctx.stroke();
			currShape.a += currShape.s;
			changer2 += .0001;
			if(currShape.a > 360){
				currShape.a = currShape.a-360;
			}
		}
	}
	
	var animationLoop = function(){
		draw();
		requestAnimFrame(animationLoop, canvas);
	}
		
	window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
	
	var rand = function(rMi,rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}
	
	init();
	animationLoop();
});