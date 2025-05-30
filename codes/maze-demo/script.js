D=()=>{
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
    return {x:vars.cx+x/z*vars.cx,y:vars.cy+y/z*vars.cx,d:z>=.1?Math.hypot(x,y,z):-1};
  }


  function reverseRasterize(depth, mx, my, vars){

    var vert=new Vert(),d,p;
    vert.x=vars.camX+(-vars.cx+mx)/vars.cx*depth;
    vert.y=vars.camY+(-vars.cy+my)/vars.cx*depth;
    vert.z=vars.camZ+depth;    
    d=Math.sqrt((vert.y-vars.camY)*(vert.y-vars.camY)+(vert.z-vars.camZ)*(vert.z-vars.camZ));
    p=Math.atan2(vert.y-vars.camY,vert.z-vars.camZ);
    vert.y=vars.camY+Math.sin(p+vars.pitch)*d;
    vert.z=vars.camZ+Math.cos(p+vars.pitch)*d;
    d=Math.sqrt((vert.x-vars.camX)*(vert.x-vars.camX)+(vert.z-vars.camZ)*(vert.z-vars.camZ));
    p=Math.atan2(vert.x-vars.camX,vert.z-vars.camZ);
    vert.x=vars.camX+Math.sin(p+vars.yaw)*d;
    vert.z=vars.camZ+Math.cos(p+vars.yaw)*d;

    d=Math.sqrt((vert.x-vars.camX)*(vert.x-vars.camX)+
          (vert.y-vars.camY)*(vert.y-vars.camY)+
          (vert.z-vars.camZ)*(vert.z-vars.camZ));
    var x = vert.x-vars.camX;
    var y = vert.y-vars.camY;
    var z = vert.z-vars.camZ;
    var t=d/depth;
    vert.x=vars.camX+x/t;
    vert.y=vars.camY+y/t;
    vert.z=vars.camZ+z/t;
    return vert;
  }


  function Vert(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }


  function Seg(x1,y1,z1,x2,y2,z2){
    this.a = new Vert(x1,y1,z1);
    this.b = new Vert(x2,y2,z2);
    this.oa = new Vert(x1,y1,z1);
    this.ob = new Vert(x2,y2,z2);
    this.del=0;
  }


  function elevation(x,y,z){

    var dist = Math.sqrt(x*x+y*y+z*z);
    if(dist && z/dist>=-1 && z/dist <=1) return Math.acos(z / dist);
    return 0.00000001;
  }


  function process(vars){
    
    if(vars.mbutton)loadMaze(vars);
    var p,d,t;
    p = Math.atan2(vars.camX, vars.camZ);
    d = Math.sqrt(vars.camX * vars.camX + vars.camZ * vars.camZ) ;
    t = Math.cos(vars.frameNo / 80) / 150;
    vars.camX = Math.sin(p + t) * d;
    vars.camZ = Math.cos(p + t) * d;
    vars.camY = -Math.cos(vars.frameNo / 80) * 20;
    vars.yaw = Math.PI + p + t;
    vars.pitch = elevation(vars.camX, vars.camZ, vars.camY) - Math.PI / 2;
    
    //vars.selected=-1;

    for(var j=0;j<vars.attractors.length;++j){
      var mx = vars.attractors[j].rx;
      var my = vars.attractors[j].ry;
      var point=reverseRasterize(10000, mx, my, vars);
      for(var i=0;i<vars.shapes.length;++i){
        x=vars.shapes[i].x;
        y=vars.shapes[i].y;
        z=vars.shapes[i].z;
        vars.shapes[i].selected=0;
        var x1 = vars.shapes[i].x+vars.shapes[i].osegs[0].a.x;
        var y1 = vars.shapes[i].y+vars.shapes[i].osegs[0].a.y;
        var z1 = vars.shapes[i].z+vars.shapes[i].osegs[0].a.z;
        var x2 = vars.shapes[i].x+vars.shapes[i].osegs[1].a.x;
        var y2 = vars.shapes[i].y+vars.shapes[i].osegs[1].a.y;
        var z2 = vars.shapes[i].z+vars.shapes[i].osegs[1].a.z;
        var x3 = vars.shapes[i].x+vars.shapes[i].osegs[2].a.x;
        var y3 = vars.shapes[i].y+vars.shapes[i].osegs[2].a.y;
        var z3 = vars.shapes[i].z+vars.shapes[i].osegs[2].a.z;
        var D = -(x1*(y2*z3-y3*z2)+x2*(y3*z1-y1*z3)+x3*(y1*z2-y2*z1));
        var A = y1*(z2-z3)+y2*(z3-z1)+y3*(z1-z2);
        var B = z1*(x2-x3)+z2*(x3-x1)+z3*(x1-x2);
        var C = x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2);
        var uc = A*(vars.camX-point.x)+B*(vars.camY-point.y)+C*(vars.camZ-point.z);
        var u = uc?(A*vars.camX+B*vars.camY+C*vars.camZ+D)/uc:-1;
        x = vars.camX+u*(point.x-vars.camX);
        y = vars.camY+u*(point.y-vars.camY);
        z = vars.camZ+u*(point.z-vars.camZ);
        a=0;
        for(var k=0;k<vars.shapes[i].osegs.length;++k){
          var v1 = [vars.shapes[i].x+vars.shapes[i].osegs[k].a.x-x,
                vars.shapes[i].y+vars.shapes[i].osegs[k].a.y-y,
                vars.shapes[i].z+vars.shapes[i].osegs[k].a.z-z];
          var v2 = [vars.shapes[i].x+vars.shapes[i].osegs[k].b.x-x,
                vars.shapes[i].y+vars.shapes[i].osegs[k].b.y-y,
                vars.shapes[i].z+vars.shapes[i].osegs[k].b.z-z];
          d = Math.sqrt(v1[0]*v1[0]+v1[1]*v1[1]+v1[2]*v1[2]);
          v1[0] /= d;
          v1[1] /= d;
          v1[2] /= d;
          d = Math.sqrt(v2[0]*v2[0]+v2[1]*v2[1]+v2[2]*v2[2]);
          v2[0] /= d;
          v2[1] /= d;
          v2[2] /= d;
          a += Math.acos(v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]);
        }
        if(a>=Math.PI*2-.01){
          for(var m=0;m<i;++m) vars.shapes[m].selected=0;
          vars.shapes[i].selected=1;
          vars.selected[j]=i;
        }
      }
    }

    
    for(var i = 0; i<vars.attractors.length; ++i){
      vars.attractors[i].X+=vars.attractors[i].VX;
      vars.attractors[i].Y+=vars.attractors[i].VY;
      var a =0;
      for(var j=0;j<vars.container.segs.length;++j){
        var x = vars.attractors[i].x;
        var y = vars.attractors[i].y;
        var z = vars.attractors[i].z;
        var v1 = [vars.container.x+vars.container.osegs[j].a.x-x,
              vars.container.y+vars.container.osegs[j].a.y-y,
              vars.container.z+vars.container.osegs[j].a.z-z];
        var v2 = [vars.container.x+vars.container.osegs[j].b.x-x,
              vars.container.y+vars.container.osegs[j].b.y-y,
              vars.container.z+vars.container.osegs[j].b.z-z];
        d = Math.sqrt(v1[0]*v1[0]+v1[1]*v1[1]+v1[2]*v1[2]);
        v1[0] /= d;
        v1[1] /= d;
        v1[2] /= d;
        d = Math.sqrt(v2[0]*v2[0]+v2[1]*v2[1]+v2[2]*v2[2]);
        v2[0] /= d;
        v2[1] /= d;
        v2[2] /= d;
        a += Math.acos(v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]);

        var x1 = vars.attractors[i].X;
        var y1 = vars.attractors[i].Y;
        var x2 = vars.attractors[i].X+vars.attractors[i].VX*2;
        var y2 = vars.attractors[i].Y+vars.attractors[i].VY*2;
        var x3 = vars.container.segs[j].a.x;
        var y3 = vars.container.segs[j].a.y;
        var x4 = vars.container.segs[j].b.x;
        var y4 = vars.container.segs[j].b.y;
        var uc = (y4-y3)*(x2-x1)-(x4-x3)*(y2-y1);
        var ua = ((x4-x3)*(y1-y3)-(y4-y3)*(x1-x3))/uc;
        var ub = ((x2-x1)*(y1-y3)-(y2-y1)*(x1-x3))/uc;
        if(ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1){
          var v = Math.hypot(vars.attractors[i].VX,vars.attractors[i].VY);
          var rix=x1-x2;
          var riy=y2-y1;
          var d=Math.hypot(rix,riy);
          rix/=d;
          riy/=d;
          var nx=y4-y3
          var ny=x4-x3
          var d=Math.hypot(nx,ny);
          nx/=d;
          ny/=d;
          d=rix*nx+riy*ny;
          rx=rix-2*nx*d;
          ry=riy-2*nx*d;
          d=Math.hypot(rx,ry);
          vars.attractors[i].VX = -rx/d*v;
          vars.attractors[i].VY = -ry/d*v;
        }
      }
      if(a>=Math.PI*2-.01 || Math.hypot(vars.attractors[i].X,vars.attractors[i].Y)>vars.containerRadius){
        vars.attractors[i].X=0;
        vars.attractors[i].Y=0;
      }
    }

    for(var i=0;i<vars.shapes.length;++i) vars.shapes[i].visited = 0;
      vars.path = [];
      tracePath(vars.selected[0], vars.selected[1],vars);
  }

  
  function tracePath(current,target,vars){
    if(vars.shapes[current].visited) return;
    vars.shapes[current].visited = 1;
    if(current == target) return 1;
    for(var i = 0; i < vars.shapes[current].connectingNodes.length; ++i){
      var t1 = vars.shapes[current].connectingNodes[i];
      if(tracePath(t1,target,vars)){
        vars.path.push({x:vars.shapes[t1].x,y:vars.shapes[t1].y,z:vars.shapes[t1].z});
        return 1;
      }
    }
  }


  function draw(vars){

    vars.ctx.globalAlpha=1;
    vars.ctx.fillStyle="#000";
    vars.ctx.fillRect(0, 0, c.width, c.height);

    var x,y,z,pt1,pt2;
    
    vars.ctx.globalAlpha=1;
    vars.ctx.strokeStyle=`hsl(${t*599},2%,30%`;
    for(var i=0;i<vars.shapes.length;++i){
      for(var j=0;j<vars.shapes[i].segs.length;++j){
        x=vars.shapes[i].x+vars.shapes[i].segs[j].a.x;
        y=vars.shapes[i].y+vars.shapes[i].segs[j].a.y;
        z=vars.shapes[i].z+vars.shapes[i].segs[j].a.z;
        pt1=project3D(x,y,z,vars);
        if(pt1.d != -1){
          x=vars.shapes[i].x+vars.shapes[i].segs[j].b.x;
          y=vars.shapes[i].y+vars.shapes[i].segs[j].b.y;
          z=vars.shapes[i].z+vars.shapes[i].segs[j].b.z;
          pt2=project3D(x,y,z,vars);
          vars.ctx.lineWidth=1+20/(1+pt1.d);
          vars.ctx.beginPath();
          vars.ctx.moveTo(pt1.x,pt1.y);
          vars.ctx.lineTo(pt2.x,pt2.y);
          vars.ctx.stroke();
        }
      }
    }
    
    if(vars.path.length){
      var X = vars.path[0].x;
      var Y = vars.path[0].y;
      var Z = vars.path[0].z;
      var point = project3D(X,Y,Z,vars);
      for(var i = 1; i < vars.path.length; ++i){
        vars.ctx.strokeStyle=`hsl(${180/vars.path.length*i+t*1000},100%,${66+Math.sin(t*8)*33}%)`;
        vars.ctx.beginPath();
        vars.ctx.lineWidth = 1+50/(1+point.d);
        vars.ctx.lineTo(point.x,point.y);
        X = vars.path[i].x;
        Y = vars.path[i].y;
        Z = vars.path[i].z;
        point = project3D(X,Y,Z,vars);
        vars.ctx.lineTo(point.x,point.y);
        vars.ctx.stroke();
      }
    }

    for(var i = 0; i < vars.attractors.length; ++i){
      X = vars.attractors[i].X;
      Y = vars.attractors[i].Y;
      Z = vars.attractors[i].Z;
      var point = project3D(X,Y,Z,vars);
      if(point.d != -1){
        vars.attractors[i].rx = point.x;
        vars.attractors[i].ry = point.y;
        var s=8000/(1+point.d);
        vars.ctx.drawImage(vars.star,point.x-s/2,point.y-s/2,s,s);
      }
    }
  }


  function createShape(x,y,z,sides,multiplier,theta=0){

    var shape={},ls=multiplier/2,x1,y1,z1,x2,y2,z2;
    shape.segs=[];
    shape.osegs=[];
    shape.x=x;
    shape.y=y;
    shape.z=z;
    shape.pathed=0;
    shape.visited = 0;
    shape.connectingNodes = [];
    for(var i=0;i<sides;++i){
      p=Math.PI*2/sides*i+theta;
      x1=Math.sin(p)*ls;
      y1=Math.cos(p)*ls;
      z1=0;
      p=Math.PI*2/sides*(i+1)+theta;
      x2=Math.sin(p)*ls;
      y2=Math.cos(p)*ls;
      z2=0;
      shape.segs.push(new Seg(x1,y1,z1,x2,y2,z2));
      shape.osegs.push(new Seg(x1,y1,z1,x2,y2,z2));
    }
    return shape;
  }


  function loadMaze(vars){
    
    vars.shapes=[];
    var p,sd=6,ls,x,y,z,x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4,size=Math.floor(160*(1/sd)),spacing;
    vars.sd=sd;
    var multiplier = 1;
    switch(sd){
      case 4: spacing=0.70710678118654752440084436210485*multiplier; break;
      case 6: spacing=0.86602540378443864676372317075294*multiplier; break;
    }
    vars.containerRadius = size*2*spacing*multiplier;
    vars.container = createShape(0,0,0,sd,vars.containerRadius,Math.PI/sd);
    for(var m=size;m>0;--m){
      ls=m*spacing;
      for(var j=0;j<sd;++j){
        p=Math.PI*2/sd*j+Math.PI/sd;
        x1=Math.sin(p)*ls;
        y1=Math.cos(p)*ls;
        z1=0;
        p=Math.PI*2/sd*(j+1)+Math.PI/sd;
        x2=Math.sin(p)*ls;
        y2=Math.cos(p)*ls;
        z2=0;
        for(var k=0;k<m;++k){
          x=x1+(x2-x1)/m*k;
          y=y1+(y2-y1)/m*k;
          z=z1+(z2-z1)/m*k;
          vars.shapes.push(createShape(x,y,z,sd,multiplier));
        }
      }
    }
    vars.shapes.push(createShape(0,0,0,sd,multiplier));
    
    var stepFound,d,t,t2=0,tries=0,subPathLength;
    vars.pathSegs=[];
    ls=spacing;
    x1=vars.shapes[t2].x;
    y1=vars.shapes[t2].y;
    z1=vars.shapes[t2].z;
    vars.shapes[t2].pathed=0;
    do{
      stepFound=0;
      for(var i=0;i<sd*2&&!stepFound;++i){
        t=Math.floor(Math.random()*sd);
        p=Math.PI*2/sd*t+Math.PI/sd;
        x2=x1+Math.sin(p)*ls;
        y2=y1+Math.cos(p)*ls;
        z2=z1;
        for(var j=0;j<vars.shapes.length&&!stepFound;++j){
          if(!vars.shapes[j].pathed){
            x3=vars.shapes[j].x;
            y3=vars.shapes[j].y;
            z3=vars.shapes[j].z;
            d=Math.sqrt((x3-x2)*(x3-x2)+(y3-y2)*(y3-y2));
            if(d<.001){
              stepFound=1;
              subPathLength++;
              tries=0;
              vars.pathSegs.push(new Seg(x1,y1,z1,x3,y3,z3));
              vars.pathSegs[vars.pathSegs.length-1].a.index=t2;
              vars.pathSegs[vars.pathSegs.length-1].b.index=j;
              vars.shapes[t2].segs[t].del=1;
              vars.shapes[j].segs[(t+sd/2)%sd].del=1;
              t2=j;
              x1=vars.shapes[t2].x;
              y1=vars.shapes[t2].y;
              z1=vars.shapes[t2].z;
              vars.shapes[t2].pathed=vars.pathSegs.length;
            }
          }
        }
      }
      if(subPathLength>12||tries>sd*2){
        subPathLength=0;
        t2=vars.pathSegs[Math.ceil(Math.random()*(vars.pathSegs.length-1))].b.index;
        x1=vars.shapes[t2].x;
        y1=vars.shapes[t2].y;
        z1=vars.shapes[t2].z;
      }
      tries++;
      complete=1;
      for(var i=1;i<vars.shapes.length&&complete;++i){
        if(!vars.shapes[i].pathed)complete=0;
      }
    }while(!complete);
    for(var i=0;i<vars.shapes.length;++i){
      for(var j=vars.shapes[i].segs.length-1;j>=0;--j){
        if(vars.shapes[i].segs[j].del) vars.shapes[i].segs.splice(j,1);
      }
    }
    
    for(var i = 0; i < vars.pathSegs.length; ++i){
      vars.shapes[vars.pathSegs[i].a.index].connectingNodes.push(vars.pathSegs[i].b.index);
    }
    for(var i = 0; i < vars.shapes.length; ++i){
      for(var j = 0; j < vars.pathSegs.length; ++j){
        if(vars.pathSegs[j].b.index == i)vars.shapes[i].connectingNodes.push(vars.pathSegs[j].a.index);
      }
      for(var m = 0;m<vars.shapes[i].segs.length;++m){
        for(var j = 0; j < vars.shapes.length; ++j){
          if(i!=j && Math.hypot(vars.shapes[i].x-vars.shapes[j].x,vars.shapes[i].y-vars.shapes[j].y)<spacing*2.1){
            for(var n = 0;n<vars.shapes[j].segs.length;++n){
              var X1 = vars.shapes[i].x+vars.shapes[i].segs[m].a.x;
              var Y1 = vars.shapes[i].y+vars.shapes[i].segs[m].a.y;
              var X2 = vars.shapes[i].x+vars.shapes[i].segs[m].b.x;
              var Y2 = vars.shapes[i].y+vars.shapes[i].segs[m].b.y;
              var X3 = vars.shapes[j].x+vars.shapes[j].segs[n].a.x;
              var Y3 = vars.shapes[j].y+vars.shapes[j].segs[n].a.y;
              var X4 = vars.shapes[j].x+vars.shapes[j].segs[n].b.x;
              var Y4 = vars.shapes[j].y+vars.shapes[j].segs[n].b.y;
              var X =Math.abs((X4-X1)+(Y4-Y1))+Math.abs((X3-X2)+(Y3-Y2));
              if(X<.01)vars.shapes[j].segs.splice(n,1);
            }
          }
        }
      }
    }
    var totalSegs = 0;
    for(var i = 0; i < vars.shapes.length; ++i){
      totalSegs += vars.shapes[i].segs.length;
    }
  }


  function frame(vars) {

    if(vars === undefined){
      var vars={};
      vars.ctx = c.getContext("2d");
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      window.addEventListener("resize", function(){
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        vars.cx=c.width/2;
        vars.cy=c.height/2;
      }, true);
      vars.camX = 0;
      vars.camY = 0;
      vars.camZ = -65;
      vars.pitch = 0;
      vars.yaw = 0;
      vars.cx=c.width/2;
      vars.cy=c.height/2;
      vars.scale=600;
      vars.frameNo=0;
      vars.mx=0;
      vars.my=0;
      vars.path = [];
      vars.star = new Image();
      vars.star.src = "http://srmcgann.github.io/temp/stars/star3.png";
      var p = Math.PI*2*Math.random();
      var VX1 = Math.sin(p)/4;
      var VY1 = Math.cos(p)/4;
      var p = Math.PI*2*Math.random();
      var VX2 = Math.sin(p)/3;
      var VY2 = Math.cos(p)/3;
      vars.attractors = [
        {X:0,Y:0,Z:0,VX:VX1,VY:VY1,rx:vars.cx,ry:vars.cy},
        {X:0,Y:0,Z:0,VX:VX2,VY:VY2,rx:vars.cx,ry:vars.cy}
      ];
      vars.selected=Array(2);
      loadMaze(vars);
    }

    vars.frameNo++;
    requestAnimationFrame(function() {
      frame(vars);
    });

    process(vars);
    draw(vars);
    t+=1/60;
  }
  frame();
}
t=0;
D();