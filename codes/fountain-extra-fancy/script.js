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
    throwing = false
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
    
    Rl = Pt = Yw = oX = oY = oZ = 0
    
    P = []
    iPfreq = 0
    iPv = 1.1
    variance = .11
    grav = .02
    spawnP = () => {
      ls = 8
      for(m=1; m--;){
        X = C(t*20) * Math.min(1, Math.max(0, (-.5+C(t/4+1))*3)) * 16
        Y = -1
        Z = -60
        if(Rn()<1) spawnFlash(X,Y,Z)
        vx = (Rn()-.5) * variance/9
        vy = -Rn() * variance
        vz = iPv + (Rn()-.5) * variance
        P = [...P, [X, Y ,Z, vx, vy, vz,1]]
      }
    }
    
    oXv = oYv = oZv = ax_ = ay_ = az_ = 0
    oZ_ = 0

    cl = 24
    rw = 24
    br = 1
    sp = 6
    
    terrain = []
    Array(cl*rw*br).fill().map((v, i) => {
      a = []
      tx = ((i%cl) - cl/2 + .5) * sp
      ty = ((i/cl/rw|0) - br/2 + .5) * sp
      tz = (((i/cl|0)%rw) - rw/2 + .5) * sp
      switch(10){//Rn()*24|0){
        case 0:
          type = 0
          ls = sp * 2**.5/2
          for(j=4; j--;){
            b = []
            X = S(p=Math.PI*2/4*j+Math.PI/4) * ls
            Y = 0
            Z = C(p) * ls
            b = [...b, [X, Y, Z]]
            X = S(p=Math.PI*2/4*(j+1)+Math.PI/4) * ls
            Y = 0
            Z = C(p) * ls
            b = [...b, [X, Y, Z]]
            X = 0
            Y = -sp/1.5
            Z = 0
            b = [...b, [X, Y, Z]]
            col = '#fb08'
            a = [...a, [b, col, type, tx, ty, tz]]
          }
        break
        /*case 1: case 2: case 3:
          type = 1
          rl = Rn()*Math.PI
          sel = Rn()**1.25*trees.length|0
          col = sel ? `hsla(${60 + Rn()*120},99%,50%,.4)` : '#11ff2240'
          scl = sel ? .25 + .5 * Rn() : .4 + Rn() * .4
          b = structuredClone(trees[sel]).map(v=>{
            return [v.map(q=>{
              X = q[0]
              Y = q[1]
              Z = q[2]
              R(0,0,rl)
              X *= scl
              Y *= scl
              Z *= scl
              return [X, Y, Z]
            }), col, type, tx, ty, tz]
          })
          a = [...a, ...b]
          b = []
          ls = sp * 2**.5/2
          for(j=4; j--;){
            X = S(p=Math.PI*2/4*j+Math.PI/4) * ls
            Y = 0
            Z = C(p) * ls
            b = [...b, [X, Y, Z]]
          }
          col = `hsla(${30 + Rn()*120},99%,25%,.4)`
          a = [...a, [b, col, 2, tx, ty, tz]]
        break*/
        default:
          type = 2
          b = []
          ls = sp * 2**.5/2
          for(j=4; j--;){
            X = S(p=Math.PI*2/4*j+Math.PI/4) * ls
            Y = 0
            Z = C(p) * ls
            b = [...b, [X, Y, Z]]
          }
          col = `hsla(${30 + Rn()*120},99%,25%,.2)`
          a = [...a, [b, col, type, tx, ty, tz]]
        break
      }
      terrain = [...terrain, ...a]
    })
    
    base_shp = (await loadOBJ('https://srmcgann.github.io/temp13/reflector.obj', 8, 0,.05,-42, 0,0,Math.PI, recenter=false)).map(v=>{
      return [v, 0]
    })

    shps = [
      structuredClone(base_shp).map(v=>{
        ax = ay = az = 0
        v[0].map(q=>{
          ax += X = q[0]
          ay += Y = q[1]
          az += Z = q[2]
          //R(0,0,Math.PI)
          q[0] = X
          q[1] = Y
          q[2] = Z + 0
        })
        v[2] = ax /= v[0].length
        v[3] = ay /= v[0].length
        v[4] = az /= v[0].length
        return v
      }),
      structuredClone(base_shp).map(v=>{
        ax = ay = az = 0
        v[0].map(q=>{
          ax += X = q[0]
          ay += Y = q[1]
          az += Z = q[2]
          R(0,0,Math.PI)
          q[0] = X
          q[1] = Y
          q[2] = Z - 0
        })
        v[2] = ax /= v[0].length
        v[3] = ay /= v[0].length
        v[4] = az /= v[0].length
        return v
      }),
    ]

    flashes = []
    spawnFlash = (X,Y,Z,mag=1) => {
      flashes = [...flashes, [X,Y,Z,mag]]
    }
    sparks = []
    iSparkv = .15
    spawnSparks = (X, Y, Z) => {
      for(let m = 2; m--;) {
        vx = (Rn()-.5) * iSparkv
        vy = -Rn() * iSparkv
        vz = (Rn()-.5) * iSparkv
        sparks = [...sparks, [X,Y,Z,vx,vy,vz,1]]
      }
    }
    bounding = subDividedDodecahedron(1e3,3,1)
  }

  //x.globalAlpha = .25
  //x.drawImage(bg,0,0,c.width,c.height)
  x.globalAlpha = 1
  x.fillStyle   = `#000c`
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin    = x.lineCap = 'roud'
  
  oX  = 0
  oY  = 4
  oZ  = Math.min(80, Math.max(48, (.3 + C(t/1.5))* 100))
  Rl  = 0
  Pt  = Math.min(-.01, Math.max(-Math.PI/2+.25,(.3+C(t/3))*Math.PI))
  Yw  = Math.min(Math.PI*1.5, Math.max(0, (.3+C(t/8))*Math.PI*3))

  bounding.map(v=>{
    x.beginPath()
    v.map(q=>{
      X = q[0]
      Y = q[1]
      Z = q[2]
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
    })
    col1 = '#62f5'
    col2 = '#40f2'
    stroke(col1, col2, 15, false)
  })

  iPfreq = Math.min(30, Math.max(2, (.8+C(t*2-.5))*50))|0
  if(!((t*60|0)%iPfreq)) spawnP()

  terrain.map((v, i) => {
    x.beginPath()
    v[3] += oXv
    v[5] += oZv
    if(v[3] > sp*rw/2) v[3]-=sp*rw
    if(v[3] < -sp*rw/2) v[3]+=sp*rw
    if(v[4] +oY > sp*rw/2) v[4]-=sp*rw
    if(v[4] +oY < -sp*rw/2) v[4]+=sp*rw
    if(v[5] > sp*rw/2) v[5]-=sp*rw
    if(v[5] < -sp*rw/2) v[5]+=sp*rw
    v[0].map(q => {
      X = q[0] + v[3]
      Y = q[1] + v[4]
      Z = q[2] + v[5]
      //Y += oY - 0
      //Y += 6
      R(Rl,Pt,Yw,1)
      Z += oZ_
      if(Z>0) x.lineTo(...Q())
    })
    col1 = v[2] == 0 ? '#ff0' : ''
    col2 = v[2] == 2 ? `hsla(${240 + (i**2%40)+t*40},50%,20%,1)` : v[1]
    oga = 1 / (1+(1+Math.hypot(v[3], v[5]))**10/1e17) * (1 - Math.abs(v[4]+oY)/(sp*rw/2))
    if(oga>.05){
      stroke(col1, col2, 3, true, oga)
    }
    
    if(v[2] == 0){
      for(j=40;j--;){
        x.beginPath()
        X = v[3]
        Y = v[4] - (j+1) - 1.333
        Z = v[5]
        //Y += oY - 0
        //Y += 6
        R(Rl,Pt,Yw,1)
        Z += oZ_
        if(Z>0) x.lineTo(...Q())
        X = v[3]
        Y = v[4] - j - 1.333
        Z = v[5]
        //Y += oY - 0
        //Y += 6
        R(Rl,Pt,Yw,1)
        Z += oZ_
        if(Z>0) {
          x.lineTo(...Q())
          col1 = `hsla(${i*99+t*15000+j*20},99%,66%,1)`
          x.lineJoin    = x.lineCap = 'butt'
          stroke(col1, '', 4/(1+j), true, oga)
          if(j==3){
            l = Q()
            s = Math.min(1e4, 3e3/Z * (1+C(t*60+i)/4))
            x.globalAlpha = oga
            x.drawImage(starImgs[4].img,l[0]-s/2/1.05,l[1]-s/2/1.02,s,s)
          }
        }
      }
    }
  })
  x.globalAlpha = 1

  shps.map((shp, sidx) => {
    vecs = Array(shp.length).fill(0)
    shp.map((v, i) => {
      ax = v[2]
      ay = v[3]
      az = v[4]
      ac = 0
      av = v[1]
      shp.map((q, j) => {
        if(j != i){
          ax2 = q[2]
          ay2 = q[3]
          az2 = q[4]
          if((d=Math.hypot(ax2-ax, ay2-ay, az2-az))<8){
            ac ++
            av += q[1] / (1+d**4/999999999999)
          }
        }
      })
      vecs[i] = av /= ac
      
      x.beginPath()
      v[0].map(q=>{
        X = q[0]
        Y = q[1]
        Z = q[2]
        R(Rl,Pt,Yw,1)
        if(Z>0) x.lineTo(...Q())
      })
      col1 = `hsla(${v[1]*50 + t*100},99%,${75+v[1]*12}%,${.15+v[1]*1})`
      col2 = `hsla(${v[1]*50+50 + t*100},99%,${50+v[1]*10}%,${(.1+v[1]/1)*.2})`
      stroke(col1, col2, 1, false)
      v[1] /= 1.4 - (sidx ? .2 : 0)
    })
    shp.map((v, i) => {
      v[1] = vecs[i]
    })
  })

  P = P.filter(v => v[6] > 0)
  P.map((v, i) => {
    d = Math.hypot(v[3], v[4], v[5])
    vx = v[3] / d
    vy = v[4] / d
    vz = v[5] / d
    vx *= .1
    vy *= .1
    vz *= .1
    X1 = v[0] - vx
    Y1 = v[1] - vy - .03
    Z1 = v[2] - vz
    X2 = v[0] + v[3] * 2
    Y2 = v[1] + v[4] * 2 + .2
    Z2 = v[2] + v[5] * 2
    shps.map((shp, sidx) => {
      shp.map((q, j) => {
        ax = ay = az = 0
        q[0].map(n=>{
          ax += n[0]
          ay += n[1]
          az += n[2]
        })
        ax /= q[0].length
        ay /= q[0].length
        az /= q[0].length
        if(Math.hypot(ax-(X1+X2)/2, ay-(Y1+Y2)/2, az-(Z1+Z2)/2)<2.5){
          if(l = lineFaceI(X1,Y1,Z1,X2,Y2,Z2, q[0])){
            if(Rn()<.6) spawnSparks(...l[0])
            shps[sidx][j][1] += 24
            r = reflect([v[3], v[4], v[5]], l[1])
            v[3] /= 2.95
            v[4] /= 2.95
            v[5] /= 2.95
            v[3] += r[0] * .685 //= 1.000025
            v[4] += r[1] * .685 //= 1.000025
            v[5] += r[2] * .685 //= 1.000025
            v[4] -= .0333
          }
        }
      })
    })
    X = v[0] += v[3]
    Y = v[1] += v[4] += grav
    Z = v[2] += v[5]
    if(Y > 0){
      v[3] *= .99
      v[4] = -Math.abs(v[4]) * .5
      v[5] *= .99
    }
    Y = v[1] = Math.min(0, v[1])
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e3, 1e4/Z*v[6]**.5)
      x.fillStyle = `hsla(${Y1*16-50 + t*150},99%,50%,.04)`
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      s/=3
      x.fillStyle = `hsla(${Y1*16 + t*150},99%,50%,.1)`
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      s/=3.5
      x.fillStyle = '#ffffffff'
      x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
    }
    v[6] -= .004
  })
  

  sparks = sparks.filter(v=>v[6]>0)
  sparks.map(v => {
    X = v[0] += v[3]
    Y = v[1] += v[4]
    Z = v[2] += v[5]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e3, 3e3/Z*v[6])
      x.fillStyle = '#ff000008'
      x.fillRect(l[0]-s/2, l[1]-s/2,s,s)
      s/=3
      x.fillStyle = '#ff880016'
      x.fillRect(l[0]-s/2, l[1]-s/2,s,s)
      s/=3
      x.fillStyle = '#ffffffff'
      x.fillRect(l[0]-s/2, l[1]-s/2,s,s)
    }
    v[6] -= .02
  })

  x.globalAlpha = 1
  flashes = flashes.filter(v=>v[3]>0)
  flashes.map(v=>{
    X = v[0]
    Y = v[1]
    Z = v[2]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      l = Q()
      s = Math.min(1e4, 1e4*v[3]/Z)
      x.drawImage(starImgs[4].img, l[0]-s/2/1.05, l[1]-s/2/1.05, s, s)
      s*=2
      x.drawImage(starImgs[0].img, l[0]-s/2, l[1]-s/2, s, s)
    }
    v[3] -= .075
  })

  t+=1/60
  requestAnimationFrame(Draw)
}
Draw()