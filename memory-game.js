const gameBoard = document.getElementById("gameBoard");
const moveCounter = document.getElementById("moveCounter");

const cardSymbols = ["🍎", "🚗", "🐶", "🎵", "🌟", "🍕", "⚽", "🧩"];
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let moves = 0;

// Initialize game
function setupGame() {
    gameBoard.innerHTML = "";
    flippedCards = [];
    matchedCards = 0;
    moves = 0;
    moveCounter.textContent = moves;

    // Duplicate and shuffle
    const shuffled = shuffle([...cardSymbols, ...cardSymbols]);

    shuffled.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;

        card.innerHTML = `
      <div class="front"></div>
      <div class="back">${symbol}</div>
    `;

        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

// Shuffle array
function shuffle(array) {
    let currentIndex = array.length;
    let temp, randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

// Handle card flip
function flipCard(card) {
    if (
        card.classList.contains("flip") ||
        flippedCards.length === 2 ||
        card === flippedCards[0]
    ) return;

    card.classList.add("flip");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        moveCounter.textContent = moves;

        const [first, second] = flippedCards;

        if (first.dataset.symbol === second.dataset.symbol) {
            matchedCards += 2;
            flippedCards = [];

            if (matchedCards === cardSymbols.length * 2) {
                setTimeout(() => alert("🎉 You matched all pairs!"), 300);
            }
        } else {
            setTimeout(() => {
                first.classList.remove("flip");
                second.classList.remove("flip");
                flippedCards = [];
            }, 800);
        }
    }
}

// Restart the game
function restartGame() {
    setupGame();
}

// Start game on load
window.onload = setupGame;
