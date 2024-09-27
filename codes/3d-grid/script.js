window.countDiv = -95;
function moreDiv() {
  document.body.innerHTML +=
    "<div style='top:" +
    window.countDiv +
    "px;transform:rotate(" +
    window.countDiv / 10 +
    "deg);animation-delay:" +
    Math.random() * 6000 +
    "ms;'></div>";
  if (window.countDiv < 600) {
    window.countDiv += 5;
    setTimeout(function () {
      moreDiv();
    }, 5);
  }
}
moreDiv();