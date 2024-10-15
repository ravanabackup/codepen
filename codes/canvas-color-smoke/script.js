(function() {
  var Blip, blips, c, ch, clear, ctx, cw, divider, globalTick, initialBlips, pi2, rand, run;

  c = document.getElementById('c');

  ctx = c.getContext('2d');

  divider = 4;

  cw = c.width = window.innerWidth / divider;

  ch = c.height = window.innerHeight / divider;

  pi2 = Math.PI * 2;

  blips = [];

  initialBlips = 30;

  globalTick = 0;

  rand = function(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  };

  Blip = function(x, y) {
    this.x = x;
    this.y = y;
    this.r = .1;
    this.rGrowthBase = 1;
    this.rGrowth = this.rGrowthBase;
    this.rMax = (cw + ch) / 7;
    return this.alpha = 1;
  };

  Blip.prototype.update = function(i) {
    var percent;
    percent = (this.rMax - this.r) / this.rMax;
    this.rGrowth = .1 + this.rGrowthBase * percent;
    this.r += this.rGrowth;
    this.alpha = percent;
    if (this.r > this.rMax) {
      return blips.splice(i, 1);
    }
  };

  Blip.prototype.render = function(i) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, pi2, false);
    ctx.fillStyle = 'hsla(' + rand(globalTick - 80, globalTick + 80) + ', 50%, 1%, ' + this.alpha + ')';
    return ctx.fill();
  };

  clear = function() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'hsla(0, 0%, 0%, .05)';
    ctx.fillRect(0, 0, cw, ch);
    return ctx.globalCompositeOperation = 'lighter';
  };

  run = function() {
    var i;
    window.requestAnimationFrame(run, c);
    clear();
    i = blips.length;
    while (i--) {
      blips[i].update(i);
    }
    i = blips.length;
    while (i--) {
      blips[i].render(i);
    }
    blips.push(new Blip(rand(0, cw), rand(0, ch)));
    return globalTick++;
  };

  $(window).on('resize', function() {
    cw = c.width = window.innerWidth / divider;
    return ch = c.height = window.innerHeight / divider;
  });

  window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
    return window.setTimeout(function() {
      return callback(+new Date());
    }, 1000 / 60);
  });

  run();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsVUFBQSxFQUFBLFlBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBOztFQUFBLENBQUEsR0FBSSxRQUFRLENBQUMsY0FBVCxDQUF3QixHQUF4Qjs7RUFDSixHQUFBLEdBQU0sQ0FBQyxDQUFDLFVBQUYsQ0FBYSxJQUFiOztFQUNOLE9BQUEsR0FBVTs7RUFDVixFQUFBLEdBQUssQ0FBQyxDQUFDLEtBQUYsR0FBVSxNQUFNLENBQUMsVUFBUCxHQUFrQjs7RUFDakMsRUFBQSxHQUFLLENBQUMsQ0FBQyxNQUFGLEdBQVcsTUFBTSxDQUFDLFdBQVAsR0FBbUI7O0VBQ25DLEdBQUEsR0FBTSxJQUFJLENBQUMsRUFBTCxHQUFVOztFQUNoQixLQUFBLEdBQVE7O0VBQ1IsWUFBQSxHQUFlOztFQUNmLFVBQUEsR0FBYTs7RUFDYixJQUFBLEdBQU8sUUFBQSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQUE7V0FDTCxJQUFJLENBQUMsS0FBTCxDQUFZLENBQUMsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLENBQUMsR0FBQSxHQUFNLEdBQU4sR0FBWSxDQUFiLENBQWpCLENBQUEsR0FBcUMsR0FBakQ7RUFESzs7RUFHUCxJQUFBLEdBQU8sUUFBQSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUE7SUFDTCxJQUFJLENBQUMsQ0FBTCxHQUFTO0lBQ1QsSUFBSSxDQUFDLENBQUwsR0FBUztJQUNULElBQUksQ0FBQyxDQUFMLEdBQVM7SUFDVCxJQUFJLENBQUMsV0FBTCxHQUFtQjtJQUNuQixJQUFJLENBQUMsT0FBTCxHQUFlLElBQUksQ0FBQztJQUNwQixJQUFJLENBQUMsSUFBTCxHQUFZLENB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Q0FBQyxJQUFJLElBQUosQ0FBQSxDQUFWO0lBRGlCLENBQW5CLEVBRUUsSUFBQSxHQUFPLEVBRlQ7RUFERjs7RUFLRixHQUFBLENBQUE7QUFuRUEiLCJzb3VyY2VzQ29udGVudCI6WyJjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ2MnXG5jdHggPSBjLmdldENvbnRleHQgJzJkJ1xuZGl2aWRlciA9IDRcbmN3ID0gYy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoL2RpdmlkZXJcbmNoID0gYy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQvZGl2aWRlclxucGkyID0gTWF0aC5QSSAqIDJcbmJsaXBzID0gW11cbmluaXRpYWxCbGlwcyA9IDMwXG5nbG9iYWxUaWNrID0gMFxucmFuZCA9IChtaW4sIG1heCkgLT5cbiAgTWF0aC5mbG9vciggKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKSArIG1pbilcbiAgXG5CbGlwID0gKHgsIHkpIC0+XG4gIHRoaXMueCA9IHhcbiAgdGhpcy55ID0geVxuICB0aGlzLnIgPSAuMVxuICB0aGlzLnJHcm93dGhCYXNlID0gMVxuICB0aGlzLnJHcm93dGggPSB0aGlzLnJHcm93dGhCYXNlXG4gIHRoaXMuck1heCA9IChjdyArIGNoKS83XG4gIHRoaXMuYWxwaGEgPSAxXG4gICAgXG5CbGlwLnByb3RvdHlwZS51cGRhdGUgPSAoaSkgLT5cbiAgcGVyY2VudCA9ICh0aGlzLnJNYXggLSB0aGlzLnIpIC8gdGhpcy5yTWF4XG4gIHRoaXMuckdyb3d0aCA9IC4xICsgdGhpcy5yR3Jvd3RoQmFzZSAqIHBlcmNlbnRcbiAgdGhpcy5yICs9IHRoaXMuckdyb3d0aFxuICB0aGlzLmFscGhhID0gcGVyY2VudFxuICBpZiB0aGlzLnIgPiB0aGlzLnJNYXhcbiAgICBibGlwcy5zcGxpY2UoaSwgMSlcbiAgICAgIFxuQmxpcC5wcm90b3R5cGUucmVuZGVyID0gKGkpIC0+XG4gIGN0eC5iZWdpblBhdGgoKVxuICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnIsIDAsIHBpMiwgZmFsc2UpICBcbiAgY3R4LmZpbGxTdHlsZSA9ICdoc2xhKCcrcmFuZChnbG9iYWxUaWNrIC0gODAsIGdsb2JhbFRpY2sgKyA4MCkrJywgNTAlLCAxJSwgJyt0aGlzLmFscGhhKycpJ1xuICBjdHguZmlsbCgpXG4gIFxuXG5jbGVhciA9IC0+XG4gIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0J1xuICBjdHguZmlsbFN0eWxlID0gJ2hzbGEoMCwgMCUsIDAlLCAuMDUpJ1xuICBjdHguZmlsbFJlY3QoMCwgMCwgY3csIGNoKVxuICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2xpZ2h0ZXInXG4gICAgXG5ydW4gPSAtPlxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJ1biwgYylcbiAgY2xlYXIoKVxuICBpID0gYmxpcHMubGVuZ3RoXG4gIGJsaXBzW2ldLnVwZGF0ZShpKSB3aGlsZSBpLS1cbiAgaSA9IGJsaXBzLmxlbmd0aFxuICBibGlwc1tpXS5yZW5kZXIoaSkgd2hpbGUgaS0tXG4gIGJsaXBzLnB1c2gobmV3IEJsaXAocmFuZCgwLCBjdyksIHJhbmQoMCwgY2gpKSlcbiAgZ2xvYmFsVGljaysrXG5cbiQod2luZG93KS5vbigncmVzaXplJywgLT5cbiAgY3cgPSBjLndpZHRoID0gd2luZG93LmlubmVyV2lkdGgvZGl2aWRlclxuICBjaCA9IGMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0L2RpdmlkZXJcbilcbiAgICAgICAgICAgICBcbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHw9IFxuICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IFxuICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8IFxuICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8IFxuICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8IFxuICAoY2FsbGJhY2ssIGVsZW1lbnQpIC0+XG4gICAgd2luZG93LnNldFRpbWVvdXQoIC0+XG4gICAgICBjYWxsYmFjaygrbmV3IERhdGUoKSlcbiAgICAsIDEwMDAgLyA2MClcbiAgICAgICAgICBcbnJ1bigpICAgICAgICAgICJdfQ==
//# sourceURL=coffeescript