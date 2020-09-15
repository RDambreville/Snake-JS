/**
 * game-config.js
 * Stores global game settings
 * 
 */


 /**=============================================================
 * ==================== Game Mechanics ========================== 
 * ============================================================== 
 **/ 
 export let gameSpeed = 0.5; // Time (in miliseconds) to update the screen. Low value => high game speed, High value => low game speed

 export let foodSize = 5; // Width and height of food square

 export let foodColor = 'red'; // Color of food

 export let initialPlayerLength = 2; // Starting length of snake

 export function  getOneRandomSpawnCoordinate() {
     // Random coordiante to spawn food and initial snake head
    return Math.random() * (100 - 1) + 1;
 }

 export let lengthToAddToPlayer = 2; // Amount by which to increase snake length after eating food

 export let marginOfSuccess = 2; // Ballpark distance away from food the player's x and y coordinates need to be to earn a point

 

 /**=============================================================
 * ============================= UI ============================= 
 * ============================================================== 
 **/ 
let isDarkMode = true;

 export function getIsDarkMode() {
     return isDarkMode;
 }

 export function setIsDarkMode(_isDarkMode) {
     isDarkMode = _isDarkMode
 }

 export let canvasHeight = 0.75 * window.innerHeight;

 export let canvasWidth = 0.75 * window.innerWidth;