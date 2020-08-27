import * as DrawService from '../draw.js'; 
import * as GameConfig from './models/game-config.js'
import { Player } from './models/player.js';
import { Food } from './models/food.js';
import { ScreenState } from './models/screen-state.js';

/**=============================================================== 
 * ====================== Variables =========================== 
 * =============================================================== */ 

var score;
var clock;
const player = new Player(2, 'up');



/**=============================================================== 
 * ====================== Method Calls =========================== 
 * =============================================================== */ 

 // Set clock for game loop, set player, and set screen
 setupGame();

// Add click event listener to play button
document.querySelector('#checkButton')
    .addEventListener('click', /*startGameLoop*/ setupGame());



/**=============================================================== 
 * ====================== Method definitions ===================== 
 * =============================================================== */ 

function setupGame() {
    score = 0;
    initPlayScreen();
    setGameClock();
    // Draw initial play screen
}

function setGameClock() {
    clock = setInterval(updateScreen(), 3000);
}

function updateScreen() {
        score++;
        console.log('score', score);
        const food = new Food(Math.random() % 100 + 1, Math.random() % 100 + 1, GameConfig.foodSize, GameConfig.foodSize);
        const screenState = new ScreenState(player, score, food);
        clearScreen();
        drawCurrentScreenState(screenState);

}


function initPlayScreen() {
    DrawService.setupCanvas();
    const food = new Food(50, 50, GameConfig.foodSize, GameConfig.foodSize );
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

function drawStartScreen() {
//     drawHeadsUpDisplay();
//     drawPlayer();
//     drawFood();
// }
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
    while(!isGameOver()) {
        // if (wasFoodEaten()) {
        //     score++; // TODO remove
        //     const food = new Food(Math.random() % 100, Math.random() % 100, GameConfig.foodSize, GameConfig.foodSize);
        // }

        // if ()
        score++;
        console.log('score', score);
        const food = new Food(Math.random() % 100 + 1, Math.random() % 100 + 1, GameConfig.foodSize, GameConfig.foodSize);
        const screenState = new ScreenState(player, score, food);
        clearScreen();
        drawCurrentScreenState(screenState);


    }
    alert('Game Over!');

}

function isGameOver() {
    return player.hasCrashed;
}

// function checkIfServiceLoaded() {
//     DrawService.checkIfLoaded();
// }

// function openAlert() {
//     alert('alert opened!');
//     checkIfServiceLoaded();
// }

