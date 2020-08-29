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
    drawFood(/*screenState.food*/);
    drawPlayer(/*screenState.player*/);
}

function drawHeadsUpDisplay(/*score*/) {
    DrawService.drawText(`Score: ${score}`, 0, 20);
}

function drawFood(/*food*/) {
    DrawService.setFillColor(GameConfig.foodColor); // change paint color
    DrawService.drawRectangle(food.x, food.y, food.width, food.height) // draw the food
    DrawService.setFillColor(GameConfig.isDarkMode ? 'white' : 'green'); // change paint color back
}

function drawPlayer(/*player*/) {
    // Draw the snake's head
    DrawService.drawRectangle(player.head.x, player.head.y, GameConfig.foodSize, GameConfig.foodSize);
    // Draw the line connecting the head to the previous vertex
    connectVertices(player.head, player.bodyVertices[player.bodyVertices.length - 1])

    // DrawService.drawRectangle(player.head.x, player.head.y, GameConfig.foodSize, GameConfig.foodSize)
    
    // Draw the snake's body starting at the head
    // Draw 2 body vertices at a time and connect with line
   const lengthOfVertexList = player.bodyVertices.length >= 0 ? player.bodyVertices.length : 0;
   for (let currentIndex = lengthOfVertexList - 1; currentIndex >= 0; currentIndex--) {
        const currentVertex = player.bodyVertices[currentIndex];
        const nextVertex = player.bodyVertices[currentIndex - 1];
        connectVertices(currentVertex, nextVertex);
   }

   // remove some of the snake's tail
   if (player.bodyVertices.length > 10) {
    player.bodyVertices.shift();

   }
    
    
}

function connectVertices(currentVertex, nextVertex) {
    // Draw 2 body vertices at a time and connect with line
    if (currentVertex && nextVertex) {
        DrawService.drawRectangle(currentVertex.x, currentVertex.y, GameConfig.foodSize, GameConfig.foodSize);   // Draw first vertex
        DrawService.drawRectangle(nextVertex.x, nextVertex.y, GameConfig.foodSize, GameConfig.foodSize);   // Draw second vertex
        // Draw a vertical line if vertices are on seperate lines
        if (currentVertex.x === nextVertex.x && currentVertex.y !== nextVertex.y) {
            // if current vertex is lower than the previous vertex, then draw upwards
            if (currentVertex.y >= nextVertex.y) {
                DrawService.drawRectangle(nextVertex.x, nextVertex.y, GameConfig.foodSize, Math.abs(nextVertex.y - currentVertex.y))
            } else { // draw downwards
                DrawService.drawRectangle(currentVertex.x, currentVertex.y, GameConfig.foodSize, Math.abs(nextVertex.y - currentVertex.y))
            }
            // DrawService.drawRectangle(currentVertex.x, currentVertex.y, GameConfig.foodSize, Math.abs(nextVertex.y - currentVertex.y))
        } 
        // Draw a horizontal line if vertices are on the same line 
        /*else*/ if (currentVertex.x !== nextVertex.x && currentVertex.y === nextVertex.y) {
            // if current vertex is to the left of next vertex, then draw backwards
            if (currentVertex.x >= nextVertex.y) {
                DrawService.drawRectangle(nextVertex.x, nextVertex.y, GameConfig.foodSize, Math.abs(nextVertex.y - currentVertex.y))
            } else { // Draw frontwards
                DrawService.drawRectangle(currentVertex.x, currentVertex.y, GameConfig.foodSize, Math.abs(nextVertex.y - currentVertex.y))
            }
            // This line makes things work well for some reason
            //TODO: Figure out why
            DrawService.drawRectangle(nextVertex.x, nextVertex.y,  Math.abs(nextVertex.x - currentVertex.x), GameConfig.foodSize);
        }
    }
}

function startGameLoop() {
    // alert('Gakme loop started!');
    // Call checkGameState every GameConfig.gameSpeed miliseconds
    clock = setInterval(checkAndUpdateGameState, GameConfig.gameSpeed); // Don't use parentheses with the method call
}

function checkAndUpdateGameState() {
    // TODO: Uncomment boundary detection
    if (/*isPlayerOutOfBounds() ||*/ hasPlayerHitSelf()) {
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
    const marginOfSuccess = GameConfig.marginOfSuccess;
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
    switch (keyUpEvent.key) {
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

