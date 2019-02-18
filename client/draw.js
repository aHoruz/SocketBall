import { getPlayerModels } from "./state.js";
import PlayerView from "./PlayerView.js";

const GAMEWIDTH = 1200;
const GAMEHEIGHT = 740;

//Getting the canvas context to draw on
const canvas = document.getElementById("myCanvas");
//Chaning canvas size to match game requirements
canvas.height = GAMEHEIGHT;
canvas.width = GAMEWIDTH;
const ctx = canvas.getContext("2d");

export const draw = () => {
    clearScreen();
    drawPlayers();

    requestAnimationFrame(draw);
};

const clearScreen = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawPlayers = () => {
    const player_models = getPlayerModels();

    for (const player of player_models) {
        PlayerView.setData(player);
        PlayerView.display(ctx);
    }
};