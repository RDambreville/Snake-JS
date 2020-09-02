/**
 * food.js
 * An object representing a food pellet.
 * The player pursues and collects this to increase
 * the score.
 */
import * as GameConfig from '../config/game-config.js'

 export class Food {

    x; // horizontal coordinate of this food object
    y; // vertical coordinate of this food object
    height;
    width;

    constructor() {
        this.updatePosition();
        this.width = GameConfig.foodSize;
        this.height = GameConfig.foodSize;
    }

    /**
     * Set horizontal and vertical positions to 
     * any whole number between 1 and 100
     */
    updatePosition() {
        this.x = GameConfig.getOneRandomSpawnCoordinate(); 
        this.y = GameConfig.getOneRandomSpawnCoordinate();
        console.log('food coordinates', { x: this.x, y: this.y }); 
    }
 } 