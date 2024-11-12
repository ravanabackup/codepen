(function (window, Vue, SimplexNoise) {
  'use strict';

  const LUT = [[1, 8], [2, 16], [4, 32], [64, 128]];
  const char = code => String.fromCharCode(code);
  const line = line => line.map(char).join('');

  var Braille$1 = (width, height) => {
    const buffer = Array.from(Array(height >> 2), () => Array(width >> 1).fill(0x2800));
    return {
      set: (x, y) => buffer[y >> 2][x >> 1] |= LUT[y & 3][x & 1],
      unset: (x, y) => buffer[y >> 2][x >> 1] &= ~LUT[y & 3][x & 1],
      toggle: (x, y) => buffer[y >> 2][x >> 1] ^= LUT[y & 3][x & 1],
      render: () => buffer.map(line).join('\n') };

  };

  const bayer$1 = (x, y, order) => {
    let z = 0;
    while (order--)
    z = (x & 1 ^ y & 1 | z << 1) << 1 | y & 1, x >>= 1, y >>= 1;
    return z + 0.5;
  };

  var Bayer = order => {
    const size = 1 << order,area = size * size;
    const LUT = new Float32Array(area);
    for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
    LUT[x + y * size] = bayer$1(x, y, order) / area;
    return (x, y) => LUT[x % size + y % size * size];
  };

  const bayer = Bayer(4);
  const simplex = new SimplexNoise();
  const fractal = (octaves, freq, x, y, z) => {
    let out = 0,max = 0,amp = 1;
    while (octaves--)
    out += amp * simplex.noise3D(x * freq, y * freq, z * freq),
    max += amp, amp /= 2, freq *= 2;
    return out / max;
  };

  var render = (mode, viewport, font) => {
    const width = viewport.width / font.width << 1;
    const height = viewport.height / font.height << 2;
    const aspect = width / height;
    const pixels = Braille$1(width, height);
    const buffer = new Float32Array(width * height);

    const z = Date.now() * 1e-4;
    const f = (x, y, z) => g(aspect * (x / width * 2 - 1), y / height * 2 - 1, z);
    const g = (x, y, z) => (0.25 + 9.75 * Math.abs(fractal(10, 1 / 25, x, y, z))) % 1;

    switch (mode % 3) {
      case 0:
        for (let y = 0; y < height; y++)
        for (let x = 0; x < width; x++)
        buffer[x + y * width] = f(x, y, z) >= 0.5;
        break;

      case 1:
        for (let y = 0; y < height; y++)
        for (let x = 0; x < width; x++)
        buffer[x + y * width] = f(x, y, z) + bayer(x, y) >= 1;
        break;

      case 2:
        for (let y = 0; y < height; y++) {
          const dy = height - y;
          const b1px = dy > 1;
          const b2px = dy > 2;

          for (let x = 0; x < width; x++) {
            const dx = width - x;
            const l1px = x > 0;
            const r1px = dx > 1;
            const l2px = x > 1;
            const r2px = dx > 2;

            let i = x + y * width;
            const input = buffer[i] + f(x, y, z);
            const output = buffer[i] = input >= 0.5;

            const err1 = (input - output) / 48;
            const err3 = err1 * 3;
            const err5 = err1 * 5;
            const err7 = err1 * 7;
            if (r1px) buffer[i + 1] += err7;
            if (r2px) buffer[i + 2] += err5;
            if (b1px) {
              i += width;
              if (l2px) buffer[i - 2] += err3;
              if (l1px) buffer[i - 1] += err5;
              buffer[i] += err7;
              if (r1px) buffer[i + 1] += err5;
              if (r2px) buffer[i + 2] += err3;
              if (b2px) {
                i += width;
                if (l2px) buffer[i - 2] += err1;
                if (l1px) buffer[i - 1] += err3;
                buffer[i] += err5;
                if (r1px) buffer[i + 1] += err3;
                if (r2px) buffer[i + 2] += err1;
              }
            }
          }
        }
        break;}


    for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
    buffer[x + y * width] && pixels.set(x, y);

    return pixels.render();
  };

  const WIDTH = 1 << 7;
  const HEIGHT = 1 << 6;
  const HIDDEN = '.'.repeat(WIDTH) + '\n.'.repeat(HEIGHT - 1);

  var Braille = { render: function () {var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "viewport", staticClass: "Braille__viewport", on: { "click": function ($event) {_vm.mode++;} } }, [_c('span', { ref: "hidden", staticClass: "Braille__hidden" }, [_vm._v(_vm._s(_vm.hidden))]), _c('span', { staticClass: "center" }, [_vm._v(_vm._s(_vm.rendered))])]);}, staticRenderFns: [], cssModules: { "viewport": "Braille__viewport", "hidden": "Braille__hidden" },
    data: () => ({
      mode: 1,
      rendered: '' }),

    computed: {
      hidden: () => HIDDEN },

    methods: {
      viewport() {
        const { offsetWidth, offsetHeight } = this.$refs.viewport;
        return { width: offsetWidth, height: offsetHeight };
      },
      font() {
        const { offsetWidth, offsetHeight } = this.$refs.hidden;
        const width = offsetWidth / WIDTH;
        const height = offsetHeight / HEIGHT;
        return { width, height, aspect: width / height };
      },
      render() {
        this.rendered = render(this.mode, this.viewport(), this.font());
      } },

    mounted() {
      const tick = () => {
        this.render();
        this.af = requestAnimationFrame(tick);
      };
      tick();
    },
    destroyed() {
      cancelAnimationFrame(this.af);
    } };


  var App = { render: function () {var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('Braille', { staticClass: "center App__braille" });}, staticRenderFns: [], cssModules: { "braille": "App__braille" },
    components: { Braille } };


  window.addEventListener('load', () => {
    document.body.appendChild(new Vue(App).$mount().$el);
  });

})(window, Vue, SimplexNoise);