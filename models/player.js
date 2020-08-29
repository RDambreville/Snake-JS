/**
 * player.js
 * An object representing the player
 */
import * as GameConfig from './game-config.js';
import { BodyVertex } from './body-vertex.js';

export class Player {

    length;
    head;
    direction;
    bodyVertices = []; // Array of vertices at which the snake changed direction

    directionChoices = [
        'UP',
        'DOWN',
        'LEFT',
        'RIGHT'
    ]

    hasPlayerCrashed = false;
    
    constructor() {
        this.length = GameConfig.initialPlayerLength;   
        this.direction = this.getRandomDirectionString();
        this.head = this.getRandomHeadCoordinates()
        this.bodyVertices = [];
        console.log('start direction', this.direction);
        console.log('start snake head', this.head);
    }

    getRandomDirectionString() {
        // set randomIndex to any whole number between 0 and 3
        //  since the directionChoices array is only 4 elements long
        const randomIndex = Math.random() * (3 - 0); 
        const randomDirectionString = this.directionChoices[randomIndex];
        return randomDirectionString ? randomDirectionString : this.directionChoices[0];
    }

    setDirectionString(directionString) {
        // Only allow direction changes when moving in a new direction and not when backpedaling
        if (directionString && !this.isSameDirection(directionString) && !this.isOppositeDirection(directionString)) {
            const newVertex = new BodyVertex(
                this.head.x, this.head.y, this.direction.toString().toLowerCase(), directionString.toString().toLowerCase());
            this.bodyVertices.push(newVertex);
            const matchingDirectionFromLookup = this.directionChoices.filter(choice => 
                choice.toString().toLowerCase() === directionString.toString().toLowerCase())[0];
            this. direction = matchingDirectionFromLookup ? matchingDirectionFromLookup : this.direction;
            console.log('new snake direction', this.direction);
            console.log('body vertices', this.bodyVertices);
        }
       
    }

    getCurrentDirectionString() {
        return this.direction;
    }

    getRandomHeadCoordinates() {
        return { x: GameConfig.getOneRandomSpawnCoordinate(), y: GameConfig.getOneRandomSpawnCoordinate() };
    }

    grow() {
        this.length = this.length ? this.length + GameConfig.lengthToAddToPlayer : GameConfig.lengthToAddToPlayer;
    }

    crash() {
        this.hasPlayerCrashed = true;
    }

    hasCrashed() {
        return this.hasPlayerCrashed;
    }

    isSameDirection(newDirectionString) {
        return newDirectionString.toString().toLowerCase() === this.direction.toString().toLowerCase()
    }

    isOppositeDirection(newDirectionString) {
        switch (newDirectionString.toString().toLowerCase()) {
            case 'up': return this.direction.toString().toLowerCase() === 'down';
            case 'down': return this.direction.toString().toLowerCase() === 'up';
            case 'left': return this.direction.toString().toLowerCase() === 'right';
            case 'right': return this.direction.toString().toLowerCase() === 'left';
            default: return true; // prevent a direction change in any outstanding case
        }
    }
    
}
