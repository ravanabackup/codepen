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
      Y = S(p=A(Y,Z)+Pt) * (d=H(Y,Z))
      Z = C(p)*d
      X = S(p=A(X,Z)+Yw) * (d=H(X,Z))
      Z = C(p)*d
      if(m){
        X+=oX
        Y+=oY
        Z+=oZ
      }
    }
    
    Q = () => [c.width/2+X/Z*700, c.height/2+Y/Z*700]
    I=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0
    
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
        x.lineWidth = 100/Z*lw
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
    
    init = () => {
      cl  = 50
      rw  = 50
      br  = 3
      sp  = 1
      lsp = 4
      vsp = 20
      vh  = 5

      B = []
      P = []
      for(m=br; m--;){
        a = []
        b = []
        for(i=99;i--;){
          X = (-cl/2+i/99*cl+.5)*sp
          Y = C(Math.PI*1/cl*i) * vh
          Z = (m-br/2+.5)
          a = [...a, [X, Y-vsp, Z]]
          b = [...b, [X, Y+vsp, Z]]
        }
        P = [...P, a, b]

        e = []
        Array(cl*rw).fill().map((v, i) => {
          X1 = ((i%cl)-cl/2 + .5) * sp
          Y1 = ((i/cl)-cl/2 + .5) * sp
          Z1 = (m-br/2+.5)

          cull=false
          a.map((q, j) => {
            if(j){
              X2 = a[j][0]
              Y2 = a[j][1]
              X2_ = a[j-1][0]
              Y2_ = a[j-1][1]
              if(I(X1,Y1,X1,Y1+1e6,X2,Y2,X2_,Y2_)) cull=true
            }
          })
          b.map((q, j) => {
            if(j){
              X2 = b[j][0]
              Y2 = b[j][1]
              X2_ = b[j-1][0]
              Y2_ = b[j-1][1]
              if(I(X1,Y1,X1,Y1-1e6,X2,Y2,X2_,Y2_)) cull=true
            }
          })

          vx = vy = vz = 0
          if(!cull) e = [...e, [X1, Y1, Z1, vx, vy, vz, 1, X1, Y1, Z1]]
        })
        B = [...B, e]
      }
    }
    init()
    
    elasticity = 200
    reflection = .05
    shapeFreq = 30
    iShapev = 2
    iShapeLs = 16
    shapes = []
    planeSel = 0
    spawnShape = () => {
      vx = iShapev/2 + Rn()*iShapev*.5
      vy = (Rn()-.5)/2
      vz = 0
      sd = 3+Rn()*3|0
      theta = Rn()*Math.PI
      thetav = (Rn()-.5)*.4
      ls = iShapeLs /2 + Rn()*iShapeLs/2
      for(let m=br;m--;){
        X = -cl*sp
        Y = 0
        l = (m)%br
        Z = (l-br/2+.5)
        shapes = [...shapes, [X,Y,Z,vx,vy,vz,1,l,sd,theta,thetav,ls]]
      }
    }
  }
  
  x.fillStyle = '#000c'
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin = x.lineCap = 'roud'

  if(!((t*60|0)%shapeFreq)) spawnShape()
  
  oX=0, oY=0, oZ=Math.min(60, Math.max(40, (.3+C(t))*100))
  Rl=0, Pt=S(t)/2, Yw=C(t/2)/2
  //Rl=0, Pt=0, Yw=0
  
  lsp = Math.min(4, Math.max(.25, (.3+C(t/2))*8))
  
  colorCycle = t*20
  
  B.map((plane, idx) => {
    plane.map(v=>{
      v[3] += (a=v[7]-v[0]) / elasticity
      v[4] += (b=v[8]-v[1]) / elasticity
      v[5] += (e=v[9]-v[2]) / elasticity
      v[3] /= 1.1
      v[4] /= 1.1
      v[5] /= 1.1
      X = v[0] += v[3]
      Y = v[1] += v[4]
      Z = v[2] += v[5]
      Z *= lsp
      R(Rl,Pt,Yw,1)
      if(Z>0){
        d1 = Math.hypot(a,b)
        l = Q()
        s = Math.min(1e3, 1e3/Z)
        //x.fillStyle = `hsla(${360/br*idx+colorCycle},99%,50%,1)`
        x.fillStyle = `hsla(${360/br*idx+colorCycle+d1**4/9999},99%,${Math.max(30, 60-d1*50)}%,1)`
        x.globalAlpha = .06
        x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
        s/=3
        x.globalAlpha = .15
        x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
        s/=3
        //x.globalAlpha = 1
        //x.fillStyle = '#ffffffff'
        //x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      }
    })
  })

  P.map((v, idx) => {
    x.beginPath()
    v.map(q=>{
      X = q[0]
      Y = q[1]
      Z = q[2]
      Z *= lsp
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
    })
    col1 = `hsla(${360/br*(idx/2|0)+colorCycle},99%,50%,.6)`
    stroke(col1, '', 10, true, 1, ocp=false)
  })
  
  shapes = shapes.filter(shape => shape[6] > 0)
  shapes.map((shape, i) => {
    shape[9]+=shape[10]
    tx = shape[0] += shape[3]
    ty = shape[1] += shape[4]
    tz = shape[2] += shape[5]
    
    Pidx1 = (P.length*4-shape[7]*2+4)%P.length
    Pidx2 = (P.length*4-shape[7]*2+5)%P.length
    
    P[Pidx1].map((v, i) => {
      if(i){
        X1 = P[Pidx1][i][0]
        Y1 = P[Pidx1][i][1]
        X2 = P[Pidx1][i-1][0]
        Y2 = P[Pidx1][i-1][1]
        for(j=shape[8];j--;){
          X3 = S(p=Math.PI*2/shape[8]*j+shape[9]) * shape[11]*shape[6] + tx
          Y3 = C(p) * shape[11]*shape[6] + ty
          X4 = S(p=Math.PI*2/shape[8]*(j+1)+shape[9]) * shape[11]*shape[6] + tx
          Y4 = C(p) * shape[11]*shape[6] + ty
          if(I(X1,Y1,X2,Y2,X3,Y3,X4,Y4)){
            shape[3]/=1.01
            shape[4] = Math.abs(shape[4])
            shape[10] /= 1.25
            //shape[10] += (Rn()-.5)*.2
          }
        }
        
        X1 = P[Pidx2][i][0]
        Y1 = P[Pidx2][i][1]
        X2 = P[Pidx2][i-1][0]
        Y2 = P[Pidx2][i-1][1]
        for(j=shape[8];j--;){
          X3 = S(p=Math.PI*2/shape[8]*j+shape[9]) * shape[11]*shape[6] + tx
          Y3 = C(p) * shape[11]*shape[6] + ty
          X4 = S(p=Math.PI*2/shape[8]*(j+1)+shape[9]) * shape[11]*shape[6] + tx
          Y4 = C(p) * shape[11]*shape[6] + ty
          if(I(X1,Y1,X2,Y2,X3,Y3,X4,Y4)){
            shape[3]/=1.01
            shape[4] = -Math.abs(shape[4])
            shape[10] /= 1.25
            //shape[10] += (Rn()-.5)*.2
          }
        }
      }
    })
    
    
    B.map((plane, idx) => {
      if(shape[7] == (-idx+br-1)%br){
        plane.map((v, i)=>{
          X1 = v[0]
          Y1 = v[1]
          X2 = X1 + 1e3
          Y2 = Y1 + 1e3
          ct = 0
          for(j=shape[8];j--;){
            X3 = S(p=Math.PI*2/shape[8]*j+shape[9]) * shape[11]*shape[6] + tx
            Y3 = C(p) * shape[11]*shape[6] + ty
            X4 = S(p=Math.PI*2/shape[8]*(j+1)+shape[9]) * shape[11]*shape[6] + tx
            Y4 = C(p) * shape[11]*shape[6] + ty
            if(l=I(X1,Y1,X2,Y2,X3,Y3,X4,Y4))ct++
          }
          if(ct==1){
            X1 = v[0]
            Y1 = v[1]
            X2 = (v[0]-tx)*1e3
            Y2 = (v[1]-ty)*1e3
            for(j=shape[8];j--;){
              X3 = S(p=Math.PI*2/shape[8]*j+shape[9]) * shape[11]*shape[6] + tx
              Y3 = C(p) * shape[11]*shape[6] + ty
              X4 = S(p=Math.PI*2/shape[8]*(j+1)+shape[9]) * shape[11]*shape[6] + tx
              Y4 = C(p) * shape[11]*shape[6] + ty
              if(l=I(X1,Y1,X2,Y2,X3,Y3,X4,Y4)){
                d = Math.hypot(a=l[0]-X1, b=l[1]-Y1)
                v[0] = l[0]
                v[1] = l[1]
                v[3] += vx = a/d*reflection
                v[4] += vy = b/d*reflection
                shape[3] -= vx/20000
                shape[4] -= vy/20000
                shape[10] /= 1.00025
              }
            }
          }
        })
      }
    })
    
    x.beginPath()
    for(j=shape[8];j--;){
      X = S(p=Math.PI*2/shape[8]*j+shape[9]) * shape[11]*shape[6] + tx
      Y = C(p) * shape[11]*shape[6] + ty
      Z = tz
      Z *= lsp
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
    }
    col1 = `hsla(${360/br*(-shape[7]-1)+colorCycle},99%,50%,.6)`
    col2 = `hsla(${360/br*(-shape[7]-1)+colorCycle},99%,50%,.1)`
    stroke(col1, col2, 8, true)
    shape[6] -= .015
  })
  
  
  t+=1/60
  requestAnimationFrame(Draw)
}

Draw()