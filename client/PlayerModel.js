export const PLAYER_DIRECTIONS = Object.freeze({
    "positive": 1,
    "none": 5,
    "negative": -1,
});

export default class PlayerModel {
    constructor(new_player_info, is_own_player = false) {
        this.username = new_player_info.username;
        this.x = new_player_info.x;
        this.y = new_player_info.y;
        this.is_own_player = is_own_player;
    }

    update(player_data) {
        this.x = player_data.x;
        this.y = player_data.y;
    }
    
    setMovingHor(direction) {
        this.hor_direction = getResultingDirection(this.hor_direction, direction);
    }

    setMovingVert(direction) {
        this.vert_direction = getResultingDirection(this.vert_direction, direction);
    }

    getDirections() {
        const {hor_direction, vert_direction} = this;
        return [
            hor_direction,
            vert_direction
        ];
    }
}

const getResultingDirection = (curr_direction, new_direction) => {
    if (curr_direction === PLAYER_DIRECTIONS.negative && new_direction === PLAYER_DIRECTIONS.positive ||
        curr_direction === PLAYER_DIRECTIONS.positive && new_direction === PLAYER_DIRECTIONS.negative) {
        return PLAYER_DIRECTIONS.none;
    } else {
        return new_direction;
    }
};