(function() {
  'use strict';
  var LorenzAttractor;

  Math.DEG = 180 / Math.PI;

  Math.RAD = Math.PI / 180;

  Math.TAU = Math.PI * 2;

  Math.PHI = 0.5 + 0.5 * Math.sqrt(5);

  LorenzAttractor = function(σ, ρ, β) {
    return function(v, t) {
      var x, y, z;
      [x, y, z] = v;
      v[0] += t * (σ * (y - x));
      v[1] += t * (x * (ρ - z) - y);
      return v[2] += t * (x * y - β * z);
    };
  };

  this.addEventListener('load', function() {
    var canvas, context, lorenz, model, mvp, p, projection, render, u, v, view;
    lorenz = LorenzAttractor(10, 28, 8 / 3);
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    document.body.appendChild(canvas);
    model = mat4.create();
    view = mat4.create();
    projection = mat4.create();
    mvp = mat4.create();
    v = vec4.fromValues(1, 0, 0, 1);
    u = vec4.create();
    p = vec4.create();
    return (render = function() {
      var H, HH, HW, T, W, i, j, lastX, lastY, outside, x, y, z;
      requestAnimationFrame(render);
      T = 1e-3 * Date.now();
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      if (W !== canvas.width || H !== canvas.height) {
        canvas.width = W;
        canvas.height = H;
        context.globalCompositeOperation = 'screen';
        context.strokeStyle = 'rgb(30,15,80)';
      }
      mat4.identity(model);
      mat4.rotateY(model, model, 0.05 * T);
      mat4.rotateX(model, model, 1.89 * Math.PI);
      mat4.rotateZ(model, model, 1.66 * Math.PI);
      mat4.translate(model, model, [0, 0, -27]);
      mat4.lookAt(view, [0, 3, 25], [0, -2, 0], [0, 1, 0]);
      mat4.perspective(projection, 45 * Math.RAD, W / H, 1e-3, 1e3);
      mat4.scale(projection, projection, [HW = W / 2, HH = H / 2, 1]);
      [model, view, projection].reduce(function(a, b) {
        return mat4.mul(mvp, b, a);
      });
      context.setTransform(1, 0, 0, -1, HW, HH);
      for (i = j = 0; j < 100000; i = ++j) {
        if (i === 1e2) {
          vec3.copy(u, v);
        }
        lorenz(v, 5e-3);
        vec4.transformMat4(p, v, mvp);
        vec3.scale(p, p, 1 / p[3]);
        [x, y, z] = p;
        if ((-1 < z && z < 1) && (-HH < y && y < HH) && (-HW < x && x < HW)) {
          if (outside) {
            outside = false;
            context.moveTo(lastX, lastY);
          }
          context.lineTo(x, y);
        } else {
          if (!outside) {
            outside = true;
            context.lineTo(x, y);
          }
          lastX = x;
          lastY = y;
        }
      }
      vec3.copy(v, u);
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, W, H);
      context.stroke();
      return context.beginPath();
    })();
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQTtBQUFBLE1BQUE7O0VBRUEsSUFBSSxDQUFDLEdBQUwsR0FBVyxHQUFBLEdBQU0sSUFBSSxDQUFDOztFQUN0QixJQUFJLENBQUMsR0FBTCxHQUFXLElBQUksQ0FBQyxFQUFMLEdBQVU7O0VBQ3JCLElBQUksQ0FBQyxHQUFMLEdBQVcsSUFBSSxDQUFDLEVBQUwsR0FBVTs7RUFDckIsSUFBSSxDQUFDLEdBQUwsR0FBVyxHQUFBLEdBQU0sR0FBQSxHQUFNLElBQUksQ0FBQyxJQUFMLENBQVUsQ0FBVjs7RUFFdkIsZUFBQSxHQUFrQixRQUFBLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQUE7V0FDaEIsUUFBQSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUE7QUFDRixVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7TUFBSSxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixDQUFBLEdBQWM7TUFDZCxDQUFDLENBQUMsQ0FBRCxDQUFELElBQVEsQ0FBQSxHQUFJLENBQUMsQ0FBQSxHQUFFLENBQUMsQ0FBQSxHQUFFLENBQUgsQ0FBSDtNQUNaLENBQUMsQ0FBQyxDQUFELENBQUQsSUFBUSxDQUFBLEdBQUksQ0FBQyxDQUFBLEdBQUUsQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFGLEdBQVEsQ0FBVDthQUNaLENBQUMsQ0FBQyxDQUFELENBQUQsSUFBUSxDQUFBLEdBQUksQ0FBQyxDQUFBLEdBQUUsQ0FBRixHQUFJLENBQUEsR0FBRSxDQUFQO0lBSmQ7RUFEZ0I7O0VBT2xCLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixNQUFsQixFQUEwQixRQUFBLENBQUEsQ0FBQTtBQUUxQixRQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLFVBQUEsRUFBQSxNQUFBLEVBQUEsQ0FB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QUFhLENBQWI7TUFFQSxPQUFPLENBQUMsWUFBUixDQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQixDQUEzQixFQUE4QixDQUE5QixFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQztNQUNBLE9BQU8sQ0FBQyxTQUFSLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLENBQTNCO01BQ0EsT0FBTyxDQUFDLE1BQVIsQ0FBQTthQUNBLE9BQU8sQ0FBQyxTQUFSLENBQUE7SUE5Q1UsQ0FBVDtFQWhCcUIsQ0FBMUI7QUFkQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5NYXRoLkRFRyA9IDE4MCAvIE1hdGguUElcbk1hdGguUkFEID0gTWF0aC5QSSAvIDE4MFxuTWF0aC5UQVUgPSBNYXRoLlBJICogMlxuTWF0aC5QSEkgPSAwLjUgKyAwLjUgKiBNYXRoLnNxcnQgNVxuXG5Mb3JlbnpBdHRyYWN0b3IgPSAoz4MsIM+BLCDOsikgLT5cbiAgKHYsIHQpIC0+XG4gICAgWyB4LCB5LCB6IF0gPSB2XG4gICAgdlswXSArPSB0ICogKM+DKih5LXgpKVxuICAgIHZbMV0gKz0gdCAqICh4KijPgS16KS15KVxuICAgIHZbMl0gKz0gdCAqICh4KnktzrIqeilcblxuQGFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnLCAtPlxuXG4gIGxvcmVueiAgPSBMb3JlbnpBdHRyYWN0b3IgMTAsIDI4LCA4LzNcbiAgY2FudmFzICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2NhbnZhcydcbiAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0ICcyZCdcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBjYW52YXNcblxuICBtb2RlbCAgICAgID0gbWF0NC5jcmVhdGUoKVxuICB2aWV3ICAgICAgID0gbWF0NC5jcmVhdGUoKVxuICBwcm9qZWN0aW9uID0gbWF0NC5jcmVhdGUoKVxuICBtdnAgICAgICAgID0gbWF0NC5jcmVhdGUoKVxuXG4gIHYgPSB2ZWM0LmZyb21WYWx1ZXMgMSwgMCwgMCwgMVxuICB1ID0gdmVjNC5jcmVhdGUoKVxuICBwID0gdmVjNC5jcmVhdGUoKVxuXG4gIGRvIHJlbmRlciA9IC0+XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHJlbmRlclxuXG4gICAgVCA9IDFlLTMgKiBEYXRlLm5vdygpXG4gICAgVyA9IGNhbnZhcy5jbGllbnRXaWR0aFxuICAgIEggPSBjYW52YXMuY2xpZW50SGVpZ2h0XG5cbiAgICBpZiBXIGlzbnQgY2FudmFzLndpZHRoIG9yIEggaXNudCBjYW52YXMuaGVpZ2h0XG4gICAgICBjYW52YXMud2lkdGggID0gV1xuICAgICAgY2FudmFzLmhlaWdodCA9IEhcbiAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NjcmVlbidcbiAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmdiKDMwLDE1LDgwKSdcblxuICAgIG1hdDQuaWRlbnRpdHkgbW9kZWxcbiAgICBtYXQ0LnJvdGF0ZVkgbW9kZWwsIG1vZGVsLCAwLjA1ICogVFxuICAgIG1hdDQucm90YXRlWCBtb2RlbCwgbW9kZWwsIDEuODkgKiBNYXRoLlBJXG4gICAgbWF0NC5yb3RhdGVaIG1vZGVsLCBtb2RlbCwgMS42NiAqIE1hdGguUElcbiAgICBtYXQ0LnRyYW5zbGF0ZSBtb2RlbCwgbW9kZWwsIFswLCAwLCAtMjddXG4gICAgbWF0NC5sb29rQXQgdmlldywgWzAsIDMsIDI1XSwgWzAsIC0yLCAwXSwgWzAsIDEsIDBdXG4gICAgbWF0NC5wZXJzcGVjdGl2ZSBwcm9qZWN0aW9uLCA0NSAqIE1hdGguUkFELCBXL0gsIDFlLTMsIDFlM1xuICAgIG1hdDQuc2NhbGUgcHJvamVjdGlvbiwgcHJvamVjdGlvbiwgW0hXID0gVy8yLCBISCA9IEgvMiwgMV1cbiAgICBbIG1vZGVsLCB2aWV3LCBwcm9qZWN0aW9uIF0ucmVkdWNlIChhLCBiKSAtPiBtYXQ0Lm11bCBtdnAsIGIsIGFcblxuICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtIDEsIDAsIDAsIC0xLCBIVywgSEhcbiAgICBmb3IgaSBpbiBbMC4uLjEwMGUzXVxuICAgICAgdmVjMy5jb3B5IHUsIHYgaWYgaSBpcyAxZTJcbiAgICAgIGxvcmVueiB2LCA1ZS0zXG4gICAgICB2ZWM0LnRyYW5zZm9ybU1hdDQgcCwgdiwgbXZwXG4gICAgICB2ZWMzLnNjYWxlIHAsIHAsIDEvcFszXVxuICAgICAgWyB4LCB5LCB6IF0gPSBwXG4gICAgICBpZiAtMTx6PDEgYW5kIC1ISDx5PEhIIGFuZCAtSFc8eDxIV1xuICAgICAgICBpZiBvdXRzaWRlXG4gICAgICAgICAgb3V0c2lkZSA9IG5vXG4gICAgICAgICAgY29udGV4dC5tb3ZlVG8gbGFzdFgsIGxhc3RZXG4gICAgICAgIGNvbnRleHQubGluZVRvIHgsIHlcbiAgICAgIGVsc2VcbiAgICAgICAgaWYgbm90IG91dHNpZGVcbiAgICAgICAgICBvdXRzaWRlID0geWVzXG4gICAgICAgICAgY29udGV4dC5saW5lVG8geCwgeVxuICAgICAgICBsYXN0WCA9IHhcbiAgICAgICAgbGFzdFkgPSB5XG4gICAgdmVjMy5jb3B5IHYsIHVcblxuICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtIDEsIDAsIDAsIDEsIDAsIDBcbiAgICBjb250ZXh0LmNsZWFyUmVjdCAwLCAwLCBXLCBIXG4gICAgY29udGV4dC5zdHJva2UoKVxuICAgIGNvbnRleHQuYmVnaW5QYXRoKClcbiJdfQ==
//# sourceURL=coffeescript