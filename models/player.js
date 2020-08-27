/**
 * player.js
 * An object representing the player
 */

export class Player {

    length;
    head;
    direction;

    hasCrashed = false;
    
    constructor(length, direction) {
        this.length = length;
        this.direction = direction;
    }

    grow() {
        this.length = this.length ? this.length + 2 : 2;
    }

    crash() {
        this.hasCrashed = true;
    }
    
}
