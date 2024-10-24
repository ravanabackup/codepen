window.addEventListener('load', init);
    window.addEventListener('load', handleResize);//ロード時リサイズをかける
    var stage;
    var angle = 0;
    var particles;
    var objectPool = []; // オブジェクトプール

    function init() {
      stage = new createjs.Stage('myCanvas');

      window.addEventListener("resize", function(){
        handleResize();
      });

      var particles = new Particle(40, "#FFF", 20, 20, 50, 0.99)//(size,color,vx,vy,life, gravity)
      stage.addChild(particles);

      createjs.Ticker.addEventListener("tick", handleTick);
      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      function handleTick(event) {
        stage.update();
      }

    }

    class Particle extends createjs.Container {
      constructor(size,color,vx,vy,life,gravity) {
        super();
        this.particleList = [];
        this.count = 0;
        this.size = size;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.life = life;
        this.gravity = gravity;
        stage.mouseX = stage.canvas.width / 2;
        stage.mouseY = stage.canvas.height / 2
        this.on('tick', this.update, this);
      }
      update(){
        this.count += 1;
        for (var i = 0; i < 10; i++) {
          var particle = fromPool();
          particle.graphics
                  .beginFill(createjs.Graphics.getHSL(this.count, 50, 50))
                  .drawCircle(0, 0, this.size);
          particle.compositeOperation = "lighter";
          particle.cache(-this.size, -this.size, this.size * 2, this.size * 2);
          particle.x = stage.canvas.width/2;
          particle.y = stage.canvas.height/2;
          this.addChild(particle);
          particle.vx = this.vx * (Math.random() - 0.5);
          particle.vy = this.vy * (Math.random() - 0.5);
          particle.life = this.life;

          this.particleList.push(particle);
        }

        for(var i = 0; i < this.particleList.length; i++){
          var particle = this.particleList[i]
          particle.vx *= this.gravity;
          particle.vy *= this.gravity;
          particle.x += particle.vx;
          particle.y +=  particle.vy;
          particle.life -= 1;
          particle.alpha = particle.life/200;
          if (particle.life <= 0) {
            // console.log(this.particleList.length);
            // console.log("delete");
            toPool(this.particleList[i]);
            stage.removeChild(this.particleList[i]);
            this.particleList.splice(i, 1);
            i -= 1;
          }

          this.addChild(particle);
        }
      }

    }

    function handleResize() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      stage.canvas.width = w;
      stage.canvas.height = h;
      stage.update();
    }

    function toPool(particle) {
      objectPool.unshift(particle);
    }

    function fromPool() {
      if (objectPool.length === 0) {
        return new createjs.Shape();
      } else {
        return objectPool.pop();
      }
    }

    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }