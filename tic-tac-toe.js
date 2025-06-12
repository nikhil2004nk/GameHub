const board = document.getElementById('board');
const statusText = document.getElementById('statusText');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.innerHTML = "";
    gameState = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    document.getElementById('catch-overlay').classList.add('hidden');
}

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        showOverlay(`🎉 Player ${currentPlayer} Wins!`);
        gameActive = false;
    } else if (gameState.every(cell => cell !== "")) {
        statusText.textContent = "It's a Draw! 🤝";
        showOverlay("🤝 It's a Draw!");
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[b] === gameState[c];
    });
}

function showOverlay(message) {
    document.getElementById('gameResultText').textContent = message;
    document.getElementById('catch-overlay').classList.remove('hidden');
}

function restartGame() {
    createBoard();
}

window.onload = createBoard;
