const canvas = document.getElementById("catchCanvas");
const ctx = canvas.getContext("2d");

const basketWidth = 80;
const basketHeight = 20;
let basketX = (canvas.width - basketWidth) / 2;

const ballRadius = 10;
let balls = [];
let ballSpeed = 2;

let rightPressed = false;
let leftPressed = false;
let score = 0;
let animationId;
let ballIntervalId;
const scoreDisplay = document.getElementById("catch-score");

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Handle key press
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

// Ball class
class Ball {
    constructor() {
        this.x = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
        this.y = -10;
        this.dy = ballSpeed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#DDA853";
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.dy;

        // Ball caught
        if (
            this.y + ballRadius > canvas.height - basketHeight &&
            this.x > basketX &&
            this.x < basketX + basketWidth
        ) {
            score++;
            scoreDisplay.textContent = score;
            return false;
        }

        // Ball missed
        if (this.y - ballRadius > canvas.height) {
            gameOver();
            return false;
        }

        return true;
    }
}

// Draw basket
function drawBasket() {
    ctx.beginPath();
    ctx.rect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);
    ctx.fillStyle = "#16404D";
    ctx.fill();
    ctx.closePath();
}

// Main game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBasket();

    balls = balls.filter(ball => {
        ball.draw();
        return ball.update();
    });

    if (rightPressed && basketX < canvas.width - basketWidth) basketX += 7;
    else if (leftPressed && basketX > 0) basketX -= 7;

    animationId = requestAnimationFrame(draw);
}

// Spawn new ball
function dropBall() {
    balls.push(new Ball());
}

// Game over logic
function gameOver() {
    cancelAnimationFrame(animationId);
    clearInterval(ballIntervalId);
    alert("💥 GAME OVER 💥");
    restartCatchGame();
}



function gameOver() {
    cancelAnimationFrame(animationId);
    clearInterval(ballIntervalId);

    // Show game over overlay
    document.getElementById("final-score").textContent = score;
    document.getElementById("catch-overlay").classList.remove("hidden");
}

// Restart logic
function restartCatchGame() {
    cancelAnimationFrame(animationId);
    clearInterval(ballIntervalId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    score = 0;
    scoreDisplay.textContent = score;
    basketX = (canvas.width - basketWidth) / 2;
    balls = [];

    // Hide overlay if visible
    document.getElementById("catch-overlay").classList.add("hidden");

    animationId = requestAnimationFrame(draw);
    ballIntervalId = setInterval(dropBall, 1500);
}

// Start game
restartCatchGame();
