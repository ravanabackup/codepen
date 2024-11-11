c = document.querySelector('#c')
c.width = 1920
c.height = 1080
x = c.getContext('2d')
C = Math.cos
S = Math.sin
t = 0
T = Math.tan

rsz = window.onresize = () =>{
  let b = document.body
  let margin = 10
  let n
  let d = .5625
  if(b.clientHeight/b.clientWidth > d){
    c.style.width = `${(n=b.clientWidth) - margin*2}px`
    c.style.height = `${n*d - margin*2}px`
  }else{
    c.style.height = `${(n=b.clientHeight) - margin*2}px`
    c.style.width = `${n/d - margin*2}px`
  }
}

rsz()

Draw=()=>{

  x.fillStyle='#000c'
  x.fillRect(0,0,w=c.width,w),h=700
  R=(Rl,Pt,Yw)=>{X=S(p=(A=(M=Math).atan2)(X,Y)+Rl)*(d=(H=M.hypot)(X,Y)),Y=C(p)*d,Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z)),Z=C(p)*d,X=S(p=A(X,Z)+Yw)*(d=H(X,Z)),Z=C(p)*d}
  Q=q=>[960+X/Z*h,c.height/2+Y/Z*h]
  Rn=Math.random

  if(!t){
    x.lineJoin=x.lineCap='round'
    oX=0,oY=0,oZ=0
    Rl=0,Pt=0,Yw=0
    PX=0,PY=0,PZ=0
    PRl=PPt=PYw=p1v=p2v=0
    mSD=5,mR=2.75,iRStl=50,iRSd=.4,iRSs=.6,segprog=0
    iPSc=4e3, G=60
    PS=Array(iPSc).fill().map(v=>[(Rn()-.5)*G*2,(Rn()-.5)*G*2,(Rn()-.5)*G*2])
    RS=[]
    RSQ=q=>{
      while(RS.length<iRStl){
        if(RS.length){
          X=0
          Y=0
          Z=iRSd
          p1v+=(Rn()-.5)*iRSs
          p2v+=(Rn()-.5)*iRSs
          p1v/=1.02
          p2v/=1.02
          p1=RS[RS.length-1][3]-(RS[RS.length-1][3]-p1v)/20
          p2=RS[RS.length-1][4]-(RS[RS.length-1][4]-p2v)/20
          R(0,0,p1)
          R(0,p2,0)
          X+=(TX=RS[RS.length-1][0])
          Y+=(TY=RS[RS.length-1][1])
          Z+=(TZ=RS[RS.length-1][2])
        }else{
          X=TX=0
          Y=TY=0
          Z=TZ=-2
          p1=0
          p2=0
        }
        MX=X,MY=Y,MZ=Z
        RSI=Array(mSD).fill().map((v,j)=>{
          a=[]
          sd=6,ls=.5+S(t*2)/2.5
          for(i=sd;i--;){
            X=S(p=Math.PI*2/sd*i+Math.PI/sd-t*2)*ls
            Y=C(p)*ls
            Z=iRSd
            Y-=mR
            R(Math.PI*2/mSD*j+S(t)*3,0,0)
            R(0,0,p1)
            R(0,p2,0)
            X+=TX,Y+=TY,Z+=TZ
            a=[...a,[X,Y,Z]]
          }
          return a
        })

        RS=[...RS,[MX,MY,MZ,p1,p2,RSI]]
      }
    }
    RSQ()
  }

  iPv=5
  speed=10
  segprog+=iPv

  PX-=(PX-(RS[0][0]+(RS[1][0]-RS[0][0])/speed*segprog))/5
  PY-=(PY-(RS[0][1]+(RS[1][1]-RS[0][1])/speed*segprog))/5
  PZ-=(PZ-(RS[0][2]+(RS[1][2]-RS[0][2])/speed*segprog))/5
  PRl=0//+=(RS[10][6]-PRl)/20
  PPt+=(RS[15][4]-PPt)/20
  PYw+=(RS[15][3]-PYw)/20

  if(segprog>=speed){
    segprog=0
    RS.shift()
    RSQ()
  }

  PS.map(v=>{
    X=v[0]-PX
    Y=v[1]-PY
    Z=v[2]-PZ
    while(v[0]-PX<-G)v[0]+=G*2
    while(v[1]-PY<-G)v[1]+=G*2
    while(v[2]-PZ<-G)v[2]+=G*2
    while(v[0]-PX>G)v[0]-=G*2
    while(v[1]-PY>G)v[1]-=G*2
    while(v[2]-PZ>G)v[2]-=G*2
    R(-PRl,-PPt,-PYw)
    X+=oX,Y+=oY,Z+=oZ
    if(Z>1){
      x.beginPath()
      alpha = 1/(1+Z**9/1e15)*Math.min(1, Z/9)
      x.fillStyle=`hsla(${0},99%,99%,${alpha}`
      l = Q()
      s = Math.max(.2, Math.min(1e3, 400/Z))
      x.globalAlpha = .1
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      x.globalAlpha = 1
      s/=4
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
    }
    return v
  })

  RS.map((v,k)=>{
    if(0&&k<RS.length-1){
      X=v[0]-PX
      Y=v[1]-PY
      Z=v[2]-PZ
      R(-PRl,-PPt,-PYw)
      R(Rl,Pt,Yw)
      X+=oX,Y+=oY,Z+=oZ
      if(Z>.1){
        x.beginPath()
        x.lineTo(...Q())
        X=RS[k+1][0]-PX
        Y=RS[k+1][1]-PY
        Z=RS[k+1][2]-PZ
        R(-PRl,-PPt,-PYw)
        R(Rl,Pt,Yw)
        X+=oX,Y+=oY,Z+=oZ
        x.lineTo(...Q())
        x.lineWidth=Math.min(200,19/Z)
        x.strokeStyle='#2fa6'
        if(Z>.5){
          x.stroke()
        }
      }
    }
    v[5].map(v=>{
      x.beginPath()
      v.map(v=>{
        X=v[0]-PX
        Y=v[1]-PY
        Z=v[2]-PZ
        R(-PRl,-PPt,-PYw)
        R(Rl,Pt,Yw)
        X+=oX,Y+=oY,Z+=oZ
        x.lineTo(...Q())
      })
      if(Z>.5){
        x.lineWidth=Math.min(50,260/(1+Z)**2)
        x.closePath()
        x.strokeStyle=`hsla(${180},99%,65%,${.25-((Z+1)/((1+iRStl)*(1+iRSd))*3)**3/2}`
        x.stroke()
      }
    })
    if(k<RS.length-1){
      v[5].map((v,j)=>{
        v.map((v,i)=>{
          x.beginPath()
          X=v[0]-PX
          Y=v[1]-PY
          Z=v[2]-PZ
          R(-PRl,-PPt,-PYw)
          R(Rl,Pt,Yw)
          X+=oX,Y+=oY,Z+=oZ
          if(Z>.5){
            x.lineTo(...Q())
            X=RS[k+1][5][j][i][0]-PX
            Y=RS[k+1][5][j][i][1]-PY
            Z=RS[k+1][5][j][i][2]-PZ
            R(-PRl,-PPt,-PYw)
            R(Rl,Pt,Yw)
            X+=oX,Y+=oY,Z+=oZ
            if(Z>.5){
              x.lineTo(...Q())
              x.lineWidth=Math.min(50,260/(1+Z)**2)
              x.strokeStyle=`hsla(${180},99%,65%,${.25-((Z+1)/((1+iRStl)*(1+iRSd))*3)**3/2}`
              x.stroke()
            }
          }
        })
      })
    }
  })
  
  t+=1/60
  requestAnimationFrame(Draw)
}

Draw()