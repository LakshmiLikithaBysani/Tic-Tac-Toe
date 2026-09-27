const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const newRoundButton = document.getElementById("newRound");
const resetScoreButton = document.getElementById("resetScore");

let board = ["", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameOver = false;

let xScore = 0;
let oScore = 0;


// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


// Cell click
cells.forEach(cell => {

    cell.addEventListener("click", () => {

        const index = cell.getAttribute("data-index");

        // Don't allow clicking again
        if (board[index] !== "" || gameOver) {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        checkWinner();

    });

});


// Check winner
function checkWinner() {

    for (let combination of winningCombinations) {

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            statusText.textContent =
                "🎉 Player " + currentPlayer + " Wins!";

            gameOver = true;

            if (currentPlayer === "X") {
                xScore++;
                scoreX.textContent = xScore;
            } else {
                oScore++;
                scoreO.textContent = oScore;
            }

            return;
        }
    }


    // Check draw
    if (!board.includes("")) {

        statusText.textContent = "🤝 It's a Draw!";

        gameOver = true;

        return;
    }


    // Change player
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    statusText.textContent =
        "Player " + currentPlayer + "'s Turn";
}


// New round
newRoundButton.addEventListener("click", () => {

    board = ["", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    statusText.textContent = "Player X's Turn";
});


// Reset score
resetScoreButton.addEventListener("click", () => {

    xScore = 0;
    oScore = 0;

    scoreX.textContent = "0";
    scoreO.textContent = "0";

    board = ["", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    statusText.textContent = "Player X's Turn";
});