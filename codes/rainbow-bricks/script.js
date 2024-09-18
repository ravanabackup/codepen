count = 1;
step = 2;
tot = 100/step * 100/step;
X = setInterval(function(){
  if(count <= tot){
    $('#content').append('<div class="inner" data-item="'+count+'" style="width:'+step+'vw;height:'+step+'vh;background:hsl('+Math.floor(360/tot*count)+',100%,50%)"></div>');
  count++;
  }
  else
    clearInterval(X);
},50/tot);