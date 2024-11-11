c = document.querySelector('#c')
c.width = 1920
c.height = 1080
x = c.getContext('2d')
t = 0
S = Math.sin
C = Math.cos
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

async function Draw(){
  if(!t){
    Rn = Math.random
    R = (Rl,Pt,Yw,m) => {
      M = Math
      A = M.atan2
      H = M.hypot
      X = S(p=A(X,Y)+Rl) * (d=H(X,Y))
      Y = C(p) * d
      X = S(p=A(X,Z)+Yw) * (d=H(X,Z))
      Z = C(p)*d
      Y = S(p=A(Y,Z)+Pt) * (d=H(Y,Z))
      Z = C(p)*d
      if(m){
        X+=oX
        Y+=oY
        Z+=oZ
      }
    }
    
    Q = () => [c.width/2+X/Z*800, c.height/2+Y/Z*800]
    I=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0

    Normal = (facet, autoFlipNormals=false, X1=0, Y1=0, Z1=0) => {
      let ax = 0, ay = 0, az = 0
      facet.map(q_=>{ ax += q_[0], ay += q_[1], az += q_[2] })
      ax /= facet.length, ay /= facet.length, az /= facet.length
      let b1 = facet[2][0]-facet[1][0], b2 = facet[2][1]-facet[1][1], b3 = facet[2][2]-facet[1][2]
      let c1 = facet[1][0]-facet[0][0], c2 = facet[1][1]-facet[0][1], c3 = facet[1][2]-facet[0][2]
      crs = [b2*c3-b3*c2,b3*c1-b1*c3,b1*c2-b2*c1]
      d = Math.hypot(...crs)+.001
      let nls = 1 //normal line length
      crs = crs.map(q=>q/d*nls)
      let X1_ = ax, Y1_ = ay, Z1_ = az
      let flip = 1
      if(autoFlipNormals){
        let d1_ = Math.hypot(X1_-X1,Y1_-Y1,Z1_-Z1)
        let d2_ = Math.hypot(X1-(ax + crs[0]/99),Y1-(ay + crs[1]/99),Z1-(az + crs[2]/99))
        flip = d2_>d1_?-1:1
      }
      let X2_ = ax + (crs[0]*=flip), Y2_ = ay + (crs[1]*=flip), Z2_ = az + (crs[2]*=flip)
      return [X1_, Y1_, Z1_, X2_, Y2_, Z2_]
    }
      
    lineFaceI = (X1, Y1, Z1, X2, Y2, Z2, facet, autoFlipNormals=false, showNormals=false) => {
      let X_, Y_, Z_, d, m, l_,K,J,L,p
      let I_=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0
      let Q_=()=>[c.width/2+X_/Z_*600,c.height/2+Y_/Z_*600]
      let R_ = (Rl,Pt,Yw,m)=>{
        let M=Math, A=M.atan2, H=M.hypot
        X_=S(p=A(X_,Y_)+Rl)*(d=H(X_,Y_)),Y_=C(p)*d,X_=S(p=A(X_,Z_)+Yw)*(d=H(X_,Z_)),Z_=C(p)*d,Y_=S(p=A(Y_,Z_)+Pt)*(d=H(Y_,Z_)),Z_=C(p)*d
        if(m){ X_+=oX,Y_+=oY,Z_+=oZ }
      }
      let rotSwitch = m =>{
        switch(m){
          case 0: R_(0,0,Math.PI/2); break
          case 1: R_(0,Math.PI/2,0); break
          case 2: R_(Math.PI/2,0,Math.PI/2); break
        }        
      }
      let [X1_, Y1_, Z1_, X2_, Y2_, Z2_] = Normal(facet, autoFlipNormals, X1, Y1, Z1)
      if(showNormals){
        x.beginPath()
        X_ = X1_, Y_ = Y1_, Z_ = Z1_
        R_(Rl,Pt,Yw,1)
        if(Z_>0) x.lineTo(...Q_())
        X_ = X2_, Y_ = Y2_, Z_ = Z2_
        R_(Rl,Pt,Yw,1)
        if(Z_>0) x.lineTo(...Q_())
        x.lineWidth = 5
        x.strokeStyle='#f004'
        x.stroke()
      }

      let p1_ = Math.atan2(X2_-X1_,Z2_-Z1_)
      let p2_ = -(Math.acos((Y2_-Y1_)/(Math.hypot(X2_-X1_,Y2_-Y1_,Z2_-Z1_)+.001))+Math.PI/2)
      let isc = false, iscs = [false,false,false]
      X_ = X1, Y_ = Y1, Z_ = Z1
      R_(0,-p2_,-p1_)
      let rx_ = X_, ry_ = Y_, rz_ = Z_
      for(let m=3;m--;){
        if(isc === false){
          X_ = rx_, Y_ = ry_, Z_ = rz_
          rotSwitch(m)
          X1_ = X_, Y1_ = Y_, Z1_ = Z_ = 5, X_ = X2, Y_ = Y2, Z_ = Z2
          R_(0,-p2_,-p1_)
          rotSwitch(m)
          X2_ = X_, Y2_ = Y_, Z2_ = Z_
          facet.map((q_,j_)=>{
            if(isc === false){
              let l = j_
              X_ = facet[l][0], Y_ = facet[l][1], Z_ = facet[l][2]
              R_(0,-p2_,-p1_)
              rotSwitch(m)
              let X3_=X_, Y3_=Y_, Z3_=Z_
              l = (j_+1)%facet.length
              X_ = facet[l][0], Y_ = facet[l][1], Z_ = facet[l][2]
              R_(0,-p2_,-p1_)
              rotSwitch(m)
              let X4_ = X_, Y4_ = Y_, Z4_ = Z_
              if(l_=I_(X1_,Y1_,X2_,Y2_,X3_,Y3_,X4_,Y4_)) iscs[m] = l_
            }
          })
        }
      }
      if(iscs.filter(v=>v!==false).length==3){
        let iscx = iscs[1][0], iscy = iscs[0][1], iscz = iscs[0][0]
        let pointInPoly = true
        ax=0, ay=0, az=0
        facet.map((q_, j_)=>{ ax+=q_[0], ay+=q_[1], az+=q_[2] })
        ax/=facet.length, ay/=facet.length, az/=facet.length
        X_ = ax, Y_ = ay, Z_ = az
        R_(0,-p2_,-p1_)
        X1_ = X_, Y1_ = Y_, Z1_ = Z_
        X2_ = iscx, Y2_ = iscy, Z2_ = iscz
        facet.map((q_,j_)=>{
          if(pointInPoly){
            let l = j_
            X_ = facet[l][0], Y_ = facet[l][1], Z_ = facet[l][2]
            R_(0,-p2_,-p1_)
            let X3_ = X_, Y3_ = Y_, Z3_ = Z_
            l = (j_+1)%facet.length
            X_ = facet[l][0], Y_ = facet[l][1], Z_ = facet[l][2]
            R_(0,-p2_,-p1_)
            let X4_ = X_, Y4_ = Y_, Z4_ = Z_
            if(I_(X1_,Y1_,X2_,Y2_,X3_,Y3_,X4_,Y4_)) pointInPoly = false
          }
        })
        if(pointInPoly){
          X_ = iscx, Y_ = iscy, Z_ = iscz
          R_(0,p2_,0)
          R_(0,0,p1_)
          isc = [[X_,Y_,Z_], [crs[0],crs[1],crs[2]]]
        }
      }
      return isc
    }

    Cube = size => {
      for(r=[],i=6;i--;r=[...r,b])for(b=[],j=4;j--;)b=[...b,[(a=[S(p=Math.PI*2/4*j+Math.PI/4),C(p),2**.5/2])[i%3]*(l=size*(i<3?1:-1)),a[(i+1)%3]*l,a[(i+2)%3]*l]]
      return r
    }
    
    Cylinder = (rw,cl,ls1,ls2) => {
      let a = []
      let e = []
      for(let i=rw;i--;){
        if(!i) for(let j=cl;j--;){
          X = S(p=Math.PI*2/cl*j+Math.PI/cl) * ls1
          Y = (1/rw*i-.5)*ls2
          Z = C(p) * ls1
          e = [...e, [X,Y,Z]]
        }
        //a = [...a, b]
        for(let j=cl;j--;){
          b = []
          X = S(p=Math.PI*2/cl*j+Math.PI/cl) * ls1
          Y = (1/rw*i-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*(j+1)+Math.PI/cl) * ls1
          Y = (1/rw*i-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*(j+1)+Math.PI/cl) * ls1
          Y = (1/rw*(i+1)-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*j+Math.PI/cl) * ls1
          Y = (1/rw*(i+1)-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          a = [...a, b]
        }
      }
      b = []
      for(let j=cl;j--;){
       X = S(p=Math.PI*2/cl*j+Math.PI/cl) * ls1
       Y = ls2/2
       Z = C(p) * ls1
        b = [...b, [X,Y,Z]]
      }
      a = [...a, b, e]
      return a
    }
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

    stroke = (scol, fcol, lw, dl, oga=1, ocp=true) => {
      if(scol){
        x.strokeStyle = scol
        if(ocp) x.closePath()
        x.lineWidth = Math.min(100, 100/Z*lw)
        if(dl){
          x.globalAlpha = .25 * oga
          x.stroke()
          x.lineWidth/=5
        }
        x.globalAlpha = 1*oga
        x.stroke()
      }
      if(fcol){
        x.globalAlpha = 1*oga
        x.fillStyle = fcol
        x.fill()
      }
    }
    
    flashes = []
    spawnFlash = (X,Y,Z) => {
      flashes = [...flashes, [X,Y,Z,1]]
    }

    sparks = []
    iSparkv = .03
    spawnSparks = (X, Y, Z, ols=1) => {
      vx = S(p=Math.PI*2*Rn()) * C(q=Rn()<.5?Math.PI-Math.PI*Rn()**.5/2:Math.PI*Rn()**.5/2) * iSparkv
      vy = C(q) * iSparkv
      vz = C(p)*S(q) * iSparkv
      sparks = [...sparks, [X, Y, Z, vx, vy, vz, ols]]
    }
    
    grav = .4
    
    droppers = []
    dropFreq = 60
    dalt = false
    maxDroppers = 6
    spawnDropper = () => {
      if(droppers.length>=maxDroppers) return
      dalt = !dalt
      X = dalt ? 1 : -1
      Z = 0
      Y = -15
      spawnFlash(X,Y,Z)
      rl = 0
      pt = 0
      yw = Math.PI/2
      rlv=ptv=ywv=0
      vx=vy=vz=0
      dropper = [X, Y, Z, vx, vy ,vz, rl, pt, yw, rlv, ptv, ywv]
      droppers = [...droppers, dropper]
    }
    
    //Cylinder = (rw,cl,ls1,ls2) => {
    baseShape = Cylinder(2,6,.5,5).map(v=>{
      v.map(q=>{
        X = q[0]
        Y = q[1]
        Z = q[2]
        R(0,Math.PI/2,0)
        R(0,0,Math.PI/2)
        q[0] = X
        q[1] = Y
        q[2] = Z
      })
      return v
    })
    
    sp = 2
    vh = 22
    iBc = 6
    iBv = iBv_ = .2
    B = Array(iBc).fill().map((v, i) => {
      X = 0
      Y = -vh/2 + vh/iBc*(i+.2)
      Z = sp * (i%2?-1:1)
      vx = vy = vz = 0
      rl = 0
      pt = 0
      yw = 0
      rlv = 0
      ptv = 0
      ywv = 0
      return [X, Y, Z, vx, vy ,vz, rl, pt, yw, rlv, ptv, ywv, X, Y ,Z]
    })
    
    csd = 8
    bounding = Cylinder(3, csd, 6, 16).map(v=>{
      v.map(q=>{
        X = q[0]
        Y = q[1]
        Z = q[2]
        R(0,0,Math.PI/csd)
        q[0] = X
        q[1] = Y
        q[2] = Z
      })
      return v
    })
  }
  
  x.fillStyle = '#0006'
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin = x.lineCap = 'roud'
  
  if(!((t*60|0)%dropFreq)) spawnDropper()
  
  oX=0, oY=1, oZ=Math.min(32, Math.max(16, (.3-C(t))*60))
  Rl=C(t/8)/8, Pt=-.4+Math.min(1, Math.max(-1,(.3+C(t/4))*5)), Yw=Math.PI/2+Math.max(0, Math.min(Math.PI*4, (.3+C(t/4))*Math.PI*4))+t/6
  

  for(m=5;m--;) bounding.map(v => {
    x.beginPath()
    v.map(q=>{
      X = q[0]*(l=1+(n_=m+(t%1))**2/5)
      Y = q[1]*l
      Z = q[2]*l
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
    })
    col1 = `hsla(${-100-n_*32+t*50},99%,75%,${.1/(1+n_**8/28000)}`
    col2 = `hsla(${-100-n_*32+t*50},99%,50%,${.03/(1+n_**8/28000)}`
    stroke(col1, col2, 1 , false)
  })
  
  polys = []
  
  iBv = iBv_// 2 + C(t/4) * iBv_/3
  
  elasticity = 16
  B.map((shp, idx) => {
    shp[3] /= 1.1
    shp[4] /= 1.1
    shp[5] /= 1.1
    shp[3] += (shp[12] - shp[0]) / elasticity
    shp[4] += (shp[13] - shp[1]) / elasticity
    shp[5] += (shp[14] - shp[2]) / elasticity
    shp[0] += shp[3]
    shp[1] += shp[4]
    shp[2] += shp[5]
    shp[3] /= 1.1
    shp[4] /= 1.1
    shp[5] /= 1.1
    tx = shp[0]
    ty = shp[1] -= iBv
    shp[13] -= iBv
    if(ty < -vh/2) {
      shp[2] = shp[14] = sp * (idx%2?-1:1)
      for(m=20;m--;) spawnSparks(tx,ty,tz)
      ty=shp[1]=shp[13]+=vh
      spawnFlash(...shp)
    }
    tz = shp[2]
    baseShape.map((v, i) => {
      v.map((q, j) => {
        X = q[0] + tx
        Y = q[1] + ty
        Z = q[2] + tz
        R(Rl,Pt,Yw,1)
        polys = [...polys, [Math.hypot(X,Y,Z), i, idx, Math.hypot(shp[12]-shp[0],shp[13]-shp[1],shp[14]-shp[2])]]
      })
    })
  })
  
  droppers = droppers.filter(dropper=>{
    if(dropper[1] < 20){
      return true
    }else{
      spawnFlash(dropper[0],dropper[1],dropper[2])
      for(m=20;m--;)spawnSparks(dropper[0],dropper[1],dropper[2],2)
      return false
    }
  })
  
  droppers.map((dropper, didx) => {
    tx = dropper[0] += dropper[3]
    ty = dropper[1] += dropper[4] += grav
    tz = dropper[2] += dropper[5]
    dropper[6]      += dropper[9]
    dropper[7]      += dropper[10]
    dropper[8]      += dropper[11]
    dropper[9]      /=1.1
    dropper[10]     /=1.1
    dropper[11]     /=1.1
    baseShape.map((v, i) => {
      if(1||i<baseShape.length-2){
        ax1 = ay1 = az1 = 0
        X = v[0][0]
        Y = v[0][1]
        Z = v[0][2]
        R(dropper[6],dropper[7],dropper[8])
        ax1 += X + tx
        ay1 += Y + ty
        az1 += Z + tz
        X = v[2][0]
        Y = v[2][1]
        Z = v[2][2]
        R(dropper[6],dropper[7],dropper[8])
        ax1 += X + tx
        ay1 += Y + ty
        az1 += Z + tz
        ax1 /= 2
        ay1 /= 2
        az1 /= 2

        v.map((q, j) => {
          B.map((shp, idx)=>{
            tx2 = shp[0]
            ty2 = shp[1]
            tz2 = shp[2]
            baseShape.map((v2, i2) => {
              if(i2<baseShape.length-2){
                ax2=ay2=az2=0
                v2.map(q=>{
                  ax2+=q[0]+tx2
                  ay2+=q[1]+ty2
                  az2+=q[2]+tz2
                })
                ax2/=v2.length
                ay2/=v2.length
                az2/=v2.length

                if(Math.hypot(ax2-ax1,ay2-ay1,az2-az1) < .75){
                  l1 = j
                  l2 = (j+1)%v.length
                  X = v[l1][0]
                  Y = v[l1][1]
                  Z = v[l1][2]
                  R(dropper[6],dropper[7],dropper[8])
                  X1 = X + tx
                  Y1 = Y + ty
                  Z1 = Z + tz
                  X = v[l2][0]
                  Y = v[l2][1]
                  Z = v[l2][2]
                  R(dropper[6],dropper[7],dropper[8])
                  X2 = X + tx
                  Y2 = Y + ty
                  Z2 = Z + tz
                  if(l=lineFaceI(X1,Y1,Z1,X2,Y2,Z2,JSON.parse(JSON.stringify(v2)).map(q => {
                    q[0] += tx2
                    q[1] += ty2
                    q[2] += tz2
                    return q
                  }))){
                    if(Rn()<.6) spawnSparks(...l[0])
                    dropper[9] /= 10
                    dropper[4] /= 10
                    dropper[4] =-.4
                    dropper[5] = dropper[6]/3
                    shp[4] = .125
                    if(idx%2){
                      dropper[9] += .125
                      dropper[5] += .1
                    }else{
                      dropper[9] += -.125
                      dropper[5] += -.1
                    }
                  }
                }
              }
            })
          })

          X = q[0] + tx
          Y = q[1] + ty
          Z = q[2] + tz
          R(dropper[6],dropper[7],dropper[8])
          R(Rl,Pt,Yw,1)
          polys = [...polys, [Math.hypot(X,Y,Z), i, -1, didx, 1]]
        })
      }
    })
  })
  
  polys.sort((a,b)=>{
    return b[0] - a[0]
  })
  
  polys.map(v => {
    idx = v[2]
    if(idx>=0){
      tx = B[idx][0]
      ty = B[idx][1]
      tz = B[idx][2]
    }else{
      tx = droppers[v[3]][0]
      ty = droppers[v[3]][1]
      tz = droppers[v[3]][2]
      rl = droppers[v[3]][6]
      pt = droppers[v[3]][7]
      yw = droppers[v[3]][8]
    }
    i  = v[1]
    x.beginPath()
    ax = ay = az = 0
    baseShape[v[1]].map(q => {
      ax += X = q[0]
      ay += Y = q[1]
      az += Z = q[2]
      if(idx==-1) R(rl, pt, yw)
      X += tx
      Y += ty
      Z += tz
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
    })
    ax /= baseShape[v[1]].length
    ay /= baseShape[v[1]].length
    az /= baseShape[v[1]].length
    col1 = ''//'#0005'//'#0008'//`hsla(${-360/iBc*idx},99%,50%,.8)`
    if(idx==-1){
      col2 = `hsla(${100+t*40},99%,${50-ay*66}%,1)`
    }else{
      col2 = `hsla(${-100+(v[3]*4)**2*20+t*40},99%,${50-ay*66+v[3]*50}%,${.2+v[3]/20})`
    }
    stroke(col1, col2, 1, false)
  })
  
  flashes = flashes.filter(flash=>flash[3]>0)
  flashes.map(flash=>{
    X = flash[0]
    Y = flash[1]
    Z = flash[2]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e4, 2e4/Z*flash[3])
      x.globalAlpha = .5
      x.drawImage(burst,l[0]-s/2,l[1]-s/2,s,s)
      x.globalAlpha = 1
      s/=1.3
      x.drawImage(starImgs[1+(t*30|0)%8].img,l[0]-s/2/1.05,l[1]-s/2/1.05,s,s)
    }
    flash[3]-=.1
  })

  sparks = sparks.filter(spark=>spark[6]>.2)
  sparks.map(spark => {
    X = spark[0] += spark[3]
    Y = spark[1] += spark[4] -= grav/64
    Z = spark[2] += spark[5]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e3, 1000/Z*spark[6])
      x.fillStyle = '#ff000003'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      s/=3
      x.fillStyle = '#ff880005'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      s/=3
      x.fillStyle = '#ffffffaa'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
    }
    spark[6]-=.01
  })

  x.globalAlpha = 1

  t+=1/60
  requestAnimationFrame(Draw)
}

Draw()