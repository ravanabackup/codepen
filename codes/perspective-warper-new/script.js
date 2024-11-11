c = document.querySelector('#c')
c.width = 1920
c.height = 1080
x = c.getContext('2d')
C = Math.cos
S = Math.sin
t = 0
T = Math.tan

rsz=window.onresize=()=>{
  setTimeout(()=>{
    if(document.body.clientWidth > document.body.clientHeight*1.77777778){
      c.style.height = '100vh'
      setTimeout(()=>c.style.width = c.clientHeight*1.77777778+'px',0)
    }else{
      c.style.width = '100vw'
      setTimeout(()=>c.style.height =     c.clientWidth/1.77777778 + 'px',0)
    }
  },0)
}
rsz()

async function Draw(){
  Rn = Math.random
  toX=0,toY=0,toZ=2000
  perspective=(l=1.5)+S(t*1.5)*(l-.25)+.25
  focal=900*(1/perspective)
  offsetZ=-toZ*(1-1/perspective)
  fx=fy=fz=0
  moX=0,moY=0,moZ=40
  oX=toX-fx
  oY=toY-fy
  oZ=toZ-fz+offsetZ
  ogx=fx
  ogy=fy
  ogz=fz
  if(!t){
    focal=900
    mp3 = new Audio()
    mp3.loop=true
    mp3.onplaying=()=>{playing=true}
    mp3.oncanplay=()=>{go=true;if(!playing)mp3.play()}
    mp3.src='https://audiocloud.rotoblaster.com/audio/a3c3c799a4ef5aaaa12f09152b775145.MP3'
    R=($1,$2,$3,m)=>{
      M=Math
      A=M.atan2
      H=M.hypot
      X=ogx+S(p=A(ogx-X,ogz-Z)+Yw)*(d=H(ogx-X,ogz-Z))
      Z=ogz+C(p)*d
      Y=ogy+S(p=A(ogy-Y,ogz-Z)+Pt)*(d=H(ogy-Y,ogz-Z))
      Z=ogz+C(p)*d
      X=ogx+S(p=A(ogx-X,ogy-Y)+Rl)*(d=H(ogx-X,ogy-Y))
      Y=ogy+C(p)*d
      if(m)X+=oX,Y+=oY,Z+=oZ
    }
    Q=()=>[c.width/2+X/Z*focal,c.height/2+Y/Z*focal]
    for(CB=[],j=6;j--;)for(i=4;i--;)CB=[...CB,[(a=[S(p=Math.PI*2/4*i+Math.PI/4),C(p),2**.5/2])[j%3]*(l=j<3?-1:1),a[(j+1)%3]*l,a[(j+2)%3]*l]]
    DC=(tx, ty, tz, fillColor, strokeColor, scalex, scaley, scalez)=>{
      CB.map((v,i)=>{
        if(!(i%4))x.beginPath()
        X=v[0]*scalex+tx
        Y=v[1]*scaley-(2**.5*scaley/2)+ty
        Z=v[2]*scalez+tz
        R(Rl,Pt,Yw,1)
        if(Z>0)x.lineTo(...Q())
        if(i%4==3){
          x.closePath()
          x.strokeStyle=strokeColor
          x.lineWidth=1+Math.min(400, 3000/(Z))
          //x.stroke()
          x.lineWidth/=4
          x.stroke()
          x.fillStyle=fillColor
          x.fill()
        }
      })
    }
    rw=1,cl=16,br=16,sp=2**.5*256, G=2000
    B=Array(rw*cl*br).fill().map((v,i)=>{
      X=((i%cl)-cl/2+.5)*sp
      Y=(((i/cl|0)%rw)-rw/2+.5)*sp
      Z=(((i/cl/rw|0)%br)-br/2+.5)*sp
      return [X,Y,Z,0]
    })

    G_ = 100000, iSTc = 1e4
    ST = Array(iSTc).fill().map(v=>{
      X = (Rn()-.5)*G_
      Y = (Rn()-.5)*G_
      Z = (Rn()-.5)*G_
      return [X,Y,Z]
    })

    burst = new Image()
    burst.src = "https://srmcgann.github.io/temp/burst.png"

    starsLoaded = false, starImgs = [{loaded: false}]
    starImgs = Array(9).fill().map((v,i) => {
      let a = {img: new Image(), loaded: false}
      a.img.onload = () => {
        a.loaded = true
        setTimeout(()=>{
          if(starImgs.filter(v=>v.loaded).length == 9) starsLoaded = true
        }, 0)
      }
      a.img.src = `https://srmcgann.github.io/stars/star${i+1}.png`
      return a
    })

    showstars = true

  }

  toX=0,toY=0,toZ=2000+S(t)*1000

  x.fillStyle='#0008'
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin=x.lineCap='butt'
  Rl=0,Pt=.6+C(t/1.5-1)/1.7,Yw=-C(t/6+.1)*12

  if(showstars) ST.map(v=>{
    X = v[0]
    Y = v[1]
    Z = v[2]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      if((x.globalAlpha = Math.min(1,(Z/5e3)**2))>.1){
        s = Math.min(1e3, 4e5/Z)
        x.fillStyle = '#ffffff04'
        l = Q()
        x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
        s/=5
        x.fillStyle = '#fffa'
        x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      }
    }
  })

  x.globalAlpha = 1


  curIdx=(t*60|0)%B.length

  B.map((v,i)=>{
    X=v[0], Y=v[1], Z=v[2]
    if(i==curIdx){
      fx=X, fy=Y, fz=Z
    }
  })

  if((t|0)%8<4)fx=fy=fz=0

  perspective=(l=1.5)+S(t*1.5)*(l-.25)+.25
  focal=900*(1/perspective)
  offsetZ=-toZ*(1-1/perspective)

  strokeColor = `hsla(${t*100},99%,50%,.5)`
  B.map((v,i)=>{
    X=v[0]
    Y=v[1]
    Z=v[2]
    v[3]/=1.2
    if(i==curIdx){
      v[3]+=100
    }
    fillColor = `hsla(${i+t*500},99%,${Math.max(40,v[3])}%,${.02+v[3]/100})`
    DC(X, Y, Z, fillColor, strokeColor, 4+(i**3.1)%100, 2+(i**4.7)%256,4+(i**2.1)%100)
  })

  t+=1/60
  requestAnimationFrame(Draw)
}
Draw()