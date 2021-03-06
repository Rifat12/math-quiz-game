const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const ourField = document.querySelector(".our-field");
const pointsneeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");

let state = {
  score: 0,
  wrongAnswers: 0,
};

function updateProblem() {
  state.currentProblem = generateProblem();
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`;
  ourField.value = "";
  ourField.focus();
}

updateProblem();

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

function generateProblem(params) {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ["+", "-", "x"][generateNumber(2)],
  };
}

ourForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let correctAnswer;
  const p = state.currentProblem;
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo;
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo;
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo;

  if (parseInt(ourField.value, 10) == correctAnswer) {
    state.score++;
    pointsneeded.textContent = 10 - state.score;
    updateProblem();
    renderprogressbar();
  } else {
    state.wrongAnswers++;
    mistakesAllowed.textContent = 2 - state.wrongAnswers;
  }

  checkLogic();
}

function checkLogic() {
  if (state.score === 10) {
    //alert("You Won!");
    endMessage.textContent = "You Won!";
    document.body.classList.add("overlay-is-open");
  }
  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Sorry! You Lost :(";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => {
      resetButton.focus();
    }, 331);
  }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
  document.body.classList.remove("overlay-is-open");
  updateProblem();
  state.score = 0;
  state.wrongAnswers = 0;
  pointsneeded.textContent = 10;
  mistakesAllowed.textContent = 2;
  renderprogressbar();
}

function renderprogressbar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`;
}
