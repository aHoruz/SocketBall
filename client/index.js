const GAMEWIDTH = 1600;
const GAMEHEIGHT = 900;

//Getting the canvas context to draw on
const canvas = document.getElementById("myCanvas");
//Chaning canvas size to match game requirements
canvas.height = GAMEHEIGHT;
canvas.width = GAMEWIDTH;
const ctx = canvas.getContext("2d");

const init = () => {

    // Starting drawing cycle
    draw();
};


const draw = () => {
    //Clearing the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayers();

    requestAnimationFrame(draw);
};