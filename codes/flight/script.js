function project3D(x,y,z,vars){

	var p,d;
	x-=vars.camX;
	y-=vars.camY;
	z-=vars.camZ;
	p=Math.atan2(x,z);
	d=Math.sqrt(x*x+z*z);
	x=Math.sin(p-vars.yaw)*d;
	z=Math.cos(p-vars.yaw)*d;
	p=Math.atan2(y,z);
	d=Math.sqrt(y*y+z*z);
	y=Math.sin(p-vars.pitch)*d;
	z=Math.cos(p-vars.pitch)*d;
	var rx1=-9;
	var ry1=1;
	var rx2=9;
	var ry2=1;
	var rx3=0;
	var ry3=0;
	var rx4=x;
	var ry4=z;
	var uc=(ry4-ry3)*(rx2-rx1)-(rx4-rx3)*(ry2-ry1);
	var ua=((rx4-rx3)*(ry1-ry3)-(ry4-ry3)*(rx1-rx3))/uc;
	var ub=((rx2-rx1)*(ry1-ry3)-(ry2-ry1)*(rx1-rx3))/uc;
	if(ua>0&&ua<1&&ub>0&&ub<1){
		return {
			x:vars.cx+(rx1+ua*(rx2-rx1))*vars.scale,
			y:vars.cy+y/z*vars.scale,
			d:Math.sqrt(x*x+y*y+z*z)
		};
	}else{
		return { d:-1 };
	}
}


function rgb(col){

	col += 0.000001;
	var r = 0;//parseInt((0.5+Math.sin(col)*0.5)*256);
	var g = parseInt((0.5+Math.cos(col)*0.5)*256);
	var b = parseInt((0.2+Math.cos(col)*0.2)*256);
	return "#"+("0" + r.toString(16) ).slice (-2)+("0" + g.toString(16) ).slice (-2)+("0" + b.toString(16) ).slice (-2);
}

	
function rgb2(col){

	col += 0.000001;
	var r = parseInt((0.15+Math.cos(col)*0.15)*256);
	var g = 1;//parseInt((0.5+Math.sin(col)*0.5)*256);
	var b = parseInt((0.5+Math.cos(col)*0.5)*256);
	return "#"+("0" + r.toString(16) ).slice (-2)+("0" + g.toString(16) ).slice (-2)+("0" + b.toString(16) ).slice (-2);
}
	

	function Vert(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;
}


function Seg(x1,y1,z1,x2,y2,z2){
	this.a = new Vert(x1,y1,z1);
	this.b = new Vert(x2,y2,z2);
	this.dist=0;
}

	
function Polygon(){

	this.verts=[];
	this.dist=0;
}


function elevation(x,y,z){

	var dist = Math.sqrt(x*x+y*y+z*z);
	if(dist && z/dist>=-1 && z/dist <=1) return Math.acos(z / dist);
	return 0.00000001;
}


function transformShape(shape,scaleX,scaleY,scaleZ){

	for(var i=0;i<shape.polys.length;++i){
		for(var j=0;j<shape.polys[i].segs.length;++j){
			shape.polys[i].segs[j].a.x*=scaleX;
			shape.polys[i].segs[j].a.y*=scaleY;
			shape.polys[i].segs[j].a.z*=scaleZ;
			shape.polys[i].segs[j].b.x*=scaleX;
			shape.polys[i].segs[j].b.y*=scaleY;
			shape.polys[i].segs[j].b.z*=scaleZ;
		}
	}
}


function process(vars){
	
	var x1,y1,z1,x2,y2,z2,x=y=z=0,d1,d2,v=180;
	x1=vars.camX;
	y1=vars.camY;
	z1=vars.camZ;
	d1=Math.sqrt(vars.camX*vars.camX+vars.camY*vars.camY+vars.camZ*vars.camZ);
	var p=vars.frameNo/120;
	x=Math.sin(p)*v;
	y=-400;
	z=-Math.sin(p*2)*v/2;
	vars.camX=x;
	vars.camY=y;
	vars.camZ=z;
	d2=Math.sqrt(vars.camX*vars.camX+vars.camY*vars.camY+vars.camZ*vars.camZ);
	vars.camX=vars.camX/d2*d1;
	vars.camY=vars.camY/d2*d1;
	vars.camZ=vars.camZ/d2*d1;
	vars.yaw=Math.atan2(vars.camX-x1,vars.camZ-z1);
	vars.pitch=-elevation(vars.camX-x1,vars.camZ-z1,vars.camY-y1)+Math.PI/2+.3+.1*Math.cos(vars.frameNo/30);
}


