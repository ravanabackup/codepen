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
  oX=oY=oZ=0
  if(!t){
    reflect = (a, n) => {
      let d1 = Math.hypot(...a)+.0001
      let d2 = Math.hypot(...n)+.0001
      a[0]/=d1
      a[1]/=d1
      a[2]/=d1
      n[0]/=d2
      n[1]/=d2
      n[2]/=d2
      let dot = -a[0]*n[0] + -a[1]*n[1] + -a[2]*n[2]
      let rx = -a[0] - 2 * n[0] * dot
      let ry = -a[1] - 2 * n[1] * dot
      let rz = -a[2] - 2 * n[2] * dot
      return [-rx*d1, -ry*d1, -rz*d1]
    }

    R=R2=(Rl,Pt,Yw,m)=>{
      M=Math
      A=M.atan2
      H=M.hypot
      X=S(p=A(X,Z)+Yw)*(d=H(X,Z))
      Z=C(p)*d
      Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z))
      Z=C(p)*d
      X=S(p=A(X,Y)+Rl)*(d=H(X,Y))
      Y=C(p)*d
      if(m){
        X+=oX
        Y+=oY
        Z+=oZ
      }
    }
    Q=()=>[c.width/2+X/Z*700,c.height/2+Y/Z*700]
    I=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0

    Rn = Math.random

    lineFaceI = (X1, Y1, Z1, X2, Y2, Z2, facet, autoFlipNormals=false, showNormals=false) => {
      let X_, Y_, Z_, d, m, l_,K,J,L,p
      let I_=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0
      let Q_=()=>[c.width/2+X_/Z_*700,c.height/2+Y_/Z_*700]
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
      let ax = 0, ay = 0, az = 0
      facet.map(q_=>{ ax += q_[0], ay += q_[1], az += q_[2] })
      ax /= facet.length, ay /= facet.length, az /= facet.length
      let b1 = facet[2][0]-facet[1][0], b2 = facet[2][1]-facet[1][1], b3 = facet[2][2]-facet[1][2]
      let c1 = facet[1][0]-facet[0][0], c2 = facet[1][1]-facet[0][1], c3 = facet[1][2]-facet[0][2]
      let crs = [b2*c3-b3*c2,b3*c1-b1*c3,b1*c2-b2*c1]
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

    G_ = 100000, iSTc = 3e3
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
    
    heat = 5
    
    spawnTunnel = (
        tx, ty, tz,
        rw, cl, sp=1, rad=.5,
        theta1=0, theta2=0,
        theta1ModFreq = 0,
        theta1ModMag  = 0,
        theta2ModFreq = 0,
        theta2ModMag  = 0,
        theta1Offset  = 0,
        theta2Offset  = 0,
        radModFreq    = 0,
        radModMag     = 0,
        radModOffset  = 0,
        showLine=false
      ) => {
      let X_ = X = tx
      let Y_ = Y = ty
      let Z_ = Z = tz
      let ret = []
      let p2a, p2, p2a1, ls
      if(showLine) x.beginPath()
      for(let i=cl+1; i--;){
        let p1 = theta1 + C(Math.PI*2/cl*i*theta1ModFreq + theta1Offset) * theta1ModMag
        let p2 = theta2 + C(Math.PI*2/cl*i*theta2ModFreq + theta2Offset) * theta2ModMag
        let p2a1 = theta2 + C(Math.PI*2/cl*(i+1)*theta2ModFreq + theta2Offset) * theta2ModMag
        let lsa  = rad + C(Math.PI*2/cl*i*radModFreq + radModOffset) * rad /2 *radModMag
        let lsb  = rad + C(Math.PI*2/cl*(i+1)*radModFreq + radModOffset) * rad /2 * radModMag
        if(i==cl){
          p2a = p2
          ls = lsa
        }else if(i==0){
          p2a = p2a1
          ls  = lsb
        }else{
          p2a = (p2 + p2a1)/2
          ls = (lsa+lsb)/2
        }
        let a = []
        for(let j=rw+1;j--;){
          p=Math.PI*2/rw*j + Math.PI/rw
          X = S(p) * ls
          Y = 0
          Z = C(p) * ls
          R(-p2a+Math.PI/2,0,0)
          R(0,0,-p1)
          a = [...a, [X+X_, Y+Y_, Z+Z_]]
        }
        
        ret = [...ret, a]

        if(showLine) {
          X = X_
          Y = Y_
          Z = Z_
          R(Rl,Pt,Yw,1)
          if(Z>0) x.lineTo(...Q())
        }
      
        vx = C(p1) * C(p2) * sp
        vy = S(p2) * sp
        vz = S(p1) * C(p2) * sp
        X_ += vx
        Y_ += vy
        Z_ += vz
      }
      if(showLine) stroke('#f00', '', 2, false)
      a = []
      ret.map((v, i) => {
        if(i){
          let s1 = ret[i]
          let s2 = ret[i-1]
          for(let j = rw;j--;){
            b = []
            let l1_ = (j+0)%rw
            let l2_ = (j+1)%rw
            X = s1[l1_][0]
            Y = s1[l1_][1]
            Z = s1[l1_][2]
            b = [...b, [X,Y,Z]]
            X = s1[l2_][0]
            Y = s1[l2_][1]
            Z = s1[l2_][2]
            b = [...b, [X,Y,Z]]
            X = s2[l2_][0]
            Y = s2[l2_][1]
            Z = s2[l2_][2]
            b = [...b, [X,Y,Z]]
            X = s2[l1_][0]
            Y = s2[l1_][1]
            Z = s2[l1_][2]
            b = [...b, [X,Y,Z]]
            a = [...a, [b, 0]]
          }
        }
      })
      return a
    }
    

    stroke = (scol, fcol, lwo=1, od=true, oga=1, closePath=false) => {
      if(scol){
        if(closePath) x.closePath()
        if(od) x.globalAlpha = .2*oga
        x.strokeStyle = scol
        x.lineWidth = Math.min(1000,100*lwo/Z)
        if(od) x.stroke()
        x.lineWidth /= 4
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

    P = []
    iPv = 0
    iPfreq = 200
    grav = .06
    spawnP = () => {
      let span = 0
      for(m = 20;m--;){
        X = (Rn()-.5) * span
        Y = -36-m**4/1e3
        Z = (Rn()-.5) * span
        spawnFlash(X,Y,Z)
        vx = (Rn()-.5)  * iPv
        vy = (Rn()-.5)  * iPv
        vz = (Rn()-.5)  * iPv
        P = [...P, [X,Y,Z,vx,vy,vz,1,[]]]
      }
    }
    
    iTunnelsc = 3
    heatMap = Array(iTunnelsc+1).fill().map(v => [])

    sparks = []
    iSparkv = .075
    spawnSparks = (X,Y,Z,idx=0) => {
      for(m=6;m--;){
        v = iSparkv*Rn()**.5
        vx = S(p=Math.PI*2*Rn()) * S(q=Rn()<0?Math.PI*Rn()**.5/2:Math.PI-Math.PI*Rn()**.5/2.75)*v
        vy = C(q) * v*3
        vz = C(p) * S(q) * v
        sparks = [...sparks, [X,Y,Z,vx,vy,vz,Rn(),idx]]
      }
    }
  }

  oX=0, oY=-5 + Math.min(36,Math.max(-36,(.3+C(t/3/1.5))*40)), oZ=Math.min(70,Math.max(25,(.3+C(t/2/1.5))*100))
  Rl=0, Pt=0, Yw=S(t)/4 + t/4

  if(!((t*60|0)%iPfreq)) spawnP()

  x.globalAlpha = 1
  x.fillStyle='#000a'
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin = x.lineCap = 'roud'

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
  
  env = []
  for(let m_ = 0; m_<iTunnelsc; m_++){
    switch(m_){
      case 0:
        rw             = 10
        cl             = 25
        sp             = 1
        rad            = sp*2.75
        tx             = 0
        ty             = -cl*1.5*sp
        tz             = 0
        theta1         = 0
        theta2         = Math.PI/2
        theta1ModFreq  = 0
        theta1ModMag   = 0
        theta2ModFreq  = 1
        theta2ModMag   = .5
        theta1Offset   = 0
        theta2Offset   = S(t/32)*20
        radModFreq     = 2
        radModMag      = 1
        radModOffset   = t*4//S(t/4)*20
        showLine       = false
        break
      case 1:
        rw             = 24
        cl             = 10
        sp             = .75
        rad            = sp*10
        tx             = -S(C(t)*6)*2
        ty             = -cl/1*sp + 12*m_
        tz             = -C(C(t/2)*6)*2
        theta1         = Math.PI+Math.PI/2-C(t)*6
        theta2         = Math.PI/1.66
        theta1ModFreq  = 0
        theta1ModMag   = 0
        theta2ModFreq  = 0
        theta2ModMag   = 0
        theta1Offset   = 0
        theta2Offset   = 0//S(t/64)*20
        radModFreq     = .5
        radModMag      = 1.75
        radModOffset   = Math.PI - .5 //S(t/4)*20
        showLine       = false
        break
      case 2:
        rw             = 30
        cl             = 13
        sp             = .75
        rad            = sp*6
        tx             = 0
        ty             = -cl*1*sp + 20*m_
        tz             = 0
        theta1         = 0
        theta2         = Math.PI/2
        theta1ModFreq  = 0
        theta1ModMag   = 0
        theta2ModFreq  = 0
        theta2ModMag   = 0
        theta1Offset   = 0
        theta2Offset   = 0//S(t/64)*20
        radModFreq     = .25
        radModMag      = 5
        radModOffset   = -Math.PI/2-.4//t/2//S(t/4)*20
        showLine       = false
        break
    }
    
    newTunnel = spawnTunnel(tx,ty,tz,
                      rw,cl,sp,
                      rad,theta1,theta2,
                      theta1ModFreq,theta1ModMag,
                      theta2ModFreq,theta2ModMag,
                      theta1Offset,theta2Offset,
                      radModFreq, radModMag,
                      radModOffset,
                      showLine)
                      
    env = [...env, newTunnel]
    
    if(!heatMap[m_].length) heatMap[m_] = Array(rw*cl*2).fill().map((v, i) => {
      if(i>=0 && env[m_][i] && env[m_][i][0].length){
        ax = ay = az = 0
        env[m_][i][0].map(q=>{
          ax += q[0]
          ay += q[1]
          az += q[2]
        })
        ax /= 4
        ay /= 4
        az /= 4
      }
      return [ax,ay,az,0]
    })
  }

  env.map((env, idx) => {
    env.map((v, i) => {
      x.beginPath()
      v[0].map((q, j) => {
        X = q[0]
        Y = q[1]
        Z = q[2]
        R(Rl,Pt,Yw,1)
        if(Z>0) x.lineTo(...Q())
      })
      col1 = '#f002'
      let heat = heatMap[idx][i][3]
      //col2 = heat>.02 ? `hsla(${heat*26},99%,${50+heat*14}%,${Math.min(.5, .01+heat*4)})` :  ''
      col2 = `hsla(${heat*26},99%,${50+heat*14}%,${Math.min(.5, .05+heat*4)})`
      stroke(col1,col2,3, false)
      heatMap[idx][i][3] /= 1.1
      heatMap[idx][i][3] = Math.min(4, heatMap[idx][i][3])
    })
  })

  P = P.filter(v=>v[6]>.1)
  P.map(v=>{
    v[0] += v[3]
    v[1] += v[4] += grav
    v[2] += v[5]
    v[7] = v[7].filter((q,j)=>j||v[7].length<20)
    v[7] = [...v[7], [...v]]
    v[7].map((q, j)=>{
      if(j){
        x.beginPath()
        l = j
        X = v[7][l][0]
        Y = v[7][l][1]
        Z = v[7][l][2]
        R(Rl,Pt,Yw,1)
        if(Z>0) x.lineTo(...Q())
        l = j-1
        X = v[7][l][0]
        Y = v[7][l][1]
        Z = v[7][l][2]
        R(Rl,Pt,Yw,1)
        if(Z>0) x.lineTo(...Q())
      col = `hsla(${j*40-t*500},99%,${Math.max(50, 200-(20-j)/20*400)}%,${Math.max(.15,j/40)})`
        stroke(col,'',j/3+1)
      }
    })
    X = v[0]
    Y = v[1]
    Z = v[2]
    env.map((env, idx) => {
      env.map((q, j)=>{
        ax=ay=az=0
        q[0].map((n,m)=>{
          ax+=n[0]
          ay+=n[1]
          az+=n[2]
        })
        ax/=q[0].length
        ay/=q[0].length
        az/=q[0].length
        d=Math.hypot(ax-(X+v[3]/2),ay-(Y+v[4]/1),az-(Z+v[5]/2))
        heatMap[idx][j][3] += heat / (1+d**4/1)
        if((d=Math.hypot(ax-(X+v[3]/2),ay-(Y+v[4]/1),az-(Z+v[5]/2)))<1.25){
          X1 = X+v[3]
          Y1 = Y+v[4]
          Z1 = Z+v[5]
          margin = .35+Math.hypot(v[3],v[4],v[5])*2
          vx = v[3]
          vy = v[4]
          vz = v[5]
          vx2 = vy2 = vz2 = ct = 0
          for(i=6; i--;){
            if(i!=4){
              switch(i){
                case 0:
                  X2 = X + margin/2
                  Y2 = Y
                  Z2 = Z
                  vx_ = 1
                  vy_ = 0
                  vz_ = 0
                break
                case 1:
                  X2 = X
                  Y2 = Y + margin*2
                  Z2 = Z
                  vx_ = 0
                  vy_ = 1
                  vz_ = 0
                break
                case 2:
                  X2 = X
                  Y2 = Y
                  Z2 = Z + margin/2
                  vx_ = 0
                  vy_ = 0
                  vz_ = 1
                break
                case 3:
                  X2 = X - margin/2
                  Y2 = Y
                  Z2 = Z
                  vx_ = -1
                  vy_ = 0
                  vz_ = 0
                break
                case 4:
                  X2 = X
                  Y2 = Y - margin/2
                  Z2 = Z
                  vx_ = 0
                  vy_ = -1
                  vz_ = 0
                break
                case 5:
                  X2 = X
                  Y2 = Y
                  Z2 = Z - margin/2
                  vx_ = 0
                  vy_ = 0
                  vz_ = -1
                break
              }
              if((l=lineFaceI(X1, Y1, Z1, X2, Y2, Z2, q[0], false, false))){
                spawnSparks(X,Y,Z)
                v[0] += l[1][0]*margin/6
                v[1] += l[1][1]*margin/6
                v[2] += l[1][2]*margin/6
                nv = reflect([vx_,vy_,vz_], l[1])
                vx2 += nv[0]
                vy2 += nv[1]
                vz2 += nv[2]
                ct++
              }
            }
          }
          v[3] = ct?vx2/ct/3:vx
          v[4] = ct?vy2/ct/6:vy
          v[5] = ct?vz2/ct/3:vz
        }
      })
    })
    R(Rl,Pt,Yw,1)
    if(Z>0) {
      l = Q()
      s = Math.min(1e4, 4e3/Z)
      x.drawImage(starImgs[3].img,l[0]-s/2/1.05,l[1]-s/2/1.05,s,s)
      s*=1.25
      x.drawImage(starImgs[0].img,l[0]-s/2,l[1]-s/2,s,s)
    }
    v[6] -= .0033
  })

  flashes = flashes.filter(v=>v[3]>.1)
  flashes.map(v=>{
    X = v[0]
    Y = v[1]
    Z = v[2]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e4,1e4*v[3]/Z)
      x.drawImage(starImgs[4].img,l[0]-s/2/1.05,l[1]-s/2/1.05,s,s)
      s*=2.5
      x.drawImage(starImgs[0].img,l[0]-s/2,l[1]-s/2,s,s)
    }
    v[3] -= .1
  })

  sparks = sparks.filter(v=>v[6]>.2)
  sparks.map(v=>{
    X = v[0] += v[3]
    Y = v[1] += v[4] += grav/16
    Z = v[2] += v[5]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e4,1600/Z*v[6])
      x.fillStyle = `#ff000005`
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      s/=2
      x.fillStyle = `#ffaa0010`
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      s/=3
      x.fillStyle = `#ffffffff`
      x.fillStyle = '#fff'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
    }
    v[6] -=.01
  })

  t+=1/60
  requestAnimationFrame(Draw)
}
Draw()