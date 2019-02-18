import { PLAYER_DIRECTIONS } from "./PlayerModel.js";
import { getOwnPlayerModel } from "./state.js";

export const setupEvents = () => {
    document.addEventListener("keydown", (e) => {
        const player = getOwnPlayerModel();
        console.log("key", e.key, "was pressed");
        switch (e.key) {
        case "w":
            player.setMovingVert(PLAYER_DIRECTIONS.negative);
            break;
        case "d":
            player.setMovingHor(PLAYER_DIRECTIONS.positive);
            break;
        case "s":
            player.setMovingVert(PLAYER_DIRECTIONS.positive);
            break;
        case "a":
            player.setMovingHor(PLAYER_DIRECTIONS.negative);
            break;
        }
    });
    
    document.addEventListener("keyup", (e) => {
        const player = getOwnPlayerModel();
        console.log("key", e.key, "was pressed");
        switch (e.key) {
        case "w":
            player.setMovingVert(PLAYER_DIRECTIONS.none);
            break;
        case "d":
            player.setMovingHor(PLAYER_DIRECTIONS.none);
            break;
        case "s":
            player.setMovingVert(PLAYER_DIRECTIONS.none);
            break;
        case "a":
            player.setMovingHor(PLAYER_DIRECTIONS.none);
            break;
        }
    });
};