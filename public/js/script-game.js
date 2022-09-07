let userScore = 0;
let computerScore = 0;

class Player {
    constructor() {
    }

    randomizeComChoice() {
        let computer = Math.floor(Math.random() * 3);

        // Selection
        if (computer == 0) {
            return "rock";
        } else if (computer == 1) {
            return "paper";
        } else {
            return "scissor";
        }
    }

    reset() {
        document.getElementById("rock-user").classList.remove("box-selected");
        document.getElementById("paper-user").classList.remove("box-selected");
        document.getElementById("scissor-user").classList.remove("box-selected");
        document.getElementById("rock-com").classList.remove("box-selected");
        document.getElementById("paper-com").classList.remove("box-selected");
        document.getElementById("scissor-com").classList.remove("box-selected");
    }

    updateScore(score) {

        if (score == "COM Win") {
            computerScore++;
            document.getElementById("comScore").innerText = computerScore;
        } else if (score == "Player 1 Win") {
            userScore++;
            document.getElementById("playerScore").innerText = userScore++;
        }
    }

    checkPilihan(userChoice) {
        // Clear Selected Boxes
        this.reset();

        document.getElementById(`${userChoice}-user`).classList.add("box-selected");
        let comChoice = this.randomizeComChoice();
        document.getElementById(`${comChoice}-com`).classList.add("box-selected");

        let result;

        // Print
        console.log(`User's choice: ${userChoice}`);
        console.log(`Com's choice: ${comChoice}`);

        // Winner
        if (userChoice == comChoice) {
            console.log("Draw");
            document.getElementById("result").classList.add("box-result");
            document.getElementById("result").classList.remove("versus");
            document.getElementById("result").innerText = "Draw";
        } else if (userChoice == "rock" && comChoice == "paper") {
            console.log("COM Win");
            document.getElementById("result").classList.add("box-result");
            document.getElementById("result").classList.remove("versus");
            result = document.getElementById("result").innerText = "COM Win";
            this.updateScore(result);
        } else if (userChoice == "rock" && comChoice == "scissor") {
            console.log("Player 1 Win");
            document.getElementById("result").classList.add("box-result");
            document.getElementById("result").classList.remove("versus");
            result = document.getElementById("result").innerText = "Player 1 Win";
            this.updateScore(result);
        } else if (userChoice == "paper" && comChoice == "rock") {
            console.log("Player 1 Win");
            document.getElementById("result").classList.add("box-result");
            document.getElementById("result").classList.remove("versus");
            result = document.getElementById("result").innerText = "Player 1 Win";
            this.updateScore(result);
        } else if (userChoice == "paper" && comChoice == "scissor") {
            console.log("COM Win");
            document.getElementById("result").classList.add("box-result");
            document.getElementById("result").classList.remove("versus");
            result = document.getElementById("result").innerText = "COM Win";
            this.updateScore(result);
        } else if (userChoice == "scissor" && comChoice == "rock") {
            console.log("COM Win");
            document.getElementById("result").classList.add("box-result");
            document.getElementById("result").classList.remove("versus");
            result = document.getElementById("result").innerText = "COM Win";
            this.updateScore(result);
        } else if (userChoice == "scissor" && comChoice == "paper") {
            console.log("Player 1 Win");
            document.getElementById("result").classList.add("box-result");
            document.getElementById("result").classList.remove("versus");
            result = document.getElementById("result").innerText = "Player 1 Win";
            this.updateScore(result);
        }
    }
}

let play = new Player();