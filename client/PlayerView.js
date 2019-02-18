import { PLAYER_RADIUS_PSX } from "./PlayerBody.js";

const PHYSICS_TO_PX = 24;

const PLAYER_RADIUS_PX = PLAYER_RADIUS_PSX * PHYSICS_TO_PX;

const DEFAULT_PLAYER_COLOR = Object.freeze({
    "r": 100,
    "g": 59,
    "b": 88
});

const USERNAME_SHIFT = 30;
const USERNAME_MAX_WIDTH = 80;
const USERNAME_FONT = "10px monospace";
const USERNAME_COLOR = "rgba(0, 0, 0, 0.45)";

export default class PlayerView {
    static setData({x, y, is_own_player, username}) {
        this.x = x;
        this.y = y;
        this.is_own_player = is_own_player;
        this.username = username;
    }

    static display(ctx) {
        const view_x = this.x * PHYSICS_TO_PX;
        const view_y = this.y * PHYSICS_TO_PX;

        //Circle itself
        ctx.beginPath();
        ctx.arc(view_x, view_y, PLAYER_RADIUS_PX, 0, 2*Math.PI);
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
        ctx.fillText(this.username, view_x, view_y - USERNAME_SHIFT, USERNAME_MAX_WIDTH);
    }
}