function sortFunction(a,b){
	return b.dist-a.dist;
}


function rand(seed){
	return parseFloat('0.'+Math.sin(seed).toString().substr(6));
}


function draw(vars){

	vars.ctx.globalAlpha=1;
	vars.ctx.fillStyle="#000";
	vars.ctx.fillRect(0, 0, vars.canvas.width, vars.canvas.height);

	var t,x,y,z,x1,y1,z1,x2,y2,z2,point,visible;
	var polys=[];
	for(var i=0;i<vars.shapes.length;++i){
		for(var j=0;j<vars.shapes[i].polys.length;++j){
			vars.shapes[i].polys[j].dist=0;
			visible=1;
			vars.shapes[i].polys[j].shape=i;
			vars.shapes[i].polys[j].index=j;
			for(var k=0;k<vars.shapes[i].polys[j].segs.length;++k){
				x=vars.shapes[i].x+vars.shapes[i].polys[j].segs[k].a.x;
				y=vars.shapes[i].y+vars.shapes[i].polys[j].segs[k].a.y;
				z=vars.shapes[i].z+vars.shapes[i].polys[j].segs[k].a.z;
				point=project3D(x,y,z,vars);
				if((point.d != -1) && (i||point.d<160)){
					vars.shapes[i].polys[j].segs[k].rx=point.x;
					vars.shapes[i].polys[j].segs[k].ry=point.y;
					vars.shapes[i].polys[j].segs[k].dist=point.d;
					vars.shapes[i].polys[j].dist+=point.d;
				}else{
					visible=0;
				}
			}
			if(visible)polys.push(vars.shapes[i].polys[j]);
		}
	}
	polys.sort(sortFunction);
	var a;
	for(var i=0;i<polys.length;++i){
		a = polys[i].shape?1:1 - Math.pow(polys[i].dist / polys[i].segs.length / 150, 10) ;
		if(a>0 && a<=1){
			vars.ctx.fillStyle=polys[i].shape?rgb2(polys[i].index/8-vars.frameNo/12):rgb(polys[i].index/8-vars.frameNo/12);
			vars.ctx.globalAlpha=a;
			vars.ctx.beginPath();
			x1=polys[i].segs[0].rx;
			y1=polys[i].segs[0].ry;
			vars.ctx.moveTo(x1,y1);
			for(var k=1;k<polys[i].segs.length;++k){
				x2=polys[i].segs[k].rx;
				y2=polys[i].segs[k].ry;
				vars.ctx.lineTo(x2,y2);
			}
			vars.ctx.fill();
		}
		
		for(var k=0;k<polys[i].segs.length;++k){
			a = polys[i].shape?1:1 - Math.pow(polys[i].segs[k].dist / 150, 10) * 1;
			if(a>0 && a<=1){
				vars.ctx.strokeStyle=polys[i].shape?"#fff":"#fff";
				vars.ctx.globalAlpha=a*polys[i].shape?.1:.1;
				x1=polys[i].segs[k].rx;
				y1=polys[i].segs[k].ry;
				t=(k+1)%polys[i].segs.length;
				x2=polys[i].segs[t].rx;
				y2=polys[i].segs[t].ry;
				vars.ctx.beginPath();
				vars.ctx.moveTo(x1,y1);
				vars.ctx.lineTo(x2,y2);
				vars.ctx.lineWidth=1+(600+polys[i].shape*20000)/(1+polys[i].dist);
				vars.ctx.stroke();
			}
		}
	}
}


function pushVert(p1,p2,dist,poly){
	
	x=Math.sin(p1)*Math.sin(p2)*dist;
	z=Math.cos(p1)*Math.sin(p2)*dist;
	y=Math.cos(p2)*dist;
	poly.verts.push(new Vert(x,y,z));
}


