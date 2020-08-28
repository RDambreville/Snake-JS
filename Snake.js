import * as DrawService from '../draw.js'; 
import * as GameConfig from './models/game-config.js'
import { Player } from './models/player.js';
import { Food } from './models/food.js';
import { ScreenState } from './models/screen-state.js';

/**=============================================================== 
 * ====================== Variables ============================== 
 * =============================================================== 
 **/ 

let score;
let clock;
const player = new Player();
const food = new Food()



/**=============================================================== 
 * ====================== Method Calls =========================== 
 * =============================================================== 
 **/ 


 setupGame();   // Set initial game screen

// Add click event listener to play button
document.querySelector('#start-button')
    .addEventListener('click', startGameLoop); // Don't add parentheses to the method call

// document.querySelector('#play-surface')
//     .addEventListener('keypress', updateSnakeDirection).bind(); // Don't add parentheses to the method call

document.querySelector('body')
    .addEventListener('keyup', updateSnakeDirection); // Don't add parentheses to the method call



/**=============================================================== 
 * ====================== Method definitions ===================== 
 * =============================================================== 
 **/ 

function setupGame() {
    score = 0;
    initPlayScreen();   // Draw initial play screen
}



function initPlayScreen() {
    DrawService.setupCanvas();
    const screenState = new ScreenState(player, score, food)
    console.log('screenState', screenState);
    clearScreen();
    drawCurrentScreenState(screenState);
}

function clearScreen() {
    DrawService.clearCanvas()
}

function drawCurrentScreenState(screenState) {
    drawHeadsUpDisplay(screenState.score);
    drawPlayer(screenState.player);
    drawFood(screenState.food);
}

function drawHeadsUpDisplay(score) {
    DrawService.drawText(`Score: ${score}`, 0, 20);
}

function drawPlayer(player) {
    
}

function drawFood(food) {
    DrawService.drawRectangle(food.x, food.y, food.width, food.height)
}


function startGameLoop() {
    alert('Game loop started!');
    // Call checkGameState every GameConfig.gameSpeed miliseconds
    clock = setInterval(checkAndUpdateGameState, GameConfig.gameSpeed); // Don't use parentheses with the method call
}

function checkAndUpdateGameState() {
    if (isGameOver()) {
        endTheGame();
        return;
    }

    if (wasFoodEaten()) {
        score++;
        player.grow();
        food.updatePosition();
    }
    updateScreen();
}

function updateScreen() {
    const screenState = new ScreenState(player, score, food);
    clearScreen();
    drawCurrentScreenState(screenState);
}

function updateSnakeDirection(keyUpEvent) {
    // TODO: check if player has crashed (i.e. hit a wall or ran into itself)
    console.log('keyUpEvent', keyUpEvent);
    switch (keyUpEvent.key/*.toString().toLowerCase()*/) {
        case 'w': player.setDirection('up'); break;
        case 'ArrowUp': player.setDirection('up'); break;
        case 's': player.setDirection('down'); break;
        case 'ArrowDown': player.setDirection('down'); break;
        case 'a': player.setDirection('left'); break;
        case 'ArrowLeft': player.setDirection('left'); break;
        case 'd': player.setDirection('right'); break;
        case 'ArrowRight': player.setDirection('right'); break;
        default: player.setDirection(null); // keep the direction the same
    }
}

function isGameOver() {
    return player.hasCrashed();
}

function wasFoodEaten() {
    return player.head.x === food.x && player.head.y === food.y
}

function endTheGame() {
    clearInterval(clock); // Stop game loop
    alert('Game Over');
    releaseResources();
}

function releaseResources() {
    player = null;
    food = null;
    clock = null;
}

// function checkIfServiceLoaded() {
//     DrawService.checkIfLoaded();
// }

// function openAlert() {
//     alert('alert opened!');
//     checkIfServiceLoaded();
// }

