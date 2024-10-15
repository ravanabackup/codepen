class Scene {

  constructor() {
    this.PI = Math.PI;
    this.TAU = this.PI * 2;
    this.GOLDEN = (Math.sqrt(5) + 1) / 2;
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio;
    this.reset();
    window.addEventListener('resize', () => this.reset());
    this.loop();
  }

  reset() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.hwidth = this.width * 0.5;
    this.hheight = this.height * 0.5;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.translate(~~this.hwidth, ~~this.hheight);
    this.ctx.globalCompositeOperation = 'lighter';
    this.tick = 320;
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    this.tick++;
    this.ctx.clearRect(-this.hwidth, -this.hheight, this.width, this.height);
    let count = 150;
    let angle = this.tick * -0.001;
    let amp = 0;
    for (let i = 0; i < count; i++) {
      angle += this.GOLDEN * this.TAU + Math.sin(this.tick * 0.03) * 0.001;
      amp += (i - count / 2) * 0.01 + Math.cos(this.tick * 0.015) * 1;
      let x = Math.cos(angle) * amp + Math.cos(this.tick * 0.0075) * (count - i) * 0.3;
      let y = Math.sin(angle) * amp + Math.sin(this.tick * 0.0075) * (count - i) * 0.3;
      let radius = 0.1 + i * 0.02;
      let scale = 0.1 + amp * 0.1;
      let hue = this.tick + angle / this.TAU * 0.4 + 60;
      let saturation = 90;
      let lightness = 60;
      let alpha = 0.7 + Math.cos(this.tick * 0.03 + i) * 0.3;

      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate(angle);
      this.ctx.scale(scale, 1);
      this.ctx.rotate(this.PI * 0.25);
      this.ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
      this.ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
      this.ctx.restore();

      this.ctx.beginPath();
      this.ctx.arc(x, y, radius * 12, 0, this.TAU);
      this.ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.05})`;
      this.ctx.fill();
    }
  }}



let scene = new Scene();