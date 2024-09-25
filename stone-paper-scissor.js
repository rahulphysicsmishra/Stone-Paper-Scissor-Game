document.getElementById("play-btn").addEventListener("click", function() {

    document.getElementById("play-btn").style.display = "none";
    document.getElementById("game-options").style.display = "block";
    startGame();
});


const choices = ['rock', 'paper', 'scissor'];
const buttons = document.querySelectorAll("#game-options button");
let playerScore = 0;
let computerScore = 0;
let timeRemaining = 60;
let countdownInterval;

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const userChoice = this.getAttribute('data-choice');
        const computerChoice = getComputerChoice();
        const result = determineWinner(userChoice, computerChoice);
        updateScore(result);
        displayResult(result, userChoice, computerChoice);
    });
});

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random()*choices.length);
    return choices[randomIndex];
}

function determineWinner(user, computer) {
    console.log(`User Choice: ${user}, Computer Choice: ${computer}`);
    if (user===computer) {
        return "It's a draw!";
    } else if ((user === 'rock' && computer === 'scissor') || (user==='scissor' && computer ==='paper') || (user === 'paper' && computer === 'rock')) {
        return "You win!";
    } else {
        return "You lose!";   
    }
}

function displayResult(result, userChoice, computerChoice) {
    document.getElementById("player-choice").textContent = userChoice;
    document.getElementById("computer-choice").textContent = computerChoice;
    document.getElementById("result").textContent = `You chose ${userChoice}, Computer chose ${computerChoice}. ${result}`;
}

function updateScore(result) {
    if (result === "You win!") {
        playerScore++;
    } else if (result === "You lose!") {
        computerScore++;
    }
}

function startGame() {
    playerScore = 0;
    computerScore = 0;
    timeRemaining = 60;

    document.getElementById("timer").textContent = `Time Remaining: ${timeRemaining}s`;

    countdownInterval = setInterval(updateTimer, 1000);
    setTimeout(endGame, 60000);
}

function updateTimer() {
    timeRemaining--;
    document.getElementById("timer").textContent = timeRemaining;

    if (timeRemaining<=0) {
        clearInterval(countdownInterval);
    }
}


function endGame() {
    clearInterval(countdownInterval);

    let finalResult;
    if (playerScore > computerScore){
        finalResult = "You are the overall winner !";
    } else if (computerScore > playerScore) {
        finalResult = "Computer wins !";
    } else {
        finalResult = "It's a tie !";
    }

    document.getElementById("result").textContent = `Final Score: You : ${playerScore}, Computer: ${computerScore}, Final Result: ${finalResult}`;

    setTimeout(function() {
        document.getElementById("play-btn").style.display = "block";
        document.getElementById("game-options").style.display = "none";
        document.getElementById("result").textContent = "";
        document.getElementById("timer").textContent = "";
        document.getElementById("player-choice").textContent = "?";
        document.getElementById("computer-choice").textContent = "?";
    }, 5000);
}