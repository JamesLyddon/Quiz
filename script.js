const game = document.getElementById("game");
const score = document.getElementById("score");

const film = 11;
const levels = ["easy", "medium", "hard"];

function addGenre() {
  const column = document.createElement("div");
  column.classList.add("genre-column");
  column.innerHTML = "Film";
  game.append(column);

  levels.forEach((level) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    fetch(
      `https://opentdb.com/api.php?amount=1&category=11&difficulty=${level}&type=boolean`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        card.setAttribute("data-question", data.results[0].question);
        card.setAttribute("data-answer", data.results[0].correct_answer);
      });
  });
}

addGenre();
