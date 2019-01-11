const INITIAL_PLAYER_POS = Object.freeze({
    "x": 400,
    "y": 400,
});

const INITIAL_PLAYER_SPEED = Object.freeze({
    "x": 0,
    "y": 0,
});

const PLAYER_DIRECTIONS = Object.freeze({
    "positive": 1,
    "none": 5,
    "negative": -1,
});

const PLAYER_SPEED = 3;

class Player {
    constructor(username, initial_pos = INITIAL_PLAYER_POS, initial_speed = INITIAL_PLAYER_SPEED) {
        this.username = username;
        this.x = initial_pos.x;
        this.y = initial_pos.y;

        this.speed_x = initial_speed.x;
        this.speed_y = initial_speed.y;
    }

    setHorizontalDirection(direction) {
        switch (direction) {
        case PLAYER_DIRECTIONS.none:
            this.speed_x = 0;
            break;
        case PLAYER_DIRECTIONS.positive:
            this.speed_x = PLAYER_SPEED;
            break;
        case PLAYER_DIRECTIONS.negative:
            this.speed_x = -PLAYER_SPEED;
            break;
        default:
            this.speed_x = 0;
            break;
        }
    }

    setVerticalDirection(direction) {
        switch (direction) {
        case PLAYER_DIRECTIONS.none:
            this.speed_y = 0;
            break;
        case PLAYER_DIRECTIONS.positive:
            this.speed_y = PLAYER_SPEED;
            break;
        case PLAYER_DIRECTIONS.negative:
            this.speed_y = -PLAYER_SPEED;
            break;
        default:
            this.speed_y = 0;
            break;
        }
    }

    update() {
        this.x += this.speed_x;
        this.y += this.speed_y;
    }

    toObject() {
        const {username, x, y} = this;
        
        return {
            username,
            x,
            y,
        };
    }
}


module.exports = Player;