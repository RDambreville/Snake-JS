/**
 * food.js
 * An object representing a food pellet.
 * The player pursues and collects this to increase
 * the score.
 */

 export class Food {

    x;
    y;
    height;
    width;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
 } 