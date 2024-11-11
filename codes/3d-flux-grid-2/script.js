c = document.querySelector('#c')
c.width=c.clientWidth
c.height=c.clientHeight
x = c.getContext('2d')
C = Math.cos
S = Math.sin
t = 0

Draw = () => {

  x.fillStyle='#0003',x.fillRect(0,0,w=c.width,w),h=c.height/2
  M=Math,A=M.atan2,H=M.hypot
  cl=9,initV=.35,l=.4
  oX=oY=0,oZ=cl
  Rl=t/7,Pt=-t/5,Yw=t/3.5
  Rn=q=>(Math.random()-.5)*initV
  P=t?P:Array(3).fill().map(v=>[0,0,0,Rn(),Rn(),Rn()])
  Q=q=>[960+X/Z*1200,h+Y/Z*1200]
  R=q=>{X=S(p=A(X,Y)+Rl)*(d=H(X,Y)),Y=C(p)*d,Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z)),Z=C(p)*d,X=S(p=A(X,Z)+Yw)*(d=H(X,Z)),Z=C(p)*d}
  x.lineCap='round'
  for(i=cl**3;i--;){
    X=(i%cl)-cl/2+.5
    Y=((i/cl|0)%cl)-cl/2+.5
    Z=((i/cl/cl|0)%cl)-cl/2+.5
    pX=pY=pZ=d1=0
    P.map(v=>{
      d=H(X-v[0],Y-v[1],Z-v[2])**2
      d1+=500/(d**.8)
      p1=A(X-v[0],Z-v[2])
      p2=M.acos((Y-v[1])/H(X-v[0],Y-v[1],Z-v[2]))
      pX+=X+S(p1)*S(p2)*200/d
      pY+=Y+C(p2)*200/d
      pZ+=Z+C(p1)*S(p2)*200/d
    })
    pX/=P.length
    pY/=P.length
    pZ/=P.length
    d=H(X-pX,Y-pY,Z-pZ)
    p1=A(X-pX,Z-pZ)
    p2=M.acos((Y-pY)/d)
    R()
    X+=oX
    Y+=oY
    Z+=oZ
    if(Z>1){
      x.beginPath()
      x.fillStyle='#4f84'
      x.arc(...Q(),50/Z,0,7)
      x.fill()
      x.beginPath()
      x.lineTo(...Q())
      X=(i%cl)-cl/2+.5
      Y=((i/cl|0)%cl)-cl/2+.5
      Z=((i/cl/cl|0)%cl)-cl/2+.5
      X+=S(p1)*S(p2)*l
      Y+=C(p2)*l
      Z+=C(p1)*S(p2)*l
      R()
      X+=oX
      Y+=oY
      Z+=oZ
      x.lineTo(...Q())
      //x.lineWidth=100/Z
      //x.strokeStyle=`hsla(${d1/2-140},99%,${20+(d1**2.5)/6e4}%,${.05+(d1**1.5)/8e4}`
      //x.stroke()
      x.lineWidth=Math.min(500,3e3/Z/Z)
      x.strokeStyle=`hsla(${d1/1.5+t*500},99%,${10+(d1**1.6)/100}%,${.05+(d1**2)/6e5}`
      x.stroke()
    }
  }
  P.map(v=>{
    X=v[0]+=v[3]
    Y=v[1]+=v[4]
    Z=v[2]+=v[5]
    v[3]*=X>cl/2-1||X<-cl/2+1?-1:1
    v[4]*=Y>cl/2-1||Y<-cl/2+1?-1:1
    v[5]*=Z>cl/2-1||Z<-cl/2+1?-1:1
    R()
    X+=oX
    Y+=oY
    Z+=oZ
    if(Z>1){
      x.beginPath()
      x.fillStyle='#0f88'
      x.arc(...Q(),99/Z,0,7)
      x.fill()
    }
  })

  t+= 1/60
  requestAnimationFrame(Draw)
}

Draw()