const names = document.querySelector("#names");
const emojiInput = document.querySelector("#emoji");
const lanes = document.querySelector("#lanes");
const go = document.querySelector("#go");
const reset = document.querySelector("#reset");
const commentary = document.querySelector("#commentary");

const boosts = [1, 2, 3, 5];
const moveTime = 400;

// loaded from CDN
const jsConfetti = new JSConfetti();

let list = [];
let loop = undefined;
let previousLeader = undefined;

const defaultList = [ 
  { name: "A", score: 0 },
  { name: "B", score: 0 },
  { name: "C", score: 0 },
  { name: "D", score: 0 }
];

// ---------- settings ----------

const getListFromTextarea = () => {
  let lines = names.value.split("\n");
  lines = lines.filter(Boolean); // removes any empty strings
  list = lines.map(line => {
    return { name: line, score: 0};
  });
};

const getRandomItem = () => {
  getListFromTextarea();
  return list.length ? list[Math.floor(list.length * Math.random())].name : "No items found";
}

const updateStoredList = () => {
  getListFromTextarea();
  localStorage.setItem("list", JSON.stringify(list));
  updateItemsList();
};

const loadStoredList = () => {
  list = JSON.parse(localStorage.getItem("list")) || defaultList;
  const items = list.map(i => i.name);
  names.value = items.join("\n");
  updateItemsList();
}

const checkIfWeHaveEnoughRacers = () => {
  go.hidden = lanes.children.length < 2;
};

const updateItemsList = () => {
  lanes.innerHTML = "";
  const emoji = emojiInput.value || "🚴";
  const frag = document.createDocumentFragment();
  list.forEach((item) => {
    if (item.name && item.name.length) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="racer"><span class="emoji">${emoji}</span> <span class="name">${item.name}</span></span>`;
      frag.appendChild(li);
    }    
  });
  lanes.appendChild(frag);
  checkIfWeHaveEnoughRacers();
};

// ---------- race mechanics ----------

const randomBoost = () => {
  return boosts[Math.floor(boosts.length * Math.random())];
};

const randomRacerIndex = () => {
  return Math.floor(list.length * Math.random());
};

const checkForWin = () => {
  const winner = list.find(item => item.score > 99);
  if (winner) {
    clearTimeout(loop);
    setTimeout(() => {
      reset.hidden = false;
      commentary.textContent = `${winner.name} wins! 🏆`;
      jsConfetti.addConfetti();
    }, moveTime * 1.5);
    lanes.classList.remove("active");    
  }
  return;
};

const randomPhrase = () => {
  const phrases = [
    "takes the lead",
    "is ahead",
    "in the lead",
    "is winning",
    "leading",
    "at the front",
    "is first"
  ];
  return phrases[Math.floor(phrases.length * Math.random())];
};

const move = () => {
  const racerIndex = randomRacerIndex();
  const boost = randomBoost();
  list.forEach((racer, index) => {
    racer.score++;
    if (index === racerIndex) {
      racer.score += boost;
    }
  });
  list.forEach((item, index) => {
    const racer = lanes.querySelector(`li:nth-child(${index + 1}) .racer`);
    racer.style.right = `${list[index].score}%`;
  });
  // get index of highest score
  const winning = list.map(item => item.score).reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  if (winning !== previousLeader) {
    const winner = list.map(item => item.name)[winning];
    const phrase = randomPhrase();
    commentary.textContent = `${winner} ${phrase}`;
    previousLeader = winning;
  }  
  checkForWin();
};

const race = () => {
  commentary.textContent = "And they're off";
  go.hidden = true;
  lanes.classList.add("active");
  names.disabled = true;
  emojiInput.disabled = true;
  loop = setInterval(() => {
    move();
  }, moveTime);
}

const startAgain = () => {
  list.forEach(item => item.score = 0);
  [...lanes.querySelectorAll(".racer")].forEach(racer => {
    racer.style.right = "-2rem";
  })
  reset.hidden = true;
  go.hidden = false;
  commentary.textContent = "";
  names.disabled = false;
  emojiInput.disabled = false;
  jsConfetti.clearCanvas();
};

// ---------- events -----------

emojiInput.addEventListener("change", updateItemsList);
names.addEventListener("input", updateStoredList);
go.addEventListener("click", race);
reset.addEventListener("click", startAgain);
window.onload = loadStoredList;