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
    
    burst = new Image()
    burst.src = "https://srmcgann.github.io/temp/burst.png"

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
    
    margin = .25
    cl = 16
    rw = cl*3.5|0
    br = 1
    sp = 2.75
    loadGrid = () => {
      ls = sp/2-margin
      let tgrid
      if(typeof grid == 'undefined'){
        tgrid = Array(cl*rw).fill().map((v, i) => [0, 0])
      }else{
        tgrid = Array(grid.length).fill().map((v, i) => [0, grid[i][1]])
      }
      grid = []
      Array(cl*rw).fill().map((v, i) => {
        tx = ((i%cl)-cl/2+.5)*sp*1.5 + ((i/cl|0)%2?sp*1.5/2:0)
        ty = ((i/cl/rw|0)-br/2+.5)*sp
        tz = (((i/cl|0)%rw)-rw/2+.5)*sp*(.75**.5/2)
        a = []
        for(j=6;j--;){
          X = S(p=Math.PI*2/6*j+Math.PI/6) * ls + tx
          Y = ty
          Z = C(p)*ls + tz
          d = Math.hypot(X, Z) - t*20
          ofy = S(d/3)* 2
          Y -= ofy
          a = [...a, [X, Y, Z]]
        }
        if(Math.hypot(tx,tz)<22) grid = [...grid, [a, tgrid[grid.length][1], tx, ty-ofy, tz]]
      })
    }
    
    P = []
    variance = .4
    iPv = 2
    grav = .125/1.5
    setSize = 2
    maxP = 75
    spawnP = (X, Y, Z) => {
      if(P.length >= maxP) return
      for(m=setSize;m--;){
        vx = S(p=Math.PI*2*Rn())*(v=Rn()* variance)
        vy = -(Rn()*iPv/3 + iPv*(1-1/3))
        vz = C(p) * v
        P = [...P, [X, Y, Z, vx, vy, vz, 1]]
      }
    }
    spawnP(0,0,0)
    
    bg = new Image()
    bg.src = 'https://srmcgann.github.io/photography/fc402d02cd642483899593e8803319d1.jpg'
  }
  
  if(!((t*60|0)%2)) loadGrid()
  
  x.globalAlpha = .066
  x.drawImage(bg,0,0,c.width,c.height)
  x.globalAlpha = 1
  x.fillStyle = '#0004'
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin = x.lineCap = 'roud'
  
  margin = Math.min(.5, Math.max(0, (.3+C(t/2+Math.PI/2))*2))
  variance = (C(t)+1)/4
  iPv = .75 + (1.01+C(t*2)) * .75

  if(!P.length) spawnP(0,0,0)
  
  oX=0, oY=0, oZ=Math.min(50, Math.max(30,(.3+C(t/2))*60))
  Rl=0, Pt=-Math.max(.2, Math.min(Math.PI/2,(.3+C(t/2+Math.PI/2))*Math.PI*1.5)), Yw=C(t/4)*4
  
  tgrid = structuredClone(grid)
  grid.map((v,i) => {
    ax1 = v[2]
    ay1 = v[3]
    az1 = v[4]
    grid.map((q, j) => {
      if(i!=j){
        ax2 = q[2]
        ay2 = q[3]
        az2 = q[4]
        if(d = Math.hypot(ax1-ax2, ay1-ay2, az1-az2) < ls * 3){
          avg = (v[1] + q[1]) /2
          v[1] += (avg - v[1]) /2
          q[1] += (avg - q[1]) /2
        }
      }
    })
    x.beginPath()
    v[0].map(q=>{
      X = q[0]
      Y = q[1]
      Z = q[2]
      R(Rl, Pt, Yw, 1)
      if(Z>0) x.lineTo(...Q())
    })
    alpha = Math.min(.75, .1 + v[1]*.9)
    col1 = alpha>.5?'#0004':''
    col2 = `hsla(${-100 + (v[1]*25)**2/25+t*600},${v[1]*100}%,${50+v[1]*12}%,${alpha})`
    stroke(col1, col2, 4, false)
  })

  grid.map(v=>{v[1]/=1.125})
  
  drawVectors = true
  vecLen = 2
  
  P = P.filter(v=>v[1]<=100)
  P.map(v => {
    X1 = v[0] += v[3]
    Y1 = v[1] += v[4] += grav
    Z1 = v[2] += v[5]
    
    d = Math.hypot(v[3],v[4],v[5])
    vx = v[3]/d*vecLen
    vy = v[4]/d*vecLen
    vz = v[5]/d*vecLen
    X2 = X1 + vx
    Y2 = Y1 + vy
    Z2 = Z1 + vz
    
    grid.map(n => {
      ax = n[2]
      ay = n[3]
      az = n[4]
      if(Math.hypot(ax-X1, ay-Y1, az-Z1) < ls*2){
        n[1] += .75
        n[1] = Math.min(10, n[1])
        if(l=lineFaceI(X1, Y1, Z1, X2, Y2, Z2, n[0])){
          v[1]=1e6
          if(Rn() <= 1/setSize*2.5){
            spawnP(ax,ay,az)
          }
        }
      }
    })
    
    X = X1
    Y = Y1
    Z = Z1
    R(Rl,Pt,Yw,1)
    if(1&&Z>0){
      l = Q()
      s = Math.min(1e3, 3e3/Z)
      x.fillStyle = '#ff000010'
      x.fillRect(l[0]-s/2, l[1]-s/2, s, s)
      s/=2
      x.fillStyle = '#ff880020'
      x.fillRect(l[0]-s/2, l[1]-s/2, s, s)
      s/=3
      x.fillStyle = '#ffffffff'
      x.fillRect(l[0]-s/2, l[1]-s/2, s, s)
    }
    if(drawVectors){
      x.beginPath()
      X = X1, Y = Y1, Z = Z1
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
      X = X2, Y = Y2, Z = Z2
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
      stroke(`#000`,'',5, true)
    }
  })
  
  t+=1/60
  requestAnimationFrame(Draw)
}
Draw()