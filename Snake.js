import * as DrawService from '../draw.js';
import * as GameConfig from './config/game-config.js'
import { Player } from './models/player.js';
import { Food } from './models/food.js';
import { ScreenState } from './models/screen-state.js';
import { BodyVertex } from './models/body-vertex.js';

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

document.querySelector('#dark-mode-checkbox')
    .addEventListener('click', toggleDarkMode)

// document.querySelector('#dark-mode-checkbox')
//     .addEventListener('load', setDarkModeCheckBoxDefault)

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
    DrawService.setupCanvas(GameConfig.canvasHeight, GameConfig.canvasWidth, GameConfig.getIsDarkMode());
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
    DrawService.setFillColor(GameConfig.getIsDarkMode() ? 'white' : 'green'); // change paint color back
}

function drawPlayer(/*player*/) {
    // Draw the snake's head
    DrawService.drawRectangle(player.head.x, player.head.y, GameConfig.foodSize, GameConfig.foodSize);
    // Draw the line connecting the head to the previous vertex
    connectVertices(player.head, player.bodyVertices[player.bodyVertices.length - 1])

    // Draw the snake's body starting at the head
    // and moving backwards towards the tail
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
    //    if (isTotalGroundCoveredGreaterThanBodyLength()) {
    //         player.bodyVertices.shift(); // remove snake tracks as new ground is covered
    //    }
}

function connectVertices(currentVertex, nextVertex) {
    // Draw 2 body vertices at a time and connect with line
    if (currentVertex && nextVertex) {
        DrawService.drawRectangle(currentVertex.x, currentVertex.y, GameConfig.foodSize, GameConfig.foodSize);   // Draw first vertex
        DrawService.drawRectangle(nextVertex.x, nextVertex.y, GameConfig.foodSize, GameConfig.foodSize);   // Draw second vertex
        // Draw a vertical line if vertices are on seperate lines
        if (currentVertex.x === nextVertex.x && currentVertex.y !== nextVertex.y) {
            // if current vertex is lower than the previous vertex, then draw upwards
            if (currentVertex.y > nextVertex.y) {
                DrawService.drawRectangle(nextVertex.x, nextVertex.y, GameConfig.foodSize, Math.abs(nextVertex.y - currentVertex.y))
            } else { // draw downwards
                DrawService.drawRectangle(currentVertex.x, currentVertex.y, GameConfig.foodSize, Math.abs(nextVertex.y - currentVertex.y))
            }
            // DrawService.drawRectangle(currentVertex.x, currentVertex.y, GameConfig.foodSize, Math.abs(nextVertex.y - currentVertex.y))
        }
        // Draw a horizontal line if vertices are on the same line 
        if (currentVertex.x !== nextVertex.x && currentVertex.y === nextVertex.y) {
            // if current vertex is to the right of next vertex, then draw backwards
            if (currentVertex.x > nextVertex.x) {
                DrawService.drawRectangle(nextVertex.x, nextVertex.y, Math.abs(nextVertex.x - currentVertex.x), GameConfig.foodSize)
            } else { // Draw frontwards
                DrawService.drawRectangle(currentVertex.x, currentVertex.y, Math.abs(nextVertex.x - currentVertex.x), GameConfig.foodSize)
            }
        }
    }
}

function isTotalGroundCoveredGreaterThanBodyLength() {
    let totalGroundCovered = 0;
    let occupiedPoints = getAllOccupiedPoints();
    occupiedPoints.forEach((point, index) => {
        if (index + 1 < occupiedPoints.length) { // if the next point is in bounds
            // Add the distances between consecutive points to the running total
            switch (point.direction.toString().toLowerCase()) {
                case 'up': totalGroundCovered += Math.abs(point.y - occupiedPoints[index + 1].y);
                case 'down': totalGroundCovered += Math.abs(point.y - occupiedPoints[index + 1].y);
                case 'left': totalGroundCovered += Math.abs(point.x - occupiedPoints[index + 1].y);
                case 'right': totalGroundCovered += Math.abs(point.x - occupiedPoints[index + 1].x);
            }
        }
    })
    return totalGroundCovered > player.length;
}

function startGameLoop() {
    // alert('Gakme loop started!');
    disableStartButton(); // prevent extra clicks after initial start
    // Call checkGameState every GameConfig.gameSpeed miliseconds
    clock = setInterval(checkAndUpdateGameState, GameConfig.gameSpeed); // Don't use parentheses with the method call
}

function disableStartButton() {
    const startButton = document.getElementById('start-button');
    startButton.setAttribute('disabled', 'true');
}

function enableStartButton() {
    const startButton = document.getElementById('start-button');
    startButton.removeAttribute('disabled');
}

// function setDarkModeCheckBoxDefault() {
//     document.getElementById('dark-mod-checkbox').checked = GameConfig.getIsDarkMode();
// }

