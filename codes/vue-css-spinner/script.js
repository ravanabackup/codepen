new Vue({
  el: '#app',
  data() {
    return {
      x: 0, 
      y: 0,
      height: 0,
      width: 0
    }
  },
  computed: {
    style: function () {
      return {
        transform: `rotateX(${this.y * 90}deg) rotateY(${this.x * 90}deg)`
      }
    }
  },
  methods: {
    onmousemove(e) {
      this.x = Math.round(e.clientX / this.width * 1000)/1000 * 2 - 1;
      this.y = Math.round(e.clientY / this.height * 1000)/1000 * 2 - 1;
    },
  },
  mounted: function() {
    this.height = this.$el.offsetHeight;
    this.width = this.$el.offsetWidth;
  }
})