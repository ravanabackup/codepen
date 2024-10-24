const { abs, floor, ceil, round, sin, PI: π } = Math;
const random = (x = 1) => Math.random() * x;
const rgb = (...values) => `rgb(${values.join(',')})`;
const rgba = (...values) => `rgba(${values.join(',')})`;

function nArray(n) {
  return [...Array(n).keys()];
}

function generateGrid(size, cellCallback) {
  return nArray(size).map((row, y) =>
  nArray(size).map((cell, x) => cellCallback(x, y)));

}

function generateField({ density, offset = 0, width, height }) {
  const pixels = nArray(width * height);
  return pixels.
  map((px, i) => {
    const star = {
      x: offset + px % width,
      y: floor(px / width) };

    // Put some colorful points if debug is enabled
    if (Settings.debug) {
      const isMiddle = i === width * height / 2;
      const isLast = i === width * height - 1;
      if (isLast) {
        return Object.assign(star, { color: 'red' });
      }
      if (isMiddle) {
        return Object.assign(star, { color: 'blue' });
      }
    }
    if (random() > 1 - density) {
      return star;
    }
    return null;
  }).
  filter(Boolean);
}

function drawSky(ctx, width, state) {
  ctx.fillStyle = Settings.sky.bg;
  ctx.fillRect(0, 0, width, width);
  state.sky.shift += Settings.sky.shiftSpeed;
}

function generateStars(ctx, width, state) {
  const { stars, fields, shift } = state.sky;
  if (!stars.length || width * fields - shift <= width) {
    const newStars = generateField({
      density: Settings.sky.starDensity,
      offset: width * fields,
      width: width,
      height: width }).
    map(star => ({
      ...star,
      color: star.color || Settings.sky.starColor }));

    stars.splice(0, 1);
    stars.push(...newStars);
    state.sky.fields++;
  }
}

function drawStars(ctx, width, state) {
  const stars = state.sky.stars;
  stars.forEach(({ x, y, color }) => {
    ctx.fillStyle = color;
    const shiftedX = x - state.sky.shift;
    ctx.fillRect(shiftedX, y, 1, 1);
  });
}

function drawPlanet(ctx, width, state) {
  const {
    size,
    colors,
    atmosphereThickness,
    atmosphereColor,
    mapShiftSize,
    mapShiftSpeed,
    map } =
  Settings.planet;

  const {
    mapShift,
    mapShiftDirection,
    mapShiftCounter } =
  state.planet;

  // atmosphere
  const radius = width * size / 2;
  ctx.fillStyle = atmosphereColor;
  ctx.beginPath();
  ctx.arc(
  width / 2,
  width / 2,
  radius * atmosphereThickness,
  0,
  2 * π);

  ctx.fill();

  // planet circle
  ctx.fillStyle = colors.base;
  ctx.beginPath();
  ctx.arc(
  width / 2,
  width / 2,
  radius,
  0,
  2 * π);

  ctx.fill();

  // clipping path
  ctx.save();
  ctx.beginPath();
  ctx.arc(
  width / 2,
  width / 2,
  radius,
  0,
  2 * π);

  ctx.clip();

  // radial gradient for shiny ocean surface
  const gradient = ctx.createRadialGradient(
  width / 2 + radius / 4,
  width / 2 - radius / 4,
  radius / 4,
  width / 2,
  width / 2,
  radius * 1.25);

  gradient.addColorStop(0, rgba(150, 150, 255, .2));
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(
  width / 2 - size * width / 2,
  width / 2 - size * width / 2,
  size * width,
  size * width);


  // Map
  const mapPxSizeX = size * width / (map.length - mapShiftSize);
  const mapPxSizeY = size * width / map.length;
  map.forEach((row, mapY) => {
    row.forEach((cell, mapX) => {
      const middleRow = map.length / 2;
      const shift = abs(middleRow - abs(middleRow - mapY)) / middleRow;
      const globularShift = sin(π / 2 * shift);
      ctx.fillStyle = colors[cell];
      ctx.fillRect(
      mapShift * globularShift + width / 2 - floor(map.length / 2 * mapPxSizeX) + mapX * mapPxSizeX,
      width / 2 - floor(map.length / 2 * mapPxSizeY) + mapY * mapPxSizeY,
      mapPxSizeX,
      mapPxSizeY);

    });
  });

  // Back and forth movement of the map
  if (!(mapShiftCounter % (1 / mapShiftSpeed))) {
    state.planet.mapShift += mapShiftDirection;
    if (abs(state.planet.mapShift) - mapShiftSize >= 0) {
      state.planet.mapShiftDirection *= -1;
    }
  }
  state.planet.mapShiftCounter++;

  // restore for clipping path
  ctx.restore();
}

