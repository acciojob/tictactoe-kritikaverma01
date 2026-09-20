//your JS code here. If required.
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitButton = document.getElementById("submit");

const playerSection = document.getElementById("player-section");
const gameSection = document.getElementById("game-section");
const message = document.querySelector(".message");

let player1;
let player2;
let currentPlayer = 1;

let board = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: ""
};

const winningPatterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

// Start game
submitButton.addEventListener("click", function () {

  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names");
    return;
  }

  playerSection.style.display = "none";
  gameSection.style.display = "block";

  message.textContent = `${player1}, you're up`;
});


// Add click to ALL 9 blocks
for (let i = 1; i <= 9; i++) {

  const cell = document.getElementById(String(i));

  cell.addEventListener("click", function () {

    // If already selected, don't do anything
    if (board[i] !== "") {
      return;
    }

    // Player 1
    if (currentPlayer === 1) {
      cell.textContent = "X";
      board[i] = "X";
    }

    // Player 2
    else {
      cell.textContent = "O";
      board[i] = "O";
    }

    // Check winner
    if (checkWinner()) {

      const winner = currentPlayer === 1 ? player1 : player2;

      message.textContent =
        `${winner} congratulations you won!`;

      return;
    }

    // Check draw
    let isDraw = true;

    for (let i = 1; i <= 9; i++) {
      if (board[i] === "") {
        isDraw = false;
        break;
      }
    }

    if (isDraw) {
      message.textContent = "It's a draw!";
      return;
    }

    // Change player
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    if (currentPlayer === 1) {
      message.textContent = `${player1}, you're up`;
    } else {
      message.textContent = `${player2}, you're up`;
    }
  });
}


// Check winner
function checkWinner() {
  for (let pattern of winningPatterns) {
    const a = pattern[0];
    const b = pattern[1];
    const c = pattern[2];

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      // Highlight winning cells
      document.getElementById(a).classList.add("winner");
      document.getElementById(b).classList.add("winner");
      document.getElementById(c).classList.add("winner");

      return true;
    }
  }

  return false;
}