function toggleDarkMode(clickEvent) {
    if (clickEvent.target.checked) {
        GameConfig.setIsDarkMode(true);
    } else {
        GameConfig.setIsDarkMode(false);
    }
    initPlayScreen();
}

function checkAndUpdateGameState() {
    // _TODO: Uncomment boundary detection
    if (isPlayerOutOfBounds() || hasPlayerCrashedIntoSelf()) {
        player.crash();
    }

    if (isGameOver()) {
        console.log('player head', player.head);
        console.log('min horizontal', DrawService.getMinHorizontalPosition());
        console.log('max horizontal', DrawService.getMaxHorizontalPosition());
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
    switch (player.getCurrentDirectionString().toString().toLowerCase()) {
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
    return player.head.x >= DrawService.getMaxHorizontalPosition() ||
        player.head.x <= DrawService.getMinHorizontalPosition() ||
        player.head.y >= DrawService.getMinVerticalPosition() ||
        player.head.y <= DrawService.getMaxVerticalPosition();
}

function hasPlayerCrashedIntoSelf() {
    // return false;
    const occupiedPoints = getAllOccupiedPoints(); // array of points already occupied by the snake

    // Return true if the snake's head has hit any of the vertices of its body OR
    // if the snake head coincides with an snake-occupied point between any pair of body vertices

    // return player.bodyVertices.some(vertex => vertex.x === player.head.x && vertex.y === player.head.y) ||
    //     occupiedPoints.some(point => point.x === player.head.x && point.y === player.head.y);

    return occupiedPoints.length > 0 ? occupiedPoints.some(point => point.x === player.head.x && point.y === player.head.y) : false;
}

function getAllOccupiedPoints() {
    let occupiedPoints = [];
    let nextVertex;
    let allPointsInBetween = [];
    player.bodyVertices.forEach((currentVertex, index) => {
        if (!currentVertex.oldDirectionString) { // if the currentVertext is the head at start of game
            // Add a dummy pseduo-vertex a few pixels away from the start in order to start genearating points between
            nextVertex = new BodyVertex(
                player.head.x + GameConfig.gameSpeed, player.head.y + GameConfig.gameSpeed, currentVertex.newDirectionString.toString().toLowerCase(), player.getCurrentDirectionString());
            player.bodyVertices.push(nextVertex);
            allPointsInBetween = getAllPointsBetweenTwoVertices(currentVertex, nextVertex);

        } else if (index + 1 < player.bodyVertices.length) { // if next vertex is still in bounds
            nextVertex = player.bodyVertices[index + 1];
            allPointsInBetween = getAllPointsBetweenTwoVertices(currentVertex, nextVertex);
        }
        occupiedPoints.push(...allPointsInBetween);
    });
    return occupiedPoints;
}

function getAllPointsBetweenTwoVertices(currentVertex, nextVertex) {
    let allPoints = [];
    if (currentVertex && currentVertex.newDirectionString) {
        switch (currentVertex.newDirectionString.toString().toLowerCase()) {
            // The origin of the canvas is (0, 0), so the higher the player climbs up the canvas, 
            // the smaller its y coordinate becomes and vice versa
            case 'up': { // loop upward over y coordinates
                for (let y = currentVertex.y; y > nextVertex.y; y -= GameConfig.gameSpeed) {
                    const point = { x: currentVertex.x, y: y, direction: currentVertex.newDirectionString.toString().toLowerCase() };
                    allPoints.push(point);
                }
                break;
            }
            case 'down': { // loop downard over y coordinates
                for (let y = currentVertex.y; y < nextVertex.y; y += GameConfig.gameSpeed) {
                    const point = { x: currentVertex.x, y: y, direction: currentVertex.newDirectionString.toString().toLowerCase() };
                    allPoints.push(point);
                }
                break;
            }
            case 'left': { // loop backward over x coordinates
                for (let x = currentVertex.x; x > nextVertex.x; x -= GameConfig.gameSpeed) {
                    const point = { x: x, y: currentVertex.y, direction: currentVertex.newDirectionString.toString().toLowerCase() };
                    allPoints.push(point);
                }
                break;
            }
            case 'right': { // loop forward over x coordinates
                for (let x = currentVertex.x; x < nextVertex.x; x += GameConfig.gameSpeed) {
                    const point = { x: x, y: currentVertex.y, direction: currentVertex.newDirectionString.toString().toLowerCase() };
                    allPoints.push(point);
                }
                break;
            }
        }
    }
    return allPoints;
}

function isGameOver() {
    return player.hasCrashed();
}

function endTheGame() {
    clearInterval(clock); // Stop game loop
    const xTextCoordinate = DrawService.getMaxHorizontalPosition() / 2;
    const yTextCoordinate = DrawService.getMinVerticalPosition() / 2;
    DrawService.setFillColor('red');
    DrawService.drawText('Game Over!', xTextCoordinate, yTextCoordinate);
    releaseResources();
    enableStartButton();
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

