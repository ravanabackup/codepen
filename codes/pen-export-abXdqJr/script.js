/*!
water
@wakana-k
https://codepen.io/wakana-k/pen/abXdqJr
*/
"use strict";

!(function () {
  function t() {
    !(function () {
      (a = o / 2),
        (l = c / 2),
        (i = s.create()),
        (e = i.world),
        (r = d.create({
          element: document.body,
          engine: i,
          options: {
            width: o,
            height: c,
            wireframes: !1,
            background: "blue",
            pixelRatio: 1
          }
        })),
        (n = f.create()),
        f.run(n, i);
      let t, h, y, w;
      if (
        ((t = M.rectangle(o / 2 - 500, -250, o + 1e3, 500, {
          friction: 0,
          frictionStatic: 0,
          isStatic: !0,
          isSensor: !0,
          render: {
            fillStyle: "white",
            strokeStyle: "white",
            lineWidth: 10
          }
        })),
        (h = M.rectangle(o / 2 - 500, c + 250, o + 1e3, 500, {
          friction: 0,
          frictionStatic: 0,
          isStatic: !0,
          render: {
            fillStyle: "white",
            strokeStyle: "white",
            lineWidth: 20
          }
        })),
        (y = M.rectangle(-250, c / 2, 500, 2 * c, {
          friction: 0,
          frictionStatic: 0,
          isStatic: !0,
          render: {
            fillStyle: "transparent",
            strokeStyle: "transparent",
            lineWidth: 0
          }
        })),
        (w = M.rectangle(o + 250, c / 2, 500, 2 * c, {
          friction: 0,
          frictionStatic: 0,
          isStatic: !0,
          render: {
            fillStyle: "transparent",
            strokeStyle: "transparent",
            lineWidth: 0
          }
        })),
        u.add(e, [t, h, y, w]),
        "undefined" != typeof fetch)
      ) {
        let t = null;
        t = M.circle(a, 0, 10, {
          restitution: 0.8,
          friction: 0,
          frictionStatic: 0,
          frictionAir: 0,
          mass: 10,
          render: {
            fillStyle: "white",
            strokeStyle: "white",
            lineWidth: 0
          }
        });
        let i = function () {
            let i = structuredClone(t);
            (i.id = S.nextId()), u.add(e, i);
          },
          r = 0,
          n = setInterval(() => {
            i(), 300 == r && (clearInterval(n), (t = null)), r++;
          }, 220);
      } else S.warn("Fetch is not available. Could not load SVG.");
      d.lookAt(r, {
        min: {
          x: 0,
          y: 0
        },
        max: {
          x: o,
          y: c
        }
      }),
        d.run(r);
    })();
  }
  let e,
    i,
    r,
    n,
    a,
    l,
    o = 512,
    c = 512,
    s = (Matter.World, Matter.Engine),
    d = Matter.Render,
    f = Matter.Runner,
    S = (Matter.Composites, Matter.Common),
    u = (Matter.MouseConstraint, Matter.Mouse, Matter.Composite),
    M = (Matter.Vertices, Matter.Bodies);
  Matter.Body, Matter.Events, Matter.Query, Matter.Svg;
  window.onload = () => {
    t();
  };
})();