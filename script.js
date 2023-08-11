// Select DOM elements
const playerOne = document.querySelectorAll(".p1");
const playerTwo = document.querySelectorAll(".p2");
const msg = document.querySelector(".msg");
const imgTop = document.querySelector(".imgTop");
const imgBottom = document.querySelector(".imgBottom");
const optionsBtn = document.getElementById("optionsBtn");
const optionsList = document.getElementById("optionsList");

// Initialize game state
let player;
let computer;
let playerWons = 0;
let computerWons = 0;
let usingKeys = true;
let playerOneName = "Khattab";

// Update player one name display
document.querySelector(".bottom").lastElementChild.firstElementChild.textContent = playerOneName;

// Handle keyboard input
document.addEventListener("keydown", function (ev) {
    if (usingKeys) {
        if (ev.keyCode === 39) { // Right arrow
            usingKeys = false;
            playerTwo[2].click();
        } else if (ev.keyCode === 40) { // Down arrow
            usingKeys = false;
            playerTwo[1].click();
        } else if (ev.keyCode === 37) { // Left arrow
            usingKeys = false;
            playerTwo[0].click();
        }
    }
});

// Handle player two button clicks
playerTwo.forEach(button => button.addEventListener("click", () => {
    // Disable player two buttons during game
    playerTwo.forEach(btn => btn.style.pointerEvents = "none");

    // Set player choice, run computer turn, and update display
    player = button.classList[1];
    computerTurn();
    imgBottom.src = `imgs/${player}Big.png`;
    imgTop.src = `imgs/${computer}Big.png`;
    msg.textContent = checkWinner();
    display();

    // Re-enable player two buttons and keyboard input after delay
    setTimeout(() => {
        imgTop.style.display = "none";
        imgBottom.style.display = "none";
        msg.style.display = "none";
        playerTwo.forEach(btn => btn.style.pointerEvents = "auto");
        usingKeys = true;
    }, 2200);
}));

// Handle computer turn
function computerTurn() {
    const randNum = Math.floor(Math.random() * 3) + 1;
    switch (randNum) {
        case 1:
            computer = "rock";
            break;
        case 2:
            computer = "paper";
            break;
        case 3:
            computer = "scissors";
            break;
    }
}

// Check winner and return result message
function checkWinner() {
    if (player == computer) {
        return "Draw";
    } else if (computer == "rock") {
        return (player == "paper") ? playerWon() : computerWon();
    } else if (computer == "paper") {
        return (player == "scissors") ? playerWon() : computerWon();
    } else if (computer == "scissors") {
        return (player == "rock") ? playerWon() : computerWon();
    }
}

// Update player won count and return result message
function playerWon() {
    playerWons++;
    return `${playerOneName} Won!`;
}

// Update computer won count and return result message
function computerWon() {
    computerWons++;
    return "Computer Won!";
}

// Update display with current game state
function display() {
    document.querySelector(".bottom").lastElementChild.lastElementChild.textContent = playerWons;
    document.querySelector(".top").lastElementChild.lastElementChild.textContent = computerWons;
    imgTop.style.display = "block";
    imgBottom.style.display = "block";
    msg.style.display = "flex";
}

// Reset game state and display
function reset() {
    playerWons = 0;
    computerWons = 0;
    document.querySelector(".bottom").lastElementChild.lastElementChild.textContent = playerWons;
    document.querySelector(".top").lastElementChild.lastElementChild.textContent = computerWons;
    imgTop.style.display = "none";
    imgBottom.style.display = "none";
    msg.style.display = "none";
    optionsList.className = "optionsList";
}

// Show or hide options list
function showOptionsList() {
    optionsList.classList.toggle("show");
}

// Close the game window
function closeGame() {
    window.close();
}

// Change player one name
function changeName() {
    playerOneName = window.prompt("Enter Your Name");
    document.querySelector(".bottom").lastElementChild.firstElementChild.textContent = playerOneName;
}