function expandShape(shape,convexity){
	
	for(j=0;j<shape.polys.length;++j){
		for(k=0;k<shape.polys[j].verts.length;++k){
			x=shape.polys[j].verts[k].x;
			y=shape.polys[j].verts[k].y;
			z=shape.polys[j].verts[k].z;
			d=Math.sqrt(x*x+y*y+z*z);
			p1=Math.atan2(x,y);
			p2=elevation(x,y,z);
			d2=d+(1-d)*convexity;
			shape.polys[j].verts[k].x=Math.sin(p1)*Math.sin(p2)*d2;
			shape.polys[j].verts[k].y=Math.cos(p1)*Math.sin(p2)*d2;
			shape.polys[j].verts[k].z=Math.cos(p2)*d2;
		}
	}
	return shape;
}

function segmentize(source){

	var polys=[],x1,y1,z1,x2,y2,z2;
	for(var i=0;i<source.length;++i){
		var poly={};
		poly.segs=[];
		for(var j=0;j<source[i].verts.length;++j){
			x1=source[i].verts[j].x;
			y1=source[i].verts[j].y;
			z1=source[i].verts[j].z;
			if(j<source[i].verts.length-1){
				x2=source[i].verts[j+1].x;
				y2=source[i].verts[j+1].y;
				z2=source[i].verts[j+1].z;
			}else{
				x2=source[i].verts[0].x;
				y2=source[i].verts[0].y;
				z2=source[i].verts[0].z;
			}
			poly.segs.push(new Seg(x1,y1,z1,x2,y2,z2));
		}
		polys.push(poly);
	}
	return polys;
}	


function Shape(x,y,z){
	
	this.polys=[];
	this.x=x, this.y=y, this.z=z;
}


function Icosahedron(x,y,z){
	
	var size=1, phi = 1.61803398875;
	this.polys=[];
	this.x=x, this.y=y, this.z=z, this.dist=0;
	x1=-phi, y1=-1, z1=0, x2=phi, y2=-1, z2=0, x3=phi, y3=1, z3=0, x4=-phi, y4=1, z4=0,
	y5=-phi, z5=-1, x5=0, y6=phi, z6=-1, x6=0, y7=phi, z7=1, x7=0, y8=-phi, z8=1, x8=0,
	z9=-phi, x9=-1, y9=0, z10=phi, x10=-1, y10=0, z11=phi, x11=1, y11=0, z12=-phi, x12=1, y12=0;
	p={}; p.verts=[];
	p.verts.push(new Vert(x1,y1,z1));
	p.verts.push(new Vert(x5,y5,z5));
	p.verts.push(new Vert(x8,y8,z8));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x2,y2,z2));
	p.verts.push(new Vert(x5,y5,z5));
	p.verts.push(new Vert(x8,y8,z8));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x3,y3,z3));
	p.verts.push(new Vert(x6,y6,z6));
	p.verts.push(new Vert(x7,y7,z7));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x4,y4,z4));
	p.verts.push(new Vert(x6,y6,z6));
	p.verts.push(new Vert(x7,y7,z7));
	this.polys.push(p);	
	p={}; p.verts=[];
	p.verts.push(new Vert(x9,y9,z9));
	p.verts.push(new Vert(x12,y12,z12));
	p.verts.push(new Vert(x5,y5,z5));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x9,y9,z9));
	p.verts.push(new Vert(x12,y12,z12));
	p.verts.push(new Vert(x6,y6,z6));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x10,y10,z10));
	p.verts.push(new Vert(x11,y11,z11));
	p.verts.push(new Vert(x7,y7,z7));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x10,y10,z10));
	p.verts.push(new Vert(x11,y11,z11));
	p.verts.push(new Vert(x8,y8,z8));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x1,y1,z1));
	p.verts.push(new Vert(x9,y9,z9));
	p.verts.push(new Vert(x4,y4,z4));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x1,y1,z1));
	p.verts.push(new Vert(x10,y10,z10));
	p.verts.push(new Vert(x4,y4,z4));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x2,y2,z2));
	p.verts.push(new Vert(x11,y11,z11));
	p.verts.push(new Vert(x3,y3,z3));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x2,y2,z2));
	p.verts.push(new Vert(x12,y12,z12));
	p.verts.push(new Vert(x3,y3,z3));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x2,y2,z2));
	p.verts.push(new Vert(x11,y11,z11));
	p.verts.push(new Vert(x8,y8,z8));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x2,y2,z2));
	p.verts.push(new Vert(x12,y12,z12));
	p.verts.push(new Vert(x5,y5,z5));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x1,y1,z1));
	p.verts.push(new Vert(x10,y10,z10));
	p.verts.push(new Vert(x8,y8,z8));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x1,y1,z1));
	p.verts.push(new Vert(x9,y9,z9));
	p.verts.push(new Vert(x5,y5,z5));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x4,y4,z4));
	p.verts.push(new Vert(x9,y9,z9));
	p.verts.push(new Vert(x6,y6,z6));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x3,y3,z3));
	p.verts.push(new Vert(x12,y12,z12));
	p.verts.push(new Vert(x6,y6,z6));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x4,y4,z4));
	p.verts.push(new Vert(x10,y10,z10));
	p.verts.push(new Vert(x7,y7,z7));
	this.polys.push(p);
	p={}; p.verts=[];
	p.verts.push(new Vert(x3,y3,z3));
	p.verts.push(new Vert(x11,y11,z11));
	p.verts.push(new Vert(x7,y7,z7));
	this.polys.push(p);
}


