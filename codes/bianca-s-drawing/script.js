const canvas = document.createElement("canvas");
document.getElementsByTagName("body")[0].appendChild(canvas);

const ctx = canvas.getContext("2d");
const bg = [20, 0, 30];
const size = 30;
const squares = [];

const square = (x, y, r) => ({
  c: "white",
  draw: () => {
    let b =
      Math.sin(x * 0.6 + r * 0.13) *
      Math.sin(x * 0.25 + r * 0.23) *
      Math.cos(y * 0.65 + r * 0.13) *
      Math.cos(y * 0.2 + r * 0.23);
    let c = [
      1 - b * 5 * Math.cos(Math.cos(b*Math.PI) * (1-r)),
      1 - b * 5 * Math.sin(Math.cos(b*Math.PI + Math.PI/2) * (1-r)),
      1 - b * 5 * Math.sin(Math.tan(r+0.01) * (b + Math.PI))
    ];
    ctx.beginPath();
    ctx.rect(x * size, y * size, size - 0.5, size - 0.5);
    ctx.fillStyle = `hsla(${c[0] * 360}, ${c[1] * 155 + 100}%, ${Math.max(0.18,c[2]) * 255}%, 1)`;
    ctx.fill();
    ctx.closePath();
    return this;
  },
  update: () => {
    r = (r + 0.003) % 1;
    return this;
  }
});

const fill = (rgb, amt) => {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${amt})`;
  ctx.fill();
};

const setup = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fill(bg, 1);

  const numY = Math.ceil(canvas.height / size);
  const numX = Math.ceil(canvas.width / size);
  const num = numX * numY;
  while (squares.length > 0) {
    squares.pop();
  }
  while (squares.length < num) {
    let y = (squares.length / numX) << 0;
    let x = squares.length % numX;
    squares.push(square(x, y, Math.random()));
  }

  squares.forEach(s => s.draw());
};

setup();
window.addEventListener("resize", setup);

const animate = () => {
  fill(bg, 1);
  squares.forEach(s => {
    s.update();
    s.draw();
  });
  window.requestAnimationFrame(animate);
};
window.requestAnimationFrame(animate);