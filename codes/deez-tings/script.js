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
  
  if(!t){
    R=(Rl,Pt,Yw,m)=>{
      M=Math
      A=M.atan2
      H=M.hypot
      X=S(p=A(X,Y)+Rl)*(d=H(X,Y))
      Y=C(p)*d
      X=S(p=A(X,Z)+Yw)*(d=H(X,Z))
      Z=C(p)*d
      Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z))
      Z=C(p)*d
      if(m){
        X+=oX
        Y+=oY
        Z+=oZ
      }
    }
    Q=()=>[c.width/2+X/Z*800,c.height/2+Y/Z*800]
    I=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0
    
    Rn = Math.random
    
    geoSphere = (mx, my, mz, iBc, size) => {
      let collapse=0
      let B=Array(iBc).fill().map(v=>{
        X = Rn()-.5
        Y = Rn()-.5
        Z = Rn()-.5
        return  [X,Y,Z]
      })
      for(let m=99;m--;){
        B.map((v,i)=>{
          X = v[0]
          Y = v[1]
          Z = v[2]
          B.map((q,j)=>{
            if(j!=i){
              X2=q[0]
              Y2=q[1]
              Z2=q[2]
              d=1+(Math.hypot(X-X2,Y-Y2,Z-Z2)*(3+iBc/40)*3)**4
              X+=(X-X2)*99/d
              Y+=(Y-Y2)*99/d
              Z+=(Z-Z2)*99/d
            }
          })
          d=Math.hypot(X,Y,Z)
          v[0]=X/d
          v[1]=Y/d
          v[2]=Z/d
          if(collapse){
            d=25+Math.hypot(X,Y,Z)
            v[0]=(X-X/d)/1.1
            v[1]=(Y-Y/d)/1.1         
            v[2]=(Z-Z/d)/1.1
          }
        })
      }
      B.map(v=>{
        v[0]*=size
        v[1]*=size
        v[2]*=size
        v[0]+=mx
        v[1]+=my
        v[2]+=mz
      })
      return [mx, my, mz, size, B]
    }

    Cylinder = (rw,cl,ls1,ls2) => {
      let a = []
      for(let i=rw;i--;){
        let b = []
        for(let j=cl;j--;){
          X = S(p=Math.PI*2/cl*j) * ls1
          Y = (1/rw*i-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
        }
        //a = [...a, b]
        for(let j=cl;j--;){
          b = []
          X = S(p=Math.PI*2/cl*j) * ls1
          Y = (1/rw*i-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*(j+1)) * ls1
          Y = (1/rw*i-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*(j+1)) * ls1
          Y = (1/rw*(i+1)-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*j) * ls1
          Y = (1/rw*(i+1)-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          a = [...a, b]
        }
      }
      b = []
      for(let j=cl;j--;){
        X = S(p=Math.PI*2/cl*j) * ls1
        Y = ls2/2
        Z = C(p) * ls1
        b = [...b, [X,Y,Z]]
      }
      //a = [...a, b]
      return a
    }

    Tetrahedron = size => {
      ret = []
      a = []
      let h = size/1.4142/1.25
      for(i=3;i--;){
        X = S(p=Math.PI*2/3*i) * size/1.25
        Y = C(p) * size/1.25
        Z = h
        a = [...a, [X,Y,Z]]
      }
      ret = [...ret, a]
      for(j=3;j--;){
        a = []
        X = 0
        Y = 0
        Z = -h
        a = [...a, [X,Y,Z]]
        X = S(p=Math.PI*2/3*j) * size/1.25
        Y = C(p) * size/1.25
        Z = h
        a = [...a, [X,Y,Z]]
        X = S(p=Math.PI*2/3*(j+1)) * size/1.25
        Y = C(p) * size/1.25
        Z = h
        a = [...a, [X,Y,Z]]
        ret = [...ret, a]
      }
      ax=ay=az=ct=0
      ret.map(v=>{
        v.map(q=>{
          ax+=q[0]
          ay+=q[1]
          az+=q[2]
          ct++
        })
      })
      ax/=ct
      ay/=ct
      az/=ct
      ret.map(v=>{
        v.map(q=>{
          q[0]-=ax
          q[1]-=ay
          q[2]-=az
        })
      })
      return ret
    }

    Cube = size => {
      for(CB=[],j=6;j--;CB=[...CB,b])for(b=[],i=4;i--;)b=[...b,[(a=[S(p=Math.PI*2/4*i+Math.PI/4),C(p),2**.5/2])[j%3]*(l=j<3?size/1.5:-size/1.5),a[(j+1)%3]*l,a[(j+2)%3]*l]]
      return CB
    }
    
    Octahedron = size => {
      ret = []
      let h = size/1.25
      for(j=8;j--;){
        a = []
        X = 0
        Y = 0
        Z = h * (j<4?-1:1)
        a = [...a, [X,Y,Z]]
        X = S(p=Math.PI*2/4*j) * size/1.25
        Y = C(p) * size/1.25
        Z = 0
        a = [...a, [X,Y,Z]]
        X = S(p=Math.PI*2/4*(j+1)) * size/1.25
        Y = C(p) * size/1.25
        Z = 0
        a = [...a, [X,Y,Z]]
        ret = [...ret, a]
      }
      return ret      
    }
    
    Dodecahedron = size => {
      ret = []
      a = []
      mind = -6e6
      for(i=5;i--;){
        X=S(p=Math.PI*2/5*i + Math.PI/5)
        Y=C(p)
        Z=0
        if(Y>mind) mind=Y
        a = [...a, [X,Y,Z]]
      }
      a.map(v=>{
        X = v[0]
        Y = v[1]-=mind
        Z = v[2]
        R(0, .553573, 0)
        v[0] = X
        v[1] = Y
        v[2] = Z
      })
      b = JSON.parse(JSON.stringify(a))
      b.map(v=>{
        v[1] *= -1
      })
      ret = [...ret, a, b]
      mind = -6e6
      ret.map(v=>{
        v.map(q=>{
          X = q[0]
          Y = q[1]
          Z = q[2]
          if(Z>mind)mind = Z
        })
      })
      d1=Math.hypot(ret[0][0][0]-ret[0][1][0],ret[0][0][1]-ret[0][1][1],ret[0][0][2]-ret[0][1][2])
      ret.map(v=>{
        v.map(q=>{
          q[2]-=mind+d1/2
        })
      })
      b = JSON.parse(JSON.stringify(ret))
      b.map(v=>{
        v.map(q=>{
          q[2]*=-1
        })
      })
      ret = [...ret, ...b]
      b = JSON.parse(JSON.stringify(ret))
      b.map(v=>{
        v.map(q=>{
          X = q[0]
          Y = q[1]
          Z = q[2]
          R(0,0,Math.PI/2)
          R(0,Math.PI/2,0)
          q[0] = X
          q[1] = Y
          q[2] = Z
        })
      })
      e = JSON.parse(JSON.stringify(ret))
      e.map(v=>{
        v.map(q=>{
          X = q[0]
          Y = q[1]
          Z = q[2]
          R(0,0,Math.PI/2)
          R(Math.PI/2,0,0)
          q[0] = X
          q[1] = Y
          q[2] = Z
        })
      })
      ret = [...ret, ...b, ...e]
      ret.map(v=>{
        v.map(q=>{
          q[0] *= size/2
          q[1] *= size/2
          q[2] *= size/2
        })
      })
      return ret
    }
    
    Icosahedron = size => {
      ret = []
      B = [
        [[0,3],[1,0],[2,2]],
        [[0,3],[1,0],[1,3]],
        [[0,3],[2,3],[1,3]],
        [[0,2],[2,1],[1,0]],
        [[0,2],[1,3],[1,0]],
        [[0,2],[1,3],[2,0]],
        [[0,3],[2,2],[0,0]],
        [[1,0],[2,2],[2,1]],
        [[1,1],[2,2],[2,1]],
        [[1,1],[2,2],[0,0]],
        [[1,1],[2,1],[0,1]],
        [[0,2],[2,1],[0,1]],
        [[2,0],[1,2],[2,3]],
        [[0,0],[0,3],[2,3]],
        [[1,3],[2,0],[2,3]],
        [[2,3],[0,0],[1,2]],
        [[1,2],[2,0],[0,1]],
        [[0,0],[1,2],[1,1]],
        [[0,1],[1,2],[1,1]],
        [[0,2],[2,0],[0,1]],
      ]
      for(p=[1,1],i=38;i--;)p=[...p,p[l=p.length-1]+p[l-1]]
      phi = p[l]/p[l-1]
      a = [
        [-phi,-1,0],
        [phi,-1,0],
        [phi,1,0],
        [-phi,1,0],
      ]
      for(j=3;j--;ret=[...ret, b])for(b=[],i=4;i--;) b = [...b, [a[i][j],a[i][(j+1)%3],a[i][(j+2)%3]]]
      ret.map(v=>{
        v.map(q=>{
          q[0]*=size/2.25
          q[1]*=size/2.25
          q[2]*=size/2.25
        })
      })
      cp = JSON.parse(JSON.stringify(ret))
      out=[]
      a = []
      B.map(v=>{
        idx1a = v[0][0]
        idx2a = v[1][0]
        idx3a = v[2][0]
        idx1b = v[0][1]
        idx2b = v[1][1]
        idx3b = v[2][1]
        a = [...a, [cp[idx1a][idx1b],cp[idx2a][idx2b],cp[idx3a][idx3b]]]
      })
      out = [...out, ...a]
      return out
    }
    
    stroke = (scol, fcol, lwo=1) => {
      if(scol){
        x.closePath()
        x.globalAlpha = .2
        x.strokeStyle = scol
        x.lineWidth = Math.min(100,50*lwo/Z)
        x.stroke()
        x.lineWidth /= 4
        x.globalAlpha = 1
        x.stroke()
      }
      if(fcol){
        x.fillStyle = fcol
        x.fill()
      }
    }

    subDividedIcosahedron = (subs, size, sphereize = 0) => {
      let subIcos = Icosahedron(size)
      for(let m=subs; m--;){
        base = JSON.parse(JSON.stringify(subIcos))
        subIcos = []
        base.map(v=>{
          l = 0
          X1 = v[l][0]
          Y1 = v[l][1]
          Z1 = v[l][2]
          l = 1
          X2 = v[l][0]
          Y2 = v[l][1]
          Z2 = v[l][2]
          l = 2
          X3 = v[l][0]
          Y3 = v[l][1]
          Z3 = v[l][2]
          mx1 = (X1+X2)/2
          my1 = (Y1+Y2)/2
          mz1 = (Z1+Z2)/2
          mx2 = (X2+X3)/2
          my2 = (Y2+Y3)/2
          mz2 = (Z2+Z3)/2
          mx3 = (X3+X1)/2
          my3 = (Y3+Y1)/2
          mz3 = (Z3+Z1)/2
          a = []
          X = X1, Y = Y1, Z = Z1, a = [...a, [X,Y,Z]]
          X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
          X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
          subIcos = [...subIcos, a]
          a = []
          X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
          X = X2, Y = Y2, Z = Z2, a = [...a, [X,Y,Z]]
          X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
          subIcos = [...subIcos, a]
          a = []
          X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
          X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
          X = X3, Y = Y3, Z = Z3, a = [...a, [X,Y,Z]]
          subIcos = [...subIcos, a]
          a = []
          X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
          X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
          X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
          subIcos = [...subIcos, a]
        })
      }
      if(sphereize){
        ip1 = sphereize
        ip2 = 1-sphereize
        subIcos = subIcos.map(v=>{
          v = v.map(q=>{
            X = q[0]
            Y = q[1]
            Z = q[2]
            d = Math.hypot(X,Y,Z)
            X /= d
            Y /= d
            Z /= d
            X *= size*.75*ip1 + d*ip2
            Y *= size*.75*ip1 + d*ip2
            Z *= size*.75*ip1 + d*ip2
            return [X,Y,Z]
          })
          return v
        })
      }
      return subIcos
    }

    
    Rn = Math.random
    
    LsystemRecurse = (size, splits, p1, p2, stem, theta, LsystemReduction, twistFactor) => {
      if(size < 1.3) return
      let X1 = stem[0]
      let Y1 = stem[1]
      let Z1 = stem[2]
      let X2 = stem[3]
      let Y2 = stem[4]
      let Z2 = stem[5]
      let p1a = Math.atan2(X2-X1,Z2-Z1)
      let p2a = -Math.acos((Y2-Y1)/(Math.hypot(X2-X1,Y2-Y1,Z2-Z1)+.0001))+Math.PI
      size/=LsystemReduction
      for(let i=splits;i--;){
        X = 0
        Y = -size
        Z = 0
        R(0, theta, 0)
        R(0, 0, Math.PI*2/splits*i+twistFactor)
        R(0, p2a, 0)
        R(0, 0, p1a+twistFactor)
        X+=X2
        Y+=Y2
        Z+=Z2
        let newStem = [X2, Y2, Z2, X, Y, Z]
        Lshp = [...Lshp, newStem]
        LsystemRecurse(size, splits, p1+Math.PI*2/splits*i+twistFactor, p2+theta, newStem, theta, LsystemReduction, twistFactor)
      }
    }
    DrawLsystem = shp => {
      shp.map(v=>{
        x.beginPath()
        X = v[0]
        Y = v[1]
        Z = v[2]
        R(Rl,Pt,Yw,1)
        if(Z>0)x.lineTo(...Q())
        X = v[3]
        Y = v[4]
        Z = v[5]
        R(Rl,Pt,Yw,1)
        if(Z>0)x.lineTo(...Q())
        lwo = Math.hypot(v[0]-v[3],v[1]-v[4],v[2]-v[5])
        stroke('#0f82','',lwo)
      })
      
    }
    Lsystem = (size, splits, theta, LsystemReduction, twistFactor) => {
      Lshp = []
      stem = [0,0,0,0,-size,0]
      Lshp = [...Lshp, stem]
      LsystemRecurse(size, splits, 0, 0, stem, theta, LsystemReduction, twistFactor)
      Lshp.map(v=>{
        v[1]+=size*1.5
        v[4]+=size*1.5
      })
      return Lshp
    }
    
    Sphere = (ls, rw, cl) => {
      a = []
      ls/=1.25
      for(j = rw; j--;){
        for(i = cl; i--;){
          b = []
          X = S(p = Math.PI*2/cl*i) * S(q = Math.PI/rw*j) * ls
          Y = C(q) * ls
          Z = C(p) * S(q) * ls
          b = [...b, [X,Y,Z]]
          X = S(p = Math.PI*2/cl*(i+1)) * S(q = Math.PI/rw*j) * ls
          Y = C(q) * ls
          Z = C(p) * S(q) * ls
          b = [...b, [X,Y,Z]]
          X = S(p = Math.PI*2/cl*(i+1)) * S(q = Math.PI/rw*(j+1)) * ls
          Y = C(q) * ls
          Z = C(p) * S(q) * ls
          b = [...b, [X,Y,Z]]
          X = S(p = Math.PI*2/cl*i) * S(q = Math.PI/rw*(j+1)) * ls
          Y = C(q) * ls
          Z = C(p) * S(q) * ls
          b = [...b, [X,Y,Z]]
          a = [...a, b]
        }
      }
      return a
    }
    
    
    tgtDpth = 4, ls=1.5, brnch = 4
    recurse = (dpth, X,Y,Z,theta) => {
      if(dpth>tgtDpth || (dpth>1 && Rn()<.5)) return
      for(let i=brnch;i--;){
        let tx = X+S(p=theta + (Rn()-.5)*2)*ls/(1+dpth/2)
        let ty = Y+C(p)*ls/(1+dpth/4)
        let tz = Z+(Rn()-.5)*2
        d = Math.hypot(tx-X,ty-Y,tz-Z)
        B = [...B, [X,Y,Z,tx,ty,tz,p,d]]
        recurse(dpth+1,tx,ty,tz,p,d)
      }
    }
    
    B = []
    recurse(0, 0, 0, 0, Math.PI)
    cx = B[0][0]
    cy = B[0][1]
    cz = B[0][2]
    roots = []
    B.map((v,i)=>{
      X = v[0]
      Y = v[1]
      Z = v[2]
      d = Math.hypot(X-cx,Y-cy,Z-cz)
      if(d<.01) roots = [...roots, i]
    })
    B.map((v,i)=>{
      shared = []
      X1 = v[0]
      Y1 = v[1]
      Z1 = v[2]
      B.map((q, j) => {
        if(i != j){
          X2 = q[3]
          Y2 = q[4]
          Z2 = q[5]
          d = Math.hypot(X2-X1, Y2-Y1, Z2-Z1)
          if(d<.01) shared = [...shared, j]
        }
      })
      v[8] = shared
      shared = []
      X1 = v[3]
      Y1 = v[4]
      Z1 = v[5]
      B.map((q, j) => {
        if(i != j){
          X2 = q[0]
          Y2 = q[1]
          Z2 = q[2]
          d = Math.hypot(X2-X1, Y2-Y1, Z2-Z1)
          if(d<.01) shared = [...shared, j]
        }
      })
      v[9] = shared
    })
    iBv = 2
    mvx=mvy=mvz=mvx_=mvy_=mvz_=0

   iSTc = 3e3, iSTG = 3e4
    ST = Array(iSTc).fill().map(v=>{
      X = (Rn()-.5) * iSTG
      Y = (Rn()-.5) * iSTG
      Z = (Rn()-.5) * iSTG
      return [X, Y, Z]
    })  
  }

  oX=0, oY=0, oZ=6
  Rl=0, Pt=-t/2, Yw=S(t)*3
  

  x.fillStyle='#0008'
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin = x.lineCap = 'roud'
  
  ST.map(v=>{
    X = v[0]
    Y = v[1]
    Z = v[2]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      if((x.globalAlpha = Math.min(1,(Z/5000)**2))>.1){
        s = Math.min(1e3, 300000/Z)
        x.fillStyle = '#ffffff03'
        l = Q()
        x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
        s/=16
        x.fillStyle = '#fff'
        x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      }
    }
  })
  

  
  mvx_ += (Rn()-.5) * iBv
  mvy_ += (Rn()-.5) * iBv
  mvz_ += 0//(Rn()-.5) * iBv
  
  mvx_ /= 1.2
  mvy_ /= 1.2
  mvz_ /= 1.2
  
  mvx += mvx_
  mvy += mvy_
  mvz += mvz_
  
  d1 = Math.hypot(mvx,mvy,mvz)
  min=.5
  d2 = Math.min(min,d1)
  mvx/=d1
  mvy/=d1
  mvz/=d1
  mvx*=d2
  mvy*=d2
  mvz*=d2
  
  B.map((v,i)=>{
    wasroot = false
    roots.map(q=>{
      if(q==i){
        v[0] += mvx -=v[0]/100
        v[1] += mvy -=v[1]/100
        v[2] += mvz -=v[2]/100
        wasroot = true
        if(i){
          v[0] = B[0][0]
          v[1] = B[0][2]
          v[2] = B[0][2]
        }
      }
    })
    if(!wasroot){
      v[0] += (Rn()-.5)/10 - v[0]/100
      v[1] += (Rn()-.5)/10 - v[1]/100
      v[2] += (Rn()-.5)/10 - v[2]/100
      v[3] += (Rn()-.5)/10 - v[3]/100
      v[4] += (Rn()-.5)/10 - v[4]/100
      v[5] += (Rn()-.5)/10 - v[5]/100
    }
    
    X1 = v[0]
    Y1 = v[1]
    Z1 = v[2]
    X2 = v[3]
    Y2 = v[4]
    Z2 = v[5]
    d = Math.hypot(a=X2-X1,b=Y2-Y1,e=Z2-Z1)
    a/=d
    b/=d
    e/=d
    X2 = v[3] = X1 + a * v[7]
    Y2 = v[4] = Y1 + b * v[7]
    Z2 = v[5] = Z1 + e * v[7]
    v[9].map(q => {
      B[q][0] = X2
      B[q][1] = Y2
      B[q][2] = Z2
    })
    
    X = v[0]
    Y = v[1]
    Z = v[2]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      /*s = Math.min(1e3,500/Z)
      x.fillStyle = '#fff2'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      x.fillStyle = '#fff2'
      s/=5
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)*/
      x.beginPath()
      x.lineTo(...l)
      X = v[3]
      Y = v[4]
      Z = v[5]
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
      stroke('#40f8','',1)
      s = Math.min(1e3,250/Z)
      x.fillStyle = '#00ff8804'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      s/=8
      x.fillStyle = '#fff'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
    }
  })
  
  t+=1/60
  requestAnimationFrame(Draw)
}
Draw()