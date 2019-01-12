import { draw } from "./draw.js";
import { getUrlParam } from "./utils.js";
import { initSockets } from "./communication.js";
import { setupEvents } from "./events.js";

const init = () => {
    // To change
    const url_username = getUrlParam("username");
    initSockets(url_username);

    // Setting up keyboard events
    setupEvents();

    // Starting drawing cycle
    draw();
};

init();