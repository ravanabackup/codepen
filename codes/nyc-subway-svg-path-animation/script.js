// Duplicate the transit lines
const container = document.getElementById('map');
const svgBack = document.getElementById('back');
const svgFront = svgBack.cloneNode(true);
svgFront.setAttribute('id', 'front');
container.appendChild(svgFront);

// Obtain all transit line paths + polylines
let paths = document.querySelectorAll('#front path, #front polyline');
paths = Array.prototype.slice.call(paths);
let style = ``;

const CAR_SIZE = 10;
paths.forEach((path, i) => {
  path.setAttribute('id', 'path-' + i);
  const length = path.getTotalLength();

  const speed = length / 100;

  style += `
    #path-${i} {
      stroke-dasharray: ${CAR_SIZE}, ${length / 2};
      stroke-dashoffset: ${length};
      animation: dash-${i} ${speed}s linear alternate infinite;  
    }

    @keyframes dash-${i} {
      from {
        stroke-dashoffset: ${length};
      }
      to {
        stroke-dashoffset: 0;
      }
    }`;
});

const sheet = document.createElement('style');
sheet.innerHTML = style;
document.body.appendChild(sheet);

function toggle3D(e) {
  svgFront.classList.toggle('three-D');
  svgBack.classList.toggle('three-D');
}