function subdivide(shape,subdivisions){
	
	for(var j=0;j<subdivisions;++j){
		newShape=new Shape(shape.x,shape.y,shape.z);
		for(var k=0;k<shape.polys.length;++k){
			x1=(shape.polys[k].verts[1].x+shape.polys[k].verts[0].x)/2;
			y1=(shape.polys[k].verts[1].y+shape.polys[k].verts[0].y)/2;
			z1=(shape.polys[k].verts[1].z+shape.polys[k].verts[0].z)/2;
			x2=(shape.polys[k].verts[2].x+shape.polys[k].verts[1].x)/2;
			y2=(shape.polys[k].verts[2].y+shape.polys[k].verts[1].y)/2;
			z2=(shape.polys[k].verts[2].z+shape.polys[k].verts[1].z)/2;
			x3=(shape.polys[k].verts[0].x+shape.polys[k].verts[2].x)/2;
			y3=(shape.polys[k].verts[0].y+shape.polys[k].verts[2].y)/2;
			z3=(shape.polys[k].verts[0].z+shape.polys[k].verts[2].z)/2;
			p=new Polygon();
			p.verts.push(new Vert(shape.polys[k].verts[0].x,shape.polys[k].verts[0].y,shape.polys[k].verts[0].z));
			p.verts.push(new Vert(x1,y1,z1));
			p.verts.push(new Vert(x3,y3,z3));
			newShape.polys.push(p);
			p=new Polygon();
			p.verts.push(new Vert(x1,y1,z1));
			p.verts.push(new Vert(shape.polys[k].verts[1].x,shape.polys[k].verts[1].y,shape.polys[k].verts[1].z));
			p.verts.push(new Vert(x2,y2,z2));
			newShape.polys.push(p);
			p=new Polygon();
			p.verts.push(new Vert(x3,y3,z3));
			p.verts.push(new Vert(x2,y2,z2));
			p.verts.push(new Vert(shape.polys[k].verts[2].x,shape.polys[k].verts[2].y,shape.polys[k].verts[2].z));
			newShape.polys.push(p);
			p=new Polygon();
			p.verts.push(new Vert(x3,y3,z3));
			p.verts.push(new Vert(x1,y1,z1));
			p.verts.push(new Vert(x2,y2,z2));
			newShape.polys.push(p);
		}
		shape=newShape;
	}
	return shape;
}


