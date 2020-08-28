/**
 * player.js
 * An object representing the player
 */
import * as GameConfig from './game-config.js'

export class Player {

    length;
    head;
    direction;

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
        if (directionString) {
            const matchingDirectionFromLookup = this.directionChoices.filter(choice => 
                choice.toString().toLowerCase() === directionString.toString().toLowerCase())[0];
            this. direction = matchingDirectionFromLookup ? matchingDirectionFromLookup : this.direction;
        }
        console.log('new snake direction', this.direction);
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
    
}
