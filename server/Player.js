const { createPlayerBody } = require("./WorldController");

const PLAYER_SPEED = 2;
const PLAYER_FORCE = 1.2;

const PLAYER_DIRECTIONS = Object.freeze({
    "positive": 1,
    "none": 5,
    "negative": -1,
});

class Player {
    constructor(username) {
        this.username = username;
        this.body = createPlayerBody();
    }

    setHorizontalDirection(direction) {
        switch (direction) {
        case PLAYER_DIRECTIONS.none:
            this.body.velocity[0] = 0;
            break;
        case PLAYER_DIRECTIONS.positive:
            this.body.velocity[0] = PLAYER_SPEED;
            // this.body.applyForce([PLAYER_FORCE, 0]);
            break;
        case PLAYER_DIRECTIONS.negative:
            this.body.velocity[0] = -PLAYER_SPEED;
            // this.body.applyForce([-PLAYER_FORCE, 0]);
            break;
        default:
            this.body.velocity[0] = 0;
            break;
        }
    }

    setVerticalDirection(direction) {
        switch (direction) {
        case PLAYER_DIRECTIONS.none:
            this.body.velocity[1] = 0;
            break;
        case PLAYER_DIRECTIONS.positive:
            this.body.velocity[1] = PLAYER_SPEED;
            // this.body.applyForce([0, PLAYER_FORCE]);
            break;
        case PLAYER_DIRECTIONS.negative:
            this.body.velocity[1] = -PLAYER_SPEED;
            // this.body.applyForce([0, -PLAYER_FORCE]);
            break;
        default:
            this.body.velocity[1] = 0;
            break;
        }
    }

    toObject() {
        const {username} = this;
        const [x, y] = this.body.interpolatedPosition;
        
        return {
            username,
            x,
            y,
        };
    }
}


module.exports = Player;