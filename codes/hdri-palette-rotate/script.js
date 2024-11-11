c = document.querySelector('#c')
c.tabIndex = 0
x_ = c.getContext('2d')
c.width = 1920
c.height = 1080

camMode = 'HDRI'
HDRIwidth = c.width

outputAspectRatio = 16/9
output = document.createElement('canvas')
octx = output.getContext('2d')
output.width = c.width
output.height = output.width / outputAspectRatio
showOutput = true // HDRI view, for recording 
showRender = false   // actual pipe to environment, for render eval etc
showPreview = false  // thumbnail in upper right 

// (only visible in default or HDRI output, not render)

if(showRender){
  outputAspectRatio = 2
  showOutput = true
  showPreview = false
  c.style.display = 'none'
}else{
  //showPreview = true
  //showOutput = false
  setTimeout(()=>{
    c.style.display = 'block'
    c.style.borderRadius = showOutput ? '0' : '10px'
    c.style.border = showOutput ? 'none' : '3px solid #fff3'
    c.style.margin = showOutput ? 0 : 10
  }, 0)
}

// tempBuffer, needed for optional preview [P]
tempBuffer = document.createElement('canvas')
tempBuffer.width = c.width
tempBuffer.height = c.height
tbctx = tempBuffer.getContext('2d')

C = Math.cos
S = Math.sin
t = 0
T = Math.tan

keys = Array(256).fill(false)
rsz = window.onresize = () =>{
  let b = document.body
  let margin = showOutput ? 0 : 10
  let n
  let d = showOutput ? 1/outputAspectRatio : .5625
  c.style.borderRadius = showOutput ? '0' : '10px'
  c.style.border = showOutput ? 'none' : '3px solid #fff3'
  //c.width = 1920 
  c.height = c.width * d
  output.width = c.width
  output.height = output.width * d
  if(b.clientHeight/b.clientWidth > d){
    c.style.width = `${(n=b.clientWidth) - margin*2}px`
    c.style.height = `${n*d - margin*2}px`
  }else{
    c.style.height = `${(n=b.clientHeight) - margin*2}px`
    c.style.width = `${n/d - margin*2}px`
  }
}
rsz()

keyTimer = 0
keyTimerInterval = .25
window.onkeyup = e => {
  keys[e.keyCode] = false
  if(e.keyCode == 17) shotTimer = 0
}

window.onkeydown = e => {
  keys[e.keyCode] = true
  if(keyTimer <= t){
    keyTimer = t + keyTimerInterval
    if(e.keyCode == 72) {
      showOutput = !showOutput
      if(showRender){
        if(typeof can != 'undefined') {
          outputAspectRatio = 2
          showOutput = true
          showPreview = false
          can.style.display = 'block'
          c.style.display = 'none'
          rsz2()
        }
      }else{
        showPreview = true
        if(typeof can != 'undefined') can.style.display = 'none'
        c.style.display = 'block'
        rsz()
      }
    }
    if(e.keyCode == 80) {
      showPreview = !showPreview
    }
    if(e.keyCode == 82) {
      showRender = !showRender
      if(showRender){
        outputAspectRatio = 2
        showPreview = false
        showOutput = true
        can.style.display = 'block'
        c.style.display = 'none'
      }else{
        showPreview = true
        can.style.display = 'none'
        c.style.display = 'block'
      }
    }
    if(e.keyCode == 70) {
      if(showRender || outputAspectRatio == 16/9){
        outputAspectRatio = 2
      }else{
        outputAspectRatio = 16/9
      }
      rsz()
    }
  }
}

window.addEventListener('resize', rsz2 = () =>{
  can = document.querySelectorAll('canvas')[0]
  if(typeof can != 'undefined'){

    can.tabindex = 0
    can.focus()

    let b = document.body
    let margin = 10
    let n
    let d = .5625
    can.style.borderRadius = '10px'
    can.style.border = '3px solid #fff3'
    if(b.clientHeight/b.clientWidth > d){
      can.style.width = `${(n=b.clientWidth) - margin*2}px`
      can.style.height = `${n*d - margin*2}px`
    }else{
      can.style.height = `${(n=b.clientHeight) - margin*2}px`
      can.style.width = `${n/d - margin*2}px`
    }
  }
  if(showRender){
    showRender = false
    setTimeout(()=>{
      showRender = true
    }, 0)
  }
})
for(let i=10;i--;) setTimeout(()=>{rsz2(), rsz()}, i*60)

