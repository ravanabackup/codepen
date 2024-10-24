function getEls(n, markup) {
  var els = '';
  var count = n;
  while (n--) {
    els += markup;
  }
  return els;
}

var cells = getEls(15, '<span></span>');
var rows = getEls(15, '<div>' + cells + '</div>');
target.innerHTML = rows;