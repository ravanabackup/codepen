var
  timer = 5000,
  ui = document.getElementById('ui');

setInterval(function() {
  ui.classList.toggle("switch");
}, timer);