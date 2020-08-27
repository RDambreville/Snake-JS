/**
 * screen-state.js
 * Provides an object that represents all useful properties of the
 * game screen at a given point in the game
 */

 export class ScreenState {

    player;
    food;
    score;

    constructor(player, score, food) {
        this.player = player;
        this.food = food;
        this.score = score;
    }
 }