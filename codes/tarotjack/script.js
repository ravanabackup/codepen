const range = [0, 10];
let currentRoundAvailable = 3;
const maxRoundAvailable = 6;
let currentBalance = 10;
const startingLevelRange = [1000, 3000];
const startingNextLevel = 300;
const dealInterval = [3000, 5000];

const failAnim = 'jello';
const winAnim = 'heartBeat';

const emotions = [
  "💀",
  "👿",
  "😭",
  "😩",
  "😢",
  "😟",
  "😓",
  "😔",
  "🙁",
  "😐",
  "🙂",
  "😊",
  "😁",
  "😃",
  "😇"
];

const classes = ["danger", "success", "warning", "primary"];
const classNames = {
  "❤️": "danger",
  "🏠": "success",
  "🧠": "warning",
  "💰": "primary"
};

const currentLevel = {
  "❤️": {
    nextGoal: startingNextLevel,
    level: ~~(Math.random() * 3) + 5,
    current: 15,
    direction: ~~(Math.random() * 20) - 10
  },
  "🏠": {
    nextGoal: startingNextLevel,
    level: ~~(Math.random() * 3) + 5,
    current: 15,
    direction: ~~(Math.random() * 20) - 10
  },
  "🧠": {
    nextGoal: startingNextLevel,
    level: ~~(Math.random() * 3) + 5,
    current: 15,
    direction: ~~(Math.random() * 20) - 10
  },
  "💰": {
    nextGoal: startingNextLevel,
    level: ~~(Math.random() * 3) + 5,
    current: 15,
    direction: ~~(Math.random() * 20) - 10
  }
};
let cards = [];

const generateCards = () => {
  for (let suit = 0; suit < classes.length; suit++) {
    for (let value = range[0]; value < range[1]; value++) {
      if (value !== 0) {
        cards.push({
          value: value + (Math.random() > 0.85 ? 0 : value * 2),
          class: classes[suit],
          icon: _.invert(classNames)[classes[suit]],
          className: classes[suit]
        });
      }
    }
  }
};

const checkRoundValues = () => {
  const betted = $(".betted").length;
  if (0 >= currentRoundAvailable) {
    $(".card").addClass("locked");
    return false;
  } else {
    $(".card.active").removeClass("locked");
    return true;
  }
};

const animateBetting = (startPoint, target) => {
  const starter = startPoint.clone();
  startPoint.parent().append(starter);
  starter.show().animate(
    {
      top: $(target).offset().top - 30,
      left: $(target).offset().left - starter.offset().left + window.innerWidth / 8,
      zIndex: 999
    },
    600,
    () => {
      starter.remove();
    }
  );
};

const setHeroFace = () => {
  const avgLevel = (
    _(currentLevel)
      .map((level) => level.level)
      .reduce((o, n) => {
        return o + n;
      }, 0) / _(currentLevel).keys().value().length
  );
  $("#hero").text(emotions[avgLevel]);

  $("#hero-average").text(avgLevel);
};

const ensure = (e, card) => {
  card = $(card).parent();
  if (card.hasClass("betted")) {
    card.removeClass("betted");
    currentRoundAvailable += 1;
    $("#this-round").text(currentRoundAvailable);
  } else {
    const available = checkRoundValues();
    if (available) {
      card.addClass("betted");
      currentRoundAvailable -= 1;
      $("#this-round").text(currentRoundAvailable);
      animateBetting($("#animate-betting"), event.target);
    } else {
      $("#this-round-holder").addClass("animated shake");
      setTimeout(() => {
        $("#this-round-holder").removeClass("animated shake");
      }, 1000);
    }
  }
};

const psychic = () => {
  const wait = 1000;
  $(".left-hand").removeClass("animated wobble");
  $(".right-hand").removeClass("animated wobble");
  $(".ball").removeClass("animated rubberBand");

  setTimeout(() => {
    $(".left-hand").addClass("animated wobble");
    $(".right-hand").addClass("animated wobble");
    $(".ball").addClass("animated rubberBand");
  }, 100);

  return wait;
};

