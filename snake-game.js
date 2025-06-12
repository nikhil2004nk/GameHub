const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const box = 20; // Grid size
const canvasSize = 400;

let snake, direction, food, score, gameInterval;

// Start or restart the game
function startGame() {
    snake = [{ x: box * 5, y: box * 5 }];
    direction = null;
    score = 0;
    scoreDisplay.textContent = score;
    placeFood();

    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(update, 180); // Speed (lower = faster)
}

// Place food randomly in the grid
function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
}

// Draw game: background, snake, and food
function draw() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw snake
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#16404D" : "#A6CDC6";
        ctx.fillRect(part.x, part.y, box, box);
        ctx.strokeStyle = "#FBF5DD";
        ctx.strokeRect(part.x, part.y, box, box);
    });

    // Draw food
    ctx.fillStyle = "#DDA853";
    ctx.fillRect(food.x, food.y, box, box);
}

// Update snake movement and game logic
function update() {
    const head = { ...snake[0] };

    switch (direction) {
        case "LEFT": head.x -= box; break;
        case "RIGHT": head.x += box; break;
        case "UP": head.y -= box; break;
        case "DOWN": head.y += box; break;
        default: return; // Game hasn't started
    }

    // Wall or self collision
    if (
        head.x < 0 || head.x >= canvasSize ||
        head.y < 0 || head.y >= canvasSize ||
        collision(head, snake)
    ) {
        clearInterval(gameInterval);
        showGameOver();
        return;
    }

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }

    draw();
}

// Detect collision with itself
function collision(head, body) {
    return body.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

// Handle key press
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            if (direction !== "RIGHT") direction = "LEFT";
            break;
        case "ArrowUp":
            if (direction !== "DOWN") direction = "UP";
            break;
        case "ArrowRight":
            if (direction !== "LEFT") direction = "RIGHT";
            break;
        case "ArrowDown":
            if (direction !== "UP") direction = "DOWN";
            break;
    }
});

// Show Game Over Overlay
function showGameOver() {
    document.getElementById("final-score").textContent = score;
    document.getElementById("catch-overlay").classList.remove("hidden");
}

// Restart handler
function restartGame() {
    document.getElementById("catch-overlay").classList.add("hidden");
    startGame();
}

// Auto-start on load
window.onload = startGame;
