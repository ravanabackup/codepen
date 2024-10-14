const h = document.getElementById("list");
const col1 = '#a93';
const col2 = 'transparent';
let n = 800;
let pt = {x: 150, y: 150}
let divs = []

for (let i = 0; i < n; i++){
  let div = document.createElement("div");
  divs.push(div)
  h.appendChild(div);
}

let s = 0
const sm = 800

function updateElements () {
  let s1 = Math.cos(s / sm * Math.PI * 2)
  for (let i = 0; i < divs.length; i++){
    let div = divs[i]
    let x = pt.x - (div.offsetLeft + 60/2);
    let y = pt.y - (div.offsetTop + 60/2);
    let d = Math.sqrt(x * x + y * y)
    // let a = Math.atan2(y, 0-x) / Math.PI / 2 * 360
    // let a = (Math.sin((s1 * y)/50 ) * Math.cos((s1 * x) / 100 )) * 68 * s1
    let a = Math.cos(s1 * 14 + d / 30) * 50
    div.style.background = `radial-gradient( ${col1} ${a}%, ${col2} ${a+1}%`;
  }
  s = (s + 1) % sm
  window.requestAnimationFrame(updateElements);
}

document.addEventListener('mousemove',function(evt){
  pt.x = evt.clientX;
  pt.y = evt.clientY;
},false);

updateElements()