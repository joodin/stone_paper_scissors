'use strict'

let choices = ['rock', 'paper', 'scissors'];
let pointLimit = 5;
let playerPoints = 0;
let computerPoints = 0;
let gameOver = true;

let buttons = document.querySelectorAll('button');
buttons.forEach((button) => button.addEventListener('click', startRound));

let btnNew =  document.querySelector('#newGame');
btnNew.addEventListener('click', startGame);

function computerPlay() {
    let rng = Math.floor(Math.random()*3);
    return choices[rng];
}

function playRound(playerInput, computerSelection) {
    let playerSelection = playerInput.toLowerCase();
    let result = getResult(playerSelection, computerSelection);
    let output;
    playerSelection = capitalize(playerSelection);
    computerSelection = capitalize(computerSelection);
    switch (result) {
        case 'win':
            output = `You win! ${playerSelection} beats ${computerSelection}`;
            playerPoints ++;
        break;
        case 'lose':
            output = `You lose! ${computerSelection} beats ${playerSelection}`;
            computerPoints ++;
        break;
        case 'draw':
            output = `Draw! Both picked ${playerSelection}`;
        break;
        case 'invalid input':
            output = `Invalid input: ${playerInput}. Please choose one of: ${choices.join(', ')}.`;
        break;
    }
    return output;
}

function getResult(a, b) {
    if (!choices.includes(a) || !choices.includes(b)) {
        return 'invalid input';
    }
    
    if (a == b) {
        return 'draw';
    }
    switch (a) {
        case choices[0]:
            return (b == choices[2]) ? 'win' : 'lose';
        case choices[1]:
            return (b == choices[0]) ? 'win' : 'lose';
        case choices[2]:
            return (b == choices[1]) ? 'win' : 'lose';
    }
}

function capitalize(word) {
    let capitalized = word[0].toUpperCase() + word.slice(1);
    return capitalized;
}


function startRound(event) {
    if(gameOver) {
        return;
    }
    let playerSelection = event.target.id;
    let roundResult = playRound(playerSelection, computerPlay());
    let score = document.querySelector('#score');
    let resultDisplay = document.querySelector('#roundResult');
    score.textContent = `Player ${playerPoints} - ${computerPoints} Computer`;
    resultDisplay.textContent = roundResult;
    if(Math.max(playerPoints, computerPoints) >= pointLimit) {
        gameOver = true;
        endGame();
    }
}

function endGame() {
    let resultDisplay = document.querySelector('#result');
    resultDisplay.textContent = (playerPoints > computerPoints) ? 'Congratulations, you won!' : 'You lost.'; 
    reverseButtons();
}

function reverseButtons() {
    let buttons = document.querySelectorAll('button');
    for (let button of Array.from(buttons)) {
        button.hidden = !button.hidden;
    }
}

function startGame() {
    gameOver = false;
    reverseButtons();
    playerPoints = 0;
    computerPoints = 0;
    let score = document.querySelector('#score');
    score.textContent = `Player ${playerPoints} - ${computerPoints} Computer`;
    let resultDisplay = document.querySelector('#result');
    resultDisplay.textContent = "";

    let btnNew =  document.querySelector('#newGame');
    btnNew.hidden = true;
}

