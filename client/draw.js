import { getPlayersData } from "./state.js";

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
    const players = getPlayersData();

    for (const player of players) {
        player.display(ctx);
    }
};