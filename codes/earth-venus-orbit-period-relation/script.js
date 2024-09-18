window.onload = function() {

   window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         function(callback) {
            window.setTimeout(callback, 1000 / 60);
         };
   })();

   /*==================================================*/
   var canvas = document.getElementById("canvas");
   var ctx = canvas.getContext("2d");
   var PI = Math.PI;

   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   /*---------------------------------------------*/
   var pause_btn = document.getElementById("pause_btn");
   var pause = false;
   var density = 6; //represents the density between the lines. 
   //As you get closer to 0 the density increases (0 not allowed).
   //You can increase the density value for performance(actually decreasing the real density).

   var sun = {
      r: (canvas.width) / 30,
      col: "yellow"
   };
   /*---------------------------------------------*/
   var planet = function(name,x, y, dist, r, days, col, angle, years) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.dist = dist;
      this.r = r;
      this.days = days;
      this.col = col;
      this.angle = angle;
      this.years = years;
   };

   //create planets, and initialize
   /*---------------------------------*/
   var earth = new planet(
      "earth",
      0, //x
      0, //y
      (canvas.width) * .35, //dist
      8, //r
      365, //days
      "rgb(0,100,255)", //color
      0, //starting angle
      0 // starting years
   );
   var venus = new planet(
      "venus",
      0, //x
      0, //y
      .723 * earth.dist, //dist
      7, //r
      225, //days
      "rgb(220,90,0)", //color
      0, //starting angle
      0 // starting years
   );
   
   var mars = new planet(
      "mars",
      0,
      0,
      1.52 * earth.dist,
      5,
      687,
      "rgb(100,0,0)",
      0,
      0
   );

   /*---------------------------------------------*/

   function size() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
   }

   function bg() {
      ctx.fillStyle = "rgb(20,20,20)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   function drawSun() {
      ctx.shadowBlur = 2 * sun.r;
      ctx.shadowColor = "red";

      ctx.fillStyle = sun.col;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, sun.r, 0, 2 * PI);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.shadowColor = "none";
   }

   function drawOrbit(planet) {
      ctx.strokeStyle = "rgba(255,255,255,.3)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, planet.dist, 0, 2 * PI);
      ctx.stroke();
   }

   function move(planet) {
      planet.x = canvas.width / 2 - planet.dist * Math.sin(planet.angle);
      planet.y = canvas.height / 2 - planet.dist * Math.cos(planet.angle);

      planet.angle += 2 * PI / planet.days;
      
      planet.years = Math.floor(planet.angle / (2 * PI));
   }

   function drawPlanet(planet) {

      drawOrbit(planet);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";
      ctx.fillStyle = planet.col;

      ctx.beginPath();
      ctx.arc(planet.x, planet.y, planet.r, 0, 2 * PI);
      ctx.fill();
      ctx.stroke();

      move(planet);
   }

   function drawLine(planet1, planet2) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,150,255,.15)";

      for (var i = 0; i < planet1.angle; i += density * PI / planet1.days) {
         var v_angle = (i * planet1.days) / planet2.days;

         var x1 = canvas.width / 2 - planet1.dist * Math.sin(i),
            y1 = canvas.height / 2 - planet1.dist * Math.cos(i),
            x2 = canvas.width / 2 - planet2.dist * Math.sin(v_angle),
            y2 = canvas.height / 2 - planet2.dist * Math.cos(v_angle);

         if (i >= 16 * PI) {
            ctx.strokeStyle = "rgba(255,255,255,.15)";
         }
         ctx.beginPath();
         ctx.moveTo(x1, y1);
         ctx.lineTo(x2, y2);
         ctx.stroke();
      }
   }

   function text(planet1,planet2) {
      ctx.fillStyle = "rgba(255,255,255,.4)";
      ctx.font = "18px Verdana";

      var txt1 = (planet1.name+" years: " + planet1.years);
      var txt2 = (planet2.name+" years: " + planet2.years);
      var txt1W = ctx.measureText(txt1).width;
      var txt2W = ctx.measureText(txt2).width;

      ctx.fillText(txt1, canvas.width - txt1W - 20, 30);
      ctx.fillText(txt2, canvas.width - txt2W - 20, 60);
   }

   function reset() {
      earth.angle = 0;
      venus.angle = 0;
   }

   function loop() {
         bg();

         drawLine(earth, venus);
         drawPlanet(earth);
         drawPlanet(venus);
         drawSun();
         text(earth,venus);

         if (earth.years == 16) reset();

         if (!pause) requestAnimFrame(loop);
      }
      /*============================================*/
   window.addEventListener("resize", function() {
      size();
   });

   pause_btn.addEventListener("click", function() {
      if (pause) {
         pause = false;
         this.innerHTML = "pause";
         loop();
      } else {
         pause = true;
         this.innerHTML = "continue";
      }
   });

   size();
   bg();
   loop();

};

/*   
   Sun's radius: 695,500 km (~109 times earth's)
   Earth's radius: 6,371 km
   Venus' radius: 6,052 km
   
   Venus' orbital period: 225 days (~61.6% of earth's)
   Earth's orbital period: 365 days
   
   Distance from earth to sun: 149,600,000 km
   Distance from venus to sun: 108,200,000 km
   
*/