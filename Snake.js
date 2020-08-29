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
let player = new Player();
let food = new Food()



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

// Add keyup event listener to page for directional keys
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
    // const screenState = new ScreenState(player, score, food)
    // console.log('screenState', screenState);
    clearScreen();
    drawCurrentScreenState(/*screenState*/);
}

function clearScreen() {
    DrawService.clearCanvas();
}

function drawCurrentScreenState(/*screenState*/) {
    drawHeadsUpDisplay(/*screenState.score*/);
    drawPlayer(/*screenState.player*/);
    drawFood(/*screenState.food*/);
}

function drawHeadsUpDisplay(/*score*/) {
    DrawService.drawText(`Score: ${score}`, 0, 20);
}

function drawPlayer(/*player*/) {
    // Draw the snake's head
    DrawService.drawRectangle(player.head.x, player.head.y, 5, 5);
    
    // Draw the snake's body
    
    
}

function drawFood(/*food*/) {
    DrawService.drawRectangle(food.x, food.y, food.width, food.height)
}


function startGameLoop() {
    // alert('Gakme loop started!');
    // Call checkGameState every GameConfig.gameSpeed miliseconds
    clock = setInterval(checkAndUpdateGameState, GameConfig.gameSpeed); // Don't use parentheses with the method call
}

function checkAndUpdateGameState() {
    if (isPlayerOutOfBounds() || hasPlayerHitSelf()) {
        player.crash();
    }

    if (isGameOver()) {
        console.log('player head', player.head);
        console.log('min horizontal', DrawService.getMinHorzontalPosition());
        console.log('max horizontal', DrawService.getMaxHorzontalPosition());
        console.log('max vertical', DrawService.getMaxVerticalPosition());
        console.log('min vertical', DrawService.getMinVerticalPosition());
        endTheGame();
        return;
    }

    if (wasFoodEaten()) {
        score++;
        player.grow();
        food.updatePosition();
    }
    
    // Move the snake in it's current direction
    switch(player.getCurrentDirectionString().toString().toLowerCase()) {
        // case 'up': player.head.y--; break;
        // case 'down': player.head.y++; break;
        // case 'left': player.head.x--; break;
        // case 'right': player.head.x++; break;

        case 'up': player.head.y -= GameConfig.gameSpeed; break;
        case 'down': player.head.y += GameConfig.gameSpeed; break;
        case 'left': player.head.x -= GameConfig.gameSpeed; break;
        case 'right': player.head.x += GameConfig.gameSpeed; break;


        // case 'up': player.head.y -= 3; break;
        // case 'down': player.head.y += 3; break;
        // case 'left': player.head.x -= 3; break;
        // case 'right': player.head.x += 3; break;


        // TOO FAST
        // case 'up': player.head.y -= 5; break;
        // case 'down': player.head.y += 5; break;
        // case 'left': player.head.x -= 5; break;
        // case 'right': player.head.x += 5; break;
        default: break;
    }
    updateScreen();
}

function isPlayerOutOfBounds() {
    return player.head.x >= DrawService.getMaxHorzontalPosition() ||
        player.head.x <= DrawService.getMinHorzontalPosition() ||
        player.head.y >= DrawService.getMinVerticalPosition() ||
        player.head.y <= DrawService.getMaxVerticalPosition();
}

function hasPlayerHitSelf() {
    return false;
}

function isGameOver() {
    return player.hasCrashed();
}

function endTheGame() {
    clearInterval(clock); // Stop game loop
    const xTextCoordinate = DrawService.getMaxHorzontalPosition() / 2;
    const yTextCoordinate = DrawService.getMinVerticalPosition() / 2
    DrawService.drawText('Game Over!', xTextCoordinate, yTextCoordinate);
    releaseResources();
}

function releaseResources() {
    score = 0;
    player = new Player();
    food = new Food();
    clock = null;
}


function wasFoodEaten() {
    // return player.head.x === food.x && player.head.y === food.y;
    // Hacky estimation
    // Player just needs to be in ballpark to get a point.
    // If the distance between the player and food is within
    // the marginOfSuccess, then award a point;
    const marginOfSuccess = GameConfig.marginOfSuccess; // pixels
    return Math.abs(player.head.x - food.x) < marginOfSuccess && Math.abs(player.head.y - food.y) < marginOfSuccess;
}

function updateScreen() {
    // const screenState = new ScreenState(player, score, food);
    clearScreen();
    drawCurrentScreenState(/*screenState*/);
}

function updateSnakeDirection(keyUpEvent) {
    // TODO: check if player has crashed (i.e. hit a wall or ran into itself)
    console.log('keyUpEvent', keyUpEvent);
    switch (keyUpEvent.key/*.toString().toLowerCase()*/) {
        case 'w': player.setDirectionString('up'); break;
        case 'ArrowUp': player.setDirectionString('up'); break;
        case 's': player.setDirectionString('down'); break;
        case 'ArrowDown': player.setDirectionString('down'); break;
        case 'a': player.setDirectionString('left'); break;
        case 'ArrowLeft': player.setDirectionString('left'); break;
        case 'd': player.setDirectionString('right'); break;
        case 'ArrowRight': player.setDirectionString('right'); break;
        default: player.setDirectionString(null); // keep the direction the same
    }
    console.log('snake head', player.head);
}

