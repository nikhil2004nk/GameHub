// DOM Elements
const userChoiceText = document.getElementById("userChoice");
const computerChoiceText = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");
const userScoreSpan = document.getElementById("userScore");
const computerScoreSpan = document.getElementById("computerScore");
const roundSpan = document.getElementById("round");
const totalRoundsSpan = document.getElementById("totalRounds");

// Game variables
let userScore = 0;
let computerScore = 0;
let currentRound = 1;
const totalRounds = 5;

// Display total rounds on load
totalRoundsSpan.textContent = totalRounds;

function play(userChoice) {
    if (currentRound > totalRounds) return; // Prevent play after game ends

    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);

    userChoiceText.textContent = `You: ${capitalize(userChoice)}`;
    computerChoiceText.textContent = `Computer: ${capitalize(computerChoice)}`;
    resultText.textContent = result;

    // Update scores
    if (result.includes("You Win")) userScore++;
    else if (result.includes("Computer Wins")) computerScore++;

    // Update UI
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;

    if (currentRound === totalRounds) {
        setTimeout(() => showOverlay(), 1000);
    }

    roundSpan.textContent = currentRound;
    currentRound++;
}

// Show final result in overlay
function showOverlay() {
    const overlay = document.getElementById("game-over-overlay");
    const finalResult = document.getElementById("final-result");
    const finalScore = document.getElementById("final-score");

    if (userScore > computerScore) {
        finalResult.textContent = "🎉 You Win the Game!";
    } else if (userScore < computerScore) {
        finalResult.textContent = "😞 Computer Wins the Game!";
    } else {
        finalResult.textContent = "🤝 It's a Draw!";
    }

    finalScore.textContent = `You: ${userScore} | Computer: ${computerScore}`;
    overlay.classList.remove("hidden");
}

// Reset everything
function restartGame() {
    userScore = 0;
    computerScore = 0;
    currentRound = 1;

    userChoiceText.textContent = "You: -";
    computerChoiceText.textContent = "Computer: -";
    resultText.textContent = "Make your move!";
    userScoreSpan.textContent = "0";
    computerScoreSpan.textContent = "0";
    roundSpan.textContent = "1";

    document.getElementById("game-over-overlay").classList.add("hidden");
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function getResult(user, computer) {
    if (user === computer) return "It's a Draw! 🤝";
    if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    ) {
        return "You Win! 🎉";
    } else {
        return "Computer Wins! 😞";
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
