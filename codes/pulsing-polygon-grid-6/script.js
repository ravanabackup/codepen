const _C = document.getElementById('c') /* canvas element */,
C = _C.getContext('2d') /* 2L canvas context */,
D = _C.width /* edge length of canvas square */,
O = -.5 * D /* top left corner coordinate */,
N = 20 /* numbers of rows/ columns */,
NP = N * N /* total number of polygons */,
L = D / N /* edge length of a grid cell */,
R = .375 * L /* max circumradius of in-cell polygon */,

THEME = ['#89c8d1', '#25a9c2', '#1076b6', '#344676', '#c5cdd8', '#d6549c', '#ebaa4e', '#e6e9f0'],
NT = THEME.length,

OPTS = ['fill', 'stroke'],
NO = OPTS.length,

POLY = [],
FN = ['line', 'move'];

function rand(max = 1, min = 0, dec = 0) {
  return +(min + (max - min) * Math.random()).toFixed(dec);
};

class RandPoly {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    /* coordinates of circumcircle centre */
    this.ox = O + (j + .5) * L;
    this.oy = O + (i + .5) * L;

    this.n = 3; /* number of polygon vertices */
    this.β = 2 * Math.PI / this.n; /* base angle corresponding to an edge */
    this.f = 3; /* frequency */
    this.δ = Math.round(Math.atan2(this.oy, this.ox) * 180 / Math.PI); /* initial angular offset of pulse */
    this.m = 1; /* multiplier, dummy value for now */
    this.vx = []; /* vertex coordinates relative to circumcircle centre */
    this.b = 0; /* paint bucket index */
    this.o = 0; /* option index (0: fill, 1: stroke) */

    /* populate array of vertices */
    for (let i = 0; i < this.n; i++) {
      /* angle current vertex is ast */
      let γ = (i + .5 * (1 - this.n % 2)) * this.β - .5 * Math.PI;

      this.vx.push([R * Math.cos(γ), R * Math.sin(γ)]);
    }
  }

  get coords() {
    if ((this.δ + 720) % 360 < this.f) {/* polygon scaled to (almost) nothing */
      /* reset these values */
      this.δ = 0;
      this.b = (this.b + 1) % NT;
      this.o = 1 - this.o;
      this.n += 1;

      if (this.n > 8) this.n = 3;

      this.β = 2 * Math.PI / this.n;
      this.vx = [];

      for (let i = 0; i < this.n; i++) {
        let γ = (i + .5 * (1 - this.n % 2)) * this.β - .5 * Math.PI;

        this.vx.push([R * Math.cos(γ), R * Math.sin(γ)]);
      }
    }

    this.δ -= this.f; /* update offset */
    this.m = .5 * (1 - Math.cos(this.δ * Math.PI / 180)); /* compute multiplier */

    /* compute and return absolute vertex coordinates */
    return this.vx.map(c => [
    +(this.ox + this.m * c[0]).toFixed(2),
    +(this.oy + this.m * c[1]).toFixed(2)]);

  }}
;

function draw() {
  C.clearRect(O, O, D, D); /* clean canvas before drawing again */

  for (let i = 0; i < NT; i++) {
    let b = POLY.filter(c => c.b === i); /* polygons in current bucket */

    for (let j = 0; j < NO; j++) {
      let o = b.filter(c => c.o === j); /* polygons with current option */

      C[`${OPTS[j]}Style`] = THEME[i]; /* set stroke or fill */
      C.beginPath();

      o.forEach(c => {
        let coords = c.coords; /* current poly absolute coordinate array */

        for (let k = 0; k <= c.n; k++)
        C[`${FN[0 ** k]}To`](...coords[k % c.n]);
      });

      C.closePath();
      C[OPTS[j]]();
    }
  }

  requestAnimationFrame(draw);
};

function init() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      POLY.push(new RandPoly(i, j));
    }
  }

  C.translate(-O, -O);
  draw();
};

init();