function truncate(shape,vars,modulate){
	var x1,y1,z1,x2,y2,z2,seg,t,t2,polys;
	for(var i=0;i<shape.polys.length;++i){
		t=shape.polys[i].segs.length;
		if(modulate){
			t2=(2/3)*(1+Math.sin(vars.frameNo/10+Math.PI*2/shape.polys.length*i*4)/4);
		}else{
			t2=(2/3);
		}
		shape.polys[i].col=t2;
		for(var j=0;j<t;++j){
			x1=shape.polys[i].segs[j].a.x;
			y1=shape.polys[i].segs[j].a.y;
			z1=shape.polys[i].segs[j].a.z;
			x2=shape.polys[i].segs[j].b.x;
			y2=shape.polys[i].segs[j].b.y;
			z2=shape.polys[i].segs[j].b.z;
			shape.polys[i].segs[j].a.x=x2-(x2-x1)*t2;
			shape.polys[i].segs[j].a.y=y2-(y2-y1)*t2;
			shape.polys[i].segs[j].a.z=z2-(z2-z1)*t2;
			shape.polys[i].segs[j].b.x=x1+(x2-x1)*t2;
			shape.polys[i].segs[j].b.y=y1+(y2-y1)*t2;
			shape.polys[i].segs[j].b.z=z1+(z2-z1)*t2;
		}
		poly={};
		poly.segs=[];
		poly.col=shape.polys[i].col;
		for(var j=0;j<t;++j){
			x1=shape.polys[i].segs[j].b.x;
			y1=shape.polys[i].segs[j].b.y;
			z1=shape.polys[i].segs[j].b.z;
			if(j<t-1){
				x2=shape.polys[i].segs[j+1].a.x;
				y2=shape.polys[i].segs[j+1].a.y;
				z2=shape.polys[i].segs[j+1].a.z;
			}else{
				x2=shape.polys[i].segs[0].a.x;
				y2=shape.polys[i].segs[0].a.y;
				z2=shape.polys[i].segs[0].a.z;					
			}
			seg = new Seg(x1,y1,z1,x2,y2,z2);
			poly.segs.push(shape.polys[i].segs[j]);
			poly.segs.push(seg);
		}
		shape.polys[i]=poly;
	}
	
	var x,y,z,x3,y3,z3,x4,y4,z4,d,d1,d2,d3,d4,shared,unshared=[];
	for(var i=0;i<shape.polys.length;++i){
		for(var j=0;j<shape.polys[i].segs.length;++j){
			shared=0;
			x1=shape.polys[i].segs[j].a.x;
			y1=shape.polys[i].segs[j].a.y;
			z1=shape.polys[i].segs[j].a.z;
			x2=shape.polys[i].segs[j].b.x;
			y2=shape.polys[i].segs[j].b.y;
			z2=shape.polys[i].segs[j].b.z;
			for(var k=0;!shared&&(k<shape.polys.length);++k){
				if(k!=i){
					for(var m=0;!shared&&(m<shape.polys[k].segs.length);++m){
						x3=shape.polys[k].segs[m].a.x;
						y3=shape.polys[k].segs[m].a.y;
						z3=shape.polys[k].segs[m].a.z;
						x4=shape.polys[k].segs[m].b.x;
						y4=shape.polys[k].segs[m].b.y;
						z4=shape.polys[k].segs[m].b.z;
						d1=Math.sqrt((x3-x1)*(x3-x1)+(y3-y1)*(y3-y1)+(z3-z1)*(z3-z1));
						d2=Math.sqrt((x4-x1)*(x4-x1)+(y4-y1)*(y4-y1)+(z4-z1)*(z4-z1));
						d3=Math.sqrt((x3-x2)*(x3-x2)+(y3-y2)*(y3-y2)+(z3-z2)*(z3-z2));
						d4=Math.sqrt((x4-x2)*(x4-x2)+(y4-y2)*(y4-y2)+(z4-z2)*(z4-z2));
						if((d1<.01&&d4<.01)||(d2<.01&&d3<.01))shared=1;
					}
				}
			}
			if(!shared){
				shape.polys[i].segs[j].visited=0;
				unshared.push(shape.polys[i].segs[j]);
			}
			shape.polys[i].segs[j].shared=shared;
		}
	}
	var holes=0;
	for(var i=0;i<unshared.length;++i){
		if(!unshared[i].visited){
			unshared[i].visited=1;
			x=unshared[i].a.x;
			y=unshared[i].a.y;
			z=unshared[i].a.z;
			x1=unshared[i].b.x;
			y1=unshared[i].b.y;
			z1=unshared[i].b.z;
			var poly={};
			poly.segs=[];
			poly.segs.push(new Seg(x,y,z,x1,y1,z1));
			holes++;
			do{
				for(var j=0;j<unshared.length;++j){
					if(!unshared[j].visited){
						x2=unshared[j].a.x;
						y2=unshared[j].a.y;
						z2=unshared[j].a.z;
						x3=unshared[j].b.x;
						y3=unshared[j].b.y;
						z3=unshared[j].b.z;
						d1=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1));
						d2=Math.sqrt((x3-x1)*(x3-x1)+(y3-y1)*(y3-y1)+(z3-z1)*(z3-z1));
						if(d1<.01){
							poly.segs.push(new Seg(x2,y2,z2,x3,y3,z3));
							unshared[j].visited=1;
							x1=x3;
							y1=y3;
							z1=z3;
						}else if(d2<.01){
							poly.segs.push(new Seg(x3,y3,z3,x2,y2,z2));
							unshared[j].visited=1;
							x1=x2;
							y1=y2;
							z1=z2;
						}
					}
				}
				d=Math.sqrt((x-x1)*(x-x1)+(y-y1)*(y-y1)+(z-z1)*(z-z1));
			}while(d>.01);
			shape.polys.push(poly);
		}
	}
	return shape;
}


