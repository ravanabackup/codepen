"use strict";

window.addEventListener("load", function () {
  let canv, ctx; // canvas and context
  let maxx, maxy; // canvas dimensions
  let nbx, nby;
  let offsx, offsy; // position of point at [0,0]
  let lSquare;
  let grid, nbPts;

  // for animation
  let events;

  // shortcuts for Math.
  const mrandom = Math.random;
  const mfloor = Math.floor;
  const mround = Math.round;
  const mceil = Math.ceil;
  const mabs = Math.abs;
  const mmin = Math.min;
  const mmax = Math.max;

  const mPI = Math.PI;
  const mPIS2 = Math.PI / 2;
  const mPIS3 = Math.PI / 3;
  const m2PI = Math.PI * 2;
  const m2PIS3 = (Math.PI * 2) / 3;
  const msin = Math.sin;
  const mcos = Math.cos;
  const matan2 = Math.atan2;

  const mhypot = Math.hypot;
  const msqrt = Math.sqrt;

  const rac3 = msqrt(3);
  const rac3s2 = rac3 / 2;

  //------------------------------------------------------------------------

  function alea(mini, maxi) {
    // random number in given range

    if (typeof maxi == "undefined") return mini * mrandom(); // range 0..mini

    return mini + mrandom() * (maxi - mini); // range mini..maxi
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function intAlea(mini, maxi) {
    // random integer in given range (mini..maxi - 1 or 0..mini - 1)
    //
    if (typeof maxi == "undefined") return mfloor(mini * mrandom()); // range 0..mini - 1
    return mini + mfloor(mrandom() * (maxi - mini)); // range mini .. maxi - 1
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /* returns lerp point between p0 and p1,
        alpha = 0 will return p0, alpha = 1 will return p1
        values of alpha outside [0,1] may be used to compute points outside the p0-p1 segment
      */
  function lerp(p0, p1, alpha) {
    return {
      x: (1 - alpha) * p0.x + alpha * p1.x,
      y: (1 - alpha) * p0.y + alpha * p1.y
    };
  } // function lerp

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function distance(p0, p1) {
    return mhypot(p0.x - p1.x, p0.y - p1.y);
  }
  //------------------------------------------------------------------------
  class Square {
    constructor(kx, ky) {
      // assumes squares are created in the natural order
      // square vertices are actually shared by neighbor squares (pointless here)

      this.kx = kx;
      this.ky = ky;
      let x0 = offsx + lSquare * kx;
      let y0 = offsy + lSquare * ky;
      // order of vertices : NW, NE, SE, SW
      this.vertices = [];
      this.vertices[0] =
        kx > 0
          ? grid[ky][kx - 1].vertices[1]
          : ky > 0
          ? grid[ky - 1][kx].vertices[3]
          : { x: x0, y: y0 };
      this.vertices[1] =
        ky > 0 ? grid[ky - 1][kx].vertices[2] : { x: x0 + lSquare, y: y0 };
      this.vertices[2] = { x: x0 + lSquare, y: y0 + lSquare };
      this.vertices[3] =
        kx > 0 ? grid[ky][kx - 1].vertices[2] : { x: x0, y: y0 + lSquare };
      this.neighbors = [];
      this.kpx = intAlea(nbPts + 1);
      this.kpy = intAlea(nbPts + 1);
      this.points = [[], [], [], []]; // edges, W to E or N to S
      this.segments = [[], [], [], []]; // from central point, W to E or N to S
      this.xPoints = []; // points NSEW of kpx, kpy, indexed 0 from center
    }

    setNeighbors() {
      this.neighbors[0] = this.ky > 0 ? grid[this.ky - 1][this.kx] : false;
      this.neighbors[1] =
        this.kx < nbx - 1 ? grid[this.ky][this.kx + 1] : false;
      this.neighbors[2] =
        this.ky < nby - 1 ? grid[this.ky + 1][this.kx] : false;
      this.neighbors[3] = this.kx > 0 ? grid[this.ky][this.kx - 1] : false;
    }

    setNPoints() {
      let p;
      if (this.ky > 0) this.points[0] = grid[this.ky - 1][this.kx].points[2];
      else {
        for (let k = 0; k < nbPts; ++k) {
          this.points[0][k] = this.setpkxky(k + 0.5, 0);
        }
      }
      this.xPoints[0] = [];
      for (let ky = this.kpy - 0.5; ky > 0; --ky) {
        this.xPoints[0].push(this.setpkxky(this.kpx, ky));
      } // for ky
    } // setNPoints

    setSPoints() {
      for (let k = 0; k < nbPts; ++k) {
        this.points[2][k] = this.setpkxky(k + 0.5, nbPts);
      }
      this.xPoints[2] = [];
      for (let ky = this.kpy + 0.5; ky < nbPts; ++ky) {
        this.xPoints[2].push(this.setpkxky(this.kpx, ky));
      } // for ky
    } // setSPoints

    setWPoints() {
      if (this.kx > 0) this.points[3] = grid[this.ky][this.kx - 1].points[1];
      else {
        for (let k = 0; k < nbPts; ++k) {
          this.points[3][k] = this.setpkxky(0, k + 0.5);
        }
      }
      this.xPoints[3] = [];
      for (let kx = this.kpx - 0.5; kx > 0; --kx) {
        this.xPoints[3].push(this.setpkxky(kx, this.kpy));
      } // for kx
    } // setWPoints

    setEPoints() {
      for (let k = 0; k < nbPts; ++k) {
        this.points[1][k] = this.setpkxky(nbPts, k + 0.5);
      }
      this.xPoints[1] = [];
      for (let kx = this.kpx + 0.5; kx < nbPts; ++kx) {
        this.xPoints[1].push(this.setpkxky(kx, this.kpy));
      } // for ky
    } // setEPoints

    setpkxky(kx, ky) {
      return {
        kx: 2 * (this.kx * nbPts + kx),
        ky: 2 * (this.ky * nbPts + ky),
        x: offsx + ((this.kx * nbPts + kx) * lSquare) / nbPts,
        y: offsy + ((this.ky * nbPts + ky) * lSquare) / nbPts
      };
    } // setpkxky;

    setSegments() {
      /*
          may create segments of length 0, they will be cleaned later
          */
      // segments attached to xPoints[0]
      let k0 = this.kpx - 1;
      let k1 = this.kpx;
      for (let kl = this.xPoints[0].length - 1; kl >= 0; --kl, --k0, ++k1) {
        if (k0 >= 0) {
          this.setSegment(0, k0, 0, kl, 1);
        } else {
          this.setSegment(3, -1 - k0, 0, kl, 1);
        }
        if (k1 < nbPts) {
          this.setSegment(0, k1, 0, kl, 2);
        } else {
          this.setSegment(1, k1 - nbPts, 0, kl, 2);
        }
      }

      // segments attached to xPoints[1]
      k0 = this.kpy - 1;
      k1 = this.kpy;
      for (let kl = this.xPoints[1].length - 1; kl >= 0; --kl, --k0, ++k1) {
        if (k0 >= 0) {
          this.setSegment(1, k0, 1, kl, 2);
        } else {
          this.setSegment(0, nbPts + k0, 1, kl, 2);
        }
        if (k1 < nbPts) {
          this.setSegment(1, k1, 1, kl, 3);
        } else {
          this.setSegment(2, 2 * nbPts - 1 - k1, 1, kl, 3);
        }
      }

      // segments attached to xPoints[2]
      k0 = this.kpx - 1;
      k1 = this.kpx;
      for (let kl = this.xPoints[2].length - 1; kl >= 0; --kl, --k0, ++k1) {
        if (k0 >= 0) {
          this.setSegment(2, k0, 2, kl, 0);
        } else {
          this.setSegment(3, nbPts + k0, 2, kl, 0);
        }
        if (k1 < nbPts) {
          this.setSegment(2, k1, 2, kl, 3);
        } else {
          this.setSegment(1, 2 * nbPts - k1 - 1, 2, kl, 3);
        }
      }

      // segments attached to xPoints[3]
      k0 = this.kpy - 1;
      k1 = this.kpy;
      for (let kl = this.xPoints[3].length - 1; kl >= 0; --kl, --k0, ++k1) {
        if (k0 >= 0) {
          this.setSegment(3, k0, 3, kl, 1);
        } else {
          this.setSegment(0, -1 - k0, 3, kl, 1);
        }
        if (k1 < nbPts) {
          this.setSegment(3, k1, 3, kl, 0);
        } else {
          this.setSegment(2, k1 - nbPts, 3, kl, 0);
        }
      }
    } // setSegments

    setSegment(edge, kedge, xedge, kxedge) {
      let seg = { edge, kedge, xedge, kxedge };
      this.segments[edge][kedge] = seg;
      let p0 = this.points[edge][kedge];
      let p1 = this.xPoints[xedge][kxedge];
      if (!p0.seg0) p0.seg0 = seg;
      else p0.seg1 = seg;
      if (!p1.seg0) p1.seg0 = seg;
      else p1.seg1 = seg;
    } // setSegment;

    draw() {
      ctx.beginPath();
      ctx.rect(this.vertices[0].x, this.vertices[0].y, lSquare, lSquare);
      ctx.strokeStyle = "#888";
      ctx.lineWidth = 1;
      ctx.stroke();
    } // draw
  } // class Square
  //------------------------------------------------------------------------
  function createPath(square, edge, kp, reverse = false) {
    /* creates a path beginning at given point of an edge of a square */
    let path = [];
    let p0 = square.points[edge][kp];
    if (p0.path && !reverse) return false; // already belongs to a path
    let p = p0;
    let seg;

    path.push(p);
    p.path = path;

    while (true) {
      /* select segment in this square */
      seg = square.segments[edge][kp];
      /* point at the other end */
      let p1 = square.xPoints[seg.xedge][seg.kxedge];
      p1.path = path; // can't be last point
      path.push(p1);
      /* other segment */
      let nextSeg = seg == p1.seg0 ? p1.seg1 : p1.seg0;
      /* end of other segment */
      let p2 = square.points[nextSeg.edge][nextSeg.kedge];
      if (p2.path) {
        // closed
        path.closed = true;
        return path;
      }
      p2.path = path;
      path.push(p2);
      // find neighbor square - if any
      let nextSq = square.neighbors[nextSeg.edge];
      if (nextSq === false) {
        // one end of open path
        path.closed = false;
        return path;
      }
      // "next square" becomes current one
      square = nextSq;
      edge = nextSeg.edge ^ 2; // 0<->2, 1<->3
      kp = nextSeg.kedge;
    }
  } /* createPath */
  //------------------------------------------------------------------------

  function simplifyPath(path) {
    let idxn;

    for (let k = path.closed ? path.length - 1 : path.length - 2; k >= 0; --k) {
      if (k == path.length - 1 && !path.closed) continue; // last point of open path: no simplification
      idxn = k + 1;
      if (idxn >= path.length) idxn = 0;
      if (path[k].kx == path[idxn].kx) {
        path.splice(k, 1); // remove current point if same as next
      }
    }
    // connect segments with same direction
    for (let k = path.length - 2; k >= 0; --k) {
      if (k == path.length - 2 && !path.closed) continue; // last point of open path: no simplification
      let p0 = path[k];
      let p1 = path[k + 1];
      let p2 = path[(k + 2) % path.length];
      let dd = distance(p0, p1) + distance(p1, p2) - distance(p0, p2);
      if (mabs(dd) < 0.1) {
        // theorically 0, but real numbers are not that accurate
        path.splice(k + 1, 1);
      }
    } // for k
    // just in case point 0 was between 2 others
    if (path.closed && path.length >= 3) {
      let p0 = path[path.length - 1];
      let p1 = path[0];
      let p2 = path[1];
      let dd = distance(p0, p1) + distance(p1, p2) - distance(p0, p2);
      if (mabs(dd) < 0.1) {
        path.splice(0, 1);
      }
    }
    // add prev - next to each point
    let prev = null;
    if (path.closed) {
      prev = path[path.length - 1];
    } else {
      prev = null;
      path[path.length - 1].next = null;
    }
    path.forEach((p) => {
      delete p.seg0;
      delete p.seg1; // pointless now
      p.prev = prev;
      if (prev) prev.next = p;
      prev = p;
    });
  } // simplifyPath

  function simplifyPaths(paths) {
    for (let k = paths.length - 1; k >= 0; --k) {
      let path = paths[k];
      simplifyPath(path);
      if (path.length < 2) {
        paths.splice(k, 1);
      }
    } // for k
  } // simplifyPaths

  //------------------------------------------------------------------------

  function analyzePath(path) {
    // put points into new grid
    path.forEach((p) => {
      if (!grid[p.ky]) grid[p.ky] = [];
      grid[p.ky][p.kx] = p;

      if (p.prev) p.lprev = distance(p, p.prev);
      if (p.next) p.lnext = distance(p, p.next);

      if (p.prev && p.next) {
        if (
          (p.kx > p.prev.kx && p.next.kx > p.kx) ||
          (p.kx < p.prev.kx && p.next.kx < p.kx)
        ) {
          if (p.next.ky > p.ky) p.V = 2;
          else p.V = 0;
        } else {
          if (p.next.kx > p.kx) p.V = 1;
          else p.V = 3;
        }
      }
    });
  } // analyzePath
  //------------------------------------------------------------------------
  function analyzePaths(paths) {
    paths.forEach(analyzePath);
  }
  //------------------------------------------------------------------------
  function calculateRadii(paths) {
    let radius;
    let kx1, ky1, p1;

    paths.forEach((path) => {
      path.forEach((p) => {
        // path.foEach
        if (p.radius) return; // already known
        if (!p.prev || !p.next) return; // not an angle
        let v = p.V;
        while (true) {
          // find deepest point
          kx1 = p.kx + [0, 2, 0, -2][v];
          ky1 = p.ky + [-2, 0, 2, 0][v];
          if (!grid[ky1] || !grid[ky1][kx1]) break; // reached edge, stop digging
          p1 = grid[ky1][kx1];
          if (p1.V !== v) break; // not same V, stop digging
          p = p1;
        } // while true;
        // now, fill radius for deepest, then others
        radius = mmin(p.lprev, p.lnext) / 2;
        p.radius = radius;
        while (true) {
          // walk through the stack of V's
          kx1 = p.kx + [0, -2, 0, 2][v];
          ky1 = p.ky + [2, 0, -2, 0][v];
          if (!grid[ky1] || !grid[ky1][kx1]) break; // reached edge
          p = grid[ky1][kx1];
          if (p.V !== v) return; // top reached
          radius = mmin(
            radius + lSquare / nbPts / msqrt(2),
            p.lprev / 2,
            p.lnext / 2
          );
          p.radius = radius;
        } // while
      }); //path.forEach
    }); // paths.forEach
  } // calculate radii
  //------------------------------------------------------------------------
  function analyzePerimeter(paths) {
    /* connects points at the perimeter 2 by 2 so that all open paths become closed
            could have been done at path creation time.
        */
    /* more simple than zebra 20 : no smart algorithm to pick pairs of points. Only 2 ends of open paths */

    for (let k = paths.length - 1; k >= 0; --k) {
      if (paths[k].closed) continue;
      connectPair(paths[k], paths[k][paths[k].length - 1], paths[k][0]);
    }

    /* creates points for corners
         instances need to be separated, so they can be linked with "prev" and "next" in different paths */
    function returnp0() {
      // top left
      return { x: offsx - lSquare, y: offsy - lSquare };
    }
    function returnp1() {
      // top right
      return { x: offsx + (nbx + 1) * lSquare, y: offsy - lSquare };
    }
    function returnp2() {
      // bottom right
      return { x: offsx + (nbx + 1) * lSquare, y: offsy + (nby + 1) * lSquare };
    }
    function returnp3() {
      // bottom left;
      return { x: offsx - lSquare, y: offsy + (nby + 1) * lSquare };
    }
    function returnCorner(index) {
      return [returnp0, returnp1, returnp2, returnp3][index]();
    }

    function connectPair(path, p0, p1) {
      /* p0 and p1 are on edges - they must be given in the right order
             insert points in the corners as necessary */

      let side0, side1;
      if (p0.ky == 0) side0 = 0;
      else if (p0.kx == 2 * nbx * nbPts) side0 = 1;
      else if (p0.ky == 2 * nby * nbPts) side0 = 2;
      else side0 = 3;
      if (p1.ky == 0) side1 = 0;
      else if (p1.kx == 2 * nbx * nbPts) side1 = 1;
      else if (p1.ky == 2 * nby * nbPts) side1 = 2;
      else side1 = 3;

      let lst;
      if (side0 == side1) {
        // no corner, nothing to add
        lst = [];
      } else if (side1 == (side0 + 1) % 4) {
        // one corner
        lst = [side1];
      } else if (side0 == (side1 + 1) % 4) {
        // one corner
        lst = [side0];
      } else {
        // sides of opposite edges

        if (side0 == 0 || side0 == 2) {
          // on top-bottom edges
          let mx = p0.x + p1.x;
          if (mx > maxx) {
            // points in the right half : around p1 and p2
            if (p0.y < p1.y) lst = [1, 2];
            else lst = [2, 1];
          } else {
            // points in the left half : around p0 and p3
            if (p0.y < p1.y) lst = [0, 3];
            else lst = [3, 0];
          }
        } else {
          let my = p0.y + p1.y;
          if (my > maxy) {
            // points in the bottom half : around p2 and p3
            if (p0.x < p1.x) lst = [3, 2];
            else lst = [2, 3];
          } else {
            // points in the top half : around p0 and p1
            if (p0.x < p1.x) lst = [0, 1];
            else lst = [1, 0];
          }
        } // on right-left edges
      }

      while (lst.length) path.push(returnCorner(lst.shift())); // corners
    } // connectPair
  } // analyzePerimeter
  //------------------------------------------------------------------------
  function prioritizePaths(paths) {
    let hierar = { path: -1, inside: [] }; // outermost level
    paths.forEach((path) => insertPath(hierar, { path, inside: [] }));
    return hierar;

    function insertPath(hier, subHier) {
      let p = subHier.path.find(
        (p) =>
          p.kx &&
          p.kx > 0 &&
          p.kx < 2 * nbx * nbPts &&
          p.ky > 0 &&
          p.ky < 2 * nby * nbPts
      ); // picks a point which is not fake (out of screen corners) and not on edge
      if (p === undefined) p = subHier.path.find((p) => p.kx || p.ky); // special case for corners
      if (hier.path !== -1 && !ctx.isPointInPath(hier.path.path1, p.x, p.y))
        return false; // proposed path can't be inserted in proposed hier
      if (hier.inside.length == 0) {
        hier.inside.push(subHier);
        return true; // successfully inserted
      }
      // try to enclose path into one of inside hier
      for (let k = 0; k < hier.inside.length; ++k) {
        if (insertPath(hier.inside[k], subHier)) return true; // successfully done
      }
      // try to enclose one or more of inside hier into path
      for (let k = hier.inside.length - 1; k >= 0; --k) {
        let b = hier.inside[k];
        if (insertPath(subHier, hier.inside[k])) hier.inside.splice(k, 1);
      }
      hier.inside.push(subHier);
      return true;
    } // insertPath
  } // prioritizePaths

  //------------------------------------------------------------------------
  function buildPath(path) {
    let np, prev;

    let radius = lSquare / nbPts / msqrt(2) / 2;

    let ctx = new Path2D();

    path.forEach((p, k) => {
      if (k == 0) {
        prev = path[path.length - 1];
        if (prev.radius !== undefined) np = lerp(prev, p, 0.5);
        else np = prev;
        ctx.moveTo(np.x, np.y);
      }
      let pnext = path[(k + 1) % path.length];
      if (p.radius !== undefined) {
        np = lerp(p, pnext, 0.5);
        ctx.arcTo(p.x, p.y, np.x, np.y, p.radius);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.closePath();
    path.path = ctx;
  } // buildPath

  //------------------------------------------------------------------------
  function buildPath1(path) {
    /* creates a path without radius in the angles
        only useful for the purpose of prioritizing the paths, which is based on the rectangular paths
        */

    let ctx = new Path2D();

    path.forEach((p, k) => {
      if (k == 0) {
        ctx.moveTo(p.x, p.y);
      } else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    path.path1 = ctx;
  } // buildPath1

  //------------------------------------------------------------------------
  function drawPath(path, fillStyle, strokeStyle, lineWidth) {
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill(path.path);
    }
    if (ctx.lineWidth) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke(path.path);
    }
  } // drawPath
  //------------------------------------------------------------------------
  //------------------------------------------------------------------------

  function buildPaths(paths) {
    paths.forEach(buildPath);
    paths.forEach(buildPath1);
  } // buildPaths

  //------------------------------------------------------------------------

  function drawHierar(hierar, hue) {
    let linGrad;
    if (hue === undefined) hue = intAlea(360);
    let sat = intAlea(50, 100);

    if (hierar.path === -1) {
      linGrad = ctx.createLinearGradient(0, maxy, maxx, 0);
      linGrad.addColorStop(0, `hsl(${hue} ${sat}% 20%)`);
      linGrad.addColorStop(0.5, `hsl(${hue} ${sat}% 50%)`);
      linGrad.addColorStop(1, `hsl(${hue} ${sat}% 80%)`);
      ctx.fillStyle = linGrad;
      ctx.fillRect(0, 0, maxx, maxy);
    } else {
      // find extreme values of x+y and x-y to generate color gradient
      let minminus = 1e9,
        maxminus = -1e9;

      hierar.path.forEach((p) => {
        if (p.kx == undefined || p.ky == undefined) return; // ignore corners
        minminus = mmin(minminus, p.x - p.y);
        maxminus = mmax(maxminus, p.x - p.y);
      });
      if (maxminus == minminus) maxminus = minminus + lSquare / nbPts; // to avoid problems in corners
      linGrad = ctx.createLinearGradient(
        0,
        -minminus,
        (maxminus - minminus) / 2,
        -minminus - (maxminus - minminus) / 2
      );
      linGrad.addColorStop(0, `hsl(${hue} ${sat}% 20%)`);
      linGrad.addColorStop(0.5, `hsl(${hue} ${sat}% 50%)`);
      linGrad.addColorStop(1, `hsl(${hue} ${100}% 80%)`);

      drawPath(hierar.path, linGrad, "black", 2);
    }
    hierar.inside.forEach((hier) =>
      drawHierar(hier, (hue + intAlea(180 - 90, 180 + 90)) % 360)
    );
  }

  //------------------------------------------------------------------------

  function createPaths() {
    let paths = [];
    grid.forEach((line) =>
      line.forEach((sq) =>
        sq.points.forEach((v, edge) =>
          v.forEach((point, kedge) => {
            let p = createPath(sq, edge, kedge);
            if (p !== false) {
              if (!p.closed) {
                // try opposite direction
                if (sq.neighbors[edge]) {
                  let p1 = createPath(
                    sq.neighbors[edge],
                    edge ^ 2,
                    kedge,
                    true
                  );
                  if (p1) {
                    // reverse p and append p1 to the end of reversed p
                    p.shift(); // avoid double point
                    p = p.reverse().concat(p1);
                    p.forEach((pt) => (pt.path = p)); // update path variable in points
                    p.closed = false;
                  }
                }
              }
              paths.push(p);
            }
          })
        )
      )
    );
    return paths;
  } // create paths

  //------------------------------------------------------------------------

  function createGrid() {
    grid = [];
    for (let ky = 0; ky < nby; ++ky) {
      grid[ky] = [];
      for (let kx = 0; kx < nbx; ++kx) {
        grid[ky][kx] = new Square(kx, ky);
      } // for kx
    } // for ky
    grid.forEach((line) => line.forEach((sq) => sq.setNeighbors()));

    grid.forEach((line) =>
      line.forEach((sq) => {
        sq.setNPoints();
        sq.setEPoints();
        sq.setSPoints();
        sq.setWPoints();
        sq.setSegments();
      })
    );

    let paths = createPaths();

    simplifyPaths(paths);
    grid = []; // will recreate new, thinner grid for points instead of squares
    analyzePaths(paths);
    calculateRadii(paths);
    analyzePerimeter(paths);
    buildPaths(paths);
    let hierar = prioritizePaths(paths);

    drawHierar(hierar);
  } // createGrid
  //------------------------------------------------------------------------

  let animate;

  {
    // scope for animate

    let animState = 0;

    animate = function (tStamp) {
      let event;
      let tinit;

      event = events.shift();
      if (event && event.event == "reset") animState = 0;
      if (event && event.event == "click") animState = 0;
      window.requestAnimationFrame(animate);

      tinit = performance.now();

      switch (animState) {
        case 0:
          if (startOver()) {
            ++animState;
          }
          break;

        case 1:
          ++animState;
          break;

        case 2:
          break;
      } // switch
    }; // animate
  } // scope for animate

  //------------------------------------------------------------------------
  //------------------------------------------------------------------------

  function startOver() {
    // canvas dimensions

    maxx = window.innerWidth;
    maxy = window.innerHeight;

    canv.width = maxx;
    canv.height = maxy;
    ctx.lineJoin = "bevel";
    ctx.lineCap = "round";

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, maxx, maxy);

    let lElem = msqrt(maxx * maxy) / alea(10, 60);
    nbPts = intAlea(1, 10);
    lSquare = lElem * nbPts;

    nbx = mceil(maxx / lSquare); // number of hozizontal segments
    nby = mceil(maxy / lSquare); // number of vertical segments

    nbx -= 0;
    nby -= 0;

    if (nbx < 2 || nby < 2) return false;

    // offset for perfect centering of lines / segments
    offsx = (maxx - nbx * lSquare) / 2;
    offsy = (maxy - nby * lSquare) / 2;

    createGrid();

    return true;
  } // startOver

  //------------------------------------------------------------------------

  function mouseClick(event) {
    events.push({ event: "click" });
  } // mouseMove

  //------------------------------------------------------------------------
  //------------------------------------------------------------------------
  // beginning of execution

  {
    canv = document.createElement("canvas");
    canv.style.position = "absolute";
    document.body.appendChild(canv);
    ctx = canv.getContext("2d");
    canv.setAttribute("title", "click me");
  } // création CANVAS
  canv.addEventListener("click", mouseClick);
  events = [{ event: "reset" }];
  requestAnimationFrame(animate);
}); // window load listener