const pickCard = () => {
  return cards[~~(Math.random() * cards.length)];
};

const pauseDeal = (bool) => {
  if (bool) {
    $("#deal").removeClass("btn-info").addClass("btn-secondary").css({
      pointerEvents: "none"
    });
  } else {
    $("#deal").removeClass("btn-secondary").addClass("btn-info").css({
      pointerEvents: "auto"
    });
  }
};

const adjustBalance = () => {
  $("#current-balance").text(currentBalance.toFixed(2));
};

const adjustAvailable = () => {
  currentRoundAvailable = Math.min(maxRoundAvailable - $(".betted").length, ~~currentBalance);
  $('#this-round').text(currentRoundAvailable);
}

const setBarLevel = (bar, thisLevel) => {
  $(`#progress-${bar} .face`).text(
    emotions[Math.min(thisLevel.level, emotions.length)]
  );
  $(`#progress-${bar} .level`).text(thisLevel.level);
  $(`#progress-${bar} .direction`)
    .text(thisLevel.direction)
    .removeClass("text-success, text-danger")
    .addClass(thisLevel.direction > 0 ? "text-success" : "text-danger");
  const width = (thisLevel.current / thisLevel.nextGoal) * 100;
  $(`#progress-${bar} .bar .progress-bar`)
    .css({
      width: width + "%"
    })
    .text(~~thisLevel.current);
  
  $(`#progress-${bar} .bar .next`).text(~~thisLevel.nextGoal);
};

const updateDirection = (bar, level) => {
  currentLevel[bar].direction += level;
  
   $(`#progress-${bar}`).css({
     background: level > 0 ? 'yellow' : '#444',
   });
  
  setTimeout(() => {
       $(`#progress-${bar}`).css({
     background: 'transparent',
   });
  }, 1000)
};

const computeLevel = (bar) => {
  // currentLevel[bar].current += currentLevel[bar].direction;
  // if (currentLevel[bar].current > currentLevel[bar].nextGoal) { // level up
  //   $(`#progress-${bar} .progress-bar`).addClass('pause-transition');
  //   currentLevel[bar].current -= currentLevel[bar].nextGoal;
  //   currentLevel[bar].nextGoal = currentLevel[bar].nextGoal = startingNextLevel;
  //   currentLevel[bar].level += 1;
  //   if (currentLevel[bar].current > currentLevel[bar].nextGoal) {
  //     return computeLevel(
  //       bar,
  //       currentLevel[bar].current - currentLevel[bar].nextGoal
  //     );
  //   }
  // } else if (currentLevel[bar].current < 0) { // level down
  //   $(`#progress-${bar} .progress-bar`).addClass('pause-transition');
  //   currentLevel[bar].current = 0;
  //   currentLevel[bar].nextGoal = currentLevel[bar].nextGoal = startingNextLevel;
  //   currentLevel[bar].level -= 1;
  //   currentLevel[bar].current += (currentLevel[bar].nextGoal - currentLevel[bar].current) * 0.85;
  // } else {
  //   $(`#progress-${bar} .progress-bar`).removeClass('pause-transition');
  // }
  
  $(`#progress-${bar} .progress-bar`).removeClass('pause-transition');

  return currentLevel[bar];
};

const resetCards = (remove) => {
    $('.card').not(remove).find(".flop").removeClass("alert");
  $('.card').not(remove).find(".card-btn")
    .removeClass("btn-success btn-dark")
    .addClass("btn-dark")
    .text("🔒");
  $('.card').not(remove).find(".flop-suit, .flop-value").text("?");
};

