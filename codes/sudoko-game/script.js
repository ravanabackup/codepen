c = document.querySelector('#c')
sp=80
c.width = c.clientWidth*1.2
c.height = c.clientHeight*1.2
x = c.getContext('2d')
currentmode = 1, noteMode = 0, midx = -1, showingSolution = false, ranOnce = false, clearErrorMode = false, loading = false
var choiceButtons = document.querySelectorAll('.choiceButton')

choices = Array(9).fill().map(v=>false)
toggleNoteMode = () =>{
  noteMode = !noteMode
  if(noteMode){
    document.querySelector('#noteButton').style.background = '#4f8'
    document.querySelector('#noteButton').style.color = '#123'
  } else {
    document.querySelector('#noteButton').style.background = '#246'
    document.querySelector('#noteButton').style.color = '#ff0'
  }
}

toggleChoice = (button) =>{
  id=+button.id.substring(2)
  if(choices[id-1]==true){
    choices = Array(9).fill().map(v=>false)
    choiceButtons[id-1].style.background = '#012'
    choiceButtons[id-1].style.color = '#cdeb'
  } else {
    choices = Array(9).fill().map(v=>false)
    choiceButtons.forEach(v=>{
      v.style.background = '#012'
      v.style.color = '#cdeb'
    })
    choices[id-1]=true
    choiceButtons[id-1].style.background = '#4f8'
    choiceButtons[id-1].style.color = '#123'
  }
}

load=(mode)=>{
  if(confirm('Are you sure you want to abandon the game in progress???')){
    switch(mode){
      case 'easy':
        init(.38)
        currentmode=0
        break
      case 'medium':
        init(.32)
        currentmode=1
        break
      case 'hard':
        init(.26)
        currentmode=2
        break
    }
  } else {
    switch(currentmode){
      case 0:
        document.querySelector('#easy').checked = true
        break
      case 1:
        document.querySelector('#medium').checked = true
        break
      case 2:
        document.querySelector('#hard').checked = true
        break
    }
  }
}

