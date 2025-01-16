const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winner-player-text]"
);
const winningMessage = document.querySelector("[data-winner-player]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [3, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("X");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

//End the Game
const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O is the Winner"
      : "X is the Winner";
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      // every get all the combinations and then
      return cellElements[index].classList.contains(currentPlayer); // here check if match with one of combinations
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("circle"); // this check is all cell is fill with something
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("X");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("X");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  // Apply the X or Circle
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "X";

  placeMark(cell, classToAdd); // Call the correct function

  // Verify if there's a victory
  const isWin = checkForWin(classToAdd);

  // Verify if it's a draw
  const isDraw = checkForDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  }
  // Swap turns
  else {
    swapTurns();
  }
};

// Initialize the game
startGame();

restartButton.addEventListener("click", startGame);
