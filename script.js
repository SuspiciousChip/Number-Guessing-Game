
const MAX_ATTEMPTS = 7;

let secretNumber = generateNumber();
let attemptsUsed = 0;
let gameOver = false;

const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const attemptsDisplay = document.getElementById("attempts");
const feedback = document.getElementById("feedback");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");

function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (gameOver) return;

    const guess = Number(input.value);

    if (
        input.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        feedback.textContent =
            "Please enter a whole number between 1 and 100.";
        return;
    }

    attemptsUsed++;

    const remaining = MAX_ATTEMPTS - attemptsUsed;
    attemptsDisplay.textContent = remaining;

    if (guess === secretNumber) {
        feedback.textContent =
            `🎉 Correct! You guessed it in ${attemptsUsed} attempt(s)!`;
        feedback.style.color = "#a6e3a1";
        endGame();
    } else if (remaining === 0) {
        feedback.textContent =
            `Game over! The number was ${secretNumber}.`;
        feedback.style.color = "#f38ba8";
        endGame();
    } else if (guess < secretNumber) {
        feedback.textContent = "⬆ Too low! Try a higher number.";
        feedback.style.color = "#89b4fa";
    } else {
        feedback.textContent = "⬇ Too high! Try a lower number.";
        feedback.style.color = "#fab387";
    }

    input.value = "";
    input.focus();
});

function endGame() {
    gameOver = true;
    guessButton.disabled = true;
    input.disabled = true;
}

restartButton.addEventListener("click", function () {
    secretNumber = generateNumber();
    attemptsUsed = 0;
    gameOver = false;

    attemptsDisplay.textContent = MAX_ATTEMPTS;
    feedback.textContent = "Your adventure starts here!";
    feedback.style.color = "#bac2de";

    input.disabled = false;
    guessButton.disabled = false;
    input.value = "";
    input.focus();
});
