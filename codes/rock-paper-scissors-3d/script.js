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
    oX = oY = oZ = 0
    Rn = Math.random
    R = (Rl,Pt,Yw,m) => {
      let p
      M = Math
      A = M.atan2
      H = M.hypot
      X = S(p=A(X,Z)+Yw) * (d=H(X,Z))
      Z = C(p)*d
      Y = S(p=A(Y,Z)+Pt) * (d=H(Y,Z))
      Z = C(p)*d
      X = S(p=A(X,Y)+Rl) * (d=H(X,Y))
      Y = C(p) * d
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

    Q = () => [c.width/2+X/Z*700, c.height/2+Y/Z*700]
    I=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0
    
    Normal = (facet, autoFlipNormals=false, X1=0, Y1=0, Z1=0, flip_=false) => {
      let ax = 0, ay = 0, az = 0
      facet.map(q_=>{ ax += q_[0], ay += q_[1], az += q_[2] })
      ax /= facet.length, ay /= facet.length, az /= facet.length
      let b1 = facet[2][0]-facet[1][0], b2 = facet[2][1]-facet[1][1], b3 = facet[2][2]-facet[1][2]
      let c1 = facet[1][0]-facet[0][0], c2 = facet[1][1]-facet[0][1], c3 = facet[1][2]-facet[0][2]
      crs = [b2*c3-b3*c2,b3*c1-b1*c3,b1*c2-b2*c1]
      d = Math.hypot(...crs)+.0001
      let nls = 1 //normal line length
      crs = crs.map(q=>q/d*nls)
      let X1_ = ax, Y1_ = ay, Z1_ = az
      let flip = 1
      if(autoFlipNormals){
        let d1_ = Math.hypot(X1_-X1,Y1_-Y1,Z1_-Z1)
        let d2_ = Math.hypot(X1-(ax + crs[0]/99),Y1-(ay + crs[1]/99),Z1-(az + crs[2]/99))
        flip = d2_>d1_?-1:1
      }
      if(flip_) flip *=-1
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
          res=[...res, structuredClone(e)]
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

    burst1 = new Image()
    burst1.src = "https://srmcgann.github.io/temp/burst1.png"

    burst2 = new Image()
    burst2.src = "https://srmcgann.github.io/temp/burst2.png"

    burst3 = new Image()
    burst3.src = "https://srmcgann.github.io/temp/burst3.png"

    burst4 = new Image()
    burst4.src = "https://srmcgann.github.io/temp/burst4.png"

    burstz = [ burst1, burst2, burst3, burst4]
    //burstz = [ burst, burst, burst, burst]
    
    sphere_monochrome = new Image()
    sphere_monochrome.src = 'https://srmcgann.github.io/temp13/sphere_monochrome.png'
    
    /*sphere1 = new Image()
    sphere1.src = 'https://srmcgann.github.io/temp13/sphere_colorful_1.png'

    sphere2 = new Image()
    sphere2.src = 'https://srmcgann.github.io/temp13/sphere_colorful_2.png'

    sphere3 = new Image()
    sphere3.src = 'https://srmcgann.github.io/temp13/sphere_colorful_3.png'

    sphere4 = new Image()
    sphere4.src = 'https://srmcgann.github.io/temp13/sphere_colorful_4.png'*/
    
    spherez = [ sphere_monochrome,  sphere_monochrome,  sphere_monochrome,  sphere_monochrome,  ]

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

    Pip = (tx,ty,tz, facet) => {
      let ax=0
      let ay=0
      facet.map((v, i) => {
        ax+=v[0]
        ay+=v[1]
      })
      ax /= facet.length
      ay /= facet.length
      let X1 = ax
      let Y1 = ay
      let X2 = tx
      let Y2 = ty
      let ct = 0
      let l
      facet.map((v,i) => {
        let l1 = i
        let l2 = (i+1)%facet.length
        let X3 = facet[l1][0]
        let Y3 = facet[l1][1]
        let X4 = facet[l2][0]
        let Y4 = facet[l2][1]
        if(l=I(X1,Y1,X2,Y2,X3,Y3,X4,Y4)) ct++
      })
      return [ct == 0, [tx-ax, ty-ay]]
    }

    lineFaceI = (X1, Y1, Z1, X2, Y2, Z2, facet, autoFlipNormals=false, showNormals=false) => {
      let X_, Y_, Z_, d, m, l_,K,J,L,p
      let I_=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0
      let Q_= () => [c.width/2+X_/Z_*700, c.height/2+Y_/Z_*700]
      let R_ = (Rl,Pt,Yw,m)=>{
        let M=Math, A=M.atan2, H=M.hypot
        X_ = S(p=A(X_,Z_)+Yw) * (d=H(X_,Z_))
        Z_ = C(p)*d
        X_ = S(p=A(X_,Y_)+Rl) * (d=H(X_,Y_))
        Y_ = C(p) * d
        Y_ = S(p=A(Y_,Z_)+Pt) * (d=H(Y_,Z_))
        Z_ = C(p)*d
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
      let nls = .25 //normal line length
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
        X = S(p=Math.PI*2/6*i+Math.PI/6)
        Y = C(p)
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
        b = [...b, [X,Y,Z]]
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

    StellatedDodecahedron = size => {
      let a = []
      let core = subDividedIcosahedron(size).map((v, i) => {
        ax = ay = az = 0
        v.map(q => {
          ax += q[0]
          ay += q[1]
          az += q[2]
        })
        ax /= v.length
        ay /= v.length
        az /= v.length
        d = Math.hypot(ax,ay,az)
        ls = d * 4.5 / size
        v.map((q, j)=>{
          b = []
          l1 = j
          l2 = (j+1)%v.length
          X = v[l1][0]
          Y = v[l1][1]
          Z = v[l1][2]
          b = [...b, [X,Y,Z]]
          X = v[l2][0]
          Y = v[l2][1]
          Z = v[l2][2]
          b = [...b, [X,Y,Z]]
          X = ax*ls
          Y = ay*ls
          Z = az*ls
          b = [...b, [X,Y,Z]]
          a = [...a, b]
        })
        return v
      })
      
      maxd = -1e6
      a.map(v=>{
        v.map(q=>{
          X = q[0]
          Y = q[1]
          Z = q[2]
          if((d = Math.hypot(X,Y,Z))>maxd) maxd = d
        })
      })
      
      return a.map(v => {
        v.map(q => {
          X = q[0]
          Y = q[1]
          Z = q[2]
          d = Math.hypot(X,Y,Z)
          q[0] /= maxd
          q[1] /= maxd
          q[2] /= maxd
          q[0] *= size
          q[1] *= size
          q[2] *= size
        })
        return v
      })
    }

    Cube = size => {
      for(CB=[],j=6;j--;CB=[...CB,b])for(b=[],i=4;i--;)b=[...b,[(a=[S(p=Math.PI*2/4*i+Math.PI/4),C(p),2**.5/2])[j%3]*(l=j<3?size/2**.5:-size/2**.5),a[(j+1)%3]*l,a[(j+2)%3]*l]]
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

    subbed = (subs, size, sphereize, shape, shapeName='') => {
      let X1, Y1, Z1, X2, Y2, Z2, X3, Y3, Z3, X4, Y4, Z4, mx1, my1, mz1
      let cx, cy, cz, X5, Y5, Z5, mx2, my2, mz2, mx3, my3, mz3, a
      let l, X6, Y6, Z6, mx5, my5, mz5, mx6, my6, mz6, depth
      depth = 0
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
            if(v.length > 5){
              l = 5
              X6 = v[l][0]
              Y6 = v[l][1]
              Z6 = v[l][2]
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
              break
            case 6:
              cx = (X1+X2+X3+X4+X5+X6)/6
              cy = (Y1+Y2+Y3+Y4+Y5+Y6)/6
              cz = (Z1+Z2+Z3+Z4+Z5+Z6)/6
              mx3 = (X3+X4)/2
              my3 = (Y3+Y4)/2
              mz3 = (Z3+Z4)/2
              mx4 = (X4+X5)/2
              my4 = (Y4+Y5)/2
              mz4 = (Z4+Z5)/2
              mx5 = (X5+X4)/2
              my5 = (Y5+Y4)/2
              mz5 = (Z5+Z4)/2
              mx6 = (X6+X1)/2
              my6 = (Y6+Y1)/2
              mz6 = (Z6+Z1)/2
              switch(shapeName){
                case 'TruncatedOctahedron':
                  a = []
                  X = X1, Y = Y1, Z = Z1, a = [...a, [X,Y,Z]]
                  X = X2, Y = Y2, Z = Z2, a = [...a, [X,Y,Z]]
                  X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
                  if(depth){
                    shape = [...shape, a]
                  }else{
                    shape = [...shape, ...subbed(1, size, 0, [structuredClone(a)])]
                  }
                  a = []
                  X = X2, Y = Y2, Z = Z2, a = [...a, [X,Y,Z]]
                  X = X3, Y = Y3, Z = Z3, a = [...a, [X,Y,Z]]
                  X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
                  if(depth){
                    shape = [...shape, a]
                  }else{
                    shape = [...shape, ...subbed(1, size, 0, [structuredClone(a)])]
                  }
                  a = []
                  X = X3, Y = Y3, Z = Z3, a = [...a, [X,Y,Z]]
                  X = X4, Y = Y4, Z = Z4, a = [...a, [X,Y,Z]]
                  X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
                  if(depth){
                    shape = [...shape, a]
                  }else{
                    shape = [...shape, ...subbed(1, size, 0, [structuredClone(a)])]
                  }
                  a = []
                  X = X4, Y = Y4, Z = Z4, a = [...a, [X,Y,Z]]
                  X = X5, Y = Y5, Z = Z5, a = [...a, [X,Y,Z]]
                  X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
                  if(depth){
                    shape = [...shape, a]
                  }else{
                    shape = [...shape, ...subbed(1, size, 0, [structuredClone(a)])]
                  }
                  a = []
                  X = X5, Y = Y5, Z = Z5, a = [...a, [X,Y,Z]]
                  X = X6, Y = Y6, Z = Z6, a = [...a, [X,Y,Z]]
                  X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
                  if(depth){
                    shape = [...shape, a]
                  }else{
                    shape = [...shape, ...subbed(1, size, 0, [structuredClone(a)])]
                  }
                  a = []
                  X = X6, Y = Y6, Z = Z6, a = [...a, [X,Y,Z]]
                  X = X1, Y = Y1, Z = Z1, a = [...a, [X,Y,Z]]
                  X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
                  if(depth){
                    shape = [...shape, a]
                  }else{
                    shape = [...shape, ...subbed(1, size, 0, [structuredClone(a)])]
                  }
                break
                default:
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
                  X = X6, Y = Y6, Z = Z6, a = [...a, [X,Y,Z]]
                  X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
                  shape = [...shape, a]
                  a = []
                  X = X6, Y = Y6, Z = Z6, a = [...a, [X,Y,Z]]
                  X = X1, Y = Y1, Z = Z1, a = [...a, [X,Y,Z]]
                  X = cx, Y = cy, Z = cz, a = [...a, [X,Y,Z]]
                  shape = [...shape, a]
                break
              }

              a = []
              break
          }
        })
        depth++
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
            X *= size/2*ip1 + d*ip2
            Y *= size/2*ip1 + d*ip2
            Z *= size/2*ip1 + d*ip2
            return [X,Y,Z]
          })
          return v
        })
      }
      return shape
    }

    subDividedIcosahedron           = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Icosahedron(size))
    subDividedTetrahedron           = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Tetrahedron(size))
    subDividedOctahedron            = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Octahedron(size))
    subDividedCube                  = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Cube(size))
    subDividedDodecahedron          = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Dodecahedron(size))
    subDividedTruncatedOctahedron   = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, TruncatedOctahedron(size), 'TruncatedOctahedron')
    subDividedStellatedDodecahedron = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, StellatedDodecahedron(size))

    stroke = (scol, fcol, lw, dl, oga=1, ocp=true) => {
      if(scol){
        x.strokeStyle = scol
        if(ocp) x.closePath()
        x.lineWidth = Math.min(200, 50/Z*lw)
        if(dl){
          x.globalAlpha = .33 * oga
          x.stroke()
          x.lineWidth/=4
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
    
    drawRotatedImage = (img,tx,ty,w,h,theta)=>{
      x.save()
      x.translate(tx,ty)
      x.rotate(theta)
      x.drawImage(img,-w/2,-h/2,w,h)
      x.restore()
    }
    
    drawItem = (item, size, tx, ty, tz, theta) => {
      X = tx
      Y = ty
      Z = tz
      R(Rl,Pt,Yw,1)
      if(Z>0){
        x.globalAlpha = .95
        l = Q()
        switch(item){
          case 'rock':
            s = 450 * size * pls * .9
            w = rock.width * (s/rock.width) / Z
            h = rock.height * (s/rock.width) / Z
            drawRotatedImage(rock, l[0] - w/2, l[1]-h/2, w, h, theta)
          break
          case 'paper':
            s = 350 * size * pls * .9
            w = paper.width * (s/paper.width) / Z
            h = paper.height * (s/paper.width) / Z
            drawRotatedImage(paper, l[0] - w/2, l[1]-h/2, w, h, theta)
          break
          case 'scissors':
            s = 600 * size * pls * .9
            w = scissors.width * (s/scissors.width) / Z
            h = scissors.height * (s/scissors.width) / Z
            drawRotatedImage(scissors, l[0] - w/2, l[1]-h/2, w, h, theta)
          break
        }
        x.globalAlpha = 1
      }
    }
    
    Rl = Pt = Yw = oX = oY = oZ = 0
    
    flashes = []
    spawnFlash = (X,Y,Z,mag=1, id) => {
      flashes = [...flashes, [X,Y,Z,mag,id]]
    }
    
    rock = new Image()
    rock.src = 'https://srmcgann.github.io/temp14/rock.png'
    paper = new Image()
    paper.src = 'https://srmcgann.github.io/temp14/lined_paper_bold_outline.jpg'
    scissors = new Image()
    scissors.src = 'https://srmcgann.github.io/temp14/scissors.png'
    
    init = () =>{
      ppt  = 120
      prad = 40
      pls  = 1
      pv   = .2
      prv  = .1
      env = []
      ct_ = 0
      do{
        ct = 0
        let tx, ty, tz
        do{
          ls = Rn()**.5 * prad
          tx = S(p=Math.PI*2*Rn()) * S(q=Rn()<.5?Math.PI/2*Rn()**.5:Math.PI-Math.PI/2*Rn()**.5) * ls
          ty = C(q) * ls
          tz = C(p) * S(q) * ls
          //tx = S(p=Math.PI*2*Rn()) * ls
          //ty = C(p) * ls
          //tz = 0
          mind = 6e6
          env.map(v => {
            X1 = v[0]
            Y1 = v[1]
            Z1 = v[2]
            if((d=Math.hypot(X1-tx, Y1-ty, Z1-tz)) < mind) mind = d
          })
          ct++
        }while(mind < pls && ct<50);
        vx = vy = vz = 0
        if(ct!=1e3){
          env.push([tx, ty, tz, vx, vy, vz, env.length%3, Rn()*Math.PI*2, (Rn()-.5) * prv])
          ct_ = 0
        }else{
          ct_++
        }
      }while(env.length<(ppt*3) && ct_<50);
    }
    init()
    
    imgmaps = ['rock', 'paper', 'scissors']
    
    bounding = subDividedCube(100,4,1)

    sparks = []
    iSparkv = .05
    spawnSparks = (X, Y, Z) => {
      for(let m = 1; m--;) {
        vx = (Rn()-.5) * iSparkv
        vy = (Rn()-.5) * iSparkv
        vz = (Rn()-.5) * iSparkv
        sparks = [...sparks, [X,Y,Z,vx,vy,vz,1]]
      }
    }
  }

  //x.globalAlpha = .25
  //x.drawImage(bg,0,0,c.width,c.height)
  x.globalAlpha = 1
  x.fillStyle   = `#000c`
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin    = x.lineCap = 'roud'

  oX  = 0
  oY  = 0
  oZ  = Math.min(40, Math.max(24, (.3+C(t/2))*100))
  Rl  = 0
  Pt  = -t/3
  Yw  = t/8
  
  bounding.map(v=>{
    x.beginPath()
    v.map(q=>{
      X = q[0]
      Y = q[1]
      Z = q[2]
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
    })
    col1 = '#ffffff20'
    col2 = ''
    stroke(col1, col2, 6, true)
  })
  
  sparks = sparks.filter(v=>v[6]>0)
  sparks.map(v => {
    X = v[0] += v[3]
    Y = v[1] += v[4]
    Z = v[2] += v[5]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e3, 1e3/Z*v[6])
      x.fillStyle = '#ff000008'
      x.fillRect(l[0]-s/2, l[1]-s/2,s,s)
      s/=3
      x.fillStyle = '#ff880016'
      x.fillRect(l[0]-s/2, l[1]-s/2,s,s)
      s/=3
      x.fillStyle = '#ffffffff'
      x.fillRect(l[0]-s/2, l[1]-s/2,s,s)
    }
    v[6] -= .05
  })

  forSort = []
  env.map((v, i) => {
    X1 = v[0]
    Y1 = v[1]
    Z1 = v[2]
    minda = 6e6
    tidxa = -1
    mindb = 6e6
    tidxb = -1
    vx_ = v[3]
    vy_ = v[4]
    vz_ = v[5]
    env.map((q, j) => {
      if(i!=j){
        if(q[6] == (v[6]+1)%3){
          X2 = q[0]
          Y2 = q[1]
          Z2 = q[2]
          if((d=Math.hypot(X2-X1, Y2-Y1, Z2-Z1)) < minda){
            tidxa = j
            minda = d
            if(minda < pls*2) {
              v[6] = q[6]
              spawnFlash((X1+X2)/2, (Y1+Y2)/2, (Z1+Z2)/2, 1, q[6])
            }
          }
        }
        if((q[6]+1)%3 == v[6]){
          X2 = q[0]
          Y2 = q[1]
          Z2 = q[2]
          if((d=Math.hypot(X2-X1, Y2-Y1, Z2-Z1)) < mindb){
            tidxb = j
            mindb = d
            if(mindb < pls*2) {
              q[6] = v[6]
              spawnFlash((X1+X2)/2, (Y1+Y2)/2, (Z1+Z2)/2, 1, v[6])
            }
          }
        }
        if(q[6] == v[6]){
          X2 = q[0]
          Y2 = q[1]
          Z2 = q[2]
          if((d=Math.hypot(a = X2-X1, b = Y2-Y1, e = Z2-Z1)) < pls*1){
            d+=.00001
            //v[0] = X2 - a / d * pls*2
            //v[1] = Y2 - b / d * pls*2
            vx_ -= a / d * pv*50
            vy_ -= b / d * pv*50
            vz_ -= e / d * pv*50
            spawnSparks((X1+X2)/2, (Y1+Y2)/2, (Z1+Z2)/2, v[6])
          }
        }
      }
    })
    
    pvmod = 0
    
    if(tidxa != -1){
      tgt = env[tidxa]
      X2 = tgt[0]
      Y2 = tgt[1]
      Z2 = tgt[2]
      d = Math.hypot(a = X2-X1, b = Y2-Y1, e = Z2-Z1) + .00001
      vx = a/d
      vy = b/d
      vz = e/d
      vx_ -= vx
      vy_ -= vy
      vz_ -= vz
      pvmod += 0
    }
    if(tidxb != -1){
      tgt = env[tidxb]
      X2 = tgt[0]
      Y2 = tgt[1]
      Z2 = tgt[2]
      d = Math.hypot(a = X2-X1, b = Y2-Y1, e = Z2-Z1) + .00001
      vx = a/d
      vy = b/d
      vz = e/d
      vx_ += vx
      vy_ += vy
      vz_ += vz
      pvmod += .1
    }

    vx_ -= v[0]/75
    vy_ -= v[1]/75
    vz_ -= v[2]/75
    d = Math.hypot(vx_, vy_, vz_) + .00001
    vx_ /= d
    vy_ /= d
    vz_ /= d
    v[3] = vx_ *= pv + pvmod
    v[4] = vy_ *= pv + pvmod
    v[5] = vz_ *= pv + pvmod

    X_ = X = v[0] += v[3] += (Rn()-.5)/99
    Y_ = Y = v[1] += v[4] += (Rn()-.5)/99
    Z_ = Z = v[2] += v[5] += (Rn()-.5)/99
    
    v[7] += v[8]
    R(Rl,Pt,Yw,1)
    forSort = [...forSort, [Z, v[6], X_,  Y_,  Z_, v[7]]]
  })
  
  forSort.sort((a, b) => b[0] - a[0]).map(v=>{
    X = v[2]
    Y = v[3]
    Z = v[4]
    drawItem(imgmaps[v[1]], 2, X, Y, Z, v[5])
  })
  
  cts = [0,0,0]
  env.map(v=>{
    cts[v[6]]=true
  })
  
  
  sidx_ = [2,7,4]
  
  x.globalAlpha = 1
  flashes = flashes.filter(v=>v[3]>0)
  flashes.map(v => {
    X = v[0]
    Y = v[1]
    Z = v[2]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e4, 2e3*v[3]/Z)
      x.drawImage(starImgs[sidx_[v[4]]].img, l[0]-s/2/1.05, l[1]-s/2/1.05, s, s)
      //s*=2
      //x.drawImage(starImgs[0].img, l[0]-s/2, l[1]-s/2, s, s)
    }
    v[3] -= .15
  })

  if(cts.filter(v=>v).length == 1) init()
  
  t+=1/60
  requestAnimationFrame(Draw)
}
Draw()