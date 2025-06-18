const questions = [
  {
    image: "Q1",
    options: ["1A", "1B", "1C", "1D"],
    mapping: ["cat", "fox", "lion", "sheep"],
  },
  {
    image: "Q2",
    options: ["2A", "2B", "2C", "2D"],
    mapping: ["fox", "lion", "sheep", "turtle"],
  },
  {
    image: "Q3",
    options: ["3A", "3B", "3C", "3D"],
    mapping: ["lion", "sheep", "turtle", "elephant"],
  },
  {
    image: "Q4",
    options: ["4A", "4B", "4C", "4D"],
    mapping: ["sheep", "turtle", "elephant", "cat"],
  },
  {
    image: "Q5",
    options: ["5A", "5B", "5C", "5D"],
    mapping: ["turtle", "elephant", "cat", "fox"],
  },
  {
    image: "Q6",
    options: ["6A", "6B", "6C", "6D"],
    mapping: ["elephant", "cat", "fox", "lion"],
  },
];

let index = 0;
let score = {};
const animals = ["cat", "fox", "lion", "sheep", "turtle", "elephant"];
animals.forEach((animal) => (score[animal] = 0));

const screen = document.getElementById("screen");
const buttons = document.getElementById("buttons");

function clearButtons() {
  buttons.innerHTML = "";
}

function createButton(imageName, onClick) {
  const btn = document.createElement("img");
  btn.src = `images/${imageName}.png`;
  btn.className = "button-img";
  if (["enter", "result", "again"].includes(imageName)) {
    btn.classList.add("small-button");
  }
  btn.onclick = onClick;
  buttons.appendChild(btn);
}

function showStart() {
  screen.src = "images/start.png";
  clearButtons();
  createButton("enter", nextQuestion);
}

function nextQuestion() {
  if (index >= questions.length) {
    showResultPage();
    return;
  }

  const q = questions[index];
  screen.src = `images/${q.image}.png`;
  clearButtons();

  q.options.forEach((imgName, i) => {
    createButton(imgName, () => {
      const animal = q.mapping[i];
      if (score[animal] !== undefined) {
        score[animal]++;
      }
      index++;
      nextQuestion();
    });
  });
}

function showResultPage() {
  screen.src = "images/resultpage.png";
  clearButtons();
  createButton("result", showFinalResult);
}

function showFinalResult() {
  const final = animals.reduce((a, b) => (score[a] >= score[b] ? a : b));
  screen.src = `images/${final}.png`;
  clearButtons();
  createButton("again", resetQuiz);
}

function resetQuiz() {
  index = 0;
  animals.forEach((animal) => (score[animal] = 0));
  showStart();
}

showStart();
