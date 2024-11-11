c = document.querySelector('#c')
c.width = 1920/2
c.height = 1080/2
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
    oX = oY = oZ = 0
    Rn = Math.random
    R = (Rl,Pt,Yw,m) => {
      let p
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
    
    R2=(Rl,Pt,Yw,m=false)=>{
      M=Math
      A=M.atan2
      H=M.hypot
      if(m){
        X-=oX
        Y-=oY
        Z-=oZ
      }
      X=S(p=A(X,Y)+Rl)*(d=H(X,Y))
      Y=C(p)*d
      Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z))
      Z=C(p)*d
      X=S(p=A(X,Z)+Yw)*(d=H(X,Z))
      Z=C(p)*d
    }

    Q = () => [c.width/2+X/Z*900/2, c.height/2+Y/Z*900/2]
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
      
    async function loadOBJ(url, scale, tx, ty, tz, rl, pt, yw, recenter=true) {
      let res
      await fetch(url, res => res).then(data=>data.text()).then(data=>{
        a=[]
        data.split("\nv ").map(v=>{
          a=[...a, v.split("\n")[0]]
        })
        a=a.filter((v,i)=>i).map(v=>[...v.split(' ').map(n=>(+n.replace("\n", '')))])
        ax=ay=az=0
        a.map(v=>{
          v[1]*=-1
          if(recenter){
            ax+=v[0]
            ay+=v[1]
            az+=v[2]
          }
        })
        ax/=a.length
        ay/=a.length
        az/=a.length
        a.map(v=>{
          X=(v[0]-ax)*scale
          Y=(v[1]-ay)*scale
          Z=(v[2]-az)*scale
          R2(rl,pt,yw,0)
          v[0]=X
          v[1]=Y * (url.indexOf('bug')!=-1?2:1)
          v[2]=Z
        })
        maxY=-6e6
        a.map(v=>{
          if(v[1]>maxY)maxY=v[1]
        })
        a.map(v=>{
          v[1]-=maxY-oY
          v[0]+=tx
          v[1]+=ty
          v[2]+=tz
        })

        b=[]
        data.split("\nf ").map(v=>{
          b=[...b, v.split("\n")[0]]
        })
        b.shift()
        b=b.map(v=>v.split(' '))
        b=b.map(v=>{
          v=v.map(q=>{
            return +q.split('/')[0]
          })
          v=v.filter(q=>q)
          return v
        })

        res=[]
        b.map(v=>{
          e=[]
          v.map(q=>{
            e=[...e, a[q-1]]
          })
          e = e.filter(q=>q)
          res=[...res, e]
        })
      })
      return res
    }

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
      mind = 6e6
      B.map((v,i)=>{
        X1 = v[0]
        Y1 = v[1]
        Z1 = v[2]
        B.map((q,j)=>{
          X2 = q[0]
          Y2 = q[1]
          Z2 = q[2]
          if(i!=j){
            d = Math.hypot(a=X1-X2, b=Y1-Y2, e=Z1-Z2)
            if(d<mind) mind = d
          }
        })
      })
      a = []
      B.map((v,i)=>{
        X1 = v[0]
        Y1 = v[1]
        Z1 = v[2]
        B.map((q,j)=>{
          X2 = q[0]
          Y2 = q[1]
          Z2 = q[2]
          if(i!=j){
            d = Math.hypot(X1-X2, Y1-Y2, Z1-Z2)
            if(d<mind*2){
              if(!a.filter(q=>q[0]==X2&&q[1]==Y2&&q[2]==Z2&&q[3]==X1&&q[4]==Y1&&q[5]==Z1).length) a = [...a, [X1*size,Y1*size,Z1*size,X2*size,Y2*size,Z2*size]]
            }
          }
        })
      })
      B.map(v=>{
        v[0]*=size
        v[1]*=size
        v[2]*=size
        v[0]+=mx
        v[1]+=my
        v[2]+=mz
      })
      return [mx, my, mz, size, B, a]
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

    Cube = size => {
      for(r=[],i=6;i--;r=[...r,b])for(b=[],j=4;j--;)b=[...b,[(a=[S(p=Math.PI*2/4*j+Math.PI/4),C(p),2**.5/2])[i%3]*(l=size*(i<3?1:-1)),a[(i+1)%3]*l,a[(i+2)%3]*l]]
      r = r.map((v,i) => {
        v.map((q, j) => {
          X = q[0]
          Y = q[1]
          Z = q[2]
          
          switch(i){
            case 0:
              R(0,Math.PI,0)
              break
            case 2:
              R(Math.PI/2,0,0)
              break
            case 5:
              R(-Math.PI/2,0,0)
              break
          }
          q[0] = X
          q[1] = Y
          q[2] = Z
        })
        return v
      })
      return r
    }
    
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

    TruncatedOctahedron = ls => {
      let shp = [], a = []
      mind = 6e6
      for(let i=6;i--;){
        X = S(p=Math.PI*2/6*i+Math.PI/6)*ls
        Y = C(p)*ls
        Z = 0
        if(Y<mind) mind = Y
        a = [...a, [X, Y, Z]]
      }
      let theta = .6154797086703867
      a.map(v=>{
        X = v[0]
        Y = v[1] - mind
        Z = v[2]
        R(0,theta,0)
        v[0] = X
        v[1] = Y
        v[2] = Z+1.5
      })
      b = JSON.parse(JSON.stringify(a)).map(v=>{
        v[1] *= -1
        return v
      })
      shp = [...shp, a, b]
      e = JSON.parse(JSON.stringify(shp)).map(v=>{
        v.map(q=>{
          X = q[0]
          Y = q[1]
          Z = q[2]
          R(0,0,Math.PI)
          q[0] = X
          q[1] = Y
          q[2] = Z
        })
        return v
      })
      shp = [...shp, ...e]
      e = JSON.parse(JSON.stringify(shp)).map(v=>{
        v.map(q=>{
          X = q[0]
          Y = q[1]
          Z = q[2]
          R(0,0,Math.PI/2)
          q[0] = X
          q[1] = Y
          q[2] = Z
        })
        return v
      })
      shp = [...shp, ...e]

      coords = [
        [[3,1],[4,3],[4,4],[3,2]],
        [[3,4],[3,3],[2,4],[6,2]],
        [[1,4],[0,3],[0,4],[4,2]],
        [[1,1],[1,2],[6,4],[7,3]],
        [[3,5],[7,5],[1,5],[3,0]],
        [[2,5],[6,5],[0,5],[4,5]]
      ]
      a = []
      coords.map(v=>{
        b = []
        v.map(q=>{
          X = shp[q[0]][q[1]][0]
          Y = shp[q[0]][q[1]][1]
          Z = shp[q[0]][q[1]][2]
          b = [...b, [X,Y,Z]]
        })
        a = [...a, b]
      })
      shp = [...shp, ...a]
      return shp.map(v=>{
        v.map(q=>{
          q[0]/=3
          q[1]/=3
          q[2]/=3
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
        return v
      })
    }

    Torus = (rw, cl, ls1, ls2, parts=1, twists=0, part_spacing=1.5) => {
     t_ = C(t)*8
     let ret = [], tx=0, ty=0, tz=0, prl1 = 0, p2a = 0, prl2=0, p2b = 0
      tx1=ty1=tz1=tx2=ty2=tz2=0
      for(let m=parts;m--;){
        avgs = Array(rw).fill().map(v=>[0,0,0])
        for(j=rw;j--;)for(let i = cl;i--;){
          if(parts>1){
            ls3 = ls1*part_spacing
            X = S(p=Math.PI*2/parts*m) * ls3
            Y = C(p) * ls3
            Z = 0
            R(prl1 = Math.PI*2/rw*(j-1)*twists+t_,0,0)
            tx1 = X
            ty1 = Y 
            tz1 = Z
            R(0, 0, Math.PI*2/rw*(j-1))
            ax1 = X
            ay1 = Y
            az1 = Z
            X = S(p=Math.PI*2/parts*m) * ls3
            Y = C(p) * ls3
            Z = 0
            R(prl2 = Math.PI*2/rw*(j)*twists+t_,0,0)
            tx2 = X
            ty2 = Y
            tz2 = Z
            R(0, 0, Math.PI*2/rw*j)
            ax2 = X
            ay2 = Y
            az2 = Z
            p1a = Math.atan2(ax2-ax1,az2-az1)
            p2a = Math.PI/2+Math.acos((ay2-ay1)/(Math.hypot(ax2-ax1,ay2-ay1,az2-az1)+.001))

            X = S(p=Math.PI*2/parts*m) * ls3
            Y = C(p) * ls3
            Z = 0
            R(Math.PI*2/rw*(j)*twists+t_,0,0)
            tx1b = X
            ty1b = Y
            tz1b = Z
            R(0, 0, Math.PI*2/rw*j)
            ax1b = X
            ay1b = Y
            az1b = Z
            X = S(p=Math.PI*2/parts*m) * ls3
            Y = C(p) * ls3
            Z = 0
            R(Math.PI*2/rw*(j+1)*twists+t_,0,0)
            tx2b = X
            ty2b = Y
            tz2b = Z
            R(0, 0, Math.PI*2/rw*(j+1))
            ax2b = X
            ay2b = Y
            az2b = Z
            p1b = Math.atan2(ax2b-ax1b,az2b-az1b)
            p2b = Math.PI/2+Math.acos((ay2b-ay1b)/(Math.hypot(ax2b-ax1b,ay2b-ay1b,az2b-az1b)+.001))
          }
          a = []
          X = S(p=Math.PI*2/cl*i) * ls1
          Y = C(p) * ls1
          Z = 0
          //R(0,0,-p1a)
          R(prl1,p2a,0)
          X += ls2 + tx1, Y += ty1, Z += tz1
          R(0, 0, Math.PI*2/rw*j)
          a = [...a, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*(i+1)) * ls1
          Y = C(p) * ls1
          Z = 0
          //R(0,0,-p1a)
          R(prl1,p2a,0)
          X += ls2 + tx1, Y += ty1, Z += tz1
          R(0, 0, Math.PI*2/rw*j)
          a = [...a, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*(i+1)) * ls1
          Y = C(p) * ls1
          Z = 0
          //R(0,0,-p1b)
          R(prl2,p2b,0)
          X += ls2 + tx2, Y += ty2, Z += tz2
          R(0, 0, Math.PI*2/rw*(j+1))
          a = [...a, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*i) * ls1
          Y = C(p) * ls1
          Z = 0
          //R(0,0,-p1b)
          R(prl2,p2b,0)
          X += ls2 + tx2, Y += ty2, Z += tz2
          R(0, 0, Math.PI*2/rw*(j+1))
          a = [...a, [X,Y,Z]]
          ret = [...ret, a]
        }
      }
      return ret
    }

    Cylinder = (rw, cl, ls1, ls2, caps=false) => {
      let a = []
      for(let i=rw;i--;){
        let b = []
        for(let j=cl;j--;){
          X = S(p=Math.PI*2/cl*j) * ls1
          Y = (1/rw*i-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
        }
        if(caps) a = [...a, b]
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
        //b = [...b, [X,Y,Z]]
      }
      if(caps) a = [...a, b]
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
      let B = [
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

    subbed = (subs, size, sphereize, shape) => {
      for(let m=subs; m--;){
        base = shape
        shape = []
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
          if(v.length > 3){
            l = 3
            X4 = v[l][0]
            Y4 = v[l][1]
            Z4 = v[l][2]
            if(v.length > 4){
              l = 4
              X5 = v[l][0]
              Y5 = v[l][1]
              Z5 = v[l][2]
            }
          }
          mx1 = (X1+X2)/2
          my1 = (Y1+Y2)/2
          mz1 = (Z1+Z2)/2
          mx2 = (X2+X3)/2
          my2 = (Y2+Y3)/2
          mz2 = (Z2+Z3)/2
          a = []
          switch(v.length){
            case 3:
              mx3 = (X3+X1)/2
              my3 = (Y3+Y1)/2
              mz3 = (Z3+Z1)/2
              X = X1, Y = Y1, Z = Z1, a = [...a, [X,Y,Z]]
              X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
              X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
              X = X2, Y = Y2, Z = Z2, a = [...a, [X,Y,Z]]
              X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
              X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
              X = X3, Y = Y3, Z = Z3, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
              X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
              X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              break
            case 4:
              mx3 = (X3+X4)/2
              my3 = (Y3+Y4)/2
              mz3 = (Z3+Z4)/2
              mx4 = (X4+X1)/2
              my4 = (Y4+Y1)/2
              mz4 = (Z4+Z1)/2
              cx = (X1+X2+X3+X4)/4
              cy = (Y1+Y2+Y3+Y4)/4
              cz = (Z1+Z2+Z3+Z4)/4
              X = X1, Y = Y1, Z = Z1, a = [...a, [X,Y,Z]]
              X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
              X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
              X = mx4, Y = my4, Z = mz4, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
              X = X2, Y = Y2, Z = Z2, a = [...a, [X,Y,Z]]
              X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
              X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
              X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
              X = X3, Y = Y3, Z = Z3, a = [...a, [X,Y,Z]]
              X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              X = mx4, Y = my4, Z = mz4, a = [...a, [X,Y,Z]]
              X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
              X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
              X = X4, Y = Y4, Z = Z4, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              break
            case 5:
              cx = (X1+X2+X3+X4+X5)/5
              cy = (Y1+Y2+Y3+Y4+Y5)/5
              cz = (Z1+Z2+Z3+Z4+Z5)/5
              mx3 = (X3+X4)/2
              my3 = (Y3+Y4)/2
              mz3 = (Z3+Z4)/2
              mx4 = (X4+X5)/2
              my4 = (Y4+Y5)/2
              mz4 = (Z4+Z5)/2
              mx5 = (X5+X1)/2
              my5 = (Y5+Y1)/2
              mz5 = (Z5+Z1)/2
              X = X1, Y = Y1, Z = Z1, a = [...a, [X,Y,Z]]
              X = X2, Y = Y2, Z = Z2, a = [...a, [X,Y,Z]]
              X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              X = X2, Y = Y2, Z = Z2, a = [...a, [X,Y,Z]]
              X = X3, Y = Y3, Z = Z3, a = [...a, [X,Y,Z]]
              X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              X = X3, Y = Y3, Z = Z3, a = [...a, [X,Y,Z]]
              X = X4, Y = Y4, Z = Z4, a = [...a, [X,Y,Z]]
              X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              X = X4, Y = Y4, Z = Z4, a = [...a, [X,Y,Z]]
              X = X5, Y = Y5, Z = Z5, a = [...a, [X,Y,Z]]
              X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              X = X5, Y = Y5, Z = Z5, a = [...a, [X,Y,Z]]
              X = X1, Y = Y1, Z = Z1, a = [...a, [X,Y,Z]]
              X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
              shape = [...shape, a]
              a = []
              break
          }
        })
      }
      if(sphereize){
        ip1 = sphereize
        ip2 = 1-sphereize
        shape = shape.map(v=>{
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
      return shape
    }

    subDividedIcosahedron  = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Icosahedron(size))
    subDividedTetrahedron  = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Tetrahedron(size))
    subDividedOctahedron   = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Octahedron(size))
    subDividedCube         = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Cube(size))
    subDividedDodecahedron = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Dodecahedron(size))

    stroke = (scol, fcol, lw, dl, oga=1, ocp=true) => {
      if(scol){
        x.strokeStyle = scol
        if(ocp) x.closePath()
        x.lineWidth = Math.min(100, 50/Z*lw)
        if(dl){
          x.globalAlpha = .25 * oga
          x.stroke()
          x.lineWidth/=3
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
    
    spawnMazeSection = (tx_, ty_, tz_, w, h, rl, pt, yw) => {
      let tx, ty, tz
      cl = w | 0
      rw = h | 0
      sp = 3
      a = []
      b = []
      Array(cl*rw).fill().map((v, i) => {
        X = ((i%cl)-cl/2+.5)*sp
        Y = ((i/cl|0)-rw/2+.5)*sp
        Z = 0
        val = !(i%cl) || (i%cl) == cl-1 || !(i/cl|0) || (i/cl|0) == rw-1
        a = [...a, [X, Y, Z, val, i, 0, 0, 0]]
      })
      for(i=cl-1;i--;){
        X1 = a[i][0]
        Y1 = a[i][1]
        Z1 = a[i][2]
        X2 = a[i+1][0]
        Y2 = a[i+1][1]
        Z2 = a[i+1][2]
        b = [...b, [X1,Y1,Z1, X2,Y2,Z2, 0,0,0, 0,0,0, X1,Y1,Z1, X2,Y2,Z2]]
        X1 = a[l=i+cl*(rw-1)][0]
        Y1 = a[l][1]
        Z1 = a[l][2]
        X2 = a[l+1][0]
        Y2 = a[l+1][1]
        Z2 = a[l+1][2]
        b = [...b, [X1,Y1,Z1, X2,Y2,Z2, 0,0,0, 0,0,0, X1,Y1,Z1, X2,Y2,Z2]]
      }
      for(i=rw-1;i--;){
        l1 = i*cl
        l2 = l1+cl
        X1 = a[l1][0]
        Y1 = a[l1][1]
        Z1 = a[l1][2]
        X2 = a[l2][0]
        Y2 = a[l2][1]
        Z2 = a[l2][2]
        b = [...b, [X1,Y1,Z1, X2,Y2,Z2, 0,0,0, 0,0,0, X1,Y1,Z1, X2,Y2,Z2]]
        X1 = a[l1+=cl-1][0]
        Y1 = a[l1][1]
        Z1 = a[l1][2]
        X2 = a[l2+=cl-1][0]
        Y2 = a[l2][1]
        Z2 = a[l2][2]
        b = [...b, [X1,Y1,Z1, X2,Y2,Z2, 0,0,0, 0,0,0, X1,Y1,Z1, X2,Y2,Z2]]
      }
      
      while((l1 = a.filter(v=>v[3]==(Rn()<.02?2:1))).length && (l2 = a.filter(v=>!v[3])).length){
        el1 = l1[Rn()*l1.length|0]
        X1 = el1[0]
        Y1 = el1[1]
        ct2 = 0, cct=false
        do{
          switch(Rn()*4|0){
            case 0:
              X2 = X1 - sp
              Y2 = Y1 + 0
            break
            case 1:
              X2 = X1 + 0
              Y2 = Y1 - sp
            break
            case 2:
              X2 = X1 + sp
              Y2 = Y1 + 0
            break
            case 3:
              X2 = X1 + 0
              Y2 = Y1 + sp
            break
          }
          l2.map(v=>{
            if(!cct){
              tx = v[0]
              ty = v[1]
              if((d = Math.hypot(tx-X2, ty-Y2))<.01){
                v[3]++
                el1[3]++
                cct = true
                b = [...b, [X1,Y1,0, tx,ty,0, 0,0,0, 0,0,0, X1,Y1,0, tx,ty,0]]
              }
            }
          })
          ct2++
        }while(!cct && ct2<10);
      }
      
      return b.map(v=>{
        X = v[0]
        Y = v[1]
        Z = v[2]
        R(rl,pt,yw)
        v[0] = X += tx_
        v[1] = Y += ty_
        v[2] = Z += tz_
        v[12] = X
        v[13] = Y
        v[14] = Z
        X = v[3]
        Y = v[4]
        Z = v[5]
        R(rl,pt,yw)
        v[3] = X += tx_
        v[4] = Y += ty_
        v[5] = Z += tz_
        v[15] = X
        v[16] = Y
        v[17] = Z
        return v
      })
    }

    cl = 32
    maze = spawnMazeSection(0, 0, 0, cl, cl, 0, 0, 0)
    
    circ = []
    sd = 99
    ls_ = ls = cl * (2**.5/2)
    for(i=sd; i--;){
      X = S(p=Math.PI*2/sd*i)*ls
      Y = C(p)*ls
      Z = 0
      circ = [...circ, [X,Y,Z]]
    }
    
    is = []
    maze = maze.filter(v=>{
      X1 = v[0]
      Y1 = v[1]
      X2 = v[3]
      Y2 = v[4]
      d1 = Math.hypot(X1,Y1)
      d2 = Math.hypot(X2,Y2)
      ct = d1>ls?1:0
      ct += d2>ls?3:0
      keep = false
      if(d1<=ls || d2<=ls){
        keep = true
        if(ct == 1 || ct == 3){
          circ.map((n, m)=>{
            l = (m+1)%circ.length
            X3 = n[0]
            Y3 = n[1]
            X4 = circ[l][0]
            Y4 = circ[l][1]
            if(l=I(X1,Y1,X2,Y2,X3,Y3,X4,Y4)){
              tx = l[0]
              ty = l[1]
              is = [...is, [l, Math.atan2(...l)]]
            }
          })          
          if(ct==1){
            v[0] = tx//v[0]/d1*ls
            v[1] = ty//v[1]/d1*ls
            v[12] = v[0]
            v[13] = v[1]
          }else{
            v[3] = tx//v[3]/d2*ls
            v[4] = ty//v[4]/d2*ls
            v[15] = v[3]
            v[16] = v[4]
          }
        }
      }
      return keep
    });
    
    (ar = is.sort((a, b) => a[1] - b[1])).map((v, i) => {
      l = ar[(i+1)%ar.length]
      X1 = v[0][0]
      Y1 = v[0][1]
      X2 = l[0][0]
      Y2 = l[0][1]
      maze = [...maze, [X1,Y1,0, X2,Y2,0, 0,0,0, 0,0,0, X1,Y1,0, X2,Y2,0]]
    })
      
    maze.map((v, i) => {
      X1 = v[0]
      Y1 = v[1]
      X2 = v[3]
      Y2 = v[4]
      if((d=Math.hypot(X2-X1,Y2-Y1)) > sp*1.5){
        steps = Math.floor(d / sp)
        a = []
        for(j=steps; j--;){
          Xa = X1 + (X2-X1)/steps*j
          Ya = Y1 + (Y2-Y1)/steps*j
          Xb = X1 + (X2-X1)/steps*(j+1)
          Yb = Y1 + (Y2-Y1)/steps*(j+1)
          d = Math.hypot(Xa, Ya)
          Xa = Xa / d * ls
          Ya = Ya / d * ls
          d = Math.hypot(Xb, Yb)
          Xb = Xb / d * ls
          Yb = Yb / d * ls
          if(j){
            a = [...a, [Xa,Ya,0, Xb,Yb,0, 0,0,0, 0,0,0, Xa,Ya,0, Xb,Yb,0]]
          }else{
            v[0] = Xa
            v[1] = Ya
            v[3] = Xb
            v[4] = Yb
            v[12] = Xa
            v[13] = Ya
            v[15] = Xb
            v[16] = Yb
          }
        }
        maze = [...maze, ...a]
      }
    })
    
    maze.map((v, i) => {
      X1 = v[12]
      Y1 = v[13]
      X2 = v[15]
      Y2 = v[16]
      v[18] = []
      v[19] = []
      maze.map((q, j) => {
        if(j!=i){
          X3 = q[12]
          Y3 = q[13]
          X4 = q[15]
          Y4 = q[16]
          if((d=Math.hypot(X3-X1,Y3-Y1))<.01){
            v[18] = [...v[18], [j, 0]]
          }
          if((d=Math.hypot(X3-X2,Y3-Y2))<.01){
            v[19] = [...v[19], [j, 0]]
          }
          if((d=Math.hypot(X4-X1,Y4-Y1))<.01){
            v[18] = [...v[18], [j, 1]]
          }
          if((d=Math.hypot(X4-X2,Y4-Y2))<.01){
            v[19] = [...v[19], [j, 1]]
          }
        }
      })
    })
    
    flashes = []
    spawnFlash = (X, Y, Z) => {
      flashes = [...flashes, [X,Y,Z,1]]
    }
    
    iPfreq  = 20
    P       = []
    iPv     = .3
    spawnP  = () => {
      ls2 = (ls_ * .85) * Rn() ** .5
      tx = S(p=Math.PI*2*Rn()) * ls2
      ty = C(p) * ls2
      spawnFlash(tx,ty,0)
      for(m=30;m--;){
        X     = tx
        Y     = ty
        Z     = 0
        theta = Rn()*Math.PI*2
        vx    = S(theta) * iPv
        vy    = C(theta) * iPv
        vz    = 0
        P     = [...P, [X, Y, Z, vx, vy, vz, .5 + Rn()/2, theta, []]]
      }
    }
    
    iSparkv = .05
    sparks  = []
    spawnSparks = (X, Y, Z) => {
      for(m=2; m--;) {
        vx = (Rn()-.5) * iSparkv
        vy = (Rn()-.5) * iSparkv
        vz = (Rn()-.5) * iSparkv
        sparks = [...sparks, [X, Y, Z, vx, vy, vz, 1]]
      }
    }
    iSTc = 1e3
    G = 1e4
    ST = Array(iSTc).fill().map(v=>{
      X = (Rn()-.5) * G
      Y = (Rn()-.5) * G/1.7777
      Z = Rn() * G/2
      return [X,Y,Z]
    })
  }

  x.globalAlpha = 1
  x.fillStyle = `#000c`
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin = x.lineCap = 'butt'

  iPfreq  = Math.max(8, Math.min(30, (.3+C(t/2))*50)) | 0
  if(!((t*60|0)%iPfreq)) spawnP()
  
  oX = 0
  oY = -7 + Math.max(0, Math.min(7, (.3-C(t/2))*10))
  oZ = Math.min(36, Math.max(24, (.3+C(t/4))*50))
  Rl = -t/8
  Pt = Math.max(0, Math.min(.66, (.3+C(t/2))*2))
  Yw = 0

  ST.map((v, i) => {
    X = v[0]
    Y = v[1]
    Z = v[2] -= Math.min(15, Math.max(0, (.3+C(t/2))*20))
    if(Z<0){
      Z = v[2] = G/2
    }
    R(S(t/2)/2,0,0)
    Z += oZ
    if(Z>0){
      l = Q()
      alpha = x.globalAlpha = Math.min(1,Math.max(0,1/(1+Z**20/1e72)*Math.min(1, Z/2e3)*4))
      if(alpha>.05){
        if(!(i%20)){
          s = Math.min(1e4, 3e5/Z**1.25)
          x.drawImage(starImgs[4].img,l[0]-s/2/1.05,l[1]-s/2/1.05,s,s)
          s*=1.5
          x.drawImage(starImgs[0].img,l[0]-s/2,l[1]-s/2,s,s)
        }else{
          s = Math.min(1e4, 2e5/Z**1.25)
          x.drawImage(starImgs[0].img,l[0]-s/2,l[1]-s/2,s,s)
        }
      }
    }
  })

  x.globalAlpha = 1
  homing       = 120
  reflectivity = .075
  drag         = 1.2
  x.globalAlpha = 1
  x.lineJoin = x.lineCap = 'butt'
  maze.map((q, j) => {
    q[18].map((n, m) => {
      ax = q[0]
      ay = q[1]
      az = q[2]
      if(n[1]){
        ax += maze[n[0]][3]
        ay += maze[n[0]][4]
        az += maze[n[0]][5]
        maze[n[0]][3] = q[0] = ax /=2
        maze[n[0]][4] = q[1] = ay /=2
        maze[n[0]][5] = q[2] = az /=2
      }else{
        ax += maze[n[0]][0]
        ay += maze[n[0]][1]
        az += maze[n[0]][2]
        maze[n[0]][0] = q[0] = ax /=2
        maze[n[0]][1] = q[1] = ay /=2
        maze[n[0]][2] = q[2] = az /=2
      }
    })
    q[19].map((n, m) => {
      ax = q[3]
      ay = q[4]
      az = q[5]
      if(n[1]){
        ax += maze[n[0]][3]
        ay += maze[n[0]][4]
        az += maze[n[0]][5]
        maze[n[0]][3] = q[3] = ax /=2
        maze[n[0]][4] = q[4] = ay /=2
        maze[n[0]][5] = q[5] = az /=2
      }else{
        ax += maze[n[0]][0]
        ay += maze[n[0]][1]
        az += maze[n[0]][2]
        maze[n[0]][0] = q[3] = ax /=2
        maze[n[0]][1] = q[4] = ay /=2
        maze[n[0]][2] = q[5] = az /=2
      }
    })
    
    q[6]  /= drag
    q[7]  /= drag
    q[8]  /= drag
    q[9]  /= drag
    q[10] /= drag
    q[11] /= drag
    q[6]  += (q[12]-q[0])/homing
    q[7]  += (q[13]-q[1])/homing
    q[8]  += (q[14]-q[2])/homing
    q[9]  += (q[15]-q[3])/homing
    q[10] += (q[16]-q[4])/homing
    q[11] += (q[17]-q[5])/homing

    X1 = q[0]
    Y1 = q[1]
    Z1 = q[2]
    X2 = q[3]
    Y2 = q[4]
    Z2 = q[5]
    
    x.beginPath()
    X = q[0] += q[6]
    Y = q[1] += q[7]
    Z = q[2] += q[8]
    R(Rl,Pt,Yw,1)
    if(Z>0) x.lineTo(...Q())
    X = q[3] += q[9]
    Y = q[4] += q[10]
    Z = q[5] += q[11]
    R(Rl,Pt,Yw,1)
    if(Z>0) x.lineTo(...Q())
    ax = ((q[12]-q[0]) + (q[15]-q[3]))/2
    ay = ((q[13]-q[1]) + (q[16]-q[4]))/2
    az = ((q[14]-q[2]) + (q[17]-q[5]))/2
    d1 = Math.hypot(ax,ay,az)
    col = `hsla(${d1**3/4+t*400},100%,${Math.max(50, 100-d1*50)}%,1)`
    stroke(col, '', 8, true)
  })
  
  x.lineJoin = 'butt'
  x.lineCap = 'butt'
  runnerWidth = 16
  squirriliness = .25
  reflectivity = .1
  x.globalAlpha = 1
  P = P.filter(v=>v[6] > .1)
  P.map((v, i) => {
    X = v[0]
    Y = v[1]
    Z = v[2]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e3, 1e3/Z*v[6])
      x.drawImage(burst,l[0]-s/2,l[1]-s/2,s,s)
    }
    d = Math.hypot(v[3], v[4])
    p = v[7] = Math.atan2(v[3], v[4]) + (Rn()-.5) * squirriliness
    v[3] = S(p) * d
    v[4] = C(p) * d
    v[8] = [[...v], ...v[8]]
    X1 = X = v[0] + v[3] * 3
    Y1 = Y = v[1] + v[4] * 3
    Z1 = Z = v[2]
    X2 = X - v[3]*3
    Y2 = Y - v[4]*3
    v[8] = v[8].filter(q=>q[6]>.2)
    if(v[8].length){
      x.beginPath()
      X = v[0]
      Y = v[1]
      Z = v[2]
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
      v[8].map((q, j) => {
        X = q[0]
        Y = q[1]
        Z = q[2]
        R(Rl,Pt,Yw,1)
        if(Z>0) {
          l = Q()
          x.lineTo(...l)
          col1 = `hsla(${(360/v[8].length*j)**2/999+t*40}, 99%, ${100 - 50/v[8].length*j}%, ${q[6]**.5})`
          stroke(col1, '', runnerWidth * q[6], true)
          if(j<v[8].length-1){
            x.beginPath()
            x.lineTo(...l)
          }
        }
        q[6]-=.033
      })
    }
    X = v[0] += v[3]
    Y = v[1] += v[4]
    Z = v[2] //+= v[5]
    maze.map(q => {
      X3 = q[0]
      Y3 = q[1]
      X4 = q[3]
      Y4 = q[4]
      if(l=I(X1,Y1,X2,Y2,X3,Y3,X4,Y4)){
        p = Math.atan2(X4-X3, Y4-Y3) + Math.PI/2
        n = [S(p), C(p), 0]
        p = v[7]
        a = [S(p), C(p), 0]
        v_ = reflect(a, n)
        spawnSparks(...l, 0)
        v[0] = l[0] + v_[0] * iPv * .2
        v[1] = l[1] + v_[1] * iPv * .2
        v[3] = v_[0] * iPv
        v[4] = v_[1] * iPv
        q[6] -= v_[0] * reflectivity
        q[7] -= v_[1] * reflectivity
        q[9] -= v_[0] * reflectivity
        q[10] -= v_[1] * reflectivity
        
        v[7] = Math.atan2(v[3],v[4])
      }
    })
    v[6] -= .01
  })
  
  sparks = sparks.filter(v=>v[6]>0)
  sparks.map(v=>{
    X = v[0] += v[3]
    Y = v[1] += v[4]
    Z = v[2] += v[5]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e3, 1e3/Z*v[6])
      x.fillStyle = '#4400ff06'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      s/=2.5
      x.fillStyle = '#00ffff12'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      s/=2.5
      x.fillStyle = '#ffffffff'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
    }
    v[6] -= .025
  })
 
  flashes = flashes.filter(v=>v[3]>0)
  flashes.map(v=>{
    X = v[0]
    Y = v[1]
    Z = v[2]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e4, 2e4/Z*v[3])
      x.drawImage(starImgs[4].img,l[0]-s/2/1.05,l[1]-s/2/1.05,s,s)
      s*=1.5
      x.drawImage(starImgs[0].img,l[0]-s/2,l[1]-s/2,s,s)
    }
    v[3] -= .1
  })
 
  t+=1/60
  requestAnimationFrame(Draw)
}
Draw()