function drawMoonBack(ctx, width, state) {
  const { size, color } = Settings.moonBack;
  const { orbit } = state.moonBack;
  const radius = width * size / 2;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(
  orbit * width + size * width,
  width / 2,
  radius,
  0,
  2 * π);

  ctx.fill();
}

function drawMoon(ctx, width, state) {
  const { size, color, craters, craterColor } = Settings.moon;
  const { orbit } = state.moon;
  const radius = width * size / 2;
  const moonX = orbit * width - size * width;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(
  moonX,
  width / 2,
  radius,
  0,
  2 * π);

  ctx.fill();
  ctx.fillStyle = craterColor;
  craters.forEach(({ x, y, size: craterSize }) => {
    ctx.beginPath();
    const craterX = moonX - size / 2 * width + x * radius;
    const craterY = width / 2 - size / 2 * width + y * radius;
    ctx.arc(
    craterX - size * 15 + size * 30 * orbit,
    craterY,
    radius * craterSize,
    0,
    2 * π);

    ctx.fill();
  });
}

function orbitMoon(ctx, width, state) {
  if (state.moon.orbit > 2) {
    state.moonBack.orbit -= width * state.moonBack.orbitSpeed;
    if (state.moonBack.orbit < -.66) {
      state.moon.orbit = 0;
      state.moonBack.orbit = 1;
    }
  } else {
    state.moon.orbit += width * state.moon.orbitSpeed;
  }
}

function draw(ctx, width, state) {
  generateStars(ctx, width, state);
  drawSky(ctx, width, state);
  drawStars(ctx, width, state);
  drawMoonBack(ctx, width, state);
  drawPlanet(ctx, width, state);
  drawMoon(ctx, width, state);
  orbitMoon(ctx, width, state);
  requestAnimationFrame(() => {
    draw(ctx, width, state);
  });
}

function init(state) {
  const ctx = canvas.getContext('2d');
  draw(ctx, canvas.width, state);
}

const Settings = {
  debug: false,
  planet: {
    size: .2,
    colors: {
      base: 'darkblue',
      0: 'transparent',
      1: 'forestgreen',
      2: '#eee',
      3: 'khaki' },

    atmosphereThickness: 1.2,
    atmosphereColor: rgba(100, 100, 255, .1),
    mapShiftSize: 3,
    mapShiftSpeed: .1,
    map: [
    [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
    [0, 1, 0, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 3, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0]] },


  moonBack: {
    size: .03,
    color: '#aaa' },

  moon: {
    size: .06,
    color: '#ccc',
    craterColor: '#555',
    craters: [
    { x: .6, y: .6, size: .3 },
    { x: 1.1, y: 1, size: .3 },
    { x: 1.5, y: .8, size: .2 }] },


  sky: {
    bg: '#05080c',
    get shiftSpeed() {
      if (Settings.debug) return 0.8;
      return 0.08;
    },
    starDensity: 0.04,
    get starColor() {
      if (random() >= .25) {
        return rgba([255, 255, 255, .1]);
      }
      if (random() >= .75) {
        return rgba([255, 255, 255, .3]);
      }
      if (random() >= .66) {
        return rgba([255, 200, 200, .3]);
      }
      if (random() >= .5) {
        return rgba([200, 200, 255, .3]);
      }
      if (random() >= .33) {
        return rgba([255, 200, 200, .4]);
      }
      if (random() >= .25) {
        return '#fff';
      }
      return rgba([200, 200, 255, .4]);
    } } };



const State = {
  planet: {
    mapShift: 0,
    mapShiftDirection: 1,
    mapShiftCounter: 0 },

  moonBack: {
    orbit: 1,
    get orbitSpeed() {
      if (Settings.debug) return .0001;
      return .00001;
    } },

  moon: {
    orbit: .25,
    get orbitSpeed() {
      if (Settings.debug) return .0002;
      return .00002;
    } },

  sky: {
    shift: 0,
    fields: 0,
    stars: [] } };



init(State);