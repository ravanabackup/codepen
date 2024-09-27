function draw() {
    var cellClass =  Array.from({length: 20}, (x,i) => "class" + i);
    $(".wrap .grid").addClass("slide");
  setTimeout(function(){
    $(".grid .cell").removeClass(cellClass);
    $(".wrap .grid").removeClass("slide");
    $(".grid .cell").each(function() {
      $(this).addClass("class" + Math.floor(Math.random() * 11 + 1));
    });
    $(".grid .cell").each(function() {

      
      $(this)
        .get(0)
        .style.setProperty("--size", Math.floor(Math.random() * 2 + 1));


      $(this)
        .get(0)
        .style.setProperty("--height", (Math.floor(Math.random() * 50) * 5) + "px");
         
      $(this)
        .get(0)
        .style.setProperty("--angle", (Math.floor(Math.random() * 4) * 90) + "deg");
      
      $(this)
        .get(0)
        .style.setProperty("--shift", ((Math.floor(Math.random() * 150) - 50) * 2.5) + "px");
      
    });
  }, 1600);
 
}

$(function() {
  draw();
  $("body").on("click", function() {
    draw();
  });
});

setInterval(draw,6000);