showSolution=()=>{
  if(showingSolution) return
  showingSolution = true
  document.querySelector('#showSolutionButton').style.background = '#4f8'
  document.querySelector('#showSolutionButton').style.color = '#123'
  x.clearRect(0,0,c.width,c.height)
  X=c.width/2
  Y=c.height/2
  P[0].map((v,i)=>{
    tx=X+(i%9)*sp-sp*9/2
    ty=Y+(i/9|0)*sp-sp*9/2
    x.strokeStyle='#cde3'
    x.lineWidth=4
    x.strokeRect(tx,ty,sp,sp)
  })
  for(i=9;i--;){
    tx=X+(i%3)*sp*3-sp*9/2
    ty=Y+(i/3|0)*sp*3-sp*9/2          
    x.lineWidth=8
    x.strokeRect(tx,ty,sp*3,sp*3)
  }
  x.font='60px Abel'
  P[0].map((v,i)=>{
    if(v+1){
      tx=X+(i%9)*sp-sp*9/2
      ty=Y+(i/9|0)*sp-sp*9/2

      if(out[0][i]===-1 || out[0][i] !== P[0][i]){
        x.fillStyle='#8fcf'
      } else {
        x.fillStyle='#cdeb'
      }
      x.fillText(v,tx+24,ty+62)
    }
  })
  setTimeout(()=>{
    hideSolution()
  },1000)
}
hideSolution=()=>{
  showingSolution = false
  document.querySelector('#showSolutionButton').style.background = '#246'
  document.querySelector('#showSolutionButton').style.color = '#ff0'
  D2(X,Y,0)
}
placeNote = () =>{
  let currentChoice = -1
  choices.map((v,i)=>{
    if(v) currentChoice = i
  })
  if((P[1][midx]==-1 || P[1][midx]!==P[0][midx])&& currentChoice!==-1) {
    notes[midx][currentChoice] = !notes[midx][currentChoice]
  }
  //out[0] = JSON.parse(JSON.stringify(P[1]))
}
clearErrors = () =>{

  P[1]=P[1].map((v,i)=>{
    if(v !== -1 && v !== P[0][i]) v= -1
    return v
  })
  out[0] = JSON.parse(JSON.stringify(P[1]))
  document.querySelector('#clearErrorButton').style.background = '#4f8'
  document.querySelector('#clearErrorButton').style.color = '#123'
  setTimeout(()=>{

    document.querySelector('#clearErrorButton').style.background = '#246'
    document.querySelector('#clearErrorButton').style.color = '#ff0'
  },500)
}
placeNumber = () =>{
  let currentChoice = 0
  choices.map((v,i)=>{
    if(v) currentChoice = i + 1
  })
  if((P[1][midx]==-1 || P[1][midx] !== P[0][midx]) && currentChoice){
    P[1][midx] = currentChoice
    notes[midx]=Array(9).fill(false)
  }
  out[0] = JSON.parse(JSON.stringify(P[1]))

  finished = true
  P[1].map((v,i)=>{
    if(v !== P[0][i]) finished = false
  })
  if(finished){
    alert("congratulations! You've won this game!!!\n\n\n          :)\n\n\n          click 'ok' to play again!")
    switch(currentmode){
      case 0:
        init(.38)
        break
      case 1:
        init(.32)
        break
      case 2:
        init(.26)
        break
    }          
  }
}
solve = () =>{
  P[0].map((v,i)=>{
    P[1][i]=v
  })
  out[0] = JSON.parse(JSON.stringify(P[1]))
  setTimeout(()=>{
    finished = true
    if(finished){
      alert("congratulations! You've won this game!!!\n\n\n          :)\n\n\n          click 'ok' to play again!")
      switch(currentmode){
        case 0:
          init(.38)
          break
        case 1:
          init(.32)
          break
        case 2:
          init(.26)
          break
      }          
    }
  },1000/30)
}
D2=(X,Y,m)=>{
  ranOnce = true
  if(showingSolution || loading) return
  x.clearRect(0,0,c.width,c.height)
  out[m].map((v,i)=>{
    tx=X+(i%9)*sp-sp*9/2
    ty=Y+(i/9|0)*sp-sp*9/2
    x.strokeStyle='#cde3'
    x.lineWidth=4
    x.strokeRect(tx,ty,sp,sp)
    if(choices.filter(v=>v).length && i == midx && (v==-1 || v!==P[0][midx])){
      if(v == -1 || v!==P[0][midx]){
        x.fillStyle='#4f8'
      } else {
        x.fillStyle='#888'
      }
      x.fillRect(tx,ty,sp,sp)
    }
  })
  for(i=9;i--;){
    tx=X+(i%3)*sp*3-sp*9/2
    ty=Y+(i/3|0)*sp*3-sp*9/2
    x.lineWidth=8
    x.strokeRect(tx,ty,sp*3,sp*3)
  }
  out[m].map((v,i)=>{
    if(v+1){
      tx=X+(i%9)*sp-sp*9/2
      ty=Y+(i/9|0)*sp-sp*9/2
      x.font='60px Abel'
      if(i==midx && v === -1){
        x.fillStyle='#012'
      }else{
        if(v !== -1 && v != P[0][i]){
          x.fillStyle='#f88b'
        } else {
          x.fillStyle='#cdeb'
        }
      }
      x.fillText(v,tx+24,ty+62)
    }
  })
  notes.map((v,i)=>{
    tx=X+(i%9)*sp-sp*9/2
    ty=Y+(i/9|0)*sp-sp*9/2
    x.font='18px Abel'
    a=''
    v.map((q,j)=>{ a += q ? (j+1)+',' : '' })
    a=a.substring(0, a.length-1)
    x.fillStyle='#fff'
    x.fillText(a,tx+5,ty+18)
  })
  if(!showingSolution){
    setTimeout(()=>{
      D2(X,Y,m)
    }, 1000/60)
  }
}
Rn=Math.random
gen=(diff)=>{
  P=Array(3).fill().map(v=>Array(81).fill(-1))
  for(a=[1,2,3,4,5,6,7,8,9],i=99;i--;)b=a[v=i%9],a[v]=a[e=Rn()*9|0],a[e]=b
  centers.map((v,i)=>P[0][v]=a[i])
  while(P[0].filter(v=>v==-1).length){
    posA=Array(81).fill().map((v,i)=>{
      b=possibilities(i,0)
      if(!b.length && P[0][i]==-1)gen(diff)
      return b
    })
    minP=6e6,idx=-1
    posA.map((v,i)=>{if(P[0][i]==-1 && v.length<minP)minP=v.length,idx=i})
    if(idx+1)P[0][idx]=posA[idx][posA[idx].length*Rn()|0]
  }
  posA=Array(81).fill().map((v,i)=>possibilities(i,0))
  onesol=0
  while(!onesol){
    onesol=1
    P[1]=P[0].map((v,i)=>Rn()<diff?v:-1 )
    P[2]=JSON.parse(JSON.stringify(P[1]))
    while(onesol && P[2].filter(v=>v==-1).length){
      posB=Array(81).fill().map((v,i)=>possibilities(i,2))
      minP=6e6,idx=-1
      posB.map((v,i)=>{if(P[2][i]==-1 && v.length<minP)minP=v.length,idx=i})
      if(minP>1)onesol=0
      if(onesol && idx+1)P[2][idx]=posB[idx][posB[idx].length*Rn()|0]
    }
  }
  posB=Array(81).fill().map((v,i)=>possibilities(i,1))
  return JSON.parse(JSON.stringify(P[1]))
}
possibilities=(q,m)=>{
  if(P[m][q]+1) return []
  a=[1,2,3,4,5,6,7,8,9]
  X=q%9
  Y=q/9|0
  for(let i=9;i--;){
    if(P[m][l=X+i*9]!=-1 && a.indexOf(P[m][l])!=-1) a.splice(a.indexOf(P[m][l]),1)
    if(P[m][l=q-X+i]!=-1 && a.indexOf(P[m][l])!=-1) a.splice(a.indexOf(P[m][l]),1)
  }
  quads[(Y/3|0)*3+(X/3|0)].map((v,i)=>{
    if(P[m][v]!=-1 && a.indexOf(P[m][v])!=-1)a.splice(a.indexOf(P[m][v]),1)
  })
  return a
}
init=diff=>{
  timer=0
  loading=true
  notes = Array(81).fill().map(v=>Array(9).fill(false))
  x.font='120px Abel'
  x.fillStyle='#023'
  x.fillRect(0,0,c.width,c.height)
  x.fillStyle='#0f8'
  x.fillText('Generating'+('.'.repeat(timer%8)),c.width/2-300,c.height/2-150)
  setTimeout(()=>{
    out=[]
    centers=[10,13,16,37,40,43,64,67,70]
    quads=[
      [0,1,2,9,10,11,18,19,20],
      [3,4,5,12,13,14,21,22,23],
      [6,7,8,15,16,17,24,25,26],
      [27,28,29,36,37,38,45,46,47],
      [30,31,32,39,40,41,48,49,50],
      [33,34,35,42,43,44,51,52,53],
      [54,55,56,63,64,65,72,73,74],
      [57,58,59,66,67,68,75,76,77],
      [60,61,62,69,70,71,78,79,80]
    ]
    for(L=1;L--;)out=[...out,gen(diff)]
    for(let i=1;i--;){
      X=c.width/2//c.width/2+((i%2)-.5)*sp*9*1.25
      Y=c.height/2//c.height/2+((i/2|0)-1)*sp*9*1.1
      loading = false
      D2(X,Y,i)
    }
  }, 100)
}
c.addEventListener('mousedown',e=>{
  mx = e.offsetX
  my = e.offsetY
  midx = ((mx/c.clientWidth*9)|0) + (9 * ((my/c.clientHeight*9)|0))
  //if(clearErrorMode){
  //  clearError()
  //} else {
  if(noteMode){
    placeNote()
  }else{
    placeNumber()
  }
  //}
})
c.addEventListener('mousemove',e=>{
  mx = e.offsetX
  my = e.offsetY
  midx = ((mx/c.clientWidth*9)|0) + (9 * ((my/c.clientHeight*9)|0))
})
c.addEventListener('mouseup',e=>{
  midx = -1
})
c.addEventListener('mouseleave',e=>{
  midx = -1
})
c.addEventListener('touchstart',e=>{
  mx = e.offsetX
  my = e.offsetY
  midx = ((mx/c.clientWidth*9)|0) + (9 * ((my/c.clientHeight*9)|0))
})
c.addEventListener('touchmove',e=>{
  mx = e.offsetX
  my = e.offsetY
  midx = ((mx/c.clientWidth*9)|0) + (9 * ((my/c.clientHeight*9)|0))
})
c.addEventListener('touchend',e=>{
  midx = -1
})
init(.32)