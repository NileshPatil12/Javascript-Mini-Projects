const boardElement = document.getElementById("board");
const gameStatus = document.getElementById("gameStatus");
const resetButton = document.getElementById("reset");

let board = JSON.parse(localStorage.getItem("board")) || Array(9).fill(null);
let currentPlayer = localStorage.getItem("currentPlayer") || "X";

function saveGameState() {
  localStorage.setItem("board", JSON.stringify(board));
  localStorage.setItem("currentPlayer", currentPlayer);
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : "Draw";
}

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.className = `cell ${cell ? "taken" : ""}`;
    cellElement.textContent = cell;
    cellElement.addEventListener("click", () => makeMove(index));
    boardElement.appendChild(cellElement);
  });
}

function makeMove(index) {
  if (!board[index]) {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    saveGameState();
    const winner = checkWinner();
    if (winner) {
      gameStatus.textContent = winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`;
      boardElement.querySelectorAll(".cell").forEach(cell => cell.classList.add("taken"));
    } else {
      gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }
    renderBoard();
  }
}

resetButton.addEventListener("click", () => {
  board = Array(9).fill(null);
  currentPlayer = "X";
  saveGameState();
  gameStatus.textContent = "Player X's Turn";
  renderBoard();
});

renderBoard();
