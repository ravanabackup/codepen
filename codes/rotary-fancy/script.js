c=document.querySelector('#c')
c.width  = 1920
c.height = 1080
x=c.getContext('2d')
S=Math.sin
C=Math.cos
Rn=Math.random
R = function(r,g,b,a) {
  a = a === undefined ? 1 : a;
  return "rgba("+(r|0)+","+(g|0)+","+(b|0)+","+a+")";
};
t=go=0
rsz=window.onresize=()=>{
  setTimeout(()=>{
    if(document.body.clientWidth > document.body.clientHeight*1.77777778){
      c.style.height = '100vh'
      setTimeout(()=>c.style.width = c.clientHeight*1.77777778+'px',0)
    }else{
      c.style.width = '100vw'
      setTimeout(()=>c.style.height = c.clientWidth/1.77777778 + 'px',0)
    }
    c.width=1920
    c.height=c.width/1.777777778
  },0)
}
rsz()

Draw=()=>{
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

    R2=(Rl,Pt,Yw,m)=>{X=S(p=(A=(M=Math).atan2)(X,Y)+Rl)*(d=(H=M.hypot)(X,Y)),Y=C(p)*d,Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z)),Z=C(p)*d,X=S(p=A(X,Z)+Yw)*(d=H(X,Z)),Z=C(p)*d;if(m)X+=oX,Y+=oY,Z+=oZ}

    async function loadOBJ(url, scale, tx, ty, tz, rl, pt, yw) {
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
          ax+=v[0]
          ay+=v[1]
          az+=v[2]
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
          v[1]=Y
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

    Sphere=(ls,cl,rw)=>{
      let X,Y,Z
      let ret=[]
      for(i=cl*rw;i--;){
        a=[]
        j=i%cl
        k=(i/cl|0)
        l=(j+1)%cl

        X=S(p=Math.PI*2/cl*j)*S(q=Math.PI/rw*k)*ls
        Y=C(q)*ls
        Z=C(p)*S(q)*ls
        a=[...a,[X,Y,Z]]
        X=S(p=Math.PI*2/cl*l)*S(q=Math.PI/rw*k)*ls
        Y=C(q)*ls
        Z=C(p)*S(q)*ls
        a=[...a,[X,Y,Z]]
        X=S(p=Math.PI*2/cl*l)*S(q=Math.PI/rw*(k+1))*ls
        Y=C(q)*ls
        Z=C(p)*S(q)*ls
        a=[...a,[X,Y,Z]]
        X=S(p=Math.PI*2/cl*j)*S(q=Math.PI/rw*(k+1))*ls
        Y=C(q)*ls
        Z=C(p)*S(q)*ls
        a=[...a,[X,Y,Z]]

        ret = [...ret, a]
      }
      return ret
    }

    Tetrahedron=ls=>{
      let ret=[]
      let a = []
      let theta=1.2217304763960306
      for(let i=3;i--;){
        X=S(p=Math.PI*2/3*i)
        Y=C(p)+.5
        Z=0
        R2(0,-theta/2,0)
        a=[...a, [X,Y,Z]]
      }
      ret=[...ret, a]
      b=JSON.parse(JSON.stringify(a))
      ax=ay=az=0
      b.map(v=>{
        X=v[0]
        Y=v[1]
        Z=v[2]
        R2(0,theta,0)
        v[0]=X
        v[1]=Y
        v[2]=Z
      })
      ret=[...ret, b]
      ct=0
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
          q[0]-=ax*1.5
          q[1]-=ay*1.5
          q[2]-=az*1.5
        })
      })

      b=JSON.parse(JSON.stringify(ret))
      b.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,Math.PI,Math.PI/2)
          q[0]=X
          q[1]=Y
          q[2]=Z
        })
      })
      ret=[...ret, ...b]

      ret.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,.96,0)
          R2(0,0,t*5)
          R2(0,Math.PI,0)
          q[0]=X
          q[1]=Y
          q[2]=Z
          d=Math.hypot(...q)
          q[0]/=d
          q[1]/=d
          q[2]/=d
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
      })
      return ret
    }

    Octahedron=ls=>{
      ret = []
      a=[]
      for(i=4;i--;){
        X1=S(p=Math.PI*2/4*i+Math.PI/4)
        Y1=C(p)
        Z1=0
        X2=S(p=Math.PI*2/4*(i+1)+Math.PI/4)
        Y2=C(p)
        Z2=0
        X3=0
        Y3=0
        Z3=1
        a=[
          [X1,Y1,Z1],
          [X2,Y2,Z2],
          [X3,Y3,Z3]
        ]
        ret=[...ret, a]
        a=[
          [X1,Y1,-Z1],
          [X2,Y2,-Z2],
          [X3,Y3,-Z3]
        ]
        ret=[...ret, a]
      }
      ret.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,Math.PI/2,Math.PI/2)
          q[0]=X
          q[1]=Y
          q[2]=Z
          d=Math.hypot(...q)
          q[0]/=d
          q[1]/=d
          q[2]/=d
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
      })
      return ret
    }

    Cube=ls=>{
      let ret=[]
      let b,j,i,a
      for(j=6;j--;ret=[...ret,b]){for(b=[],i=4;i--;)b=[...b,[(a=[S(p=Math.PI/2*i+Math.PI/4),C(p),2**.5/2                                                                                                            ])[j%3]*(l=j<3?-ls:ls),a[(j+1)%3]*l,a[(j+2)%3]*l]]}
      ret.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
      })
      return ret
    }

    Icosahedron=ls=>{
      let a=[1,1],ret=[]
      let b
      for(i=40;i--;)a=[...a,a[l=a.length-1]+a[l-1]];
      let phi=a[l]/a[l-1]
      a=[[[-phi,-1,0],[phi,-1,0],[phi,1,0],[-phi,1,0]],[[0,-phi,-1],[0,phi,-1],[0,phi,1],[0,-phi,1]],[[                                                                                                            -1,0,-phi],[-1,0,phi],[1,0,phi],[1,0,-phi]]]
      let ico=[[[0,1],[1,0],[1,3]],[[0,1],[2,3],[1,0]],[[2,0],[2,3],[1,0]],[[0,1],[2,3],[0,2]],[[1,1],[                                                                                                            2,3],[0,2]],[[1,1],[2,3],[2,0]],[[1,1],[1,2],[0,2]],[[0,1],[2,2],[0,2]],[[0,0],[1,0],[2,0]],[[2,0],[0,3                                                                                                            ],[0,0]],[[1,1],[1,2],[0,3]],[[1,1],[2,0],[0,3]],[[0,1],[1,3],[2,2]],[[1,3],[2,1],[2,2]],[[2,1],[0,3],[                                                                                                            1,2]],[[2,1],[0,0],[1,3]],[[1,2],[2,2],[2,1]],[[2,2],[1,2],[0,2]],[[0,3],[2,1],[0,0]],[[1,3],[1,0],[0,0                                                                                                            ]]]
      ico.map((v,i)=>{
        b=[]
        v.map(q=>{
          t1=q[0],t2=q[1]
          X=a[t1][t2][0],Y=a[t1][t2][1],Z=a[t1][t2][2]
          b=[...b, [X,Y,Z]]
        })
        ret=[...ret, b]
      })
      ret.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,0,Math.PI/2)
          q[0]=X
          q[1]=Y
          q[2]=Z
          d=Math.hypot(...q)
          q[0]/=d
          q[1]/=d
          q[2]/=d
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
      })
      return ret
    }

    Dodecahedron=ls=>{
      let ret=[]
      let sd=5
      let a=[], b=[]
      mind=6e6
      for(let i=sd;i--;){
        X=S(p=Math.PI*2/sd*i)
        Y=C(p)
        Z=0
        if(Y<mind)mind=Y
        a = [...a, [X,Y,Z]]
      }
      a=a.map(v=>{
        X=v[0]
        Y=v[1]-=mind
        Z=v[2]
        R2(0,.5535735,0)
        return [X,Y,Z]
      })

      ret = [...ret, a]
      b=JSON.parse(JSON.stringify(a)).map(v=>{
        d=Math.hypot(v[0],v[1])
        v[0]=S(p=Math.atan2(v[0],v[1])+Math.PI)*d
        v[1]=C(p)*d
        return v
      })
      ret = [...ret, b]

      ret.map(v=>{
        v.map(q=>{
          if(q[2]<mind)mind=q[2]
        })
      })
      ret.map(v=>{
        v.map(q=>{
          q[2]+=ang=1.538840639715
        })
      })
      b=JSON.parse(JSON.stringify(ret)).map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(Math.PI,0,Math.PI)
          q[0]=X
          q[1]=Y
          q[2]=Z
        })
        return v
      })
      e=JSON.parse(JSON.stringify(ret = [...ret, ...b]))

      b=JSON.parse(JSON.stringify(ret)).map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,Math.PI/2,Math.PI/2)
          q[0]=X
          q[1]=Y
          q[2]=Z
        })
        return v
      })
      ret = [...ret, ...b]

      b=JSON.parse(JSON.stringify(e)).map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(Math.PI/2,0,Math.PI/2)
          q[0]=X
          q[1]=Y
          q[2]=Z
        })
        return v
      })
      ret = [...ret, ...b]

      ret.map(v=>{
        v.map(q=>{
          X=q[0]
          Y=q[1]
          Z=q[2]
          R2(0,0,t*5)
          q[0]=X
          q[1]=Y
          q[2]=Z
          d=Math.hypot(...q)
          q[0]/=d
          q[1]/=d
          q[2]/=d
          q[0]*=ls
          q[1]*=ls
          q[2]*=ls
        })
      })
      return ret
    }
    
    iLc = 6,sp = 3*(2**.5/2)
    Layers = Array(iLc).fill().map((v,i)=>{
      a = []
      for(j=8;j--;){
        b = Cube(1).map(q=>{
          return q.map(n=>{
            X = n[0]
            Y = n[1] + (-iLc/2+i+.5)*sp
            Z = n[2] + 4*(2**.5/2)
            R(0,0,Math.PI*2/8*j)
            return [X,Y,Z]
          })
        })
        a = [...a, [0,0,0,b]]
      }
      return a
    })
    stroke = (scol, fcol) => {
      if(scol){
        x.closePath()
        x.strokeStyle=scol
        x.globalAlpha = .2
        x.lineWidth=Math.min(1e3,250/Z)
        x.stroke()
        x.globalAlpha = 1
        x.lineWidth/=5
        x.stroke()
      }
      if(fcol){
        x.fillStyle=fcol
        x.fill()
      }
    }
    bg = new Image()
    bg.src = 'https://srmcgann.github.io/temp3/S73UN.jpg'
  }

  x.globalAlpha = .3
  x.drawImage(bg,0,0,c.width,c.height)
  x.globalAlpha = 1
  x.fillStyle='#0003'
  x.fillRect(0,0,c.width,c.height)
  oX=oY=0, oZ=10
  Rl=Math.PI/2,Pt=C(t)/2,Yw=t
  x.lineCap=x.lineJoin='round'
  
  Layers.map((v,i)=>{
    v.map((q,j)=>{
      rl=q[0]
      pt=q[1]
      yw=q[2]+Math.min(0,Math.max(-.05,S(t*2+Math.PI*6/iLc*i)*20))*(i%2?1:-1)
      q[3].map(n=>{
        x.beginPath()
        n.map(m=>{
          X=m[0]
          Y=m[1]
          Z=m[2]
          R(rl,pt,yw)
          m[0]=X
          m[1]=Y
          m[2]=Z
          R(Rl,Pt,Yw,1)
          if(Z>0)x.lineTo(...Q())
        })
        stroke('#4f82', '#40f1')
      })
    })
  })

  t+=1/60
  requestAnimationFrame(Draw)

}
Draw()