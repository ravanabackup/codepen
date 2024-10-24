function reset(canvas) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  return {
    ctx: c.getContext('2d'),
    width,
    height };

}

const { random, round, floor, ceil, min, max } = Math;

function rangeRandom(min, max) {
  return min + random() * (max - min);
}

function arrRandom(arr) {
  return arr[floor(random() * arr.length)];
}

function nArray(n) {
  return [...Array(n).keys()];
}

function buildArm(segmentsMin, segmentsMax) {
  const randomCount = rangeRandom(segmentsMin, segmentsMax);
  const segmentCount = round(randomCount);
  return nArray(segmentCount).map(s => 1);
}

function buildScene({
  armsMin,
  armsMax,
  segmentsMin,
  segmentsMax })
{
  const randomCount = rangeRandom(armsMin, armsMax);
  const armCount = round(randomCount);
  return {
    arms: nArray(armCount).map((a) =>
    buildArm(segmentsMin, segmentsMax)) };


}

function drawScene(ctx, w, h, arms, settings, colors) {
  arms.reduce((params, arm, index) => {
    const x = params.x + w(1 / arms.length);
    const y = params.y;

    return arm.reduce((segParams, segment, segIndex) => {

      const {
        x,
        y,
        segmentLength,
        segmentWidth } =
      segParams;
      const newSegmentWidth = segmentWidth * .99;
      ctx.lineCap = 'rounded';
      ctx.fillStyle = arrRandom(colors);
      ctx.fillRect(x, y, segmentWidth, segmentLength);
      const newX = x + (segmentWidth - newSegmentWidth) / 2;
      const newY = y - segmentLength;
      return {
        x: newX,
        y: newY,
        segmentLength: segmentLength,
        segmentWidth: newSegmentWidth };


    }, {
      x,
      y: h(1),
      segmentLength: rangeRandom(h(1 / 100), h(1 / 50)),
      segmentWidth: settings.baseSegWidth });


  }, {
    x: 0,
    y: 0 });

}

function draw() {
  const { ctx, width, height } = reset(c);

  const w = x => width * x;
  const h = x => height * x;

  const baseSegWidth = rangeRandom(2, 10);

  const settings = {
    armsMin: floor(w(1 / baseSegWidth)),
    armsMax: floor(w(1 / baseSegWidth)),
    segmentsMin: 5,
    segmentsMax: 100,
    baseSegWidth };


  const colors = arrRandom([
  [
  'rebeccapurple',
  'hotpink',
  'yellow',
  'gold',
  'royalblue',
  'crimson'],

  [
  'red',
  'pink',
  'hotpink',
  'cyan',
  'blue',
  'lime'],

  [
  '#000',
  '#111',
  '#222',
  '#333',
  '#444',
  '#555',
  '#666',
  '#777',
  '#888',
  '#999',
  '#aaa',
  '#bbb',
  '#ccc',
  '#ddd',
  '#eee',
  '#fff'],

  [
  'hotpink',
  'mediumspringgreen',
  'yellow',
  'crimson'],

  [
  'hotpink',
  'crimson']]);



  const { arms } = buildScene(settings);
  const armCount = arms.length;

  drawScene(ctx, w, h, arms, settings, colors);
}

const throttle = 10;
let counter = 0;
function loop() {
  if (!(counter++ % throttle)) {
    draw();
  }
  requestAnimationFrame(loop);
}

loop();