console.clear();

function onInputChange (e) {
  gsap.to(els, {
    stagger: {  
      grid: [rows, cols],
      from: e.target.index,
      each: 0.07,
      onStart: function () {
        if (e.target !== this.targets()[0]) {
          this.targets()[0].checked = !this.targets()[0].checked;
        }
      },
    }
  });
}

let els = [];
const el = document.querySelector('input');
const container = document.querySelector('.container');
let width = el.offsetWidth;
let height = el.offsetHeight;
let cols = 0;
let rows = 0;
function createGrid () {
  width = el.offsetWidth + 2;
  height = el.offsetHeight + 2;
  els.forEach(_el => _el.remove());

  const ww = window.innerWidth;
  const wh = window.innerHeight;
  cols = Math.floor(ww / width);
  rows = Math.floor(wh / height) - 1;
  els = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const _el = document.createElement('input');
      _el.type = 'checkbox';
      _el.addEventListener('change', onInputChange);
      _el.index = (x + y * cols);
      container.append(_el);
      els.push(_el);
    } 
  }
}

let resizeDebounce = null;
window.addEventListener('resize', () => {
  resizeDebounce = window.clearTimeout(resizeDebounce);
  resizeDebounce = window.setTimeout(createGrid, 200);
});
createGrid();