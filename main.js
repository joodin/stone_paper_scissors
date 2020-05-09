'use strict'

let choices = ['rock', 'paper', 'scissors'];

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
        break;
        case 'lose':
            output = `You lose! ${computerSelection} beats ${playerSelection}`;
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

function game() {
    let numberOfRounds = 5;
    let currentLeader  = 0;
    for (let round = 0; round < numberOfRounds; round++) {
        console.log(`Game ${round+1}`);
        let playerSelection = prompt("Rock, Paper or Scissors?")
        let roundResult = (playRound(playerSelection, computerPlay()));
        if (roundResult.startsWith('You win')) {
            currentLeader ++;
        }
        if (roundResult.startsWith('You lose')) {
            currentLeader --;
        }
        if(!roundResult.startsWith('You')) {
            round--;
        }
        console.log(roundResult);
    }
    let winner = (currentLeader > 0) ? "You" : "The Computer";
    console.log(`${winner} won the best of ${numberOfRounds}!`)
}

game();