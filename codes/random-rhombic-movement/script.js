const COUNT = 20;

const rhombusSize = 20;
const sideSize = (COUNT + 1) * rhombusSize;

const c = document.querySelector('canvas');
const ctx = c.getContext('2d');

const rhombuses = [];
const spaces = [];

function init() {

  c.width = sideSize;
  c.height = sideSize;
  
  for (let i = 0; i < Math.pow(COUNT, 2); i++) {

    const rhombus = {
      x: i % COUNT,
      y: Math.floor(i / COUNT),
      isMoving: false,
      speed: 0.1 + Math.random() * 0.2,
      hue: Math.floor(Math.random() * 360)
    }

    rhombuses.push(rhombus);
  }

  for (let i = 0; i < COUNT; i++) {
    const spaceIx = Math.floor(Math.random() * rhombuses.length)
    spaces.push(rhombuses[spaceIx])
    rhombuses.splice(spaceIx, 1);
  }

  render();
}

function render() {

  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, sideSize, sideSize);

  spaces.forEach((space, ix) => {
    const nearDots = rhombuses.filter(rhombus => {
      return (!rhombus.isMoving) &&
        (rhombus.x >= space.x - 1) && (rhombus.x <= space.x + 1) &&
        (rhombus.y >= space.y - 1) && (rhombus.y <= space.y + 1) &&
        ((rhombus.oldX != space.x) || (rhombus.oldY != space.y)) 
    });

    if (nearDots.length > 0) {
      const nextDot = nearDots[Math.floor(Math.random() * nearDots.length)];

      nextDot.isMoving = true;
      nextDot.oldX = nextDot.x;
      nextDot.oldY = nextDot.y;
      nextDot.newX = space.x;
      nextDot.newY = space.y;

      spaces.splice(ix, 1);
    }
  });

  rhombuses.forEach(rhombus => {

    if (rhombus.isMoving) {
      rhombus.x = rhombus.x + ((rhombus.newX - rhombus.x) * rhombus.speed);
      rhombus.y = rhombus.y + ((rhombus.newY - rhombus.y) * rhombus.speed);

      if ((Math.abs(rhombus.x - rhombus.newX) < 0.1) && (Math.abs(rhombus.y - rhombus.newY) < 0.1)) {
        rhombus.x = rhombus.newX;
        rhombus.y = rhombus.newY;
        rhombus.isMoving = false;

        const space = {
          x: rhombus.oldX,
          y: rhombus.oldY,
        }

        spaces.push(space);
      }
    }

    ctx.beginPath();
    ctx.rect((rhombus.x + 0.75) * rhombusSize, (rhombus.y + 0.75) * rhombusSize, rhombusSize * 0.5, rhombusSize * 0.5);
    ctx.fillStyle = `hsl(${rhombus.hue}, 100%, 50%)`;
    ctx.fill();
  });

  requestAnimationFrame(render)
}

init();