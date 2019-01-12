const PLAYER_RADIUS = 24;

const DEFAULT_PLAYER_COLOR = Object.freeze({
    "r": 100,
    "g": 59,
    "b": 88
});

const USERNAME_SHIFT = 30;
const USERNAME_MAX_WIDTH = 80;
const USERNAME_FONT = "10px monospace";
const USERNAME_COLOR = "rgba(0, 0, 0, 0.45)";

export default class Player {
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
    
    display(ctx) {
        //Circle itself
        ctx.beginPath();
        ctx.arc(this.x, this.y, PLAYER_RADIUS, 0, 2*Math.PI);
        if (this.is_own_player) {
            ctx.fillStyle = "rgba(150, 20, 20)";
        } else {
            ctx.fillStyle = `rgba(${DEFAULT_PLAYER_COLOR.r}, ${DEFAULT_PLAYER_COLOR.g}, ${DEFAULT_PLAYER_COLOR.b})`;
        }
        ctx.fill();
        ctx.closePath();

        // Username
        ctx.textAlign = "center";
        ctx.fillStyle = USERNAME_COLOR;
        ctx.font = USERNAME_FONT;
        ctx.fillText(this.username, this.x, this.y - USERNAME_SHIFT, USERNAME_MAX_WIDTH);
    }
}