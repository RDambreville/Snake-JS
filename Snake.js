import * as DrawService from '../draw.js'; 


/**=============================================================== 
 * ====================== Method Calls =========================== 
 * =============================================================== */ 

 // Set clock for game loop, set player, and set screen
 setupGame();

// Add click event listener to play button
document.querySelector('#checkButton')
    .addEventListener('click', startGame);



/**=============================================================== 
 * ====================== Method definitions ===================== 
 * =============================================================== */ 

function setupGame() {
    // Draw initial play screen
    initPlayScreen();
}

function initPlayScreen() {
    DrawService.setupCanvas();
    drawStartScreen();
}

function drawStartScreen() {
    drawHeadsUpDisplay();
    drawPlayer();
    drawFood();
}

function drawHeadsUpDisplay() {


}

function drawPlayer(x, y, length) {
    
}

function drawFood(x, y) {
    
}


function startGame() {


}

// function checkIfServiceLoaded() {
//     DrawService.checkIfLoaded();
// }

// function openAlert() {
//     alert('alert opened!');
//     checkIfServiceLoaded();
// }

