const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;

const genres = [
  {
    name: "Books",
    id: 10,
  },
  {
    name: "Film",
    id: 11,
  },
  {
    name: "Music",
    id: 12,
  },
  {
    name: "Video Games",
    id: 15,
  },
];
const levels = ["easy", "medium", "hard"];

function addGenre(genre) {
  const column = document.createElement("div");
  column.classList.add("genre-column");
  column.innerHTML = `<h2>${genre.name}</h2>`;
  game.append(column);

  levels.forEach((level) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (level === "easy") card.innerHTML = 100;
    if (level === "medium") card.innerHTML = 200;
    if (level === "hard") card.innerHTML = 300;

    fetch(
      `https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`
    )
      .then((res) => res.json())
      .then((data) => {
        card.setAttribute("data-question", data.results[0].question);
        card.setAttribute("data-answer", data.results[0].correct_answer);
        card.setAttribute("data-value", card.getInnerHTML());
      });
    card.addEventListener("click", flipCard);
  });
}

genres.forEach((genre) => addGenre(genre));

function flipCard() {
  console.log("flipped");

  const textDisplay = document.createElement("div");
  textDisplay.classList.add("textDisplay");
  const btnDisplay = document.createElement("div");

  textDisplay.innerHTML = this.getAttribute("data-question");

  const trueBtn = document.createElement("button");
  trueBtn.addEventListener("click", getResult);
  trueBtn.innerHTML = "True";
  trueBtn.classList.add("btn");

  const falseBtn = document.createElement("button");
  falseBtn.addEventListener("click", getResult);
  falseBtn.innerHTML = "False";
  falseBtn.classList.add("btn");

  this.innerHTML = "";
  btnDisplay.append(trueBtn, falseBtn);
  this.append(textDisplay, btnDisplay);

  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
  const cardOfButton = this.parentElement.parentElement;
  cardOfButton.innerHTML = "";
  if (cardOfButton.getAttribute("data-answer") === this.innerHTML) {
    score += parseInt(cardOfButton.getAttribute("data-value"));
    scoreDisplay.innerHTML = score;
    cardOfButton.innerHTML = "<h2>Correct!</h2>";
    cardOfButton.classList.add("correct-answer");
  } else {
    cardOfButton.innerHTML = "<h2>Incorrect!</h2>";
    cardOfButton.classList.add("incorrect-answer");
  }
  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.addEventListener("click", flipCard));
  cardOfButton.removeEventListener("click", flipCard);
}
