const canvas = document.getElementById('block-canvas');

const columnCount = 17;
const rowCount = columnCount;

for (let x = 0; x < rowCount; x++) {
  const row = document.createElement('div');
  row.classList.add('block-row');
  canvas.appendChild(row);

  for (let y = 0; y < columnCount; y++) {
    const col = document.createElement('span');
    col.classList.add('block');
    row.appendChild(col);
  }
}

const player = just.animate({
  targets: '.block',
  to: '1.2s',
  delay() {
    return just.random(0, 1800);
  },
  easing: 'ease-in',
  fill: 'both',
  iterations: Infinity,
  css: [
  {
    offset: [0, 1],
    backgroundColor: 'black' },

  {
    offset: .5,
    backgroundColor(ctx) {
      const hue = Math.round(ctx.index % 17 / 17 * 365);
      return 'hsl(' + hue + ', 65%, 35%)';
    } }] });