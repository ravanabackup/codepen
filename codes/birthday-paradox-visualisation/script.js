define('CustomDate', function () {
  var startDate = new Date('01/01/2016').getTime();

  var days = ' '.repeat(364).split(' ').map((day, i) => {
    return new Date(startDate + 1000 * 60 * 60 * 24 * i);
  });

  function zeroPad(num) {
    return ('0' + num).slice(-2);
  }

  return {

    months: [
    'January', 'February',
    'March', 'April', 'May',
    'June', 'July', 'August',
    'September', 'October', 'November',
    'December'],


    days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'],


    getAllDays() {
      return days;
    },

    getRandomDate() {
      return days[~~(Math.random() * days.length)];
    },

    format(date, format) {
      return format.
      replace(/%d/g, zeroPad(date.getDate())).
      replace(/%m/g, zeroPad(date.getMonth() + 1)).
      replace(/%y/g, date.getFullYear()).
      replace(/%D/g, this.days[date.getDay()]).
      replace(/%M/g, this.months[date.getMonth()].slice(0, 3)).
      replace(/%MM/g, this.months[date.getMonth()]);
    } };


});

define('Person', ['CustomDate'], function () {
  var [CustomDate] = [...arguments];

  function Person({ customBirthDate } = {}) {
    var birthDate = customBirthDate || CustomDate.getRandomDate();
    this.birthDate = birthDate;
    this.birthday = CustomDate.format(birthDate, '%M %d');
    return this;
  }

  Person.prototype.toString = function () {
    return 'A person with birthday: ' + this.birthday;
  };

  return Person;
});

define('Events', {
  __keys: {},

  register(key, hash) {
    this.__keys[key] = this.__keys[key] || {};
    Object.assign(this.__keys[key], hash);
  },

  bindEvents() {
    requestAnimationFrame(() => {
      Object.keys(this.__keys).forEach(key => {
        var selector = `[data-events-key=${key}]`;
        var elements = Array.from(document.querySelectorAll(selector));
        var types = Object.keys(this.__keys[key]);
        elements.forEach(el => {
          types.forEach(type => {
            el.addEventListener(type, this.__keys[key][type]);
          });
        });
      });
    });
  } });


define('views.Button', ['Events'], function () {
  var [Events] = [...arguments];

  return function ({ id, className, text, onClick }) {
    id = id || `btn-${Date.now()}`;

    Events.register(id, {
      click: onClick });


    return `
      <button
        class="btn ${className || ''}"
        id="${id}"
        data-events-key="${id}">
        ${text}
      </button>
    `;
  };
});

define('views.Person', function () {
  return function ({ person, hasSame }) {
    return `
      <div class="person ${hasSame ? 'person--has-same' : ''}">
        ${person}
      </div>
    `;
  };
});

define('views.Dates', ['CustomDate'], function () {
  var [CustomDate] = [...arguments];

  return function ({ dates }) {
    var months = CustomDate.getAllDays().reduce((p, c) => {
      var month = c.getMonth();
      p[month] = p[month] || [];
      p[month].push(c);
      return p;
    }, []);'';

    return `
      <div class="dates">
        ${months.reduce((p, m) => {
      return p + `
            <div class="dates__month">
              ${m.reduce((_p, d) => {
        var hasValue = dates.indexOf(d) > -1;
        var hasMultiValue = dates.indexOf(d) !== dates.lastIndexOf(d);
        var formatted = CustomDate.format(d, '%M %d');

        var className = 'dates__day';
        className += !hasMultiValue && hasValue ?
        ' dates__day--has-value' : '';
        className += hasMultiValue ?
        ' dates__day--has-multivalue' : '';
        return _p + `
                  <span
                    class="${className}"
                    data-date="${formatted}">
                  </span>
                `;
      }, '')}
            </div>
          `;
    }, '')}
      </div>
    `;
  };
});

define('views.App', [
'views.Person',
'views.Button',
'views.Dates'],
function () {
  var [
  PersonView,
  ButtonView,
  DatesView] =
  [...arguments];

  return function ({ people, onAddPerson, onReset }) {
    function sameBirthday() {
      return people.
      map(p => p.birthDate).
      reduce((p, c, i, a) => {
        if (a.indexOf(c) !== a.lastIndexOf(c)) {
          p.push(people[i]);
        }
        return p;
      }, []);
    }

    function _onAddPerson(e) {
      onAddPerson(e);
      requestAnimationFrame(() => {
        var list = document.getElementById('people-list');
        list.scrollIntoView(false);

        var button = document.getElementById('add-person-button');
        button.focus();
      });
    }

    var peopleWithSameBirthday = sameBirthday();

    var peopleContent = people.length ?
    people.reduce((others, person) => {
      var hasSame = peopleWithSameBirthday.indexOf(person) > -1;
      var person = PersonView({ person, hasSame });
      return others + person;
    }) :
    'Add some people to start';

    var dates = people.map(p => p.birthDate);

    return `
      <div class="app">

        <h1 class="app__title">
          <a href="https://en.wikipedia.org/wiki/Birthday_problem" target="_blank">Birthday Paradox</a> Visualiser
        </h1>

        <div class="app__container">

          <div
            class="app__people-list-container"
            id="people-list-container">
            <div
              class="app__people-list"
              id="people-list">
              ${peopleContent}
            </div>
          </div>

          <div class="app__panel">

            <p class="app__panel-info">
              # of people: ${people.length}
            <p>

            <p class="app__panel-info">
              # of people with same birthday: ${peopleWithSameBirthday.length}
            <p>

            ${ButtonView({
      text: 'Add Person',
      onClick: _onAddPerson,
      className: 'add-person-button',
      id: 'add-person-button' })
    }

            ${ButtonView({
      text: 'Reset',
      onClick: onReset,
      className: 'reset-button',
      id: 'reset-button' })
    }

            ${DatesView({ dates })}

          </div>
            
        </div>
            
      </div>
    `;
  };
});

define('App', ['Person', 'Events', 'views.App'], function () {
  var [Person, Events, AppView] = [...arguments];

  function onAddPerson(e) {
    people.push(new Person());
    render();
  }

  function onReset(e) {
    people = [];
    render();
  }

  function render() {
    app.innerHTML = AppView({
      people,
      onAddPerson,
      onReset });

    Events.bindEvents();
  }

  var people = [];

  render();
});