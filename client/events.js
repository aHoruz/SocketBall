import { sendMoveVert, sendMoveHor } from "./communication.js";

const PLAYER_DIRECTIONS = Object.freeze({
    "positive": 1,
    "none": 5,
    "negative": -1,
});

export const setupEvents = () => {
    document.addEventListener("keydown", (e) => {
        console.log("key", e.key, "was pressed");
        switch (e.key) {
        case "w":
            sendMoveVert(PLAYER_DIRECTIONS.negative);
            break;
        case "d":
            sendMoveHor(PLAYER_DIRECTIONS.positive);
            break;
        case "s":
            sendMoveVert(PLAYER_DIRECTIONS.positive);
            break;
        case "a":
            sendMoveHor(PLAYER_DIRECTIONS.negative);
            break;
        case " ":
            break;
        }
    });
};