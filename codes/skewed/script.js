var colors = ['#FE1101','#007598','#01B3D7','#3FB239','#FF0054','#FF5800','#A9D695','#D70067','#016B3D','#3BB584'];
var lists = [].slice.call(document.querySelectorAll('ul')); 
var items = [];
var listsLength = lists.length;
var itemsLength;
lists.forEach(function(list, i) {
  var index = Math.floor(Math.random() * colors.length);
  list.style.backgroundColor = colors[index];
  items[i] = [].slice.call(list.querySelectorAll('li'));
  itemsLength = items[i].length;
  
  for (var j = 0, l = itemsLength / 2; j < l; ++j) {
    index = Math.floor(Math.random() * colors.length);
    items[i][j].style.backgroundColor = colors[index];
    items[i][itemsLength - j - 1].style.backgroundColor = colors[index];
    
    var keyframes = [
      { backgroundColor: colors[index] },
      { backgroundColor: colors[(index + 5) % colors.length] }
    ];
    var timings = {
      duration: 12000,
      direction: 'alternate',
      iterations: Infinity,
      easing: 'ease-in-out'
    }
    var rate = Math.random() * 12;
    items[i][j].animate(keyframes,timings).playbackRate = rate;
    items[i][itemsLength - j - 1].animate(keyframes,timings).playbackRate = rate;
  }
});