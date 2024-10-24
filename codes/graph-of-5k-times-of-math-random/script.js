define('Settings', {
  amount: 5000 });


define('Bar', function () {
  return value => `
    <div
      class="bar"
      data-value="${value}"
      style="box-shadow: inset 0 -${value * 100}vh 0 #000">
    </div>
  `;
});

define('Bars', ['Bar'], function (Bar) {
  return x => ' '.
  repeat(x).
  split(' ').
  map(v => Bar(Math.random())).
  join('');
});

define('App', ['Bars', 'Settings'], function () {
  var [Bars, Settings] = [...arguments];

  function render() {
    app.innerHTML = Bars(Settings.amount);
  }

  app.addEventListener('click', render);

  render();
});