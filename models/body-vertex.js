/**
 * body-vertex.js
 * An object representing a turning point for the snake.
 */
import * as GameConfig from './game-config.js'

 export class BodyVertex {

    x; // horizontal coordinate of this bodyKink object
    y; // vertical coordinate of this bodyKink object

    oldDirectionString; // Direction the snake was traveling before turning
    newDirectionString; // New direction of the snake after turning

    constructor(x, y, oldDirectionString, newDirectionString) {
        this.oldDirectionString = oldDirectionString
        this.newDirectionString = newDirectionString;
        this.x = x;
        this.y = y;
        // console.log('new bodyKink', this);
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