pointNo=60
sphereNo=5
initSphereV=.15
gravity=3;
initV=.65
fluxLength=9
CAMZ=15

Draw=()=>{
  W=c.width/2,H=c.height/2
  x.globalAlpha=.3
  x.fillStyle="#000"
  x.fillRect(0,0,c.width,c.height)
  x.strokeStyle="#fff"
  if(!t){
    P=[]
    P3D = (X,Y,Z) => {Z+=CAMZ; return {X:W+X/Z*W,Y:H+Y/Z*W,D:Z>0?Z:0}}
    R = (V,YAW,PITCH,ROLL) => {
      let D=Math.hypot(V.Y,V.Z)
      let P=Math.atan2(V.Y,V.Z)+PITCH
      V.Y=S(P)*D
      V.Z=C(P)*D
      D=Math.hypot(V.X,V.Z)
      P=Math.atan2(V.X,V.Z)+YAW
      V.X=S(P)*D
      V.Z=C(P)*D
      D=Math.hypot(V.X,V.Y)
      P=Math.atan2(V.X,V.Y)+ROLL
      V.X=S(P)*D
      V.Y=C(P)*D
      V.VX=V.X*initV
      V.VY=V.Y*initV
      V.VZ=V.Z*initV
    }
    for(j=0;j<sphereNo;++j){
      X1=-5+Math.random()*10,Y1=-5+Math.random()*10,Z1=-5+Math.random()*10
      p1=Math.random()*Math.PI*2
      p2=Math.pow(Math.pow(Math.random(),3/4)/Math.PI,3/4)*3.706+(Math.random()>=.5?Math.PI:0)
      VX=S(p1)*S(p2)*initSphereV
      VY=C(p2)*initSphereV
      VZ=C(p1)*S(p2)*initSphereV
      P.push({X:X1,Y:Y1,Z:Z1,VX,VY,VZ,V:[],OV:[]})
      for(i=pointNo+1;i--;){
        p1=Math.random()*Math.PI*2
        p2=Math.pow(Math.pow(i/pointNo,3/4)/Math.PI,3/4)*3.706+i%2*Math.PI
        VX=X=S(p1)*S(p2)
        VY=Y=C(p2)
        VZ=Z=C(p1)*S(p2)
        VX*=initV
        VY*=initV
        VZ*=initV
        P[P.length-1].V.push({X,Y,Z,VX,VY,VZ})
        P[P.length-1].OV.push({X:X1+X,Y:Y1+Y,Z:Z1+Z,VX,VY,VZ})
      }
    }
  }
  for(j=0;j<P.length;++j){
    for(k=0;k<P[j].V.length;++k){
      P[j].OV[k].X=P[j].X+P[j].VX+P[j].V[k].X
      P[j].OV[k].Y=P[j].Y+P[j].VY+P[j].V[k].Y
      P[j].OV[k].Z=P[j].Z+P[j].VZ+P[j].V[k].Z
      P[j].OV[k].VX=P[j].V[k].VX
      P[j].OV[k].VY=P[j].V[k].VY
      P[j].OV[k].VZ=P[j].V[k].VZ
    }
    P[j].X += P[j].VX
    P[j].Y += P[j].VY
    P[j].Z += P[j].VZ
    D=Math.pow(.5+Math.hypot(P[j].X,P[j].Y,P[j].Z),2)
    P[j].VX -= P[j].X/300*gravity/D
    P[j].VY -= P[j].Y/300*gravity/D
    P[j].VZ -= P[j].Z/300*gravity/D
    v=1+.000025*gravity
    P[j].VX /= v
    P[j].VY /= v
    P[j].VZ /= v
    for(k=0;k<P.length;++k){
      if(j!=k){
        D=Math.pow(Math.hypot(P[j].X-P[k].X,P[j].Y-P[k].Y,P[j].Z-P[k].Z),2)
        P[j].VX -= (P[j].X-P[k].X)/500*gravity/D
        P[j].VY -= (P[j].Y-P[k].Y)/500*gravity/D
        P[j].VZ -= (P[j].Z-P[k].Z)/500*gravity/D
      }
    }
    for(i=0;i<P[j].V.length;++i){
      R(P[j].V[i],.01,.01,0)
      P1=P3D(P[j].X+P[j].V[i].X,P[j].Y+P[j].V[i].Y,P[j].Z+P[j].V[i].Z)
      //x.beginPath()
      if(P1.D){
        s=.5+500/(1+P1.D*P1.D)
        x.fillStyle="#fff"
        x.globalAlpha=1
        x.fillRect(P1.X-s/2,P1.Y-s/2,s,s)
        opx=P1.X
        opy=P1.Y
        //x.moveTo(P1.X,P1.Y)
      }
      for(k=0;k<fluxLength;++k){
        P[j].OV[i].X+=P[j].OV[i].VX
        P[j].OV[i].Y+=P[j].OV[i].VY
        P[j].OV[i].Z+=P[j].OV[i].VZ
        mind=1000000000
        for(m=0;m<P.length;++m){
          if(m!=j){
            D=Math.pow(Math.hypot(P[j].OV[i].X-P[m].X,P[j].OV[i].Y-P[m].Y,P[j].OV[i].Z-P[m].Z),2)
            if(D<mind){
              mind=D
              target=m
            }
          }
        }
        P[j].OV[i].VX -= (P[j].OV[i].X-P[target].X)/1/mind
        P[j].OV[i].VY -= (P[j].OV[i].Y-P[target].Y)/1/mind
        P[j].OV[i].VZ -= (P[j].OV[i].Z-P[target].Z)/1/mind
        D=Math.hypot(P[j].OV[i].VX,P[j].OV[i].VY,P[j].OV[i].VZ)
        P[j].OV[i].VX=P[j].OV[i].VX/D*initV
        P[j].OV[i].VY=P[j].OV[i].VY/D*initV
        P[j].OV[i].VZ=P[j].OV[i].VZ/D*initV
        P1=P3D(P[j].OV[i].X,P[j].OV[i].Y,P[j].OV[i].Z)
        if(P1.D){
          x.globalAlpha=.6-.6/fluxLength*k
          x.strokeStyle=`hsl(${150+D*175},99%,50%)`
          x.beginPath()
          x.moveTo(opx,opy)
          x.lineTo(P1.X,P1.Y)
          x.stroke()
          opx=P1.X
          opy=P1.Y
        }
      }
    }
  }
	t+=1/60;
	requestAnimationFrame(Draw);
}
c=document.getElementById("c");
x=c.getContext("2d");
c.width=c.clientWidth;
c.height=c.clientHeight;
S=Math.sin;
C=Math.cos
window.addEventListener("resize",() => {
  c.width=c.clientWidth;
  c.height=c.clientHeight;
})
t=0
Draw()