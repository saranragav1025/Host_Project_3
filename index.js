const startScreen = document.getElementById("start-screen");
const gameArea = document.getElementById("game-area");
const endScreen = document.getElementById("end-screen");
const startButton = document.getElementById("start-button");
const playAgainButton = document.getElementById("play-again");
const cardGrid = document.getElementById("card-grid");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("final-score");

let cards = [];
let flippedCards = [];
let score = 0;
let timer = 60;


const cardValues = ["🎮", "👺", "😎", "👻", "🧜‍♀️", "🧙🏾‍♂️", "👃🏾", "🦍"];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCards() {
  const doubledValues = shuffle([...cardValues, ...cardValues]);
  cardGrid.innerHTML = ""; // Clear previous cards
  doubledValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.innerText = "?";
    card.addEventListener("click", flipCard);
    cardGrid.appendChild(card);
  });
  cards = document.querySelectorAll(".card");
}

function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length === 2) return;
  this.classList.add("flipped");
  this.innerText = this.dataset.value;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    score += 10;
    scoreDisplay.innerText = score;
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "?";
      card2.innerText = "?";
    }, 1000);
  }
  flippedCards = [];
  if (document.querySelectorAll(".card.matched").length === cards.length) {
    endGame();
  }
}

function startGame() {
  score = 0;
  timer = 60;
  scoreDisplay.innerText = score;
  timerDisplay.innerText = timer;
  createCards();
  startScreen.classList.add("hidden");
  gameArea.classList.remove("hidden");
  endScreen.classList.add("hidden");
  startTimer();
}

function startTimer() {
  const interval = setInterval(() => {
    timer--;
    timerDisplay.innerText = timer;
    if (timer === 0 || document.querySelectorAll(".card.matched").length === cards.length) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  finalScoreDisplay.innerText = score;
  gameArea.classList.add("hidden");
  endScreen.classList.remove("hidden");
}

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);