async function Draw(){
  if(!t){
    X     = Y     = Z     = 0
    oX    = oY    = oZ    = 0
    Rl    = Pt    = Yw    = 0
    camX  = camY  = camZ  = camD = 0
    camposX  = camposY  = camposZ  = 0
    camRl = camPt = camYw = 0
    Rn = Math.random

    cls = () => {
      Z = camZ = 1E6
      x_['globalAlpha'] = 1
      x_.fillStyle = showOutput && showPreview ? '#000' : '#000a'
      x_.fillRect(0, 0, 1e5, 1e5, 0, 0, 1e5, 1e5)
      x_.lineJoin = 'roud'
      x_.lineCap = 'roud'
      octx['globalAlpha'] = 1
      octx.fillStyle = '#000a'
      octx.fillRect(0, 0, 1e5, 1e5, 0, 0, 1e5, 1e5)
      octx.lineJoin = 'roud'
      octx.lineCap = 'roud'
      override = false
    }

    hoff = .5       // horizontal offset of HDRI output, note it wraps
    invertY = true
    x = (func, ...vals) => {
      let p=0, q=0, d, ox, oy, oz, ox1, oy1, oz1, X1, Y1, Z1, X2, Y2, Z2, X3, Y3, Z3, X4, Y4, Z4
      let ox2, oy2, oz2, s, s2, split, onscreen1, onscreen2
      switch(func){

          // assignments
        case 'strokeStyle'   :
          if(vals.length){
            x_[func]   = vals[0]
            octx[func] = vals[0]
          }else{
            return x_[func]
          }
          break
        case 'fillText' :
          if(Z>0 && (!showOutput  || showPreview || override))    x_[func](vals[0], vals[1], vals[2])
          if(showOutput || showPreview){
            let text = vals[0]
            ox = camX - camposX
            oy = camY - camposY
            oz = camZ - camposZ
            p = ((Math.atan2(ox, oz) + Math.PI*2) / Math.PI / 2 + hoff)%1
            d = Math.hypot(ox, oy, oz) + .0001
            q = invertY ? 1-Math.acos(oy / d) / Math.PI : Math.acos(oy / d) / Math.PI
            ox1 = p * output.width
            oy1 = q * output.height
            X1 = ox1 + vals[3]
            Y1 = oy1 + vals[4]
            octx[func](text, X1, Y1)
            if(X1 < 0) octx[func](text, X1 + output.width, Y1 )
            if(X1 + X2 > output.width) octx[func](text, X1 - output.width, Y1)
          }
          break
        case 'textAlign' :
          if(vals.length){
            x_[func]   = vals[0]
            octx[func] = vals[0]
          }else{
            return x_[func]
          }
          break
        case 'globalCompositeOperation' :
          if(vals.length){
            x_[func]   = vals[0]
            octx[func] = vals[0]
          }else{
            return x_[func]
          }
          break
        case 'lineWidth'  :
          if(vals.length){
            x_[func]   = vals[0]
            ox = camX - camposX
            oy = camY - camposY
            oz = camZ - camposZ
            p = ((Math.atan2(ox, oz) + Math.PI*2) / Math.PI / 2 + hoff)%1
            d = Math.hypot(ox, oy, oz) + .0001
            q = invertY ? 1-Math.acos(oy / d) / Math.PI : Math.acos(oy / d) / Math.PI
            //modsize = .4+Math.abs(.5 - q)*2
            modsize = .5+((2*Math.abs(.5 - q))*1.5) ** 2 / 1.5
            octx[func] = Math.min(250, vals[1] * modsize)
          }else{
            return [x_[func], octx[func]]
          }
          break
        case 'fillStyle'  :
          if(vals.length){
            x_[func]   = vals[0]
            octx[func] = vals[0]
          }else{
            return x_[func]
          }
          break
        case 'globalAlpha':
          if(vals.length){
            x_[func]   = vals[0]
            octx[func] = vals.length > 1 ? vals[1] : vals[0]
          }else{
            return x_[func]
          }
          break
        case 'font'       :
          if(vals.length){
            x_[func]   = vals[0]
            octx[func] = vals.length > 1 ? vals[1] : vals[0]
          }else{
            return x_[func]
          }
          break
        case 'lineJoin'   :
          if(vals.length){
            x_[func]   = vals[0]
            octx[func] = vals[0]
          }else{
            return x_[func]
          }
          break
        case 'lineCap'    :
          if(vals.length){
            x_[func]   = vals[0]
            octx[func] = vals[0]
          }else{
            return x_[func]
          }
          break

          // function calls
        default:
          if(vals.length){
            switch(func){
              case 'lineTo':
                if(Z>0 && (!showOutput  || showPreview || override))    x_[func](...vals)
                if(showOutput || showPreview){
                  ox = camX - camposX
                  oy = camY - camposY
                  oz = camZ - camposZ
                  p = ((Math.atan2(ox, oz) + Math.PI*2) / Math.PI / 2 + hoff)%1
                  if(op_ != -1){
                    if(op_ > .75 && p<.25) p+=1
                    if(op_ < .25 && p>.75) p-=1
                  }
                  op_ = p
                  d = Math.hypot(ox, oy, oz) + .0001
                  q = invertY ? 1-Math.acos(oy / d) / Math.PI : Math.acos(oy / d) / Math.PI
                  HDRIqueue = [...HDRIqueue, [p * output.width, q * output.height]]
                }
                break
              case 'clearRect':
                if(Z>0 && (!showOutput || showPreview)) x_[func](vals[0], vals[1],  vals[2],  vals[3])

                if(showOutput || showPreview || override){
                  ox = camX - camposX
                  oy = camY - camposY
                  oz = camZ - camposZ
                  p = ((Math.atan2(ox, oz) + Math.PI*2) / Math.PI / 2 + hoff) % 1
                  d = Math.hypot(ox, oy, oz) + .01
                  q = invertY ? 1-Math.acos(oy / d) / Math.PI : Math.acos(oy / d) / Math.PI
                  ox1 = p * output.width
                  oy1 = q * output.height
                  modsize = 1
                  octx[func](ox1-vals[6]*modsize/2, oy1-vals[7]*modsize/2, vals[6]*modsize, vals[7]*modsize)
                }
                break
              case 'fillRect': case 'strokeRect':
                if(Z>0 && (!showOutput || showPreview)) x_[func](vals[0], vals[1],  vals[2],  vals[3])

                if(showOutput || showPreview || override){
                  ox = camX - camposX
                  oy = camY - camposY
                  oz = camZ - camposZ
                  p = ((Math.atan2(ox, oz) + Math.PI*2) / Math.PI / 2 + hoff)%1
                  d = Math.hypot(ox, oy, oz) + .0001
                  q = invertY ? 1-Math.acos(oy / d) / Math.PI : Math.acos(oy / d) / Math.PI
                  ox1 = p * output.width
                  oy1 = q * output.height
                  modsize = 1+((2*Math.abs(.5 - q))*1.28) ** 11
                  X1 = ox1-vals[6]*modsize/4
                  Y1 = oy1-vals[7]/4
                  X2 = vals[6]*modsize/2
                  Y2 = vals[7]/2
                  octx[func](X1, Y1, X2, Y2)
                  if(X1 < 0) octx[func](X1 + output.width, Y1, X2, Y2)
                  if(X1 + X2 > output.width) octx[func](X1 - output.width, Y1, X2, Y2)
                }
                break
              case 'drawImage':
                if(Z>0 && (!showOutput || showPreview || override)) x_[func](vals[0], vals[1],  vals[2],  vals[3], vals[4])
                if(showOutput || showPreview){
                  ox = camX - camposX
                  oy = camY - camposY
                  oz = camZ - camposZ
                  vals[7] /= 1
                  vals[8] /= 1
                  p = ((Math.atan2(ox, oz) + Math.PI*2) / Math.PI / 2 + hoff)%1
                  d = Math.hypot(ox, oy, oz) + .0001
                  q = invertY ? 1-Math.acos(oy / d) / Math.PI : Math.acos(oy / d) / Math.PI
                  ox1 = p * output.width
                  oy1 = q * output.height
                  modsize = 1+((2*Math.abs(.5 - q))*1.28) ** 11
                  X1 = ox1-vals[7]*modsize/4
                  Y1 = oy1-vals[8]/4
                  X2 = vals[7]*modsize/2
                  Y2 = vals[8]/2
                  octx[func](vals[0], X1, Y1, X2, Y2)
                  if(X1 < 0) octx[func](vals[0], X1 + output.width, Y1, X2, Y2)
                  if(X1 + X2 > output.width) octx[func](vals[0], X1 - output.width, Y1, X2, Y2)
                }
                break
              default:
                if(!showOutput || showPreview || override) x_[func](...vals)
                if(showOutput || showPreview || override) octx[func](...vals)
                break
            }
          }else{
            switch(func){
              case 'beginPath':
                if(!showOutput || showPreview || override) x_[func]()
                if(showOutput || showPreview || override){
                  octx[func]()
                  HDRIqueue = []
                  op_ = -1
                }
                break
              case 'stroke':
                if(!showOutput || showPreview || override) x_[func]()
                if(showOutput || showPreview || override){
                  for(let m=3; m--;){
                    let ofx
                    switch(m){
                      case 0: ofx = -output.width; break
                      case 1: ofx = 0; break
                      case 2: ofx = output.width; break
                    }
                    polyOnBorder = false
                    onLeft       = false
                    onRight      = false
                    outsized     = false
                    HDRIqueue.map((v, i) => {
                      if(!outsized){
                        l1 = i
                        l2 = (i+1)%HDRIqueue.length
                        el1 = HDRIqueue[l1]
                        el2 = HDRIqueue[l2]
                        if(Math.hypot((el2[0] + ofx) - (el1[0] + ofx), el2[1] - el1[1]) > output.width/1.1) {
                          outsized = true
                        }else{
                          if((el1[0] + ofx >= 0 && el2[0] + ofx < 0) || (el1[0] + ofx >= output.width && el2[0] + ofx < output.width)) polyOnBorder = true
                        }
                        X = v[0] + ofx
                        Y = v[1]
                        if(X >= output.width) onRight = true
                        if(X < 0) onLeft  = true
                      }
                    })
                    if(!outsized && (polyOnBorder || !(onRight || onLeft))){
                      octx.beginPath()
                      HDRIqueue.map((v, i) => {
                        octx.lineTo(v[0] + ofx, v[1])
                      })
                      octx.stroke()
                    }
                  }
                }
                break
              case 'fill':
                if(!showOutput || showPreview || override) x_[func]()
                if(showOutput || showPreview || override){
                  for(let m=3; m--;){
                    let ofx
                    switch(m){
                      case 0: ofx = -output.width; break
                      case 1: ofx = 0; break
                      case 2: ofx = output.width; break
                    }
                    polyOnBorder = false
                    onLeft       = false
                    onRight      = false
                    outsized     = false
                    HDRIqueue.map((v, i) => {
                      if(!outsized){
                        l1 = i
                        l2 = (i+1)%HDRIqueue.length
                        el1 = HDRIqueue[l1]
                        el2 = HDRIqueue[l2]
                        if(Math.hypot((el2[0] + ofx) - (el1[0] + ofx), el2[1] - el1[1]) > output.width/1.1) {
                          outsized = true
                        }else{
                          if((el1[0] + ofx >= 0 && el2[0] + ofx < 0) || (el1[0] + ofx >= output.width && el2[0] + ofx < output.width)) polyOnBorder = true
                        }
                        X = v[0] + ofx
                        Y = v[1]
                        if(X >= output.width) onRight = true
                        if(X < 0) onLeft  = true
                      }
                    })
                    if(!outsized && (polyOnBorder || !(onRight || onLeft))){
                      octx.beginPath()
                      HDRIqueue.map((v, i) => {
                        octx.lineTo(v[0] + ofx, v[1])
                      })
                      octx.fill()
                    }
                  }
                }
                break
              default:
                if(!showOutput || showPreview) x_[func]()
                if(showOutput || showPreview) octx[func]()
                break
            }
          }
          break
      }
      return [p, q]
    }
    
    R = (Rl,Pt,Yw,m) => {
      M = Math
      A = M.atan2
      H = M.hypot

      let X0_ = X
      let Y0_ = Y
      let Z0_ = Z
      let p, d

      // MAIN
      if(m){
        //X -= oX
        //Y -= oY
        //Z -= oZ
      }
      X = S(p=A(X,Y)+Rl) * (d=H(X,Y))
      Y = C(p) * d
      X = S(p=A(X,Z)+(Yw+.00001)) * (d=H(X,Z))
      Z = C(p)*d
      Y = S(p=A(Y,Z)+Pt) * (d=H(Y,Z))
      Z = C(p)*d
      if(m){
        X += oX
        Y += oY
        Z += oZ
      }
      let X1_ = X
      let Y1_ = Y
      let Z1_ = Z

      // CAM
      X = X0_
      Y = Y0_
      Z = Z0_
      if(m){
        //X -= camposX
        //Y -= camposY
        //Z -= camposZ
      }
      let mod = Rl == 0 && Pt == 0 && Yw == 0 ? 0 : 1
      X = S(p=A(X,Y)+camRl*mod) * (d=H(X,Y))
      Y = C(p) * d
      X = S(p=A(X,Z)+(camYw+.00001)*mod) * (d=H(X,Z))
      Z = C(p)*d
      Y = S(p=A(Y,Z)+camPt*mod) * (d=H(Y,Z))
      Z = C(p)*d
      if(m){
        X += camposX
        Y += camposY
        Z += camposZ
      }
      if(camMode == 'HDRI'){
        camD = H(X, Y, Z)
        X = camposX + X / camD
        Y = camposY + Y / camD
        Z = camposZ + Z / camD
      }
      camX = X
      camY = Y
      camZ = Z
      //camD += Z

      X    = X1_
      Y    = Y1_
      Z    = Z1_
    }

    HSVFromRGB = (R, G, B) => {
      let R_=R/255
      let G_=G/255
      let B_=B/255
      let Cmin = Math.min(R_,G_,B_)
      let Cmax = Math.max(R_,G_,B_)
      let val = Cmax //(Cmax+Cmin) / 2
      let delta = Cmax-Cmin
      let sat = Cmax ? delta / Cmax: 0
      let min=Math.min(R,G,B)
      let max=Math.max(R,G,B)
      let hue = 0
      if(delta){
        if(R>=G && R>=B) hue = (G-B)/(max-min)
        if(G>=R && G>=B) hue = 2+(B-R)/(max-min)
        if(B>=G && B>=R) hue = 4+(R-G)/(max-min)
      }
      hue*=60
      while(hue<0) hue+=360;
      while(hue>=360) hue-=360;
      return [hue, sat, val]
    }

    R3=(Rl,Pt,Yw,m=false)=>{
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

    Q = () => [c.width/2+X/(Z+.01)*700, c.height/2+Y/(Z+.01)*700,
               output.width/2+camX/(camZ+.01)*700, output.height/2+camY/(camZ+.01)*700]

    I=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0

    bezTo = (X1,Y1,X2,Y2,col1,col2,lw=1,dual=true,oga=1,horizontal=true) =>  {
      let Xa, Ya, Xb, Yb, X, Y, l1, l2, l3
      if(horizontal){
        Xa = X1 + (X2-X1)/3*2
        Ya = Y1
        Xb = X1 + (X2-X1)/3*1
        Yb = Y2
      }else{
        Xa = X1
        Ya = Y1 + (Y2-Y1)/3*2
        Xb = X2
        Yb = Y1 + (Y2-Y1)/3*1
      }
      x('beginPath')
      X = X1
      Y = Y1
      x('moveTo', X, Y)
      x('bezierCurveTo', Xa, Ya, Xb, Yb, X2, Y2)
      Z = 6
      stroke(col1, col2, lw, dual, oga, false)
    }

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
      if(showLine) x('beginPath')
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
          motionPath = [...motionPath, [X,Y,Z]]
          R(Rl,Pt,Yw,1)
          x('lineTo', ...Q())
        }

        vx = C(p1) * C(p2) * sp
        vy = S(p2) * sp
        vz = S(p1) * C(p2) * sp
        X_ += vx
        Y_ += vy
        Z_ += vz
      }
      //if(showLine) stroke('#f00', '', 2, false)
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
            a = [...a, b]
          }
        }
      })
      return a
    }


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
    
    premade_geo = [[-6.994,-0.52,2.659],[6.95,2.486,-1.332],[5.297,3.437,-4.047],[-0.562,5.924,-4.566],[-6.944,-2.688,-0.901],[-3.61,-5.258,3.946],[-5.764,2.148,4.292],[-6.305,-4.06,-0.124],[4.258,-0.575,-6.147],[-4.375,-4.559,-4.041],[1.844,6.695,-2.833],[3.555,1.42,6.45],[-3.455,-6.618,-0.725],[1.501,7.285,-0.964],[-2.039,7.001,-1.757],[1.936,5.38,4.853],[1.759,1.101,7.207],[1.394,-0.728,-7.333],[-1.071,4.571,-5.849],[4.603,-5.824,-1.073],[4.729,-1.651,-5.582],[3.56,-0.519,-6.581],[1.92,-3.685,6.244],[-5.066,-3.823,3.996],[6.546,-0.621,3.608],[6.296,3.655,1.804],[6.385,-1.314,-3.708],[1.688,2.846,-6.731],[-1.003,7.433,-0.004],[4.27,-3.366,5.166],[-5.9,4.606,0.483],[-0.941,7.397,0.81],[-5.136,-5.358,-1.081],[-3.219,-2.133,6.429],[-6.231,-1.689,3.818],[0.812,6.761,3.144],[-6.023,0.815,-4.395],[7.243,-0.374,-1.913],[2.334,-2.832,6.541],[-4.537,2.6,-5.377],[-3.546,-5.585,-3.534],[-4.696,0.633,-5.814],[-2.319,-4.833,-5.246],[5.54,3.085,-4.006],[-0.576,-2.488,-7.052],[-1.341,-4.295,-6.001],[6.442,1.145,3.666],[7.34,-0.488,-1.464],[-2.147,-6.59,2.867],[5.498,-2.5,-4.447],[-4.909,4.499,3.452],[1.616,-6.381,3.596],[-6.671,-0.394,-3.404],[5.29,-1.623,-5.063],[5.519,3.676,3.504],[-7.277,-1,1.516],[-1.443,-2.83,-6.794],[3.228,2.322,6.359],[5.163,4.642,-2.838],[-0.914,-3.442,6.601],[4.938,-2.408,5.106],[5.181,-2.868,-4.602],[-2.245,6.361,3.279],[4.283,-5.211,3.279],[-6.113,1.035,4.22],[1.111,-4.926,-5.545],[-2.395,-5.736,-4.197],[2.527,5.567,4.344],[6.78,-0.672,-3.136],[6.92,-0.377,-2.867],[-6.008,-1.668,4.168],[3.275,-4.883,-4.656],[-6.761,-0.836,-3.137],[5.357,-4.882,1.93],[-3.729,1.478,-6.338],[-5.978,-3.908,-2.291],[-4.005,-2.148,5.967],[-1.39,-5.719,-4.649],[-4.971,-4.959,-2.636],[1.573,-1.178,-7.238],[-0.58,1.781,-7.263],[-3.41,4.425,-5.004],[-3.262,4.328,5.184],[-1.142,4.67,5.757],[-1.837,2.684,-6.758],[-0.601,0.059,-7.476],[5.005,-5.263,-1.873],[-7.078,-1.345,-2.084],[4.028,2.486,5.818],[-6.096,-3.363,2.789],[1.351,-4.668,-5.713],[7.048,2.006,-1.598],[5.397,-3.054,-4.218],[1.156,4.151,-6.139],[-7.267,-1.798,0.457],[1.683,-4.086,6.06],[-4.816,-5.749,0.107],[2.541,1.057,-6.977],[-6.086,4.364,-0.408],[1.954,7.154,-1.119],[-6.401,1.483,3.617],[-1.954,7.232,-0.373],[0.225,-2.153,7.181],[0.841,-7.401,-0.878],[2.622,-5.441,-4.447],[1.692,5.999,-4.172],[-6.436,2.626,2.818],[-2.891,-1.014,6.846],[0.529,-5.519,-5.051],[-1.638,1.011,7.249],[-2.905,6.347,2.743],[-4.645,-1.671,5.647],[7.357,0.054,-1.455],[0.657,6.552,3.59],[0.078,-0.666,-7.47],[-0.588,-3.842,6.414],[-4.084,1.295,-6.156],[-6.479,1.905,-3.264],[6.182,3.118,-2.883],[3.758,-1.742,-6.252],[-1.545,-4.949,-5.42],[4.182,-2.481,5.71],[-0.848,1.619,7.274],[0.442,-1.019,-7.417],[2.111,-4.193,-5.85],[-2.377,-6.719,2.336],[-3.234,5.009,-4.55],[1.215,5.301,-5.165],[-0.567,4.464,6],[4.404,-6.036,0.649],[1.785,3.523,-6.376],[-2.162,-3.346,-6.355],[2.408,-1.875,6.851],[3.631,-4.927,-4.335],[-4.898,5.648,0.601],[-2.516,5.825,4],[2.488,1.31,6.953],[4.882,-5.12,2.491],[-2.877,-6.529,-2.312],[-5.359,5.23,-0.427],[2.605,3.55,6.072],[3.604,0.835,6.524],[-4.695,-2.971,5.038],[1.829,3.054,6.602],[-3.31,-6.561,1.502],[-4.502,-3.013,-5.187],[-1.478,-5.479,4.904],[5.573,0.056,5.019],[-5.713,-4.095,-2.618],[6.597,0.475,-3.536],[-0.357,-7.408,1.119],[6.045,4.376,-0.745],[5.522,-3.768,3.401],[-4.384,-3.584,4.918],[-3.312,-5.048,4.451],[-3.758,3.054,-5.728],[-1.908,5.779,4.384],[-3.282,-5.843,3.367],[7.111,-0.108,2.383],[6.412,-3.737,1.082],[0.541,-0.484,-7.465],[-5.942,4.109,-2.016],[-3.753,-5.925,-2.657],[2.347,-3.727,6.071],[5.805,4.044,-2.491],[-6.017,3.685,2.542],[4.365,5.705,-2.156],[-6.807,-1.228,2.9],[1.095,2.028,-7.137],[-2.052,-4.467,-5.665],[7.152,-2.246,-0.224],[7.416,1.037,-0.431],[-3.562,1.89,-6.324],[4.149,2.866,5.552],[-2.485,-3.079,-6.372],[3.043,-2.942,6.192],[-0.661,-1.724,7.269],[-6.624,0.561,3.472],[6.71,-3.347,0.175],[-3.911,-5.826,2.649],[-6.33,3.945,-0.789],[-6.267,1.903,3.655],[-5.269,2.407,-4.764],[3.149,2.702,-6.248],[0.312,-0.381,7.484],[-7.261,0.621,-1.775],[-5.212,2.008,-5.006],[4.66,1.039,5.784],[-6.614,1.01,3.389],[-3.274,1.044,6.667],[-6.5,-3.709,-0.494],[3.833,4.088,-4.985],[5.548,1.399,-4.849],[-2.828,6.04,-3.431],[7.103,0.429,-2.37],[4.693,5.831,-0.474],[0.675,-0.1,7.469],[3.284,5.473,-3.939],[-1.658,-4.06,-6.084],[2.397,-6.634,2.549],[-6.729,-2.91,1.582],[6.807,-2.891,1.251],[-0.775,4.9,5.626],[4.163,4.291,4.529],[5.6,-4.978,-0.332],[4.69,1.597,5.631],[3.334,4.749,-4.752],[-1.255,1.606,-7.218],[0.101,-7.232,1.986],[3.022,-4,-5.579],[2.864,-6.907,0.588],[-4.422,-5.993,0.883],[4.644,4.616,-3.657],[4.825,5.702,0.68],[-1.099,-5.322,5.17],[-1.203,0.737,7.366],[2.199,3.694,6.146],[0.393,-5.121,-5.465],[-1.841,0.062,7.27],[4.603,-2.104,-5.535],[3.666,6.164,2.194],[-2.904,-3.887,-5.72],[0.068,6.98,-2.743],[-6.114,1.599,-4.039],[0.187,-4.101,6.277],[1.013,7.431,-0.104],[-3.177,-1.241,-6.68],[7.043,-2.462,-0.765],[3.875,5.82,-2.714],[-3.943,-5.978,-2.23],[-0.296,5.671,4.899],[-6.021,-2.617,3.626],[3.347,-4.162,5.266],[5.027,-4.55,-3.207],[-4.442,-3.397,-4.998],[-1.315,6.584,-3.343],[3.353,-6.676,-0.663],[-6.071,4.324,0.837],[2.117,6.477,3.134],[-1.267,-4.992,5.452],[2.418,-7.07,-0.652],[5.476,3.78,-3.461],[-4.551,5.868,1.05],[-6.777,3.213,-0.085],[3.83,-2.293,6.027],[-0.431,3.307,-6.718],[-1.894,7.251,0.297],[-4.443,-0.07,6.042],[-1.1,2.99,6.79],[3.523,-3.582,5.569],[0.113,0.754,7.461],[-3.307,-6.147,2.745],[-6.518,2.653,-2.593],[5.73,0.431,4.82],[-0.761,2.649,6.975],[-1.298,-0.231,-7.383],[1.683,5.05,-5.284],[-3.118,-3.075,-6.089],[1.325,-5.943,4.379],[-6.671,-1.619,3.02],[-6.557,2.239,-2.872],[-5.428,4.404,2.719],[5.696,-4.521,-1.833],[-6.297,-2.317,3.352],[1.991,3.155,-6.507],[7.045,0.821,2.44],[7.255,-0.282,1.883],[1.517,4.084,6.105],[4.923,-2.359,-5.144],[-2.087,-1.984,6.926],[3.985,6.336,0.471],[3.805,6.35,-1.206],[-2.988,6.81,-0.97],[-4.151,-0.967,6.171],[6.18,-1.279,4.052],[4.705,5.297,-2.46],[2.636,6.023,-3.61],[6.314,-2.32,-3.316],[0.631,1.779,7.259],[2.859,1.013,6.859],[-4.526,-0.277,-5.974],[-2.697,1.431,-6.851],[-5.747,0.079,-4.818],[6.528,-1.811,-3.218],[-0.961,-5.702,-4.777],[6.623,3.506,0.318],[4.078,5.103,3.685],[-6.431,3.43,-1.769],[5.597,2.668,4.22],[-0.078,6.779,3.209],[0.877,-7.326,-1.344],[-3.724,-6.51,-0.033],[-0.544,3.622,6.545],[2.763,3.639,-5.948],[-0.22,6.981,2.732],[-3.807,3.661,5.325],[4.091,-1.481,-6.109],[5.522,2.315,4.517],[-4.813,-2.712,-5.073],[7.318,1.493,-0.684],[-2.499,-2.815,6.487],[-4.818,1.916,5.419],[-5.937,-1.147,-4.437],[0.657,-6.434,-3.798],[-5.567,3.981,-3.067],[-1.809,-5.663,4.572],[-2.832,-0.999,-6.873],[-3.688,-4.311,4.906],[-5.399,-4.318,-2.909],[-6.624,-0.579,3.471],[-1.053,2.277,7.068],[1.138,2.19,7.082],[-5.047,5.495,-0.762],[-3.264,-4.456,5.074],[4.563,-2.624,5.342],[-4.053,2.514,-5.788],[-3.89,6.281,-1.295],[3.024,-5.234,4.439],[7.098,1.538,-1.873],[5.873,-2.652,3.838],[-6.991,-1.402,2.326],[3.441,1.887,6.392],[-2.778,-4.679,-5.161],[0.328,-2.013,-7.218],[1.316,7.365,-0.525],[-6.657,3.42,0.485],[5.652,4.741,1.353],[6.693,2.901,-1.744],[2.421,-1.402,6.959],[-5.103,1.646,5.244],[-4.231,6.123,0.924],[-7.424,-1.049,0.171],[-1.103,6.157,-4.139],[-4.009,-1.279,-6.209],[0.276,-4.512,5.985],[2.251,7.151,-0.21],[1.787,5.15,5.151],[-3.991,5.647,2.905],[6.69,0.998,3.24],[7.035,1.249,-2.282],[5.274,-4.57,2.748],[2.462,7.016,0.984],[-1.687,0.46,-7.293],[-1.589,-6.567,-3.256],[7.024,-2.585,0.489],[-3.038,-0.6,-6.831],[5.456,4.77,-1.932],[-3.997,5.62,-2.95],[2.588,-2.612,-6.537],[-1.689,6.628,-3.077],[-1.684,-7.152,1.504],[2.181,2.777,6.617],[-2.06,6.063,-3.906],[-2.636,-6.988,-0.682],[3.383,4.137,5.262],[-3.912,4.234,4.798],[-6.603,-2.102,2.869],[-4.315,-4.021,4.633],[-3.048,-6.83,-0.553],[-4.891,3.795,-4.234],[5.317,-4.711,-2.406],[6.136,-3.979,1.663],[-5.533,1.53,4.826],[2.154,2.587,-6.702],[2.846,5.398,-4.361],[6.625,-2.03,-2.87],[0.669,-4.799,-5.725],[6.814,1.839,2.538],[-6.553,-3.5,-1.033],[-6.961,1.638,2.262],[-6.079,-4.381,-0.338],[1.904,-0.785,-7.212],[-4.354,5.291,-3.05],[2.606,-0.232,-7.029],[0.383,-0.882,7.438],[2.827,-2.038,6.641],[-1.235,-5.788,4.607],[4.159,2.01,5.909],[-3.281,3.913,5.494],[5.155,-3.52,-4.157],[6.909,-1.426,2.547],[7.254,1.9,0.14],[1.296,-3.74,-6.371],[-6.427,3.842,0.428],[-5.354,1.288,5.092],[6.596,3.423,-1.013],[-3.624,-4.213,-5.037],[3.556,6.272,-2.067],[-1.589,5.263,-5.102],[-6.276,2.755,-3.046],[-6.334,-3.614,1.754],[-2.006,-2.516,-6.775],[-6.55,3.123,1.897],[-1.975,5.444,-4.766],[4.487,2.117,5.625],[0.711,6.957,2.71],[-0.747,0.715,7.429],[1.457,-1.365,7.23],[1.784,7.283,-0.173],[6.622,0.872,-3.412],[-5.404,1.211,-5.058],[-5.907,4.343,-1.579],[2.743,1.803,-6.744],[5.777,1.932,4.375],[-4.117,6.106,1.42],[5.284,-4.919,-2.034],[-4.077,-6.12,1.476],[5.026,1.558,-5.345],[7.384,1.09,0.735],[-5.37,-5.132,1.037],[7.449,-0.826,-0.295],[-2.674,6.721,1.982],[3.95,5.964,-2.255],[-5.721,1.791,4.508],[-4.402,5.376,2.823],[-1.329,4.86,-5.556],[-1.198,-1.277,-7.293],[3.3,6.081,-2.896],[-0.401,-7.056,-2.512],[7.288,0.707,1.624],[1.278,1.28,7.279],[7.234,-1.425,-1.375],[1.976,-2.621,-6.744],[-2.666,6.382,-2.901],[-1.262,1.991,-7.12],[0.259,1.624,-7.318],[-4.256,-6.063,-1.177],[6.636,-2.563,-2.377],[-6.46,3.626,-1.172],[5.315,1.095,-5.177],[-2.483,6.26,-3.301],[7.432,-0.714,0.708],[6.027,1.642,4.151],[-2.189,4.394,5.671],[2.56,2.992,6.384],[-3.202,5.99,-3.182],[4.918,3.71,-4.278],[-1.73,-1.703,-7.096],[-5.838,3.637,2.992],[6.664,-3.363,0.734],[-2.183,7.063,-1.264],[1.368,-7.214,-1.529],[7.078,2.48,0.091],[5.845,-1.321,4.51],[-0.676,4.709,-5.798],[-6.098,-2.88,-3.281],[-0.236,-5.499,-5.095],[6.144,4.22,0.835],[5.469,4.25,-2.876],[1.759,-7.129,1.529],[-6.156,4.1,-1.245],[0.801,-1.879,7.217],[1.035,-4.656,5.788],[-0.146,-7.389,-1.28],[-2.725,2.917,-6.35],[4.797,-0.502,5.743],[5.778,-3.728,2.994],[-2.462,-6.626,-2.508],[-2.029,-6.416,-3.312],[-3.879,-1.438,6.256],[5.791,-3.728,-2.97],[6.486,-2.471,-2.842],[-2.468,-2.292,6.701],[6.022,1.79,-4.097],[6.772,1.543,-2.832],[1.773,-4.92,-5.376],[-6.268,2.317,3.405],[-2.908,5.117,4.649],[1.413,7.166,-1.706],[-0.139,7.48,-0.525],[1.448,-5.883,-4.421],[4.441,-6.041,-0.177],[7.059,-0.731,-2.427],[7.191,1.348,1.652],[4.241,-6.158,-0.589],[-2.459,3.483,-6.171],[7.338,0.547,-1.449],[-4.192,4.64,-4.142],[-2.103,5.466,4.685],[-3.773,-6.414,-0.942],[-4.552,1.835,-5.672],[-2.977,1.724,-6.665],[-1.069,-3.95,-6.285],[-5.798,-4.747,-0.327],[-1.346,-6.952,-2.472],[-3.15,1.499,6.639],[5.692,-4.838,0.675],[-5.284,4.078,-3.421],[-1.013,3.442,6.586],[0.68,1.992,-7.199],[-3.254,-5.471,-3.966],[0.052,3.971,-6.363],[-0.632,5.489,-5.072],[6.297,-2.577,3.157],[-6.468,-2.533,2.829],[6.485,-2.119,3.115],[-2.507,7.06,-0.358],[-3.256,-2.736,6.178],[-1.481,-1.126,7.266],[2.987,-2.776,-6.295],[-6.507,-3.172,1.961],[0.392,6.01,4.47],[0.416,-2.964,6.877],[0.564,1.074,-7.401],[4.962,0.29,5.617],[-3.537,-4.693,4.66],[2.576,-6.463,-2.801],[6.19,1.08,4.096],[4.044,-5.14,3.67],[-2.993,6.616,-1.877],[1.27,-7.031,-2.282],[2.934,-2.276,-6.516],[-3.506,-3.658,-5.53],[0.519,6.333,-3.985],[4.713,3.532,-4.644],[3.048,1.601,6.663],[-7.135,-1.57,1.695],[2.591,1.727,6.823],[6.133,-3.809,-2.031],[3.48,-4.857,4.534],[6.729,2.237,-2.442],[1.982,7.149,1.102],[-7.462,0.383,0.649],[1.344,6.754,-2.972],[5.669,4.826,-0.908],[0.171,1.414,7.364],[-2.752,-3.39,-6.098],[2.629,0.152,7.023],[2.311,5.957,3.927],[-4.439,-1.246,-5.915],[-1.272,1.861,7.154],[-6.49,-0.074,-3.758],[-7.25,1.875,0.426],[-6.141,-1.583,-4.004],[0.71,5.035,-5.514],[-0.294,7.288,-1.749],[4.16,-1.929,-5.935],[6.68,-2.77,1.988],[-6.91,-2.888,-0.408],[-1.312,-6.568,3.375],[2.882,5.077,-4.709],[-4.298,0.396,-6.134],[-7.043,-2.04,1.576],[-2.009,-6.638,-2.855],[4.507,-4.697,3.726],[-1.684,-7.259,-0.855],[-4.161,-6.193,-0.761],[-3.121,-3.54,-5.83],[4.3,1.327,-6],[-4.649,-5.033,-3.051],[0.604,-2.928,-6.879],[-5.851,-0.816,4.621],[-1.365,1.202,-7.276],[-2.485,6.833,-1.841],[-4.225,-0.452,6.181],[-1.263,-7.189,1.727],[0.986,-5.75,-4.714],[-4.765,-5.556,1.637],[6.809,0.101,-3.144],[-1.196,0.266,-7.399],[-0.177,7.486,0.43],[2.118,0.782,-7.152],[6.949,-1.912,-2.077],[-0.183,1.969,7.235],[6.389,-3.042,-2.485],[2.845,5.639,4.045],[2.348,-4.88,-5.189],[-1.168,7.193,1.776],[-5.839,1.298,4.525],[3.397,-4.481,-4.963],[0.912,-6.606,-3.433],[3.65,0.35,-6.543],[6.518,2.707,-2.537],[-3.32,4.854,4.655],[3.564,-6.441,-1.439],[1.065,-2.635,-6.941],[-2.554,-6.375,3.016],[0.848,-2.673,6.956],[-7.162,-0.631,2.135],[4.508,-4.634,-3.803],[-6.353,1.113,3.827],[-5.322,1.97,4.903],[-2.787,-1.582,-6.781],[-6.688,2.654,-2.118],[-1.423,-5.407,-4.999],[2.541,-5.866,-3.922],[5.599,0.902,4.908],[4.363,4.774,3.798],[6.637,-3.279,-1.202],[2.233,-0.975,7.093],[-7.408,0.697,-0.945],[-0.951,-7.141,2.085],[-1.337,-7.286,1.178],[-6.908,0.389,2.896],[1.134,2.975,-6.791],[-0.391,-5.766,-4.78],[-5.765,4.133,2.438],[5.203,2.241,-4.915],[-1.937,3.912,-6.099],[3.112,5.785,3.62],[7.06,0.346,2.507],[1.963,-6.976,1.932],[-4.554,-5.31,-2.706],[5.484,-1.481,4.897],[-4.67,5.789,-0.967],[-5.927,0.423,-4.577],[-6.673,-2.215,-2.612],[3.958,5.463,-3.278],[4.994,-5.346,1.654],[0.097,6.254,4.139],[-2.92,5.731,3.859],[-2.389,3.493,6.192],[1.042,-5.427,-5.071],[1.375,3.626,6.42],[-3.118,6.802,0.517],[-5.434,-1.46,4.96],[-6.819,2.737,-1.504],[-4.325,-5.291,3.091],[5.048,-5.432,1.126],[-3.118,-6.096,-3.06],[-2.405,-2.595,-6.613],[-4.045,-2.866,5.628],[-1.372,2.799,-6.822],[2.652,-5.166,4.747],[-3.623,2.47,-6.085],[-1.868,-4.582,5.637],[2.15,-7.093,-1.148],[-3.488,-3.661,5.539],[-5.088,4.829,2.655],[4.126,-4.559,-4.295],[-2.676,-5.633,4.167],[4.399,5.53,2.514],[7.294,-1.741,-0.151],[-5.788,-2.483,4.073],[4.697,5.085,-2.888],[2.675,-3.205,-6.231],[-7.097,-2.239,0.934],[-0.473,-0.686,-7.454],[-0.573,-7.418,-0.95],[0.799,-6.587,3.497],[5.828,-4.009,-2.494],[-7.497,-0.057,0.21],[1.023,-2.249,7.082],[-2.826,3.38,6.07],[1.45,-7.354,-0.269],[-4.117,-5.974,1.901],[1.304,-7.346,-0.766],[1.698,0.621,7.279],[-0.449,-4.331,-6.107],[-3.745,-4.889,4.282],[5.806,3.424,3.29],[3.189,-0.527,6.768],[-1.035,-6.825,-2.934],[-4.145,3.779,4.979],[3.732,-6.495,0.368],[2.771,6.638,2.124],[-2.074,6.364,-3.384],[-5.685,4.305,-2.324],[1.198,4.99,-5.47],[-3.307,1.474,-6.568],[-0.627,5.892,4.598],[-6.598,-1.052,3.407],[-1.353,7.14,-1.854],[-4.567,5.605,1.995],[-3.864,-6.278,-1.383],[-2.874,-3.939,5.699],[3.107,-4.317,-5.288],[-1.717,-7.301,0.052],[5.388,4.206,3.086],[6.296,-0.254,-4.069],[0.024,-5.616,4.972],[-0.912,-2.134,-7.132],[4.613,-5.272,-2.679],[-7.393,-1.066,0.675],[-7.48,-0.54,0.107],[-2.931,0.967,-6.836],[-5.228,4.392,-3.104],[-1.243,6.891,2.689],[2.342,6.497,-2.925],[-2.302,-6.961,-1.582],[-7.029,1.477,-2.16],[6.489,3.712,-0.602],[1.63,5.612,4.701],[5.208,-2.618,4.72],[3.925,-2.76,-5.765],[1.636,0.89,-7.265],[-4,0.303,6.337],[-2.906,-1.982,-6.624],[-3.085,6.246,-2.78],[6.983,-2.443,-1.235],[-1.824,6.346,3.557],[5.208,1.661,5.135],[6.874,2.873,-0.86],[6.38,3.834,0.916],[-5.694,2.565,4.153],[-4.785,-5.652,1.188],[7.127,2.042,-1.134],[0.829,-5.182,-5.359],[-5.337,4.194,3.191],[3.592,-1.239,6.467],[-4.352,3.531,-4.984],[5.152,2.495,4.846],[-4.856,0.764,5.665],[5.649,4.871,0.79],[0.872,-3.568,-6.539],[-3.053,0.215,6.847],[-1.565,-7.306,0.648],[6.052,-3.914,2.076],[-2.391,-5.469,-4.541],[3.059,4.327,-5.308],[6.115,-2.044,-3.831],[-7.308,-0.833,-1.468],[-5.806,-4.51,-1.485],[5.843,4.42,1.603],[2.624,-0.79,6.982],[-6.588,3.019,-1.931],[-7.312,0.922,-1.393],[4.631,-5.868,-0.61],[-4.462,-6.028,-0.124],[-0.529,-6.935,2.808],[5.098,-3.034,4.588],[4.128,6.253,-0.341],[-5.469,-2.313,4.582],[3.295,-3.578,-5.709],[0.519,-2.466,-7.064],[2.84,-0.301,6.935],[-6.746,2.249,-2.385],[-4.912,-5.376,-1.797],[-5.483,-3.701,-3.536],[-7.1,-2.416,0.057],[-0.133,-4.561,5.953],[-1.354,0.15,7.376],[6.822,2.277,2.128],[-0.598,-4.714,-5.803],[-4.356,3.14,-5.236],[-3.79,4.856,-4.278],[2.924,4.115,5.547],[-0.879,-5.597,4.914],[-0.933,6.324,3.923],[-7.213,0.597,1.967],[-5.445,5.083,-0.876],[0.719,3.957,-6.331],[2.77,-6.775,-1.636],[7.412,0.624,0.965],[-2.086,-4.031,-5.971],[5.605,-2.594,4.255],[7.041,-0.568,2.52],[0.404,-7.319,1.587],[6.917,0.111,2.897],[-1.642,-3.809,6.249],[-4.118,1.8,-6.005],[-3.391,6.65,-0.725],[-7.05,-0.674,-2.47],[4.059,-0.493,6.288],[-3.511,-6.419,-1.649],[3.947,-2.816,5.722],[4.662,-5.542,1.95],[-4.299,0.879,-6.083],[7.271,-0.858,1.627],[6.748,1.535,2.892],[3.714,-0.248,6.511],[-4.511,-4.691,3.728],[1.05,6.162,-4.145],[-0.224,5.657,-4.92],[-7.262,-1.732,-0.714],[-2.919,4.26,5.439],[-6.955,2.72,0.695],[-2.749,-6.061,3.459],[-5.64,4.473,2.106],[-0.419,6.906,-2.896],[-2.434,3.909,-5.92],[-4.039,-5.262,3.5],[7.466,0.38,0.607],[5.844,4.68,-0.442],[-6.754,0.175,3.257],[2.185,-5.593,4.494],[-0.22,6.754,-3.254],[-1.964,3.78,6.173],[-6.498,3.486,1.369],[-3.28,3.211,5.932],[-3.016,4.694,5.012],[-6.363,-2.557,-3.038],[-1.164,-6.818,2.9],[0.366,6.754,3.24],[1.746,-6.941,-2.242],[-4.996,-4.261,3.625],[2.4,1.583,-6.927],[2.216,0.412,7.154],[-4.715,5.121,-2.791],[-1.581,3.547,-6.417],[5.921,1.258,4.428],[3.369,-2.42,-6.249],[5.186,-4.043,3.607],[2.385,3.938,-5.921],[7.376,-1.288,-0.436],[2.41,6.961,1.411],[-4.015,-6.31,0.561],[5.229,3.168,4.345],[-6.242,3.847,-1.578],[0.371,0.238,7.487],[2.185,-2.218,-6.824],[7.003,-2.17,1.58],[0.96,4.487,-5.933],[3.918,1.573,6.199],[3.047,-0.544,-6.832],[4.248,4.806,-3.886],[1.742,7.281,0.448],[2.617,-1.156,-6.933],[0.692,4.27,6.127],[-5.749,4.817,-0.022],[-5.787,0.005,4.771],[5.788,-4.721,-0.678],[-3.553,5.795,3.17],[-6.313,3.659,1.736],[-4.227,5.779,-2.234],[6.373,3.936,0.378],[1.5,-5.207,-5.186],[7.165,1.014,1.973],[-3.33,5.503,3.857],[-7.037,-0.086,2.594],[-4.417,-1.265,5.928],[1.525,5.795,-4.511],[4.443,2.563,5.472],[0.763,7.084,-2.343],[-6.694,-3.212,1.06],[-3.873,3.196,5.571],[4.88,-4.492,3.502],[-5.769,-4.732,-0.767],[2.139,-3.309,6.382],[-3.521,-2.338,6.196],[-4.151,2.863,-5.552],[7.421,0.513,-0.956],[4.873,-3.445,4.544],[-4.741,2.885,-5.045],[-2.785,4.138,-5.601],[-5.707,0.932,-4.777],[1.474,-4.868,5.512],[-2.372,-7.087,0.634],[6.17,0.62,4.219],[-2.363,-1.886,-6.864],[-2.949,6.879,-0.487],[-1.87,3.119,-6.56],[-3.146,6.093,3.038],[7.389,0.276,1.258],[-0.082,-7.162,-2.224],[0.086,-7.47,0.672],[1.921,-6.695,-2.781],[-6.503,-1.763,-3.294],[4.485,-5.523,2.375],[6.097,3.66,2.383],[-0.766,5.078,-5.466],[5.835,3.061,3.583],[-3.668,-6.251,1.929],[3.435,6.147,2.581],[7.01,1.343,2.304],[-7.296,-0.562,1.644],[6.605,-3.346,1.194],[6.237,-4.164,-0.099],[-5.865,4.358,1.693],[5.992,4.036,-2.015],[1.921,-2.799,6.688],[-7.02,0.981,2.451],[-2.917,3.696,-5.838],[-0.191,-0.873,7.447],[2.431,-6.294,-3.276],[3.146,-3.173,-6.024],[3.709,-3.935,5.197],[-1.841,-6.425,3.404],[-0.409,-1.35,7.366],[4.951,-4.333,-3.601],[5.767,4.518,-1.607],[1.376,-6.427,-3.612],[1.1,-7.189,-1.832],[1.955,-5.927,-4.159],[-5.028,3.371,-4.428],[-5.848,-1.527,-4.441],[-6.712,3.049,1.379],[5.497,5.078,-0.505],[1.779,-4.533,-5.705],[-3.718,-1.875,6.238],[6.967,2.607,0.96],[-0.303,-6.636,3.483],[3.951,0.795,-6.325],[2.606,0.671,7.001],[0.39,7.484,0.293],[0.046,-7.288,-1.771],[1.027,-1.321,-7.311],[-2.359,-4.581,5.45],[2.093,5.99,-3.999],[-6.042,4.444,0.023],[4.795,-4.275,3.872],[-6.719,-1.331,-3.056],[-4.585,5.629,-1.883],[4.928,2.029,-5.278],[-2.266,-0.844,7.1],[1.284,-6.322,3.826],[4.86,5.63,-0.966],[-4.673,-5.791,-0.937],[3.777,2.074,6.139],[2.344,-6.802,2.118],[4.566,1.737,-5.691],[0.83,7.089,2.304],[2.482,-4.711,5.282],[4.045,2.462,-5.817],[-3.478,-0.32,6.638],[2.931,-6.898,-0.29],[5.817,0.215,-4.73],[1.382,-7.136,1.849],[7.442,0.895,0.263],[0.815,5.027,5.506],[5.853,-4.481,-1.386],[7.177,-0.667,2.072],[-3.008,-6.145,3.073],[1.789,-4.587,5.658],[3.876,3.905,5.097],[0.29,3.523,-6.615],[-2.082,-1.316,7.084],[0.916,-7.32,1.352],[-0.493,-4.737,5.794],[-0.296,2.897,6.912],[-5.765,2.707,-3.961],[7.369,-0.274,1.369],[5.715,4.31,2.239],[3.132,-6.72,1.133],[-1.033,5.741,4.714],[4.975,-3.3,-4.54],[-4.851,-4.656,3.322],[-4.865,-3.083,-4.804],[4.173,-0.155,-6.23],[5.223,-3.829,-3.783],[-1.285,0.763,-7.35],[3.677,-6.298,1.752],[-4.24,-2.13,-5.808],[-5.425,-4.536,-2.5],[6.852,-1.589,-2.603],[6.345,-1.739,-3.602],[3.452,-6.218,-2.382],[5.398,-5.065,-1.206],[-3.686,-5.243,-3.896],[5.664,1.854,-4.554],[-5.614,3.55,3.484],[1.873,-6.296,-3.621],[6.332,2.748,2.933],[-7.307,1.532,0.716],[-5.865,3.602,-2.981],[3.472,6.165,-2.488],[-1.886,-7.249,-0.381],[-0.702,7.176,2.065],[-0.725,-0.664,7.436],[-1.914,-2.903,-6.645],[-2.219,2.911,6.546],[3.194,3.904,-5.551],[-2.224,5.111,-5.019],[3.358,-0.873,6.649],[4.876,-2.784,-4.972],[-2.438,5.578,4.381],[-1.182,-6.568,-3.422],[-0.884,-7.006,2.528],[4.434,6.011,0.675],[7.177,-0.914,-1.978],[6.532,2.761,2.442],[-6.163,3.154,2.885],[2.984,3.632,5.844],[4.41,-4.068,-4.501],[4.613,-4.815,-3.433],[-6.895,-0.413,-2.922],[-0.099,-7.46,-0.773],[-6.991,-2.137,-1.677],[0.341,7.155,-2.222],[0.263,7.142,2.275],[-5.237,-2.89,-4.524],[4.937,5.639,0.295],[-5.047,-1.829,5.238],[-0.006,4.577,5.942],[0.623,2.271,7.121],[-6.446,-1.897,3.333],[5.972,-4.152,-1.831],[-2.676,-5.089,-4.816],[-4.032,-3.369,-5.353],[5.927,4.447,-1.161],[5.027,4.858,2.718],[-2.452,-4.482,-5.491],[2.922,1.38,-6.768],[-5.43,-1.366,-4.99],[-6.253,-1.936,-3.662],[-0.863,-0.339,-7.443],[-0.874,7.117,-2.201],[-4.294,-3.124,5.297],[1.02,3.077,6.763],[1.595,-1.979,-7.056],[-0.865,3.173,-6.741],[-2.749,-6.931,0.814],[-3.929,-0.393,-6.376],[-2.513,7.016,-0.844],[-5.534,1.96,-4.667],[-5.74,-4.1,2.548],[1.43,3.153,6.654],[2.396,4.726,5.308],[2.942,-4.731,-5.022],[-1.926,-0.391,7.238],[-4.043,6.295,0.536],[-2.231,1.91,6.901],[4.186,-4.778,3.987],[-1.634,-5.074,5.276],[-0.389,-6.58,-3.578],[-6.336,3.307,-2.274],[7.226,1.842,0.806],[0.092,5.807,4.746],[-2.268,1.358,7.019],[-1.665,6.779,2.744],[-6.067,4.328,-0.845],[2.288,-6.122,-3.679],[-2.939,-6.899,-0.118],[0.164,-7.498,0.084],[-1.425,4.309,-5.971],[-4.469,-4.981,3.387],[-0.093,-3.749,6.495],[3.632,5.784,-3.099],[-2.854,-6.044,-3.403],[-5.685,-1.881,-4.516],[6.465,-3.772,-0.478],[-6.722,3.167,-1.016],[0.193,5.462,5.136],[4.986,3.535,4.346],[-2.634,-5.895,-3.817],[5.362,0.538,5.216],[2.499,-3.775,-5.98],[-6.52,-3.705,0.082],[3.173,-3.364,5.905],[-4.207,5.914,1.891],[2.602,-5.509,4.374],[0.202,-1.728,7.296],[-1.607,4.547,5.745],[3.92,-0.958,-6.322],[-0.022,-2.291,-7.142],[6.066,4.41,-0.055],[-2.57,-6.929,1.282],[6.745,3.232,-0.556],[6.821,-2.246,2.164],[7.419,-0.331,-1.047],[-7.32,0.302,1.605],[4.99,-1.91,-5.263],[-5.245,-5.362,0.003],[4.183,-6.221,0.238],[-1.48,6.615,3.21],[3.896,-5.523,-3.252],[1.832,-3.164,-6.549],[-5.074,-5.446,0.926],[4.624,-5.705,-1.523],[3.298,3.811,5.555],[-0.861,-7.342,1.267],[-6.328,2.342,-3.275],[-6.026,-4.118,-1.727],[-7.005,2.242,1.468],[5.097,4.575,3.056],[6.289,3.971,-0.97],[5.672,3.875,-3.011],[-2.293,3.005,-6.478],[5.688,-4.771,-1.065],[2.021,-4.909,5.298],[4.365,3.865,-4.718],[1.42,-4.431,5.882],[-0.455,-2.412,7.087],[1.505,6.966,-2.337],[-6.732,3.251,-0.6],[-2.834,-2.797,-6.356],[1.928,6.263,-3.648],[-7.22,-1.622,-1.225],[-3.562,6.428,1.499],[-0.195,7.128,-2.324],[3.925,-6.263,-1.272],[-4.621,3.729,-4.582],[-7.152,2.256,0.122],[-0.422,0.397,7.478],[-5.253,4.976,1.975],[-3.896,2.146,-6.039],[2.183,-4.587,-5.518],[-2.507,-0.149,-7.067],[-7.073,-2.464,-0.392],[0.745,-7.158,-2.113],[4.789,3.106,-4.866],[-4.249,-4.329,-4.411],[-2.717,6.617,-2.254],[-6.382,-0.605,3.892],[1.428,-3.352,-6.556],[-5.788,-2.053,4.305],[1.599,-2.386,-6.928],[-5.995,4.008,2.061],[7.357,-1.265,0.725],[-7.415,-0.522,-1.002],[-4.962,-0.72,5.578],[-5.965,-4.423,-1.054],[-2.67,-4.829,5.08],[-7.071,1.842,-1.69],[-0.44,-1.985,-7.219],[4.22,-2.347,-5.739],[-3.613,6.567,-0.264],[3.375,3.344,5.803],[4.827,5.594,1.286],[-6.025,2.776,-3.499],[-2.93,-5.26,-4.473],[-4.9,-5.669,-0.324],[2.844,-1.585,6.757],[4.217,6.076,-1.247],[6.596,3.342,1.255],[0.245,1.945,7.24],[4.53,-3.648,-4.736],[-5.934,2.141,-4.056],[0.162,5.79,-4.764],[6.495,-1.416,3.473],[3.666,5.405,-3.687],[-6.513,-2.135,-3.045],[4.256,-1.044,6.087],[-4.724,-3.675,4.52],[4.511,-3.602,4.788],[-0.699,-7.466,0.172],[-1.913,-5.004,-5.249],[-2.647,-6.752,-1.911],[-3.392,0.576,-6.664],[-2.877,2.179,-6.574],[1.166,6.024,4.313],[-4.586,-1.723,-5.68],[-1.466,-0.449,7.342],[-2.274,-3.793,6.058],[-0.085,-2.666,7.01],[1.137,-7.364,0.857],[2.916,2.029,6.606],[6.12,0.119,-4.334],[4.039,6.247,0.957],[-2.602,4.859,5.087],[7.333,1.501,0.471],[-4.076,-6.046,-1.757],[-6.825,-3.035,0.679],[4.464,5.972,-0.81],[4.503,-2.559,-5.425],[-4.496,1.849,5.711],[-5.638,3.21,3.763],[-1.172,6.403,-3.726],[-5.025,0.034,5.568],[-6.221,-2.378,-3.449],[5.568,-3.655,-3.447],[1.404,5.082,5.334],[5.071,4.913,-2.531],[4.3,5.584,-2.564],[5.413,4.51,2.572],[-3.612,-2.995,5.851],[0.521,2.646,-6.999],[3.217,3.512,-5.794],[-2.684,-0.598,6.978],[-0.625,-5.999,-4.458],[-4.018,-3.935,4.962],[3.231,0.669,6.735],[4.614,5.652,-1.738],[-3.08,-4.831,4.84],[3.253,-1.517,6.585],[-6.17,3.744,-2.04],[-6.7,0.583,-3.319],[2.538,6.397,2.982],[2.48,5.819,-4.03],[7.188,-2.045,-0.64],[0.182,7.447,-0.869],[3.864,-6.409,-0.491],[2.998,-6.526,-2.163],[-2.957,-6.815,-1.028],[3.707,3.645,5.406],[3.169,-6.603,-1.617],[0.685,-7.458,-0.395],[4.097,0.352,-6.272],[6.597,1.425,-3.272],[-3.624,4.637,-4.65],[1.947,4.035,6.016],[-7.364,-0.322,-1.384],[-5.025,-2.311,5.066],[4.637,-1.279,5.755],[6.715,-1.409,-3.028],[-0.914,-4.402,-6.003],[-1.73,4.852,5.452],[-4.559,4.733,3.614],[-5.125,-4.627,-2.928],[-5.075,4.115,3.683],[-5.62,4.819,1.203],[-3.213,-6.483,1.973],[-6.734,-3.08,-1.191],[-3.79,6.227,-1.763],[0.996,-5.715,4.754],[-4.811,4.755,-3.24],[-3.045,-0.282,6.848],[-4.883,1.484,-5.496],[1.971,1.827,-7.002],[4.065,5.881,2.268],[5.442,5.154,0.263],[-4.424,2.987,5.268],[-1.919,5.783,-4.374],[-7.092,-1.701,-1.75],[2.834,-6.218,-3.091],[-0.283,-0.274,-7.49],[-2.523,2.548,-6.588],[-2.859,-3.068,6.218],[4.082,-3.092,-5.48],[3.432,-6.665,-0.219],[-3.253,-0.74,6.717],[-2.635,0.018,7.022],[-1.829,-7.072,-1.703],[-3.525,-2.794,-6.002],[2.595,-6.352,3.029],[6.208,3.682,-2.039],[6.363,-0.129,3.968],[-6.924,0.632,-2.814],[4.666,-5.521,-1.999],[-2.738,6.56,2.391],[-3.605,-6.506,0.964],[7.225,1.047,-1.72],[3.392,-5.218,4.185],[2.698,6.152,3.336],[-3.647,-6.116,2.357],[-2.303,-6.28,3.393],[-5.626,4.592,-1.875],[-2.688,4.013,5.738],[2.972,6.817,-0.972],[7.001,0.888,-2.539],[7.444,-0.197,0.896],[-0.108,-1.167,-7.408],[4.36,0.878,-6.039],[-7.172,-1.865,1.153],[-5.077,-3.405,4.345],[-2.121,-2.594,6.71],[3.822,-6.102,2.101],[-4.188,-5.781,2.3],[-4.36,-4.356,4.275],[-1.143,5.208,-5.274],[-2.419,-3.27,6.302],[-5.159,0.979,5.355],[-2.663,-5.211,4.691],[-6.705,1.501,-3.008],[7.024,-2.073,-1.62],[-3.706,5.524,3.464],[-1.94,6.833,2.409],[0.201,-6.521,-3.699],[-3.634,6.53,0.638],[-1.139,-5.236,-5.248],[-1.978,3.319,6.428],[1.103,-6.286,-3.94],[-1.853,7.058,1.733],[4.752,-5.733,0.898],[6.331,-3.393,-2.16],[-5.998,-0.233,-4.497],[6.414,1.121,-3.722],[2.903,5.691,-3.929],[6.251,3.327,-2.471],[5.389,0.061,-5.216],[-7.239,1.474,1.296],[6.074,4.064,1.689],[4.848,5.375,-1.965],[6.223,2.723,-3.181],[3.352,-5.672,-3.584],[0.898,6.711,-3.227],[4.535,0.258,5.968],[-1.293,-2.457,-6.967],[1.417,6.206,3.966],[-5.992,2.474,3.773],[-7.411,0.218,1.133],[4.959,-5.606,-0.481],[3.057,6.204,2.901],[2.796,-6.654,2.04],[1.664,0.421,-7.301],[5.003,-5.18,2.096],[-6.513,1.837,3.234],[5.267,-2.004,4.95],[-7.265,-0.164,1.857],[6.541,2.932,-2.207],[-5.622,-3.91,3.059],[-0.156,6.552,3.647],[6.686,3.396,-0.12],[2.359,0.416,-7.108],[-4.102,1.948,5.969],[-0.559,-0.184,7.477],[-4.404,2.282,5.625],[3.174,-6.703,-1.118],[4.247,-5.843,2.02],[4.676,1.313,-5.715],[1.631,4.305,-5.921],[2.62,-1.991,-6.74],[2.309,-5.705,-4.286],[-5.003,-2.324,-5.082],[0.849,-5.398,5.137],[4.87,4.23,-3.826],[2.303,6.867,1.949],[-5.523,0.873,4.998],[-5.646,-1.715,4.629],[5.313,1.76,-4.993],[-4.846,1.346,5.564],[-5.363,0.18,-5.24],[1.244,-3.362,6.588],[2.137,6.27,3.517],[-5.649,2.347,-4.339],[4.706,-5.662,1.431],[4.31,-1.543,5.941],[3.086,6.772,0.931],[1.494,1.897,-7.101],[-1.752,-0.007,-7.293],[-5.773,4.627,-1.232],[2.163,-6.758,-2.431],[-5.777,-4.278,-2.139],[5.288,5.318,-0.122],[1.703,2.043,7.013],[-3.797,-3.313,5.555],[0.713,-7.145,2.166],[-0.64,-6.211,4.155],[-0.318,1.476,7.347],[4.616,4.06,-4.297],[-5.292,5.313,0.153],[0.931,1.525,7.284],[-2.327,5.707,-4.274],[2.792,-6.458,2.599],[-3.69,-6.365,1.456],[1.789,3.571,6.348],[1.01,-7.431,-0.126],[-6.33,-3.813,1.281],[6.634,-1.094,-3.323],[1.408,3.287,-6.593],[3.753,4.291,4.874],[0.547,1.105,7.398],[2.953,-2.557,6.402],[4.165,-5.078,-3.623],[-5.167,2.561,4.795],[-0.511,7.309,1.602],[6.395,-3.79,-0.994],[-0.162,-7.334,1.564],[3.452,-2.969,5.96],[6.135,2.297,3.653],[-3.279,2.219,-6.37],[-3.94,3.379,-5.414],[2.784,-1.525,-6.795],[6.106,-2.813,-3.326],[-4.432,0.392,6.038],[-6.148,4.016,1.524],[-0.98,-4.546,5.884],[5.716,4.387,-2.083],[2.385,-7.109,-0.143],[-7.011,2.294,-1.353],[-2.474,-1.763,6.858],[-5.727,-4.825,0.406],[-7.011,-0.958,2.487],[-0.3,4.964,-5.614],[-2.825,-4.454,5.333],[1.333,-5.404,5.027],[-4.038,-4.824,-4.083],[1.54,-6.601,-3.211],[-2.091,-7.09,1.267],[5.599,-1.359,-4.801],[-6.296,-4.058,0.383],[2.533,-0.712,-7.023],[2.427,-6.809,-1.999],[-3.511,2.598,6.097],[6.436,3.85,-0.099],[3.058,5.97,-3.356],[5.124,-1.324,-5.315],[3.16,-5.705,3.705],[6.881,1.133,2.76],[3.39,6.608,-1.048],[-7.383,0.699,1.123],[-2.302,-5.513,4.535],[-6.426,-3.776,0.833],[5.148,3.838,-3.875],[6.931,2.018,-2.036],[5.259,0.088,5.347],[-2.116,2.357,-6.798],[-6.199,4.202,0.407],[-0.239,-3.713,-6.512],[0.168,7.276,-1.814],[2.062,-6.362,3.394],[-4.159,2.773,5.591],[-3.608,-6.563,0.4],[-4.538,-0.728,5.927],[-0.176,2.104,-7.197],[4.092,-6.074,-1.617],[6.046,-2.925,3.339],[-2.794,0.388,-6.95],[1.738,2.515,6.849],[-3.651,4.048,5.151],[-5.231,5.257,1.117],[1.158,-2.944,6.8],[1.189,6.842,2.833],[-2.703,1.47,6.84],[0.309,-6.722,-3.313],[-5.743,-2.964,3.807],[-4.261,-5.716,-2.329],[-6.054,0.135,4.425],[4.022,4.641,-4.305],[6.285,-2.884,-2.905],[5.579,-5.008,0.227],[-0.711,6.995,-2.611],[6.947,-1.749,2.22],[-5.479,4.884,-1.543],[-0.668,-3.136,-6.78],[0.563,7.388,-1.162],[-0.699,-7.461,-0.305],[1.106,5.808,-4.615],[-3.487,-3.276,-5.776],[7.087,-1.115,2.187],[-6.525,3.662,-0.516],[5.139,-0.407,-5.448],[-5.448,-4.301,2.841],[-3.921,0.579,-6.367],[6.256,0.715,-4.075],[-6.188,0.235,-4.231],[-1.926,-7.195,0.878],[4.291,-4.445,4.252],[4.521,-4.335,-4.125],[-5.07,-0.574,-5.497],[-1.244,7.384,-0.425],[1.233,0.873,7.346],[1.561,7.281,0.894],[-0.139,0.416,-7.487],[-4.923,5.655,0.17],[0.552,3.846,6.415],[-0.871,5.207,5.327],[4.045,-6.26,0.841],[-3.102,2.851,6.205],[-6.721,-3.32,-0.229],[-1.416,4.199,6.051],[-3.633,3.83,-5.328],[0.662,6.216,4.144],[3.207,-5.987,-3.182],[-4.201,-1.666,5.985],[5.363,4.955,1.715],[5.892,0.803,4.57],[-5.001,-5.145,-2.186],[3.602,-6.077,2.521],[6.628,-3.114,1.621],[2.821,6.452,2.583],[5.622,-1.788,4.631],[-5.661,-0.343,-4.907],[-5.376,4.703,-2.286],[3.848,6.438,-0.028],[-7.209,0.158,-2.063],[-5.656,-2.317,-4.347],[-5.01,-5.22,1.976],[-2.542,0.812,-7.009],[-4.738,-0.649,-5.778],[0.797,0.657,-7.429],[-0.299,-7.482,0.428],[4.386,3.427,-5.028],[0.28,2.148,-7.18],[7.384,-1.31,0.116],[5.093,5.419,0.973],[-7.468,0.56,-0.406],[-4.468,-2.513,-5.475],[5.462,4.521,-2.444],[1.201,-6.627,3.302],[4.984,1.069,-5.502],[-1.327,1.353,7.257],[-2.171,-6.118,-3.757],[-4.44,-6.033,0.381],[-6.205,-3.738,-1.944],[2.385,6.665,2.479],[6.664,2.312,2.549],[1.967,4.826,5.394],[5.882,-1.099,-4.521],[1.649,4.561,5.721],[-2.018,2.507,6.775],[-0.858,-4.924,5.592],[-7.156,-2.201,0.441],[0.673,3.096,-6.798],[-7.487,0.429,0.119],[-5.996,-4.463,0.617],[-3.686,-4.925,-4.291],[3.447,-1.873,6.392],[-5.382,3.849,3.532],[3.139,5.348,4.218],[-3.485,-5.861,-3.123],[-1.91,-6.826,-2.452],[-2.274,7.147,0.059],[5.627,-4.792,1.276],[3.181,1.03,-6.713],[-6.749,3.135,0.937],[-4.374,-0.749,-6.046],[1.183,1.363,-7.28],[-6.924,-1.01,-2.701],[2.01,-0.3,7.22],[-0.439,4.108,-6.259],[6.07,4.131,-1.532],[-5.252,-0.265,5.348],[-1.244,6.969,-2.478],[3.797,3.189,5.627],[-2.149,1.804,-6.956],[4.982,-4.726,3.016],[4.877,-2.036,5.322],[1.1,-6.777,-3.018],[-3.963,-6.355,-0.399],[3.117,3.154,-6.049],[-4.716,-4.308,3.931],[-5.96,-2.419,-3.857],[-7.033,1.877,1.806],[-5.559,-3.102,-3.967],[-1.53,-6.763,-2.858],[-6.945,-1.936,2.067],[-0.121,3.356,6.706],[-0.867,2.717,-6.937],[2.164,7.162,0.522],[-1.406,-6.209,-3.965],[-7.362,1.419,0.188],[6.262,3.169,2.646],[-3.083,2.652,-6.302],[2.056,0.093,-7.212],[-0.475,7.432,0.892],[-1.477,3.305,6.569],[-5.91,-4.458,1.208],[-3.137,-6.372,2.412],[-5.583,3.615,-3.467],[1.217,5.634,4.799],[-6.488,1.456,-3.47],[-3.226,3.945,-5.503],[-1.219,-4.709,-5.709],[2.379,-7.075,0.734],[0.589,-6.852,-2.994],[-4.915,2.436,-5.115],[3.342,2.258,-6.323],[-4.715,-3.991,-4.254],[3.046,0.015,-6.854],[-0.171,-5.301,5.304],[2.222,-1.743,-6.948],[-7.099,-2.098,-1.208],[4.653,2.509,-5.32],[0.841,-6.986,-2.595],[-2.748,1.865,6.725],[4.06,5.138,-3.656],[3.726,-3.186,5.676],[-6.083,3.2,-3.001],[-7.327,0.101,-1.597],[6.922,-2.886,0.065],[3.691,6.288,1.757],[6.581,-2.677,2.404],[-0.936,4.157,-6.172],[-3.203,5.483,-3.991],[-1.662,6.997,-2.13],[4.266,-6.077,-1.061],[-3.099,-6.823,0.31],[-2.884,-2.532,6.444],[-4.62,-2.635,5.288],[-2.019,-7.215,0.34],[-3.626,-3.966,5.232],[-1.634,5.587,4.73],[-0.075,3.798,6.467],[4.148,-5.563,-2.846],[1.139,7.301,-1.287],[-2.856,-6.354,-2.778],[4.277,-2.981,5.392],[-1.346,5.912,4.415],[0.342,-6.706,3.342],[7.085,2.33,-0.792],[3.297,4.51,5.004],[-1.182,-1.804,7.183],[-5.006,5.042,-2.402],[-2.108,6.588,-2.899],[6.893,1.705,-2.416],[-4.317,6.128,-0.259],[6.985,2.7,-0.414],[2.583,2.356,6.636],[-4,-0.833,-6.29],[5.773,-4.285,2.136],[-1.386,-7.36,-0.401],[1.535,-0.399,7.331],[-0.71,-7.184,-2.034],[5.989,3.983,2.126],[5.423,-1.968,-4.792],[1.618,6.4,3.561],[-0.68,-1.55,-7.307],[-0.18,6.033,-4.452],[6.465,-1.042,3.657],[-0.636,3.748,-6.465],[4.425,-5.36,2.818],[-6.768,1.812,-2.675],[-5.968,-3.649,-2.706],[-5.308,3.359,4.098],[0.064,-4.019,-6.332],[-5.203,1.592,-5.162],[2.339,5.357,4.699],[3.703,4.442,-4.776],[0.145,-5.752,-4.811],[2.101,-2.327,6.813],[4.465,-2.961,-5.248],[1.816,-5.608,-4.637],[6.97,-2.598,0.958],[-5.344,-3.913,3.52],[-1.066,-6.037,-4.32],[-7.462,-0.127,0.743],[-7.323,1.277,-0.998],[6.768,2.959,-1.299],[-7.343,-1.521,0.116],[1.026,7.171,-1.944],[-1.558,7.275,-0.95],[3.302,-4.539,4.975],[-3.584,-5.87,2.991],[-3.401,-2.121,-6.339],[3.734,-5.384,-3.651],[-0.66,7.456,-0.47],[-6.094,2.361,-3.68],[5.91,-4.515,0.974],[-0.058,0.128,7.499],[-0.124,-6.786,-3.191],[4.627,4.028,4.315],[3.625,-3.218,-5.723],[3.983,0.584,6.328],[-3.067,-6.747,1.149],[-0.045,6.546,-3.66],[-6.742,2.183,2.456],[0.494,-7.299,-1.654],[-5.211,0.496,5.371],[7.29,1.73,-0.338],[-2.126,-0.385,-7.182],[7.033,-1.322,-2.246],[2.387,5.574,-4.415],[1.957,5.602,-4.587],[-0.513,-6.878,-2.946],[-1.101,7.06,2.278],[-2.071,-6.116,3.816],[3.368,5.714,-3.502],[-6.235,-3.391,-2.426],[5.901,4.51,1.041],[1.359,0.068,-7.376],[-3.243,-3.203,5.956],[3.272,5.17,-4.338],[-0.715,0.474,-7.451],[4.347,-0.173,6.109],[-5.93,-3.119,3.37],[-3.212,-2.533,-6.286],[-5.404,-5.187,-0.384],[-5.172,3.882,-3.799],[0.417,-4.39,-6.067],[4.128,5.467,3.055],[5.283,-5.259,-0.825],[-3.545,6.606,0.203],[-7.48,-0.371,-0.399],[0.645,7.434,0.754],[-4.537,-5.629,1.998],[-3.344,-6.597,-1.243],[3.508,-0.933,-6.563],[6.324,3.782,-1.399],[-1.357,3.192,-6.65],[1.674,-6.603,3.139],[0.922,2.505,-7.009],[-6.744,-1.752,-2.776],[-1.715,2.91,6.696],[-2.17,0.387,7.169],[4.045,-4.241,4.68],[-2.227,7.118,0.795],[-3.588,-5.546,3.553],[3.873,3.028,-5.664],[1.129,3.651,-6.454],[-5.931,1.264,-4.413],[5.012,4.369,3.47],[7.381,1.33,-0.005],[1.907,7.087,-1.548],[-4.857,2.013,-5.349],[-0.634,3.177,6.764],[7.232,-1.674,1.069],[5.655,0.923,-4.84],[-5.441,-3.117,4.115],[-3.269,5.216,4.285],[-3.818,6.362,1.094],[-4.916,5.269,2.078],[-2.515,-1.279,6.949],[6.728,-1.232,3.078],[-2.289,1.277,-7.027],[7.487,-0.097,0.433],[-5.054,0.444,-5.523],[6.071,-0.55,-4.37],[3.637,-5.854,2.959],[-1.662,-4.556,-5.721],[3.911,-5.486,3.295],[-0.216,6.045,4.435],[5.372,5.093,1.205],[-3.211,0.202,-6.775],[2.213,3.281,6.371],[-6.753,-3.255,0.216],[-6.177,-4.153,0.925],[-5.058,4.606,3.076],[-2.701,6.865,1.353],[-0.866,-7.021,-2.491],[5.058,-1.271,5.39],[-4.725,4.301,3.928],[0.366,-7.112,-2.353],[2.953,-5.645,-3.958],[0.138,3.095,-6.83],[4.323,-1.014,-6.044],[-5.112,-3.933,-3.828],[3.422,6.674,-0.073],[2.73,-6.984,0.159],[6.927,-0.962,2.711],[3.184,-5.959,3.257],[5.121,3.206,-4.444],[2.537,4.49,-5.446],[-4.477,5.999,0.466],[-6.025,1.999,3.994],[5.897,-0.04,4.634],[-3.056,-4.871,-4.816],[-5.279,5.175,-1.265],[-6.198,2.752,3.203],[-3.003,3.684,5.802],[-3.959,6.353,-0.466],[0.442,5.416,-5.169],[4.926,5.654,-0.126],[-4.972,3.494,4.396],[-4.018,-2.568,-5.789],[-3.974,-4.439,4.555],[-1.728,6.823,-2.59],[-4.197,-5.014,-3.674],[-1.343,2.627,6.896],[-2.036,-1.425,-7.077],[0.661,7.29,-1.634],[-2.722,2.645,6.469],[0.179,2.926,6.904],[3.719,1.985,-6.203],[-5.56,-3.962,-3.106],[6.853,-2.917,-0.883],[-6.85,3.033,0.366],[-1.338,7.308,1.029],[2.879,2.213,-6.563],[-7.441,0.94,0.065],[1.033,-6.144,4.175],[-6.843,0.876,2.943],[-0.718,7.245,-1.804],[3.827,-1.819,6.188],[-0.413,6.292,4.06],[4.187,-1.992,5.895],[5.02,0.249,-5.567],[-4.379,5.596,2.4],[2.119,-7.096,1.188],[1.037,-0.358,-7.419],[-7.385,-0.741,1.082],[-7.062,1.051,-2.297],[-0.147,3.605,-6.575],[1.381,1.753,7.161],[2.275,-2.918,-6.524],[5.812,2.269,-4.163],[-4.556,1.027,5.869],[2.421,-0.309,7.092],[2.35,-6.943,1.59],[-1.446,5.874,-4.434],[4.501,2.182,-5.589],[1.498,-2.653,6.854],[-1.412,6.33,3.767],[1.637,-7.219,-1.209],[2.31,-5.84,4.101],[4.278,5.405,-2.956],[-5.783,4.709,-0.801],[0.169,2.468,7.081],[-1.109,-1.361,7.292],[-5.632,3.157,-3.817],[0.894,6.469,-3.688],[2.141,4.338,-5.732],[-2.318,-0.267,7.128],[-5.373,-3.508,3.884],[-1.584,6.114,-4.045],[-6.553,-2.656,-2.501],[2.625,-6.609,-2.384],[-0.903,7.323,1.348],[2.86,4.52,5.257],[-4.456,-3.901,-4.602],[-0.748,-4.229,6.149],[4.087,-3.842,4.979],[-6.285,0.745,-4.025],[-4.559,3.343,4.929],[-6.275,3.964,1.078],[0.341,3.481,6.635],[4.33,3.514,5.016],[-3.528,6,-2.793],[-1.926,-5.325,4.918],[5.728,-1.768,-4.508],[5.047,5.385,-1.334],[4.776,0.704,-5.74],[3.592,-5.373,3.805],[5.356,3.516,3.899],[3.407,5.471,3.836],[5.543,-0.407,5.036],[0.216,6.161,-4.271],[5.936,3.023,-3.447],[-5.626,4.897,0.785],[5.453,-2.265,4.624],[1.962,3.913,-6.09],[-1.674,-0.546,-7.291],[4.018,-6.178,1.393],[-3.738,5.258,3.825],[2.866,2.627,6.414],[-0.601,-3.978,-6.33],[-5.788,-3.583,-3.148],[-6.529,2.223,2.947],[-0.823,6.715,-3.238],[3.812,-0.158,-6.457],[-1.193,6.808,-2.911],[-4.829,2.795,5.012],[6.029,-0.909,4.368],[2.611,-6.929,-1.195],[1.071,-0.262,7.419],[4.633,-3.196,4.957],[-6.832,-1.751,2.551],[-0.237,5.333,-5.268],[1.539,-5.669,4.663],[6.963,2.742,0.503],[-0.9,-4.979,-5.536],[3.318,-0.09,6.726],[5.255,-3.339,4.181],[2.411,5.238,-4.796],[-1.977,-3.512,6.325],[6.544,-3.2,-1.784],[6.275,1.558,3.801],[-4.381,-2.066,5.727],[-3.816,-3.786,-5.231],[2.669,5.938,3.724],[-3.797,-0.622,6.438],[4.328,-5.91,1.61],[6.075,3.102,3.118],[-2.935,-1.53,6.731],[3.711,-4.583,-4.635],[5.132,-0.871,-5.4],[-3.477,-0.143,-6.644],[-6.946,-2.824,0.163],[0.9,3.507,6.568],[-7.334,-1.234,-0.973],[-4.118,-6.268,0.084],[3.656,5.69,3.241],[-2.013,7.179,-0.81],[6.973,-2.736,-0.377],[-6.2,-2.785,3.172],[2.187,1.871,6.926],[-6.435,-3.344,-1.913],[2.599,-3.093,6.319],[-1.117,-3.798,6.37],[6.131,2.098,-3.776],[-1.697,-4.202,5.976],[-5.538,2.941,4.115],[-0.734,-6.494,3.679],[-2.245,-6.84,-2.103],[-3.104,-6.587,-1.798],[2.775,6.251,-3.079],[-5.097,-5.486,0.42],[-5.392,-0.632,5.175],[1.797,-7.058,-1.789],[5.856,-3.286,-3.341],[3.651,-6.498,0.837],[-5.615,-2.704,-4.173],[-3.455,0.568,6.633],[0.098,-0.041,-7.499],[-6.923,-2.603,1.242],[5.59,-4.309,2.538],[2.149,-0.393,-7.175],[-5.178,-3.243,-4.35],[-7.272,-1.361,1.234],[0.169,4.837,-5.729],[-3.632,5,4.25],[-7.441,-0.897,-0.292],[-1.128,-6.116,4.192],[3.506,-3.838,-5.407],[0.687,6.03,-4.407],[6.765,-3.222,-0.328],[-3.271,2.296,6.347],[-4.214,0.741,6.16],[4.894,-3.791,4.234],[-3.536,4.5,4.848],[-4.459,4.981,-3.399],[-6.718,-2.587,2.104],[5.927,-1.729,4.258],[5.03,5.334,1.581],[-2.13,0.65,-7.162],[2.666,-6.925,1.088],[-3.175,5.841,3.472],[-4.166,-4.706,4.093],[-6.512,-2.875,2.361],[5.973,-4.517,0.411],[-3.28,-6.36,-2.246],[-2.42,2.321,6.709],[-0.636,-1.1,-7.392],[-5.466,2.326,4.579],[-3.325,-1.221,6.611],[5.212,4.884,2.289],[-6.261,-0.226,-4.124],[3.484,4.085,-5.237],[5.462,-4.872,-1.638],[-3.847,-4.529,-4.577],[1.65,5.894,4.335],[-2.755,-2.354,-6.567],[7.294,-1.702,0.385],[-0.288,0.981,7.43],[-3.833,-3.053,-5.678],[-2.721,-6.668,2.094],[-1.751,4.628,-5.636],[-3.075,6.691,-1.423],[-2.692,-3.562,6.027],[2.299,-5.131,4.964],[0.065,2.6,-7.035],[-6.487,2.866,2.44],[1.732,-5.187,5.133],[3.048,0.281,6.847],[5.797,2.722,-3.904],[-7.148,-1.161,1.953],[2.548,-2.445,6.617],[4.961,-5.601,0.515],[6.514,-3.717,-0.018],[-5.596,-1.038,4.884],[3.917,-3.488,5.361],[-3.844,4.638,4.468],[0.587,-1.436,7.338],[-4.963,-0.079,-5.623],[7.276,-1.631,-0.809],[-2.258,0.223,-7.149],[1.051,3.947,6.291],[-2.526,-4.182,5.69],[6.101,4.344,0.397],[6.531,-2.445,2.761],[-1.35,7.365,0.424],[-6.515,-2.991,-2.205],[0.123,-6.237,-4.164],[-3.612,5.734,-3.213],[3.237,-6.576,1.59],[4.948,-5.532,-1.079],[-1.192,-3.243,-6.657],[-3.329,6.654,0.948],[6.171,-3.555,2.352],[0.716,-4.275,6.121],[-5.049,-1.425,5.36],[0.172,7.496,-0.172],[-6.733,-3.229,-0.706],[2.316,6.295,-3.356],[5.391,1.26,5.06],[-7.124,2.232,0.724],[0.549,0.022,-7.48],[5.546,3.12,3.97],[4.348,1.596,5.899],[7.326,1.023,1.237],[4.871,2.895,4.913],[-5.026,1.011,-5.475],[6.443,0.709,3.774],[-3.688,2.915,5.844],[3.745,5.079,-4.053],[-6.789,-2.349,-2.156],[7.485,0.242,-0.413],[5.25,-0.78,5.299],[2.909,-4.294,5.418],[3.397,6.506,-1.546],[6.168,-2.381,3.541],[2.751,6.779,1.654],[0.25,-5.902,4.621],[-2.872,5.317,-4.443],[-0.034,-6.17,4.265],[6.439,0.269,3.836],[-0.98,6.774,3.068],[-6.61,-3.495,0.59],[5.654,1.477,4.702],[-1.345,2.39,-6.981],[2.749,0.285,-6.972],[-5.242,5.139,1.537],[1.758,-7.29,0.142],[0.091,1.113,-7.417],[0.586,5.671,4.873],[3.481,5.06,4.305],[-1.882,-6.999,1.929],[-3.929,-0.137,6.387],[2.886,-3.582,-5.924],[-3.797,0.152,-6.466],[-6.182,-4.19,-0.696],[1.459,-6.842,-2.704],[-2.491,5.216,4.78],[-6.318,-2.968,-2.744],[-3.628,1.256,6.443],[7.419,-0.739,-0.82],[0.411,6.587,-3.563],[4.915,2.64,-5.013],[-5.621,1.482,-4.739],[-6.876,1.365,2.666],[-4.538,5.779,1.506],[3.673,6.51,-0.615],[-3.837,-1.878,-6.165],[3.259,-6.753,0.183],[-4.518,-5.962,-0.55],[-1.49,5.577,-4.788],[4.077,-3.88,-4.957],[5.984,3.63,-2.695],[6.851,-2.993,0.593],[-7.413,0.989,-0.563],[-4.776,-1.16,5.665],[2.885,4.87,4.921],[0.729,-3.295,6.698],[3.81,-5.003,4.087],[-5.662,0.44,4.899],[-2.92,-0.167,-6.907],[-3.441,5.171,-4.204],[0.964,0.236,-7.434],[5.974,3.56,2.809],[-3.558,-0.994,-6.527],[3.139,-1.71,-6.594],[2.332,-6.122,3.652],[4.118,5.993,1.84],[-6.431,-3.563,-1.483],[-6.514,0.981,-3.586],[-4.284,6.102,-0.815],[1.84,6.988,-2.008],[2.412,7.011,-1.13],[1.841,-7.228,-0.785],[-5.42,2.716,-4.417],[-5.444,0.117,5.158],[-0.44,-5.612,4.957],[0.906,-7.23,1.777],[-5.97,-2.008,-4.072],[3.868,-4.646,4.439],[4.672,-1.711,5.613],[-4.249,4.371,4.369],[-6.925,1.884,-2.178],[-1.581,6.088,4.086],[5.132,2.105,5.048],[1.957,7.212,-0.641],[1.425,7.363,0.113],[6.118,-1.277,-4.147],[6.558,-0.377,-3.619],[-2.501,-5.924,3.86],[-6.269,-3.414,2.301],[-0.97,-7.409,-0.648],[-2.741,5.661,-4.086],[5.024,3.868,4.007],[5.222,5.124,-1.65],[4.305,-5.832,-1.925],[1.593,6.634,3.116],[-5.43,-5.11,-0.81],[7.095,-2.156,1.126],[-2.139,6.828,-2.248],[4.545,5.74,1.627],[-0.695,6.981,2.653],[1.828,-0.822,7.227],[2.741,6.952,0.643],[-0.612,6.545,3.611],[-0.788,0.912,-7.403],[-0.232,-1.967,7.234],[2.627,-5.068,-4.865],[3.558,6.534,0.95],[1.664,-0.279,-7.308],[-0.773,1.356,-7.336],[6.876,0.577,-2.939],[3.975,1.595,-6.157],[3.231,5.95,3.227],[-1.953,6.572,3.04],[7.152,-1.906,-1.213],[1.922,-1.881,7.002],[4.726,-5.051,2.899],[-2.805,6.955,0.108],[-2.044,3.524,-6.297],[0.655,5.355,5.211],[-6.814,-0.771,3.037],[4.78,4.781,-3.247],[-5.044,4.774,-2.832],[-0.235,-6.369,-3.955],[-7.163,1.916,1.131],[7.108,1.809,1.566],[0.43,-2.491,7.061],[1.157,-4.119,6.16],[-2.858,3.28,-6.109],[5.832,-3.351,3.319],[0.538,7.245,1.865],[1.023,7.256,1.599],[7.489,-0.403,0.105],[-5.575,5.007,0.326],[2.029,-6.49,-3.165],[4.018,5.733,2.691],[4.309,-5.234,-3.209],[1.372,2.506,-6.935],[0.636,6.928,-2.802],[-0.174,-6.828,3.098],[-3.077,4.775,-4.897],[5.252,-2.38,-4.797],[-1.391,-7.019,2.248],[-5.398,-4.914,-1.721],[-5.337,-1.988,4.88],[-0.825,-1.056,7.379],[2.09,-3.733,-6.16],[-0.221,6.323,-4.028],[6.387,1.704,-3.544],[5.536,0.48,-5.037],[-6.303,-2.991,2.753],[-5.333,-4.805,2.174],[3.637,5.906,2.853],[2.793,-3.818,5.82],[4.79,2.493,5.205],[2.696,2.597,-6.499],[4.773,4.28,3.893],[-4.159,5.966,-1.833],[3.198,6.771,0.433],[6.322,1.932,3.543],[5.801,-2.191,-4.219],[1.805,4.67,-5.584],[7.156,-1.368,1.782],[-2.269,-5.193,-4.913],[3.479,-2.816,-6.018],[-6.054,3.649,-2.507],[-7.188,1.179,-1.788],[0.725,3.525,-6.58],[-6.408,-0.6,-3.851],[-5.342,-1.747,-4.967],[-2.945,-5.316,4.396],[-5.295,-4.835,-2.199],[4.405,-5.964,1.13],[6.258,3.921,1.312],[7.199,0.42,2.063],[2.546,-4.174,5.688],[-5.4,4.456,-2.69],[-5.353,-3.493,-3.924],[2.332,3.485,-6.219],[0.841,-0.758,7.414],[-4.77,5.228,2.484],[3.625,4.834,-4.444],[-1.67,-6.655,3.029],[-4.814,4.177,-3.955],[-4.434,-5.886,1.396],[-3.86,1.609,6.226],[3.204,2.867,6.146],[7.08,2.188,1.156],[4.163,1.992,-5.912],[1.908,1.515,7.094],[-3.638,6.144,-2.294],[-1.067,-0.359,7.415],[4.06,-5.626,2.849],[5.499,2.71,-4.321],[-0.045,-3.134,6.814],[3.883,-6.417,-0.058],[6.889,-0.347,2.946],[6.758,-0.754,3.164],[2.975,-5.178,-4.537],[-5.601,-4.988,0.013],[1.817,-7.23,0.822],[-0.104,-1.668,-7.312],[-4.115,1.198,6.155],[0.082,-1.281,7.39],[0.963,-3.719,6.442],[-6.572,-0.099,3.612],[6.261,-4.116,0.341],[-3.58,5.993,2.742],[-1.724,-1.567,7.129],[6.436,-3.285,2.01],[-5.562,4.748,1.665],[-4.77,5.001,2.915],[-0.792,-3.566,-6.551],[-1.81,1.482,-7.126],[-4.548,4.598,-3.799],[-5.146,-5.246,1.501],[-5.188,-1.043,-5.315],[5.16,0.917,5.365],[0.286,-3.332,-6.713],[-4.732,3.283,-4.805],[5.823,-0.218,-4.722],[-1.833,1.462,7.124],[-0.232,4.201,6.209],[2.649,-4.51,-5.375],[-0.538,-3.005,6.851],[-4.851,-4.707,-3.25],[-1.76,-0.832,7.243],[-3.779,4.184,-4.947],[3.12,6.685,1.354],[3.284,4.864,4.67],[-6.799,2.702,1.651],[6.99,1.758,2.073],[-7.492,0.103,-0.34],[3.514,2.971,-5.923],[6.477,2.319,2.988],[5.247,-5.358,0.086],[1.428,-5.542,-4.848],[-4.213,-1.66,-5.979],[5.462,-2.957,4.205],[-2.028,6.004,4.011],[-2.293,6.122,3.676],[-1.559,7.027,2.107],[-0.833,2.138,-7.141],[3.67,-4.382,4.856],[1.538,-4.252,-5.984],[6.374,2.155,-3.315],[7.493,0.307,0.123],[-0.271,7.141,2.276],[-1.204,-3.043,6.749],[-0.366,7.491,-0.028],[6.847,-2.446,-1.842],[-5.219,5.02,-1.953],[6.541,3.262,1.682],[-4.535,-4.762,-3.607],[-0.9,0.179,7.444],[-2.335,3.934,5.944],[-5.675,-0.417,4.886],[6.146,-4.115,1.241],[-0.686,5.497,5.056],[3.234,1.189,6.662],[-0.879,-2.741,6.926],[2.753,-6.118,3.353],[-0.19,-4.932,-5.647],[2.486,6.63,-2.472],[5.855,-4.687,0.004],[-4.399,5.49,-2.601],[-6.076,1.534,4.121],[-1.716,-6.311,-3.671],[-0.475,2.447,-7.074],[5.438,-1.083,5.051],[0.571,-4.73,5.793],[-4.89,5.588,1.052],[-3.133,-5.768,-3.628],[5.531,-4.099,-2.975],[1.18,7.115,2.058],[-1.84,-5.365,-4.908],[-4.458,-5.841,-1.502],[1.108,-7.03,2.366],[4.866,-0.161,-5.705],[-5.843,-3.53,3.107],[-4.024,4.89,4.019],[7.345,-1.164,-0.978],[-4.259,6.031,-1.322],[-3.655,-6.222,-2.044],[6.553,1.922,3.102],[6.888,2.967,0.005],[-2.743,6.061,3.464],[6.205,-4.14,0.782],[4.805,-3.77,-4.354],[-7.283,0.932,1.528],[4.836,-2.832,4.984],[6.164,2.634,3.364],[-5.28,5.285,0.659],[3.238,6.527,1.779],[4.49,3.034,5.185],[-5.59,0.511,-4.974],[0.806,2.639,6.974],[-3.458,-4.717,-4.695],[6.371,3.296,2.19],[4.257,2.736,-5.536],[3.179,-3.848,5.599],[-1.427,-4.619,5.734],[3.666,-4.114,-5.088],[-1.059,3.604,-6.492],[0.745,-1.801,-7.242],[0.883,5.501,-5.022],[1.934,-6.78,2.558],[1.843,0.156,7.268],[-6.989,-2.626,0.71],[5.203,0.63,-5.365],[2.064,1.268,-7.098],[-6.347,-3.88,-0.956],[1.626,1.413,-7.184],[-2.838,-6.744,1.646],[-5.445,-0.714,-5.108],[-3.715,-1.059,6.429],[-1.229,-7.324,-1.046],[5.472,-0.921,-5.046],[-3.795,5.181,-3.874],[-2.494,-4.104,-5.761],[-5.106,3.775,3.992],[-7.429,0.872,0.544],[-6.153,-0.776,-4.218],[-0.827,-7.323,-1.394],[3.804,-0.824,6.411],[5.301,-5.291,-0.386],[-4.972,-5.05,2.457],[-1.139,3.839,6.342],[1.426,-7.259,1.233],[2.797,6.95,-0.357],[2.149,-6.544,2.969],[6.68,-1.682,2.967],[4.881,-4.068,-3.985],[-6.453,-1.447,3.537],[3.771,5.42,3.557],[-5.669,4.892,-0.426],[1.933,6.876,2.288],[5.187,-3.747,3.913],[-3.398,6.403,-1.926],[-3.362,-6.161,-2.645],[-7.119,0.613,-2.281],[1.489,7.211,1.428],[-5.32,-0.243,-5.282],[5.224,4.13,-3.45],[4.978,1.33,5.45],[-1.029,5.566,-4.92],[-6.874,2.247,1.989],[-1.929,4.277,-5.852],[-0.759,-5.922,4.539],[-6.881,-2.446,1.711],[-2.618,3.065,6.325],[3.808,-2.318,-6.032],[-2.315,-5.106,4.982],[-4.682,5.838,-0.499],[6.908,-1.036,-2.731],[-3.63,-1.459,-6.399],[0.404,4.668,5.856],[-0.162,7.4,1.209],[1.122,-4.125,-6.163],[-1.089,7.371,-0.854],[-4.705,-5.07,2.9],[-4.607,3.688,4.629],[5.515,-4.11,2.99],[0.578,3.078,6.815],[0.594,5.754,-4.775],[-4.208,-2.897,-5.491],[-2.851,-2.015,6.638],[1.885,6.108,3.923],[1.703,-3.852,-6.206],[-4.645,-5.426,-2.287],[-7.065,0.482,2.47],[-4.156,-5.6,-2.761],[2.04,4.391,5.728],[4.065,6.253,-0.794],[4.603,-4.892,3.336],[7.148,-2.263,0.199],[-0.292,-4.202,6.206],[-3.403,1.807,6.435],[-4.423,1.449,-5.882],[-0.64,-7.275,1.709],[-6.66,-3.016,-1.673],[2.213,-5.404,-4.707],[-3.297,-4.046,-5.386],[4.034,-4.888,-4.01],[7.255,1.519,1.147],[5.04,-4.795,-2.802],[6.374,0.293,-3.943],[-3.919,5.868,-2.543],[-5.735,-4.336,2.135],[4.302,1.163,6.033],[6.858,-2.564,1.626],[0.989,-6.052,-4.319],[-0.894,6.094,4.28],[-7.174,2.122,-0.53],[4.837,1.976,5.381],[-3.19,-4.118,5.396],[1.8,2.313,-6.904],[4.32,5.154,3.32],[4.06,-5.831,-2.402],[6.739,-2.008,2.609],[-7.247,-0.371,-1.897],[-4.911,-4.396,-3.58],[2.165,-1.187,-7.082],[3.441,-6.379,-1.931],[6.813,2.482,-1.918],[5.095,5.474,-0.579],[-4.77,-0.324,5.779],[-1.593,-5.971,4.25],[4.41,-3.966,4.591],[-3.486,3.513,5.636],[0.432,4.238,-6.173],[2.031,6.802,-2.421],[6.787,-2.844,-1.448],[-1.21,-7.401,0.101],[3.808,5.056,4.023],[1.869,-6.126,3.902],[7.162,2.202,-0.328],[0.242,7.355,1.451],[-7.172,0.091,2.194],[2.743,4.1,-5.649],[1.238,-1.711,-7.197],[1.194,4.376,5.973],[2.875,-5.944,-3.558],[5.868,-3.906,2.562],[-2.986,0.72,6.842],[-6.691,0.13,-3.385],[-2.778,6.908,0.899],[-7.042,0.21,-2.573],[1.017,-7.423,0.336],[-3.335,6.398,2.049],[5.512,-3.341,-3.835],[-2.076,5.139,5.053],[-7.352,1.145,0.942],[-5.77,3.998,-2.641],[-0.77,7.356,-1.246],[-4.015,5.836,2.463],[-1.104,-0.779,-7.377],[0.647,-4.027,-6.294],[1.426,6.263,-3.873],[7.468,0.656,-0.222],[0.85,7.413,-0.765],[-1.666,-7.006,-2.095],[2.515,7.031,-0.7],[-7.145,1.447,1.762],[-6.567,3.622,-0.012],[5.856,1.44,-4.46],[-3.381,-1.672,6.483],[-4.2,-0.053,-6.214],[6.521,3.381,-1.514],[-6.951,2.644,-0.976],[-1.472,-3.401,6.521],[-4.32,-5.505,2.698],[-1.878,4.19,5.931],[5.283,-4.775,2.353],[-7.454,-0.575,0.599],[0.759,1.51,-7.307],[-5.24,-1.04,5.264],[5.315,-5.08,1.484],[-1.69,7.168,-1.42],[6.195,1.369,-4],[-5.575,-4.869,-1.211],[-7.452,0.004,-0.846],[-4.294,-5.257,-3.191],[-6.279,-0.203,4.098],[-0.118,-7.075,2.486],[4.015,-4.258,-4.69],[-6.55,-3.356,1.443],[4.609,-4.135,4.232],[-4.661,0.184,-5.873],[-4.762,-5.759,0.645],[-5.353,3.113,-4.232],[1.607,7.056,1.969],[3.497,-2.559,6.121],[-4.405,2.251,-5.637],[-5.458,-4.82,1.795],[-6.387,0.219,3.925],[4.509,-2.185,5.581],[-1.293,-7.224,-1.546],[-1.621,-6.246,3.823],[3.523,-5.663,3.431],[-5.541,-4.862,1.382],[-6.294,3.254,2.459],[-7.174,-0.847,-2.017],[-0.114,5.044,5.549],[1.037,-6.869,2.827],[-0.976,5.886,-4.544],[-3.394,-6.684,-0.233],[3.24,6.744,-0.521],[-2.098,7.094,1.233],[-0.697,-7.429,0.76],[2.712,-3.438,6.089],[-3.259,3.231,-5.932],[-2.714,-6.485,2.613],[2.644,6.862,-1.472],[-6.066,-3.915,2.031],[-4.817,-5.586,-1.359],[5.698,4.877,-0.054],[6.629,-0.247,3.5],[-0.339,2.886,-6.914],[4.609,5.207,2.809],[0.277,-3.484,6.636],[2.477,7.077,0.19],[3.053,-4.911,4.776],[-5.887,-2.827,-3.689],[-5.763,-3.267,-3.517],[5.323,5.245,0.64],[-3.464,6.519,-1.325],[-6.735,-2.242,2.423],[5.207,-4.333,3.219],[5.171,-0.349,5.422],[-4.003,-4.138,-4.807],[2.227,-6.979,-1.609],[7.265,1.273,-1.362],[-4.016,-6.251,1.026],[-1.709,-2.427,6.888],[6.242,4.139,-0.408],[-1.908,-5.648,-4.551],[-0.815,1.18,7.362],[-1.172,-1.713,-7.207],[4.431,3.028,-5.24],[-4.72,-4.284,-3.952],[-6.25,1.874,-3.699],[6.804,2.886,1.277],[-0.808,-6.727,3.218],[-1.148,7.266,-1.465],[0.64,-7.416,0.918],[4.679,-0.626,-5.828],[-3.807,6.203,1.813],[1.049,0.468,7.412],[3.409,-0.033,-6.681],[-6.12,-0.918,4.237],[5.7,4.086,2.659],[-7.102,-0.236,-2.4],[4.784,-1.075,-5.676],[-4.033,6.323,0.092],[-3.467,-0.572,-6.626],[5.742,-3.057,3.734],[4.227,3.934,4.786],[-6.932,-1.412,-2.491],[-5.93,2.885,3.572],[6.504,-0.794,-3.649],[4.171,6.078,1.385],[-5.049,-4.735,2.889],[0.242,6.972,2.753],[2.334,2.157,-6.793],[-7.366,1.372,-0.327],[3.124,-6.268,-2.684],[-7.008,2.669,0.117],[-0.48,-5.179,-5.403],[2.508,3.982,5.84],[-1.16,-6.373,3.781],[-7.355,-1.425,-0.354],[2.924,6.383,-2.638],[-4.395,1.475,5.896],[-4.713,-3.994,4.253],[7.444,-0.876,0.26],[5.399,-4.422,-2.747],[1.473,-3.722,6.343],[-4.893,5.456,1.596],[1.185,0.86,-7.356],[-2.374,-7.113,-0.168],[-4.369,4.585,4.017],[1.589,-6.134,-4.013],[2.943,-5.559,4.085],[-2.036,-0.948,-7.156],[-0.686,4.002,6.306],[-2.612,-7.027,0.231],[-6.011,-4.484,0.127],[-2.423,6.615,-2.573],[3.658,2.509,-6.048],[-5.707,-4.781,0.904],[-1.183,-7.132,-1.996],[-4.983,2.243,5.137],[2.786,-6.787,1.559],[-6.459,0.417,-3.79],[4.945,-5.122,-2.359],[0.094,-5.318,-5.288],[-0.222,1.502,-7.345],[-0.388,4.802,5.748],[4.259,-3.448,-5.121],[-1.132,-7.387,0.632],[2.098,5.743,4.344],[-4.924,3.136,4.709],[4.036,0.128,6.32],[1.008,-2.205,-7.098],[1.14,6.943,-2.599],[6.644,-3.398,-0.745],[0.921,-0.884,-7.391],[-2.477,-0.732,-7.042],[4.512,5.891,1.093],[-1.376,-3.647,-6.408],[-0.916,-2.773,-6.908],[6.812,2.649,1.682],[1.477,-7.337,0.497],[-5.05,5.539,-0.264],[-3.698,2.118,6.172],[1.953,7.056,1.627],[-1.636,-2.874,6.732],[-1.49,-2.08,-7.05],[3.12,6.464,-2.175],[5.528,4.883,-1.362],[-6.678,1.384,3.121],[4.411,4.441,4.132],[6.259,-0.852,-4.043],[4.49,6.007,-0.11],[-1.235,-2.431,6.987],[4.687,4.681,3.517],[5.184,2.771,-4.658],[-2.134,0.892,7.135],[-3.872,-5.619,-3.112],[-2.832,-5.577,-4.14],[-1.754,7.25,0.783],[5.09,4.456,-3.238],[-4.716,5.383,-2.246],[-1.636,2.299,6.949],[-7.209,1.539,-1.386],[5.708,-0.873,4.787],[6.023,-2.483,-3.716],[3.183,-6.34,2.435],[6.773,-2.105,-2.44],[-3.573,5.517,-3.613],[2.176,4.835,-5.304],[-5.071,-2.666,4.84],[-3.447,3.523,-5.653],[-0.069,7.269,1.845],[-7.233,-1.972,-0.219],[6.804,1.065,-2.972],[3.241,-2.233,6.385],[-4.969,-1.458,-5.425],[-2.238,4.728,-5.375],[2.385,2.95,-6.47],[-4.007,-5.031,3.858],[5.51,-3.434,3.755],[4.433,-5.557,-2.391],[3.197,-5.353,-4.168],[0.686,-5.981,4.473],[-4.506,5.05,3.232],[7.301,0.134,1.711],[-0.649,2.028,7.192],[-2.9,-4.29,-5.425],[-4.711,3.995,4.254],[-2.577,0.516,7.025],[0.291,-5.233,5.365],[4.163,4.25,-4.568],[-1.663,0.545,7.293],[3.597,6.565,0.465],[-2.429,-6.447,-2.964],[1.918,-5.441,4.792],[2.727,3.132,-6.246],[-3.217,-5.44,4.038],[-3.046,6.618,1.785],[0.168,7.454,0.811],[1.002,-1.273,7.323],[-1.979,-5.95,-4.115],[-3.249,-4.478,-5.064],[3.22,1.817,-6.525],[-6.896,1.193,-2.699],[1.789,-5.896,4.277],[6.061,-3.397,2.824],[-6.063,-3.242,-2.997],[4.775,-0.09,5.783],[-1.597,-1.998,7.05],[-5.371,-2.13,-4.782],[-6.314,-1.129,3.888],[-4.979,5.33,-1.748],[2.612,4.852,-5.088],[-6.902,-2.604,-1.355],[3.684,6.393,1.345],[6.377,-3.587,1.648],[-5.074,2.889,-4.707],[6.599,3.469,0.822],[6.968,2.227,1.654],[-3.802,0.791,6.417],[-4.188,5.06,3.621],[0.678,-5.054,5.5],[-7.125,-2.215,-0.767],[0.33,5.067,5.52],[3.942,-1.367,6.233],[-2.449,-6.231,-3.381],[0.404,-7.08,2.441],[0.581,4.655,-5.852],[0.114,-6.973,-2.76],[-4.265,4.016,-4.684],[-0.245,-3.295,-6.733],[-5.924,4.434,1.223],[-7.05,2.512,-0.49],[5.395,-5.118,0.976],[7.208,0.674,-1.962],[6.643,-2.839,-2.016],[6.876,0.63,2.928],[1.556,-2.234,6.989],[4.61,-5.911,0.255],[0.748,-6.369,3.889],[0.276,6.476,3.773],[3.989,3.384,-5.375],[4.404,5.075,-3.332],[-6.736,1.817,2.754],[1.797,6.516,-3.25],[2.209,-4.504,5.576],[-0.327,2.433,7.087],[-0.369,4.488,-5.998],[-0.974,4.308,6.062],[-6.804,-2.586,-1.808],[-3.33,1.035,-6.64],[7.288,-0.94,-1.502],[-1.301,5.042,5.398],[2.303,6.888,-1.872],[0.317,6.8,-3.149],[5.122,-1.66,5.221],[-5.618,-4.583,-1.921],[-5.835,1.784,-4.361],[-6.331,4.019,-0.141],[-1.566,-5.943,-4.299],[4.09,3.319,5.339],[1.498,3.883,-6.24],[-7.395,0.336,-1.205],[-3.75,0.988,-6.42],[-2.616,6.322,3.071],[-5.218,-4.313,3.229],[-2.432,-3.687,-6.062],[2.481,4.35,5.583],[-6.907,-1.877,-2.241],[6.076,2.534,-3.594],[-4.175,3.379,5.235],[1.141,-5.087,5.392],[3.015,6.667,-1.649],[5.673,3.844,3.05],[-5.001,-1.863,-5.27],[-4.782,0.321,5.769],[2.704,6.686,-2.059],[-4.041,-3.536,5.237],[-6.739,1.01,-3.132],[0.13,-2.937,-6.9],[-5.27,-2.537,-4.695],[-3.281,6.271,2.482],[-2.798,-6.807,-1.447],[6.622,1.99,-2.906],[2.859,-4.679,5.117],[2.223,-3.347,-6.333],[3.772,1.183,-6.374],[-7.386,-0.251,1.281],[-4.729,-2.152,5.409],[-2.873,5.453,4.273],[-2.173,4.786,5.351],[2.863,-6.889,-0.775],[4.899,-5.679,-0.028],[5.879,-4.407,1.506],[-3.097,5.77,-3.657],[5.704,-2.684,-4.064],[5.489,-0.386,-5.096],[5.867,3.442,-3.161],[-5.319,0.783,-5.23],[-6.643,3.171,-1.44],[-6.91,2.888,-0.399],[-0.019,-4.943,5.641],[-3.313,-5.147,-4.334],[3.809,6.236,-1.69],[-7.151,1.995,-1.063],[-1.689,-3.267,-6.537],[0.996,-3.138,-6.739],[6.675,0.533,3.378],[-6.962,2.555,1.122],[6.205,-3.951,-1.461],[0.55,-3.858,6.408],[-6.685,2.635,2.15],[6.791,3.122,0.621],[7.277,-1.273,1.293],[-5.87,-0.681,-4.618],[3.44,0.698,-6.628],[-5.65,-1.047,-4.82],[-1.09,6.55,3.487],[4.865,-0.907,5.635],[-2.201,-7.137,-0.687],[0.541,-5.881,-4.623],[7.121,-1.508,-1.809],[3.591,0.292,6.578],[-1.703,6.345,-3.618],[0.178,-6.515,3.711],[1.358,6.51,-3.467],[-0.221,-7.493,-0.245],[1.471,-2.854,-6.778],[1.487,-6.814,2.76],[-3.807,-2.567,5.93],[-1.636,5.242,5.109],[4.375,0.659,6.056],[1.269,4.787,5.633],[-2.317,-6.921,1.729],[-2.115,-4.193,5.848],[5.485,1.898,4.751],[-3.02,-5.749,3.752],[-4.92,4.414,-3.544],[-5.859,3.211,-3.407],[0.891,-4.459,-5.964],[0.483,-5.601,4.965],[5.77,-0.686,-4.743],[-4.677,-2.138,-5.46],[-1.864,-3.673,-6.268],[3.859,-3.536,-5.371],[6.2,-4.17,-0.649],[0.316,0.55,-7.473],[-1.736,2.034,-7.007],[1.593,-6.971,2.263],[-3.148,6.384,-2.363],[-6.094,-2.14,3.813],[-3.981,2.437,5.871],[1.95,-7.234,-0.337],[-2.226,6.852,2.084],[-1.836,4.968,-5.311],[6.265,-2.963,2.869],[3.595,3.549,-5.544],[6.082,-3.59,-2.525],[-1.564,3.725,6.319],[0.07,4.461,-6.029],[5.499,2.279,-4.563],[0.633,0.626,7.447],[-2.462,-1.311,-6.962],[5.644,-4.587,1.831],[-4.318,-2.514,5.594],[0.364,-7.409,-1.106],[3.616,-6.445,1.277],[-1.57,-1.043,-7.259],[0.38,-1.465,-7.346],[4.677,-3.216,-4.903],[6.49,-3.722,0.524],[1.328,2.637,6.895],[-0.118,-6.019,-4.473],[1.174,6.579,3.404],[1.371,0.137,7.373],[3.836,-6.111,-2.049],[7.185,-2.045,0.67],[0.174,5.188,-5.413],[-7.276,1.674,-0.713],[6.992,0.099,-2.712],[-6.506,3.626,0.881],[5.935,0.622,-4.543],[-5.002,-3.645,-4.236],[-0.603,-5.202,5.369],[-0.43,-3.424,6.659],[6.04,-2.131,3.903],[-5.624,-3.489,3.529],[0.376,-6.264,4.107],[-2.904,2.213,6.552],[-0.684,6.281,-4.042],[3.452,1.456,-6.497],[3.938,1.077,6.291],[-6.026,-0.413,4.446],[-1.602,-6.846,2.611],[-2.654,1.029,6.939],[0.988,6.365,3.842],[-6.183,-4.03,-1.335],[3.703,4.636,4.587],[-5.211,-5.192,-1.463],[-7.139,1.082,2.029],[-3.442,2.845,-6.026],[-0.85,-2.171,7.129],[-1.994,-3.09,6.537],[-6.467,-1.387,-3.536],[-3.736,-2.343,-6.067],[-4.641,-5.388,2.385],[-2.689,4.602,-5.277],[-6.883,0.054,-2.98],[1.821,-1.553,-7.108],[0.54,-7.471,0.375],[7.457,0.015,-0.801],[7.072,-1.793,1.739],[5.231,4.005,3.584],[5.257,2.796,4.561],[-0.982,-6.386,-3.809],[7.114,-0.23,-2.365],[-1.571,7.333,-0.09],[-5.04,-5.512,-0.682],[1.123,5.353,5.132],[5.314,5.207,-0.952],[-6.322,3.067,-2.621],[0.682,7.362,1.258],[-4.785,-1.109,-5.668],[-6.084,-4.097,1.565],[-5.464,-2.704,4.369],[-1.972,-6.84,2.363],[6.018,-1.699,-4.141],[5.304,-5.273,0.564],[1.122,7.354,0.953],[6.156,-0.366,4.27],[3.517,-1.38,-6.479],[-3.538,0.129,6.612],[2.852,5.217,4.572],[5.312,-4.088,-3.365],[6.375,-3.106,2.442],[-4.954,5.485,-1.276],[-5.238,-4.17,-3.38],[-2.039,-4.892,5.307],[-0.643,-6.268,-4.069],[0.865,5.871,4.586],[-6.547,-0.924,-3.54],[-6.833,-0.25,3.083],[3.191,6.403,2.252],[-2.564,4.507,5.419],[-2.354,4.34,-5.646],[-3.74,6.103,2.241],[6.079,-4.259,-1.076],[7.237,0.142,-1.965],[-4.479,4.238,-4.269],[-0.203,-2.705,-6.992],[4.19,5.97,-1.749],[3.698,-5.955,-2.667],[-2.542,7.04,0.482],[6.469,2.464,-2.887],[3.278,-6.713,0.664],[-5.648,4.006,2.882],[-6.265,3.532,2.13],[3.274,-6.436,2.029],[-5.265,2.912,4.479],[-6.092,0.567,4.338],[-0.404,7.424,-0.983],[0.84,4.653,5.822],[-0.757,-6.67,-3.345],[1.681,-3.179,6.582],[4.019,4.698,4.246],[4.998,5.225,1.994],[5.764,-2.186,4.272],[2.932,6.903,0.084],[7.372,-0.746,1.163],[-2.335,6.942,1.614],[1.909,-1.397,7.117],[-3.094,4.341,-5.276],[4.864,0.703,5.666],[-0.302,0.894,-7.441],[-4.619,2.53,5.34],[7.485,-0.304,-0.361],[-6.893,2.314,-1.841],[6.717,0.104,3.335],[-0.429,-7.171,2.155],[6.432,3.312,-1.978],[5.66,-4.369,-2.265],[0.206,-6.935,2.849],[4.549,5.602,2.044],[5.998,-4.487,-0.371],[-0.285,-5.936,4.575],[4.707,4.928,3.132],[7.237,1.633,-1.101],[-2.674,4.984,-4.925],[-3.161,6.668,1.34],[1.509,6.891,2.547],[4.506,0.409,-5.981],[-1.808,-7.169,-1.264],[1.319,4.666,-5.722],[0.235,4.159,6.237],[-4.735,-3.297,4.792],[6.613,0.022,-3.538],[6.068,-3.314,-2.906],[0.539,-6.166,-4.236],[3.706,-6.455,-0.919],[-4.011,3.797,-5.074],[5.8,-2.971,-3.713],[3.176,-6.161,2.866],[5.912,2.21,4.052],[3.591,-5.222,-4.011],[-4.603,5.921,0.017],[5.089,-5.313,-1.457],[5.632,3.38,-3.621],[-1.735,1.883,7.049],[-4.589,5.754,-1.445],[-3.949,-5.338,-3.487],[-0.728,7.456,0.372],[2.918,3.198,6.124],[2.716,-5.879,3.783],[-3.279,-1.712,-6.524],[6.096,0.236,4.363],[1.962,6.695,2.753],[-7.222,-1.246,-1.593],[-2.357,-7.03,-1.129],[4.612,3.692,4.621],[-0.268,-6.395,3.91],[-4.192,-3.746,-4.965],[6.422,-3.555,-1.538],[-3.255,-6.72,0.709],[-4.043,4.398,-4.534],[4.447,4.428,-4.107],[1.027,7.418,0.417],[5.119,5.049,-2.136],[-2.329,6.609,2.673],[-7.305,-1.506,0.788],[-5.362,-4.59,2.538],[-2.109,-5.834,4.216],[-5.917,3.258,3.259],[-2.493,5.984,-3.772],[3.416,-1.997,-6.371],[2.199,0.966,7.105],[-1.245,-4.171,6.108],[3.037,4.663,-5.028],[-5.793,-4.457,1.684],[7.144,2.223,0.526],[4.349,6.105,0.257],[2,-5.186,-5.036],[5.552,4.633,1.991],[-7.27,1.841,-0.126],[3.593,-5.823,-3.072],[-3.123,-3.587,5.799],[-1.832,0.994,-7.205],[6.62,2.895,2.013],[-4.019,5.339,-3.405],[-5.14,-3.003,4.562],[0.609,7.47,-0.277],[-6.279,-1.151,-3.938],[-1.375,3.92,-6.245],[-2.62,6.892,-1.376],[-0.604,6.543,-3.616],[-0.047,-4.449,-6.038],[5.862,2.678,3.837],[5.815,4.721,0.383],[2.573,-4.149,-5.694],[4.788,5.26,2.379],[-3.912,-5.576,3.14],[-3.787,6.414,-0.883],[-1.552,7.201,1.412],[7.374,0.991,-0.943],[-0.524,6.781,3.162],[3.082,-1.055,-6.756],[-5.322,3.507,-3.953],[0.258,-7.482,-0.461],[0.41,-3.688,-6.518],[0.001,7.379,-1.345],[-6.375,0.667,3.894],[-6.266,1.21,-3.94],[-1.984,-2.131,-6.912],[6.389,-1.86,3.46],[2.104,-4.134,5.894],[-2.449,5.364,-4.635],[-0.142,-0.403,7.488],[1.338,-0.861,7.329],[4.531,-0.05,-5.977],[6.212,-1.689,3.849],[2.927,-1.098,6.817],[6.302,-0.732,4.001],[5.87,-0.486,4.644],[2.005,5.234,-4.984],[3.588,2.483,6.1],[1.36,-1.818,7.148],[6.024,1.032,-4.348],[-5.895,-1.329,4.442],[2.163,2.326,6.794],[2.442,5.041,4.988],[4.456,-0.665,5.997],[1.551,5.464,-4.899],[3.626,2.881,5.899],[4.478,-1.433,-5.844],[0.201,-4.773,-5.782],[-4.748,-3.502,-4.631],[-4.317,4.028,4.625],[-4.104,5.361,3.267],[-5.837,0.838,4.635],[-5.337,4.724,2.333],[4.599,5.776,-1.32],[0.195,-7.411,1.138],[-0.43,-7.297,-1.68],[-5.412,-5.164,0.545],[4.024,3.741,-5.105],[4.056,-5.818,2.44],[-7.415,-0.862,-0.728],[-5.996,-3.744,2.507],[-2.505,2.014,-6.777],[2.193,-7.165,0.324],[-4.496,-5.692,-1.907],[4.681,-5.014,-3.033],[4.77,3.287,4.764],[-0.733,-5.46,-5.09],[-4.662,1.083,-5.774],[-4.185,4.959,-3.762],[6.556,1.478,3.329],[-0.268,5.336,5.264],[0.646,-6.854,2.976],[-3.193,6.786,-0.1],[2.887,0.693,-6.887],[-1.228,5.457,4.997]]
    

    geoSphere = (mx, my, mz, iBc, size) => {
      let collapse=0
      let B=Array(iBc).fill().map(v=>{
        X = Rn()-.5
        Y = Rn()-.5
        Z = Rn()-.5
        return  [X,Y,Z]
      })
      for(let m=40;m--;){
        B.map((v,i)=>{
          X = v[0]
          Y = v[1]
          Z = v[2]
          B.map((q,j)=>{
            if(j!=i){
              X2=q[0]
              Y2=q[1]
              Z2=q[2]
              d=1+(Math.hypot(X-X2,Y-Y2,Z-Z2)*(3+iBc/100)*3)**3
              X+=(X-X2)*9/d
              Y+=(Y-Y2)*9/d
              Z+=(Z-Z2)*9/d
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
        v[0]*=size/1.3333
        v[1]*=size/1.3333
        v[2]*=size/1.3333
        v[0]+=mx
        v[1]+=my
        v[2]+=mz
        v[0] = Math.round(v[0]*1e3)/1e3
        v[1] = Math.round(v[1]*1e3)/1e3
        v[2] = Math.round(v[2]*1e3)/1e3
      })
      
      console.log(B)
      return [mx, my, mz, size, B, a]
    }

    burst = new Image()
    url = "https://srmcgann.github.io/temp/burst.png"
    await fetch(url).then(res=>res.blob()).then(data=> burst.src = URL.createObjectURL(data))

    //burst1 = new Image()
    //burst1.src = "https://srmcgann.github.io/temp/burst1.png"
    burst2 = new Image()
    url = "https://srmcgann.github.io/temp/burst2.png"
    await fetch(url).then(res=>res.blob()).then(data=> burst2.src = URL.createObjectURL(data))
    burst3 = new Image()
    url = "https://srmcgann.github.io/temp/burst3.png"
    await fetch(url).then(res=>res.blob()).then(data=> burst3.src = URL.createObjectURL(data))
    burst4 = new Image()
    url = "https://srmcgann.github.io/temp/burst4.png"
    await fetch(url).then(res=>res.blob()).then(data=> burst4.src = URL.createObjectURL(data))
    burstz = [ burst, burst2, burst3, burst4]

    /*
    sphere1 = new Image()
    url = 'https://srmcgann.github.io/temp13/sphere_colorful_1.png'
    await fetch(url).then(res=>res.blob()).then(data=> sphere1.src = URL.createObjectURL(data))
    sphere2 = new Image()
    url = 'https://srmcgann.github.io/temp13/sphere_colorful_2.png'
    await fetch(url).then(res=>res.blob()).then(data=> sphere2.src = URL.createObjectURL(data))
    sphere3 = new Image()
    url = 'https://srmcgann.github.io/temp13/sphere_colorful_3.png'
    await fetch(url).then(res=>res.blob()).then(data=> sphere3.src = URL.createObjectURL(data))
    sphere4 = new Image()
    url = 'https://srmcgann.github.io/temp13/sphere_colorful_4.png'
    await fetch(url).then(res=>res.blob()).then(data=> sphere4.src = URL.createObjectURL(data))
    spherez = [ sphere1, sphere2, sphere3, sphere4 ]
    */


    star1= new Image()
    url = "https://srmcgann.github.io/stars/star1.png"
    await fetch(url).then(res=>res.blob()).then(data=> star1.src = URL.createObjectURL(data))
    
    star2 = new Image()
    url = "https://srmcgann.github.io/stars/star2.png"
    await fetch(url).then(res=>res.blob()).then(data=> star2.src = URL.createObjectURL(data))
    
    star3= new Image()
    url = "https://srmcgann.github.io/stars/star3.png"
    await fetch(url).then(res=>res.blob()).then(data=> star3.src = URL.createObjectURL(data))
    
    star4 = new Image()
    url = "https://srmcgann.github.io/stars/star4.png"
    await fetch(url).then(res=>res.blob()).then(data=> star4.src = URL.createObjectURL(data))

    star5= new Image()
    url = "https://srmcgann.github.io/stars/star5.png"
    await fetch(url).then(res=>res.blob()).then(data=> star5.src = URL.createObjectURL(data))

    star6= new Image()
    url = "https://srmcgann.github.io/stars/star6.png"
    await fetch(url).then(res=>res.blob()).then(data=> star6.src = URL.createObjectURL(data))

    star7= new Image()
    url = "https://srmcgann.github.io/stars/star7.png"
    await fetch(url).then(res=>res.blob()).then(data=> star7.src = URL.createObjectURL(data))

    star8= new Image()
    url = "https://srmcgann.github.io/stars/star8.png"
    await fetch(url).then(res=>res.blob()).then(data=> star8.src = URL.createObjectURL(data))

    star9= new Image()
    url = "https://srmcgann.github.io/stars/star9.png"
    await fetch(url).then(res=>res.blob()).then(data=> star9.src = URL.createObjectURL(data))
    
    starz = [ star1, star2, star3, star4, star5, star6, star7, star8, star9 ]

    /*starsLoaded = false, starImgs = [{loaded: false}]
    starImgs = Array(9).fill().map(async function(v,i){
      let a = {img: new Image(), loaded: false}
      a.img.onload = () => {
        a.loaded = true
        setTimeout(()=>{
          if(starImgs.filter(v=>v.loaded).length == 9) starsLoaded = true
        }, 0)
      }
      url = `https://srmcgann.github.io/stars/star${i+1}.png`
      fetch(url).then(res=>res.blob()).then(data=> a.img.src = URL.createObjectURL(data))
      return a
    })
    */

    lineFaceI = (X1, Y1, Z1, X2, Y2, Z2, facet, autoFlipNormals=false, showNormals=false) => {
      let X_, Y_, Z_, d, m, l_,K,J,L,p
      let I_=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0
      let Q_= () => [c.width/2+X_/Z_*700, c.height/2+Y_/Z_*700]
      let R_ = (Rl,Pt,Yw,m)=>{
        let M=Math, A=M.atan2, H=M.hypot
        X_ = S(p=A(X_,Y_)+Rl) * (d=H(X_,Y_))
        Y_ = C(p) * d
        X_ = S(p=A(X_,Z_)+Yw) * (d=H(X_,Z_))
        Z_ = C(p)*d
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
        x_.beginPath()
        X_ = X1_, Y_ = Y1_, Z_ = Z1_
        R_(Rl,Pt,Yw,1)
        if(Z_>0) x_.lineTo(...Q_())
        X_ = X2_, Y_ = Y2_, Z_ = Z2_
        R_(Rl,Pt,Yw,1)
        if(Z_>0) x_.lineTo(...Q_())
        x_.lineWidth = 5
        x_.strokeStyle='#f004'
        x_.stroke()
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


    subDividedIcosahedron  = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Icosahedron(size))
    subDividedTetrahedron  = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Tetrahedron(size))
    subDividedOctahedron   = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Octahedron(size))
    subDividedCube         = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Cube(size))
    subDividedDodecahedron = (size, subs, sphereize = 0) => subbed(subs, size, sphereize, Dodecahedron(size))

    subV = (v, subres = 5) => {
      if(!showOutput && !showPreview) subres = 1
      x('beginPath')
      v.map((q, j) => {
        l1 = j
        l2 = (j+1) % v.length

        X = v[l1][0]
        Y = v[l1][1]
        Z = v[l1][2]
        R(Rl,Pt,Yw,1)
        l  = Q()
        X1a = l[0]
        Y1a = l[1]

        camX1 = camX
        camY1 = camY
        camZ1 = camZ
        camD1 = camD
        camposX1 = camposX
        camposY1 = camposY
        camposZ1 = camposZ

        X1b = l[2]
        Y1b = l[3]

        X = v[l2][0]
        Y = v[l2][1]
        Z = v[l2][2]
        R(Rl,Pt,Yw,1)

        l  = Q()
        X2a = l[0]
        Y2a = l[1]

        camX2 = camX
        camY2 = camY
        camZ2 = camZ
        camD2 = camD
        camposX2 = camposX
        camposY2 = camposY
        camposZ2 = camposZ

        X2b = l[2]
        Y2b = l[3]

        let sd_ = Math.min(10, ((l=Math.hypot(X2b-X1b, Y2b-Y1b)/5/output.height+10)/10|0)*subres)
        Xa = X1a + (X2a-X1a)
        Ya = Y1a + (Y2a-Y1a)
        let Z_ = Z
        for(let m=0; m<sd_+1; m++){
          Xb = X1b + (X2b-X1b) / sd_ * m
          Yb = Y1b + (Y2b-Y1b) / sd_ * m

          camX = camX1 + (camX2 - camX1) / sd_ * m
          camY = camY1 + (camY2 - camY1) / sd_ * m
          camZ = camZ1 + (camZ2 - camZ1) / sd_ * m
          camposX = camposX1 + (camposX2 - camposX1) / sd_ * m
          camposY = camposY1 + (camposY2 - camposY1) / sd_ * m
          camposZ = camposZ1 + (camposZ2 - camposZ1) / sd_ * m
          camD = camD1 + (camD2 - camD1) / sd_ * m
          Z = m ? -1 : Z_  // only apply subsegmenting to HDRI (neg Z bypasses in x func)
          x('lineTo', Xa, Ya, Xb, Yb)
        }
        Z = Z_
      })
    }

    stroke = (scol, fcol, lw, dl, oga=1, ocp=true) => {
      if(scol){
        x('strokeStyle', scol)
        if(ocp) x('closePath')
        x('lineWidth', 1+Math.min(250, 50/Z*lw), 1+Math.min(250, 50/camD*lw))
        nlw = x('lineWidth')
        nlw1 = Math.min(250, 50/Z*lw)
        nlw2 = Math.min(250, 50/camD*lw)
        if(dl){
          x('globalAlpha', .33 * oga)
          x('stroke')
          x('lineWidth', 1+nlw1/4, 1+nlw2/4)
        }
        x('globalAlpha', 1*oga)
        x('stroke')
      }
      if(fcol){
        x('globalAlpha', 1*oga)
        x('fillStyle', fcol)
        x('fill')
      }
      x('globalAlpha', 1)
    }

    //bg = document.createElement('video')
    //bg.loop = true
    //bg.muted = true
    //bg.defaultPlaybackRate = bg.playbackRate = .75
    //bg.oncanplay = () => bg.play()
    //url = 'https://srmcgann.github.io/skyboxes3/videos/deepdive.mp4'

    bg = new Image()
    url = 'https://srmcgann.github.io/skyboxes2/HDRI/nebula2.jpg'
    await fetch(url).then(res=>res.blob()).then(data=>bg.src = URL.createObjectURL(data))
    showBG = true
    
    env = premade_geo
    
    //iBc = 3e3
    //env = geoSphere(0,0,0, iBc, 10)[4]
    
    bounding = subDividedCube(100, 2, 1)
  }

  cls()
  
  oX  = 0
  oY  = 0
  oZ  = 0
  Rl  = .05
  Pt  = .05
  Yw  = Math.min(Math.PI*2, Math.max(0, (.3+C(t/4))*Math.PI*4))
  
  lockViews = true

  if(lockViews){
    camposX = oX
    camposY = oY
    camposZ = oZ
    camRl = Rl
    camPt = Pt
    camYw = Yw
  }else{
    camposX = 0
    camposY = 0
    camposZ = 0
    camRl = 0
    camPt = 0
    camYw = 0
  }

  
  if(showBG){
    
    while(Yw > Math.PI) Yw -= Math.PI*2
    while(Yw < -Math.PI) Yw += Math.PI*2

    bgofx = c.width * (Yw/Math.PI/2)
    if(bgofx > 0) x_.drawImage(bg,bgofx-c.width,0,c.width,c.height)
    x_.drawImage(bg,bgofx,0,c.width,c.height)
    if(bgofx < 0) x_.drawImage(bg,bgofx+c.width,0,c.width,c.height)

    if(bgofx > 0) octx.drawImage(bg,bgofx-output.width,0,output.width,output.height)
    octx.drawImage(bg,bgofx,0,output.width,output.height)
    if(bgofx < 0) octx.drawImage(bg,bgofx+output.width,0,output.width,output.height)
    
    x('fillStyle', `#0002`)
    x_.fillRect(0,0,c.width,c.height)
    octx.fillRect(0,0,output.width,output.height)
  }

  bounding.map(v => {
    subV(v)
    col1 = `hsla(${t*500},99%,${Math.min(50, Math.max(0, (.3+C(t/2))*100))}%,.3)`
    col2 = ''
    stroke(col1, col2, 40, true)
  })

  if(1) env.map(v => {
    X = v[0]
    Y = v[1]
    Z = v[2]
    R(Rl,Pt,Yw,1)
    l = Q()
    s = Math.min(1e4, 500/Z)
    s2 = Math.min(1e4, 500/camD)
    p = 1//X/2
    n = 1//Y*1.5/2
    k = Z*1 + t*8
    if((lum = 50 - C(k) * C(p) * C(n) * 200) > 1){
      hof = lum * 1 - 50 + Z*10 + t*100
      col = `hsla(${0 + hof}, 99%, ${lum}%, .2)`
      x('fillStyle', col)
      x('fillRect', l[0]-s/2,l[1]-s/2,s,s,  l[2]-s2/2,l[3]-s2/2,s2,s2)
      s/=3
      s2/=3
      col = `hsla(${20 + hof}, 99%, ${lum*1.25}%, .4)`
      x('fillStyle', col)
      x('fillRect', l[0]-s/2,l[1]-s/2,s,s,  l[2]-s2/2,l[3]-s2/2,s2,s2)
      s/=3
      s2/=3
      col = `hsla(${40 + hof}, 99%, ${lum*1.5}%, 1)`
      x('fillStyle', col)
      x('fillRect', l[0]-s/2,l[1]-s/2,s,s,  l[2]-s2/2,l[3]-s2/2,s2,s2)
    }
  })

  if(showOutput) {
    if(showPreview) {
      tbctx.drawImage(c,0,0,tempBuffer.width,tempBuffer.height)
    }
    x_.drawImage(output, 0, 0, c.width, c.height)

    if(showPreview){
      prevScale = 1
      x_.strokeStyle = '#40f'
      x_.lineWidth = 6*prevScale
      x_.strokeRect(c.width - 410*prevScale, 10*prevScale, 400*prevScale, 400/outputAspectRatio*prevScale | 0)
      x_.drawImage(tempBuffer, c.width - 410*prevScale, 10*prevScale, 400*prevScale, 400/outputAspectRatio*prevScale | 0)
    }
  }else{
    if(showPreview){
      prevScale = 1
      x_.strokeStyle = '#40f'
      x_.lineWidth = 6*prevScale
      x_.strokeRect(c.width - 410*prevScale, 10*prevScale, 400*prevScale, 400/outputAspectRatio*prevScale | 0)
      x_.drawImage(output, c.width - 410*prevScale, 10*prevScale, 400*prevScale, 400/outputAspectRatio*prevScale | 0)
    }
  }
  
  if(showPreview){
    x_.font = (fs=26*prevScale) + 'px monospace'
    x_.fillStyle = '#fffa'
    x_.strokeStyle = '#000a'
    x_.textAlign = 'left'
    x_.strokeText('[h] to toggle default/HDRI', c.width - 400*prevScale, 400/outputAspectRatio*prevScale + fs * 2 + 40*prevScale)
    x_.fillText('[h] to toggle default/HDRI', c.width - 400*prevScale, 400/outputAspectRatio*prevScale + fs * 2 + 40*prevScale)
    x_.strokeText('[f] toggle force-correct AR', c.width - 400*prevScale, 400/outputAspectRatio*prevScale + 40*prevScale )
    x_.fillText('[f] toggle force-correct AR', c.width - 400*prevScale, 400/outputAspectRatio*prevScale + 40*prevScale )
    x_.strokeText('[r] to toggle render-view', c.width - 400*prevScale, 400/outputAspectRatio*prevScale + fs * 1+ 40*prevScale)
    x_.fillText('[r] to toggle render-view', c.width - 400*prevScale, 400/outputAspectRatio*prevScale + fs * 1 + 40*prevScale)
  }

  t+=1/60
  requestAnimationFrame(Draw)
}
Draw()