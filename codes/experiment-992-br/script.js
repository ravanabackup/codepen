const h = document.getElementById("list");
const col1 = '#333';
const col2 = 'transparent';
let n = 400;
let pt = {x: 150, y: 150}
let divs = []

for (let i = 0; i < n; i++){
  let div = document.createElement("div");
  divs.push(div)
  h.appendChild(div);
}

let s = 0
const sm = 120

function updateElements () {
  let s1 = Math.cos(s / sm * Math.PI * 2) 
  
  for (let i = 0; i < divs.length; i++){
    let div = divs[i]
    let x = pt.x - (div.offsetLeft + 45/2);
    let y = (div.offsetTop + 45/2) - pt.y;
    let a = Math.atan2(y, 0-x) / Math.PI / 2 * 360
    let d = Math.cos(Math.sqrt(x * x + y * y) / 400)
    let a2 = a + s1 * 20 * d
    div.style.background = `linear-gradient(${180-a2}deg, ${col1} 49.2%, ${col2} 50.8%)`;
    div.style.transform = `rotate(${a+180}deg)`;
  }
  s = (s + 1) % sm
  window.requestAnimationFrame(updateElements);
}

document.addEventListener('mousemove',function(evt){
  pt.x = evt.clientX;
  pt.y = evt.clientY;
},false);

updateElements()