function loadScene(vars){
	
	var x,y,z,x1,y1,z1,x2,y2,z2,x3,y3,z3;
	vars.shapes=[];
	
	x=0;
	y=0;
	z=0;

	shape=new Icosahedron(x,y,z);
	shape=subdivide(shape,5);
	shape=expandShape(shape,1)
	shape.polys=segmentize(shape.polys);
	//shape=truncate(shape,vars,0);
	shape.roll=shape.pitch=shape.yaw=0;
	vars.shapes.push(shape);
	transformShape(vars.shapes[vars.shapes.length-1],500,500,500);

	shape=new Icosahedron(x,y,z);
	shape=subdivide(shape,2);
	shape=expandShape(shape,1)
	shape.polys=segmentize(shape.polys);
	shape=truncate(shape,vars,0);
	shape.roll=shape.pitch=shape.yaw=0;
	vars.shapes.push(shape);
	transformShape(vars.shapes[vars.shapes.length-1],1000,1000,1000);
}


function frame(vars) {

	if(vars === undefined){
		var vars={};
		vars.canvas = document.createElement("canvas");
		document.body.appendChild(vars.canvas);
		vars.ctx = vars.canvas.getContext("2d");
		vars.canvas.width = window.innerWidth;
		vars.canvas.height = window.innerHeight;
		window.addEventListener("resize", function(){
			vars.canvas.width = window.innerWidth;
			vars.canvas.height = window.innerHeight;
			vars.cx=vars.canvas.width/2;
			vars.cy=vars.canvas.height/2;
		}, true);
		vars.canvas.addEventListener("mousemove", function(e){
			var rect = vars.canvas.getBoundingClientRect();
			vars.mx = Math.round((e.clientX-rect.left)/(rect.right-rect.left)*vars.canvas.width);
			vars.my = Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*vars.canvas.height);
		}, true);
		vars.canvas.addEventListener("mousedown", function(e){
			vars.mbutton=1;
		}, true);
		vars.canvas.addEventListener("mouseup", function(e){
			vars.mbutton=0;
		}, true);
		vars.canvas.addEventListener("touchstart", function(e){
			vars.mbutton=1;
			e.preventDefault();
			var rect = vars.canvas.getBoundingClientRect();
			vars.mx = Math.round((e.changedTouches[0].pageX-rect.left)/(rect.right-rect.left)*vars.canvas.width);
			vars.my = Math.round((e.changedTouches[0].pageY-rect.top)/(rect.bottom-rect.top)*vars.canvas.height);
		}, true);
		vars.canvas.addEventListener("touchend", function(e){
			vars.mbutton=0;
		}, true);
		vars.canvas.addEventListener("touchmove", function(e){
			e.preventDefault();
			var rect = vars.canvas.getBoundingClientRect();
			vars.mx = Math.round((e.changedTouches[0].pageX-rect.left)/(rect.right-rect.left)*vars.canvas.width);
			vars.my = Math.round((e.changedTouches[0].pageY-rect.top)/(rect.bottom-rect.top)*vars.canvas.height);
		}, true);
		vars.camX = 0;
		vars.camY = -530;
		vars.camZ = 0;
		vars.pitch = 0;
		vars.yaw = 0;
		vars.cx=vars.canvas.width/2;
		vars.cy=vars.canvas.height/2;
		vars.scale=600;
		vars.frameNo=0;
		vars.mx=0;
		vars.my=0;
		loadScene(vars);
	}

	vars.frameNo++;
	requestAnimationFrame(function() {
	  frame(vars);
	});

	process(vars);
	draw(vars);
}

frame();