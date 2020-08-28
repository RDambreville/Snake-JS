/**
 * game-config.js
 * Stores global game settings
 * 
 */

 export let gameSpeed = 10; // Time (in miliseconds) to update the screen. Low value => high game speed, High value => low game speed

 export let foodSize = 5; // Width and height of food square

 export let initialPlayerLength = 2; // Starting length of snake

 export function  getOneRandomSpawnCoordinate() {
     // Random coordiante to spawn food and initial snake head
    return Math.random() * (100 - 1) + 1; 
 }

 export let lengthToAddToPlayer = 2; // Amount by which to increase snake length after eating food