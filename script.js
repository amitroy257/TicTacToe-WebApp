document.addEventListener("DOMContentLoaded", function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;
    
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function checkWinner() {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                statusText.textContent = `Player ${board[a]} Wins!`;
                gameActive = false;
                return;
            }
        }
        if (!board.includes("")) {
            statusText.textContent = "It's a Draw!";
            gameActive = false;
        }
    }

    function handleMove(event) {
        if (!gameActive) return;
        let index = event.target.getAttribute("data-index");
        if (board[index] !== "") return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameActive) statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function resetGame() {
        board.fill("");
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = "Player X's Turn";
        cells.forEach(cell => (cell.textContent = ""));
    }

    cells.forEach(cell => cell.addEventListener("click", handleMove));
    resetBtn.addEventListener("click", resetGame);
});