const deal = () => {
  pauseDeal(true);
  currentBalance -= $(".betted").length;
  adjustBalance();
  $(".betted").removeClass('betted');

  $(`.${failAnim}, .${winAnim}`).removeClass(`${failAnim} ${winAnim}`);
  for (let i = 0; i < classes.length; i++) {
    $(".flop").removeClass(`alert-${classes[i]}`);
  }

  resetCards();
  const wait = 0;

  setTimeout(() => {

    $(".active .flop").each((i, slot) => {
      setTimeout(() => {
        slot = $(slot);

        // remove previous cards
        slot.empty();
        for (let i = 0; i < classes.length; i++) {
          slot.removeClass(`alert-${classes[i]}`);
          slot.parent().find('.btn').removeClass(`btn-${classes[i]}`);
        }

        // Insert new card
        const card = pickCard();
        slot.data(card);
        slot.addClass(`alert-${card.class}`);
        slot.append($("<div>").addClass("flop-suit").text(card.icon));
        slot.append(
          $("<div>")
            .addClass("flop-value")
            .text(card.value)
        );
        slot
          .parent()
          .find("button")
          .text("add")
          .removeClass('btn-dark')
          .addClass(`btn-${card.class}`);
      }, (i + 1) * 100 + wait);
    });
  }, wait);
};

const defineStartingLevel = () => {
  const classArray = _(classNames).keys().value();
  for (let c = 0; c < classArray.length; c++) {
    const thisLevel = currentLevel[classArray[c]];
    setBarLevel(classArray[c], thisLevel);
  }
};

const deadLevel = (bar) => {
  currentLevel[bar].current = 0;
  currentLevel[bar].level = 0;
  currentLevel[bar].direction = 0;
  currentLevel[bar].nextGoal = 1;
  $(`#progress-${bar} .bar .progress`).addClass('bg-dark');
  $(`#progress-${bar} .bar .progress .next`).hide();
  
  cards = cards.filter(c => c.icon !== bar);
}

const updateLevels = () => {  
  setHeroFace();

  $({ countNum: 0 }).animate({ countNum: 0.001 }, {
    duration: 1000, // tune the speed here
    easing: 'linear',
    step: function() {
      currentBalance += this.countNum;
      $("#current-balance").text(currentBalance.toFixed(2));
    }
  });
  currentBalance += 0.1;
  adjustAvailable();
  
  const icons = Object.keys(classNames);
  for (let i = 0; i < icons.length; i++) {
    if (currentLevel[icons[i]].level > 0) {
      computeLevel(icons[i]);
      setBarLevel(icons[i], currentLevel[icons[i]]);
    } else {
      deadLevel(icons[i]);
      setBarLevel(icons[i], currentLevel[icons[i]]);
    }
  }
};

const freezeInput = (bool) => {
  if (bool) {
    $("#input").css({
      pointerEvents: "none"
    });
  } else {
    $("#input").css({
      pointerEvents: "auto"
    });
  }
};
const process = (select = true) => {
  freezeInput(true);

  setTimeout(() => {
    deal();
    freezeInput(false);
    
    const nextProcess = Math.random() * dealInterval[1] + dealInterval[0];
      $({ width: 100 }).animate({ width: 0 }, {
    duration: nextProcess, // tune the speed here
    easing: 'linear',
    step: function() {
      $("#timer .progress-bar").css({
        width: this.width + '%',
      });
    },
  });
    
    setTimeout(process, nextProcess);
  }, select ? 4000 : 0);
  
  if (!select) {
    return;
  }
  const wait = psychic();
        $('.card').find(".card-btn")
    .text("🔒");
  setTimeout(() => {
    const cards = $(".active .flop");
    const pickedCard = $(cards[~~(Math.random() * cards.length)]);

    const data = pickedCard.data();
    let currentLevel;

    
    if (pickedCard.parent().hasClass("betted")) {
      pickedCard.addClass(`animated ${winAnim}`);
      currentLevel = updateDirection(data.icon, data.value);
      pickedCard.parent().removeClass('betted').find(".card-btn").text("Increasing")
    } else {
      pickedCard.addClass(`animated ${failAnim}`);
      currentLevel = updateDirection(data.icon, -data.value);
      pickedCard.parent().find(".card-btn").text("Decreasing")
    }
    
  }, wait);
};

const newGame = () => {
  $('.progress-bar').addClass('pause-transition');
  $("#current-balance").text(currentBalance);
  generateCards();
  defineStartingLevel();
  setHeroFace();
  updateLevels();
  setInterval(updateLevels, 1000);
  
  setTimeout(() => {
    deal();
    process(false);   
  }, 2000);
};

newGame();